/**
 * Generiert die Heatmap-Unterleger für /intern/einblick aus den
 * fullPage-Review-Screenshots (docs/redesign/refs/review/<name>-desktop.png)
 * nach public/einblick/<slug>.webp — nach Design-Änderungen einfach
 * erneut laufen lassen (node tools/einblick-unterleger.mjs).
 */
import sharp from "sharp";
import fs from "node:fs";

const PAARE = [
  ["start", "/"],
  ["verkaufspreis", "/tools/verkaufspreisrechner"],
  ["afa", "/tools/afa-rechner"],
  ["wissen", "/wissen"],
  ["ueber-uns", "/ueber-uns"],
  ["seo-fuer-immobilienmakler", "/seo-fuer-immobilienmakler"],
  ["geo-fuer-immobilienmakler", "/geo-fuer-immobilienmakler"],
  ["social-media-immobilienmakler", "/social-media-immobilienmakler"],
  ["email-marketing-immobilienmakler", "/email-marketing-immobilienmakler"],
  ["marketing-kapitalanlage-immobilien", "/marketing-kapitalanlage-immobilien"],
];

fs.mkdirSync("public/einblick", { recursive: true });
const index = {};
for (const [name, pfad] of PAARE) {
  const src = `docs/redesign/refs/review/${name}-desktop.png`;
  if (!fs.existsSync(src)) continue;
  const slug = pfad === "/" ? "start" : pfad.slice(1).replaceAll("/", "_");
  const meta = await sharp(src).metadata();
  await sharp(src).resize({ width: 720 }).webp({ quality: 62 }).toFile(`public/einblick/${slug}.webp`);
  index[pfad] = { datei: `/einblick/${slug}.webp`, seitenverhaeltnis: meta.height / meta.width };
}
fs.writeFileSync("src/lib/einblick-unterleger.json", JSON.stringify(index, null, 1));
console.log("unterleger:", Object.keys(index).length);
