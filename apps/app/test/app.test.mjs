import test from "node:test";
import assert from "node:assert/strict";
import { openDb } from "../src/db.mjs";
import { handle } from "../src/handler.mjs";
import { makeEnv } from "../server.mjs";

const BASE = "http://localhost:8700";

function newEnv(extra = {}) {
  return makeEnv({ db: openDb(":memory:"), baseUrl: BASE, dev: true, adminEmails: ["admin@example.com"], sendMail: async () => {}, ...extra });
}

async function call(env, method, path, { body, cookie, headers = {} } = {}) {
  const h = { ...headers };
  if (cookie) h.cookie = cookie;
  if (body !== undefined) h["content-type"] = "application/json";
  const res = await handle(new Request(BASE + path, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body), redirect: "manual" }), env);
  let data = null;
  const text = await res.text();
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data, res };
}

async function signIn(env, email, ip = "1.1.1.1") {
  const r = await call(env, "POST", "/api/auth/request", { body: { email }, headers: { "x-client-ip": ip } });
  assert.equal(r.status, 200);
  const v = await handle(new Request(r.data.devLink, { redirect: "manual" }), env);
  assert.equal(v.status, 302);
  const cookie = v.headers.getSetCookie()[0].split(";")[0];
  return { cookie, location: v.headers.get("location") };
}

test("sign in with an email link creates an account and a session", async () => {
  const env = newEnv();
  const { cookie, location } = await signIn(env, "Alice@Example.com");
  assert.equal(location, "/dashboard");
  const me = await call(env, "GET", "/api/me", { cookie });
  assert.equal(me.status, 200);
  assert.equal(me.data.email, "alice@example.com"); // normalised
  assert.equal(me.data.is_admin, false);
});

test("session cookie is HttpOnly and SameSite", async () => {
  const env = newEnv();
  const r = await call(env, "POST", "/api/auth/request", { body: { email: "a@example.com" } });
  const v = await handle(new Request(r.data.devLink, { redirect: "manual" }), env);
  const c = v.headers.getSetCookie()[0];
  assert.match(c, /HttpOnly/);
  assert.match(c, /SameSite=Lax/);
});

test("a sign-in link works only once", async () => {
  const env = newEnv();
  const r = await call(env, "POST", "/api/auth/request", { body: { email: "a@example.com" } });
  const first = await handle(new Request(r.data.devLink, { redirect: "manual" }), env);
  assert.equal(first.headers.get("location"), "/dashboard");
  const second = await handle(new Request(r.data.devLink, { redirect: "manual" }), env);
  assert.equal(second.headers.get("location"), "/login?error=expired");
});

test("an expired or invalid link is rejected", async () => {
  const env = newEnv();
  const r = await call(env, "POST", "/api/auth/request", { body: { email: "a@example.com" } });
  await env.db.run("update login_tokens set expires_at = 1");
  const v = await handle(new Request(r.data.devLink, { redirect: "manual" }), env);
  assert.equal(v.headers.get("location"), "/login?error=expired");
  const bad = await handle(new Request(BASE + "/api/auth/verify?token=nonsense", { redirect: "manual" }), env);
  assert.equal(bad.headers.get("location"), "/login?error=expired");
});

test("the sign-in reply does not reveal whether an account exists", async () => {
  const env = newEnv();
  await signIn(env, "known@example.com");
  const a = await call(env, "POST", "/api/auth/request", { body: { email: "known@example.com" }, headers: { "x-client-ip": "2.2.2.2" } });
  const b = await call(env, "POST", "/api/auth/request", { body: { email: "stranger@example.com" }, headers: { "x-client-ip": "3.3.3.3" } });
  assert.equal(a.status, b.status);
  assert.equal(a.data.message, b.data.message);
});

test("sign-in requests are rate limited per email", async () => {
  const env = newEnv();
  const codes = [];
  for (let i = 0; i < 7; i++) codes.push((await call(env, "POST", "/api/auth/request", { body: { email: "spam@example.com" }, headers: { "x-client-ip": `9.9.9.${i}` } })).status);
  assert.deepEqual(codes.slice(0, 5), [200, 200, 200, 200, 200]);
  assert.equal(codes[5], 429);
});

test("invalid email is rejected", async () => {
  const env = newEnv();
  assert.equal((await call(env, "POST", "/api/auth/request", { body: { email: "not-an-email" } })).status, 400);
});

