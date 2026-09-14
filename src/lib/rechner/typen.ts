/**
 * Gemeinsame Typen und Formatierungs-Helfer für die Rechner-Engine
 * (Verkaufswert-, Mietwert- und AfA-Rechner unter /tools). Alle drei
 * Rechner in diesem Ordner sind reine Funktionen ohne Seiteneffekte —
 * dieselben Eingaben liefern immer dasselbe Ergebnis. Kein Netzwerk,
 * kein "jetzt" außer dort, wo es fachlich nötig ist (Alter eines
 * Gebäudes) — und dort als überschreibbarer Parameter, damit die
 * Rechner deterministisch testbar bleiben (siehe afa.ts, bewertungsjahr).
 *
 * Kontrakt (docs/redesign/R3-PLAN.md, Abschnitt "Verträge"):
 * Die UI-Seiten unter /tools/* importieren AUSSCHLIESSLICH aus
 * src/lib/rechner/*.ts. Keine Steuer-/Rechtsberatung — jedes Ergebnis
 * trägt einen der PFLICHTTEXT_*-Bausteine unten, unverändert.
 */

/* ────────────────────────────────────────────────────────────────
 * Fehler
 * ──────────────────────────────────────────────────────────────── */

/**
 * Einheitlicher Fehlertyp für alle drei Rechner. UI-Seiten prüfen
 * `instanceof RechnerFehler`, um eine nutzerlesbare Eingabe-Meldung
 * (message ist bereits auf Deutsch formuliert) von einem echten Bug
 * zu unterscheiden.
 */
export class RechnerFehler extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RechnerFehler";
  }
}

/* ────────────────────────────────────────────────────────────────
 * Gemeinsame Fachtypen
 * ──────────────────────────────────────────────────────────────── */

/** Objekttyp — identisch für Verkaufswert- und Mietwertrechner. */
export type Objekttyp = "ETW" | "EFH" | "MFH";
export const OBJEKTTYPEN: readonly Objekttyp[] = ["ETW", "EFH", "MFH"];
export const OBJEKTTYP_LABEL: Record<Objekttyp, string> = {
  ETW: "Eigentumswohnung",
  EFH: "Einfamilienhaus",
  MFH: "Mehrfamilienhaus",
};

/**
 * Stadtgröße in 4 Stufen — grobe Näherung an Einwohnerklassen, kein
 * amtlicher Gebietstyp:
 *  - kleinstadt:  bis ca. 20.000 Einwohner
 *  - mittelstadt: ca. 20.000–100.000
 *  - grossstadt:  ca. 100.000–500.000
 *  - metropole:   über 500.000 (Berlin, Hamburg, München, Köln, Frankfurt, …)
 */
export type StadtGroesse = "kleinstadt" | "mittelstadt" | "grossstadt" | "metropole";
export const STADTGROESSEN: readonly StadtGroesse[] = ["kleinstadt", "mittelstadt", "grossstadt", "metropole"];
export const STADTGROESSE_LABEL: Record<StadtGroesse, string> = {
  kleinstadt: "Kleinstadt",
  mittelstadt: "Mittelstadt",
  grossstadt: "Großstadt",
  metropole: "Metropole",
};

/**
 * Generische Drei-Stufen-Skala. Wird für zwei fachlich unabhängige
 * Dinge verwendet, die sich zufällig dieselbe Form teilen: Mikrolage
 * (Wohnlage innerhalb der Stadtgröße, Verkaufswertrechner) und
 * Ausstattung (Mietwertrechner). Eigene Type-Aliase pro Verwendung,
 * damit Funktionssignaturen lesbar bleiben.
 */
export type DreiStufen = "einfach" | "mittel" | "gehoben";
export const DREI_STUFEN: readonly DreiStufen[] = ["einfach", "mittel", "gehoben"];
export const DREI_STUFEN_LABEL: Record<DreiStufen, string> = {
  einfach: "einfach",
  mittel: "mittel",
  gehoben: "gehoben",
};
export type Mikrolage = DreiStufen;
export type Ausstattung = DreiStufen;

/**
 * Gebäudezustand in 3 Stufen — für Verkaufswert- UND Mietwertrechner
 * identisch verwendet (ein sanierungsbedürftiges Haus ist in beiden
 * Modellen dasselbe sanierungsbedürftige Haus).
 */
export type Zustand = "sanierungsbeduerftig" | "gepflegt" | "neuwertig";
export const ZUSTAENDE: readonly Zustand[] = ["sanierungsbeduerftig", "gepflegt", "neuwertig"];
export const ZUSTAND_LABEL: Record<Zustand, string> = {
  sanierungsbeduerftig: "sanierungsbedürftig",
  gepflegt: "gepflegt",
  neuwertig: "neuwertig",
};

