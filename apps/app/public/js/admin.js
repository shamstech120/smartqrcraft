import { api, el, $, fmtDate, toast, requireUser, topbar } from "/js/common.js";

const user = await requireUser();
if (!user.is_admin) { location.href = "/dashboard"; }
topbar(user);

function fill(tableEl, head, rows) {
  tableEl.textContent = "";
  tableEl.appendChild(el("thead", null, el("tr", null, head.map((h) => el("th", null, h)))));
  tableEl.appendChild(el("tbody", null, rows.length ? rows : el("tr", null, el("td", { colspan: head.length, class: "muted" }, "Nothing here yet."))));
}

async function act(fn, done) {
  try { await fn(); if (done) toast(done); await loadAll(); } catch (e) { toast(e.message, true); }
}

async function loadSummary() {
  const s = await api("/api/admin/summary");
  const box = $("#summary");
  box.textContent = "";
  [["Users", s.users], ["New (7 days)", s.new_users_7d], ["QR codes", s.qrs], ["Scans", s.scans], ["Banned users", s.banned], ["Blocked domains", s.blocked_domains]]
    .forEach(([k, v]) => box.appendChild(el("div", { class: "tile" }, el("strong", null, v), el("span", null, k))));
}

async function loadUsers() {
  const { users } = await api("/api/admin/users?q=" + encodeURIComponent($("#search").value));
  fill($("#users"), ["Email", "Joined", "Last sign-in", "QR codes", "Scans", "Status", ""], users.map((u) =>
    el("tr", null,
      el("td", null, u.email, u.is_admin ? el("span", { class: "chip chip-on" }, "admin") : null),
      el("td", null, fmtDate(u.created_at)),
      el("td", null, fmtDate(u.last_login_at)),
      el("td", { class: "num" }, u.qrs),
      el("td", { class: "num" }, u.scans),
      el("td", null, el("span", { class: "chip " + (u.banned ? "chip-off" : "chip-on") }, u.banned ? "Banned" : "Active")),
      el("td", { class: "actions" },
        u.email === user.email ? null : el("button", { class: "btn", type: "button", onclick: () => act(() => api(`/api/admin/users/${u.id}/ban`, { method: "POST", body: { banned: !u.banned } }), u.banned ? "User restored." : "User banned.") }, u.banned ? "Unban" : "Ban"),
        u.email === user.email ? null : el("button", { class: "btn btn-danger", type: "button", onclick: () => {
          if (confirm(`Delete ${u.email} and all their QR codes and scan data? This cannot be undone.`)) act(() => api(`/api/admin/users/${u.id}`, { method: "DELETE" }), "User deleted.");
        } }, "Delete")))));
}

async function loadQrs() {
  const { qrs } = await api("/api/admin/qrs");
  fill($("#qrs"), ["Owner", "Name", "Goes to", "Scans", "Status", ""], qrs.map((q) =>
    el("tr", null,
      el("td", null, q.owner),
      el("td", null, q.label || "-"),
      el("td", { class: "dest" }, q.destination),
      el("td", { class: "num" }, q.scans),
      el("td", null, el("span", { class: "chip " + (q.active ? "chip-on" : "chip-off") }, q.active ? "Active" : "Disabled")),
      el("td", { class: "actions" }, el("button", { class: "btn", type: "button", onclick: () => act(() => api(`/api/admin/qrs/${q.id}/active`, { method: "POST", body: { active: !q.active } }), q.active ? "QR code disabled." : "QR code enabled.") }, q.active ? "Disable" : "Enable")))));
}

async function loadBlocked() {
  const { blocked } = await api("/api/admin/blocked");
  fill($("#blocked"), ["Domain", "Reason", "Added", ""], blocked.map((b) =>
    el("tr", null, el("td", null, b.domain), el("td", null, b.reason || "-"), el("td", null, fmtDate(b.created_at)),
      el("td", { class: "actions" }, el("button", { class: "btn", type: "button", onclick: () => act(() => api(`/api/admin/blocked/${encodeURIComponent(b.domain)}`, { method: "DELETE" }), "Unblocked.") }, "Unblock")))));
}

async function loadAudit() {
  const { log } = await api("/api/admin/audit");
  fill($("#audit"), ["When", "Admin", "Action", "Target"], log.map((l) => el("tr", null, el("td", null, fmtDate(l.ts)), el("td", null, l.admin || "-"), el("td", null, l.action), el("td", null, l.target))));
}

async function loadAll() {
  await Promise.all([loadSummary(), loadUsers(), loadQrs(), loadBlocked(), loadAudit()]);
}

let timer;
$("#search").addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(loadUsers, 250); });
$("#blockForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = $("#blockErr");
  err.hidden = true;
  try {
    await api("/api/admin/blocked", { method: "POST", body: { domain: $("#blockDomain").value, reason: $("#blockReason").value } });
    $("#blockDomain").value = "";
    $("#blockReason").value = "";
    await loadAll();
  } catch (ex) { err.textContent = ex.message; err.hidden = false; }
});

await loadAll();
