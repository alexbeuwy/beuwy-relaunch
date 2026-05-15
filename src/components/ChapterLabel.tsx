"use client";

import { useEffect, useRef, useState } from "react";

type State = "ssr" | "hidden" | "shown";

/**
 * Editorial-premium chapter opener — fail-open: SSR renders visible.
 * After mount, hides briefly + IntersectionObserver fades each letter in.
 * If JS errors, content stays visible (no blank chapter label ever).
 */
export function ChapterLabel({
  num,
  rest,
  className = "",
}: {
  num: string;
  rest: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<State>("ssr");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const inViewport = rect.top < vh && rect.bottom > 0;

    if (inViewport) {
      setState("shown");
      return;
    }

    setState("hidden");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("shown");
          obs.disconnect();
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.5 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const letters = Array.from(rest);

  return (
    <span
      ref={ref}
      className={`eyebrow ${className}`}
      data-chapter-label
      data-state={state}
    >
      <span className="num" data-chapter-num>
        {num}
      </span>{" "}
      {letters.map((ch, i) => (
        <span
          key={i}
          className="ch"
          style={{ "--char-index": i } as React.CSSProperties}
          aria-hidden
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
