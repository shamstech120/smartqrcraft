"""US payment-link pages (Venmo, Cash App, PayPal.Me), the shared 'QR code with logo' page, and the German GiroCode page."""

_SAFE_US = [
    "<strong>Only you should print your code.</strong> A fake sticker placed over a real one can send payments to a stranger.",
    "<strong>Check the name.</strong> Scan your own code and confirm your name and photo appear before you print copies.",
    "<strong>Scanning is for paying.</strong> If someone asks you to scan a code to receive money, it is a scam.",
    "<strong>Send a small test payment</strong> from another account before you rely on the code.",
]

VENMO = {
    "slug": "venmo-qr-code-generator.html",
    "crumb": "Venmo QR Code Generator",
    "type": "venmo",
    "tool_name": "Venmo QR Code Generator",
    "field_label": "Your Venmo username",
    "field_placeholder": "@yourname",
    "cta": "PAY ON VENMO",
    "empty": "Enter your Venmo username to generate the QR code.",
    "title": "Free Venmo QR Code Generator | Custom QR Code for Your Venmo Profile — SmartQRCraft",
    "description": "Make a free Venmo QR code from your username. Customize colors, add a logo, and download PNG or SVG for your booth, invoice or tip jar. No signup.",
    "og_title": "Free Venmo QR Code Generator | SmartQRCraft",
    "og_description": "Turn your Venmo username into a custom QR code for signs, invoices and tip jars. Free, no signup.",
    "h1": 'Free <span class="accent">Venmo QR Code</span> Generator',
    "lead": "Enter your Venmo username and download a QR code that opens your Venmo profile. Customers scan it and pay you without typing your name.",
    "faq_h2": "Venmo QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to create a Venmo QR code",
            "p": ["The code points to your public Venmo profile link. You only need your username."],
            "steps": [
                "Open the Venmo app and find your username. It appears on your profile under your name.",
                "Type it into the field above, with or without the @ sign.",
                "Pick colors and a style. A dark code on a light background scans best.",
                "Optional: add a logo or the frame text &quot;Pay me on Venmo&quot;.",
                "Download the PNG for screens and documents, or the SVG for print.",
                "Scan it from another phone and check that it opens your profile."
            ],
            "after": ["The Venmo app also has its own personal QR code. A custom code is useful when you want your brand colors, a logo, or a sharp file for printing."],
        },
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "What happens when someone scans it",
            "p": [
                "The QR code contains your Venmo profile link. Scanning it opens your profile in the Venmo app if it is installed, or in a browser. From there, the person chooses the amount and sends the payment from their own account.",
                "This tool does not process payments and never sees your money or your login. It only turns a link into a picture."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a Venmo QR code helps",
            "cards": [
                ("Farmers markets &amp; stalls", "A sign at the stand lets customers pay without cash."),
                ("Tip jars &amp; buskers", "A code on a sign makes tipping quick for people without cash."),
                ("Lessons &amp; classes", "Put it on a flyer or class page so students can pay their fee."),
                ("Garage sales &amp; resale", "Post it on the table or in a listing photo."),
                ("Fundraisers &amp; clubs", "Print it on posters for dues and donations."),
                ("Freelancers &amp; small jobs", "Add it to an invoice or quote for quick payment."),
            ],
        },
        {
            "kind": "prose", "id": "business",
            "h2": "Personal or business use",
            "p": [
                "Venmo has rules about how personal and business profiles may be used, and fees can apply to business or goods-and-services payments. Check Venmo's current terms before you use a code to take payments for a business. This page is not financial or legal advice."
            ],
        },
        {
            "kind": "prose", "id": "safety",
            "h2": "Keep your Venmo QR code safe",
            "p": ["A payment code is only as safe as the place you put it."],
            "bullets": _SAFE_US,
        },
    ],
    "faq": [
        ("How do I make a QR code for Venmo?",
         "Enter your Venmo username in the generator on this page and download the QR code. Scanning it opens your Venmo profile so people can pay you."),
        ("Is this Venmo QR code generator free?",
         "Yes. It is free, with no signup and no watermark. Your username is used only in your browser to build the code."),
        ("Does the Venmo app have its own QR code?",
         "Yes. The app offers a personal QR code. A custom code from this tool is useful for print, brand colors and logos."),
        ("Can I add an amount to the Venmo QR code?",
         "This code opens your profile, and the payer enters the amount in Venmo. It does not pre-fill a price."),
        ("Do I need a Venmo account to use the code?",
         "You need one to receive payments. People paying you need a Venmo account too. Venmo is a US service."),
        ("What if I change my Venmo username?",
         "The old link will stop working. Create a new code and replace any printed copies."),
        ("Is this an official Venmo QR code?",
         "No. It is a QR code for your public Venmo profile link, made by a separate tool and not affiliated with Venmo."),
    ],
    "related": [
        ("cash-app-qr-code-generator.html", "Cash App QR code generator"),
        ("paypal-qr-code-generator.html", "PayPal QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

CASHAPP = {
    "slug": "cash-app-qr-code-generator.html",
    "crumb": "Cash App QR Code Generator",
    "type": "cashapp",
    "tool_name": "Cash App QR Code Generator",
    "field_label": "Your $Cashtag",
    "field_placeholder": "$yourcashtag",
    "cta": "PAY ON CASH APP",
    "empty": "Enter your $Cashtag to generate the QR code.",
    "title": "Free Cash App QR Code Generator | Custom $Cashtag QR Code — SmartQRCraft",
    "description": "Make a free Cash App QR code from your $Cashtag. Add colors and a logo, then download PNG or SVG for your shop, signs and invoices. No signup.",
    "og_title": "Free Cash App QR Code Generator | SmartQRCraft",
    "og_description": "Turn your $Cashtag into a custom QR code for signs, invoices and counters. Free, no signup.",
    "h1": 'Free <span class="accent">Cash App QR Code</span> Generator',
    "lead": "Enter your $Cashtag and download a QR code that opens your Cash App page. Customers scan it and pay you without typing anything.",
    "faq_h2": "Cash App QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make a Cash App QR code",
            "p": ["Your $Cashtag is all you need."],
            "steps": [
                "Open Cash App and find your $Cashtag on your profile.",
                "Type it into the field above. The $ sign is optional.",
                "Choose colors and, if you like, add your logo.",
                "Download the PNG or the SVG.",
                "Scan the finished code with another phone and check that your Cash App page opens."
            ],
            "after": ["Cash App also has its own QR code inside the app. Use a custom code when you need branded colors, a logo or a crisp file for printing."],
        },
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "How it works",
            "p": [
                "The QR code contains your public Cash App link, which looks like cash.app/$yourcashtag. Scanning it opens your page in Cash App or the browser, where the payer enters the amount.",
                "This tool only creates the picture. It does not handle any money and does not see your account."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where to put a Cash App QR code",
            "cards": [
                ("Shop counters", "Stick it near the register for customers who prefer to pay by phone."),
                ("Food trucks &amp; vendors", "Show it on a sign at the window."),
                ("Barbers, stylists &amp; trades", "Add it to your card or booking confirmation."),
                ("Rent &amp; shared costs", "Share it in a message so people can pay their part."),
                ("Events &amp; fundraisers", "Print it on a poster next to the donation goal."),
                ("Invoices &amp; flyers", "Give clients a quick way to pay you."),
            ],
        },
        {
            "kind": "prose", "id": "safety",
            "h2": "Payment QR code safety",
            "p": ["Codes that take money need extra care."],
            "bullets": _SAFE_US + ["<strong>Use a $Cashtag you plan to keep.</strong> If you change it, printed codes stop working."],
        },
    ],
    "faq": [
        ("How do I make a QR code for Cash App?",
         "Enter your $Cashtag in the generator on this page and download the QR code. Scanning it opens your Cash App page."),
        ("Is the Cash App QR code generator free?",
         "Yes. It is free, with no signup and no watermark, and it runs in your browser."),
        ("Where do I find my $Cashtag?",
         "In the Cash App, open your profile. Your $Cashtag appears there. It is the name customers use to pay you."),
        ("Does Cash App have its own QR code?",
         "Yes. The app has a QR code for your account. A custom code is useful for printed material, colors and logos."),
        ("Can the code include a fixed amount?",
         "No. It opens your page and the payer chooses the amount."),
        ("Is this an official Cash App code?",
         "No. It links to your public Cash App page and is not affiliated with Cash App."),
    ],
    "related": [
        ("venmo-qr-code-generator.html", "Venmo QR code generator"),
        ("paypal-qr-code-generator.html", "PayPal QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

PAYPAL = {
    "slug": "paypal-qr-code-generator.html",
    "crumb": "PayPal QR Code Generator",
    "type": "paypalme",
    "tool_name": "PayPal QR Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "PAY WITH PAYPAL",
    "empty": "Enter your PayPal.Me username to generate the QR code.",
    "title": "Free PayPal QR Code Generator | PayPal.Me Link QR Code — SmartQRCraft",
    "description": "Make a free PayPal.Me QR code with an optional amount and currency. Customize colors and download PNG or SVG for signs and invoices. No signup.",
    "og_title": "Free PayPal QR Code Generator | SmartQRCraft",
    "og_description": "Turn your PayPal.Me link into a QR code, with an optional amount. Free, no signup.",
    "h1": 'Free <span class="accent">PayPal QR Code</span> Generator',
    "lead": "Enter your PayPal.Me username, add an amount if you want one, and download a QR code that opens your PayPal payment page.",
    "faq_h2": "PayPal QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make a PayPal QR code",
            "p": ["This tool uses your PayPal.Me link, so you need one first."],
            "steps": [
                "Get your PayPal.Me link. In PayPal, look for PayPal.Me in your profile or tools and choose your username. The link looks like paypal.me/yourname.",
                "Enter the username above. Pasting the full link also works.",
                "Optional: enter an <strong>amount</strong> and choose a <strong>currency</strong> to pre-fill the payment.",
                "Choose colors and download the PNG or SVG.",
                "Scan the code with another phone and check that the PayPal page opens with the right name and amount."
            ],
        },
        {
            "kind": "table", "h2": "Open amount or fixed amount?",
            "p": ["You can leave the amount blank or set it in the code."],
            "cols": ["", "No amount", "With amount"],
            "rows": [
                ["Best for", "Tips, donations, changing prices", "One product, a fee, an invoice"],
                ["Payer action", "Types the amount", "Confirms the amount"],
                ["Reuse", "One code for everything", "One code per amount"],
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a PayPal QR code helps",
            "cards": [
                ("Invoices &amp; quotes", "A fixed-amount code lets clients pay from their phone."),
                ("Craft fairs &amp; stalls", "Take payments without cash or a card reader."),
                ("Donations", "Print an open-amount code for fundraisers and clubs."),
                ("Freelancers &amp; creators", "Put it on a business card or link page."),
                ("Online sellers", "Add it to packing slips for repeat orders."),
                ("Lessons &amp; services", "Add a code to a booking confirmation."),
            ],
        },
        {
            "kind": "prose", "id": "notes",
            "h2": "Things to know about PayPal.Me",
            "p": [
                "PayPal.Me availability, fees and how it is used for business can differ by country and account type. Check PayPal's current terms before you take payments for a business. This tool is not affiliated with PayPal and is not financial advice."
            ],
        },
        {
            "kind": "prose", "id": "safety",
            "h2": "Keep your payment code safe",
            "p": ["Payment codes are a target for fake stickers and scams."],
            "bullets": _SAFE_US,
        },
    ],
    "faq": [
        ("How do I create a PayPal QR code?",
         "Enter your PayPal.Me username in the generator on this page, add an optional amount, and download the QR code. Scanning it opens your PayPal payment page."),
        ("Do I need a PayPal.Me link?",
         "Yes. This tool builds the code from your PayPal.Me username. You can create the link in your PayPal account."),
        ("Can the QR code include an amount?",
         "Yes. Enter an amount and choose a currency and the payer sees it pre-filled. Leave it blank to let them decide."),
        ("Is the PayPal QR code generator free?",
         "Yes. It is free, with no signup and no watermark, and it runs in your browser."),
        ("Is this an official PayPal QR code?",
         "No. It is a QR code for your public PayPal.Me link, made by a separate tool that is not affiliated with PayPal."),
        ("What if I change my PayPal.Me username?",
         "The old link stops working, so generate a new code and replace printed copies."),
    ],
    "related": [
        ("venmo-qr-code-generator.html", "Venmo QR code generator"),
        ("cash-app-qr-code-generator.html", "Cash App QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

LOGO_US = {
    "slug": "qr-code-with-logo.html",
    "crumb": "QR Code with Logo",
    "type": "url",
    "tool_name": "QR Code Generator with Logo",
    "field_label": "Link for your QR code",
    "field_placeholder": "https://yourbrand.com",
    "cta": "SCAN ME",
    "empty": "Enter a link, then turn on Center Logo to add your logo.",
    "title": "Free QR Code with Logo | Add Your Logo to a QR Code — SmartQRCraft",
    "description": "Create a free QR code with your logo in the center. Upload a PNG or JPG, choose colors, and download PNG or SVG. Error correction adjusts automatically. No signup.",
    "og_title": "Free QR Code with Logo | SmartQRCraft",
    "og_description": "Add your logo to a QR code for free. Choose colors, download PNG or SVG. No signup, no watermark.",
    "h1": 'Free <span class="accent">QR Code with Logo</span> Generator',
    "lead": "Enter your link, turn on Center Logo and upload your image. You get a branded QR code that still scans, ready for packaging, print or screens.",
    "faq_h2": "QR Code with Logo Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to add a logo to a QR code",
            "p": ["It takes about a minute and no design software."],
            "steps": [
                "Enter the link the code should open.",
                "Switch on <strong>Center Logo</strong> and upload a square PNG or JPG. A logo on a white or solid background works best.",
                "Choose your brand color, keeping the code dark against a light background.",
                "Download the PNG or SVG. Transparent PNG and SVG are available under the download options.",
                "Test the final file with two phones before you print."
            ],
        },
        {
            "kind": "prose", "id": "why-it-works",
            "h2": "Why a logo does not break the QR code",
            "p": [
                "QR codes carry built-in error correction: extra data that lets a scanner rebuild parts that are hidden or damaged. A logo hides part of the pattern, and error correction fills the gap. When you turn on a logo, this tool raises the error correction level automatically.",
                "The catch is that error correction has a limit. A small logo is safe, and a big one can make the code unreadable. That is why the logo here stays small and centered."
            ],
        },
        {
            "kind": "table", "h2": "Logo size guide",
            "p": ["These are rules of thumb. Always scan-test the real file."],
            "cols": ["Logo width vs. code", "Result"],
            "rows": [
                ["Well under a fifth", "Scans reliably in most situations"],
                ["About a fifth", "Usually fine on clean prints, riskier on screens and worn surfaces"],
                ["More than a fifth", "Likely to fail, especially on older phones"],
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where branded QR codes work well",
            "cards": [
                ("Product packaging", "A logo code builds trust on boxes and labels."),
                ("Storefront &amp; window signs", "Recognizable codes get more scans."),
                ("Business cards &amp; flyers", "Match the code to your brand color."),
                ("Restaurant menus", "Put your logo in the middle of a table-tent code."),
                ("Trade shows &amp; banners", "A branded code looks professional at a booth."),
                ("Social posts &amp; ads", "Use the PNG in graphics and slides."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for logo QR codes",
            "p": ["Design should never cost you scans."],
            "bullets": [
                "<strong>Keep the logo simple and centered.</strong> Fine detail disappears at small sizes.",
                "<strong>Use strong contrast.</strong> Pale brand colors and light-on-dark codes are risky.",
                "<strong>Shorten the link</strong> for a simpler pattern.",
                "<strong>Leave a blank margin</strong> around the code.",
                "<strong>Test on the real material</strong> such as your printed package or sign."
            ],
        },
    ],
    "faq": [
        ("How do I put a logo in a QR code?",
         "Enter your link on this page, turn on Center Logo, and upload a square PNG or JPG. Then download the code."),
        ("Will a logo stop the QR code from working?",
         "Not if it is small and the code has enough error correction. This tool raises error correction automatically when you add a logo. Large logos can still cause failures, so test every code."),
        ("What logo size works best?",
         "Well under a fifth of the code's width. Smaller logos scan more reliably."),
        ("Is it free?",
         "Yes. It is free, with no signup, watermark or expiry."),
        ("Can I download a transparent PNG?",
         "Yes. Under the generator, choose the transparent background option before downloading a PNG or SVG."),
        ("PNG or SVG?",
         "Use PNG for screens and documents and SVG for print, since SVG stays sharp at any size."),
    ],
    "related": [
        ("index.html#generator", "Free QR code generator"),
        ("qr-code-tester.html", "QR code tester"),
        ("bulk-qr-code-generator.html", "Bulk QR code generator"),
    ],
}

US_PAGES = [VENMO, CASHAPP, PAYPAL]
LOGO_SHARED = [LOGO_US]

# ---------------- Germany: GiroCode ----------------
GIRO = {
    "domain": "smartqrcraft.de", "lang": "de",
    "slug": "qr-code-ueberweisung-erstellen.html",
    "crumb": "QR-Code für Überweisung",
    "type": "girocode",
    "tool_name": "QR-Code für Überweisung (GiroCode)",
    "field_label": "",
    "field_placeholder": "",
    "cta": "ÜBERWEISEN",
    "empty": "Gib Empfänger und IBAN ein, um den QR-Code zu erstellen.",
    "title": "QR-Code für Überweisung erstellen kostenlos | GiroCode Generator — SmartQRCraft",
    "description": "QR-Code für Überweisung erstellen: Empfänger, IBAN, Betrag und Verwendungszweck eingeben, als PNG oder SVG herunterladen. GiroCode nach EPC-Standard, kostenlos.",
    "og_title": "QR-Code für Überweisung erstellen | SmartQRCraft",
    "og_description": "GiroCode kostenlos erstellen: IBAN, Betrag und Verwendungszweck als QR-Code für Rechnungen und Spenden.",
    "h1": 'QR-Code für Überweisung <span class="accent">kostenlos erstellen</span>',
    "lead": "Gib Empfänger, IBAN und optional Betrag und Verwendungszweck ein. Die Banking-App füllt beim Scannen die Überweisung für den Zahler automatisch aus.",
    "faq_h2": "Fragen zum QR-Code für Überweisungen",
    "sections": [
        {
            "kind": "prose", "id": "was-ist",
            "h2": "Was ist ein GiroCode?",
            "p": [
                "Der GiroCode ist ein QR-Code für SEPA-Überweisungen nach dem EPC-Standard. Er enthält Empfängername, IBAN und optional Betrag, Verwendungszweck und BIC. Scannt ein Zahler den Code mit seiner Banking-App, wird die Überweisung automatisch ausgefüllt, ohne dass er die IBAN abtippen muss.",
                "Dieses Tool erstellt den Code lokal in deinem Browser. Deine Bankdaten werden nicht an einen Server gesendet. Es ist kein offizieller Dienst einer Bank."
            ],
        },
        {
            "kind": "prose", "id": "anleitung",
            "h2": "GiroCode erstellen: Anleitung",
            "p": ["Du brauchst nur die Daten, die auf einer Rechnung stehen."],
            "steps": [
                "Trage den <strong>Namen des Empfängers</strong> ein, so wie er beim Konto hinterlegt ist.",
                "Gib die <strong>IBAN</strong> ein. Das Tool prüft die Prüfsumme und meldet Tippfehler, indem es keinen Code anzeigt.",
                "Optional: <strong>Betrag in Euro</strong>, etwa für eine Rechnung. Lässt du ihn leer, gibt der Zahler den Betrag selbst ein.",
                "Optional: <strong>Verwendungszweck</strong>, zum Beispiel die Rechnungsnummer. Er ist auf 140 Zeichen begrenzt.",
                "Optional: <strong>BIC</strong>. Innerhalb des SEPA-Raums reicht meist die IBAN.",
                "Lade den Code als PNG oder SVG herunter und <strong>teste ihn mit der Banking-App</strong> vor dem Druck."
            ],
        },
        {
            "kind": "table", "h2": "Mit Betrag oder ohne?",
            "p": ["Ob du einen Betrag einträgst, hängt vom Einsatz ab."],
            "cols": ["", "Ohne Betrag", "Mit Betrag"],
            "rows": [
                ["Geeignet für", "Spenden, Vereinsbeiträge, wechselnde Preise", "Rechnungen, feste Gebühren, einzelne Produkte"],
                ["Zahler", "Gibt den Betrag selbst ein", "Bestätigt den vorausgefüllten Betrag"],
                ["Wiederverwendung", "Ein Code für alle", "Ein Code pro Betrag oder Rechnung"],
            ],
        },
        {
            "kind": "cards", "eyebrow": "Einsatz", "h2": "Wo sich ein QR-Code für Überweisungen lohnt",
            "cards": [
                ("Rechnungen", "Ein Code auf der Rechnung spart das Abtippen der IBAN und verringert Zahlendreher."),
                ("Vereine und Spenden", "Auf Plakaten und Flyern für Beiträge und Spenden."),
                ("Miete und Nebenkosten", "Für regelmäßige Zahlungen zwischen Privatpersonen."),
                ("Flohmarkt und Verkauf", "Als Alternative zu Bargeld bei größeren Beträgen."),
                ("Handwerk und Dienstleistungen", "Auf Kostenvoranschlägen und Aufträgen."),
                ("Kurse und Unterricht", "Auf dem Anmeldeformular oder Infoblatt."),
            ],
        },
        {
            "kind": "prose", "id": "sicherheit",
            "h2": "Sicherheit und Grenzen",
            "p": ["Ein GiroCode enthält Zahlungsdaten und sollte sorgfältig verwendet werden."],
            "bullets": [
                "<strong>Zahler sollten den Empfänger prüfen.</strong> Banking-Apps zeigen Name und IBAN vor der Freigabe an.",
                "<strong>Aufkleber nicht überkleben.</strong> Ein falscher Code über einem echten kann Zahlungen umleiten.",
                "<strong>Nur SEPA und Euro.</strong> Der Code eignet sich für Überweisungen im SEPA-Raum in Euro.",
                "<strong>Nicht alle Apps unterstützen das Scannen.</strong> Viele Banking-Apps können GiroCodes lesen. Prüfe es mit deiner eigenen App.",
                "<strong>Rechnungsdaten bleiben deine Verantwortung.</strong> Prüfe Name, IBAN und Betrag, bevor du den Code verwendest."
            ],
        },
    ],
    "faq": [
        ("Wie erstelle ich einen QR-Code für eine Überweisung?",
         "Gib im Generator auf dieser Seite Empfänger und IBAN ein, optional Betrag und Verwendungszweck, und lade den QR-Code herunter. Die Banking-App des Zahlers füllt beim Scannen die Überweisung aus."),
        ("Ist das kostenlos?",
         "Ja. Der Generator ist kostenlos, ohne Anmeldung und ohne Wasserzeichen."),
        ("Werden meine Bankdaten gespeichert oder hochgeladen?",
         "Nein. Der Code wird in deinem Browser erstellt und deine Eingaben werden nicht an einen Server gesendet."),
        ("Muss ich die BIC angeben?",
         "Innerhalb des SEPA-Raums meist nicht. Die IBAN reicht in der Regel aus. Du kannst die BIC optional ergänzen."),
        ("Welche Banking-Apps können den GiroCode lesen?",
         "Viele Banking-Apps deutscher Banken unterstützen das Scannen. Ob deine App es kann, siehst du, wenn du den Code testweise scannst."),
        ("Kann ich einen festen Betrag hinterlegen?",
         "Ja. Trage den Betrag in Euro ein, dann ist er beim Scannen vorausgefüllt. Lass das Feld leer, wenn der Zahler den Betrag selbst eingeben soll."),
        ("Ist der Code ein offizieller Dienst meiner Bank?",
         "Nein. Es ist ein QR-Code mit deinen Überweisungsdaten nach dem EPC-Standard. Er wird von diesem Tool erstellt und ist nicht mit einer Bank verbunden."),
    ],
    "related": [
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("qr-code-testen.html", "QR-Code testen"),
        ("visitenkarte-qr-code-generator.html", "QR-Code für die Visitenkarte"),
    ],
}

DE_PAY = [GIRO]
