#!/usr/bin/env node
/**
 * Offline-Testbatterie für die Rechner-Engine (src/lib/rechner/*.ts).
 * Kompiliert die reinen .ts-Rechenkerne per tsc nach CommonJS in ein
 * Temp-Verzeichnis und lädt sie von dort per require() — kein tsx,
 * kein Netz, kein DNS. Aufruf: node scripts/rechner-check.mjs
 *
 * Gate B1 (docs/redesign/gates/R3.md) erwartet als letzte Zeile bei
 * Erfolg exakt: "rechner-check: ok"
 */

import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const HIER = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HIER, "..");
const QUELLEN = path.join(REPO_ROOT, "src", "lib", "rechner");
const BUILD_DIR = "/tmp/rechner-build";

/* ────────────────────────────────────────────────────────────────
 * 0 · Kompilieren
 * ──────────────────────────────────────────────────────────────── */

console.log("Kompiliere src/lib/rechner/*.ts nach CommonJS …");
if (existsSync(BUILD_DIR)) rmSync(BUILD_DIR, { recursive: true, force: true });

try {
  // --target mindestens es2015: ohne ein modernes Target erzeugt tsc für
  // "class RechnerFehler extends Error" eine kaputte Prototypkette (die
  // klassische TS/ES3-Falle beim Erweitern eingebauter Klassen) — dann
  // schlägt "instanceof RechnerFehler" fehl, obwohl der Fehler geworfen wird.
  execFileSync(
    "npx",
    [
      "tsc",
      "--module",
      "commonjs",
      "--target",
      "es2020",
      "--outDir",
      BUILD_DIR,
      path.join(QUELLEN, "typen.ts"),
      path.join(QUELLEN, "verkaufswert.ts"),
      path.join(QUELLEN, "mietwert.ts"),
      path.join(QUELLEN, "afa.ts"),
    ],
    { cwd: REPO_ROOT, stdio: "inherit" }
  );
} catch {
  console.error("\nKompilierung fehlgeschlagen — siehe tsc-Ausgabe oben.");
  process.exit(1);
}

const { RechnerFehler } = require(path.join(BUILD_DIR, "typen.js"));
const { berechneVerkaufswert } = require(path.join(BUILD_DIR, "verkaufswert.js"));
const { berechneMietwert } = require(path.join(BUILD_DIR, "mietwert.js"));
const { berechneAfa } = require(path.join(BUILD_DIR, "afa.js"));

/* ────────────────────────────────────────────────────────────────
 * Test-Helfer
 * ──────────────────────────────────────────────────────────────── */

let anzahl = 0;
let fehlgeschlagen = 0;
const fehlerListe = [];

function pruefe(bezeichnung, bedingung, detail) {
  anzahl++;
  if (!bedingung) {
    fehlgeschlagen++;
    fehlerListe.push(detail ? `${bezeichnung} — ${detail}` : bezeichnung);
    console.error(`  ✗ ${bezeichnung}${detail ? ` — ${detail}` : ""}`);
  } else {
    console.log(`  ✓ ${bezeichnung}`);
  }
}

function abschnitt(titel) {
  console.log(`\n${titel}`);
}

function wirftRechnerFehler(fn) {
  try {
    fn();
    return { warf: false };
  } catch (e) {
    return { warf: true, istRechnerFehler: e instanceof RechnerFehler, message: e.message };
  }
}

const modernisierungLeer = { dach: 0, fenster: 0, heizung: 0, bad: 0, elektrik: 0, grundriss: 0 };
const modernisierungVoll = { dach: 2, fenster: 2, heizung: 2, bad: 2, elektrik: 2, grundriss: 2 };

/* ────────────────────────────────────────────────────────────────
 * 1 · Verkaufswertrechner — Normalfälle
 * ──────────────────────────────────────────────────────────────── */
abschnitt("1 · Verkaufswertrechner — Normalfälle");

