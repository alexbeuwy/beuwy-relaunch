"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-scrubbed video — Apple/Linear style.
 *
 * Wrap structure (set by the page, not this component):
 *
 *   <section class="scroll-scrub-wrap">   // tall runway, e.g. 180vh
 *     <div class="scroll-scrub-sticky">    // position: sticky, 100vh
 *       <ScrollScrubVideo src="..." />     // absolute, fills sticky
 *       <div class="scroll-scrub-content"> // copy overlay, also absolute
 *         ...hero text...
 *       </div>
 *     </div>
 *   </section>
 *
 * The video's `currentTime` is driven by how far the wrap has been scrolled
 * past. Uses lerp + rAF for buttery seeking.
 *
 * Requires every-frame keyframes in the mp4
 * (`-x264-params keyint=1:scenecut=0`).
 */
export function ScrollScrubVideo({
  src,
  className = "scroll-scrub-video",
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<number>(0);
  const wrapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Static fallback: jump to a representative frame.
      const onMetaReduced = () => {
        try { video.currentTime = video.duration * 0.5; } catch { /* ignore */ }
      };
      if (video.readyState >= 1) onMetaReduced();
      else video.addEventListener("loadedmetadata", onMetaReduced, { once: true });
      return;
    }

    const wrap = video.closest<HTMLElement>(".scroll-scrub-wrap");
    if (!wrap) return;
    wrapRef.current = wrap;

    const update = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const totalScroll = rect.height - vh;
      const scrolled = -rect.top;
      const progress = totalScroll > 0
        ? Math.max(0, Math.min(1, scrolled / totalScroll))
        : 0;
      targetRef.current = progress * video.duration;
    };

    const tick = () => {
      const v = videoRef.current;
      if (v && Number.isFinite(v.duration) && v.duration > 0) {
        const current = v.currentTime;
        const target = targetRef.current;
        // Lerp toward target — smooths rapid scroll into a butter scrub.
        const next = current + (target - current) * 0.18;
        if (Math.abs(next - current) > 0.005) {
          try { v.currentTime = next; } catch { /* ignore */ }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      update();
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
    };

    if (video.readyState >= 1) start();
    else video.addEventListener("loadedmetadata", start, { once: true });

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      muted
      playsInline
      preload="auto"
    />
  );
}