/* ────────────────────────────────────────────────────────────────
 * Rechenweg — für die UI: eine Liste nachvollziehbarer Schritte,
 * bereits als fertig formatierte Strings (die Rechner entscheiden
 * über Rundung/Einheiten, nicht die UI).
 * ──────────────────────────────────────────────────────────────── */

export interface RechenSchritt {
  label: string;
  wert: string;
}

/* ────────────────────────────────────────────────────────────────
 * Pflichttexte (siehe R3-PLAN.md, Abschnitt "Verträge": "jede
 * Ergebnisansicht trägt den Satz „Orientierungswert, kein Gutachten"").
 * Zentral hier definiert, damit UI und Rechner denselben Wortlaut
 * verwenden — nie im UI-Code neu formulieren.
 * ──────────────────────────────────────────────────────────────── */

export const PFLICHTTEXT_ORIENTIERUNG = "Orientierungswert, kein Gutachten.";
export const PFLICHTTEXT_ORIENTIERUNG_AFA = "Orientierungswert, kein Gutachten und keine Steuerberatung.";

/* ────────────────────────────────────────────────────────────────
 * Verkaufswertrechner — Eingaben/Ergebnis
 * ──────────────────────────────────────────────────────────────── */

export interface VerkaufswertEingaben {
  wohnflaeche: number; // m²
  baujahr: number;
  objekttyp: Objekttyp;
  zustand: Zustand;
  stadtgroesse: StadtGroesse;
  mikrolage: Mikrolage;
  /**
   * Nur bei EFH/MFH ausgewertet. Bei ETW wird die Angabe ignoriert
   * (der Miteigentumsanteil am Grundstück steckt marktüblich bereits
   * im Wohnungspreis) und taucht als Hinweis im Rechenweg auf.
   */
  grundstuecksflaeche?: number; // m²
}

export interface VerkaufswertErgebnis {
  vonEuro: number;
  bisEuro: number;
  mittelwertEuro: number;
  schritte: RechenSchritt[];
  hinweis: string;
}

/* ────────────────────────────────────────────────────────────────
 * Mietwertrechner — Eingaben/Ergebnis
 * ──────────────────────────────────────────────────────────────── */

export interface MietwertEingaben {
  wohnflaeche: number; // m²
  baujahr: number;
  objekttyp: Objekttyp;
  zustand: Zustand;
  ausstattung: Ausstattung;
  stadtgroesse: StadtGroesse;
}

export interface MietwertErgebnis {
  /** Kaltmiete pro Monat, gesamt (nicht je m²). */
  vonEuro: number;
  bisEuro: number;
  mittelwertEuro: number;
  /** true = Stadtgröße groß genug, dass die Mietpreisbremse typischerweise greifen kann (grossstadt/metropole). */
  mietpreisbremse: boolean;
  schritte: RechenSchritt[];
  hinweis: string;
}

/* ────────────────────────────────────────────────────────────────
 * AfA-Rechner — Eingaben/Ergebnis
 * ──────────────────────────────────────────────────────────────── */

/** Modernisierungsgrad je Bauteil: 0 = nicht modernisiert, 1 = teilmodernisiert, 2 = vollständig modernisiert. */
export interface ModernisierungsPunkte {
  dach: number;
  fenster: number;
  heizung: number;
  bad: number;
  elektrik: number;
  grundriss: number;
}

export interface AfaEingaben {
  /** Gesamtkaufpreis (Grundstück + Gebäude), in Euro. */
  kaufpreisGesamt: number;
  /** Gebäudeanteil in Prozent des Kaufpreises. Ohne Angabe: 80/20-Default. */
  gebaeudeanteilProzent?: number;
  /** Baujahr/Fertigstellungsjahr des Gebäudes (nicht das Erwerbsjahr). */
  baujahr: number;
  modernisierung: ModernisierungsPunkte;
  /** Jahr der Betrachtung. Ohne Angabe: aktuelles Kalenderjahr. Als Parameter, damit die Funktion deterministisch testbar bleibt. */
  bewertungsjahr?: number;
  /** Persönlicher Grenzsteuersatz in Prozent, nur für die Steuereffekt-Anzeige. Ohne Angabe: 42 %. */
  grenzsteuersatzProzent?: number;
}

export interface AfaErgebnis {
  gebaeudewertEuro: number;
  alterJahre: number;
  gesamtnutzungsdauerJahre: number;
  modernisierungspunkteGesamt: number;
  modernisierungsgrad: string;
  restnutzungsdauerJahre: number;
  /** true, wenn die Restnutzungsdauer-Betrachtung tatsächlich eine höhere AfA erlaubt als der reguläre Satz. */
  gutachtenGreift: boolean;
  afaSatzRegulaerProzent: number;
  afaSatzGutachtenProzent: number;
  afaRegulaerProJahrEuro: number;
  afaGutachtenProJahrEuro: number;
  mehrAbschreibungProJahrEuro: number;
  mehrAbschreibungUeber10JahreEuro: number;
  grenzsteuersatzProzent: number;
  steuerersparnisProJahrEuro: number;
  steuerersparnisUeber10JahreEuro: number;
  schritte: RechenSchritt[];
  hinweis: string;
}

