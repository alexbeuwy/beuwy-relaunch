"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  HERKUNFT_LABEL,
  KURVEN,
  type KundenKurve,
  type Punkt,
  type Strang,
} from "@/lib/kunden-kurven";

/**
 * Kennzahlen-Dashboard: drei echte Kunden, jeder mit eigener Achse.
 *
 * Bewusst KEINE gemeinsame Skala und keine übereinandergelegten Kurven.
 * Vertriebspartner, Mitarbeiter und Exposé-Aufrufe sind nicht
 * vergleichbar; ein gemeinsames Diagramm würde eine Vergleichbarkeit
 * behaupten, die es nicht gibt. Stattdessen ein großes Diagramm für den
 * aktiven Kunden, die anderen als kleine Kurven auf den Schaltflächen.
 *
 * Gezeichnet werden nur belegte Stände, verbunden durch eine Gerade —
 * eine geschwungene Kurve würde einen Verlauf behaupten, den niemand
 * gemessen hat. Jeder Strang trägt sichtbar seine Herkunft.
 *
 * Das SVG trägt nur Geometrie und wird verzerrt skaliert, damit es jede
 * Kartenbreite füllt. Jede Beschriftung liegt deshalb als HTML darüber:
 * Text im gestreckten SVG würde mitverzerren.
 */

/* Rechenfläche in Prozent. Die linke Rinne muss die Achsenbeschriftung
   tragen — auf schmalen Karten braucht dieselbe Zahl anteilig mehr Platz,
   sonst wird sie abgeschnitten. */
function rahmen(schmal: boolean) {
  return { links: schmal ? 19 : 10, rechts: 4, oben: 14, unten: 16 };
}

function xAnteile(punkte: Punkt[]): number[] {
  const jahre = punkte.map((p) => Number(p.zeit));
  if (jahre.every((j) => Number.isFinite(j))) {
    const min = Math.min(...jahre);
    const max = Math.max(...jahre);
    return jahre.map((j) => (max === min ? 0 : (j - min) / (max - min)));
  }
  return punkte.map((_, i) => (punkte.length < 2 ? 0 : i / (punkte.length - 1)));
}

/** Nächstgrößerer runder Wert — damit an der Achse 2.500 steht, nicht 2.596. */
function rundeObergrenze(wert: number): number {
  if (wert <= 0) return 1;
  const stufe = Math.pow(10, Math.floor(Math.log10(wert)));
  for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (m * stufe >= wert) return m * stufe;
  }
  return 10 * stufe;
}

const zahl = (n: number) => n.toLocaleString("de-DE");

