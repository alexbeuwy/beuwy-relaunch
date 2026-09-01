"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mail-Kachel im Aha-Vergleich (Karte 2, beuwy): tippt im Loop FÜNF
 * verschiedene Makler-Mails — Eigentümer-Update, Straßen-Farming,
 * Käufer-Merkliste, Kapitalanleger, Kauf-Jahrestag. Genau die Sorte
 * Anlass, die heute kaum ein Büro automatisiert bespielt (R8, Alex
 * 31.08: "4-5 verschiedene Mails, Variablen die sich ändern,
 * realistisch gebraucht und selten genutzt").
 *
 * Ablauf pro Mail: tippen → 2,6 s stehen lassen → rückwärts löschen →
 * Template-Chips wechseln mit → nächste Mail. Timer läuft nur im
 * Viewport, reduced-motion zeigt Mail 1 statisch komplett.
 *
 * Die Sätze kommen als Studio-Keys (mk.vgl.bw.mail_satz1–5) über die
 * Props; die Chip-Zeilen sind Produktabbildung (Merge-Feld-Struktur)
 * und bleiben im Code. Bunte Pastell-Chips = dokumentierte Ausnahme
 * vom Nur-Gelb-Gebot (Alex 31.08, Produktabbildung, kein Site-UI).
 */
const CHIP_FARBEN = {
  gelb: "var(--akzent)",
  mint: "#d7f0e2",
  flieder: "#e6e0f7",
  himmel: "#dcebf9",
  rose: "#f7e2e6",
} as const;

type Zeilenteil = { text: string; farbe?: string };

/** Betreff-/Template-Zeile je Mail-Szenario — Index = Satz-Index. */
const TEMPLATES: { an: string; zeile: Zeilenteil[] }[] = [
  {
    an: "an: eigentuemer@…",
    zeile: [
      { text: "Betreff:" },
      { text: "{{anrede}}", farbe: CHIP_FARBEN.gelb },
      { text: "— Ihr Exposé" },
      { text: "{{objekt.strasse}}", farbe: CHIP_FARBEN.mint },
      { text: "wurde heute" },
      { text: "{{oeffnungen.heute}}", farbe: CHIP_FARBEN.flieder },
      { text: "Mal geöffnet ·" },
      { text: "{{finanzierung.status}}", farbe: CHIP_FARBEN.himmel },
    ],
  },
  {
    an: "an: nachbarschaft@…",
    zeile: [
      { text: "Betreff: Verkäufe in der" },
      { text: "{{strasse}}", farbe: CHIP_FARBEN.mint },
      { text: "·" },
      { text: "{{verkaeufe.12m}}", farbe: CHIP_FARBEN.gelb },
      { text: "Abschlüsse ·" },
      { text: "{{schnitt.abweichung}}", farbe: CHIP_FARBEN.rose },
      { text: "über Angebotspreis" },
    ],
  },
  {
    an: "an: kaufinteressent@…",
    zeile: [
      { text: "Betreff:" },
      { text: "{{merkliste.objekt}}", farbe: CHIP_FARBEN.himmel },
      { text: "ist seit heute" },
      { text: "{{preis.delta}}", farbe: CHIP_FARBEN.gelb },
      { text: "günstiger ·" },
      { text: "{{besichtigung.frei}}", farbe: CHIP_FARBEN.flieder },
    ],
  },
  {
    an: "an: kapitalanleger@…",
    zeile: [
      { text: "Betreff: Mietpotenzial" },
      { text: "{{einheit.adresse}}", farbe: CHIP_FARBEN.mint },
      { text: "·" },
      { text: "{{miete.delta}}", farbe: CHIP_FARBEN.rose },
      { text: "unter Markt ·" },
      { text: "{{potenzial.jahr}}", farbe: CHIP_FARBEN.gelb },
      { text: "p. a." },
    ],
  },
  {
    an: "an: kaeufer-2024@…",
    zeile: [
      { text: "Betreff:" },
      { text: "{{kauf.jahrestag}}", farbe: CHIP_FARBEN.flieder },
      { text: "— Wertentwicklung" },
      { text: "{{wert.entwicklung}}", farbe: CHIP_FARBEN.gelb },
      { text: "· Ihr Report" },
      { text: "{{report.anhang}}", farbe: CHIP_FARBEN.himmel },
    ],
  },
];

const TIPP_MS = 22;
const LOESCH_MS = 9;
const LESE_PAUSE_MS = 2600;
const WECHSEL_PAUSE_MS = 420;

export function MailTipper({ titel, saetze }: { titel: string; saetze: string[] }) {
  const rahmen = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(false);
  const [reduziert, setReduziert] = useState(false);
  const [mailIndex, setMailIndex] = useState(0);
  const [angezeigt, setAngezeigt] = useState("");
  const [tippt, setTippt] = useState(false);

  const liste = saetze.filter(Boolean);

  // Sichtbarkeit steuert den Loop; reduced-motion zeigt Mail 1 statisch.
  useEffect(() => {
    const node = rahmen.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduziert(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => setAktiv(e.isIntersecting), { threshold: 0.3 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Der Schreib-Loop: tippen → Pause → löschen → nächste Mail.
  useEffect(() => {
    if (!aktiv || reduziert || liste.length === 0) return;
    let abgebrochen = false;
    let timer: number;
    const satz = liste[mailIndex % liste.length];

    function loeschen(pos: number) {
      if (abgebrochen) return;
      if (pos <= 0) {
        setAngezeigt("");
        timer = window.setTimeout(
          () => setMailIndex((m) => (m + 1) % liste.length),
          WECHSEL_PAUSE_MS,
        );
        return;
      }
      setAngezeigt(satz.slice(0, pos));
      timer = window.setTimeout(() => loeschen(pos - 2), LOESCH_MS);
    }

    function tippen(pos: number) {
      if (abgebrochen) return;
      setAngezeigt(satz.slice(0, pos));
      if (pos >= satz.length) {
        setTippt(false);
        timer = window.setTimeout(() => loeschen(satz.length), LESE_PAUSE_MS);
        return;
      }
      timer = window.setTimeout(() => tippen(pos + 1), TIPP_MS);
    }

    setTippt(true);
    tippen(0);
    return () => {
      abgebrochen = true;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- liste ist
    // aus saetze abgeleitet; der Join deckt Studio-Textaenderungen ab.
  }, [aktiv, reduziert, mailIndex, liste.join("|")]);

  const template = TEMPLATES[mailIndex % TEMPLATES.length];
  const statischerSatz = liste[0] ?? "";

  return (
    <div ref={rahmen} className="h-full rounded-[24px] bg-[#161613] p-6 lg:p-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <p className="font-mono text-[11px] text-white/40">{reduziert ? TEMPLATES[0].an : template.an}</p>
      </div>

      <p className="mt-5 text-[13px] font-medium text-white/80">{titel}</p>

      {/* Chips wechseln mit der Mail — key erzwingt Neuaufbau, die
          Tokens-Transition macht daraus einen weichen Tausch. */}
      <div
        key={reduziert ? 0 : mailIndex}
        className="mt-3 flex min-h-[52px] flex-wrap items-center gap-x-1.5 gap-y-2"
      >
        {(reduziert ? TEMPLATES[0] : template).zeile.map((teil, i) =>
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
          ),
        )}
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        {/* Für Screenreader stehen alle Sätze einmal fest; die getippte
            Ausgabe ist rein visuell. min-h reserviert zwei Zeilen, damit
            die Collage beim Löschen nicht springt. */}
        <div className="sr-only">
          {liste.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
        <p aria-hidden className="min-h-[4.5em] text-[14.5px] leading-relaxed text-white/95">
          {reduziert ? statischerSatz : angezeigt}
          {/* Caret: beim Tippen steht er voll, in der Lese-Pause blinkt
              er — wie in einem echten Editor. */}
          {!reduziert && (
            <span
              aria-hidden
              className={`ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[0.15em] bg-[var(--akzent)] align-text-bottom ${tippt ? "" : "animate-pulse"}`}
            />
          )}
        </p>
      </div>
    </div>
  );
}
