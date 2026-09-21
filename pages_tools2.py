"""Bulk QR generator and barcode generator pages (English shared, German barcode page)."""

BULK = {
    "slug": "bulk-qr-code-generator.html",
    "crumb": "Bulk QR Code Generator",
    "widget": "bulk",
    "type": "url",
    "tool_name": "Bulk QR Code Generator",
    "title": "Bulk QR Code Generator | Make Hundreds of QR Codes from a List — SmartQRCraft",
    "description": "Free bulk QR code generator. Paste or upload a list of links or text, get every QR code as PNG or SVG in one ZIP. Up to 1000 codes, private, no signup.",
    "og_title": "Bulk QR Code Generator | SmartQRCraft",
    "og_description": "Turn a list of links into hundreds of QR codes and download them in one ZIP. Free, private, no signup.",
    "h1": 'Free <span class="accent">Bulk QR Code</span> Generator',
    "lead": "Paste a list or load a CSV file, and get a separate QR code for every line, packed into one ZIP with a manifest. Everything happens in your browser.",
    "faq_h2": "Bulk QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make QR codes in bulk",
            "p": ["The tool creates one static QR code per line of your list."],
            "steps": [
                "Put one item per line in the box above: a link, a product page, a table URL, or any text. Or click <strong>Load CSV or TXT file</strong>.",
                "If you want your own file names, switch the line format to <strong>Name, content</strong> and write each line as <code>name,content</code>.",
                "Choose color, size (PNG) or vector output (SVG), and style.",
                "Click <strong>Generate QR codes</strong>. A preview of the first codes appears.",
                "Click <strong>Download ZIP</strong>. You get every QR code plus a <code>manifest.csv</code> that lists each line and its file name."
            ],
        },
        {
            "kind": "table", "h2": "List formats that work",
            "p": ["A plain text file or CSV with one entry per row is enough."],
            "cols": ["Line format", "Example line", "File name in the ZIP"],
            "rows": [
                ["Content only", "https://example.com/shop/item-42", "1-example-com-shop-item-42.png"],
                ["Name, content", "table-7,https://example.com/menu?t=7", "7-table-7.png"],
                ["Domain without https", "example.com/offer", "Added https:// automatically (optional)"],
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "What bulk QR codes are used for",
            "cards": [
                ("Restaurant tables", "One code per table that opens the menu with the table number in the link."),
                ("Product labels", "A code per product that opens its page, manual or warranty form."),
                ("Asset tags &amp; equipment", "Label laptops, tools or rooms with codes that point to an item record."),
                ("Events &amp; conferences", "Unique links for sessions, booths or badges."),
                ("Real estate &amp; listings", "A code for each property that opens its listing page."),
                ("Packaging &amp; mailings", "A different link per batch, region or campaign."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for large batches",
            "p": ["A few habits keep a big batch from turning into a big mistake."],
            "bullets": [
                "<strong>Test a few first.</strong> Generate a small batch, print or display two or three, and scan them before you commit.",
                "<strong>Keep links short.</strong> Shorter content makes simpler codes that scan better at small sizes.",
                "<strong>Use unique, stable links.</strong> These are static codes, so you cannot change a link after printing. Point them at pages you control.",
                "<strong>Check the manifest.</strong> It shows which line produced which file, so you can match codes to items.",
                "<strong>Use SVG for print.</strong> Vector files stay sharp at any size, and PNG is easier for documents and screens.",
                "<strong>Batch size.</strong> This tool handles up to 1000 lines at a time. Split larger lists into several files."
            ],
        },
        {
            "kind": "prose", "id": "limits",
            "h2": "What this tool does not do",
            "p": [
                "Static codes contain their content directly, so there is no scan tracking, no editing after printing and no account. If you need to change a destination later or count scans, you would need a dynamic QR service. For fixed links, static codes are free, permanent and need no server.",
                "Every line is encoded exactly as written. Check your list for typos and stray spaces, because the tool will not correct them."
            ],
        },
    ],
    "faq": [
        ("How do I create QR codes in bulk?",
         "Paste your list into the bulk generator, one item per line, or load a CSV or TXT file. Click Generate, then download the ZIP that contains one QR code per line."),
        ("Is the bulk QR code generator free?",
         "Yes. It is free, with no signup, no watermark and no per-code limit beyond 1000 lines per batch."),
        ("How many QR codes can I make at once?",
         "Up to 1000 lines per batch. For more, split your list into several files."),
        ("Can I name the files myself?",
         "Yes. Choose the Name, content line format and write each line as name,content. The name becomes part of the file name."),
        ("Are my links uploaded to a server?",
         "No. The codes are generated in your browser, and the ZIP is built on your device."),
        ("Can I change the links after printing?",
         "Not with static codes. If a link needs to change, generate a new code. Point codes at pages you control so you can update the page itself."),
        ("PNG or SVG for bulk export?",
         "PNG works well for documents, spreadsheets and screens. SVG is a vector format and stays sharp at any print size."),
    ],
    "related": [
        ("index.html#generator", "Free QR code generator"),
        ("qr-code-tester.html", "QR code tester"),
        ("qr-code-scanner.html", "QR code scanner"),
    ],
}

BARCODE = {
    "slug": "barcode-generator.html",
    "crumb": "Barcode Generator",
    "widget": "barcode",
    "type": "url",
    "tool_name": "Barcode Generator",
    "title": "Free Barcode Generator | Code 128, EAN-13, UPC, Code 39, Bulk — SmartQRCraft",
    "description": "Free barcode generator for Code 128, EAN-13, EAN-8, UPC-A, Code 39 and more. Make one barcode or hundreds from a list, download PNG or SVG. Private, no signup.",
    "og_title": "Free Barcode Generator | SmartQRCraft",
    "og_description": "Create barcodes online: Code 128, EAN-13, UPC-A, Code 39 and more. Bulk from a list, PNG or SVG. Free, private.",
    "h1": 'Free <span class="accent">Barcode Generator</span>',
    "lead": "Pick a barcode type, enter one value or a whole list, and download PNG or SVG files. Lists become a ZIP. Everything runs in your browser.",
    "faq_h2": "Barcode Generator Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to create a barcode online",
            "p": ["Making a barcode takes only a few steps."],
            "steps": [
                "Choose the <strong>barcode type</strong>. If you are not sure, Code 128 accepts any text and numbers.",
                "Enter your value, or many values with one per line. Invalid lines are flagged and skipped.",
                "Adjust bar width, height, colors and whether the numbers show below the bars.",
                "Download a <strong>PNG</strong> or <strong>SVG</strong>. With more than one line you get a ZIP with one file per value."
            ],
        },
        {
            "kind": "table", "h2": "Which barcode type should I use?",
            "p": ["The type depends on where the barcode will be scanned. Pick the one your system or industry expects."],
            "cols": ["Type", "Accepts", "Typical use"],
            "rows": [
                ["Code 128", "Letters, numbers and symbols", "Logistics, internal IDs, shipping labels, inventory"],
                ["EAN-13", "13 digits (12 plus check digit)", "Retail products outside North America"],
                ["EAN-8", "8 digits (7 plus check digit)", "Small retail packages"],
                ["UPC-A", "12 digits (11 plus check digit)", "Retail products in the US and Canada"],
                ["Code 39", "Capital letters, numbers and a few symbols", "Industrial labels, ID badges, older systems"],
                ["ITF (Interleaved 2 of 5)", "Digits, in pairs", "Warehousing and cartons"],
                ["ITF-14", "14 digits", "Shipping cartons and cases"],
                ["Codabar", "Digits and a few symbols", "Libraries, blood banks, older systems"],
            ],
        },
        {
            "kind": "prose", "id": "retail",
            "h2": "Important: barcodes for retail products",
            "p": [
                "A generator can draw the bars for any valid number, but it cannot make a number valid for selling. Retail barcodes (EAN and UPC) use numbers issued through GS1, the organization that manages them. If you sell through retailers or marketplaces that require registered product codes, get your numbers from GS1 or an authorized reseller. Numbers you invent can clash with someone else's product.",
                "For your own inventory, assets, tickets or internal tracking, you can use any value, and Code 128 is usually the easiest choice."
            ],
        },
        {
            "kind": "prose", "id": "bulk",
            "h2": "Making barcodes in bulk",
            "p": ["Put one value on each line and the generator creates one barcode per line. Lines that do not fit the chosen type, for example letters in an EAN-13, are flagged and skipped so you can fix them. For large lists, choose the file format first, then download the ZIP. File names start with the line number so they stay in order."],
        },
        {
            "kind": "prose", "id": "printing",
            "h2": "Tips for barcodes that scan",
            "p": ["Most scanning problems come from printing, not from the barcode itself."],
            "bullets": [
                "<strong>Contrast:</strong> use black bars on a white background. Avoid colors that look similar to a scanner, such as red on white.",
                "<strong>Quiet zone:</strong> keep a blank margin on both sides of the bars. The margin setting handles this.",
                "<strong>Size:</strong> do not squash or stretch the image. Keep proportions, and print bars sharp, using SVG or a high-resolution PNG.",
                "<strong>Do not shrink too much.</strong> Very thin bars can be unreadable on cheap printers or curved surfaces.",
                "<strong>Test with your real scanner</strong> or a scanner app before printing a large batch."
            ],
        },
        {
            "kind": "prose", "id": "qr-or-barcode",
            "h2": "Barcode or QR code?",
            "p": ["A barcode stores a short code in one line of bars. A QR code stores much more, such as a link, in a square pattern, and phone cameras read it easily. Use a barcode when a scanner, a checkout or an inventory system expects one, and a QR code when people will scan with phones. You can make QR codes with the <a href=\"index.html#generator\">QR code generator</a> or in batches with the <a href=\"bulk-qr-code-generator.html\">bulk QR code generator</a>."],
        },
    ],
    "faq": [
        ("How do I create a barcode online for free?",
         "Choose a barcode type, enter your value in the generator on this page, and download the barcode as PNG or SVG. It is free, with no signup."),
        ("Can I make barcodes in bulk?",
         "Yes. Enter one value per line and the tool creates a barcode for each line, then downloads them together as a ZIP."),
        ("Which barcode type is best for inventory?",
         "Code 128 is usually the best choice for inventory and internal IDs, because it handles letters and numbers and is widely supported."),
        ("Can I use these barcodes to sell products in stores?",
         "Retail EAN and UPC numbers are issued through GS1. A generator draws the barcode, but you need officially issued numbers if retailers or marketplaces require registered product codes."),
        ("What is a check digit?",
         "It is the last digit of EAN and UPC codes, calculated from the others to catch mistakes. This tool adds it for you if you enter one digit fewer than the full length."),
        ("PNG or SVG?",
         "SVG is a vector format and stays sharp at any size, which is best for print. PNG is easier to insert into documents and works well at high resolution."),
        ("Are my values uploaded to a server?",
         "No. Everything runs in your browser and nothing is sent to a server."),
    ],
    "related": [
        ("bulk-qr-code-generator.html", "Bulk QR code generator"),
        ("index.html#generator", "Free QR code generator"),
        ("qr-code-scanner.html", "QR code scanner"),
    ],
}

