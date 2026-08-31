"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useMotionStufe } from "@/components/motion/MotionRegie";
import { VasenTiefe } from "@/components/VasenTiefe";

/**
 * VergleichBuehne — das Chassis des Aha-Vergleichs (R7, Alex 31.08):
 * zwei volle-Breite-Karten à ~55vh. Die graue Standard-Karte bleibt
 * per position:sticky stehen, die pastellgelbe beuwy-Karte schiebt
 * sich beim Scrollen DARÜBER — "graue Massenware wird zugedeckt".
 *
 * Der Stapel selbst ist reines CSS (sticky) und läuft damit überall,
 * auch mobil und bei Motion-Stufe "aus". GSAP legt bei Stufe "voll"
 * nur die Politur obenauf: die graue Karte schrumpft und dunkelt ab,
 * während die gelbe sie überfährt (Scrub — Scroll ist die Zeitachse,
 * Dauer-Tokens greifen nicht, dokumentierte Ausnahme).
 *
 * Die Karten-Inhalte kommen als Server-Children (StandardKarte /
 * BeuwyKarte); die Craspedia-Vase überlappt die gelbe Karte oben
 * rechts (Alex: Vasen sollen überlappen, nicht am Rand fliegen).
 */
export function VergleichBuehne({ karteA, karteB }: { karteA: ReactNode; karteB: ReactNode }) {
  const stufe = useMotionStufe();
  const grauRef = useRef<HTMLDivElement>(null);
  const gelbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stufe !== "voll" || !grauRef.current || !gelbRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(grauRef.current, {
        scale: 0.94,
        filter: "brightness(0.8) saturate(0.85)",
        transformOrigin: "center 20%",
        ease: "none",
        scrollTrigger: {
          trigger: gelbRef.current,
          start: "top 90%",
          end: "top 22%",
          scrub: 0.3,
        },
      });
    });
    return () => mm.revert();
  }, [stufe]);

  return (
    <div className="relative">
      <div className="sticky top-[9vh]">
        <div
          ref={grauRef}
          className="min-h-[55vh] overflow-hidden rounded-[32px] border border-line-subtle bg-bg-elevated will-change-transform"
        >
          {karteA}
        </div>
      </div>
      <div ref={gelbRef} className="relative z-10 mt-[9vh]">
        <div className="min-h-[55vh] overflow-hidden rounded-[32px] bg-akzent shadow-[0_30px_90px_rgba(22,22,19,0.22)]">
          {karteB}
        </div>
        <VasenTiefe variante="karte-gelb" />
      </div>
    </div>
  );
}
