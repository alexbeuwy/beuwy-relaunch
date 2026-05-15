"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Variant = "panel" | "mask";

/**
 * Scroll-triggered reveal.
 * - variant="panel" (default): translateY + blur, transitions-dev panel-reveal feel.
 * - variant="mask": clip-path inset(0 100% 0 0) -> inset(0), text-masking from gsap-explore.
 * Respects prefers-reduced-motion via the global CSS guards.
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
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.05 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const dataAttr =
    variant === "mask"
      ? { "data-reveal-mask": "" }
      : { "data-reveal": "" };

  return (
    <div
      ref={ref}
      {...dataAttr}
      data-shown={shown ? "true" : "false"}
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
