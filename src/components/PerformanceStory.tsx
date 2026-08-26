"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MandateLoop } from "./MandateLoop";
import { makler9x16, maklerAsset } from "@/lib/cdn";
import stil from "./PerformanceStory.module.css";

/**
 * Performance-Marketing als Scrollytelling (Alex, 26.08): links kleben
 * die drei Stationen (sticky), rechts scrollen die passenden Visuals
 * durch — Anzeigen-Welt, Funnel, Kontakt-Moment. Ein
 * IntersectionObserver markiert die aktive Station. Darunter schließt
 * die Dream-State-Karte mit der Endlos-Zahl (MandateLoop) ab.
 * Mobil fällt sticky weg: Station und Visual stapeln sich paarweise.
 * Alle Bewegung über die Token-Skala; Ambient-Loops (Ad-Rotation,
 * Funnel-Punkte) sind wie die Stempeldrehung bewusste, benannte
 * Ausnahmen. reduced-motion friert die Loops ein, Inhalte stehen.
 */
const STATIONEN = [
  {
    id: "gesehen",
    schritt: "01",
    titel: "Gesehen werden",
    satz: "Anzeigen bringen Ihre Marke vor Eigentümer, die noch niemanden beauftragt haben.",
  },
  {
    id: "haengen",
    schritt: "02",
    titel: "Hängen bleiben",
    satz: "Wer klickt, landet auf einem Portal in Ihrer Liga — nicht auf einer Visitenkarte.",
  },
  {
    id: "vorstellen",
    schritt: "03",
    titel: "Sich vorstellen",
    satz: "Interessenten registrieren sich und qualifizieren sich vor, während Sie besichtigen.",
  },
] as const;

/* ── Visual 1: Anzeigen-Welt — rotierender Ad-Stapel vor einer
   Anzeigenmanager-Silhouette ─────────────────────────────────────── */
