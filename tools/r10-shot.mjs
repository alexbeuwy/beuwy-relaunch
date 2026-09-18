/** R10-Abnahme: Startseite oben (Logo-Leiste lazy), Impressum, Datenschutz (Einblick-Abschnitt). */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
const ausgabe = "docs/redesign/refs/review";
const basis = process.env.BASIS || "http://localhost:3100";
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  proxy: proxy ? { server: proxy, bypass: "localhost,127.0.0.1" } : undefined,
});
const pg = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await pg.route("**beuwy-2.b-cdn.net/**", (r) => {
  const m = r.request().url().match(/\/([\w.%-]+\.webp)(?:\?|$)/);
  if (m) {
    const datei = path.join("docs/redesign/refs/fotos", decodeURIComponent(m[1]));
    if (fs.existsSync(datei)) return r.fulfill({ contentType: "image/webp", body: fs.readFileSync(datei) });
  }
  return r.abort();
});
async function schuss(pfad, name, scrollZu) {
  await pg.goto(`${basis}${pfad}`, { waitUntil: "networkidle", timeout: 90000 });
  if (scrollZu) await pg.locator(scrollZu).first().scrollIntoViewIfNeeded();
  await pg.waitForTimeout(1200);
  await pg.screenshot({ path: `${ausgabe}/${name}.png` });
  console.log("ok", name);
}
await schuss("/", "r10-start-logos", "text=Projekte mit Maklern");
await schuss("/impressum", "r10-impressum");
await schuss("/datenschutz", "r10-datenschutz-einblick", "#einblick");
await browser.close();
