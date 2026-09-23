// Writes the example QR codes shown on qr-code-beispiele.html (site/assets/beispiele/*.svg, German)
// and qr-code-examples.html (site/assets/examples/*.svg, English). Phone numbers are reserved fictional ranges.
// Run: node widgets/make-examples.mjs   (uses the same engine as the generator)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
globalThis.window = globalThis;
const load = (f, tail = "") => new Function(fs.readFileSync(path.join(root, "site/assets", f), "utf8") + tail).call(globalThis);
load("qrcode-lib.js", "\n;globalThis.qrcode = qrcode;"); // the library declares a local var
load("qr-engine.js");
const Q = globalThis.SmartQR;

const SETS = {};
SETS.beispiele = [
  ["link", "url", { value: "https://smartqrcraft.de" }, { fg: "#111827", style: "square", eyeStyle: "classic" }],
  ["wlan", "wifi", { ssid: "Cafe_Gast", password: "Beispiel2026", security: "WPA" }, { fg: "#0369A1", style: "rounded", eyeStyle: "rounded", frameText: "WLAN", frameStyle: "bottom" }],
  ["visitenkarte", "vcard", { name: "Anna", lastName: "Beispiel", org: "Muster GmbH", phone: "+49 30 23125123", email: "anna@example.com" }, { fg: "#6D28D9", style: "rounded", eyeStyle: "rounded" }],
  ["telefon", "phone", { value: "+49 30 23125123" }, { fg: "#065F46", style: "square", eyeStyle: "rounded", frameText: "ANRUFEN", frameStyle: "badge" }],
  ["e-mail", "email", { to: "hallo@example.com", subject: "Anfrage" }, { fg: "#9A3412", style: "rounded", eyeStyle: "circle" }],
  ["text", "text", { value: "Hallo! Das ist ein Beispiel für einen Text-QR-Code." }, { fg: "#111827", style: "square", eyeStyle: "rounded" }],
];

SETS.examples = [
  ["link", "url", { value: "https://smartqrcraft.com" }, { fg: "#111827", style: "square", eyeStyle: "classic" }],
  ["wifi", "wifi", { ssid: "Cafe_Guest", password: "Example2026", security: "WPA" }, { fg: "#0369A1", style: "rounded", eyeStyle: "rounded", frameText: "WIFI", frameStyle: "bottom" }],
  ["contact", "vcard", { name: "Alex", lastName: "Example", org: "Example Inc.", phone: "+1 202 555 0147", email: "alex@example.com" }, { fg: "#6D28D9", style: "rounded", eyeStyle: "rounded" }],
  ["call", "phone", { value: "+1 202 555 0147" }, { fg: "#065F46", style: "square", eyeStyle: "rounded", frameText: "CALL US", frameStyle: "badge" }],
  ["email", "email", { to: "hello@example.com", subject: "Hello" }, { fg: "#9A3412", style: "rounded", eyeStyle: "circle" }],
  ["hello", "text", { value: "Hello! This is a sample QR code from SmartQRCraft." }, { fg: "#111827", style: "square", eyeStyle: "rounded" }],
  ["heart", "text", { value: "Hello! Made with love." }, { fg: "#BE123C", style: "rounded", eyeStyle: "rounded", frameText: "SCAN ME", frameStyle: "heart" }],
  ["blue", "url", { value: "https://smartqrcraft.com" }, { fg: "#1D4ED8", style: "rounded", eyeStyle: "rounded" }],
];

for (const [dir, list] of Object.entries(SETS)) {
const out = path.join(root, "site/assets", dir);
fs.mkdirSync(out, { recursive: true });
for (const [name, type, fields, look] of list) {
  const payload = Q.buildPayload(type, fields);
  const svg = Q.renderToSVG(payload, { size: 320, bg: "#ffffff", margin: 4, ecc: "M", ...look });
  fs.writeFileSync(path.join(out, name + ".svg"), svg);
  console.log(name, payload.replace(/\n/g, " | "));
}
}
