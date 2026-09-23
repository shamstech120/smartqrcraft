"""Germany (smartqrcraft.de) pages, written in German. Keyword data: research/keywords-de.csv."""

_D = {"domain": "smartqrcraft.de", "lang": "de"}

INDEX = {**_D,
    "slug": "index.html",
    "crumb": "QR-Code Generator",
    "type": "url",
    "types": "url,text,wifi,email,phone,sms,vcard,location,social,menu,pdf,app",
    "lock": False,
    "tool_name": "QR-Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "JETZT SCANNEN",
    "empty": "Gib deine Daten ein, um den QR-Code zu erstellen.",
    "title": "QR-Code erstellen kostenlos ohne Anmeldung | QR-Code Generator — SmartQRCraft",
    "description": "QR-Code erstellen kostenlos und ohne Anmeldung: Link, WLAN, Visitenkarte und mehr. Farben und Logo anpassen, als PNG oder SVG herunterladen. Ohne Wasserzeichen.",
    "og_title": "QR-Code erstellen kostenlos | SmartQRCraft",
    "og_description": "Eigene QR-Codes kostenlos erstellen: ohne Anmeldung, ohne Wasserzeichen, mit Logo und Farben.",
    "h1": 'QR-Code <span class="accent">kostenlos erstellen</span>, ohne Anmeldung',
    "lead": "Wähle die Art, gib deine Daten ein, gestalte den Code und lade ihn herunter. Alles läuft direkt in deinem Browser, ohne Konto und ohne Wasserzeichen.",
    "faq_h2": "Häufige Fragen zum QR-Code erstellen",
    "sections": [
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "QR-Code erstellen: So geht es in drei Schritten",
            "p": ["Einen QR-Code zu erstellen dauert nur wenige Sekunden. Du brauchst dafür weder ein Konto noch eine Software."],
            "steps": [
                "<strong>Art wählen:</strong> Entscheide im Generator oben, was der Code tun soll, zum Beispiel eine Webseite öffnen, ein WLAN teilen oder Kontaktdaten speichern.",
                "<strong>Daten eingeben:</strong> Trage den Link, das WLAN-Passwort oder deine Kontaktdaten ein. Der QR-Code erscheint sofort in der Vorschau.",
                "<strong>Gestalten und herunterladen:</strong> Passe Farbe, Form und Rahmen an, füge optional dein Logo ein und lade den Code als PNG oder SVG herunter.",
                "<strong>Testen:</strong> Scanne den fertigen Code mit der Kamera-App deines Handys, bevor du ihn druckst oder veröffentlichst."
            ],
        },
        {
            "kind": "cards", "id": "qr-types", "eyebrow": "QR-Code Arten", "h2": "Diese QR-Codes kannst du erstellen",
            "cards": [
                ("Link", "Führt direkt auf eine Webseite, einen Online-Shop oder eine Landingpage."),
                ("WLAN", "Gäste verbinden sich ohne Passwort-Eingabe. Mehr dazu im <a href=\"wlan-qr-code-generator.html\">WLAN-QR-Code Generator</a>."),
                ("Visitenkarte (vCard)", "Speichert Name, Telefon und E-Mail im Adressbuch. Siehe <a href=\"visitenkarte-qr-code-generator.html\">QR-Code für die Visitenkarte</a>."),
                ("E-Mail", "Öffnet eine vorbereitete E-Mail mit Empfänger und Betreff."),
                ("Telefon und SMS", "Startet einen Anruf oder öffnet eine vorbereitete Nachricht."),
                ("Standort", "Öffnet einen Ort in der Kartenanwendung."),
                ("Speisekarte und PDF", "Verlinkt eine Speisekarte, Broschüre oder ein anderes Dokument. Mehr im Ratgeber <a href=\"pdf-in-qr-code.html\">PDF in QR-Code umwandeln</a>."),
                ("Social Media und App", "Führt auf ein Profil oder in den App Store."),
            ],
        },
        {
            "kind": "table", "h2": "Statischer oder dynamischer QR-Code?",
            "p": ["Bei der Suche nach einem QR-Code Generator stößt du schnell auf beide Begriffe. Der Unterschied ist wichtig, weil er bestimmt, ob du den Inhalt später ändern kannst."],
            "cols": ["", "Statischer QR-Code (dieser Generator)", "Dynamischer QR-Code"],
            "rows": [
                ["Inhalt", "Steht direkt im Code", "Der Code enthält nur eine Weiterleitung"],
                ["Änderung nach dem Druck", "Nicht möglich, neuer Code nötig", "Ziel lässt sich später ändern"],
                ["Kosten", "Kostenlos", "Meist ein Abo bei einem Anbieter"],
                ["Ablauf", "Läuft nicht ab und braucht keinen Server", "Funktioniert nur, solange der Anbieter aktiv ist"],
                ["Scan-Statistik", "Nein", "Ja, beim Anbieter"],
                ["Geeignet für", "Visitenkarten, WLAN, feste Links", "Plakate, Verpackungen, Kampagnen"],
            ],
        },
        {
            "kind": "cards", "id": "features", "eyebrow": "Funktionen", "h2": "Was der QR-Code Generator kann",
            "cards": [
                ("Ohne Anmeldung", "Kein Konto, keine E-Mail-Adresse, kein Testzeitraum."),
                ("Farben und Formen", "Wähle Farbe, Hintergrund, Punktform und Eckmuster."),
                ("Logo einfügen", "Setze dein Logo in die Mitte. Die Fehlerkorrektur wird automatisch erhöht."),
                ("PNG und SVG", "PNG für Bildschirm und Dokumente, SVG als Vektor für den Druck."),
                ("Rahmen mit Aufforderung", "Füge einen Text wie &bdquo;Jetzt scannen&ldquo; hinzu."),
                ("Lokal im Browser", "Deine Eingaben werden nicht an einen Server gesendet."),
            ],
        },
        {
            "kind": "prose", "id": "tipps",
            "h2": "Tipps für einen QR-Code, der zuverlässig scannt",
            "p": ["Ein schöner Code nützt nichts, wenn er sich nicht scannen lässt. Diese Punkte helfen."],
            "bullets": [
                "<strong>Kontrast:</strong> Dunkler Code auf hellem Grund scannt am zuverlässigsten. Vermeide helle Farben und invertierte Codes.",
                "<strong>Größe:</strong> Im Druck sollte der Code mindestens etwa 2 &times; 2 cm groß sein, bei größerem Abstand deutlich mehr.",
                "<strong>Ruhezone:</strong> Lasse rund um den Code einen freien Rand.",
                "<strong>Kurze Links:</strong> Je kürzer der Inhalt, desto einfacher das Muster und desto besser die Lesbarkeit.",
                "<strong>Logo klein halten:</strong> Ein zu großes Logo kann das Scannen verhindern.",
                "<strong>Immer testen:</strong> Prüfe den Code mit einem iPhone und einem Android-Gerät und am besten auf dem echten Druckmaterial."
            ],
        },
    ],
    "faq": [
        ("Wie kann ich einen QR-Code kostenlos erstellen?",
         "Wähle im Generator oben die Art, zum Beispiel Link, gib deine Daten ein und lade den QR-Code als PNG oder SVG herunter. Das ist kostenlos, ohne Anmeldung und ohne Wasserzeichen."),
        ("Brauche ich ein Konto oder eine Anmeldung?",
         "Nein. Du kannst QR-Codes sofort erstellen, gestalten und herunterladen, ohne dich zu registrieren."),
        ("Läuft der QR-Code irgendwann ab?",
         "Nein. Ein statischer QR-Code enthält seinen Inhalt selbst und funktioniert dauerhaft, solange das Ziel, zum Beispiel deine Webseite, erreichbar ist."),
        ("Kann ich den Inhalt eines QR-Codes später ändern?",
         "Bei einem statischen QR-Code nicht. Wenn sich dein Link ändert, musst du einen neuen Code erstellen und ersetzen. Wenn du Ziele nachträglich ändern willst, brauchst du einen dynamischen QR-Code bei einem Anbieter."),
        ("Werden meine Daten gespeichert?",
         "Nein. Der QR-Code wird in deinem Browser erzeugt. Deine Eingaben werden nicht an einen Server übertragen."),
        ("Welches Format soll ich herunterladen, PNG oder SVG?",
         "PNG eignet sich für Bildschirme, Webseiten und Dokumente. SVG ist ein Vektorformat und bleibt in jeder Größe scharf, ideal für Druck, Plakate und Aufkleber."),
        ("Kann ich ein Logo in den QR-Code einfügen?",
         "Ja. Aktiviere im Generator die Option Logo in der Mitte und lade ein quadratisches PNG oder JPG hoch. Halte das Logo klein und teste den Code danach."),
        ("Funktioniert der QR-Code mit iPhone und Android?",
         "Ja. Die Kamera-App aktueller iPhones und Android-Geräte erkennt QR-Codes direkt, ohne zusätzliche App."),
    ],
    "related": [
        ("wlan-qr-code-generator.html", "WLAN QR-Code Generator"),
        ("visitenkarte-qr-code-generator.html", "QR-Code für die Visitenkarte"),
        ("qr-code-mit-logo.html", "QR-Code mit Logo erstellen"),
        ("pdf-in-qr-code.html", "PDF in QR-Code umwandeln"),
    ],
}

