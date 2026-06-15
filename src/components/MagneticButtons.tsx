"use client";

import { useEffect } from "react";

/**
 * Magnetic effect on .btn-primary buttons site-wide.
 * Listens to mousemove on each .btn-primary, translates the button slightly
 * toward the cursor (max ~6px) so it "pulls" the eye. Resets on leave.
 *
 * One delegated listener per button (small set), passive, rAF-throttled.
 * Skipped on touch / reduced-motion.
 */
export function MagneticButtons() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const STRENGTH = 0.22; // 0..1, higher = more pull
    const MAX = 8; // max px translation

    const wireUp = (btn: HTMLElement) => {
      let rafId: number | null = null;
      let tx = 0,
        ty = 0;

      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        tx = Math.max(-MAX, Math.min(MAX, dx * STRENGTH));
        ty = Math.max(-MAX, Math.min(MAX, dy * STRENGTH));
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            btn.style.setProperty("--magnetic-x", `${tx}px`);
            btn.style.setProperty("--magnetic-y", `${ty}px`);
            rafId = null;
          });
        }
      };
      const onLeave = () => {
        btn.style.setProperty("--magnetic-x", "0px");
        btn.style.setProperty("--magnetic-y", "0px");
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      btn.classList.add("magnetic");
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
        btn.classList.remove("magnetic");
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    };

    const cleanups: (() => void)[] = [];
    const wireAll = () => {
      const buttons = document.querySelectorAll<HTMLElement>(".btn-primary");
      buttons.forEach((btn) => {
        if (!btn.dataset.magnetic) {
          btn.dataset.magnetic = "true";
          cleanups.push(wireUp(btn));
        }
      });
    };
    wireAll();

    // Also re-wire after navigations (mutation watch on body)
    const mo = new MutationObserver(() => wireAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
