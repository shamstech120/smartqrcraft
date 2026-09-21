"""More India (smartqrcraft.in) landing pages."""

_D = {"domain": "smartqrcraft.in", "lang": "en-IN"}

LOCATION = {**_D,
    "slug": "location-qr-code-generator.html",
    "crumb": "Location QR Code Generator",
    "type": "location",
    "tool_name": "Location QR Code Generator",
    "field_label": "Google Maps link or coordinates",
    "field_placeholder": "https://maps.app.goo.gl/... or 28.6139,77.2090",
    "cta": "FIND US HERE",
    "empty": "Paste a Google Maps link or coordinates to generate the QR code.",
    "title": "Free Location QR Code Generator | Google Maps QR Code India — SmartQRCraft",
    "description": "Make a free location QR code for your shop, office or event. Paste a Google Maps link or coordinates and download PNG or SVG. Opens in Maps on scan. No signup.",
    "og_title": "Free Location QR Code Generator | SmartQRCraft India",
    "og_description": "Turn a Google Maps link or coordinates into a QR code that opens directions. Free, no signup.",
    "h1": 'Free <span class="accent">Location QR Code</span> Generator',
    "lead": "Paste a Google Maps link or a latitude and longitude, and get a QR code that opens your exact location. Perfect for shop boards, visiting cards, invitations and delivery slips.",
    "faq_h2": "Location QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to make a location QR code",
            "p": ["You can use either a Google Maps link or plain coordinates. A Maps link is usually easier and shows your business name and photos."],
            "steps": [
                "Open Google Maps on your phone or computer and search for your shop, office or venue.",
                "Tap <strong>Share</strong> and copy the link. Or long-press the exact spot on the map to drop a pin and copy the coordinates shown at the top.",
                "Paste the link or coordinates into the field above.",
                "Choose colors, add a logo if you like, and download the PNG or SVG.",
                "Scan it with your phone to check it opens the correct pin, not just the general area."
            ],
        },
        {
            "kind": "table", "h2": "Maps link or coordinates?",
            "p": ["Both open a map on the scanner's phone. They behave a little differently."],
            "cols": ["", "Google Maps link", "Coordinates (lat, long)"],
            "rows": [
                ["Shows business name and reviews", "Yes, if your place is listed", "No, only a pin"],
                ["Works without a listing", "Only if you drop a pin", "Yes, any point on earth"],
                ["Opens in", "Google Maps or the browser", "Google Maps or the browser"],
                ["Best for", "Shops, clinics, offices", "Event venues, farms, plots, sites without an address"],
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a location QR code helps",
            "cards": [
                ("Shop boards &amp; banners", "Passers-by scan and get directions without typing your shop name."),
                ("Visiting cards", "Add it to the back of your card so clients find your office easily."),
                ("Wedding &amp; event invitations", "Print it on a card or share the image so guests reach the venue."),
                ("Delivery &amp; parcel slips", "Help couriers and customers reach the exact gate or landmark."),
                ("Real estate &amp; plots", "Mark a plot or site that has no proper street address."),
                ("Tourism &amp; homestays", "Put it on a welcome card so guests find you without repeated phone calls."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for a location QR code that guides people correctly",
            "p": ["A code that drops people at the wrong gate is worse than no code."],
            "bullets": [
                "<strong>Drop the pin at the entrance,</strong> not the middle of the building or a nearby landmark.",
                "<strong>Test on foot or by car</strong> and see what the navigation app suggests from a distance.",
                "<strong>Use a full Maps link</strong> rather than a shortened one if you can. It is easier to check before printing.",
                "<strong>Add a line of text</strong> like &quot;Scan for directions&quot; and your landmark or address as a backup.",
                "<strong>Make it large enough</strong> for the distance. Codes on a board scanned from a few feet away should be much larger than a card code."
            ],
        },
    ],
    "faq": [
        ("How do I create a QR code for a Google Maps location?",
         "Open Google Maps, find your place, tap Share and copy the link. Paste it into the generator on this page and download the QR code. Scanning it opens the location in a map app."),
        ("Can I make a location QR code with latitude and longitude?",
         "Yes. Enter the coordinates as two numbers separated by a comma, for example 28.6139,77.2090. The code will open that point in Google Maps on the scanner's phone."),
        ("Is the location QR code free?",
         "Yes. It is free with no signup and no watermark, and the code is generated in your browser."),
        ("Will it work on iPhone and Android?",
         "Yes. A Maps link opens in a browser or map app on both. Coordinate-based codes open the point in Google Maps or the browser."),
        ("Does the QR code update if my shop moves?",
         "No. A static code keeps pointing to the original location. If you move, create and print a new code."),
        ("How do I share a location that has no address?",
         "Drop a pin on the exact spot in Google Maps and copy the coordinates, or share the pin link. Then paste it here."),
    ],
    "related": [
        ("wifi-qr-code-generator.html", "WiFi QR code generator"),
        ("whatsapp-qr-code-generator.html", "WhatsApp QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

WHATSAPP = {**_D,
    "slug": "whatsapp-qr-code-generator.html",
    "crumb": "WhatsApp QR Code Generator",
    "type": "whatsapp",
    "tool_name": "WhatsApp QR Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "CHAT ON WHATSAPP",
    "empty": "Enter a WhatsApp number with country code to generate the QR code.",
    "title": "Free WhatsApp QR Code Generator | Chat Link QR India — SmartQRCraft",
    "description": "Make a free WhatsApp QR code that opens a chat with your number, with an optional pre-filled message. Download PNG or SVG for your shop or business. No signup.",
    "og_title": "Free WhatsApp QR Code Generator | SmartQRCraft India",
    "og_description": "Create a QR code that opens a WhatsApp chat instantly. Free, no signup, PNG or SVG.",
    "h1": 'Free <span class="accent">WhatsApp QR Code</span> Generator',
    "lead": "Enter your WhatsApp number and an optional starting message. Customers scan the code and land in a chat with you, with no need to save your number first.",
    "faq_h2": "WhatsApp QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "How a WhatsApp QR code works",
            "p": [
                "The code stores a wa.me link, which is WhatsApp's official click-to-chat address. When someone scans it, WhatsApp opens a chat with your number. If you added a message, it appears in their text box ready to send.",
                "The person does not need to add you to their contacts, and you do not need to share your number in plain text. This works with both a personal WhatsApp account and the WhatsApp Business app."
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to create a WhatsApp QR code",
            "p": ["Number format matters, so read step 2 carefully."],
            "steps": [
                "Decide which number customers should message. It must be registered on WhatsApp.",
                "Enter the number with the country code and digits only, no plus sign, spaces or dashes. For an Indian number, <code>919876543210</code> means +91 98765 43210.",
                "Optional: add a pre-filled message such as &quot;Hi, I saw your QR code and want to order&quot;.",
                "Choose a color, add the frame text you want, and download the PNG or SVG.",
                "Scan it from another phone to confirm the chat opens with the right number."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where to put a WhatsApp QR code",
            "cards": [
                ("Shop counters &amp; boards", "Let customers place orders or ask questions without calling."),
                ("Product packaging", "Add a code for support, reorders or feedback."),
                ("Catalogues &amp; price lists", "Link a printed catalogue straight to your ordering chat."),
                ("Visiting cards", "Give clients a one-scan way to message you."),
                ("Ads &amp; posters", "Turn a poster into a lead source. Use a pre-filled message to identify the campaign."),
                ("Home services &amp; salons", "Handle bookings and enquiries in one chat instead of phone tag."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for using WhatsApp QR codes for business",
            "p": ["A few habits keep the chat useful for both sides."],
            "bullets": [
                "<strong>Use a pre-filled message per campaign,</strong> for example &quot;Poster A: I want the 2BHK details&quot;, so you know where the chat came from.",
                "<strong>Answer during stated hours</strong> and say those hours on the poster so people know what to expect.",
                "<strong>Consider WhatsApp Business</strong> for a business profile, quick replies and labels.",
                "<strong>Do not put a personal number on a public code</strong> unless you are comfortable receiving messages from strangers.",
                "<strong>Print at least about 1 inch (2.5 cm)</strong> wide, larger on boards, and test before printing."
            ],
        },
    ],
    "faq": [
        ("How do I make a WhatsApp QR code?",
         "Enter your WhatsApp number with the country code (digits only) and an optional message in the generator on this page, then download the QR code. Scanning it opens a chat with you."),
        ("How do I write my number for a WhatsApp link?",
         "Use the full international format with digits only. For India, 91 followed by your 10-digit mobile number, such as 919876543210. Do not include a plus sign, spaces or dashes."),
        ("Is the WhatsApp QR code generator free?",
         "Yes. It is free, with no signup and no watermark, and it is generated in your browser."),
        ("Does it work with WhatsApp Business?",
         "Yes. The link opens a chat with any number registered on WhatsApp or WhatsApp Business."),
        ("Can I add a pre-filled message?",
         "Yes. Type it in the optional message field and it will appear in the customer's chat box, ready to send."),
        ("Will the QR code stop working if I change my number?",
         "Yes. The number is stored inside the code, so if you switch numbers you will need a new QR code."),
    ],
    "related": [
        ("upi-qr-code-generator.html", "UPI QR code generator"),
        ("location-qr-code-generator.html", "Location QR code generator"),
        ("vcard-qr-code-generator.html", "vCard QR code generator"),
    ],
}

LINKEDIN_IN = {**_D,
    "slug": "linkedin-qr-code-generator.html",
    "crumb": "LinkedIn QR Code Generator",
    "type": "social",
    "tool_name": "LinkedIn QR Code Generator",
    "field_label": "Your LinkedIn profile or company page URL",
    "field_placeholder": "linkedin.com/in/your-name",
    "cta": "CONNECT ON LINKEDIN",
    "empty": "Paste your LinkedIn URL to generate the QR code.",
    "title": "Free LinkedIn QR Code Generator India | Profile QR for Resume — SmartQRCraft",
    "description": "Free LinkedIn QR code generator for students, job seekers and professionals in India. Paste your profile link, add colors, and download PNG or SVG. No signup.",
    "og_title": "Free LinkedIn QR Code Generator | SmartQRCraft India",
    "og_description": "Turn your LinkedIn profile into a QR code for your resume, visiting card and placement forms. Free, no signup.",
    "h1": 'Free <span class="accent">LinkedIn QR Code</span> Generator',
    "lead": "Paste your LinkedIn profile or company page link and get a QR code for your resume, visiting card or campus placement forms. Recruiters scan and land on your profile.",
    "faq_h2": "LinkedIn QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "find-linkedin-qr-code",
            "h2": "Find your LinkedIn QR code in the app",
            "p": ["LinkedIn gives every member a personal QR code in the mobile app, for personal profiles only. Menu labels can change slightly with app updates."],
            "steps": [
                "Open the LinkedIn app and tap the search bar at the top.",
                "Tap the QR code icon at the right end of the search bar.",
                "Open the <strong>My code</strong> tab to see your code.",
                "Use <strong>Share my code</strong> or <strong>Save to photos</strong> (Android has a save-to-gallery option)."
            ],
        },
        {
            "kind": "prose", "id": "why-custom",
            "h2": "Why make a custom code for your resume?",
            "p": [
                "A screenshot of the in-app code looks fine on a phone but loses quality in a printed resume or a placement brochure. A custom code gives you a clean PNG or vector SVG that stays sharp at any size, in colors that suit your resume design.",
                "It also works for company pages, so startups and small businesses can print a code that leads to their LinkedIn page, something the personal in-app code cannot do."
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to create a LinkedIn QR code",
            "p": ["It takes a minute."],
            "steps": [
                "Copy your LinkedIn address. It looks like <code>linkedin.com/in/your-name</code> for people or <code>linkedin.com/company/your-company</code> for companies.",
                "Paste it into the field above.",
                "Pick a dark color on a light background for the best scan reliability.",
                "Download the PNG for a Word or PDF resume, or the SVG for print.",
                "Scan it with your phone before you send or print your resume."
            ],
            "after": ["Consider customising your LinkedIn URL first in your profile settings. A cleaner link makes a simpler code, and changing the URL later breaks any codes you already printed."],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where students and professionals use it",
            "cards": [
                ("Resume &amp; CV", "Add it in the header or footer so recruiters reach your full profile instantly."),
                ("Campus placements", "Put it on placement forms, portfolios and internship applications."),
                ("Visiting cards", "Give contacts a scan-to-connect option next to your phone and email."),
                ("Conferences &amp; meetups", "Show it on a badge or slide so people can connect after your session."),
                ("Startup pitch decks", "Link founders' profiles or the company page on the last slide."),
                ("Email signature", "Handy for readers who want to open your profile on their phone."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips before you use it",
            "p": ["Make sure the profile behind the code is worth scanning."],
            "bullets": [
                "<strong>Update your headline, photo and About section</strong> before adding the code to your resume.",
                "<strong>Keep the code at least about 1 inch (2.5 cm)</strong> wide on paper, with blank space around it.",
                "<strong>Check your privacy settings.</strong> Make sure your public profile is visible to people who are not signed in, if you want recruiters to see it.",
                "<strong>Test on iPhone and Android</strong> before you send the final PDF."
            ],
        },
    ],
    "faq": [
        ("How do I get my LinkedIn QR code?",
         "In the LinkedIn mobile app, tap the search bar, tap the QR icon and open the My code tab. For a code you can style or use for a company page, paste your profile link into the generator on this page."),
        ("Is the LinkedIn QR code generator free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Can I add a LinkedIn QR code to my resume?",
         "Yes. Download the PNG, place it in your resume header or footer at about 1 inch (2.5 cm) or larger, and test the final PDF with your phone."),
        ("Can I make a QR code for a company page?",
         "Yes. Paste the linkedin.com/company/ address of your page and the code will open it."),
        ("Does the code expire?",
         "No. A static code keeps working as long as the LinkedIn URL is unchanged. If you change your custom profile URL, generate a new code."),
        ("Can I track scans?",
         "Not with a static code. It links directly to LinkedIn. LinkedIn's own profile-view insights can show you visits."),
    ],
    "related": [
        ("vcard-qr-code-generator.html", "vCard QR code generator for a digital visiting card"),
        ("instagram-qr-code-generator.html", "Instagram QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

INSTAGRAM_IN = {**_D,
    "slug": "instagram-qr-code-generator.html",
    "crumb": "Instagram QR Code Generator",
    "type": "social",
    "tool_name": "Instagram QR Code Generator",
    "field_label": "Your Instagram profile URL",
    "field_placeholder": "instagram.com/yourusername",
    "cta": "FOLLOW ON INSTAGRAM",
    "empty": "Paste your Instagram profile link to generate the QR code.",
    "title": "Free Instagram QR Code Generator India | Profile QR for Business — SmartQRCraft",
    "description": "Free Instagram QR code generator for sellers, boutiques, creators and shops in India. Paste your profile link, style it, download PNG or SVG. No signup.",
    "og_title": "Free Instagram QR Code Generator | SmartQRCraft India",
    "og_description": "Make an Instagram QR code for your shop, boutique or brand. Free, no signup, print-ready PNG or SVG.",
    "h1": 'Free <span class="accent">Instagram QR Code</span> Generator',
    "lead": "Paste your Instagram profile link and get a QR code for your shop board, packaging or visiting card. One scan takes customers straight to your page.",
    "faq_h2": "Instagram QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "find-instagram-qr-code",
            "h2": "Get your Instagram QR code in the app",
            "p": ["Instagram has a built-in code for each account. Menu labels change as the app updates."],
            "steps": [
                "Open Instagram and go to your profile.",
                "Tap the menu (three lines) at the top right.",
                "Tap <strong>QR code</strong>. On some older Android versions it is called <strong>Nametag</strong>.",
                "Change the style if you want, then tap <strong>Share</strong> or take a screenshot."
            ],
        },
        {
            "kind": "prose", "id": "why-custom",
            "h2": "Why use a custom code for print?",
            "p": [
                "For a shop board, sticker or parcel slip, a screenshot is not enough. Small screenshots blur when enlarged and you cannot match your brand colors. A code from a generator gives you a sharp PNG or SVG, brand colors, a logo in the center and a call-to-action such as &quot;Follow us on Instagram&quot;.",
                "It is a static code, so there is nothing to renew and no account to log into."
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to make an Instagram QR code",
            "p": ["You only need your username."],
            "steps": [
                "Copy your profile link. It looks like <code>instagram.com/yourusername</code>.",
                "Paste it into the field above.",
                "Choose colors that match your brand, keeping the code dark on a light background.",
                "Optional: add your logo or the frame text.",
                "Download the PNG or SVG and check it by scanning from your phone."
            ],
            "after": ["If you change your Instagram username later, codes made from the old link will stop working, so decide your final handle before printing in bulk."],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where Indian sellers use Instagram QR codes",
            "cards": [
                ("Boutiques &amp; clothing stores", "Put it on the trial-room wall or billing counter to show new collections."),
                ("Home bakers &amp; food sellers", "Add it to boxes and bills so customers can find your menu and reviews."),
                ("Salons &amp; studios", "Use it on mirrors and reception desks to share your portfolio."),
                ("Packaging &amp; parcel slips", "Turn every delivery into a follow."),
                ("Stalls &amp; exhibitions", "A big code on a banner works from a few feet away."),
                ("Creators &amp; freelancers", "Add it to a visiting card or portfolio PDF."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for more scans",
            "p": ["Give people a reason to scan and make the code easy to read."],
            "bullets": [
                "<strong>Say why:</strong> &quot;Scan for today's offers&quot; works better than a bare code.",
                "<strong>Keep your profile ready:</strong> a clear bio, a contact button and recent posts.",
                "<strong>Size:</strong> at least about 1 inch (2.5 cm) on a bill or sticker, bigger on boards.",
                "<strong>Test on two phones</strong> before printing a batch."
            ],
        },
    ],
    "faq": [
        ("How do I get my Instagram QR code?",
         "Open Instagram, go to your profile, tap the menu and choose QR code. To get a print-ready code with your brand colors and logo, paste your profile link into the generator on this page."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Can I add my logo to the QR code?",
         "Yes. Turn on Center Logo and upload a square PNG or JPG, and keep it small."),
        ("Does it work for business accounts?",
         "Yes. It opens whatever public profile the link points to."),
        ("What happens if I change my username?",
         "The old link stops working. You will need to generate a new QR code from the new username."),
        ("Can I track scans?",
         "Not with a static code. Instagram's own insights show profile visits."),
    ],
    "related": [
        ("whatsapp-qr-code-generator.html", "WhatsApp QR code generator"),
        ("linkedin-qr-code-generator.html", "LinkedIn QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

LOGO = {**_D,
    "slug": "qr-code-with-logo.html",
    "crumb": "QR Code with Logo",
    "type": "url",
    "tool_name": "QR Code Generator with Logo",
    "field_label": "Website or link for your QR code",
    "field_placeholder": "https://yourbrand.com",
    "cta": "SCAN ME",
    "empty": "Enter a link, then turn on Center Logo to add your logo.",
    "title": "QR Code with Logo in the Middle | Free Generator India — SmartQRCraft",
    "description": "Make a free QR code with your logo in the middle. Upload a PNG or JPG, choose colors, and download PNG or SVG. Scan-tested error correction. No signup.",
    "og_title": "QR Code with Logo in the Middle | SmartQRCraft India",
    "og_description": "Add your logo to the center of a QR code, free. Choose colors and download PNG or SVG. No signup, no watermark.",
    "h1": 'Free <span class="accent">QR Code with Logo</span> Generator',
    "lead": "Enter your link, switch on Center Logo, and upload your logo. You get a branded QR code that still scans reliably, ready for print or screens.",
    "faq_h2": "QR Code with Logo Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to put a logo in the middle of a QR code",
            "p": ["No design software needed."],
            "steps": [
                "Enter the link the code should open in the field above.",
                "Turn on <strong>Center Logo</strong> and upload a square PNG or JPG. A logo with a solid or white background works best.",
                "Choose a QR color and style. Dark on light is the safest for scanning.",
                "Download the PNG for screens and documents, or the SVG for print.",
                "Test with two phones before you use it."
            ],
        },
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "How can a QR code still scan with a logo covering the middle?",
            "p": [
                "QR codes include built-in error correction, extra data that lets a scanner rebuild information hidden by a smudge, tear or logo. A higher correction level can survive more covered area, but it also makes the pattern denser.",
                "When you turn on a logo here, the tool raises the error correction level automatically so the code keeps enough redundancy. Even so, there is a limit. A small logo scans reliably, and a big logo can make it fail."
            ],
        },
        {
            "kind": "table", "h2": "Logo size and scan reliability",
            "p": ["These are practical guidelines, not guarantees. Always test the final file."],
            "cols": ["Logo size", "What to expect"],
            "rows": [
                ["Small (well under a fifth of the code's width)", "Scans reliably in most cases"],
                ["Medium (around a fifth)", "Usually fine on a clean print, riskier on screens or worn surfaces"],
                ["Large", "High chance of scan failures, especially on older phones"],
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for a branded QR code that works",
            "p": ["Branding should not cost you scans."],
            "bullets": [
                "<strong>Keep the logo small and centered.</strong> Simple shapes beat detailed ones.",
                "<strong>Keep strong contrast</strong> between the code and the background. Avoid light-on-dark inversions and pale brand colors.",
                "<strong>Use a shorter link</strong> when you can, because a shorter link produces a simpler, easier-to-scan pattern.",
                "<strong>Leave a blank margin</strong> around the code so scanners can find its edges.",
                "<strong>Test on the real material,</strong> such as the printed flyer, the shop board or the packaging, not just the screen."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a branded QR code works well",
            "cards": [
                ("Packaging &amp; labels", "Give products a scannable, on-brand link to reviews, warranty or reorders."),
                ("Shop boards &amp; standees", "A recognizable logo in the code makes it look trustworthy."),
                ("Business cards &amp; brochures", "Link to your site or catalogue with a code that matches your identity."),
                ("Restaurant menus", "Put the logo in the middle of a menu code for table tents and windows."),
                ("Events &amp; posters", "Branded codes look better on banners and invitations."),
                ("Social &amp; digital ads", "Use a PNG with your logo on flyers shared over messaging apps."),
            ],
        },
    ],
    "faq": [
        ("How do I add a logo to a QR code?",
         "Enter your link in the generator on this page, turn on Center Logo, and upload a square PNG or JPG. Then download the QR code."),
        ("Will a logo stop the QR code from scanning?",
         "Not if the logo is small and the code has enough error correction. This tool raises the error correction automatically when a logo is added. Large logos can still cause failures, so always test."),
        ("How big can the logo be?",
         "Keep it well under a fifth of the code's width if you can. Smaller logos scan more reliably, especially on printed material and older phones."),
        ("What logo file should I upload?",
         "A square PNG or JPG. A logo with a solid or white background works best."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark, and the code is generated in your browser."),
        ("Which format should I download?",
         "Use PNG for screens and documents, and SVG for print, since SVG stays sharp at any size."),
    ],
    "related": [
        ("upi-qr-code-generator.html", "UPI QR code generator"),
        ("whatsapp-qr-code-generator.html", "WhatsApp QR code generator"),
        ("instagram-qr-code-generator.html", "Instagram QR code generator"),
    ],
}

IN_PAGES_2 = [LOCATION, WHATSAPP, LINKEDIN_IN, INSTAGRAM_IN, LOGO]
