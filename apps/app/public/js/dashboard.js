import { api, el, $, fmtDate, toast, requireUser, topbar } from "/js/common.js";

const COLOR = "#6D28D9";
const user = await requireUser();
topbar(user);

let limit = null;
let ownerId = user.id; // whose QR codes are shown: mine, or a team I belong to
let role = "owner";
let ownerPlan = user.plan;

function qrCanvas(url, size) {
  const c = document.createElement("canvas");
  window.SmartQR.renderToCanvas(c, url, { fg: COLOR, bg: "#ffffff", size, ecc: "Q", margin: 4, style: "rounded", eyeStyle: "rounded" });
  return c;
}

function download(qr, kind) {
  const name = `qr-${qr.slug}`;
  if (kind === "svg") {
    const svg = window.SmartQR.renderToSVG(qr.url, { fg: COLOR, bg: "#ffffff", size: 1024, ecc: "Q", margin: 4, style: "rounded", eyeStyle: "rounded" });
    window.SmartQR.downloadSVG(svg, name + ".svg");
  } else {
    window.SmartQR.downloadCanvas(qrCanvas(qr.url, 1024), name + ".png", "image/png");
  }
}

function bars(items, label, key, titleFn) {
  const max = Math.max(1, ...items.map((d) => d.n));
  return el("div", { class: "bars", role: "img", "aria-label": label },
    items.map((d) => el("span", { class: "bar", title: titleFn(d), style: `height:${Math.max(2, Math.round((d.n / max) * 100))}%` })));
}

function table(rows, empty) {
  if (!rows.length) return el("p", { class: "muted small" }, empty);
  return el("table", { class: "mini" }, el("tbody", null, rows.map((r) => el("tr", null, el("td", null, r.name), el("td", { class: "num" }, r.n)))));
}

const proBadge = () => el("span", { class: "chip chip-pro" }, "Pro");

async function showStats(qr, box) {
  box.textContent = "";
  box.appendChild(el("p", { class: "muted small" }, "Loading..."));
  try {
    const s = await api(`/api/qrs/${qr.id}/stats`);
    box.textContent = "";
    box.appendChild(el("div", { class: "stat-tiles" },
      el("div", null, el("strong", null, s.total), el("span", null, "total scans")),
      el("div", null, el("strong", null, s.last7), el("span", null, "last 7 days")),
      el("div", null, el("strong", null, s.last30), el("span", null, "last 30 days"))));
    box.appendChild(el("h4", { class: "small" }, "Scans per day, last 30 days"));
    box.appendChild(bars(s.days, "Scans per day over the last 30 days", "day", (d) => `${d.day}: ${d.n}`));
    if (s.detail) {
      box.appendChild(el("h4", { class: "small" }, "Scans by hour of day (UTC)"));
      box.appendChild(bars(s.hours, "Scans by hour of day", "hour", (d) => `${String(d.hour).padStart(2, "0")}:00 UTC: ${d.n}`));
    }
    box.appendChild(el("div", { class: "cols" },
      el("div", null, el("h4", null, "Countries"), table(s.countries, "No scans yet.")),
      el("div", null, el("h4", null, "Devices"), table(s.devices, "No scans yet.")),
      s.detail ? el("div", null, el("h4", null, "Cities"), table(s.cities, "No city data yet. Cities appear once the app runs on the live server.")) : null));
    const foot = el("div", { class: "qr-actions", style: "margin-top:10px" });
    if (s.csv) foot.appendChild(el("a", { class: "btn", href: `/api/qrs/${qr.id}/scans.csv`, download: `scans-${qr.slug}.csv` }, "Download CSV"));
    else foot.appendChild(el("span", { class: "muted small" }, "Hourly stats, cities and CSV export come with ", proBadge(), "."));
    box.appendChild(foot);
    box.appendChild(el("p", { class: "muted small" }, "Search-engine and link-preview robots are not counted. No IP addresses are stored."));
  } catch (e) {
    box.textContent = e.message;
  }
}

