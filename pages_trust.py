"""Trust pages: About, Contact, Privacy, Terms (English, shared) and Über uns, Kontakt, Nutzungsbedingungen (German).
Anything in [square brackets] is a placeholder the site owner must fill before launch."""

_P = "[PLACEHOLDER: fill in before launch]"

ABOUT = {
    "slug": "about.html", "crumb": "About", "static": True,
    "title": "About SmartQRCraft | Free, Private QR Code Tools",
    "description": "SmartQRCraft makes free QR code tools that run in your browser: no signup, no watermark, no uploads. Learn how it works and what we do with your data.",
    "h1": "About SmartQRCraft",
    "sections": [
        {"kind": "prose", "h2": "What SmartQRCraft is",
         "p": ["SmartQRCraft is a set of free QR code and barcode tools: generators for links, WiFi, contacts, payments and more, plus a scanner, a QR code tester and a bulk generator. The goal is simple: tools that do one job well, without asking you to create an account."]},
        {"kind": "prose", "h2": "Our principles",
         "p": ["These are the rules we build by."],
         "bullets": [
             "<strong>Free and open to use.</strong> No signup, no watermark on your codes, and no limit on static QR codes.",
             "<strong>Private by design.</strong> Codes are created in your browser. What you type, upload or scan is not sent to our servers.",
             "<strong>Honest about limits.</strong> Static codes cannot be edited after printing, and we say so. Tester results are a guide, not a guarantee.",
             "<strong>Made for print and screen.</strong> Sharp SVG and high-resolution PNG downloads, with size and printing advice on the pages."]},
        {"kind": "prose", "h2": "How the tools work",
         "p": ["The generators encode your content directly into the QR code, which is called a static QR code. The code does not depend on our servers and does not expire. The scanner and tester decode images in your browser, and your camera image stays on your device."]},
        {"kind": "prose", "h2": "Local sites",
         "p": ["SmartQRCraft has separate sites for different countries, with content and examples written for each market. Each site has its own address, and some tools exist only where they are most useful, for example UPI codes for India and GiroCode for Germany."]},
        {"kind": "prose", "h2": "Who runs SmartQRCraft",
         "p": [_P + " Add the name of the person or company behind the site, and how it is funded (for example advertising, donations or paid features). Readers trust a page that says who is behind it."]},
        {"kind": "prose", "h2": "Not affiliated with other brands",
         "p": ["Names such as Venmo, Cash App, PayPal, YouTube, Facebook, Instagram, LinkedIn, Snapchat, Spotify, Discord and WhatsApp belong to their owners. SmartQRCraft is an independent tool and is not affiliated with them."]},
    ],
}

CONTACT = {
    "slug": "contact.html", "crumb": "Contact", "static": True,
    "title": "Contact SmartQRCraft",
    "description": "Contact SmartQRCraft with questions, feedback or bug reports.",
    "h1": "Contact",
    "sections": [
        {"kind": "prose", "h2": "Get in touch",
         "p": ["Questions, feedback, a bug or an idea for a new QR code type? We read every message.",
               "<strong>Email:</strong> [PLACEHOLDER: contact email address]"]},
        {"kind": "prose", "h2": "Helpful details for bug reports",
         "p": ["It helps if you tell us:"],
         "bullets": ["which page you were on", "your device and browser", "what you expected and what happened", "the content you entered, if it is not private (never send passwords or payment details)"]},
        {"kind": "prose", "h2": "Things we cannot help with",
         "p": ["We cannot change a QR code you have already printed, because static codes hold their content inside the pattern. We are also not able to help with problems at other companies, such as payment apps or social networks. If a QR code you found is suspicious, do not open it."]},
    ],
}

