"use client";

import { useEffect, useRef } from "react";

/**
 * Global cursor trail — subtle yellow glow that follows the mouse with lerp.
 * One DOM node, requestAnimationFrame, no event spam. Disabled under
 * prefers-reduced-motion and on touch devices.
 */
export function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      dot.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      dot.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={dotRef} className="cursor-trail" aria-hidden />;
}