function toLocalInput(ts) {
  if (!ts) return "";
  const d = new Date(ts * 1000);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

function protectionBox(qr) {
  const allowed = !!(ownerPlan.password && ownerPlan.expiry);
  const box = el("div", { class: "protect", hidden: true });
  const pw = el("input", { type: "password", autocomplete: "new-password", placeholder: qr.has_password ? "Password is set. Type a new one to change it" : "At least 4 characters", disabled: !allowed });
  const exp = el("input", { type: "datetime-local", value: toLocalInput(qr.expires_at), disabled: !allowed });
  const max = el("input", { type: "number", min: "1", step: "1", value: qr.max_scans ?? "", placeholder: "No limit", disabled: !allowed });
  const save = async () => {
    const body = {
      expires_at: exp.value ? Math.floor(new Date(exp.value).getTime() / 1000) : null,
      max_scans: max.value ? Number(max.value) : null,
    };
    if (pw.value) body.password = pw.value;
    try { await api(`/api/qrs/${qr.id}`, { method: "PATCH", body }); toast("Protection saved."); await load(); } catch (e) { toast(e.message, true); }
  };
  const removePw = async () => {
    try { await api(`/api/qrs/${qr.id}`, { method: "PATCH", body: { password: "" } }); toast("Password removed."); await load(); } catch (e) { toast(e.message, true); }
  };
  box.append(
    allowed ? null : el("p", { class: "notice" }, "Passwords, expiry dates and scan limits are part of the ", proBadge(), " and Business plans."),
    el("div", { class: "row" },
      el("div", { class: "field grow" }, el("label", null, "Password (people must enter it after scanning)"), pw),
      el("div", { class: "field grow" }, el("label", null, "Stops working on"), exp),
      el("div", { class: "field" }, el("label", null, "Stop after this many scans"), max)),
    el("div", { class: "qr-actions" },
      el("button", { class: "btn btn-primary", type: "button", disabled: !allowed, onclick: save }, "Save protection"),
      qr.has_password ? el("button", { class: "btn", type: "button", onclick: removePw }, "Remove password") : null));
  return box;
}

function card(qr) {
  const canWrite = role === "owner" || role === "editor";
  const dest = el("input", { type: "url", value: qr.destination, "aria-label": "Destination link", disabled: !canWrite });
  const label = el("input", { value: qr.label, maxlength: "80", placeholder: "Name", "aria-label": "Name", disabled: !canWrite });
  const stats = el("div", { class: "stats", hidden: true });
  const protect = protectionBox(qr);
  const root = el("article", { class: "qr-card" + (qr.active ? "" : " paused") });
  const expiredNow = (qr.expires_at && qr.expires_at * 1000 < Date.now()) || (qr.max_scans && qr.scans >= qr.max_scans);

  const save = async () => {
    try {
      const r = await api(`/api/qrs/${qr.id}`, { method: "PATCH", body: { destination: dest.value, label: label.value } });
      Object.assign(qr, r.qr);
      toast("Saved. The printed QR code now goes to the new link.");
      await load();
    } catch (e) { toast(e.message, true); }
  };

  root.append(
    el("div", { class: "qr-img" }, qrCanvas(qr.url, 180)),
    el("div", { class: "qr-body" },
      label,
      el("div", { class: "field" }, el("label", null, "Goes to"), dest),
      el("div", { class: "qr-meta" },
        el("span", null, el("strong", null, qr.scans), " scans"),
        el("span", null, "Created ", fmtDate(qr.created_at)),
        el("span", { class: "chip " + (qr.active && !expiredNow ? "chip-on" : "chip-off") }, !qr.active ? "Paused" : expiredNow ? "Expired" : "Active"),
        qr.has_password ? el("span", { class: "chip chip-lock" }, "Password") : null,
        qr.expires_at ? el("span", null, "Ends ", fmtDate(qr.expires_at)) : null,
        qr.max_scans ? el("span", null, `Limit ${qr.max_scans} scans`) : null),
      el("p", { class: "qr-url small" }, "QR code link: ", el("code", null, qr.url)),
      el("div", { class: "qr-actions" },
        canWrite ? el("button", { class: "btn btn-primary", type: "button", onclick: save }, "Save changes") : null,
        el("button", { class: "btn", type: "button", onclick: () => download(qr, "png") }, "PNG"),
        el("button", { class: "btn", type: "button", onclick: () => download(qr, "svg") }, "SVG"),
        el("button", { class: "btn", type: "button", onclick: async () => { stats.hidden = !stats.hidden; if (!stats.hidden) await showStats(qr, stats); } }, "Scan stats"),
        canWrite ? el("button", { class: "btn", type: "button", onclick: () => { protect.hidden = !protect.hidden; } }, "Protection") : null,
        canWrite ? el("button", { class: "btn", type: "button", onclick: async () => {
          try { const r = await api(`/api/qrs/${qr.id}`, { method: "PATCH", body: { active: !qr.active } }); Object.assign(qr, r.qr); await load(); } catch (e) { toast(e.message, true); }
        } }, qr.active ? "Pause" : "Resume") : null,
        role === "owner" ? el("button", { class: "btn btn-danger", type: "button", onclick: async () => {
          if (!confirm("Delete this QR code? Printed copies will stop working.")) return;
          try { await api(`/api/qrs/${qr.id}`, { method: "DELETE" }); await load(); } catch (e) { toast(e.message, true); }
        } }, "Delete") : null),
      protect,
      stats));
  return root;
}

function planPanel() {
  const box = $("#planPanel");
  box.textContent = "";
  const p = user.plan;
  const until = user.plan_until ? ` until ${fmtDate(user.plan_until)}` : "";
  box.append(el("div", { class: "row between" },
    el("div", null, el("h2", { style: "margin:0" }, "Your plan: ", p.name), el("p", { class: "muted small", style: "margin:4px 0 0" },
      p.qrs === null ? "No limit on QR codes" : `Up to ${p.qrs} dynamic QR codes`, until)),
    el("button", { class: "btn", type: "button", onclick: () => { grid.hidden = !grid.hidden; } }, "Compare plans")));
  const plans = user.plans;
  const yes = "✓", no = "—";
  const rows = [
    ["Dynamic QR codes", (k) => plans[k].qrs],
    ["Scan stats (days, countries, devices)", () => yes],
    ["Hourly stats and cities", (k) => (plans[k].detail ? yes : no)],
    ["Password protection", (k) => (plans[k].password ? yes : no)],
    ["Expiry date and scan limit", (k) => (plans[k].expiry ? yes : no)],
    ["CSV export", (k) => (plans[k].csv ? yes : no)],
    ["Team members", (k) => plans[k].team || no],
  ];
  const keys = ["free", "pro", "business"];
  const grid = el("div", { class: "table-wrap", hidden: true },
    el("table", { class: "plan-table" },
      el("thead", null, el("tr", null, el("th", null, ""), keys.map((k) => el("th", { class: p.id === k ? "current" : null }, plans[k].name)))),
      el("tbody", null, rows.map(([name, f]) => el("tr", null, el("td", null, name), keys.map((k) => el("td", { class: "num" }, String(f(k))))))),
    ),
    el("p", { class: "muted small" }, "Paid plans are not on sale yet. To try Pro or Business, contact us and an administrator can switch your account."));
  box.append(grid);
}

async function teamPanel() {
  const panel = $("#teamPanel");
  const t = await api("/api/team");
  panel.hidden = !(t.seats > 0 || t.members.length);
  if (panel.hidden) return;
  $("#teamNote").textContent = t.seats > 0
    ? `Invite up to ${t.seats} people. They sign in with their own email and can then open your workspace. ${t.members.length} of ${t.seats} used.`
    : "Your plan no longer includes a team, so members cannot open your workspace right now.";
  $("#invite").hidden = !(t.seats > 0);
  const list = $("#members");
  list.textContent = "";
  if (!t.members.length) { list.append(el("p", { class: "muted small" }, "No team members yet.")); return; }
  list.append(el("table", { class: "mini team-table" }, el("tbody", null, t.members.map((m) =>
    el("tr", null,
      el("td", null, m.email),
      el("td", null, m.role === "viewer" ? "View only" : "Can edit"),
      el("td", null, m.joined ? "Joined" : "Invited (not signed in yet)"),
      el("td", { class: "num" }, el("button", { class: "btn btn-danger", type: "button", onclick: async () => {
        if (!confirm(`Remove ${m.email} from your team?`)) return;
        try { await api(`/api/team/${m.id}`, { method: "DELETE" }); await teamPanel(); } catch (e) { toast(e.message, true); }
      } }, "Remove")))))));
}

function workspaceSwitcher() {
  if (!user.teams.length) return;
  const sel = $("#ws");
  sel.append(el("option", { value: String(user.id) }, "My QR codes"));
  user.teams.forEach((t) => sel.append(el("option", { value: String(t.owner_id) }, `${t.owner_email} (${t.role === "viewer" ? "view only" : "can edit"})`)));
  $("#workspace").hidden = false;
  sel.addEventListener("change", async () => { ownerId = Number(sel.value); await load(); });
}

async function load() {
  const r = await api(`/api/qrs?owner=${ownerId}`);
  limit = r.limit;
  role = r.role;
  ownerPlan = r.plan;
  $("#title").textContent = ownerId === user.id ? "My QR codes" : `QR codes of ${r.owner_email}`;
  $("#createPanel").hidden = !(role === "owner" || role === "editor");
  $("#teamPanel").hidden = ownerId !== user.id || $("#teamPanel").hidden;
  const list = $("#list");
  list.textContent = "";
  r.qrs.forEach((q) => list.appendChild(card(q)));
  $("#empty").hidden = r.qrs.length > 0;
  $("#limit").textContent = limit === null ? "No limit on this workspace." : `${r.plan.name} plan: ${r.qrs.length} of ${limit} dynamic QR codes used.`;
  $("#add").disabled = limit !== null && r.qrs.length >= limit;
}

$("#create").addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = $("#createErr");
  err.hidden = true;
  try {
    await api("/api/qrs", { method: "POST", body: { label: $("#label").value, destination: $("#dest").value, owner_id: ownerId } });
    $("#label").value = "";
    $("#dest").value = "";
    await load();
  } catch (ex) {
    err.textContent = ex.message;
    err.hidden = false;
  }
});

$("#invite").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await api("/api/team", { method: "POST", body: { email: $("#invEmail").value, role: $("#invRole").value } });
    $("#invEmail").value = "";
    toast("Invited. They get access when they sign in with that email.");
    await teamPanel();
  } catch (ex) { toast(ex.message, true); }
});

planPanel();
workspaceSwitcher();
await teamPanel();
await load();