BARCODE_DE = {
    "domain": "smartqrcraft.de", "lang": "de", "type": "url",
    "slug": "barcode-generator-kostenlos.html",
    "crumb": "Barcode Generator",
    "widget": "barcode",
    "tool_name": "Barcode Generator",
    "title": "Barcode erstellen kostenlos | Barcode Generator für Code 128, EAN, UPC — SmartQRCraft",
    "description": "Barcode erstellen und generieren, kostenlos: Code 128, EAN-13, EAN-8, UPC-A, Code 39 und mehr. Einzeln oder als Liste, als PNG oder SVG. Ohne Anmeldung.",
    "og_title": "Barcode erstellen kostenlos | SmartQRCraft",
    "og_description": "Barcodes online generieren: Code 128, EAN-13, UPC-A und mehr. Aus einer Liste, als PNG oder SVG. Kostenlos und privat.",
    "h1": 'Kostenlos <span class="accent">Barcode erstellen</span>',
    "lead": "Wähle die Barcode-Art, gib einen Wert oder eine ganze Liste ein und lade PNG- oder SVG-Dateien herunter. Listen werden zu einer ZIP-Datei. Alles läuft in deinem Browser.",
    "faq_h2": "Fragen zum Barcode Generator",
    "sections": [
        {
            "kind": "prose", "id": "anleitung",
            "h2": "Barcode online erstellen: So geht es",
            "p": ["Ein Barcode ist in wenigen Schritten erstellt."],
            "steps": [
                "Wähle die <strong>Barcode-Art</strong>. Wenn du unsicher bist, nimm Code 128, denn er nimmt beliebigen Text und Zahlen.",
                "Gib deinen Wert ein, oder mehrere Werte mit einem pro Zeile. Ungültige Zeilen werden markiert und übersprungen.",
                "Passe Balkenbreite, Höhe, Farben und die Anzeige der Ziffern unter den Balken an.",
                "Lade ein <strong>PNG</strong> oder <strong>SVG</strong> herunter. Bei mehreren Zeilen erhältst du eine ZIP-Datei mit einer Datei pro Wert."
            ],
        },
        {
            "kind": "table", "h2": "Welche Barcode-Art passt?",
            "p": ["Die Art hängt davon ab, wo der Barcode gescannt wird. Wähle die, die dein System oder deine Branche erwartet."],
            "cols": ["Art", "Erlaubt", "Typischer Einsatz"],
            "rows": [
                ["Code 128", "Buchstaben, Zahlen und Zeichen", "Logistik, interne Nummern, Versandetiketten, Lager"],
                ["EAN-13", "13 Ziffern (12 plus Prüfziffer)", "Handelsware in Europa"],
                ["EAN-8", "8 Ziffern (7 plus Prüfziffer)", "Kleine Verpackungen"],
                ["UPC-A", "12 Ziffern (11 plus Prüfziffer)", "Handelsware in den USA und Kanada"],
                ["Code 39", "Großbuchstaben, Zahlen und einige Zeichen", "Industrie-Etiketten, Ausweise, ältere Systeme"],
                ["ITF (Interleaved 2 of 5)", "Ziffern, paarweise", "Lager und Kartons"],
                ["ITF-14", "14 Ziffern", "Versandkartons"],
                ["Codabar", "Ziffern und einige Zeichen", "Bibliotheken, ältere Systeme"],
            ],
        },
        {
            "kind": "prose", "id": "handel",
            "h2": "Wichtig: Barcodes für den Verkauf im Handel",
            "p": [
                "Ein Generator kann die Balken für jede gültige Nummer zeichnen, aber er macht die Nummer nicht verkaufsfähig. EAN- und UPC-Nummern im Handel werden über GS1 vergeben. Wenn Händler oder Marktplätze registrierte Produktnummern verlangen, beziehe sie bei GS1 oder einem autorisierten Anbieter. Selbst ausgedachte Nummern können mit den Produkten anderer kollidieren.",
                "Für eigene Lagerbestände, Geräte, Tickets oder interne Zwecke kannst du beliebige Werte verwenden, und Code 128 ist meist die einfachste Wahl."
            ],
        },
        {
            "kind": "prose", "id": "tipps",
            "h2": "Tipps für Barcodes, die zuverlässig scannen",
            "p": ["Die meisten Probleme entstehen beim Drucken, nicht im Barcode selbst."],
            "bullets": [
                "<strong>Kontrast:</strong> schwarze Balken auf weißem Grund. Vermeide Farben, die für Scanner ähnlich aussehen, etwa Rot auf Weiß.",
                "<strong>Ruhezone:</strong> lasse links und rechts der Balken einen freien Rand. Die Einstellung Rand übernimmt das.",
                "<strong>Größe:</strong> strecke oder staure das Bild nicht. Drucke mit SVG oder einem hochaufgelösten PNG.",
                "<strong>Nicht zu stark verkleinern.</strong> Sehr schmale Balken sind auf einfachen Druckern oder gewölbten Flächen nicht lesbar.",
                "<strong>Mit dem echten Scanner testen,</strong> bevor du einen großen Stapel druckst."
            ],
        },
        {
            "kind": "prose", "id": "qr-oder-barcode",
            "h2": "Barcode oder QR-Code?",
            "p": ["Ein Barcode speichert einen kurzen Code in einer Balkenreihe. Ein QR-Code speichert deutlich mehr, etwa einen Link, in einem Quadrat, und Handykameras lesen ihn leicht. Nimm einen Barcode, wenn ein Scanner, eine Kasse oder ein Lagersystem ihn erwartet, und einen QR-Code, wenn Menschen mit dem Handy scannen. QR-Codes erstellst du mit dem <a href=\"index.html#generator\">QR-Code Generator</a>."],
        },
    ],
    "faq": [
        ("Wie erstelle ich einen Barcode kostenlos?",
         "Wähle eine Barcode-Art, gib deinen Wert im Generator auf dieser Seite ein und lade den Barcode als PNG oder SVG herunter. Das ist kostenlos und ohne Anmeldung."),
        ("Kann ich mehrere Barcodes auf einmal erstellen?",
         "Ja. Gib pro Zeile einen Wert ein. Das Tool erstellt für jede Zeile einen Barcode und lädt sie zusammen als ZIP herunter."),
        ("Welche Barcode-Art ist für das Lager am besten?",
         "Meist Code 128, weil er Buchstaben und Zahlen zulässt und weit verbreitet ist."),
        ("Darf ich diese Barcodes für den Verkauf im Handel verwenden?",
         "EAN- und UPC-Nummern im Handel vergibt GS1. Der Generator zeichnet nur den Barcode. Wenn Händler oder Marktplätze registrierte Nummern verlangen, brauchst du offiziell vergebene Nummern."),
        ("Was ist eine Prüfziffer?",
         "Die letzte Ziffer bei EAN- und UPC-Codes. Sie wird aus den übrigen Ziffern berechnet, um Fehler zu erkennen. Das Tool ergänzt sie, wenn du eine Ziffer weniger als die volle Länge eingibst."),
        ("PNG oder SVG?",
         "SVG ist ein Vektorformat und bleibt in jeder Größe scharf, ideal für den Druck. PNG lässt sich leichter in Dokumente einfügen und ist bei hoher Auflösung gut geeignet."),
        ("Werden meine Werte hochgeladen?",
         "Nein. Alles läuft in deinem Browser, es wird nichts an einen Server gesendet."),
    ],
    "related": [
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("qr-code-scanner-online.html", "QR-Code Scanner online"),
        ("qr-code-testen.html", "QR-Code testen"),
    ],
}

TOOLS2_SHARED = [BULK, BARCODE]
TOOLS2_DE = [BARCODE_DE]
