// THE SmartQRCraft application: one server for every domain (smartqrcraft.com, .co.uk, .in, .de).
// The Host header picks the country; the website, the app (sign in, dashboard, admin), the API and the
// /r/ short links all live here, with one database and one user account system.
// No dependencies: Node's built-in http + SQLite.
//   node server.mjs      then open http://localhost:8700 (US), http://uk.localhost:8700, http://in.localhost:8700, http://de.localhost:8700
// Settings (environment variables):
//   PORT=8700  BASE_URL=http://localhost:8700  ADMIN_EMAILS=you@example.com,other@example.com
//   DB_PATH=data/dev.sqlite  FREE_QR_LIMIT=2  DEV=1 (prints sign-in links instead of emailing them)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openDb } from "./src/db.mjs";
import { handle } from "./src/handler.mjs";
import { createSite, fileSource } from "./src/site.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

// Optional local settings file (apps/app/.env.local, never committed): one KEY=VALUE per line.
try {
  for (const line of fs.readFileSync(path.join(here, ".env.local"), "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith("#") && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
} catch { /* no local settings file */ }

const PUBLIC = path.join(here, "public");
const ROOT = path.join(here, "..", ".."); // repository root: site/, content/, countries/, widgets/

export function makeEnv(overrides = {}) {
  const port = Number(process.env.PORT || 8700);
  const baseUrl = (overrides.baseUrl || process.env.BASE_URL || `http://localhost:${port}`).replace(/\/$/, "");
  const dev = overrides.dev ?? (process.env.DEV ? process.env.DEV === "1" : baseUrl.startsWith("http://localhost"));
  const site = overrides.site || createSite(fileSource(ROOT), { cache: !dev });
  const hosts = new Set([new URL(baseUrl).host.toLowerCase(), "localhost", "127.0.0.1"]);
  for (const c of site.countries) for (const h of [c.domain, "www." + c.domain, c.code + ".localhost"]) hosts.add(h);
  const env = {
    // in development every request reads the files again, so new or edited pages show up without a restart
    get site() { return dev && !overrides.site ? createSite(fileSource(ROOT), { cache: false }) : site; },
    // true for any host this app answers for (with or without a port)
    isOurHost: (host) => hosts.has(String(host || "").toLowerCase()) || hosts.has(String(host || "").toLowerCase().replace(/:\d+$/, "")),
    db: overrides.db || openDb(process.env.DB_PATH ? path.resolve(process.env.DB_PATH) : path.join(here, "data", "dev.sqlite")),
    baseUrl,
    origin: new URL(baseUrl).origin,
    secure: baseUrl.startsWith("https://"),
    dev,
    freeLimit: Number(overrides.freeLimit ?? process.env.FREE_QR_LIMIT ?? 2),
    adminEmails: new Set((overrides.adminEmails ?? (process.env.ADMIN_EMAILS || "").split(",")).map((e) => e.trim().toLowerCase()).filter(Boolean)),
    async sendMail(email, link) {
      // Production would call an email service here. In development the link is printed in this window.
      console.log(`\n[sign-in link for ${email}]\n${link}\n`);
    },
  };
  if (overrides.sendMail) env.sendMail = overrides.sendMail;
  return env; // not spread: that would freeze the dev-mode `site` getter
}

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".json": "application/json",
};
const SITE_CSP = "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; media-src 'self' blob:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'";
const SECURITY = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "same-origin",
  "x-frame-options": "DENY",
  "content-security-policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
};

// The app's own pages (same on every domain). Everything else is the country website.
const APP_ROUTES = { "/login": "login.html", "/dashboard": "dashboard.html", "/admin": "admin.html" };
function serveApp(pathname) {
  if (!APP_ROUTES[pathname] && !pathname.startsWith("/js/") && pathname !== "/app.css") return null;
  const root = PUBLIC, rel = APP_ROUTES[pathname] || pathname;
  const file = path.resolve(root, "." + path.sep + rel.replace(/^\/+/, ""));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
  const type = TYPES[path.extname(file)] || "application/octet-stream";
  const headers = { "content-type": type, ...SECURITY };
  if (type.startsWith("text/html")) headers["cache-control"] = "no-store";
  return new Response(fs.readFileSync(file), { headers });
}

export function createServer(env) {
  return http.createServer(async (nodeReq, nodeRes) => {
    try {
      const host = String(nodeReq.headers.host || new URL(env.baseUrl).host);
      if (!env.isOurHost(host)) { nodeRes.writeHead(421, { "content-type": "text/plain" }); nodeRes.end("Unknown host."); return; }
      const url = new URL(nodeReq.url, `${env.secure ? "https" : "http"}://${host}`);
      const headers = new Headers();
      for (const [k, v] of Object.entries(nodeReq.headers)) if (v !== undefined) headers.set(k, Array.isArray(v) ? v.join(", ") : v);
      headers.set("x-client-ip", nodeReq.socket.remoteAddress || "unknown");
      const hasBody = !["GET", "HEAD"].includes(nodeReq.method);
      const chunks = [];
      if (hasBody) for await (const c of nodeReq) { chunks.push(c); if (chunks.reduce((n, x) => n + x.length, 0) > 100_000) break; }
      const req = new Request(url, { method: nodeReq.method, headers, body: hasBody ? Buffer.concat(chunks) : undefined });

      let res = null;
      const isGet = nodeReq.method === "GET" || nodeReq.method === "HEAD";
      if (isGet && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/r/")) {
        res = serveApp(url.pathname);
        if (!res) {
          const r = env.site.respond(host, url.pathname);
          if (r) {
            const headers = { "content-type": r.type || "text/plain", ...SECURITY, "content-security-policy": SITE_CSP,
              "cache-control": r.cacheable && !env.dev ? "public, max-age=3600" : "no-cache", ...(r.headers || {}) };
            if (r.country) headers["content-language"] = r.country;
            res = new Response(nodeReq.method === "HEAD" ? null : r.body, { status: r.status, headers });
          } else {
            const nf = env.site.respond(host, "/404.html");
            res = new Response(nf && nf.status === 200 ? nf.body : "Page not found.", { status: 404, headers: { "content-type": nf && nf.status === 200 ? nf.type : "text/plain", ...SECURITY, "content-security-policy": SITE_CSP } });
          }
        }
      }
      if (!res) res = await handle(req, env);

      const out = {};
      res.headers.forEach((v, k) => { out[k] = v; });
      const setCookie = res.headers.getSetCookie?.();
      if (setCookie?.length) out["set-cookie"] = setCookie;
      nodeRes.writeHead(res.status, out);
      nodeRes.end(Buffer.from(await res.arrayBuffer()));
    } catch (e) {
      console.error(e);
      nodeRes.writeHead(500, { "content-type": "application/json" });
      nodeRes.end(JSON.stringify({ error: "server_error" }));
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const env = makeEnv();
  const port = Number(process.env.PORT || 8700);
  createServer(env).listen(port, () => {
    console.log(`SmartQRCraft app: ${env.baseUrl}  (dev mode: ${env.dev ? "on" : "off"})`);
    console.log(env.adminEmails.size ? `Admin emails: ${[...env.adminEmails].join(", ")}` : "No ADMIN_EMAILS set: nobody can open /admin.");
  });
}
