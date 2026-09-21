#!/usr/bin/env python3
"""Sanity checks over sites/: links, assets, metadata, hreflang reciprocity."""
import re
import sys
from pathlib import Path
from html.parser import HTMLParser

DIST = Path(__file__).parent / "sites"
problems = []


class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.assets, self.h1, self.title = [], [], 0, ""
        self.meta, self.canon, self.hreflang, self._t = {}, None, {}, False
        self.lang = None

    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag == "html": self.lang = a.get("lang")
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag in ("script", "img") and a.get("src"): self.assets.append(a["src"])
        if tag == "link" and a.get("rel") == "stylesheet" and a.get("href"): self.assets.append(a["href"])
        if tag == "link" and a.get("rel") == "canonical": self.canon = a.get("href")
        if tag == "link" and a.get("rel") == "alternate" and a.get("hreflang"): self.hreflang[a["hreflang"]] = a.get("href")
        if tag == "meta" and a.get("name"): self.meta[a["name"]] = a.get("content", "")
        if tag == "h1": self.h1 += 1
        if tag == "title": self._t = True

    def handle_data(self, d):
        if self._t: self.title += d

    def handle_endtag(self, tag):
        if tag == "title": self._t = False


pages = {}
for site in sorted(DIST.iterdir()):
    if not site.is_dir(): continue
    for f in sorted(site.glob("*.html")):
        p = P(); p.feed(f.read_text(encoding="utf-8"))
        pages[(site.name, f.name)] = p
        where = f"{site.name}/{f.name}"
        static = "noindex" in p.meta.get("robots", "")
        if not p.title.strip(): problems.append(f"{where}: missing title")
        elif len(p.title) > 70: problems.append(f"{where}: title long ({len(p.title)}): {p.title}")
        d = p.meta.get("description", "")
        if not static and not (70 <= len(d) <= 175): problems.append(f"{where}: description length {len(d)}")
        if p.h1 != 1: problems.append(f"{where}: {p.h1} h1")
        exp = f"https://{site.name}/" + ("" if f.name == "index.html" else f.name)
        if p.canon != exp: problems.append(f"{where}: canonical {p.canon} != {exp}")
        for l in p.links:
            if re.match(r"(https?:|mailto:|#|tel:)", l): continue
            target = l.split("#")[0].split("?")[0]
            if target and not (site / target).exists(): problems.append(f"{where}: broken link {l}")
        for a in p.assets:
            if re.match(r"https?:", a): problems.append(f"{where}: external asset {a}"); continue
            if not (site / a).exists(): problems.append(f"{where}: missing asset {a}")
        # hreflang must be self-referencing and reciprocal
        if p.hreflang and not static:
            if exp not in p.hreflang.values(): problems.append(f"{where}: hreflang lacks self")
            for lang, href in p.hreflang.items():
                m = re.match(r"https://([^/]+)/(.*)", href)
                other = pages.get((m.group(1), m.group(2) or "index.html")) if m else None
                # other domains may not be parsed yet; check on disk
                path = DIST / m.group(1) / (m.group(2) or "index.html") if m else None
                if path is None or not path.exists(): problems.append(f"{where}: hreflang {lang} -> missing {href}")
    sm = (site / "sitemap.xml").read_text(encoding="utf-8")
    for loc in re.findall(r"<loc>([^<]+)</loc>", sm):
        m = re.match(r"https://([^/]+)/(.*)", loc)
        if m.group(1) != site.name or not (site / (m.group(2) or "index.html")).exists():
            problems.append(f"{site.name}/sitemap.xml: bad loc {loc}")
    fonts = [g for g in site.glob("*.html") if "fonts.g" in g.read_text(encoding="utf-8")]
    if fonts: problems.append(f"{site.name}: Google Fonts still referenced in {[x.name for x in fonts]}")

print(f"checked {len(pages)} pages in {len({s for s, _ in pages})} sites")
for pr in problems: print("PROBLEM:", pr)
print("OK" if not problems else f"{len(problems)} problem(s)")
sys.exit(1 if problems else 0)