function AnzeigenVisual() {
  return (
    <div className="relative flex h-full items-center justify-center">
      {/* Manager-Silhouette hinten */}
      <div aria-hidden className="absolute inset-x-6 top-1/2 hidden -translate-y-1/2 rounded-[20px] border border-line-subtle bg-white p-5 sm:block">
        <div className="flex items-center justify-between border-b border-line-subtle pb-3">
          <span className="h-2.5 w-24 rounded-full bg-bg-hover" />
          <span className="h-2.5 w-14 rounded-full bg-bg-hover" />
        </div>
        <div className="mt-4 space-y-2.5">
          {[82, 64, 91, 48].map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="h-2 w-16 shrink-0 rounded-full bg-bg-hover" />
              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-bg-elevated">
                <span className="absolute inset-y-0 left-0 rounded-full bg-akzent" style={{ width: `${b}%` }} />
              </span>
              <span className="h-2 w-8 shrink-0 rounded-full bg-bg-hover" />
            </div>
          ))}
        </div>
      </div>
      {/* Ad-Stapel vorn: drei Story-Karten rotieren */}
      <div className={`relative h-[340px] w-[190px] ${stil.adBuehne}`}>
        {/* Echte 9:16-Assets — das ist exakt das Story-Format der Ads */}
        {(["01", "02", "03"] as const).map((foto, i) => (
          <figure
            key={foto}
            className={`absolute inset-0 overflow-hidden rounded-[18px] border border-line-subtle bg-white shadow-[0_10px_30px_rgba(20,20,18,0.10)] ${stil.adKarte}`}
            style={{ "--k": i } as React.CSSProperties}
          >
            <Image src={makler9x16(foto)} alt="" fill sizes="190px" className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 pt-8">
              <span className="block text-[10px] font-medium uppercase tracking-[0.08em] text-white/75">
                Gesponsert · Ihre Marke
              </span>
              <span className="mt-1 block h-2 w-3/4 rounded-full bg-white/85" />
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ── Visual 2: das Funnel-Band — organisch verjüngend wie ein
   Analytics-Funnel (Inspo Alex 26.08), in drei Gelb-Schichten eines
   Hues (sequential, außen hell → Kern kräftig). Die Chips tragen die
   Prozente in Tinte-Pills, die Stufen stehen als weiße Pills an den
   Trennlinien. Zwischenwerte sind bewusst als Schema gekennzeichnet —
   nur die 5 % am Ende ist die kommunizierte Quote (mk.pm.quote). ── */
const FUNNEL_STUFEN = [
  { anteil: 100, label: null },
  { anteil: 38, label: "Bleiben dran" },
  { anteil: 14, label: "Rechner gestartet" },
  { anteil: 5, label: "Registriert & qualifiziert" },
] as const;

/** Weicher Funnel-Pfad: Plateaus je Stufe, S-Kurven an den Wechseln. */
function funnelPfad(halbhoehen: number[], xs: number[], cy: number, uebergang = 34) {
  let oben = `M ${xs[0]} ${cy - halbhoehen[0]}`;
  for (let i = 0; i < halbhoehen.length; i++) {
    const bis = xs[i + 1];
    if (i < halbhoehen.length - 1) {
      const h1 = cy - halbhoehen[i];
      const h2 = cy - halbhoehen[i + 1];
      oben += ` L ${bis - uebergang} ${h1} C ${bis} ${h1}, ${bis} ${h2}, ${bis + uebergang} ${h2}`;
    } else {
      oben += ` L ${bis} ${cy - halbhoehen[i]}`;
    }
  }
  let unten = "";
  for (let i = halbhoehen.length - 1; i >= 0; i--) {
    const von = xs[i + 1];
    const bis = xs[i];
    if (i === halbhoehen.length - 1) unten += ` L ${von} ${cy + halbhoehen[i]}`;
    if (i > 0) {
      const h1 = cy + halbhoehen[i];
      const h2 = cy + halbhoehen[i - 1];
      unten += ` L ${bis + uebergang} ${h1} C ${bis} ${h1}, ${bis} ${h2}, ${bis - uebergang} ${h2}`;
    } else {
      unten += ` L ${bis} ${cy + halbhoehen[i]}`;
    }
  }
  return oben + unten + " Z";
}

function FunnelVisual() {
  const B = 560;
  const H = 250;
  const cy = 118;
  const xs = [0, 168, 322, 452, B];
  // Halbhöhen je Schicht — ein Hue, außen hell, Kern kräftig
  const kern = [86, 34, 15, 7];
  const mitte = kern.map((h) => Math.min(h * 1.45, 96));
  const aussen = kern.map((h) => Math.min(h * 1.95, 104));

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative w-full max-w-[560px]">
        <svg viewBox={`0 0 ${B} ${H}`} className="h-auto w-full" role="img" aria-label="Funnel: von 100 % Besuchern zu 5 % registrierten, qualifizierten Kontakten">
          {/* Trennlinien */}
          {xs.slice(1, -1).map((x) => (
            <line key={x} x1={x} y1={10} x2={x} y2={H - 34} stroke="var(--line-subtle)" strokeWidth="1" />
          ))}
          {/* drei Schichten, ein Hue */}
          <path d={funnelPfad(aussen, xs, cy)} fill="var(--akzent-wash)" />
          <path d={funnelPfad(mitte, xs, cy)} fill="rgba(243, 226, 127, 0.5)" />
          <path d={funnelPfad(kern, xs, cy)} fill="var(--akzent)" />
          {/* Prozent-Chips in Tinte auf Plateau-Mitte */}
          {FUNNEL_STUFEN.map((stufe, i) => {
            const x = (xs[i] + xs[i + 1]) / 2;
            const breit = stufe.anteil === 100 ? 52 : stufe.anteil >= 10 ? 44 : 38;
            return (
              <g key={stufe.anteil}>
                <rect x={x - breit / 2} y={cy - 13} rx={13} width={breit} height={26} fill="var(--ink-cream)" />
                <text x={x} y={cy + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#ffffff">
                  {stufe.anteil} %
                </text>
              </g>
            );
          })}
          {/* Stufen-Pills unten an den Trennlinien — lange Labels brechen
              am „&" in zwei Zeilen, sonst überdecken sich die Nachbarn */}
          {FUNNEL_STUFEN.map((stufe, i) => {
            if (!stufe.label) return null;
            const zeilen =
              stufe.label.length > 16 && stufe.label.includes(" & ")
                ? stufe.label.split(" & ").map((t, k) => (k === 0 ? `${t} &` : t))
                : [stufe.label];
            const breit = Math.max(...zeilen.map((z) => z.length)) * 6.8 + 20;
            const hoch = zeilen.length === 1 ? 22 : 34;
            const oben = H - 8 - hoch;
            return (
              <g key={stufe.label}>
                <rect x={xs[i] - breit / 2} y={oben} rx={11} width={breit} height={hoch} fill="#ffffff" stroke="var(--line-medium)" />
                {zeilen.map((z, k) => (
                  <text
                    key={z}
                    x={xs[i]}
                    y={oben + (zeilen.length === 1 ? 15 : 14 + k * 12)}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="500"
                    fill="var(--ink-cream)"
                  >
                    {z}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="t-small mt-4 max-w-[46ch] text-center">
        Schematischer Verlauf — Ihre echten Quoten stehen jeden Montag im
        Wochenbericht, nicht im Bauchgefühl.
      </p>
    </div>
  );
}

/* ── Visual 3: der Kontakt-Moment — Foto + einschwebende Anfrage ──── */
function KontaktVisual() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative aspect-[4/3] w-full max-w-[440px] overflow-hidden rounded-[20px] border border-line-subtle">
        <Image
          src={maklerAsset(2)}
          alt="Beratungsgespräch aus der beuwy-Kampagnenwelt"
          fill
          sizes="440px"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-white/80">
          AI Visual
        </span>
      </div>
      <div className={`absolute -bottom-5 left-1/2 w-[min(320px,85%)] -translate-x-1/2 rounded-2xl border border-line-subtle bg-white/95 p-4 shadow-[0_10px_30px_rgba(20,20,18,0.12)] backdrop-blur-sm sm:left-auto sm:right-0 sm:translate-x-0 ${stil.anfrageKarte}`}>
        <p className="t-label !text-[9.5px]">Neue qualifizierte Anfrage</p>
        <p className="mt-1.5 text-[14px] font-semibold text-ink-cream">Verkauf · ETW, 92 m²</p>
        <p className="mt-0.5 text-[12.5px] text-ink-muted">Rückruf gewünscht ab 17 Uhr · Quelle: Rechner</p>
      </div>
    </div>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  gesehen: AnzeigenVisual,
  haengen: FunnelVisual,
  vorstellen: KontaktVisual,
};

export function PerformanceStory({
  quote,
  mandate,
  provision,
}: {
  quote: string;
  mandate: string;
  provision: string;
}) {
  const [aktiv, setAktiv] = useState<string>(STATIONEN[0].id);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.isIntersecting) setAktiv((e.target as HTMLElement).dataset.station ?? "");
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    Object.values(panelRefs.current).forEach((n) => n && obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[minmax(300px,0.9fr)_1.1fr] lg:gap-16">
        {/* Sticky Stationen links */}
        <div className="hidden lg:block">
          <ol className="sticky top-32 flex flex-col gap-8">
            {STATIONEN.map((s) => {
              const istAktiv = aktiv === s.id;
              return (
                <li
                  key={s.id}
                  className="border-l-2 pl-6 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]"
                  style={{ borderColor: istAktiv ? "var(--akzent)" : "var(--line-subtle)" }}
                >
                  <p className={`t-label !text-[10.5px] transition-opacity duration-[var(--duration-fast)] ${istAktiv ? "" : "opacity-50"}`}>
                    {s.schritt}
                  </p>
                  <p className={`mt-1.5 text-[20px] font-semibold leading-snug tracking-[-0.015em] text-ink-cream transition-opacity duration-[var(--duration-fast)] ${istAktiv ? "" : "opacity-40"}`}>
                    {s.titel}
                  </p>
                  <p className={`t-body mt-1.5 max-w-[36ch] transition-opacity duration-[var(--duration-fast)] ${istAktiv ? "" : "opacity-40"}`}>
                    {s.satz}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Visuals rechts (mobil: Station + Visual paarweise) */}
        <div className="flex flex-col gap-16 lg:gap-0">
          {STATIONEN.map((s) => {
            const Visual = VISUALS[s.id];
            return (
              <div
                key={s.id}
                data-station={s.id}
                ref={(n) => {
                  panelRefs.current[s.id] = n;
                }}
                className="lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center"
              >
                <div className="mb-5 lg:hidden">
                  <p className="t-label !text-[10.5px]">{s.schritt}</p>
                  <p className="mt-1.5 text-[19px] font-semibold leading-snug text-ink-cream">{s.titel}</p>
                  <p className="t-body mt-1.5">{s.satz}</p>
                </div>
                <div className="h-[380px] sm:h-[420px]">
                  <Visual />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Big Box: Dream State mit Endlos-Zahl */}
      <div className="mt-20 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
        <p className="t-body-lg max-w-[46ch]">
          Rund {quote} der erreichten Kontakte registrieren sich — Mandanten,
          Kunden, Interessenten. Der Rest ist Mathematik:
        </p>
        <div className="rounded-[28px] bg-akzent px-8 py-9 sm:px-10 lg:min-w-[400px]">
          <p className="t-label !text-ink-cream/60">Was am Ende zählt</p>
          <div className="mt-4">
            <MandateLoop startMandate={mandate} provisionText={provision} />
          </div>
        </div>
      </div>
    </div>
  );
}
