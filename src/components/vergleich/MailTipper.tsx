"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mail-Kachel im Aha-Vergleich (Karte 2, beuwy): zeigt, dass jede Mail
 * pro Empfänger neu geschrieben wird. Die Variablen-Chips tragen
 * bewusst verschiedene Pastellfarben statt nur Gelb — Ausnahme vom
 * Nur-Gelb-Gebot (Alex, 31.08: "lauter bunte Variablen"), weil es sich
 * um die Abbildung eines Produkts (ein Mail-Template mit Merge-Feldern)
 * handelt, kein Site-UI-Element.
 */
const CHIP_FARBEN = {
  gelb: "var(--akzent)",
  mint: "#d7f0e2",
  flieder: "#e6e0f7",
  himmel: "#dcebf9",
  rose: "#f7e2e6",
} as const;

type Zeilenteil = { text: string; farbe?: string };

const TEMPLATE_ZEILE: Zeilenteil[] = [
  { text: "Betreff:" },
  { text: "{{anrede}}", farbe: CHIP_FARBEN.gelb },
  { text: "— Ihr Exposé" },
  { text: "{{objekt.strasse}}", farbe: CHIP_FARBEN.mint },
  { text: "wurde heute" },
  { text: "{{oeffnungen.heute}}", farbe: CHIP_FARBEN.flieder },
  { text: "Mal geöffnet ·" },
  { text: "{{finanzierung.status}}", farbe: CHIP_FARBEN.himmel },
  { text: "· Richtpreis" },
  { text: "{{preis|förmlich}}", farbe: CHIP_FARBEN.rose },
];

type CaretPhase = "wartet" | "tippt" | "blinkt" | "fertig";

const TIPPGESCHWINDIGKEIT_MS = 22;

export function MailTipper({ titel, satz }: { titel: string; satz: string }) {
  const rahmen = useRef<HTMLDivElement>(null);
  const [gestartet, setGestartet] = useState(false);
  const [angezeigt, setAngezeigt] = useState("");
  const [phase, setPhase] = useState<CaretPhase>("wartet");

  // Startet erst, wenn die Karte im Viewport steht — oder bei
  // reduzierter Bewegung direkt den fertigen Satz ohne Caret.
  useEffect(() => {
    const node = rahmen.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAngezeigt(satz);
      setPhase("fertig");
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGestartet(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [satz]);

  // Zeichenweises Tippen — Cleanup beendet das Interval sicher beim
  // Unmount oder wenn sich der Satz ändert (Studio-Bearbeitung).
  useEffect(() => {
    if (!gestartet) return;
    setPhase("tippt");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setAngezeigt(satz.slice(0, i));
      if (i >= satz.length) {
        window.clearInterval(id);
        setPhase("blinkt");
      }
    }, TIPPGESCHWINDIGKEIT_MS);
    return () => window.clearInterval(id);
  }, [gestartet, satz]);

  const caretSichtbar = phase === "tippt" || phase === "blinkt";

  return (
    <div ref={rahmen} className="h-full rounded-[24px] bg-[#161613] p-6 lg:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <p className="font-mono text-[11px] text-white/40">an: eigentuemer@…</p>
      </div>

      <p className="mt-5 text-[13px] font-medium text-white/80">{titel}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {TEMPLATE_ZEILE.map((teil, i) =>
          teil.farbe ? (
            <span
              key={i}
              className="rounded-md px-1.5 py-0.5 font-mono text-[11px] text-ink-cream"
              style={{ background: teil.farbe }}
            >
              {teil.text}
            </span>
          ) : (
            <span key={i} className="text-[12px] text-white/50">
              {teil.text}
            </span>
          )
        )}
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        {/* Für Screenreader steht der volle Satz einmal fest; die
            getippte Ausgabe daneben ist rein visuell. */}
        <p className="sr-only">{satz}</p>
        <p aria-hidden className="text-[14.5px] leading-relaxed text-white/95">
          {angezeigt}
          {caretSichtbar && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[0.15em] animate-pulse bg-[var(--akzent)] align-text-bottom"
              // Während des Tippens blinkt der Caret endlos, danach noch
              // exakt 3× — animationend feuert nach der letzten Iteration,
              // kein Timer nötig. Keine eigenen Keyframes (BRIEF: nur
              // Motion-Tokens/Tailwind-Utilities, kein lokales <style>).
              style={{ animationIterationCount: phase === "blinkt" ? 3 : "infinite" }}
              onAnimationEnd={() => {
                if (phase === "blinkt") setPhase("fertig");
              }}
            />
          )}
        </p>
      </div>
    </div>
  );
}
