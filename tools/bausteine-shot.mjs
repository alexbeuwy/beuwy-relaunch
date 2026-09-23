/** Übersichtsgrafik „Dreißig Bausteine" als eigenständiges PNG (Desktop 1440 + mobil 390), inkl. der Frage darunter. */
import { chromium } from "playwright-core";
const basis = process.env.BASIS || "http://localhost:3100";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
for (const [w, name] of [[1440, "desktop"], [390, "mobil"]]) {
  const pg = await (await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 })).newPage();
  await pg.route("**beuwy-2.b-cdn.net/**", (r) => r.abort());
  await pg.goto(`${basis}/system`, { waitUntil: "networkidle", timeout: 90000 });
  await pg.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.setAttribute("data-state", "shown")));
  await pg.waitForTimeout(800);
  const start = pg.locator("#bausteine");
  const frage = pg.locator("text=Die ehrliche Rechnung").locator("xpath=ancestor::section[1]");
  const a = await start.boundingBox();
  const b = await frage.boundingBox();
  const clip = { x: 0, y: a.y - 24, width: w, height: b.y + b.height - a.y + 48 };
  await pg.screenshot({ path: `docs/redesign/refs/review/r15-bausteine-${name}.png`, fullPage: true, clip });
  console.log("ok", name, Math.round(clip.height));
  await pg.close();
}
await browser.close();
