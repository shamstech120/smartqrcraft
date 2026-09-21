"""Content for the Instagram, Google review, menu and PDF landing pages (USA)."""

INSTAGRAM = {
    "slug": "instagram-qr-code-generator.html",
    "crumb": "Instagram QR Code Generator",
    "type": "social",
    "tool_name": "Instagram QR Code Generator",
    "field_label": "Your Instagram profile URL",
    "field_placeholder": "instagram.com/yourusername",
    "cta": "FOLLOW ON INSTAGRAM",
    "empty": "Paste your Instagram profile link to generate the QR code.",
    "title": "Free Instagram QR Code Generator | Custom Profile QR Code — SmartQRCraft",
    "description": "Make a free Instagram QR code for your profile with your own colors and logo. Download PNG or SVG for print. No signup. Also: how to find your in-app code.",
    "og_title": "Free Instagram QR Code Generator | SmartQRCraft",
    "og_description": "Turn your Instagram profile into a custom, print-ready QR code. Free, no signup, PNG or SVG download.",
    "h1": 'Free <span class="accent">Instagram QR Code</span> Generator',
    "lead": "Paste your Instagram profile link, style the code to match your brand, and download it. One scan takes people straight to your profile, with no searching and no typos.",
    "faq_h2": "Instagram QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "find-instagram-qr-code",
            "h2": "How to get your Instagram QR code in the app",
            "p": ["Instagram has a built-in QR code for every account. It is quick to grab and fine for sharing from your phone screen."],
            "steps": [
                "Open the Instagram app and go to your profile.",
                "Tap the menu (three lines) in the top-right corner.",
                "Tap <strong>QR code</strong>. On some older Android versions this option is labeled <strong>Nametag</strong>, so update the app if you cannot find it.",
                "Change the look if you like (color, emoji or selfie background), then tap <strong>Share</strong> or take a screenshot to save it."
            ],
            "after": ["Menu names change as Instagram updates the app, so treat these steps as a guide rather than a guarantee."],
        },
        {
            "kind": "prose", "id": "why-custom",
            "h2": "Why use a custom Instagram QR code?",
            "p": [
                "The in-app code is designed for showing on a screen. If you are printing flyers, stickers, packaging or a shop window sign, a screenshot is a weak starting point: low resolution, fixed styling, and no way to match your brand.",
                "A custom code built from your profile link gives you clean PNG and vector SVG files that stay sharp at any size, colors and a logo that match your brand, and a call-to-action frame such as &quot;Follow us on Instagram.&quot; It is a static code, so it does not expire and needs no account."
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to make an Instagram QR code",
            "p": ["You only need your profile link."],
            "steps": [
                "Copy your profile URL. It looks like <code>instagram.com/yourusername</code>. Just type your username after the domain if you know it.",
                "Paste it into the field above. The code appears as you type.",
                "Choose colors and a style. Dark code on a light background scans best.",
                "Optional: add a center logo or turn on the frame and write a short prompt.",
                "Download the PNG for social posts and screens, or the SVG for print.",
                "Scan the finished code with your phone to check that it opens the right profile."
            ],
            "after": ["If you later change your Instagram username, a code built from the old link will stop working. Choose a username you plan to keep before printing anything in bulk."],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where an Instagram QR code works best",
            "cards": [
                ("Storefront &amp; packaging", "A code on the window, counter, bags or product boxes turns walk-in customers into followers."),
                ("Flyers &amp; posters", "Give event and promo material a way to continue online without a long handle to type."),
                ("Business cards", "Add it next to your contact details so people can check your portfolio right away."),
                ("Menus &amp; receipts", "Ask happy customers to tag you or follow for specials while the visit is fresh."),
                ("Events &amp; markets", "Put a large code on a banner or table sign at pop-ups, fairs and trade shows."),
                ("Videos &amp; slides", "Show the code on a slide or video end card for viewers who want your account."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for an Instagram QR code that gets scanned",
            "p": ["A few habits make the difference between a code people scan and one they ignore."],
            "bullets": [
                "<strong>Give a reason to scan:</strong> &quot;Follow for weekly specials&quot; beats a bare code.",
                "<strong>Make sure the account is ready:</strong> a public profile with a clear bio and recent posts converts scanners better.",
                "<strong>Size and contrast:</strong> keep printed codes at least about 1 inch (2.5 cm) wide, dark on light.",
                "<strong>Keep any logo small:</strong> error correction rises automatically when you add one, but a big logo still hurts scanning.",
                "<strong>Test on two phones</strong> (iPhone and Android) before printing a batch."
            ],
        },
    ],
    "faq": [
        ("How do I get my Instagram QR code?",
         "Open the Instagram app, go to your profile, tap the menu in the top corner and choose QR code. You can then share it or screenshot it. For a print-ready, on-brand version, paste your profile link into the generator on this page."),
        ("Is the Instagram QR code generator free?",
         "Yes. Creating, styling and downloading a code here is free, with no signup and no watermark."),
        ("Can I add my logo to an Instagram QR code?",
         "Yes. Turn on Center Logo and upload a square PNG or JPG. Keep it small so the code still scans reliably."),
        ("Will my Instagram QR code stop working?",
         "A static code keeps working as long as the profile link still exists. If you change your username, the old link breaks and you will need a new code."),
        ("Does an Instagram QR code work for a business account?",
         "Yes. It opens whatever public profile the link points to, personal, creator or business. Private accounts show the follow prompt instead of posts."),
        ("How big should an Instagram QR code be when printed?",
         "At least about 1 inch (2.5 cm) square for close-up use like a card or sticker, and bigger for anything scanned from a distance such as a window or banner."),
        ("Can I track scans of my Instagram QR code?",
         "Not with a static code, which links straight to your profile. Instagram's own insights show profile visits and follower growth."),
    ],
    "related": [
        ("linkedin-qr-code-generator.html", "LinkedIn QR code generator"),
        ("vcard-qr-code-generator.html", "vCard QR code generator for business cards"),
        ("index.html#generator", "Free QR code generator for any link"),
    ],
}

GOOGLE_REVIEW = {
    "slug": "google-review-qr-code-generator.html",
    "crumb": "Google Review QR Code Generator",
    "type": "social",
    "tool_name": "Google Review QR Code Generator",
    "field_label": "Your Google review link",
    "field_placeholder": "https://search.google.com/local/writereview?placeid=...",
    "cta": "REVIEW US ON GOOGLE",
    "empty": "Paste your Google review link to generate the QR code.",
    "title": "Free Google Review QR Code Generator | Get More Reviews — SmartQRCraft",
    "description": "Make a free Google review QR code that opens your review form in one scan. Learn how to find your review link, then download a print-ready PNG or SVG.",
    "og_title": "Free Google Review QR Code Generator | SmartQRCraft",
    "og_description": "Turn your Google review link into a scannable QR code for receipts, tables and signs. Free, no signup.",
    "h1": 'Free <span class="accent">Google Review QR Code</span> Generator',
    "lead": "Paste your Google review link and get a QR code that opens your review form in one scan. Put it where happy customers are, and asking for a review takes seconds.",
    "faq_h2": "Google Review QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "find-review-link",
            "h2": "How to find your Google review link",
            "p": ["The QR code is only as good as the link inside it. You need the link that opens the &quot;write a review&quot; form for your business, not just your Maps listing. There are two reliable ways to get it."],
            "steps": [
                "<strong>From your Business Profile (easiest):</strong> sign in to your Google Business Profile, open the reviews section, and choose the option to get more reviews. Google shows a shareable link and its own QR code there. Copy the link.",
                "<strong>With your Place ID:</strong> look up your business in Google's Place ID Finder and copy the ID (it begins with <code>ChIJ</code>). Then build the link: <code>https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID</code>."
            ],
            "after": ["Paste that link above. Before you print anything, open the link on your own phone to confirm it shows the review form for the right location."],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to create a Google review QR code",
            "p": ["Once you have the link, it takes a minute."],
            "steps": [
                "Get your review link using one of the methods above.",
                "Paste it into the field on this page. The QR code builds instantly.",
                "Choose your brand colors, and turn on the frame to add text such as &quot;Review us on Google&quot;.",
                "Download the PNG for digital use, or the SVG for print.",
                "Scan it with your phone, signed in to Google, to check the review form opens."
            ],
            "after": ["Reviewers must be signed in to a Google account to post, so a short line like &quot;Takes 30 seconds&quot; helps set the expectation."],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where to place a Google review QR code",
            "cards": [
                ("Receipts &amp; invoices", "The moment of payment is the moment a satisfied customer is most willing to help."),
                ("Tables &amp; counters", "A small stand or sticker near the register or table turns waiting time into review time."),
                ("Packaging &amp; inserts", "For e-commerce and delivery, a card in the box brings customers to your Google listing."),
                ("Thank-you emails &amp; texts", "Attach the image or link the same URL so digital customers can review from their phone."),
                ("Service vehicles &amp; work orders", "Plumbers, cleaners and contractors can put a code on a door hanger or work order."),
                ("Waiting rooms", "Clinics, salons and garages have relaxed customers who can leave a review on the spot."),
            ],
        },
        {
            "kind": "prose", "id": "policy",
            "h2": "Rules to follow when asking for Google reviews",
            "p": ["A QR code makes it easy to ask, but Google has rules about how you ask. Check Google's current review policy, and keep these basics in mind."],
            "bullets": [
                "<strong>Do not offer incentives.</strong> Discounts, freebies or entries in exchange for reviews go against Google's policies.",
                "<strong>Do not gate reviews.</strong> Asking only happy customers to review, and routing unhappy ones elsewhere, is discouraged. Ask everyone.",
                "<strong>Do not write or buy reviews.</strong> Fake reviews can lead to removal of the listing's reviews.",
                "<strong>Reply to reviews.</strong> Responding shows new customers you are active, whether the review is good or bad."
            ],
        },
    ],
    "faq": [
        ("How do I create a QR code for Google reviews?",
         "Get your Google review link from your Business Profile (or build it with your Place ID), paste it into the generator on this page, and download the QR code. Scanning it opens your review form."),
        ("Where do I find my Google review link?",
         "In your Google Business Profile, open reviews and choose the option to get more reviews to see a shareable link. You can also use the format https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID with your own Place ID."),
        ("What is a Google Place ID?",
         "It is a unique text identifier Google assigns to each place, beginning with ChIJ. You can look yours up with Google's Place ID Finder."),
        ("Is it free to make a Google review QR code?",
         "Yes. This generator is free with no signup and no watermark. Google's review feature itself is also free."),
        ("Do customers need a Google account to leave a review?",
         "Yes. Reviewers have to be signed in to a Google account to post a review."),
        ("Can I offer a discount for scanning the QR code and leaving a review?",
         "No. Google's policy prohibits incentivized reviews. Ask politely and let the experience speak for itself."),
        ("Will the QR code stop working if I change it later?",
         "A static code keeps working as long as the review link is valid. If your business moves or your listing changes, check the link still opens the correct form and regenerate the code if not."),
    ],
    "related": [
        ("qr-code-menu-generator.html", "QR code menu generator for restaurants"),
        ("instagram-qr-code-generator.html", "Instagram QR code generator"),
        ("index.html#generator", "Free QR code generator for any link"),
    ],
}

