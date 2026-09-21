/*! SmartQRCraft — barcode generator (single or batch). Uses JsBarcode (MIT). Runs in the browser. */
(function () {
  "use strict";

  var I = (window.SMARTQR_I18N && window.SMARTQR_I18N.barcode) || {};
  var EN = {
    title: "Barcode Generator", pill: "Runs in your browser",
    values: "One value per line", type: "Barcode type", barWidth: "Bar width", height: "Height", showText: "Show numbers below the bars",
    color: "Bar color", bg: "Background", margin: "Margin", preview: "Preview", noValid: "Enter a value to see the barcode.",
    invalid: "Invalid for this type", downloadPng: "Download PNG", downloadSvg: "Download SVG", downloadZip: "Download ZIP",
    ready: "barcodes ready", first: "Preview of the first valid line.", privacy: "Your values are processed on your device. Nothing is uploaded to a server.",
    line: "Line", skipped: "skipped", sample: "Use sample",
    hCode128: "Any text, letters and numbers. Most flexible.",
    hEAN13: "12 or 13 digits. The check digit is added for you if you enter 12.",
    hEAN8: "7 or 8 digits. The check digit is added for you if you enter 7.",
    hUPC: "11 or 12 digits (UPC-A). The check digit is added for you if you enter 11.",
    hCODE39: "Capital letters A to Z, numbers and - . $ / + % and space.",
    hITF: "Digits only, an even number of digits.",
    hITF14: "13 or 14 digits, for shipping cartons.",
    hcodabar: "Digits and - $ : / . + , usually wrapped in A, B, C or D."
  };
  function T(k) { return I[k] || EN[k] || k; }

  var TYPES = [["CODE128", "Code 128"], ["EAN13", "EAN-13"], ["EAN8", "EAN-8"], ["UPC", "UPC-A"], ["CODE39", "Code 39"], ["ITF", "ITF (Interleaved 2 of 5)"], ["ITF14", "ITF-14"], ["codabar", "Codabar"]];
  var SAMPLES = { CODE128: "SMARTQR-0001\nSMARTQR-0002", EAN13: "590123412345\n400638133393", EAN8: "9638507\n5512345", UPC: "03600029145\n01234567890", CODE39: "ABC-123\nHELLO 42", ITF: "1234567890\n0012345678", ITF14: "1234567890123\n0012345678905", codabar: "A123456A\nB987654C" };

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function slug(s) { return String(s).replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "barcode"; }

  function init(root) {
    root.innerHTML = "";
    root.appendChild(el("div", { class: "generator-head" }, "<h2>" + T("title") + "</h2><span class=\"status-pill\"><span class=\"status-dot\"></span>" + T("pill") + "</span>"));
    var body = el("div", { class: "bulk-body" });
    var left = el("div", { class: "bulk-col" });
    var right = el("div", { class: "bulk-col" });

    left.appendChild(el("label", { for: "bc-type", class: "bulk-label" }, T("type")));
    var type = el("select", { id: "bc-type" });
    TYPES.forEach(function (t) { type.appendChild(el("option", { value: t[0] }, t[1])); });
    left.appendChild(type);
    var hint = el("p", { class: "field-hint", style: "margin:6px 0 12px" });
    left.appendChild(hint);

    left.appendChild(el("label", { for: "bc-input", class: "bulk-label" }, T("values")));
    var ta = el("textarea", { id: "bc-input", rows: "6" });
    left.appendChild(ta);
    var sample = el("button", { type: "button", class: "btn", style: "margin-top:8px" }, T("sample"));
    left.appendChild(sample);

    var opts = el("div", { class: "bulk-opts" });
    function field(label, node) { var w = el("label", { class: "bulk-field" }, "<span>" + label + "</span>"); w.appendChild(node); return w; }
    var bw = el("input", { type: "range", min: "1", max: "4", step: "1", value: "2" });
    var hh = el("input", { type: "range", min: "40", max: "200", step: "10", value: "100" });
    var mg = el("input", { type: "range", min: "0", max: "40", step: "5", value: "10" });
    var fg = el("input", { type: "color", value: "#000000" });
    var bg = el("input", { type: "color", value: "#ffffff" });
    opts.appendChild(field(T("barWidth"), bw));
    opts.appendChild(field(T("height"), hh));
    opts.appendChild(field(T("margin"), mg));
    opts.appendChild(field(T("color"), fg));
    opts.appendChild(field(T("bg"), bg));
    left.appendChild(opts);
    var showWrap = el("label", { class: "bulk-check" });
    var show = el("input", { type: "checkbox", checked: "checked" });
    showWrap.appendChild(show);
    showWrap.appendChild(document.createTextNode(" " + T("showText")));
    left.appendChild(showWrap);

    var status = el("p", { class: "bulk-status", role: "status", "aria-live": "polite" });
    var prev = el("div", { class: "bc-preview" });
    var dlRow = el("div", { class: "bulk-row", style: "justify-content:flex-start;margin-top:14px" });
    var dlPng = el("button", { type: "button", class: "btn btn-primary" }, T("downloadPng"));
    var dlSvg = el("button", { type: "button", class: "btn" }, T("downloadSvg"));
    dlRow.appendChild(dlPng); dlRow.appendChild(dlSvg);
    right.appendChild(el("span", { class: "bulk-label" }, T("preview")));
    right.appendChild(prev);
    right.appendChild(status);
    right.appendChild(dlRow);
    right.appendChild(el("p", { class: "privacy-note", style: "margin-top:14px" }, T("privacy")));
    body.appendChild(left); body.appendChild(right);
    root.appendChild(body);

    function lines() { return ta.value.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean).slice(0, 1000); }
    function baseOptions(scale) {
      return {
        format: type.value, width: parseInt(bw.value, 10) * scale, height: parseInt(hh.value, 10) * scale,
        displayValue: show.checked, lineColor: fg.value, background: bg.value,
        margin: parseInt(mg.value, 10) * scale, fontSize: 18 * scale, textMargin: 2 * scale, font: "monospace"
      };
    }
    function trySvg(value) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      try { window.JsBarcode(svg, value, baseOptions(1)); return svg; } catch (e) { return null; }
    }
    function tryCanvas(value, scale) {
      var c = document.createElement("canvas");
      try { window.JsBarcode(c, value, baseOptions(scale)); return c; } catch (e) { return null; }
    }
    function svgString(svg) {
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      return new XMLSerializer().serializeToString(svg);
    }

    var valid = [];
    function refresh() {
      hint.textContent = T("h" + type.value);
      prev.innerHTML = "";
      var ls = lines();
      valid = [];
      var bad = [];
      ls.forEach(function (l, idx) {
        var svg = trySvg(l);
        if (svg) valid.push({ value: l, svg: svg }); else bad.push(idx + 1);
      });
      var enabled = valid.length > 0;
      dlPng.disabled = dlSvg.disabled = !enabled;
      dlPng.textContent = valid.length > 1 ? T("downloadZip") + " (PNG)" : T("downloadPng");
      dlSvg.textContent = valid.length > 1 ? T("downloadZip") + " (SVG)" : T("downloadSvg");
      if (!ls.length) { status.textContent = T("noValid"); status.className = "bulk-status"; return; }
      if (enabled) {
        var first = valid[0].svg;
        first.style.maxWidth = "100%"; first.style.height = "auto";
        prev.appendChild(first);
      }
      var msg = valid.length + " " + T("ready");
      if (bad.length) msg += ". " + T("line") + " " + bad.slice(0, 10).join(", ") + (bad.length > 10 ? "..." : "") + ": " + T("invalid") + " (" + T("skipped") + ")";
      else if (valid.length > 1) msg += ". " + T("first");
      status.textContent = msg;
      status.className = "bulk-status" + (bad.length && !valid.length ? " bulk-err" : "");
    }
    [type, ta, bw, hh, mg, fg, bg, show].forEach(function (n) { n.addEventListener("input", refresh); n.addEventListener("change", refresh); });
    sample.addEventListener("click", function () { ta.value = SAMPLES[type.value] || ""; refresh(); });

    function save(blob, name) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
    }
    function pad(n, total) { var s = String(n); while (s.length < String(total).length) s = "0" + s; return s; }

    dlSvg.addEventListener("click", function () {
      if (valid.length === 1) { save(new Blob([svgString(valid[0].svg)], { type: "image/svg+xml" }), "smartqrcraft-" + slug(valid[0].value) + ".svg"); return; }
      var files = valid.map(function (v, i) { return { name: pad(i + 1, valid.length) + "-" + slug(v.value) + ".svg", data: window.SmartZip.utf8(svgString(v.svg)) }; });
      save(window.SmartZip.build(files), "smartqrcraft-barcodes-svg.zip");
    });
    dlPng.addEventListener("click", function () {
      if (valid.length === 1) {
        var c = tryCanvas(valid[0].value, 4);
        c.toBlob(function (b) { save(b, "smartqrcraft-" + slug(valid[0].value) + ".png"); }, "image/png");
        return;
      }
      var files = [], i = 0;
      (function next() {
        if (i >= valid.length) { save(window.SmartZip.build(files), "smartqrcraft-barcodes-png.zip"); return; }
        var v = valid[i], canvas = tryCanvas(v.value, 4);
        canvas.toBlob(function (b) {
          b.arrayBuffer().then(function (buf) {
            files.push({ name: pad(i + 1, valid.length) + "-" + slug(v.value) + ".png", data: new Uint8Array(buf) });
            i++; setTimeout(next, 0);
          });
        }, "image/png");
      })();
    });

    ta.value = SAMPLES.CODE128;
    refresh();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".qr-barcode").forEach(init);
  });
})();
