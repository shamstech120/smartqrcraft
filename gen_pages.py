#!/usr/bin/env python3
"""Generate the type-specific landing pages into site/ (run before build.py).

Each page is a dict in PAGES (see pages_content.py). site/index.html,
wifi-qr-code-generator.html and vcard-qr-code-generator.html stay hand-authored.
"""
import html
import json
import re
from pathlib import Path

from pages_content import PAGES as _BASE_PAGES
from pages_more import MORE
from pages_in import IN_PAGES
from pages_in2 import IN_PAGES_2
from pages_de import DE_PAGES
from pages_tools import TOOLS_SHARED, TOOLS_DE
from pages_tools2 import TOOLS2_SHARED, TOOLS2_DE
from pages_pay import US_PAGES, LOGO_SHARED, DE_PAY
from pages_links import LINK_SHARED, LINK_US
from pages_trust import TRUST_SHARED, TRUST_DE
from pages_articles import ARTICLES
from pages_core import CORE
from pages_types import TYPES_SHARED
from pages_in3 import IN_PAGES_3
from pages_guides import GUIDES
from pages_tools3 import TOOLS3_SHARED
from pages_de2 import DE_PAGES_2
from pages_de3 import DE_PAGES_3
from pages_in4 import IN4_SHARED, IN4_LOCAL

PAGES = _BASE_PAGES + MORE + IN_PAGES + IN_PAGES_2 + DE_PAGES + TOOLS_SHARED + TOOLS_DE + TOOLS2_SHARED + TOOLS2_DE + US_PAGES + LOGO_SHARED + DE_PAY + LINK_SHARED + LINK_US + TRUST_SHARED + TRUST_DE + ARTICLES + CORE + TYPES_SHARED + IN_PAGES_3 + GUIDES + TOOLS3_SHARED + DE_PAGES_2 + DE_PAGES_3 + IN4_SHARED + IN4_LOCAL

ROOT = Path(__file__).parent
SITE = ROOT / "site"
CONTENT = ROOT / "content"  # country-only pages: content/<country code>/, served by the one app
COUNTRY_OF = {json.loads(f.read_text(encoding="utf-8"))["domain"]: f.stem for f in (ROOT / "countries").glob("*.json") if not f.name.startswith("_")}
DEFAULT = "smartqrcraft.com"
CHEVRON = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2"/></svg>'
ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="color:var(--violet)"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.8"/><path d="M14 14h3v3M21 14v.01M14 21h.01M17.5 21H21v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
P = 'style="color:var(--muted);line-height:1.7;margin-bottom:16px"'

