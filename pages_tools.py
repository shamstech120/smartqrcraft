"""QR scanner and QR tester pages (English shared pages on .com/.co.uk/.in, German pages on .de)."""

SCANNER = {
    "slug": "qr-code-scanner.html",
    "crumb": "QR Code Scanner",
    "widget": "scan",
    "type": "url",
    "tool_name": "QR Code Scanner",
    "title": "QR Code Scanner Online | Scan a QR Code from Image or Camera — SmartQRCraft",
    "description": "Free online QR code scanner. Scan a QR code from an image, screenshot or your camera and see what it contains before you open it. Private, no signup, no upload.",
    "og_title": "QR Code Scanner Online | SmartQRCraft",
    "og_description": "Scan a QR code from a picture or with your camera, and see what is inside before opening it. Free and private.",
    "h1": 'Free <span class="accent">QR Code Scanner</span> Online',
    "lead": "Upload a picture, paste a screenshot or use your camera. The scanner shows what is inside the QR code before you open anything.",
    "faq_h2": "QR Code Scanner Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to-scan",
            "h2": "How to scan a QR code from an image or screenshot",
            "p": ["You can scan a QR code even when you cannot point a phone at it, for example when it is in an email, a PDF or a screenshot."],
            "steps": [
                "Save or screenshot the image that contains the QR code.",
                "Click <strong>Choose image</strong> above, or drag the picture onto the box. You can also paste a screenshot with Ctrl+V (Cmd+V on Mac).",
                "The tool reads the code and shows what is inside: the link, WiFi details, contact card or plain text.",
                "Check the result. For links, look at the domain first and only then open it."
            ],
            "after": ["If nothing is found, crop the image closer to the code, use a sharper picture, or add a white border around the code."],
        },
        {
            "kind": "prose", "id": "camera",
            "h2": "Scanning with a camera",
            "p": [
                "On a phone, the built-in camera app reads QR codes on current iPhones and most Android phones, so you may not need this tool. If you want to see the content before opening it, or you are on a laptop with a webcam, press <strong>Use camera</strong> and allow camera access when asked. The camera needs a secure (https) page.",
                "Your camera image is processed on your device and is not uploaded or stored."
            ],
        },
        {
            "kind": "table", "h2": "What a QR code can contain",
            "p": ["A QR code is only a container for text. What happens next depends on what the text says. This scanner recognises the common kinds and explains them."],
            "cols": ["Content", "What you see here", "What a phone would do"],
            "rows": [
                ["Web link", "The full address and its domain", "Open the website"],
                ["WiFi network", "Network name, security type and password", "Offer to join the network"],
                ["Contact card (vCard)", "Name, company, phone and email", "Offer to save the contact"],
                ["UPI payment request", "Payee, UPI ID and amount", "Open a payment app"],
                ["Email, phone, SMS", "The address or number", "Start the email, call or message"],
                ["Plain text", "The text itself", "Show the text"],
            ],
        },
        {
            "kind": "prose", "id": "safety",
            "h2": "How to check a QR code before you open it",
            "p": ["Scam QR codes exist, for example stickers placed over real ones or codes in unsolicited mail. Reading the content first is the safest habit."],
            "bullets": [
                "<strong>Look at the domain.</strong> Does it match the company you expect? Watch for spelling tricks and unusual endings.",
                "<strong>Be careful with payment requests.</strong> Scanning to receive money does not exist. If a code asks you to pay, check the payee and amount.",
                "<strong>Distrust urgency.</strong> Codes that promise prizes, refunds or demand quick action are a red flag.",
                "<strong>Check physical stickers.</strong> If a code on a parking meter or poster looks stuck on top of another, do not use it.",
                "<strong>Avoid entering passwords</strong> on a page you reached only through a QR code, unless you trust the site."
            ],
        },
        {
            "kind": "prose", "id": "troubleshooting",
            "h2": "Why won't my QR code scan?",
            "p": ["Most failures have a simple cause."],
            "bullets": [
                "<strong>The image is too small or blurry.</strong> Use the original file or a higher-resolution screenshot.",
                "<strong>No white border.</strong> QR codes need blank space around them. Add a margin or crop less tightly.",
                "<strong>Low contrast or inverted colors.</strong> Light-on-dark codes and pale colors are harder to read.",
                "<strong>The code is damaged or too dense.</strong> Long content creates a complex pattern. Ask the sender for a simpler code.",
                "<strong>It is not a QR code.</strong> Barcodes and data matrix codes need a different scanner."
            ],
            "after": ["Made the code yourself? Use the <a href=\"qr-code-tester.html\">QR code tester</a> to see if it will scan when printed small."],
        },
    ],
    "faq": [
        ("How do I scan a QR code from an image?",
         "Upload the image or paste a screenshot into the scanner on this page. It reads the code and shows the content, such as a link, WiFi details or contact information."),
        ("Is this QR code scanner free?",
         "Yes. It is free, with no signup, no ads inside the tool and no watermark."),
        ("Is my image uploaded anywhere?",
         "No. Decoding happens in your browser. Your image and camera feed stay on your device."),
        ("Can I scan a QR code on my computer?",
         "Yes. Upload a picture or screenshot, paste it, or use a webcam if your computer has one."),
        ("Is it safe to scan a QR code?",
         "Scanning only reads the text. The risk comes from what you do next, such as opening a link or approving a payment. This scanner shows the content first so you can check it."),
        ("Can it read barcodes too?",
         "This tool reads QR codes. Standard barcodes such as EAN or Code 128 use a different format and need a barcode scanner."),
        ("Why does the scanner say no QR code found?",
         "The image may be blurry, too small, cropped too tightly or low in contrast. Try a sharper image, add a white border around the code, or use the original file."),
    ],
    "related": [
        ("qr-code-tester.html", "QR code tester: check if your code scans"),
        ("index.html#generator", "Free QR code generator"),
        ("wifi-qr-code-generator.html", "WiFi QR code generator"),
    ],
}

