/**
 * Marktdaten-Modul der beuwy-Bewertungs-Engine.
 *
 * PORT-HINWEIS (27.08.2026): Anders als valuation.ts/boris.ts/geocode.ts/
 * parse-de-zahl.ts ist diese Datei KEIN 1:1-Port aus dem Riegel-Projekt.
 * Riegels src/lib/marktdaten.ts speiste einen „Preisatlas" für eine
 * Handvoll Vorderpfalz-/Rhein-Neckar-Orte aus einer hart hinterlegten
 * Standort-Artikel-Liste (`standorte()`/`standortCoords()` aus
 * lib/geo(-taxonomy).ts) — beide Module gibt es in beuwy nicht, und beuwy
 * bedient Makler bundesweit, nicht eine Handvoll Kernorte.
 *
 * Übernommen ist NUR die Struktur/Vertrag (Auftrag): die Typen `MarktOrt`
 * und `OrtsStats` sowie die Funktionssignatur von `marktortByOrt` bleiben
 * wie im Original. Ersetzt ist Riegels regionale Ortsliste durch einen
 * BUNDESWEITEN Fallback: `ortsStatsFallback(stadtgroesse, objektart)`
 * leitet eine ehrliche OrtsStats-Spanne aus den bestehenden
 * Rechner-Basistabellen ab (src/lib/rechner/verkaufswert.ts,
 * src/lib/rechner/mietwert.ts) — s. Herleitung dort unten.
 *
 * `marktortByOrt` liefert deshalb IMMER `undefined`: beuwy hat keine
 * Riegel-artige Liste einzelner Standort-Artikel, aus der sich ein
 * konkreter Ort (Slug, Koordinaten, individuelle Trendkurve …) auflösen
 * ließe. Ein Aufrufer, der bisher `marktortByOrt(ort) ?? ortsStatsFallback(...)`
 * erwartet, bekommt also stets den bundesweiten Fallback-Pfad — exakt das
 * vom Auftrag verlangte Verhalten („marktortByOrt liefert null bei
 * Unbekannt und der Aufrufer fällt auf ortsStatsFallback zurück").
 */
import type { Objektart } from "./valuation";
import { berechneVerkaufswert } from "@/lib/rechner/verkaufswert";
import { berechneMietwert } from "@/lib/rechner/mietwert";
import type { Objekttyp, StadtGroesse, Zustand, Mikrolage, Ausstattung } from "@/lib/rechner/typen";

/* ────────────────────────────────────────────────────────────────
 * Struktur/Typen — wie das Riegel-Original (s. PORT-HINWEIS).
 * ──────────────────────────────────────────────────────────────── */

export interface MarktOrt {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  wohnung: { min: number; max: number };
  haus: { min: number; max: number };
  bodenrichtwert: number;
  trendYoyPct: number;
  /** 12 Index-Punkte, Basis 100 (erster Punkt), letzter Punkt = 100 + trendYoyPct. */
  trend12: number[];
  yieldPct: number;
  vermarktungszeitTage: number;
  /** Nachfrage-Score 1 (schwach) bis 10 (sehr stark). */
  nachfrage: number;
}

/**
 * Aggregat ECHTER Abschlüsse eines Orts (€/m² Wohnfläche) — Spiegel des
 * gleichnamigen Typs in valuation.ts (dort erneut definiert, weil
 * valuation.ts client-seitig läuft und keinen Server-Import dieser Datei
 * eingehen soll). `n` ist die ehrliche Vergleichsobjekt-Zahl; `estimateValue`
 * nutzt `p75Qm` als Plausibilitäts-Deckel — NUR wenn `n` die dort intern
 * gepflegte Mindestschwelle erreicht (s. DECKEL_MIN_N-Spiegel unten).
 */
export interface OrtsStats {
  n: number;
  medianQm: number;
  p75Qm: number;
}

/** Stand der Marktdaten — an Seite/JSON-LD durchreichen statt `new Date()`. */
export const MARKT_STAND = "Q3 2026";