MENU = {
    "slug": "qr-code-menu-generator.html",
    "crumb": "QR Code Menu Generator",
    "type": "menu",
    "tool_name": "QR Code Menu Generator",
    "field_label": "Your online menu link (PDF or web page)",
    "field_placeholder": "https://yourrestaurant.com/menu.pdf",
    "cta": "SCAN FOR MENU",
    "empty": "Paste your menu link to generate the QR code.",
    "title": "Free QR Code Menu Generator | Restaurant Menu QR — SmartQRCraft",
    "description": "Make a free QR code menu for your restaurant, cafe or bar. Link a PDF or web menu, style the code and download PNG or SVG. No signup, no watermark.",
    "og_title": "Free QR Code Menu Generator | SmartQRCraft",
    "og_description": "Create a scannable menu QR code for tables, windows and takeout. Free, no signup, print-ready PNG or SVG.",
    "h1": 'Free <span class="accent">QR Code Menu</span> Generator',
    "lead": "Paste the link to your menu, style the QR code, and download it for table tents, windows and takeout bags. Guests scan and the menu opens on their phone.",
    "faq_h2": "QR Code Menu Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "How a QR code menu works",
            "p": [
                "A menu QR code is a link in scannable form. The code contains the web address of your menu, and when a guest points their phone camera at it, their phone opens that address. The menu itself lives somewhere online: a PDF on your website, a page on your site, or a file in cloud storage.",
                "This tool creates the QR code. It does not host the menu file, so you need a link first. That is a benefit as well as a limit: your menu stays under your control, and you can update it without touching the printed code."
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to make a QR code menu",
            "p": ["Six steps, and most of the time goes into getting the menu online."],
            "steps": [
                "Get your menu online. Export it as a PDF (in most word processors, choose Print, then Save as PDF) and upload it to your website, or publish it as a web page.",
                "Copy the link to the menu. For cloud storage such as Google Drive or Dropbox, set sharing to &quot;anyone with the link can view&quot; first.",
                "Paste the link into the field above.",
                "Pick colors that match your branding, keep strong contrast, and optionally add the frame text &quot;Scan for menu&quot;.",
                "Download the PNG or SVG and place it on tables, windows and takeout packaging.",
                "Scan it on both an iPhone and an Android phone to check the menu loads quickly and reads well."
            ],
        },
        {
            "kind": "table", "h2": "PDF menu or web page menu?",
            "p": ["Both work with a static QR code. The difference is what happens after the scan."],
            "cols": ["", "PDF menu", "Web page menu"],
            "rows": [
                ["Setup", "Fastest: export and upload", "Needs a page on your site or a menu tool"],
                ["Reading on a phone", "Can require zooming; keep it to one narrow column", "Best: text reflows to the screen"],
                ["Updating", "Replace the file at the same link", "Edit the page"],
                ["Search visibility", "Limited", "Better, since it is indexable text"],
                ["Best for", "Small menus, quick launch", "Larger menus, photos, allergen filters"],
            ],
        },
        {
            "kind": "prose", "id": "update",
            "h2": "How to update your menu without reprinting",
            "p": ["This is the most important habit for a static QR code menu. Keep the link the same and change what is behind it."],
            "bullets": [
                "If your menu is a PDF, overwrite the file on your host using the exact same file name and address.",
                "If you use cloud storage, replace the file rather than deleting and re-uploading it, since a new upload can create a new link.",
                "If your menu is a web page, edit the page and keep its address unchanged.",
                "Only regenerate the QR code if the link itself changes."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where to put a menu QR code",
            "cards": [
                ("Table tents &amp; stickers", "Give every table its own code so guests can browse while they wait."),
                ("Windows &amp; doors", "Let passers-by check your menu and prices before walking in."),
                ("Takeout bags &amp; boxes", "Help customers reorder by scanning the code on the bag."),
                ("Bars &amp; counters", "Handy for drink lists and specials boards that change often."),
                ("Food trucks &amp; pop-ups", "Put one on the serving window instead of carrying printed menus."),
                ("Flyers &amp; social posts", "Link straight to the current menu from promotions and posts."),
            ],
        },
        {
            "kind": "prose", "id": "best-practices",
            "h2": "Menu QR code best practices",
            "p": ["Small details decide whether guests enjoy the experience or give up and ask for paper."],
            "bullets": [
                "<strong>Keep it mobile-friendly.</strong> Use readable font sizes and avoid multi-column layouts that force pinching and zooming.",
                "<strong>Keep the file small.</strong> A heavy PDF loads slowly on weak restaurant WiFi or mobile data. Compress images before exporting.",
                "<strong>Print it big enough.</strong> Aim for at least about 1 inch (2.5 cm) square on a table tent, larger on windows.",
                "<strong>Say what it is.</strong> Add &quot;Scan for menu&quot; so guests do not guess.",
                "<strong>Offer a paper option.</strong> Some guests prefer not to scan, so keep a few printed menus or mention that staff can help.",
                "<strong>Include allergen and dietary notes</strong> in the menu itself where you can."
            ],
        },
    ],
    "faq": [
        ("How do I create a QR code for my restaurant menu?",
         "Put your menu online as a PDF or web page, copy its link, paste it into the generator on this page, and download the QR code to print. Scanning it opens the menu on the guest's phone."),
        ("Does this tool host my menu?",
         "No. It creates the QR code from a link you provide. You host the menu on your own website or in cloud storage such as Google Drive or Dropbox, with sharing set so anyone with the link can view."),
        ("Can I change my menu without changing the QR code?",
         "Yes, as long as the menu link stays the same. Replace or edit the file or page at that address and the printed code will show the new version."),
        ("Is a QR code menu free?",
         "Making the code here is free with no signup or watermark. Hosting your menu can be free too, using your existing website or a cloud storage link."),
        ("Should my QR code menu be a PDF or a web page?",
         "A PDF is the fastest to launch and fine for small menus. A web page reads better on phones and suits larger menus, though it takes more setup."),
        ("How big should the QR code be on a table?",
         "At least about 1 inch (2.5 cm) wide, with a clear blank margin around it. Bigger is better for windows and signs read from a distance."),
        ("What if guests cannot scan the code?",
         "Keep a few paper menus available and make sure the code is not on a glossy or curved surface that reflects light. Testing under your restaurant's real lighting helps."),
    ],
    "related": [
        ("pdf-to-qr-code.html", "PDF to QR code"),
        ("google-review-qr-code-generator.html", "Google review QR code generator"),
        ("wifi-qr-code-generator.html", "WiFi QR code generator for guests"),
    ],
}

