import { api, el, $, fmtDate, toast, requireUser, topbar } from "/js/common.js";

const COLOR = "#6D28D9";
const user = await requireUser();
topbar(user);

let limit = null;

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

function bars(days) {
  const max = Math.max(1, ...days.map((d) => d.n));
  return el("div", { class: "bars", role: "img", "aria-label": "Scans per day over the last 30 days" },
    days.map((d) => el("span", { class: "bar", title: `${d.day}: ${d.n}`, style: `height:${Math.max(2, Math.round((d.n / max) * 100))}%` })));
}

function table(rows, empty) {
  if (!rows.length) return el("p", { class: "muted small" }, empty);
  return el("table", { class: "mini" }, el("tbody", null, rows.map((r) => el("tr", null, el("td", null, r.name), el("td", { class: "num" }, r.n)))));
}

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
    box.appendChild(bars(s.days));
    box.appendChild(el("div", { class: "cols" },
      el("div", null, el("h4", null, "Countries"), table(s.countries, "No scans yet.")),
      el("div", null, el("h4", null, "Devices"), table(s.devices, "No scans yet."))));
    box.appendChild(el("p", { class: "muted small" }, "Search-engine and link-preview robots are not counted. No IP addresses are stored."));
  } catch (e) {
    box.textContent = e.message;
  }
}

function card(qr) {
  const dest = el("input", { type: "url", value: qr.destination, "aria-label": "Destination link" });
  const label = el("input", { value: qr.label, maxlength: "80", placeholder: "Name", "aria-label": "Name" });
  const stats = el("div", { class: "stats", hidden: true });
  const root = el("article", { class: "qr-card" + (qr.active ? "" : " paused") });

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
        el("span", { class: "chip " + (qr.active ? "chip-on" : "chip-off") }, qr.active ? "Active" : "Paused")),
      el("p", { class: "qr-url small" }, "QR code link: ", el("code", null, qr.url)),
      el("div", { class: "qr-actions" },
        el("button", { class: "btn btn-primary", type: "button", onclick: save }, "Save changes"),
        el("button", { class: "btn", type: "button", onclick: () => download(qr, "png") }, "PNG"),
        el("button", { class: "btn", type: "button", onclick: () => download(qr, "svg") }, "SVG"),
        el("button", { class: "btn", type: "button", onclick: async () => { stats.hidden = !stats.hidden; if (!stats.hidden) await showStats(qr, stats); } }, "Scan stats"),
        el("button", { class: "btn", type: "button", onclick: async () => {
          try { const r = await api(`/api/qrs/${qr.id}`, { method: "PATCH", body: { active: !qr.active } }); Object.assign(qr, r.qr); await load(); } catch (e) { toast(e.message, true); }
        } }, qr.active ? "Pause" : "Resume"),
        el("button", { class: "btn btn-danger", type: "button", onclick: async () => {
          if (!confirm("Delete this QR code? Printed copies will stop working.")) return;
          try { await api(`/api/qrs/${qr.id}`, { method: "DELETE" }); await load(); } catch (e) { toast(e.message, true); }
        } }, "Delete")),
      stats));
  return root;
}

async function load() {
  const r = await api("/api/qrs");
  limit = r.limit;
  const list = $("#list");
  list.textContent = "";
  r.qrs.forEach((q) => list.appendChild(card(q)));
  $("#empty").hidden = r.qrs.length > 0;
  $("#limit").textContent = limit === null ? "No limit on your account." : `Free plan: ${r.qrs.length} of ${limit} dynamic QR codes used.`;
  $("#add").disabled = limit !== null && r.qrs.length >= limit;
}

$("#create").addEventListener("submit", async (e) => {
  e.preventDefault();
  const err = $("#createErr");
  err.hidden = true;
  try {
    await api("/api/qrs", { method: "POST", body: { label: $("#label").value, destination: $("#dest").value } });
    $("#label").value = "";
    $("#dest").value = "";
    await load();
  } catch (ex) {
    err.textContent = ex.message;
    err.hidden = false;
  }
});

await load();
