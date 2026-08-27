"use client";

import { ErgebnisSchleuse } from "./ErgebnisSchleuse";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { berechneMietwert } from "@/lib/rechner/mietwert";
import {
  type Ausstattung,
  DREI_STUFEN,
  DREI_STUFEN_LABEL,
  type MietwertEingaben,
  type MietwertErgebnis,
  type Objekttyp,
  OBJEKTTYPEN,
  OBJEKTTYP_LABEL,
  RechnerFehler,
  type StadtGroesse,
  STADTGROESSEN,
  STADTGROESSE_LABEL,
  type Zustand,
  ZUSTAENDE,
  ZUSTAND_LABEL,
  formatEuro,
  formatEuroProM2,
} from "@/lib/rechner/typen";
import { bundesweiteBruttomietrendite } from "@/lib/bewertung/marktdaten";
import { ortAusLabel, searchAddress, type GeoResult } from "@/lib/bewertung/geocode";
import { parseDeZahl } from "@/lib/bewertung/parse-de-zahl";
import { track, trackKlick, setAnsicht } from "@/lib/bewertung/track";
import { Icon } from "@/components/bewertung/icon";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mietpreis-Wizard (LEAF P3) — eigenständiger 3-Schritt-Rechner in derselben
 * Dramaturgie wie der Verkaufs-Wizard (components/bewertung/calculator.tsx,
 * selbst ein Port aus Riegel components/calculator/calculator.tsx):
 * Objektart → Lage → Eckdaten, endowed progress (STEP_NODES/PROGRESS_PCT,
 * Knoten 0 „Rechner starten" gilt mit dem Öffnen bereits als erledigt), eine
 * kurze Analyse-Zwischenphase mit progressivem Statuszeilen-Reveal, danach
 * das Ergebnis sofort sichtbar (kein Lead-Gate davor).
 *
 * Rechenkern bleibt ausschließlich src/lib/rechner/mietwert.ts
 * (berechneMietwert) — diese Datei enthält keine eigene Mietpreis-Logik, nur
 * Formular-State, Dramaturgie und Darstellung.
 *
 * Bewusste Vereinfachungen gegenüber dem Verkaufs-Wizard:
 *  - Kein BORIS/Bodenrichtwert, keine Karte, kein Consent-Gate: Miete
 *    braucht keinen Bodenwert, und mietwert.ts nimmt keine Koordinaten.
 *  - „Lage" fragt nur Ort/Adresse (Freitext mit Vorschlägen, für Kontext im
 *    optionalen E-Mail-Lead) plus die von der Engine tatsächlich benötigte
 *    Stadtgröße — keine Adress-Pflichtbestätigung, kein Ortszentrum-
 *    Fallback, keine Karte.
 *  - Kein sessionStorage-Formularstand, keine Browser-History-Sperre: für
 *    einen dreistufigen Marketing-Rechner ohne Umsatzkritikalität liegt das
 *    über dem Wert der zusätzlichen Komplexität (gleiche Abwägung wie im
 *    Verkaufs-Wizard-Kopfkommentar).
 *  - lib/bewertung/marktdaten.ts liefert bei `marktortByOrt` für beuwy IMMER
 *    `undefined` (kein Riegel-artiger Standort-Artikel-Bestand, s. dortiger
 *    PORT-HINWEIS) und `ortsStatsFallback` ist an den 5-wertigen
 *    Verkaufswert-Objektart-Typ sowie an valuation.ts' Plausibilitäts-Deckel
 *    gebunden — berechneMietwert hat gar keinen Parameter, über den sich
 *    eine OrtsStats-Spanne einspeisen ließe. Eine „Verfeinerung" der
 *    Kaltmiete-Spanne ist damit nicht möglich UND nicht nötig: die Engine
 *    rechnet immer pur, ehrlich, ohne vorgetäuschten Orts-Treffer. Additiv
 *    nutzbar ist dagegen `bundesweiteBruttomietrendite` — extra für den
 *    „Ergebnis-Wizard"-Anwendungsfall gebaut (s. Kommentar dort) — als
 *    zusätzliche Kauf-/Miet-Konsistenzzeile in Analyse und Ergebnis.
 *  - Kein JS-Text-Fit-Script für die Ergebniszahl: ein CSS-clamp() reicht.
 */