PDF = {
    "slug": "pdf-to-qr-code.html",
    "crumb": "PDF to QR Code",
    "type": "pdf",
    "tool_name": "PDF to QR Code Generator",
    "field_label": "Link to your PDF",
    "field_placeholder": "https://example.com/brochure.pdf",
    "cta": "SCAN TO OPEN PDF",
    "empty": "Paste the link to your PDF to generate the QR code.",
    "title": "PDF to QR Code | Free QR Code Generator for PDF Links — SmartQRCraft",
    "description": "Turn a PDF link into a free QR code. Works with your website, Google Drive or Dropbox links. Download PNG or SVG. No signup, no watermark, no expiry.",
    "og_title": "PDF to QR Code | SmartQRCraft",
    "og_description": "Make a QR code for a PDF brochure, menu, manual or resume from its link. Free, no signup, PNG or SVG.",
    "h1": 'Free <span class="accent">PDF to QR Code</span> Generator',
    "lead": "Paste the link to your PDF and get a scannable QR code for brochures, menus, manuals and resumes. Scan it and the document opens on the phone.",
    "faq_h2": "PDF QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "How does a PDF QR code work?",
            "p": [
                "A QR code cannot hold a whole PDF file. It stores a short web address, and the PDF lives online at that address. When someone scans the code, their phone opens the link, and the PDF displays in the browser or the phone's document viewer.",
                "So converting a PDF to a QR code has two parts: put the PDF online, then turn its link into a QR code. This tool does the second part. It does not upload or store your file."
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to turn a PDF into a QR code",
            "p": ["Six quick steps."],
            "steps": [
                "<strong>Put the PDF online.</strong> Upload it to your own website, or to cloud storage such as Google Drive, Dropbox or OneDrive.",
                "<strong>Make the link public.</strong> For cloud storage, set sharing to &quot;anyone with the link can view&quot; so scanners are not asked to sign in.",
                "<strong>Copy the link</strong> to the file.",
                "<strong>Paste it into the field above.</strong> The QR code appears instantly.",
                "<strong>Style and download</strong> the PNG (screens, documents) or SVG (print).",
                "<strong>Test</strong> with a phone that is not signed in to your accounts, to see what a stranger would see."
            ],
        },
        {
            "kind": "table", "h2": "Where should I host my PDF?",
            "p": ["Any place that gives the file a stable public link works."],
            "cols": ["Option", "Good for", "Watch out for"],
            "rows": [
                ["Your own website", "Permanent, professional links you control", "Needs access to upload files"],
                ["Google Drive", "Quick and free; easy sharing", "Set to anyone with the link; links may open Drive's viewer"],
                ["Dropbox / OneDrive", "Familiar sharing, easy replacement", "Make sure the link is public and not expiring"],
                ["Other file hosts", "Fast for one-off files", "Check retention: free plans may delete files or links"],
            ],
        },
        {
            "kind": "prose", "id": "update",
            "h2": "Updating the PDF later",
            "p": ["Because the QR code holds the link and not the file, you can swap the document without reprinting, if you do it carefully."],
            "bullets": [
                "Replace the file at the same address rather than uploading a new one with a new link.",
                "In Google Drive, use the option to manage versions or replace the file so the link stays the same.",
                "If the link has to change, create a new QR code and update anywhere the old one is printed."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Use Cases", "h2": "What people use PDF QR codes for",
            "cards": [
                ("Brochures &amp; flyers", "Keep printed pieces short and link to the full details."),
                ("Menus &amp; price lists", "Share a menu, service list or rate card that you can update at the same link."),
                ("Manuals &amp; spec sheets", "Put a code on a product or packaging that opens instructions."),
                ("Resumes &amp; portfolios", "Link a business card or printed CV to your full PDF portfolio."),
                ("Event programs", "Share a schedule, map or agenda without printing a stack."),
                ("Real estate &amp; listings", "Add a code to a sign or flyer that opens the full property sheet."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for a PDF that scans and opens well",
            "p": ["A good code is only half the job. The PDF has to open well too."],
            "bullets": [
                "<strong>Keep the file small.</strong> Compress large images so it loads quickly on mobile data.",
                "<strong>Design for a phone screen.</strong> Portrait pages with readable text work better than wide layouts.",
                "<strong>Use a clear file name.</strong> A descriptive name helps if someone saves or shares it.",
                "<strong>Print the code at least about 1 inch (2.5 cm) wide</strong> with blank space around it.",
                "<strong>Do not put sensitive files behind a public link.</strong> Anyone who scans, or gets the link, can open it."
            ],
        },
    ],
    "faq": [
        ("How do I convert a PDF to a QR code?",
         "Upload the PDF somewhere online, copy its public link, and paste the link into the generator on this page. The QR code you download opens that link when scanned."),
        ("Does this tool upload my PDF?",
         "No. It only turns a link into a QR code, and nothing you type leaves your browser. You host the PDF yourself on your website or in cloud storage."),
        ("Can I use a Google Drive link for a PDF QR code?",
         "Yes. Set the file's sharing to anyone with the link can view, copy the link and paste it here. Test it on a phone that is not signed in to your Google account."),
        ("Is a PDF QR code free?",
         "Yes. Generating and downloading the code here is free, with no signup, watermark or expiry."),
        ("Can I change the PDF after printing the QR code?",
         "Yes, if you replace the file at the same link. If the link changes, the old QR code will point to the wrong place and you will need a new one."),
        ("Is there a file size limit?",
         "Not in this tool, since it does not upload files. The limits come from wherever you host the PDF, and smaller files load faster for people scanning."),
        ("Can people download the PDF from the QR code?",
         "Usually yes. The PDF opens in their phone's browser or viewer, where they can save or share it, unless your hosting is set up to restrict downloads."),
    ],
    "related": [
        ("qr-code-menu-generator.html", "QR code menu generator"),
        ("vcard-qr-code-generator.html", "vCard QR code generator"),
        ("index.html#generator", "Free QR code generator for any link"),
    ],
}

MORE = [INSTAGRAM, GOOGLE_REVIEW, MENU, PDF]
