"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { rich } from "@/components/RichText";
import { cn } from "@/lib/utils";

import styles from "./CtaFocus.module.css";

export type CtaFocusProps = {
  /**
   * Grosse Ueberschrift (Helvena, .t-display). Als String laeuft der Text
   * durch das CMS-Mini-Markup: *Wort* wird gelb, _Wort_ bleibt creme.
   * Alternativ beliebiges JSX uebergeben.
   */
  title: ReactNode;
  /** Ein Satz unter der Ueberschrift. String-Variante nutzt dasselbe Markup. */
  text?: ReactNode;
  /** Beschriftung des einen grossen Buttons. */
  buttonLabel: string;
  /** Ziel des Buttons — interner Pfad oder Anker. */
  href: string;
  /** Kleine Zeile ueber der Ueberschrift, z. B. „Letzter Schritt". */
  eyebrow?: string;
  /** Feine Zeile unter dem Button, z. B. „Antwort binnen 24 Stunden". */
  note?: ReactNode;
  /** Anker-Id der Sektion. */
  id?: string;
  /** Zusatzklassen fuer die Sektion. */
  className?: string;
  /**
   * Maximale Weichzeichnung des Schleiers in Pixeln (Desktop).
   * Standard 12. Mobil wird der Wert per CSS auf 6px gedeckelt.
   */
  maxBlur?: number;
  /** Maximale Abdunklung, 0…1. Standard 0.78. */
  maxDim?: number;
  /**
   * Ab welchem Anteil der Viewporthoehe der Effekt voll ausgefahren ist.
   * 0.8 heisst: nach 80 % Einfahrt ist der Schleier komplett da.
   */
  ramp?: number;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** easeOutCubic — vorne schnell, hinten weich auslaufend. */
const ease = (v: number) => 1 - Math.pow(1 - v, 3);

/**
 * CtaFocus — das Seitenfinale.
 *
 * Statt eines gelben Vollflaechen-Blocks legt sich ein fixierter, weicher
 * Schleier ueber die gesamte Seite (Abdunklung + Backdrop-Blur), waehrend die
 * Sektion in den Viewport faehrt. Im Fokus bleibt genau eine CTA-Karte.
 *
 * Technik: Ein IntersectionObserver schaltet eine rAF-Schleife an und aus —
 * es gibt bewusst KEINEN scroll-Listener. Pro Frame wird nur eine einzige
 * CSS-Variable (--p) geschrieben, alles Optische haengt daran.
 * Bei „prefers-reduced-motion" laeuft keine Schleife: der Schleier steht
 * statisch, die Karte wird nicht transformiert.
 */
export function CtaFocus({
  title,
  text,
  buttonLabel,
  href,
  eyebrow,
  note,
  id,
  className,
  maxBlur = 12,
  maxDim = 0.78,
  ramp = 0.8,
}: CtaFocusProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Statisch gedimmt, kein Blur, keine Bewegung.
      node.style.setProperty("--p", "1");
      node.style.setProperty("--blur-max", "0px");
      return;
    }

    let raf = 0;
    let last = -1;
    let running = false;

    const write = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const span = Math.max(1, vh * ramp);

      // Einfahrt: 0, wenn die Oberkante noch am unteren Rand steht.
      const enter = clamp01((vh - rect.top) / span);
      // Ausfahrt: blendet zurueck, sobald die Sektion oben rausfaehrt.
      const exit = clamp01(rect.bottom / span);
      const p = ease(Math.min(enter, exit));

      // Nur schreiben, wenn sich optisch etwas aendert.
      if (Math.abs(p - last) > 0.002) {
        last = p;
        node.style.setProperty("--p", p.toFixed(4));
      }
      if (running) raf = requestAnimationFrame(write);
    };

    const start = () => {
      if (running) return;
      running = true;
      node.dataset.active = "true";
      raf = requestAnimationFrame(write);
    };
    const stop = () => {
      running = false;
      node.dataset.active = "false";
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else {
          stop();
          // sauber ausblenden, falls der Sprung groesser war als ein Frame
          node.style.setProperty("--p", "0");
          last = 0;
        }
      },
      { threshold: 0 }
    );
    obs.observe(node);

    // Im Hintergrund-Tab keine Frames verbrennen.
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [ramp]);

  return (
    <section
      ref={rootRef}
      id={id}
      data-active="false"
      className={cn(
        styles.root,
        "relative flex min-h-[100svh] items-center justify-center px-5 py-24",
        className
      )}
      style={
        {
          "--blur-max": `${maxBlur}px`,
          "--dim-max": `${maxDim}`,
        } as CSSProperties
      }
    >
      {/* Schleier — liegt unter der Karte und ueber der restlichen Seite,
          blockiert aber nichts (pointer-events: none). */}
      <div className={styles.veil} aria-hidden="true" />

      <div
        className={cn(
          styles.card,
          "w-full max-w-[720px] rounded-[20px] border border-white/10",
          "bg-[#141414] px-6 py-12 text-center sm:px-12 sm:py-16"
        )}
      >
        {eyebrow && (
          <p className="t-label mb-5 text-ink-yellow">{eyebrow}</p>
        )}

        <h2 className="t-display mx-auto max-w-[16ch]">
          {typeof title === "string" ? rich(title) : title}
        </h2>

        {text && (
          <p className="t-body-lg mx-auto mt-6 max-w-[46ch] text-balance">
            {typeof text === "string" ? rich(text) : text}
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            className="w-full sm:w-auto sm:min-w-[260px]"
            render={<Link href={href} />}
          >
            {buttonLabel}
          </Button>
        </div>

        {note && <p className="t-small mt-5 text-ink-dim">{note}</p>}
      </div>
    </section>
  );
}

export default CtaFocus;
