"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Variant = "panel" | "mask";
type State = "ssr" | "hidden" | "shown";

/**
 * Scroll-triggered reveal — TRULY fail-open.
 *
 * SSR renders state="ssr" (no hide style). If JS never runs OR errors anywhere
 * in the React tree, content stays visible — no blank page, ever.
 *
 * After mount: above-fold elements jump straight to "shown" (no hide flash).
 * Below-fold elements hide, then animate to shown when scrolled into view.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "panel",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("ssr");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const inViewport = rect.top < vh && rect.bottom > 0;

    if (inViewport) {
      // Above the fold — no flash, content stays visible.
      setState("shown");
      return;
    }

    // Below the fold — hide now, animate in on scroll.
    setState("hidden");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("shown");
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const attrName = variant === "mask" ? "data-reveal-mask" : "data-reveal";

  return (
    <div
      ref={ref}
      {...{ [attrName]: "" }}
      data-state={state}
      data-shown={state === "shown" ? "true" : "false"}
      className={className}
      style={
        {
          "--reveal-delay": `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
