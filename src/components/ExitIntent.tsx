"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import stil from "./ExitIntent.module.css";

/**
 * Exit-Intent für die VSL-Seite (18.09). Erscheint einmal pro Sitzung,
 * nur mit Maus (pointer: fine), wenn der Zeiger die Seite nach oben
 * verlässt, frühestens acht Sekunden nach dem Laden. Kein Tracking,
 * kein Cookie: sessionStorage merkt sich nur „schon gezeigt".
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
  const schliessenRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return; // studio:ok
    let gezeigt = false;
    try {
      gezeigt = sessionStorage.getItem("vsl-exit") === "1";
    } catch {
      /* privater Modus o. ä. — dann einfach nicht zeigen */
      return;
    }
    if (gezeigt) return;
    const timer = window.setTimeout(() => {
      bereit.current = true;
    }, 8000);
    const raus = (e: MouseEvent) => {
      if (!bereit.current || e.clientY > 0) return;
      try {
        sessionStorage.setItem("vsl-exit", "1");
      } catch {
        /* egal */
      }
      setOffen(true);
    };
    document.addEventListener("mouseout", raus);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", raus);
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
