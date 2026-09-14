/**
 * Vergleicht zwei Text-Snapshots (tools/texte-snapshot.mjs) Route für
 * Route. Gate der Studio-Umstellung: der sichtbare Text darf sich durch
 * die Umstellung auf Keys nicht ändern. Exit 1 bei Abweichungen.
 * Aufruf: node tools/texte-diff.mjs <vorher> <nachher>
 */
import fs from "node:fs";
import path from "node:path";
const [vorher, nachher] = process.argv.slice(2);
const dateien = fs.readdirSync(vorher).filter((f) => f.endsWith(".txt")).sort();
let abweichungen = 0;
for (const datei of dateien) {
  const a = fs.readFileSync(path.join(vorher, datei), "utf8").split("\n");
  const bPfad = path.join(nachher, datei);
  if (!fs.existsSync(bPfad)) { console.log(`FEHLT  ${datei}`); abweichungen++; continue; }
  const b = fs.readFileSync(bPfad, "utf8").split("\n");
  if (a.join("\n") === b.join("\n")) continue;
  abweichungen++;
  console.log(`DIFF   ${datei}`);
  // erste Unterschiede zeigen
  const max = Math.max(a.length, b.length);
  let gezeigt = 0;
  for (let i = 0; i < max && gezeigt < 6; i++) {
    if (a[i] !== b[i]) {
      console.log(`   ${i + 1}: - ${(a[i] ?? "").slice(0, 110)}`);
      console.log(`   ${i + 1}: + ${(b[i] ?? "").slice(0, 110)}`);
      gezeigt++;
    }
  }
}
console.log(`\nTEXTE-DIFF: ${abweichungen} von ${dateien.length} Routen weichen ab`);
process.exit(abweichungen > 0 ? 1 : 0);
