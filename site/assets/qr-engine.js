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
    telegram: function (f) {
      var u = (f.user || "").trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?(t\.me|telegram\.me)\//i, "").replace(/[\/?#].*$/, "");
      if (!/^[A-Za-z0-9_]{4,32}$/.test(u)) return "";
      var msg = (f.message || "").trim();
      return "https://t.me/" + u + (msg ? "?text=" + encodeURIComponent(msg) : "");
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
    // The library defaults to one byte per character (Latin-1), which breaks umlauts in scanners that
    // expect UTF-8 and mangles anything outside Latin-1 (euro sign, emoji). Always encode as UTF-8.
    global.qrcode.stringToBytes = global.qrcode.stringToBytesFuncs["UTF-8"];
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
  var FRAME_STYLES = ["bottom", "top", "badge", "bubble", "outline", "corners", "text", "bag", "gift", "cup", "envelope", "chef", "phone", "heart"];

  function frameGeometry(size, frameText, frameStyle) {
    var style = FRAME_STYLES.indexOf(frameStyle) >= 0 ? frameStyle : "bottom";
    var barH = frameText ? Math.round(size * 0.14) : 0;
    var gap = frameText && style === "badge" ? Math.round(size * 0.03) : 0;
    var ptr = frameText && style === "bubble" ? Math.round(size * 0.04) : 0;
    var top = 0, bottom = 0, left = 0, right = 0;
    if (frameText) {
      if (style === "bag" || style === "gift" || style === "envelope") { top = Math.round(size * 0.17); bottom = barH; }
      else if (style === "chef") { top = Math.round(size * 0.24); bottom = barH; }
      else if (style === "heart") {
        // the code sits inside a heart drawn in a 100 x 88 box; the square spans x 27..73, y 22..68 of that box
        var hk = size / 46;
        left = right = Math.round(27 * hk); top = Math.round(22 * hk); bottom = Math.round(20 * hk);
      }
      else if (style === "phone") { top = Math.round(size * 0.11); bottom = barH + Math.round(size * 0.1); left = right = Math.round(size * 0.05); }
      else if (style === "cup") { top = Math.round(size * 0.15); bottom = barH; right = Math.round(size * 0.2); }
      else if (style === "top") top = barH;
      else if (style === "bubble") top = barH + ptr;
      else if (style === "badge") bottom = barH + gap;
      else if (style === "text") bottom = Math.round(barH * 0.85);
      else bottom = barH; // bottom, outline, corners
    }
    return { barH: barH, style: style, gap: gap, ptr: ptr, top: top, bottom: bottom, left: left, right: right };
  }

  // Every frame is described as filled paths plus one text item, so the canvas,
  // SVG, PDF and EPS renderers all draw exactly the same frame.
  function frameOps(size, fr, text, fg, bg, transparent) {
    var ops = [];
    if (!text) return ops;
    var st = fr.style, barH = fr.barH, top = fr.top;
    var barText = function (cx, cy, fs) {
      ops.push({ text: text, color: bg, knockout: transparent, size: fs, cx: cx, cy: cy });
    };
    var plainText = function (cy) {
      ops.push({ text: text, color: fg, knockout: false, size: Math.round(barH * 0.5), cx: size / 2, cy: cy });
    };
    var fs = Math.round(barH * 0.42);
    if (st === "bottom") {
      ops.push({ fill: fg, path: pathRect(0, top + size, size, barH) });
      barText(size / 2, top + size + barH / 2, fs);
    } else if (st === "top") {
      ops.push({ fill: fg, path: pathRect(0, 0, size, barH) });
      barText(size / 2, barH / 2, fs);
    } else if (st === "badge") {
      var w = Math.round(size * 0.72), x0 = Math.round((size - w) / 2), y0 = top + size + fr.gap;
      ops.push({ fill: fg, path: pathRRect(x0, y0, w, barH, barH / 2) });
      barText(size / 2, y0 + barH / 2, fs);
    } else if (st === "bubble") {
      var bw = Math.round(size * 0.7), bx = Math.round((size - bw) / 2), cx = size / 2, pw = fr.ptr * 1.1;
      ops.push({ fill: fg, path: pathRRect(bx, 0, bw, barH, barH * 0.3) });
      ops.push({ fill: fg, path: [["M", cx - pw, barH - 1], ["L", cx + pw, barH - 1], ["L", cx, barH + fr.ptr], ["Z"]] });
      barText(cx, barH / 2, fs);
    } else if (st === "outline") {
      var t = size * 0.022, r = size * 0.06;
      ops.push({ fill: fg, evenodd: true, path: pathRRect(0, top, size, size, r).concat(pathRRect(t, top + t, size - 2 * t, size - 2 * t, Math.max(0, r - t))) });
      ops.push({ fill: fg, path: pathRect(0, top + size, size, barH) });
      barText(size / 2, top + size + barH / 2, fs);
    } else if (st === "heart") {
      // heart outline (outer heart minus a slightly smaller copy), with the text on a pill under the code
      var k = size / 46;
      var heartPath = function (sc) {
        var cx0 = 50, cy0 = 46;
        var P = function (x, y) { return [((cx0 + (x - cx0) * sc) - 27) * k, (cy0 + (y - cy0) * sc) * k]; };
        var pts = [["M", 50, 88], ["C", 20, 65, 0, 45, 0, 25], ["C", 0, 10, 12, 0, 27, 0], ["C", 38, 0, 46, 6, 50, 15],
          ["C", 54, 6, 62, 0, 73, 0], ["C", 88, 0, 100, 10, 100, 25], ["C", 100, 45, 80, 65, 50, 88]];
        return pts.map(function (sg) {
          if (sg[0] === "M") { var a = P(sg[1], sg[2]); return ["M", a[0], a[1]]; }
          var c1 = P(sg[1], sg[2]), c2 = P(sg[3], sg[4]), e = P(sg[5], sg[6]);
          return ["C", c1[0], c1[1], c2[0], c2[1], e[0], e[1]];
        }).concat([["Z"]]);
      };
      ops.push({ fill: fg, evenodd: true, path: heartPath(1).concat(heartPath(0.93)) });
      var pw3 = 30 * k, ph3 = 6.4 * k, py3 = 70.2 * k;
      ops.push({ fill: fg, path: pathRRect(size / 2 - pw3 / 2, py3, pw3, ph3, ph3 / 2) });
      barText(size / 2, py3 + ph3 / 2, Math.round(ph3 * 0.5));
    } else if (st === "phone") {
      // a phone outline: thick rounded body with a speaker slot at the top and a home bar at the bottom
      var pt = size * 0.035, pr = size * 0.12, pw2 = size + fr.left + fr.right, ph = top + size + fr.bottom;
      var px = -fr.left;
      ops.push({ fill: fg, evenodd: true, path: pathRRect(px, 0, pw2, ph, pr).concat(pathRRect(px + pt, pt, pw2 - 2 * pt, ph - 2 * pt, pr - pt)) });
      ops.push({ fill: fg, path: pathRRect(size / 2 - size * 0.09, size * 0.045, size * 0.18, size * 0.025, size * 0.0125) });
      ops.push({ fill: fg, path: pathRect(px + pt, top + size, pw2 - 2 * pt, barH) });
      barText(size / 2, top + size + barH / 2, fs);
      ops.push({ fill: fg, path: pathRRect(size / 2 - size * 0.12, top + size + barH + fr.bottom - barH - size * 0.06, size * 0.24, size * 0.022, size * 0.011) });
    } else if (st === "bag" || st === "gift" || st === "cup" || st === "envelope" || st === "chef") {
      var tk = size * 0.022, rr = size * 0.05, bodyH = size + barH;
      // the body: a rounded ring around the code with the label band filling its lower edge
      ops.push({ fill: fg, evenodd: true, path: pathRRect(0, top, size, bodyH, rr).concat(pathRRect(tk, top + tk, size - 2 * tk, bodyH - 2 * tk, Math.max(0, rr - tk))) });
      ops.push({ fill: fg, path: pathRect(tk, top + size, size - 2 * tk, barH - tk) });
      barText(size / 2, top + size + (barH - tk) / 2, fs);
      var cx2 = size / 2;
      if (st === "bag") {
        var hw = size * 0.42, th = size * 0.03;
        ops.push({ fill: fg, path: pathArch((size - hw) / 2, size * 0.015, hw, top - size * 0.015 + th, th) });
      } else if (st === "envelope") {
        // open envelope flap above the body, drawn as an outlined triangle
        var fh = top - size * 0.01, ft = size * 0.028, fk = ft * 2.2;
        ops.push({ fill: fg, evenodd: true, path: [["M", 0, top], ["L", cx2, top - fh], ["L", size, top], ["Z"],
          ["M", fk, top - ft * 0.2], ["L", size - fk, top - ft * 0.2], ["L", cx2, top - fh + fk * 0.9], ["Z"]] });
        ops.push({ fill: fg, path: pathCircle(cx2, top - fh * 0.38, size * 0.035) });
      } else if (st === "chef") {
        // chef hat: three puffs over a band
        var bandH = size * 0.06, bandW = size * 0.5, by = top - bandH - size * 0.01;
        ops.push({ fill: fg, path: pathRRect(cx2 - bandW / 2, by, bandW, bandH, size * 0.012) });
        var cr = size * 0.085;
        ops.push({ fill: fg, path: pathCircle(cx2 - bandW * 0.3, by - cr * 0.55, cr) });
        ops.push({ fill: fg, path: pathCircle(cx2 + bandW * 0.3, by - cr * 0.55, cr) });
        ops.push({ fill: fg, path: pathCircle(cx2, by - cr * 0.95, cr * 1.12) });
        ops.push({ fill: fg, path: pathRect(cx2 - bandW * 0.42, by - cr * 0.6, bandW * 0.84, cr * 0.62) });
      } else if (st === "gift") {
        var lr = size * 0.085, lt = size * 0.028, ly = top - size * 0.07;
        [-1, 1].forEach(function (d) {
          var lx2 = cx2 + d * size * 0.1;
          ops.push({ fill: fg, evenodd: true, path: pathCircle(lx2, ly, lr).concat(pathCircle(lx2, ly, lr - lt)) });
        });
        ops.push({ fill: fg, path: pathRRect(cx2 - size * 0.04, top - size * 0.07, size * 0.08, size * 0.085, size * 0.016) });
      } else {
        [-1, 0, 1].forEach(function (d) {
          ops.push({ fill: fg, path: pathRRect(cx2 + d * size * 0.12 - size * 0.014, size * 0.02 + (d === 0 ? 0 : size * 0.025), size * 0.028, size * 0.085, size * 0.014) });
        });
        var hy = top + size * 0.16, hh = size * 0.52, hth = size * 0.036, hx = size - tk;
        ops.push({ fill: fg, evenodd: true, path: pathRRect(hx, hy, fr.right + tk, hh, size * 0.1).concat(pathRRect(hx + hth, hy + hth, fr.right + tk - 2 * hth, hh - 2 * hth, size * 0.07)) });
      }
    } else if (st === "corners") {
      var inset = size * 0.03, arm = size * 0.15, th = size * 0.022, L = inset, R = size - inset, T = top + inset, B = top + size - inset;
      var corner = [];
      corner = corner.concat(pathRect(L, T, arm, th), pathRect(L, T, th, arm));
      corner = corner.concat(pathRect(R - arm, T, arm, th), pathRect(R - th, T, th, arm));
      corner = corner.concat(pathRect(L, B - th, arm, th), pathRect(L, B - arm, th, arm));
      corner = corner.concat(pathRect(R - arm, B - th, arm, th), pathRect(R - th, B - arm, th, arm));
      ops.push({ fill: fg, path: corner });
      plainText(top + size + fr.bottom / 2);
    } else {
      plainText(top + size + fr.bottom / 2);
    }
    return ops;
  }

  function tracePath(ctx, path) {
    ctx.beginPath();
    path.forEach(function (sg) {
      if (sg[0] === "M") ctx.moveTo(sg[1], sg[2]);
      else if (sg[0] === "L") ctx.lineTo(sg[1], sg[2]);
      else if (sg[0] === "C") ctx.bezierCurveTo(sg[1], sg[2], sg[3], sg[4], sg[5], sg[6]);
      else ctx.closePath();
    });
  }

  function pathToD(path) {
    var f = function (n) { return n.toFixed(2); };
    return path.map(function (sg) {
      if (sg[0] === "M") return "M" + f(sg[1]) + " " + f(sg[2]);
      if (sg[0] === "L") return "L" + f(sg[1]) + " " + f(sg[2]);
      if (sg[0] === "C") return "C" + f(sg[1]) + " " + f(sg[2]) + " " + f(sg[3]) + " " + f(sg[4]) + " " + f(sg[5]) + " " + f(sg[6]);
      return "Z";
    }).join("");
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

    canvas.width = fr.left + size + fr.right;
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
    ctx.translate(fr.left, fr.top);
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
      frameOps(size, fr, frameText.toUpperCase(), fg, bg, transparent).forEach(function (op) {
        if (op.text != null) {
          ctx.fillStyle = op.color;
          if (op.knockout) ctx.globalCompositeOperation = "destination-out";
          ctx.font = "700 " + op.size + "px Inter, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(op.text, op.cx + fr.left, op.cy);
          ctx.globalCompositeOperation = "source-over";
        } else {
          ctx.fillStyle = op.fill;
          tracePath(ctx, shiftPath(op.path, fr.left));
          ctx.fill(op.evenodd ? "evenodd" : "nonzero");
        }
      });
    };

    if (logoSrc) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        var logoSize = size * 0.2;
        var lx = fr.left + (size - logoSize) / 2;
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
    var totalW = fr.left + size + fr.right;
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
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + totalW + '" height="' + totalH +
        '" viewBox="0 0 ' + totalW + " " + totalH + '">'
    );
    if (gradient !== "none") {
      var gp = gradientPoints(gradient, size);
      parts.push('<defs><linearGradient id="qg" gradientUnits="userSpaceOnUse" x1="' + gp[0] + '" y1="' + gp[1] + '" x2="' + gp[2] + '" y2="' + gp[3] +
        '"><stop offset="0" stop-color="' + fg + '"/><stop offset="1" stop-color="' + opts.fg2 + '"/></linearGradient></defs>');
      fgFill = "url(#qg)";
    }
    var eyeFill = opts.eyeColor || fgFill;
    if (!transparent) parts.push('<rect width="100%" height="100%" fill="' + bg + '"/>');
    parts.push('<g transform="translate(' + fr.left + ',' + fr.top + ')">');

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
      frameOps(size, fr, frameText.toUpperCase(), fg, bg, transparent).forEach(function (op) {
        if (op.text != null) {
          parts.push('<text x="' + f2(op.cx + fr.left) + '" y="' + f2(op.cy) + '" fill="' + (op.knockout ? "#ffffff" : op.color) +
            '" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="' + op.size +
            '" text-anchor="middle" dominant-baseline="middle">' + op.text.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</text>");
        } else {
          parts.push('<path fill="' + op.fill + '"' + (op.evenodd ? ' fill-rule="evenodd"' : "") + ' d="' + pathToD(shiftPath(op.path, fr.left)) + '"/>');
        }
      });
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
  function pathArch(x, y, w, h, t) {
    var r = Math.min(w / 2, h), k = 0.5523 * r, ri = Math.max(0, r - t), ki = 0.5523 * ri;
    return [["M", x, y + h], ["L", x, y + r], ["C", x, y + r - k, x + r - k, y, x + r, y], ["L", x + w - r, y],
      ["C", x + w - r + k, y, x + w, y + r - k, x + w, y + r], ["L", x + w, y + h], ["L", x + w - t, y + h],
      ["L", x + w - t, y + t + ri], ["C", x + w - t, y + t + ri - ki, x + w - t - ri + ki, y + t, x + w - t - ri, y + t],
      ["L", x + t + ri, y + t], ["C", x + t + ri - ki, y + t, x + t, y + t + ri - ki, x + t, y + t + ri], ["L", x + t, y + h], ["Z"]];
  }
  function shiftPath(path, dx) {
    if (!dx) return path;
    return path.map(function (sg) {
      if (sg[0] === "M" || sg[0] === "L") return [sg[0], sg[1] + dx, sg[2]];
      if (sg[0] === "C") return ["C", sg[1] + dx, sg[2], sg[3] + dx, sg[4], sg[5] + dx, sg[6]];
      return sg;
    });
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
    var W = fr.left + size + fr.right;
    var ops = [];
    if (!transparent) ops.push({ fill: bg, path: pathRect(0, 0, W, H) });

    var mods = [];
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        if (!qr.isDark(r, c) || isEye(count, r, c)) continue;
        var x = fr.left + (c + margin) * cell, y = fr.top + (r + margin) * cell;
        if (style === "diamond") mods = mods.concat([["M", x + cell / 2, y], ["L", x + cell, y + cell / 2], ["L", x + cell / 2, y + cell], ["L", x, y + cell / 2], ["Z"]]);
        else if (style === "dots") mods = mods.concat(pathCircle(x + cell / 2, y + cell / 2, cell / 2));
        else mods = mods.concat(pathRRect(x, y, cell, cell, radiusForStyle(style, cell)));
      }
    }
    ops.push({ fill: fg, path: mods });

    var eyeFill = opts.eyeColor || fg;
    [[0, 0], [0, count - 7], [count - 7, 0]].forEach(function (pos) {
      var ox = fr.left + (pos[1] + margin) * cell, oy = fr.top + (pos[0] + margin) * cell;
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
      frameOps(size, fr, frameText, fg, bg, transparent).forEach(function (op) {
        if (op.text != null) {
          ops.push({ text: op.text, color: op.knockout ? "#ffffff" : op.color, size: op.size,
            x: op.cx + fr.left - textWidth(op.text, op.size) / 2, y: op.cy + op.size * 0.35 });
        } else {
          ops.push({ fill: op.fill, evenodd: op.evenodd, path: shiftPath(op.path, fr.left) });
        }
      });
    }
    return { w: W, h: H, ops: ops };
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

  // ---------------------------------------------------------------------
  // Picture QR: the code drawn as small dots over a photo. Finder, timing and
  // alignment patterns stay solid so scanners can lock on; ECC is always H.
  // ---------------------------------------------------------------------
  var ALIGN_POS = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62],
    [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]];

  function structuralMask(count) {
    var v = (count - 17) / 4, m = [];
    for (var r = 0; r < count; r++) { m.push([]); for (var c = 0; c < count; c++) m[r].push(false); }
    var mark = function (r0, c0, n) {
      for (var r = r0; r < r0 + n; r++) for (var c = c0; c < c0 + n; c++) if (r >= 0 && c >= 0 && r < count && c < count) m[r][c] = true;
    };
    mark(-1, -1, 9); mark(-1, count - 8, 9); mark(count - 8, -1, 9);
    for (var i = 8; i < count - 8; i++) { m[6][i] = true; m[i][6] = true; }
    var pos = ALIGN_POS[v - 1] || [];
    pos.forEach(function (r) {
      pos.forEach(function (c) {
        if ((r === 6 && c === 6) || (r === 6 && c === pos[pos.length - 1]) || (c === 6 && r === pos[pos.length - 1])) return;
        mark(r - 2, c - 2, 5);
      });
    });
    return m;
  }

  function renderPictureToCanvas(canvas, payload, opts) {
    opts = opts || {};
    var size = opts.size || 512, margin = opts.margin != null ? opts.margin : 4;
    var fg = opts.fg || "#111827", light = "#ffffff";
    var dot = Math.min(0.6, Math.max(0.3, opts.dot || 0.42));
    var qr = encode(payload, { logo: true });
    var count = qr.getModuleCount();
    var cell = size / (count + margin * 2);
    canvas.width = size; canvas.height = size;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, size, size);
    var img = opts.image, x0 = margin * cell, span = count * cell;
    if (img && img.width) {
      var s = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, x0, x0, span, span);
      if (opts.wash) { ctx.fillStyle = "rgba(255,255,255," + opts.wash + ")"; ctx.fillRect(x0, x0, span, span); }
    }
    var mask = structuralMask(count);
    var d = cell * dot, off = (cell - d) / 2;
    for (var r = 0; r < count; r++) {
      for (var c = 0; c < count; c++) {
        var dark = qr.isDark(r, c);
        ctx.fillStyle = dark ? fg : light;
        if (mask[r][c]) ctx.fillRect(x0 + c * cell, x0 + r * cell, cell + 0.5, cell + 0.5);
        else ctx.fillRect(x0 + c * cell + off, x0 + r * cell + off, d, d);
      }
    }
    return canvas;
  }

  function isPayloadValid(payload) {
    return !!(payload && payload.trim().length);
  }

  global.SmartQR = {
    buildPayload: buildPayload,
    renderToCanvas: renderToCanvas,
    renderToSVG: renderToSVG,
    renderPictureToCanvas: renderPictureToCanvas,
    downloadCanvasPNG: downloadCanvasPNG,
    downloadCanvas: downloadCanvas,
    FRAME_STYLES: FRAME_STYLES,
    vectorGeometry: vectorGeometry,
    toPDF: toPDF,
    toEPS: toEPS,
    downloadBlob: downloadBlob,
    downloadSVG: downloadSVG,
    isPayloadValid: isPayloadValid,
    isValidIBAN: isValidIBAN
  };
})(window);