{
  const r = berechneVerkaufswert({
    wohnflaeche: 80,
    baujahr: 2005,
    objekttyp: "ETW",
    zustand: "gepflegt",
    stadtgroesse: "grossstadt",
    mikrolage: "mittel",
  });
  pruefe("ETW Großstadt gepflegt: von < mittelwert < bis", r.vonEuro < r.mittelwertEuro && r.mittelwertEuro < r.bisEuro, JSON.stringify(r));
  pruefe("ETW Großstadt gepflegt: Mittelwert plausibel (200k–350k)", r.mittelwertEuro > 200000 && r.mittelwertEuro < 350000, String(r.mittelwertEuro));
  pruefe("ETW Großstadt gepflegt: Rechenweg hat Schritte", r.schritte.length >= 6, String(r.schritte.length));
  pruefe("ETW Großstadt gepflegt: Pflichttext gesetzt", r.hinweis === "Orientierungswert, kein Gutachten.");
}

{
  const gehoben = berechneVerkaufswert({
    wohnflaeche: 150,
    baujahr: 1985,
    objekttyp: "EFH",
    zustand: "neuwertig",
    stadtgroesse: "mittelstadt",
    mikrolage: "gehoben",
    grundstuecksflaeche: 500,
  });
  const einfach = berechneVerkaufswert({
    wohnflaeche: 150,
    baujahr: 1985,
    objekttyp: "EFH",
    zustand: "sanierungsbeduerftig",
    stadtgroesse: "mittelstadt",
    mikrolage: "einfach",
    grundstuecksflaeche: 500,
  });
  pruefe(
    "EFH mit Grundstück: gehobene Lage/Zustand teurer als einfache Lage/Zustand",
    gehoben.mittelwertEuro > einfach.mittelwertEuro,
    `${gehoben.mittelwertEuro} vs ${einfach.mittelwertEuro}`
  );
  pruefe(
    "EFH mit Grundstück: Bodenwert-Schritt im Rechenweg vorhanden",
    gehoben.schritte.some((s) => s.label.includes("Bodenwert")),
    JSON.stringify(gehoben.schritte)
  );
}

{
  // ETW mit (unsinnig mitgegebener) Grundstücksfläche: wird ignoriert, nicht addiert.
  const mitFlaeche = berechneVerkaufswert({
    wohnflaeche: 60,
    baujahr: 2015,
    objekttyp: "ETW",
    zustand: "gepflegt",
    stadtgroesse: "kleinstadt",
    mikrolage: "mittel",
    grundstuecksflaeche: 300,
  });
  const ohneFlaeche = berechneVerkaufswert({
    wohnflaeche: 60,
    baujahr: 2015,
    objekttyp: "ETW",
    zustand: "gepflegt",
    stadtgroesse: "kleinstadt",
    mikrolage: "mittel",
  });
  pruefe(
    "ETW: Grundstücksfläche wird ignoriert (gleicher Mittelwert mit/ohne)",
    mitFlaeche.mittelwertEuro === ohneFlaeche.mittelwertEuro,
    `${mitFlaeche.mittelwertEuro} vs ${ohneFlaeche.mittelwertEuro}`
  );
}

/* ────────────────────────────────────────────────────────────────
 * 2 · Verkaufswertrechner — Grenzen und Fehler
 * ──────────────────────────────────────────────────────────────── */
abschnitt("2 · Verkaufswertrechner — Grenzen und Fehler");

{
  const eingabenFuerJahr = (baujahr) => ({
    wohnflaeche: 80,
    baujahr,
    objekttyp: "ETW",
    zustand: "gepflegt",
    stadtgroesse: "grossstadt",
    mikrolage: "mittel",
  });
  const j1900 = berechneVerkaufswert(eingabenFuerJahr(1900));
  const j2023 = berechneVerkaufswert(eingabenFuerJahr(2023));
  const j2026 = berechneVerkaufswert(eingabenFuerJahr(2026));
  pruefe("Baujahr 1900 rechnet ohne Fehler", j1900.mittelwertEuro > 0, String(j1900.mittelwertEuro));
  pruefe("Baujahr 2023 rechnet ohne Fehler", j2023.mittelwertEuro > 0, String(j2023.mittelwertEuro));
  pruefe("Baujahr 2026 rechnet ohne Fehler", j2026.mittelwertEuro > 0, String(j2026.mittelwertEuro));
  pruefe("Baujahr 2026 (Neubau) wertvoller als Baujahr 1900 (sonst gleiche Eingaben)", j2026.mittelwertEuro > j1900.mittelwertEuro);
}

