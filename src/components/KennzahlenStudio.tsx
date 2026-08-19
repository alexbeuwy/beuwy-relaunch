"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { KURVEN, type KundenKurve, type Punkt } from "@/lib/kunden-kurven";

/**
 * Kennzahlen-Dashboard: drei echte Kunden, drei eigene Achsen.
 *
 * Bewusst KEINE gemeinsame Skala und keine übereinandergelegten Kurven.
 * Partner, Mitarbeiter und Abschlussvolumen sind nicht vergleichbar; ein
 * gemeinsames Diagramm würde eine Vergleichbarkeit behaupten, die es
 * nicht gibt. Stattdessen: ein großes Diagramm für den aktiven Kunden,
 * die anderen als kleine Kurven auf den Schaltflächen — wer angetippt
 * wird, kommt nach vorn.
 *
 * Gezeichnet werden nur belegte Stände. Zwischen zwei Punkten läuft eine
 * Gerade, keine geschwungene Kurve: eine Kurve würde einen Verlauf
 * behaupten, den niemand gemessen hat.
 *
 * Das SVG trägt nur Geometrie und wird verzerrt skaliert
 * (preserveAspectRatio="none"), damit es jede Kartenbreite füllt. Jede
 * Beschriftung liegt deshalb als HTML darüber — Text im gestreckten SVG
 * würde mitverzerrt.
 */

/* Rechenfläche in Prozent der Zeichenfläche — Rand lässt Platz für die
   Achsenbeschriftung, die als HTML darüber liegt. */
const R = { links: 9, rechts: 3, oben: 12, unten: 16 };

/** X-Positionen: bei Jahreszahlen echte Abstände, sonst gleichmäßig. */
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

function zahl(n: number): string {
  return n.toLocaleString("de-DE");
}

function useGeometrie(kurve: KundenKurve) {
  return useMemo(() => {
    const anteile = xAnteile(kurve.punkte);
    const maxWert = Math.max(...kurve.punkte.map((p) => p.wert));
    /* 12 % Luft nach oben, damit die Wertbeschriftung über dem höchsten
       Punkt nicht am Kartenrand klebt. */
    const ober = rundeObergrenze(maxWert * 1.12);

    const breite = 100 - R.links - R.rechts;
    const hoehe = 100 - R.oben - R.unten;
    const basis = R.oben + hoehe;

    const koords = kurve.punkte.map((p, i) => ({
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
  }, [kurve]);
}

/** Die kleine Kurve auf der Schaltfläche — dieselbe Form, ohne Achsen. */
function MiniKurve({ kurve, aktiv }: { kurve: KundenKurve; aktiv: boolean }) {
  const anteile = xAnteile(kurve.punkte);
  const max = Math.max(...kurve.punkte.map((p) => p.wert)) || 1;
  const punkte = kurve.punkte
    .map((p, i) => `${2 + anteile[i] * 76},${26 - (p.wert / max) * 22}`)
    .join(" ");
  return (
    <svg className="kz-mini" viewBox="0 0 80 30" aria-hidden="true" focusable="false">
      <polyline
        points={punkte}
        fill="none"
        stroke={aktiv ? "var(--orange-bright)" : "currentColor"}
        strokeWidth={aktiv ? 2.5 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KennzahlenStudio({ titel, intro }: { titel: string; intro: string }) {
  const [aktivId, setAktivId] = useState(KURVEN[0].id);
  const kurve = KURVEN.find((k) => k.id === aktivId) ?? KURVEN[0];
  const geo = useGeometrie(kurve);
  const verlaufId = useId();

  return (
    <div className="kz">
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
        {kurve.kennzahlen.map((k) => (
          <div key={k.label} className="kz-karte">
            <p className="kz-karte-label">{k.label}</p>
            <p className="kz-karte-wert tnum">{k.wert}</p>
            <p className="kz-karte-hinweis">{k.hinweis}</p>
          </div>
        ))}
      </div>

      <figure className="kz-figur">
        <figcaption className="kz-achse-titel">{kurve.einheit}</figcaption>

        <div className="kz-flaeche">
          <svg
            className="kz-chart"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            role="img"
            aria-label={`${kurve.kunde}: ${kurve.einheit}. ${kurve.punkte
              .map((p) => `${p.zeit}: ${p.anzeige ?? zahl(p.wert)}`)
              .join(". ")}.`}
          >
            <defs>
              <linearGradient id={verlaufId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--orange-bright)" stopOpacity="0.36" />
                <stop offset="100%" stopColor="var(--orange-bright)" stopOpacity="0" />
              </linearGradient>
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
                  y1={R.oben - 4}
                  x2={k.x}
                  y2={geo.basis}
                  className="kz-startlinie"
                  vectorEffect="non-scaling-stroke"
                />
              ))}

            <polygon points={geo.flaeche} fill={`url(#${verlaufId})`} />
            <polyline
              points={geo.linie}
              fill="none"
              className="kz-linie"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Beschriftung als HTML: im gestreckten SVG würde sie verzerren. */}
          {geo.raster.map((r) => (
            <span
              key={`rt${r.y}`}
              className="kz-rasterwert tnum"
              style={{ top: `${r.y}%`, left: `${R.links}%` }}
            >
              {zahl(r.wert)}
            </span>
          ))}

          {/* Eine Null am Startpunkt doppelt die Achsenbeschriftung darunter */}
          {geo.koords
            .filter((k) => k.punkt.wert > 0)
            .map((k) => (
              <span
                key={`pw${k.punkt.zeit}`}
                className="kz-punktwert tnum"
                style={{ top: `${k.y}%`, left: `${k.x}%` }}
              >
                {k.punkt.anzeige ?? zahl(k.punkt.wert)}
              </span>
            ))}

          {geo.koords.map((k) => (
            <span
              key={`pz${k.punkt.zeit}`}
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
                style={{ top: `${R.oben - 4}%`, left: `${k.x}%` }}
              >
                Start beuwy
              </span>
            ))}

          {/* Punkte zuletzt, damit sie über der Fläche und unter nichts liegen */}
          {geo.koords.map((k) => (
            <span
              key={`pk${k.punkt.zeit}`}
              className="kz-punkt"
              data-start={k.punkt.start ? "true" : "false"}
              style={{ top: `${k.y}%`, left: `${k.x}%` }}
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
              onClick={() => setAktivId(k.id)}
            >
              <span className="kz-knopf-text">
                <span className="kz-knopf-name">{k.kunde}</span>
                <span className="kz-knopf-branche">{k.branche}</span>
              </span>
              <MiniKurve kurve={k} aktiv={aktiv} />
            </button>
          );
        })}
      </div>

      <p className="kz-fuss">
        Punkte sind belegte Stände, die Linie verbindet sie — dazwischen wird
        nichts behauptet. {kurve.quelle}.{" "}
        <Link href={`/cases/${kurve.slug}`} className="kz-link">
          Die ganze Geschichte
        </Link>
      </p>
    </div>
  );
}
