/*! SmartQRCraft homepage: QR type cards. */
  // Populate the QR type cards grid from the same TYPES config the generator uses,
  // linking each card to the generator pre-selected via ?type=
  document.addEventListener("DOMContentLoaded", function () {
    var TYPE_META = [
      ["url", "URL QR Code", "Direct customers straight to any website, landing page, or online store."],
      ["wifi", "WiFi QR Code", "Let guests join your wireless network instantly, without typing a password."],
      ["vcard", "vCard QR Code", "Save your name, number, company and email right into an address book."],
      ["menu", "Menu QR Code", "Give diners contactless access to your full digital menu."],
      ["email", "Email QR Code", "Pre-fill a recipient, subject line and message in one scan."],
      ["sms", "SMS QR Code", "Open a pre-drafted text message for promotions or inquiries."],
      ["phone", "Phone QR Code", "Prompt an instant call to your office or support line."],
      ["text", "Text QR Code", "Display plain text, promo codes, or serial numbers offline."],
      ["location", "Location QR Code", "Send people straight to a map location or address."],
      ["social", "Social Media QR Code", "Route followers to your Instagram, TikTok, or link-in-bio hub."],
      ["pdf", "PDF QR Code", "Distribute manuals, brochures and documents seamlessly."],
      ["app", "App QR Code", "Send users to download your app from the App Store or Google Play."],
      ["whatsapp", "WhatsApp QR Code", "Open a WhatsApp chat with your number and a ready-made first message."],
      ["event", "Event QR Code", "Add an event with date, time and place to a guest's calendar."],
      ["mecard", "MeCard QR Code", "A compact contact format that many Android phones read directly."],
      ["x", "X (Twitter) QR Code", "Open your profile or start a pre-filled post."],
      ["bitcoin", "Bitcoin QR Code", "Receive Bitcoin with your address and an optional amount."]
    ];
    var ICON_MAP = {
      url: '<path d="M9 15l6-6M10 8l1-1a3.5 3.5 0 015 5l-1 1M14 16l-1 1a3.5 3.5 0 01-5-5l1-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      wifi: '<path d="M5 9a11 11 0 0114 0M8 12.5a6.5 6.5 0 018 0M11 16a2 2 0 012 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      vcard: '<rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><circle cx="9" cy="11" r="1.8" stroke="currentColor" stroke-width="1.5"/>',
      menu: '<path d="M6 3v18M6 3c-1.5 0-2.5 1.5-2.5 4S4.5 11 6 11M18 3v18M18 3a2.5 2.5 0 000 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
      email: '<rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      sms: '<path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v9A1.5 1.5 0 0118.5 16H9l-4 4v-4H5.5A1.5 1.5 0 014 14.5v-9z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
      phone: '<path d="M6 3h3l1.5 4.5L8 9a11 11 0 007 7l1.5-2.5L21 15v3a2 2 0 01-2 2C10.5 20 4 13.5 4 5a2 2 0 012-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
      text: '<path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      location: '<path d="M12 21s7-6.2 7-11.5A7 7 0 105 9.5C5 14.8 12 21 12 21z" stroke="currentColor" stroke-width="1.7"/>',
      social: '<circle cx="7" cy="12" r="2.3" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="6.5" r="2.3" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="17.5" r="2.3" stroke="currentColor" stroke-width="1.6"/>',
      pdf: '<path d="M7 3h7l4 4v14H7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
      app: '<rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" stroke-width="1.7"/>',
      whatsapp: '<path d="M4 20l1.3-4A8 8 0 118 18.7L4 20z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
      event: '<rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M4 9h16M9 3v4M15 3v4" stroke="currentColor" stroke-width="1.6"/>',
      mecard: '<rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><circle cx="9" cy="11" r="1.8" stroke="currentColor" stroke-width="1.5"/>',
      x: '<path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
      bitcoin: '<circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><path d="M10 8v8M10 8h3a2 2 0 010 4h-3M10 12h3.4a2 2 0 010 4H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
    };
    var grid = document.querySelector("#qr-types .card-grid");
    if (grid) {
      TYPE_META.forEach(function (t) {
        var a = document.createElement("a");
        a.href = "#qr-builder?type=" + t[0];
        a.className = "card";
        a.style.textDecoration = "none";
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          var url = new URL(window.location.href);
          url.searchParams.set("type", t[0]);
          url.hash = "qr-builder";
          window.history.replaceState(null, "", url);
          document.querySelector('.type-btn[data-type="' + t[0] + '"]').click();
          document.getElementById("qr-builder").scrollIntoView({ behavior: "smooth", block: "start" });
        });
        a.innerHTML =
          '<div><div class="card-icon"><svg viewBox="0 0 24 24" fill="none">' + ICON_MAP[t[0]] + '</svg></div>' +
          "<h3>" + t[1] + "</h3><p>" + t[2] + "</p></div>" +
          '<span class="card-link">Create QR<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>';
        grid.appendChild(a);
      });
    }
  });
