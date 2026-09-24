/**
 * Einmaliges Review-Werkzeug: loggt sich ins Studio ein und schießt
 * die Heatmap-Sektion von /intern/einblick (Unterleger-Abnahme).
 * Aufruf: node tools/einblick-shot.mjs   (Server auf :3000, STUDIO_PASSWORD gesetzt)
 */
import { chromium } from "playwright-core";
import fs from "node:fs";

const basis = "http://localhost:3000";
const ausgabe = "docs/redesign/refs/review";
fs.mkdirSync(ausgabe, { recursive: true });

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  proxy: proxy ? { server: proxy, bypass: "localhost,127.0.0.1" } : undefined,
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const pg = await ctx.newPage();

// Login über die Studio-Maske
await pg.goto(`${basis}/studio`, { waitUntil: "load", timeout: 60000 });
await pg.fill('input[type="password"]', "asdfneon17");
await pg.click('button[type="submit"]');
await pg.waitForTimeout(2500);

await pg.goto(`${basis}/intern/einblick`, { waitUntil: "load", timeout: 60000 });
await pg.waitForTimeout(2500);
// Reveal-Sektionen aufwecken
await pg.evaluate(async () => {
  const schritt = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += schritt) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
});
await pg.waitForTimeout(1200);

const heatmap = pg.locator("#heatmap");
await heatmap.scrollIntoViewIfNeeded();
await pg.waitForTimeout(800);
await heatmap.screenshot({ path: `${ausgabe}/einblick-heatmap.png` });
await pg.screenshot({ path: `${ausgabe}/einblick-voll.png`, fullPage: true });
console.log("ok:", `${ausgabe}/einblick-heatmap.png`);
await browser.close();
