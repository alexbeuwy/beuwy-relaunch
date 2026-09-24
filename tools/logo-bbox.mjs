// Einmal-Werkzeug: schneidet WordPress-Logo-SVGs (600x270-Leinwand mit viel
// Luft) auf den echten Inhalt zu (viewBox = getBBox) und rendert einen
// Kontaktbogen zur Sichtpruefung. Aufruf: node tools/logo-bbox.mjs <quelle> <ziel> <sheet.png>
import { chromium } from "playwright-core";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [quelle, ziel, sheet] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
const ergebnisse = [];
for (const datei of readdirSync(quelle).filter((f) => f.endsWith(".svg")).sort()) {
  const roh = readFileSync(join(quelle, datei), "utf8");
  await page.setContent(`<body style="margin:0">${roh}</body>`);
  const box = await page.evaluate(() => {
    const svg = document.querySelector("svg");
    const b = svg.getBBox();
    return { x: b.x, y: b.y, w: b.width, h: b.height, vb: svg.getAttribute("viewBox") };
  });
  const pad = Math.max(box.w, box.h) * 0.01;
  const vb = `${(box.x - pad).toFixed(2)} ${(box.y - pad).toFixed(2)} ${(box.w + 2 * pad).toFixed(2)} ${(box.h + 2 * pad).toFixed(2)}`;
  // Nur am Wurzel-<svg> viewBox setzen und width/height entfernen — Rects
  // im Inhalt brauchen ihre Maße.
  let neu = roh.replace(/<svg[^>]*>/, (kopf) =>
    kopf.replace(/viewBox="[^"]*"/, `viewBox="${vb}"`).replace(/\s(width|height)="[^"]*"/g, "")
  );
  if (!/viewBox=/.test(neu)) neu = neu.replace(/<svg/, `<svg viewBox="${vb}"`);
  writeFileSync(join(ziel, datei), neu);
  ergebnisse.push({ datei, vb, aspect: (box.w / box.h).toFixed(2), neu });
  console.log(datei.padEnd(26), "alt:", box.vb, "→", vb, "aspect", (box.w / box.h).toFixed(2));
}
const html = `<body style="margin:0;background:#fff;font:12px system-ui;padding:24px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px">${ergebnisse
  .map((r) => `<div style="border:1px solid #eee;padding:16px;text-align:center"><div style="height:32px;display:flex;justify-content:center">${r.neu.replace(/<svg/, '<svg style="height:32px;width:auto"')}</div><div style="margin-top:8px;color:#888">${r.datei} · ${r.aspect}</div></div>`)
  .join("")}</body>`;
await page.setContent(html);
await page.screenshot({ path: sheet, fullPage: true });
await browser.close();
