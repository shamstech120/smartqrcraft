/*! SmartQRCraft — German UI strings. Loaded before components.js/app.js on smartqrcraft.de pages. */
window.SMARTQR_I18N = {
  lang: "de",
  scanMe: "JETZT SCANNEN",
  stylePills: [["square", "Eckig"], ["rounded", "Abgerundet"], ["dots", "Punkte"], ["diamond", "Raute"]],
  eyePills: [["classic", "Klassisch"], ["rounded", "Weich"], ["circle", "Rund"]],
  components: {
    nav_gen: "QR-Code Generator",
    nav_types: "QR-Code Arten",
    nav_features: "Funktionen",
    nav_resources: "Hilfe",
    cta: "QR-Code erstellen",
    footer_blurb: "Kostenlose QR-Code Tools für alle. QR-Codes erstellen, gestalten und herunterladen, ohne Anmeldung.",
    h_gen: "Generator",
    h_res: "Infos",
    h_about: "Über uns",
    all_types: "Alle QR-Code Tools", hub_href: "alle-qr-code-tools.html",
    how: "So funktioniert es",
    faq: "Häufige Fragen",
    about: "Über SmartQRCraft",
    contact: "Kontakt",
    footer_free: "100 % kostenlos, ohne Anmeldung.",
    about_href: "ueber-uns.html", contact_href: "kontakt.html",
    legal: [["impressum.html", "Impressum"], ["datenschutz.html", "Datenschutz"], ["nutzungsbedingungen.html", "Nutzungsbedingungen"]]
  },
  exp: { tabShape: "Farbe & Form", tabFrame: "Rahmen", tabLogo: "Logo", tabAdv: "Erweitert", qrColor: "QR-Code-Farbe", bgColor: "Hintergrundfarbe", fNone: "Kein Rahmen", fBubble: "Sprechblase", fOutline: "Rahmenlinie", fCorners: "Eckmarken", fText: "Nur Text", fBag: "Einkaufstasche", fGift: "Geschenkbox", fCup: "Kaffeebecher", picTitle: "Bild-QR (Foto hinter dem Code)", picChoose: "Foto auswählen", picDot: "Punktgröße", picHint: "Das Foto scheint durch kleine Punkte. Download nur als PNG oder JPG; Rahmen und Logo werden nicht verwendet. Größere Punkte scannen leichter. Vor dem Druck immer testen.", histTitle: "Deine letzten QR-Codes", histClear: "Löschen", histNote: "Wird nur in diesem Browser gespeichert, wenn du herunterlädst. Es wird nichts hochgeladen.", fEnvelope: "Briefumschlag", fChef: "Kochmütze", fPhone: "Smartphone", frameText: "Rahmentext", ecc: "Fehlerkorrektur", eccL: "Niedrig (7 %)", eccM: "Mittel (15 %)", eccQ: "Viertel (25 %)", eccH: "Hoch (30 %)", eccHint: "Höhere Stufen überstehen mehr Beschädigung, machen den Code aber dichter. Ein Logo in der Mitte nutzt immer Hoch.", border: "Rand (Ruhezone)", bTight: "2 Module (knapp)", bStd: "4 Module (Standard)", bWide: "6 Module", bXWide: "8 Module", borderHint: "Weniger als 4 Module kann bei manchen Scannern zu Fehlern führen. Nutze für den Druck 4 oder mehr.", pdf: "PDF herunterladen", eps: "EPS herunterladen", vecNote: "PDF und EPS sind Vektordateien mit einfarbigen Flächen: ohne Farbverlauf und ohne Logo.", customColor: "Eigene Farbe", templates: "Vorlagen", gradient: "Farbverlauf", gradient2: "Zweite Farbe", gNone: "Keiner", gH: "Horizontal", gV: "Vertikal", gD: "Diagonal", eyeColor: "Eckenfarbe", sameColor: "Wie Code", frameStyle: "Rahmenstil", fBottom: "Balken unten", fTop: "Balken oben", fBadge: "Badge unten", lowContrast: "Geringer Kontrast: Dieser Code lässt sich vielleicht nicht scannen. Nutze eine dunklere Codefarbe oder einen helleren Hintergrund.", tpl_classic: "Klassisch", tpl_violet: "Violett", tpl_sunset: "Sonnenuntergang", tpl_ocean: "Ozean", tpl_forest: "Wald", tpl_midnight: "Mitternacht", tpl_gold: "Gold", size: "Download-Größe", transparent: "Transparenter Hintergrund (PNG, SVG)", jpg: "JPG herunterladen", dotsHint: "Punkte sehen gut aus, lassen sich aber weniger zuverlässig scannen als eckige Module. Teste den Code vor dem Druck." },
  barcode: {
    title: "Barcode Generator", pill: "Läuft im Browser",
    values: "Ein Wert pro Zeile", type: "Barcode-Art", barWidth: "Balkenbreite", height: "Höhe", showText: "Ziffern unter den Balken anzeigen",
    color: "Balkenfarbe", bg: "Hintergrund", margin: "Rand", preview: "Vorschau", noValid: "Gib einen Wert ein, um den Barcode zu sehen.",
    invalid: "Für diese Art ungültig", downloadPng: "PNG herunterladen", downloadSvg: "SVG herunterladen", downloadZip: "ZIP herunterladen",
    ready: "Barcodes bereit", first: "Vorschau der ersten gültigen Zeile.", privacy: "Deine Werte werden auf deinem Gerät verarbeitet. Es wird nichts an einen Server gesendet.",
    line: "Zeile", skipped: "übersprungen", sample: "Beispiel einfügen",
    hCODE128: "Beliebiger Text mit Buchstaben und Zahlen. Am flexibelsten.",
    hEAN13: "12 oder 13 Ziffern. Die Prüfziffer wird ergänzt, wenn du 12 eingibst.",
    hEAN8: "7 oder 8 Ziffern. Die Prüfziffer wird ergänzt, wenn du 7 eingibst.",
    hUPC: "11 oder 12 Ziffern (UPC-A). Die Prüfziffer wird ergänzt, wenn du 11 eingibst.",
    hCODE39: "Großbuchstaben A bis Z, Zahlen und - . $ / + % sowie Leerzeichen.",
    hITF: "Nur Ziffern, in gerader Anzahl.",
    hITF14: "13 oder 14 Ziffern, für Versandkartons.",
    hcodabar: "Ziffern und - $ : / . +, meist mit A, B, C oder D am Anfang und Ende."
  },
  scanner: {
    noQr: "Kein QR-Code gefunden. Versuche ein schärferes Bild, schneide näher am Code zu, füge einen weißen Rand hinzu oder nutze einen Code mit mehr Kontrast.",
    camDenied: "Der Kamerazugriff wurde blockiert oder ist nicht verfügbar. Erlaube die Kamera im Browser oder lade stattdessen ein Bild hoch. Die Kamera funktioniert nur auf einer sicheren Seite (https).",
    camStarting: "Kamera wird gestartet ...",
    camScanning: "Richte die Kamera auf einen QR-Code.",
    badFile: "Bitte wähle eine Bilddatei (PNG, JPG, WebP, GIF).",
    content: "Inhalt", type: "Art", copy: "Kopieren", copied: "Kopiert", open: "Link öffnen", showPw: "Passwort anzeigen",
    typeLink: "Link", typeWifi: "WLAN-Netzwerk", typeVcard: "Visitenkarte (vCard)", typeUpi: "UPI-Zahlungsanfrage",
    typeEmail: "E-Mail", typePhone: "Telefonnummer", typeSms: "SMS", typeGeo: "Standort", typeText: "Text",
    linkWarn: "Öffne nur Links, denen du vertraust. Prüfe die Domain, bevor du fortfährst.",
    domain: "Domain", wifiName: "Netzwerkname", wifiSec: "Verschlüsselung", wifiPw: "Passwort", wifiNone: "Keine",
    upiWarn: "Dieser Code fordert eine Zahlung an. Wer ihn in einer Zahlungs-App scannt, sendet Geld, statt welches zu erhalten. Prüfe Empfänger und Betrag.",
    payee: "Empfänger", upiId: "UPI-ID", amount: "Betrag", name: "Name", phone: "Telefon", email: "E-Mail", org: "Firma",
    testTitle: "Ergebnis des Scan-Tests", verdictGood: "Zuverlässig", verdictOk: "Lesbar, aber anfällig", verdictBad: "Nicht zuverlässig",
    verdictGoodTxt: "Der Code wurde in voller Größe und verkleinert erkannt. Er sollte unter den meisten Bedingungen gut scannen.",
    verdictOkTxt: "Der Code wurde erkannt, scheiterte aber bei einigen härteren Tests. Drucke ihn größer, erhöhe den Kontrast oder kürze den Inhalt.",
    verdictBadTxt: "Der Code scheiterte bei den meisten Tests. Vereinfache den Inhalt, nutze einen dunklen Code auf hellem Grund und drucke ihn größer.",
    chkFull: "Wird in voller Größe erkannt", chkHalf: "Wird bei halber Größe erkannt", chkQuarter: "Wird bei einem Viertel der Größe erkannt", chkSmall: "Wird bei sehr kleiner Größe erkannt",
    chkBlur: "Wird bei leichter Unschärfe erkannt", chkInv: "Dunkler Code auf hellem Grund", chkContrast: "Kontrast", chkLen: "Länge des Inhalts",
    invWarn: "Dieser Code ist hell auf dunkel. Manche Scanner-Apps können invertierte Codes nicht lesen.",
    contrastLow: "Geringer Kontrast. Nutze eine dunklere Codefarbe oder einen helleren Hintergrund.", contrastOk: "Guter Kontrast",
    lenLong: "Langer Inhalt ergibt einen dichten Code, der mehr Platz braucht. Erwäge einen kürzeren Link.", lenOk: "In Ordnung",
    pass: "Bestanden", fail: "Fehler", skip: "In diesem Browser nicht unterstützt", chars: "Zeichen"
  },
  types: {
    url: {
      label: "Link", short: "Leite Besucher auf eine beliebige Webseite.",
      fields: [{ name: "value", label: "Link zu deiner Webseite", placeholder: "https://beispiel.de", type: "text" }]
    },
    text: {
      label: "Text", short: "Beliebigen Text oder eine Notiz codieren.",
      fields: [{ name: "value", label: "Dein Text", placeholder: "Alles, was du codieren möchtest ...", type: "textarea" }]
    },
    wifi: {
      label: "WLAN", short: "Gäste verbinden sich ohne Passwort-Eingabe mit dem WLAN.",
      fields: [
        { name: "ssid", label: "Netzwerkname (SSID)", placeholder: "FRITZ!Box 7590", type: "text" },
        { name: "password", label: "Passwort", placeholder: "••••••••", type: "text" },
        { name: "security", label: "Verschlüsselung", type: "select", options: [["WPA", "WPA/WPA2/WPA3"], ["WEP", "WEP"], ["nopass", "Kein Passwort"]] },
        { name: "hidden", label: "Verstecktes Netzwerk", type: "select", options: [["", "Nein"], ["1", "Ja"]] }
      ]
    },
    email: {
      label: "E-Mail", short: "Empfänger, Betreff und Nachricht vorausfüllen.",
      fields: [
        { name: "to", label: "E-Mail-Adresse des Empfängers", placeholder: "hallo@beispiel.de", type: "text" },
        { name: "subject", label: "Betreff (optional)", placeholder: "Meine Anfrage", type: "text" },
        { name: "body", label: "Nachricht (optional)", placeholder: "Hallo, ich habe deinen QR-Code gescannt und ...", type: "textarea" }
      ]
    },
    phone: {
      label: "Telefon", short: "Einen Anruf mit einem Scan starten.",
      fields: [{ name: "value", label: "Telefonnummer", placeholder: "+49 151 23456789", type: "text" }]
    },
    sms: {
      label: "SMS", short: "Eine vorbereitete SMS öffnen.",
      fields: [
        { name: "number", label: "Handynummer", placeholder: "+49 151 23456789", type: "text" },
        { name: "message", label: "Nachricht (optional)", placeholder: "Hallo, ich habe eine Frage ...", type: "text" }
      ]
    },
    vcard: {
      label: "Visitenkarte", short: "Kontaktdaten direkt im Adressbuch speichern.",
      fields: [
        { name: "name", label: "Vorname", placeholder: "Anna", type: "text" },
        { name: "lastName", label: "Nachname", placeholder: "Müller", type: "text" },
        { name: "org", label: "Firma (optional)", placeholder: "Muster GmbH", type: "text" },
        { name: "title", label: "Position (optional)", placeholder: "Marketingleiterin", type: "text" },
        { name: "phone", label: "Telefon", placeholder: "+49 151 23456789", type: "text" },
        { name: "email", label: "E-Mail", placeholder: "anna@beispiel.de", type: "text" },
        { name: "website", label: "Webseite (optional)", placeholder: "https://beispiel.de", type: "text" }
      ]
    },
    location: {
      label: "Standort", short: "Besucher zu einem Ort auf der Karte führen.",
      fields: [{ name: "value", label: "Koordinaten oder Google-Maps-Link", placeholder: "52.5200,13.4050", type: "text" }]
    },
    social: {
      label: "Social Media", short: "Auf ein Profil oder eine Link-Seite verweisen.",
      fields: [{ name: "value", label: "Profil-Link", placeholder: "instagram.com/deinname", type: "text" }]
    },
    menu: {
      label: "Speisekarte", short: "Eine digitale Speisekarte teilen.",
      fields: [{ name: "value", label: "Link zur Speisekarte", placeholder: "https://restaurant.de/speisekarte.pdf", type: "text" }]
    },
    pdf: {
      label: "PDF", short: "Ein Dokument oder eine Broschüre verlinken.",
      fields: [{ name: "value", label: "Link zu deinem PDF", placeholder: "https://beispiel.de/broschuere.pdf", type: "text" }]
    },
    girocode: {
      label: "Überweisung", short: "SEPA-Überweisung mit IBAN, Betrag und Verwendungszweck.",
      fields: [
        { name: "name", label: "Name des Empfängers", placeholder: "Muster GmbH", type: "text" },
        { name: "iban", label: "IBAN", placeholder: "DE89 3704 0044 0532 0130 00", type: "text" },
        { name: "amount", label: "Betrag in EUR (optional)", placeholder: "Leer lassen, dann gibt der Zahler den Betrag ein", type: "text" },
        { name: "reference", label: "Verwendungszweck (optional)", placeholder: "Rechnung 2026-001", type: "text" },
        { name: "bic", label: "BIC (optional)", placeholder: "COBADEFFXXX", type: "text" }
      ]
    },
    app: {
      label: "App", short: "Zum Download deiner App führen.",
      fields: [{ name: "value", label: "App-Store- oder Play-Store-Link", placeholder: "https://apps.apple.com/de/app/deineapp", type: "text" }]
    }
  }
};

