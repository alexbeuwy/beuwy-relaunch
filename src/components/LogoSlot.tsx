"use client";

import { useState } from "react";

/**
 * Markentypo je Haus (umgezogen aus MaklerHero.tsx, BRIEF §5): Serif für
 * die klassischen Häuser, gesperrte Caps für die Netzwerke, Mixed Case
 * für die jüngeren Marken. Unbekannte Namen bekommen einen neutralen
 * Default-Stil. Das ist der Fallback-Zustand von LogoSlot, solange keine
 * echte SVG unter public/logos/<slug>.svg liegt.
 */
const WORTMARKEN_STIL: Record<string, string> = {
  "ENGEL & VÖLKERS": "font-serif uppercase tracking-[0.06em] text-[15px]",
  "VON POLL IMMOBILIEN": "font-serif uppercase tracking-[0.08em] text-[13.5px]",
  "DAHLER & COMPANY": "font-serif uppercase tracking-[0.2em] text-[13.5px]",
  KENSINGTON: "uppercase tracking-[0.28em] text-[12.5px] font-medium",
  "RE/MAX": "uppercase tracking-[0.05em] text-[15px] font-bold",
  McMakler: "text-[16px] font-semibold tracking-[-0.01em]",
  Homeday: "text-[16px] font-semibold tracking-[-0.01em]",
  BETTERHOMES: "uppercase tracking-[0.2em] text-[12.5px] font-medium",
};

export function Wortmarke({ name }: { name: string }) {
  const stilKlasse =
    WORTMARKEN_STIL[name] ?? "uppercase tracking-[0.16em] text-[12.5px] font-medium";
  return (
    <span
      className={`whitespace-nowrap leading-none text-[#A9A9A3] ${stilKlasse}`}
      style={
        stilKlasse.includes("font-serif")
          ? { fontFamily: "Georgia, 'Times New Roman', serif" }
          : undefined
      }
    >
      {name}
    </span>
  );
}

/**
 * Upgradefähige Logo-Leiste (GOAL Kriterium 5, BRIEF §5): bevorzugt eine
 * echte SVG unter public/logos/<slug>.svg — legt Alex nach Freigabe eine
 * ab, ersetzt sie automatisch die Wortmarke-Typo, ohne Code-Änderung.
 * Bis dahin (oder bei 404) fällt onError auf die bestehende
 * Wortmarke-Anmutung zurück. "use client", weil onError einen
 * Event-Handler im Browser braucht — deshalb eigene Datei, damit
 * MaklerElemente.tsx server-only bleibt. Die Slug-Map (MARKEN_SLUGS) und
 * slugifyMarke() sind reine Daten/Funktionen ohne Client-Bedarf und
 * liegen deshalb serverseitig in MaklerElemente.tsx — ein Server-
 * Component-Baum darf keine Funktion aus einem "use client"-Modul
 * aufrufen, nur dessen Komponenten rendern.
 */
export function LogoSlot({ name, slug }: { name: string; slug: string }) {
  const [fehlt, setFehlt] = useState(false);

  if (fehlt) {
    return <Wortmarke name={name} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- lokale SVG, Fallback via onError
    <img
      src={`/logos/${slug}.svg`}
      alt={name}
      height={20}
      onError={() => setFehlt(true)}
      className="h-5 w-auto [filter:grayscale(1)_opacity(0.55)]"
    />
  );
}