test("API requires sign in", async () => {
  const env = newEnv();
  assert.equal((await call(env, "GET", "/api/qrs")).status, 401);
  assert.equal((await call(env, "POST", "/api/qrs", { body: { destination: "https://example.com" } })).status, 401);
});

test("cross-site writes are refused (CSRF)", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const r = await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com" }, headers: { origin: "https://evil.example" } });
  assert.equal(r.status, 403);
});

test("create, list, edit and delete a dynamic QR code", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const c = await call(env, "POST", "/api/qrs", { cookie, body: { label: "Menu", destination: "https://example.com/menu" } });
  assert.equal(c.status, 201);
  assert.match(c.data.qr.url, /^http:\/\/localhost:8700\/r\/[A-Za-z0-9]{7}$/);
  const list = await call(env, "GET", "/api/qrs", { cookie });
  assert.equal(list.data.qrs.length, 1);
  const p = await call(env, "PATCH", `/api/qrs/${c.data.qr.id}`, { cookie, body: { destination: "https://example.com/new-menu", label: "New" } });
  assert.equal(p.data.qr.destination, "https://example.com/new-menu");
  const d = await call(env, "DELETE", `/api/qrs/${c.data.qr.id}`, { cookie });
  assert.equal(d.status, 200);
  assert.equal((await call(env, "GET", "/api/qrs", { cookie })).data.qrs.length, 0);
});

test("the free plan is limited, and deleting frees a slot", async () => {
  const env = newEnv({ freeLimit: 2 });
  const { cookie } = await signIn(env, "a@example.com");
  const mk = () => call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com/x" } });
  const a = await mk(), b = await mk();
  assert.equal(a.status, 201);
  assert.equal(b.status, 201);
  const third = await mk();
  assert.equal(third.status, 403);
  assert.equal(third.data.error, "limit");
  await call(env, "DELETE", `/api/qrs/${a.data.qr.id}`, { cookie });
  assert.equal((await mk()).status, 201);
});

test("unsafe or private destinations are rejected", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const bad = ["javascript:alert(1)", "data:text/html,hi", "ftp://example.com", "http://localhost:3000", "http://127.0.0.1/", "http://10.0.0.5/", "http://192.168.1.1/",
    "http://169.254.169.254/latest/meta-data", "https://user:pass@example.com", "not a url", "http://[::1]/", "http://intranet.local/", `${BASE}/r/abcdefg`, "x".repeat(2100)];
  for (const dest of bad) {
    const r = await call(env, "POST", "/api/qrs", { cookie, body: { destination: dest } });
    assert.equal(r.status, 400, `should reject ${dest.slice(0, 40)}`);
  }
  assert.equal((await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com/ok?a=1" } })).status, 201);
});

test("scanning redirects and counts humans, not bots", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com/landing" } })).data.qr;
  const scan = (ua, country) => handle(new Request(q.url, { headers: { "user-agent": ua, ...(country ? { "cf-ipcountry": country } : {}) }, redirect: "manual" }), env);
  const r = await scan("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Mobile/15E148", "DE");
  assert.equal(r.status, 302);
  assert.equal(r.headers.get("location"), "https://example.com/landing");
  await scan("Mozilla/5.0 (Windows NT 10.0) Chrome/120", "US");
  await scan("Mozilla/5.0 (Linux; Android 14) Mobile Safari", "IN");
  await scan("Googlebot/2.1 (+http://www.google.com/bot.html)", "US");
  const s = await call(env, "GET", `/api/qrs/${q.id}/stats`, { cookie });
  assert.equal(s.data.total, 3); // the bot is not counted
  assert.equal(s.data.last7, 3);
  assert.equal(s.data.days.length, 30);
  assert.deepEqual(s.data.devices.map((d) => d.name).sort(), ["desktop", "mobile"]);
  assert.deepEqual(s.data.countries.map((d) => d.name).sort(), ["DE", "IN", "US"]);
  const listed = await call(env, "GET", "/api/qrs", { cookie });
  assert.equal(listed.data.qrs[0].scans, 3);
});

test("no IP address is stored with scans", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com" } })).data.qr;
  await handle(new Request(q.url, { headers: { "x-client-ip": "203.0.113.9", "cf-connecting-ip": "203.0.113.9" }, redirect: "manual" }), env);
  const cols = await env.db.all("pragma table_info(scans)");
  assert.deepEqual(cols.map((c) => c.name).sort(), ["city", "country", "device", "id", "is_bot", "qr_id", "ts"]);
});

