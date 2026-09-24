"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Film auf /system (24.09, Wunsch Alex): läuft stumm und in Schleife, sobald
 * der Rahmen im Viewport steht — kein Play-Klick nötig. Maus darauf oder
 * Klick/Tap startet den Film von 0 mit Ton.
 *
 * Browser erlauben Ton nur nach einer Nutzer-Geste. Klick/Tap ist immer eine
 * Geste; Hover nur dann, wenn der Besucher vorher schon auf der Seite
 * geklickt oder getippt hat. Verweigert der Browser den Ton, läuft die
 * stumme Vorschau weiter und der Hinweis „Mit Ton ansehen" bleibt stehen.
 *
 * Darunter ein Endowed-Progress-Balken wie bei VSL-Playern: er startet bei
 * 12 % und läuft vorn schneller, hinten langsamer. Der Film wirkt kürzer,
 * mehr Zuschauer bleiben bis zum Ende. Keine nativen Controls, sonst zeigt
 * der Browser die echte Zeitleiste daneben.
 *
 * Mit prefers-reduced-motion: kein Autoplay, nur Poster + Klick mit Ton.
 *
 * Studio-Keys: mk.vsl.system_url, mk.vsl.system_poster, mk.vsl.system_ton,
 * mk.vsl.system_pause, mk.vsl.system_weiter.
 */

const ENDOWED = 0.12;

/** Echte Laufzeit (0–1) → angezeigter Fortschritt (0,12–1), vorn schneller. */
function anzeige(x: number) {
  const k = Math.min(Math.max(x, 0), 1);
  return ENDOWED + (1 - ENDOWED) * (1 - Math.pow(1 - k, 1.5));
}

type Modus = "vorschau" | "ton" | "pause";

export function SystemFilm({
  videoUrl,
  posterUrl,
  texte,
}: {
  videoUrl: string;
  posterUrl?: string;
  texte: { ton: string; pause: string; weiter: string };
}) {
  const video = useRef<HTMLVideoElement>(null);
  const balken = useRef<HTMLSpanElement>(null);
  const rahmen = useRef<HTMLDivElement>(null);
  const [modus, setModus] = useState<Modus>("vorschau");
  const modusRef = useRef<Modus>("vorschau");
  const tonVerweigert = useRef(false);
  /* Ton kam per Hover: der nächste Klick ist meist als „Play" gemeint und
     darf den Film nicht gleich wieder anhalten. */
  const perHover = useRef(false);
  const ruhig = useRef(false);

  const setze = (m: Modus) => {
    modusRef.current = m;
    setModus(m);
  };

  /* Vorschau: stumm, Schleife, startet erst im Viewport. */
  useEffect(() => {
    const v = video.current;
    const node = rahmen.current;
    if (!v || !node) return;
    ruhig.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // studio:ok
    if (ruhig.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (modusRef.current !== "vorschau") return;
        if (e.isIntersecting) {
          v.muted = true;
          v.loop = true;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  /* Balken: direkt am DOM, ohne Re-Render pro Frame. */
  useEffect(() => {
    let id = 0;
    const lauf = () => {
      const v = video.current;
      const b = balken.current;
      if (v && b && v.duration > 0) {
        b.style.transform = `scaleX(${anzeige(v.currentTime / v.duration)})`;
      }
      id = requestAnimationFrame(lauf);
    };
    id = requestAnimationFrame(lauf);
    return () => cancelAnimationFrame(id);
  }, []);

  const mitTon = useCallback(() => {
    const v = video.current;
    if (!v) return;
    v.loop = false;
    v.currentTime = 0;
    v.muted = false;
    setze("ton");
    v.play().catch(() => {
      // Browser verweigert Ton ohne Geste → stumme Vorschau weiterlaufen lassen.
      tonVerweigert.current = true;
      perHover.current = false;
      v.muted = true;
      v.loop = true;
      setze("vorschau");
      if (!ruhig.current) v.play().catch(() => {});
    });
  }, []);

  const hover = () => {
    if (modusRef.current !== "vorschau" || ruhig.current) return;
    const aktiv = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
    // Nach einer Ablehnung nur neu versuchen, wenn inzwischen eine Geste da war.
    if (tonVerweigert.current && !aktiv?.hasBeenActive) return;
    perHover.current = true;
    mitTon();
  };

  const klick = () => {
    const v = video.current;
    if (!v) return;
    if (modusRef.current === "vorschau") {
      perHover.current = false;
      return mitTon();
    }
    if (modusRef.current === "ton" && perHover.current) {
      perHover.current = false;
      return;
    }
    if (modusRef.current === "ton") {
      v.pause();
      return setze("pause");
    }
    v.play().catch(() => {});
    setze("ton");
  };

  const ende = () => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.currentTime = 0;
    setze("vorschau");
    if (!ruhig.current) v.play().catch(() => {});
  };

  const label = modus === "vorschau" ? texte.ton : modus === "ton" ? texte.pause : texte.weiter;

  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div
        ref={rahmen}
        onMouseEnter={hover}
        className="relative aspect-video w-full overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated sm:rounded-[28px]"
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={video}
          src={videoUrl}
          poster={posterUrl}
          muted
          playsInline
          preload="metadata"
          onEnded={ende}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={klick}
          aria-label={label}
          className="group absolute inset-0 block h-full w-full cursor-pointer text-left"
        >
          {modus !== "ton" && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-ink-cream/90 py-1.5 pl-1.5 pr-3.5 text-[12px] font-semibold text-white backdrop-blur-sm transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-hover:scale-[1.03] sm:bottom-6 sm:left-6 sm:py-2 sm:pl-2 sm:pr-4 sm:text-[14px]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-akzent sm:h-8 sm:w-8" aria-hidden>
                {modus === "pause" ? (
                  <svg width="12" height="13" viewBox="0 0 18 20" fill="none">
                    <path d="M1 1.8v16.4c0 .7.76 1.13 1.36.77l14-8.2a.9.9 0 0 0 0-1.54l-14-8.2A.9.9 0 0 0 1 1.8Z" fill="#161613" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="#161613" />
                    <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="#161613" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </span>
              {modus === "pause" ? texte.weiter : texte.ton}
            </span>
          )}
        </button>
      </div>
      {/* Endowed Progress: startet gefüllt, läuft vorn schneller. */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line-subtle" aria-hidden>
        <span
          ref={balken}
          className="block h-full w-full origin-left rounded-full bg-akzent-hover"
          style={{ transform: `scaleX(${ENDOWED})` }}
        />
      </div>
    </div>
  );
}
