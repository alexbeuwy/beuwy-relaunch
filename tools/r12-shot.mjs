/** R12-Abnahme: Startseite Hero + Spiegel mit der 1000-Buyers-Copy. */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
const ausgabe = "docs/redesign/refs/review";
const basis = process.env.BASIS || "http://localhost:3100";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const pg = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await pg.route("**beuwy-2.b-cdn.net/**", (r) => {
  const m = r.request().url().match(/\/([\w.%-]+\.webp)(?:\?|$)/);
  if (m) {
    const datei = path.join("docs/redesign/refs/fotos", decodeURIComponent(m[1]));
    if (fs.existsSync(datei)) return r.fulfill({ contentType: "image/webp", body: fs.readFileSync(datei) });
  }
  return r.abort();
});
await pg.goto(`${basis}/`, { waitUntil: "networkidle", timeout: 90000 });
await pg.waitForTimeout(1500);
await pg.screenshot({ path: `${ausgabe}/r12-hero.png` });
await pg.locator("text=Sie sind unter den Besten").first().scrollIntoViewIfNeeded();
await pg.evaluate(() => window.scrollBy(0, -120));
await pg.waitForTimeout(1400);
await pg.screenshot({ path: `${ausgabe}/r12-spiegel.png` });
console.log("ok");
await browser.close();
