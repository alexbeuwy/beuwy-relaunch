"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Ambient-Video-Plate: das Poster steht sofort, das Video lädt erst,
 * wenn die Plate fast im Viewport ist (die webm-Dateien sind 5+ MB,
 * BRIEF §9). Bei prefers-reduced-motion bleibt es beim Poster. Füllt
 * den nächsten relativ positionierten Rahmen (fill-Pattern wie Image).
 */
export function AmbientVideo({
  videoSrc,
  posterSrc,
  alt,
  sizes,
}: {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  sizes: string;
}) {
  const [laedt, setLaedt] = useState(false);
  const rahmen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = rahmen.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLaedt(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={rahmen} className="absolute inset-0">
      <Image src={posterSrc} alt={alt} fill sizes={sizes} className="object-cover" />
      {laedt && (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