/**
 * Derselbe Stand als ISO-Datum (Quartalsbeginn) — MIT MARKT_STAND ZUSAMMEN
 * NACHZIEHEN, beide Werte müssen dasselbe Quartal meinen.
 */
export const MARKT_STAND_DATUM = "2026-07-01";

export const PREIS_DISCLAIMER =
  "Modellwerte und Spannen basieren auf bundesweiten Rechner-Basistabellen sowie amtlichen Bodenrichtwerten, sind keine Verkehrswertermittlung nach § 194 BauGB — der Bodenrichtwert ist ein Bodenwert, kein Objektpreis.";

/**
 * Kein Standort-Artikel-Bestand in beuwy (s. PORT-HINWEIS) — es gibt daher
 * keine Möglichkeit, einen freien Ortsnamen auf einen individuellen
 * `MarktOrt` (mit eigener Trendkurve, Vermarktungszeit, Nachfrage-Score …)
 * aufzulösen. Liefert bewusst immer `undefined`, NIE eine erfundene
 * Trendkurve für einen Ort, den wir gar nicht kennen — der Aufrufer fällt
 * auf `ortsStatsFallback()` zurück (Preis-Spanne) bzw. auf die
 * ortsunabhängigen Schichten in `estimateValue` selbst (Stadt-Niveau/
 * BRW-Ableitung, s. valuation.ts).
 */
export function marktortByOrt(_city: string, _lat?: number, _lng?: number): MarktOrt | undefined {
  return undefined;
}

/* ────────────────────────────────────────────────────────────────
 * Bundesweiter Fallback — Herleitung aus den Rechner-Basistabellen.
 * ──────────────────────────────────────────────────────────────── */

/**
 * Muss mit der privaten Konstante `DECKEL_MIN_N` in valuation.ts
 * (estimateValue) synchron bleiben — Konsistenz-Pflicht wie beim
 * REGION_BASIS-Spiegel im Riegel-Original. `ortsStatsFallback` setzt `n`
 * bewusst NIEDRIGER als diese Schwelle (s. Kommentar dort): der
 * Plausibilitäts-Deckel in valuation.ts soll NUR bei echten, gezählten
 * Abschlüssen greifen, nie bei einer aus Basistabellen abgeleiteten Zahl.
 */
const VALUATION_DECKEL_MIN_N = 8;

/** Baujahr-Referenzpunkt der Rechner-Basistabellen ("Referenzpunkt: Zustand
 *  gepflegt, Baujahr um 2000, mittlere Mikrolage" — s. verkaufswert.ts/
 *  mietwert.ts). Bewusst FEST statt `aktuellesJahr()`: 2000 liegt in JEDEM
 *  Kalenderjahr in der neutralen Baujahrsstufe (1995–2009, Faktor 1,0) der
 *  beiden Rechner — die Ableitung bleibt damit zeitlos stabil, ohne bei
 *  jedem Jahreswechsel zu driften. */
const REFERENZ_BAUJAHR = 2000;
/** Neutrale Referenz-Wohnfläche für die Rückrechnung auf €/m² — der Wert
 *  selbst ist beliebig (kürzt sich beim Teilen durch dieselbe Fläche
 *  wieder heraus), 100 ist nur für glatte Zwischenwerte gewählt. */
const REFERENZ_WOHNFLAECHE = 100;
const REFERENZ_ZUSTAND: Zustand = "gepflegt";
const REFERENZ_MIKROLAGE: Mikrolage = "mittel";
const REFERENZ_AUSSTATTUNG: Ausstattung = "mittel";
/** Obere Spanne: bestmögliche, aber noch marktübliche Kombination aus
 *  Zustand und Mikrolage — NICHT zusätzlich das jüngste Baujahr (das würde
 *  drei Bestfaktoren gleichzeitig stapeln und weit über ein echtes
 *  75 %-Perzentil hinausschießen, s. Funktionskommentar unten). */
const OBERE_ZUSTAND: Zustand = "neuwertig";
const OBERE_MIKROLAGE: Mikrolage = "gehoben";