/* ────────────────────────────────────────────────────────────────
 * Datum
 * ──────────────────────────────────────────────────────────────── */

/** Aktuelles Kalenderjahr, an einer Stelle gebündelt (statt `new Date()` verstreut über die Rechner). */
export function aktuellesJahr(): number {
  return new Date().getFullYear();
}

/* ────────────────────────────────────────────────────────────────
 * Zahlformatierung — deutsches Format, an einer Stelle gebündelt,
 * damit alle drei Rechner identisch runden/formatieren.
 * ──────────────────────────────────────────────────────────────── */

const DE_LOCALE = "de-DE";

/** Rundet auf volle Cent (2 Nachkommastellen) — für alle Euro-Ausgabefelder der Ergebnistypen. */
export function rundeCent(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatZahl(n: number, nachkommastellen = 0): string {
  return new Intl.NumberFormat(DE_LOCALE, {
    minimumFractionDigits: nachkommastellen,
    maximumFractionDigits: nachkommastellen,
  }).format(n);
}

export function formatEuro(n: number, nachkommastellen = 0): string {
  return `${formatZahl(n, nachkommastellen)} €`;
}

export function formatEuroProM2(n: number, nachkommastellen = 0): string {
  return `${formatZahl(n, nachkommastellen)} €/m²`;
}

export function formatQm(n: number): string {
  return `${formatZahl(n, Number.isInteger(n) ? 0 : 1)} m²`;
}

export function formatProzent(n: number, nachkommastellen = 1): string {
  return `${formatZahl(n, nachkommastellen)} %`;
}

export function formatFaktor(n: number): string {
  return `× ${formatZahl(n, 2)}`;
}

/* ────────────────────────────────────────────────────────────────
 * Validierungs-Helfer — jede Eingabe wird geprüft, bevor gerechnet
 * wird. Ungültige/absurde Werte werfen RechnerFehler mit einer
 * nutzerlesbaren deutschen Meldung, statt NaN/Unsinn still
 * durchzureichen.
 * ──────────────────────────────────────────────────────────────── */

/**
 * Formatiert eine Grenze für Fehlermeldungen OHNE Tausendertrennzeichen
 * — anders als formatZahl(), das für Ausgabewerte (Geldbeträge,
 * Flächen) korrekt gruppiert. Grenzen sind oft Jahreszahlen (z. B.
 * Baujahr <= 2026), bei denen "2.026" auf Deutsch falsch wirkt.
 */
function formatGrenze(n: number): string {
  return new Intl.NumberFormat(DE_LOCALE, { useGrouping: false, maximumFractionDigits: 2 }).format(n);
}

export function pruefeZahl(wert: unknown, feld: string, optionen: { min?: number; max?: number } = {}): number {
  const n = typeof wert === "number" ? wert : NaN;
  if (!Number.isFinite(n)) {
    throw new RechnerFehler(`${feld}: bitte eine gültige Zahl angeben.`);
  }
  if (optionen.min !== undefined && n < optionen.min) {
    throw new RechnerFehler(`${feld}: Wert muss mindestens ${formatGrenze(optionen.min)} sein.`);
  }
  if (optionen.max !== undefined && n > optionen.max) {
    throw new RechnerFehler(`${feld}: Wert darf höchstens ${formatGrenze(optionen.max)} sein.`);
  }
  return n;
}

export function pruefeGanzzahl(wert: unknown, feld: string, optionen: { min?: number; max?: number } = {}): number {
  const n = pruefeZahl(wert, feld, optionen);
  if (!Number.isInteger(n)) {
    throw new RechnerFehler(`${feld}: bitte eine ganze Zahl angeben.`);
  }
  return n;
}

/**
 * Prüft einen String gegen eine feste Liste erlaubter Werte (Enum-
 * Felder wie Objekttyp/Zustand/Stadtgröße). Nimmt bewusst `string`
 * statt des generischen Union-Typs entgegen: Eingaben aus einem
 * Formular/JSON sind zur Laufzeit nur `string`, TypeScript prüft die
 * Union nur zur Compile-Zeit gegenüber getippten Aufrufern.
 */
export function pruefeEnum<T extends string>(wert: string, erlaubte: readonly T[], feld: string): T {
  if (!(erlaubte as readonly string[]).includes(wert)) {
    throw new RechnerFehler(`${feld}: ungültiger Wert "${wert}". Erlaubt: ${erlaubte.join(", ")}.`);
  }
  return wert as T;
}
