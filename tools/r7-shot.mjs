/** R7-Abnahme: Aha-Stack (3 Scroll-Zustände), Spiegel-Fokus (2), Vasen-Anker, mobil. */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
const ausgabe = "docs/redesign/refs/review";
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

async function serie(breite, hoehe, praefix) {
  const pg = await (await browser.newContext({ viewport: { width: breite, height: hoehe } })).newPage();
  await route(pg);
  await pg.goto("http://localhost:3100/", { waitUntil: "load", timeout: 60000 });
  await pg.waitForTimeout(2200);
  // Alles einmal aufwecken
  await pg.evaluate(async () => {
    const schritt = window.innerHeight * 0.85;
    for (let y = 0; y < document.body.scrollHeight; y += schritt) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, 0);
  });
  await pg.waitForTimeout(700);

  async function zu(sel, dy, name) {
    const el = pg.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await pg.evaluate((d) => window.scrollBy(0, d), dy);
    await pg.waitForTimeout(1000);
    await pg.screenshot({ path: `${ausgabe}/${praefix}-${name}.png` });
    console.log("ok", praefix, name);
  }

  // Spiegel: beim Eintritt (Fokus-Zustand) und aufgedeckt
  await zu("text=Sie sind unter den Besten", 300, "spiegel-eintritt");
  await zu("text=Sie sind unter den Besten", -140, "spiegel-offen");
  // Aha-Stack: graue Karte, Überfahrt, gelbe Karte
  await zu("text=Ordentlich. Austauschbar.", -200, "stack-grau");
  await zu("text=Wow — das kannte", -Math.round(hoehe * 0.55), "stack-mitte");
  await zu("text=Wow — das kannte", -120, "stack-gelb");
  // Vasen-Anker
  await zu("text=Vier Termine reichen.", -Math.round(hoehe * 0.4), "prozess-karte");
  await zu("text=Dann sieht Ihre Stadt", 200, "danach-showreel");
  await pg.close();
}

await serie(1440, 900, "r7");
await serie(390, 844, "r7m");
await browser.close();