/**
 * `Objektart` (valuation.ts, 5 Ausprägungen: wohnung/haus/grundstueck/
 * gewerbe/mehrfamilienhaus) auf `Objekttyp` (rechner/typen.ts, 3
 * Ausprägungen: ETW/EFH/MFH) abbilden — die Rechner-Basistabellen kennen
 * nur Wohn-Objekttypen, kein Grundstück und kein Gewerbe.
 *
 * Praktisch betrifft das nur wohnung→ETW und haus→EFH: valuation.ts prüft
 * den Plausibilitäts-Deckel (der einzige Verbraucher von `OrtsStats.p75Qm`)
 * ausschließlich für `flaechenObjekt` (objektart "wohnung"/"haus", s. dort).
 * grundstueck/gewerbe werden hier trotzdem sinnvoll abgebildet (EFH als
 * nächstliegender Bau-Anteil-Proxy), damit die Funktion für den vollen
 * `Objektart`-Typ definiert bleibt und kein Aufrufer auf `undefined` prüfen
 * muss — ihr Ergebnis wirkt in der Praxis nur nicht auf den Deckel.
 */
function objekttypFuer(objektart: Objektart): Objekttyp {
  if (objektart === "wohnung") return "ETW";
  if (objektart === "mehrfamilienhaus") return "MFH";
  // "haus", "grundstueck", "gewerbe"
  return "EFH";
}

/**
 * Bundesweiter OrtsStats-Fallback, wenn `marktortByOrt` nichts liefert
 * (immer, s. o.) — löst den Auftrag „estimateValue liefert überall in
 * Deutschland eine ehrliche Spanne, auch ohne Riegels regionale Ortsliste".
 *
 * HERLEITUNG (statt eigener, dritter Basistabelle): ruft `berechneVerkaufswert`
 * mit dem in verkaufswert.ts dokumentierten REFERENZPUNKT auf
 * (Wohnfläche 100 m², Baujahr 2000, Zustand „gepflegt", Mikrolage „mittel",
 * keine Grundstücksfläche → Bodenwert 0). Bei diesen Eingaben sind
 * Zustands-, Lage- und Altersfaktor exakt 1, wodurch
 * `mittelwertEuro / 100 m²` bit-genau der privaten Basispreis-Tabelle
 * `BASISPREIS_PRO_M2[Objekttyp][StadtGroesse]` in verkaufswert.ts entspricht
 * — OHNE diese private Konstante zu importieren oder zu duplizieren
 * (verkaufswert.ts exportiert absichtlich nur die Rechenfunktion). Ändert
 * sich die Basistabelle dort, zieht dieser Fallback automatisch nach.
 *
 * `medianQm` = dieser Referenzwert. `p75Qm` = derselbe Aufruf mit der oberen,
 * aber noch marktüblichen Kombination „neuwertig" × „gehoben" (Baujahr
 * bleibt bei 2000, Altersfaktor also weiter neutral) — das bildet eine
 * plausible obere Bandbreite ab (Zustands- × Lagefaktor ≈ ×1,32), ohne
 * zusätzlich noch das jüngste Baujahr aufzustapeln (das wäre die
 * Extremkombination aller drei Bestfaktoren gleichzeitig und damit kein
 * 75 %-, sondern ein Nahe-Maximum-Perzentil).
 *
 * `n = 0` ist BEWUSST kein Platzhalter, sondern der Kern der Ehrlichkeits-
 * Garantie dieser Funktion: valuation.ts aktiviert den p75-Plausibilitäts-
 * Deckel nur ab `n >= DECKEL_MIN_N` (dort intern 8, s. Spiegel oben) UND
 * formuliert beim Greifen des Deckels wörtlich „X echte Verkäufe … (OnOffice)
 * erzielten …" in den zurückgegebenen `annahmen`. Diese Aussage stimmt für
 * Riegels eigenen OnOffice-Verkauft-Pool — für einen aus Basistabellen
 * ABGELEITETEN Wert wäre sie schlicht falsch. `n = 0` stellt sicher, dass
 * der Deckel-Zweig für diesen Fallback NIE greift, ganz gleich, wie diese
 * OrtsStats verwendet werden — `medianQm`/`p75Qm` bleiben trotzdem nutzbar,
 * z. B. für eine eigene, unabhängig beschriftete Anzeige „bundesweite
 * Preisspanne für {Stadtgröße}/{Objektart}".
 *
 * QUERPROBE GEGEN mietwert.ts (Auftrag: „aus … UND mietwert.ts ableiten"):
 * Dieselbe Referenzkombination durch `berechneMietwert` ergibt für ETW/
 * Mittelstadt z. B. 8,50 €/m²/Monat (102 €/m²/Jahr) gegen eine Kauf-Basis
 * von 2.400 €/m² — eine Bruttomietrendite von ≈4,25 %. Das liegt sauber
 * innerhalb der Bandbreite, die valuation.ts an anderer Stelle für
 * plausible Renditen ansetzt (`regionalRentYieldPct`: 2,6–5,2 %). Kauf- und
 * Mietrechner der Basistabellen widersprechen sich damit nicht — genau das
 * bestätigt `bundesweiteBruttomietrendite` unten zur Laufzeit, statt es nur
 * einmalig im Kommentar zu behaupten.
 */
