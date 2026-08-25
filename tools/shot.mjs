/**
 * Screenshot-Werkzeug fürs Redesign-Review.
 * Aufruf: node tools/shot.mjs <route> <name> [nurDesktop]
 * Beispiel: node tools/shot.mjs /immobilienmarketing hub
 *
 * Schreibt docs/redesign/refs/review/<name>-desktop.png und -mobil.png.
 * Die Sandbox erreicht das CDN im Browser nicht — Requests auf
 * beuwy-2.b-cdn.net werden abgefangen und aus docs/redesign/refs/fotos/
 * beantwortet (Videos: abgebrochen, das Poster übernimmt). Auf Vercel
 * lädt das CDN normal; das hier ist nur Review-Infrastruktur.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const [route = "/", name = "seite", nurDesktop] = process.argv.slice(2);
const basis = "http://localhost:3100";
const ausgabe = "docs/redesign/refs/review";
fs.mkdirSync(ausgabe, { recursive: true });

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  proxy: proxy ? { server: proxy, bypass: "localhost,127.0.0.1" } : undefined,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

async function cdnLokal(pg) {
  await pg.route("**beuwy-2.b-cdn.net/**", (r) => {
    const url = r.request().url();
    const m = url.match(/makler-(\d+)\.webp/);
    if (m) {
      const datei = path.join("docs/redesign/refs/fotos", `makler-${m[1]}.webp`);
      if (fs.existsSync(datei)) {
        return r.fulfill({ contentType: "image/webp", body: fs.readFileSync(datei) });
      }
    }
    return r.abort();
  });
}

async function schuss(breite, hoehe, suffix) {
  const pg = await ctx.newPage();
  await cdnLokal(pg);
  await pg.setViewportSize({ width: breite, height: hoehe });
  await pg.goto(basis + route, { waitUntil: "load", timeout: 60000 });
  await pg.waitForTimeout(2500);
  // Reveal-Sektionen sind below-fold versteckt, bis ihr Observer feuert —
  // einmal komplett durchscrollen, damit der Screenshot die echte Seite zeigt.
  await pg.evaluate(async () => {
    const schritt = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += schritt) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await pg.waitForTimeout(900);
  await pg.evaluate(() => window.scrollTo(0, 0));
  await pg.waitForTimeout(400);
  await pg.screenshot({ path: `${ausgabe}/${name}-${suffix}.png`, fullPage: true });
  await pg.close();
}

await schuss(1440, 900, "desktop");
if (!nurDesktop) await schuss(390, 844, "mobil");
await browser.close();
console.log(`ok: ${ausgabe}/${name}-*.png`);
