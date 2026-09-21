# SmartQRCraft app (local prototype)

Accounts, dynamic QR codes with scan counts, and an admin panel. **This is one app for all four domains.**
The country sites (`.com`, `.in`, `.de`, `.co.uk`) stay as they are and link "Sign in" to this app.

No packages to install: it uses Node's built-in web server and built-in SQLite.

## Run it

```
cd apps/app
node server.mjs
```

Open http://localhost:8700/login. In test mode no email is sent: the page shows an
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
node --test --no-warnings test/app.test.mjs
```

25 tests cover sign-in, one-time links, rate limits, CSRF, per-user isolation, the free limit,
destination checks, bot filtering, ban/delete, blocked domains, and admin-only access.

## What it does

| Area | Details |
|---|---|
| Sign in | Email link, no password. Link works once and expires in 15 minutes. Only a hash of each token is stored. |
| Dynamic QR | The printed code points to `/r/<slug>`. You can change the destination later. Free plan: 2 codes (`FREE_QR_LIMIT`). |
| Scan stats | Total, 7 days, 30 days, per day, countries, devices. Bots are not counted. **No IP address is stored.** |
| Destinations | Only http/https. Localhost, private addresses, embedded passwords and QR-to-QR loops are refused. |
| Admin | Users, QR codes, ban/unban, delete a user with all their data, block domains, audit log. |

## Not done yet (on purpose)

- **Sending real emails.** `sendMail` in `server.mjs` only prints the link. Production needs an email service.
- **Cloudflare.** The database code in `src/db.mjs` is a small adapter. A D1 version with the same four methods
  (`get`, `all`, `run`, `close`) lets `src/handler.mjs` run unchanged in a Cloudflare Worker.
- **Payments / plans.** Only the free limit exists.
- **Privacy policy and terms** must describe what this app stores (email, QR codes, scan counts by country and device).
- **Rate limits are simple.** Add stronger abuse protection before a public launch.
