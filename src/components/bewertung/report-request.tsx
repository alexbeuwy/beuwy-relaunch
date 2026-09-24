"use client";

import { useEffect, useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { Icon } from "@/components/bewertung/icon";
import { track, setAnsicht } from "@/lib/bewertung/track";
import type { GeoResult } from "@/lib/bewertung/geocode";
import type { Objektart, Qualitaet, ValuationResult, Vermietungsstand, Zustand } from "@/lib/bewertung/valuation";

/**
 * Optionaler Schritt NACH dem sofort sichtbaren Ergebnis — kein Lead-Gate.
 * Port aus Riegel `calculator/report-request.tsx`, mit zwei Anpassungen an
 * beuwy:
 *  1) Riegels report-request postete nur an ein serverseitiges /api/report,
 *     das (uns nicht zugänglich) dort das PDF erzeugte. beuwy hat kein
 *     eigenes Report-Backend für diesen Rechner — das PDF entsteht deshalb
 *     hier CLIENT-SEITIG mit pdf-lib (dafür extra installiert, s. R4-Vorbe-
 *     reitung) und wird sofort heruntergeladen, unabhängig vom Mail-Versand.
 *  2) Der Lead selbst geht an das bereits bestehende /api/tool-lead
 *     (Body {tool:'verkaufspreis', eingaben, ergebnis, name, email},
 *     Honeypot-Feld "website") — dieselbe Route wie die anderen /tools/*-
 *     Rechner, kein neuer Endpoint.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Subset von FormState, das in Lead und PDF einfließt. */
export interface ReportSource {
  objektart: Objektart;
  address: GeoResult | null;
  wohnflaeche: string;
  grundflaeche: string;
  zimmer: string;
  baujahr: string;
  zustand: Zustand;
  qualitaet: Qualitaet;
  energieklasse: string;
  energieausweis: string;
  ausstattung: string[];
  jahresnettokaltmiete: string;
  wohneinheiten: string;
  gewerbeeinheiten: string;
  vermietungsstand: Vermietungsstand;
  leerstehendeWohnflaeche: string;
  hallenflaeche: string;
  mischWohnflaeche: string;
  hausgeld: string;
  kernsaniert: boolean;
}

const OBJEKTART_LABEL: Record<Objektart, string> = {
  wohnung: "Eigentumswohnung",
  haus: "Haus",
  mehrfamilienhaus: "Mehrfamilienhaus",
  grundstueck: "Grundstück",
  gewerbe: "Gewerbeimmobilie",
};

function formatEUR(n: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}
const nfDE = new Intl.NumberFormat("de-DE");

/* ── PDF-Erzeugung (pdf-lib, rein client-seitig) ──────────────────────── */

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

async function erstellePdf(f: ReportSource, result: ValuationResult, bundesweit: boolean, name: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle("Marktwert-Einschätzung — beuwy");
  doc.setAuthor("beuwy");
  doc.setProducer("beuwy Verkaufspreisrechner");

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
    page.drawText("Marktwert-Einschätzung", { x: MARGIN, y: PAGE_H - 64, size: 9, font: regular, color: MUTED });
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

  // Titel + Meta
  zeile("Ihre Marktwert-Einschätzung", { size: 21, font: bold, gap: 26 });
  const datum = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "long", year: "numeric" }).format(new Date());
  zeile(`${f.address?.label ?? "Adresse nicht angegeben"} · erstellt am ${datum}`, { size: 10, color: MUTED, gap: 14 });
  zeile(`${OBJEKTART_LABEL[f.objektart]}${name ? ` · für ${name}` : ""}`, { size: 10, color: DIM, gap: 22 });

  // Großer Wert
  neueSeiteFallsNoetig(50);
  page.drawText(formatEUR(result.mid), { x: MARGIN, y, size: 32, font: bold, color: TINTE });
  y -= 26;
  zeile(`Spanne ${formatEUR(result.low)} – ${formatEUR(result.high)}`, { size: 11, color: MUTED, gap: 10 });
  trenner();

  // Kennzahlen
  zeile("Kennzahlen im Überblick", { size: 12.5, font: bold, gap: 20 });
  const kennzahlen: [string, string][] = [
    ["Preis pro m²", result.pricePerSqm != null ? formatEUR(result.pricePerSqm) : "–"],
    ["Markttrend (12 Monate)", `+${nfDE.format(result.trendPct)} %`],
    ["Mikrolage-Score", `${nfDE.format(result.mikrolage)}/10`],
    ["Konfidenz des Modells", `${result.confidence} %`],
    ["Vergleichsobjekte", result.comparables > 0 ? `${result.comparables}` : "–"],
    ["Renditeumfeld", `${nfDE.format(result.rentYieldPct)} %`],
  ];
  if (result.vervielfaeltiger != null) kennzahlen.push(["Ertragsfaktor", `${nfDE.format(result.vervielfaeltiger)}×`]);
  const spalteB = MARGIN + CONTENT_W / 2;
  for (let i = 0; i < kennzahlen.length; i += 2) {
    neueSeiteFallsNoetig(18);
    const [l1, v1] = kennzahlen[i];
    page.drawText(l1, { x: MARGIN, y, size: 9.5, font: regular, color: MUTED });
    page.drawText(v1, { x: MARGIN + 150, y, size: 10.5, font: bold, color: TINTE });
    const zweite = kennzahlen[i + 1];
    if (zweite) {
      const [l2, v2] = zweite;
      page.drawText(l2, { x: spalteB, y, size: 9.5, font: regular, color: MUTED });
      page.drawText(v2, { x: spalteB + 150, y, size: 10.5, font: bold, color: TINTE });
    }
    y -= 20;
  }
  trenner();

  // Objektdaten
  zeile("Angaben zur Immobilie", { size: 12.5, font: bold, gap: 20 });
  const objektdaten: [string, string][] = [
    ["Objektart", OBJEKTART_LABEL[f.objektart]],
    ...(f.wohnflaeche ? ([[f.objektart === "gewerbe" ? "Nutzfläche" : "Wohnfläche", `${f.wohnflaeche} m²`]] as [string, string][]) : []),
    ...(f.grundflaeche ? ([["Grundstücksfläche", `${f.grundflaeche} m²`]] as [string, string][]) : []),
    ...(f.baujahr ? ([["Baujahr", f.baujahr]] as [string, string][]) : []),
    ["Zustand", f.zustand],
    ["Ausstattungsqualität", f.qualitaet],
    ...(f.energieklasse ? ([["Energieeffizienzklasse", f.energieklasse]] as [string, string][]) : []),
  ];
  for (const [l, v] of objektdaten) {
    neueSeiteFallsNoetig(17);
    page.drawText(l, { x: MARGIN, y, size: 9.5, font: regular, color: MUTED });
    page.drawText(v, { x: MARGIN + 200, y, size: 9.5, font: bold, color: TINTE });
    y -= 17;
  }
  if (f.ausstattung.length > 0) {
    y -= 4;
    absatz(`Ausstattung: ${f.ausstattung.join(", ")}`, { size: 9, lineGap: 12 });
  }
  trenner();

  // Werttreiber
  if (result.factors.length > 0) {
    zeile("Werttreiber", { size: 12.5, font: bold, gap: 20 });
    for (const fac of result.factors) {
      neueSeiteFallsNoetig(16);
      const vz = fac.effectPct >= 0 ? "+" : "";
      page.drawText(`• ${fac.label}`, { x: MARGIN, y, size: 9.5, font: regular, color: MUTED });
      page.drawText(`${vz}${fac.effectPct} %`, { x: PAGE_W - MARGIN - 40, y, size: 9.5, font: bold, color: fac.effectPct >= 0 ? TINTE : DIM });
      y -= 16;
    }
    trenner();
  }

  if (bundesweit) {
    absatz(`Marktdaten-Basis: bundesweite Vergleichstabellen — für ${f.address?.city || "diese Lage"} liegt kein direkter Orts-Treffer vor.`, {
      size: 9,
      color: DIM,
      lineGap: 12,
    });
    y -= 8;
  }

  // Footer / Disclaimer
  neueSeiteFallsNoetig(50);
  y -= 6;
  page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 1, color: LINIE });
  y -= 16;
  absatz(
    "Unverbindliche, datenbasierte Schätzung auf Grundlage der von Ihnen gemachten Angaben und öffentlich verfügbarer Marktdaten — kein Verkehrswertgutachten im Sinne des § 194 BauGB und keine Beratung. Für eine belastbare Einschätzung empfiehlt sich eine Besichtigung vor Ort.",
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

/* ── Komponente ────────────────────────────────────────────────────────── */

export function ReportRequest({
  f,
  result,
  bundesweit = false,
  onReset,
  onAnpassen,
  onGesendet,
  borisLoading = false,
}: {
  f: ReportSource;
  result: ValuationResult;
  /** s. calculator.tsx — steuert den Ehrlichkeits-Hinweis im PDF. */
  bundesweit?: boolean;
  onReset: () => void;
  /** Zurück ins Formular (Eckdaten), OHNE Reset. */
  onAnpassen?: () => void;
  /** Nach erfolgreichem Versand: der Wizard verwirft seinen gespeicherten Formularstand. */
  onGesendet?: () => void;
  /** Amtlicher Bodenrichtwert lädt noch — der im Formular sichtbare Wert
   *  könnte sich noch ändern, deshalb blockt der Button den Versand bis dahin. */
  borisLoading?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot — bleibt bei Menschen leer
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [demoVersand, setDemoVersand] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnsicht(open ? "ergebnis-formular" : "ergebnis");
  }, [open]);

  // Das PDF-Badge im Ergebnis öffnet das Formular aus der Ferne (CustomEvent).
  useEffect(() => {
    const auf = () => {
      setOpen(true);
      setTimeout(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    };
    window.addEventListener("beuwy:report-oeffnen", auf);
    return () => window.removeEventListener("beuwy:report-oeffnen", auf);
  }, []);

  const fail = (m: string) => {
    setError(m);
    setNonce((n) => n + 1);
  };

  async function submit() {
    if (busy) return;
    if (!name.trim()) return fail("Bitte Ihren Namen angeben.");
    if (!EMAIL_RE.test(email)) return fail("Bitte eine gültige E-Mail-Adresse angeben.");
    if (!consent) return fail("Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.");
    setError(null);
    setBusy(true);
    track("report_angefordert");

    // PDF entsteht lokal im Browser und wird sofort heruntergeladen — das
    // funktioniert auch, wenn der Mail-Versand gleich technisch scheitert.
    try {
      const bytes = await erstellePdf(f, result, bundesweit, name);
      const slug = (f.address?.city || "immobilie").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      ladeHerunter(bytes, `beuwy-marktwert-${slug || "report"}.pdf`);
    } catch {
      /* fail-soft: das PDF ist ein Bonus, der Lead-Versand unten ist das Ziel */
    }

    try {
      const res = await fetch("/api/tool-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "verkaufspreis",
          eingaben: f,
          ergebnis: { low: result.low, mid: result.mid, high: result.high, pricePerSqm: result.pricePerSqm },
          name,
          email,
          website,
        }),
      });
      if (res.status === 429) {
        setBusy(false);
        return fail("Zu viele Anfragen kurz hintereinander. Bitte in ein paar Minuten erneut versuchen.");
      }
      if (res.status === 422) {
        setBusy(false);
        return fail("Bitte prüfen Sie Namen und E-Mail-Adresse.");
      }
      if (!res.ok) throw new Error("request failed");
      const j = (await res.json()) as { ok?: boolean; delivered?: boolean; demo?: boolean };
      setDelivered(Boolean(j.delivered));
      setDemoVersand(Boolean(j.demo));
    } catch {
      setBusy(false);
      return fail("Der Mail-Versand hat technisch nicht geklappt — der PDF-Report wurde aber bereits heruntergeladen. Bei Fragen: ap@beuwy.com.");
    }
    setBusy(false);
    setDone(true);
    onGesendet?.();
  }

  if (done) {
    return (
      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center rounded-[24px] border border-line-medium bg-akzent-wash p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-akzent text-ink-cream">
          <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 4 4 10-10" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink-cream">{delivered ? "Ihr Report ist unterwegs" : "Anfrage eingegangen"}</h3>
        <p className="mt-2 max-w-md text-sm text-ink-muted">
          Das PDF wurde bereits heruntergeladen.{" "}
          {delivered ? (
            <>
              Zusätzlich schicken wir die Auswertung an <span className="font-medium text-ink-cream">{email}</span>.
            </>
          ) : (
            <>
              Ihre Anfrage ist bei uns eingegangen — wir melden uns bei Fragen an <span className="font-medium text-ink-cream">{email}</span>.
            </>
          )}
        </p>
        {demoVersand && <p className="mt-3 text-xs text-[#b3402a]">Hinweis: Der Mail-Versand ist in dieser Vorschau noch nicht aktiviert.</p>}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onAnpassen && (
            <button
              type="button"
              onClick={onAnpassen}
              className="rounded-full border border-line-medium px-6 py-3 text-sm text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-white"
            >
              Angaben anpassen
            </button>
          )}
          <button
            type="button"
            onClick={onReset}
            className="rounded-full bg-akzent px-6 py-3 text-sm font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
          >
            Neue Bewertung
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} data-track-bereich="report-formular" className="mx-auto mt-10 max-w-4xl rounded-[24px] border border-line-medium bg-akzent-wash p-6 sm:p-8">
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-ink-cream md:justify-start">
          <Icon name="doc" size={18} />
          Ihr nächster Schritt
        </div>
        <h3 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(22px,4vw,34px)] font-bold leading-[1.1] tracking-[-0.02em] text-ink-cream [text-wrap:balance] md:mx-0">
          Marktwert-Report als PDF
        </h3>
      </div>

      <div className="mt-7 grid items-center gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="text-center md:text-left">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-muted md:mx-0">
            Diese Sofort-Einschätzung ist nur der Anfang. Der PDF-Report
            {f.address?.label ? (
              <>
                {" "}für <span className="font-semibold text-ink-cream">{f.address.label}</span>
              </>
            ) : null}{" "}
            zeigt, <strong className="text-ink-cream">worauf es beim Preis wirklich ankommt</strong> — kostenlos, unverbindlich, sofort zum Herunterladen.
          </p>

          <ul className="mx-auto mt-6 grid max-w-md gap-3.5 text-left text-sm leading-relaxed text-ink-cream/90 md:mx-0">
            <li className="flex items-start gap-3">
              <Icon name="chart" size={16} className="mt-0.5 shrink-0 text-ink-cream" />
              <span>
                Alle Preis-Faktoren im Detail — was Ihren Wert erhöht, was ihn senkt, und wie der Marktwert von{" "}
                <strong className="text-ink-cream">{nfDE.format(result.mid)} €</strong> zustande kommt.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-ink-cream" />
              <span>Kennzahlen, Werttreiber und Rechenweg zum Nachlesen und Weitergeben — als eigenständiges Dokument.</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="users" size={16} className="mt-0.5 shrink-0 text-ink-cream" />
              <span>Sie sind Makler und wollen genau dieses Tool auf Ihrer eigenen Domain? Dann sprechen wir über Zusammenarbeit.</span>
            </li>
          </ul>

          <p className="mx-auto mt-4 max-w-md text-center text-xs text-ink-dim md:mx-0 md:text-left">
            <Icon name="lock" size={12} className="mb-0.5 mr-1 inline" />
            Ihre Daten bleiben bei beuwy — keine Weitergabe an Dritte.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[180px] flex-col items-center justify-center gap-2 rounded-[20px] border border-line-medium bg-white px-6 py-8 md:max-w-none" aria-hidden>
          <Icon name="doc" size={40} className="text-ink-cream" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-dim">PDF-Report</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="grid transition-[grid-template-rows] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]" style={{ gridTemplateRows: !open ? "1fr" : "0fr" }}>
          <div className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-3 px-1 pb-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  track("report_form_geoeffnet", { quelle: "cta" });
                  setOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-akzent px-6 py-3 text-sm font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
              >
                <Icon name="doc" size={17} />
                Report als PDF anfordern
              </button>
              {onAnpassen && (
                <button
                  type="button"
                  onClick={onAnpassen}
                  className="rounded-full border border-line-medium px-6 py-3 text-sm text-ink-muted transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-white hover:text-ink-cream"
                >
                  Angaben anpassen
                </button>
              )}
              <button
                type="button"
                onClick={onReset}
                className="rounded-full border border-line-medium px-6 py-3 text-sm text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-transparent hover:bg-white"
              >
                Neue Bewertung
              </button>
            </div>
          </div>
        </div>

        <div className="grid transition-[grid-template-rows] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
          <div className="overflow-hidden">
            <div className="pt-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-white"
                  aria-label="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                  placeholder="Name"
                />
                <input
                  className="w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-white"
                  aria-label="E-Mail"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  placeholder="E-Mail"
                />
                {/* Honeypot — für Menschen unsichtbar */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" />
              </div>

              <label className="mt-3.5 flex items-start gap-2.5 text-left text-xs text-ink-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setError(null);
                  }}
                  style={{ accentColor: "var(--akzent)" }}
                  className="mt-0.5 h-4 w-4"
                />
                <span>
                  Ich willige ein, dass meine Angaben zur Erstellung des Reports und zur Kontaktaufnahme verarbeitet werden. Jederzeit widerrufbar (siehe{" "}
                  <a href="/datenschutz" className="btn-link">
                    Datenschutz
                  </a>
                  ).
                </span>
              </label>

              <div className="mt-4">
                <p className={`mb-3 text-sm text-[#b3402a] transition-opacity duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] ${error ? "opacity-100" : "opacity-0"}`} role="alert">
                  {error ?? " "}
                </p>
                <button
                  key={nonce}
                  type="button"
                  onClick={submit}
                  disabled={busy || borisLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-akzent px-6 py-3.5 text-sm font-medium text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {busy ? (
                    <>
                      <svg className="animate-spin" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                        <path d="M21 12a9 9 0 0 1-9 9" />
                      </svg>
                      Report wird erstellt …
                    </>
                  ) : borisLoading ? (
                    <>
                      <svg className="animate-spin" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                        <path d="M21 12a9 9 0 0 1-9 9" />
                      </svg>
                      Amtliche Daten werden abgeglichen …
                    </>
                  ) : (
                    <>
                      <Icon name="doc" size={17} /> PDF jetzt herunterladen
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-ink-muted">
        Fragen vorab?{" "}
        <a href="mailto:ap@beuwy.com" className="btn-link">
          ap@beuwy.com
        </a>
      </p>
    </div>
  );
}
