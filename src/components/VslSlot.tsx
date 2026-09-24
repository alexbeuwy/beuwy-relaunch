"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiPille } from "./AiPille";
import { HERO_POSTER, HERO_VIDEO, PORTRAIT_VIDEO, maklerAsset } from "@/lib/cdn";
import { VSL_FRONT_DEFAULTS } from "@/lib/texte/vsl";

/**
 * 9:16-Slot für das VSL-Video (Alex nimmt es mit OBS auf). Solange
 * keine Video-URL im Studio hinterlegt ist, steht ein bewegter
 * Platzhalter: das Portrait-Loop-Video aus der Kampagnenwelt, geladen
 * erst wenn der Slot im Viewport steht (5,2 MB, BRIEF §9) — davor und
 * ohne JS trägt das Poster. Die Sektion bricht nie leer.
 *
 * Studio-Key: `vsl.url` (leer = Platzhalter). Formate: mp4/webm-URL.
 *
 * `format="breit"` (Frontseite /system): 16:9-Bühne statt Hochkant, mit
 * dem Landscape-Hero-Poster und dem Hero-Loop als Platzhalter — gleiche
 * Logik, gleiche Studio-URL, nur der Rahmen ist ein anderer.
 *
 * `posterUrl`: eigenes Vorschaubild (z. B. Standbild aus dem Film). Es ist
 * kein KI-Bild, darum entfällt dann die AI-Pille. URLs dürfen absolut
 * (http…) oder relativ zu /public (/video/…) sein.
 */
export function VslSlot({
  videoUrl,
  posterNummer = 14,
  posterUrl,
  format = "hoch",
  platzhalterText = VSL_FRONT_DEFAULTS["mk.vsl.platzhalter"],
}: {
  videoUrl?: string;
  posterNummer?: number;
  /** Eigenes Vorschaubild statt Kampagnen-Poster (kein KI-Bild → ohne AI-Pille). */
  posterUrl?: string;
  format?: "hoch" | "breit";
  /** Studio-Key mk.vsl.platzhalter — Pill, solange kein Video hinterlegt ist. */
  platzhalterText?: string;
}) {
  const [spielt, setSpielt] = useState(false);
  const [imViewport, setImViewport] = useState(false);
  const rahmen = useRef<HTMLDivElement>(null);
  const istUrl = (u?: string): u is string => Boolean(u && (u.startsWith("http") || u.startsWith("/")));
  const hatVideo = istUrl(videoUrl);
  const eigenesPoster = istUrl(posterUrl);
  const breit = format === "breit";
  const poster = eigenesPoster ? posterUrl : breit ? HERO_POSTER : maklerAsset(posterNummer);
  const platzhalter = breit ? HERO_VIDEO : PORTRAIT_VIDEO;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // studio:ok
    const node = rahmen.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setImViewport(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rahmen}
      className={
        breit
          ? "relative mx-auto aspect-video w-full max-w-[880px] overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated sm:rounded-[28px]"
          : "relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[24px] border border-line-subtle bg-bg-elevated"
      }
    >
      {hatVideo && spielt ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          src={videoUrl}
          poster={eigenesPoster ? posterUrl : undefined}
          autoPlay
          controls
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => hatVideo && setSpielt(true)}
          disabled={!hatVideo}
          aria-label={hatVideo ? "Video abspielen" : "Video folgt in Kürze"}
          className="group relative block h-full w-full text-left"
        >
          <Image
            src={poster}
            alt="Einblick in die Arbeit von beuwy"
            fill
            sizes={breit ? "(min-width: 1024px) 880px, 100vw" : "340px"}
            className="object-cover"
          />
          {/* Bewegter Platzhalter über dem Poster, erst im Viewport geladen */}
          {imViewport && !hatVideo && (
            <video
              src={platzhalter}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {!eigenesPoster && <AiPille />}
          {/* Eigenes Poster (Filmstandbild) bleibt ungetrübt — der Verlauf
              dient nur den Kampagnenfotos. */}
          {!eigenesPoster && (
            <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          )}
          {/* Play-Glyph nur, wenn es wirklich etwas abzuspielen gibt — der
              Platzhalter-Loop verspricht sonst einen Klick ins Leere. */}
          {hatVideo && (
          <span
            className={`absolute grid place-items-center rounded-full bg-white/90 ${
              eigenesPoster
                ? "bottom-3 left-3 h-10 w-10 sm:bottom-7 sm:left-7 sm:h-16 sm:w-16"
                : "left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
            } shadow-[0_1px_2px_rgba(20,20,18,0.12)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] group-hover:scale-105`}
            aria-hidden
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className={eigenesPoster ? "h-3.5 w-3 sm:h-5 sm:w-[18px]" : undefined}>
              <path d="M1 1.8v16.4c0 .7.76 1.13 1.36.77l14-8.2a.9.9 0 0 0 0-1.54l-14-8.2A.9.9 0 0 0 1 1.8Z" fill="#161613" />
            </svg>
          </span>
          )}
          {!hatVideo && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-ink-muted backdrop-blur-sm">
              {platzhalterText}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
