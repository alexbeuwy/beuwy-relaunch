/** Exit-Intent-Abnahme auf /system: nach 8,5 s Mauszeiger „verlässt" die Seite nach oben. */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
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
await pg.goto(`${basis}/system`, { waitUntil: "networkidle", timeout: 90000 });
await pg.waitForTimeout(8600);
await pg.evaluate(() => document.dispatchEvent(new MouseEvent("mouseout", { clientY: 0, bubbles: true })));
await pg.waitForTimeout(700);
await pg.screenshot({ path: "docs/redesign/refs/review/r13-vsl-exit.png" });
console.log("ok exit", await pg.locator("[role=dialog]").count());
await browser.close();
