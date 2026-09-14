/**
 * Sammelt alle Seiten-Textdateien unter src/lib/texte/seiten/*.ts zu
 * seiten/index.ts (SEITEN_DEFAULTS, SEITEN_LABELS, SEITEN_MANIFEST).
 * Läuft in `npm run texte:index` und im verify-Gate. Jede Seitendatei
 * exportiert: SEITE { slug, titel, route }, DEFAULTS, LABELS.
 */
import fs from "node:fs";
import path from "node:path";
const ordner = "src/lib/texte/seiten";
const dateien = fs.readdirSync(ordner).filter((f) => f.endsWith(".ts") && f !== "index.ts").sort();
const imports = [];
const namen = [];
for (const datei of dateien) {
  const slug = datei.replace(/\.ts$/, "");
  const name = "S_" + slug.replace(/[^a-z0-9]/gi, "_");
  imports.push(`import * as ${name} from "./${slug}";`);
  namen.push(name);
}
const out = `/* GENERIERT von tools/texte-index.mjs — nicht von Hand ändern. */
${imports.join("\n")}

type Seite = { SEITE: { slug: string; titel: string; route: string }; DEFAULTS: Record<string, string>; LABELS: Record<string, string> };
const SEITEN: Seite[] = [${namen.join(", ")}];

export const SEITEN_MANIFEST: Array<{ slug: string; titel: string; route: string }> = SEITEN.map((s) => s.SEITE);
export const SEITEN_DEFAULTS: Record<string, string> = Object.assign({}, ...SEITEN.map((s) => s.DEFAULTS));
export const SEITEN_LABELS: Record<string, string> = Object.assign({}, ...SEITEN.map((s) => s.LABELS));
`;
fs.writeFileSync(path.join(ordner, "index.ts"), out);
console.log("texte-index:", dateien.length, "Seiten");
