#!/usr/bin/env python3
"""Build one static site per ccTLD from the shared template in site/.

Usage: python build.py            -> dist/<domain>/ for every domain
Per-domain differences live in DOMAINS and OVERRIDES below.
"""
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "site"
DIST = ROOT / "dist"
BASE = "smartqrcraft.com"

DOMAINS = {
    "smartqrcraft.com":   {"lang": "en",    "hreflang": "en-US", "og_locale": "en_US", "currency": "USD"},
    "smartqrcraft.co.uk": {"lang": "en-GB", "hreflang": "en-GB", "og_locale": "en_GB", "currency": "GBP"},
    "smartqrcraft.in":    {"lang": "en-IN", "hreflang": "en-IN", "og_locale": "en_IN", "currency": "INR"},
    "smartqrcraft.de":    {"lang": "de",    "hreflang": "de-DE", "og_locale": "de_DE", "currency": "EUR"},
}
DEFAULT_DOMAIN = "smartqrcraft.com"  # x-default

# US-keyword pages live on .com only until localized versions exist for the other ccTLDs.
COM_ONLY = {
    "linkedin-qr-code-generator.html", "instagram-qr-code-generator.html",
    "google-review-qr-code-generator.html", "qr-code-menu-generator.html", "pdf-to-qr-code.html",
    "venmo-qr-code-generator.html", "cash-app-qr-code-generator.html", "paypal-qr-code-generator.html",
    "snapchat-qr-code-generator.html", "spotify-qr-code-generator.html", "discord-qr-code-generator.html",
    "qr-code-for-wedding-photos.html", "qr-code-stickers.html", "whatsapp-qr-code-generator.html",
    "resume-qr-code-generator.html",
}


LOCAL = ROOT / "pages"


def local_pages(domain):
    d = LOCAL / domain
    return sorted(p.name for p in d.glob("*.html")) if d.exists() else []


ALL_LOCAL = {n for d in DOMAINS for n in local_pages(d)}
SHARED = {p.name for p in SRC.glob("*.html")}

# Shared pages that must not exist on a domain (replaced by localized pages with other slugs).
EXCLUDE = {
    "smartqrcraft.de": {"wifi-qr-code-generator.html", "vcard-qr-code-generator.html",
                        "qr-code-scanner.html", "qr-code-tester.html",
                        "bulk-qr-code-generator.html", "barcode-generator.html",
                        "qr-code-with-logo.html", "youtube-qr-code-generator.html", "facebook-qr-code-generator.html",
                        "google-forms-qr-code-generator.html", "event-qr-code-generator.html",
                        "about.html", "contact.html", "privacy.html", "terms.html",
                        "what-is-a-qr-code.html", "static-vs-dynamic-qr-codes.html", "qr-code-safety.html", "qr-code-size-guide.html", "qr-codes-for-restaurants.html", "qr-codes-for-real-estate.html", "qr-codes-for-hotels-and-airbnb.html", "qr-codes-for-retail.html"},
}
NOT_IN_SITEMAP = {"impressum.html", "datenschutz.html", "about.html", "contact.html", "privacy.html", "terms.html",
                  "ueber-uns.html", "kontakt.html", "nutzungsbedingungen.html"}
