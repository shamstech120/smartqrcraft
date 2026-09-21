// Shared helpers. Everything user-supplied goes in through textContent, never innerHTML.
export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(path, {
    method,
    credentials: "same-origin",
    headers: body !== undefined ? { "content-type": "application/json" } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch { /* not JSON */ }
  if (res.status === 401 && !path.startsWith("/api/auth/") && path !== "/api/me") { location.href = "/login"; }
  if (!res.ok) {
    const err = new Error((data && data.message) || "Something went wrong. Please try again.");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export function el(tag, attrs, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "class") e.className = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue;
    e.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
  }
  return e;
}

export const $ = (sel, root = document) => root.querySelector(sel);

export function fmtDate(ts) {
  if (!ts) return "never";
  return new Date(ts * 1000).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export function toast(text, isError = false) {
  const t = el("div", { class: "toast" + (isError ? " toast-err" : ""), role: "status" }, text);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

export async function requireUser() {
  try {
    return await api("/api/me");
  } catch (e) {
    if (e.status === 401 || e.status === 403) location.href = "/login";
    throw e;
  }
}

export function topbar(user) {
  const bar = el("header", { class: "app-top" },
    el("a", { class: "brand", href: "/dashboard" }, "SmartQRCraft ", el("span", { class: "app-tag" }, "app")),
    el("nav", { class: "app-nav" },
      el("a", { href: "/dashboard" }, "My QR codes"),
      user.is_admin ? el("a", { href: "/admin" }, "Admin") : null,
      el("span", { class: "app-user" }, user.email),
      el("button", { class: "btn", type: "button", onclick: async () => { await api("/api/auth/logout", { method: "POST" }); location.href = "/login"; } }, "Sign out")));
  document.body.prepend(bar);
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    bar.after(el("p", { class: "dev-note" }, "Local test version: the QR codes here point to this computer, so only this computer can scan them until the app is put online."));
  }
}