test("changing the destination changes where the printed code goes", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com/one" } })).data.qr;
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { destination: "https://example.com/two" } });
  const r = await handle(new Request(q.url, { redirect: "manual" }), env);
  assert.equal(r.headers.get("location"), "https://example.com/two");
});

test("a disabled QR code and unknown codes do not redirect", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com" } })).data.qr;
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { active: false } });
  assert.equal((await handle(new Request(q.url, { redirect: "manual" }), env)).status, 410);
  assert.equal((await handle(new Request(BASE + "/r/zzzzzzz", { redirect: "manual" }), env)).status, 404);
});

test("users cannot see or change each other's QR codes", async () => {
  const env = newEnv();
  const a = await signIn(env, "a@example.com", "4.4.4.4");
  const b = await signIn(env, "b@example.com", "5.5.5.5");
  const q = (await call(env, "POST", "/api/qrs", { cookie: a.cookie, body: { destination: "https://example.com" } })).data.qr;
  assert.equal((await call(env, "GET", "/api/qrs", { cookie: b.cookie })).data.qrs.length, 0);
  assert.equal((await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie: b.cookie, body: { destination: "https://evil.example" } })).status, 404);
  assert.equal((await call(env, "DELETE", `/api/qrs/${q.id}`, { cookie: b.cookie })).status, 404);
  assert.equal((await call(env, "GET", `/api/qrs/${q.id}/stats`, { cookie: b.cookie })).status, 404);
});

test("admin pages are for administrators only", async () => {
  const env = newEnv();
  const user = await signIn(env, "a@example.com", "6.6.6.6");
  const admin = await signIn(env, "admin@example.com", "7.7.7.7");
  assert.equal(admin.location, "/admin");
  assert.equal((await call(env, "GET", "/api/admin/users", { cookie: user.cookie })).status, 403);
  assert.equal((await call(env, "GET", "/api/admin/users")).status, 401);
  assert.equal((await call(env, "GET", "/api/admin/users", { cookie: admin.cookie })).status, 200);
  assert.equal((await call(env, "GET", "/api/admin/summary", { cookie: admin.cookie })).data.users, 2);
});

test("admin can ban a user: sessions end and their QR codes stop working", async () => {
  const env = newEnv();
  const user = await signIn(env, "a@example.com", "6.6.6.6");
  const admin = await signIn(env, "admin@example.com", "7.7.7.7");
  const q = (await call(env, "POST", "/api/qrs", { cookie: user.cookie, body: { destination: "https://example.com" } })).data.qr;
  const users = (await call(env, "GET", "/api/admin/users", { cookie: admin.cookie })).data.users;
  const target = users.find((u) => u.email === "a@example.com");
  assert.equal((await call(env, "POST", `/api/admin/users/${target.id}/ban`, { cookie: admin.cookie, body: { banned: true } })).status, 200);
  assert.equal((await call(env, "GET", "/api/me", { cookie: user.cookie })).status, 401); // session removed
  assert.equal((await handle(new Request(q.url, { redirect: "manual" }), env)).status, 410);
  const again = await call(env, "POST", "/api/auth/request", { body: { email: "a@example.com" }, headers: { "x-client-ip": "8.8.8.8" } });
  const v = await handle(new Request(again.data.devLink, { redirect: "manual" }), env);
  assert.equal(v.headers.get("location"), "/login?error=banned");
  const log = (await call(env, "GET", "/api/admin/audit", { cookie: admin.cookie })).data.log;
  assert.equal(log[0].action, "ban_user");
  assert.equal(log[0].admin, "admin@example.com");
});

test("admin can delete a user and everything they own", async () => {
  const env = newEnv();
  const user = await signIn(env, "a@example.com", "6.6.6.6");
  const admin = await signIn(env, "admin@example.com", "7.7.7.7");
  const q = (await call(env, "POST", "/api/qrs", { cookie: user.cookie, body: { destination: "https://example.com" } })).data.qr;
  await handle(new Request(q.url, { redirect: "manual" }), env);
  const target = (await call(env, "GET", "/api/admin/users", { cookie: admin.cookie })).data.users.find((u) => u.email === "a@example.com");
  assert.equal((await call(env, "DELETE", `/api/admin/users/${target.id}`, { cookie: admin.cookie })).status, 200);
  assert.equal((await env.db.get("select count(*) as n from qrs")).n, 0);
  assert.equal((await env.db.get("select count(*) as n from scans")).n, 0);
  assert.equal((await env.db.get("select count(*) as n from users where email = 'a@example.com'")).n, 0);
});

