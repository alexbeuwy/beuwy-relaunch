"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Final value to count up to. */
  to: number;
  /** Prefix glued to the final number (e.g. "€"). */
  prefix?: string;
  /** Suffix glued to the final number (e.g. "M", "M+", "%"). */
  suffix?: string;
  /** Locale used for thousands-separators. Default: de-DE -> "2.240". */
  locale?: string;
  /** Animation duration ms. Default 1600. */
  duration?: number;
  /** Override the className on the wrapper. */
  className?: string;
  /** Force decimals (use when `to` is e.g. 160.5). Default 0. */
  decimals?: number;
};

/**
 * Counts from 0 to `to` when the element first enters the viewport. Fail-open:
 * SSR renders the final formatted value, so the static HTML is never empty.
 * Once JS mounts + element is in view, the count restarts from 0.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  locale = "de-DE",
  duration = 1600,
  className = "",
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setValue(0);

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setValue(eased * to);
        if (t < 1) requestAnimationFrame(tick);
        else setValue(to);
      };
      requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      start();
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          start();
          obs.disconnect();
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [to, duration]);

  const display = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
