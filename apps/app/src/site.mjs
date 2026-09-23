// The public website for every country, served by the one app.
// A request's Host decides the country (smartqrcraft.de -> de). Countries differ only by config
// (countries/*.json) and content (site/ shared pages, content/<code>/ country-only pages).
// Everything here is pure string work on files read through `read`/`list`, so it can run in Node now
// and from a bundled file map in a Cloudflare Worker later.
import fs from "node:fs";
import path from "node:path";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function fileSource(root) {
  return {
    read: (rel) => { try { return fs.readFileSync(path.join(root, rel)); } catch { return null; } },
    list: (dir) => { try { return fs.readdirSync(path.join(root, dir)); } catch { return []; } },
  };
}

const ICON_FILES = ["favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "site.webmanifest"];
const ICON_TAGS =
  '<link rel="icon" href="favicon.svg" type="image/svg+xml">\n' +
  '<link rel="icon" href="favicon.ico" sizes="48x48">\n' +
  '<link rel="apple-touch-icon" href="apple-touch-icon.png">\n' +
  '<link rel="manifest" href="site.webmanifest">\n';

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff",
  ".webmanifest": "application/manifest+json", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
};
export const contentType = (name) => TYPES[path.extname(name).toLowerCase()] || "application/octet-stream";

export function createSite(src, { cache = true } = {}) {
  const text = (rel) => { const b = src.read(rel); return b === null ? null : b.toString("utf8"); };
  const common = JSON.parse(text("countries/_common.json"));
  const countries = {};
  for (const f of src.list("countries")) {
    if (!f.endsWith(".json") || f.startsWith("_")) continue;
    const c = JSON.parse(text("countries/" + f));
    c.code = f.slice(0, -5);
    countries[c.code] = c;
  }
  const ordered = Object.values(countries).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const byHost = new Map();
  for (const c of ordered) {
    byHost.set(c.domain, c);
    byHost.set("www." + c.domain, c);
    byHost.set(c.code + ".localhost", c); // local development: de.localhost:8700 is the German site
  }
  const defaultCountry = ordered.find((c) => c.domain === common.default_domain);
  const shared = new Set(src.list("site").filter((n) => n.endsWith(".html")));
  const localPages = (c) => new Set(src.list("content/" + c.code).filter((n) => n.endsWith(".html")));
  const LOCAL = Object.fromEntries(ordered.map((c) => [c.code, localPages(c)]));
  const hubName = (c) => c.hub_page || common.hub_default;

  function hasPage(c, name) {
    if (LOCAL[c.code].has(name)) return true;
    if (c.own_pages_only || !shared.has(name)) return false;
    return !(c.skip_pages || []).includes(name);
  }
  const countriesFor = (name) => ordered.filter((c) => hasPage(c, name));
  const pageUrl = (c, name) => `https://${c.domain}/` + (name === "index.html" ? "" : name);

  // ----- one page, the same steps the old per-domain build did -----
  function hreflang(name) {
    const list = countriesFor(name);
    const tags = list.map((c) => `<link rel="alternate" hreflang="${c.hreflang}" href="${pageUrl(c, name)}">`);
    if (list.includes(defaultCountry)) tags.push(`<link rel="alternate" hreflang="x-default" href="${pageUrl(defaultCountry, name)}">`);
    return tags.join("\n");
  }
  function setMeta(html, re, value) {
    return html.replace(re, (m, a, b) => a + value + b);
  }
  function overrides(html, ov) {
    if (!ov) return html;
    if ("title" in ov) html = setMeta(html, /(<title>)[^<]*(<\/title>)/, ov.title);
    if ("description" in ov) html = setMeta(html, /(<meta name="description" content=")[^"]*("\s*>)/, ov.description);
    if ("og_title" in ov) html = setMeta(html, /(<meta property="og:title" content=")[^"]*(">)/, ov.og_title);
    if ("og_description" in ov) html = setMeta(html, /(<meta property="og:description" content=")[^"]*(">)/, ov.og_description);
    if ("h1" in ov) html = setMeta(html, /(<h1[^>]*>)[\s\S]*?(<\/h1>)/, ov.h1);
    return html;
  }
  function shortenTitle(html) {
    const suffix = common.brand_suffix;
    const m = html.match(/<title>([^<]*)<\/title>/);
    if (m && m[1].length > 62 && m[1].endsWith(suffix)) html = html.replace(m[0], "<title>" + m[1].slice(0, -suffix.length) + "</title>");
    return html;
  }
  function pruneLinks(html, present) {
    html = html.replace(/<li><a href="([^"#?]+\.html)(?:[#?][^"]*)?">[\s\S]*?<\/a><\/li>/g, (m, href) => (present.has(href) ? m : ""));
    return html.replace(/<a href="([^"#?]+\.html)(?:[#?][^"]*)?"[^>]*>([\s\S]*?)<\/a>/g, (m, href, inner) => (present.has(href) ? m : inner));
  }
  function addIcons(html) {
    return !html.includes('rel="icon"') && html.includes("</head>") ? html.replace("</head>", ICON_TAGS + "</head>") : html;
  }

  function renderPage(c, name) {
    const raw = LOCAL[c.code].has(name) ? text(`content/${c.code}/${name}`) : text("site/" + name);
    let html = raw.split(`https://${common.default_domain}`).join(`https://${c.domain}`);
    html = html.replace(/<html lang="[^"]*"/, `<html lang="${c.lang}"`);
    html = html.replace('<meta property="og:site_name"', `<meta property="og:locale" content="${c.og_locale}">\n<meta property="og:site_name"`);
    const canon = `<link rel="canonical" href="${pageUrl(c, name)}">`;
    html = html.replace(canon, canon + "\n" + hreflang(name));
    html = html.split('"priceCurrency": "USD"').join(`"priceCurrency": "${c.currency}"`);
    html = html.replace(/<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\s*/g, ""); // fonts are self-hosted
    html = shortenTitle(overrides(html, (c.meta_overrides || {})[name]));
    return addIcons(pruneLinks(html, pagesOf(c)));
  }

  function renderHub(c) {
    const lang = c.lang.slice(0, 2);
    const tx = common.hub_text[lang] || common.hub_text.en;
    const fname = hubName(c);
    const notIn = new Set(common.not_in_sitemap);
    const entries = [];
    for (const p of pageList(c)) {
      if (p === "index.html" || p === fname || notIn.has(p)) continue;
      const h = page(c, p);
      const m1 = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/); // article pages style their h1
      const m2 = h.match(/<meta name="description" content="([^"]*)"/);
      if (m1) entries.push([p, strip(m1[1]), m2 ? m2[1] : ""]);
    }
    entries.sort((a, b) => (a[1].toLowerCase() < b[1].toLowerCase() ? -1 : a[1].toLowerCase() > b[1].toLowerCase() ? 1 : 0));
    const cards = (items) => items.map(([p, h, d]) => `<a class="card" href="${p}" style="text-decoration:none;color:inherit"><div><h3>${h}</h3><p>${d}</p></div></a>`).join("");
    const tools = entries.filter((e) => common.tool_pages.includes(e[0]));
    const guides = entries.filter((e) => common.guide_pages.includes(e[0]));
    const types = entries.filter((e) => !common.tool_pages.includes(e[0]) && !common.guide_pages.includes(e[0]));
    const guidesHtml = guides.length ? `<section class="bg-lavender"><div class="wrap"><div class="section-head"><h2>${tx.guides}</h2></div><div class="card-grid">${cards(guides)}</div></div></section>` : "";
    const i18n = lang === "de" ? '<script src="assets/i18n-de.js"></script>\n' : "";
    const url = pageUrl(c, fname);
    const html = `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${tx.title}</title>
<meta name="description" content="${tx.description}">
<link rel="canonical" href="${url}">
<meta property="og:site_name" content="SmartQRCraft">
<meta property="og:title" content="${tx.title}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${c.og_locale}">
<meta name="theme-color" content="#6D28D9">
<link rel="stylesheet" href="assets/styles.css">
</head>
<body data-base="">
<div id="site-header"></div>
<main>
  <div class="wrap breadcrumbs"><a href="index.html">${tx.home}</a><span class="sep">/</span><span class="current">${tx.crumb}</span></div>
  <section><div class="wrap"><div class="section-head" style="text-align:left"><h1 style="font-size:34px">${tx.h1}</h1><p style="color:var(--muted);margin-top:10px">${tx.lead}</p></div></div></section>
  <section class="bg-lavender"><div class="wrap"><div class="section-head"><h2>${tx.tools}</h2></div><div class="card-grid">${cards(tools)}</div></div></section>
  <section><div class="wrap"><div class="section-head"><h2>${tx.types}</h2></div><div class="card-grid">${cards(types)}</div></div></section>
  ${guidesHtml}
</main>
<div id="site-footer"></div>
${i18n}<script src="assets/components.js"></script>
</body>
</html>
`;
    return addIcons(html);
  }

  function componentsJs(c) {
    const pages = pagesOf(c);
    let labels = { ...common.footer_labels, ...(c.footer_labels || {}) };
    if (c.footer_only_own) labels = Object.fromEntries(Object.entries(labels).filter(([k]) => k in (c.footer_labels || {})));
    const all = pageList(c);
    const order = common.footer_priority.filter((p) => pages.has(p) && labels[p]);
    for (const p of all) if (labels[p] && !order.includes(p)) order.push(p);
    const lines = order.slice(0, common.footer_max).map((p) => `      '<li><a href="' + base + '${p}">${labels[p]}</a></li>' +\n`).join("");
    return text("site/assets/components.js").replace(/(\/\*TOOLLINKS\*\/\r?\n)[\s\S]*?(\s*\/\*ENDTOOLLINKS\*\/)/, (m, a, b) => a + lines + b);
  }

  function embedJs() {
    let lib = text("site/assets/qrcode-lib.js");
    const cut = lib.indexOf("(function (factory) {");
    if (cut > 0) lib = lib.slice(0, cut);
    return "/*! SmartQRCraft QR widget - https://smartqrcraft.com/qr-code-widget.html | bundles qrcode-generator (c) 2009 Kazuhiko Arase, MIT License */\n" +
      "(function () {\n" + lib + "\n" + text("widgets/embed-core.js") + "\n})();\n";
  }

  function sitemap(c) {
    const notIn = new Set(common.not_in_sitemap);
    const rows = pageList(c).filter((p) => !notIn.has(p)).map((p) => {
      const list = countriesFor(p);
      let alts = list.map((o) => `    <xhtml:link rel="alternate" hreflang="${o.hreflang}" href="${pageUrl(o, p)}"/>`).join("\n");
      if (list.includes(defaultCountry)) alts += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(defaultCountry, p)}"/>`;
      return `  <url>\n    <loc>${pageUrl(c, p)}</loc>\n${alts}\n    <priority>${p === "index.html" ? "1.0" : "0.8"}</priority>\n  </url>`;
    });
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      rows.join("\n") + "\n</urlset>\n";
  }

  // ----- page lists and a small cache (rendering is deterministic per country) -----
  const memo = new Map();
  const cached = (key, fn) => {
    if (!cache) return fn();
    if (!memo.has(key)) memo.set(key, fn());
    return memo.get(key);
  };
  // every page of a country, index first, then alphabetical; the hub page last (as in the sitemap)
  function pageList(c) {
    return cached(c.code + ":list", () => {
      const names = new Set([...shared].filter((n) => hasPage(c, n)).concat([...LOCAL[c.code]]));
      const list = [...names].sort((a, b) => (a === "index.html" ? -1 : b === "index.html" ? 1 : a < b ? -1 : a > b ? 1 : 0));
      list.push(hubName(c));
      return list;
    });
  }
  function pagesOf(c) { return cached(c.code + ":set", () => new Set(pageList(c))); }
  function page(c, name) {
    return cached(`${c.code}:page:${name}`, () => (name === hubName(c) ? renderHub(c) : renderPage(c, name)));
  }

  function countryFor(host) {
    const h = String(host || "").toLowerCase().replace(/:\d+$/, "");
    return byHost.get(h) || null;
  }

  // Returns { status, type, body, headers } or null when the path is not part of the website.
  function respond(host, pathname) {
    const h = String(host || "").toLowerCase().replace(/:\d+$/, "");
    const c = byHost.get(h) || (h === "localhost" || h === "127.0.0.1" ? defaultCountry : null);
    if (!c) return { status: 404, type: TYPES[".txt"], body: "Unknown site." };
    if (h === "www." + c.domain) return { status: 301, headers: { location: `https://${c.domain}${pathname}` }, body: "" };
    let name;
    try { name = decodeURIComponent(pathname.replace(/^\/+/, "")) || "index.html"; } catch { return null; }
    if (name.includes("..") || name.includes("\\")) return null;
    if (name === "robots.txt")
      return { status: 200, type: TYPES[".txt"], body: `User-agent: *\nAllow: /\n\nSitemap: https://${c.domain}/sitemap.xml\n` };
    if (name === "sitemap.xml") return { status: 200, type: TYPES[".xml"], body: cached(c.code + ":sitemap", () => sitemap(c)) };
    if (name === "embed.js") return { status: 200, type: TYPES[".js"], body: cached("embed", embedJs), cacheable: true };
    if (name === "assets/components.js") return { status: 200, type: TYPES[".js"], body: cached(c.code + ":components", () => componentsJs(c)) };
    if (name.endsWith(".html")) {
      if (!pagesOf(c).has(name)) return null;
      return { status: 200, type: TYPES[".html"], body: page(c, name), country: c.code };
    }
    if (name.startsWith("assets/") || ICON_FILES.includes(name)) {
      const b = src.read("site/" + name);
      return b === null ? null : { status: 200, type: contentType(name), body: b, cacheable: true };
    }
    return null;
  }

  return { countries: ordered, defaultCountry, countryFor, pageList, page, respond, sitemap, componentsJs, pageUrl };
}