test("admin cannot ban or delete their own account", async () => {
  const env = newEnv();
  const admin = await signIn(env, "admin@example.com", "7.7.7.7");
  const me = (await call(env, "GET", "/api/admin/users", { cookie: admin.cookie })).data.users[0];
  assert.equal((await call(env, "POST", `/api/admin/users/${me.id}/ban`, { cookie: admin.cookie, body: { banned: true } })).status, 400);
  assert.equal((await call(env, "DELETE", `/api/admin/users/${me.id}`, { cookie: admin.cookie })).status, 400);
});

test("blocked domains stop new and existing QR codes", async () => {
  const env = newEnv();
  const user = await signIn(env, "a@example.com", "6.6.6.6");
  const admin = await signIn(env, "admin@example.com", "7.7.7.7");
  const q = (await call(env, "POST", "/api/qrs", { cookie: user.cookie, body: { destination: "https://phish.example.net/login" } })).data.qr;
  assert.equal((await call(env, "POST", "/api/admin/blocked", { cookie: admin.cookie, body: { domain: "https://example.net/whatever", reason: "phishing" } })).status, 201);
  assert.equal((await handle(new Request(q.url, { redirect: "manual" }), env)).status, 410); // parent domain matches subdomains
  const again = await call(env, "POST", "/api/qrs", { cookie: user.cookie, body: { destination: "https://a.b.example.net/" } });
  assert.equal(again.status, 400);
  await call(env, "DELETE", "/api/admin/blocked/example.net", { cookie: admin.cookie });
  assert.equal((await handle(new Request(q.url, { redirect: "manual" }), env)).status, 302);
});

test("admin allowlist is checked on every sign in (removing an admin removes access)", async () => {
  const env = newEnv();
  await signIn(env, "admin@example.com", "7.7.7.7");
  env.adminEmails.delete("admin@example.com");
  const again = await signIn(env, "admin@example.com", "7.7.7.8");
  assert.equal(again.location, "/dashboard");
  assert.equal((await call(env, "GET", "/api/admin/users", { cookie: again.cookie })).status, 403);
});

test("logout removes the session", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  assert.equal((await call(env, "POST", "/api/auth/logout", { cookie })).status, 200);
  assert.equal((await call(env, "GET", "/api/me", { cookie })).status, 401);
});

test("only a hash of each token is stored", async () => {
  const env = newEnv();
  const r = await call(env, "POST", "/api/auth/request", { body: { email: "a@example.com" } });
  const token = new URL(r.data.devLink).searchParams.get("token");
  const rows = await env.db.all("select * from login_tokens");
  assert.equal(rows.length, 1);
  assert.notEqual(rows[0].token_hash, token);
  assert.equal(rows[0].token_hash.length, 64);
});

test("removing an admin from the allowlist ends their admin access immediately (no re-login needed)", async () => {
  const env = newEnv();
  const admin = await signIn(env, "admin@example.com", "7.7.7.7");
  assert.equal((await call(env, "GET", "/api/admin/users", { cookie: admin.cookie })).status, 200);
  env.adminEmails.delete("admin@example.com");
  assert.equal((await call(env, "GET", "/api/admin/users", { cookie: admin.cookie })).status, 403);
  assert.equal((await call(env, "GET", "/api/me", { cookie: admin.cookie })).data.is_admin, false);
});

// ---------- plans, protection, teams ----------
async function setPlan(env, email, plan, until) {
  const admin = await signIn(env, "admin@example.com", "9.9.9.9");
  const users = (await call(env, "GET", "/api/admin/users", { cookie: admin.cookie })).data.users;
  const u = users.find((x) => x.email === email);
  return call(env, "POST", `/api/admin/users/${u.id}/plan`, { cookie: admin.cookie, body: { plan, until } });
}

