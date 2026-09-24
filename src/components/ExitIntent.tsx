"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import stil from "./ExitIntent.module.css";

/**
 * Exit-Intent für /system (18.09, mobil seit 23.09). Erscheint höchstens
 * einmal pro Seitenaufruf, frühestens acht Sekunden nach dem Laden.
 * Desktop (pointer: fine): der Zeiger verlässt die Seite nach oben.
 * Mobil: der Besucher hat mindestens ein Drittel gelesen und scrollt dann
 * schnell zurück nach oben (über 600 px in unter 500 ms) — das typische
 * Signal für „ich suche die Adresszeile". Kein Cookie, kein Storage, kein
 * Tracking (TDDDG § 25): der Zustand lebt nur im Speicher der Seite.
 * Esc, Klick auf den Hintergrund oder „Weiterlesen" schließen.
 * Texte kommen als Props aus den Studio-Keys mk.vsl.front_exit_*.
 */
export function ExitIntent({
  titel,
  text,
  cta,
  weiter,
  href = "/anfrage",
}: {
  titel: string;
  text: string;
  cta: string;
  weiter: string;
  href?: string;
}) {
  const [offen, setOffen] = useState(false);
  const bereit = useRef(false);
  const gezeigt = useRef(false);
  const schliessenRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const zeigen = () => {
      if (!bereit.current || gezeigt.current) return;
      gezeigt.current = true;
      setOffen(true);
    };
    const timer = window.setTimeout(() => {
      bereit.current = true;
    }, 8000);

    if (window.matchMedia("(pointer: fine)").matches) { // studio:ok
      const raus = (e: MouseEvent) => {
        if (e.clientY <= 0 && !e.relatedTarget) zeigen();
      };
      document.addEventListener("mouseout", raus);
      return () => {
        window.clearTimeout(timer);
        document.removeEventListener("mouseout", raus);
      };
    }

    let tiefe = 0;
    let marke = { y: window.scrollY, t: performance.now() };
    const scroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const hoehe = document.documentElement.scrollHeight - window.innerHeight;
      if (hoehe > 0) tiefe = Math.max(tiefe, y / hoehe);
      if (y > marke.y || t - marke.t > 500) {
        marke = { y, t };
        return;
      }
      if (tiefe >= 0.33 && marke.y - y > 600) zeigen();
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    if (!offen) return;
    schliessenRef.current?.focus();
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(false);
    };
    document.addEventListener("keydown", taste);
    return () => document.removeEventListener("keydown", taste);
  }, [offen]);

  if (!offen) return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center ${stil.hintergrund}`}
      onClick={() => setOffen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-titel"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[560px] rounded-[28px] bg-white p-7 text-center shadow-[0_24px_80px_-24px_rgba(22,22,19,0.35)] sm:p-10 ${stil.karte}`}
      >
        <p className="t-label">beuwy</p>
        <h2 id="exit-titel" className="t-h2 mt-3 !text-[clamp(24px,3vw,34px)]">
          {titel}
        </h2>
        <p className="t-body-lg mx-auto mt-4 max-w-[40ch]">{text}</p>
        <div className="mt-7 flex flex-col items-center gap-3">
          <Link
            href={href}
            className="inline-flex items-center gap-3 rounded-full bg-akzent px-8 py-3.5 text-[15px] font-semibold text-ink-cream transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover active:scale-[0.98]"
          >
            {cta}
          </Link>
          <button
            ref={schliessenRef}
            type="button"
            onClick={() => setOffen(false)}
            className="t-small cursor-pointer underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-cream"
          >
            {weiter}
          </button>
        </div>
      </div>
    </div>
  );
}
