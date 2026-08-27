"use client";

import { ErgebnisSchleuse } from "./ErgebnisSchleuse";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

import { berechneAfa } from "@/lib/rechner/afa";
import {
  type AfaEingaben,
  type AfaErgebnis,
  type ModernisierungsPunkte,
  type Objekttyp,
  OBJEKTTYPEN,
  OBJEKTTYP_LABEL,
  RechnerFehler,
  aktuellesJahr,
  formatEuro,
  formatProzent,
  formatZahl,
  rundeCent,
} from "@/lib/rechner/typen";
import { parseDeZahl } from "@/lib/bewertung/parse-de-zahl";
import { track, trackKlick, setAnsicht } from "@/lib/bewertung/track";
import { Icon } from "@/components/bewertung/icon";

/**
 * AfA-Wizard (LEAF P4, „der Nutzungsdauer-Killer") — dreistufiger
 * Wizard in derselben Dramaturgie wie die Geschwister-Rechner
 * (components/bewertung/calculator.tsx, ein Port aus Riegels
 * components/calculator/calculator.tsx: Fortschrittsknoten mit
 * endowed progress, eine Analyse-Zwischenphase mit progressivem
 * Statuszeilen-Reveal, danach das Ergebnis sofort sichtbar, kein
 * Lead-Gate davor) — hier am nächsten verwandt mit miet-wizard.tsx
 * (LEAF P3), das dieselbe UX bereits auf eine adresslose, rein
 * synchrone Rechner-Engine übertragen hat.
 *
 * Rechenkern bleibt ausschließlich src/lib/rechner/afa.ts
 * (berechneAfa, unverändert) — diese Datei enthält keine eigene
 * Steuer-/AfA-Logik, nur Formular-State, Dramaturgie und Darstellung.
 *
 * Bewusste Unterschiede zu den Geschwister-Wizards:
 *  - Kein Ort/Adresse: afa.ts kennt weder Koordinaten noch Lage, die
 *    Eingaben sind rein objektbezogen (Kaufpreis, Baujahr, Gebäude-
 *    anteil) plus persönliche Steuerdaten. Der Analyse-Kopf zeigt
 *    darum Objekttyp und Baujahr statt einer Ortsangabe.
 *  - Die Analyse-Reveal-Liste ist wie im Miet-Wizard aus dem ECHTEN
 *    Rechenweg von berechneAfa() (.schritte) aufgebaut, nicht aus
 *    einer erfundenen Quellen-Liste: die Funktion ist rein und
 *    synchron, das Ergebnis steht schon vor der Analyse-Animation
 *    fest, die Reveal-Liste inszeniert also die tatsächliche
 *    Rechnung Schritt für Schritt.
 *  - Objekttyp fließt bewusst NICHT in berechneAfa() ein (AfaEingaben
 *    kennt das Feld nicht — die Engine ist auf „vermietete
 *    Wohnimmobilie im Privatvermögen" kalibriert). Er dient nur der
 *    Einordnung von Analyse-Kopf und optionalem Lead-Payload.
 *  - Einziges Freitextfeld ist der Kaufpreis (Schritt 1) — Gebäude-
 *    anteil und Baujahr sind Regler, Modernisierung und Steuersatz
 *    sind Pill-Gruppen. Validiert wird daher nur beim Verlassen von
 *    Schritt 1 (validateKauf) sowie defensiv beim Start der Analyse.
 *  - „Vermietungsbeginn" (Schritt 3, optional) ist die kundenfreund-
 *    liche Bezeichnung für afa.ts' `bewertungsjahr` — das Jahr, zu
 *    dem das Gebäudealter für die Restnutzungsdauer bestimmt wird.
 *    Ohne Angabe rechnet die Engine mit dem aktuellen Kalenderjahr.
 *  - Der PDF-Report entsteht — wie im Verkaufs-Wizard-Port
 *    (components/bewertung/report-request.tsx) — CLIENT-SEITIG mit
 *    pdf-lib und lädt SOFORT herunter, ganz ohne Namens-/E-Mail-Feld:
 *    das ist der bewusste Unterschied zu nutzungsdauer.com und
 *    immoabschreibung.de, die das Ergebnis erst nach dem Lead zeigen.
 *    Das optionale E-Mail-Feld darunter ist ein separater, vom PDF
 *    unabhängiger Kanal (an /api/tool-lead, dieselbe Route wie bei
 *    den Geschwister-Rechnern) für alle, die zusätzlich eine
 *    persönliche Auswertung wollen.
 *  - Kein sessionStorage-Formularstand, keine Browser-History-Sperre:
 *    dieselbe Abwägung wie in calculator.tsx/miet-wizard.tsx — für
 *    einen dreistufigen Marketing-Rechner ohne Umsatzkritikalität
 *    liegt das über dem Wert der zusätzlichen Komplexität.
 */

type Phase = "form" | "analyzing" | "result";

// Vier Fortschritts-Knoten, wie in den Geschwister-Wizards: „Rechner
// starten" gilt mit dem Öffnen bereits als erledigt (endowed
// progress) — die drei Formularschritte folgen.
const STEP_NODES = ["Rechner starten", "Objekt & Kauf", "Modernisierung", "Steuer"];
const PROGRESS_PCT = [32, 60, 82];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const KAUFPREIS_DEFAULT = "450.000";
const GEBAEUDEANTEIL_MIN = 50;
const GEBAEUDEANTEIL_MAX = 95;
const GEBAEUDEANTEIL_DEFAULT = 80;
const BAUJAHR_MIN = 1900;
const BAUJAHR_DEFAULT = 1975;
const JAHRE_TABELLE = 10;

const jahrFormat = new Intl.NumberFormat("de-DE", { useGrouping: false });
function formatJahr(n: number): string {
  return jahrFormat.format(n);
}

interface FormState {
  kaufpreisStr: string;
  gebaeudeanteil: number;
  baujahr: number;
  objekttyp: Objekttyp;
  modernisierung: ModernisierungsPunkte;
  grenzsteuersatz: number;
  /** Freitext, optional — s. Dateikopf: kundenfreundlicher Name für afa.ts' `bewertungsjahr`. */
  vermietungsbeginnStr: string;
}