{
  const negativeWohnflaeche = wirftRechnerFehler(() =>
    berechneVerkaufswert({ wohnflaeche: -50, baujahr: 2000, objekttyp: "ETW", zustand: "gepflegt", stadtgroesse: "grossstadt", mikrolage: "mittel" })
  );
  pruefe("Negative Wohnfläche wirft RechnerFehler", negativeWohnflaeche.warf && negativeWohnflaeche.istRechnerFehler, negativeWohnflaeche.message);

  const absurdeWohnflaeche = wirftRechnerFehler(() =>
    berechneVerkaufswert({ wohnflaeche: 999999, baujahr: 2000, objekttyp: "ETW", zustand: "gepflegt", stadtgroesse: "grossstadt", mikrolage: "mittel" })
  );
  pruefe("Absurd große Wohnfläche wirft RechnerFehler", absurdeWohnflaeche.warf && absurdeWohnflaeche.istRechnerFehler, absurdeWohnflaeche.message);

  const absurdesBaujahr = wirftRechnerFehler(() =>
    berechneVerkaufswert({ wohnflaeche: 80, baujahr: 3000, objekttyp: "ETW", zustand: "gepflegt", stadtgroesse: "grossstadt", mikrolage: "mittel" })
  );
  pruefe("Baujahr 3000 wirft RechnerFehler", absurdesBaujahr.warf && absurdesBaujahr.istRechnerFehler, absurdesBaujahr.message);

  const ungueltigerObjekttyp = wirftRechnerFehler(() =>
    berechneVerkaufswert({ wohnflaeche: 80, baujahr: 2000, objekttyp: "PENTHOUSE", zustand: "gepflegt", stadtgroesse: "grossstadt", mikrolage: "mittel" })
  );
  pruefe("Ungültiger Objekttyp wirft RechnerFehler", ungueltigerObjekttyp.warf && ungueltigerObjekttyp.istRechnerFehler, ungueltigerObjekttyp.message);
}

/* ────────────────────────────────────────────────────────────────
 * 3 · Mietwertrechner — Normalfälle
 * ──────────────────────────────────────────────────────────────── */
abschnitt("3 · Mietwertrechner — Normalfälle");

{
  const r = berechneMietwert({
    wohnflaeche: 70,
    baujahr: 2010,
    objekttyp: "ETW",
    zustand: "gepflegt",
    ausstattung: "mittel",
    stadtgroesse: "mittelstadt",
  });
  pruefe("Mietwert Mittelstadt: von < mittelwert < bis", r.vonEuro < r.mittelwertEuro && r.mittelwertEuro < r.bisEuro, JSON.stringify(r));
  pruefe("Mietwert Mittelstadt: monatliche Kaltmiete plausibel (400–1200 €)", r.mittelwertEuro > 400 && r.mittelwertEuro < 1200, String(r.mittelwertEuro));
  pruefe("Mietwert Mittelstadt: keine Mietpreisbremse", r.mietpreisbremse === false);
  pruefe("Mietwert Mittelstadt: Pflichttext gesetzt", r.hinweis === "Orientierungswert, kein Gutachten.");
}

