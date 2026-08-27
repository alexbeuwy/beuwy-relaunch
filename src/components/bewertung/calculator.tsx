"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Icon, type IconName } from "@/components/bewertung/icon";
import { MapConsentGate } from "@/components/bewertung/consent";
import { ortAusLabel, searchAddress, type GeoResult } from "@/lib/bewertung/geocode";
import { track, trackKlick, setAnsicht, type Ansicht } from "@/lib/bewertung/track";
import { EnergieStrahlWahl, type Energieausweis } from "@/components/bewertung/energie-strahl-wahl";
import {
  estimateValue,
  AUSSTATTUNG_HAUS,
  AUSSTATTUNG_WOHNUNG,
  AUSSTATTUNG_GEWERBE,
  AUSSTATTUNG_MFH,
  HAUSTYPEN,
  type Haustyp,
  QUALITAETEN,
  type Objektart,
  type OrtsStats,
  type Qualitaet,
  type ValuationInput,
  type ValuationResult,
  type Vermietungsstand,
  type Zustand,
} from "@/lib/bewertung/valuation";
import { marktortByOrt, ortsStatsFallback, type MarktOrt } from "@/lib/bewertung/marktdaten";
// Stadtgröße gehört nicht zum Riegel-Vertrag (dort gab es eine feste
// Ortsliste) — ortsStatsFallback() in marktdaten.ts braucht sie aber, um
// aus den Rechner-Basistabellen (lib/rechner/verkaufswert.ts) eine ehrliche
// bundesweite Spanne abzuleiten. Da eine Adresssuche keine Einwohnerzahl
// liefert, fragt der Standort-Schritt kurz nach (Selbstauskunft, wie schon
// im alten Slider-Rechner).
import { STADTGROESSEN, STADTGROESSE_LABEL, type StadtGroesse } from "@/lib/rechner/typen";
// Nur der Typ — der Client ruft NIE lib/boris.ts direkt, sondern immer den
// Server-Proxy /api/bodenrichtwert. Type-only Import fällt beim Build weg.
import type { Bodenrichtwert, BorisQuelle } from "@/lib/bewertung/boris";
import { ErgebnisSchleuse } from "./ErgebnisSchleuse";
import { ReportRequest } from "@/components/bewertung/report-request";
import { parseDeZahl } from "@/lib/bewertung/parse-de-zahl";

/**
 * Verkaufspreis-Wizard — Port aus Riegel `components/calculator/calculator.tsx`
 * (LEAF P2, das Herzstück des Rechner-Ports). Struktur/UX-Klasse bleibt:
 * drei Formular-Schritte mit endowed progress, eine Analyse-Zwischenphase
 * mit progressivem Quellen-Reveal + Fortschrittsbalken, dann das Ergebnis
 * SOFORT sichtbar — der optionale PDF/E-Mail-Report kommt erst danach
 * (s. report-request.tsx), kein Lead-Gate vor dem Ergebnis.
 *
 * Gegenüber dem Original bewusst gekürzt, weil beuwy keine eigene
 * Maklerpraxis mit Telefonnummer, Filialen oder Transaktionsdatenbank ist:
 *  - kein site.phone/site.locations — Demo-/Fallback-Koordinaten sind
 *    Mannheim (49.4875, 8.466), Kontakt-Ausweg ist E-Mail statt Telefon.
 *  - kein /api/marktstats (OnOffice-Vergleichspool gibt es nicht): Fehlt ein
 *    Markt-Treffer aus lib/bewertung/marktdaten, springt die Engine auf
 *    ortsStatsFallback() — und das Ergebnis weist das ehrlich aus
 *    ("Marktdaten-Basis: bundesweite Vergleichstabellen") statt eine
 *    Orts-Statistik vorzutäuschen.
 *  - keine Browser-History-Rückwärtssperre (Riegels popstate-Tiefenlogik):
 *    für ein Marketing-Tool ohne Umsatzkritikalität ist das über den Wert
 *    der zusätzlichen Komplexität hinaus — „Zurück" ist der In-Form-Button.
 *  - kein JS-Text-Fit-Script für die Ergebniszahl: ein CSS-clamp() reicht,
 *    ohne Messschleife bei jedem Web-Font-Swap.
 * Fortschrittsknoten, Analyse-Reveal-Liste und Count-up-Ergebniszahl sind
 * unverändert die zentrale UX-Klasse und bleiben erhalten.
 */

const LocationMap = dynamic(() => import("@/components/bewertung/location-map").then((m) => m.LocationMap), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-bg-elevated" />,
});

type Phase = "form" | "analyzing" | "result";

// Vier Fortschritts-Knoten: „Rechner aufrufen" gilt mit dem Öffnen bereits
// als erledigt (psychologischer Vorsprung) — die drei Formularschritte folgen.
const STEP_NODES = ["Rechner aufrufen", "Objektart", "Standort", "Eckdaten"];
// Nicht-linearer Fortschritt je Formularschritt (frühe Schritte springen weiter).
const PROGRESS_PCT = [32, 60, 82];

/** Ladezustand der amtlichen Bodenrichtwert-Abfrage (/api/bodenrichtwert). */
interface BorisState {
  loading: boolean;
  data: Bodenrichtwert | null;
  attribution: string | null;
}
const BORIS_EMPTY: BorisState = { loading: false, data: null, attribution: null };

/**
 * Kurzlabel je Landesdienst für das BORIS-Badge — bewusst eine eigene,
 * kleine Kopie statt `BORIS_QUELLEN` aus lib/bewertung/boris.ts zu
 * importieren: die Datei ist server-only (WFS/WMS-Abfragen, HTML-Parsing)
 * und darf laut ihrem eigenen Dateikopf nie als Wert ins Client-Bundle
 * gezogen werden — nur Typen. Der volle, rechtlich verbindliche
 * Quellenvermerk kommt ohnehin schon vom Server (s. `boris.attribution`
 * unten), dieses Label ist nur die Badge-Kurzform.
 */
const BORIS_QUELLE_LABEL: Record<BorisQuelle, string> = {
  RLP: "BORIS-RLP",
  HE: "BORIS Hessen",
  NI: "BORIS Niedersachsen",
  HB: "BORIS Bremen",
  NW: "BORIS-NRW",
  BB: "BORIS Brandenburg",
  HH: "BORIS Hamburg",
  SN: "BORIS-SN",
  TH: "BORIS Thüringen",
  ST: "BORIS Sachsen-Anhalt",
  MV: "BORIS M-V",
  BE: "BORIS Berlin",
};

const nfDE = new Intl.NumberFormat("de-DE");

/** Eigener kleiner Formatter statt Cross-Import: formatEUR gehört nicht zum
 *  Modul-Vertrag von lib/bewertung/valuation.ts (dessen additive Exporte
 *  sind für diesen Leaf nicht garantiert). */