/** Achsenbeschriftung kurz halten: 500.000 wird zu "500 Tsd.". */
function kurz(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString("de-DE")} Mio.`;
  if (n >= 10_000) return `${(n / 1000).toLocaleString("de-DE")} Tsd.`;
  return zahl(n);
}

function useGeometrie(strang: Strang, R: ReturnType<typeof rahmen>) {
  return useMemo(() => {
    const anteile = xAnteile(strang.punkte);
    const maxWert = Math.max(...strang.punkte.map((p) => p.wert));
    const ober = rundeObergrenze(maxWert * 1.12);

    const breite = 100 - R.links - R.rechts;
    const hoehe = 100 - R.oben - R.unten;
    const basis = R.oben + hoehe;

    const koords = strang.punkte.map((p, i) => ({
      punkt: p,
      x: R.links + anteile[i] * breite,
      y: basis - (p.wert / ober) * hoehe,
    }));

    const linie = koords.map((k) => `${k.x},${k.y}`).join(" ");
    const flaeche = `${koords[0].x},${basis} ${linie} ${koords[koords.length - 1].x},${basis}`;
    const raster = [0, 0.5, 1].map((f) => ({
      y: basis - f * hoehe,
      wert: Math.round(ober * f),
    }));

    return { koords, linie, flaeche, raster, basis };
  }, [strang, R]);
}

/** Kleine Kurve auf der Schaltfläche — der erste Strang, ohne Achsen. */
function MiniKurve({ kurve, aktiv }: { kurve: KundenKurve; aktiv: boolean }) {
  const punkte = kurve.straenge[0].punkte;
  const anteile = xAnteile(punkte);
  const max = Math.max(...punkte.map((p) => p.wert)) || 1;
  const d = punkte.map((p, i) => `${2 + anteile[i] * 72},${26 - (p.wert / max) * 22}`).join(" ");
  return (
    <svg className="kz-mini" viewBox="0 0 76 30" aria-hidden="true" focusable="false">
      <polyline
        points={d}
        fill="none"
        stroke={aktiv ? "var(--orange-bright)" : "currentColor"}
        strokeWidth={aktiv ? 2.6 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KennzahlenStudio({ titel, intro }: { titel: string; intro: string }) {
  const [aktivId, setAktivId] = useState(KURVEN[0].id);
  const [strangId, setStrangId] = useState(KURVEN[0].straenge[0].id);
  const [sichtbar, setSichtbar] = useState(false);
  const [schmal, setSchmal] = useState(false);
  const wurzel = useRef<HTMLDivElement>(null);
  const verlaufId = useId();
  const glowId = useId();

  const kurve = KURVEN.find((k) => k.id === aktivId) ?? KURVEN[0];
  const strang = kurve.straenge.find((s) => s.id === strangId) ?? kurve.straenge[0];
  const R = useMemo(() => rahmen(schmal), [schmal]);
  const geo = useGeometrie(strang, R);

  /* Slow Reveal: einmalig beim Eintritt ins Bild. Wer Bewegung reduziert
     haben will, sieht sofort den Endzustand. */
  useEffect(() => {
    const el = wurzel.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setSichtbar(true);
      return;
    }
    const obs = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setSichtbar(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Die Rinne haengt an der tatsaechlichen Kartenbreite, nicht am
     Viewport: die Karte steht auch auf breiten Screens in einer Spalte. */
  useEffect(() => {
    const el = wurzel.current;
    if (!el) return;
    const messen = () => setSchmal(el.clientWidth < 560);
    messen();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(messen);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function waehleKunde(k: KundenKurve) {
    setAktivId(k.id);
    setStrangId(k.straenge[0].id);
  }

  return (
    <div className="kz" ref={wurzel} data-sichtbar={sichtbar ? "true" : "false"}>
      <header className="kz-kopf">
        <div>
          <h3 className="kz-titel">{titel}</h3>
          <p className="kz-unter">{intro}</p>
        </div>
        <div className="kz-leit">
          <p className="kz-leit-label">{kurve.leitzahlLabel}</p>
          <p className="kz-leit-wert tnum">{kurve.leitzahl}</p>
        </div>
      </header>

      <div className="kz-karten">
        {kurve.kennzahlen.map((k, i) => (
          <div key={k.label} className="kz-karte" style={{ "--i": i } as React.CSSProperties}>
            <p className="kz-karte-label">{k.label}</p>
            <p className="kz-karte-wert tnum">{k.wert}</p>
            <p className="kz-karte-hinweis">{k.hinweis}</p>
            <span className="kz-herkunft" data-art={k.herkunft}>
              {HERKUNFT_LABEL[k.herkunft]}
            </span>
          </div>
        ))}
      </div>

      <figure className="kz-figur">
        <div className="kz-figurkopf">
          <figcaption className="kz-achse-titel">
            {strang.einheit}
            {strang.herkunft === "schaetzung" ? (
              <span className="kz-herkunft kz-herkunft--achse" data-art="schaetzung">
                {HERKUNFT_LABEL.schaetzung}
              </span>
            ) : null}
          </figcaption>
          {kurve.straenge.length > 1 ? (
            <div className="kz-straenge" role="group" aria-label="Kennzahl auswählen">
              {kurve.straenge.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="kz-strang"
                  data-aktiv={s.id === strang.id ? "true" : "false"}
                  aria-pressed={s.id === strang.id}
                  onClick={() => setStrangId(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="kz-flaeche">
          <svg
            className="kz-chart"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            role="img"
            aria-label={`${kurve.kunde}, ${strang.einheit}. ${strang.punkte
              .map((p) => `${p.zeit}: ${p.anzeige ?? zahl(p.wert)}`)
              .join(". ")}.`}
          >
            <defs>
              <linearGradient id={verlaufId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--orange-bright)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--orange-bright)" stopOpacity="0" />
              </linearGradient>
              <filter id={glowId} x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="1.6" result="unschaerfe" />
                <feMerge>
                  <feMergeNode in="unschaerfe" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {geo.raster.map((r) => (
              <line
                key={r.y}
                x1={R.links}
                y1={r.y}
                x2={100 - R.rechts}
                y2={r.y}
                className="kz-raster"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {geo.koords
              .filter((k) => k.punkt.start)
              .map((k) => (
                <line
                  key={`s${k.x}`}
                  x1={k.x}
                  y1={R.oben - 5}
                  x2={k.x}
                  y2={geo.basis}
                  className="kz-startlinie"
                  vectorEffect="non-scaling-stroke"
                />
              ))}

            {/* Die Zeichnung wird als Ganzes aufgewischt. Kein
                stroke-dasharray: das vertraegt sich nicht mit
                non-scaling-stroke, wenn das SVG ungleichmaessig
                skaliert wird — die Linie zerfaellt dann in Striche. */}
            <g key={strang.id} className="kz-zeichnung">
              <polygon
                className="kz-flaechenfuellung"
                points={geo.flaeche}
                fill={`url(#${verlaufId})`}
              />
              {/* Glühender Zwilling hinter der Linie — traegt keine Information */}
              <polyline
                points={geo.linie}
                fill="none"
                className="kz-glow"
                filter={`url(#${glowId})`}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                aria-hidden="true"
              />
              <polyline
                points={geo.linie}
                fill="none"
                className="kz-linie"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>

          {/* Beschriftung als HTML — im gestreckten SVG würde sie verzerren. */}
          {geo.raster.map((r) => (
            <span
              key={`rt${r.y}`}
              className="kz-rasterwert tnum"
              style={{ top: `${r.y}%`, left: `${R.links}%` }}
            >
              {kurz(r.wert)}
            </span>
          ))}

          {geo.koords
            .filter((k) => k.punkt.wert > 0)
            .map((k, i) => (
              <span
                key={`pw${strang.id}${k.punkt.zeit}`}
                className="kz-punktwert tnum"
                style={{ top: `${k.y}%`, left: `${k.x}%`, "--i": i } as React.CSSProperties}
              >
                {k.punkt.anzeige ?? zahl(k.punkt.wert)}
              </span>
            ))}

          {geo.koords.map((k) => (
            <span
              key={`pz${strang.id}${k.punkt.zeit}`}
              className="kz-punktzeit tnum"
              style={{ top: `${geo.basis}%`, left: `${k.x}%` }}
            >
              {k.punkt.zeit}
            </span>
          ))}

          {geo.koords
            .filter((k) => k.punkt.start)
            .map((k) => (
              <span
                key={`sm${k.x}`}
                className="kz-startmarke"
                style={{ top: `${R.oben - 5}%`, left: `${k.x}%` }}
              >
                Start beuwy
              </span>
            ))}

          {geo.koords.map((k, i) => (
            <span
              key={`pk${strang.id}${k.punkt.zeit}`}
              className="kz-punkt"
              data-start={k.punkt.start ? "true" : "false"}
              style={{ top: `${k.y}%`, left: `${k.x}%`, "--i": i } as React.CSSProperties}
              aria-hidden="true"
            />
          ))}
        </div>
      </figure>

      <div className="kz-schalter" role="group" aria-label="Kunde auswählen">
        {KURVEN.map((k) => {
          const aktiv = k.id === aktivId;
          return (
            <button
              key={k.id}
              type="button"
              className="kz-knopf"
              data-aktiv={aktiv ? "true" : "false"}
              aria-pressed={aktiv}
              onClick={() => waehleKunde(k)}
            >
              <span className="kz-knopf-text">
                {k.logo ? (
                  <Image
                    src={k.logo}
                    alt={k.kunde}
                    width={132}
                    height={26}
                    className="kz-logo"
                    unoptimized
                  />
                ) : (
                  <span className="kz-knopf-name">{k.kunde}</span>
                )}
                <span className="kz-knopf-branche">{k.branche}</span>
              </span>
              <MiniKurve kurve={k} aktiv={aktiv} />
            </button>
          );
        })}
      </div>

      <p className="kz-fuss">
        Punkte sind belegte Stände, die Linie verbindet sie — dazwischen wird
        nichts behauptet. {strang.quelle}.{" "}
        <Link href={`/cases/${kurve.slug}`} className="kz-link">
          Die ganze Geschichte
        </Link>
      </p>
    </div>
  );
}