{
  const metropole = berechneMietwert({ wohnflaeche: 70, baujahr: 2010, objekttyp: "ETW", zustand: "gepflegt", ausstattung: "mittel", stadtgroesse: "metropole" });
  const grossstadt = berechneMietwert({ wohnflaeche: 70, baujahr: 2010, objekttyp: "ETW", zustand: "gepflegt", ausstattung: "mittel", stadtgroesse: "grossstadt" });
  pruefe("Metropole/Großstadt: Mietpreisbremse-Flag gesetzt", metropole.mietpreisbremse === true && grossstadt.mietpreisbremse === true);
  pruefe("Metropole teurer als Großstadt (sonst gleiche Eingaben)", metropole.mittelwertEuro > grossstadt.mittelwertEuro);
}

{
  const gehoben = berechneMietwert({ wohnflaeche: 70, baujahr: 2015, objekttyp: "ETW", zustand: "neuwertig", ausstattung: "gehoben", stadtgroesse: "kleinstadt" });
  const einfach = berechneMietwert({ wohnflaeche: 70, baujahr: 2015, objekttyp: "ETW", zustand: "sanierungsbeduerftig", ausstattung: "einfach", stadtgroesse: "kleinstadt" });
  pruefe("Gehobene Ausstattung/Zustand teurer als einfache", gehoben.mittelwertEuro > einfach.mittelwertEuro, `${gehoben.mittelwertEuro} vs ${einfach.mittelwertEuro}`);
}

/* ────────────────────────────────────────────────────────────────
 * 4 · Mietwertrechner — Grenzen und Fehler
 * ──────────────────────────────────────────────────────────────── */
abschnitt("4 · Mietwertrechner — Grenzen und Fehler");

{
  const eingabenFuerJahr = (baujahr) => ({ wohnflaeche: 70, baujahr, objekttyp: "MFH", zustand: "gepflegt", ausstattung: "mittel", stadtgroesse: "grossstadt" });
  const j1900 = berechneMietwert(eingabenFuerJahr(1900));
  const j2023 = berechneMietwert(eingabenFuerJahr(2023));
  const j2026 = berechneMietwert(eingabenFuerJahr(2026));
  pruefe("Mietwert Baujahr 1900 rechnet ohne Fehler", j1900.mittelwertEuro > 0);
  pruefe("Mietwert Baujahr 2023 rechnet ohne Fehler", j2023.mittelwertEuro > 0);
  pruefe("Mietwert Baujahr 2026 rechnet ohne Fehler", j2026.mittelwertEuro > 0);
  pruefe("Mietwert Neubau 2026 teurer als Baujahr 1900", j2026.mittelwertEuro > j1900.mittelwertEuro);
}

{
  const negativeMiete = wirftRechnerFehler(() =>
    berechneMietwert({ wohnflaeche: -1, baujahr: 2000, objekttyp: "ETW", zustand: "gepflegt", ausstattung: "mittel", stadtgroesse: "grossstadt" })
  );
  pruefe("Negative Wohnfläche (Miete) wirft RechnerFehler", negativeMiete.warf && negativeMiete.istRechnerFehler, negativeMiete.message);

  const ungueltigeStadtgroesse = wirftRechnerFehler(() =>
    berechneMietwert({ wohnflaeche: 70, baujahr: 2000, objekttyp: "ETW", zustand: "gepflegt", ausstattung: "mittel", stadtgroesse: "dorf" })
  );
  pruefe("Ungültige Stadtgröße wirft RechnerFehler", ungueltigeStadtgroesse.warf && ungueltigeStadtgroesse.istRechnerFehler, ungueltigeStadtgroesse.message);
}

/* ────────────────────────────────────────────────────────────────
 * 5 · AfA-Rechner — Normalfälle
 * ──────────────────────────────────────────────────────────────── */
abschnitt("5 · AfA-Rechner — Normalfälle");

