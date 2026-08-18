"use client";

import { useState } from "react";

/* Video lädt erst auf Klick. Der Vision-Imagefilm ist 17 MB — mit
   preload blockiert er das Laden der ganzen Seite. Bis zum Klick steht
   hier eine ruhige Hügel-Fläche mit Abspielknopf. */
export function VideoCard({ src, label }: { src: string; label: string }) {
  const [an, setAn] = useState(false);

  if (an) {
    return (
      <video
        src={src}
        controls
        autoPlay
        className="w-full aspect-video rounded-[10px] bg-hill"
        aria-label={label}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAn(true)}
      aria-label={`${label} abspielen`}
      className="group/vid relative w-full aspect-video rounded-[10px] bg-hill cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--sky)"
    >
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-full border border-[rgba(255,253,246,0.5)] transition-colors duration-(--duration-fast) ease-(--ease-smooth-out) group-hover/vid:border-snow">
          <svg viewBox="0 0 24 24" className="size-5 translate-x-px" aria-hidden focusable="false">
            <path d="M8 5l11 7-11 7z" fill="#FFFDF6" />
          </svg>
        </span>
        <span className="t-small text-[rgba(255,253,246,0.72)]">{label}</span>
      </span>
    </button>
  );
}
