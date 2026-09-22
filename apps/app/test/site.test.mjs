// The website checks that qa.py used to run over four output folders, now run against the one app:
// every country's pages are rendered in memory, the country chosen by Host.
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createSite, fileSource } from "../src/site.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const site = createSite(fileSource(ROOT));

const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([a-z:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map((m) => attrs(m[0]));
const exists = (c, rel) => {
  const r = site.respond(c.domain, "/" + rel);
  return !!r && r.status === 200;
};

test("every country page passes the SEO and link checks", () => {
  const problems = [];
  let checked = 0;
  for (const c of site.countries) {
    for (const name of site.pageList(c)) {
      const html = site.page(c, name);
      const where = `${c.domain}/${name}`;
      checked++;
      const meta = Object.fromEntries(tags(html, "meta").filter((m) => m.name).map((m) => [m.name, m.content || ""]));
      const noindex = (meta.robots || "").includes("noindex");
      const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
      if (!title.trim()) problems.push(`${where}: missing title`);
      else if (title.length > 70) problems.push(`${where}: title long (${title.length})`);
      const d = meta.description || "";
      if (!noindex && !(d.length >= 70 && d.length <= 175)) problems.push(`${where}: description length ${d.length}`);
      const h1 = (html.match(/<h1\b/g) || []).length;
      if (h1 !== 1) problems.push(`${where}: ${h1} h1`);
      const expected = site.pageUrl(c, name);
      const canon = tags(html, "link").find((l) => l.rel === "canonical");
      if (!canon || canon.href !== expected) problems.push(`${where}: canonical ${canon && canon.href}`);
      if ((html.match(/<html lang="([^"]+)"/) || [])[1] !== c.lang) problems.push(`${where}: wrong lang`);
      for (const a of tags(html, "a")) {
        const href = a.href;
        if (!href || /^(https?:|mailto:|#|tel:)/.test(href)) continue;
        const target = href.split("#")[0].split("?")[0];
        if (target && !exists(c, target)) problems.push(`${where}: broken link ${href}`);
      }
      const assets = [...tags(html, "script").map((s) => s.src), ...tags(html, "img").map((i) => i.src),
        ...tags(html, "link").filter((l) => l.rel === "stylesheet").map((l) => l.href)].filter(Boolean);
      for (const a of assets) {
        if (/^https?:/.test(a)) problems.push(`${where}: external asset ${a}`);
        else if (!exists(c, a)) problems.push(`${where}: missing asset ${a}`);
      }
      if (html.includes("fonts.g")) problems.push(`${where}: Google Fonts referenced`);
      const alts = tags(html, "link").filter((l) => l.rel === "alternate" && l.hreflang);
      if (alts.length && !noindex) {
        if (!alts.some((l) => l.href === expected)) problems.push(`${where}: hreflang lacks self`);
        for (const l of alts) {
          const m = l.href.match(/^https:\/\/([^/]+)\/(.*)$/);
          const other = m && site.countries.find((o) => o.domain === m[1]);
          if (!other || !site.pageList(other).includes(m[2] || "index.html")) problems.push(`${where}: hreflang ${l.hreflang} -> missing ${l.href}`);
        }
      }
    }
    const sm = site.respond(c.domain, "/sitemap.xml").body;
    for (const [, loc] of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const m = loc.match(/^https:\/\/([^/]+)\/(.*)$/);
      if (m[1] !== c.domain || !exists(c, m[2] || "index.html")) problems.push(`${c.domain}/sitemap.xml: bad loc ${loc}`);
    }
  }
  assert.ok(checked > 100, `only ${checked} pages checked`);
  assert.deepEqual(problems, []);
});

test("the Host header picks the country", () => {
  const de = site.respond("smartqrcraft.de", "/");
  assert.equal(de.status, 200);
  assert.match(de.body, /<html lang="de"/);
  assert.match(de.body, /<link rel="canonical" href="https:\/\/smartqrcraft\.de\/">/);
  const com = site.respond("smartqrcraft.com", "/");
  assert.match(com.body, /<html lang="en"/);
  assert.equal(site.respond("smartqrcraft.in", "/upi-qr-code-generator.html").status, 200);
  // a country-only page does not exist on other domains
  assert.equal(site.respond("smartqrcraft.com", "/upi-qr-code-generator.html"), null);
  assert.equal(site.respond("smartqrcraft.de", "/wifi-qr-code-generator.html"), null);
  // local development hosts
  assert.match(site.respond("de.localhost:8700", "/").body, /<html lang="de"/);
  assert.match(site.respond("localhost:8700", "/").body, /<html lang="en"/);
});

test("www redirects to the bare domain and unknown hosts get nothing", () => {
  const r = site.respond("www.smartqrcraft.co.uk", "/wifi-qr-code-generator.html");
  assert.equal(r.status, 301);
  assert.equal(r.headers.location, "https://smartqrcraft.co.uk/wifi-qr-code-generator.html");
  assert.equal(site.respond("evil.example", "/").status, 404);
});

test("robots, sitemap and footer are per country", () => {
  assert.match(site.respond("smartqrcraft.in", "/robots.txt").body, /Sitemap: https:\/\/smartqrcraft\.in\/sitemap\.xml/);
  assert.match(site.respond("smartqrcraft.de", "/sitemap.xml").body, /<loc>https:\/\/smartqrcraft\.de\/wlan-qr-code-generator\.html<\/loc>/);
  assert.match(site.respond("smartqrcraft.de", "/assets/components.js").body, /QR-Code Scanner/);
  assert.doesNotMatch(site.respond("smartqrcraft.com", "/assets/components.js").body, /QR-Code Scanner/);
});

test("path traversal is refused", () => {
  assert.equal(site.respond("smartqrcraft.com", "/../countries/us.json"), null);
  assert.equal(site.respond("smartqrcraft.com", "/assets/..%2F..%2Fcountries%2Fus.json"), null);
});