{
  const r = berechneAfa({
    kaufpreisGesamt: 400000,
    baujahr: 2000,
    bewertungsjahr: 2026,
    modernisierung: modernisierungLeer,
  });
  pruefe("AfA Standardfall: Gebäudewert = 80 % des Kaufpreises (Default)", r.gebaeudewertEuro === 320000, String(r.gebaeudewertEuro));
  pruefe("AfA Standardfall: regulärer Satz 2 % (Baujahr 1925–2022)", r.afaSatzRegulaerProzent === 2, String(r.afaSatzRegulaerProzent));
  pruefe("AfA Standardfall: regulärer Jahresbetrag = Gebäudewert × 2 %", r.afaRegulaerProJahrEuro === 6400, String(r.afaRegulaerProJahrEuro));
  pruefe("AfA Standardfall: Pflichttext gesetzt", r.hinweis === "Orientierungswert, kein Gutachten und keine Steuerberatung.");
  pruefe("AfA Standardfall: Rechenweg vollständig (>= 8 Schritte)", r.schritte.length >= 8, String(r.schritte.length));
}

{
  const eigenerGebaeudeanteil = berechneAfa({
    kaufpreisGesamt: 500000,
    gebaeudeanteilProzent: 65,
    baujahr: 1990,
    bewertungsjahr: 2026,
    modernisierung: modernisierungLeer,
  });
  pruefe("AfA mit eigenem Gebäudeanteil (65 %) übernommen", eigenerGebaeudeanteil.gebaeudewertEuro === 325000, String(eigenerGebaeudeanteil.gebaeudewertEuro));
}

{
  // Steuereffekt skaliert linear mit dem Grenzsteuersatz.
  const niedrig = berechneAfa({ kaufpreisGesamt: 400000, baujahr: 1930, bewertungsjahr: 2026, modernisierung: modernisierungLeer, grenzsteuersatzProzent: 20 });
  const hoch = berechneAfa({ kaufpreisGesamt: 400000, baujahr: 1930, bewertungsjahr: 2026, modernisierung: modernisierungLeer, grenzsteuersatzProzent: 42 });
  pruefe(
    "AfA Steuereffekt: höherer Grenzsteuersatz → höhere Ersparnis (bei gleicher Mehr-Abschreibung)",
    hoch.steuerersparnisProJahrEuro > niedrig.steuerersparnisProJahrEuro,
    `${niedrig.steuerersparnisProJahrEuro} vs ${hoch.steuerersparnisProJahrEuro}`
  );
  pruefe(
    "AfA über 10 Jahre = 10 × pro Jahr",
    Math.abs(hoch.steuerersparnisUeber10JahreEuro - hoch.steuerersparnisProJahrEuro * 10) < 0.02,
    `${hoch.steuerersparnisUeber10JahreEuro} vs ${hoch.steuerersparnisProJahrEuro * 10}`
  );
}

/* ────────────────────────────────────────────────────────────────
 * 6 · AfA-Rechner — Baujahr-Grenzen (regulärer Satz)
 * ──────────────────────────────────────────────────────────────── */
abschnitt("6 · AfA-Rechner — Baujahr-Grenzen (regulärer Satz nach § 7 EStG)");

{
  const vor1925 = berechneAfa({ kaufpreisGesamt: 400000, baujahr: 1900, bewertungsjahr: 2026, modernisierung: modernisierungLeer });
  pruefe("Baujahr 1900 (vor 1925) → 2,5 % regulärer Satz", vor1925.afaSatzRegulaerProzent === 2.5, String(vor1925.afaSatzRegulaerProzent));

  const genau1925 = berechneAfa({ kaufpreisGesamt: 400000, baujahr: 1925, bewertungsjahr: 2026, modernisierung: modernisierungLeer });
  pruefe("Baujahr 1925 (nicht mehr 'vor 1925') → 2 % regulärer Satz", genau1925.afaSatzRegulaerProzent === 2, String(genau1925.afaSatzRegulaerProzent));

  const j2022 = berechneAfa({ kaufpreisGesamt: 400000, baujahr: 2022, bewertungsjahr: 2026, modernisierung: modernisierungLeer });
  pruefe("Baujahr 2022 (vor der 3%-Regel) → 2 % regulärer Satz", j2022.afaSatzRegulaerProzent === 2, String(j2022.afaSatzRegulaerProzent));

  const j2023 = berechneAfa({ kaufpreisGesamt: 400000, baujahr: 2023, bewertungsjahr: 2026, modernisierung: modernisierungLeer });
  pruefe("Baujahr 2023 (ab 3%-Regel) → 3 % regulärer Satz", j2023.afaSatzRegulaerProzent === 3, String(j2023.afaSatzRegulaerProzent));

  const j2026 = berechneAfa({ kaufpreisGesamt: 400000, baujahr: 2026, bewertungsjahr: 2026, modernisierung: modernisierungLeer });
  pruefe("Baujahr 2026 (Neubau, Alter 0) → 3 % regulärer Satz, rechnet ohne Fehler", j2026.afaSatzRegulaerProzent === 3 && j2026.alterJahre === 0, String(j2026.afaSatzRegulaerProzent));
}

