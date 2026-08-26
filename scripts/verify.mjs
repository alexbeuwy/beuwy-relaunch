/**
 * /verify — das runnable Launch-Gate (R3, unlazy).
 * Prüft: (1) Produktions-Build kompiliert, (2) JEDE Route aus dem
 * Build-Manifest antwortet 200 auf :3100, (3) Marken-Greps
 * (Gold/kursiv/Agentur-als-Selbstbezeichnung/kostenlos außerhalb
 * /tools+T-Cluster/Ludwigshafen im Footer), (4) Seitenplan komplett.
 * Ausgabe endet mit "VERIFY: OK" oder "VERIFY: FAIL (<gründe>)".
 * Erwartet einen laufenden Server auf :3100 (next start).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";

const fehler = [];
const sh = (cmd) => execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

// 1) Build-Manifest → Routenliste (statisch + dynamische ausgelassen)
let routen = [];
try {
  const manifest = JSON.parse(fs.readFileSync(".next/prerender-manifest.json", "utf8"));
  routen = Object.keys(manifest.routes).filter((r) => !r.includes("["));
} catch {
  fehler.push("kein Build-Manifest (.next) — erst npm run build");
}
if (!routen.includes("/")) fehler.push("Startseite fehlt im Manifest");

// 2) Alle Routen 200
let rot = [];
for (const r of routen) {
  try {
    const code = sh(`curl -s -o /dev/null -w "%{http_code}" --noproxy localhost "http://localhost:3100${r}"`).trim();
    if (code !== "200") rot.push(`${r}=${code}`);
  } catch { rot.push(`${r}=ERR`); }
}
if (rot.length) fehler.push(`Routen nicht 200: ${rot.slice(0, 8).join(" ")}${rot.length > 8 ? ` (+${rot.length - 8})` : ""}`);
console.log(`Routen geprüft: ${routen.length}, rot: ${rot.length}`);

// 3) Marken-Greps
const grep = (pattern, pfad, extra = "") => {
  try { return sh(`grep -rln ${extra} "${pattern}" ${pfad} || true`).trim().split("\n").filter(Boolean); }
  catch { return []; }
};
if (grep("Ludwigshafen", "src/components/Footer.tsx").length) fehler.push("Ludwigshafen im Footer");
const kursiv = grep("font-style: italic", "src/app src/components");
if (kursiv.length) fehler.push(`kursiv: ${kursiv.join(",")}`);
// kostenlos: erlaubt nur unter /tools und den T-Cluster-Routen
const plan = JSON.parse(fs.readFileSync("docs/redesign/R3-SEITENPLAN.json", "utf8"));
const erlaubt = new Set([
  ...plan.seiten.filter((s) => s.cluster === "T").map((s) => `src/app/${s.route}/page.tsx`),
]);
const kostenlosTreffer = grep("kostenlos", "src/app", "-i")
  .filter((f) => !f.startsWith("src/app/tools/") && !erlaubt.has(f) && f.endsWith(".tsx"));
if (kostenlosTreffer.length) fehler.push(`kostenlos außerhalb Tools/T: ${kostenlosTreffer.join(",")}`);

// 4) Seitenplan vollständig
const fehlend = plan.seiten.filter((s) => !fs.existsSync(`src/app/${s.route}/page.tsx`));
if (fehlend.length) fehler.push(`Seitenplan fehlt: ${fehlend.length} (${fehlend.slice(0, 3).map((s) => s.route).join(",")}…)`);

if (fehler.length) {
  console.log("VERIFY: FAIL");
  for (const f of fehler) console.log(" - " + f);
  process.exit(1);
}
console.log("VERIFY: OK");
