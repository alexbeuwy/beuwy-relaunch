#!/usr/bin/env node
/**
 * Importer für die WordPress-Media-Library von beuwy.com.
 *
 * Läuft in GitHub Actions (Runner hat offenen Egress; der Sandbox-Container
 * dieser Claude-Code-Session kommt an externe Hosts nicht ran).
 *
 * Strategie:
 *   1) Versuche WP REST API: /wp-json/wp/v2/media?per_page=100&page=N
 *      → bei Erfolg sauber paginiert + strukturierte Metadaten.
 *   2) Fallback: parse die WordPress-Sitemap, fetche jede Seite,
 *      extrahiere alle <img>-Tags und OG-Bilder mit Regex.
 *
 * Output:
 *   public/assets/wp/<original-filename>      — Bilddateien
 *   public/assets/wp/_manifest.json           — { source, fetchedAt, items: [...] }
 *
 * Filter:
 *   • Nur jpg/jpeg/png/webp/avif/gif/svg
 *   • Max MAX_BYTES pro Datei (skipped bei Übergröße)
 *   • Max MAX_FILES insgesamt (jüngste zuerst, ältere fallen raus)
 */

const fs = require("fs");
const path = require("path");

const SITE = process.env.WP_SITE_URL || "https://beuwy.com";
const OUT_DIR = path.resolve(__dirname, "..", "public", "assets", "wp");
const MAX_FILES = Number(process.env.MAX_FILES || 200);
const MAX_BYTES = Number(process.env.MAX_BYTES || 4 * 1024 * 1024); // 4 MB / Datei
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const IMG_EXT = new Set(["jpg", "jpeg", "png", "webp", "avif", "gif", "svg"]);

const fetchBuf = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
};
const fetchText = async (url) => (await fetchBuf(url)).toString("utf-8");
const fetchJson = async (url) => JSON.parse(await fetchText(url));

const normalizeUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("/")) return SITE.replace(/\/$/, "") + url;
  if (!/^https?:\/\//i.test(url)) return null;
  return url;
};

const safeName = (url) => {
  const n = normalizeUrl(url);
  if (!n) return "image";
  try {
    const u = new URL(n);
    const base = path.basename(u.pathname).split("?")[0].toLowerCase();
    return base.replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  } catch {
    return "image";
  }
};

const ext = (url) => {
  const m = url.toLowerCase().match(/\.([a-z0-9]+)(?:\?|$)/);
  return m ? m[1] : "";
};

const uniqByName = (urls) => {
  const seen = new Map();
  for (const u of urls) {
    const k = safeName(u);
    if (!seen.has(k)) seen.set(k, u);
  }
  return [...seen.values()];
};

/* ---------- Source A: WP REST API ---------- */
async function viaRestApi() {
  const items = [];
  let page = 1;
  for (;;) {
    const url = `${SITE}/wp-json/wp/v2/media?per_page=100&page=${page}&_fields=id,date,source_url,media_details,alt_text,title`;
    let batch;
    try {
      batch = await fetchJson(url);
    } catch (e) {
      if (page === 1) throw e;
      break; // pagination ende
    }
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const m of batch) {
      if (!m?.source_url) continue;
      items.push({
        url: m.source_url,
        alt: m?.alt_text || "",
        title: typeof m?.title?.rendered === "string" ? m.title.rendered : "",
        date: m?.date || "",
      });
    }
    if (batch.length < 100) break;
    page++;
    if (page > 20) break; // hard cap
  }
  return { source: "wp-rest-api", items };
}