/* ────────────────────────────────────────────────────────────────
 * 7 · AfA-Rechner — Restnutzungsdauer: Untergrenze und Punkte-Maximum
 * ──────────────────────────────────────────────────────────────── */
abschnitt("7 · AfA-Rechner — RND-Untergrenze und Modernisierungs-Punkte-Maximum");

{
  // Sehr altes, unmodernisiertes Gebäude: RND fällt auf die Untergrenze (24 Jahre = 30 % von 80).
  const sehrAlt = berechneAfa({ kaufpreisGesamt: 300000, baujahr: 1900, bewertungsjahr: 2026, modernisierung: modernisierungLeer });
  pruefe("RND-Untergrenze bei sehr altem, unmodernisiertem Gebäude = 24 Jahre", sehrAlt.restnutzungsdauerJahre === 24, String(sehrAlt.restnutzungsdauerJahre));
  pruefe("RND-Untergrenze: Gutachten-Effekt greift (RND < gesetzliche Nutzungsdauer)", sehrAlt.gutachtenGreift === true);
  pruefe(
    "RND-Untergrenze: Gutachten-Satz = 100/24 ≈ 4,17 %",
    Math.abs(sehrAlt.afaSatzGutachtenProzent - 100 / 24) < 0.02,
    String(sehrAlt.afaSatzGutachtenProzent)
  );

  // Maximal mögliche Modernisierungspunkte (12) → höchste Verlängerungsstufe.
  const punkteMax = berechneAfa({ kaufpreisGesamt: 300000, baujahr: 2000, bewertungsjahr: 2026, modernisierung: modernisierungVoll });
  pruefe("Punkte-Max: Modernisierungspunkte gesamt = 12", punkteMax.modernisierungspunkteGesamt === 12, String(punkteMax.modernisierungspunkteGesamt));
  pruefe("Punkte-Max: Modernisierungsgrad 'umfassend modernisiert'", punkteMax.modernisierungsgrad === "umfassend modernisiert", punkteMax.modernisierungsgrad);
  pruefe("Punkte-Max: RND nie über der Gesamtnutzungsdauer (80 Jahre)", punkteMax.restnutzungsdauerJahre <= 80, String(punkteMax.restnutzungsdauerJahre));

  // Punkte-Minimum (0) zur Gegenprobe.
  const punkteMin = berechneAfa({ kaufpreisGesamt: 300000, baujahr: 2000, bewertungsjahr: 2026, modernisierung: modernisierungLeer });
  pruefe("Punkte-Minimum: Modernisierungsgrad 'nicht modernisiert'", punkteMin.modernisierungsgrad === "nicht modernisiert", punkteMin.modernisierungsgrad);
  pruefe(
    "Höhere Modernisierungspunkte → höhere oder gleiche Restnutzungsdauer (gleiches Baujahr)",
    punkteMax.restnutzungsdauerJahre >= punkteMin.restnutzungsdauerJahre
  );
}

/* ────────────────────────────────────────────────────────────────
 * 8 · AfA-Rechner — negative/absurde Eingaben werfen saubere Fehler
 * ──────────────────────────────────────────────────────────────── */
