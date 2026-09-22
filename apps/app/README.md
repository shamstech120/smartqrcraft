# SmartQRCraft app

**The** application: the website for every country, accounts, dynamic QR codes with scan stats, and the admin panel.
Every domain points here; the Host header picks the country (see the main README).

No packages to install: it uses Node's built-in web server and built-in SQLite.

## Run it

```
cd apps/app
node server.mjs
```

Open http://localhost:8700 (US), http://de.localhost:8700 (Germany), http://in.localhost:8700, http://uk.localhost:8700, or /login on any of them. In test mode no email is sent: the page shows an
"Open the sign-in link" button, and the link is also printed in the terminal.

`apps/app/.env.local` (not committed) holds your settings:

```
ADMIN_EMAILS=admin@example.com      # who may open /admin. Put your own email here.
PORT=8700
```

Sign in with an admin email to see `/admin`.

## Test it

```
cd apps/app
node --test --no-warnings "test/*.test.mjs"
```

34 tests cover sign-in, one-time links, rate limits, CSRF, per-user isolation, the free limit,
destination checks, bot filtering, ban/delete, blocked domains, admin-only access, plans, password-protected
and expiring codes, CSV export and team access.

## What it does

| Area | Details |
|---|---|
| Sign in | Email link, no password. Link works once and expires in 15 minutes. Only a hash of each token is stored. |
| Dynamic QR | The printed code points to `/r/<slug>`. You can change the destination later. Free plan: 2 codes (`FREE_QR_LIMIT`). |
| Scan stats | Total, 7 days, 30 days, per day, countries, devices. Pro/Business add hour of day, cities and CSV export. Bots are not counted. **No IP address is stored.** City comes from Cloudflare's `cf-ipcity` header (turn on "Add visitor location headers" in Cloudflare). |
| Plans | Free (FREE_QR_LIMIT codes), Pro (50 codes, password, expiry/scan limit, detailed stats, CSV), Business (250 codes + 5 team members). Set in `PLANS` in `src/handler.mjs`. **Payments are not connected: an admin sets each user's plan (optionally with an end date) in /admin.** |
| Protection | Password-protected codes (scrypt hash, 10 tries per 15 minutes per person), expiry date, and a maximum number of scans. |
| Teams | Business owners invite people by email as "can edit" or "view only". Invites work before the person has an account. Only the owner can delete codes. Access stops if the owner's plan no longer includes teams. |
| Destinations | Only http/https. Localhost, private addresses, embedded passwords and QR-to-QR loops are refused. |
| Admin | Users, QR codes, ban/unban, delete a user with all their data, block domains, audit log. |

## Not done yet (on purpose)

- **Sending real emails.** `sendMail` in `server.mjs` only prints the link. Production needs an email service.
- **Cloudflare.** The database code in `src/db.mjs` is a small adapter. A D1 version with the same four methods
  (`get`, `all`, `run`, `close`) lets `src/handler.mjs` run unchanged in a Cloudflare Worker.
- **Payments.** Plans exist, but nobody can pay yet. Connect a payment provider (for example Paddle or Stripe) that calls an endpoint to set `plan` and `plan_until`.
- **Privacy policy and terms** must describe what this app stores (email, QR codes, scans by time, country, city and device, team members' emails).
- **Rate limits are simple.** Add stronger abuse protection before a public launch.
