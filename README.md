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
