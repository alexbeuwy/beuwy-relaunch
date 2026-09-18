/**
 * Text-Snapshot aller öffentlichen Routen: sichtbarer Text je Seite als
 * .txt — Gate für die Studio-Umstellung (vorher/nachher müssen gleich sein).
 * Aufruf: node tools/texte-snapshot.mjs <zielordner> [basis]
 */
import fs from "node:fs";
import path from "node:path";
const [ziel, basis = "http://localhost:3100"] = process.argv.slice(2);
fs.mkdirSync(ziel, { recursive: true });
const manifest = JSON.parse(fs.readFileSync(".next/app-path-routes-manifest.json", "utf8"));
const routen = Object.values(manifest)
  .filter((r) => !r.includes("[") && !/^\/(api|intern|studio|os|konto|login|abmelden|_not-found)/.test(r) && !r.endsWith(".xml") && !r.endsWith(".txt") && !r.endsWith("/icon") && !r.endsWith("/opengraph-image"))
  .sort();
routen.push("/cases/riegel-immobilien", "/cases/vision-group", "/cases/koenigswege");
function text(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .split("\n").map((z) => z.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
}
let n = 0;
for (const r of routen) {
  const res = await fetch(basis + r);
  if (!res.ok) { console.log("FEHLER", r, res.status); continue; }
  const html = await res.text();
  const titel = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  fs.writeFileSync(path.join(ziel, r.replace(/\//g, "_") + ".txt"), `TITLE: ${titel}\nDESC: ${desc}\n${text(html)}\n`);
  n++;
}
console.log("Snapshot", n, "Routen →", ziel);