const EMPTY: FormState = {
  kaufpreisStr: KAUFPREIS_DEFAULT,
  gebaeudeanteil: GEBAEUDEANTEIL_DEFAULT,
  baujahr: BAUJAHR_DEFAULT,
  objekttyp: "ETW",
  modernisierung: { dach: 0, fenster: 0, heizung: 0, bad: 0, elektrik: 0, grundriss: 0 },
  grenzsteuersatz: 42,
  vermietungsbeginnStr: "",
};

type BauteilKey = keyof ModernisierungsPunkte;

const BAUTEIL_ORDER: readonly BauteilKey[] = ["dach", "fenster", "heizung", "bad", "elektrik", "grundriss"];

/** Label + Ein-Satz-Erklärung je Bauteil (task: „Mikro-Erklärung je Bereich"). */
const BAUTEIL_INFO: Record<BauteilKey, { label: string; hinweis: string }> = {
  dach: { label: "Dach", hinweis: "Eindeckung, Dämmung, Abdichtung" },
  fenster: { label: "Fenster", hinweis: "Verglasung und Rahmen" },
  heizung: { label: "Heizung", hinweis: "Anlage und Verteilung" },
  bad: { label: "Bad", hinweis: "Sanitär und Fliesen" },
  elektrik: { label: "Elektrik", hinweis: "Leitungen, Sicherungen, Verteiler" },
  grundriss: { label: "Grundriss", hinweis: "Statik, Wände, Raumzuschnitt" },
};

const GRENZSTEUERSATZ_OPTIONEN: readonly { wert: number; label: string; sub?: string }[] = [
  { wert: 14, label: "14 %", sub: "Eingangssteuersatz" },
  { wert: 24, label: "24 %" },
  { wert: 30, label: "30 %" },
  { wert: 35, label: "35 %" },
  { wert: 42, label: "42 %", sub: "Spitzensteuersatz" },
  { wert: 45, label: "45 %", sub: "Reichensteuer" },
];

// Objekttyp-Kacheln — dieselben Icon-Pfade wie in calculator.tsx/miet-wizard.tsx
// (wohnung/haus/mehrfamilienhaus, 1:1 übernommen für gleiche Bildsprache).
const OBJEKTTYP_ICON: Record<Objekttyp, React.ReactNode> = {
  ETW: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6" />,
  EFH: <path d="M3 11.5 12 4l9 7.5M5 10v11h14V10M10 21v-6h4v6" />,
  MFH: (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 21V9h4a1 1 0 0 1 1 1v11M3 21h18" />
      <path d="M7.5 8h3M7.5 12h3M7.5 16h3" />
    </>
  ),
};

const inputCls =
  "w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-akzent-wash";

