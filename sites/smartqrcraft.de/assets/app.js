/*! SmartQRCraft — generator UI controller. Reused on every page that embeds
 * the #qr-generator markup; page-specific config (which types show, which
 * type is active by default) is passed via data attributes on #qr-generator. */
(function () {
  "use strict";

  var ICONS = {
    url: '<path d="M9 15l6-6M10 8l1-1a3.5 3.5 0 015 5l-1 1M14 16l-1 1a3.5 3.5 0 01-5-5l1-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    text: '<path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    wifi: '<path d="M5 9a11 11 0 0114 0M8 12.5a6.5 6.5 0 018 0M11 16a2 2 0 012 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="18.5" r="1" fill="currentColor"/>',
    email: '<rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    phone: '<path d="M6 3h3l1.5 4.5L8 9a11 11 0 007 7l1.5-2.5L21 15v3a2 2 0 01-2 2C10.5 20 4 13.5 4 5a2 2 0 012-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    sms: '<path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9A1.5 1.5 0 0118.5 16H9l-4 4v-4H5.5A1.5 1.5 0 014 14.5v-9z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    vcard: '<rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><circle cx="9" cy="11" r="1.8" stroke="currentColor" stroke-width="1.5"/><path d="M6 16c.6-1.6 1.9-2.4 3-2.4s2.4.8 3 2.4M14 10h4M14 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    location: '<path d="M12 21s7-6.2 7-11.5A7 7 0 105 9.5C5 14.8 12 21 12 21z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.2" stroke="currentColor" stroke-width="1.5"/>',
    social: '<circle cx="7" cy="12" r="2.3" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="6.5" r="2.3" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="17.5" r="2.3" stroke="currentColor" stroke-width="1.6"/><path d="M9 10.8l6-3.3M9 13.2l6 3.3" stroke="currentColor" stroke-width="1.6"/>',
    menu: '<path d="M6 3v18M6 3c-1.5 0-2.5 1.5-2.5 4S4.5 11 6 11M18 3v18M18 3a2.5 2.5 0 000 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    pdf: '<path d="M7 3h7l4 4v14H7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.5 14v-3h1.2a1 1 0 010 2H9.5M13 11v3M13 11.2c1 0 1.5.6 1.5 1.4s-.5 1.4-1.5 1.4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',
    upi: '<rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 10h17M7 14.5h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    whatsapp: '<path d="M4 20l1.3-4A8 8 0 118 18.7L4 20z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9.5 9.5c.3 2 1.8 3.6 4 4.3l1-1.2-1.6-.9-.6.6c-.8-.4-1.3-1-1.6-1.8l.6-.6-.9-1.6-1 1.2z" fill="currentColor"/>',
    app: '<rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M11 19h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
  };

  ICONS.venmo = ICONS.cashapp = ICONS.paypalme = ICONS.girocode = ICONS.upi;
  ICONS.event = ICONS.location;
  ICONS.mecard = ICONS.vcard;
  ICONS.bitcoin = ICONS.upi;
  ICONS.x = ICONS.social;
  ICONS.telegram = '<path d="M21 4L3 11l6 2.2L19 7l-8 7.5.3 5.5 3-3.8 4.2 3.3L21 4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>';

  var TYPES = {
    url: {
      label: "URL", short: "Direct customers to any website or landing page.",
      fields: [{ name: "value", label: "Enter your website URL", placeholder: "https://example.com", type: "text" }]
    },
    text: {
      label: "Text", short: "Encode any plain text, note or code.",
      fields: [{ name: "value", label: "Enter your text", placeholder: "Anything you want to encode...", type: "textarea" }]
    },
    wifi: {
      label: "WiFi", short: "Let guests join WiFi without typing a password.",
      fields: [
        { name: "ssid", label: "Network name (SSID)", placeholder: "Office_Network_5G", type: "text" },
        { name: "password", label: "Password", placeholder: "••••••••", type: "text" },
        { name: "security", label: "Security", type: "select", options: [["WPA", "WPA/WPA2/WPA3"], ["WEP", "WEP"], ["nopass", "No password"]] },
        { name: "hidden", label: "Hidden network", type: "select", options: [["", "No"], ["1", "Yes"]] }
      ]
    },
    email: {
      label: "Email", short: "Pre-fill a recipient, subject and message.",
      fields: [
        { name: "to", label: "Recipient email", placeholder: "hello@example.com", type: "text" },
        { name: "subject", label: "Subject (optional)", placeholder: "Let's talk", type: "text" },
        { name: "body", label: "Message (optional)", placeholder: "Hi, I scanned your QR code and...", type: "textarea" }
      ]
    },
    phone: {
      label: "Phone", short: "Prompt an instant phone call.",
      fields: [{ name: "value", label: "Phone number", placeholder: "+1 555 019 2834", type: "text" }]
    },
    sms: {
      label: "SMS", short: "Open a pre-drafted text message.",
      fields: [
        { name: "number", label: "Mobile number", placeholder: "+1 555 123 4567", type: "text" },
        { name: "message", label: "Message (optional)", placeholder: "Hi! I'd like to know more...", type: "text" }
      ]
    },
    vcard: {
      label: "vCard", short: "Save contact details straight to an address book.",
      fields: [
        { name: "name", label: "First name", placeholder: "Alex", type: "text" },
        { name: "lastName", label: "Last name", placeholder: "Carter", type: "text" },
        { name: "org", label: "Company (optional)", placeholder: "Acme Inc.", type: "text" },
        { name: "title", label: "Job title (optional)", placeholder: "Marketing Director", type: "text" },
        { name: "phone", label: "Phone", placeholder: "+1 555 019 2834", type: "text" },
        { name: "email", label: "Email", placeholder: "alex@example.com", type: "text" },
        { name: "website", label: "Website (optional)", placeholder: "https://example.com", type: "text" }
      ]
    },
    location: {
      label: "Location", short: "Send people to a map location.",
      fields: [{ name: "value", label: "Coordinates or Google Maps link", placeholder: "40.7128,-74.0060", type: "text" }]
    },
    social: {
      label: "Social Media", short: "Route followers to a profile or link hub.",
      fields: [{ name: "value", label: "Profile or link-in-bio URL", placeholder: "instagram.com/yourbusiness", type: "text" }]
    },
    menu: {
      label: "Menu", short: "Share a digital restaurant menu.",
      fields: [{ name: "value", label: "Digital menu URL", placeholder: "https://menu.yourrestaurant.com", type: "text" }]
    },
    pdf: {
      label: "PDF", short: "Distribute a document or brochure link.",
      fields: [{ name: "value", label: "PDF document link", placeholder: "https://example.com/brochure.pdf", type: "text" }]
    },
    upi: {
      label: "UPI", short: "Receive UPI payments with one scan.",
      fields: [
        { name: "vpa", label: "UPI ID (VPA)", placeholder: "yourname@okbank", type: "text" },
        { name: "name", label: "Payee name (optional)", placeholder: "Sharma Store", type: "text" },
        { name: "amount", label: "Amount in INR (optional)", placeholder: "Leave blank to let the payer enter it", type: "text" },
        { name: "note", label: "Payment note (optional)", placeholder: "Order payment", type: "text" }
      ]
    },
    whatsapp: {
      label: "WhatsApp", short: "Start a WhatsApp chat with one scan.",
      fields: [
        { name: "number", label: "WhatsApp number with country code", placeholder: "919876543210", type: "text" },
        { name: "message", label: "Pre-filled message (optional)", placeholder: "Hi, I found you through your QR code", type: "text" }
      ]
    },
    event: {
      label: "Event", short: "Add an event to a calendar with one scan.",
      fields: [
        { name: "title", label: "Event name", placeholder: "Summer party", type: "text" },
        { name: "start", label: "Starts", type: "datetime" },
        { name: "end", label: "Ends (optional, defaults to 1 hour)", type: "datetime" },
        { name: "location", label: "Location (optional)", placeholder: "12 Main Street", type: "text" },
        { name: "description", label: "Description (optional)", placeholder: "Bring a friend", type: "text" }
      ]
    },
    mecard: {
      label: "MeCard", short: "A compact contact format, popular on Android and in Japan.",
      fields: [
        { name: "name", label: "First name", placeholder: "Alex", type: "text" },
        { name: "lastName", label: "Last name", placeholder: "Carter", type: "text" },
        { name: "phone", label: "Phone", placeholder: "+1 555 019 2834", type: "text" },
        { name: "email", label: "Email", placeholder: "alex@example.com", type: "text" },
        { name: "website", label: "Website (optional)", placeholder: "https://example.com", type: "text" },
        { name: "address", label: "Address (optional)", placeholder: "12 Main Street", type: "text" }
      ]
    },
    bitcoin: {
      label: "Bitcoin", short: "Receive Bitcoin with an address and optional amount.",
      fields: [
        { name: "address", label: "Bitcoin address", placeholder: "bc1q...", type: "text" },
        { name: "amount", label: "Amount in BTC (optional)", placeholder: "0.001", type: "text" },
        { name: "label", label: "Label (optional)", placeholder: "Coffee shop", type: "text" },
        { name: "message", label: "Message (optional)", placeholder: "Order 42", type: "text" }
      ]
    },
    x: {
      label: "X (Twitter)", short: "Open a profile, or start a pre-filled post.",
      fields: [
        { name: "handle", label: "Your X username", placeholder: "@yourname", type: "text" },
        { name: "text", label: "Or a pre-filled post (optional, replaces the profile link)", placeholder: "I just tried this #qr", type: "text" }
      ]
    },
    telegram: {
      label: "Telegram", short: "Open a Telegram chat, channel or group with one scan.",
      fields: [
        { name: "user", label: "Telegram username, channel or group", placeholder: "@yourname", type: "text" },
        { name: "message", label: "Pre-filled message (optional, works for chats)", placeholder: "Hi, I found you through your QR code", type: "text" }
      ]
    },
    venmo: {
      label: "Venmo", short: "Let people pay you on Venmo with one scan.",
      fields: [{ name: "user", label: "Venmo username", placeholder: "@yourname", type: "text" }]
    },
    cashapp: {
      label: "Cash App", short: "Let people pay you on Cash App with one scan.",
      fields: [{ name: "user", label: "Your $Cashtag", placeholder: "$yourcashtag", type: "text" }]
    },
    paypalme: {
      label: "PayPal.Me", short: "Open your PayPal.Me payment page with one scan.",
      fields: [
        { name: "user", label: "PayPal.Me username", placeholder: "yourname", type: "text" },
        { name: "amount", label: "Amount (optional)", placeholder: "Leave blank to let the payer enter it", type: "text" },
        { name: "currency", label: "Currency", type: "select", options: [["USD", "USD"], ["EUR", "EUR"], ["GBP", "GBP"], ["CAD", "CAD"], ["AUD", "AUD"]] }
      ]
    },
    girocode: {
      label: "GiroCode", short: "SEPA transfer with IBAN, amount and reference.",
      fields: [
        { name: "name", label: "Recipient name", placeholder: "Muster GmbH", type: "text" },
        { name: "iban", label: "IBAN", placeholder: "DE89 3704 0044 0532 0130 00", type: "text" },
        { name: "amount", label: "Amount in EUR (optional)", placeholder: "Leave blank to let the payer enter it", type: "text" },
        { name: "reference", label: "Payment reference (optional)", placeholder: "Invoice 2026-001", type: "text" },
        { name: "bic", label: "BIC (optional)", placeholder: "COBADEFFXXX", type: "text" }
      ]
    },
    app: {
      label: "App", short: "Send users to download your app.",
      fields: [{ name: "value", label: "App store / Play store link", placeholder: "https://apps.apple.com/app/yourapp", type: "text" }]
    }
  };

  var I18N = window.SMARTQR_I18N || null;
  if (I18N && I18N.types) {
    for (var tk in I18N.types) if (TYPES[tk]) TYPES[tk] = I18N.types[tk];
  }
  var SCAN_ME = (I18N && I18N.scanMe) || "SCAN ME";
  var EXP = (I18N && I18N.exp) || {};
  function X(k, d) { return EXP[k] || d; }
  var STYLE_PILLS = (I18N && I18N.stylePills) || [["square", "Square"], ["rounded", "Rounded"], ["dots", "Dots"], ["diamond", "Diamond"]];
  var EYE_PILLS = (I18N && I18N.eyePills) || [["classic", "Classic"], ["rounded", "Soft"], ["circle", "Circle"]];

  // Templates: all dark-on-light so they stay scannable.
  var TEMPLATES = [
    { id: "classic", name: "Classic", fg: "#111827", bg: "#ffffff", style: "square", eye: "classic" },
    { id: "violet", name: "Violet", fg: "#6D28D9", bg: "#ffffff", style: "rounded", eye: "rounded" },
    { id: "sunset", name: "Sunset", fg: "#E11D48", fg2: "#D97706", grad: "d", bg: "#ffffff", style: "rounded", eye: "rounded" },
    { id: "ocean", name: "Ocean", fg: "#0369A1", fg2: "#1E3A8A", grad: "v", bg: "#F0F9FF", style: "square", eye: "rounded" },
    { id: "forest", name: "Forest", fg: "#065F46", fg2: "#15803D", grad: "h", bg: "#F0FDF4", style: "rounded", eye: "circle" },
    { id: "midnight", name: "Midnight", fg: "#111827", eyeColor: "#6D28D9", bg: "#ffffff", style: "rounded", eye: "rounded" },
    { id: "gold", name: "Gold", fg: "#78350F", fg2: "#B45309", grad: "d", bg: "#FEF3C7", style: "square", eye: "classic" }
  ];

  function hexToRgb(h) {
    h = String(h || "").replace("#", "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return isNaN(n) ? [0, 0, 0] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function relLum(hex) {
    var c = hexToRgb(hex).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contrast(a, b) {
    var l1 = relLum(a), l2 = relLum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  var COLOR_SWATCHES = ["#6D28D9", "#111827", "#059669", "#E11D48", "#D97706"];
  var BG_SWATCHES = ["#ffffff", "#F5F3FF", "#FEF3C7", "#F0FDF4"];

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function initGenerator(root) {
    var allowed = (root.getAttribute("data-types") || "url,text,wifi,email,phone,sms,vcard,location,social,menu,pdf,app,mecard,event,bitcoin,x,whatsapp").split(",");
    var defaultType = root.getAttribute("data-default") || allowed[0];
    var lockType = root.getAttribute("data-lock") === "true";
    try {
      var qType = new URLSearchParams(window.location.search).get("type");
      if (qType && allowed.indexOf(qType) !== -1) defaultType = qType;
    } catch (e) { /* URLSearchParams unsupported: ignore, use default */ }

    var tabsEl = root.querySelector(".type-tabs");
    var fieldsEl = root.querySelector(".field-container");
    var canvas = root.querySelector("#qr-canvas");
    var colorWrap = root.querySelector(".color-swatches");
    var bgWrap = root.querySelector(".bg-swatches");
    var stylePillWrap = root.querySelector(".style-pills");
    var eyePillWrap = root.querySelector(".eye-pills");
    var frameToggle = root.querySelector(".frame-toggle");
    var frameInput = root.querySelector(".frame-input");
    var logoToggle = root.querySelector(".logo-toggle");
    var logoFileInput = root.querySelector(".logo-file");
    var downloadPngBtn = root.querySelector(".dl-png");
    var downloadSvgBtn = root.querySelector(".dl-svg");
    var downloadJpgBtn = null;
    var downloadPdfBtn = null;
    var downloadEpsBtn = null;
    var sizeSel = null;
    var transpChk = null;

    // Export options are injected so every page that embeds the generator gets them.
    (function buildExportUI() {
      var row = root.querySelector(".download-row");
      if (!row || !downloadPngBtn) return;
      var box = el("div", { class: "export-opts" });
      var sizeLabel = el("label", { class: "exp-field" }, X("size", "Download size") + " ");
      sizeSel = el("select", { class: "exp-size", "aria-label": X("size", "Download size") });
      [["512", "512 px"], ["1024", "1024 px"], ["2048", "2048 px"], ["4096", "4096 px"]].forEach(function (o) {
        var opt = el("option", { value: o[0] }, o[1]);
        if (o[0] === "1024") opt.selected = true;
        sizeSel.appendChild(opt);
      });
      sizeLabel.appendChild(sizeSel);
      var tLabel = el("label", { class: "exp-field" });
      transpChk = el("input", { type: "checkbox", class: "exp-transp" });
      tLabel.appendChild(transpChk);
      tLabel.appendChild(document.createTextNode(" " + X("transparent", "Transparent background (PNG, SVG)")));
      box.appendChild(sizeLabel);
      box.appendChild(tLabel);
      row.parentNode.insertBefore(box, row);

      downloadJpgBtn = el("button", { type: "button", class: "btn dl-jpg" }, X("jpg", "Download JPG"));
      downloadJpgBtn.disabled = true;
      var sub = root.querySelector(".download-sub");
      if (sub) sub.insertBefore(downloadJpgBtn, sub.firstChild);
      else row.appendChild(downloadJpgBtn);
      downloadPdfBtn = el("button", { type: "button", class: "btn dl-pdf", title: X("vecNote", "Vector file with solid colors: no gradient and no logo.") }, X("pdf", "Download PDF"));
      downloadEpsBtn = el("button", { type: "button", class: "btn dl-eps", title: X("vecNote", "Vector file with solid colors: no gradient and no logo.") }, X("eps", "Download EPS"));
      downloadPdfBtn.disabled = downloadEpsBtn.disabled = true;
      var target = sub || row;
      target.appendChild(downloadPdfBtn);
      target.appendChild(downloadEpsBtn);
      box.appendChild(el("small", { class: "exp-note" }, X("vecNote", "PDF and EPS are vector files with solid colors: no gradient and no logo.")));
    })();
    var emptyState = root.querySelector(".empty-state");

    var state = {
      type: defaultType,
      fields: {},
      fg: COLOR_SWATCHES[0],
      fg2: "#8B5CF6",
      gradient: "none",
      eyeColor: null,
      frameStyle: "bottom",
      ecc: "M",
      margin: 4,
      bg: BG_SWATCHES[0],
      style: "square",
      eyeStyle: "classic",
      frameOn: false,
      frameText: SCAN_ME,
      logoOn: false,
      logoSrc: null,
      picOn: false,
      picImg: null,
      picDot: 0.42
    };

    function buildTabs() {
      if (!tabsEl) return;
      tabsEl.innerHTML = "";
      allowed.forEach(function (t) {
        if (!TYPES[t]) return;
        var btn = el(
          "button",
          { type: "button", class: "type-btn", "data-type": t, "aria-selected": t === state.type ? "true" : "false" },
          '<svg viewBox="0 0 24 24" fill="none">' + ICONS[t] + "</svg><span>" + TYPES[t].label + "</span>"
        );
        if (!lockType) {
          btn.addEventListener("click", function () {
            state.type = t;
            state.fields = {};
            buildTabs();
            buildFields();
            render();
          });
        } else {
          btn.disabled = allowed.length <= 1;
        }
        tabsEl.appendChild(btn);
      });
    }

    function buildFields() {
      if (!fieldsEl) return;
      fieldsEl.innerHTML = "";
      var cfg = TYPES[state.type];
      var fieldLabel = root.getAttribute("data-label");
      var fieldPlaceholder = root.getAttribute("data-placeholder");
      cfg.fields.forEach(function (f) {
        if (cfg.fields.length === 1) {
          if (fieldLabel) f.label = fieldLabel;
          if (fieldPlaceholder) f.placeholder = fieldPlaceholder;
        }
        var wrap = el("div", { class: "field" });
        var label = el("label", { for: "f-" + f.name }, f.label);
        wrap.appendChild(label);
        var input;
        if (f.type === "textarea") {
          input = el("textarea", { id: "f-" + f.name, rows: "3", placeholder: f.placeholder || "" });
        } else if (f.type === "select") {
          input = el("select", { id: "f-" + f.name });
          f.options.forEach(function (opt) {
            input.appendChild(el("option", { value: opt[0] }, opt[1]));
          });
        } else {
          input = el("input", { id: "f-" + f.name, type: f.type === "datetime" ? "datetime-local" : "text", placeholder: f.placeholder || "", autocomplete: "off" });
        }
        input.addEventListener("input", function () {
          state.fields[f.name] = input.value;
          render();
        });
        wrap.appendChild(input);
        fieldsEl.appendChild(wrap);
        state.fields[f.name] = input.value || "";
      });
    }

    function buildSwatches(wrap, colors, key) {
      if (!wrap) return;
      wrap.innerHTML = "";
      colors.forEach(function (c, i) {
        var btn = el("button", {
          type: "button", class: "swatch", style: "background:" + c,
          "aria-pressed": i === 0 ? "true" : "false", "aria-label": c
        });
        btn.addEventListener("click", function () {
          wrap.querySelectorAll(".swatch").forEach(function (s) { s.setAttribute("aria-pressed", "false"); });
          btn.setAttribute("aria-pressed", "true");
          state[key] = c;
          render();
        });
        wrap.appendChild(btn);
      });
    }

    function buildPills(wrap, options, key) {
      if (!wrap) return;
      wrap.innerHTML = "";
      options.forEach(function (opt, i) {
        var btn = el("button", { type: "button", class: "pill", "data-value": opt[0], "aria-pressed": i === 0 ? "true" : "false" }, opt[1]);
        btn.addEventListener("click", function () {
          wrap.querySelectorAll(".pill").forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
          btn.setAttribute("aria-pressed", "true");
          state[key] = opt[0];
          render();
        });
        wrap.appendChild(btn);
      });
    }

    function currentPayload() {
      return window.SmartQR.buildPayload(state.type, state.fields);
    }

    function render() {
      var payload = currentPayload();
      if (!window.SmartQR.isPayloadValid(payload)) {
        if (canvas) canvas.style.display = "none";
        if (emptyState) emptyState.style.display = "flex";
        if (downloadPngBtn) downloadPngBtn.disabled = true;
        if (downloadSvgBtn) downloadSvgBtn.disabled = true;
        if (downloadJpgBtn) downloadJpgBtn.disabled = true;
        if (downloadPdfBtn) downloadPdfBtn.disabled = true;
        if (downloadEpsBtn) downloadEpsBtn.disabled = true;
        return;
      }
      if (emptyState) emptyState.style.display = "none";
      if (canvas) canvas.style.display = "block";
      if (downloadPngBtn) downloadPngBtn.disabled = false;
      if (downloadSvgBtn) downloadSvgBtn.disabled = false;
      if (downloadJpgBtn) downloadJpgBtn.disabled = false;
      if (downloadPdfBtn) downloadPdfBtn.disabled = false;
      if (downloadEpsBtn) downloadEpsBtn.disabled = false;

      var ro = designOpts();
      ro.size = 480;
      var pic = state.picOn && state.picImg;
      [downloadSvgBtn, downloadPdfBtn, downloadEpsBtn].forEach(function (b) { if (b && pic) b.disabled = true; });
      if (pic) window.SmartQR.renderPictureToCanvas(canvas, payload, { size: 480, image: state.picImg, fg: state.fg, dot: state.picDot });
      else window.SmartQR.renderToCanvas(canvas, payload, ro);
      updateContrastNote();
      syncColorUI();
      refreshThumbs();
    }

    function designOpts() {
      return {
        fg: state.fg, fg2: state.fg2, gradient: state.gradient, eyeColor: state.eyeColor,
        bg: state.bg, style: state.style, eyeStyle: state.eyeStyle,
        frameText: state.frameOn ? state.frameText : "", frameStyle: state.frameStyle,
        ecc: state.ecc, margin: state.margin,
        logoSrc: state.logoOn ? state.logoSrc : null
      };
    }

    var contrastNote = null;
    function updateContrastNote() {
      if (!contrastNote) return;
      var worst = contrast(state.fg, state.bg);
      if (state.gradient !== "none") worst = Math.min(worst, contrast(state.fg2, state.bg));
      if (state.eyeColor) worst = Math.min(worst, contrast(state.eyeColor, state.bg));
      contrastNote.style.display = worst < 3 ? "block" : "none";
    }

    if (frameToggle && frameInput) {
      frameToggle.addEventListener("change", function () {
        state.frameOn = frameToggle.checked;
        frameInput.disabled = !state.frameOn;
        render();
      });
      frameInput.addEventListener("input", function () {
        state.frameText = frameInput.value.trim() || SCAN_ME;
        render();
      });
    }
    if (logoToggle) {
      logoToggle.addEventListener("change", function () {
        state.logoOn = logoToggle.checked;
        if (state.logoOn && !state.logoSrc) {
          logoFileInput && logoFileInput.click();
        }
        render();
      });
    }
    if (logoFileInput) {
      logoFileInput.addEventListener("change", function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          state.logoSrc = reader.result;
          state.logoOn = true;
          if (logoToggle) logoToggle.checked = true;
          render();
        };
        reader.readAsDataURL(file);
      });
    }
    function exportOpts(forceOpaque) {
      var o = designOpts();
      o.transparent = !!(transpChk && transpChk.checked && !forceOpaque);
      return o;
    }
    function exportCanvas(forceOpaque, cb) {
      var size = sizeSel ? parseInt(sizeSel.value, 10) || 1024 : 1024;
      var c = document.createElement("canvas");
      var o = exportOpts(forceOpaque);
      o.size = size;
      if (state.picOn && state.picImg) {
        window.SmartQR.renderPictureToCanvas(c, currentPayload(), { size: size, image: state.picImg, fg: state.fg, dot: state.picDot });
        cb(c);
        return;
      }
      o.onReady = function () { cb(c); };
      window.SmartQR.renderToCanvas(c, currentPayload(), o);
    }
    if (downloadPngBtn) {
      downloadPngBtn.addEventListener("click", function () {
        exportCanvas(false, function (c) {
          window.SmartQR.downloadCanvas(c, "smartqrcraft-" + state.type + ".png", "image/png");
        });
      });
    }
    if (downloadJpgBtn) {
      downloadJpgBtn.addEventListener("click", function () {
        exportCanvas(true, function (c) {
          window.SmartQR.downloadCanvas(c, "smartqrcraft-" + state.type + ".jpg", "image/jpeg", 0.95);
        });
      });
    }
    function vectorDownload(kind) {
      var o = exportOpts(false);
      var geo = window.SmartQR.vectorGeometry(currentPayload(), o);
      var blob = kind === "pdf" ? window.SmartQR.toPDF(geo) : window.SmartQR.toEPS(geo);
      window.SmartQR.downloadBlob(blob, "smartqrcraft-" + state.type + "." + kind);
    }
    if (downloadPdfBtn) downloadPdfBtn.addEventListener("click", function () { vectorDownload("pdf"); });
    if (downloadEpsBtn) downloadEpsBtn.addEventListener("click", function () { vectorDownload("eps"); });
    if (downloadSvgBtn) {
      downloadSvgBtn.addEventListener("click", function () {
        var o = exportOpts(false);
        o.size = 1024;
        var svg = window.SmartQR.renderToSVG(currentPayload(), o);
        window.SmartQR.downloadSVG(svg, "smartqrcraft-" + state.type + ".svg");
      });
    }

    buildTabs();
    buildFields();
    buildSwatches(colorWrap, COLOR_SWATCHES, "fg");
    buildSwatches(bgWrap, BG_SWATCHES, "bg");
    buildPills(stylePillWrap, STYLE_PILLS, "style");
    var dotsHint = null;
    if (stylePillWrap) {
      dotsHint = el("p", { class: "field-hint dots-hint", style: "display:none;margin:8px 0 0" }, X("dotsHint", "Dots look great but scan less reliably than square modules. Test the code before printing."));
      stylePillWrap.parentNode.appendChild(dotsHint);
      stylePillWrap.addEventListener("click", function () {
        setTimeout(function () { dotsHint.style.display = state.style === "dots" ? "block" : "none"; }, 0);
      });
    }
    buildPills(eyePillWrap, EYE_PILLS, "eyeStyle");
    if (stylePillWrap) {
      stylePillWrap.addEventListener("click", function () {
        setTimeout(function () { dotsHint.style.display = state.style === "dots" || state.style === "diamond" ? "block" : "none"; }, 0);
      });
    }
    var colorRegistry = [];
    var thumbSig = "";
    var frameGallery = null;
    var frameThumbs = [];
    buildDesignControls();
    render();

    function setPill(wrap, value) {
      if (!wrap) return;
      wrap.querySelectorAll(".pill").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-value") === value ? "true" : "false");
      });
    }
    function setSwatch(wrap, value) {
      if (!wrap) return;
      wrap.querySelectorAll(".swatch").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("aria-label").toLowerCase() === String(value).toLowerCase() ? "true" : "false");
      });
    }

    function buildDesignControls() {
      var firstRow = colorWrap && colorWrap.closest(".two-col");
      if (!firstRow) return;
      var ui = {};

      // custom color pickers, appended to the swatch rows
      function addCustom(wrap, key, label) {
        var lab = el("label", { class: "swatch-custom", title: label });
        var inp = el("input", { type: "color", value: state[key], "aria-label": label });
        inp.addEventListener("input", function () {
          state[key] = inp.value;
          wrap.querySelectorAll(".swatch").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
          render();
        });
        lab.appendChild(inp);
        wrap.appendChild(lab);
        return inp;
      }
      ui.fgInput = addCustom(colorWrap, "fg", X("customColor", "Custom color"));
      ui.bgInput = addCustom(bgWrap, "bg", X("customColor", "Custom color"));
      [[colorWrap, "fg", ui.fgInput], [bgWrap, "bg", ui.bgInput]].forEach(function (t) {
        t[0].querySelectorAll(".swatch").forEach(function (b) {
          b.addEventListener("click", function () { t[2].value = state[t[1]]; });
        });
      });

      // templates row
      var tpl = el("div", { class: "tpl-row" });
      tpl.appendChild(el("span", { class: "tpl-label" }, X("templates", "Templates")));
      TEMPLATES.forEach(function (t) {
        var chip = el("button", { type: "button", class: "tpl-chip", title: X("tpl_" + t.id, t.name) });
        var sw = el("span", { class: "tpl-sw" });
        sw.style.background = t.fg2 ? "linear-gradient(135deg," + t.fg + "," + t.fg2 + ")" : t.fg;
        sw.style.boxShadow = "inset 0 0 0 3px " + t.bg;
        chip.appendChild(sw);
        chip.appendChild(document.createTextNode(X("tpl_" + t.id, t.name)));
        chip.addEventListener("click", function () { applyTemplate(t); });
        tpl.appendChild(chip);
      });
      firstRow.parentNode.insertBefore(tpl, firstRow);

      // gradient + eye color row
      var row = el("div", { class: "two-col" });
      var gCard = el("div", { class: "option-card" });
      gCard.appendChild(el("h3", null, X("gradient", "Gradient")));
      ui.gradSel = el("select", { class: "adv-select", "aria-label": X("gradient", "Gradient") });
      [["none", X("gNone", "None")], ["h", X("gH", "Horizontal")], ["v", X("gV", "Vertical")], ["d", X("gD", "Diagonal")]].forEach(function (o) {
        ui.gradSel.appendChild(el("option", { value: o[0] }, o[1]));
      });
      ui.fg2Input = el("input", { type: "color", value: state.fg2, class: "adv-color", "aria-label": X("gradient2", "Second color"), disabled: "disabled" });
      var gRow = el("div", { class: "adv-inline" });
      gRow.appendChild(ui.gradSel);
      gRow.appendChild(ui.fg2Input);
      gCard.appendChild(gRow);
      ui.gradSel.addEventListener("change", function () {
        state.gradient = ui.gradSel.value;
        ui.fg2Input.disabled = state.gradient === "none";
        render();
      });
      ui.fg2Input.addEventListener("input", function () { state.fg2 = ui.fg2Input.value; render(); });

      var eCard = el("div", { class: "option-card" });
      eCard.appendChild(el("h3", null, X("eyeColor", "Corner color")));
      var eRow = el("div", { class: "adv-inline" });
      ui.eyeSame = el("input", { type: "checkbox", checked: "checked", "aria-label": X("sameColor", "Same as code") });
      var sameLab = el("label", { class: "adv-check" });
      sameLab.appendChild(ui.eyeSame);
      sameLab.appendChild(document.createTextNode(" " + X("sameColor", "Same as code")));
      ui.eyeInput = el("input", { type: "color", value: "#6D28D9", class: "adv-color", disabled: "disabled", "aria-label": X("eyeColor", "Corner color") });
      eRow.appendChild(sameLab);
      eRow.appendChild(ui.eyeInput);
      eCard.appendChild(eRow);
      ui.eyeSame.addEventListener("change", function () {
        state.eyeColor = ui.eyeSame.checked ? null : ui.eyeInput.value;
        ui.eyeInput.disabled = ui.eyeSame.checked;
        render();
      });
      ui.eyeInput.addEventListener("input", function () { if (!ui.eyeSame.checked) { state.eyeColor = ui.eyeInput.value; render(); } });

      row.appendChild(gCard);
      row.appendChild(eCard);

      // error correction + border
      var row2 = el("div", { class: "two-col" });
      var ecCard = el("div", { class: "option-card" });
      ecCard.appendChild(el("h3", null, X("ecc", "Error correction")));
      ui.eccSel = el("select", { class: "adv-select", "aria-label": X("ecc", "Error correction") });
      [["L", X("eccL", "Low (7%)")], ["M", X("eccM", "Medium (15%)")], ["Q", X("eccQ", "Quartile (25%)")], ["H", X("eccH", "High (30%)")]].forEach(function (o) {
        var opt = el("option", { value: o[0] }, o[1]);
        if (o[0] === "M") opt.selected = true;
        ui.eccSel.appendChild(opt);
      });
      ecCard.appendChild(ui.eccSel);
      ecCard.appendChild(el("p", { class: "field-hint", style: "margin:6px 0 0" }, X("eccHint", "Higher levels survive more damage but make a denser code. A center logo always uses High.")));
      ui.eccSel.addEventListener("change", function () { state.ecc = ui.eccSel.value; render(); });
      var bCard = el("div", { class: "option-card" });
      bCard.appendChild(el("h3", null, X("border", "Border (quiet zone)")));
      ui.marginSel = el("select", { class: "adv-select", "aria-label": X("border", "Border (quiet zone)") });
      [[2, X("bTight", "2 modules (tight)")], [4, X("bStd", "4 modules (standard)")], [6, X("bWide", "6 modules")], [8, X("bXWide", "8 modules")]].forEach(function (o) {
        var opt = el("option", { value: String(o[0]) }, o[1]);
        if (o[0] === 4) opt.selected = true;
        ui.marginSel.appendChild(opt);
      });
      bCard.appendChild(ui.marginSel);
      ui.marginHint = el("p", { class: "field-hint", style: "margin:6px 0 0;display:none;color:#B45309" }, X("borderHint", "Less than 4 modules can make some scanners fail. Use 4 or more for print."));
      bCard.appendChild(ui.marginHint);
      ui.marginSel.addEventListener("change", function () {
        state.margin = parseInt(ui.marginSel.value, 10);
        ui.marginHint.style.display = state.margin < 4 ? "block" : "none";
        render();
      });
      row2.appendChild(ecCard);
      row2.appendChild(bCard);
      var eyeRow = eyePillWrap && eyePillWrap.closest(".two-col");
      (eyeRow || firstRow).parentNode.insertBefore(row, eyeRow ? eyeRow.nextSibling : firstRow.nextSibling);
      row.parentNode.insertBefore(row2, row.nextSibling);

      // contrast note under the preview
      var pf = root.querySelector(".preview-frame");
      if (pf) {
        contrastNote = el("p", { class: "field-hint contrast-note", role: "status", style: "display:none;margin:10px 0 0;color:#B45309" },
          X("lowContrast", "Low contrast: this code may not scan. Use a darker code color or a lighter background."));
        var dlRow = pf.querySelector(".download-row");
        pf.insertBefore(contrastNote, dlRow || null);
      }

      buildDesignTabs(ui, firstRow, row, row2, tpl);
    }

    // ---------- hex fields ----------
    function attachHex(colorInput, key, label, host) {
      var wrap = el("label", { class: "hex-field" });
      wrap.appendChild(el("span", { class: "hex-label" }, label));
      var txt = el("input", { type: "text", class: "hex-input", maxlength: "7", spellcheck: "false", value: state[key] || "#000000", "aria-label": label });
      wrap.appendChild(txt);
      var sw = el("span", { class: "hex-sw" });
      wrap.appendChild(sw);
      if (colorInput) {
        colorInput.classList.add("hex-native");
        sw.appendChild(colorInput);
      }
      host.appendChild(wrap);
      var entry = { key: key, txt: txt, color: colorInput, sw: sw };
      colorRegistry.push(entry);
      txt.addEventListener("input", function () {
        var v = txt.value.trim();
        if (v && v[0] !== "#") v = "#" + v;
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) {
          if (v.length === 4) v = "#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
          state[key] = v.toUpperCase();
          txt.classList.remove("hex-bad");
          if (key === "fg" || key === "bg") {
            var wrapEl = key === "fg" ? colorWrap : bgWrap;
            wrapEl.querySelectorAll(".swatch").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
          }
          render();
        } else {
          txt.classList.add("hex-bad");
        }
      });
      if (colorInput) colorInput.addEventListener("input", function () { state[key] = colorInput.value.toUpperCase(); render(); });
      return entry;
    }

    function syncColorUI() {
      colorRegistry.forEach(function (c) {
        var v = state[c.key];
        if (!v) return;
        if (document.activeElement !== c.txt) c.txt.value = v.toUpperCase();
        if (c.color && document.activeElement !== c.color) c.color.value = v.length === 7 ? v : c.color.value;
        c.sw.style.background = v;
      });
    }

    // ---------- shape thumbnails ----------
    function shapeThumb(kind, value) {
      var c = document.createElement("canvas");
      window.SmartQR.renderToCanvas(c, "SmartQR", {
        fg: state.fg, bg: state.bg, size: 96, margin: 1, ecc: "L",
        style: kind === "style" ? value : "square", eyeStyle: kind === "eye" ? value : "classic"
      });
      c.className = "thumb-canvas";
      return c;
    }
    function decoratePills(wrap, kind) {
      if (!wrap) return;
      wrap.classList.add("thumb-group");
      wrap.querySelectorAll(".pill").forEach(function (b) {
        var label = b.textContent;
        b.setAttribute("title", label);
        b.setAttribute("aria-label", label);
        b.classList.add("pill-thumb");
        b.innerHTML = "";
        b.appendChild(shapeThumb(kind, b.getAttribute("data-value")));
      });
    }
    function refreshThumbs() {
      var sig = [state.fg, state.bg, state.style, state.eyeStyle].join("|");
      if (sig === thumbSig) return;
      thumbSig = sig;
      [[stylePillWrap, "style"], [eyePillWrap, "eye"]].forEach(function (t) {
        if (!t[0]) return;
        t[0].querySelectorAll(".pill").forEach(function (b) {
          var old = b.querySelector("canvas");
          if (!old) return;
          b.replaceChild(shapeThumb(t[1], b.getAttribute("data-value")), old);
        });
      });
      if (frameGallery) drawFrameThumbs();
    }

    // ---------- frame gallery ----------
    function drawFrameThumbs() {
      frameThumbs.forEach(function (t) {
        var c = document.createElement("canvas");
        window.SmartQR.renderToCanvas(c, "SmartQR", {
          fg: state.fg, bg: state.bg, size: 110, margin: 1, ecc: "L", frameText: "SCAN", frameStyle: t.style
        });
        c.className = "thumb-canvas frame-thumb";
        if (t.btn.firstChild) t.btn.replaceChild(c, t.btn.firstChild); else t.btn.appendChild(c);
      });
    }
    function setFrame(styleName) {
      var on = styleName !== "none";
      state.frameOn = on;
      if (on) state.frameStyle = styleName;
      if (frameToggle) frameToggle.checked = on;
      if (frameInput) {
        frameInput.disabled = !on;
        if (on) state.frameText = frameInput.value.trim() || SCAN_ME;
      }
      if (frameGallery) {
        frameGallery.querySelectorAll(".frame-opt").forEach(function (b) {
          b.setAttribute("aria-pressed", b.getAttribute("data-frame") === (on ? styleName : "none") ? "true" : "false");
        });
      }
      render();
    }

    // ---------- tabs ----------
    function buildDesignTabs(ui, firstRow, gradRow, advRow, tplRow) {
      var col = root.querySelector(".builder-col");
      var fieldBox = root.querySelector(".field-container");
      if (!col || !fieldBox) return;
      var styleRow = stylePillWrap && stylePillWrap.closest(".two-col");
      var frameCard = frameToggle && frameToggle.closest(".option-card");
      var logoCard = logoToggle && logoToggle.closest(".option-card");
      var oldPair = frameCard && frameCard.parentNode;

      var panels = {
        shape: el("div", { class: "dp", "data-panel": "shape" }),
        frame: el("div", { class: "dp", "data-panel": "frame" }),
        logo: el("div", { class: "dp", "data-panel": "logo" }),
        adv: el("div", { class: "dp", "data-panel": "adv" })
      };
      [tplRow, firstRow, styleRow, gradRow].forEach(function (n) { if (n) panels.shape.appendChild(n); });
      if (advRow) panels.adv.appendChild(advRow);

      // frame panel: gallery + text
      frameGallery = el("div", { class: "frame-gallery", role: "group", "aria-label": X("tabFrame", "Frame") });
      var options = ["none"].concat(window.SmartQR.FRAME_STYLES);
      var names = { none: X("fNone", "No frame"), bottom: X("fBottom", "Bar below"), top: X("fTop", "Bar above"), badge: X("fBadge", "Badge below"),
        bubble: X("fBubble", "Speech bubble"), outline: X("fOutline", "Outline box"), corners: X("fCorners", "Corner marks"), text: X("fText", "Text only"),
        bag: X("fBag", "Shopping bag"), gift: X("fGift", "Gift box"), cup: X("fCup", "Coffee cup"),
        envelope: X("fEnvelope", "Envelope"), chef: X("fChef", "Chef hat"), phone: X("fPhone", "Phone") };
      options.forEach(function (name) {
        var b = el("button", { type: "button", class: "frame-opt", "data-frame": name, title: names[name], "aria-label": names[name], "aria-pressed": name === "none" ? "true" : "false" });
        if (name === "none") {
          b.innerHTML = '<svg viewBox="0 0 24 24" width="30" height="30" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M6 6l12 12" stroke="currentColor" stroke-width="1.8"/></svg>';
        } else {
          b.appendChild(document.createElement("canvas"));
          frameThumbs.push({ style: name, btn: b });
        }
        b.addEventListener("click", function () { setFrame(name); });
        frameGallery.appendChild(b);
      });
      panels.frame.appendChild(frameGallery);
      if (frameCard) {
        var tr = frameCard.querySelector(".toggle-row");
        if (tr) tr.style.display = "none";
        var lab = el("label", { class: "frame-text-label" }, X("frameText", "Frame text"));
        frameCard.insertBefore(lab, frameInput);
        frameCard.classList.add("frame-text-card");
        panels.frame.appendChild(frameCard);
      }
      if (logoCard) panels.logo.appendChild(logoCard);
      (function buildPictureCard() {
        var card = el("div", { class: "option-card pic-card" });
        var tr = el("div", { class: "toggle-row" });
        tr.appendChild(el("h3", { style: "margin:0" }, X("picTitle", "Picture QR (photo behind the code)")));
        var sw = el("label", { class: "switch" });
        var tog = el("input", { type: "checkbox", class: "pic-toggle", "aria-label": X("picTitle", "Picture QR (photo behind the code)") });
        sw.appendChild(tog); sw.appendChild(el("span", { class: "slider" }));
        tr.appendChild(sw);
        card.appendChild(tr);
        var file = el("input", { type: "file", accept: "image/png,image/jpeg,image/webp", class: "visually-hidden pic-file" });
        var pick = el("button", { type: "button", class: "btn", style: "margin-top:10px" }, X("picChoose", "Choose a photo"));
        pick.addEventListener("click", function () { file.click(); });
        var dotLab = el("label", { class: "exp-field", style: "display:block;margin-top:12px;font-size:13px" }, X("picDot", "Dot size") + " ");
        var dotIn = el("input", { type: "range", min: "0.32", max: "0.56", step: "0.02", value: String(state.picDot), style: "width:100%" });
        dotLab.appendChild(dotIn);
        card.appendChild(file); card.appendChild(pick); card.appendChild(dotLab);
        card.appendChild(el("p", { class: "field-hint", style: "margin:10px 0 0" }, X("picHint", "The photo shows through small dots. Downloads are PNG or JPG only; frame and center logo are not used. Bigger dots scan more easily. Always test before printing.")));
        function load(f) {
          var rd = new FileReader();
          rd.onload = function () {
            var im = new Image();
            im.onload = function () { state.picImg = im; state.picOn = true; tog.checked = true; render(); };
            im.src = rd.result;
          };
          rd.readAsDataURL(f);
        }
        file.addEventListener("change", function () { if (file.files && file.files[0]) load(file.files[0]); });
        tog.addEventListener("change", function () {
          state.picOn = tog.checked;
          if (state.picOn && !state.picImg) file.click();
          render();
        });
        dotIn.addEventListener("input", function () { state.picDot = parseFloat(dotIn.value); render(); });
        panels.logo.appendChild(card);
      })();
      if (oldPair && oldPair.parentNode && !oldPair.children.length) oldPair.parentNode.removeChild(oldPair);

      var bar = el("div", { class: "design-tabs", role: "tablist" });
      var defs = [["shape", X("tabShape", "Color & Shape")], ["frame", X("tabFrame", "Frame")], ["logo", X("tabLogo", "Logo")], ["adv", X("tabAdv", "Advanced")]];
      defs.forEach(function (d, i) {
        var t = el("button", { type: "button", class: "design-tab", role: "tab", "data-tab": d[0], "aria-selected": i === 0 ? "true" : "false" }, d[1]);
        t.addEventListener("click", function () {
          bar.querySelectorAll(".design-tab").forEach(function (x) { x.setAttribute("aria-selected", x === t ? "true" : "false"); });
          Object.keys(panels).forEach(function (k) { panels[k].style.display = k === d[0] ? "" : "none"; });
          if (d[0] === "frame") drawFrameThumbs();
        });
        bar.appendChild(t);
      });
      Object.keys(panels).forEach(function (k) { if (k !== "shape") panels[k].style.display = "none"; });
      fieldBox.parentNode.insertBefore(bar, fieldBox.nextSibling);
      var anchor = bar;
      ["shape", "frame", "logo", "adv"].forEach(function (k) {
        anchor.parentNode.insertBefore(panels[k], anchor.nextSibling);
        anchor = panels[k];
      });

      // hex fields for the colors
      var colorHost = el("div", { class: "hex-row" });
      var qrEntry = attachHex(ui.fgInput, "fg", X("qrColor", "QR Code Color"), colorHost);
      var bgEntry = attachHex(ui.bgInput, "bg", X("bgColor", "Background Color"), colorHost);
      firstRow.parentNode.insertBefore(colorHost, firstRow.nextSibling);
      // the rainbow picker circles are now part of the hex fields
      [colorWrap, bgWrap].forEach(function (w) { var c = w && w.querySelector(".swatch-custom"); if (c) c.style.display = "none"; });
      var g2 = attachHex(ui.fg2Input, "fg2", X("gradient2", "Second color"), gradRow.querySelector(".option-card"));
      var eyeHost = gradRow.querySelectorAll(".option-card")[1];
      var ee = attachHex(ui.eyeInput, "eyeColor", X("eyeColor", "Corner color"), eyeHost);
      ee.txt.value = "#6D28D9";

      decoratePills(stylePillWrap, "style");
      decoratePills(eyePillWrap, "eye");
      drawFrameThumbs();
      syncColorUI();
    }

    function applyTemplate(t) {
      state.fg = t.fg;
      state.bg = t.bg;
      state.style = t.style;
      state.eyeStyle = t.eye;
      state.gradient = t.grad || "none";
      if (t.fg2) state.fg2 = t.fg2;
      state.eyeColor = t.eyeColor || null;
      setSwatch(colorWrap, t.fg);
      setSwatch(bgWrap, t.bg);
      setPill(stylePillWrap, t.style);
      setPill(eyePillWrap, t.eye);
      var q = function (sel) { return root.querySelector(sel); };
      var inputs = root.querySelectorAll(".swatch-custom input");
      if (inputs[0]) inputs[0].value = t.fg;
      if (inputs[1]) inputs[1].value = t.bg;
      var gs = q(".adv-select"), colors = root.querySelectorAll(".adv-color");
      if (gs) gs.value = state.gradient;
      if (colors[0]) { colors[0].value = state.fg2; colors[0].disabled = state.gradient === "none"; }
      var same = root.querySelector(".adv-check input");
      if (same && colors[1]) {
        same.checked = !state.eyeColor;
        colors[1].disabled = same.checked;
        if (state.eyeColor) colors[1].value = state.eyeColor;
      }
      if (dotsHint) dotsHint.style.display = state.style === "dots" || state.style === "diamond" ? "block" : "none";
      render();
    }

    // ---- Recent QR codes: kept only in this browser (localStorage), never sent anywhere ----
    var HKEY = "smartqr_history_v1", HMAX = 12;
    function readHistory() {
      try { var v = JSON.parse(window.localStorage.getItem(HKEY) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; }
    }
    function writeHistory(list) {
      try { window.localStorage.setItem(HKEY, JSON.stringify(list)); } catch (e) { /* storage blocked: history is optional */ }
    }
    function saveHistory() {
      var payload = currentPayload();
      if (!window.SmartQR.isPayloadValid(payload)) return;
      var entry = { t: state.type, f: JSON.parse(JSON.stringify(state.fields)), p: payload.slice(0, 80), ts: Date.now(),
        d: { fg: state.fg, bg: state.bg, style: state.style, eye: state.eyeStyle, grad: state.gradient, fg2: state.fg2, eyeColor: state.eyeColor } };
      var list = readHistory().filter(function (h) { return !(h.t === entry.t && h.p === entry.p); });
      list.unshift(entry);
      writeHistory(list.slice(0, HMAX));
      drawHistory();
    }
    function restoreEntry(h) {
      if (allowed.indexOf(h.t) === -1 || !TYPES[h.t]) {
        try { window.sessionStorage.setItem("smartqr_restore", JSON.stringify(h)); } catch (e) { return; }
        window.location.href = "index.html?type=" + encodeURIComponent(h.t) + "#generator";
        return;
      }
      state.type = h.t;
      buildTabs();
      buildFields();
      Object.keys(h.f || {}).forEach(function (k) {
        var inp = root.querySelector("#f-" + k);
        if (inp) { inp.value = h.f[k]; state.fields[k] = h.f[k]; }
      });
      var d = h.d || {};
      applyTemplate({ fg: d.fg || COLOR_SWATCHES[0], bg: d.bg || BG_SWATCHES[0], style: d.style || "square", eye: d.eye || "classic",
        grad: d.grad && d.grad !== "none" ? d.grad : null, fg2: d.fg2, eyeColor: d.eyeColor });
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    var histBox = null;
    function drawHistory() {
      var list = readHistory();
      if (!histBox) {
        histBox = el("div", { class: "qr-history" });
        root.parentNode.insertBefore(histBox, root.nextSibling);
      }
      histBox.style.display = list.length ? "" : "none";
      if (!list.length) return;
      histBox.innerHTML = "";
      var head = el("div", { class: "qr-history-head" }, "<h3>" + X("histTitle", "Your recent QR codes") + "</h3>");
      var clear = el("button", { type: "button", class: "btn qr-history-clear" }, X("histClear", "Clear"));
      clear.addEventListener("click", function () { writeHistory([]); drawHistory(); });
      head.appendChild(clear);
      histBox.appendChild(head);
      histBox.appendChild(el("p", { class: "field-hint", style: "margin:0 0 10px" }, X("histNote", "Saved only in this browser when you download. Nothing is uploaded.")));
      var row = el("div", { class: "qr-history-row" });
      list.forEach(function (h) {
        var b = el("button", { type: "button", class: "qr-history-item", title: h.p });
        var c = document.createElement("canvas");
        try {
          var d = h.d || {};
          window.SmartQR.renderToCanvas(c, window.SmartQR.buildPayload(h.t, h.f) || h.p, { size: 120, fg: d.fg, bg: d.bg, style: d.style, eyeStyle: d.eye,
            gradient: d.grad, fg2: d.fg2, eyeColor: d.eyeColor, margin: 2 });
        } catch (e) { /* bad entry: skip the thumbnail */ }
        b.appendChild(c);
        var label = (TYPES[h.t] && TYPES[h.t].label) || h.t;
        var shown = h.t === "wifi" ? (h.f && h.f.ssid) || "" : h.p.replace(/^https?:\/\//, "");
        b.appendChild(el("span", { class: "qr-history-type" }, label));
        b.appendChild(el("span", { class: "qr-history-text" }, String(shown).replace(/[<>&"]/g, "").slice(0, 28)));
        b.addEventListener("click", function () { restoreEntry(h); });
        row.appendChild(b);
      });
      histBox.appendChild(row);
    }
    [downloadPngBtn, downloadJpgBtn, downloadSvgBtn, downloadPdfBtn, downloadEpsBtn].forEach(function (b) {
      if (b) b.addEventListener("click", saveHistory);
    });
    try {
      var pending = window.sessionStorage.getItem("smartqr_restore");
      if (pending) {
        window.sessionStorage.removeItem("smartqr_restore");
        var ph = JSON.parse(pending);
        if (allowed.indexOf(ph.t) !== -1) restoreEntry(ph);
      }
    } catch (e) { /* no session storage: nothing to restore */ }
    drawHistory();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".qr-generator").forEach(initGenerator);
  });
})();