type Phase = "form" | "analyzing" | "result";

// Vier Fortschritts-Knoten, wie im Verkaufs-Wizard: „Rechner starten" gilt
// mit dem Öffnen bereits als erledigt (psychologischer Vorsprung, endowed
// progress) — die drei Formularschritte folgen.
const STEP_NODES = ["Rechner starten", "Objektart", "Lage", "Eckdaten"];
// Nicht-linearer Fortschritt je Formularschritt (frühe Schritte springen
// weiter) — identische Kurve wie im Verkaufs-Wizard.
const PROGRESS_PCT = [32, 60, 82];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Motion-Tokens (LEAF U6, transitions-dev-Disziplin) — dieselben Konstanten
// wie in ThreadVerlauf.tsx/AufgabenClient.tsx/FlowEditor.tsx: smooth-out für
// Ein-/Ausblenden, bounce nur für Erfolgsmomente (Häkchen-Zeichnung).
const EASE_SMOOTH_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_BOUNCE: [number, number, number, number] = [0.34, 1.36, 0.64, 1];

/** Schrittwechsel im Formular: Enter y+6/fade 0.25s, Exit 0.15s (Schließen
 *  40% schneller als Öffnen) — reduced-motion nur Fade, kein Transform. */
function stepMotionProps(reduce: boolean) {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0, transition: { duration: reduce ? 0.15 : 0.25, ease: EASE_SMOOTH_OUT } },
    exit: { opacity: 0, y: reduce ? 0 : -6, transition: { duration: 0.15, ease: EASE_SMOOTH_OUT } },
  } as const;
}

/** Pop-in für Ergebniszahlen: scale 0.97→1 + fade, fast (0.25s), optional
 *  im 40ms-Rhythmus gestaffelt — reduced-motion nur Fade, kein Transform. */
function popIn(reduce: boolean, delay = 0) {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.25, ease: EASE_SMOOTH_OUT, delay: reduce ? 0 : delay },
  } as const;
}

interface FormState {
  objekttyp: Objekttyp;
  addressQuery: string;
  address: GeoResult | null;
  stadtgroesse: StadtGroesse;
  wohnflaeche: string;
  baujahr: string;
  zustand: Zustand;
  ausstattung: Ausstattung;
}

const EMPTY: FormState = {
  objekttyp: "ETW",
  addressQuery: "",
  address: null,
  stadtgroesse: "mittelstadt",
  wohnflaeche: "",
  baujahr: "",
  zustand: "gepflegt",
  ausstattung: "mittel",
};

// Objekttyp-Kacheln — dieselben Icon-Pfade wie die Objektart-Kacheln des
// Verkaufs-Wizards (wohnung/haus/mehrfamilienhaus, 1:1 übernommen für
// gleiche Bildsprache), reduziert auf die drei Objekttypen, die
// mietwert.ts kennt.
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

/** Objekttyp (ETW/EFH/MFH, rechner/typen.ts) → 'wohnung'/'haus'/
 *  'mehrfamilienhaus' für die additive Bruttomietrendite-Querprobe aus
 *  lib/bewertung/marktdaten.ts — deren Objektart-Parameter stammt aus dem
 *  5-wertigen Verkaufswert-Typ (s. Dateikopf). */
function objektartFuerRendite(o: Objekttyp): "wohnung" | "haus" | "mehrfamilienhaus" {
  if (o === "MFH") return "mehrfamilienhaus";
  if (o === "EFH") return "haus";
  return "wohnung";
}

const inputCls =
  "w-full rounded-[10px] border border-line-medium bg-white px-4 py-2.5 text-[14.5px] text-ink-cream outline-none transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] placeholder:text-ink-dim focus:border-transparent focus:bg-akzent-wash";

