"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnfrageFunnel, type AnfrageFunnelTexte } from "./AnfrageFunnel";
import stil from "./StadtCheck.module.css";

/**
 * Stadt-Check (/system, 23.09): der eine große Knopf der Seite. Der Makler
 * trägt seine Stadt ein (erste Frage direkt auf der Seite), sieht sofort,
 * ob sie noch frei ist, und beantwortet darunter ohne Seitenwechsel die
 * vier Funnel-Fragen. Grundlage: ein Büro pro Stadt ist echt (Alex, 23.09);
 * die Liste der vergebenen Städte pflegt Alex im Studio
 * (mk.vsl.front_stadt_vergeben). Kein Cookie, kein Storage.
 */
export type StadtCheckTexte = {
  label: string;
  platzhalter: string;
  cta: string;
  hinweis: string;
  leer: string;
  frei: string;
  vergebenTitel: string;
  vergebenText: string;
  vergebenCta: string;
  neu: string;
};

export const STADT_EINGABE_ID = "stadt-eingabe";

const norm = (s: string) =>
  s
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const mitStadt = (text: string, stadt: string) => text.split("{stadt}").join(stadt);

export function StadtCheck({
  texte,
  vergeben,
  funnelTexte,
}: {
  texte: StadtCheckTexte;
  vergeben: string[];
  funnelTexte: AnfrageFunnelTexte;
}) {
  const [eingabe, setEingabe] = useState("");
  const [status, setStatus] = useState<"offen" | "frei" | "vergeben">("offen");
  const [stadt, setStadt] = useState("");
  const [fehler, setFehler] = useState(false);
  const [wackeln, setWackeln] = useState(0);
  const ergebnisRef = useRef<HTMLDivElement>(null);
  const eingabeRef = useRef<HTMLInputElement>(null);

  function pruefen(e: React.FormEvent) {
    e.preventDefault();
    const wert = eingabe.trim().replace(/\s+/g, " ").slice(0, 60);
    if (!wert) {
      setFehler(true);
      setWackeln((n) => n + 1);
      eingabeRef.current?.focus();
      return;
    }
    setFehler(false);
    setStadt(wert);
    const belegt = vergeben.map(norm).includes(norm(wert));
    setStatus(belegt ? "vergeben" : "frei");
    window.requestAnimationFrame(() =>
      ergebnisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }

  function neuPruefen() {
    setStatus("offen");
    setEingabe("");
    window.requestAnimationFrame(() => eingabeRef.current?.focus());
  }

  return (
    <div id="stadt-check" className="mx-auto w-full max-w-[640px] scroll-mt-24">
      <form onSubmit={pruefen} noValidate>
        <label htmlFor={STADT_EINGABE_ID} className="block text-[15px] font-semibold text-ink-cream">
          {texte.label}
        </label>
        <div
          key={wackeln}
          className={`mt-3 flex flex-col gap-2 rounded-[28px] border-2 bg-white p-2 sm:flex-row sm:items-center sm:rounded-full ${
            fehler ? `border-ink-cream ${stil.shake}` : "border-akzent"
          }`}
        >
          <input
            ref={eingabeRef}
            id={STADT_EINGABE_ID}
            type="text"
            inputMode="text"
            autoComplete="address-level2"
            maxLength={60}
            value={eingabe}
            onChange={(e) => {
              setEingabe(e.target.value);
              if (fehler) setFehler(false);
            }}
            placeholder={texte.platzhalter}
            aria-invalid={fehler}
            aria-describedby={fehler ? "stadt-fehler" : "stadt-hinweis"}
            className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-4 text-[18px] text-ink-cream outline-none placeholder:text-ink-dim"
          />
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-akzent px-8 py-5 text-[18px] font-bold text-ink-cream transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98] sm:py-4"
          >
            {texte.cta}
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" aria-hidden>
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {fehler ? (
          <p id="stadt-fehler" role="alert" className="t-small mt-3 !text-ink-cream">
            {texte.leer}
          </p>
        ) : (
          <p id="stadt-hinweis" className="t-small mt-3">
            {texte.hinweis}
          </p>
        )}
      </form>

      <div ref={ergebnisRef} className="scroll-mt-6" aria-live="polite">
        {status === "frei" && (
          <div key={`frei-${stadt}`} className={`mt-8 text-left ${stil.ein}`}>
            <p className="flex items-start gap-3 rounded-[20px] bg-akzent-wash px-5 py-4 text-[16px] font-semibold text-ink-cream">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {mitStadt(texte.frei, stadt)}
            </p>
            <div className="mt-6 rounded-[28px] border border-line-subtle p-5 sm:p-8">
              <AnfrageFunnel texte={funnelTexte} stadt={stadt} />
            </div>
          </div>
        )}
        {status === "vergeben" && (
          <div key={`vergeben-${stadt}`} className={`mt-8 rounded-[28px] border border-line-subtle p-7 text-center ${stil.ein}`}>
            <p className="t-h3">{mitStadt(texte.vergebenTitel, stadt)}</p>
            <p className="t-body mx-auto mt-3 max-w-[46ch]">{texte.vergebenText}</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/video-analyse"
                className="inline-flex items-center rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover"
              >
                {texte.vergebenCta}
              </Link>
              <button
                type="button"
                onClick={neuPruefen}
                className="t-small cursor-pointer underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
              >
                {texte.neu}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Springt zum Stadt-Check und setzt den Cursor ins Feld. */
export function zumStadtCheck() {
  const feld = document.getElementById(STADT_EINGABE_ID) as HTMLInputElement | null;
  document.getElementById("stadt-check")?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => feld?.focus({ preventScroll: true }), 450);
}

/**
 * Großer Knopf am Seitenende: führt zurück zum Stadt-Check oben
 * (bewusst kein zweites Formular, damit es nur einen Funnel gibt).
 */
export function StadtKnopf({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={zumStadtCheck}
      className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-akzent px-10 py-5 text-[18px] font-bold text-ink-cream transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
    >
      {text}
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" aria-hidden>
        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/**
 * Sticky-Leiste (mobil): erscheint, sobald der Stadt-Check oben aus dem
 * Bild gescrollt ist, und verschwindet, wenn der Schluss-Knopf sichtbar
 * wird. Ein Tipp führt zurück zum Stadt-Check.
 */
export function StickyStadt({ text, cta }: { text: string; cta: string }) {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const check = document.getElementById("stadt-check");
    const schluss = document.getElementById("schluss-cta");
    if (!check) return;
    let checkSichtbar = true;
    let schlussSichtbar = false;
    const neu = () => {
      const unterhalb = check.getBoundingClientRect().bottom < 0;
      setSichtbar(!checkSichtbar && unterhalb && !schlussSichtbar);
    };
    const io = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        if (e.target === check) checkSichtbar = e.isIntersecting;
        if (e.target === schluss) schlussSichtbar = e.isIntersecting;
      }
      neu();
    });
    io.observe(check);
    if (schluss) io.observe(schluss);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] border-t border-line-subtle bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden ${stil.leiste} ${
        sichtbar ? "" : stil.leisteAus
      }`}
      aria-hidden={!sichtbar}
    >
      <div className="mx-auto flex max-w-[640px] items-center justify-between gap-3">
        <p className="text-[14px] font-semibold leading-tight text-ink-cream">{text}</p>
        <button
          type="button"
          tabIndex={sichtbar ? 0 : -1}
          onClick={zumStadtCheck}
          className="shrink-0 rounded-full bg-akzent px-6 py-3 text-[15px] font-bold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] active:bg-akzent-hover"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
