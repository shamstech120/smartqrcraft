"""India (smartqrcraft.in) landing pages. Keyword data: research/keywords-in.csv."""

UPI = {
    "domain": "smartqrcraft.in",
    "lang": "en-IN",
    "slug": "upi-qr-code-generator.html",
    "crumb": "UPI QR Code Generator",
    "type": "upi",
    "tool_name": "UPI QR Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "SCAN & PAY",
    "empty": "Enter your UPI ID (like name@bank) to generate the QR code.",
    "title": "Free UPI QR Code Generator | Payment QR for GPay, PhonePe, Paytm — SmartQRCraft",
    "description": "Make a free UPI QR code from your UPI ID. Add name, amount and note, then download PNG or SVG for your shop, invoice or table. Works with any UPI app. No signup.",
    "og_title": "Free UPI QR Code Generator | SmartQRCraft India",
    "og_description": "Create a UPI payment QR code from your UPI ID. Free, no signup, works with GPay, PhonePe, Paytm and BHIM.",
    "h1": 'Free <span class="accent">UPI QR Code</span> Generator',
    "lead": "Enter your UPI ID, add a name and an optional amount, and download a payment QR code. Customers scan it with any UPI app and pay you directly.",
    "faq_h2": "UPI QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "How a UPI QR code works",
            "p": [
                "A UPI QR code stores a UPI payment link. It carries your UPI ID (also called a VPA), your name, and optionally an amount and a note. When a customer scans it with GPay, PhonePe, Paytm, BHIM or another UPI app, the app opens with your details filled in, and the customer confirms with their UPI PIN.",
                "The payment goes from the customer's bank account to yours through UPI. This tool only builds the QR code from the details you type. It does not handle money, and it does not store or send your UPI ID anywhere, because the code is generated inside your browser."
            ],
        },
        {
            "kind": "prose", "id": "how-to-create",
            "h2": "How to create a UPI QR code",
            "p": ["It takes less than a minute."],
            "steps": [
                "Find your UPI ID. In your UPI app, open your profile or QR section. It looks like <code>yourname@okhdfcbank</code> or <code>9876543210@ybl</code>.",
                "Type it into the <strong>UPI ID</strong> field above.",
                "Add your <strong>payee name</strong> so customers see who they are paying.",
                "Optional: enter a fixed <strong>amount</strong>, for example for an invoice or a set price. Leave it blank if customers should type their own amount.",
                "Optional: add a short <strong>note</strong> such as an order or invoice number.",
                "Download the PNG or SVG, print it, and test it with a small payment from a different phone before you use it."
            ],
        },
        {
            "kind": "table", "h2": "Fixed-amount or open-amount UPI QR code?",
            "p": ["Whether to include an amount depends on how you take payments."],
            "cols": ["", "Open amount (blank)", "Fixed amount"],
            "rows": [
                ["Best for", "Shops, counters, tips, donations", "Invoices, single products, fees, subscriptions"],
                ["Customer action", "Types the amount in their UPI app", "Only confirms the pre-filled amount"],
                ["Reuse", "One code for every sale", "One code per price or per invoice"],
                ["Risk", "Customer may mistype the amount", "Wrong code printed means wrong amount charged"],
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where to use a UPI QR code",
            "cards": [
                ("Shops &amp; counters", "Stick a printed code next to the billing counter so customers can pay without typing your number."),
                ("Invoices &amp; bills", "Add a fixed-amount code to a PDF invoice so clients can pay from their phone."),
                ("Street vendors &amp; stalls", "A laminated code on a stand works for chai, fruit, tailoring and other small businesses."),
                ("Tuition &amp; classes", "Put the fee code on your fee reminder or class poster."),
                ("Donations &amp; events", "Share an open-amount code for temples, clubs, fundraisers and community events."),
                ("Freelancers &amp; services", "Add it to a business card, quotation or WhatsApp catalogue."),
            ],
        },
        {
            "kind": "prose", "id": "safety",
            "h2": "Staying safe with UPI QR codes",
            "p": ["UPI QR scams usually work by tricking someone into scanning a code that pays out, or by swapping a real code with a fake one. A few habits protect you and your customers."],
            "bullets": [
                "<strong>You only need a QR code to receive money.</strong> If anyone asks you to scan a code to receive a refund or prize, it is a scam. Scanning and entering your PIN sends money out.",
                "<strong>Check the payee name.</strong> Always add your name to the code so customers see it before they pay.",
                "<strong>Guard your printed code.</strong> Keep it where you can see it, since a fake sticker placed over a real one can redirect payments.",
                "<strong>Test with a small payment</strong> before printing many copies.",
                "<strong>Never share your UPI PIN.</strong> It is only for approving payments you are making yourself."
            ],
        },
        {
            "kind": "prose", "id": "business",
            "h2": "Personal codes and business accounts",
            "p": [
                "The code made here works with a personal UPI ID and with a business or merchant UPI ID, as long as your bank app accepts payment requests to it. If you accept payments as a registered merchant, your bank or payment app may also issue an official merchant QR code, which can include extra features such as automatic soundbox alerts and settlement reports. This tool is for a simple, free QR code that points to the UPI ID you give it.",
                "Rules on business payments, taxes and GST are separate from the QR code itself. Check with your bank or an accountant if you are unsure how they apply to you."
            ],
        },
    ],
    "faq": [
        ("How do I make a UPI QR code?",
         "Enter your UPI ID in the generator on this page, add your name and an optional amount, then download the QR code. Customers can scan it with any UPI app to pay you."),
        ("Is this UPI QR code generator free?",
         "Yes. It is free, with no signup and no watermark. Your details are used only inside your browser to build the code."),
        ("Which apps can scan a UPI QR code?",
         "Any UPI-enabled app, including Google Pay, PhonePe, Paytm and BHIM, as well as bank apps that support UPI."),
        ("Where do I find my UPI ID?",
         "Open your UPI app and look in your profile or the QR code section. It looks like name@bank, for example 9876543210@ybl."),
        ("Can I add a fixed amount to the QR code?",
         "Yes. Enter the amount in INR and the customer's UPI app will pre-fill it. Leave the field blank to let the payer type any amount."),
        ("Is this an official QR code from NPCI or my bank?",
         "No. It is a standard UPI payment link turned into a QR code. If you need a registered merchant QR with settlement features, get one from your bank or payment provider."),
        ("How do I know my UPI QR code is working?",
         "Scan it with another person's phone, check that your name and UPI ID appear correctly, and complete a small payment. Do this before printing copies."),
    ],
    "related": [
        ("wifi-qr-code-generator.html", "WiFi QR code generator"),
        ("vcard-qr-code-generator.html", "vCard QR code generator for a digital visiting card"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

IN_PAGES = [UPI]