test("paid features are refused on the free plan and allowed after an admin sets Pro", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com" } })).data.qr;
  assert.equal((await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { password: "secret1" } })).status, 403);
  assert.equal((await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { max_scans: 5 } })).status, 403);
  assert.equal((await call(env, "GET", `/api/qrs/${q.id}/scans.csv`, { cookie })).status, 403);
  assert.equal((await setPlan(env, "a@example.com", "pro")).status, 200);
  const me = await call(env, "GET", "/api/me", { cookie });
  assert.equal(me.data.plan.id, "pro");
  assert.equal((await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { password: "secret1" } })).status, 200);
  // Pro allows more than the free limit
  for (let i = 0; i < 3; i++) assert.equal((await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com/" + i } })).status, 201);
});

test("an expired paid plan falls back to free", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  await setPlan(env, "a@example.com", "pro", Math.floor(Date.now() / 1000) + 3600);
  assert.equal((await call(env, "GET", "/api/me", { cookie })).data.plan.id, "pro");
  await env.db.run("update users set plan_until = ? where email = ?", [Math.floor(Date.now() / 1000) - 10, "a@example.com"]);
  assert.equal((await call(env, "GET", "/api/me", { cookie })).data.plan.id, "free");
});

test("password-protected QR shows a form, refuses a wrong password and redirects with the right one", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  await setPlan(env, "a@example.com", "pro");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com/secret" } })).data.qr;
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { password: "open sesame" } });
  const row = await env.db.get("select password_hash from qrs where id = ?", [q.id]);
  assert.ok(!row.password_hash.includes("open sesame"));
  const form = await handle(new Request(q.url, { redirect: "manual" }), env);
  assert.equal(form.status, 200);
  assert.match(await form.text(), /name="password"/);
  const post = (pw) => handle(new Request(q.url, { method: "POST", redirect: "manual",
    headers: { "content-type": "application/x-www-form-urlencoded", origin: BASE }, body: "password=" + encodeURIComponent(pw) }), env);
  assert.equal((await post("wrong")).status, 401);
  const ok = await post("open sesame");
  assert.equal(ok.status, 303);
  assert.equal(ok.headers.get("location"), "https://example.com/secret");
  // removing the password restores the plain redirect
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { password: "" } });
  assert.equal((await handle(new Request(q.url, { redirect: "manual" }), env)).status, 302);
});

test("password attempts are rate limited", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  await setPlan(env, "a@example.com", "pro");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com" } })).data.qr;
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { password: "right-one" } });
  const post = (pw) => handle(new Request(q.url, { method: "POST", redirect: "manual",
    headers: { "content-type": "application/x-www-form-urlencoded", "x-client-ip": "5.5.5.5" }, body: "password=" + pw }), env);
  for (let i = 0; i < 10; i++) await post("nope" + i);
  const r = await post("right-one");
  assert.equal(r.status, 401);
  assert.match(await r.text(), /Too many attempts/);
});

test("scan limit and expiry date stop a QR code", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  await setPlan(env, "a@example.com", "pro");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com" } })).data.qr;
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { max_scans: 2 } });
  const scan = () => handle(new Request(q.url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (iPhone)" } }), env);
  assert.equal((await scan()).status, 302);
  assert.equal((await scan()).status, 302);
  assert.equal((await scan()).status, 410);
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { max_scans: null } });
  assert.equal((await scan()).status, 302);
  assert.equal((await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { expires_at: 5 } })).status, 400);
  await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie, body: { expires_at: Math.floor(Date.now() / 1000) + 2 } });
  await env.db.run("update qrs set expires_at = ? where id = ?", [Math.floor(Date.now() / 1000) - 1, q.id]);
  assert.equal((await scan()).status, 410);
});

