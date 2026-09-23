/**
 * /system-Abnahme (Entwurf 23.09): Fold + Full, Stadt-Check frei (Funnel
 * inline) und vergeben, Sticky-Leiste mobil, Exit-Intent Desktop + mobil.
 * Ausgabe: docs/redesign/refs/review/r17-*.png
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
const ausgabe = "docs/redesign/refs/review";
const basis = process.env.BASIS || "http://localhost:3100";
fs.mkdirSync(ausgabe, { recursive: true });
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
  proxy: proxy ? { server: proxy, bypass: "localhost,127.0.0.1" } : undefined,
});
const geraete = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobil: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
};
async function seite(name) {
  const ctx = await browser.newContext({ ...geraete[name], deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.route("**beuwy-2.b-cdn.net/**", (r) => {
    const m = r.request().url().match(/\/([\w.%-]+\.webp)(?:\?|$)/);
    if (m) {
      const datei = path.join("docs/redesign/refs/fotos", decodeURIComponent(m[1]));
      if (fs.existsSync(datei)) return r.fulfill({ contentType: "image/webp", body: fs.readFileSync(datei) });
    }
    return r.abort();
  });
  await pg.goto(`${basis}/system`, { waitUntil: "networkidle", timeout: 90000 });
  await pg.waitForTimeout(1200);
  return pg;
}
const shot = (pg, datei, opt = {}) => pg.screenshot({ path: `${ausgabe}/r17-${datei}.png`, ...opt }).then(() => console.log("ok", datei));

for (const name of ["desktop", "mobil"]) {
  // 1 · Fold + ganze Seite
  let pg = await seite(name);
  await shot(pg, `${name}-fold`);
  await shot(pg, `${name}-full`, { fullPage: true, animations: "disabled" });

  // 2 · Stadt frei → Funnel inline
  await pg.fill("#stadt-eingabe", "Heidelberg");
  await pg.click("#stadt-check button[type=submit]");
  await pg.waitForTimeout(1400);
  await pg.locator("#stadt-check").screenshot({ path: `${ausgabe}/r17-${name}-frei.png` });
  console.log("ok", `${name}-frei`);

  // 3 · Stadt vergeben
  await pg.close();
  pg = await seite(name);
  await pg.fill("#stadt-eingabe", "Speyer");
  await pg.click("#stadt-check button[type=submit]");
  await pg.waitForTimeout(1000);
  await pg.locator("#stadt-check").screenshot({ path: `${ausgabe}/r17-${name}-vergeben.png` });
  console.log("ok", `${name}-vergeben`);

  // 4 · leeres Feld → Fehler
  await pg.close();
  pg = await seite(name);
  await pg.click("#stadt-check button[type=submit]");
  await pg.waitForTimeout(600);
  await pg.locator("#stadt-check form").screenshot({ path: `${ausgabe}/r17-${name}-leer.png` });
  console.log("ok", `${name}-leer`);
  await pg.close();

  // 5 · Sticky (mobil) und Exit-Intent
  pg = await seite(name);
  if (name === "mobil") {
    await pg.evaluate(() => window.scrollTo(0, document.getElementById("stadt-check").getBoundingClientRect().bottom + window.scrollY + 40));
    await pg.waitForTimeout(900);
    await shot(pg, "mobil-sticky");
  }
  await pg.waitForTimeout(8600);
  if (name === "desktop") {
    await pg.mouse.move(700, 300);
    await pg.mouse.move(700, -5);
    await pg.evaluate(() => document.dispatchEvent(new MouseEvent("mouseout", { clientY: -1, relatedTarget: null, bubbles: true })));
  } else {
    await pg.evaluate(async () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, h * 0.6);
      await new Promise((r) => setTimeout(r, 700));
      window.dispatchEvent(new Event("scroll"));
      await new Promise((r) => setTimeout(r, 50));
      window.scrollTo(0, h * 0.6 - 900);
      window.dispatchEvent(new Event("scroll"));
    });
  }
  await pg.waitForTimeout(900);
  const offen = await pg.locator("[role=dialog]").count();
  console.log(name, "exit offen:", offen);
  await shot(pg, `${name}-exit`);
  await pg.close();
}
await browser.close();