UI = {
    "en": {
        "home": "Home", "badge": "100% Free · No Signup Required", "pill": "Instant · Free Vector Output",
        "color": "QR Color", "bg": "Background", "style": "QR Style", "eye": "Eye Style",
        "frame": "Frame &amp; CTA", "logo": "Center Logo", "logohint": "Upload a square logo (PNG/JPG).",
        "png": "Download PNG", "svg": "Download SVG", "help": "Need help?",
        "privacy": "Your QR code is generated locally in your browser. Nothing is uploaded to a server.",
        "faq": "FAQ", "related": "Related QR code tools",
        "cta_h": "Need a different QR code?", "cta_p": "Explore WiFi, vCard, menu, URL and more on the main generator.",
        "cta_b": "Go to Full Generator", "tabs": "QR code type",
        "sc_pill": "Runs in your browser", "sc_choose": "Choose image", "sc_cam": "Use camera", "sc_stop": "Stop camera",
        "sc_drop": "Drop an image with a QR code here, paste a screenshot, or use your camera.",
        "sc_drop_test": "Drop an image of your QR code here, or paste a screenshot. We check whether it still scans when it is small, blurry or low contrast.",
        "sc_privacy": "Your image and camera stay on your device. Nothing is uploaded to a server.",
    },
    "de": {
        "home": "Startseite", "badge": "100 % kostenlos · ohne Anmeldung", "pill": "Sofort · Vektor-Download inklusive",
        "color": "QR-Farbe", "bg": "Hintergrund", "style": "QR-Stil", "eye": "Eckmuster",
        "frame": "Rahmen &amp; Aufforderung", "logo": "Logo in der Mitte", "logohint": "Quadratisches Logo hochladen (PNG/JPG).",
        "png": "PNG herunterladen", "svg": "SVG herunterladen", "help": "Hilfe",
        "privacy": "Dein QR-Code wird lokal in deinem Browser erstellt. Es werden keine Daten an einen Server gesendet.",
        "faq": "FAQ", "related": "Weitere QR-Code Tools",
        "cta_h": "Du brauchst einen anderen QR-Code?", "cta_p": "WLAN, Visitenkarte, Link und mehr findest du im vollständigen Generator.",
        "cta_b": "Zum vollständigen Generator", "tabs": "QR-Code Art",
        "sc_pill": "Läuft im Browser", "sc_choose": "Bild auswählen", "sc_cam": "Kamera verwenden", "sc_stop": "Kamera stoppen",
        "sc_drop": "Ziehe ein Bild mit einem QR-Code hierher, füge einen Screenshot ein oder nutze deine Kamera.",
        "sc_drop_test": "Ziehe ein Bild deines QR-Codes hierher oder füge einen Screenshot ein. Wir prüfen, ob er auch klein, unscharf oder kontrastarm noch scannt.",
        "sc_privacy": "Bild und Kamera bleiben auf deinem Gerät. Es wird nichts an einen Server gesendet.",
    },
}


def e(s):
    return html.escape(s, quote=True)


def paras(items):
    return "\n      ".join(f"<p {P}>{p}</p>" for p in items)


def render_section(sec):
    kind = sec["kind"]
    if kind == "prose":
        h = f'<h2 style="font-size:26px">{sec["h2"]}</h2>'
        body = paras(sec.get("p", []))
        extra = ""
        if sec.get("steps"):
            extra += '<ol style="color:var(--muted);line-height:1.8;margin:0 0 16px 20px">' + "".join(
                f"<li>{s}</li>" for s in sec["steps"]) + "</ol>"
        if sec.get("bullets"):
            extra += '<ul style="color:var(--muted);line-height:1.8;margin:0 0 16px 20px">' + "".join(
                f"<li>{s}</li>" for s in sec["bullets"]) + "</ul>"
        if sec.get("after"):
            extra += paras(sec["after"])
        return (f'  <section{" id=" + chr(34) + sec["id"] + chr(34) if sec.get("id") else ""}>\n'
                f'    <div class="wrap" style="max-width:760px">\n'
                f'      <div class="section-head" style="text-align:left;margin-bottom:24px">{h}</div>\n'
                f'      {body}\n      {extra}\n    </div>\n  </section>\n')
    if kind == "table":
        head = "".join(f'<th style="text-align:left;padding:10px 12px;border-bottom:2px solid var(--border)">{c}</th>' for c in sec["cols"])
        rows = "".join(
            "<tr>" + "".join(f'<td style="padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:top">{c}</td>' for c in r) + "</tr>"
            for r in sec["rows"])
        intro = paras(sec.get("p", []))
        return (f'  <section>\n    <div class="wrap" style="max-width:860px">\n'
                f'      <div class="section-head" style="text-align:left;margin-bottom:24px"><h2 style="font-size:26px">{sec["h2"]}</h2></div>\n'
                f'      {intro}\n'
                f'      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14.5px;color:var(--muted);line-height:1.6"><thead><tr>{head}</tr></thead><tbody>{rows}</tbody></table></div>\n'
                f'    </div>\n  </section>\n')
    if kind == "cards":
        cards = "".join(
            f'<div class="card"><div><h3>{c[0]}</h3><p>{c[1]}</p></div></div>' for c in sec["cards"])
        return (f'  <section class="bg-lavender">\n    <div class="wrap">\n'
                f'      <div class="section-head"><span class="eyebrow">{sec["eyebrow"]}</span><h2>{sec["h2"]}</h2></div>\n'
                f'      <div class="card-grid">{cards}</div>\n    </div>\n  </section>\n')
    if kind == "gallery":
        items = "".join(
            f'<figure class="card" style="text-align:center;margin:0"><img src="{g["img"]}" alt="{e(g["alt"])}" width="160" height="160" loading="lazy" style="width:160px;height:auto;margin:0 auto 10px">'
            f'<figcaption><h3>{g["h3"]}</h3><p>{g["p"]}</p>'
            + (f'<p style="margin-top:8px"><a href="{g["href"]}">{g["label"]}</a></p>' if g.get("href") else "")
            + '</figcaption></figure>' for g in sec["items"])
        intro = paras(sec.get("p", []))
        return (f'  <section class="bg-lavender">\n    <div class="wrap">\n'
                f'      <div class="section-head"><h2>{sec["h2"]}</h2></div>\n      <div style="max-width:760px;margin:0 auto">{intro}</div>\n'
                f'      <div class="card-grid">{items}</div>\n    </div>\n  </section>\n')
    if kind == "cta":
        return (f'  <section>\n    <div class="wrap" style="max-width:760px"><div class="final-cta" style="margin:8px 0">'
                f'<h2>{sec["h2"]}</h2><p>{sec["p"]}</p><a href="{sec["href"]}" class="btn btn-primary">{sec["label"]}</a></div></div>\n  </section>\n')
    raise ValueError(kind)


