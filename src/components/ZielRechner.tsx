"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

/**
 * Ziel-Rechner — der Besucher rechnet nicht mit unserem Preis, sondern mit
 * seinem eigenen Ziel: Was bringt ein Abschluss, wie viele mehr pro Monat
 * waeren ein gutes Jahr. Alles laeuft rein im Browser, es wird nichts
 * gesendet und nichts prognostiziert.
 */

const WERT_MIN = 5_000;
const WERT_MAX = 100_000;
const WERT_STEP = 2_500;
const WERT_DEFAULT = 10_000;

const ABSCHLUESSE_MIN = 1;
const ABSCHLUESSE_MAX = 10;
const ABSCHLUESSE_DEFAULT = 2;

const euroFormat = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const zahlFormat = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 0,
});

function euro(wert: number) {
  return euroFormat.format(Math.round(wert));
}

function zahl(wert: number) {
  return zahlFormat.format(Math.round(wert));
}

/** Erstes Element aus dem Slider-Wert holen — Base UI liefert Zahl oder Liste. */
function ersterWert(value: number | readonly number[]): number {
  return Array.isArray(value) ? (value[0] ?? 0) : (value as number);
}

/**
 * Zaehlt weich auf den Zielwert. Wer Bewegung reduziert hat, bekommt den
 * Wert sofort — ohne Animation, aber mit derselben Zahl.
 */
function useSanfteZahl(ziel: number, dauer = 420) {
  const [wert, setWert] = useState(ziel);
  const startWert = useRef(ziel);
  const startZeit = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduziert =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduziert) {
      setWert(ziel);
      return;
    }

    startWert.current = wert;
    startZeit.current = performance.now();

    const schritt = (jetzt: number) => {
      const t = Math.min(1, (jetzt - startZeit.current) / dauer);
      const eased = 1 - Math.pow(1 - t, 3);
      setWert(startWert.current + (ziel - startWert.current) * eased);
      if (t < 1) {
        frame.current = requestAnimationFrame(schritt);
      }
    };

    frame.current = requestAnimationFrame(schritt);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
    // Nur der Zielwert startet eine neue Bewegung.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ziel, dauer]);

  return wert;
}

export default function ZielRechner() {
  const wertId = useId();
  const anzahlId = useId();

  const [wert, setWert] = useState(WERT_DEFAULT);
  const [abschluesse, setAbschluesse] = useState(ABSCHLUESSE_DEFAULT);

  const monat = wert * abschluesse;
  const jahr = monat * 12;
  const jahrAbschluesse = abschluesse * 12;

  const jahrAnimiert = useSanfteZahl(jahr);
  const monatAnimiert = useSanfteZahl(monat);

  const href = `/termin?ziel=${encodeURIComponent(String(jahr))}&abschluss=${encodeURIComponent(
    String(wert)
  )}`;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-base">Ihr Ziel, in Zahlen</CardTitle>
        <CardDescription>
          Zwei Regler. Danach wissen wir beide, worüber wir sprechen.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-7">
        {/* Regler 1 — Wert eines Abschlusses */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span id={wertId} className="text-sm text-ink-cream">
              Was bringt Ihnen ein Abschluss?
            </span>
            <span className="font-display text-lg leading-none tracking-display tabular-nums text-ink-cream">
              {euro(wert)}
            </span>
          </div>
          <Slider
            aria-labelledby={wertId}
            value={[wert]}
            min={WERT_MIN}
            max={WERT_MAX}
            step={WERT_STEP}
            largeStep={10_000}
            onValueChange={(value) => setWert(ersterWert(value))}
            className="touch-pan-y"
          />
          <div className="flex justify-between text-xs text-ink-dim tabular-nums">
            <span>{euro(WERT_MIN)}</span>
            <span>{euro(WERT_MAX)}</span>
          </div>
        </div>

        {/* Regler 2 — zusaetzliche Abschluesse pro Monat */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span id={anzahlId} className="text-sm text-ink-cream">
              Wie viele Abschlüsse mehr pro Monat wären ein gutes Jahr?
            </span>
            <span className="font-display text-lg leading-none tracking-display tabular-nums text-ink-cream">
              {zahl(abschluesse)}
            </span>
          </div>
          <Slider
            aria-labelledby={anzahlId}
            value={[abschluesse]}
            min={ABSCHLUESSE_MIN}
            max={ABSCHLUESSE_MAX}
            step={1}
            largeStep={2}
            onValueChange={(value) => setAbschluesse(ersterWert(value))}
            className="touch-pan-y"
          />
          <div className="flex justify-between text-xs text-ink-dim tabular-nums">
            <span>{zahl(ABSCHLUESSE_MIN)}</span>
            <span>{zahl(ABSCHLUESSE_MAX)}</span>
          </div>
        </div>

        {/* Ergebnis */}
        <div
          aria-live="polite"
          className={cn(
            "rounded-[12px] border border-line-subtle bg-bg-elevated",
            "px-5 py-5 sm:px-6 sm:py-6"
          )}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <span className="block text-xs tracking-wide text-ink-muted uppercase">
                Mehr Umsatz im Jahr
              </span>
              <span className="mt-2 block font-display text-[2.75rem] leading-none tracking-display tabular-nums text-sky sm:text-[3.5rem]">
                +{euro(jahrAnimiert)}
              </span>
            </div>
            <div className="shrink-0 sm:text-right">
              <span className="block text-xs tracking-wide text-ink-muted uppercase">
                Pro Monat
              </span>
              <span className="mt-2 block font-display text-xl leading-none tracking-display tabular-nums text-ink-cream">
                +{euro(monatAnimiert)}
              </span>
            </div>
          </div>

          <p className="mt-5 border-t border-line-subtle pt-4 text-sm leading-relaxed text-ink-cream">
            {zahl(jahrAbschluesse)} zusätzliche Abschlüsse im Jahr, jeder{" "}
            {euro(wert)} wert. Das ist das Ziel, über das wir reden.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button size="lg" render={<Link href={href} />}>
          Dieses Ziel besprechen →
        </Button>
        <p className="text-xs leading-relaxed text-ink-dim">
          Keine Prognose — Ihre Zahlen, Ihre Rechnung.
        </p>
      </CardFooter>
    </Card>
  );
}
