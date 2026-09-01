/** Prüft jede Seitenplan-Route: Datei da, Metadata-Title, FAQPage-LD, interne Links. */
import fs from "node:fs";
const plan = JSON.parse(fs.readFileSync("docs/redesign/R3-SEITENPLAN.json", "utf8"));
let ok = 0; const probleme = [];
for (const s of plan.seiten) {
  const p = `src/app/${s.route}/page.tsx`;
  if (!fs.existsSync(p)) { probleme.push(`${s.route}: fehlt`); continue; }
  const t = fs.readFileSync(p, "utf8");
  const checks = [
    [/title:\s*"/.test(t), "kein Metadata-Title"],
    [t.includes("FAQPage"), "kein FAQPage-LD"],
    [s.links.every((l) => t.includes(`/${l}`)), "interne Links unvollständig"],
  ];
  const kaputt = checks.filter(([b]) => !b).map(([, m]) => m);
  if (kaputt.length) probleme.push(`${s.route}: ${kaputt.join(", ")}`); else ok++;
}
console.log(`${ok}/${plan.seiten.length} ok`);
for (const p of probleme.slice(0, 20)) console.log(" - " + p);
process.exit(probleme.length ? 1 : 0);
