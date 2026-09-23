/*! SmartQRCraft — builder for the embeddable QR code widget (qr-code-widget.html). */
(function () {
  "use strict";

  var DEFAULT_CAPTION = "Scan to open on your phone"; // what embed.js shows when data-caption is absent
  var T = Object.assign({
    title: "QR Code Widget Builder", pill: "Copy, paste, done", opens: "QR code opens",
    mPage: "The page the visitor is on (automatic)", mFixed: "A fixed link or text",
    opensHint: "Automatic mode makes a code for whatever page the widget is on, so one snippet works site-wide.",
    content: "Link or text", size: "Size", color: "Color", caption: "Caption (leave empty to hide)",
    credit: "Show the small \u201cQR by SmartQRCraft\u201d link (thank you!)", paste: "Paste this into your page",
    copy: "Copy code", copied: "Copied", codeLabel: "Widget code", defaultCaption: DEFAULT_CAPTION,
    origin: "https://smartqrcraft.com" // the domain the snippet loads embed.js from
  }, window.SMARTQR_EMBED_I18N || {});

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function attr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

  function init(root) {
    var state = { mode: "page", content: "", size: "160", color: "#111827", caption: T.defaultCaption, credit: true };
    root.innerHTML = "";
    root.appendChild(el("div", { class: "generator-head" },
      '<h2>' + T.title + '</h2><span class="status-pill"><span class="status-dot"></span>' + T.pill + '</span>'));
    var body = el("div", { class: "bulk-body print-body" });
    var left = el("div", { class: "bulk-col" }), right = el("div", { class: "bulk-col" });
    body.appendChild(left); body.appendChild(right); root.appendChild(body);

    function field(label, ctrl, hint) {
      var w = el("div", { class: "field" });
      var id = "w-" + Math.random().toString(36).slice(2, 8);
      ctrl.id = id;
      w.appendChild(el("label", { for: id }, label));
      w.appendChild(ctrl);
      if (hint) w.appendChild(el("p", { class: "field-hint", style: "margin:6px 0 0" }, hint));
      return w;
    }
    var mode = el("select");
    [["page", T.mPage], ["fixed", T.mFixed]].forEach(function (o) { mode.appendChild(el("option", { value: o[0] }, o[1])); });
    var content = el("input", { type: "text", placeholder: "https://example.com/app", autocomplete: "off" });
    var contentWrap = field(T.content, content);
    contentWrap.style.display = "none";
    var size = el("select");
    [["120", "120 px"], ["160", "160 px"], ["200", "200 px"], ["260", "260 px"]].forEach(function (o) { var op = el("option", { value: o[0] }, o[1]); if (o[0] === "160") op.selected = true; size.appendChild(op); });
    var color = el("input", { type: "color", value: state.color });
    var caption = el("input", { type: "text", value: state.caption });
    var creditLab = el("label", { class: "exp-field", style: "display:flex;gap:8px;align-items:center;font-size:14px;margin-bottom:12px" });
    var credit = el("input", { type: "checkbox" });
    credit.checked = true;
    creditLab.appendChild(credit);
    creditLab.appendChild(document.createTextNode(T.credit));

    left.appendChild(field(T.opens, mode, T.opensHint));
    left.appendChild(contentWrap);
    var two = el("div", { class: "two-col" });
    two.appendChild(field(T.size, size));
    two.appendChild(field(T.color, color));
    left.appendChild(two);
    left.appendChild(field(T.caption, caption));
    left.appendChild(creditLab);

    var preview = el("div", { class: "print-preview widget-preview" });
    right.appendChild(preview);
    var code = el("textarea", { class: "widget-code", rows: "6", readonly: "readonly", "aria-label": T.codeLabel });
    right.appendChild(el("label", { style: "display:block;font-weight:700;font-size:14px;margin:14px 0 8px" }, T.paste));
    right.appendChild(code);
    var copy = el("button", { type: "button", class: "btn btn-primary", style: "margin-top:10px" }, T.copy);
    right.appendChild(copy);

    function snippet() {
      var a = ["data-smartqr" + (state.mode === "fixed" ? '="' + attr(state.content) + '"' : "")];
      if (state.size !== "160") a.push('data-size="' + state.size + '"');
      if (state.color.toLowerCase() !== "#111827") a.push('data-color="' + state.color + '"');
      if (state.caption !== DEFAULT_CAPTION) a.push('data-caption="' + attr(state.caption) + '"');
      if (!state.credit) a.push('data-credit="off"');
      return "<div " + a.join(" ") + "></div>\n<script src=\"" + T.origin + "/embed.js\" async></script>";
    }
    function render() {
      contentWrap.style.display = state.mode === "fixed" ? "" : "none";
      code.value = snippet();
      var node = el("div");
      node.setAttribute("data-smartqr", state.mode === "fixed" ? (state.content || "https://example.com") : window.location.href);
      node.setAttribute("data-size", state.size);
      node.setAttribute("data-color", state.color);
      node.setAttribute("data-caption", state.caption);
      if (!state.credit) node.setAttribute("data-credit", "off");
      preview.innerHTML = "";
      preview.appendChild(node);
      if (window.SmartQRWidget) window.SmartQRWidget.render();
    }
    mode.addEventListener("change", function () { state.mode = mode.value; render(); });
    content.addEventListener("input", function () { state.content = content.value; render(); });
    size.addEventListener("change", function () { state.size = size.value; render(); });
    color.addEventListener("input", function () { state.color = color.value; render(); });
    caption.addEventListener("input", function () { state.caption = caption.value; render(); });
    credit.addEventListener("change", function () { state.credit = credit.checked; render(); });
    copy.addEventListener("click", function () {
      var done = function () { copy.textContent = T.copied; setTimeout(function () { copy.textContent = T.copy; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(code.value).then(done, function () { code.select(); document.execCommand("copy"); done(); });
      else { code.select(); document.execCommand("copy"); done(); }
    });
    render();
  }

  function start() { document.querySelectorAll(".qr-embed").forEach(init); }
  if (window.SmartQRWidget) start();
  else {
    var s = document.createElement("script");
    s.src = "embed.js";
    s.onload = start;
    document.head.appendChild(s);
  }
})();