TESTER = {
    "slug": "qr-code-tester.html",
    "crumb": "QR Code Tester",
    "widget": "test",
    "type": "url",
    "tool_name": "QR Code Tester",
    "title": "QR Code Tester | Test If Your QR Code Scans Before You Print — SmartQRCraft",
    "description": "Free QR code test. Upload your QR code to check it decodes, and whether it still scans when small, blurry or low contrast. See what it contains. No signup, no upload.",
    "og_title": "QR Code Tester | SmartQRCraft",
    "og_description": "Test your QR code before printing: does it scan small, blurry or at low contrast? Free and private.",
    "h1": 'Free <span class="accent">QR Code Tester</span>',
    "lead": "Upload an image of your QR code and see if it scans, what it contains, and how well it survives small sizes, blur and low contrast.",
    "faq_h2": "QR Code Test Questions",
    "sections": [
        {
            "kind": "prose", "id": "what-we-check",
            "h2": "What the QR code test checks",
            "p": ["A QR code that scans on your screen can still fail on a small sticker or a worn menu. The tester runs the same code through several harder conditions and tells you how it did."],
            "bullets": [
                "<strong>Decodes at full size:</strong> the basic test. Can the code be read at all?",
                "<strong>Decodes when shrunk:</strong> half, quarter and very small versions, to imitate small print sizes and distance.",
                "<strong>Decodes when slightly blurred,</strong> like a phone that has not focused well (where your browser supports it).",
                "<strong>Dark on light:</strong> flags inverted codes that some scanners cannot read.",
                "<strong>Contrast:</strong> estimates the contrast between the dark and light modules.",
                "<strong>Content length:</strong> long content makes a denser code that needs more space."
            ],
            "after": ["The result is a guide. Real-world scanning depends on the phone, lighting, print quality and surface, so still try the printed code on real phones."],
        },
        {
            "kind": "prose", "id": "how-to-test",
            "h2": "How to test a QR code before printing",
            "p": ["A short routine avoids costly reprints."],
            "steps": [
                "Export your QR code as an image (PNG or SVG converted to PNG) or take a screenshot.",
                "Upload it or paste it into the tester above and read the verdict and the checklist.",
                "Fix any warnings: raise contrast, shorten the link, or plan a larger print size.",
                "Print a test copy at the real size and scan it with at least two different phones (an iPhone and an Android).",
                "Test it in the place where it will hang, with the real lighting and at a normal scanning distance."
            ],
        },
        {
            "kind": "table", "h2": "QR code size and scanning distance",
            "p": ["As a rough guide, the code should be about one tenth of the scanning distance. These are starting points, not guarantees."],
            "cols": ["Where it is scanned", "Typical distance", "Suggested minimum size"],
            "rows": [
                ["Business card or receipt", "About 20 cm (8 in)", "About 2 cm (0.8 in)"],
                ["Menu or table tent", "About 30 cm (12 in)", "About 3 cm (1.2 in)"],
                ["Poster or shop window", "1 to 2 m (3 to 6 ft)", "10 to 20 cm (4 to 8 in)"],
                ["Billboard or banner", "5 m and more", "50 cm (20 in) and more"],
            ],
        },
        {
            "kind": "prose", "id": "why-fail",
            "h2": "Common reasons a QR code fails",
            "p": ["These come up again and again."],
            "bullets": [
                "<strong>Too small for the distance,</strong> especially with dense, long content.",
                "<strong>Low contrast,</strong> such as light gray on white, or a busy image behind the code.",
                "<strong>Inverted colors</strong> (light code on a dark background).",
                "<strong>No quiet zone.</strong> The blank margin around the code was cropped or covered.",
                "<strong>Oversized logo</strong> in the middle that hides too much of the pattern.",
                "<strong>Glossy or curved surface</strong> that reflects light or distorts the code.",
                "<strong>Wrong or outdated link.</strong> The code scans, but the page is missing."
            ],
        },
    ],
    "faq": [
        ("How do I test if my QR code works?",
         "Upload an image of the code to the tester on this page. It checks that the code decodes, shows its content, and tests it at smaller sizes and with blur. Then also scan a printed copy with real phones."),
        ("Is the QR code tester free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Is my QR code image uploaded to a server?",
         "No. Everything runs in your browser and the image stays on your device."),
        ("What does Reliable mean?",
         "It means the code decoded at full size and at smaller sizes, with good contrast. It should scan well in normal conditions. It is not a guarantee for every phone or print."),
        ("My QR code passed but still fails on my phone. Why?",
         "Real phones differ, and printing adds problems such as low ink, glossy paper or poor lighting. Test a printed copy on several phones and try a larger size."),
        ("What is the minimum QR code size?",
         "A common rule is about one tenth of the scanning distance, and at least about 2 cm (0.8 in) for close-up prints such as business cards. Longer content needs more size."),
        ("Can the tester check dynamic QR codes?",
         "It reads whatever the code contains. For a dynamic code that is a redirect link, so the tester shows that link, not the final page."),
    ],
    "related": [
        ("qr-code-scanner.html", "QR code scanner: scan from image or camera"),
        ("index.html#generator", "Free QR code generator"),
        ("bulk-qr-code-generator.html", "Bulk QR code generator"),
    ],
}