WLAN = {**_D,
    "slug": "wlan-qr-code-generator.html",
    "crumb": "WLAN QR-Code Generator",
    "type": "wifi",
    "tool_name": "WLAN QR-Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "WLAN VERBINDEN",
    "empty": "Gib den Netzwerknamen ein, um den QR-Code zu erstellen.",
    "title": "WLAN QR-Code erstellen kostenlos | WLAN teilen ohne Passwort — SmartQRCraft",
    "description": "WLAN QR-Code erstellen: Netzwerkname und Passwort eingeben, Code herunterladen. Gäste scannen und verbinden sich sofort. Kostenlos, ohne Anmeldung, als PNG oder SVG.",
    "og_title": "WLAN QR-Code Generator kostenlos | SmartQRCraft",
    "og_description": "WLAN-Zugang per QR-Code teilen: Gäste scannen und sind verbunden. Kostenlos und ohne Anmeldung.",
    "h1": 'Kostenloser <span class="accent">WLAN QR-Code</span> Generator',
    "lead": "Gib Netzwerkname und Passwort ein und lade den QR-Code herunter. Gäste scannen ihn mit der Kamera und sind verbunden, ohne das Passwort abzutippen.",
    "faq_h2": "Fragen zum WLAN QR-Code",
    "sections": [
        {
            "kind": "prose", "id": "anleitung",
            "h2": "WLAN QR-Code erstellen: Anleitung",
            "p": ["Du brauchst nur den Netzwerknamen (SSID) und das Passwort deines WLANs."],
            "steps": [
                "Trage im Generator den <strong>Netzwerknamen (SSID)</strong> genau so ein, wie er auf dem Handy angezeigt wird. Groß- und Kleinschreibung zählt.",
                "Gib das <strong>Passwort</strong> ein.",
                "Wähle die <strong>Verschlüsselung</strong>. Für die meisten Router ist WPA/WPA2/WPA3 richtig. Hat dein Netz kein Passwort, wähle Kein Passwort.",
                "Passe bei Bedarf Farbe und Design an und lade den Code als PNG oder SVG herunter.",
                "Scanne den Code mit einem anderen Handy und prüfe, ob die Verbindung klappt."
            ],
        },
        {
            "kind": "prose", "id": "scannen",
            "h2": "Wie verbinden sich Gäste mit dem WLAN?",
            "p": [
                "Auf aktuellen iPhones und Android-Geräten genügt die normale Kamera-App. Man richtet sie auf den Code, tippt auf die eingeblendete Meldung und bestätigt die Verbindung. Eine zusätzliche App ist nicht nötig. Bei Android funktioniert das ab Android 10 zuverlässig."
            ],
        },
        {
            "kind": "prose", "id": "handy-und-router",
            "h2": "WLAN-QR-Code direkt am Handy oder Router finden",
            "p": ["Manche Geräte können den Code auch selbst anzeigen. Die Menünamen unterscheiden sich je nach Hersteller und Version."],
            "bullets": [
                "<strong>Android:</strong> Ab Android 10 findest du bei den WLAN-Einstellungen neben dem verbundenen Netzwerk oft die Option QR-Code oder Teilen. Bei Samsung und Xiaomi heißen die Menüpunkte teils anders.",
                "<strong>iPhone:</strong> Das iPhone zeigt in den Einstellungen keinen QR-Code für das eigene WLAN an. Du kannst das Passwort aber per Teilen-Funktion an ein Gerät in der Nähe senden, oder du erstellst den Code mit diesem Generator.",
                "<strong>Router:</strong> Bei manchen Routern, etwa der FRITZ!Box im Bereich Gastzugang, gibt es einen fertigen QR-Code."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Einsatz", "h2": "Wo sich ein WLAN QR-Code lohnt",
            "cards": [
                ("Café, Restaurant und Bar", "Auf dem Tisch oder der Speisekarte, damit Gäste nicht nach dem Passwort fragen müssen."),
                ("Ferienwohnung und Hotel", "Als Rahmen im Eingangsbereich oder auf der Willkommenskarte."),
                ("Büro und Praxis", "Für Besucher am Empfang oder im Besprechungsraum."),
                ("Zuhause", "Für Gäste, damit du kein langes Passwort diktieren musst."),
                ("Veranstaltungen", "Auf Plakaten und Schildern für Besucher und Aussteller."),
                ("Coworking und Schulung", "Auf einem Aufsteller, der für alle Teilnehmer sichtbar ist."),
            ],
        },
        {
            "kind": "prose", "id": "sicherheit",
            "h2": "Sicherheit: Was du beachten solltest",
            "p": ["Ein WLAN QR-Code schützt dein Passwort nicht. Er enthält es nur in codierter Form, und jeder, der den Code scannt, kann sich verbinden."],
            "bullets": [
                "<strong>Gastnetz verwenden:</strong> Wenn dein Router ein Gast-WLAN bietet, erstelle den Code dafür statt für dein Heimnetz.",
                "<strong>Zugang begrenzen:</strong> Hänge den Code nur dort auf, wo er hingehört, etwa im Gästebereich.",
                "<strong>Passwort ändern:</strong> Wenn der Code in falsche Hände gerät, ändere das WLAN-Passwort und erstelle einen neuen Code.",
                "<strong>Keine Daten hochgeladen:</strong> Dieser Generator erstellt den Code lokal in deinem Browser."
            ],
        },
    ],
    "faq": [
        ("Wie erstelle ich einen QR-Code für mein WLAN?",
         "Gib im Generator auf dieser Seite den Netzwerknamen, das Passwort und die Verschlüsselung ein und lade den QR-Code herunter. Gäste scannen ihn mit der Kamera und verbinden sich."),
        ("Ist der WLAN QR-Code Generator kostenlos?",
         "Ja. Er ist kostenlos, ohne Anmeldung und ohne Wasserzeichen."),
        ("Wird mein WLAN-Passwort irgendwo gespeichert?",
         "Nein. Der Code wird in deinem Browser erstellt und deine Eingaben werden nicht an einen Server gesendet."),
        ("Funktioniert der Code auf iPhone und Android?",
         "Ja. Aktuelle iPhones und Android-Geräte erkennen den Code mit der Kamera-App, Android ab Version 10."),
        ("Was tun, wenn mein WLAN kein Passwort hat?",
         "Wähle bei der Verschlüsselung Kein Passwort. Der Code ermöglicht dann den direkten Beitritt zum offenen Netz."),
        ("Ist ein WLAN QR-Code sicher?",
         "Er enthält das Passwort im Klartext, nur codiert. Verwende ihn am besten für ein Gast-WLAN und hänge ihn nur dort auf, wo Zugang erwünscht ist."),
        ("Der Code funktioniert nicht. Woran kann das liegen?",
         "Meist ist der Netzwerkname falsch geschrieben oder das Passwort stimmt nicht. Achte auf Groß- und Kleinschreibung und wähle die richtige Verschlüsselung."),
    ],
    "related": [
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("visitenkarte-qr-code-generator.html", "QR-Code für die Visitenkarte"),
        ("qr-code-mit-logo.html", "QR-Code mit Logo"),
    ],
}

VISITENKARTE = {**_D,
    "slug": "visitenkarte-qr-code-generator.html",
    "crumb": "QR-Code für die Visitenkarte",
    "type": "vcard",
    "tool_name": "Visitenkarte QR-Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "KONTAKT SPEICHERN",
    "empty": "Gib mindestens einen Vornamen ein, um den QR-Code zu erstellen.",
    "title": "QR-Code Visitenkarte erstellen kostenlos | vCard Generator — SmartQRCraft",
    "description": "QR-Code für die Visitenkarte erstellen: Kontaktdaten eingeben, vCard-Code herunterladen. Ein Scan speichert alles im Adressbuch. Kostenlos, ohne Anmeldung.",
    "og_title": "QR-Code Visitenkarte kostenlos erstellen | SmartQRCraft",
    "og_description": "vCard QR-Code für Visitenkarten: Kontakt mit einem Scan speichern. Kostenlos, ohne Anmeldung, PNG und SVG.",
    "h1": 'Kostenloser <span class="accent">QR-Code für die Visitenkarte</span>',
    "lead": "Trage deine Kontaktdaten ein und lade einen vCard-QR-Code herunter. Mit einem Scan landen Name, Telefonnummer und E-Mail direkt im Adressbuch.",
    "faq_h2": "Fragen zum QR-Code auf der Visitenkarte",
    "sections": [
        {
            "kind": "prose", "id": "anleitung",
            "h2": "QR-Code für die Visitenkarte erstellen",
            "p": ["Ein vCard-QR-Code enthält deine Kontaktdaten im Standardformat für digitale Visitenkarten. Das Handy des Scannenden bietet an, den Kontakt zu speichern."],
            "steps": [
                "Trage <strong>Vorname und Nachname</strong> ein. Optional ergänzt du Firma, Position, Telefon, E-Mail und Webseite.",
                "Prüfe die Daten. Tippfehler landen sonst später in fremden Adressbüchern.",
                "Wähle Farbe und Design. Ein dunkler Code auf hellem Grund scannt am besten.",
                "Lade den Code als <strong>SVG</strong> für den Druck oder als <strong>PNG</strong> für Bildschirme herunter.",
                "Scanne den Code mit dem Handy und prüfe, ob der Kontakt richtig angelegt wird."
            ],
            "after": ["Je mehr Daten du eingibst, desto dichter wird das Muster. Für Visitenkarten reichen meist Name, Firma, Telefon, E-Mail und Webseite."],
        },
        {
            "kind": "table", "h2": "vCard oder Link auf der Visitenkarte?",
            "p": ["Du kannst mit dem Code deine Kontaktdaten oder einen Link, etwa zu deiner Webseite oder deinem LinkedIn-Profil, anbieten."],
            "cols": ["", "vCard (Kontaktdaten)", "Link (Webseite oder Profil)"],
            "rows": [
                ["Was passiert beim Scan?", "Der Kontakt kann direkt gespeichert werden", "Eine Webseite oder ein Profil öffnet sich"],
                ["Vorteil", "Funktioniert offline, und du bist im Adressbuch", "Immer aktuell, mehr Inhalte möglich"],
                ["Nachteil", "Nicht änderbar nach dem Druck", "Man muss den Kontakt selbst speichern"],
                ["Geeignet für", "Vertrieb, Handwerk, Berater, Messen", "Portfolio, Kreative, Online-Präsenz"],
            ],
        },
        {
            "kind": "prose", "id": "groesse",
            "h2": "Größe und Platzierung auf der Visitenkarte",
            "p": ["Die Größe entscheidet, ob der Code sich zuverlässig scannen lässt."],
            "bullets": [
                "<strong>Mindestgröße:</strong> Empfohlen sind mindestens 2 &times; 2 cm. Optimal sind oft etwa 2,5 &times; 2,5 cm. Bei vielen Daten darf der Code gern größer sein.",
                "<strong>Ort:</strong> Die Rückseite eignet sich gut, weil dort Platz für Rand und Aufforderung ist.",
                "<strong>Aufforderung:</strong> Ein kurzer Text wie &bdquo;Kontakt speichern&ldquo; erhöht die Chance, dass der Code gescannt wird.",
                "<strong>Kontrast:</strong> Verwende dunkle Farben auf hellem Papier und vermeide Glanz-Lack direkt auf dem Code.",
                "<strong>Test vor dem Druck:</strong> Drucke einen Probeabzug und scanne ihn mit mehreren Handys."
            ],
        },
        {
            "kind": "prose", "id": "digital",
            "h2": "QR-Code als Visitenkarte: die digitale Visitenkarte",
            "p": [
                "Ein vCard-QR-Code ist selbst schon eine digitale Visitenkarte. Du musst ihn nicht auf Papier drucken: Zeig ihn auf dem Handy-Bildschirm, setz ihn in deine E-Mail-Signatur, auf dein Namensschild, deinen Messestand oder in deine Präsentation. Wer ihn scannt, speichert deinen Kontakt sofort.",
                "Tipp: Speichere den Code als Bild in deinen Fotos oder als Hintergrund auf dem Sperrbildschirm. So hast du deine Visitenkarte immer dabei, auch wenn die gedruckten Karten ausgegangen sind."
            ],
        },
        {
            "kind": "prose", "id": "drucken-lassen",
            "h2": "Visitenkarten mit QR-Code drucken lassen",
            "steps": [
                "Erstelle oben deinen Code und lade ihn als <strong>SVG</strong> oder <strong>PDF</strong> herunter. Beide sind Vektordateien und bleiben im Druck gestochen scharf.",
                "Füge den Code in dein Visitenkarten-Layout ein, zum Beispiel in Canva, bei einer Online-Druckerei oder in der Vorlage deines Grafikers. Ein Rand von einigen Millimetern um den Code muss frei bleiben.",
                "Bestelle wenn möglich einen Probedruck oder eine kleine Auflage und scanne den Code mit zwei Handys.",
                "Drucke erst dann die volle Auflage."
            ],
            "after": [
                "Mehr zu Dateiformaten, Größen und Material steht im Ratgeber <a href=\"qr-code-drucken.html\">QR-Code drucken</a>. Wie du den Code in Canva einsetzt, zeigt <a href=\"qr-code-in-canva.html\">QR-Code in Canva</a>."
            ],
        },
        {
            "kind": "prose", "id": "datenschutz",
            "h2": "Datenschutz bei Kontaktdaten im QR-Code",
            "p": [
                "Ein vCard-QR-Code enthält deine Daten im Klartext. Jeder, der die Karte oder den Code hat, kann sie auslesen. Nimm deshalb nur Angaben auf, die du auch auf der gedruckten Karte weitergeben würdest, und verzichte auf private Nummern, wenn du sie nicht teilen möchtest.",
                "Dieser Generator erstellt den Code lokal in deinem Browser. Deine Eingaben werden nicht an unseren Server gesendet."
            ],
        },
    ],
    "faq": [
        ("Wie erstelle ich einen QR-Code für meine Visitenkarte?",
         "Trage deine Kontaktdaten im Generator auf dieser Seite ein, wähle ein Design und lade den vCard-QR-Code herunter. Drucke ihn dann auf deine Visitenkarte."),
        ("Ist der QR-Code für Visitenkarten kostenlos?",
         "Ja. Der Generator ist kostenlos, ohne Anmeldung und ohne Wasserzeichen."),
        ("Wie groß muss der QR-Code auf der Visitenkarte sein?",
         "Empfohlen sind mindestens 2 × 2 cm, gut sind etwa 2,5 × 2,5 cm. Je mehr Daten der Code enthält, desto größer sollte er gedruckt werden."),
        ("Kann ich die Daten nach dem Druck ändern?",
         "Nein. Der Code ist statisch. Wenn sich Telefonnummer oder E-Mail ändern, musst du einen neuen Code erstellen und ersetzen."),
        ("Funktioniert der vCard-Code auf iPhone und Android?",
         "Ja. Die Kamera-App aktueller Geräte erkennt den Code und bietet an, den Kontakt zu speichern."),
        ("Soll ich vCard oder Link auf die Visitenkarte drucken?",
         "Eine vCard speichert deine Daten direkt im Adressbuch. Ein Link zeigt dagegen immer aktuelle Inhalte, etwa dein Profil. Wähle die vCard, wenn du gefunden und angerufen werden willst, und den Link, wenn du vor allem Inhalte zeigen möchtest."),
        ("Kann ich einen QR-Code als Visitenkarte nutzen, ohne sie zu drucken?",
         "Ja. Der vCard-QR-Code ist eine digitale Visitenkarte. Zeig ihn auf dem Handy, in der E-Mail-Signatur oder auf dem Namensschild."),
        ("Wo lasse ich Visitenkarten mit QR-Code drucken?",
         "Bei jeder Druckerei oder Online-Druckerei. Lade den Code als SVG oder PDF herunter, setze ihn ins Layout und bestelle zuerst einen Probedruck."),
        ("Was ist ein vCard-QR-Code?",
         "Ein QR-Code, der Kontaktdaten im Standardformat vCard enthält. Handys erkennen ihn und bieten an, den Kontakt zu speichern."),
    ],
    "related": [
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("qr-code-mit-logo.html", "QR-Code mit Logo erstellen"),
        ("wlan-qr-code-generator.html", "WLAN QR-Code Generator"),
    ],
}

LOGO = {**_D,
    "slug": "qr-code-mit-logo.html",
    "crumb": "QR-Code mit Logo",
    "type": "url",
    "tool_name": "QR-Code Generator mit Logo",
    "field_label": "Link für deinen QR-Code",
    "field_placeholder": "https://deine-marke.de",
    "cta": "JETZT SCANNEN",
    "empty": "Gib einen Link ein und aktiviere dann das Logo in der Mitte.",
    "title": "QR-Code mit Logo erstellen kostenlos | Logo in der Mitte — SmartQRCraft",
    "description": "QR-Code mit Logo erstellen: Link eingeben, Logo hochladen, als PNG oder SVG herunterladen. Kostenlos, ohne Anmeldung, mit automatisch angepasster Fehlerkorrektur.",
    "og_title": "QR-Code mit Logo erstellen | SmartQRCraft",
    "og_description": "Setze dein Logo in die Mitte eines QR-Codes. Kostenlos, ohne Anmeldung, PNG und SVG.",
    "h1": 'Kostenlos <span class="accent">QR-Code mit Logo</span> erstellen',
    "lead": "Gib deinen Link ein, aktiviere das Logo in der Mitte und lade dein Bild hoch. So entsteht ein QR-Code im Look deiner Marke, der trotzdem zuverlässig scannt.",
    "faq_h2": "Fragen zum QR-Code mit Logo",
    "sections": [
        {
            "kind": "prose", "id": "anleitung",
            "h2": "So fügst du ein Logo in den QR-Code ein",
            "p": ["Du brauchst dafür keine Grafiksoftware."],
            "steps": [
                "Gib im Feld oben den Link ein, den der Code öffnen soll.",
                "Aktiviere <strong>Logo in der Mitte</strong> und lade ein quadratisches PNG oder JPG hoch. Ein Logo mit einfarbigem oder weißem Hintergrund funktioniert am besten.",
                "Wähle Farbe und Stil. Dunkel auf hell ist am sichersten.",
                "Lade den Code als PNG für Bildschirme oder als SVG für den Druck herunter.",
                "Teste den Code mit mindestens zwei Handys."
            ],
        },
        {
            "kind": "prose", "id": "fehlerkorrektur",
            "h2": "Warum ein QR-Code mit Logo noch funktioniert",
            "p": [
                "QR-Codes enthalten eine eingebaute Fehlerkorrektur. Sie speichert zusätzliche Daten, mit denen ein Scanner verdeckte oder beschädigte Bereiche rekonstruieren kann, etwa bei Kratzern oder einem Logo.",
                "Sobald du ein Logo aktivierst, erhöht dieser Generator die Fehlerkorrektur automatisch. Es gibt aber eine Grenze: Ein kleines Logo scannt zuverlässig, ein großes kann den Code unlesbar machen."
            ],
        },
        {
            "kind": "table", "h2": "Logo-Größe und Scanbarkeit",
            "p": ["Das sind Richtwerte, keine Garantie. Teste die fertige Datei immer."],
            "cols": ["Logo-Größe", "Was du erwarten kannst"],
            "rows": [
                ["Klein (deutlich unter einem Fünftel der Code-Breite)", "Scannt in den meisten Fällen zuverlässig"],
                ["Mittel (etwa ein Fünftel)", "Meist in Ordnung bei sauberem Druck, riskanter auf Bildschirmen oder abgenutzten Flächen"],
                ["Groß", "Hohes Risiko, dass der Code nicht gelesen wird, besonders auf älteren Handys"],
            ],
        },
        {
            "kind": "prose", "id": "tipps",
            "h2": "Tipps für einen Marken-QR-Code",
            "p": ["Dein Design sollte das Scannen nicht behindern."],
            "bullets": [
                "<strong>Logo klein und mittig halten.</strong> Einfache Formen wirken besser als detailreiche Grafiken.",
                "<strong>Starken Kontrast wählen.</strong> Vermeide blasse Markenfarben und helle Codes auf dunklem Grund.",
                "<strong>Kurzen Link verwenden.</strong> Ein kürzerer Inhalt ergibt ein einfacheres Muster.",
                "<strong>Rand freilassen.</strong> Rund um den Code sollte ein leerer Rand bleiben.",
                "<strong>Auf dem echten Material testen,</strong> also auf Flyer, Schild oder Verpackung und nicht nur am Bildschirm."
            ],
        },
    ],
    "faq": [
        ("Wie füge ich ein Logo in einen QR-Code ein?",
         "Gib im Generator auf dieser Seite deinen Link ein, aktiviere Logo in der Mitte und lade ein quadratisches PNG oder JPG hoch. Danach lädst du den Code herunter."),
        ("Verhindert ein Logo das Scannen?",
         "Nicht, wenn das Logo klein ist und der Code genug Fehlerkorrektur hat. Der Generator erhöht sie beim Aktivieren eines Logos automatisch. Große Logos können trotzdem Probleme machen, deshalb immer testen."),
        ("Wie groß darf das Logo sein?",
         "Halte es deutlich unter einem Fünftel der Code-Breite, wenn möglich. Kleinere Logos scannen zuverlässiger, vor allem im Druck und auf älteren Handys."),
        ("Welche Datei soll ich als Logo hochladen?",
         "Ein quadratisches PNG oder JPG. Ein Logo mit einfarbigem oder weißem Hintergrund eignet sich am besten."),
        ("Ist der QR-Code mit Logo kostenlos?",
         "Ja. Er ist kostenlos, ohne Anmeldung und ohne Wasserzeichen, und wird lokal in deinem Browser erstellt."),
        ("PNG oder SVG, was ist besser?",
         "PNG für Bildschirme und Dokumente, SVG für den Druck, weil es in jeder Größe scharf bleibt."),
    ],
    "related": [
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("visitenkarte-qr-code-generator.html", "QR-Code für die Visitenkarte"),
        ("pdf-in-qr-code.html", "PDF in QR-Code umwandeln"),
    ],
}

PDF_DE = {**_D,
    "slug": "pdf-in-qr-code.html",
    "crumb": "PDF in QR-Code",
    "type": "pdf",
    "tool_name": "PDF in QR-Code umwandeln",
    "field_label": "Link zu deinem PDF",
    "field_placeholder": "https://beispiel.de/broschuere.pdf",
    "cta": "PDF ÖFFNEN",
    "empty": "Gib den Link zu deinem PDF ein, um den QR-Code zu erstellen.",
    "title": "PDF in QR-Code umwandeln kostenlos | QR-Code für PDF — SmartQRCraft",
    "description": "PDF in QR-Code umwandeln: Link zum PDF eingeben, QR-Code als PNG oder SVG herunterladen. Kostenlos, ohne Anmeldung. Mit Tipps für Google Drive und Dropbox.",
    "og_title": "PDF in QR-Code umwandeln | SmartQRCraft",
    "og_description": "QR-Code für ein PDF erstellen: kostenlos, ohne Anmeldung, PNG und SVG.",
    "h1": 'Kostenlos <span class="accent">PDF in QR-Code</span> umwandeln',
    "lead": "Gib den Link zu deinem PDF ein und lade den QR-Code herunter. Beim Scannen öffnet sich das Dokument auf dem Handy.",
    "faq_h2": "Fragen zum QR-Code für PDF",
    "sections": [
        {
            "kind": "prose", "id": "funktion",
            "h2": "Wie funktioniert ein QR-Code für ein PDF?",
            "p": [
                "Ein QR-Code kann kein ganzes PDF enthalten. Er speichert nur eine Webadresse, und das PDF liegt online unter dieser Adresse. Beim Scannen öffnet das Handy den Link und zeigt das Dokument im Browser oder PDF-Betrachter.",
                "Die Umwandlung besteht also aus zwei Schritten: das PDF ins Internet stellen und den Link in einen QR-Code umwandeln. Dieses Tool übernimmt den zweiten Schritt. Es lädt dein PDF nicht hoch und speichert es nicht."
            ],
        },
        {
            "kind": "prose", "id": "anleitung",
            "h2": "PDF in QR-Code umwandeln: Anleitung",
            "p": ["Sechs kurze Schritte."],
            "steps": [
                "<strong>PDF online stellen:</strong> Lade es auf deine Webseite oder in einen Cloud-Speicher wie Google Drive, Dropbox oder OneDrive hoch.",
                "<strong>Link freigeben:</strong> Stelle die Freigabe auf &bdquo;jeder mit dem Link kann ansehen&ldquo;, damit niemand sich anmelden muss.",
                "<strong>Link kopieren.</strong>",
                "<strong>Link oben einfügen.</strong> Der QR-Code erscheint sofort.",
                "<strong>Gestalten und herunterladen:</strong> PNG für Bildschirme, SVG für den Druck.",
                "<strong>Testen:</strong> Scanne den Code mit einem Handy, das nicht bei deinen Konten angemeldet ist."
            ],
        },
        {
            "kind": "table", "h2": "Wo soll ich das PDF ablegen?",
            "p": ["Jeder Ort, der dem Dokument einen stabilen, öffentlichen Link gibt, funktioniert."],
            "cols": ["Option", "Geeignet für", "Darauf achten"],
            "rows": [
                ["Eigene Webseite", "Dauerhafte Links unter deiner Kontrolle", "Du brauchst Zugriff zum Hochladen"],
                ["Google Drive", "Schnell und kostenlos", "Freigabe auf jeder mit dem Link setzen"],
                ["Dropbox oder OneDrive", "Einfaches Teilen und Ersetzen", "Link muss öffentlich sein und darf nicht ablaufen"],
                ["Andere Dateihoster", "Einmalige Dateien", "Speicherdauer und Datenschutz des Anbieters prüfen"],
            ],
        },
        {
            "kind": "prose", "id": "aktualisieren",
            "h2": "PDF später aktualisieren",
            "p": ["Weil der QR-Code den Link enthält und nicht die Datei, kannst du das Dokument tauschen, ohne neu zu drucken. Das gelingt aber nur, wenn der Link gleich bleibt."],
            "bullets": [
                "Ersetze die Datei unter derselben Adresse, statt eine neue mit neuem Link hochzuladen.",
                "Ändert sich der Link, brauchst du einen neuen QR-Code und musst gedruckte Codes austauschen."
            ],
        },
        {
            "kind": "prose", "id": "datenschutz",
            "h2": "Datenschutz und öffentliche Links",
            "p": [
                "Jeder, der den Link kennt oder den Code scannt, kann das PDF öffnen. Lege deshalb keine vertraulichen Dokumente oder Dateien mit personenbezogenen Daten hinter einen öffentlichen Link. Wenn du Cloud-Dienste nutzt, prüfe außerdem deren Datenschutzbedingungen."
            ],
        },
    ],
    "faq": [
        ("Wie wandle ich ein PDF in einen QR-Code um?",
         "Lade das PDF online hoch, kopiere den öffentlichen Link und füge ihn im Generator auf dieser Seite ein. Den QR-Code lädst du dann herunter."),
        ("Lädt dieses Tool mein PDF hoch?",
         "Nein. Es wandelt nur einen Link in einen QR-Code um, und deine Eingaben verlassen den Browser nicht. Das PDF hostest du selbst, etwa auf deiner Webseite oder in einem Cloud-Speicher."),
        ("Kann ich einen Google-Drive-Link verwenden?",
         "Ja. Stelle die Freigabe auf jeder mit dem Link kann ansehen, kopiere den Link und füge ihn hier ein. Teste ihn mit einem Handy ohne Google-Anmeldung."),
        ("Ist das kostenlos?",
         "Ja. Der Generator ist kostenlos, ohne Anmeldung, ohne Wasserzeichen und ohne Ablaufdatum."),
        ("Kann ich das PDF nach dem Druck austauschen?",
         "Ja, wenn du die Datei unter demselben Link ersetzt. Ändert sich der Link, funktioniert der alte QR-Code nicht mehr und du brauchst einen neuen."),
        ("Gibt es eine Größenbegrenzung für das PDF?",
         "Nicht in diesem Tool, weil es keine Dateien hochlädt. Die Grenzen hängen vom Ort ab, an dem du das PDF speicherst. Kleinere Dateien laden schneller."),
    ],
    "related": [
        ("index.html#generator", "QR-Code kostenlos erstellen"),
        ("qr-code-mit-logo.html", "QR-Code mit Logo"),
        ("visitenkarte-qr-code-generator.html", "QR-Code für die Visitenkarte"),
    ],
}

IMPRESSUM = {**_D,
    "slug": "impressum.html",
    "crumb": "Impressum",
    "static": True,
    "title": "Impressum — SmartQRCraft",
    "description": "Impressum von SmartQRCraft.",
    "h1": "Impressum",
    "sections": [
        {
            "kind": "prose",
            "h2": "Angaben gemäß § 5 DDG",
            "p": [
                "<strong>[PLATZHALTER: bitte vor der Veröffentlichung ausfüllen und rechtlich prüfen lassen]</strong>",
                "[Vor- und Nachname bzw. Firmenname mit Rechtsform]<br>[Straße und Hausnummer]<br>[PLZ und Ort]<br>[Land]",
                "<strong>Kontakt:</strong><br>E-Mail: [E-Mail-Adresse]<br>Telefon (optional): [Telefonnummer]",
                "[Falls vorhanden: Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE...]",
                "[Falls vorhanden: Vertretungsberechtigte Person, Handelsregister und Registernummer]"
            ],
        },
    ],
}

DATENSCHUTZ = {**_D,
    "slug": "datenschutz.html",
    "crumb": "Datenschutz",
    "static": True,
    "title": "Datenschutzerklärung — SmartQRCraft",
    "description": "Datenschutzerklärung von SmartQRCraft.",
    "h1": "Datenschutzerklärung",
    "sections": [
        {
            "kind": "prose",
            "h2": "Hinweis zu diesem Entwurf",
            "p": [
                "<strong>[PLATZHALTER: Dies ist ein Entwurf. Bitte Angaben ergänzen und die Erklärung vor der Veröffentlichung rechtlich prüfen lassen.]</strong>"
            ],
        },
        {
            "kind": "prose",
            "h2": "1. Verantwortlicher",
            "p": ["Verantwortlich für die Datenverarbeitung auf dieser Webseite ist die im <a href=\"impressum.html\">Impressum</a> genannte Person."],
        },
        {
            "kind": "prose",
            "h2": "2. QR-Codes werden lokal erstellt",
            "p": [
                "Der QR-Code Generator arbeitet vollständig in deinem Browser. Die Inhalte, die du eingibst, etwa Links, WLAN-Zugangsdaten oder Kontaktdaten, werden nicht an unseren Server übertragen und nicht gespeichert. Hochgeladene Logos werden nur lokal im Browser verwendet."
            ],
        },
        {
            "kind": "prose",
            "h2": "3. Server-Logfiles",
            "p": [
                "Beim Aufruf der Webseite verarbeitet der Hosting-Anbieter technisch notwendige Daten, zum Beispiel IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browsertyp, um die Seite auszuliefern und die Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. [Hosting-Anbieter, Speicherdauer und ggf. Auftragsverarbeitung ergänzen.]"
            ],
        },
        {
            "kind": "prose",
            "h2": "4. Cookies, Analyse und Schriftarten",
            "p": [
                "Diese Webseite setzt in der vorliegenden Form keine Tracking- oder Analyse-Cookies ein und bindet keine externen Schriftarten ein. [Falls du später Analyse-Tools, Werbung oder externe Inhalte einbindest, musst du diesen Abschnitt und ggf. ein Einwilligungsverfahren anpassen.]"
            ],
        },
        {
            "kind": "prose",
            "h2": "5. Kontakt per E-Mail",
            "p": [
                "Wenn du uns per E-Mail schreibst, verarbeiten wir deine Angaben zur Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO bzw. lit. b bei vertraglichen Anfragen. [Speicherdauer ergänzen.]"
            ],
        },
        {
            "kind": "prose",
            "h2": "6. Deine Rechte",
            "p": [
                "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren. [Zuständige Aufsichtsbehörde ergänzen.]"
            ],
        },
    ],
}

DE_PAGES = [INDEX, WLAN, VISITENKARTE, LOGO, PDF_DE, IMPRESSUM, DATENSCHUTZ]