function formatEUR(n: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

/**
 * Demo-Modus für interne Tests: /tools/verkaufspreisrechner?demo=wohnung
 * |haus|mfh füllt ein realistisches Objekt komplett aus und startet die
 * Analyse automatisch. beuwy hat keine Filialen/Standorte (Riegel-Spezifikum)
 * — Fallback-Koordinaten sind Mannheim, wie von der Leaf-Vorgabe verlangt.
 */
const DEMO_ADRESSE: GeoResult = {
  label: "Musterstraße 12, 68159 Mannheim",
  city: "Mannheim",
  postcode: "68159",
  lat: 49.4875,
  lng: 8.466,
};

const DEMO_PRESETS: Record<string, Partial<FormState>> = {
  wohnung: {
    objektart: "wohnung",
    address: DEMO_ADRESSE,
    addressQuery: DEMO_ADRESSE.label,
    wohnflaeche: "92",
    zimmer: "3",
    badezimmer: "1",
    baujahr: "1996",
    zustand: "gepflegt",
    qualitaet: "normal",
    energieklasse: "C",
    hausgeld: "290",
    ausstattung: ["Balkon / Terrasse", "Keller"],
  },
  haus: {
    objektart: "haus",
    address: DEMO_ADRESSE,
    addressQuery: DEMO_ADRESSE.label,
    wohnflaeche: "160",
    grundflaeche: "520",
    zimmer: "5",
    badezimmer: "2",
    baujahr: "1988",
    zustand: "gepflegt",
    qualitaet: "normal",
    energieklasse: "D",
    ausstattung: ["Garage / Stellplatz", "Keller"],
  },
  mfh: {
    objektart: "mehrfamilienhaus",
    address: DEMO_ADRESSE,
    addressQuery: DEMO_ADRESSE.label,
    wohnflaeche: "420",
    grundflaeche: "600",
    wohneinheiten: "6",
    jahresnettokaltmiete: "42000",
    vermietungsstand: "vermietet",
    baujahr: "1972",
    zustand: "gepflegt",
    qualitaet: "normal",
    ausstattung: [],
  },
};

/** Textstufe der Nachfrage aus dem 1–10-Score in lib/bewertung/marktdaten.ts. */
function nachfrageLabel(score: number): string {
  if (score >= 8) return "sehr hohe Nachfrage";
  if (score >= 6) return "hohe Nachfrage";
  if (score >= 4) return "moderate Nachfrage";
  return "verhaltene Nachfrage";
}

interface FormState {
  objektart: Objektart;
  address: GeoResult | null;
  addressQuery: string;
  /** Nur für den bundesweiten Fallback (ortsStatsFallback) — keine
   *  Adresssuche kennt die Einwohnerzahl, also Selbstauskunft. */
  stadtgroesse: StadtGroesse;
  wohnflaeche: string;
  grundflaeche: string;
  zimmer: string;
  badezimmer: string;
  baujahr: string;
  zustand: Zustand;
  qualitaet: Qualitaet;
  energieklasse: string;
  energieausweis: Energieausweis;
  ausstattung: string[];
  /** Nur Haus: Bauform (freistehend, Doppelhaushälfte, Reihenhaus, Bungalow). */
  haustyp: Haustyp;
  /** Nur Haus: zweite abgeschlossene Wohneinheit. */
  zweifamilienhaus: boolean;
  /** Nur für objektart === "mehrfamilienhaus" — Ertragswert-Eingaben. */
  jahresnettokaltmiete: string;
  wohneinheiten: string;
  gewerbeeinheiten: string;
  vermietungsstand: Vermietungsstand;
  leerstehendeWohnflaeche: string;
  /** Nur Gewerbe: Hallen-/Lageranteil an der Nutzfläche in m². */
  hallenflaeche: string;
  /** Nur Gewerbe: Wohnfläche abgeschlossener Wohneinheiten im Objekt (Mischobjekt). */
  mischWohnflaeche: string;
  /** Nur Wohnung: monatliches Hausgeld in € — realer Preisdrücker. */
  hausgeld: string;
  /** Wohnung/Haus: Kernsanierung erdet die „neuwertig"-Selbstauskunft bei Altbaujahren. */
  kernsaniert: boolean;
}

const EMPTY: FormState = {
  objektart: "wohnung",
  address: null,
  addressQuery: "",
  stadtgroesse: "grossstadt",
  wohnflaeche: "",
  grundflaeche: "",
  zimmer: "",
  badezimmer: "",
  baujahr: "",
  zustand: "gepflegt",
  qualitaet: "normal",
  energieklasse: "",
  energieausweis: "",
  ausstattung: [],
  haustyp: "freistehend",
  zweifamilienhaus: false,
  jahresnettokaltmiete: "",
  wohneinheiten: "",
  gewerbeeinheiten: "",
  vermietungsstand: "vermietet",
  leerstehendeWohnflaeche: "",
  hallenflaeche: "",
  mischWohnflaeche: "",
  hausgeld: "",
  kernsaniert: false,
};

/**
 * Formular-Persistenz im sessionStorage. Ein Reload oder ein versehentlicher
 * Tab-Wechsel darf die Eingaben nicht löschen — sessionStorage (nicht
 * localStorage) überlebt genau den Besuch und verschwindet danach von selbst.
 */
const SPEICHER_KEY = "beuwy:verkaufspreisrechner";
const SPEICHER_MAX_MS = 30 * 60 * 1000;

interface GespeicherterStand {
  ts: number;
  step: number;
  f: FormState;
  ortNaeherung?: boolean;
}

function istDemo(): boolean {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demo");
}

function standLoeschen(): void {
  try {
    sessionStorage.removeItem(SPEICHER_KEY);
  } catch {
    /* fail-soft: Private-Mode / gesperrter Storage darf den Rechner nie stören */
  }
}

function standLaden(): GespeicherterStand | null {
  try {
    const roh = sessionStorage.getItem(SPEICHER_KEY);
    if (!roh) return null;
    const snap = JSON.parse(roh) as GespeicherterStand;
    if (!snap?.f || typeof snap.ts !== "number" || Date.now() - snap.ts > SPEICHER_MAX_MS) {
      standLoeschen();
      return null;
    }
    return { ...snap, step: Math.min(2, Math.max(0, snap.step | 0)), f: { ...EMPTY, ...snap.f } };
  } catch {
    return null;
  }
}

/**
 * Optionale Zahlenfelder, die sonst LAUTLOS verworfen würden: parseDeZahl
 * liefert bei „ca. 1998er Bau" oder „vier" undefined, die Analyse würde
 * einfach ohne das Feld weiterrechnen — der Eigentümer hat es angegeben und
 * wundert sich später über den Wert. Geprüft wird nur, was zur aktuellen
 * Objektart auch SICHTBAR ist.
 */
const ZAHLFELDER: {
  key: keyof FormState;
  label: string;
  beispiel: string;
  sichtbar: (f: FormState) => boolean;
}[] = [
  { key: "baujahr", label: "Baujahr", beispiel: "1998", sichtbar: (f) => f.objektart !== "grundstueck" },
  {
    key: "zimmer",
    label: "Zimmer",
    beispiel: "3,5",
    sichtbar: (f) => f.objektart === "wohnung" || f.objektart === "haus" || f.objektart === "mehrfamilienhaus",
  },
  {
    key: "badezimmer",
    label: "Badezimmer",
    beispiel: "1,5",
    sichtbar: (f) => f.objektart !== "gewerbe" && f.objektart !== "grundstueck",
  },
  { key: "hausgeld", label: "Hausgeld pro Monat", beispiel: "320", sichtbar: (f) => f.objektart === "wohnung" },
  {
    key: "jahresnettokaltmiete",
    label: "Jahresnettokaltmiete",
    beispiel: "48000",
    sichtbar: (f) => f.objektart === "mehrfamilienhaus" && f.vermietungsstand !== "leer",
  },
  { key: "wohneinheiten", label: "Wohneinheiten", beispiel: "6", sichtbar: (f) => f.objektart === "mehrfamilienhaus" },
  { key: "gewerbeeinheiten", label: "Gewerbeeinheiten", beispiel: "1", sichtbar: (f) => f.objektart === "mehrfamilienhaus" },
  {
    key: "leerstehendeWohnflaeche",
    label: "Leerstehende Wohnfläche",
    beispiel: "120",
    sichtbar: (f) => f.objektart === "mehrfamilienhaus" && f.vermietungsstand === "teilweise",
  },
  { key: "hallenflaeche", label: "Hallen-/Lagerfläche", beispiel: "400", sichtbar: (f) => f.objektart === "gewerbe" },
  { key: "mischWohnflaeche", label: "Wohnfläche im Objekt", beispiel: "160", sichtbar: (f) => f.objektart === "gewerbe" },
];

/**
 * Reduzierte Such-Queries für den Ortszentrum-Fallback (s. ortFallback).
 * Reihenfolge = Trefferchance: erst PLZ + Ort, dann die letzten Komma-
 * Segmente, zuletzt die Eingabe ohne Hausnummer.
 */
function ortKandidaten(roh: string): string[] {
  const segmente = roh
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const out: string[] = [];
  const plzOrt = roh.match(/\b\d{5}\b[^,]*/);
  if (plzOrt) out.push(plzOrt[0].trim());
  if (segmente.length >= 1) out.push(segmente[segmente.length - 1]);
  if (segmente.length >= 2) out.push(segmente.slice(-2).join(", "));
  const ohneNr = segmente.map((t) => t.replace(/\s*\d+\s*[a-z]?$/i, "").trim()).filter(Boolean);
  if (ohneNr.length) out.push(ohneNr.join(", "));
  return [...new Set(out)].filter((s) => s.trim().length >= 3);
}

// Objektart-Kacheln — eigene Icon-Pfade (24er-Raster, runde Enden), keine
// Marken-Glyphen, daher direkt inline statt über die Icon-Komponente.
const OBJEKTARTEN: { key: Objektart; label: string; icon: React.ReactNode }[] = [
  { key: "wohnung", label: "Wohnung", icon: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6" /> },
  { key: "haus", label: "Haus", icon: <path d="M3 11.5 12 4l9 7.5M5 10v11h14V10M10 21v-6h4v6" /> },
  {
    key: "mehrfamilienhaus",
    label: "Mehrfamilien­haus",
    icon: (
      <>
        <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 21V9h4a1 1 0 0 1 1 1v11M3 21h18" />
        <path d="M7.5 8h3M7.5 12h3M7.5 16h3" />
      </>
    ),
  },
  { key: "grundstueck", label: "Grundstück", icon: <path d="M3 20h18M5 20V9l7-4 7 4v11M9 20v-4h2v4" /> },
  { key: "gewerbe", label: "Gewerbe", icon: <path d="M3 21V8l6-3v4l6-3v4l6-3v14M8 21v-4M16 21v-4" /> },
];

/**
 * Bauform-Icons, gleiche Bildsprache wie die Objektart-Kacheln. Der
 * ausgefüllte Punkt markiert, welches der gezeigten Häuser das eigene ist.
 */
const HAUSTYP_ICONS: Record<Haustyp, React.ReactNode> = {
  freistehend: (
    <>
      <path d="M7.5 11.5 12 7.5l4.5 4M9 11v8h6v-8M3 19h18" />
      <circle cx="12" cy="16" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  doppelhaushaelfte: (
    <>
      <path d="M4 11.5 8 8l4 3.5 4-3.5 4 3.5M5.5 11v8h13v-8M12 11v8M3 19h18" />
      <circle cx="8.75" cy="16" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  reihenendhaus: (
    <>
      <path d="M2.5 12 5 9.5 7.5 12 10 9.5 12.5 12 15 9.5 17.5 12M4 11.5V19h13v-7.5M8.5 11.5V19M13 11.5V19M2 19h18" />
      <circle cx="6.25" cy="16" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  reihenmittelhaus: (
    <>
      <path d="M2.5 12 5 9.5 7.5 12 10 9.5 12.5 12 15 9.5 17.5 12M4 11.5V19h13v-7.5M8.5 11.5V19M13 11.5V19M2 19h18" />
      <circle cx="10.75" cy="16" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  bungalow: (
    <>
      <path d="M3.5 13.5 12 9.5l8.5 4M5.5 13V19h13v-6M3 19h18" />
      <circle cx="12" cy="16.5" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Ausstattungsliste je Objektart — jede Objektart hat andere wertrelevante Merkmale. */
function ausstattungListe(objektart: Objektart): string[] {
  if (objektart === "gewerbe") return AUSSTATTUNG_GEWERBE;
  if (objektart === "haus") return AUSSTATTUNG_HAUS;
  if (objektart === "mehrfamilienhaus") return AUSSTATTUNG_MFH;
  return AUSSTATTUNG_WOHNUNG;
}

function borisPriceRelevant(objektart: Objektart): boolean {
  return objektart === "grundstueck" || objektart === "haus" || objektart === "gewerbe";
}

/**
 * Zusatz-Kontext für die SOURCES-Zeilen: amtlicher BORIS-Ladezustand,
 * passender Marktort (falls die Stadt in lib/bewertung/marktdaten getroffen
 * wird) und ob die Berechnung mangels Orts-Treffer auf den bundesweiten
 * Fallback ausgewichen ist (Ehrlichkeitsgebot, s. Dateikopf).
 */
interface SourceCtx {
  boris: BorisState;
  markt?: MarktOrt;
  bundesweit: boolean;
}

const SOURCES: { label: string; sub: string; value: (r: ValuationResult, f: FormState, ctx: SourceCtx) => React.ReactNode }[] = [
  { label: "Adresse & Mikrolage", sub: "Geokoordinaten werden lokalisiert", value: (_r, f) => f.address?.city || "bestätigt" },
  {
    label: "Amtliche Bodenrichtwerte (BORIS)",
    sub: "Zonenwerte werden abgeglichen",
    value: (r, f, ctx) => {
      const b = ctx.boris.data;
      if (!b) return `${r.bodenrichtwert} €/m²`;
      return (
        <span className="inline-flex items-center gap-1.5">
          <span key={`${b.brw}-${b.zone}`} className="tnum">
            {`${b.brw} €/m²${b.zone ? ` · Zone ${b.zone}` : ""}`}
          </span>
          <span className="whitespace-nowrap rounded-full border border-line-medium bg-akzent-wash px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-cream">
            {borisPriceRelevant(f.objektart) ? "amtlich" : "amtlich · informativ"}
          </span>
        </span>
      );
    },
  },
  {
    label: "Vergleichspreise (Marktdaten)",
    sub: "Regionale Preisspannen werden abgeglichen",
    value: (r, f, ctx) => {
      if (f.objektart === "mehrfamilienhaus") {
        return r.vervielfaeltiger != null ? `${nfDE.format(r.vervielfaeltiger)}× Jahresmiete` : "Ertragswert-Ansatz";
      }
      const m = ctx.markt;
      if (!m) return "bundesweite Vergleichstabellen";
      const spanne = f.objektart === "haus" ? m.haus : m.wohnung;
      return `${nfDE.format(spanne.min)}–${nfDE.format(spanne.max)} €/m²`;
    },
  },
  {
    label: "Aktuelle Angebotspreise",
    sub: "Regionale Preisobergrenzen",
    value: (_r, f, ctx) => {
      const m = ctx.markt;
      if (!m || f.objektart === "grundstueck" || f.objektart === "gewerbe") return "einbezogen";
      const spanne = f.objektart === "haus" ? m.haus : m.wohnung;
      return `bis ${nfDE.format(spanne.max)} €/m²`;
    },
  },
  {
    label: "Marktpreis-Index (12 Monate)",
    sub: "Preistrend wird berechnet",
    value: (r, _f, ctx) => `+${nfDE.format(ctx.markt ? ctx.markt.trendYoyPct : r.trendPct)} % p.a.`,
  },
  {
    label: "Lage- & Infrastruktur-Score",
    sub: "Schulen, ÖPNV, Versorgung",
    value: (r, _f, ctx) => `${nfDE.format(ctx.markt ? ctx.markt.nachfrage : r.mikrolage)}/10`,
  },
  {
    label: "Demografie & Nachfrage",
    sub: "Nachfrageindex der Region",
    value: (_r, _f, ctx) => (ctx.markt ? nachfrageLabel(ctx.markt.nachfrage) : "moderate Nachfrage"),
  },
  { label: "Zins- & Renditeumfeld", sub: "Finanzierungskonditionen", value: (r) => `${nfDE.format(r.rentYieldPct)} % Rendite` },
  { label: "Objekt-Faktoren", sub: "Baujahr, Zustand, Qualität", value: (_r, f) => f.qualitaet },
  {
    label: "Regionale Vergleichsdatenbank",
    sub: "Marktdaten werden abgeglichen",
    value: (r, _f, ctx) =>
      ctx.bundesweit ? "bundesweite Vergleichstabellen" : r.comparables > 0 ? `${r.comparables} Vergleichsobjekte` : "regional abgeglichen",
  },
];

/**
 * Kennzahlen-Kacheln im Ergebnis. pricePerSqm ist bei Mehrfamilienhäusern
 * optional (Ertragswert hat keinen zwingenden €/m²-Bezug), daher „–" statt
 * „NaN €". Der Vervielfältiger erscheint nur, wenn estimateValue ihn liefert.
 */
function statTiles(result: ValuationResult): { k: string; v: string; icon: IconName }[] {
  const tiles: { k: string; v: string; icon: IconName }[] = [
    { k: "Preis / m²", v: result.pricePerSqm != null ? formatEUR(result.pricePerSqm) : "–", icon: "euro" },
    { k: "Vergleichsobjekte", v: result.comparables > 0 ? `${result.comparables}` : "–", icon: "layers" },
    { k: "Markttrend", v: `+${nfDE.format(result.trendPct)} %`, icon: "trend" },
    { k: "Mikrolage", v: `${nfDE.format(result.mikrolage)}/10`, icon: "compass" },
    { k: "Konfidenz", v: `${result.confidence} %`, icon: "shield" },
  ];
  if (result.vervielfaeltiger != null) {
    tiles.push({ k: "Ertragsfaktor", v: `${nfDE.format(result.vervielfaeltiger)}×`, icon: "calculator" });
  }
  return tiles;
}

function useCountUp(target: number, run: boolean, dur = 1900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Sofort-Endwert bei reduced-motion, einmalig
      setVal(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, dur]);
  return val;
}

/**
 * „487.000 €" in Ziffern und Währung trennen — das € wird kleiner gesetzt als
 * die Zahl, weil es die Einheit ist, nicht die Aussage. Intl setzt ein
 * geschütztes Leerzeichen (U+00A0) davor, danach wird gesucht.
 */
function betragTeile(s: string): [string, string] {
  const i = s.lastIndexOf(" ");
  return i === -1 ? [s, ""] : [s.slice(0, i), s.slice(i + 1)];
}

/** wichtig = Hauptfeld: kräftigere Kontur + hellere Beschriftung — optionale
 *  Felder behalten die dezentere Optik. */
function Field({ label, children, wichtig }: { label: string; children: React.ReactNode; wichtig?: boolean }) {
  return (
    <label className="block space-y-2">
      <span className={`text-[13px] ${wichtig ? "font-medium text-ink-cream" : "text-ink-muted"}`}>{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-akzent-wash";
/** Hauptfeld-Variante: sichtbarere Kontur (s. Field.wichtig). */
const inputClsWichtig = inputCls.replace("border-line-medium", "border-ink-cream/30");

export function Calculator() {
  const [phase, setPhase] = useState<Phase>("form");
  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [errorNonce, setErrorNonce] = useState(0);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [revealed, setRevealed] = useState(0);
  const [boris, setBoris] = useState<BorisState>(BORIS_EMPTY);
  // Aufklapper „Präzisere Kalkulation gewünscht?" — nie mehr als 5–6 Felder
  // gleichzeitig sichtbar.
  const [mehrDetails, setMehrDetails] = useState(false);
  // Kein Orts-Treffer in lib/bewertung/marktdaten → Engine rechnet mit dem
  // bundesweiten Fallback; das Ergebnis weist das offen aus.
  const [bundesweit, setBundesweit] = useState(false);
  const borisAbort = useRef<AbortController | null>(null);
  const lastInputRef = useRef<ValuationInput | null>(null);
  const ortsStatsRef = useRef<OrtsStats | undefined>(undefined);
  // Adresse kam über den Ortszentrum-Fallback: muss sichtbar bleiben, damit
  // niemand glaubt, seine exakte Hausnummer sei erkannt worden.
  const [ortNaeherung, setOrtNaeherung] = useState(false);

  useEffect(
    () => () => {
      borisAbort.current?.abort();
    },
    [],
  );

  // Amtlicher BORIS-Wert trifft ggf. erst nach der Analyzing-Phase ein:
  // komplette Neuberechnung mit dem präziseren Anker. Die Engine ist
  // deterministisch — das Ergebnis „springt" nicht zufällig, nur die
  // Datenbasis wird genauer.
  useEffect(() => {
    if (!lastInputRef.current || !boris.data) return;
    setResult(
      estimateValue(lastInputRef.current, {
        bodenrichtwert: boris.data.brw,
        ortsStats: ortsStatsRef.current,
      }),
    );
  }, [boris.data]);

  // Demo-Modus: merkt sich, dass nach dem URL-Prefill genau EINMAL automatisch
  // die Analyse starten soll.
  const demoStart = useRef(false);

  useEffect(() => {
    const ansicht: Ansicht =
      phase === "analyzing"
        ? "analyse"
        : phase === "result"
          ? "ergebnis"
          : (["objektart", "standort", "eckdaten"] as const)[step] ?? "seite";
    setAnsicht(ansicht);
  }, [phase, step]);

  // Adresse aus der URL übernehmen (Quick-Einstieg von einer anderen Seite
  // aus, z. B. ?address=...&lat=...&lng=...). Danach — und nur wenn die URL
  // nichts vorgibt — den gespeicherten Formularstand wiederherstellen.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const demo = p.get("demo");
    if (demo && DEMO_PRESETS[demo]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- einmaliger URL-Prefill beim Mount
      setF((s) => ({ ...s, ...DEMO_PRESETS[demo] }));
      demoStart.current = true;
      return;
    }
    const lat = parseFloat(p.get("lat") || "");
    const lng = parseFloat(p.get("lng") || "");
    const label = p.get("address") || "";
    if (label && Number.isFinite(lat) && Number.isFinite(lng)) {
      const geo: GeoResult = {
        label,
        lat,
        lng,
        city: p.get("city") || ortAusLabel(label),
        postcode: p.get("plz") || "",
      };
      setF((s) => ({ ...s, address: geo, addressQuery: label }));
      return;
    }
    const query = p.get("query") || "";
    if (query) {
      setF((s) => ({ ...s, addressQuery: query }));
      return;
    }
    const snap = standLaden();
    if (!snap) return;
    setF(snap.f);
    setStep(snap.step);
    setOrtNaeherung(Boolean(snap.ortNaeherung));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- nur beim Mount
  }, []);

  // Gespiegelt wird debounced (~400 ms). Demo-Aufrufe bleiben außen vor.
  useEffect(() => {
    if (istDemo()) return;
    const t = setTimeout(() => {
      try {
        const snap: GespeicherterStand = { ts: Date.now(), step, f, ortNaeherung };
        sessionStorage.setItem(SPEICHER_KEY, JSON.stringify(snap));
      } catch {
        /* fail-soft */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [f, step, ortNaeherung]);

  // Adress-Autocomplete
  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [letzteSuche, setLetzteSuche] = useState("");
  const [fallbackBusy, setFallbackBusy] = useState(false);
  const [fallbackFehler, setFallbackFehler] = useState(false);

  // Fokus-Management: bei NUTZER-Schrittwechsel zur neuen Überschrift springen
  // (nicht beim Initial-Mount/URL-Prefill).
  const headingRef = useRef<HTMLHeadingElement>(null);
  const userNav = useRef(false);
  useEffect(() => {
    if (phase === "form" && userNav.current) {
      userNav.current = false;
      headingRef.current?.focus();
    }
  }, [step, phase]);

  // Wurzel-Container von Analyzing/Result — derselbe Ref, sie ersetzen sich
  // gegenseitig im selben Slot.
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  const toggleAusst = (a: string) =>
    setF((s) => ({
      ...s,
      ausstattung: s.ausstattung.includes(a) ? s.ausstattung.filter((x) => x !== a) : [...s.ausstattung, a],
    }));

  useEffect(() => {
    if (f.address && f.addressQuery === f.address.label) return; // bereits bestätigt
    const q = f.addressQuery;
    if (q.trim().length < 3) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Debounce-Reset bei zu kurzer Query
      setSuggestions([]);
      setActiveIdx(-1);
      setLetzteSuche("");
      return;
    }
    const ctrl = new AbortController();
    setSearching(true);
    const t = setTimeout(async () => {
      const res = await searchAddress(q, ctrl.signal);
      setSuggestions(res);
      setActiveIdx(-1);
      setSearching(false);
      setLetzteSuche(q.trim());
    }, 350);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [f.addressQuery, f.address]);

  /**
   * Sackgassen-Ausweg im Standort-Schritt: Nicht jede Hausnummer ist in
   * Photon (OSM) erfasst. Wir suchen gestaffelt nach dem ORT — dessen
   * Zentrum reicht für Satellitenbild und Bodenrichtwert-Näherung.
   */
  async function ortFallback() {
    const roh = f.addressQuery.trim();
    if (!roh || fallbackBusy) return;
    setFallbackBusy(true);
    setFallbackFehler(false);
    let treffer: GeoResult | null = null;
    try {
      for (const q of ortKandidaten(roh)) {
        const res = await searchAddress(q);
        const mitOrt = res.find((r) => r.city);
        if (mitOrt) {
          treffer = mitOrt;
          break;
        }
      }
    } catch {
      /* fail-soft */
    }
    setFallbackBusy(false);
    if (!treffer) {
      setFallbackFehler(true);
      return;
    }
    const gefunden = treffer;
    setF((s) => ({ ...s, address: gefunden, addressQuery: gefunden.label }));
    setOrtNaeherung(true);
    setSuggestions([]);
    setActiveIdx(-1);
    setError(null);
  }

  function validateStep(s: number): string | null {
    if (s === 0 && !f.objektart) return "Bitte eine Objektart wählen.";
    if (s === 1 && !f.address) return "Bitte eine Adresse aus den Vorschlägen wählen.";
    if (s === 2) {
      for (const z of ZAHLFELDER) {
        if (!z.sichtbar(f)) continue;
        const roh = String(f[z.key] ?? "");
        if (roh.trim() && parseDeZahl(roh) == null) return `${z.label}: bitte als Zahl angeben, z. B. ${z.beispiel}.`;
      }
      if (f.objektart === "grundstueck" && !f.grundflaeche) return "Bitte die Grundstücksfläche angeben.";
      if (f.objektart === "mehrfamilienhaus") {
        if (f.vermietungsstand === "leer") {
          const wfl = parseDeZahl(f.wohnflaeche);
          if (wfl == null || wfl < 10) return "Bitte die Wohnfläche angeben — daraus schätzen wir die marktübliche Miete.";
        } else {
          const miete = parseDeZahl(f.jahresnettokaltmiete);
          if (miete == null || miete < 100) return "Bitte eine gültige Jahresnettokaltmiete angeben (mind. 100 €).";
        }
        if (f.vermietungsstand === "teilweise") {
          const wfl = parseDeZahl(f.wohnflaeche);
          if (wfl == null || wfl < 10) return "Bitte die Wohnfläche angeben — daraus schätzen wir die Miete der leerstehenden Flächen.";
          const leer = parseDeZahl(f.leerstehendeWohnflaeche);
          if (leer == null || leer <= 0) return "Bitte die leerstehende Wohnfläche angeben (z. B. 120).";
          if (leer >= wfl) return 'Die leerstehende Fläche muss kleiner als die Gesamtwohnfläche sein — sonst bitte „Leer stehend" wählen.';
        }
      }
      if (f.objektart !== "grundstueck" && f.objektart !== "mehrfamilienhaus" && !f.wohnflaeche) return "Bitte die Wohnfläche angeben.";
      const flaechenName = f.objektart === "gewerbe" ? "Nutzflächen" : "Wohnflächen";
      const wfl = parseDeZahl(f.wohnflaeche);
      if (f.wohnflaeche && wfl == null) return "Bitte die Wohnfläche als Zahl angeben (z. B. 120 oder 92,5).";
      const gfl = parseDeZahl(f.grundflaeche);
      if (f.grundflaeche && gfl == null) return "Bitte die Grundstücksfläche als Zahl angeben (z. B. 450).";
      if (wfl != null && wfl < 10) return `Bitte prüfen: ${flaechenName} unter 10 m² können wir nicht bewerten.`;
      if (gfl != null && gfl < 20) return "Bitte prüfen: Grundstücksflächen unter 20 m² können wir nicht bewerten.";
      if (f.objektart === "gewerbe") {
        const nutz = parseDeZahl(f.wohnflaeche) ?? 0;
        const teile = (parseDeZahl(f.hallenflaeche) ?? 0) + (parseDeZahl(f.mischWohnflaeche) ?? 0);
        if (nutz > 0 && teile > nutz) return "Hallen- und Wohnfläche zusammen dürfen die Gesamtnutzfläche nicht übersteigen.";
      }
    }
    return null;
  }

  function next() {
    const err = validateStep(step);
    if (err) {
      setError(err);
      setErrorNonce((n) => n + 1);
      return;
    }
    setError(null);
    track("rechner_start");
    if (step < 2) {
      userNav.current = true;
      track("rechner_step", { step: step + 1 });
      setStep(step + 1);
    } else {
      track("rechner_step", { step: 3 });
      startAnalysis();
    }
  }

  function startAnalysis() {
    const input: ValuationInput = {
      objektart: f.objektart,
      ort: f.address?.city || "",
      plz: f.address?.postcode,
      addressLabel: f.address?.label,
      lat: f.address?.lat,
      lng: f.address?.lng,
      wohnflaeche: parseDeZahl(f.wohnflaeche),
      grundflaeche: parseDeZahl(f.grundflaeche),
      zimmer: parseDeZahl(f.zimmer),
      badezimmer: parseDeZahl(f.badezimmer),
      baujahr: parseDeZahl(f.baujahr),
      zustand: f.zustand,
      qualitaet: f.qualitaet,
      energieklasse: f.objektart === "gewerbe" ? undefined : f.energieklasse || undefined,
      energieausweis: f.objektart !== "gewerbe" && f.energieklasse && f.energieausweis ? f.energieausweis : undefined,
      haustyp: f.objektart === "haus" ? f.haustyp : undefined,
      zweifamilienhaus: f.objektart === "haus" ? f.zweifamilienhaus : undefined,
      ausstattung: f.ausstattung,
      jahresnettokaltmiete:
        f.objektart === "mehrfamilienhaus" && f.vermietungsstand === "leer" ? undefined : parseDeZahl(f.jahresnettokaltmiete),
      wohneinheiten: parseDeZahl(f.wohneinheiten),
      gewerbeeinheiten: parseDeZahl(f.gewerbeeinheiten),
      vermietungsstand: f.objektart === "mehrfamilienhaus" ? f.vermietungsstand : undefined,
      leerstehendeWohnflaeche:
        f.objektart === "mehrfamilienhaus" && f.vermietungsstand === "teilweise" ? parseDeZahl(f.leerstehendeWohnflaeche) : undefined,
      hallenflaeche: f.objektart === "gewerbe" ? parseDeZahl(f.hallenflaeche) : undefined,
      mischWohnflaeche: f.objektart === "gewerbe" ? parseDeZahl(f.mischWohnflaeche) : undefined,
      hausgeldMonat: f.objektart === "wohnung" ? parseDeZahl(f.hausgeld) : undefined,
      kernsaniert: f.objektart === "wohnung" || f.objektart === "haus" ? f.kernsaniert : undefined,
    };
    lastInputRef.current = input;

    // Kein Orts-Treffer in lib/bewertung/marktdaten → bundesweiter Fallback,
    // und das Ergebnis weist das ehrlich aus statt eine Orts-Statistik
    // vorzutäuschen (s. Dateikopf).
    const markt = marktortByOrt(input.ort, input.lat, input.lng);
    const istBundesweit = !markt;
    const ortsStats: OrtsStats | undefined = istBundesweit ? ortsStatsFallback(f.stadtgroesse, input.objektart) : undefined;
    ortsStatsRef.current = ortsStats;
    setBundesweit(istBundesweit);

    setResult(estimateValue(input, { ortsStats }));
    setRevealed(0);
    track("rechner_analyse");
    setPhase("analyzing");

    // Amtlichen Bodenrichtwert parallel zur Analyse-Animation laden — nur
    // mit Koordinaten möglich, sonst bleibt es beim Modellwert.
    borisAbort.current?.abort();
    if (input.lat != null && input.lng != null) {
      const ctrl = new AbortController();
      borisAbort.current = ctrl;
      setBoris({ loading: true, data: null, attribution: null });
      fetch(`/api/bodenrichtwert?lat=${input.lat}&lng=${input.lng}&objektart=${input.objektart}`, { signal: ctrl.signal })
        .then((res) => res.json())
        .then((json: { ok?: boolean; data?: Bodenrichtwert | null; attribution?: string }) => {
          setBoris({ loading: false, data: json?.data ?? null, attribution: json?.attribution ?? null });
        })
        .catch(() => {
          if (!ctrl.signal.aborted) setBoris({ loading: false, data: null, attribution: null });
        });
    } else {
      setBoris(BORIS_EMPTY);
    }
  }

  // Demo-Autostart: sobald der Preset-State committed ist, genau einmal die
  // Analyse starten.
  useEffect(() => {
    if (demoStart.current && f.address) {
      demoStart.current = false;
      startAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- startAnalysis ist bewusst kein Dep
  }, [f.address]);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepMs = reduce ? 90 : 520;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const tick = () => {
      i += 1;
      setRevealed(i);
      if (i < SOURCES.length) timers.push(setTimeout(tick, stepMs));
      else
        timers.push(
          setTimeout(
            () => {
              track("rechner_ergebnis");
              setPhase("result");
            },
            reduce ? 200 : 900,
          ),
        );
    };
    timers.push(setTimeout(tick, reduce ? 80 : 400));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  function reset() {
    borisAbort.current?.abort();
    lastInputRef.current = null;
    ortsStatsRef.current = undefined;
    setBoris(BORIS_EMPTY);
    setBundesweit(false);
    setF(EMPTY);
    setStep(0);
    setResult(null);
    setError(null);
    setSuggestions([]);
    setOrtNaeherung(false);
    setFallbackFehler(false);
    setLetzteSuche("");
    setPhase("form");
    standLoeschen();
  }

  /** „Angaben anpassen" aus dem Ergebnis: zurück zu den Eckdaten, OHNE Reset. */
  function angabenAnpassen() {
    userNav.current = true;
    setError(null);
    setPhase("form");
    setStep(2);
  }

  if (phase === "analyzing")
    return <Analyzing f={f} result={result} revealed={revealed} boris={boris} bundesweit={bundesweit} sectionRef={resultRef} />;
  if (phase === "result" && result && result.mid > 0)
    return (
      <ErgebnisSchleuse tool="verkaufspreis" eingaben={f} ergebnis={result}>
        <Result
          f={f}
          result={result}
          onReset={reset}
          onAnpassen={angabenAnpassen}
          onGesendet={standLoeschen}
          boris={boris}
          bundesweit={bundesweit}
          sectionRef={resultRef}
        />
      </ErgebnisSchleuse>
    );

  const currentNode = step + 1; // Knoten 0 „Rechner aufrufen" ist mit dem Öffnen erledigt
  const pct = PROGRESS_PCT[step] ?? PROGRESS_PCT[0];

  return (
    <div className="mx-auto max-w-3xl" data-track-bereich="formular" onClickCapture={trackKlick}>
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs">
          <span className="uppercase tracking-[0.2em] text-ink-dim">Schritt {currentNode + 1} von 4</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-medium bg-akzent-wash px-2.5 py-1 font-medium text-ink-cream">
            <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12 4 4 10-10" />
            </svg>
            <span key={pct} className="tnum">
              {pct}%
            </span>{" "}
            erledigt
          </span>
        </div>
        <ol role="list" aria-label="Fortschritt der Bewertung" className="flex items-center gap-2 sm:gap-3">
          {STEP_NODES.map((label, d) => {
            const done = d < currentNode;
            const current = d === currentNode;
            return (
              <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3" aria-current={current ? "step" : undefined}>
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${
                      done
                        ? "border-akzent bg-akzent text-ink-cream"
                        : current
                          ? "border-ink-cream text-ink-cream"
                          : "border-line-medium text-ink-dim"
                    }`}
                  >
                    {done ? (
                      <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 12 4 4 10-10" />
                      </svg>
                    ) : (
                      <span aria-hidden="true">{d + 1}</span>
                    )}
                    <span className="sr-only">
                      {`Schritt ${d + 1} von 4: ${label}${current ? " (aktuell)" : done ? " (abgeschlossen)" : ""}`}
                    </span>
                  </div>
                  <span className={`hidden truncate text-xs sm:inline ${current ? "font-medium text-ink-cream" : done ? "text-ink-muted" : "text-ink-dim"}`}>
                    {label}
                  </span>
                </div>
                {d < STEP_NODES.length - 1 && (
                  <div aria-hidden="true" className={`h-px flex-1 ${d < currentNode ? "bg-akzent" : "bg-line-subtle"}`} />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-[24px] border border-line-subtle bg-white p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-6">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Was möchten Sie bewerten?
            </h2>
            {f.address && (
              <div className="flex items-center gap-2.5 rounded-[14px] border border-line-medium bg-akzent-wash px-3.5 py-2.5">
                <Icon name="pin" size={15} className="shrink-0 text-ink-cream" />
                <span className="min-w-0 flex-1 truncate text-sm text-ink-muted">{f.address.label}</span>
                <span className="shrink-0 text-xs uppercase tracking-widest text-ink-dim">{ortNaeherung ? "Ortszentrum" : "übernommen"}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {OBJEKTARTEN.map((o) => {
                const selected = f.objektart === o.key;
                return (
                  <button
                    key={o.key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      track("rechner_start");
                      setF((s) => (s.objektart === o.key ? s : { ...s, objektart: o.key, ausstattung: [] }));
                    }}
                    className={`group relative flex flex-col items-center justify-center gap-2.5 rounded-[16px] border p-4 text-center transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] active:scale-[0.98] ${
                      selected ? "border-ink-cream bg-akzent-wash" : "border-line-medium hover:border-transparent hover:bg-akzent-wash/60"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-[12px] border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${
                        selected ? "border-transparent bg-akzent text-ink-cream" : "border-line-medium bg-bg-elevated text-ink-muted group-hover:text-ink-cream"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                        {o.icon}
                      </svg>
                    </span>
                    <span
                      lang="de"
                      className={`text-[0.8rem] font-medium leading-tight tracking-tight ${selected ? "text-ink-cream" : "text-ink-muted group-hover:text-ink-cream"}`}
                    >
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Wo befindet sich die Immobilie?
            </h2>
            <div className="relative">
              <input
                className={inputCls}
                value={f.addressQuery}
                onChange={(e) => {
                  set("addressQuery", e.target.value);
                  if (f.address) set("address", null);
                  setOrtNaeherung(false);
                  setFallbackFehler(false);
                }}
                placeholder="Straße, Hausnummer, Ort eingeben…"
                autoComplete="off"
                aria-label="Adresse"
                role="combobox"
                aria-expanded={suggestions.length > 0 && !f.address}
                aria-controls="addr-listbox"
                aria-autocomplete="list"
                aria-activedescendant={activeIdx >= 0 ? `addr-opt-${activeIdx}` : undefined}
                onKeyDown={(e) => {
                  if (f.address || suggestions.length === 0) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIdx((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
                  } else if (e.key === "Enter" && activeIdx >= 0 && activeIdx < suggestions.length) {
                    e.preventDefault();
                    const s = suggestions[activeIdx];
                    set("address", s);
                    set("addressQuery", s.label);
                    setOrtNaeherung(false);
                    setSuggestions([]);
                    setActiveIdx(-1);
                  } else if (e.key === "Enter" && activeIdx < 0) {
                    e.preventDefault();
                    const s = suggestions[0];
                    set("address", s);
                    set("addressQuery", s.label);
                    setOrtNaeherung(false);
                    setSuggestions([]);
                    setActiveIdx(-1);
                  } else if (e.key === "Escape") {
                    setSuggestions([]);
                    setActiveIdx(-1);
                  }
                }}
              />
              {searching && (
                <div role="status" aria-live="polite" className="absolute right-3 top-3 text-xs text-ink-dim">
                  sucht…
                </div>
              )}
              {suggestions.length > 0 && !f.address && (
                <ul id="addr-listbox" role="listbox" aria-label="Adressvorschläge" className="absolute z-20 mt-2 w-full overflow-hidden rounded-[12px] border border-line-medium bg-white shadow-[0_18px_50px_-20px_rgba(20,20,18,0.35)]">
                  {suggestions.map((s, i) => (
                    <li key={`${s.lat},${s.lng}`} id={`addr-opt-${i}`} role="option" aria-selected={i === activeIdx}>
                      <button
                        type="button"
                        tabIndex={-1}
                        onMouseEnter={() => setActiveIdx(i)}
                        onClick={() => {
                          set("address", s);
                          set("addressQuery", s.label);
                          setOrtNaeherung(false);
                          setSuggestions([]);
                          setActiveIdx(-1);
                        }}
                        className={`block w-full px-4 py-3 text-left text-sm transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] ${
                          i === activeIdx ? "bg-akzent-wash text-ink-cream" : "text-ink-muted hover:bg-akzent-wash hover:text-ink-cream"
                        }`}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {!f.address && !searching && suggestions.length === 0 && f.addressQuery.trim().length >= 3 && letzteSuche === f.addressQuery.trim() && (
              <div className="rounded-[14px] border border-line-medium bg-bg-elevated px-4 py-3.5 text-sm">
                {fallbackFehler ? (
                  <p className="text-ink-muted">
                    Bitte Schreibweise prüfen — oder schreiben Sie uns direkt:{" "}
                    <a href="mailto:ap@beuwy.com" className="btn-link">
                      ap@beuwy.com
                    </a>
                  </p>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="min-w-0 text-ink-muted">Adresse nicht dabei? Kein Problem — wir rechnen mit dem Ortszentrum.</p>
                    <button
                      type="button"
                      onClick={ortFallback}
                      disabled={fallbackBusy}
                      className="shrink-0 rounded-full border border-ink-cream/40 px-4 py-2 text-xs font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-wash disabled:opacity-60"
                    >
                      {fallbackBusy ? "sucht Ort …" : "Mit Ort/PLZ fortfahren"}
                    </button>
                  </div>
                )}
              </div>
            )}
            {f.address && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-ink-cream">
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-akzent text-ink-cream" aria-hidden>
                    <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  Adresse bestätigt
                  {ortNaeherung && (
                    <span className="whitespace-nowrap rounded-full border border-line-medium bg-akzent-wash px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-cream">
                      Ortszentrum als Näherung
                    </span>
                  )}
                </div>
                <div className="relative h-52 overflow-hidden rounded-[14px] border border-line-medium">
                  <MapConsentGate>
                    <LocationMap lat={f.address.lat} lng={f.address.lng} />
                  </MapConsentGate>
                </div>
                <div className="space-y-2">
                  <span className="text-[13px] text-ink-muted">Wie groß ist der Ort ungefähr?</span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Stadtgröße">
                    {STADTGROESSEN.map((sg) => {
                      const aktiv = f.stadtgroesse === sg;
                      return (
                        <button
                          key={sg}
                          type="button"
                          aria-pressed={aktiv}
                          onClick={() => set("stadtgroesse", sg)}
                          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] ${
                            aktiv ? "border-ink-cream bg-akzent-wash text-ink-cream" : "border-line-medium text-ink-muted hover:text-ink-cream"
                          }`}
                        >
                          {STADTGROESSE_LABEL[sg]}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-ink-dim">
                    Fließt nur ein, wenn wir keine regionalen Vergleichsdaten für {f.address.city || "diesen Ort"} finden — s. Ergebnis.
                  </p>
                </div>
              </div>
            )}
            <p className="text-xs text-ink-dim">Adressdaten via OpenStreetMap. Die genaue Lage fließt in die Mikrolage-Bewertung ein.</p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Eckdaten der Immobilie
            </h2>

            {f.objektart === "haus" && (
              <div className="space-y-3">
                <span className="text-[13px] text-ink-muted">Bauform</span>
                <div role="radiogroup" aria-label="Bauform des Hauses" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {HAUSTYPEN.map((h) => {
                    const gewaehlt = f.haustyp === h.key;
                    return (
                      <button
                        key={h.key}
                        type="button"
                        role="radio"
                        aria-checked={gewaehlt}
                        onClick={() => set("haustyp", h.key)}
                        title={h.label}
                        className={`group relative flex flex-col items-center justify-center gap-2 rounded-[14px] border p-3 text-center transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] active:scale-[0.98] ${
                          gewaehlt ? "border-ink-cream bg-akzent-wash" : "border-line-medium hover:border-transparent hover:bg-akzent-wash/60"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width={34}
                          height={34}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className={`transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${gewaehlt ? "text-ink-cream" : "text-ink-muted group-hover:text-ink-cream"}`}
                        >
                          {HAUSTYP_ICONS[h.key]}
                        </svg>
                        <span className={`text-[0.72rem] font-medium leading-tight tracking-tight ${gewaehlt ? "text-ink-cream" : "text-ink-muted group-hover:text-ink-cream"}`}>
                          {h.kurz}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <label className="flex w-full cursor-pointer items-start gap-3 rounded-[14px] border border-line-medium p-3.5 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-akzent-wash/60">
                  <input
                    type="checkbox"
                    checked={f.zweifamilienhaus}
                    onChange={(e) => set("zweifamilienhaus", e.target.checked)}
                    style={{ accentColor: "var(--akzent)" }}
                    className="mt-0.5 h-4 w-4 shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink-cream">Zweifamilienhaus</span>
                    <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                      Zwei abgeschlossene Wohneinheiten, etwa mit Einliegerwohnung oder getrennter Obergeschosswohnung.
                    </span>
                  </span>
                </label>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {f.objektart !== "grundstueck" && (
                <Field wichtig label={f.objektart === "gewerbe" ? "Nutzfläche gesamt (m²)" : "Wohnfläche (m²)"}>
                  <input
                    className={inputClsWichtig}
                    inputMode="decimal"
                    value={f.wohnflaeche}
                    onChange={(e) => set("wohnflaeche", e.target.value)}
                    placeholder={f.objektart === "gewerbe" ? "z. B. 900" : "z. B. 120"}
                  />
                </Field>
              )}
              {(f.objektart === "haus" || f.objektart === "gewerbe" || f.objektart === "grundstueck" || f.objektart === "mehrfamilienhaus") && (
                <Field wichtig label="Grundstücksfläche (m²)">
                  <input className={inputClsWichtig} inputMode="decimal" value={f.grundflaeche} onChange={(e) => set("grundflaeche", e.target.value)} placeholder="z. B. 450" />
                </Field>
              )}
              {f.objektart === "mehrfamilienhaus" && (
                <>
                  <Field wichtig label="Vermietungsstand">
                    <select className={inputClsWichtig} value={f.vermietungsstand} onChange={(e) => set("vermietungsstand", e.target.value as Vermietungsstand)}>
                      <option value="vermietet">Vollständig vermietet</option>
                      <option value="teilweise">Teilweise vermietet</option>
                      <option value="leer">Leer stehend / keine Mieteinnahmen</option>
                    </select>
                  </Field>
                  {f.vermietungsstand !== "leer" && (
                    <Field wichtig label={f.vermietungsstand === "teilweise" ? "Aktuelle Jahresnettokaltmiete (€/Jahr)" : "Jahresnettokaltmiete (€/Jahr)"}>
                      <input className={inputClsWichtig} inputMode="decimal" value={f.jahresnettokaltmiete} onChange={(e) => set("jahresnettokaltmiete", e.target.value)} placeholder="z. B. 48000" />
                    </Field>
                  )}
                  {f.vermietungsstand === "teilweise" && (
                    <Field wichtig label="Davon leerstehende Wohnfläche (m²)">
                      <input className={inputClsWichtig} inputMode="decimal" value={f.leerstehendeWohnflaeche} onChange={(e) => set("leerstehendeWohnflaeche", e.target.value)} placeholder="z. B. 120" />
                    </Field>
                  )}
                  <Field wichtig label="Wohneinheiten">
                    <input className={inputClsWichtig} inputMode="numeric" value={f.wohneinheiten} onChange={(e) => set("wohneinheiten", e.target.value)} placeholder="z. B. 6" />
                  </Field>
                </>
              )}
              {f.objektart === "gewerbe" && (
                <>
                  <Field wichtig label="Davon Hallen-/Lagerfläche (m²)">
                    <input className={inputClsWichtig} inputMode="decimal" value={f.hallenflaeche} onChange={(e) => set("hallenflaeche", e.target.value)} placeholder="z. B. 400" />
                  </Field>
                  <Field wichtig label="Davon Wohnfläche (m²) — falls Wohnungen im Objekt">
                    <input className={inputClsWichtig} inputMode="decimal" value={f.mischWohnflaeche} onChange={(e) => set("mischWohnflaeche", e.target.value)} placeholder="z. B. 160" />
                  </Field>
                </>
              )}
              {(f.objektart === "wohnung" || f.objektart === "haus") && (
                <Field wichtig label="Zimmer">
                  <input className={inputClsWichtig} inputMode="decimal" value={f.zimmer} onChange={(e) => set("zimmer", e.target.value)} placeholder="z. B. 4" />
                </Field>
              )}
              {f.objektart !== "grundstueck" && (
                <>
                  <Field wichtig label="Baujahr">
                    <input className={inputClsWichtig} inputMode="numeric" value={f.baujahr} onChange={(e) => set("baujahr", e.target.value)} placeholder="z. B. 1998" />
                  </Field>
                  <Field wichtig label="Zustand">
                    <select className={inputClsWichtig} value={f.zustand} onChange={(e) => set("zustand", e.target.value as Zustand)}>
                      <option value="neuwertig">Neuwertig / saniert</option>
                      <option value="gepflegt">Gepflegt</option>
                      <option value="renovierungsbeduerftig">Renovierungsbedürftig</option>
                    </select>
                  </Field>
                </>
              )}
            </div>

            {(f.objektart === "wohnung" || f.objektart === "haus") && f.zustand === "neuwertig" && (
              <label className="flex w-full cursor-pointer items-start gap-3 rounded-[14px] border border-line-medium p-3.5 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-akzent-wash/60">
                <input
                  type="checkbox"
                  checked={f.kernsaniert}
                  onChange={(e) => set("kernsaniert", e.target.checked)}
                  style={{ accentColor: "var(--akzent)" }}
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink-cream">Kernsaniert</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                    Elektrik, Leitungen, Fenster und Heizung wurden grundlegend erneuert — nicht nur Böden, Bäder oder Malerarbeiten.
                  </span>
                </span>
              </label>
            )}

            {f.objektart !== "grundstueck" && (
              <div className="space-y-3">
                <span className="text-[13px] text-ink-muted">Ausstattung</span>
                <div className="flex flex-wrap gap-2">
                  {ausstattungListe(f.objektart).map((a) => (
                    <button
                      key={a}
                      type="button"
                      aria-pressed={f.ausstattung.includes(a)}
                      onClick={() => toggleAusst(a)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] ${
                        f.ausstattung.includes(a) ? "border-ink-cream bg-akzent-wash text-ink-cream" : "border-line-medium text-ink-muted hover:text-ink-cream"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {f.objektart !== "grundstueck" && (
              <div data-track-bereich="praezisere-kalkulation">
                <button
                  type="button"
                  aria-expanded={mehrDetails}
                  onClick={() => setMehrDetails((v) => !v)}
                  className="flex w-full items-center justify-between rounded-[14px] border border-line-medium px-4 py-3.5 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-wash/60"
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium text-ink-cream">
                    <Icon name="sparkle" size={16} className="text-ink-cream" />
                    Präzisere Kalkulation gewünscht?
                    <span className="hidden text-xs font-normal text-ink-dim sm:inline">optional — verfeinert das Ergebnis</span>
                  </span>
                  <Icon name="chevronDown" size={16} className={`shrink-0 text-ink-muted transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${mehrDetails ? "rotate-180" : ""}`} />
                </button>
                <div className="grid transition-[grid-template-rows] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]" style={{ gridTemplateRows: mehrDetails ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="grid gap-4 pt-4 sm:grid-cols-2">
                      {f.objektart === "mehrfamilienhaus" && (
                        <>
                          <Field label="Gewerbeeinheiten">
                            <input className={inputCls} inputMode="numeric" value={f.gewerbeeinheiten} onChange={(e) => set("gewerbeeinheiten", e.target.value)} placeholder="z. B. 1" />
                          </Field>
                          <Field label="Zimmer gesamt">
                            <input className={inputCls} inputMode="decimal" value={f.zimmer} onChange={(e) => set("zimmer", e.target.value)} placeholder="z. B. 12" />
                          </Field>
                        </>
                      )}
                      {f.objektart !== "gewerbe" && (
                        <Field label="Badezimmer">
                          <input className={inputCls} inputMode="decimal" value={f.badezimmer} onChange={(e) => set("badezimmer", e.target.value)} placeholder="z. B. 2" />
                        </Field>
                      )}
                      <Field label="Ausstattungsqualität">
                        <select className={inputCls} value={f.qualitaet} onChange={(e) => set("qualitaet", e.target.value as Qualitaet)}>
                          {QUALITAETEN.map((q) => (
                            <option key={q.key} value={q.key}>
                              {q.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      {f.objektart === "wohnung" && (
                        <Field label="Hausgeld pro Monat (€)">
                          <input className={inputCls} inputMode="decimal" value={f.hausgeld} onChange={(e) => set("hausgeld", e.target.value)} placeholder="z. B. 320" />
                        </Field>
                      )}
                      {f.objektart !== "gewerbe" && (
                        <div className="sm:col-span-2">
                          <Field label="Energieeffizienzklasse">
                            <EnergieStrahlWahl klein wert={f.energieklasse} onChange={(k) => set("energieklasse", k)} ausweis={f.energieausweis} onAusweis={(a) => set("energieausweis", a)} />
                          </Field>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {f.objektart === "mehrfamilienhaus" && (
              <p className="text-xs text-ink-dim">
                {f.vermietungsstand === "vermietet"
                  ? "Ertragswert-Ansatz: Wir schätzen aus Ihrer Jahresnettokaltmiete und einem regionalen Vervielfältiger — eine grobe Heuristik, kein Ertragswertgutachten."
                  : f.vermietungsstand === "teilweise"
                    ? "Ertragswert-Ansatz: Für die leerstehende Fläche setzen wir eine marktübliche Miete Ihrer Region an und ziehen anteilig einen Abschlag für das Vermietungsrisiko ab. Grobe Heuristik, kein Ertragswertgutachten."
                    : "Kein Problem ohne Mieteinnahmen: Wir setzen für die gesamte Wohnfläche eine marktübliche Miete Ihrer Region an und ziehen einen Abschlag für den Leerstand ab. Grobe Heuristik, kein Ertragswertgutachten."}
              </p>
            )}
          </div>
        )}

        <div className="mt-5">
          <p className={`text-sm text-[#b3402a] transition-opacity duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] ${error ? "opacity-100" : "opacity-0"}`} role="alert">
            {error ?? " "}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => {
                setError(null);
                userNav.current = true;
                setStep(step - 1);
              }}
              className="text-sm text-ink-muted transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
            >
              Zurück
            </button>
          ) : (
            <span />
          )}
          <button
            key={errorNonce}
            type="button"
            onClick={next}
            className="rounded-full bg-akzent px-6 py-3 text-sm font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
          >
            {step < 2 ? "Weiter" : "Bewertung berechnen"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Analyzing({
  f,
  result,
  revealed,
  boris,
  bundesweit,
  sectionRef,
}: {
  f: FormState;
  result: ValuationResult | null;
  revealed: number;
  boris: BorisState;
  bundesweit: boolean;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pct = Math.round((revealed / SOURCES.length) * 100);
  const markt = useMemo(() => marktortByOrt(f.address?.city ?? "", f.address?.lat, f.address?.lng), [f.address?.city, f.address?.lat, f.address?.lng]);
  const ctx: SourceCtx = { boris, markt, bundesweit };
  return (
    <div ref={sectionRef} className="overflow-hidden rounded-[24px] border border-line-subtle bg-white" role="status" aria-live="polite" aria-busy={pct < 100}>
      <span className="sr-only">Bewertung wird berechnet, {pct} Prozent.</span>
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="text-center">
          <div className="font-display text-sm uppercase tracking-[0.25em] text-ink-cream">Analyse läuft</div>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-cream">
            {f.objektart === "grundstueck" ? "Grundstück" : "Immobilie"} in {f.address?.city || "Ihrer Lage"}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">{f.address?.label}</p>
        </div>

        <div className="mt-8 space-y-2">
          {SOURCES.map((s, i) => {
            const done = i < revealed;
            const active = i === revealed;
            return (
              <div
                key={s.label}
                className={`flex items-center justify-between gap-4 rounded-[10px] border px-4 py-3 transition-all duration-[var(--duration-slow)] ease-[var(--ease-smooth-out)] ${
                  done ? "border-line-subtle bg-bg-elevated opacity-100" : active ? "border-line-medium bg-akzent-wash/50 opacity-100" : "border-transparent opacity-40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${done ? "bg-akzent text-ink-cream" : "border border-line-medium text-ink-muted"}`}>
                    {done ? "✓" : active ? "…" : ""}
                  </span>
                  <div>
                    <div className={`text-sm ${done ? "text-ink-cream" : "text-ink-muted"}`}>{s.label}</div>
                    {active && <div className="text-xs text-ink-dim">{s.sub} …</div>}
                  </div>
                </div>
                {done && result && <span className="text-sm text-ink-cream">{s.value(result, f, ctx)}</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
          <div className="h-full rounded-full bg-akzent transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-smooth-out)]" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 text-center text-xs text-ink-dim">
          {pct}% — {revealed}/{SOURCES.length} Datenquellen ausgewertet
        </div>
      </div>
    </div>
  );
}

function Result({
  f,
  result,
  onReset,
  onAnpassen,
  onGesendet,
  boris,
  bundesweit,
  sectionRef,
}: {
  f: FormState;
  result: ValuationResult;
  onReset: () => void;
  onAnpassen: () => void;
  onGesendet: () => void;
  boris: BorisState;
  bundesweit: boolean;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const mid = useCountUp(result.mid, true);
  const endBetrag = formatEUR(result.mid);
  const [zifferm, einheitm] = betragTeile(formatEUR(mid));
  const rangePos = result.high > result.low ? ((result.mid - result.low) / (result.high - result.low)) * 100 : 50;
  const b = boris.data;
  const tiles = statTiles(result);

  return (
    <div ref={sectionRef} className="overflow-hidden rounded-[24px] border border-line-subtle bg-white" data-track-bereich="ergebnis" onClickCapture={trackKlick}>
      {f.address && (
        <div className="relative h-64 w-full sm:h-80">
          <MapConsentGate>
            <LocationMap lat={f.address.lat} lng={f.address.lng} zoom={18} />
          </MapConsentGate>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-cream/85 via-ink-cream/40 to-transparent p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-white">Bewertete Immobilie</div>
            <div className="mt-1 text-lg font-semibold text-white">{f.address.label}</div>
          </div>
        </div>
      )}

      <div className="relative bg-white px-6 py-12">
        <div className="overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated px-6 py-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line-medium bg-white py-1.5 pl-1.5 pr-3.5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-akzent text-ink-cream">
                <Icon name="euro" size={14} />
              </span>
              <span className="whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.1em] text-ink-cream sm:text-[0.7rem] sm:tracking-[0.2em]">
                Geschätzter Marktwert
              </span>
            </div>

            <div className="mt-3">
              <button
                type="button"
                data-track-bereich="pdf-badge"
                onClick={() => {
                  track("report_form_geoeffnet", { quelle: "badge" });
                  window.dispatchEvent(new CustomEvent("beuwy:report-oeffnen"));
                }}
                className="inline-flex max-w-full items-center gap-2.5 rounded-full bg-akzent py-2.5 pl-3 pr-4 text-left transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 text-ink-cream">
                  <Icon name="printer" size={14} />
                </span>
                <span className="min-w-0 text-[0.62rem] font-bold uppercase tracking-[0.06em] text-ink-cream sm:text-[0.72rem]">
                  Detaillierte Infos &amp; PDF-Report anfordern
                </span>
                <Icon name="chevronDown" size={15} className="shrink-0 text-ink-cream" />
              </button>
            </div>

            <div className="-mx-3 mt-5 max-w-3xl rounded-[24px] border border-line-medium bg-white px-3 py-6 sm:mx-auto sm:px-8 sm:py-9">
              <div aria-hidden className="font-display leading-none tnum text-ink-cream" style={{ fontSize: "clamp(26px, 7vw, 60px)" }}>
                {zifferm}
                <span className="ml-1 align-top text-[0.42em] font-semibold">{einheitm}</span>
              </div>
              <span className="sr-only">Geschätzter Marktwert: {endBetrag}</span>
            </div>

            <div className="mt-4 text-sm text-ink-muted sm:text-base">
              Spanne {formatEUR(result.low)} – {formatEUR(result.high)}
            </div>
            <div className="relative mx-auto mt-6 h-2 max-w-md rounded-full bg-white">
              <div className="absolute inset-y-0 left-[8%] right-[8%] rounded-full bg-gradient-to-r from-akzent/30 via-akzent to-akzent/30" />
              <div className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-akzent shadow-[0_2px_6px_rgba(20,20,18,0.25)]" style={{ left: `${8 + rangePos * 0.84}%` }} />
            </div>
            {b && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-muted">
                <span key={`${b.brw}-${b.zone}`} className="tnum">
                  Bodenrichtwert {b.brw} €/m²{b.zone ? ` · Zone ${b.zone}` : ""}
                </span>
                <span className="whitespace-nowrap rounded-full border border-line-medium bg-akzent-wash px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-cream">
                  {`${borisPriceRelevant(f.objektart) ? "amtlich" : "informativ"} · ${BORIS_QUELLE_LABEL[b.quelle]}`}
                </span>
              </div>
            )}
            {bundesweit && (
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink-dim">Marktdaten-Basis: bundesweite Vergleichstabellen (kein Orts-Treffer für {f.address?.city || "diese Lage"}).</p>
            )}
            {result.grundstuecksAnrechnung && (result.grundstuecksAnrechnung.mehrflaecheM2 > 0 || result.grundstuecksAnrechnung.gartenlandM2 > 0) && (
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink-muted">
                Übergroßes Grundstück gestaffelt angerechnet: {nfDE.format(result.grundstuecksAnrechnung.baulandM2)} m² Bauland voll,{" "}
                {nfDE.format(result.grundstuecksAnrechnung.mehrflaecheM2)} m² Mehrfläche anteilig
                {result.grundstuecksAnrechnung.gartenlandM2 > 0 ? `, ${nfDE.format(result.grundstuecksAnrechnung.gartenlandM2)} m² als Gartenland` : ""}.
              </p>
            )}
            {result.flaechenAufteilung && (
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-ink-muted">
                Mischobjekt anteilig bewertet:{" "}
                {[
                  result.flaechenAufteilung.bueroM2 > 0 ? `${nfDE.format(result.flaechenAufteilung.bueroM2)} m² Büro/Praxis` : "",
                  result.flaechenAufteilung.halleM2 > 0 ? `${nfDE.format(result.flaechenAufteilung.halleM2)} m² Halle/Lager` : "",
                  result.flaechenAufteilung.wohnM2 > 0 ? `${nfDE.format(result.flaechenAufteilung.wohnM2)} m² Wohnen` : "",
                ]
                  .filter(Boolean)
                  .join(", ")}{" "}
                — jeweils zum marktüblichen Satz der Flächenart.
              </p>
            )}
            {f.objektart === "mehrfamilienhaus" && result.vervielfaeltiger != null && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-muted">
                <span key={result.vervielfaeltiger} className="tnum">
                  Ertragswert: {result.mietAnsatz && result.mietAnsatz.marktmieteGeschaetzt > 0 ? "angesetzte Jahresmiete" : "Jahresnettokaltmiete"} × {nfDE.format(result.vervielfaeltiger)}
                </span>
                <span className="whitespace-nowrap rounded-full border border-line-medium bg-akzent-wash px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-cream">
                  heuristische Schätzung
                </span>
              </div>
            )}
            {result.mietAnsatz && result.mietAnsatz.marktmieteGeschaetzt > 0 && (
              <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ink-dim">
                Für {nfDE.format(result.mietAnsatz.leerstandM2)} m² leerstehende Wohnfläche haben wir eine marktübliche Miete von{" "}
                {nfDE.format(result.mietAnsatz.marktmieteM2)} €/m² im Monat angesetzt ({formatEUR(result.mietAnsatz.marktmieteGeschaetzt)} im Jahr)
                {result.mietAnsatz.istMiete > 0 ? ` zusätzlich zu Ihrer aktuellen Miete von ${formatEUR(result.mietAnsatz.istMiete)}` : ""}. Für das
                Vermietungsrisiko haben wir {nfDE.format(result.mietAnsatz.abschlagPct)} % abgezogen.
              </p>
            )}
          </div>
        </div>

        <div className={`mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 ${tiles.length > 5 ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
          {tiles.map((s) => (
            <div key={s.k} className="rounded-[16px] border border-line-subtle bg-white p-4 text-center">
              <div className="mb-2 flex justify-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line-medium bg-akzent-wash text-ink-cream">
                  <Icon name={s.icon} size={18} />
                </span>
              </div>
              <div lang="de" className="min-w-0 text-[0.6rem] uppercase leading-tight text-ink-dim">
                {s.k}
              </div>
              <div className="mt-1 text-base font-semibold text-ink-cream tnum">{s.v}</div>
            </div>
          ))}
        </div>

        {result.factors.length > 0 && (
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="mb-3 text-sm text-ink-muted">Werttreiber</div>
            <div className="flex flex-wrap gap-2">
              {result.factors.map((fac) => (
                <span key={fac.label} className="rounded-full border border-line-medium bg-white px-3 py-1.5 text-sm text-ink-muted">
                  {fac.label} <span className={fac.effectPct >= 0 ? "text-ink-cream font-medium" : "text-ink-dim"}>{fac.effectPct >= 0 ? "+" : ""}{fac.effectPct} %</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <ReportRequest f={f} result={result} bundesweit={bundesweit} onReset={onReset} onAnpassen={onAnpassen} onGesendet={onGesendet} borisLoading={boris.loading} />

        <p className="mt-6 text-center text-xs text-ink-dim">
          Unverbindliche, datenbasierte Schätzung — kein Verkehrswertgutachten i. S. d. § 194 BauGB. Satellit © Esri · Adressdaten © OpenStreetMap.
          {b && boris.attribution ? ` · ${boris.attribution}` : ""}
        </p>
      </div>
    </div>
  );
}
