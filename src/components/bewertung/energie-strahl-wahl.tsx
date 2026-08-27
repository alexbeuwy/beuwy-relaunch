"use client";

import { useState } from "react";

/**
 * Klickbarer Energieklassen-Farbstrahl (A+–H) — DAS Steuerelement, kein
 * Dropdown daneben. Port aus Riegel `components/energie-strahl-wahl.tsx`;
 * die Riegel-eigenen CSS-Klassen (`.energie-tip`, `.energie-block`,
 * `.energie-pin`) existieren in beuwy nicht — hier stattdessen direkt über
 * Tailwind + die beuwy-Motion-Tokens (--duration-fast/--ease-smooth-out)
 * nachgebaut, gleiche Mikro-UX: Hover hebt den Block hervor, ein verzögert
 * einblendender Tooltip zeigt Klasse + Endenergie-Band, der Auswahl-Pin
 * gleitet zur gewählten Klasse.
 *
 * Der Ausweistyp (Verbrauch/Bedarf) gehört fachlich zur Klasse und wird von
 * der Engine ausgewertet (Bedarfsausweis dämpft den Malus — s.
 * `energieausweis` in lib/bewertung/valuation.ts), deshalb wohnt er hier mit.
 */

export const ENERGIE_KLASSEN = ["A+", "A", "B", "C", "D", "E", "F", "G", "H"] as const;
const FARBEN = ["#0a8f3c", "#2fa23a", "#7cb52e", "#c8c421", "#e8b31d", "#e88f1d", "#e2661b", "#d8401e", "#c22323"];
// Endenergie-Bänder nach GEG Anlage 10 (kWh/m²·a).
const BAENDER = ["≤ 30", "≤ 50", "≤ 75", "≤ 100", "≤ 130", "≤ 160", "≤ 200", "≤ 250", "> 250"];

export type Energieausweis = "" | "verbrauch" | "bedarf";

export function EnergieStrahlWahl({
  wert,
  onChange,
  ausweis,
  onAusweis,
  klein,
}: {
  wert: string;
  onChange: (klasse: string) => void;
  ausweis?: Energieausweis;
  onAusweis?: (a: Energieausweis) => void;
  /** Kompakte Variante für den Wizard (h-8 statt h-10). */
  klein?: boolean;
}) {
  const idx = ENERGIE_KLASSEN.indexOf(wert as (typeof ENERGIE_KLASSEN)[number]);
  const [hoverIdx, setHoverIdx] = useState(-1);
  return (
    <div>
      {/* Feste Zeile für den Tooltip: reserviert die Höhe, damit beim Hover nichts springt. */}
      <div className={`relative ${klein ? "h-5" : "h-6"}`}>
        {hoverIdx >= 0 && (
          <span
            role="presentation"
            className="pointer-events-none absolute top-0 -translate-x-1/2 whitespace-nowrap rounded-full border border-line-medium bg-white px-2 py-0.5 text-[10px] font-medium text-ink-cream shadow-[0_6px_16px_-8px_rgba(20,20,18,0.3)] transition-opacity duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]"
            style={{ left: `calc(${((hoverIdx + 0.5) / ENERGIE_KLASSEN.length) * 100}%)` }}
          >
            {ENERGIE_KLASSEN[hoverIdx]} · {BAENDER[hoverIdx]} kWh/m²·a
          </span>
        )}
      </div>
      <div className="relative">
        <div className={`flex overflow-hidden rounded-lg ${klein ? "h-8" : "h-10"}`} role="radiogroup" aria-label="Energieeffizienzklasse">
          {ENERGIE_KLASSEN.map((k, i) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={wert === k}
              aria-label={`Klasse ${k}`}
              onClick={() => onChange(wert === k ? "" : k)}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx((v) => (v === i ? -1 : v))}
              onFocus={() => setHoverIdx(i)}
              onBlur={() => setHoverIdx((v) => (v === i ? -1 : v))}
              className={`relative flex-1 font-semibold text-black/70 outline-none transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                klein ? "text-[0.6rem]" : "text-[0.65rem]"
              }`}
              style={{ backgroundColor: FARBEN[i], opacity: idx === -1 ? 0.75 : idx === i ? 1 : 0.35 }}
            >
              {k}
            </button>
          ))}
        </div>
        {idx >= 0 && (
          <span
            className="pointer-events-none absolute -top-1 bottom-[-4px] rounded-md border-2 border-ink-cream shadow-[0_0_10px_rgba(22,22,19,0.5)] transition-[left] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]"
            style={{
              left: `calc(${(idx / ENERGIE_KLASSEN.length) * 100}% + 1px)`,
              width: `calc(${100 / ENERGIE_KLASSEN.length}% - 2px)`,
            }}
          />
        )}
      </div>
      {wert && onAusweis && (
        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-muted">
          {(
            [
              { key: "verbrauch", label: "Verbrauchsausweis" },
              { key: "bedarf", label: "Bedarfsausweis" },
            ] as const
          ).map((a) => (
            <label key={a.key} className="flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={ausweis === a.key}
                onChange={() => onAusweis(ausweis === a.key ? "" : a.key)}
                style={{ accentColor: "var(--akzent)" }}
                className="h-3.5 w-3.5"
              />
              {a.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
