/**
 * Review-Werkzeug für die Vasen-Auftritte auf der Startseite:
 * scrollt Spiegel-, Abgrenzungs- und Prozess-Sektion mittig in den
 * Viewport und schießt jeweils das sichtbare Bild (Parallax-Stand
 * wie beim echten Lesen). Aufruf: node tools/vasen-shot.mjs (Server :3100)
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const basis = "http://localhost:3100";
const ausgabe = "docs/redesign/refs/review";
fs.mkdirSync(ausgabe, { recursive: true });

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  proxy: proxy ? { server: proxy, bypass: "localhost,127.0.0.1" } : undefined,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pg = await ctx.newPage();

await pg.route("**beuwy-2.b-cdn.net/**", (r) => {
  const url = r.request().url();
  const m = url.match(/\/([\w.-]+\.webp)(?:\?|$)/);
  if (m) {
    const datei = path.join("docs/redesign/refs/fotos", decodeURIComponent(m[1]));
    if (fs.existsSync(datei)) {
      return r.fulfill({ contentType: "image/webp", body: fs.readFileSync(datei) });
    }
  }
  return r.abort();
});

await pg.goto(basis + "/", { waitUntil: "load", timeout: 60000 });
await pg.waitForTimeout(2000);
// Einmal durchscrollen, damit alle Reveals gefeuert haben
await pg.evaluate(async () => {
  const schritt = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += schritt) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await pg.waitForTimeout(800);

const ziele = [
  ["spiegel", "text=Sie sind unter den Besten"],
  ["abgrenzung", "text=Ein Portal bringt seit"],
  ["prozess", "text=Vier Termine reichen."],
];
for (const [name, selektor] of ziele) {
  const el = pg.locator(selektor).first();
  await el.scrollIntoViewIfNeeded();
  await pg.evaluate(() => window.scrollBy(0, -120));
  await pg.waitForTimeout(900);
  await pg.screenshot({ path: `${ausgabe}/vasen-${name}.png` });
  console.log("ok:", name);
}
await browser.close();
