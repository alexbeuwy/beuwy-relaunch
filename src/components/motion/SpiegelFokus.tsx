"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useMotionStufe } from "@/components/motion/MotionRegie";

/**
 * SpiegelFokus — Blickführung für den Spiegel-Block (R7, Alex 31.08:
 * Headline zuerst im Fokus, "außenrum alles blurry und abgedunkelt",
 * der Rest deckt sich beim Scrollen auf).
 *
 * Mechanik: Kinder mit data-fokus="spaet" starten unscharf/gedimmt
 * und klaren per Scrub gestaffelt auf, während die Headline (ohne
 * Attribut) von Anfang an scharf steht. Die Startzustände setzt
 * ausschließlich JS (gsap.set) — SSR, Stufe "aus" und
 * prefers-reduced-motion zeigen also immer den fertigen Endzustand,
 * das ist der Rollback. Mobil entfällt der teure Blur (GPU), dort
 * bleibt eine leichte Fade+Rise-Staffel. Scrub = Scroll ist die
 * Zeitachse, Dauer-Tokens greifen nicht (dokumentierte Ausnahme).
 */
export function SpiegelFokus({ children }: { children: ReactNode }) {
  const stufe = useMotionStufe();
  const wurzel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stufe === "aus" || !wurzel.current) return;
    const ziele = wurzel.current.querySelectorAll<HTMLElement>("[data-fokus='spaet']");
    if (!ziele.length) return;

    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width: 1024px)", mobil: "(max-width: 1023.9px)" },
      (ctx) => {
        const voll = stufe === "voll" && Boolean(ctx.conditions?.desktop);
        gsap.set(ziele, voll ? { opacity: 0.14, filter: "blur(14px)", y: 20 } : { opacity: 0, y: 26 });
        const tween = gsap.to(ziele, {
          opacity: 1,
          y: 0,
          ...(voll ? { filter: "blur(0px)" } : {}),
          stagger: 0.16,
          ease: "none",
          scrollTrigger: {
            trigger: wurzel.current,
            start: "top 74%",
            end: "top 18%",
            scrub: 0.4,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(ziele, { clearProps: "all" });
        };
      },
    );
    return () => mm.revert();
  }, [stufe]);

  return <div ref={wurzel}>{children}</div>;
}
