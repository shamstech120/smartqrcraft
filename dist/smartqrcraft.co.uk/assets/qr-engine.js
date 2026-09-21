/*!
 * SmartQRCraft QR Engine
 * Wraps the qrcode-lib (Kazuhiko Arase, MIT) encoder with:
 *  - payload builders for every supported QR type
 *  - canvas + SVG renderers with color / dot-style / eye-style / logo / frame support
 *  - PNG / SVG export helpers
 * No network calls, no external dependencies beyond qrcode-lib.js.
 */
(function (global) {
  "use strict";

  // ---------------------------------------------------------------------
  // 1. Payload builders — turn structured user input into the string that
  //    actually gets encoded into the QR code, per QR "type" convention.
  // ---------------------------------------------------------------------
  function escapeWifi(s) {
    return String(s || "").replace(/([\\;,:"])/g, "\\$1");
  }
  function escapeVCard(s) {
    return String(s || "").replace(/([\\;,])/g, "\\$1").replace(/\n/g, "\\n");
  }

  var Payload = {
    url: function (f) {
      var v = (f.value || "").trim();
      if (!v) return "";
      if (!/^https?:\/\//i.test(v)) v = "https://" + v;
      return v;
    },
    text: function (f) {
      return f.value || "";
    },
    wifi: function (f) {
      if (!f.ssid) return "";
      var type = f.security || "WPA";
      var hidden = f.hidden ? "true" : "false";
      if (type === "nopass") {
        return "WIFI:T:nopass;S:" + escapeWifi(f.ssid) + ";H:" + hidden + ";;";
      }
      return (
        "WIFI:T:" + type + ";S:" + escapeWifi(f.ssid) + ";P:" +
        escapeWifi(f.password || "") + ";H:" + hidden + ";;"
      );
    },
    email: function (f) {
      if (!f.to) return "";
      var params = [];
      if (f.subject) params.push("subject=" + encodeURIComponent(f.subject));
      if (f.body) params.push("body=" + encodeURIComponent(f.body));
      return "mailto:" + f.to + (params.length ? "?" + params.join("&") : "");
    },
    phone: function (f) {
      return f.value ? "tel:" + f.value.replace(/[^\d+]/g, "") : "";
    },
    sms: function (f) {
      if (!f.number) return "";
      var num = f.number.replace(/[^\d+]/g, "");
      return "SMSTO:" + num + ":" + (f.message || "");
    },
    vcard: function (f) {
      if (!f.name) return "";
      var lines = ["BEGIN:VCARD", "VERSION:3.0"];
      lines.push("N:" + escapeVCard(f.lastName || "") + ";" + escapeVCard(f.name) + ";;;");
      lines.push("FN:" + escapeVCard((f.name + " " + (f.lastName || "")).trim()));
      if (f.org) lines.push("ORG:" + escapeVCard(f.org));
      if (f.title) lines.push("TITLE:" + escapeVCard(f.title));
      if (f.phone) lines.push("TEL;TYPE=CELL:" + f.phone);
      if (f.email) lines.push("EMAIL:" + f.email);
      if (f.website) lines.push("URL:" + f.website);
      if (f.address) lines.push("ADR;TYPE=WORK:;;" + escapeVCard(f.address) + ";;;;");
      lines.push("END:VCARD");
      return lines.join("\n");
    },
    location: function (f) {
      if (!f.value) return "";
      var v = f.value.trim();
      var m = v.match(/(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)/);
      if (m) return "https://www.google.com/maps?q=" + m[1] + "," + m[3];
      if (/^https?:\/\//i.test(v)) return v;
      return "https://www.google.com/maps?q=" + encodeURIComponent(v);
    },
    social: function (f) {
      var v = (f.value || "").trim();
      if (!v) return "";
      if (!/^https?:\/\//i.test(v)) v = "https://" + v;
      return v;
    },
    menu: function (f) {
      var v = (f.value || "").trim();
      if (!v) return "";
      if (!/^https?:\/\//i.test(v)) v = "https://" + v;
      return v;
    },
    pdf: function (f) {
      var v = (f.value || "").trim();
      if (!v) return "";
      if (!/^https?:\/\//i.test(v)) v = "https://" + v;
      return v;
    },
    upi: function (f) {
      var vpa = (f.vpa || "").trim();
      if (!/^[\w.\-]{2,256}@[a-zA-Z][\w.\-]{1,64}$/.test(vpa)) return "";
      var q = ["pa=" + vpa];
      if (f.name && f.name.trim()) q.push("pn=" + encodeURIComponent(f.name.trim()));
      var amt = (f.amount || "").trim();
      if (/^\d+(\.\d{1,2})?$/.test(amt) && parseFloat(amt) > 0) q.push("am=" + amt);
      q.push("cu=INR");
      if (f.note && f.note.trim()) q.push("tn=" + encodeURIComponent(f.note.trim()));
      return "upi://pay?" + q.join("&");
    },
    whatsapp: function (f) {
      var num = (f.number || "").replace(/\D/g, "");
      if (num.length < 7) return "";
      var msg = (f.message || "").trim();
      return "https://wa.me/" + num + (msg ? "?text=" + encodeURIComponent(msg) : "");
    },
    event: function (f) {
      var title = (f.title || "").trim();
      var start = (f.start || "").trim();
      if (!title || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(start)) return "";
      var esc = function (v) { return String(v || "").replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/([,;])/g, "\\$1"); };
      var fmt = function (v) { return v.replace(/[-:]/g, "").slice(0, 13) + "00"; };
      var end = (f.end || "").trim();
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(end) || end <= start) {
        var d = new Date(start);
        d.setHours(d.getHours() + 1);
        var pad = function (n) { return (n < 10 ? "0" : "") + n; };
        end = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "T" + pad(d.getHours()) + ":" + pad(d.getMinutes());
      }
      var n = new Date(), p2 = function (x) { return (x < 10 ? "0" : "") + x; };
      var stamp = n.getUTCFullYear() + p2(n.getUTCMonth() + 1) + p2(n.getUTCDate()) + "T" + p2(n.getUTCHours()) + p2(n.getUTCMinutes()) + p2(n.getUTCSeconds()) + "Z";
      var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SmartQRCraft//EN", "BEGIN:VEVENT",
        "DTSTAMP:" + stamp, "SUMMARY:" + esc(title), "DTSTART:" + fmt(start), "DTEND:" + fmt(end)];
      if (f.location && f.location.trim()) lines.push("LOCATION:" + esc(f.location.trim()));
      if (f.description && f.description.trim()) lines.push("DESCRIPTION:" + esc(f.description.trim()));
      lines.push("END:VEVENT", "END:VCALENDAR");
      return lines.join("\n");
    },
    mecard: function (f) {
      var first = (f.name || "").trim(), last = (f.lastName || "").trim();
      if (!first && !last) return "";
      var esc = function (v) { return String(v || "").replace(/([\\;,:])/g, "\\$1"); };
      var out = "MECARD:N:" + esc(last) + "," + esc(first) + ";";
      if (f.phone && f.phone.trim()) out += "TEL:" + esc(f.phone.replace(/[^\d+]/g, "")) + ";";
      if (f.email && f.email.trim()) out += "EMAIL:" + esc(f.email.trim()) + ";";
      if (f.website && f.website.trim()) out += "URL:" + esc(f.website.trim()) + ";";
      if (f.address && f.address.trim()) out += "ADR:" + esc(f.address.trim()) + ";";
      return out + ";";
    },
    bitcoin: function (f) {
      var addr = (f.address || "").trim();
      if (!/^(bc1[a-z0-9]{25,90}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(addr)) return "";
      var q = [];
      var amt = (f.amount || "").trim();
      if (/^\d{1,8}(\.\d{1,8})?$/.test(amt) && parseFloat(amt) > 0) q.push("amount=" + amt);
      if (f.label && f.label.trim()) q.push("label=" + encodeURIComponent(f.label.trim()));
      if (f.message && f.message.trim()) q.push("message=" + encodeURIComponent(f.message.trim()));
      return "bitcoin:" + addr + (q.length ? "?" + q.join("&") : "");
    },
    x: function (f) {
      var text = (f.text || "").trim();
      if (text) return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
      var h = (f.handle || "").trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, "").replace(/[\/?#].*$/, "");
      return /^[A-Za-z0-9_]{1,15}$/.test(h) ? "https://x.com/" + h : "";
    },
    venmo: function (f) {
      var u = (f.user || "").trim().replace(/^@/, "");
      return /^[A-Za-z0-9_-]{5,30}$/.test(u) ? "https://venmo.com/u/" + u : "";
    },
    cashapp: function (f) {
      var u = (f.user || "").trim().replace(/^\$/, "");
      return /^[A-Za-z0-9_]{1,20}$/.test(u) ? "https://cash.app/$" + u : "";
    },
    paypalme: function (f) {
      var u = (f.user || "").trim().replace(/^https?:\/\/(www\.)?paypal\.me\//i, "").replace(/[\/?#].*$/, "");
      if (!/^[A-Za-z0-9]{1,20}$/.test(u)) return "";
      var out = "https://paypal.me/" + u;
      var a = (f.amount || "").trim();
      if (/^\d+(\.\d{1,2})?$/.test(a) && parseFloat(a) > 0) out += "/" + a + (f.currency || "USD");
      return out;
    },
    girocode: function (f) {
      // EPC069-12 "GiroCode" / SEPA credit transfer QR code, version 002, UTF-8.
      var iban = (f.iban || "").replace(/\s+/g, "").toUpperCase();
      var name = (f.name || "").trim().slice(0, 70);
      if (!name || !isValidIBAN(iban)) return "";
      var bic = (f.bic || "").replace(/\s+/g, "").toUpperCase();
      if (bic && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic)) return "";
      var amt = (f.amount || "").trim().replace(",", ".");
      var amount = "";
      if (amt) {
        if (!/^\d{1,9}(\.\d{1,2})?$/.test(amt) || parseFloat(amt) < 0.01) return "";
        amount = "EUR" + parseFloat(amt).toFixed(2);
      }
      var ref = (f.reference || "").replace(/[\r\n]+/g, " ").trim().slice(0, 140);
      return ["BCD", "002", "1", "SCT", bic, name, iban, amount, "", "", ref, ""].join("\n");
    },
    app: function (f) {
      var v = (f.value || "").trim();
      if (!v) return "";
      if (!/^https?:\/\//i.test(v)) v = "https://" + v;
      return v;
    }
  };


  function isValidIBAN(iban) {
    if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban) || iban.length > 34) return false;
    var rearranged = iban.slice(4) + iban.slice(0, 4);
    var rem = 0;
    for (var i = 0; i < rearranged.length; i++) {
      var ch = rearranged.charCodeAt(i);
      var v = ch >= 65 ? String(ch - 55) : rearranged[i];
      for (var j = 0; j < v.length; j++) rem = (rem * 10 + parseInt(v[j], 10)) % 97;
    }
    return rem === 1;
  }

  function buildPayload(type, fields) {
    var fn = Payload[type] || Payload.text;
    return fn(fields || {});
  }

  // ---------------------------------------------------------------------
  // 2. Encode: string -> module matrix (auto type-number, 'M' ECC, bumped
  //    to 'H' automatically when a logo will be overlaid, for redundancy).
  // ---------------------------------------------------------------------
  function encode(payload, opts) {
    opts = opts || {};
    var ecc = opts.logo ? "H" : (/^[LMQH]$/.test(opts.ecc || "") ? opts.ecc : "M");
    var qr = global.qrcode(0, ecc); // typeNumber 0 = auto-detect smallest size
    qr.addData(payload || " ");
    qr.make();
    return qr;
  }

  // ---------------------------------------------------------------------
  // 3. Canvas renderer — draws the matrix with dot style, eye style,
  //    colors, quiet zone, optional center logo and optional CTA frame.
  // ---------------------------------------------------------------------
  function isEye(count, r, c) {
    var inTL = r < 7 && c < 7;
    var inTR = r < 7 && c >= count - 7;
    var inBL = r >= count - 7 && c < 7;
    return inTL || inTR || inBL;
  }

  function radiusForStyle(style, cell) {
    if (style === "dots") return cell / 2;
    if (style === "rounded") return cell * 0.3;
    return 0;
  }

  // Frame geometry shared by the canvas and SVG renderers.
  function frameGeometry(size, frameText, frameStyle) {
    var barH = frameText ? Math.round(size * 0.14) : 0;
    var style = frameStyle === "top" || frameStyle === "badge" ? frameStyle : "bottom";
    var gap = frameText && style === "badge" ? Math.round(size * 0.03) : 0;
    var top = frameText && style === "top" ? barH : 0;
    var bottom = frameText && style !== "top" ? barH + gap : 0;
    return { barH: barH, style: style, gap: gap, top: top, bottom: bottom };
  }

  function gradientPoints(dir, size) {
    if (dir === "v") return [0, 0, 0, size];
    if (dir === "d") return [0, 0, size, size];
    return [0, 0, size, 0];
  }

  function renderToCanvas(canvas, payload, opts) {
    opts = opts || {};
    var fg = opts.fg || "#111827";
    var bg = opts.bg || "#ffffff";
    var style = opts.style || "square"; // square | rounded | dots | diamond
    var eyeStyle = opts.eyeStyle || "classic"; // classic | rounded | circle
    var size = opts.size || 512;
    var margin = opts.margin != null ? opts.margin : 4; // quiet zone in modules
    var logoSrc = opts.logoSrc || null;
    var frameText = opts.frameText || "";
    var transparent = !!opts.transparent;
    var gradient = opts.gradient && opts.gradient !== "none" && opts.fg2 ? opts.gradient : "none";

    var qr = encode(payload, { logo: !!logoSrc, ecc: opts.ecc });
    var count = qr.getModuleCount();
    var cellSize = size / (count + margin * 2);
    var fr = frameGeometry(size, frameText, opts.frameStyle);

    canvas.width = size;
    canvas.height = fr.top + size + fr.bottom;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!transparent) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    var fgFill = fg;
    if (gradient !== "none") {
      var gp = gradientPoints(gradient, size);
      fgFill = ctx.createLinearGradient(gp[0], gp[1] + fr.top, gp[2], gp[3] + fr.top);
      fgFill.addColorStop(0, fg);
      fgFill.addColorStop(1, opts.fg2);
    }
    var eyeFill = opts.eyeColor || fgFill;

    var drawRoundedRect = function (x, y, w, h, r) {
      if (r <= 0) {
        ctx.fillRect(x, y, w, h);
        return;
      }
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fill();
    };

    ctx.save();
    ctx.translate(0, fr.top);
    // gradient was defined in absolute coordinates, so shift it back inside the translated space
    if (gradient !== "none") {
      var gp2 = gradientPoints(gradient, size);
      fgFill = ctx.createLinearGradient(gp2[0], gp2[1], gp2[2], gp2[3]);
      fgFill.addColorStop(0, fg);
      fgFill.addColorStop(1, opts.fg2);
      if (!opts.eyeColor) eyeFill = fgFill;
    }

    ctx.fillStyle = fgFill;
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (!qr.isDark(r, c)) continue;
        if (isEye(count, r, c)) continue; // eyes drawn separately below
        var x = (c + margin) * cellSize;
        var y = (r + margin) * cellSize;
        if (style === "diamond") {
          ctx.beginPath();
          ctx.moveTo(x + cellSize / 2, y);
          ctx.lineTo(x + cellSize, y + cellSize / 2);
          ctx.lineTo(x + cellSize / 2, y + cellSize);
          ctx.lineTo(x, y + cellSize / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          drawRoundedRect(x, y, cellSize, cellSize, Math.min(radiusForStyle(style, cellSize), cellSize / 2));
        }
      }
    }

    // Eyes: 3 finder patterns, each an outer 7x7 ring + inner 3x3 core
    [[0, 0], [0, count - 7], [count - 7, 0]].forEach(function (pos) {
      var ox = (pos[1] + margin) * cellSize;
      var oy = (pos[0] + margin) * cellSize;
      var outer = cellSize * 7;
      var innerOffset = cellSize * 2;
      var inner = cellSize * 3;

      ctx.fillStyle = eyeFill;
      if (eyeStyle === "circle") {
        ctx.beginPath();
        ctx.arc(ox + outer / 2, oy + outer / 2, outer / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawRoundedRect(ox, oy, outer, outer, eyeStyle === "rounded" ? outer * 0.28 : outer * 0.12);
      }

      ctx.fillStyle = bg;
      if (transparent) ctx.globalCompositeOperation = "destination-out";
      if (eyeStyle === "circle") {
        ctx.beginPath();
        ctx.arc(ox + outer / 2, oy + outer / 2, outer / 2 - cellSize, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawRoundedRect(
          ox + cellSize, oy + cellSize, outer - cellSize * 2, outer - cellSize * 2,
          eyeStyle === "rounded" ? outer * 0.18 : outer * 0.08
        );
      }
      ctx.globalCompositeOperation = "source-over";

      ctx.fillStyle = eyeFill;
      if (eyeStyle === "circle") {
        ctx.beginPath();
        ctx.arc(ox + outer / 2, oy + outer / 2, inner / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawRoundedRect(
          ox + innerOffset, oy + innerOffset, inner, inner,
          eyeStyle === "rounded" ? inner * 0.32 : inner * 0.1
        );
      }
    });
    ctx.restore();

    var finishFrame = function () {
      if (!frameText) return;
      var y0, x0 = 0, w = size, rad = 0;
      if (fr.style === "top") y0 = 0;
      else if (fr.style === "badge") { w = Math.round(size * 0.72); x0 = Math.round((size - w) / 2); y0 = fr.top + size + fr.gap; rad = fr.barH / 2; }
      else y0 = fr.top + size;
      ctx.fillStyle = fg;
      drawRoundedRect(x0, y0, w, fr.barH, rad);
      ctx.fillStyle = bg;
      if (transparent) ctx.globalCompositeOperation = "destination-out";
      ctx.font = "700 " + Math.round(fr.barH * 0.42) + "px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(frameText.toUpperCase(), x0 + w / 2, y0 + fr.barH / 2);
      ctx.globalCompositeOperation = "source-over";
    };

    if (logoSrc) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        var logoSize = size * 0.2;
        var lx = (size - logoSize) / 2;
        var ly = fr.top + (size - logoSize) / 2;
        var pad = logoSize * 0.12;
        ctx.fillStyle = bg;
        if (transparent) ctx.globalCompositeOperation = "destination-out";
        drawRoundedRect(lx - pad, ly - pad, logoSize + pad * 2, logoSize + pad * 2, 12);
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, lx, ly, logoSize, logoSize);
        finishFrame();
        if (typeof opts.onReady === "function") opts.onReady();
      };
      img.src = logoSrc;
    } else {
      finishFrame();
      if (typeof opts.onReady === "function") opts.onReady();
    }

    return qr;
  }

  // ---------------------------------------------------------------------
  // 4. SVG renderer — vector output for crisp print/download. Mirrors the
  //    canvas renderer (gradient, eye color, styles, frame, transparent, logo).
  // ---------------------------------------------------------------------
  function renderToSVG(payload, opts) {
    opts = opts || {};
    var fg = opts.fg || "#111827";
    var bg = opts.bg || "#ffffff";
    var style = opts.style || "square";
    var eyeStyle = opts.eyeStyle || "classic";
    var size = opts.size || 512;
    var margin = opts.margin != null ? opts.margin : 4;
    var frameText = opts.frameText || "";
    var transparent = !!opts.transparent;
    var logoSrc = opts.logoSrc || null;
    var gradient = opts.gradient && opts.gradient !== "none" && opts.fg2 ? opts.gradient : "none";

    var qr = encode(payload, { logo: !!logoSrc, ecc: opts.ecc });
    var count = qr.getModuleCount();
    var cell = size / (count + margin * 2);
    var fr = frameGeometry(size, frameText, opts.frameStyle);
    var totalH = fr.top + size + fr.bottom;
    var logoSize = size * 0.2;
    var logoPad = logoSize * 0.12;
    var lx0 = (size - logoSize) / 2 - logoPad, lx1 = (size + logoSize) / 2 + logoPad;
    var f2 = function (n) { return n.toFixed(2); };
    function rrPath(x, y, w, h, r) {
      r = Math.min(r, w / 2, h / 2);
      return "M" + f2(x + r) + " " + f2(y) + "H" + f2(x + w - r) + "A" + f2(r) + " " + f2(r) + " 0 0 1 " + f2(x + w) + " " + f2(y + r) +
        "V" + f2(y + h - r) + "A" + f2(r) + " " + f2(r) + " 0 0 1 " + f2(x + w - r) + " " + f2(y + h) + "H" + f2(x + r) +
        "A" + f2(r) + " " + f2(r) + " 0 0 1 " + f2(x) + " " + f2(y + h - r) + "V" + f2(y + r) +
        "A" + f2(r) + " " + f2(r) + " 0 0 1 " + f2(x + r) + " " + f2(y) + "Z";
    }
    function circPath(cx, cy, r) {
      return "M" + f2(cx - r) + " " + f2(cy) + "A" + f2(r) + " " + f2(r) + " 0 1 0 " + f2(cx + r) + " " + f2(cy) +
        "A" + f2(r) + " " + f2(r) + " 0 1 0 " + f2(cx - r) + " " + f2(cy) + "Z";
    }

    var fgFill = fg;
    var parts = [];
    parts.push(
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + totalH +
        '" viewBox="0 0 ' + size + " " + totalH + '">'
    );
    if (gradient !== "none") {
      var gp = gradientPoints(gradient, size);
      parts.push('<defs><linearGradient id="qg" gradientUnits="userSpaceOnUse" x1="' + gp[0] + '" y1="' + gp[1] + '" x2="' + gp[2] + '" y2="' + gp[3] +
        '"><stop offset="0" stop-color="' + fg + '"/><stop offset="1" stop-color="' + opts.fg2 + '"/></linearGradient></defs>');
      fgFill = "url(#qg)";
    }
    var eyeFill = opts.eyeColor || fgFill;
    if (!transparent) parts.push('<rect width="100%" height="100%" fill="' + bg + '"/>');
    parts.push('<g transform="translate(0,' + fr.top + ')">');

    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (!qr.isDark(r, c) || isEye(count, r, c)) continue;
        var x = (c + margin) * cell;
        var y = (r + margin) * cell;
        if (logoSrc && x + cell > lx0 && x < lx1 && y + cell > lx0 && y < lx1) continue; // leave room for the logo
        if (style === "diamond") {
          parts.push('<path fill="' + fgFill + '" d="M' + f2(x + cell / 2) + " " + f2(y) + "L" + f2(x + cell) + " " + f2(y + cell / 2) +
            "L" + f2(x + cell / 2) + " " + f2(y + cell) + "L" + f2(x) + " " + f2(y + cell / 2) + 'Z"/>');
        } else {
          parts.push(
            '<rect x="' + f2(x) + '" y="' + f2(y) + '" width="' + f2(cell) +
              '" height="' + f2(cell) + '" rx="' + f2(radiusForStyle(style, cell)) + '" fill="' + fgFill + '"/>'
          );
        }
      }
    }

    [[0, 0], [0, count - 7], [count - 7, 0]].forEach(function (pos) {
      var ox = (pos[1] + margin) * cell;
      var oy = (pos[0] + margin) * cell;
      var outer = cell * 7;
      var inner = cell * 3;
      var innerOffset = cell * 2;
      // Eye = outer shape with the inner ring cut out (evenodd), plus the solid core.
      var cx = ox + outer / 2, cy = oy + outer / 2;
      if (eyeStyle === "circle") {
        parts.push('<path fill-rule="evenodd" fill="' + eyeFill + '" d="' + circPath(cx, cy, outer / 2) + circPath(cx, cy, outer / 2 - cell) + '"/>');
        parts.push('<path fill="' + eyeFill + '" d="' + circPath(cx, cy, inner / 2) + '"/>');
      } else {
        var rOuter = eyeStyle === "rounded" ? outer * 0.28 : outer * 0.12;
        var rInner = eyeStyle === "rounded" ? inner * 0.32 : inner * 0.1;
        parts.push('<path fill-rule="evenodd" fill="' + eyeFill + '" d="' + rrPath(ox, oy, outer, outer, rOuter) +
          rrPath(ox + cell, oy + cell, outer - cell * 2, outer - cell * 2, rOuter * 0.7) + '"/>');
        parts.push('<path fill="' + eyeFill + '" d="' + rrPath(ox + innerOffset, oy + innerOffset, inner, inner, rInner) + '"/>');
      }
    });

    if (logoSrc) {
      parts.push('<image x="' + f2((size - logoSize) / 2) + '" y="' + f2((size - logoSize) / 2) +
        '" width="' + f2(logoSize) + '" height="' + f2(logoSize) + '" href="' + logoSrc + '"/>');
    }
    parts.push("</g>");

    if (frameText) {
      var y0, x0 = 0, w = size, rad = 0;
      if (fr.style === "top") y0 = 0;
      else if (fr.style === "badge") { w = Math.round(size * 0.72); x0 = Math.round((size - w) / 2); y0 = fr.top + size + fr.gap; rad = fr.barH / 2; }
      else y0 = fr.top + size;
      parts.push('<rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + fr.barH + '" rx="' + rad + '" fill="' + fg + '"/>');
      parts.push(
        '<text x="' + (x0 + w / 2) + '" y="' + (y0 + fr.barH / 2) + '" fill="' + (transparent ? "#ffffff" : bg) +
          '" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="' +
          Math.round(fr.barH * 0.42) + '" text-anchor="middle" dominant-baseline="middle">' +
          frameText.toUpperCase().replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</text>"
      );
    }

    parts.push("</svg>");
    return parts.join("");
  }


  // ---------------------------------------------------------------------
  // 4b. Vector export (PDF and EPS). Solid colors only: no gradient and no logo.
  // ---------------------------------------------------------------------
  var HELV_BOLD = { " ": 278, A: 722, B: 722, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 556, K: 722, L: 611, M: 833,
    N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611 };
  function textWidth(text, size) {
    var w = 0;
    for (var i = 0; i < text.length; i++) w += HELV_BOLD[text[i]] || 556;
    return (w / 1000) * size;
  }
  function pathRect(x, y, w, h) {
    return [["M", x, y], ["L", x + w, y], ["L", x + w, y + h], ["L", x, y + h], ["Z"]];
  }
  function pathRRect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    if (r <= 0) return pathRect(x, y, w, h);
    var k = 0.5523 * r;
    return [["M", x + r, y], ["L", x + w - r, y], ["C", x + w - r + k, y, x + w, y + r - k, x + w, y + r],
      ["L", x + w, y + h - r], ["C", x + w, y + h - r + k, x + w - r + k, y + h, x + w - r, y + h],
      ["L", x + r, y + h], ["C", x + r - k, y + h, x, y + h - r + k, x, y + h - r],
      ["L", x, y + r], ["C", x, y + r - k, x + r - k, y, x + r, y], ["Z"]];
  }
  function pathCircle(cx, cy, r) {
    var k = 0.5523 * r;
    return [["M", cx + r, cy], ["C", cx + r, cy + k, cx + k, cy + r, cx, cy + r], ["C", cx - k, cy + r, cx - r, cy + k, cx - r, cy],
      ["C", cx - r, cy - k, cx - k, cy - r, cx, cy - r], ["C", cx + k, cy - r, cx + r, cy - k, cx + r, cy], ["Z"]];
  }

  function vectorGeometry(payload, opts) {
    opts = opts || {};
    var fg = opts.fg || "#111827", bg = opts.bg || "#ffffff";
    var style = opts.style || "square", eyeStyle = opts.eyeStyle || "classic";
    var size = 300;
    var margin = opts.margin != null ? opts.margin : 4;
    var frameText = (opts.frameText || "").toUpperCase().replace(/[^\x20-\x7E]/g, "?");
    var transparent = !!opts.transparent;
    var qr = encode(payload, { logo: false, ecc: opts.ecc });
    var count = qr.getModuleCount();
    var cell = size / (count + margin * 2);
    var fr = frameGeometry(size, frameText, opts.frameStyle);
    var H = fr.top + size + fr.bottom;
    var ops = [];
    if (!transparent) ops.push({ fill: bg, path: pathRect(0, 0, size, H) });

    var mods = [];
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (!qr.isDark(r, c) || isEye(count, r, c)) continue;
        var x = (c + margin) * cell, y = fr.top + (r + margin) * cell;
        if (style === "diamond") mods = mods.concat([["M", x + cell / 2, y], ["L", x + cell, y + cell / 2], ["L", x + cell / 2, y + cell], ["L", x, y + cell / 2], ["Z"]]);
        else if (style === "dots") mods = mods.concat(pathCircle(x + cell / 2, y + cell / 2, cell / 2));
        else mods = mods.concat(pathRRect(x, y, cell, cell, radiusForStyle(style, cell)));
      }
    }
    ops.push({ fill: fg, path: mods });

    var eyeFill = opts.eyeColor || fg;
    [[0, 0], [0, count - 7], [count - 7, 0]].forEach(function (pos) {
      var ox = (pos[1] + margin) * cell, oy = fr.top + (pos[0] + margin) * cell;
      var outer = cell * 7, inner = cell * 3, cx = ox + outer / 2, cy = oy + outer / 2;
      var ring, core;
      if (eyeStyle === "circle") {
        ring = pathCircle(cx, cy, outer / 2).concat(pathCircle(cx, cy, outer / 2 - cell));
        core = pathCircle(cx, cy, inner / 2);
      } else {
        var rOuter = eyeStyle === "rounded" ? outer * 0.28 : outer * 0.12;
        var rInner = eyeStyle === "rounded" ? inner * 0.32 : inner * 0.1;
        ring = pathRRect(ox, oy, outer, outer, rOuter).concat(pathRRect(ox + cell, oy + cell, outer - cell * 2, outer - cell * 2, rOuter * 0.7));
        core = pathRRect(ox + cell * 2, oy + cell * 2, inner, inner, rInner);
      }
      ops.push({ fill: eyeFill, evenodd: true, path: ring });
      ops.push({ fill: eyeFill, path: core });
    });

    if (frameText) {
      var y0, x0 = 0, w = size, rad = 0;
      if (fr.style === "top") y0 = 0;
      else if (fr.style === "badge") { w = Math.round(size * 0.72); x0 = Math.round((size - w) / 2); y0 = fr.top + size + fr.gap; rad = fr.barH / 2; }
      else y0 = fr.top + size;
      ops.push({ fill: fg, path: pathRRect(x0, y0, w, fr.barH, rad) });
      var fs = fr.barH * 0.42;
      ops.push({ text: frameText, color: transparent ? "#ffffff" : bg, size: fs,
        x: x0 + w / 2 - textWidth(frameText, fs) / 2, y: y0 + fr.barH / 2 + fs * 0.35 });
    }
    return { w: size, h: H, ops: ops };
  }

  function rgb01(hex) {
    hex = String(hex || "#000000").replace("#", "");
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var n = parseInt(hex, 16) || 0;
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map(function (v) { return v.toFixed(4); }).join(" ");
  }
  function num(n) { return (Math.round(n * 1000) / 1000).toString(); }
  function pdfEsc(t) { return t.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)"); }

  function vectorOps(geo, flavor) {
    var H = geo.h, out = [];
    var Y = function (y) { return num(H - y); };
    geo.ops.forEach(function (op) {
      if (op.text != null) {
        if (flavor === "pdf") out.push("BT /F1 " + num(op.size) + " Tf " + rgb01(op.color) + " rg " + num(op.x) + " " + Y(op.y) + " Td (" + pdfEsc(op.text) + ") Tj ET");
        else out.push("/Helvetica-Bold findfont " + num(op.size) + " scalefont setfont " + rgb01(op.color) + " setrgbcolor " + num(op.x) + " " + Y(op.y) + " moveto (" + pdfEsc(op.text) + ") show");
        return;
      }
      out.push(rgb01(op.fill) + (flavor === "pdf" ? " rg" : " setrgbcolor"));
      if (flavor === "ps") out.push("newpath");
      op.path.forEach(function (seg) {
        var c = seg[0];
        if (c === "M") out.push(num(seg[1]) + " " + Y(seg[2]) + (flavor === "pdf" ? " m" : " moveto"));
        else if (c === "L") out.push(num(seg[1]) + " " + Y(seg[2]) + (flavor === "pdf" ? " l" : " lineto"));
        else if (c === "C") out.push(num(seg[1]) + " " + Y(seg[2]) + " " + num(seg[3]) + " " + Y(seg[4]) + " " + num(seg[5]) + " " + Y(seg[6]) + (flavor === "pdf" ? " c" : " curveto"));
        else out.push(flavor === "pdf" ? "h" : "closepath");
      });
      out.push(flavor === "pdf" ? (op.evenodd ? "f*" : "f") : (op.evenodd ? "eofill" : "fill"));
    });
    return out.join("\n");
  }

  function toEPS(geo) {
    var head = "%!PS-Adobe-3.0 EPSF-3.0\n%%BoundingBox: 0 0 " + Math.ceil(geo.w) + " " + Math.ceil(geo.h) +
      "\n%%Creator: SmartQRCraft\n%%EndComments\n";
    return new Blob([head + vectorOps(geo, "ps") + "\nshowpage\n%%EOF\n"], { type: "application/postscript" });
  }

  function toPDF(geo) {
    var content = vectorOps(geo, "pdf");
    var objs = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + num(geo.w) + " " + num(geo.h) + "] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
      "<< /Length " + content.length + " >>\nstream\n" + content + "\nendstream",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
    ];
    var pdf = "%PDF-1.4\n", offsets = [];
    objs.forEach(function (o, i) { offsets.push(pdf.length); pdf += (i + 1) + " 0 obj\n" + o + "\nendobj\n"; });
    var xref = pdf.length;
    pdf += "xref\n0 " + (objs.length + 1) + "\n0000000000 65535 f \n";
    offsets.forEach(function (o) { pdf += ("0000000000" + o).slice(-10) + " 00000 n \n"; });
    pdf += "trailer\n<< /Size " + (objs.length + 1) + " /Root 1 0 R >>\nstartxref\n" + xref + "\n%%EOF\n";
    var bytes = new Uint8Array(pdf.length);
    for (var i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 255;
    return new Blob([bytes], { type: "application/pdf" });
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  // ---------------------------------------------------------------------
  // 5. Download helpers
  // ---------------------------------------------------------------------
  function downloadCanvasPNG(canvas, filename) {
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename || "qr-code.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    }, "image/png");
  }

  function downloadCanvas(canvas, filename, mime, quality) {
    canvas.toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    }, mime || "image/png", quality);
  }

  function downloadSVG(svgString, filename) {
    var blob = new Blob([svgString], { type: "image/svg+xml" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename || "qr-code.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function isPayloadValid(payload) {
    return !!(payload && payload.trim().length);
  }

  global.SmartQR = {
    buildPayload: buildPayload,
    renderToCanvas: renderToCanvas,
    renderToSVG: renderToSVG,
    downloadCanvasPNG: downloadCanvasPNG,
    downloadCanvas: downloadCanvas,
    vectorGeometry: vectorGeometry,
    toPDF: toPDF,
    toEPS: toEPS,
    downloadBlob: downloadBlob,
    downloadSVG: downloadSVG,
    isPayloadValid: isPayloadValid,
    isValidIBAN: isValidIBAN
  };
})(window);
