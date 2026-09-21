// All API routes as one function: handle(Request, env) -> Response.
// It uses only web-standard Request/Response, so the same file runs in Node now and in a Cloudflare Worker later.
import crypto from "node:crypto";

const DAY = 86400;
const now = () => Math.floor(Date.now() / 1000);
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const newToken = () => crypto.randomBytes(32).toString("base64url");
const SLUG_CHARS = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
const fail = (status, error, message) => json({ error, message: message || error }, status);
const redirect = (location, headers = {}) => new Response(null, { status: 302, headers: { location, "cache-control": "no-store", ...headers } });

const page = (status, title, text) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<meta name="robots" content="noindex"><title>${title}</title>` +
      `<style>body{font-family:system-ui,sans-serif;background:#faf8ff;color:#131b2e;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px}` +
      `main{max-width:460px;text-align:center}h1{font-size:24px}p{color:#5b6478;line-height:1.6}</style></head>` +
      `<body><main><h1>${title}</h1><p>${text}</p></main></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } }
  );

function cookies(req) {
  const out = {};
  (req.headers.get("cookie") || "").split(";").forEach((p) => {
    const i = p.indexOf("=");
    if (i > 0) {
      try { out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim()); } catch { /* ignore bad cookie */ }
    }
  });
  return out;
}

function clientIp(req) {
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-client-ip") || "unknown";
}

function deviceClass(ua) {
  ua = ua || "";
  if (/bot|crawl|spider|slurp|preview|facebookexternalhit|headless|curl|wget|python-requests|monitor/i.test(ua)) return "bot";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

// ---------- validation ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isPrivateHost(host) {
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (host === "[::1]" || host.startsWith("[")) return true; // IPv6 literals are not allowed
  const m = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return true;
  }
  return false;
}

async function isBlockedHost(env, host) {
  const parts = host.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    const candidate = parts.slice(i).join(".");
    if (await env.db.get("select 1 as x from blocked_domains where domain = ?", [candidate])) return true;
  }
  return false;
}

async function validateDestination(env, raw) {
  if (typeof raw !== "string") return { error: "Enter a link that starts with http:// or https://." };
  const value = raw.trim();
  if (value.length > 2048) return { error: "That link is too long (2048 characters maximum)." };
  let url;
  try { url = new URL(value); } catch { return { error: "That does not look like a valid link." }; }
  if (url.protocol !== "http:" && url.protocol !== "https:") return { error: "Only http:// and https:// links are allowed." };
  if (url.username || url.password) return { error: "Links with a username or password are not allowed." };
  const host = url.hostname.toLowerCase();
  if (isPrivateHost(host)) return { error: "Links to local or private addresses are not allowed." };
  if (url.origin === env.origin && url.pathname.startsWith("/r/")) return { error: "A QR code cannot point at another QR code." };
  if (await isBlockedHost(env, host)) return { error: "That website is blocked because it was reported for abuse." };
  return { url: url.href };
}

async function rateLimited(env, key, max, windowSec) {
  const since = now() - windowSec;
  const row = await env.db.get("select count(*) as n from auth_attempts where key = ? and ts > ?", [key, since]);
  if (row.n >= max) return true;
  await env.db.run("insert into auth_attempts(key, ts) values (?, ?)", [key, now()]);
  return false;
}

// ---------- session ----------
async function currentUser(env, req) {
  const t = cookies(req).sqc_session;
  if (!t) return null;
  const row = await env.db.get(
    "select u.* from sessions s join users u on u.id = s.user_id where s.token_hash = ? and s.expires_at > ?",
    [sha(t), now()]
  );
  // Admin rights come from the allowlist on every request, so removing an email takes effect immediately.
  if (row) row.is_admin = env.adminEmails.has(row.email) ? 1 : 0;
  return row;
}

function sessionCookie(env, value, maxAge) {
  return `sqc_session=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${env.secure ? "; Secure" : ""}`;
}

async function readJson(req) {
  try { return await req.json(); } catch { return null; }
}

function publicQr(env, q) {
  return {
    id: q.id, slug: q.slug, label: q.label, destination: q.destination, active: !!q.active,
    created_at: q.created_at, updated_at: q.updated_at, scans: q.scans ?? 0, url: `${env.baseUrl}/r/${q.slug}`,
  };
}

async function audit(env, admin, action, target) {
  await env.db.run("insert into audit_log(ts, admin_id, action, target) values (?, ?, ?, ?)", [now(), admin.id, action, String(target ?? "")]);
}

async function makeSlug(env) {
  for (let i = 0; i < 8; i++) {
    const bytes = crypto.randomBytes(7);
    let s = "";
    for (const b of bytes) s += SLUG_CHARS[b % SLUG_CHARS.length];
    if (!(await env.db.get("select 1 as x from qrs where slug = ?", [s]))) return s;
  }
  throw new Error("could not create a unique slug");
}

const QR_SELECT = "select q.*, (select count(*) from scans s where s.qr_id = q.id and s.is_bot = 0) as scans from qrs q";

// ---------- main entry ----------
export async function handle(req, env) {
  const url = new URL(req.url);
  const method = req.method;
  const p = url.pathname;

  if (p === "/healthz") return json({ ok: true });

  // ----- public redirect: the scan itself -----
  let m = p.match(/^\/r\/([A-Za-z0-9]{4,32})$/);
  if (m && (method === "GET" || method === "HEAD")) {
    const q = await env.db.get("select q.*, u.banned as user_banned from qrs q join users u on u.id = q.user_id where q.slug = ?", [m[1]]);
    if (!q) return page(404, "QR code not found", "This QR code does not exist. It may have been deleted.");
    if (!q.active || q.user_banned) return page(410, "This QR code is disabled", "The owner or an administrator turned this code off.");
    let host = "";
    try { host = new URL(q.destination).hostname.toLowerCase(); } catch { /* handled below */ }
    if (!host || (await isBlockedHost(env, host))) return page(410, "This link was blocked", "The destination of this QR code was reported for abuse.");
    if (method === "GET") {
      const device = deviceClass(req.headers.get("user-agent"));
      const c = (req.headers.get("cf-ipcountry") || "").toUpperCase();
      const country = /^[A-Z]{2}$/.test(c) && c !== "XX" && c !== "T1" ? c : null;
      await env.db.run("insert into scans(qr_id, ts, country, device, is_bot) values (?, ?, ?, ?, ?)", [q.id, now(), country, device, device === "bot" ? 1 : 0]);
    }
    return new Response(null, { status: 302, headers: { location: q.destination, "cache-control": "no-store", "x-robots-tag": "noindex" } });
  }

  if (!p.startsWith("/api/")) return fail(404, "not_found");

  // ----- CSRF: browsers always send Origin on cross-site writes -----
  if (method !== "GET" && method !== "HEAD") {
    const origin = req.headers.get("origin");
    if (origin && origin !== env.origin) return fail(403, "bad_origin", "Cross-site requests are not allowed.");
  }

  // ----- sign in -----
  if (p === "/api/auth/request" && method === "POST") {
    const body = await readJson(req);
    const email = String(body?.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 254) return fail(400, "bad_email", "Enter a valid email address.");
    if ((await rateLimited(env, `ip:${clientIp(req)}`, 10, 900)) || (await rateLimited(env, `em:${email}`, 5, 900)))
      return fail(429, "rate_limited", "Too many attempts. Please wait a few minutes and try again.");
    const t = newToken();
    await env.db.run("insert into login_tokens(token_hash, email, expires_at) values (?, ?, ?)", [sha(t), email, now() + 900]);
    const link = `${env.baseUrl}/api/auth/verify?token=${t}`;
    await env.sendMail(email, link);
    // The reply is identical for every address, so it cannot be used to find out who has an account.
    const out = { ok: true, message: "If that address is valid, a sign-in link is on its way. It works once and expires in 15 minutes." };
    if (env.dev) out.devLink = link;
    return json(out);
  }

  if (p === "/api/auth/verify" && method === "GET") {
    const t = url.searchParams.get("token") || "";
    const row = t ? await env.db.get("select * from login_tokens where token_hash = ?", [sha(t)]) : null;
    if (!row || row.used || row.expires_at < now()) return redirect("/login?error=expired");
    const claimed = await env.db.run("update login_tokens set used = 1 where token_hash = ? and used = 0", [row.token_hash]);
    if (claimed.changes !== 1) return redirect("/login?error=expired");
    let user = await env.db.get("select * from users where email = ?", [row.email]);
    const admin = env.adminEmails.has(row.email) ? 1 : 0;
    if (!user) {
      const r = await env.db.run("insert into users(email, created_at, last_login_at, is_admin) values (?, ?, ?, ?)", [row.email, now(), now(), admin]);
      user = await env.db.get("select * from users where id = ?", [r.lastId]);
    } else {
      await env.db.run("update users set last_login_at = ?, is_admin = ? where id = ?", [now(), admin, user.id]);
      user.is_admin = admin;
    }
    if (user.banned) return redirect("/login?error=banned");
    const s = newToken();
    await env.db.run("insert into sessions(token_hash, user_id, created_at, expires_at) values (?, ?, ?, ?)", [sha(s), user.id, now(), now() + 30 * DAY]);
    return redirect(user.is_admin ? "/admin" : "/dashboard", { "set-cookie": sessionCookie(env, s, 30 * DAY) });
  }

  if (p === "/api/auth/logout" && method === "POST") {
    const t = cookies(req).sqc_session;
    if (t) await env.db.run("delete from sessions where token_hash = ?", [sha(t)]);
    return json({ ok: true }, 200, { "set-cookie": sessionCookie(env, "", 0) });
  }

  // ----- everything below needs a signed-in, not-banned user -----
  const user = await currentUser(env, req);
  if (!user) return fail(401, "unauthorized", "Please sign in.");
  if (user.banned) return fail(403, "banned", "This account has been disabled.");

  if (p === "/api/me" && method === "GET")
    return json({ email: user.email, is_admin: !!user.is_admin, free_limit: env.freeLimit });

  // ----- my QR codes -----
  if (p === "/api/qrs" && method === "GET") {
    const rows = await env.db.all(`${QR_SELECT} where q.user_id = ? order by q.id desc`, [user.id]);
    return json({ qrs: rows.map((q) => publicQr(env, q)), limit: user.is_admin ? null : env.freeLimit });
  }

  if (p === "/api/qrs" && method === "POST") {
    const body = await readJson(req);
    if (!body) return fail(400, "bad_json");
    const label = String(body.label ?? "").trim().slice(0, 80);
    const dest = await validateDestination(env, body.destination);
    if (dest.error) return fail(400, "bad_destination", dest.error);
    if (!user.is_admin) {
      const n = (await env.db.get("select count(*) as n from qrs where user_id = ?", [user.id])).n;
      if (n >= env.freeLimit) return fail(403, "limit", `The free plan includes ${env.freeLimit} dynamic QR codes. Delete one to make room.`);
    }
    const slug = await makeSlug(env);
    const r = await env.db.run("insert into qrs(user_id, slug, label, destination, created_at, updated_at) values (?, ?, ?, ?, ?, ?)", [user.id, slug, label, dest.url, now(), now()]);
    const q = await env.db.get(`${QR_SELECT} where q.id = ?`, [r.lastId]);
    return json({ qr: publicQr(env, q) }, 201);
  }

  m = p.match(/^\/api\/qrs\/(\d+)(\/stats)?$/);
  if (m) {
    const id = Number(m[1]);
    const q = await env.db.get(`${QR_SELECT} where q.id = ? and q.user_id = ?`, [id, user.id]); // only the owner
    if (!q) return fail(404, "not_found", "QR code not found.");

    if (m[2] && method === "GET") {
      const t0 = now();
      const total = q.scans;
      const last7 = (await env.db.get("select count(*) as n from scans where qr_id = ? and is_bot = 0 and ts > ?", [id, t0 - 7 * DAY])).n;
      const last30 = (await env.db.get("select count(*) as n from scans where qr_id = ? and is_bot = 0 and ts > ?", [id, t0 - 30 * DAY])).n;
      const perDay = await env.db.all("select strftime('%Y-%m-%d', ts, 'unixepoch') as day, count(*) as n from scans where qr_id = ? and is_bot = 0 and ts > ? group by day", [id, t0 - 30 * DAY]);
      const map = Object.fromEntries(perDay.map((r) => [r.day, r.n]));
      const days = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date((t0 - i * DAY) * 1000).toISOString().slice(0, 10);
        days.push({ day: d, n: map[d] || 0 });
      }
      const countries = await env.db.all("select coalesce(country, 'Unknown') as name, count(*) as n from scans where qr_id = ? and is_bot = 0 group by name order by n desc limit 10", [id]);
      const devices = await env.db.all("select coalesce(device, 'Unknown') as name, count(*) as n from scans where qr_id = ? and is_bot = 0 group by name order by n desc", [id]);
      return json({ total, last7, last30, days, countries, devices });
    }

    if (!m[2] && method === "PATCH") {
      const body = await readJson(req);
      if (!body) return fail(400, "bad_json");
      let { label, destination, active } = q;
      if (body.label !== undefined) label = String(body.label).trim().slice(0, 80);
      if (body.destination !== undefined) {
        const dest = await validateDestination(env, body.destination);
        if (dest.error) return fail(400, "bad_destination", dest.error);
        destination = dest.url;
      }
      if (body.active !== undefined) active = body.active ? 1 : 0;
      await env.db.run("update qrs set label = ?, destination = ?, active = ?, updated_at = ? where id = ?", [label, destination, active, now(), id]);
      const fresh = await env.db.get(`${QR_SELECT} where q.id = ?`, [id]);
      return json({ qr: publicQr(env, fresh) });
    }

    if (!m[2] && method === "DELETE") {
      await env.db.run("delete from qrs where id = ?", [id]);
      return json({ ok: true });
    }
    return fail(405, "method_not_allowed");
  }

  // ----- admin -----
  if (p.startsWith("/api/admin/")) {
    if (!user.is_admin) return fail(403, "forbidden", "Administrators only.");

    if (p === "/api/admin/summary" && method === "GET") {
      const c = async (sql, prm = []) => (await env.db.get(sql, prm)).n;
      return json({
        users: await c("select count(*) as n from users"),
        new_users_7d: await c("select count(*) as n from users where created_at > ?", [now() - 7 * DAY]),
        qrs: await c("select count(*) as n from qrs"),
        scans: await c("select count(*) as n from scans where is_bot = 0"),
        banned: await c("select count(*) as n from users where banned = 1"),
        blocked_domains: await c("select count(*) as n from blocked_domains"),
      });
    }

    if (p === "/api/admin/users" && method === "GET") {
      const q = (url.searchParams.get("q") || "").trim().toLowerCase();
      const rows = await env.db.all(
        `select u.id, u.email, u.created_at, u.last_login_at, u.banned, u.is_admin,
                (select count(*) from qrs where user_id = u.id) as qrs,
                (select count(*) from scans s join qrs x on x.id = s.qr_id where x.user_id = u.id and s.is_bot = 0) as scans
           from users u where u.email like ? escape '\\' order by u.id desc limit 200`,
        [`%${q.replace(/[\\%_]/g, "\\$&")}%`]
      );
      return json({ users: rows.map((u) => ({ ...u, is_admin: env.adminEmails.has(u.email) ? 1 : 0 })) });
    }

    m = p.match(/^\/api\/admin\/users\/(\d+)(\/ban)?$/);
    if (m) {
      const target = await env.db.get("select * from users where id = ?", [Number(m[1])]);
      if (!target) return fail(404, "not_found");
      if (target.id === user.id) return fail(400, "self", "You cannot do that to your own account.");
      if (m[2] && method === "POST") {
        const body = await readJson(req);
        const banned = body?.banned ? 1 : 0;
        await env.db.run("update users set banned = ? where id = ?", [banned, target.id]);
        if (banned) await env.db.run("delete from sessions where user_id = ?", [target.id]);
        await audit(env, user, banned ? "ban_user" : "unban_user", target.email);
        return json({ ok: true });
      }
      if (!m[2] && method === "DELETE") {
        await env.db.run("delete from users where id = ?", [target.id]); // qrs, scans, sessions go with it
        await audit(env, user, "delete_user", target.email);
        return json({ ok: true });
      }
      return fail(405, "method_not_allowed");
    }

    if (p === "/api/admin/qrs" && method === "GET") {
      const rows = await env.db.all(`select q.*, u.email as owner,
          (select count(*) from scans s where s.qr_id = q.id and s.is_bot = 0) as scans
          from qrs q join users u on u.id = q.user_id order by q.id desc limit 200`);
      return json({ qrs: rows.map((q) => ({ ...publicQr(env, q), owner: q.owner })) });
    }

    m = p.match(/^\/api\/admin\/qrs\/(\d+)\/active$/);
    if (m && method === "POST") {
      const body = await readJson(req);
      const active = body?.active ? 1 : 0;
      const r = await env.db.run("update qrs set active = ?, updated_at = ? where id = ?", [active, now(), Number(m[1])]);
      if (!r.changes) return fail(404, "not_found");
      await audit(env, user, active ? "enable_qr" : "disable_qr", m[1]);
      return json({ ok: true });
    }

    if (p === "/api/admin/blocked" && method === "GET")
      return json({ blocked: await env.db.all("select * from blocked_domains order by created_at desc") });

    if (p === "/api/admin/blocked" && method === "POST") {
      const body = await readJson(req);
      const domain = String(body?.domain ?? "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) return fail(400, "bad_domain", "Enter a domain like example.com.");
      await env.db.run("insert or replace into blocked_domains(domain, reason, created_at) values (?, ?, ?)", [domain, String(body?.reason ?? "").slice(0, 200), now()]);
      await audit(env, user, "block_domain", domain);
      return json({ ok: true }, 201);
    }

    m = p.match(/^\/api\/admin\/blocked\/([a-z0-9.-]+)$/);
    if (m && method === "DELETE") {
      await env.db.run("delete from blocked_domains where domain = ?", [m[1]]);
      await audit(env, user, "unblock_domain", m[1]);
      return json({ ok: true });
    }

    if (p === "/api/admin/audit" && method === "GET")
      return json({ log: await env.db.all("select a.ts, a.action, a.target, u.email as admin from audit_log a left join users u on u.id = a.admin_id order by a.id desc limit 100") });
  }

  return fail(404, "not_found");
}
