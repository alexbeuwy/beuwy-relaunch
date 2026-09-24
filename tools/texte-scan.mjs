/**
 * Gate „Studio-Pflicht": findet nutzerlesbare Sätze, die hart im Code
 * stehen statt als Studio-Key. Heuristik: JSX-Textknoten und String-
 * Literale mit mindestens 4 Wörtern in öffentlichen page.tsx-Dateien und
 * den Marketing-Komponenten. Exit 1 bei Treffern.
 *
 * Aufruf: node tools/texte-scan.mjs [--alle]   (Standard: nur Treffer-Zahl je Datei)
 * Ausnahmen: Zeilen mit // studio:ok  oder Blöcke zwischen
 * /* studio:aus *\/ … /* studio:an *\/ (z. B. JSON-LD-Konstanten).
 */
import fs from "node:fs";
import path from "node:path";

const alle = process.argv.includes("--alle");
const dateien = [];
function sammle(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (/^(api|intern|studio|os|konto|login|abmelden|impressum|datenschutz)$/.test(e.name)) continue; // Rechtstexte bleiben im Code
      sammle(p);
    } else if (e.name === "page.tsx") dateien.push(p);
  }
}
sammle("src/app");
for (const k of ["StartOben", "StartUnten", "Footer", "Nav", "CtaBand", "AnfrageFunnel", "BookingTool", "MaklerHero", "PerformanceStory", "MandateLoop", "TrustMeilensteine", "BelegRaster", "PainRows", "FitBlock", "AuthorityBlock", "ClusterElemente", "PodcastSlot", "ShowreelSlot", "VslSlot", "CaseGrid", "FaqAccordion"]) {
  const p = `src/components/${k}.tsx`;
  if (fs.existsSync(p)) dateien.push(p);
}
dateien.push("src/lib/cases.ts");

const WORT = /[A-Za-zÄÖÜäöüß]{2,}/g;
function istSatz(text) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length < 24) return false;
  if ((t.match(/ /g) || []).length < 3) return false; // Keys, Pfade, Klassen ohne Leerzeichen
  const woerter = t.match(WORT) || [];
  if (woerter.length < 4) return false;
  // Tailwind-Klassenlisten: nur Kleinbuchstaben-Tokens, mindestens eines mit -, : oder [
  const tokens = t.split(" ");
  if (tokens.every((w) => /^[-!]?[a-z][a-z0-9:\[\]\/().%,#*_-]*$/.test(w)) && tokens.some((w) => /[-:\[]/.test(w))) return false;
  if (/^(https?:|\/|#|[a-z-]+=|[A-Z_]{4,}$)/.test(t)) return false;
  if (/^[a-z0-9-]+(\s[a-z0-9-]+)*$/.test(t) && t.includes("-")) return false; // Tailwind-Klassen
  return true;
}
const AUSNAHME_ZEILE = /className=|import |from "|href=|src=|console\.|aria-|key=|studio:ok|^\s*\/\/|^\s*\*|^\s*\/\*|sizes=|style=|viewBox|d="M|type=|role=|id=|rel=|target=|width=|height=|alt=|title=|placeholder=|throw new|new Error/;

let summe = 0;
const bericht = [];
for (const datei of dateien) {
  const zeilen = fs.readFileSync(datei, "utf8").split("\n");
  let aus = false;
  let imKommentar = false;
  const treffer = [];
  zeilen.forEach((zeile, i) => {
    if (/studio:aus/.test(zeile)) aus = true;
    if (/studio:an/.test(zeile)) aus = false;
    // Blockkommentare überspringen (auch Fortsetzungszeilen ohne "*")
    const warImKommentar = imKommentar;
    if (/\/\*/.test(zeile) && !/\*\//.test(zeile)) imKommentar = true;
    if (/\*\//.test(zeile)) imKommentar = false;
    if (warImKommentar || aus || AUSNAHME_ZEILE.test(zeile)) return;
    // JSX-Textknoten: >Text<  oder  >Text (Zeilenende)  oder Zeilenanfang Text<
    const jsx = zeile.match(/>([^<>{}]+)</g) || [];
    const anfang = zeile.match(/^\s*([A-ZÄÖÜ„][^<>{}=]{20,})$/);
    const literale = zeile.match(/(["'`])((?:(?!\1)[^\\]|\\.){24,}?)\1/g) || [];
    const kandidaten = [
      ...jsx.map((m) => m.slice(1, -1)),
      ...(anfang ? [anfang[1]] : []),
      ...literale.map((m) => m.slice(1, -1)),
    ];
    for (const k of kandidaten) if (istSatz(k)) { treffer.push(`${i + 1}: ${k.trim().slice(0, 80)}`); break; }
  });
  if (treffer.length) { summe += treffer.length; bericht.push([datei, treffer]); }
}
bericht.sort((a, b) => b[1].length - a[1].length);
for (const [datei, treffer] of bericht) {
  console.log(`${String(treffer.length).padStart(4)}  ${datei}`);
  if (alle) for (const t of treffer) console.log(`        ${t}`);
}
console.log(`\nTEXTE-SCAN: ${summe} hartkodierte Sätze in ${bericht.length} Dateien`);
process.exit(summe > 0 ? 1 : 0);
