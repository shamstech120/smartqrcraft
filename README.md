# SmartQRCraft

Free QR code and barcode tools, built as **four separate static sites**, one per domain.

## The four sites (ready to upload, one folder each)

| Folder | Domain | Language |
|---|---|---|
| `sites/smartqrcraft.com` | smartqrcraft.com | English (US) |
| `sites/smartqrcraft.in` | smartqrcraft.in | English (India) |
| `sites/smartqrcraft.de` | smartqrcraft.de | German |
| `sites/smartqrcraft.co.uk` | smartqrcraft.co.uk | English (UK) |

Each folder is a complete website with its own pages, `sitemap.xml`, `robots.txt` and `assets/`.
When you host a domain, point it at its own folder.

**The `sites/` folders are generated. Do not edit them by hand.** Change the source and rebuild.

## Source (edit these)

| Path | What it is |
|---|---|
| `site/` | Shared pages and assets (`assets/app.js`, `qr-engine.js`, `styles.css`, ...) |
| `pages_*.py` | Page content. `pages_in*.py` = India, `pages_de.py` = Germany, others are shared |
| `pages/<domain>/` | Generated pages that belong to one domain only |
| `countries/*.json` | **One file per country**: domain, language, hreflang, currency, which shared pages to skip, meta overrides, footer labels |
| `build.py` | Builds `sites/<domain>/` for every domain (hreflang, sitemaps, footers, icons) |
| `gen_pages.py` | Turns the `pages_*.py` content into HTML |
| `qa.py` | Checks links, assets, titles, descriptions, hreflang and sitemaps |
| `research/` | Keyword research CSVs (US, UK, India, Germany) |

## Run it on your computer

Double-click `start-all.bat`. It builds, runs the checks, and opens the four sites:

- http://localhost:8610 (.com)
- http://localhost:8611 (.in)
- http://localhost:8612 (.de)
- http://localhost:8613 (.co.uk)

Or by hand:

```
python gen_pages.py
python build.py
python qa.py
```

## Before launch

Fill every `[PLACEHOLDER ...]` / `[PLATZHALTER ...]` in the legal and trust pages
(`pages_trust.py`, `pages_de.py`): Impressum, Datenschutz, Privacy, Terms, About, Contact.
Have the legal pages reviewed by a qualified professional. Those pages are set to `noindex` until you do.

Third-party code bundled in `site/assets/` is listed in `site/assets/THIRD-PARTY.txt`.
Verify the license of `qrcode-lib.js` before launch.

## Add a new country

1. Create `countries/<code>.json` (copy `uk.json` and change `domain`, `lang`, `hreflang`, `og_locale`, `currency`, `order`).
2. `skip_pages` lists the shared pages that must NOT exist on that domain (for example the US-only pages).
3. English-language countries are done at this point. For another language, add its UI strings
   (copy `site/assets/i18n-de.js`) and write its pages in `pages_<code>.py` with `"domain": "<domain>"`.
4. Run `python build.py && python qa.py`. hreflang tags and sitemaps on every other site update by themselves.

Country-specific features (for example UPI for India, GiroCode for Germany) are just pages that exist only
on that domain, so nothing else needs to change.

## App (accounts, dynamic QR codes, admin)

`apps/app/` is a separate local prototype: one app for all four domains, see `apps/app/README.md`.
Run it with `node apps/app/server.mjs` and open http://localhost:8700/login.
