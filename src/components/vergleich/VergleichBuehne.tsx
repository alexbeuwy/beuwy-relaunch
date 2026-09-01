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
 * nur die Politur obenauf (Scrub — Scroll ist die Zeitachse, Dauer-
 * Tokens greifen nicht, dokumentierte Ausnahme).
 *
 * ABDUNKELN NUR ÜBER DEN SCHLEIER, NIE ÜBER CSS-filter (Bugfix
 * 31.08): der frühere brightness()-Scrub akkumulierte sich über
 * ScrollTrigger-Refreshes und färbte die Karte schwarz. Der Schleier
 * ist ein eigenes Overlay-Element, dessen Opacity gescrubbt wird —
 * idempotent, gedeckelt bei 0.24, kann nie tiefer abdunkeln.
 *
 * Die Karten-Inhalte kommen als Server-Children (StandardKarte /
 * BeuwyKarte); die Craspedia-Vase hängt an der gelben Karte und ragt
 * über deren Oberkante — während der Überfahrt steht sie damit
 * sichtbar AUF der grauen Karte (Alex: Vasen sollen überlappen).
 */
export function VergleichBuehne({ karteA, karteB }: { karteA: ReactNode; karteB: ReactNode }) {
  const stufe = useMotionStufe();
  const grauRef = useRef<HTMLDivElement>(null);
  const schleierRef = useRef<HTMLDivElement>(null);
  const gelbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stufe !== "voll" || !grauRef.current || !gelbRef.current || !schleierRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: gelbRef.current,
          start: "top 90%",
          end: "top 22%",
          scrub: 0.3,
        },
      });
      tl.to(grauRef.current, { scale: 0.945, transformOrigin: "center 20%" }, 0);
      tl.to(schleierRef.current, { opacity: 0.24 }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([grauRef.current, schleierRef.current], { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [stufe]);

  return (
    <div className="relative">
      <div className="sticky top-[9vh]">
        <div
          ref={grauRef}
          className="relative min-h-[55vh] overflow-hidden rounded-[32px] border border-line-subtle bg-bg-elevated will-change-transform"
        >
          {karteA}
          {/* Abdunkel-Schleier — Opacity wird gescrubbt, Deckel 0.24 */}
          <div
            ref={schleierRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[32px] bg-[#161613] opacity-0"
          />
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
