"""Content for the generated landing pages (USA / smartqrcraft.com)."""

LINKEDIN = {
    "slug": "linkedin-qr-code-generator.html",
    "crumb": "LinkedIn QR Code Generator",
    "type": "social",
    "tool_name": "LinkedIn QR Code Generator",
    "field_label": "Your LinkedIn profile or company page URL",
    "field_placeholder": "linkedin.com/in/your-name",
    "cta": "CONNECT ON LINKEDIN",
    "empty": "Paste your LinkedIn URL to generate the QR code.",
    "title": "Free LinkedIn QR Code Generator | Profile & Company Page QR — SmartQRCraft",
    "description": "Make a free LinkedIn QR code for your profile or company page. Add colors and a logo, download PNG or SVG. No signup, no expiry. Or find your in-app code.",
    "og_title": "Free LinkedIn QR Code Generator | SmartQRCraft",
    "og_description": "Turn your LinkedIn profile or company page into a custom QR code. Free, no signup, PNG or SVG download.",
    "h1": 'Free <span class="accent">LinkedIn QR Code</span> Generator',
    "lead": "Paste your LinkedIn profile or company page link, style the code, and download it. Anyone who scans it lands on your page and can connect in a few taps.",
    "faq_h2": "LinkedIn QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "find-linkedin-qr-code",
            "h2": "How to find your LinkedIn QR code in the app",
            "p": [
                "LinkedIn already gives every member a personal QR code inside the mobile app. It only works for personal profiles, and the app has to be installed on your phone. These steps match LinkedIn's own help page, though the menu labels can shift slightly between app versions."
            ],
            "steps": [
                "Open the LinkedIn app and tap the search bar at the top of the home screen.",
                "Tap the QR code icon at the right end of the search bar.",
                "Open the <strong>My code</strong> tab. Your personal QR code appears on screen.",
                "Tap <strong>Share my code</strong> or <strong>Save to photos</strong> (Android shows a save-to-gallery option)."
            ],
            "after": [
                "To scan someone else's code, open the same screen and choose the <strong>Scan</strong> tab, or import a saved image with the scan-from-photos option. The regular phone camera also opens LinkedIn codes on most current phones."
            ],
        },
        {
            "kind": "prose", "id": "why-custom",
            "h2": "Why make a custom LinkedIn QR code instead?",
            "p": [
                "The in-app code is fine for showing your screen at an event. It falls short when you want to put a code on paper or a slide. It is a screenshot you cannot recolor, it cannot point to a company page, and it lives inside the app, so you cannot generate it from a laptop.",
                "A custom code from a generator fixes those gaps. You paste any LinkedIn URL, choose your colors, add a logo or a short call to action, and download a print-ready PNG or a scalable SVG. The code is static, meaning the link is stored inside the pattern itself. There is no account, no expiry date, and no tracking layer between the scan and your page."
            ],
        },
        {
            "kind": "table", "h2": "In-app LinkedIn code vs. a custom QR code",
            "cols": ["", "LinkedIn app code", "Custom code (this tool)"],
            "rows": [
                ["Works for", "Your personal profile only", "Profile, company page, showcase page, post or job link"],
                ["Where you get it", "Mobile app only", "Any browser, phone or desktop"],
                ["Design", "Fixed LinkedIn styling", "Your colors, dot and corner styles, logo, call-to-action frame"],
                ["Best format for print", "Screenshot (PNG)", "PNG and vector SVG"],
                ["Link changes", "Always tied to your account", "Fixed once printed; re-generate if the URL changes"],
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to create a LinkedIn QR code",
            "p": ["It takes about a minute and needs nothing but your link."],
            "steps": [
                "Open LinkedIn and copy your profile URL. On a computer, view your profile and copy the address bar. It looks like <code>linkedin.com/in/your-name</code>. For a company, use the <code>linkedin.com/company/your-company</code> address.",
                "Paste it into the field above. The QR code appears instantly.",
                "Pick a color and style. Keep strong contrast: a dark code on a light background scans most reliably.",
                "Optional: turn on the frame to add text like &quot;Connect on LinkedIn&quot;, or add a square logo.",
                "Download the PNG for documents and screens, or the SVG for print and signage.",
                "<strong>Test it</strong> with your phone camera before it goes anywhere public."
            ],
            "after": [
                "Tip: if you have not customized your LinkedIn URL, consider doing that first (Edit public profile &amp; URL in your profile settings). A shorter, cleaner link also makes a simpler, easier-to-scan code, and changing it later would break any code you already printed."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Smart places to put a LinkedIn QR code",
            "cards": [
                ("Business cards &amp; badges", "A small code on the back of a card or a conference badge lets people connect while you are still talking."),
                ("Resume &amp; CV", "Add it to the header or footer of a PDF or printed resume so recruiters reach your full profile in one scan."),
                ("Email signature", "Handy for people reading on a laptop who want to open your profile on their phone."),
                ("Slides &amp; booths", "Put it on your last slide or booth banner. Make it large enough to scan from a few feet away."),
                ("Company page", "Print a company-page code on brochures, storefronts and event signs to grow your follower count."),
                ("Job postings", "Point a recruiting flyer or campus poster at your careers page or a specific job link."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for a LinkedIn QR code that actually gets scanned",
            "p": ["A code that looks good but fails in the real world is worse than no code. A few habits prevent that."],
            "bullets": [
                "<strong>Size:</strong> keep printed codes at least about 1 inch (2.5 cm) wide, and larger for anything read from a distance.",
                "<strong>Contrast:</strong> use a dark code on a light background. Avoid light-on-dark inversions and low-contrast brand colors.",
                "<strong>Logo:</strong> keep any center logo small. This tool raises error correction automatically when you add one.",
                "<strong>Say what it does:</strong> a line like &quot;Scan to connect on LinkedIn&quot; beats a bare code.",
                "<strong>Check the destination:</strong> scan the final file on both an iPhone and an Android phone before printing."
            ],
        },
    ],
    "faq": [
        ("How do I get my LinkedIn QR code?",
         "Open the LinkedIn mobile app, tap the search bar, tap the QR code icon, and choose the My code tab. From there you can share the code or save it to your photos. For a code you can restyle or use for a company page, paste your LinkedIn URL into the generator on this page."),
        ("Is the LinkedIn QR code generator free?",
         "Yes. Generating, styling and downloading a LinkedIn QR code here is free, with no signup and no watermark."),
        ("Can I make a QR code for a LinkedIn company page?",
         "Yes. Paste the company page address, which looks like linkedin.com/company/your-company, and the code will open that page. LinkedIn's built-in app code only covers personal profiles."),
        ("Does a LinkedIn QR code expire?",
         "Not a static code like the ones made here. It keeps working as long as the LinkedIn URL it points to still works. If you change your custom profile URL, the old link stops working and you should generate a new code."),
        ("Can I add a LinkedIn QR code to my resume?",
         "Yes. Download the PNG, place it in your resume header or footer, and keep it around 1 inch (2.5 cm) square or larger. Scan the final PDF with your phone to confirm it opens the right profile."),
        ("Does the LinkedIn QR code work on iPhone and Android?",
         "Yes. The code stores a normal web link, so the built-in camera on current iPhone and Android phones opens it. Scanning inside the LinkedIn app also works."),
        ("Can I track how many people scan my LinkedIn QR code?",
         "Not with a static code. It links straight to LinkedIn with no tracking layer, which keeps it free and permanent. LinkedIn's own profile-view insights can show you visits to your profile."),
    ],
    "related": [
        ("vcard-qr-code-generator.html", "vCard QR code generator for digital business cards"),
        ("index.html#generator", "Free QR code generator for any link, text or contact"),
        ("wifi-qr-code-generator.html", "WiFi QR code generator"),
    ],
}

PAGES = [LINKEDIN]
