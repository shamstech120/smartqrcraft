/* SmartQRCraft embeddable QR code widget (core). build.py bundles it with qrcode-lib.js into /embed.js.
   Usage: <div data-smartqr></div> <script src="https://smartqrcraft.com/embed.js" async></script>
   Attributes: data-smartqr (content; empty = the current page URL), data-size (px, 80-600), data-color,
   data-bg, data-caption (text under the code; "" hides it), data-credit ("off" hides the credit link). */
  var CREDIT_URL = "https://smartqrcraft.com/qr-code-widget.html";

  function hex(v, d) { return /^#[0-9a-fA-F]{3,8}$/.test(v || "") ? v : d; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function svgFor(text, size, fg, bg) {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"]; // default is Latin-1; UTF-8 keeps umlauts intact
    var qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    var count = qr.getModuleCount(), m = 4, total = count + m * 2, d = [];
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (qr.isDark(r, c)) d.push("M" + (c + m) + " " + (r + m) + "h1v1h-1z");
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + total + " " + total +
      '" shape-rendering="crispEdges" role="img" aria-label="QR code"><rect width="' + total + '" height="' + total + '" fill="' + bg +
      '"/><path fill="' + fg + '" d="' + d.join("") + '"/></svg>';
  }

  function render(node) {
    if (node.getAttribute("data-smartqr-done")) return;
    node.setAttribute("data-smartqr-done", "1");
    var text = node.getAttribute("data-smartqr") || window.location.href;
    var size = Math.max(80, Math.min(600, parseInt(node.getAttribute("data-size"), 10) || 160));
    var fg = hex(node.getAttribute("data-color"), "#111827");
    var bg = hex(node.getAttribute("data-bg"), "#ffffff");
    var caption = node.hasAttribute("data-caption") ? node.getAttribute("data-caption") : "Scan to open on your phone";
    var credit = node.getAttribute("data-credit") !== "off";
    var html;
    try {
      html = svgFor(text, size, fg, bg);
    } catch (e) {
      node.textContent = "QR code: content too long";
      return;
    }
    var box = '<div style="display:inline-block;text-align:center;font:13px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#334155">' + html;
    if (caption) box += '<div style="margin-top:6px">' + esc(caption) + "</div>";
    if (credit) box += '<div style="margin-top:2px;font-size:11px;opacity:.75"><a href="' + CREDIT_URL + '" style="color:inherit" target="_blank" rel="noopener">QR by SmartQRCraft</a></div>';
    node.innerHTML = box + "</div>";
  }

  function run() {
    var nodes = document.querySelectorAll("[data-smartqr]");
    for (var i = 0; i < nodes.length; i++) render(nodes[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
  window.SmartQRWidget = { render: run };
