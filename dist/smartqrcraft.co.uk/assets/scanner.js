/*! SmartQRCraft — QR scanner and QR tester. Everything runs in the browser using jsQR (Apache-2.0).
 * Modes (data-mode on .qr-scanner): "scan" = camera or image, "test" = image + robustness checks. */
(function () {
  "use strict";

  var I = (window.SMARTQR_I18N && window.SMARTQR_I18N.scanner) || {};
  var EN = {
    noQr: "No QR code found. Try a sharper image, crop closer to the code, add a white border around it, or use a code with higher contrast.",
    camDenied: "Camera access was blocked or is not available. Allow the camera in your browser, or upload an image instead. The camera needs a secure (https) page.",
    camStarting: "Starting camera...",
    camScanning: "Point the camera at a QR code.",
    badFile: "Please choose an image file (PNG, JPG, WebP, GIF).",
    content: "Content", type: "Type", copy: "Copy", copied: "Copied", open: "Open link", showPw: "Show password",
    typeLink: "Link", typeWifi: "WiFi network", typeVcard: "Contact card (vCard)", typeUpi: "UPI payment request",
    typeEmail: "Email", typePhone: "Phone number", typeSms: "SMS", typeGeo: "Location", typeText: "Text",
    linkWarn: "Only open links you trust. Check the domain before you continue.",
    domain: "Domain", wifiName: "Network name", wifiSec: "Security", wifiPw: "Password", wifiNone: "None",
    upiWarn: "This code asks you to pay. Scanning it in a payment app sends money out, it never receives money. Check the payee name and amount.",
    payee: "Payee", upiId: "UPI ID", amount: "Amount", name: "Name", phone: "Phone", email: "Email", org: "Company",
    testTitle: "Scan test results", verdictGood: "Reliable", verdictOk: "Scannable, but fragile", verdictBad: "Not reliable",
    verdictGoodTxt: "The code decoded at full size and when shrunk. It should scan well in most conditions.",
    verdictOkTxt: "The code decoded, but failed in some tougher tests. Make it bigger, raise the contrast, or shorten the content.",
    verdictBadTxt: "The code failed most tests. Simplify the content, use a dark code on a light background and print it larger.",
    chkFull: "Decodes at full size", chkHalf: "Decodes at half size", chkQuarter: "Decodes at quarter size", chkSmall: "Decodes at very small size",
    chkBlur: "Decodes when slightly blurred", chkInv: "Dark code on light background", chkContrast: "Contrast", chkLen: "Content length",
    invWarn: "This code is light on dark. Some scanner apps cannot read inverted codes.",
    contrastLow: "Low contrast. Use a darker code color or a lighter background.", contrastOk: "Good contrast",
    lenLong: "Long content makes a dense code that needs more size. Consider a shorter link.", lenOk: "OK",
    pass: "Pass", fail: "Fail", skip: "Not supported in this browser", chars: "characters"
  };
  function T(k) { return I[k] || EN[k] || k; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function decode(imgData) {
    return window.jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "attemptBoth" });
  }
  function decodeNormal(imgData) {
    return window.jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: "dontInvert" });
  }

  // ---- content classification (all output built with textContent, never innerHTML) ----
  function parseKV(str, sep) {
    var out = {};
    str.split(sep).forEach(function (part) {
      var i = part.indexOf(":");
      if (i > 0) out[part.slice(0, i).toUpperCase()] = part.slice(i + 1);
    });
    return out;
  }
  function wifiFields(text) {
    var body = text.slice(5);
    var out = { S: "", T: "", P: "" };
    var cur = "", parts = [], esc = false;
    for (var i = 0; i < body.length; i++) {
      var c = body[i];
      if (esc) { cur += c; esc = false; }
      else if (c === "\\") esc = true;
      else if (c === ";") { parts.push(cur); cur = ""; }
      else cur += c;
    }
    if (cur) parts.push(cur);
    parts.forEach(function (p) {
      var k = p.slice(0, 2);
      if (k === "S:") out.S = p.slice(2);
      else if (k === "T:") out.T = p.slice(2);
      else if (k === "P:") out.P = p.slice(2);
    });
    return out;
  }
  function classify(text) {
    var t = text.trim();
    if (/^https?:\/\//i.test(t)) return "link";
    if (/^WIFI:/i.test(t)) return "wifi";
    if (/^BEGIN:VCARD/i.test(t)) return "vcard";
    if (/^upi:\/\/pay/i.test(t)) return "upi";
    if (/^mailto:/i.test(t)) return "email";
    if (/^tel:/i.test(t)) return "phone";
    if (/^smsto?:/i.test(t)) return "sms";
    if (/^geo:/i.test(t)) return "geo";
    return "text";
  }
  var TYPE_LABEL = { link: "typeLink", wifi: "typeWifi", vcard: "typeVcard", upi: "typeUpi", email: "typeEmail", phone: "typePhone", sms: "typeSms", geo: "typeGeo", text: "typeText" };

  function row(label, value) {
    var r = el("div", "sc-row");
    r.appendChild(el("span", "sc-k", label));
    r.appendChild(el("span", "sc-v", value));
    return r;
  }

  function renderResult(box, text) {
    box.innerHTML = "";
    var kind = classify(text);
    var card = el("div", "sc-card");
    card.appendChild(row(T("type"), T(TYPE_LABEL[kind])));

    if (kind === "link") {
      var host = "";
      try { host = new URL(text.trim()).hostname; } catch (e) { host = ""; }
      if (host) card.appendChild(row(T("domain"), host));
    } else if (kind === "wifi") {
      var w = wifiFields(text.trim());
      card.appendChild(row(T("wifiName"), w.S));
      card.appendChild(row(T("wifiSec"), w.T && w.T !== "nopass" ? w.T : T("wifiNone")));
      if (w.P) {
        var pw = row(T("wifiPw"), "••••••••");
        var show = el("button", "sc-link", T("showPw"));
        show.type = "button";
        show.addEventListener("click", function () { pw.querySelector(".sc-v").textContent = w.P; show.remove(); });
        pw.appendChild(show);
        card.appendChild(pw);
      }
    } else if (kind === "upi") {
      var q = {};
      var qs = text.trim().split("?")[1] || "";
      qs.split("&").forEach(function (p) {
        var i = p.indexOf("=");
        if (i > 0) { try { q[p.slice(0, i)] = decodeURIComponent(p.slice(i + 1)); } catch (e) { q[p.slice(0, i)] = p.slice(i + 1); } }
      });
      if (q.pn) card.appendChild(row(T("payee"), q.pn));
      if (q.pa) card.appendChild(row(T("upiId"), q.pa));
      if (q.am) card.appendChild(row(T("amount"), q.am + " " + (q.cu || "INR")));
      card.appendChild(el("p", "sc-warn", T("upiWarn")));
    } else if (kind === "vcard") {
      var lines = text.split(/\r?\n/), get = function (k) {
        for (var i = 0; i < lines.length; i++) if (lines[i].toUpperCase().indexOf(k) === 0) return lines[i].slice(lines[i].indexOf(":") + 1);
        return "";
      };
      [["FN", "name"], ["ORG", "org"], ["TEL", "phone"], ["EMAIL", "email"]].forEach(function (p) {
        var v = get(p[0]);
        if (v) card.appendChild(row(T(p[1]), v));
      });
    }

    var pre = el("pre", "sc-raw");
    pre.textContent = text;
    card.appendChild(row(T("content"), ""));
    card.appendChild(pre);

    var actions = el("div", "sc-actions");
    var copy = el("button", "btn", T("copy"));
    copy.type = "button";
    copy.addEventListener("click", function () {
      var done = function () { copy.textContent = T("copied"); setTimeout(function () { copy.textContent = T("copy"); }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () {});
      else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
        ta.remove();
      }
    });
    actions.appendChild(copy);
    if (kind === "link") {
      var a = el("a", "btn btn-primary", T("open"));
      a.href = text.trim();
      a.target = "_blank";
      a.rel = "noopener noreferrer nofollow";
      actions.appendChild(a);
      card.appendChild(el("p", "sc-warn", T("linkWarn")));
    }
    card.appendChild(actions);
    box.appendChild(card);
  }

  // ---- image helpers ----
  function drawToCanvas(source, w, h, filter) {
    var c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w));
    c.height = Math.max(1, Math.round(h));
    var ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    if (filter) ctx.filter = filter;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(source, 0, 0, c.width, c.height);
    return { canvas: c, data: ctx.getImageData(0, 0, c.width, c.height) };
  }
  function lum(r, g, b) {
    function ch(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
  }
  function contrastOf(imgData, loc) {
    var xs = [loc.topLeftCorner.x, loc.topRightCorner.x, loc.bottomLeftCorner.x, loc.bottomRightCorner.x];
    var ys = [loc.topLeftCorner.y, loc.topRightCorner.y, loc.bottomLeftCorner.y, loc.bottomRightCorner.y];
    var x0 = Math.max(0, Math.floor(Math.min.apply(null, xs))), x1 = Math.min(imgData.width - 1, Math.ceil(Math.max.apply(null, xs)));
    var y0 = Math.max(0, Math.floor(Math.min.apply(null, ys))), y1 = Math.min(imgData.height - 1, Math.ceil(Math.max.apply(null, ys)));
    var vals = [], step = Math.max(1, Math.floor(Math.sqrt(((x1 - x0) * (y1 - y0)) / 4000)));
    for (var y = y0; y <= y1; y += step) for (var x = x0; x <= x1; x += step) {
      var i = (y * imgData.width + x) * 4;
      vals.push(lum(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]));
    }
    if (vals.length < 20) return null;
    vals.sort(function (a, b) { return a - b; });
    var dark = vals[Math.floor(vals.length * 0.1)], light = vals[Math.floor(vals.length * 0.9)];
    return (light + 0.05) / (dark + 0.05);
  }

  function runTests(source, w, h, box) {
    var results = [];
    function add(label, status, note) { results.push({ label: label, status: status, note: note || "" }); }

    var full = drawToCanvas(source, w, h);
    var hit = decode(full.data);
    if (!hit) return null;
    var fullNormal = decodeNormal(full.data);
    add(T("chkFull"), "pass");

    var scales = [[0.5, "chkHalf", true], [0.25, "chkQuarter", true], [0.12, "chkSmall", false]];
    var failed = 0, scaleFails = 0;
    scales.forEach(function (s) {
      var d = drawToCanvas(source, w * s[0], h * s[0]).data;
      var ok = !!decode(d);
      if (!ok && s[2]) { failed++; scaleFails++; }
      // The very small test is informational: it does not change the verdict.
      add(T(s[1]), ok ? "pass" : (s[2] ? "fail" : "warn"));
    });

    var blurSupported = "filter" in CanvasRenderingContext2D.prototype;
    if (blurSupported) {
      var bl = drawToCanvas(source, w * 0.5, h * 0.5, "blur(1.5px)").data;
      var okb = !!decode(bl);
      if (!okb) failed++;
      add(T("chkBlur"), okb ? "pass" : "fail");
    } else {
      add(T("chkBlur"), "skip", T("skip"));
    }

    if (!fullNormal) add(T("chkInv"), "warn", T("invWarn"));
    else add(T("chkInv"), "pass");

    var ratio = contrastOf(full.data, hit.location);
    if (ratio != null) {
      var good = ratio >= 4;
      if (!good) failed++;
      add(T("chkContrast"), good ? "pass" : "warn", (good ? T("contrastOk") : T("contrastLow")) + " (" + ratio.toFixed(1) + ":1)");
    }
    var len = hit.data.length;
    add(T("chkLen"), len > 300 ? "warn" : "pass", (len > 300 ? T("lenLong") : T("lenOk")) + " (" + len + " " + T("chars") + ")");
    if (len > 300) failed++;

    var verdict = scaleFails >= 2 || failed >= 3 ? "bad" : (failed > 0 ? "ok" : "good");
    return { text: hit.data, results: results, verdict: verdict };
  }

  function renderTests(box, out) {
    var wrap = el("div", "sc-tests");
    var v = el("div", "sc-verdict sc-" + out.verdict);
    var vk = { good: "verdictGood", ok: "verdictOk", bad: "verdictBad" }[out.verdict];
    var vt = { good: "verdictGoodTxt", ok: "verdictOkTxt", bad: "verdictBadTxt" }[out.verdict];
    v.appendChild(el("strong", "", T("testTitle") + ": " + T(vk)));
    v.appendChild(el("p", "", T(vt)));
    wrap.appendChild(v);
    var list = el("ul", "sc-checks");
    out.results.forEach(function (r) {
      var li = el("li", "sc-check sc-" + r.status);
      var badge = el("span", "sc-badge", r.status === "pass" ? T("pass") : r.status === "fail" ? T("fail") : r.status === "warn" ? "!" : "-");
      li.appendChild(badge);
      li.appendChild(el("span", "", r.label + (r.note ? " — " + r.note : "")));
      list.appendChild(li);
    });
    wrap.appendChild(list);
    box.appendChild(wrap);
  }

  function init(root) {
    var mode = root.getAttribute("data-mode") || "scan";
    var file = root.querySelector(".sc-file");
    var drop = root.querySelector(".sc-drop");
    var camBtn = root.querySelector(".sc-cam");
    var stopBtn = root.querySelector(".sc-stop");
    var video = root.querySelector(".sc-video");
    var status = root.querySelector(".sc-status");
    var out = root.querySelector(".sc-result");
    var preview = root.querySelector(".sc-preview");
    var stream = null, raf = 0;

    function setStatus(msg, isErr) { if (status) { status.textContent = msg || ""; status.className = "sc-status" + (isErr ? " sc-err" : ""); } }

    function handleFile(f) {
      out.innerHTML = "";
      setStatus("");
      if (!f || !/^image\//.test(f.type)) { setStatus(T("badFile"), true); return; }
      var url = URL.createObjectURL(f);
      var img = new Image();
      img.onload = function () {
        var max = 1600, s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        var w = img.naturalWidth * s, h = img.naturalHeight * s;
        if (preview) { preview.src = url; preview.style.display = "block"; }
        if (mode === "test") {
          var res = runTests(img, w, h, out);
          if (!res) { setStatus(T("noQr"), true); return; }
          renderResult(out, res.text);
          renderTests(out, res);
        } else {
          var d = drawToCanvas(img, w, h).data;
          var hit = decode(d);
          if (!hit) { setStatus(T("noQr"), true); return; }
          renderResult(out, hit.data);
        }
      };
      img.onerror = function () { setStatus(T("badFile"), true); };
      img.src = url;
    }

    function stopCam() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
      if (video) { video.style.display = "none"; video.srcObject = null; }
      if (stopBtn) stopBtn.style.display = "none";
      if (camBtn) camBtn.style.display = "";
    }

    function tick() {
      if (!stream) return;
      if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth) {
        var w = video.videoWidth, h = video.videoHeight, s = Math.min(1, 800 / Math.max(w, h));
        var d = drawToCanvas(video, w * s, h * s).data;
        var hit = decode(d);
        if (hit) {
          stopCam();
          setStatus("");
          renderResult(out, hit.data);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    function startCam() {
      out.innerHTML = "";
      if (preview) preview.style.display = "none";
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { setStatus(T("camDenied"), true); return; }
      setStatus(T("camStarting"));
      navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false }).then(function (s) {
        stream = s;
        video.srcObject = s;
        video.setAttribute("playsinline", "true");
        video.style.display = "block";
        video.play();
        if (camBtn) camBtn.style.display = "none";
        if (stopBtn) stopBtn.style.display = "";
        setStatus(T("camScanning"));
        raf = requestAnimationFrame(tick);
      }, function () { setStatus(T("camDenied"), true); });
    }

    if (file) file.addEventListener("change", function () { handleFile(file.files && file.files[0]); file.value = ""; });
    if (drop) {
      ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("sc-over"); }); });
      ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("sc-over"); }); });
      drop.addEventListener("drop", function (e) { handleFile(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]); });
    }
    document.addEventListener("paste", function (e) {
      var items = (e.clipboardData && e.clipboardData.files) || [];
      if (items.length) handleFile(items[0]);
    });
    if (camBtn) camBtn.addEventListener("click", startCam);
    if (stopBtn) stopBtn.addEventListener("click", function () { stopCam(); setStatus(""); });
    window.addEventListener("pagehide", stopCam);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".qr-scanner").forEach(init);
  });
})();