def render_static(page):
    lang = page.get("lang", "en")
    U = UI.get(lang[:2], UI["en"])
    BASE = "https://" + page.get("domain", DEFAULT)
    url = f"{BASE}/" + ("" if page["slug"] == "index.html" else page["slug"])
    i18n_tag = '<script src="assets/i18n-de.js"></script>' + chr(10) if lang.startswith("de") else ""
    sections = chr(10).join(render_section(sec) for sec in page["sections"])
    robots = '<meta name="robots" content="noindex,follow">' + chr(10) if page.get("noindex", True) else ""
    ld = ""
    faq_html = ""
    if page.get("faq"):
        plain = lambda x: re.sub(r"<[^>]+>", "", x)
        faq_ld = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": plain(a)}} for q, a in page["faq"]]
        data = {"@context": "https://schema.org", "@graph": [
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": U["home"], "item": f"{BASE}/"},
                {"@type": "ListItem", "position": 2, "name": page["crumb"], "item": url}]},
            {"@type": "FAQPage", "mainEntity": faq_ld}]}
        ld = '<script type="application/ld+json">' + chr(10) + json.dumps(data, indent=2, ensure_ascii=False) + chr(10) + "</script>"
        items = (chr(10) + "        ").join(
            f'<div class="faq-item"><button class="faq-q" aria-expanded="false">{e(q)}{CHEVRON}</button><div class="faq-a"><p>{a}</p></div></div>'
            for q, a in page["faq"])
        faq_html = (f'  <section id="faq"><div class="wrap"><div class="section-head"><span class="eyebrow">{U["faq"]}</span>'
                    f'<h2>{e(page.get("faq_h2", U["faq"]))}</h2></div><div class="faq">{items}</div></div></section>')
    related_html = ""
    if page.get("related"):
        rel = "".join(f'<li><a href="{h}">{tx}</a></li>' for h, tx in page["related"])
        related_html = (f'  <section><div class="wrap" style="max-width:760px"><div class="section-head" style="text-align:left;margin-bottom:16px">'
                        f'<h2 style="font-size:22px">{U["related"]}</h2></div><ul style="color:var(--muted);line-height:2;margin-left:20px">{rel}</ul></div></section>')
    og = ""
    if not page.get("noindex", True):
        og = (f'<meta property="og:type" content="article">{chr(10)}<meta property="og:title" content="{e(page.get("og_title", page["title"]))}">{chr(10)}'
              f'<meta property="og:description" content="{e(page.get("og_description", page["description"]))}">{chr(10)}<meta property="og:url" content="{url}">{chr(10)}')
    lead = f'<p class="lead" style="margin-top:12px;color:var(--muted);line-height:1.7">{page["lead"]}</p>' if page.get("lead") else ""
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(page["title"])}</title>
<meta name="description" content="{e(page["description"])}">
{robots}<link rel="canonical" href="{url}">
{og}<meta property="og:site_name" content="SmartQRCraft">
<meta name="theme-color" content="#6D28D9">
<link rel="stylesheet" href="assets/styles.css">
{ld}
</head>
<body data-base="">
<div id="site-header"></div>
<main>
  <div class="wrap breadcrumbs">
    <a href="index.html">{U["home"]}</a><span class="sep">/</span><span class="current">{e(page["crumb"])}</span>
  </div>
  <section><div class="wrap" style="max-width:760px"><h1 style="font-size:34px;line-height:1.2;margin-bottom:8px">{page["h1"]}</h1>{lead}</div></section>
{sections}
{faq_html}
{related_html}
</main>
<div id="site-footer"></div>
{i18n_tag}<script src="assets/components.js"></script>
</body>
</html>
'''

def generator_block(page, U, types, lock):
    preset = "".join(f' data-{k}="{e(page[k])}"' for k in ("fg", "frame", "style") if page.get(k))
    return f'''      <div class="generator qr-generator" id="qr-builder" data-types="{types}" data-default="{page["type"]}" data-lock="{lock}" data-label="{e(page["field_label"])}" data-placeholder="{e(page["field_placeholder"])}"{preset}>
        <div class="generator-head">
          <h2>{ICON}{e(page["tool_name"])}</h2>
          <span class="status-pill"><span class="status-dot"></span>{U["pill"]}</span>
        </div>
        <div class="type-tabs" role="tablist" aria-label="{U["tabs"]}"></div>
        <div class="builder-body">
          <div class="builder-col">
            <div class="field-container"></div>
            <div class="two-col">
              <div class="option-card"><h3>{U["color"]}</h3><div class="swatches color-swatches"></div></div>
              <div class="option-card"><h3>{U["bg"]}</h3><div class="swatches bg-swatches"></div></div>
            </div>
            <div class="two-col">
              <div class="option-card"><h3>{U["style"]}</h3><div class="pill-group style-pills"></div></div>
              <div class="option-card"><h3>{U["eye"]}</h3><div class="pill-group eye-pills"></div></div>
            </div>
            <div class="two-col">
              <div class="option-card">
                <div class="toggle-row"><h3 style="margin:0">{U["frame"]}</h3><label class="switch"><input type="checkbox" class="frame-toggle"><span class="slider"></span></label></div>
                <input type="text" class="frame-input" value="{e(page["cta"])}" disabled placeholder="{e(page["cta"])}" style="width:100%;padding:9px 12px;border-radius:10px;border:1px solid var(--border);font-size:13px">
              </div>
              <div class="option-card">
                <div class="toggle-row"><h3 style="margin:0">{U["logo"]}</h3><label class="switch"><input type="checkbox" class="logo-toggle"><span class="slider"></span></label></div>
                <input type="file" class="logo-file visually-hidden" accept="image/png,image/jpeg,image/svg+xml">
                <p class="field-hint" style="margin:0">{U["logohint"]}</p>
              </div>
            </div>
          </div>
          <div class="preview-col">
            <div class="preview-frame">
              <div class="preview-canvas-wrap">
                <canvas id="qr-canvas" width="480" height="480" aria-label="{e(page["tool_name"])} preview"></canvas>
                <div class="empty-state" style="display:none;width:220px;height:220px;align-items:center;justify-content:center;text-align:center;color:var(--muted);font-size:13px;padding:12px">{e(page["empty"])}</div>
              </div>
              <div class="download-row">
                <button type="button" class="btn btn-primary dl-png" disabled>{U["png"]}</button>
                <div class="download-sub">
                  <button type="button" class="btn dl-svg" disabled>{U["svg"]}</button>
                  <a class="btn" href="#faq">{U["help"]}</a>
                </div>
              </div>
              <p class="privacy-note">{U["privacy"]}</p>
            </div>
          </div>
        </div>
      </div>'''


def scanner_block(page, U):
    mode = page["widget"]
    cam = (f'<button type="button" class="btn btn-primary sc-cam">{U["sc_cam"]}</button>'
           f'<button type="button" class="btn sc-stop" style="display:none">{U["sc_stop"]}</button>') if mode == "scan" else ""
    return f'''<div class="generator qr-scanner" id="qr-builder" data-mode="{mode}">
        <div class="generator-head">
          <h2>{ICON}{e(page["tool_name"])}</h2>
          <span class="status-pill"><span class="status-dot"></span>{U["sc_pill"]}</span>
        </div>
        <div class="sc-drop">
          <p>{U["sc_drop_test"] if mode == "test" else U["sc_drop"]}</p>
          <div class="sc-btns">
            <label class="btn {"" if mode == "scan" else "btn-primary"}" style="cursor:pointer">{U["sc_choose"]}<input type="file" class="sc-file visually-hidden" accept="image/*"></label>
            {cam}
          </div>
          <video class="sc-video" muted playsinline></video>
        </div>
        <img class="sc-preview" alt="">
        <p class="sc-status" role="status" aria-live="polite"></p>
        <div class="sc-result" aria-live="polite"></div>
        <p class="privacy-note" style="margin-top:14px">{U["sc_privacy"]}</p>
      </div>'''


def render(page):
    lang = page.get("lang", "en")
    U = UI.get(lang[:2], UI["en"])
    types = page.get("types") or page["type"]
    lock = "true" if page.get("lock", True) else "false"
    i18n_tag = '<script src="assets/i18n-de.js"></script>' + chr(10) if lang.startswith("de") else ""
    widget = page.get("widget")
    NL = chr(10)
    if widget in ("scan", "test"):
        tool_html = scanner_block(page, U)
        scripts = ("<script src=\"assets/jsqr.js\"></script>" + NL + "<script src=\"assets/scanner.js\"></script>" + NL)
        app_tag = ""
    elif widget == "bulk":
        tool_html = '<div class="generator qr-bulk" id="qr-builder"></div>'
        scripts = ("<script src=\"assets/qrcode-lib.js\"></script>" + NL + "<script src=\"assets/qr-engine.js\"></script>" + NL +
                   "<script src=\"assets/zip.js\"></script>" + NL + "<script src=\"assets/bulk.js\"></script>" + NL)
        app_tag = ""
    elif widget == "embed":
        tool_html = '<div class="generator qr-embed" id="qr-builder"></div>'
        scripts = "<script src=\"assets/embed-builder.js\"></script>" + NL
        app_tag = ""
    elif widget == "print":
        tool_html = f'<div class="generator qr-print" id="qr-builder" data-template="{page.get("template", "tent")}"></div>'
        scripts = ("<script src=\"assets/qrcode-lib.js\"></script>" + NL + "<script src=\"assets/qr-engine.js\"></script>" + NL +
                   "<script src=\"assets/print.js\"></script>" + NL)
        app_tag = ""
    elif widget == "barcode":
        tool_html = '<div class="generator qr-barcode" id="qr-builder"></div>'
        scripts = ("<script src=\"assets/jsbarcode.js\"></script>" + NL + "<script src=\"assets/zip.js\"></script>" + NL +
                   "<script src=\"assets/barcode.js\"></script>" + NL)
        app_tag = ""
    else:
        tool_html = generator_block(page, U, types, lock)
        scripts = ("<script src=\"assets/qrcode-lib.js\"></script>" + NL + "<script src=\"assets/qr-engine.js\"></script>" + NL)
        app_tag = "<script src=\"assets/app.js\"></script>"
    slug = page["slug"]
    BASE = "https://" + page.get("domain", DEFAULT)
    url = f"{BASE}/" + ("" if slug == "index.html" else slug)
    faq_ld = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in page["faq"]]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": U["home"], "item": f"{BASE}/"},
            {"@type": "ListItem", "position": 2, "name": page["crumb"], "item": url}]},
        {"@type": "FAQPage", "mainEntity": faq_ld}]}
    faq_html = "\n        ".join(
        f'<div class="faq-item"><button class="faq-q" aria-expanded="false">{e(q)}{CHEVRON}</button><div class="faq-a"><p>{e(a)}</p></div></div>'
        for q, a in page["faq"])
    sections = "\n".join(render_section(s) for s in page["sections"])
    related = "".join(f'<li><a href="{h}">{t}</a></li>' for h, t in page.get("related", []))
    related_html = (
        f'  <section>\n    <div class="wrap" style="max-width:760px">\n'
        f'      <div class="section-head" style="text-align:left;margin-bottom:16px"><h2 style="font-size:22px">{U["related"]}</h2></div>\n'
        f'      <ul style="color:var(--muted);line-height:2;margin-left:20px">{related}</ul>\n    </div>\n  </section>\n') if related else ""
    return f'''<!doctype html>