function useCountUp(target: number, run: boolean, dur = 1200) {
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

interface QuellenZeile {
  label: string;
  sub: string;
  wert: string;
}

/**
 * Reveal-Liste der Analyse-Phase — bewusst aus dem ECHTEN Rechenweg von
 * berechneMietwert() aufgebaut (dessen `schritte`), statt einer erfundenen
 * Quellen-Liste wie im Verkaufs-Wizard (der dort BORIS/Marktdaten wirklich
 * asynchron abruft): mietwert.ts ist eine reine, synchrone Funktion, das
 * Ergebnis steht schon vor der Analyse-Animation fest. Die Reveal-Liste
 * inszeniert also die tatsächliche Rechnung Schritt für Schritt, statt eine
 * Ladezeit vorzutäuschen, die es fachlich nicht gibt.
 */
function buildQuellen(f: FormState, ergebnis: MietwertErgebnis, ort: string): QuellenZeile[] {
  const zeilen: QuellenZeile[] = [
    {
      label: "Lage & Stadtgröße einordnen",
      sub: "Angaben werden zugeordnet",
      wert: `${ort || "Ihre Lage"} · ${STADTGROESSE_LABEL[f.stadtgroesse]}`,
    },
  ];
  for (const schritt of ergebnis.schritte) {
    zeilen.push({
      label: schritt.label,
      sub: schritt.label.startsWith("Hinweis") ? "Rechtlicher Hinweis wird geprüft" : "wird eingerechnet",
      wert: schritt.wert,
    });
  }
  const rendite = bundesweiteBruttomietrendite(f.stadtgroesse, objektartFuerRendite(f.objekttyp));
  zeilen.push({
    label: "Bruttomietrendite (bundesweiter Richtwert)",
    sub: "Kauf-/Mietvergleich wird geprüft",
    wert: `${rendite.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`,
  });
  return zeilen;
}

export function MietWizard() {
  const reduceMotion = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>("form");
  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [errorNonce, setErrorNonce] = useState(0);
  const [result, setResult] = useState<MietwertErgebnis | null>(null);
  const [eingaben, setEingaben] = useState<MietwertEingaben | null>(null);
  const [revealed, setRevealed] = useState(0);

  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [searching, setSearching] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const userNav = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fokus-Management: bei NUTZER-Schrittwechsel zur neuen Überschrift
  // springen (nicht beim Initial-Mount). Als Ref-Callback statt useEffect(
  // [step, phase]): AnimatePresence mode="wait" (LEAF U6) hängt die neue
  // Schrittüberschrift erst NACH der Exit-Animation des alten Schritts ein —
  // ein Effect auf [step, phase] würde noch die verschwindende Überschrift
  // fokussieren. Der Ref-Callback feuert exakt beim tatsächlichen Mount.
  const setHeadingRef = (el: HTMLHeadingElement | null) => {
    headingRef.current = el;
    if (el && userNav.current) {
      userNav.current = false;
      el.focus();
    }
  };

  useEffect(() => {
    setAnsicht(
      phase === "analyzing"
        ? "analyse"
        : phase === "result"
          ? "ergebnis"
          : (["objektart", "standort", "eckdaten"] as const)[step] ?? "seite",
    );
  }, [phase, step]);

  // Adress-Vorschläge — debounced, abbrechbar. Freitext bleibt gültig: die
  // Engine braucht keine Koordinaten, ein bestätigter Vorschlag ist reine
  // Komfort-/Lead-Qualität, kein Zwang.
  useEffect(() => {
    if (f.address && f.addressQuery === f.address.label) return;
    const q = f.addressQuery;
    if (q.trim().length < 3) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Debounce-Reset bei zu kurzer Query
      setSuggestions([]);
      return;
    }
    const ctrl = new AbortController();
    setSearching(true);
    const t = setTimeout(async () => {
      const res = await searchAddress(q, ctrl.signal);
      if (!ctrl.signal.aborted) {
        setSuggestions(res);
        setSearching(false);
      }
    }, 350);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [f.addressQuery, f.address]);

  useEffect(() => {
    if (phase === "form") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  function validateLage(): string | null {
    if (f.addressQuery.trim().length < 2) return "Bitte Ort oder Adresse angeben.";
    return null;
  }

  function validateEckdaten(): string | null {
    const wfl = parseDeZahl(f.wohnflaeche);
    if (wfl == null) return "Bitte die Wohnfläche als Zahl angeben (z. B. 70 oder 82,5).";
    const bj = parseDeZahl(f.baujahr);
    if (bj == null) return "Bitte das Baujahr als Zahl angeben (z. B. 1998).";
    // Echte Engine-Validierung statt doppelter Grenzwert-Logik — dieselben
    // Meldungen, die auch startAnalysis() bekäme (s. dort).
    try {
      berechneMietwert({
        wohnflaeche: wfl,
        baujahr: bj,
        objekttyp: f.objekttyp,
        zustand: f.zustand,
        ausstattung: f.ausstattung,
        stadtgroesse: f.stadtgroesse,
      });
      return null;
    } catch (e) {
      return e instanceof RechnerFehler ? e.message : "Bitte die Eingaben prüfen.";
    }
  }

  function next() {
    const err = step === 1 ? validateLage() : step === 2 ? validateEckdaten() : null;
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
    const wfl = parseDeZahl(f.wohnflaeche);
    const bj = parseDeZahl(f.baujahr);
    if (wfl == null || bj == null) return; // durch validateEckdaten bereits ausgeschlossen
    const ein: MietwertEingaben = {
      wohnflaeche: wfl,
      baujahr: bj,
      objekttyp: f.objekttyp,
      zustand: f.zustand,
      ausstattung: f.ausstattung,
      stadtgroesse: f.stadtgroesse,
    };
    let ergebnis: MietwertErgebnis;
    try {
      ergebnis = berechneMietwert(ein);
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

  const ort = f.address?.city || ortAusLabel(f.addressQuery) || f.addressQuery.trim();
  const quellen = useMemo(() => (result ? buildQuellen(f, result, ort) : []), [result, f, ort]);

  useEffect(() => {
    if (phase !== "analyzing") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepMs = reduce ? 90 : 480;
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
    setSuggestions([]);
    setPhase("form");
  }

  /** „Angaben anpassen" aus dem Ergebnis: zurück zu den Eckdaten, ohne Reset. */
  function angabenAnpassen() {
    userNav.current = true;
    setError(null);
    setPhase("form");
    setStep(2);
  }

  if (phase === "analyzing")
    return <Analyzing quellen={quellen} revealed={revealed} f={f} ort={ort} sectionRef={sectionRef} />;
  if (phase === "result" && result && eingaben)
    return (
      <ErgebnisSchleuse tool="mietpreis" eingaben={eingaben} ergebnis={result}>
        <Ergebnis
          f={f}
          eingaben={eingaben}
          result={result}
          onReset={reset}
          onAnpassen={angabenAnpassen}
          sectionRef={sectionRef}
        />
      </ErgebnisSchleuse>
    );

  const currentNode = step + 1; // Knoten 0 „Rechner starten" ist mit dem Öffnen erledigt
  const pct = PROGRESS_PCT[step] ?? PROGRESS_PCT[0];

  return (
    <div className="mx-auto max-w-3xl" data-track-bereich="formular" onClickCapture={trackKlick}>
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs">
          <span className="uppercase tracking-[0.2em] text-ink-dim">Schritt {currentNode + 1} von 4</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line-medium bg-akzent-wash px-2.5 py-1 font-medium text-ink-cream">
            <svg
              viewBox="0 0 24 24"
              width={11}
              height={11}
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
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
                      done
                        ? "border-akzent bg-akzent text-ink-cream"
                        : current
                          ? "border-ink-cream text-ink-cream"
                          : "border-line-medium text-ink-dim"
                    }`}
                  >
                    {done ? (
                      <svg
                        viewBox="0 0 24 24"
                        width={13}
                        height={13}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m5 12 4 4 10-10" />
                      </svg>
                    ) : (
                      <span aria-hidden="true">{d + 1}</span>
                    )}
                    <span className="sr-only">
                      {`Schritt ${d + 1} von 4: ${label}${current ? " (aktuell)" : done ? " (abgeschlossen)" : ""}`}
                    </span>
                  </div>
                  <span
                    className={`hidden truncate text-xs sm:inline ${
                      current ? "font-medium text-ink-cream" : done ? "text-ink-muted" : "text-ink-dim"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {d < STEP_NODES.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={`h-px flex-1 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${d < currentNode ? "bg-akzent" : "bg-line-subtle"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-[24px] border border-line-subtle bg-white p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
        {step === 0 && (
          <motion.div key={step} className="space-y-6" {...stepMotionProps(reduceMotion)}>
            <h2 ref={setHeadingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Was möchten Sie vermieten?
            </h2>
            <div className="grid grid-cols-3 gap-3">
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
                        {OBJEKTTYP_ICON[o]}
                      </svg>
                    </span>
                    <span
                      className={`text-[0.8rem] font-medium leading-tight tracking-tight ${
                        selected ? "text-ink-cream" : "text-ink-muted group-hover:text-ink-cream"
                      }`}
                    >
                      {OBJEKTTYP_LABEL[o]}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key={step} className="space-y-6" {...stepMotionProps(reduceMotion)}>
            <h2 ref={setHeadingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Wo liegt die Immobilie?
            </h2>
            <div className="relative">
              <input
                className={inputCls}
                value={f.addressQuery}
                onChange={(e) => {
                  set("addressQuery", e.target.value);
                  if (f.address) set("address", null);
                }}
                placeholder="Straße, Ort oder PLZ eingeben…"
                autoComplete="off"
                aria-label="Ort oder Adresse"
              />
              {searching && (
                <div role="status" aria-live="polite" className="absolute right-3 top-3 text-xs text-ink-dim">
                  sucht…
                </div>
              )}
              {searching && !f.address && suggestions.length === 0 && (
                <div
                  aria-hidden="true"
                  className="absolute z-20 mt-2 w-full space-y-2.5 overflow-hidden rounded-[12px] border border-line-medium bg-white px-4 py-3.5 shadow-[0_18px_50px_-20px_rgba(20,20,18,0.35)]"
                >
                  <Skeleton className="h-3.5 w-[78%]" />
                  <Skeleton className="h-3.5 w-[58%]" />
                  <Skeleton className="h-3.5 w-[66%]" />
                </div>
              )}
              {suggestions.length > 0 && !f.address && (
                <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-[12px] border border-line-medium bg-white shadow-[0_18px_50px_-20px_rgba(20,20,18,0.35)]">
                  {suggestions.map((s) => (
                    <li key={`${s.lat},${s.lng}`}>
                      <button
                        type="button"
                        onClick={() => {
                          set("address", s);
                          set("addressQuery", s.label);
                          setSuggestions([]);
                        }}
                        className="block w-full px-4 py-3 text-left text-sm text-ink-muted transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-wash hover:text-ink-cream"
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {f.address && (
              <div className="flex items-center gap-2.5 rounded-[14px] border border-line-medium bg-akzent-wash px-3.5 py-2.5 text-sm text-ink-cream">
                <Icon name="pin" size={15} className="shrink-0" />
                <span className="min-w-0 flex-1 truncate">{f.address.label}</span>
              </div>
            )}

            <PillGruppe label="Stadtgröße" optionen={STADTGROESSEN} labelMap={STADTGROESSE_LABEL} wert={f.stadtgroesse} onChange={(v) => set("stadtgroesse", v)} />
            <p className="text-xs text-ink-dim">
              Grobe Einwohnerklasse: Kleinstadt bis 20.000 · Mittelstadt bis 100.000 · Großstadt bis 500.000 · Metropole darüber.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key={step} className="space-y-6" {...stepMotionProps(reduceMotion)}>
            <h2 ref={setHeadingRef} tabIndex={-1} className="font-display text-xl font-semibold text-ink-cream outline-none">
              Eckdaten der Immobilie
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Wohnfläche (m²)">
                <input className={inputCls} inputMode="decimal" value={f.wohnflaeche} onChange={(e) => set("wohnflaeche", e.target.value)} placeholder="z. B. 70" />
              </Field>
              <Field label="Baujahr">
                <input className={inputCls} inputMode="numeric" value={f.baujahr} onChange={(e) => set("baujahr", e.target.value)} placeholder="z. B. 1998" />
              </Field>
            </div>
            <PillGruppe label="Zustand" optionen={ZUSTAENDE} labelMap={ZUSTAND_LABEL} wert={f.zustand} onChange={(v) => set("zustand", v)} />
            <PillGruppe label="Ausstattung" optionen={DREI_STUFEN} labelMap={DREI_STUFEN_LABEL} wert={f.ausstattung} onChange={(v) => set("ausstattung", v)} />
          </motion.div>
        )}
        </AnimatePresence>

        <div className="mt-5">
          <p
            className={`text-sm text-[#b3402a] transition-opacity duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] ${error ? "opacity-100" : "opacity-0"}`}
            role="alert"
          >
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
            {step < 2 ? "Weiter" : "Miete berechnen"}
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
  ort,
  sectionRef,
}: {
  quellen: QuellenZeile[];
  revealed: number;
  f: FormState;
  ort: string;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const pct = quellen.length ? Math.round((revealed / quellen.length) * 100) : 0;
  return (
    <div
      ref={sectionRef}
      className="overflow-hidden rounded-[24px] border border-line-subtle bg-white"
      role="status"
      aria-live="polite"
      aria-busy={pct < 100}
    >
      <span className="sr-only">Miete wird berechnet, {pct} Prozent.</span>
      <div className="mx-auto max-w-2xl px-6 py-14">
        <div className="text-center">
          <div className="font-display text-sm uppercase tracking-[0.25em] text-ink-cream">Analyse läuft</div>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-cream">
            {OBJEKTTYP_LABEL[f.objekttyp]} in {ort || "Ihrer Lage"}
          </h2>
          <p className="mt-2 text-sm text-ink-muted">{f.address?.label || f.addressQuery}</p>
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
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] ${
                      done ? "bg-akzent text-ink-cream" : "border border-line-medium text-ink-muted"
                    }`}
                  >
                    {done ? (
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <motion.path
                          d="M3 7.2l2.8 2.8L11 4"
                          stroke="currentColor"
                          strokeWidth={1.8}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE_BOUNCE }}
                        />
                      </svg>
                    ) : active ? (
                      "…"
                    ) : (
                      ""
                    )}
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
          {pct}% — {revealed}/{quellen.length} Datenpunkte ausgewertet
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
  eingaben: MietwertEingaben;
  result: MietwertErgebnis;
  onReset: () => void;
  /** Zurück zu den Eckdaten, ohne die Eingaben zu verlieren. */
  onAnpassen: () => void;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const idBasis = useId();
  const reduceMotion = useReducedMotion() ?? false;
  const mid = useCountUp(result.mittelwertEuro, true);
  const proM2 = result.mittelwertEuro / eingaben.wohnflaeche;
  const rangePos =
    result.bisEuro > result.vonEuro ? ((result.mittelwertEuro - result.vonEuro) / (result.bisEuro - result.vonEuro)) * 100 : 50;
  const bremseHinweis = result.mietpreisbremse
    ? result.schritte.find((s) => s.label === "Hinweis Mietpreisbremse")?.wert
    : undefined;

  const [rechenwegOffen, setRechenwegOffen] = useState(false);
  const rechenwegPanelId = `${idBasis}-rechenweg`;

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
        body: JSON.stringify({ tool: "mietpreis", eingaben, ergebnis: result, name, email, website }),
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
    <div
      ref={sectionRef}
      className="overflow-hidden rounded-[24px] border border-line-subtle bg-white"
      data-track-bereich="ergebnis"
      onClickCapture={trackKlick}
    >
      <div className="px-6 py-12 sm:px-8">
        <div className="overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated px-6 py-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line-medium bg-white py-1.5 pl-1.5 pr-3.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-akzent text-ink-cream">
              <Icon name="euro" size={14} />
            </span>
            <span className="whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.1em] text-ink-cream sm:text-[0.7rem] sm:tracking-[0.2em]">
              Kaltmiete, monatlich
            </span>
          </div>

          <motion.div
            aria-hidden
            className="mt-5 font-display leading-none tnum text-ink-cream"
            style={{ fontSize: "clamp(26px, 6vw, 52px)" }}
            {...popIn(reduceMotion, 0)}
          >
            {formatEuro(mid)}
          </motion.div>
          <span className="sr-only">Geschätzte Kaltmiete: {formatEuro(result.mittelwertEuro)}</span>

          <motion.div className="mt-3 text-sm text-ink-muted sm:text-base" {...popIn(reduceMotion, 0.05)}>
            Spanne {formatEuro(result.vonEuro)} – {formatEuro(result.bisEuro)}
          </motion.div>
          <motion.p className="mt-1 text-sm text-ink-muted tnum" {...popIn(reduceMotion, 0.09)}>
            Ø {formatEuroProM2(proM2, 2)}
          </motion.p>

          <div className="relative mx-auto mt-6 h-2 max-w-md rounded-full bg-white">
            <div className="absolute inset-y-0 left-[8%] right-[8%] rounded-full bg-gradient-to-r from-akzent/30 via-akzent to-akzent/30" />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-akzent shadow-[0_2px_6px_rgba(20,20,18,0.25)]"
              style={{ left: `${8 + rangePos * 0.84}%` }}
            />
          </div>

          {bremseHinweis && (
            <div className="mt-6 rounded-r-[10px] border-l-2 border-akzent bg-white py-3 pl-4 pr-3 text-left">
              <p className="text-[13.5px] text-ink-cream">{bremseHinweis}</p>
            </div>
          )}

          <p className="mt-4 text-xs text-ink-dim">{result.hinweis}</p>
        </div>

        {/* Rechenweg — .faq-item/.faq-trigger/.faq-panel (globals.css), wie im Verkaufspreisrechner */}
        <div className="faq-item mt-8 border-t border-line-subtle" data-open={rechenwegOffen ? "true" : "false"}>
          <button
            type="button"
            className="faq-trigger !py-3.5"
            aria-expanded={rechenwegOffen}
            aria-controls={rechenwegPanelId}
            onClick={() => setRechenwegOffen((v) => !v)}
          >
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
          <button
            type="button"
            onClick={onAnpassen}
            className="text-sm text-ink-muted transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
          >
            Angaben anpassen
          </button>
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-ink-muted transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
          >
            Neue Berechnung
          </button>
        </div>

        {/* ── Auswertung per E-Mail (optional, kein Gate) ─────────── */}
        <div className="mt-6 border-t border-line-subtle pt-6">
          {gesendet ? (
            <div>
              <p className="t-h3">Auswertung ist unterwegs.</p>
              <p className="t-body mt-2">
                Wir schicken die detaillierte Auswertung an <span className="font-medium text-ink-cream">{email}</span>.
              </p>
              {gesendet.demo && (
                <p className="t-small is-fail mt-3">Hinweis: Der Mail-Versand ist in dieser Vorschau noch nicht aktiviert.</p>
              )}
            </div>
          ) : (
            <form onSubmit={mailAnfordern} noValidate>
              <p className="t-small font-medium !text-ink-cream">Detaillierte Auswertung als E-Mail</p>
              <p className="t-small mt-1.5">Rechenweg, Spanne und Annahmen als Zusammenfassung — freiwillig, für später.</p>

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
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
              />

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
                  Ich willige ein, dass meine Angaben zur Zustellung der Auswertung verarbeitet werden. Jederzeit
                  widerrufbar (siehe{" "}
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
          Modellrechnung auf Basis von Objekttyp, Stadtgröße, Zustand, Ausstattung und Baujahr — kein Mietspiegel und
          keine ortsübliche Vergleichsmiete im Sinne des BGB.
        </p>
      </div>
    </div>
  );
}

/* ── Formular-Bausteine ─────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[13px] text-ink-muted">{label}</span>
      {children}
    </label>
  );
}

function PillGruppe<T extends string>({
  label,
  optionen,
  labelMap,
  wert,
  onChange,
}: {
  label: string;
  optionen: readonly T[];
  labelMap: Record<T, string>;
  wert: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="t-label mb-2.5">{label}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {optionen.map((option) => {
          const aktiv = wert === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={aktiv}
              className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring) ${
                aktiv
                  ? "border-transparent bg-akzent text-ink-cream"
                  : "border-line-medium bg-white text-ink-muted hover:border-transparent hover:bg-akzent-wash hover:text-ink-cream"
              }`}
            >
              {labelMap[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