function useCountUp(target: number, run: boolean, dur = 1400) {
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

/* ── Analyse-Reveal-Liste — aus dem ECHTEN Rechenweg aufgebaut ────── */

interface QuellenZeile {
  label: string;
  sub: string;
  wert: string;
}

/** Statuszeilen-Text je Rechenschritt-Label — die zwei im Leaf-Auftrag
 *  genannten Formulierungen stehen hier wortgleich. */
const QUELLEN_SUB: Record<string, string> = {
  "Restnutzungsdauer (RND)": "Restnutzungsdauer nach ImmoWertV-Modell wird ermittelt",
  "AfA-Satz mit Restnutzungsdauer-Gutachten": "Vergleich regulär vs. Gutachten wird berechnet",
};

/** Fallback für Labels ohne festen Eintrag oben — robust gegen spätere
 *  Zusätze in afa.ts' Rechenweg (additive neue Schritte bleiben lesbar). */
function quellenSubFallback(label: string): string {
  if (label.startsWith("Gebäudewert")) return "Kaufpreis und Gebäudeanteil werden verrechnet";
  if (label.startsWith("Alter")) return "Baujahr wird eingeordnet";
  if (label.startsWith("Gesamtnutzungsdauer")) return "ImmoWertV-Modell wird angelegt";
  if (label.startsWith("Modernisierung")) return "Modernisierungsgrad wird bewertet";
  if (label.startsWith("Regulärer AfA-Satz")) return "gesetzlicher Satz wird angelegt";
  if (label.startsWith("Mehr-Abschreibung über")) return "Zehn-Jahres-Effekt wird hochgerechnet";
  if (label.startsWith("Mehr-Abschreibung")) return "Differenz wird berechnet";
  if (label.startsWith("Steuereffekt")) return "Steuereffekt wird berechnet";
  return "wird eingerechnet";
}

function buildQuellen(f: FormState, ergebnis: AfaErgebnis): QuellenZeile[] {
  const zeilen: QuellenZeile[] = [
    {
      label: "Objektdaten einordnen",
      sub: "Kaufpreis, Baujahr und Objekttyp werden zugeordnet",
      wert: `${OBJEKTTYP_LABEL[f.objekttyp]} · Baujahr ${formatJahr(f.baujahr)}`,
    },
  ];
  for (const schritt of ergebnis.schritte) {
    zeilen.push({ label: schritt.label, sub: QUELLEN_SUB[schritt.label] ?? quellenSubFallback(schritt.label), wert: schritt.wert });
  }
  return zeilen;
}

/* ── 10-Jahres-Tabelle — kumulierte Werte aus dem Ergebnis abgeleitet,
   afa.ts bleibt unverändert, das ist reine Darstellungslogik. ──────── */

interface JahrZeile {
  jahr: number;
  regulaer: number;
  gutachten: number;
  mehr: number;
}

function baueTabelle(e: AfaErgebnis): JahrZeile[] {
  const zeilen: JahrZeile[] = [];
  for (let jahr = 1; jahr <= JAHRE_TABELLE; jahr++) {
    zeilen.push({
      jahr,
      regulaer: rundeCent(e.afaRegulaerProJahrEuro * jahr),
      gutachten: rundeCent(e.afaGutachtenProJahrEuro * jahr),
      mehr: rundeCent(e.mehrAbschreibungProJahrEuro * jahr),
    });
  }
  return zeilen;
}

/* ── PDF-Erzeugung (pdf-lib, rein client-seitig) ──────────────────────
   Port der Mechanik aus components/bewertung/report-request.tsx
   (selbst ein Port aus Riegels calculator/report-request.tsx), eigene
   Kopie statt Re-Import: report-request.tsx ist auf ValuationResult
   zugeschnitten, eine andere Fachdomäne. Beuwy-Look: Weiß, Tinte,
   Akzentlinie, Logo-Wortzug als Text — keine Bilddatei nötig. ────── */

const AKZENT = rgb(243 / 255, 226 / 255, 127 / 255);
const TINTE = rgb(22 / 255, 22 / 255, 19 / 255);
const MUTED = rgb(93 / 255, 93 / 255, 88 / 255);
const DIM = rgb(138 / 255, 138 / 255, 132 / 255);
const LINIE = rgb(0.88, 0.88, 0.86);

/** Bricht einen Fließtext auf eine maximale Breite um — pdf-lib flowt Text nicht selbst. */
function wrapText(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const probe = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(probe, size) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = probe;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function erstellePdf(f: FormState, eingaben: AfaEingaben, ergebnis: AfaErgebnis, tabelle: JahrZeile[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle("AfA-Auswertung — beuwy");
  doc.setAuthor("beuwy");
  doc.setProducer("beuwy AfA-Rechner");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const MARGIN = 56;
  const PAGE_W = 595.28;
  const PAGE_H = 841.89;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  let page: PDFPage = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H;

  const kopfzeile = () => {
    page.drawRectangle({ x: 0, y: PAGE_H - 10, width: PAGE_W, height: 10, color: AKZENT });
    page.drawText("beuwy", { x: MARGIN, y: PAGE_H - 46, size: 20, font: bold, color: TINTE });
    page.drawText("AfA-/Restnutzungsdauer-Auswertung", { x: MARGIN, y: PAGE_H - 64, size: 9, font: regular, color: MUTED });
    y = PAGE_H - 96;
  };
  kopfzeile();

  const neueSeiteFallsNoetig = (braucht: number) => {
    if (y - braucht < MARGIN + 40) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      kopfzeile();
    }
  };

  const zeile = (text: string, opts: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb>; gap?: number } = {}) => {
    const { size = 10.5, font = regular, color = TINTE, gap = 16 } = opts;
    neueSeiteFallsNoetig(gap);
    page.drawText(text, { x: MARGIN, y, size, font, color });
    y -= gap;
  };

  const absatz = (text: string, opts: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb>; lineGap?: number } = {}) => {
    const { size = 9.5, font = regular, color = MUTED, lineGap = 13 } = opts;
    const lines = wrapText(font, text, size, CONTENT_W);
    for (const l of lines) {
      neueSeiteFallsNoetig(lineGap);
      page.drawText(l, { x: MARGIN, y, size, font, color });
      y -= lineGap;
    }
  };

  const trenner = (gapBefore = 10, gapAfter = 18) => {
    y -= gapBefore;
    neueSeiteFallsNoetig(gapAfter);
    page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 1, color: LINIE });
    y -= gapAfter;
  };

  const zweiSpalten = (zeilen: readonly (readonly [string, string])[]) => {
    for (const [l, v] of zeilen) {
      neueSeiteFallsNoetig(17);
      page.drawText(l, { x: MARGIN, y, size: 9.5, font: regular, color: MUTED });
      page.drawText(v, { x: MARGIN + 260, y, size: 9.5, font: bold, color: TINTE });
      y -= 17;
    }
  };

  // Titel + Meta
  zeile("Ihre AfA-Auswertung", { size: 21, font: bold, gap: 26 });
  zeile(`${OBJEKTTYP_LABEL[f.objekttyp]} · Kaufpreis ${formatEuro(eingaben.kaufpreisGesamt)} · Baujahr ${formatJahr(eingaben.baujahr)}`, {
    size: 10,
    color: MUTED,
    gap: 14,
  });
  const datum = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "long", year: "numeric" }).format(new Date());
  zeile(`erstellt am ${datum}`, { size: 10, color: DIM, gap: 22 });

  // Große Zahl
  neueSeiteFallsNoetig(46);
  page.drawText(formatEuro(ergebnis.steuerersparnisUeber10JahreEuro), { x: MARGIN, y, size: 30, font: bold, color: TINTE });
  y -= 22;
  zeile(`Steuerersparnis über ${JAHRE_TABELLE} Jahre, bei ${formatProzent(ergebnis.grenzsteuersatzProzent, 0)} Grenzsteuersatz`, {
    size: 10.5,
    color: MUTED,
    gap: 10,
  });
  trenner();

  zeile("AfA im Vergleich", { size: 12.5, font: bold, gap: 20 });
  zweiSpalten([
    [`Regulär (Satz ${formatProzent(ergebnis.afaSatzRegulaerProzent, 1)})`, `${formatEuro(ergebnis.afaRegulaerProJahrEuro)}/Jahr`],
    [
      ergebnis.gutachtenGreift ? `Mit Gutachten (Satz ${formatProzent(ergebnis.afaSatzGutachtenProzent, 1)})` : "Mit Gutachten",
      ergebnis.gutachtenGreift ? `${formatEuro(ergebnis.afaGutachtenProJahrEuro)}/Jahr` : "kein rechnerischer Vorteil",
    ],
    ["Mehr-Abschreibung pro Jahr", formatEuro(ergebnis.mehrAbschreibungProJahrEuro)],
    [`Mehr-Abschreibung über ${JAHRE_TABELLE} Jahre`, formatEuro(ergebnis.mehrAbschreibungUeber10JahreEuro)],
  ]);
  trenner();

  zeile("Steuereffekt", { size: 12.5, font: bold, gap: 20 });
  zweiSpalten([
    ["Grenzsteuersatz", formatProzent(ergebnis.grenzsteuersatzProzent, 0)],
    ["Steuerersparnis pro Jahr", formatEuro(ergebnis.steuerersparnisProJahrEuro)],
    [`Steuerersparnis über ${JAHRE_TABELLE} Jahre`, formatEuro(ergebnis.steuerersparnisUeber10JahreEuro)],
  ]);
  trenner();

  zeile("Restnutzungsdauer-Modell (ImmoWertV-Logik)", { size: 12.5, font: bold, gap: 20 });
  zweiSpalten([
    ["Gebäudewert", formatEuro(ergebnis.gebaeudewertEuro)],
    ["Alter des Gebäudes", `${formatZahl(ergebnis.alterJahre)} Jahre`],
    ["Gesamtnutzungsdauer", `${formatZahl(ergebnis.gesamtnutzungsdauerJahre)} Jahre`],
    ["Modernisierungsgrad", `${ergebnis.modernisierungspunkteGesamt} von 12 Punkten — ${ergebnis.modernisierungsgrad}`],
    ["Restnutzungsdauer", `${formatZahl(ergebnis.restnutzungsdauerJahre)} Jahre`],
  ]);
  trenner();

  // 10-Jahres-Tabelle
  zeile(`${JAHRE_TABELLE}-Jahres-Verlauf (kumuliert)`, { size: 12.5, font: bold, gap: 20 });
  const colJahr = MARGIN;
  const colReg = MARGIN + 60;
  const colGut = MARGIN + 190;
  const colMehr = MARGIN + 350;
  neueSeiteFallsNoetig(16);
  page.drawText("Jahr", { x: colJahr, y, size: 8.5, font: bold, color: DIM });
  page.drawText("Regulär", { x: colReg, y, size: 8.5, font: bold, color: DIM });
  page.drawText("Mit Gutachten", { x: colGut, y, size: 8.5, font: bold, color: DIM });
  page.drawText("Mehr-AfA", { x: colMehr, y, size: 8.5, font: bold, color: DIM });
  y -= 14;
  for (const z of tabelle) {
    neueSeiteFallsNoetig(15);
    page.drawText(String(z.jahr), { x: colJahr, y, size: 9.5, font: regular, color: MUTED });
    page.drawText(formatEuro(z.regulaer), { x: colReg, y, size: 9.5, font: regular, color: TINTE });
    page.drawText(formatEuro(z.gutachten), { x: colGut, y, size: 9.5, font: regular, color: TINTE });
    page.drawText(formatEuro(z.mehr), { x: colMehr, y, size: 9.5, font: bold, color: TINTE });
    y -= 15;
  }
  trenner();

  // Footer / Disclaimer
  neueSeiteFallsNoetig(56);
  absatz(ergebnis.hinweis, { size: 9, font: bold, color: DIM, lineGap: 13 });
  absatz(
    "Diese Auswertung ersetzt weder ein Restnutzungsdauer-Gutachten eines qualifizierten Sachverständigen noch eine steuerliche Beratung. Ob und in welcher Höhe das Finanzamt eine kürzere Nutzungsdauer anerkennt, entscheidet der Einzelfall.",
    { size: 8.5, color: DIM, lineGap: 12 },
  );
  y -= 6;
  absatz("beuwy — Marketing für Immobilienmakler · beuwy.com", { size: 8.5, color: DIM, lineGap: 12 });

  return doc.save();
}

