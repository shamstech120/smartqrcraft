/*! SmartQRCraft — printable QR code templates (table tent, counter sign, WiFi cards, label sheets).
    Builds an A4 SVG in the browser; print it or save it as PDF from the print dialog. */
(function () {
  "use strict";

  var T = Object.assign({
    title: "Printable QR Code Templates", pill: "Print-ready A4",
    template: "Template", content: "QR code content", texts: "Text on the page", look: "Colors",
    t_tent: "Table tent (fold in half)", t_sign: "Counter sign / Scan & Pay (A4)", t_cards: "Cards, 4 per A4 (A6)",
    t_wifi: "WiFi cards, 4 per A4", t_labels: "Label sheet (same code repeated)",
    layout: "Label layout", heading: "Heading", sub: "Business or network name", note: "Small print",
    caption: "Label caption (optional)", accent: "Accent color", qrColor: "QR code color",
    ctype: "Type", url: "Website link", text: "Text", phone: "Phone", whatsapp: "WhatsApp", upi: "UPI", email: "Email", wifi: "WiFi",
    f_value: "Link", f_text: "Text", f_phone: "Phone number with country code", f_wa: "WhatsApp number with country code",
    f_vpa: "UPI ID", f_payee: "Payee name", f_email: "Email address", f_ssid: "Network name (SSID)", f_pw: "Password", f_sec: "Security",
    showPw: "Print the password on the card", print: "Print / Save as PDF", svg: "Download SVG", png: "Download PNG (300 dpi)",
    empty: "Fill in the QR code content to see the page.",
    hint: "Print at 100% (Actual size), not “Fit to page”. Label sheets differ by brand: print one test page on plain paper and hold it against your label sheet.",
    privacy: "Everything is created in your browser. Nothing is uploaded.",
    d_heading_tent: "Scan to see our menu", d_heading_sign: "Scan & Pay", d_heading_cards: "Scan me",
    d_heading_wifi: "Free WiFi", d_note: "Point your phone camera at the code", d_note_wifi: "Scan with your camera to connect",
    d_sub: "Your Business Name", network: "Network", password: "Password",
    lay_24: "24 per sheet: 3 × 8 (70 × 37 mm)", lay_65: "65 per sheet: 5 × 13 (38 × 21 mm)",
    lay_8: "8 per sheet: 2 × 4 (105 × 74 mm)", lay_12: "12 per sheet: 3 × 4 (70 × 74 mm)"
  }, window.SMARTQR_PRINT_I18N || {});

  var W = 210, H = 297;
  var LAYOUTS = {
    "24": { cols: 3, rows: 8, w: 70, h: 37, mx: 0, my: 0.5 },
    "65": { cols: 5, rows: 13, w: 38.1, h: 21.2, mx: 9.75, my: 10.7 },
    "8": { cols: 2, rows: 4, w: 105, h: 74, mx: 0, my: 0.5 },
    "12": { cols: 3, rows: 4, w: 70, h: 74, mx: 0, my: 0.5 }
  };

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function x(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function n(v) { return (Math.round(v * 100) / 100).toString(); }

  // Font size that keeps `str` inside `maxW` mm (average glyph width ~0.56 em for bold sans).
  function fit(str, base, maxW) {
    var len = Math.max(1, String(str).length);
    return Math.min(base, maxW / (len * 0.56));
  }
  function text(str, cx, y, size, opts) {
    if (!str) return "";
    opts = opts || {};
    var tr = opts.rotate ? ' transform="rotate(180 ' + n(cx) + " " + n(y - size * 0.35) + ')"' : "";
    return '<text x="' + n(cx) + '" y="' + n(y) + '" font-size="' + n(size) + '" text-anchor="' + (opts.anchor || "middle") +
      '" font-family="Inter, Arial, Helvetica, sans-serif" font-weight="' + (opts.weight || 700) + '" fill="' + (opts.fill || "#111827") + '"' + tr + ">" + x(str) + "</text>";
  }

  var CONTENT_TYPES = {
    url: [["value", "f_value", "https://example.com/menu"]],
    text: [["value", "f_text", ""]],
    phone: [["value", "f_phone", "+1 555 019 2834"]],
    whatsapp: [["number", "f_wa", "919876543210"]],
    upi: [["vpa", "f_vpa", "shopname@okaxis"], ["name", "f_payee", ""]],
    email: [["to", "f_email", "hello@example.com"]],
    wifi: [["ssid", "f_ssid", "Cafe_Guest"], ["password", "f_pw", ""], ["security", "f_sec", "", [["WPA", "WPA/WPA2/WPA3"], ["WEP", "WEP"], ["nopass", "—"]]]]
  };

  function init(root) {
    var types = (root.getAttribute("data-types") || "url,text,phone,whatsapp,email,wifi").split(",");
    if (document.documentElement.lang === "en-IN" && types.indexOf("upi") === -1) types.splice(1, 0, "upi");
    var state = { tpl: root.getAttribute("data-template") || "tent", ctype: types[0], fields: {}, layout: "24", showPw: true,
      heading: "", sub: T.d_sub, note: "", caption: "", accent: "#6D28D9", fg: "#111827" };

    root.innerHTML = "";
    root.appendChild(el("div", { class: "generator-head" },
      "<h2>" + x(T.title) + '</h2><span class="status-pill"><span class="status-dot"></span>' + x(T.pill) + "</span>"));
    var body = el("div", { class: "bulk-body print-body" });
    var left = el("div", { class: "bulk-col" });
    var right = el("div", { class: "bulk-col" });
    body.appendChild(left); body.appendChild(right);
    root.appendChild(body);

    function field(label, input) {
      var w = el("div", { class: "field" });
      var id = "p-" + Math.random().toString(36).slice(2, 8);
      input.id = id;
      w.appendChild(el("label", { for: id }, x(label)));
      w.appendChild(input);
      return w;
    }
    function select(opts, value, onChange) {
      var s = el("select");
      opts.forEach(function (o) { var op = el("option", { value: o[0] }, x(o[1])); if (o[0] === value) op.selected = true; s.appendChild(op); });
      s.addEventListener("change", function () { onChange(s.value); });
      return s;
    }
    function input(value, placeholder, onInput, type) {
      var i = el("input", { type: type || "text", placeholder: placeholder || "", autocomplete: "off" });
      i.value = value || "";
      i.addEventListener("input", function () { onInput(i.value); });
      return i;
    }

    var tplOpts = [["tent", T.t_tent], ["sign", T.t_sign], ["cards", T.t_cards], ["wifi", T.t_wifi], ["labels", T.t_labels]];
    left.appendChild(field(T.template, select(tplOpts, state.tpl, function (v) { state.tpl = v; if (v === "wifi") state.ctype = "wifi"; state.heading = ""; state.note = ""; buildContent(); buildTexts(); render(); })));

    var contentBox = el("div");
    var textBox = el("div");
    left.appendChild(contentBox);
    left.appendChild(textBox);

    function buildContent() {
      contentBox.innerHTML = "";
      contentBox.appendChild(el("h3", { class: "print-h" }, x(T.content)));
      if (state.tpl !== "wifi") {
        contentBox.appendChild(field(T.ctype, select(types.map(function (t) { return [t, T[t] || t]; }), state.ctype, function (v) {
          state.ctype = v; state.fields = {}; buildContent(); render();
        })));
      }
      (CONTENT_TYPES[state.ctype] || []).forEach(function (f) {
        var ctrl = f[3]
          ? select(f[3], state.fields[f[0]] || f[3][0][0], function (v) { state.fields[f[0]] = v; render(); })
          : input(state.fields[f[0]], (T.placeholders || {})[state.ctype + "." + f[0]] || f[2], function (v) { state.fields[f[0]] = v; render(); }, f[0] === "value" && state.ctype === "text" ? "text" : "text");
        if (f[3] && !state.fields[f[0]]) state.fields[f[0]] = f[3][0][0];
        contentBox.appendChild(field(T[f[1]], ctrl));
      });
      if (state.ctype === "wifi") {
        var lab = el("label", { class: "exp-field", style: "display:flex;gap:8px;align-items:center;margin:-6px 0 16px;font-size:14px" });
        var chk = el("input", { type: "checkbox" });
        chk.checked = state.showPw;
        chk.addEventListener("change", function () { state.showPw = chk.checked; render(); });
        lab.appendChild(chk);
        lab.appendChild(document.createTextNode(T.showPw));
        contentBox.appendChild(lab);
      }
    }

    function defaults() {
      var h = { tent: T.d_heading_tent, sign: T.d_heading_sign, cards: T.d_heading_cards, wifi: T.d_heading_wifi, labels: "" }[state.tpl];
      return { heading: h, note: state.tpl === "wifi" ? T.d_note_wifi : T.d_note };
    }

    function buildTexts() {
      textBox.innerHTML = "";
      textBox.appendChild(el("h3", { class: "print-h" }, x(T.texts)));
      var d = defaults();
      if (state.tpl === "labels") {
        textBox.appendChild(field(T.layout, select([["24", T.lay_24], ["65", T.lay_65], ["8", T.lay_8], ["12", T.lay_12]], state.layout, function (v) { state.layout = v; render(); })));
        textBox.appendChild(field(T.caption, input(state.caption, "", function (v) { state.caption = v; render(); })));
      } else {
        textBox.appendChild(field(T.heading, input(state.heading, d.heading, function (v) { state.heading = v; render(); })));
        if (state.tpl !== "wifi") textBox.appendChild(field(T.sub, input(state.sub, "", function (v) { state.sub = v; render(); })));
        textBox.appendChild(field(T.note, input(state.note, d.note, function (v) { state.note = v; render(); })));
      }
      var colors = el("div", { class: "two-col" });
      colors.appendChild(field(T.accent, input(state.accent, "", function (v) { state.accent = v; render(); }, "color")));
      colors.appendChild(field(T.qrColor, input(state.fg, "", function (v) { state.fg = v; render(); }, "color")));
      textBox.appendChild(colors);
    }

    var preview = el("div", { class: "print-preview", "aria-live": "polite" });
    right.appendChild(preview);
    var btns = el("div", { class: "download-row", style: "margin-top:14px" });
    var bPrint = el("button", { type: "button", class: "btn btn-primary" }, x(T.print));
    var bSvg = el("button", { type: "button", class: "btn" }, x(T.svg));
    var bPng = el("button", { type: "button", class: "btn" }, x(T.png));
    btns.appendChild(bPrint); btns.appendChild(bSvg); btns.appendChild(bPng);
    right.appendChild(btns);
    right.appendChild(el("p", { class: "field-hint", style: "margin-top:12px" }, x(T.hint)));
    right.appendChild(el("p", { class: "privacy-note" }, x(T.privacy)));

    var current = "";

    function qrSymbol(payload) {
      var svg = window.SmartQR.renderToSVG(payload, { size: 400, margin: 4, fg: state.fg, bg: "#ffffff", ecc: "Q" });
      var m = svg.match(/viewBox="([^"]+)"/);
      var inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
      return { def: '<symbol id="qr" viewBox="' + m[1] + '">' + inner + "</symbol>" };
    }
    function useQR(xm, ym, s, rotate) {
      var tr = rotate ? ' transform="rotate(180 ' + n(xm + s / 2) + " " + n(ym + s / 2) + ')"' : "";
      return '<use href="#qr" x="' + n(xm) + '" y="' + n(ym) + '" width="' + n(s) + '" height="' + n(s) + '"' + tr + "/>";
    }

    function panel(y0, h, heading, sub, note, rotate) {
      // A panel of width W and height h starting at y0; rotate=true draws it upside down (for the back of a tent).
      var cx = W / 2, parts = [];
      var q = Math.min(h * 0.52, 95);
      var inner = [];
      inner.push('<rect x="12" y="' + n(y0 + 12) + '" width="' + n(W - 24) + '" height="' + n(h - 24) + '" rx="6" fill="none" stroke="' + x(state.accent) + '" stroke-width="1.2"/>');
      inner.push(text(heading, cx, y0 + 30, fit(heading, 13, W - 44), { fill: state.accent, weight: 800 }));
      if (sub) inner.push(text(sub, cx, y0 + 40, fit(sub, 7, W - 44), { weight: 600 }));
      inner.push(useQR(cx - q / 2, y0 + 45, q));
      inner.push(text(note, cx, y0 + 45 + q + 9, fit(note, 5, W - 44), { weight: 500, fill: "#475569" }));
      var g = inner.join("");
      if (rotate) g = '<g transform="rotate(180 ' + n(cx) + " " + n(y0 + h / 2) + ')">' + g + "</g>";
      parts.push(g);
      return parts.join("");
    }

    function card(x0, y0, w, h, heading, sub, note, extraLines) {
      var cx = x0 + w / 2, out = [];
      out.push('<rect x="' + n(x0 + 5) + '" y="' + n(y0 + 5) + '" width="' + n(w - 10) + '" height="' + n(h - 10) + '" rx="5" fill="#ffffff" stroke="' + x(state.accent) + '" stroke-width="0.8"/>');
      out.push('<rect x="' + n(x0 + 5) + '" y="' + n(y0 + 5) + '" width="' + n(w - 10) + '" height="17" rx="5" fill="' + x(state.accent) + '"/>');
      out.push('<rect x="' + n(x0 + 5) + '" y="' + n(y0 + 16) + '" width="' + n(w - 10) + '" height="6" fill="' + x(state.accent) + '"/>');
      out.push(text(heading, cx, y0 + 17, fit(heading, 8, w - 20), { fill: "#ffffff", weight: 800 }));
      var lines = extraLines || [];
      var q = Math.min(w - 40, h - 48 - lines.length * 7 - (sub ? 6 : 0));
      var y = y0 + 27;
      if (sub) { out.push(text(sub, cx, y + 3, fit(sub, 5, w - 20), { weight: 600 })); y += 6; }
      out.push(useQR(cx - q / 2, y, q));
      y += q + 5;
      lines.forEach(function (ln) { out.push(text(ln, cx, y, fit(ln, 4.2, w - 18), { weight: 600 })); y += 6; });
      out.push(text(note, cx, y0 + h - 9, fit(note, 3.4, w - 18), { weight: 500, fill: "#475569" }));
      return out.join("");
    }

    function cutMarks(xs, ys) {
      var out = [];
      xs.forEach(function (xv) { out.push('<line x1="' + n(xv) + '" y1="0" x2="' + n(xv) + '" y2="4" stroke="#94A3B8" stroke-width="0.2"/><line x1="' + n(xv) + '" y1="' + (H - 4) + '" x2="' + n(xv) + '" y2="' + H + '" stroke="#94A3B8" stroke-width="0.2"/>'); });
      ys.forEach(function (yv) { out.push('<line x1="0" y1="' + n(yv) + '" x2="4" y2="' + n(yv) + '" stroke="#94A3B8" stroke-width="0.2"/><line x1="' + (W - 4) + '" y1="' + n(yv) + '" x2="' + W + '" y2="' + n(yv) + '" stroke="#94A3B8" stroke-width="0.2"/>'); });
      return out.join("");
    }

    function build(payload) {
      var d = defaults();
      var heading = state.heading || d.heading, note = state.note || d.note, sub = state.sub;
      var sym = qrSymbol(payload);
      var body = [];
      if (state.tpl === "tent") {
        body.push(panel(0, H / 2, heading, sub, note, true));
        body.push(panel(H / 2, H / 2, heading, sub, note, false));
        body.push('<line x1="0" y1="' + H / 2 + '" x2="' + W + '" y2="' + H / 2 + '" stroke="#94A3B8" stroke-width="0.3" stroke-dasharray="3 2"/>');
      } else if (state.tpl === "sign") {
        var q = 130;
        body.push('<rect x="0" y="0" width="' + W + '" height="62" fill="' + x(state.accent) + '"/>');
        body.push(text(heading, W / 2, 38, fit(heading, 22, W - 30), { fill: "#ffffff", weight: 800 }));
        if (sub) body.push(text(sub, W / 2, 84, fit(sub, 11, W - 30), { weight: 700 }));
        body.push('<rect x="' + n(W / 2 - q / 2 - 6) + '" y="96" width="' + (q + 12) + '" height="' + (q + 12) + '" rx="6" fill="#ffffff" stroke="' + x(state.accent) + '" stroke-width="1.5"/>');
        body.push(useQR(W / 2 - q / 2, 102, q));
        body.push(text(note, W / 2, 262, fit(note, 8, W - 30), { weight: 600, fill: "#475569" }));
      } else if (state.tpl === "cards" || state.tpl === "wifi") {
        var lines = [];
        if (state.tpl === "wifi") {
          if (state.fields.ssid) lines.push(T.network + ": " + state.fields.ssid);
          if (state.showPw && state.fields.password && state.fields.security !== "nopass") lines.push(T.password + ": " + state.fields.password);
        }
        for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) {
          body.push(card(c * W / 2, r * H / 2, W / 2, H / 2, heading, state.tpl === "wifi" ? "" : sub, note, lines));
        }
        body.push(cutMarks([W / 2], [H / 2]));
      } else {
        var L = LAYOUTS[state.layout];
        var mx = L.mx != null ? L.mx : (W - L.cols * L.w) / 2, my = (H - L.rows * L.h) / 2;
        for (var i = 0; i < L.rows; i++) for (var j = 0; j < L.cols; j++) {
          var x0 = mx + j * L.w, y0 = my + i * L.h;
          var pad = Math.min(L.w, L.h) * 0.08;
          var cap = state.caption;
          if (cap && L.w > L.h * 1.4) {
            var qs = L.h - pad * 2;
            body.push(useQR(x0 + pad, y0 + pad, qs));
            body.push(text(cap, x0 + pad * 2 + qs, y0 + L.h / 2 + 1.2, fit(cap, Math.min(4.5, L.h / 5), L.w - qs - pad * 3), { anchor: "start", weight: 700 }));
          } else if (cap) {
            var qs2 = Math.min(L.w - pad * 2, L.h - pad * 2 - 6);
            body.push(useQR(x0 + (L.w - qs2) / 2, y0 + pad, qs2));
            body.push(text(cap, x0 + L.w / 2, y0 + pad + qs2 + 4, fit(cap, 3.6, L.w - pad * 2), { weight: 700 }));
          } else {
            var qs3 = Math.min(L.w, L.h) - pad * 2;
            body.push(useQR(x0 + (L.w - qs3) / 2, y0 + (L.h - qs3) / 2, qs3));
          }
        }
      }
      return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="210mm" height="297mm" viewBox="0 0 ' + W + " " + H + '">' +
        "<defs>" + sym.def + "</defs>" + '<rect width="' + W + '" height="' + H + '" fill="#ffffff"/>' + body.join("") + "</svg>";
    }

    function render() {
      var payload = window.SmartQR.buildPayload(state.ctype, state.fields);
      var ok = window.SmartQR.isPayloadValid(payload);
      bPrint.disabled = bSvg.disabled = bPng.disabled = !ok;
      if (!ok) { current = ""; preview.innerHTML = '<div class="print-empty">' + x(T.empty) + "</div>"; return; }
      try {
        current = build(payload);
      } catch (e) {
        current = ""; preview.innerHTML = '<div class="print-empty">' + x(e.message || T.empty) + "</div>"; return;
      }
      preview.innerHTML = current;
    }

    bSvg.addEventListener("click", function () {
      if (current) window.SmartQR.downloadBlob(new Blob([current], { type: "image/svg+xml" }), "qr-print-" + state.tpl + ".svg");
    });
    bPng.addEventListener("click", function () {
      if (!current) return;
      var img = new Image();
      var url = URL.createObjectURL(new Blob([current.replace('width="210mm" height="297mm"', 'width="2480" height="3508"')], { type: "image/svg+xml" }));
      img.onload = function () {
        var cv = document.createElement("canvas");
        cv.width = 2480; cv.height = 3508;
        cv.getContext("2d").drawImage(img, 0, 0, 2480, 3508);
        URL.revokeObjectURL(url);
        cv.toBlob(function (b) { window.SmartQR.downloadBlob(b, "qr-print-" + state.tpl + ".png"); }, "image/png");
      };
      img.src = url;
    });
    bPrint.addEventListener("click", function () {
      if (!current) return;
      var fr = document.getElementById("qr-print-frame");
      if (fr) fr.remove();
      fr = el("iframe", { id: "qr-print-frame", title: "print", style: "position:fixed;right:0;bottom:0;width:0;height:0;border:0" });
      document.body.appendChild(fr);
      var doc = fr.contentWindow.document;
      doc.open();
      doc.write('<!doctype html><html><head><meta charset="utf-8"><title>SmartQRCraft</title><style>@page{size:A4;margin:0}html,body{margin:0;padding:0}svg{display:block;width:210mm;height:297mm}</style></head><body>' + current + "</body></html>");
      doc.close();
      setTimeout(function () { fr.contentWindow.focus(); fr.contentWindow.print(); }, 250);
    });

    buildContent();
    buildTexts();
    render();
  }

  document.querySelectorAll(".qr-print").forEach(init);
})();
