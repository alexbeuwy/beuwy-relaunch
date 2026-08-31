"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * MotionRegie — der eine Ort, an dem Lenis (Smooth Scroll) und GSAP/
 * ScrollTrigger leben (R7, Alex 31.08: "mit Lenis und GSAP optimieren,
 * ausgewogen, mobile geil, Rollback ermöglichen").
 *
 * ROLLBACK OHNE LLM: Die Stufe kommt als Studio-Key mk.motion.stufe
 * ("voll" | "dezent" | "aus") aus getContent() — Alex stellt im Studio
 * auf "aus" und ALLE Scroll-Effekte dieser Schicht stehen still, auf
 * "dezent" entfallen nur die grossen Inszenierungen (Pin/Blur), die
 * leichten Scrubs bleiben.
 *
 * Regeln der Schicht:
 * - Lenis läuft NUR auf Geräten mit feiner Maus (pointer:fine) und nie
 *   bei prefers-reduced-motion — Touch behält natives Scrollen (Lenis-
 *   Empfehlung, fühlt sich auf iOS sonst falsch an).
 * - Scroll-Scrubs haben keine Zeitachse (Scroll = Zeit), die Dauer-
 *   Tokens greifen hier nicht — dokumentierte Ausnahme wie VasenTiefe.
 * - Effekte registrieren sich über useMotionStufe() und prüfen selbst
 *   reduced-motion; SSR rendert immer den fertigen End-Zustand.
 */

export type MotionStufe = "voll" | "dezent" | "aus";

const MotionContext = createContext<MotionStufe>("aus");

export function useMotionStufe(): MotionStufe {
  return useContext(MotionContext);
}

/** true, sobald das OS Bewegung reduziert — dann verhält sich alles wie "aus". */
export function reduzierteBewegung(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MotionRegie({ stufe, children }: { stufe?: string; children: ReactNode }) {
  const wert: MotionStufe = stufe === "aus" || stufe === "dezent" ? stufe : "voll";
  // gsap einmalig registrieren (idempotent).
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    if (wert === "aus" || reduzierteBewegung()) return;
    gsap.registerPlugin(ScrollTrigger);
    setBereit(true);

    // Smooth Scroll nur am Desktop mit Maus — Touch bleibt nativ.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (zeit: number) => lenis.raf(zeit * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [wert]);

  // "bereit" hält Effekte zurück, bis ScrollTrigger registriert ist —
  // Konsumenten sehen bis dahin Stufe "aus" und bleiben im End-Zustand.
  return <MotionContext.Provider value={bereit ? wert : "aus"}>{children}</MotionContext.Provider>;
}
