/*! SmartQRCraft — bulk QR code generator. Everything runs in the browser; output is one ZIP. */
(function () {
  "use strict";

  var MAX_ROWS = 1000;

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function slug(s) {
    return String(s).replace(/^https?:\/\//i, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "qr";
  }
  function looksLikeDomain(s) { return /^[\w-]+(\.[\w-]+)+(\/|$|\?|#)/i.test(s) && !/^[a-z][a-z0-9+.-]*:/i.test(s); }

  function parseLines(text, mode, addHttps) {
    var rows = [];
    text.split(/\r?\n/).forEach(function (raw) {
      var line = raw.trim();
      if (!line) return;
      var name = "", content = line;
      if (mode === "named") {
        var i = line.indexOf(",");
        if (i > 0) { name = line.slice(0, i).trim().replace(/^"|"$/g, ""); content = line.slice(i + 1).trim().replace(/^"|"$/g, ""); }
      }
      if (addHttps && looksLikeDomain(content)) content = "https://" + content;
      if (content) rows.push({ name: name, content: content });
    });
    return rows;
  }

  function init(root) {
    root.innerHTML = "";
    var head = el("div", { class: "generator-head" },
      "<h2>Bulk QR Code Generator</h2><span class=\"status-pill\"><span class=\"status-dot\"></span>Runs in your browser</span>");
    var body = el("div", { class: "bulk-body" });

    var left = el("div", { class: "bulk-col" });
    left.appendChild(el("label", { for: "bulk-input", class: "bulk-label" }, "One item per line"));
    var ta = el("textarea", { id: "bulk-input", rows: "10", placeholder: "https://example.com/product-1\nhttps://example.com/product-2\nexample.com/table-3" });
    left.appendChild(ta);

    var rowFile = el("div", { class: "bulk-row" });
    var file = el("input", { type: "file", accept: ".csv,.txt,text/plain,text/csv", class: "visually-hidden", id: "bulk-file" });
    var fileBtn = el("label", { for: "bulk-file", class: "btn", style: "cursor:pointer" }, "Load CSV or TXT file");
    var sample = el("button", { type: "button", class: "btn" }, "Use sample");
    rowFile.appendChild(fileBtn); rowFile.appendChild(file); rowFile.appendChild(sample);
    left.appendChild(rowFile);

    // Numbered sequence: fills the list with prefix + serial number + suffix (SN-0001, SN-0002, ...)
    var seq = el("details", { class: "bulk-seq" });
    seq.appendChild(el("summary", null, "Make a numbered list (serial numbers)"));
    var seqGrid = el("div", { class: "bulk-opts" });
    var sPrefix = el("input", { type: "text", value: "SN-", "aria-label": "Prefix" });
    var sStart = el("input", { type: "number", value: "1", min: "0", step: "1", "aria-label": "First number" });
    var sEnd = el("input", { type: "number", value: "100", min: "0", step: "1", "aria-label": "Last number" });
    var sPad = el("select", { "aria-label": "Digits" }, "<option value=\"0\">No padding</option><option value=\"3\">001</option><option value=\"4\" selected>0001</option><option value=\"5\">00001</option><option value=\"6\">000001</option>");
    var sSuffix = el("input", { type: "text", value: "", placeholder: "optional", "aria-label": "Suffix" });
    seqGrid.appendChild(field("Prefix (text or link)", sPrefix));
    seqGrid.appendChild(field("First number", sStart));
    seqGrid.appendChild(field("Last number", sEnd));
    seqGrid.appendChild(field("Digits", sPad));
    seqGrid.appendChild(field("Suffix", sSuffix));
    seq.appendChild(seqGrid);
    var sFill = el("button", { type: "button", class: "btn" }, "Fill the list");
    var sNote = el("p", { class: "field-hint", style: "margin:8px 0 0" }, "Example: prefix https://example.com/item/ gives one link per item. Up to " + MAX_ROWS + " numbers.");
    seq.appendChild(sFill); seq.appendChild(sNote);
    left.appendChild(seq);
    sFill.addEventListener("click", function () {
      var a = parseInt(sStart.value, 10), b = parseInt(sEnd.value, 10), pad = parseInt(sPad.value, 10) || 0;
      if (isNaN(a) || isNaN(b) || b < a) { sNote.textContent = "Enter a first number that is not bigger than the last number."; return; }
      if (b - a + 1 > MAX_ROWS) b = a + MAX_ROWS - 1;
      var out = [];
      for (var n = a; n <= b; n++) {
        var num = String(n);
        while (num.length < pad) num = "0" + num;
        out.push(sPrefix.value + num + sSuffix.value);
      }
      ta.value = out.join("\n");
      mode.value = "content";
      sNote.textContent = out.length + " lines added. Choose your options and click Generate QR codes.";
    });

    var opts = el("div", { class: "bulk-opts" });
    function field(label, node) { var w = el("label", { class: "bulk-field" }, "<span>" + label + "</span>"); w.appendChild(node); return w; }
    var mode = el("select", null, "<option value=\"content\">Content only</option><option value=\"named\">Name, content (comma separated)</option>");
    var fg = el("input", { type: "color", value: "#111111" });
    var bg = el("input", { type: "color", value: "#ffffff" });
    var size = el("select", null, "<option value=\"512\">512 px</option><option value=\"1024\" selected>1024 px</option><option value=\"2048\">2048 px</option>");
    var fmt = el("select", null, "<option value=\"png\">PNG</option><option value=\"svg\">SVG</option>");
    var style = el("select", null, "<option value=\"square\">Square</option><option value=\"rounded\">Rounded</option>");
    var https = el("input", { type: "checkbox", checked: "checked" });
    opts.appendChild(field("Line format", mode));
    opts.appendChild(field("QR color", fg));
    opts.appendChild(field("Background", bg));
    opts.appendChild(field("Size", size));
    opts.appendChild(field("File format", fmt));
    opts.appendChild(field("Style", style));
    var httpsWrap = el("label", { class: "bulk-check" });
    httpsWrap.appendChild(https);
    httpsWrap.appendChild(document.createTextNode(" Add https:// to web addresses that have none"));
    left.appendChild(opts);
    left.appendChild(httpsWrap);

    var gen = el("button", { type: "button", class: "btn btn-primary", style: "margin-top:14px" }, "Generate QR codes");
    left.appendChild(gen);

    var right = el("div", { class: "bulk-col" });
    var status = el("p", { class: "bulk-status", role: "status", "aria-live": "polite" });
    var grid = el("div", { class: "bulk-grid" });
    var dl = el("button", { type: "button", class: "btn btn-primary", style: "display:none;margin-top:14px" }, "Download ZIP");
    right.appendChild(status); right.appendChild(grid); right.appendChild(dl);
    right.appendChild(el("p", { class: "privacy-note", style: "margin-top:14px" }, "Your list is processed on your device. Nothing is uploaded to a server."));

    body.appendChild(left); body.appendChild(right);
    root.appendChild(head); root.appendChild(body);

    var result = null;

    file.addEventListener("change", function () {
      var f = file.files && file.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () { ta.value = String(r.result); };
      r.readAsText(f);
      file.value = "";
    });
    sample.addEventListener("click", function () {
      ta.value = "https://example.com/product-1\nhttps://example.com/product-2\nexample.com/table-3";
    });

    function toBlob(canvas) { return new Promise(function (res) { canvas.toBlob(res, "image/png"); }); }
    function tick() { return new Promise(function (res) { setTimeout(res, 0); }); }

    gen.addEventListener("click", function () {
      var rows = parseLines(ta.value, mode.value, https.checked);
      grid.innerHTML = "";
      dl.style.display = "none";
      result = null;
      if (!rows.length) { status.textContent = "Add at least one line."; status.className = "bulk-status bulk-err"; return; }
      var note = "";
      if (rows.length > MAX_ROWS) { rows = rows.slice(0, MAX_ROWS); note = " Only the first " + MAX_ROWS + " lines were used."; }
      gen.disabled = true;
      var files = [], manifest = ["index,name,content,file"];
      var opts = { fg: fg.value, bg: bg.value, style: style.value, eyeStyle: "classic", size: parseInt(size.value, 10) };
      var i = 0;

      function esc(s) { return '"' + String(s).replace(/"/g, '""') + '"'; }

      function step() {
        if (i >= rows.length) {
          var manifestBytes = window.SmartZip.utf8(manifest.join("\r\n"));
          files.push({ name: "manifest.csv", data: manifestBytes });
          result = window.SmartZip.build(files);
          status.textContent = rows.length + " QR codes ready." + note;
          status.className = "bulk-status";
          dl.style.display = "";
          gen.disabled = false;
          return;
        }
        var row = rows[i], num = String(i + 1);
        while (num.length < String(rows.length).length) num = "0" + num;
        var base = num + "-" + slug(row.name || row.content);
        var ext = fmt.value;
        var fname = base + "." + ext;
        var p;
        if (ext === "svg") {
          var svg = window.SmartQR.renderToSVG(row.content, opts);
          files.push({ name: fname, data: window.SmartZip.utf8(svg) });
          p = Promise.resolve();
        } else {
          var c = document.createElement("canvas");
          window.SmartQR.renderToCanvas(c, row.content, opts);
          p = toBlob(c).then(function (blob) { return blob.arrayBuffer(); }).then(function (buf) {
            files.push({ name: fname, data: new Uint8Array(buf) });
          });
        }
        p.then(function () {
          manifest.push([i + 1, esc(row.name), esc(row.content), esc(fname)].join(","));
          if (i < 60) {
            var t = document.createElement("canvas");
            var o2 = { fg: opts.fg, bg: opts.bg, style: opts.style, eyeStyle: "classic", size: 160 };
            window.SmartQR.renderToCanvas(t, row.content, o2);
            t.title = row.content;
            grid.appendChild(t);
          }
          status.textContent = "Generating " + (i + 1) + " of " + rows.length + " ...";
          i++;
          return tick();
        }).then(step, function () {
          status.textContent = "Line " + (i + 1) + " could not be encoded (too long?). Remove it and try again.";
          status.className = "bulk-status bulk-err";
          gen.disabled = false;
        });
      }
      step();
    });

    dl.addEventListener("click", function () {
      if (!result) return;
      var url = URL.createObjectURL(result);
      var a = document.createElement("a");
      a.href = url; a.download = "smartqrcraft-bulk-qr-codes.zip";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".qr-bulk").forEach(init);
  });
})();