<html lang="{page.get("lang", "en")}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(page["title"])}</title>
<meta name="description" content="{e(page["description"])}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{e(page["og_title"])}">
<meta property="og:description" content="{e(page["og_description"])}">
<meta property="og:url" content="{url}">
<meta property="og:site_name" content="SmartQRCraft">
<meta name="theme-color" content="#6D28D9">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css">
<script type="application/ld+json">
{json.dumps(ld, indent=2, ensure_ascii=False)}
</script>
</head>
<body data-base="">
<div id="site-header"></div>

<main>
  <div class="wrap breadcrumbs">
    <a href="index.html">{U["home"]}</a><span class="sep">/</span><span class="current">{e(page["crumb"])}</span>
  </div>

  <section class="hero" id="generator" style="padding-top:32px">
    <div class="wrap">
      <div class="hero-head">
        <span class="trust-badge"><span class="trust-dot"></span>{U["badge"]}</span>
        <h1>{page["h1"]}</h1>
        <p class="lead">{page["lead"]}</p>
      </div>

{tool_html}
    </div>
  </section>

{sections}
  <section id="faq">
    <div class="wrap">
      <div class="section-head"><span class="eyebrow">{U["faq"]}</span><h2>{e(page["faq_h2"])}</h2></div>
      <div class="faq">
        {faq_html}
      </div>
    </div>
  </section>

{related_html}  <section>
    <div class="wrap">
      <div class="final-cta">
        <h2>{U["cta_h"]}</h2>
        <p>{U["cta_p"]}</p>
        <a href="index.html#generator" class="btn btn-primary">{U["cta_b"]}</a>
      </div>
    </div>
  </section>
</main>

<div id="site-footer"></div>
{i18n_tag}{scripts}<script src="assets/components.js"></script>
{app_tag}
</body>
</html>
'''


def main():
    for page in PAGES:
        domain = page.get("domain", DEFAULT)
        out = SITE if domain == DEFAULT else CONTENT / COUNTRY_OF[domain]
        out.mkdir(parents=True, exist_ok=True)
        html_out = render_static(page) if page.get("static") else render(page)
        (out / page["slug"]).write_text(html_out, encoding="utf-8")
        print(f"wrote {out.relative_to(ROOT)}/{page['slug']}")


if __name__ == "__main__":
    main()
