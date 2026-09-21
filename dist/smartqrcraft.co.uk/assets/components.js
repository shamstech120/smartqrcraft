/*! SmartQRCraft — shared header/footer/FAQ components, injected on every page. */
(function () {
  "use strict";

  var ICON_LOGO =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="2" fill="white"/><rect x="14" y="3" width="7" height="7" rx="2" fill="white" fill-opacity=".55"/><rect x="3" y="14" width="7" height="7" rx="2" fill="white" fill-opacity=".55"/><rect x="14" y="14" width="3" height="3" rx="1" fill="white"/><rect x="18" y="14" width="3" height="3" rx="1" fill="white" fill-opacity=".55"/><rect x="14" y="18" width="3" height="3" rx="1" fill="white" fill-opacity=".55"/><rect x="18" y="18" width="3" height="3" rx="1" fill="white"/></svg>';

  var I = (window.SMARTQR_I18N && window.SMARTQR_I18N.components) || {};
  var T = function (k, d) { return I[k] || d; };

  function headerHTML(base) {
    base = base || "";
    return (
      '<header class="site-header"><div class="wrap bar">' +
      '<a href="' + base + 'index.html" class="brand"><span class="brand-mark">' + ICON_LOGO + '</span>SmartQRCraft</a>' +
      '<nav class="nav" aria-label="Primary">' +
      '<a href="' + base + 'index.html#generator">' + T("nav_gen", "QR Code Generator") + '</a>' +
      '<a href="' + base + 'index.html#qr-types">' + T("nav_types", "QR Types") + '</a>' +
      '<a href="' + base + 'index.html#features">' + T("nav_features", "Features") + '</a>' +
      '<a href="' + base + 'index.html#faq">' + T("nav_resources", "Resources") + '</a>' +
      "</nav>" +
      '<a class="btn btn-primary" href="' + base + 'index.html#generator">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" stroke-width="2.4" stroke-linecap="round"/></svg>' + T("cta", "Create QR Code") + '</a>' +
      "</div></header>"
    );
  }

  function footerHTML(base) {
    base = base || "";
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
      "<div>" +
      '<a href="' + base + 'index.html" class="brand" style="margin-bottom:12px"><span class="brand-mark">' + ICON_LOGO + '</span>SmartQRCraft</a>' +
      '<p style="color:var(--muted);font-size:13.5px;max-width:280px;line-height:1.6">' + T("footer_blurb", "Free QR code tools for everyone. Create, customize and download QR codes instantly — no signup required.") + '</p>' +
      "</div>" +
      '<div><h4>' + T("h_gen", "Generator") + '</h4><ul>' +
      '<li><a href="' + base + 'index.html#generator">' + T("nav_gen", "QR Code Generator") + '</a></li>' +
      /*TOOLLINKS*/
      '<li><a href="' + base + 'qr-code-scanner.html">QR Code Scanner</a></li>' +
      '<li><a href="' + base + 'qr-code-tester.html">QR Code Tester</a></li>' +
      '<li><a href="' + base + 'bulk-qr-code-generator.html">Bulk QR Code Generator</a></li>' +
      '<li><a href="' + base + 'barcode-generator.html">Barcode Generator</a></li>' +
      '<li><a href="' + base + 'wifi-qr-code-generator.html">WiFi QR Code</a></li>' +
      '<li><a href="' + base + 'vcard-qr-code-generator.html">vCard / Business Card QR</a></li>' +
      '<li><a href="' + base + 'qr-code-with-logo.html">QR Code with Logo</a></li>' +
      '<li><a href="' + base + 'event-qr-code-generator.html">Event QR Code</a></li>' +
      '<li><a href="' + base + 'facebook-qr-code-generator.html">Facebook QR Code</a></li>' +

      /*ENDTOOLLINKS*/
      '<li><a href="' + base + T("hub_href", "all-qr-code-tools.html") + '">' + T("all_types", "All QR Types") + '</a></li>' +
      "</ul></div>" +
      '<div><h4>' + T("h_res", "Resources") + '</h4><ul>' +
      '<li><a href="' + base + 'index.html#features">' + T("nav_features", "Features") + '</a></li>' +
      '<li><a href="' + base + 'index.html#how-it-works">' + T("how", "How It Works") + '</a></li>' +
      '<li><a href="' + base + 'index.html#faq">' + T("faq", "FAQ") + '</a></li>' +
      "</ul></div>" +
      '<div><h4>' + T("h_about", "About") + '</h4><ul>' +
      '<li><a href="' + base + T("about_href", "about.html") + '">' + T("about", "About") + '</a></li>' +
      '<li><a href="' + base + T("contact_href", "contact.html") + '">' + T("contact", "Contact") + '</a></li>' + ((I.legal || [["privacy.html", "Privacy"], ["terms.html", "Terms"]]) ? (I.legal || [["privacy.html", "Privacy"], ["terms.html", "Terms"]]).map(function (l) { return '<li><a href="' + base + l[0] + '">' + l[1] + "</a></li>"; }).join("") : "") +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><p>© ' + year + ' SmartQRCraft.com</p>' +
      '<p>' + T("footer_free", "100% free QR tools — no signup required.") + '</p></div>' +
      "</div></footer>"
    );
  }

  function mountLayout() {
    var base = document.body.getAttribute("data-base") || "";
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    if (headerMount) headerMount.outerHTML = headerHTML(base);
    if (footerMount) footerMount.outerHTML = footerHTML(base);
  }

  function mountFAQ(root) {
    root = root || document;
    var items = root.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        items.forEach(function (i) {
          var b = i.querySelector(".faq-q");
          var p = i.querySelector(".faq-a");
          b.setAttribute("aria-expanded", "false");
          p.style.maxHeight = null;
        });
        if (!open) {
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + 20 + "px";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    mountLayout();
    mountFAQ(document);
  });

  window.SmartQRComponents = { headerHTML: headerHTML, footerHTML: footerHTML, mountFAQ: mountFAQ };
})();