/* ---------- Source B: Sitemap-Crawl + HTML-Scrape ---------- */
async function viaSitemap() {
  const seenPages = new Set();
  const pages = [];

  const pushIfPage = (loc) => {
    if (!loc || seenPages.has(loc)) return;
    if (/\.(xml|gz)(\?|$)/i.test(loc)) return; // weitere Sitemap-Files
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg|pdf)(\?|$)/i.test(loc)) return;
    seenPages.add(loc);
    pages.push(loc);
  };

  const ingestSitemap = async (sitemapUrl) => {
    let xml;
    try {
      xml = await fetchText(sitemapUrl);
    } catch (e) {
      console.warn("sitemap miss", sitemapUrl, String(e));
      return;
    }
    // <loc>https://...</loc>
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    const subSitemaps = locs.filter((l) => /\.xml(\.gz)?$/i.test(l));
    const childPages = locs.filter((l) => !/\.xml(\.gz)?$/i.test(l));
    childPages.forEach(pushIfPage);
    for (const sm of subSitemaps) await ingestSitemap(sm);
  };

  // Probier alle gängigen WP-Sitemap-Pfade
  for (const sm of [
    `${SITE}/wp-sitemap.xml`,
    `${SITE}/sitemap.xml`,
    `${SITE}/sitemap_index.xml`,
  ]) {
    try {
      await ingestSitemap(sm);
      if (pages.length) break;
    } catch {}
  }

  // Falls Sitemap leer/blockiert: zumindest die Startseite + ein paar Standard-Routen
  if (pages.length === 0) {
    for (const p of ["", "/", "/about", "/work", "/portfolio", "/case-studies", "/leistungen", "/kontakt"]) {
      pushIfPage(`${SITE}${p}`);
    }
  }

  const PAGE_CAP = 80;
  const pageList = pages.slice(0, PAGE_CAP);
  console.log(`scraping ${pageList.length} pages for <img>`);

  const items = [];
  for (const url of pageList) {
    let html;
    try {
      html = await fetchText(url);
    } catch (e) {
      console.warn("page miss", url, String(e));
      continue;
    }
    // <img src=...>, <source srcset=...>, <meta property="og:image" content=...>
    const urls = [];
    for (const m of html.matchAll(/<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>/gi)) urls.push(m[1]);
    for (const m of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
      // pick the biggest from the srcset
      const cand = m[1]
        .split(",")
        .map((s) => s.trim().split(/\s+/)[0])
        .filter(Boolean);
      urls.push(...cand);
    }
    for (const m of html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/gi)) {
      urls.push(m[1]);
    }
    for (const raw of urls) {
      const u = normalizeUrl(raw);
      if (!u) continue;
      if (!IMG_EXT.has(ext(u))) continue;
      items.push({ url: u, alt: "", title: "", date: "" });
    }
  }
  // dedupe by filename
  const dedup = [];
  const seen = new Set();
  for (const it of items) {
    const k = safeName(it.url);
    if (seen.has(k)) continue;
    seen.add(k);
    dedup.push(it);
  }
  return { source: "sitemap-scrape", items: dedup };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let collected;
  try {
    console.log(`trying WP REST API at ${SITE}/wp-json/wp/v2/media …`);
    collected = await viaRestApi();
    console.log(`  REST API: ${collected.items.length} items`);
  } catch (e) {
    console.log(`  REST API failed: ${String(e)} → falling back to sitemap scrape`);
    collected = await viaSitemap();
    console.log(`  sitemap scrape: ${collected.items.length} items`);
  }

  if (!collected.items.length && collected.source === "wp-rest-api") {
    console.log("REST API returned 0 items — trying sitemap as well");
    const sm = await viaSitemap();
    if (sm.items.length) collected = { source: "sitemap-scrape", items: sm.items };
  }

  // normalize URLs + dedupe + cap + filter
  let items = collected.items
    .map((it) => ({ ...it, url: normalizeUrl(it.url) }))
    .filter((it) => it.url && IMG_EXT.has(ext(it.url)))
    .filter((it, i, a) => a.findIndex((b) => safeName(b.url) === safeName(it.url)) === i)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, MAX_FILES);

  console.log(`downloading ${items.length} unique images → ${OUT_DIR}`);

  const manifest = { source: collected.source, fetchedAt: new Date().toISOString(), site: SITE, items: [] };
  let ok = 0,
    fail = 0,
    skipped = 0;

  for (const it of items) {
    const fname = safeName(it.url);
    const fp = path.join(OUT_DIR, fname);
    try {
      const buf = await fetchBuf(it.url);
      if (buf.length > MAX_BYTES) {
        console.warn(`  SKIP (too big ${buf.length}b) ${it.url}`);
        skipped++;
        continue;
      }
      fs.writeFileSync(fp, buf);
      manifest.items.push({
        file: `public/assets/wp/${fname}`,
        url: it.url,
        alt: it.alt,
        title: it.title,
        bytes: buf.length,
      });
      ok++;
      if (ok % 10 === 0) console.log(`  …${ok}/${items.length}`);
    } catch (e) {
      console.warn(`  FAIL ${it.url} — ${String(e)}`);
      fail++;
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, "_manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`done · ok=${ok} fail=${fail} skipped=${skipped} · manifest at ${path.join(OUT_DIR, "_manifest.json")}`);
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