// Printable templates (print.js) and the widget builder (embed-builder.js)
window.SMARTQR_PRINT_I18N = {
  title: "QR-Code Vorlagen zum Drucken", pill: "Druckfertig in A4",
  template: "Vorlage", content: "Inhalt des QR-Codes", texts: "Text auf der Seite",
  t_tent: "Tischaufsteller (in der Mitte falten)", t_sign: "Theken-Schild / Scannen & Bezahlen (A4)", t_cards: "Karten, 4 pro A4 (A6)",
  t_wifi: "WLAN-Karten, 4 pro A4", t_labels: "Etikettenbogen (gleicher Code mehrfach)",
  layout: "Etiketten-Layout", heading: "Überschrift", sub: "Firmen- oder Netzwerkname", note: "Kleingedrucktes",
  caption: "Etikett-Text (optional)", accent: "Akzentfarbe", qrColor: "Farbe des QR-Codes",
  ctype: "Art", url: "Link", text: "Text", phone: "Telefon", whatsapp: "WhatsApp", email: "E-Mail", wifi: "WLAN",
  f_value: "Link", f_text: "Text", f_phone: "Telefonnummer mit Ländervorwahl", f_wa: "WhatsApp-Nummer mit Ländervorwahl",
  f_email: "E-Mail-Adresse", f_ssid: "Netzwerkname (SSID)", f_pw: "Passwort", f_sec: "Verschlüsselung",
  showPw: "Passwort auf die Karte drucken", print: "Drucken / als PDF speichern", svg: "SVG herunterladen", png: "PNG herunterladen (300 dpi)",
  empty: "Gib den Inhalt des QR-Codes ein, um die Seite zu sehen.",
  hint: "Drucke in Originalgröße (100 %), nicht \u201eAn Seite anpassen\u201c. Etikettenbögen unterscheiden sich je nach Hersteller: Drucke zuerst eine Probeseite auf normales Papier und halte sie gegen deinen Bogen.",
  privacy: "Alles wird in deinem Browser erstellt. Es wird nichts hochgeladen.",
  d_heading_tent: "Scanne für unsere Speisekarte", d_heading_sign: "Scannen & bezahlen", d_heading_cards: "Scan mich",
  d_heading_wifi: "Kostenloses WLAN", d_note: "Richte die Handykamera auf den Code", d_note_wifi: "Mit der Kamera scannen und verbinden",
  d_sub: "Dein Firmenname", network: "Netzwerk", password: "Passwort",
  lay_24: "24 pro Bogen: 3 \u00d7 8 (70 \u00d7 37 mm)", lay_65: "65 pro Bogen: 5 \u00d7 13 (38 \u00d7 21 mm)",
  lay_8: "8 pro Bogen: 2 \u00d7 4 (105 \u00d7 74 mm)", lay_12: "12 pro Bogen: 3 \u00d7 4 (70 \u00d7 74 mm)",
  placeholders: { "url.value": "https://beispiel.de/speisekarte", "phone.value": "+49 30 1234567", "whatsapp.number": "4915123456789",
    "email.to": "hallo@beispiel.de", "wifi.ssid": "Cafe_Gast" }
};
window.SMARTQR_EMBED_I18N = {
  title: "QR-Code Widget erstellen", pill: "Kopieren, einfügen, fertig", opens: "Der QR-Code öffnet",
  mPage: "Die Seite, auf der der Besucher ist (automatisch)", mFixed: "Einen festen Link oder Text",
  opensHint: "Im automatischen Modus zeigt jede Seite einen Code ihrer eigenen Adresse. Ein Code-Schnipsel reicht für die ganze Website.",
  content: "Link oder Text", size: "Größe", color: "Farbe", caption: "Beschriftung (leer lassen zum Ausblenden)",
  credit: "Kleinen Link \u201eQR by SmartQRCraft\u201c anzeigen (danke!)", paste: "Füge das in deine Seite ein",
  copy: "Code kopieren", copied: "Kopiert", codeLabel: "Widget-Code", defaultCaption: "Scannen, um die Seite am Handy zu öffnen",
  origin: "https://smartqrcraft.de"
};
