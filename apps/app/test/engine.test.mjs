// The QR engine and the embed widget must encode text as UTF-8 (umlauts, euro sign, emoji).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createSite, fileSource } from "../src/site.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

function loadEngine() {
  const g = { };
  g.window = g;
  new Function("window", "globalThis", read("site/assets/qrcode-lib.js") + "\n;window.qrcode = qrcode;").call(g, g, g);
  new Function("window", read("site/assets/qr-engine.js").replace("})(window);", "})(window);")).call(g, g);
  return g;
}

test("the generator encodes text as UTF-8", () => {
  const g = loadEngine();
  g.SmartQR.renderToSVG("Grüße für Müller: 5 €", { size: 200 });
  assert.deepEqual(g.qrcode.stringToBytes("ü"), [0xc3, 0xbc]);
  assert.deepEqual(g.qrcode.stringToBytes("€"), [0xe2, 0x82, 0xac]);
});

test("the embed widget bundle encodes text as UTF-8", () => {
  const site = createSite(fileSource(ROOT));
  const js = site.respond("smartqrcraft.com", "/embed.js").body;
  assert.match(js, /qrcode\.stringToBytes = qrcode\.stringToBytesFuncs\["UTF-8"\]/);
});