# ---------------- German ----------------
_DE = {"domain": "smartqrcraft.de", "lang": "de", "type": "url"}

SCANNER_DE = {**_DE,
    "slug": "qr-code-scanner-online.html",
    "crumb": "QR-Code Scanner",
    "widget": "scan",
    "tool_name": "QR-Code Scanner",
    "title": "QR-Code Scanner online kostenlos | QR-Code aus Bild oder Kamera lesen — SmartQRCraft",
    "description": "Kostenloser QR-Code Scanner online: QR-Code aus Bild, Screenshot oder Kamera lesen und den Inhalt prüfen, bevor du ihn öffnest. Ohne Anmeldung, ohne Upload.",
    "og_title": "QR-Code Scanner online kostenlos | SmartQRCraft",
    "og_description": "QR-Code aus Bild oder mit der Kamera scannen und den Inhalt vorab prüfen. Kostenlos und privat.",
    "h1": 'Kostenloser <span class="accent">QR-Code Scanner</span> online',
    "lead": "Lade ein Bild hoch, füge einen Screenshot ein oder nutze deine Kamera. Der Scanner zeigt dir den Inhalt des QR-Codes, bevor du etwas öffnest.",
    "faq_h2": "Fragen zum QR-Code Scanner",
    "sections": [
        {
            "kind": "prose", "id": "anleitung",
            "h2": "QR-Code aus einem Bild oder Screenshot scannen",
            "p": ["Du kannst einen QR-Code auch scannen, wenn du kein Handy darauf richten kannst, zum Beispiel in einer E-Mail, einem PDF oder einem Screenshot."],
            "steps": [
                "Speichere das Bild mit dem QR-Code oder mache einen Screenshot.",
                "Klicke oben auf <strong>Bild auswählen</strong> oder ziehe das Bild in das Feld. Einen Screenshot kannst du mit Strg+V (am Mac Cmd+V) einfügen.",
                "Das Tool liest den Code und zeigt den Inhalt: Link, WLAN-Daten, Visitenkarte oder Text.",
                "Prüfe das Ergebnis. Bei Links schaust du zuerst auf die Domain und öffnest sie erst dann."
            ],
            "after": ["Wird nichts gefunden, schneide das Bild näher am Code zu, nimm ein schärferes Foto oder füge einen weißen Rand um den Code hinzu."],
        },
        {
            "kind": "prose", "id": "kamera",
            "h2": "Mit der Kamera scannen",
            "p": [
                "Auf dem Handy liest die eingebaute Kamera-App QR-Codes bei aktuellen iPhones und den meisten Android-Geräten, du brauchst dieses Tool dafür also oft nicht. Wenn du den Inhalt vor dem Öffnen sehen möchtest oder am Laptop mit Webcam arbeitest, tippe auf <strong>Kamera verwenden</strong> und erlaube den Kamerazugriff. Die Kamera funktioniert nur auf einer sicheren Seite (https).",
                "Das Kamerabild wird auf deinem Gerät verarbeitet und weder hochgeladen noch gespeichert."
            ],
        },
        {
            "kind": "table", "h2": "Was ein QR-Code enthalten kann",
            "p": ["Ein QR-Code ist nur ein Behälter für Text. Was danach passiert, hängt vom Inhalt ab. Dieser Scanner erkennt die häufigsten Arten und erklärt sie."],
            "cols": ["Inhalt", "Das siehst du hier", "Das würde ein Handy tun"],
            "rows": [
                ["Weblink", "Die vollständige Adresse und die Domain", "Die Webseite öffnen"],
                ["WLAN", "Netzwerkname, Verschlüsselung und Passwort", "Anbieten, das Netz zu verbinden"],
                ["Visitenkarte (vCard)", "Name, Firma, Telefon und E-Mail", "Anbieten, den Kontakt zu speichern"],
                ["UPI-Zahlungsanfrage", "Empfänger, UPI-ID und Betrag", "Eine Zahlungs-App öffnen"],
                ["E-Mail, Telefon, SMS", "Adresse oder Nummer", "E-Mail, Anruf oder Nachricht starten"],
                ["Text", "Der Text selbst", "Den Text anzeigen"],
            ],
        },
        {
            "kind": "prose", "id": "sicherheit",
            "h2": "QR-Code prüfen, bevor du ihn öffnest",
            "p": ["Es gibt betrügerische QR-Codes, etwa Aufkleber über echten Codes oder Codes in unerwarteter Post. Den Inhalt zuerst zu lesen ist die sicherste Gewohnheit."],
            "bullets": [
                "<strong>Domain prüfen.</strong> Passt sie zum erwarteten Unternehmen? Achte auf Tippfehler-Tricks und ungewöhnliche Endungen.",
                "<strong>Vorsicht bei Zahlungsanfragen.</strong> Wer einen Code scannt, um Geld zu erhalten, macht etwas falsch. Verlangt ein Code eine Zahlung, prüfe Empfänger und Betrag.",
                "<strong>Misstraue Zeitdruck.</strong> Codes mit Gewinnen, Erstattungen oder drängenden Fristen sind ein Warnsignal.",
                "<strong>Aufkleber prüfen.</strong> Wirkt ein Code auf einem Plakat oder Automaten wie aufgeklebt, nutze ihn nicht.",
                "<strong>Keine Passwörter eingeben</strong> auf einer Seite, die du nur über einen QR-Code erreicht hast, wenn du ihr nicht vertraust."
            ],
        },
        {
            "kind": "prose", "id": "probleme",
            "h2": "Warum lässt sich mein QR-Code nicht scannen?",
            "p": ["Meist hat es eine einfache Ursache."],
            "bullets": [
                "<strong>Das Bild ist zu klein oder unscharf.</strong> Nutze die Originaldatei oder einen Screenshot in höherer Auflösung.",
                "<strong>Kein weißer Rand.</strong> QR-Codes brauchen leeren Platz um sich herum.",
                "<strong>Geringer Kontrast oder invertierte Farben.</strong> Helle Codes auf dunklem Grund und blasse Farben sind schwerer zu lesen.",
                "<strong>Der Code ist beschädigt oder zu dicht.</strong> Langer Inhalt erzeugt ein komplexes Muster.",
                "<strong>Es ist kein QR-Code.</strong> Barcodes und Data-Matrix-Codes brauchen einen anderen Scanner."
            ],
            "after": ["Hast du den Code selbst erstellt? Prüfe ihn mit dem <a href=\"qr-code-testen.html\">QR-Code Test</a>, ob er auch klein gedruckt noch scannt."],
        },
    ],
    "faq": [
        ("Wie scanne ich einen QR-Code aus einem Bild?",
         "Lade das Bild hoch oder füge einen Screenshot in den Scanner auf dieser Seite ein. Er liest den Code und zeigt den Inhalt, etwa Link, WLAN-Daten oder Kontaktdaten."),
        ("Ist der QR-Code Scanner kostenlos?",
         "Ja. Er ist kostenlos, ohne Anmeldung und ohne Wasserzeichen."),
        ("Wird mein Bild irgendwo hochgeladen?",
         "Nein. Das Auslesen passiert in deinem Browser. Bild und Kamerabild bleiben auf deinem Gerät."),
        ("Kann ich einen QR-Code am Computer scannen?",
         "Ja. Lade ein Bild oder einen Screenshot hoch, füge ihn ein oder nutze eine Webcam."),
        ("Ist es sicher, einen QR-Code zu scannen?",
         "Das Scannen liest nur Text. Das Risiko entsteht durch das, was du danach tust, etwa einen Link zu öffnen oder eine Zahlung zu bestätigen. Der Scanner zeigt dir den Inhalt vorher an."),
        ("Kann er auch Barcodes lesen?",
         "Dieses Tool liest QR-Codes. Normale Barcodes wie EAN oder Code 128 haben ein anderes Format und brauchen einen Barcode-Scanner."),
        ("Warum wird kein QR-Code gefunden?",
         "Das Bild ist vielleicht unscharf, zu klein, zu eng zugeschnitten oder kontrastarm. Nimm ein schärferes Bild, füge einen weißen Rand hinzu oder nutze die Originaldatei."),
    ],
    "related": [
        ("qr-code-testen.html", "QR-Code testen: Funktioniert mein Code?"),
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("wlan-qr-code-generator.html", "WLAN QR-Code Generator"),
    ],
}