HUB = {"smartqrcraft.de": "alle-qr-code-tools.html"}
HUB_DEFAULT = "all-qr-code-tools.html"
FOOTER_MAX = 9
FOOTER_PRIORITY = [
    "qr-code-scanner.html", "qr-code-scanner-online.html", "qr-code-tester.html", "qr-code-testen.html",
    "bulk-qr-code-generator.html", "barcode-generator.html", "barcode-generator-kostenlos.html",
    "wifi-qr-code-generator.html", "wlan-qr-code-generator.html",
    "vcard-qr-code-generator.html", "visitenkarte-qr-code-generator.html",
    "upi-qr-code-generator.html", "qr-code-ueberweisung-erstellen.html",
    "qr-code-with-logo.html", "qr-code-mit-logo.html",
]
GUIDE_PAGES = {"what-is-a-qr-code.html", "static-vs-dynamic-qr-codes.html", "qr-code-safety.html", "qr-code-size-guide.html", "qr-codes-for-restaurants.html", "qr-codes-for-real-estate.html", "qr-codes-for-hotels-and-airbnb.html", "qr-codes-for-retail.html"}
TOOL_PAGES = {
    "qr-code-scanner.html", "qr-code-tester.html", "bulk-qr-code-generator.html", "barcode-generator.html",
    "qr-code-scanner-online.html", "qr-code-testen.html", "barcode-generator-kostenlos.html",
}
HUB_TEXT = {
    "en": {
        "title": "All QR Code Tools | Generators, Scanner, Tester and Barcode",
        "description": "Every free SmartQRCraft tool in one place: QR code generators for links, WiFi, contacts, payments and more, plus a scanner, tester, bulk generator and barcode maker.",
        "h1": "All QR Code Tools", "crumb": "All QR Code Tools", "home": "Home",
        "lead": "Every free tool on SmartQRCraft. No signup, no watermark, everything runs in your browser.",
        "tools": "Scanner, tester and bulk tools", "types": "QR code generators by type", "guides": "Guides and industry pages",
    },
    "de": {
        "title": "Alle QR-Code Tools | Generator, Scanner, Test und Barcode",
        "description": "Alle kostenlosen SmartQRCraft-Tools an einem Ort: QR-Code Generatoren für Links, WLAN, Visitenkarten, Überweisungen und mehr, dazu Scanner, Test und Barcode-Generator.",
        "h1": "Alle QR-Code Tools", "crumb": "Alle QR-Code Tools", "home": "Startseite",
        "lead": "Alle kostenlosen Tools von SmartQRCraft. Ohne Anmeldung, ohne Wasserzeichen, alles läuft in deinem Browser.",
        "tools": "Scanner, Test und Massen-Tools", "types": "QR-Code Generatoren nach Art", "guides": "Ratgeber",
    },
}


def _strip(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s)).strip()


def build_hub(out, domain, cfg, pages):
    """Auto-generated index of every tool on this domain (internal linking + navigation)."""
    lang = cfg["lang"][:2]
    tx = HUB_TEXT.get(lang, HUB_TEXT["en"])
    fname = HUB.get(domain, HUB_DEFAULT)
    entries = []
    for p in pages:
        if p in ("index.html", fname) or p in NOT_IN_SITEMAP:
            continue
        h = (out / p).read_text(encoding="utf-8")
        m1 = re.search(r"<h1>(.*?)</h1>", h, re.S)
        m2 = re.search(r'<meta name="description" content="([^"]*)"', h)
        if m1:
            entries.append((p, _strip(m1.group(1)), m2.group(1) if m2 else ""))
    entries.sort(key=lambda e: e[1].lower())

    def cards(items):
        return "".join(
            f'<a class="card" href="{p}" style="text-decoration:none;color:inherit"><div><h3>{h}</h3><p>{d}</p></div></a>'
            for p, h, d in items)
    tools = [e for e in entries if e[0] in TOOL_PAGES]
    guides = [e for e in entries if e[0] in GUIDE_PAGES]
    types = [e for e in entries if e[0] not in TOOL_PAGES and e[0] not in GUIDE_PAGES]
    guides_html = (f'<section class="bg-lavender"><div class="wrap"><div class="section-head"><h2>{tx["guides"]}</h2></div><div class="card-grid">{cards(guides)}</div></div></section>') if guides else ""
    i18n = '<script src="assets/i18n-de.js"></script>' + chr(10) if lang == "de" else ""
    url = page_url(domain, fname)
    html = f"""<!doctype html>
<html lang="{cfg['lang']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{tx['title']}</title>
<meta name="description" content="{tx['description']}">
<link rel="canonical" href="{url}">
<meta property="og:site_name" content="SmartQRCraft">
<meta property="og:title" content="{tx['title']}">
<meta property="og:url" content="{url}">
<meta property="og:locale" content="{cfg['og_locale']}">
<meta name="theme-color" content="#6D28D9">
<link rel="stylesheet" href="assets/styles.css">
</head>
<body data-base="">
<div id="site-header"></div>
<main>
  <div class="wrap breadcrumbs"><a href="index.html">{tx['home']}</a><span class="sep">/</span><span class="current">{tx['crumb']}</span></div>
  <section><div class="wrap"><div class="section-head" style="text-align:left"><h1 style="font-size:34px">{tx['h1']}</h1><p style="color:var(--muted);margin-top:10px">{tx['lead']}</p></div></div></section>
  <section class="bg-lavender"><div class="wrap"><div class="section-head"><h2>{tx['tools']}</h2></div><div class="card-grid">{cards(tools)}</div></div></section>
  <section><div class="wrap"><div class="section-head"><h2>{tx['types']}</h2></div><div class="card-grid">{cards(types)}</div></div></section>
  {guides_html}
</main>
<div id="site-footer"></div>
{i18n}<script src="assets/components.js"></script>
</body>
</html>
"""
    (out / fname).write_text(html, encoding="utf-8")
    return fname