function ladeHerunter(bytes: Uint8Array, dateiname: string) {
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dateiname;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ── Komponente ────────────────────────────────────────────────────── */

export function AfaWizard() {
  const [phase, setPhase] = useState<Phase>("form");
  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [errorNonce, setErrorNonce] = useState(0);
  const [eingaben, setEingaben] = useState<AfaEingaben | null>(null);
  const [result, setResult] = useState<AfaErgebnis | null>(null);
  const [revealed, setRevealed] = useState(0);

  const idBasis = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const userNav = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fokus-Management: bei NUTZER-Schrittwechsel zur neuen Überschrift springen.
  useEffect(() => {
    if (phase === "form" && userNav.current) {
      userNav.current = false;
      headingRef.current?.focus();
    }
  }, [step, phase]);

  useEffect(() => {
    setAnsicht(
      phase === "analyzing"
        ? "analyse"
        : phase === "result"
          ? "ergebnis"
          : (["objektart", "standort", "eckdaten"] as const)[step] ?? "seite",
    );
  }, [phase, step]);

  useEffect(() => {
    if (phase === "form") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));
  const setBauteil = (k: BauteilKey, v: number) => setF((s) => ({ ...s, modernisierung: { ...s.modernisierung, [k]: v } }));

  function baueEingaben(fs: FormState): AfaEingaben {
    const kaufpreis = parseDeZahl(fs.kaufpreisStr) ?? NaN;
    const eingaben: AfaEingaben = {
      kaufpreisGesamt: kaufpreis,
      gebaeudeanteilProzent: fs.gebaeudeanteil,
      baujahr: fs.baujahr,
      modernisierung: fs.modernisierung,
      grenzsteuersatzProzent: fs.grenzsteuersatz,
    };
    const vermietungsbeginn = parseDeZahl(fs.vermietungsbeginnStr);
    if (vermietungsbeginn != null && Number.isFinite(vermietungsbeginn)) {
      eingaben.bewertungsjahr = Math.round(vermietungsbeginn);
    }
    return eingaben;
  }

  function validateKauf(): string | null {
    if (parseDeZahl(f.kaufpreisStr) == null) return "Bitte den Kaufpreis als Zahl angeben (z. B. 450.000).";
    try {
      berechneAfa(baueEingaben(f));
      return null;
    } catch (e) {
      return e instanceof RechnerFehler ? e.message : "Bitte die Eingaben prüfen.";
    }
  }

  function next() {
    if (step === 0) {
      const err = validateKauf();
      if (err) {
        setError(err);
        setErrorNonce((n) => n + 1);
        return;
      }
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
    const ein = baueEingaben(f);
    let ergebnis: AfaErgebnis;
    try {
      ergebnis = berechneAfa(ein);
    } catch (e) {
      setError(e instanceof RechnerFehler ? e.message : "Bitte die Eingaben prüfen.");
      setErrorNonce((n) => n + 1);
      return;
    }
    setEingaben(ein);
    setResult(ergebnis);
    setRevealed(0);
    track("rechner_analyse");
    setPhase("analyzing");
  }

  const quellen = useMemo(() => (result ? buildQuellen(f, result) : []), [result, f]);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepMs = reduce ? 90 : 460;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const tick = () => {
      i += 1;
      setRevealed(i);
      if (i < quellen.length) timers.push(setTimeout(tick, stepMs));
      else
        timers.push(
          setTimeout(
            () => {
              track("rechner_ergebnis");
              setPhase("result");
            },
            reduce ? 200 : 800,
          ),
        );
    };
    timers.push(setTimeout(tick, reduce ? 80 : 380));
    return () => timers.forEach(clearTimeout);
  }, [phase, quellen.length]);

  function reset() {
    setF(EMPTY);
    setStep(0);
    setResult(null);
    setEingaben(null);
    setError(null);
    setPhase("form");
  }

  /** „Angaben anpassen" aus dem Ergebnis: zurück zur Steuer-Angabe, ohne Reset. */
  function angabenAnpassen() {
    userNav.current = true;
    setError(null);
    setPhase("form");
    setStep(2);
  }

  if (phase === "analyzing") return <Analyzing quellen={quellen} revealed={revealed} f={f} sectionRef={sectionRef} />;
  if (phase === "result" && result && eingaben)
    return (
      <ErgebnisSchleuse tool="afa" eingaben={eingaben} ergebnis={result}>
        <Ergebnis f={f} eingaben={eingaben} result={result} onReset={reset} onAnpassen={angabenAnpassen} sectionRef={sectionRef} />
      </ErgebnisSchleuse>
    );

  const currentNode = step + 1; // Knoten 0 „Rechner starten" ist mit dem Öffnen erledigt
  const pct = PROGRESS_PCT[step] ?? PROGRESS_PCT[0];
  const kaufpreisZahl = parseDeZahl(f.kaufpreisStr);
  const punkteGesamt = BAUTEIL_ORDER.reduce((summe, k) => summe + f.modernisierung[k], 0);

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
        <ol role="list" aria-label="Fortschritt der Berechnung" className="flex items-center gap-2 sm:gap-3">
          {STEP_NODES.map((label, d) => {
            const done = d < currentNode;
            const current = d === currentNode;
            return (
              <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3" aria-current={current ? "step" : undefined}>
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${
                      done ? "border-akzent bg-akzent text-ink-cream" : current ? "border-ink-cream text-ink-cream" : "border-line-medium text-ink-dim"
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
                  <span className={`hidden truncate text-xs sm:inline ${current ? "font-medium text-ink-cream" : done ? "text-ink-muted" : "text-ink-dim"}`}>{label}</span>
                </div>
                {d < STEP_NODES.length - 1 && <div aria-hidden="true" className={`h-px flex-1 ${d < currentNode ? "bg-akzent" : "bg-line-subtle"}`} />}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-[24px] border border-line-subtle bg-white p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-6">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Objekt &amp; Kaufpreis
            </h2>

            <Field label="Kaufpreis" htmlFor={`${idBasis}-kaufpreis`}>
              <div className="relative">
                <input
                  id={`${idBasis}-kaufpreis`}
                  className={`${inputCls} pr-11`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={f.kaufpreisStr}
                  onChange={(e) => set("kaufpreisStr", e.target.value)}
                  placeholder="450.000"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-ink-dim">€</span>
              </div>
            </Field>

            <div>
              <ReglerFeld
                id={`${idBasis}-gebaeudeanteil`}
                label="Gebäudeanteil am Kaufpreis"
                wert={f.gebaeudeanteil}
                min={GEBAEUDEANTEIL_MIN}
                max={GEBAEUDEANTEIL_MAX}
                step={1}
                format={(n) => formatProzent(n, 0)}
                onChange={(v) => set("gebaeudeanteil", v)}
              />
              {kaufpreisZahl != null && (
                <p className="mt-1.5 text-xs text-ink-dim">→ Gebäudewert ca. {formatEuro((kaufpreisZahl * f.gebaeudeanteil) / 100)}</p>
              )}
            </div>

            <ReglerFeld
              id={`${idBasis}-baujahr`}
              label="Baujahr"
              wert={f.baujahr}
              min={BAUJAHR_MIN}
              max={aktuellesJahr()}
              step={1}
              format={formatJahr}
              onChange={(v) => set("baujahr", v)}
            />

            <div>
              <p className="t-label mb-2.5">Objekttyp</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Objekttyp">
                {OBJEKTTYPEN.map((o) => {
                  const selected = f.objekttyp === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        track("rechner_start");
                        set("objekttyp", o);
                      }}
                      className={`group relative flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] active:scale-[0.98] ${
                        selected ? "border-transparent bg-akzent-wash" : "border-line-medium hover:border-transparent hover:bg-akzent-wash/60"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${
                          selected ? "border-transparent bg-akzent text-ink-cream" : "border-line-medium bg-bg-elevated text-ink-muted group-hover:text-ink-cream"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                          {OBJEKTTYP_ICON[o]}
                        </svg>
                      </span>
                      <span className={`text-[13.5px] font-medium ${selected ? "text-ink-cream" : "text-ink-muted group-hover:text-ink-cream"}`}>{OBJEKTTYP_LABEL[o]}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-ink-dim">Beeinflusst nur die Einordnung Ihrer Anfrage, nicht die Berechnung.</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Modernisierungs-Zustand
            </h2>
            <p className="text-xs text-ink-dim">0 = nicht modernisiert · 1 = teilmodernisiert · 2 = vollständig modernisiert</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {BAUTEIL_ORDER.map((key) => (
                <BauteilZeile
                  key={key}
                  label={BAUTEIL_INFO[key].label}
                  hinweis={BAUTEIL_INFO[key].hinweis}
                  wert={f.modernisierung[key]}
                  onChange={(v) => setBauteil(key, v)}
                />
              ))}
            </div>
            <p className="text-sm text-ink-muted">
              Modernisierungsgrad: <span className="tnum font-medium text-ink-cream">{punkteGesamt} von 12</span> Punkten.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Steuer
            </h2>
            <div>
              <p className="t-label mb-2.5">Grenzsteuersatz</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Grenzsteuersatz">
                {GRENZSTEUERSATZ_OPTIONEN.map((o) => {
                  const aktiv = f.grenzsteuersatz === o.wert;
                  return (
                    <button
                      key={o.wert}
                      type="button"
                      aria-pressed={aktiv}
                      onClick={() => set("grenzsteuersatz", o.wert)}
                      className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring) ${
                        aktiv ? "border-transparent bg-akzent text-ink-cream" : "border-line-medium bg-white text-ink-muted hover:border-transparent hover:bg-akzent-wash hover:text-ink-cream"
                      }`}
                    >
                      {o.label}
                      {o.sub ? <span className="opacity-70"> · {o.sub}</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Vermietungsbeginn (optional)" htmlFor={`${idBasis}-vermietungsbeginn`}>
              <input
                id={`${idBasis}-vermietungsbeginn`}
                className={inputCls}
                type="text"
                inputMode="numeric"
                value={f.vermietungsbeginnStr}
                onChange={(e) => set("vermietungsbeginnStr", e.target.value)}
                placeholder={formatJahr(aktuellesJahr())}
              />
            </Field>
            <p className="text-xs text-ink-dim">
              Ohne Angabe rechnen wir mit {formatJahr(aktuellesJahr())} als Bewertungsjahr — das beeinflusst nur das Alter des Gebäudes zum
              Stichtag, nicht den Kaufpreis.
            </p>
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
            {step < 2 ? "Weiter" : "AfA berechnen"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Analyse-Phase ──────────────────────────────────────────────── */

function Analyzing({
  quellen,
  revealed,
  f,
  sectionRef,
}: {
  quellen: QuellenZeile[];
  revealed: number;
  f: FormState;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const pct = quellen.length ? Math.round((revealed / quellen.length) * 100) : 0;
  return (
    <div ref={sectionRef} className="overflow-hidden rounded-[24px] border border-line-subtle bg-white" role="status" aria-live="polite" aria-busy={pct < 100}>
      <span className="sr-only">AfA wird berechnet, {pct} Prozent.</span>
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="text-center">
          <div className="font-display text-sm uppercase tracking-[0.25em] text-ink-cream">Analyse läuft</div>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-cream">
            {OBJEKTTYP_LABEL[f.objekttyp]} · Baujahr {formatJahr(f.baujahr)}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">Kaufpreis {f.kaufpreisStr} €</p>
        </div>

        <div className="mt-8 space-y-2">
          {quellen.map((s, i) => {
            const done = i < revealed;
            const active = i === revealed;
            return (
              <div
                key={`${s.label}-${i}`}
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
                {done && <span className="text-sm text-ink-cream">{s.wert}</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
          <div className="h-full rounded-full bg-akzent transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-smooth-out)]" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 text-center text-xs text-ink-dim">
          {pct}% — {revealed}/{quellen.length} Rechenschritte ausgewertet
        </div>
      </div>
    </div>
  );
}

/* ── Ergebnis ───────────────────────────────────────────────────── */

function Ergebnis({
  f,
  eingaben,
  result,
  onReset,
  onAnpassen,
  sectionRef,
}: {
  f: FormState;
  eingaben: AfaEingaben;
  result: AfaErgebnis;
  onReset: () => void;
  /** Zurück zur Steuer-Angabe, ohne die Eingaben zu verlieren. */
  onAnpassen: () => void;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const idBasis = useId();
  const steuerersparnis10 = useCountUp(result.steuerersparnisUeber10JahreEuro, true);
  const tabelle = useMemo(() => baueTabelle(result), [result]);

  const [rechenwegOffen, setRechenwegOffen] = useState(false);
  const rechenwegPanelId = `${idBasis}-rechenweg`;

  // ── PDF — sofort, ohne Namens-/E-Mail-Pflicht (s. Dateikopf) ────────
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfDone, setPdfDone] = useState(false);

  async function pdfHerunterladen() {
    if (pdfBusy) return;
    setPdfBusy(true);
    setPdfError(null);
    try {
      const bytes = await erstellePdf(f, eingaben, result, tabelle);
      ladeHerunter(bytes, "beuwy-afa-auswertung.pdf");
      track("report_angefordert");
      setPdfDone(true);
    } catch {
      setPdfError("Das PDF konnte nicht erstellt werden. Bitte erneut versuchen.");
    } finally {
      setPdfBusy(false);
    }
  }

  // ── E-Mail-Auswertung — separater, vom PDF unabhängiger Kanal ───────
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [mailError, setMailError] = useState<string | null>(null);
  const [gesendet, setGesendet] = useState<null | { demo: boolean }>(null);

  async function mailAnfordern(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!name.trim()) return setMailError("Bitte Ihren Namen angeben.");
    if (!EMAIL_RE.test(email)) return setMailError("Bitte eine gültige E-Mail-Adresse angeben.");
    if (!consent) return setMailError("Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");

    setMailError(null);
    setBusy(true);

    try {
      const res = await fetch("/api/tool-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "afa", eingaben: { ...eingaben, objekttyp: f.objekttyp }, ergebnis: result, name, email, website }),
      });
      if (res.status === 429) {
        setBusy(false);
        return setMailError("Zu viele Anfragen kurz hintereinander. Bitte in ein paar Minuten erneut versuchen.");
      }
      if (res.status === 422) {
        setBusy(false);
        return setMailError("Bitte prüfen Sie Namen und E-Mail-Adresse.");
      }
      if (!res.ok) throw new Error("request failed");
      const j = (await res.json()) as { demo?: boolean };
      setBusy(false);
      setGesendet({ demo: Boolean(j.demo) });
      track("report_angefordert");
    } catch {
      setBusy(false);
      setMailError("Der Versand hat technisch nicht geklappt. Bitte erneut versuchen oder direkt an ap@beuwy.com schreiben.");
    }
  }

  return (
    <div ref={sectionRef} className="overflow-hidden rounded-[24px] border border-line-subtle bg-white" data-track-bereich="ergebnis" onClickCapture={trackKlick}>
      <div className="px-6 py-12 sm:px-8">
        <div className="overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated px-6 py-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line-medium bg-white py-1.5 pl-1.5 pr-3.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-akzent text-ink-cream">
              <Icon name="calculator" size={14} />
            </span>
            <span className="whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.1em] text-ink-cream sm:text-[0.7rem] sm:tracking-[0.2em]">
              Steuerersparnis über {JAHRE_TABELLE} Jahre
            </span>
          </div>

          <div aria-hidden className="mt-5 font-display leading-none tnum text-ink-cream" style={{ fontSize: "clamp(26px, 6vw, 52px)" }}>
            {formatEuro(steuerersparnis10)}
          </div>
          <span className="sr-only">Steuerersparnis über {JAHRE_TABELLE} Jahre: {formatEuro(result.steuerersparnisUeber10JahreEuro)}</span>
          <p className="mt-2 text-sm text-ink-muted">bei {formatProzent(result.grenzsteuersatzProzent, 0)} Grenzsteuersatz</p>

          {!result.gutachtenGreift && (
            <div className="mt-5 rounded-r-[10px] border-l-2 border-akzent bg-white py-3 pl-4 pr-3 text-left">
              <p className="text-[13.5px] text-ink-cream">
                Bei diesem Baujahr und dieser Modernisierung liegt die reguläre AfA bereits auf dem Niveau eines Gutachtens — hier bringt ein
                Restnutzungsdauer-Gutachten rechnerisch keinen Vorteil.
              </p>
            </div>
          )}

          <p className="t-label mt-8 text-left">Jährliche AfA im Vergleich</p>
          <AfaBalkenpaar
            regulaerEuro={result.afaRegulaerProJahrEuro}
            gutachtenEuro={result.afaGutachtenProJahrEuro}
            satzRegulaer={result.afaSatzRegulaerProzent}
            satzGutachten={result.afaSatzGutachtenProzent}
          />

          <div className="mt-8 grid grid-cols-1 gap-5 border-t border-line-medium pt-6 text-left sm:grid-cols-3">
            <Stat label="Mehr-Abschreibung / Jahr" wert={formatEuro(result.mehrAbschreibungProJahrEuro)} />
            <Stat label={`Über ${JAHRE_TABELLE} Jahre`} wert={formatEuro(result.mehrAbschreibungUeber10JahreEuro)} />
            <Stat label={`Steuerersparnis / Jahr (${formatProzent(result.grenzsteuersatzProzent, 0)})`} wert={formatEuro(result.steuerersparnisProJahrEuro)} />
          </div>

          <p className="mt-6 text-xs text-ink-dim">{result.hinweis}</p>
        </div>

        {/* 10-Jahres-Tabelle */}
        <div className="mt-8">
          <p className="t-label">{JAHRE_TABELLE}-Jahres-Verlauf, kumuliert</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line-subtle text-left text-[11px] uppercase tracking-[0.06em] text-ink-dim">
                  <th className="py-2 pr-4 font-medium">Jahr</th>
                  <th className="py-2 pr-4 font-medium">Regulär kumuliert</th>
                  <th className="py-2 pr-4 font-medium">Mit Gutachten kumuliert</th>
                  <th className="py-2 font-medium">Mehr-Abschreibung kumuliert</th>
                </tr>
              </thead>
              <tbody>
                {tabelle.map((z) => (
                  <tr key={z.jahr} className="border-b border-line-subtle/60">
                    <td className="py-2 pr-4 tnum text-ink-muted">{z.jahr}</td>
                    <td className="py-2 pr-4 tnum text-ink-cream">{formatEuro(z.regulaer)}</td>
                    <td className="py-2 pr-4 tnum text-ink-cream">{formatEuro(z.gutachten)}</td>
                    <td className="py-2 tnum font-medium text-ink-cream">{formatEuro(z.mehr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rechenweg — .faq-item/.faq-trigger/.faq-panel (globals.css), wie in den Geschwister-Wizards */}
        <div className="faq-item mt-8 border-t border-line-subtle" data-open={rechenwegOffen ? "true" : "false"}>
          <button type="button" className="faq-trigger !py-3.5" aria-expanded={rechenwegOffen} aria-controls={rechenwegPanelId} onClick={() => setRechenwegOffen((v) => !v)}>
            <span className="text-[13.5px] font-semibold text-ink-cream">Rechenweg anzeigen</span>
            <svg className="faq-chevron" viewBox="0 0 24 24" aria-hidden focusable="false">
              <path d="M6 10l6 5 6-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </button>
          <div className="faq-panel" id={rechenwegPanelId} role="region">
            <div>
              <ul className="faq-panel-inner !max-w-none space-y-2">
                {result.schritte.map((schritt, i) => (
                  <li key={`${schritt.label}-${i}`} className="flex items-baseline justify-between gap-4 text-[13px]">
                    <span className="text-ink-muted">{schritt.label}</span>
                    <span className="tnum shrink-0 font-medium text-ink-cream">{schritt.wert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-line-subtle pt-6">
          <button type="button" onClick={onAnpassen} className="text-sm text-ink-muted transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream">
            Angaben anpassen
          </button>
          <button type="button" onClick={onReset} className="text-sm text-ink-muted transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream">
            Neue Berechnung
          </button>
        </div>

        {/* PDF — sofort, ganz ohne Kontaktdaten */}
        <div className="mt-6 rounded-[18px] border border-line-medium bg-akzent-wash px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-ink-cream">Auswertung als PDF</p>
              <p className="mt-1 max-w-md text-xs text-ink-muted">
                Kaufpreis, Rechenweg, Vergleich und {JAHRE_TABELLE}-Jahres-Tabelle als eigenständiges Dokument — sofort zum Herunterladen, ganz
                ohne E-Mail-Adresse.
              </p>
            </div>
            <button
              type="button"
              onClick={pdfHerunterladen}
              disabled={pdfBusy}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-akzent px-6 py-3 text-sm font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
            >
              {pdfBusy ? (
                <>
                  <svg className="animate-spin" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                    <path d="M21 12a9 9 0 0 1-9 9" />
                  </svg>
                  PDF wird erstellt …
                </>
              ) : (
                <>
                  <Icon name="doc" size={17} /> PDF herunterladen
                </>
              )}
            </button>
          </div>
          {pdfError && (
            <p className="mt-3 text-sm text-[#b3402a]" role="alert">
              {pdfError}
            </p>
          )}
          {pdfDone && !pdfError && <p className="mt-3 text-xs text-ink-muted">PDF heruntergeladen. Sie können es jederzeit erneut anfordern.</p>}
        </div>

        {/* ── Auswertung per E-Mail (optional, unabhängig vom PDF) ────── */}
        <div className="mt-6 border-t border-line-subtle pt-6">
          {gesendet ? (
            <div>
              <p className="t-h3">Auswertung ist unterwegs.</p>
              <p className="t-body mt-2">
                Wir schicken die detaillierte Auswertung an <span className="font-medium text-ink-cream">{email}</span>.
              </p>
              {gesendet.demo && <p className="t-small is-fail mt-3">Hinweis: Der Mail-Versand ist in dieser Vorschau noch nicht aktiviert.</p>}
            </div>
          ) : (
            <form onSubmit={mailAnfordern} noValidate>
              <p className="t-small font-medium !text-ink-cream">Detaillierte Auswertung als E-Mail</p>
              <p className="t-small mt-1.5">Rechenweg, Vergleich und Annahmen zusätzlich per E-Mail — freiwillig, für später.</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${idBasis}-name`} className="t-label mb-1.5 block">
                    Name
                  </label>
                  <input
                    id={`${idBasis}-name`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setMailError(null);
                    }}
                    autoComplete="name"
                    placeholder="Vor- und Nachname"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor={`${idBasis}-email`} className="t-label mb-1.5 block">
                    E-Mail
                  </label>
                  <input
                    id={`${idBasis}-email`}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMailError(null);
                    }}
                    autoComplete="email"
                    placeholder="name@beispiel.de"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Honeypot — für Menschen unsichtbar */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" />

              <label className="mt-3.5 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setMailError(null);
                  }}
                  style={{ accentColor: "var(--akzent)" }}
                  className="mt-0.5 h-4 w-4"
                />
                <span className="t-small">
                  Ich willige ein, dass meine Angaben zur Zustellung der Auswertung verarbeitet werden. Jederzeit widerrufbar (siehe{" "}
                  <Link href="/datenschutz" className="btn-link">
                    Datenschutz
                  </Link>
                  ).
                </span>
              </label>

              {mailError && (
                <p className="t-small is-fail mt-3" role="alert">
                  {mailError}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-akzent px-6 py-3 text-[14.5px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? "Wird gesendet…" : "Auswertung per E-Mail senden"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-ink-dim">
          Orientierungswert auf Basis von Kaufpreis, Baujahr, Modernisierung und Grenzsteuersatz — kein Restnutzungsdauer-Gutachten und keine
          Steuerberatung.
        </p>
      </div>
    </div>
  );
}

/* ── Formular-Bausteine ─────────────────────────────────────────── */

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="t-label mb-2.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}

function ReglerFeld({
  id,
  label,
  wert,
  min,
  max,
  step,
  format,
  onChange,
}: {
  id: string;
  label: string;
  wert: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="t-label">
          {label}
        </label>
        <span className="font-display text-[16px] font-semibold text-ink-cream tnum">{format(wert)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={wert}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: "var(--akzent)" }}
        className="mt-2.5 w-full cursor-pointer"
      />
      <div className="mt-1 flex justify-between text-[11px] text-ink-dim tnum">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function BauteilZeile({ label, hinweis, wert, onChange }: { label: string; hinweis: string; wert: number; onChange: (v: number) => void }) {
  return (
    <div className="rounded-[12px] border border-line-subtle px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[13.5px] font-medium text-ink-cream">{label}</span>
          <p className="mt-0.5 truncate text-[11.5px] text-ink-dim">{hinweis}</p>
        </div>
        <div className="flex shrink-0 gap-1.5" role="group" aria-label={`Modernisierung ${label}`}>
          {[0, 1, 2].map((stufe) => {
            const aktiv = wert === stufe;
            return (
              <button
                key={stufe}
                type="button"
                onClick={() => onChange(stufe)}
                aria-pressed={aktiv}
                className={`h-8 w-8 rounded-full text-[12.5px] font-semibold tnum transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring) ${
                  aktiv ? "bg-akzent text-ink-cream" : "bg-bg-elevated text-ink-muted hover:bg-akzent-wash hover:text-ink-cream"
                }`}
              >
                {stufe}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * AfaBalkenpaar — regulär vs. mit Gutachten, ein Balkenpaar auf
 * gemeinsamer Skala (beide Werte sind €/Jahr, dieselbe Einheit).
 * Regulär bekommt --chart-kontext (De-Emphasis), Gutachten
 * --chart-akzent (der beuwy-Wert, den es hervorzuheben gilt) — exakt
 * die im Leaf-Auftrag verlangte Farbzuordnung.
 */
function AfaBalkenpaar({
  regulaerEuro,
  gutachtenEuro,
  satzRegulaer,
  satzGutachten,
}: {
  regulaerEuro: number;
  gutachtenEuro: number;
  satzRegulaer: number;
  satzGutachten: number;
}) {
  const max = Math.max(regulaerEuro, gutachtenEuro, 1);
  return (
    <div className="mt-4 space-y-3">
      <Balken label="Regulär" wert={regulaerEuro} satz={satzRegulaer} anteil={(regulaerEuro / max) * 100} farbe="var(--chart-kontext)" />
      <Balken label="Mit Gutachten" wert={gutachtenEuro} satz={satzGutachten} anteil={(gutachtenEuro / max) * 100} farbe="var(--chart-akzent)" />
    </div>
  );
}

function Balken({ label, wert, satz, anteil, farbe }: { label: string; wert: number; satz: number; anteil: number; farbe: string }) {
  const breite = wert > 0 ? Math.max(anteil, 2) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-ink-cream">
          {label} <span className="tnum text-ink-dim">({formatProzent(satz, 1)})</span>
        </span>
        <span className="tnum text-[13px] font-semibold text-ink-cream">{formatEuro(wert)}/Jahr</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-smooth-out)]"
          style={{ width: `${breite}%`, background: farbe }}
        />
      </div>
    </div>
  );
}

function Stat({ label, wert }: { label: string; wert: string }) {
  return (
    <div>
      <p className="t-label">{label}</p>
      <p className="mt-2 font-display text-[clamp(20px,2.4vw,28px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink-cream tnum [text-wrap:balance]">{wert}</p>
    </div>
  );
}
