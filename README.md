# SmartQRCraft

Free QR code and barcode tools, plus accounts with dynamic QR codes.

## The rule: one of everything

**One GitHub repo, one application, one database, one user account system.**
There is no folder, repo, signup or database per country.

The domains (smartqrcraft.com, .co.uk, .in, .de) all point at the **same app**. The app reads the
request's `Host` and picks the country from `countries/*.json`. A country is **config + content**, never copied code.

| Request | What the app does |
|---|---|
| `smartqrcraft.de/` | Country `de`: German pages, German footer, `lang="de"`, canonical and hreflang for .de |
| `smartqrcraft.com/wifi-qr-code-generator.html` | Country `us` |
| `www.smartqrcraft.co.uk/...` | 301 to `smartqrcraft.co.uk/...` |
| `/login`, `/dashboard`, `/admin`, `/api/...` | The same app and the same accounts on every domain |
| `/r/<slug>` | Dynamic QR short links (printed codes use one host, `BASE_URL`) |
| `/sitemap.xml`, `/robots.txt` | Made per country on request |

Sign-in cookies belong to the domain you signed in on (browsers never share cookies between .de and .com),
so a person signs in once per domain, **with the same account**.

## Where things live

| Path | What it is |
|---|---|
| `apps/app/` | **The application**: `server.mjs` (entry), `src/site.mjs` (website by Host), `src/handler.mjs` (API, sign-in, short links, admin), `src/db.mjs`, `db/migrations/` |
| `countries/*.json` | **Country config**: domain, language, hreflang, currency, pages to skip, meta overrides, footer labels |
| `countries/_common.json` | Settings shared by all countries (default domain, footer order, hub text, ...) |
| `site/` | Shared page content and assets (`assets/app.js`, `qr-engine.js`, `styles.css`, ...) |
| `content/<code>/` | Country-only page content (for example `content/de/`, `content/in/`) |
| `pages_*.py` + `gen_pages.py` | Page text; `python gen_pages.py` writes it to `site/` and `content/<code>/` |
| `widgets/embed-core.js` | The embeddable widget; the app serves it bundled as `/embed.js` |
| `research/` | Keyword research CSVs |

## Run it on your computer

Double-click `start-all.bat`, or:

```
python gen_pages.py
node --test --no-warnings "apps/app/test/*.test.mjs"
node apps/app/server.mjs
```

Then open (all served by the one server on port 8700):

- http://localhost:8700 (US), http://uk.localhost:8700, http://in.localhost:8700, http://de.localhost:8700
- http://localhost:8700/login (sign in works on every one of them)

The tests check every page of every country (titles, descriptions, canonicals, hreflang, links, assets,
sitemaps) plus sign-in, plans, teams and short links.

## Add a new country

1. Create `countries/<code>.json` (copy `uk.json`; change `domain`, `lang`, `hreflang`, `og_locale`, `currency`, `order`).
2. `skip_pages` lists shared pages that must not exist there. `own_pages_only: true` uses only `content/<code>/`.
3. Another language: add UI strings (copy `site/assets/i18n-de.js`) and pages in `pages_<code>.py` with `"domain": "<domain>"`.
4. Point the new domain at the app. Nothing else changes; hreflang and sitemaps on all domains update themselves.

## Deploy (later)

One deployment of `apps/app` with every domain attached to it (for example one Cloudflare Worker with four
custom domains, or one Node server). Set `BASE_URL` to the short-link domain and `ADMIN_EMAILS`.
See `apps/app/README.md`.

## Before launch

Fill every `[PLACEHOLDER ...]` / `[PLATZHALTER ...]` in the legal and trust pages
(`pages_trust.py`, `pages_de.py`) and have them reviewed. Those pages are `noindex` until then.
Third-party code is listed in `site/assets/THIRD-PARTY.txt`.
