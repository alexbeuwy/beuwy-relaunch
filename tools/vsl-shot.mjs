/** /vsl-Abnahme: Frontseite Desktop (oben + Logos) und mobil, Full-Page. */
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
async function route(pg) {
  await pg.route("**beuwy-2.b-cdn.net/**", (r) => {
    const m = r.request().url().match(/\/([\w.%-]+\.webp)(?:\?|$)/);
    if (m) {
      const datei = path.join("docs/redesign/refs/fotos", decodeURIComponent(m[1]));
      if (fs.existsSync(datei)) return r.fulfill({ contentType: "image/webp", body: fs.readFileSync(datei) });
    }
    return r.abort();
  });
}
for (const [breite, hoehe, name] of [[1440, 900, "desktop"], [390, 844, "mobil"]]) {
  const pg = await (await browser.newContext({ viewport: { width: breite, height: hoehe }, deviceScaleFactor: 1 })).newPage();
  await route(pg);
  await pg.goto(`${basis}/vsl`, { waitUntil: "networkidle", timeout: 90000 });
  await pg.waitForTimeout(1500);
  await pg.screenshot({ path: `${ausgabe}/r10-vsl-${name}-fold.png` });
  await pg.screenshot({ path: `${ausgabe}/r10-vsl-${name}-full.png`, fullPage: true });
  console.log("ok", name, await pg.evaluate(() => document.body.scrollHeight));
  await pg.close();
}
await browser.close();