abschnitt("8 · AfA-Rechner — negative/absurde Eingaben");

{
  const negativerKaufpreis = wirftRechnerFehler(() =>
    berechneAfa({ kaufpreisGesamt: -50000, baujahr: 2000, bewertungsjahr: 2026, modernisierung: modernisierungLeer })
  );
  pruefe("Negativer Kaufpreis wirft RechnerFehler", negativerKaufpreis.warf && negativerKaufpreis.istRechnerFehler, negativerKaufpreis.message);

  const nullKaufpreis = wirftRechnerFehler(() => berechneAfa({ kaufpreisGesamt: 0, baujahr: 2000, bewertungsjahr: 2026, modernisierung: modernisierungLeer }));
  pruefe("Kaufpreis 0 wirft RechnerFehler", nullKaufpreis.warf && nullKaufpreis.istRechnerFehler, nullKaufpreis.message);

  const baujahrInDerZukunft = wirftRechnerFehler(() =>
    berechneAfa({ kaufpreisGesamt: 400000, baujahr: 2030, bewertungsjahr: 2026, modernisierung: modernisierungLeer })
  );
  pruefe("Baujahr nach dem Bewertungsjahr wirft RechnerFehler", baujahrInDerZukunft.warf && baujahrInDerZukunft.istRechnerFehler, baujahrInDerZukunft.message);

  const gebaeudeanteilUeber100 = wirftRechnerFehler(() =>
    berechneAfa({ kaufpreisGesamt: 400000, gebaeudeanteilProzent: 150, baujahr: 2000, bewertungsjahr: 2026, modernisierung: modernisierungLeer })
  );
  pruefe("Gebäudeanteil > 100 % wirft RechnerFehler", gebaeudeanteilUeber100.warf && gebaeudeanteilUeber100.istRechnerFehler, gebaeudeanteilUeber100.message);

  const modernisierungspunktZuHoch = wirftRechnerFehler(() =>
    berechneAfa({ kaufpreisGesamt: 400000, baujahr: 2000, bewertungsjahr: 2026, modernisierung: { ...modernisierungLeer, bad: 3 } })
  );
  pruefe("Modernisierungspunkt 3 (> Maximum 2) wirft RechnerFehler", modernisierungspunktZuHoch.warf && modernisierungspunktZuHoch.istRechnerFehler, modernisierungspunktZuHoch.message);

  const modernisierungspunktNegativ = wirftRechnerFehler(() =>
    berechneAfa({ kaufpreisGesamt: 400000, baujahr: 2000, bewertungsjahr: 2026, modernisierung: { ...modernisierungLeer, dach: -1 } })
  );
  pruefe("Negativer Modernisierungspunkt wirft RechnerFehler", modernisierungspunktNegativ.warf && modernisierungspunktNegativ.istRechnerFehler, modernisierungspunktNegativ.message);

  const grenzsteuersatzAbsurd = wirftRechnerFehler(() =>
    berechneAfa({ kaufpreisGesamt: 400000, baujahr: 2000, bewertungsjahr: 2026, modernisierung: modernisierungLeer, grenzsteuersatzProzent: 250 })
  );
  pruefe("Grenzsteuersatz 250 % wirft RechnerFehler", grenzsteuersatzAbsurd.warf && grenzsteuersatzAbsurd.istRechnerFehler, grenzsteuersatzAbsurd.message);
}

/* ────────────────────────────────────────────────────────────────
 * Ergebnis
 * ──────────────────────────────────────────────────────────────── */

console.log(`\n${anzahl} Prüfungen, ${anzahl - fehlgeschlagen} bestanden, ${fehlgeschlagen} fehlgeschlagen.`);

if (fehlgeschlagen > 0) {
  console.error("\nFehlgeschlagene Prüfungen:");
  for (const f of fehlerListe) console.error(`  - ${f}`);
  process.exit(1);
}

console.log("rechner-check: ok");
