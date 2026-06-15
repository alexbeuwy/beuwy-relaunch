"use client";

import { useEffect, useRef } from "react";

/**
 * Page scroll progress bar — sits inside Nav. Pure CSS width animation,
 * one rAF loop, no re-renders. Yellow rail that fills as you scroll the doc.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      target.current = scrollable > 0 ? Math.max(0, Math.min(1, h.scrollTop / scrollable)) : 0;
    };

    const tick = () => {
      current.current += (target.current - current.current) * 0.22;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${current.current})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    update();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