NO_GOOGLE_FONTS = {"smartqrcraft.de"}  # loading Google Fonts from Google servers is a GDPR risk in Germany


def has_page(domain, name):
    if name in local_pages(domain):
        return True
    if name not in SHARED or name in EXCLUDE.get(domain, set()):
        return False
    return not (name in COM_ONLY and domain != DEFAULT_DOMAIN)


def domains_for(name):
    return {d: DOMAINS[d] for d in DOMAINS if has_page(d, name)}


# Per-domain, per-page overrides: title / description / og_title / og_description / h1 (inner HTML)
OVERRIDES = {
    "smartqrcraft.co.uk": {
        "bulk-qr-code-generator.html": {
            "title": "Bulk QR Code Generator UK | Make Many QR Codes from a List — SmartQRCraft",
            "description": "Free bulk QR code generator for the UK. Paste or upload a list, get every QR code as PNG or SVG in one ZIP. Up to 1000 codes, private, no signup.",
        },
        "barcode-generator.html": {
            "title": "Free Barcode Generator UK | Code 128, EAN-13, UPC, Code 39 — SmartQRCraft",
            "description": "Free barcode generator for the UK: Code 128, EAN-13, EAN-8, UPC-A, Code 39 and more. One barcode or a bulk list, PNG or SVG. Private, no signup.",
        },
        "qr-code-scanner.html": {
            "title": "QR Code Scanner Online UK | Scan a QR Code from an Image — SmartQRCraft",
            "description": "Free online QR code scanner for the UK. Scan a QR code from an image, screenshot or camera and check what it contains before you open it. Private, no signup.",
        },
        "qr-code-tester.html": {
            "title": "QR Code Tester UK | Check Your QR Code Scans Before Printing — SmartQRCraft",
            "description": "Free QR code test. Check your code decodes and still scans when small, blurry or low contrast. Private, no signup, no upload.",
        },
        "index.html": {
            "title": "Free QR Code Generator UK | Custom QR Codes, No Signup — SmartQRCraft",
            "description": "Free QR code generator for UK businesses, cafes and shops. Make custom QR codes for links, WiFi, menus and contact cards, then download as PNG or SVG. No signup.",
            "og_title": "Free QR Code Generator UK | SmartQRCraft",
            "og_description": "Make free custom QR codes for your UK business: websites, WiFi, menus and more. No signup, no watermark.",
        },
        "wifi-qr-code-generator.html": {
            "title": "Free WiFi QR Code Generator UK | Share Your WiFi Without the Password — SmartQRCraft",
            "description": "Free WiFi QR code generator for UK homes, cafes, pubs and offices. Guests scan and connect without typing a password. Download PNG or SVG. No signup.",
        },
        "vcard-qr-code-generator.html": {
            "title": "Free vCard QR Code Generator UK | Digital Business Card QR — SmartQRCraft",
            "description": "Create a free vCard QR code for your UK business card. One scan saves your name, number and email to a phone. No signup, instant PNG/SVG download.",
        },
    },
    "smartqrcraft.in": {
        "bulk-qr-code-generator.html": {
            "title": "Bulk QR Code Generator India | Make Hundreds of QR Codes Free — SmartQRCraft",
            "description": "Free bulk QR code generator for India. Paste or upload a list of links or text and download all QR codes as PNG or SVG in one ZIP. Up to 1000 codes, no signup.",
        },
        "barcode-generator.html": {
            "title": "Free Bulk Barcode Generator India | Code 128, EAN-13, UPC — SmartQRCraft",
            "description": "Free barcode generator and bulk barcode generator for India. Code 128, EAN-13, EAN-8, UPC-A, Code 39. Download PNG or SVG, or a ZIP for a whole list. No signup.",
        },
        "qr-code-scanner.html": {
            "title": "QR Code Scanner Online India | Scan QR from Image or Camera — SmartQRCraft",
            "description": "Free online QR code scanner for India. Scan a QR from an image, screenshot or camera, including UPI codes, and see the payee and amount before you pay. Private, no signup.",
        },
        "qr-code-tester.html": {
            "title": "QR Code Test India | Check If Your QR Code Scans Before Printing — SmartQRCraft",
            "description": "Free QR code test tool. Check your QR code scans when small, blurry or low contrast, and see what it contains. Private, no signup, no upload.",
        },
        "index.html": {
            "title": "Free QR Code Generator India | Custom QR Codes, No Signup — SmartQRCraft",
            "description": "Free QR code generator for India. Create custom QR codes for links, WiFi, menus, WhatsApp and contact cards, then download as PNG or SVG. No signup, no watermark.",
            "og_title": "Free QR Code Generator India | SmartQRCraft",
            "og_description": "Make free custom QR codes for your shop, restaurant or business in India. No signup, no watermark.",
        },
        "wifi-qr-code-generator.html": {
            "title": "Free WiFi QR Code Generator India | Share WiFi With One Scan — SmartQRCraft",
            "description": "Free WiFi QR code generator for homes, cafes, hotels and offices in India. Guests scan and connect without typing a password. PNG or SVG, no signup.",
        },
        "vcard-qr-code-generator.html": {
            "title": "Free vCard QR Code Generator India | Digital Visiting Card QR — SmartQRCraft",
            "description": "Create a free vCard QR code for your visiting card. One scan saves your name, phone and email to a contact list. No signup, instant PNG/SVG download.",
        },
    },
}