TESTER_DE = {**_DE,
    "slug": "qr-code-testen.html",
    "crumb": "QR-Code testen",
    "widget": "test",
    "tool_name": "QR-Code Test",
    "title": "QR-Code testen | Funktioniert mein QR-Code? Kostenloser Test — SmartQRCraft",
    "description": "QR-Code kostenlos testen: Lade deinen Code hoch und prüfe, ob er lesbar ist und auch klein, unscharf oder kontrastarm noch scannt. Ohne Anmeldung, ohne Upload.",
    "og_title": "QR-Code testen | SmartQRCraft",
    "og_description": "Teste deinen QR-Code vor dem Druck: Scannt er auch klein, unscharf und bei wenig Kontrast? Kostenlos und privat.",
    "h1": 'Kostenloser <span class="accent">QR-Code Test</span>',
    "lead": "Lade ein Bild deines QR-Codes hoch und sieh, ob er scannt, was er enthält und wie gut er kleine Größen, Unschärfe und wenig Kontrast übersteht.",
    "faq_h2": "Fragen zum QR-Code Test",
    "sections": [
        {
            "kind": "prose", "id": "pruefung",
            "h2": "Was der QR-Code Test prüft",
            "p": ["Ein QR-Code, der am Bildschirm scannt, kann auf einem kleinen Aufkleber oder einer abgenutzten Speisekarte trotzdem scheitern. Der Test lässt denselben Code unter härteren Bedingungen laufen und zeigt dir das Ergebnis."],
            "bullets": [
                "<strong>In voller Größe lesbar:</strong> der Grundtest. Lässt sich der Code überhaupt lesen?",
                "<strong>Verkleinert lesbar:</strong> halbe, viertel und sehr kleine Größe, um kleine Druckformate und Abstand nachzuahmen.",
                "<strong>Leicht unscharf lesbar,</strong> wie bei einem Handy, das nicht gut fokussiert hat (sofern dein Browser es unterstützt).",
                "<strong>Dunkel auf hell:</strong> zeigt invertierte Codes an, die manche Scanner nicht lesen können.",
                "<strong>Kontrast:</strong> schätzt den Kontrast zwischen dunklen und hellen Modulen.",
                "<strong>Länge des Inhalts:</strong> langer Inhalt ergibt einen dichteren Code, der mehr Platz braucht."
            ],
            "after": ["Das Ergebnis ist eine Orientierung. Im echten Einsatz zählen Handy, Licht, Druckqualität und Untergrund, daher solltest du den gedruckten Code trotzdem mit echten Handys testen."],
        },
        {
            "kind": "prose", "id": "vorgehen",
            "h2": "QR-Code vor dem Druck testen",
            "p": ["Eine kurze Routine spart teure Neudrucke."],
            "steps": [
                "Exportiere deinen QR-Code als Bild (PNG) oder mache einen Screenshot.",
                "Lade ihn oben hoch oder füge ihn ein und lies Urteil und Checkliste.",
                "Behebe Warnungen: mehr Kontrast, kürzerer Link oder ein größeres Druckformat.",
                "Drucke eine Testkopie in Originalgröße und scanne sie mit mindestens zwei verschiedenen Handys (iPhone und Android).",
                "Teste den Code an dem Ort, an dem er hängen soll, bei echtem Licht und normalem Abstand."
            ],
        },
        {
            "kind": "table", "h2": "Größe des QR-Codes und Scan-Abstand",
            "p": ["Als grobe Faustregel sollte der Code etwa ein Zehntel des Scan-Abstands groß sein. Das sind Startwerte, keine Garantien."],
            "cols": ["Wo wird gescannt?", "Typischer Abstand", "Empfohlene Mindestgröße"],
            "rows": [
                ["Visitenkarte oder Kassenbon", "Etwa 20 cm", "Etwa 2 cm"],
                ["Speisekarte oder Tischaufsteller", "Etwa 30 cm", "Etwa 3 cm"],
                ["Plakat oder Schaufenster", "1 bis 2 m", "10 bis 20 cm"],
                ["Großplakat oder Banner", "Ab 5 m", "Ab 50 cm"],
            ],
        },
        {
            "kind": "prose", "id": "fehler",
            "h2": "Häufige Gründe, warum ein QR-Code nicht funktioniert",
            "p": ["Diese Ursachen kommen immer wieder vor."],
            "bullets": [
                "<strong>Zu klein für den Abstand,</strong> besonders bei dichtem, langem Inhalt.",
                "<strong>Zu wenig Kontrast,</strong> etwa hellgrau auf weiß oder ein unruhiges Bild hinter dem Code.",
                "<strong>Invertierte Farben</strong> (heller Code auf dunklem Grund).",
                "<strong>Keine Ruhezone.</strong> Der leere Rand um den Code wurde abgeschnitten oder verdeckt.",
                "<strong>Zu großes Logo</strong> in der Mitte, das zu viel vom Muster verdeckt.",
                "<strong>Glänzende oder gewölbte Fläche,</strong> die spiegelt oder den Code verzerrt.",
                "<strong>Falscher oder veralteter Link.</strong> Der Code scannt, aber die Seite fehlt."
            ],
        },
    ],
    "faq": [
        ("Wie teste ich, ob mein QR-Code funktioniert?",
         "Lade ein Bild des Codes in den Test auf dieser Seite hoch. Er prüft, ob der Code lesbar ist, zeigt den Inhalt und testet ihn bei kleineren Größen und mit Unschärfe. Scanne danach auch eine gedruckte Kopie mit echten Handys."),
        ("Ist der QR-Code Test kostenlos?",
         "Ja. Er ist kostenlos, ohne Anmeldung und ohne Wasserzeichen."),
        ("Wird mein QR-Code-Bild auf einen Server hochgeladen?",
         "Nein. Alles läuft in deinem Browser, das Bild bleibt auf deinem Gerät."),
        ("Was bedeutet Zuverlässig?",
         "Der Code wurde in voller und in kleinerer Größe erkannt, mit gutem Kontrast. Er sollte unter normalen Bedingungen gut scannen. Eine Garantie für jedes Handy oder jeden Druck ist das nicht."),
        ("Mein Code hat den Test bestanden, scannt aber am Handy nicht. Warum?",
         "Handys unterscheiden sich, und der Druck bringt eigene Probleme wie wenig Toner, Glanzpapier oder schlechtes Licht. Teste eine gedruckte Kopie mit mehreren Handys und probiere eine größere Größe."),
        ("Wie klein darf ein QR-Code sein?",
         "Faustregel: etwa ein Zehntel des Scan-Abstands, und bei Nahdruck wie Visitenkarten mindestens etwa 2 cm. Längerer Inhalt braucht mehr Platz."),
        ("Kann der Test auch dynamische QR-Codes prüfen?",
         "Er liest, was der Code enthält. Bei einem dynamischen Code ist das ein Weiterleitungslink, der Test zeigt also diesen Link und nicht die endgültige Seite."),
    ],
    "related": [
        ("qr-code-scanner-online.html", "QR-Code Scanner online"),
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("qr-code-mit-logo.html", "QR-Code mit Logo"),
    ],
}

TOOLS_SHARED = [SCANNER, TESTER]
TOOLS_DE = [SCANNER_DE, TESTER_DE]
