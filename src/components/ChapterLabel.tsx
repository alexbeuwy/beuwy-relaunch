"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Editorial-premium chapter opener — splits text into letters and animates
 * opacity + translateY per letter when entering the viewport. Used only on
 * section chapter labels (e.g. "01 Pain · 2026/01"), never on body copy.
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
      data-shown={shown ? "true" : "false"}
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
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
