"""Link-type landing pages: YouTube, Facebook, Google Forms, Snapchat, Spotify, Discord, wedding photos,
QR code stickers, WhatsApp (US), event, resume. English; shared pages appear on .com/.co.uk/.in."""


def _steps_test(extra=""):
    return "Scan the finished code with a phone and check that it opens the right page." + extra


YOUTUBE = {
    "slug": "youtube-qr-code-generator.html",
    "crumb": "YouTube QR Code Generator",
    "type": "url",
    "tool_name": "YouTube QR Code Generator",
    "field_label": "YouTube video, channel or playlist link",
    "field_placeholder": "https://www.youtube.com/@yourchannel",
    "cta": "WATCH ON YOUTUBE",
    "empty": "Paste a YouTube link to generate the QR code.",
    "title": "Free YouTube QR Code Generator | QR Code for Video or Channel — SmartQRCraft",
    "description": "Make a free YouTube QR code for a video, channel, playlist or Short. Customize colors, add a logo, download PNG or SVG. No signup, no expiry.",
    "og_title": "Free YouTube QR Code Generator | SmartQRCraft",
    "og_description": "Turn any YouTube link into a QR code for print or screens. Free, no signup, PNG or SVG.",
    "h1": 'Free <span class="accent">YouTube QR Code</span> Generator',
    "lead": "Paste the link to a YouTube video, channel or playlist and download a QR code. Anyone who scans it lands on your video without typing a thing.",
    "faq_h2": "YouTube QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make a YouTube QR code",
            "p": ["A YouTube QR code is a normal QR code that stores a YouTube link."],
            "steps": [
                "Open the video, channel or playlist on YouTube and use <strong>Share</strong> to copy the link.",
                "Paste the link into the field above.",
                "Pick colors, add a logo if you like, and choose a frame such as &quot;Watch now&quot;.",
                "Download the PNG for screens or the SVG for print.",
                _steps_test(),
            ],
        },
        {
            "kind": "table", "h2": "Which YouTube link should you use?",
            "p": ["Different links do different jobs. Choose the one that matches what you want people to do."],
            "cols": ["Link", "What the scanner sees", "Good for"],
            "rows": [
                ["A single video", "That video", "Product demos, tutorials, event recaps, music videos"],
                ["A channel link", "Your channel page", "Building subscribers from flyers and packaging"],
                ["A playlist link", "A list of videos in order", "Courses, series, how-to sets"],
                ["A link with a start time", "A video that starts at a chosen second", "Skipping intros, jumping to the useful part"],
                ["A YouTube Short", "A vertical video", "Short promos and social content"],
            ],
        },
        {
            "kind": "prose", "id": "subscribe",
            "h2": "Getting subscribers with a channel QR code",
            "p": [
                "For a channel, use your channel URL, which usually looks like youtube.com/@yourname. Some creators add a subscribe prompt to the end of the link. Test any modified link on a phone before printing, because YouTube may change how links behave.",
                "Give people a reason to scan, for example &quot;Scan for the full tutorial&quot;, rather than a bare code."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a YouTube QR code helps",
            "cards": [
                ("Product packaging", "Link to a setup video or a how-to."),
                ("Business cards &amp; flyers", "Show your work, your channel or a promo reel."),
                ("Manuals &amp; instructions", "Add a code next to a hard step so people can watch it."),
                ("Restaurants &amp; shops", "Share a story video, a tour or a recipe."),
                ("Events &amp; posters", "Send attendees to a trailer or a live stream."),
                ("Presentations &amp; classrooms", "Give students a link to the clip or lesson."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for YouTube QR codes",
            "p": ["A few habits make video codes work better."],
            "bullets": [
                "<strong>Use links you control.</strong> If a video is deleted or made private, the code stops working.",
                "<strong>Make the video worth it.</strong> People scan when they expect something short and useful.",
                "<strong>Think about mobile data.</strong> On posters in places with weak signal, a short video loads better.",
                "<strong>Keep the code at least about 1 inch (2.5 cm)</strong> wide, larger for anything scanned from a distance.",
                "<strong>Do not put a QR code on a video that is the destination itself.</strong> On-screen codes can be hard to scan at video size."
            ],
        },
    ],
    "faq": [
        ("How do I create a QR code for a YouTube video?",
         "Copy the video link with the Share button on YouTube, paste it into the generator on this page, and download the QR code. Scanning it opens the video."),
        ("Can I make a QR code for a YouTube channel?",
         "Yes. Paste your channel link, which usually looks like youtube.com/@yourname, and the code will open your channel page."),
        ("Can the video start at a specific time?",
         "Yes, if the link itself includes a start time. Copy the link from YouTube with the start-at option, then paste it here."),
        ("Is the YouTube QR code generator free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Does the QR code stop working if I change the video?",
         "The code keeps pointing to the same link. If the video is removed or set to private, people will not be able to watch it. If you replace the video, generate a new code."),
        ("Can I add my logo?",
         "Yes. Turn on Center Logo and upload a square PNG or JPG. Keep it small so the code still scans."),
        ("Can I see how many people scanned my code?",
         "Not with a static code. YouTube Analytics shows views of the video itself."),
    ],
    "related": [
        ("facebook-qr-code-generator.html", "Facebook QR code generator"),
        ("spotify-qr-code-generator.html", "Spotify QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

FACEBOOK = {
    "slug": "facebook-qr-code-generator.html",
    "crumb": "Facebook QR Code Generator",
    "type": "url",
    "tool_name": "Facebook QR Code Generator",
    "field_label": "Facebook page, profile, group or Messenger link",
    "field_placeholder": "https://facebook.com/yourpage",
    "cta": "FIND US ON FACEBOOK",
    "empty": "Paste a Facebook link to generate the QR code.",
    "title": "Free Facebook QR Code Generator | Page, Profile or Group QR — SmartQRCraft",
    "description": "Make a free Facebook QR code for your page, profile, group or Messenger chat. Customize colors, add a logo, download PNG or SVG. No signup.",
    "og_title": "Free Facebook QR Code Generator | SmartQRCraft",
    "og_description": "Turn your Facebook page or group link into a QR code. Free, no signup, PNG or SVG.",
    "h1": 'Free <span class="accent">Facebook QR Code</span> Generator',
    "lead": "Paste the link to your Facebook page, group or Messenger chat and download a QR code. Scanning it takes people straight there.",
    "faq_h2": "Facebook QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to create a Facebook QR code",
            "p": ["You only need the link to the page you want people to open."],
            "steps": [
                "Open your Facebook page, profile or group in a browser and copy the address from the address bar.",
                "Paste it into the field above.",
                "Choose your colors, and add a logo or a frame with text like &quot;Follow us&quot;.",
                "Download the PNG or SVG.",
                _steps_test(" Try it on a phone that is not logged in to check what strangers see."),
            ],
        },
        {
            "kind": "table", "h2": "What can a Facebook QR code point to?",
            "p": ["Choose the destination based on what you want visitors to do."],
            "cols": ["Destination", "Link looks like", "Best for"],
            "rows": [
                ["Business page", "facebook.com/yourpage", "Follows, reviews, updates"],
                ["Public group", "facebook.com/groups/yourgroup", "Communities, clubs, classes"],
                ["Messenger chat", "m.me/yourpage", "Questions, bookings, support"],
                ["An event", "facebook.com/events/...", "Invitations and RSVPs"],
                ["A post or album", "Link to the post", "Photos and announcements"],
            ],
        },
        {
            "kind": "prose", "id": "messenger",
            "h2": "Send people to Messenger",
            "p": ["If you want conversations rather than followers, use your Messenger link, which is the m.me address followed by your page name. Scanning it opens a chat with your page. It is a good fit for small shops that take questions and orders by message."],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a Facebook QR code helps",
            "cards": [
                ("Shop counters &amp; windows", "Turn customers into followers."),
                ("Flyers &amp; posters", "Give events and offers a place to continue online."),
                ("Receipts &amp; packaging", "Invite customers to review or follow."),
                ("Community groups", "Put the join link on notice boards."),
                ("Event invitations", "Link to the Facebook event page."),
                ("Vehicles &amp; signage", "Show a code on a van or sign, large enough to scan."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips before you print",
            "p": ["A few checks prevent dead ends."],
            "bullets": [
                "<strong>Check privacy.</strong> A private group or a restricted page will show a login or a request screen. Use a public page for cold audiences.",
                "<strong>Use your page URL, not a temporary one.</strong> Set a clean page username so the address stays short.",
                "<strong>Give a reason to scan,</strong> such as &quot;Scan for offers&quot;.",
                "<strong>Test on a phone not signed in</strong> to see what a new visitor sees.",
                "<strong>Keep the code about 1 inch (2.5 cm) or larger.</strong>"
            ],
        },
    ],
    "faq": [
        ("How do I make a QR code for my Facebook page?",
         "Copy your Facebook page link, paste it into the generator on this page, and download the QR code. Scanning it opens your page."),
        ("Can I make a QR code for a Facebook group?",
         "Yes. Paste the group link. Public groups open directly. Private groups show a join request."),
        ("How do I send people to Messenger?",
         "Use your m.me link, which is m.me followed by your page name, and paste it into the generator."),
        ("Is the Facebook QR code generator free?",
         "Yes. It is free, with no signup and no watermark."),
        ("What if I change my page name or username?",
         "The old link may stop working. Check the link before printing, and generate a new code if it changes."),
        ("Can I track scans?",
         "Not with a static code. Facebook Insights shows page visits and follower growth."),
    ],
    "related": [
        ("instagram-qr-code-generator.html", "Instagram QR code generator"),
        ("youtube-qr-code-generator.html", "YouTube QR code generator"),
        ("google-review-qr-code-generator.html", "Google review QR code generator"),
    ],
}

GFORMS = {
    "slug": "google-forms-qr-code-generator.html",
    "crumb": "Google Forms QR Code Generator",
    "type": "url",
    "tool_name": "Google Forms QR Code Generator",
    "field_label": "Your Google Form link",
    "field_placeholder": "https://forms.gle/...",
    "cta": "FILL OUT THE FORM",
    "empty": "Paste your Google Form link to generate the QR code.",
    "title": "Free Google Forms QR Code Generator | QR Code for a Survey — SmartQRCraft",
    "description": "Make a free QR code for a Google Form, survey, RSVP or feedback form. Paste the form link, customize, and download PNG or SVG. No signup.",
    "og_title": "Free Google Forms QR Code Generator | SmartQRCraft",
    "og_description": "Turn a Google Form link into a QR code for surveys, RSVPs and feedback. Free, no signup.",
    "h1": 'Free <span class="accent">Google Forms QR Code</span> Generator',
    "lead": "Paste your Google Form link and download a QR code. People scan it and fill in the form on their phone, ideal for surveys, RSVPs and feedback.",
    "faq_h2": "Google Forms QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make a QR code for a Google Form",
            "p": ["It takes two minutes, and most of the time goes into checking the form settings."],
            "steps": [
                "Open your form in Google Forms and click <strong>Send</strong>.",
                "Choose the link option and copy the link. You can shorten it with the option shown in the same window.",
                "Paste the link into the field above and choose your colors.",
                "Download the PNG or SVG.",
                "Open the form with your QR code on a phone that is signed out to confirm anyone can respond."
            ],
        },
        {
            "kind": "prose", "id": "settings",
            "h2": "Check these form settings first",
            "p": ["Most failed form QR codes come from settings, not from the code."],
            "bullets": [
                "<strong>Who can respond.</strong> If the form is limited to people in your organization, outsiders will be asked to sign in and may be blocked.",
                "<strong>Sign-in requirements.</strong> Options that require a Google account or restrict to one response per person make the form harder for casual visitors.",
                "<strong>Accepting responses.</strong> Make sure the form is not closed, or the code will lead to a closed message.",
                "<strong>Form length.</strong> Phone users abandon long forms. Keep it short and use multiple choice where you can.",
                "<strong>Test on mobile.</strong> Every question should be easy to answer with one hand."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "What people use Google Form QR codes for",
            "cards": [
                ("Customer feedback", "Put a code on receipts and tables for a quick survey."),
                ("Event RSVPs &amp; sign-ins", "Replace paper sign-up sheets at the door."),
                ("Classroom quizzes", "Share a quiz or exit ticket with a projected code."),
                ("Registration forms", "Collect entries for classes, clubs and sports."),
                ("Volunteer &amp; job applications", "Post a code on a notice board or flyer."),
                ("Order &amp; booking forms", "Let customers place a request from a poster."),
            ],
        },
        {
            "kind": "prose", "id": "privacy",
            "h2": "Privacy and data",
            "p": [
                "When people fill in your form, you become responsible for how you handle their answers. Only ask for what you need, say what you will use it for, and follow the privacy rules that apply where you operate.",
                "This tool only creates the QR code. It does not see your form or the responses."
            ],
        },
    ],
    "faq": [
        ("How do I create a QR code for a Google Form?",
         "In Google Forms click Send, copy the link, paste it into the generator on this page and download the QR code."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Why does my form ask people to sign in?",
         "Your form settings may require a Google account or limit responses to your organization. Change these in the form settings, then test with a signed-out browser."),
        ("Can I use a shortened forms.gle link?",
         "Yes. Either the long link or the shortened link works. The shorter link makes a simpler, easier-to-scan code."),
        ("What if I close or delete the form?",
         "The code will point to a closed or missing form. Generate a new code for a new form."),
        ("Can I see how many people scanned the code?",
         "Not with a static code. Google Forms shows you how many responses arrived."),
    ],
    "related": [
        ("qr-code-menu-generator.html", "QR code menu generator"),
        ("event-qr-code-generator.html", "Event QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

SNAPCHAT = {
    "slug": "snapchat-qr-code-generator.html",
    "crumb": "Snapchat QR Code Generator",
    "type": "url",
    "tool_name": "Snapchat QR Code Generator",
    "field_label": "Your Snapchat add link",
    "field_placeholder": "https://www.snapchat.com/add/yourusername",
    "cta": "ADD ME ON SNAPCHAT",
    "empty": "Enter your Snapchat link to generate the QR code.",
    "title": "Free Snapchat QR Code Generator | Custom Profile QR Code — SmartQRCraft",
    "description": "Make a free custom QR code for your Snapchat profile. Add colors and a logo, download PNG or SVG for flyers and cards. No signup.",
    "og_title": "Free Snapchat QR Code Generator | SmartQRCraft",
    "og_description": "Turn your Snapchat add link into a custom QR code. Free, no signup, PNG or SVG.",
    "h1": 'Free <span class="accent">Snapchat QR Code</span> Generator',
    "lead": "Paste your Snapchat add link and get a custom QR code for cards, flyers or a brand kit. Scanning it opens your profile so people can add you.",
    "faq_h2": "Snapchat QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "snapcode",
            "h2": "Snapcode or custom QR code?",
            "p": [
                "Snapchat has its own scannable image called a Snapcode, and it works inside the Snapchat app. A custom QR code is different: it is a standard QR code that any phone camera can read, and it opens your Snapchat profile link.",
                "Use a custom QR code when you want a code that works with every camera, matches your brand colors, or prints sharply at any size."
            ],
        },
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make a Snapchat QR code",
            "p": ["Your public add link has the form snapchat.com/add/yourusername."],
            "steps": [
                "Find your username in Snapchat. You can create the link by adding it after snapchat.com/add/.",
                "Paste the full link into the field above.",
                "Choose your colors and a frame such as &quot;Add me on Snapchat&quot;.",
                "Download the PNG or SVG.",
                "Scan it with another phone to check that it opens your profile."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a Snapchat QR code works",
            "cards": [
                ("Creator kits &amp; cards", "Give brands and fans a scan-to-add option."),
                ("Campus &amp; events", "Print codes on flyers for clubs and meetups."),
                ("Merch &amp; stickers", "Add a code to hoodies, stickers and posters."),
                ("Shop counters", "Ask customers to add your business account."),
                ("Livestream overlays", "Show the code in a stream or video end card."),
                ("Bios &amp; link pages", "Add the image to a link-in-bio page."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips",
            "p": ["A few notes keep the code useful."],
            "bullets": [
                "<strong>Keep your username stable.</strong> If you change it, the old link breaks and printed codes stop working.",
                "<strong>Check your privacy settings.</strong> Decide who can contact you before you share your profile widely.",
                "<strong>Avoid personal details on public flyers,</strong> and treat any public code as visible to everyone.",
                "<strong>Size:</strong> at least about 1 inch (2.5 cm) for cards and stickers, larger on banners."
            ],
        },
    ],
    "faq": [
        ("How do I make a Snapchat QR code?",
         "Paste your Snapchat add link into the generator on this page and download the QR code. Scanning it opens your Snapchat profile."),
        ("What is the difference between a Snapcode and a QR code?",
         "A Snapcode is Snapchat's own scannable image, read inside the Snapchat app. A QR code is a standard code that any phone camera can read."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Can I change the color of the code?",
         "Yes. Pick from the color options or a custom color, or use a template."),
        ("What happens if I change my Snapchat username?",
         "The old link no longer works, so create a new QR code and replace printed copies."),
        ("Is this affiliated with Snapchat?",
         "No. This is an independent tool and is not affiliated with Snap Inc."),
    ],
    "related": [
        ("instagram-qr-code-generator.html", "Instagram QR code generator"),
        ("facebook-qr-code-generator.html", "Facebook QR code generator"),
        ("qr-code-stickers.html", "QR code stickers"),
    ],
}

SPOTIFY = {
    "slug": "spotify-qr-code-generator.html",
    "crumb": "Spotify QR Code Generator",
    "type": "url",
    "tool_name": "Spotify QR Code Generator",
    "field_label": "Spotify song, playlist, album, artist or podcast link",
    "field_placeholder": "https://open.spotify.com/playlist/...",
    "cta": "LISTEN ON SPOTIFY",
    "empty": "Paste a Spotify link to generate the QR code.",
    "title": "Free Spotify QR Code Generator | Playlist, Song or Podcast QR — SmartQRCraft",
    "description": "Make a free Spotify QR code for a playlist, song, album, artist or podcast. Customize colors, add a logo, download PNG or SVG. No signup.",
    "og_title": "Free Spotify QR Code Generator | SmartQRCraft",
    "og_description": "Turn a Spotify link into a QR code for playlists, songs and podcasts. Free, no signup.",
    "h1": 'Free <span class="accent">Spotify QR Code</span> Generator',
    "lead": "Paste a Spotify link for a song, playlist, album, artist or podcast and download a QR code. Scanning it opens Spotify right where you want the listener.",
    "faq_h2": "Spotify QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make a Spotify QR code",
            "p": ["Every item in Spotify has a share link, and that link is all this tool needs."],
            "steps": [
                "In Spotify, open the song, playlist, album, artist or podcast episode.",
                "Use the three-dot menu, then <strong>Share</strong>, then <strong>Copy link</strong>.",
                "Paste the link into the field above.",
                "Style the code with your colors, and add a logo if you like.",
                "Download the PNG or SVG and test that it opens Spotify on a phone."
            ],
            "after": ["Spotify also has its own scannable Spotify Codes. Use a standard QR code when you want any phone camera to read it, or when you want your own colors and logo."],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a Spotify QR code works",
            "cards": [
                ("Cafes, bars &amp; shops", "Share the playlist that is playing right now."),
                ("Weddings &amp; parties", "Let guests open or add to the event playlist."),
                ("Bands &amp; artists", "Put a code on posters and merch that opens your latest release."),
                ("Podcasts", "Print a code on business cards and flyers to open a show."),
                ("Gyms &amp; studios", "Share class or workout playlists."),
                ("Gifts &amp; cards", "Attach a personal playlist to a card."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for music and podcast codes",
            "p": ["A code is only useful if the link works for everyone."],
            "bullets": [
                "<strong>Make playlists public</strong> if you want anyone to open them. Private playlists will not open for others.",
                "<strong>Listeners need Spotify or the web player.</strong> People without the app can still open the web version, though some content may need an account.",
                "<strong>Check regional availability.</strong> Some tracks are not available in every country.",
                "<strong>Use a short, clear call to action,</strong> like &quot;Scan for the playlist&quot;.",
                "<strong>Size:</strong> at least about 1 inch (2.5 cm) on cards and sleeves."
            ],
        },
    ],
    "faq": [
        ("How do I make a QR code for a Spotify playlist?",
         "Copy the playlist link with Share, then Copy link in Spotify, paste it into the generator on this page and download the QR code."),
        ("What is the difference between a Spotify Code and a QR code?",
         "A Spotify Code is Spotify's own scannable image, read in the Spotify app. A QR code is a standard code that any phone camera can read."),
        ("Can I make a QR code for a podcast?",
         "Yes. Copy the link to the podcast show or an episode and paste it here."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Why does the playlist not open for others?",
         "It may be private. In Spotify, make the playlist public so anyone with the code can open it."),
        ("Is this affiliated with Spotify?",
         "No. This is an independent tool and is not affiliated with Spotify."),
    ],
    "related": [
        ("youtube-qr-code-generator.html", "YouTube QR code generator"),
        ("qr-code-stickers.html", "QR code stickers"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

DISCORD = {
    "slug": "discord-qr-code-generator.html",
    "crumb": "Discord QR Code Generator",
    "type": "url",
    "tool_name": "Discord QR Code Generator",
    "field_label": "Your Discord server invite link",
    "field_placeholder": "https://discord.gg/yourinvite",
    "cta": "JOIN OUR DISCORD",
    "empty": "Paste your Discord invite link to generate the QR code.",
    "title": "Free Discord QR Code Generator | Server Invite QR Code — SmartQRCraft",
    "description": "Make a free QR code for your Discord server invite. Add colors and a logo, download PNG or SVG for posters, streams and events. No signup.",
    "og_title": "Free Discord QR Code Generator | SmartQRCraft",
    "og_description": "Turn a Discord invite link into a QR code. Free, no signup, PNG or SVG.",
    "h1": 'Free <span class="accent">Discord QR Code</span> Generator',
    "lead": "Paste your Discord server invite link and download a QR code. Scanning it opens the invite so people can join your community from a poster or a screen.",
    "faq_h2": "Discord QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make a Discord server QR code",
            "p": ["The code holds your server's invite link."],
            "steps": [
                "In Discord, open your server and use the invite option to create an invite link.",
                "In the invite settings, choose how long the link lasts and how many uses it allows.",
                "Copy the link and paste it into the field above.",
                "Style the code and download the PNG or SVG.",
                "Test the code with an account that has not joined the server."
            ],
        },
        {
            "kind": "prose", "id": "expiry",
            "h2": "Invite links can expire, and that breaks your QR code",
            "p": [
                "A Discord invite may expire after a set time or a number of uses. If it does, the QR code will lead to an invalid invite. For printed codes, create an invite that does not expire and has no use limit, then use that link.",
                "Also consider who you are letting in. An open, permanent invite can be shared widely, so set up moderation and verification on your server first."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a Discord QR code helps",
            "cards": [
                ("Posters &amp; flyers", "Recruit members at school, campus and meetups."),
                ("Streams &amp; videos", "Show the code as an overlay or end card."),
                ("Gaming events &amp; cons", "Print codes on badges and banners."),
                ("Merch &amp; stickers", "Put the community link on physical items."),
                ("Clubs &amp; classes", "Share the server with new members in person."),
                ("Presentations", "Add a code on the last slide."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for Discord QR codes",
            "p": ["A few habits keep your community safe and your code working."],
            "bullets": [
                "<strong>Use a non-expiring invite</strong> for anything printed.",
                "<strong>Set verification levels</strong> and rules before you invite the public.",
                "<strong>Tell people what they are joining,</strong> for example &quot;Scan to join our study group&quot;.",
                "<strong>Replace the invite if it is abused.</strong> Delete the old invite and print a new code."
            ],
        },
    ],
    "faq": [
        ("How do I make a QR code for my Discord server?",
         "Create an invite link in Discord, paste it into the generator on this page and download the QR code. Scanning it opens the invite."),
        ("Why does my Discord QR code say the invite is invalid?",
         "The invite probably expired or reached its use limit. Create an invite that never expires and generate a new code."),
        ("Is the Discord QR code generator free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Is it safe to put a permanent invite on a poster?",
         "It lets anyone join, so set moderation and verification first. If it is abused, delete the invite and make a new one."),
        ("Is this affiliated with Discord?",
         "No. This is an independent tool and is not affiliated with Discord."),
    ],
    "related": [
        ("youtube-qr-code-generator.html", "YouTube QR code generator"),
        ("qr-code-stickers.html", "QR code stickers"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

WEDDING = {
    "slug": "qr-code-for-wedding-photos.html",
    "crumb": "QR Code for Wedding Photos",
    "type": "url",
    "tool_name": "Wedding Photo QR Code Generator",
    "field_label": "Link to your shared photo album",
    "field_placeholder": "https://photos.app.goo.gl/...",
    "cta": "SHARE YOUR PHOTOS",
    "empty": "Paste the link to your shared album to generate the QR code.",
    "title": "QR Code for Wedding Photos | Free Photo Sharing QR Code — SmartQRCraft",
    "description": "Make a free QR code for wedding photos so guests can view and upload pictures. Works with Google Photos, iCloud, Dropbox and more. PNG or SVG, no signup.",
    "og_title": "QR Code for Wedding Photos | SmartQRCraft",
    "og_description": "Let guests add and see wedding photos with one scan. Free QR code, no signup.",
    "h1": 'Free <span class="accent">QR Code for Wedding Photos</span>',
    "lead": "Create a shared album, paste its link, and download a QR code for your table cards. Guests scan it and add their photos to one place.",
    "faq_h2": "Wedding Photo QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to collect wedding photos with a QR code",
            "p": ["The QR code does not store photos. It opens a shared album that you set up in advance."],
            "steps": [
                "Create a shared album in a service your guests can use easily, such as Google Photos, iCloud Shared Albums, Dropbox or OneDrive.",
                "Allow guests to <strong>add photos</strong> in the sharing settings, and create a shareable link.",
                "Paste the link into the field above.",
                "Choose colors that match your wedding, and add the frame text &quot;Add your photos&quot;.",
                "Download the PNG or SVG and place it on table cards, signs or programs.",
                "Test it with a phone that is not your own, and try uploading a photo."
            ],
        },
        {
            "kind": "table", "h2": "Which album service should you use?",
            "p": ["Ease for guests matters most. Test the flow yourself before the day."],
            "cols": ["Service", "Guests can add photos?", "Things to check"],
            "rows": [
                ["Google Photos shared album", "Yes, with contributions turned on", "Guests may need a Google account to upload"],
                ["iCloud Shared Album", "Yes, for invited people", "Easiest for iPhone users, less so for Android"],
                ["Dropbox or OneDrive folder", "Yes, with an upload link", "Storage limits apply, check the free space"],
                ["A dedicated wedding photo service", "Usually yes", "Some are paid, check privacy and how long photos stay online"],
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Place It", "h2": "Where to put the QR code",
            "cards": [
                ("Table cards", "The most natural spot, at every table."),
                ("Welcome sign", "Put a large code at the entrance."),
                ("Programs &amp; menus", "Add a small code with a caption."),
                ("Photo booth", "A sign reminding people to upload their shots."),
                ("Thank-you cards", "Include it in cards after the event for late uploads."),
                ("Save-the-date &amp; website", "Link it on the wedding website too."),
            ],
        },
        {
            "kind": "prose", "id": "privacy",
            "h2": "Privacy and photo etiquette",
            "p": [
                "Anyone with the link can usually see the album, so avoid sharing the code publicly online. Tell guests how long the album will stay open, and download the photos before an album service deletes them or a link stops working.",
                "If some guests would rather not be photographed or shared, mention your photo policy on a sign."
            ],
        },
    ],
    "faq": [
        ("How do I make a QR code for wedding photos?",
         "Create a shared album that allows guests to add photos, paste its link into the generator on this page, and download the QR code. Place it on table cards and signs."),
        ("Does the QR code store the photos?",
         "No. It stores only the link to your album. The photos live in the album service you chose."),
        ("Which service is best for guests to upload photos?",
         "It depends on your guests. Google Photos and iCloud shared albums work well, Dropbox and OneDrive are alternatives. Try uploading from both an iPhone and an Android phone."),
        ("Do guests need an account?",
         "Sometimes. Some services ask people to sign in to upload. Check this yourself with a phone that is not signed in."),
        ("Is the wedding photo QR code free?",
         "Yes. The QR code is free, with no signup and no watermark. Your album service has its own rules and storage limits."),
        ("How long will the QR code work?",
         "As long as the album link works. Keep the album online, and save copies of the photos."),
    ],
    "related": [
        ("google-forms-qr-code-generator.html", "Google Forms QR code generator"),
        ("spotify-qr-code-generator.html", "Spotify QR code generator for playlists"),
        ("event-qr-code-generator.html", "Event QR code generator"),
    ],
}

STICKERS = {
    "slug": "qr-code-stickers.html",
    "crumb": "QR Code Stickers",
    "type": "url",
    "tool_name": "QR Code Sticker Generator",
    "field_label": "Link for your QR code sticker",
    "field_placeholder": "https://yourbrand.com",
    "cta": "SCAN ME",
    "empty": "Enter a link to generate your sticker QR code.",
    "title": "QR Code Stickers | Make a Print-Ready QR Code for Stickers — SmartQRCraft",
    "description": "Make a free print-ready QR code for stickers and labels. Download a sharp SVG or PNG, then print at home or order stickers. Includes size and material tips.",
    "og_title": "QR Code Stickers | SmartQRCraft",
    "og_description": "Create a QR code file for stickers and labels. Free SVG and PNG, with size and printing tips.",
    "h1": 'Make a <span class="accent">QR Code for Stickers</span>',
    "lead": "Create a sharp, print-ready QR code, download it as SVG or high-resolution PNG, and use it for stickers and labels. Below are the sizes, materials and tests that make stickers scan.",
    "faq_h2": "QR Code Sticker Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make QR code stickers",
            "p": ["This tool makes the QR code file. You then print it yourself or send it to a sticker printer."],
            "steps": [
                "Enter the link the sticker should open. Choose a link you control and will keep.",
                "Design the code: dark on light, with a quiet margin, and a logo only if it is small.",
                "In the download options choose <strong>SVG</strong> for a print shop or <strong>PNG at 2048 or 4096 px</strong> for home printing.",
                "Print a test sheet on plain paper first and scan it with two phones.",
                "Then print on sticker paper or order a run of stickers from a printer."
            ],
        },
        {
            "kind": "table", "h2": "Sticker size guide",
            "p": ["Bigger stickers scan from further away. As a rule of thumb, the code should be about one tenth of the scanning distance."],
            "cols": ["Where the sticker is scanned", "Typical distance", "Suggested minimum code size"],
            "rows": [
                ["Laptop, phone case, product label", "10 to 30 cm", "About 2 to 3 cm (0.8 to 1.2 in)"],
                ["Table, counter or menu", "30 to 50 cm", "About 3 to 5 cm (1.2 to 2 in)"],
                ["Shop window or door", "1 to 2 m", "About 10 to 20 cm (4 to 8 in)"],
                ["Vehicle, sign or wall", "2 m and more", "20 cm (8 in) and more"],
            ],
        },
        {
            "kind": "table", "h2": "Choosing sticker materials",
            "p": ["The material decides how long the code stays readable."],
            "cols": ["Material", "Good for", "Watch out for"],
            "rows": [
                ["Paper labels", "Indoor, short-term use", "Fades, tears and stains easily"],
                ["Vinyl", "Outdoor, durable use", "Choose a matte finish to avoid glare"],
                ["Laminated stickers", "Menus, tables and tools", "Glossy laminate can reflect light"],
                ["Removable adhesive", "Temporary promotions", "May peel in humidity"],
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for stickers that keep scanning",
            "p": ["Stickers live in harsh places, so build in a margin for error."],
            "bullets": [
                "<strong>Use static codes for stickers.</strong> They cannot be edited later, so aim them at a page you control and update the page instead.",
                "<strong>Keep contrast high.</strong> Dark code on a light background beats colored designs.",
                "<strong>Leave a margin</strong> around the code when you cut the sticker, so the edge does not cut into the pattern.",
                "<strong>Avoid curved surfaces</strong> that distort the code, or make it larger.",
                "<strong>Add a short call to action</strong> next to the code so people know why to scan.",
                "<strong>Test after printing,</strong> not just on screen. Try scanning at the real distance."
            ],
            "after": ["For a whole sheet of different codes, use the <a href=\"bulk-qr-code-generator.html\">bulk QR code generator</a>."],
        },
    ],
    "faq": [
        ("How do I make a QR code for a sticker?",
         "Enter your link in the generator on this page, design the code, download a high-resolution PNG or an SVG, and print it on sticker paper or send it to a sticker printer."),
        ("What size should a QR code sticker be?",
         "At least about 2 cm (0.8 in) for close-up items, about 3 to 5 cm on tables and menus, and much larger for windows and vehicles. Roughly one tenth of the scanning distance is a good guide."),
        ("SVG or PNG for printing stickers?",
         "SVG is best because it stays sharp at any size. If you print at home, use a PNG of 2048 or 4096 px."),
        ("Can I change where the QR code sticker points later?",
         "Not with a static code. Point it at a page you control, then update that page. If the link itself changes, you need new stickers."),
        ("Are QR code stickers free to make here?",
         "The QR code is free, with no signup or watermark. Printing the stickers is separate and depends on your printer or supplier."),
        ("Why does my sticker not scan?",
         "The common causes are a code that is too small, low contrast, glossy reflection, or a curved surface. Use the <a href=\"qr-code-tester.html\">QR code tester</a> and try a larger size."),
    ],
    "related": [
        ("bulk-qr-code-generator.html", "Bulk QR code generator"),
        ("qr-code-tester.html", "QR code tester"),
        ("qr-code-with-logo.html", "QR code with logo"),
    ],
}

WHATSAPP_US = {
    "slug": "whatsapp-qr-code-generator.html",
    "crumb": "WhatsApp QR Code Generator",
    "type": "whatsapp",
    "tool_name": "WhatsApp QR Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "CHAT ON WHATSAPP",
    "empty": "Enter a WhatsApp number with country code to generate the QR code.",
    "title": "Free WhatsApp QR Code Generator | Click-to-Chat QR — SmartQRCraft",
    "description": "Make a free WhatsApp QR code that opens a chat with your number and an optional message. Customize, download PNG or SVG. No signup, works with WhatsApp Business.",
    "og_title": "Free WhatsApp QR Code Generator | SmartQRCraft",
    "og_description": "Create a click-to-chat WhatsApp QR code with an optional message. Free, no signup.",
    "h1": 'Free <span class="accent">WhatsApp QR Code</span> Generator',
    "lead": "Enter your WhatsApp number and an optional first message, then download a QR code. Scanning it opens a chat with you, no contact saving needed.",
    "faq_h2": "WhatsApp QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-it-works",
            "h2": "How the WhatsApp QR code works",
            "p": [
                "The code stores a wa.me link, WhatsApp's click-to-chat address. Scanning it opens a WhatsApp chat with your number, and any message you added is ready to send. It works with both personal WhatsApp and WhatsApp Business.",
                "The number must be registered on WhatsApp. This tool only builds the code and does not connect to your account."
            ],
        },
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to create one",
            "p": ["The main thing to get right is the number format."],
            "steps": [
                "Write the number with the country code and digits only, with no plus sign, spaces or dashes. For a US number, <code>15551234567</code> means +1 555 123 4567.",
                "Optional: add a first message such as &quot;Hi, I have a question about my order&quot;.",
                "Choose colors, add a logo or a frame, and download the PNG or SVG.",
                "Scan the code from another phone to confirm the chat opens with the right number."
            ],
        },
        {
            "kind": "prose", "id": "groups",
            "h2": "Want a group or a channel instead?",
            "p": ["For a WhatsApp group, copy the group invite link from the group settings and paste it into the <a href=\"index.html#generator\">main QR code generator</a> as a link. The same works for a WhatsApp Channel link."],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where a WhatsApp QR code helps",
            "cards": [
                ("Storefronts &amp; counters", "Take questions and orders by chat."),
                ("Flyers &amp; ads", "Use a different first message per campaign to see where chats come from."),
                ("Product packaging", "Add a support or reorder chat."),
                ("Real estate &amp; services", "Let people message you about a listing or a quote."),
                ("Business cards", "Give clients another way to reach you."),
                ("Events", "Share a contact for guests and volunteers."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips",
            "p": ["A few habits keep the chat useful."],
            "bullets": [
                "<strong>Use a business number on public materials.</strong> A code on a poster can be scanned by anyone.",
                "<strong>Set expectations.</strong> Add your reply hours next to the code.",
                "<strong>Try WhatsApp Business</strong> for a business profile and quick replies.",
                "<strong>Keep the code at least about 1 inch (2.5 cm) wide</strong> and test before printing."
            ],
        },
    ],
    "faq": [
        ("How do I make a WhatsApp QR code?",
         "Enter your WhatsApp number with the country code, digits only, plus an optional message, and download the QR code. Scanning it opens a chat with you."),
        ("What number format should I use?",
         "The full international number with digits only. For the US, 1 followed by the 10-digit number, such as 15551234567."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark, and everything runs in your browser."),
        ("Does it work with WhatsApp Business?",
         "Yes. The link opens a chat with any number registered on WhatsApp or WhatsApp Business."),
        ("Can I make a QR code for a WhatsApp group?",
         "Yes. Copy the group invite link and paste it into the main QR code generator as a link."),
        ("Will it stop working if I change my number?",
         "Yes. The number is inside the code, so you need a new one if it changes."),
    ],
    "related": [
        ("instagram-qr-code-generator.html", "Instagram QR code generator"),
        ("facebook-qr-code-generator.html", "Facebook QR code generator"),
        ("index.html#generator", "Free QR code generator"),
    ],
}

EVENT = {
    "slug": "event-qr-code-generator.html",
    "crumb": "Event QR Code Generator",
    "type": "event",
    "tool_name": "Event QR Code Generator",
    "field_label": "",
    "field_placeholder": "",
    "cta": "ADD TO CALENDAR",
    "empty": "Enter an event name and start time to generate the QR code.",
    "title": "Free Event QR Code Generator | Add to Calendar QR Code — SmartQRCraft",
    "description": "Make a free calendar event QR code. Enter title, date, time and place, and guests can add the event to their calendar with one scan. PNG or SVG, no signup.",
    "og_title": "Free Event QR Code Generator | SmartQRCraft",
    "og_description": "Create an add-to-calendar QR code for invitations, posters and tickets. Free, no signup.",
    "h1": 'Free <span class="accent">Event QR Code</span> Generator',
    "lead": "Enter the event name, date, time and place. Guests scan the code and get an add-to-calendar prompt on their phone.",
    "faq_h2": "Event QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to make an add-to-calendar QR code",
            "p": ["The code stores the event details in the standard calendar format, so it works without a website."],
            "steps": [
                "Enter the <strong>event name</strong> and the <strong>start</strong> date and time.",
                "Optional: add an <strong>end</strong> time. If you leave it blank, the event lasts one hour.",
                "Optional: add the <strong>location</strong> and a short <strong>description</strong>.",
                "Choose colors and download the PNG or SVG.",
                "Scan it with an iPhone and an Android phone to see how each one offers to save the event."
            ],
        },
        {
            "kind": "prose", "id": "how-it-behaves",
            "h2": "What happens when someone scans it",
            "p": [
                "Many phones recognize a calendar code and offer to add the event to a calendar app, but behavior differs between phones and apps. Some open the calendar app straight away, and some show the raw text. Always test on the phones your guests are likely to use.",
                "The time is stored without a time zone, so the event appears at the same clock time in the guest's own calendar. For events across time zones, put the time zone in the description or link to an online event page instead."
            ],
        },
        {
            "kind": "cards", "eyebrow": "Where to Use It", "h2": "Where an event QR code helps",
            "cards": [
                ("Invitations &amp; save-the-dates", "Let guests add the date without typing."),
                ("Posters &amp; flyers", "Turn passers-by into attendees who have it in their calendar."),
                ("Conferences &amp; meetups", "Add session times on badges and schedules."),
                ("Classes &amp; workshops", "Put dates on handouts."),
                ("Webinars", "Add an online link in the description."),
                ("Reminders &amp; tickets", "Give ticket holders the date and place."),
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips",
            "p": ["A calendar code is less forgiving than a link, so check the details."],
            "bullets": [
                "<strong>Double-check the date, year and time</strong> before printing. The code cannot be edited.",
                "<strong>Keep the description short.</strong> Long text makes a dense code that needs more space.",
                "<strong>Include a web link in the description</strong> for details and updates.",
                "<strong>Print at least about 1 inch (2.5 cm) wide,</strong> larger for posters."
            ],
        },
    ],
    "faq": [
        ("How do I make a QR code for a calendar event?",
         "Enter the event name, start date and time, and optionally the end time, location and description in the generator on this page. Download the QR code and share it."),
        ("Does the QR code work on iPhone and Android?",
         "Most current phones can offer to add a calendar event from the code, but behavior differs between phones and apps. Test on both before printing."),
        ("What if I do not enter an end time?",
         "The event is set to last one hour."),
        ("Can I change the event after printing?",
         "No. Static codes cannot be edited. If details change, create and share a new code."),
        ("Are time zones supported?",
         "The time is stored without a time zone, so it appears at the same clock time for everyone. For cross-time-zone events, include the time zone in the description."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark, and it runs in your browser."),
    ],
    "related": [
        ("google-forms-qr-code-generator.html", "Google Forms QR code generator"),
        ("vcard-qr-code-generator.html", "vCard QR code generator"),
        ("qr-code-for-wedding-photos.html", "QR code for wedding photos"),
    ],
}

RESUME = {
    "slug": "resume-qr-code-generator.html",
    "crumb": "Resume QR Code Generator",
    "type": "url",
    "tool_name": "Resume QR Code Generator",
    "field_label": "Link to your portfolio, LinkedIn or online resume",
    "field_placeholder": "https://linkedin.com/in/yourname",
    "cta": "VIEW MY PORTFOLIO",
    "empty": "Paste a link to your portfolio or profile to generate the QR code.",
    "title": "Free Resume QR Code Generator | Add a QR Code to Your CV — SmartQRCraft",
    "description": "Make a free QR code for your resume or CV that links to your portfolio, LinkedIn or online resume. Download PNG or SVG. Includes what to link and where to place it.",
    "og_title": "Free Resume QR Code Generator | SmartQRCraft",
    "og_description": "Add a QR code to your resume that opens your portfolio or LinkedIn. Free, no signup.",
    "h1": 'Free <span class="accent">Resume QR Code</span> Generator',
    "lead": "Paste a link to your portfolio, LinkedIn profile or online resume and download a QR code for your CV. Recruiters scan it and see more than one page can hold.",
    "faq_h2": "Resume QR Code Questions",
    "sections": [
        {
            "kind": "prose", "id": "how-to",
            "h2": "How to add a QR code to your resume",
            "p": ["It helps when the QR code opens something useful and easy to read on a phone."],
            "steps": [
                "Decide what to link: a portfolio, your LinkedIn profile, an online resume or a project page.",
                "Paste the link into the field above.",
                "Choose a dark color that fits your resume design.",
                "Download the PNG or SVG and place it in the header or footer, about 2 cm (0.8 in) or larger.",
                "Save your resume as a PDF, then scan the code from the PDF to check it works."
            ],
        },
        {
            "kind": "table", "h2": "What should your resume QR code link to?",
            "p": ["A single clear destination works better than a page full of links."],
            "cols": ["Link to", "Best for", "Watch out for"],
            "rows": [
                ["Portfolio site", "Designers, developers, writers, photographers", "Make sure it loads fast on mobile"],
                ["LinkedIn profile", "Most professionals", "Keep your public profile up to date"],
                ["Online resume page", "Anyone who wants a mobile-friendly CV", "Keep it simple and readable"],
                ["A project or demo", "Technical and creative roles", "Send them to your best work first"],
                ["Video introduction", "Sales and client-facing roles", "Keep it short and professional"],
            ],
        },
        {
            "kind": "prose", "id": "ats",
            "h2": "A warning about applicant tracking systems",
            "p": [
                "Many companies use software to read resumes before a person sees them, and these systems often cannot read QR codes. If your resume is uploaded online, always print the link as text too, for example under the code.",
                "The code is most useful on printed resumes, at career fairs, on business cards and in portfolios, where a person will see it."
            ],
        },
        {
            "kind": "prose", "id": "tips",
            "h2": "Tips for a resume QR code",
            "p": ["Keep it professional and useful."],
            "bullets": [
                "<strong>Do not replace your contact details with a code.</strong> Keep email and phone as text.",
                "<strong>Use a clean, plain design.</strong> A dark code on white looks professional and scans best.",
                "<strong>Do not link to a private page</strong> or something that needs a login.",
                "<strong>Test the printed copy</strong> before a career fair. Check the size and contrast.",
                "<strong>Update the destination,</strong> not the code. Keep the link the same and change the content behind it."
            ],
        },
    ],
    "faq": [
        ("How do I add a QR code to my resume?",
         "Paste the link to your portfolio or LinkedIn profile into the generator on this page, download the QR code, and place it in your resume header or footer."),
        ("Should I put a QR code on my resume?",
         "It can help on printed resumes and at career fairs, when the code leads to a portfolio or profile. On online applications, also include the link as text because some systems cannot read codes."),
        ("How big should the QR code be on a resume?",
         "At least about 2 cm (0.8 in) square. Test the final PDF or print with a phone."),
        ("What should the resume QR code link to?",
         "A portfolio, LinkedIn profile or online resume that is public, fast and up to date."),
        ("Is it free?",
         "Yes. It is free, with no signup and no watermark."),
        ("Will the code stop working?",
         "It keeps working as long as the link does. Choose a stable link, and if it changes, create a new code."),
    ],
    "related": [
        ("linkedin-qr-code-generator.html", "LinkedIn QR code generator"),
        ("vcard-qr-code-generator.html", "vCard QR code generator"),
        ("pdf-to-qr-code.html", "PDF to QR code"),
    ],
}

LINK_SHARED = [YOUTUBE, FACEBOOK, GFORMS, EVENT]            # .com, .co.uk, .in
LINK_US = [SNAPCHAT, SPOTIFY, DISCORD, WEDDING, STICKERS, WHATSAPP_US, RESUME]  # .com only