PRIVACY = {
    "slug": "privacy.html", "crumb": "Privacy Policy", "static": True,
    "title": "Privacy Policy | SmartQRCraft",
    "description": "How SmartQRCraft handles data: QR codes are created in your browser, with no accounts, no cookies and no analytics.",
    "h1": "Privacy Policy",
    "sections": [
        {"kind": "prose", "h2": "Draft notice",
         "p": ["<strong>[PLACEHOLDER: This is a draft written for the site as it is built today. Fill in the bracketed details and have it reviewed by a qualified professional before launch. Update it whenever you add analytics, ads or accounts.]</strong>",
               "Last updated: [date]"]},
        {"kind": "prose", "h2": "1. Who is responsible",
         "p": ["[PLACEHOLDER: name, address and contact email of the person or company that operates this site.]"]},
        {"kind": "prose", "h2": "2. QR codes and scans stay on your device",
         "p": ["The QR code generators, the bulk generator, the barcode generator, the scanner and the tester run in your browser. The content you type or upload (links, WiFi details, contact details, payment identifiers, images, camera pictures) is processed on your device and is not sent to our servers or stored by us. Logos you upload are used only in your browser."]},
        {"kind": "prose", "h2": "3. What we do collect",
         "p": ["When you visit a page, our hosting provider handles technical data needed to deliver the page and keep it secure, such as IP address, date and time, requested page, and browser type, in server logs. [PLACEHOLDER: name your hosting provider, where servers are located, and how long logs are kept.]"]},
        {"kind": "prose", "h2": "4. Cookies, analytics and third parties",
         "p": ["As built today, this site does not set cookies, does not run analytics or advertising, and does not load fonts, scripts or images from third-party servers. All fonts and code libraries are served from the same domain. [If you add analytics, ads or embedded content later, update this section and add consent where the law requires it.]"]},
        {"kind": "prose", "h2": "5. Links and codes you open",
         "p": ["The scanner shows you what a QR code contains before you open it. If you choose to open a link, you leave SmartQRCraft and the other site's privacy rules apply. Payment QR code tools only create a code. They do not process payments or see any account."]},
        {"kind": "prose", "h2": "6. Camera access",
         "p": ["The scanner asks your browser for camera access only when you press the camera button. The video stays on your device, and you can stop it at any time. You can also use an image instead."]},
        {"kind": "prose", "h2": "7. Your rights",
         "p": ["Depending on where you live, you may have rights over your personal data, for example under the GDPR and UK GDPR (access, correction, deletion, restriction, objection, portability and the right to complain to a supervisory authority), India's Digital Personal Data Protection Act (access, correction, erasure and grievance redressal), or California privacy law. Because we do not keep your QR code content, most requests will concern server logs. Contact us using the details on the contact page. [PLACEHOLDER: add your supervisory authority or grievance contact where required.]"]},
        {"kind": "prose", "h2": "8. Children",
         "p": ["This site is not directed at children under 13, and we do not knowingly collect personal data from children."]},
        {"kind": "prose", "h2": "9. Changes",
         "p": ["We may update this policy when the site changes. The date at the top shows when it was last updated."]},
    ],
}

TERMS = {
    "slug": "terms.html", "crumb": "Terms of Use", "static": True,
    "title": "Terms of Use | SmartQRCraft",
    "description": "Terms of use for SmartQRCraft: acceptable use, no warranty, and responsibility for the QR codes you create.",
    "h1": "Terms of Use",
    "sections": [
        {"kind": "prose", "h2": "Draft notice",
         "p": ["<strong>[PLACEHOLDER: This is a draft. Fill in the bracketed details and have it reviewed by a qualified professional before launch.]</strong>", "Last updated: [date]"]},
        {"kind": "prose", "h2": "1. Using SmartQRCraft",
         "p": ["You may use the tools for personal and commercial purposes. You own the QR codes and barcodes you create. By using the site you agree to these terms."]},
        {"kind": "prose", "h2": "2. Acceptable use",
         "p": ["Do not use SmartQRCraft to create QR codes or barcodes that:"],
         "bullets": ["lead to phishing, scams, malware or fraudulent payment requests", "impersonate another person, brand or payment recipient", "are illegal, or infringe other people's rights", "hide or disguise their real destination to mislead people"],
         "after": ["We may block access to the site for misuse."]},
        {"kind": "prose", "h2": "3. You are responsible for your codes",
         "p": ["You are responsible for what your QR codes contain and where they lead. Check every code before you print or share it. Static codes cannot be changed after printing. If a link, number, payment identifier or other content changes, you need a new code."]},
        {"kind": "prose", "h2": "4. Payment and bank QR codes",
         "p": ["Tools for UPI, Venmo, Cash App, PayPal.Me and GiroCode only create a code from the details you type. They do not process payments, verify accounts, or check that details are correct. Verify the recipient and test with a small payment. We are not a bank, a payment service or a financial adviser."]},
        {"kind": "prose", "h2": "5. Scan test results and guidance",
         "p": ["The QR code tester and the size and printing advice on this site are guides. Scanning depends on the phone, lighting, print quality and surface. We do not guarantee that a code will scan in every situation."]},
        {"kind": "prose", "h2": "6. No warranty and limits of liability",
         "p": ["The site and tools are provided as they are, without warranties of any kind. To the extent the law allows, we are not liable for losses arising from your use of the tools or from codes you create, including printing costs, lost payments or lost business. Nothing here limits liability that cannot be limited by law."]},
        {"kind": "prose", "h2": "7. Third-party names",
         "p": ["Brand and product names are the property of their owners. SmartQRCraft is not affiliated with or endorsed by them."]},
        {"kind": "prose", "h2": "8. Changes and law",
         "p": ["We may update these terms. Continued use means you accept the updated terms. [PLACEHOLDER: governing law and jurisdiction.] Contact details are on the contact page."]},
    ],
}

