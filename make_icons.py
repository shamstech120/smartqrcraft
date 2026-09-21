#!/usr/bin/env python3
"""Generate the site icons into site/: favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png,
site.webmanifest. Same mark as the header logo (violet rounded square with the QR-style squares)."""
import json
from pathlib import Path
from PIL import Image, ImageDraw

SITE = Path(__file__).parent / "site"
VIOLET = (109, 40, 217, 255)  # #6D28D9
# (x, y, w, h, radius, alpha) in a 24-unit box, same as the header logo
SQUARES = [
    (3, 3, 7, 7, 2, 1.0), (14, 3, 7, 7, 2, 0.55), (3, 14, 7, 7, 2, 0.55),
    (14, 14, 3, 3, 1, 1.0), (18, 14, 3, 3, 1, 0.55), (14, 18, 3, 3, 1, 0.55), (18, 18, 3, 3, 1, 1.0),
]


def render(size=1024, padding_units=4, corner=7.0):
    unit = size / 32.0
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=corner * unit, fill=VIOLET)
    for x, y, w, h, r, a in SQUARES:
        layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        x0 = (padding_units + x) * unit
        y0 = (padding_units + y) * unit
        ld.rounded_rectangle([x0, y0, x0 + w * unit, y0 + h * unit], radius=r * unit, fill=(255, 255, 255, int(255 * a)))
        img = Image.alpha_composite(img, layer)
    return img


def svg():
    rects = "".join(
        f'<rect x="{4 + x}" y="{4 + y}" width="{w}" height="{h}" rx="{r}" fill="#fff"' + (f' fill-opacity="{a}"' if a < 1 else "") + "/>"
        for x, y, w, h, r, a in SQUARES)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
            '<rect width="32" height="32" rx="7" fill="#6D28D9"/>' + rects + "</svg>\n")


def main():
    big = render(1024)
    (SITE / "favicon.svg").write_text(svg(), encoding="utf-8")
    for name, px in (("icon-512.png", 512), ("icon-192.png", 192), ("apple-touch-icon.png", 180)):
        img = big
        if name == "apple-touch-icon.png":
            # iOS rounds the corners itself, so give it a full-bleed square
            img = render(1024, corner=0)
        img.resize((px, px), Image.LANCZOS).save(SITE / name, optimize=True)
    icons = [big.resize((s, s), Image.LANCZOS) for s in (16, 32, 48)]
    icons[2].save(SITE / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)], append_images=icons[:2])
    manifest = {
        "name": "SmartQRCraft", "short_name": "SmartQRCraft", "start_url": "/", "display": "browser",
        "theme_color": "#6D28D9", "background_color": "#ffffff",
        "icons": [
            {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
        ],
    }
    (SITE / "site.webmanifest").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print("icons written to", SITE)


if __name__ == "__main__":
    main()