export function ortsStatsFallback(stadtgroesse: StadtGroesse, objektart: Objektart): OrtsStats {
  const objekttyp = objekttypFuer(objektart);
  const basis = berechneVerkaufswert({
    wohnflaeche: REFERENZ_WOHNFLAECHE,
    baujahr: REFERENZ_BAUJAHR,
    objekttyp,
    zustand: REFERENZ_ZUSTAND,
    stadtgroesse,
    mikrolage: REFERENZ_MIKROLAGE,
  });
  const obere = berechneVerkaufswert({
    wohnflaeche: REFERENZ_WOHNFLAECHE,
    baujahr: REFERENZ_BAUJAHR,
    objekttyp,
    zustand: OBERE_ZUSTAND,
    stadtgroesse,
    mikrolage: OBERE_MIKROLAGE,
  });
  return {
    // Bewusst 0, nicht VALUATION_DECKEL_MIN_N — s. Funktionskommentar.
    n: 0,
    medianQm: Math.round(basis.mittelwertEuro / REFERENZ_WOHNFLAECHE),
    p75Qm: Math.round(obere.mittelwertEuro / REFERENZ_WOHNFLAECHE),
  };
}

/**
 * Additiv (nicht Teil des Riegel-Originals): bundesweite Bruttomietrendite
 * für Stadtgröße × Objektart, aus denselben Referenz-Eingaben wie
 * `ortsStatsFallback` — einmal über `berechneVerkaufswert` (Kaufpreis-
 * Basis), einmal über `berechneMietwert` (Jahreskaltmiete). Dient als
 * Laufzeit-Beleg der Querprobe im Funktionskommentar oben und ist für einen
 * Aufrufer nutzbar, der Kauf- und Mietrechner konsistent nebeneinander
 * anzeigen will (z. B. „Rendite-Hinweis" im Ergebnis-Wizard).
 */
export function bundesweiteBruttomietrendite(stadtgroesse: StadtGroesse, objektart: Objektart): number {
  const objekttyp = objekttypFuer(objektart);
  const kauf = berechneVerkaufswert({
    wohnflaeche: REFERENZ_WOHNFLAECHE,
    baujahr: REFERENZ_BAUJAHR,
    objekttyp,
    zustand: REFERENZ_ZUSTAND,
    stadtgroesse,
    mikrolage: REFERENZ_MIKROLAGE,
  });
  const miete = berechneMietwert({
    wohnflaeche: REFERENZ_WOHNFLAECHE,
    baujahr: REFERENZ_BAUJAHR,
    objekttyp,
    zustand: REFERENZ_ZUSTAND,
    ausstattung: REFERENZ_AUSSTATTUNG,
    stadtgroesse,
  });
  const jahreskaltmiete = miete.mittelwertEuro * 12;
  return Math.round((jahreskaltmiete / kauf.mittelwertEuro) * 1000) / 10; // %, 1 Nachkommastelle
}