test("CSV export lists scans with city and neutralises formula cells", async () => {
  const env = newEnv();
  const { cookie } = await signIn(env, "a@example.com");
  await setPlan(env, "a@example.com", "pro");
  const q = (await call(env, "POST", "/api/qrs", { cookie, body: { destination: "https://example.com" } })).data.qr;
  await handle(new Request(q.url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (iPhone)", "cf-ipcountry": "DE", "cf-ipcity": "=HYPERLINK(1)" } }), env);
  await handle(new Request(q.url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (iPhone)", "cf-ipcountry": "GB", "cf-ipcity": "London" } }), env);
  const r = await call(env, "GET", `/api/qrs/${q.id}/scans.csv`, { cookie });
  assert.equal(r.status, 200);
  assert.match(r.data, /^time_utc,country,city,device\n/);
  assert.match(r.data, /,GB,London,mobile/);
  assert.match(r.data, /'=HYPERLINK/);
  const s = await call(env, "GET", `/api/qrs/${q.id}/stats`, { cookie });
  assert.equal(s.data.hours.length, 24);
  assert.ok(s.data.cities.some((c) => c.name === "London (GB)"));
});

test("Business teams: invite before signup, editor can edit, viewer cannot, removal ends access", async () => {
  const env = newEnv();
  const owner = await signIn(env, "boss@example.com");
  assert.equal((await call(env, "POST", "/api/team", { cookie: owner.cookie, body: { email: "ed@example.com" } })).status, 403);
  await setPlan(env, "boss@example.com", "business");
  assert.equal((await call(env, "POST", "/api/team", { cookie: owner.cookie, body: { email: "ed@example.com", role: "editor" } })).status, 201);
  assert.equal((await call(env, "POST", "/api/team", { cookie: owner.cookie, body: { email: "vi@example.com", role: "viewer" } })).status, 201);
  const q = (await call(env, "POST", "/api/qrs", { cookie: owner.cookie, body: { destination: "https://example.com" } })).data.qr;
  const ed = await signIn(env, "ed@example.com", "2.2.2.2");
  const vi = await signIn(env, "vi@example.com", "3.3.3.3");
  const me = await call(env, "GET", "/api/me", { cookie: ed.cookie });
  assert.equal(me.data.teams.length, 1);
  const ownerId = me.data.teams[0].owner_id;
  assert.equal((await call(env, "GET", `/api/qrs?owner=${ownerId}`, { cookie: ed.cookie })).data.qrs.length, 1);
  assert.equal((await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie: ed.cookie, body: { label: "by editor" } })).status, 200);
  assert.equal((await call(env, "POST", "/api/qrs", { cookie: ed.cookie, body: { destination: "https://example.org", owner_id: ownerId } })).status, 201);
  assert.equal((await call(env, "DELETE", `/api/qrs/${q.id}`, { cookie: ed.cookie })).status, 403);
  assert.equal((await call(env, "GET", `/api/qrs/${q.id}/stats`, { cookie: vi.cookie })).status, 200);
  assert.equal((await call(env, "PATCH", `/api/qrs/${q.id}`, { cookie: vi.cookie, body: { label: "x" } })).status, 403);
  // outsiders see nothing
  const out = await signIn(env, "out@example.com", "4.4.4.4");
  assert.equal((await call(env, "GET", `/api/qrs?owner=${ownerId}`, { cookie: out.cookie })).status, 404);
  assert.equal((await call(env, "GET", `/api/qrs/${q.id}/stats`, { cookie: out.cookie })).status, 404);
  // downgrade: team access stops
  await setPlan(env, "boss@example.com", "free");
  assert.equal((await call(env, "GET", `/api/qrs?owner=${ownerId}`, { cookie: ed.cookie })).status, 404);
  await setPlan(env, "boss@example.com", "business");
  const members = (await call(env, "GET", "/api/team", { cookie: owner.cookie })).data.members;
  const edRow = members.find((x) => x.email === "ed@example.com");
  assert.equal(edRow.joined, true);
  assert.equal((await call(env, "DELETE", `/api/team/${edRow.id}`, { cookie: owner.cookie })).status, 200);
  assert.equal((await call(env, "GET", `/api/qrs?owner=${ownerId}`, { cookie: ed.cookie })).status, 404);
});

test("only admins can set plans, and plan changes are audited", async () => {
  const env = newEnv();
  const a = await signIn(env, "a@example.com");
  const me = (await call(env, "GET", "/api/me", { cookie: a.cookie })).data;
  assert.equal((await call(env, "POST", `/api/admin/users/${me.id}/plan`, { cookie: a.cookie, body: { plan: "business" } })).status, 403);
  assert.equal((await setPlan(env, "a@example.com", "platinum")).status, 400);
  await setPlan(env, "a@example.com", "business");
  const admin = await signIn(env, "admin@example.com", "9.9.9.8");
  const log = (await call(env, "GET", "/api/admin/audit", { cookie: admin.cookie })).data.log;
  assert.ok(log.some((l) => l.action === "set_plan" && l.target.startsWith("a@example.com -> business")));
});
