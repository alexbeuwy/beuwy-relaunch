"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ExposeWechsler — die "Exposé auf Knopfdruck"-Kachel der beuwy-Karte
 * (R8, Alex 31.08: "Ein Exposé, bei dem sich Name, Adresse und das
 * Satellitenbild im Header die ganze Zeit per Swipe ändern").
 *
 * Ein weißes Mini-Exposé im beuwy-Kleid; der Kopf (Objektname,
 * Adresse, Karten-Kachel) wischt alle ~2,8 s zur nächsten Identität —
 * dieselbe Vorlage, drei völlig verschiedene Objekte. Genau das ist
 * das Argument: individuelles Material, automatisch erzeugt.
 *
 * Mechanik wie RotationsWort (etablierter Ambient-Loop): Timer nur
 * solange die Kachel im Viewport ist, Übergänge über die Motion-
 * Tokens, prefers-reduced-motion zeigt statisch das erste Objekt.
 * Die "Satelliten"-Kachel ist ein Inline-SVG (abstrahierte Luftbild-
 * Blöcke), kein echtes Kartenmaterial — bewusst, keine Fremd-Tiles.
 */

type Objekt = {
  name: string;
  ort: string;
  preis: string;
  flaeche: string;
  /** Grün-/Grauton-Mix der Luftbild-Kachel */
  toene: [string, string, string];
};

const OBJEKTE: Objekt[] = [
  {
    name: "Stadtvilla am Luisenpark",
    ort: "Mannheim · Oststadt",
    preis: "1.240.000 €",
    flaeche: "212 m²",
    toene: ["#b9cfae", "#dcd8cd", "#8fae87"],
  },
  {
    name: "Penthouse Rheinblick",
    ort: "Speyer · Altstadt",
    preis: "890.000 €",
    flaeche: "148 m²",
    toene: ["#c7d3d6", "#d8d4c8", "#9db3b8"],
  },
  {
    name: "Doppelhaushälfte im Grünen",
    ort: "Schifferstadt",
    preis: "648.000 €",
    flaeche: "132 m²",
    toene: ["#aec9a2", "#d5d2c6", "#87a37e"],
  },
];

/** Abstrahiertes Luftbild: Parzellen-Blöcke, eine helle Straße, gelber Pin. */
function LuftbildKachel({ toene, index }: { toene: [string, string, string]; index: number }) {
  // Drei feste Parzellen-Layouts, damit jedes Objekt anders "liegt".
  const layouts = [
    [
      [2, 2, 24, 16], [30, 4, 30, 22], [64, 2, 32, 18], [4, 38, 40, 24], [50, 34, 46, 28],
    ],
    [
      [2, 2, 40, 20], [48, 4, 22, 26], [74, 2, 22, 20], [2, 40, 26, 22], [34, 36, 60, 26],
    ],
    [
      [2, 4, 30, 26], [38, 2, 26, 18], [70, 6, 26, 24], [4, 44, 52, 20], [62, 38, 34, 26],
    ],
  ] as const;
  const layout = layouts[index % layouts.length];
  return (
    <svg viewBox="0 0 100 70" className="h-full w-full" aria-hidden>
      <rect width="100" height="70" fill={toene[1]} />
      {layout.map(([x, y, b, h], i) => (
        <rect key={i} x={x} y={y} width={b} height={h} rx="2.5" fill={i % 2 === 0 ? toene[0] : toene[2]} />
      ))}
      {/* Straße */}
      <path
        d={index === 1 ? "M0,32 C30,30 66,36 100,31" : "M0,34 C36,38 62,28 100,33"}
        stroke="#f3efe6"
        strokeWidth="5"
        fill="none"
      />
      {/* Pin auf dem Objekt */}
      <circle cx={index === 0 ? 58 : index === 1 ? 40 : 72} cy={index === 2 ? 48 : 18} r="5.5" fill="var(--akzent)" stroke="#161613" strokeWidth="1.4" />
    </svg>
  );
}

export function ExposeWechsler({ titel }: { titel: string }) {
  const [aktiv, setAktiv] = useState(0);
  const [wechselt, setWechselt] = useState(false);
  const huelle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = huelle.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const beob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !timer) {
          timer = setInterval(() => {
            // Zweiphasig: erst rauswischen, dann Inhalt tauschen und reinwischen.
            setWechselt(true);
            // 360 ms = knapp nach Ende der 350ms-Auswisch-Transition
            setTimeout(() => {
              setAktiv((a) => (a + 1) % OBJEKTE.length);
              setWechselt(false);
            }, 360);
          }, 2800);
        } else if (!e.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.35 },
    );
    beob.observe(el);
    return () => {
      if (timer) clearInterval(timer);
      beob.disconnect();
    };
  }, []);

  const o = OBJEKTE[aktiv];

  return (
    <div ref={huelle} className="flex h-full flex-col rounded-[24px] bg-white p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="t-label">{titel}</p>
        <span className="shrink-0 rounded-full bg-akzent px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-ink-cream">
          Ihr Logo
        </span>
      </div>

      {/* Wechselnder Exposé-Kopf: Karte + Objektdaten wischen gemeinsam */}
      <div className="mt-4 overflow-hidden">
        <div
          className={`flex items-center gap-4 transition-[transform,opacity] duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)] ${
            wechselt ? "-translate-x-5 opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <div className="h-[72px] w-[104px] shrink-0 overflow-hidden rounded-xl border border-line-subtle">
            <LuftbildKachel toene={o.toene} index={aktiv} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink-cream">
              {o.name}
            </p>
            <p className="t-small mt-0.5 truncate">{o.ort}</p>
            <div className="mt-1.5 flex items-center gap-3">
              <span className="tnum font-mono text-[12.5px] font-semibold text-ink-cream">{o.preis}</span>
              <span className="tnum font-mono text-[12.5px] text-ink-dim">{o.flaeche}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statischer Rumpf: dieselbe Vorlage traegt jedes Objekt */}
      <div className="mt-4 flex flex-col gap-2 border-t border-line-subtle pt-4">
        <div className="h-2 w-[88%] rounded-full bg-bg-elevated" />
        <div className="h-2 w-[72%] rounded-full bg-bg-elevated" />
        <div className="flex items-center gap-2 pt-1.5">
          <span className="h-5 rounded-full bg-akzent px-2 text-[9px] font-semibold uppercase leading-5 tracking-[0.07em] text-ink-cream">
            Lage
          </span>
          <span className="h-5 rounded-full border border-line-subtle px-2 text-[9px] font-medium uppercase leading-5 tracking-[0.07em] text-ink-dim">
            Energie
          </span>
          <span className="h-5 rounded-full border border-line-subtle px-2 text-[9px] font-medium uppercase leading-5 tracking-[0.07em] text-ink-dim">
            Rendite
          </span>
        </div>
      </div>
      <p className="t-small mt-auto pt-4 !text-ink-dim">
        Eine Vorlage, jedes Objekt neu eingekleidet — automatisch.
      </p>
    </div>
  );
}