def set_meta(html, pattern, repl_value):
    return re.sub(pattern, lambda m: m.group(1) + repl_value + m.group(2), html, count=1)


def apply_overrides(html, ov):
    if "title" in ov:
        html = set_meta(html, r"(<title>)[^<]*(</title>)", ov["title"])
    if "description" in ov:
        html = set_meta(html, r'(<meta name="description" content=")[^"]*("\s*>)', ov["description"])
    if "og_title" in ov:
        html = set_meta(html, r'(<meta property="og:title" content=")[^"]*(">)', ov["og_title"])
    if "og_description" in ov:
        html = set_meta(html, r'(<meta property="og:description" content=")[^"]*(">)', ov["og_description"])
    if "h1" in ov:
        html = set_meta(html, r"(<h1>).*?(</h1>)", ov["h1"])
    return html


def page_url(domain, name):
    return f"https://{domain}/" + ("" if name == "index.html" else name)


def hreflang_block(name):
    tags = [
        f'<link rel="alternate" hreflang="{cfg["hreflang"]}" href="{page_url(d, name)}">'
        for d, cfg in domains_for(name).items()
    ]
    if DEFAULT_DOMAIN in domains_for(name):
        tags.append(f'<link rel="alternate" hreflang="x-default" href="{page_url(DEFAULT_DOMAIN, name)}">')
    return "\n".join(tags)


BRAND_SUFFIX = " — SmartQRCraft"


def shorten_title(html):
    """Search results cut titles at about 60 characters, so drop the brand suffix from long titles."""
    m = re.search(r"<title>([^<]*)</title>", html)
    if m and len(m.group(1)) > 62 and m.group(1).endswith(BRAND_SUFFIX):
        html = html.replace(m.group(0), "<title>" + m.group(1)[: -len(BRAND_SUFFIX)] + "</title>", 1)
    return html


def build_page(domain, cfg, path):
    name = path.name
    html = path.read_text(encoding="utf-8")
    html = html.replace(f"https://{BASE}", f"https://{domain}")
    html = re.sub(r'<html lang="[^"]*"', f'<html lang="{cfg["lang"]}"', html, count=1)
    html = html.replace(
        '<meta property="og:site_name"',
        f'<meta property="og:locale" content="{cfg["og_locale"]}">\n<meta property="og:site_name"', 1)
    html = html.replace(
        f'<link rel="canonical" href="{page_url(domain, name)}">',
        f'<link rel="canonical" href="{page_url(domain, name)}">\n{hreflang_block(name)}', 1)
    html = html.replace('"priceCurrency": "USD"', f'"priceCurrency": "{cfg["currency"]}"')
    if True:  # fonts are self-hosted on every domain (no third-party requests)
        html = re.sub(r'<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\s*', "", html)
    html = apply_overrides(html, OVERRIDES.get(domain, {}).get(name, {}))
    return shorten_title(html)


def build_sitemap(domain, pages):
    rows = []
    for p in pages:
        alts = "\n".join(
            f'    <xhtml:link rel="alternate" hreflang="{c["hreflang"]}" href="{page_url(d, p)}"/>'
            for d, c in domains_for(p).items())
        if DEFAULT_DOMAIN in domains_for(p):
            alts += f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{page_url(DEFAULT_DOMAIN, p)}"/>'
        prio = "1.0" if p == "index.html" else "0.8"
        rows.append(f"  <url>\n    <loc>{page_url(domain, p)}</loc>\n{alts}\n    <priority>{prio}</priority>\n  </url>")
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
            'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(rows) + "\n</urlset>\n")