TRUST_SHARED = [ABOUT, CONTACT, PRIVACY, TERMS]

# ---------------- German ----------------
_DE = {"domain": "smartqrcraft.de", "lang": "de"}

UEBER_UNS = {**_DE,
    "slug": "ueber-uns.html", "crumb": "Über uns", "static": True,
    "title": "Über SmartQRCraft | Kostenlose, private QR-Code Tools",
    "description": "SmartQRCraft bietet kostenlose QR-Code Tools, die im Browser laufen: ohne Anmeldung, ohne Wasserzeichen, ohne Upload.",
    "h1": "Über SmartQRCraft",
    "sections": [
        {"kind": "prose", "h2": "Was SmartQRCraft ist",
         "p": ["SmartQRCraft ist eine Sammlung kostenloser QR-Code- und Barcode-Tools: Generatoren für Links, WLAN, Visitenkarten, Überweisungen und mehr, dazu ein Scanner, ein QR-Code Test und ein Barcode-Generator. Ziel ist, dass jedes Tool eine Aufgabe gut erledigt, ohne dass du ein Konto anlegen musst."]},
        {"kind": "prose", "h2": "Unsere Grundsätze",
         "p": ["Nach diesen Regeln bauen wir."],
         "bullets": [
             "<strong>Kostenlos.</strong> Keine Anmeldung, kein Wasserzeichen auf deinen Codes und keine Begrenzung bei statischen QR-Codes.",
             "<strong>Privat.</strong> Codes werden in deinem Browser erstellt. Was du eingibst, hochlädst oder scannst, wird nicht an unsere Server gesendet.",
             "<strong>Ehrlich bei Grenzen.</strong> Statische Codes lassen sich nach dem Druck nicht ändern, und das sagen wir offen. Die Ergebnisse des Tests sind eine Orientierung, keine Garantie.",
             "<strong>Für Druck und Bildschirm.</strong> Scharfe SVG- und hochauflösende PNG-Downloads, mit Tipps zu Größe und Druck."]},
        {"kind": "prose", "h2": "So funktionieren die Tools",
         "p": ["Die Generatoren schreiben deinen Inhalt direkt in den QR-Code, einen sogenannten statischen QR-Code. Er hängt nicht von unseren Servern ab und läuft nicht ab. Scanner und Test lesen Bilder in deinem Browser aus, und dein Kamerabild bleibt auf deinem Gerät."]},
        {"kind": "prose", "h2": "Wer steckt dahinter",
         "p": ["[PLATZHALTER: Name der Person oder des Unternehmens hinter der Seite und wie die Seite finanziert wird (zum Beispiel Werbung, Spenden oder kostenpflichtige Funktionen). Die Angaben im <a href=\"impressum.html\">Impressum</a> müssen dazu passen.]"]},
        {"kind": "prose", "h2": "Keine Verbindung zu anderen Marken",
         "p": ["Namen wie PayPal, YouTube, Facebook, Instagram, LinkedIn und WhatsApp gehören ihren Inhabern. SmartQRCraft ist ein unabhängiges Tool und nicht mit ihnen verbunden."]},
    ],
}

KONTAKT = {**_DE,
    "slug": "kontakt.html", "crumb": "Kontakt", "static": True,
    "title": "Kontakt | SmartQRCraft",
    "description": "Kontakt zu SmartQRCraft: Fragen, Feedback und Fehlermeldungen.",
    "h1": "Kontakt",
    "sections": [
        {"kind": "prose", "h2": "Schreib uns",
         "p": ["Fragen, Feedback, ein Fehler oder eine Idee für eine neue QR-Code Art? Wir lesen jede Nachricht.",
               "<strong>E-Mail:</strong> [PLATZHALTER: E-Mail-Adresse]",
               "Die vollständigen Anbieterangaben findest du im <a href=\"impressum.html\">Impressum</a>."]},
        {"kind": "prose", "h2": "Hilfreiche Angaben bei Fehlern",
         "p": ["Es hilft, wenn du uns mitteilst:"],
         "bullets": ["auf welcher Seite du warst", "welches Gerät und welchen Browser du nutzt", "was du erwartet hast und was passiert ist", "den eingegebenen Inhalt, sofern er nicht privat ist (sende niemals Passwörter oder Zahlungsdaten)"]},
        {"kind": "prose", "h2": "Wobei wir nicht helfen können",
         "p": ["Wir können keinen bereits gedruckten QR-Code ändern, weil statische Codes ihren Inhalt im Muster tragen. Bei Problemen anderer Unternehmen, etwa Zahlungs-Apps oder sozialer Netzwerke, können wir ebenfalls nicht helfen. Wenn dir ein QR-Code verdächtig vorkommt, öffne ihn nicht."]},
    ],
}