FOOTER_LABELS = {
    "wifi-qr-code-generator.html": "WiFi QR Code",
    "vcard-qr-code-generator.html": "vCard / Business Card QR",
    "linkedin-qr-code-generator.html": "LinkedIn QR Code",
    "instagram-qr-code-generator.html": "Instagram QR Code",
    "google-review-qr-code-generator.html": "Google Review QR Code",
    "qr-code-menu-generator.html": "QR Code Menu",
    "pdf-to-qr-code.html": "PDF to QR Code",
}
_LABELS_FILE = json.loads((ROOT / "footer_labels.json").read_text(encoding="utf-8")) if (ROOT / "footer_labels.json").exists() else {}
FOOTER_LABELS.update(_LABELS_FILE.get("*", {}))


def write_footer_links(out, domain, pages):
    """Footer only links to pages that exist on this domain."""
    labels = {**FOOTER_LABELS, **_LABELS_FILE.get(domain, {})}
    if domain == "smartqrcraft.de":
        labels = {k: v for k, v in labels.items() if k in _LABELS_FILE.get(domain, {})}
    order = [p for p in FOOTER_PRIORITY if p in pages and p in labels]
    order += [p for p in pages if p in labels and p not in order]
    lines = "".join(
        f"      '<li><a href=\"' + base + '{p}\">{labels[p]}</a></li>' +\n"
        for p in order[:FOOTER_MAX])
    f = out / "assets" / "components.js"
    js = f.read_text(encoding="utf-8")
    js = re.sub(r"(/\*TOOLLINKS\*/\n).*?(\s*/\*ENDTOOLLINKS\*/)", lambda m: m.group(1) + lines + m.group(2), js, flags=re.S)
    f.write_text(js, encoding="utf-8")


def prune_links(out, domain_pages):
    """Remove links to pages that do not exist on this domain (list items are dropped, inline links become text)."""
    present = set(domain_pages)
    li = re.compile(r'<li><a href="([^"#?]+\.html)(?:[#?][^"]*)?">.*?</a></li>', re.S)
    inline = re.compile(r'<a href="([^"#?]+\.html)(?:[#?][^"]*)?"[^>]*>(.*?)</a>', re.S)
    for p in domain_pages:
        f = out / p
        h = f.read_text(encoding="utf-8")
        new = li.sub(lambda m: m.group(0) if m.group(1) in present else "", h)
        new = inline.sub(lambda m: m.group(0) if m.group(1) in present else m.group(2), new)
        if new != h:
            f.write_text(new, encoding="utf-8")


ICON_FILES = ["favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "site.webmanifest"]
ICON_TAGS = (
    '<link rel="icon" href="favicon.svg" type="image/svg+xml">' + chr(10) +
    '<link rel="icon" href="favicon.ico" sizes="48x48">' + chr(10) +
    '<link rel="apple-touch-icon" href="apple-touch-icon.png">' + chr(10) +
    '<link rel="manifest" href="site.webmanifest">' + chr(10)
)


def add_icons(out):
    """Copy the icon files to the site root and reference them from every page."""
    for name in ICON_FILES:
        src = SRC / name
        if src.exists():
            shutil.copy2(src, out / name)
    for f in out.glob("*.html"):
        h = f.read_text(encoding="utf-8")
        if 'rel="icon"' not in h and "</head>" in h:
            f.write_text(h.replace("</head>", ICON_TAGS + "</head>", 1), encoding="utf-8")


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    shared = sorted(SHARED)
    shared.sort(key=lambda n: (n != "index.html", n))
    for domain, cfg in DOMAINS.items():
        out = DIST / domain
        shutil.copytree(SRC / "assets", out / "assets")
        local = local_pages(domain)
        domain_pages = [p for p in shared if has_page(domain, p) and p not in local]
        for p in domain_pages:
            (out / p).write_text(build_page(domain, cfg, SRC / p), encoding="utf-8")
        for p in local:
            (out / p).write_text(build_page(domain, cfg, LOCAL / domain / p), encoding="utf-8")
            domain_pages.append(p)
        domain_pages.sort(key=lambda n: (n != "index.html", n))
        prune_links(out, domain_pages)
        domain_pages.append(build_hub(out, domain, cfg, list(domain_pages)))
        add_icons(out)
        write_footer_links(out, domain, domain_pages)
        (out / "sitemap.xml").write_text(
            build_sitemap(domain, [p for p in domain_pages if p not in NOT_IN_SITEMAP]), encoding="utf-8")
        (out / "robots.txt").write_text(
            f"User-agent: *{chr(10)}Allow: /{chr(10)}{chr(10)}Sitemap: https://{domain}/sitemap.xml{chr(10)}", encoding="utf-8")
        print(f"built dist/{domain} ({len(domain_pages)} pages)")


if __name__ == "__main__":
    main()