NUTZUNGSBEDINGUNGEN = {**_DE,
    "slug": "nutzungsbedingungen.html", "crumb": "Nutzungsbedingungen", "static": True,
    "title": "Nutzungsbedingungen | SmartQRCraft",
    "description": "Nutzungsbedingungen von SmartQRCraft: zulässige Nutzung, keine Gewähr und Verantwortung für erstellte QR-Codes.",
    "h1": "Nutzungsbedingungen",
    "sections": [
        {"kind": "prose", "h2": "Hinweis zu diesem Entwurf",
         "p": ["<strong>[PLATZHALTER: Dies ist ein Entwurf. Bitte Angaben ergänzen und die Bedingungen vor der Veröffentlichung rechtlich prüfen lassen, insbesondere Haftung, Gewährleistung und Verbraucherrechte nach deutschem Recht.]</strong>", "Stand: [Datum]"]},
        {"kind": "prose", "h2": "1. Nutzung",
         "p": ["Du darfst die Tools privat und gewerblich nutzen. Die von dir erstellten QR-Codes und Barcodes gehören dir. Mit der Nutzung der Seite stimmst du diesen Bedingungen zu."]},
        {"kind": "prose", "h2": "2. Zulässige Nutzung",
         "p": ["Erstelle mit SmartQRCraft keine QR-Codes oder Barcodes, die:"],
         "bullets": ["auf Phishing, Betrug, Schadsoftware oder gefälschte Zahlungsaufforderungen führen", "eine andere Person, Marke oder einen Zahlungsempfänger vortäuschen", "rechtswidrig sind oder Rechte anderer verletzen", "das wahre Ziel verschleiern, um Menschen zu täuschen"],
         "after": ["Bei Missbrauch können wir den Zugriff auf die Seite sperren."]},
        {"kind": "prose", "h2": "3. Verantwortung für deine Codes",
         "p": ["Du bist für den Inhalt deiner QR-Codes und ihr Ziel verantwortlich. Prüfe jeden Code, bevor du ihn druckst oder weitergibst. Statische Codes lassen sich nach dem Druck nicht ändern. Ändern sich Link, Nummer, Zahlungsdaten oder anderer Inhalt, brauchst du einen neuen Code."]},
        {"kind": "prose", "h2": "4. Zahlungs- und Überweisungs-Codes",
         "p": ["Der GiroCode und andere Zahlungs-Tools erstellen nur einen Code aus den eingegebenen Angaben. Sie wickeln keine Zahlungen ab, prüfen keine Konten und prüfen nicht, ob die Angaben stimmen. Prüfe den Empfänger und teste mit einem kleinen Betrag. Wir sind keine Bank, kein Zahlungsdienst und keine Finanzberatung."]},
        {"kind": "prose", "h2": "5. Ergebnisse des QR-Code Tests",
         "p": ["Der QR-Code Test und die Hinweise zu Größe und Druck sind Orientierungshilfen. Ob ein Code scannt, hängt von Handy, Licht, Druckqualität und Untergrund ab. Wir garantieren nicht, dass ein Code in jeder Situation gelesen wird."]},
        {"kind": "prose", "h2": "6. Haftung",
         "p": ["[PLATZHALTER: Haftungsregelung nach deutschem Recht rechtlich prüfen lassen.] Die Tools werden ohne Gewähr bereitgestellt. Soweit gesetzlich zulässig, haften wir nicht für Schäden aus der Nutzung der Tools oder erstellter Codes. Gesetzliche Haftung, die sich nicht ausschließen lässt, bleibt unberührt."]},
        {"kind": "prose", "h2": "7. Marken Dritter",
         "p": ["Marken- und Produktnamen gehören ihren Inhabern. SmartQRCraft ist nicht mit ihnen verbunden und wird nicht von ihnen empfohlen."]},
    ],
}

TRUST_DE = [UEBER_UNS, KONTAKT, NUTZUNGSBEDINGUNGEN]
