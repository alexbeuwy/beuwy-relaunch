import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { rich } from "./RichText";
import { GelbeKarte, KreisDeko } from "./MaklerElemente";

/**
 * Gemeinsame Bausteine für die drei Cluster-Vergleichsseiten (F1–F3:
 * BOTTIMMO-Alternative · Maklerwebsite-Kosten · Maklersoftware-Vergleich,
 * Leaf-Auftrag: "kompakter als D-Seiten, gemeinsamer Stil"). Ein
 * typografischer Hero (~55vh, KreisDeko statt Foto-Zwang) und ein
 * identischer Abschluss (GelbeKarte + CTA + Fußnote + Quervernetzung).
 * Baut auf MaklerElemente auf, erfindet keine neue Karten-/Marker-Sprache.
 * `primaryHref`/`anfrageHref` werden bewusst als Pflicht-Prop von jeder
 * Seite explizit als "/anfrage" hereingereicht (statt hier fix verdrahtet),
 * damit der CTA-Link direkt im Quelltext jeder Seite sichtbar bleibt.
 */

const PFEIL = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path
      d="M1 7h11M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function AnfrageCta({
  href,
  label = "Zusammenarbeit anfragen",
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover ${className}`}
    >
      {label}
      <span className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5">
        {PFEIL}
      </span>
    </Link>
  );
}

export function ClusterHero({
  zurueckHref = "/immobilienmarketing",
  zurueckLabel = "Zur Immobilienmarketing-Übersicht",
  eyebrow,
  titel,
  sub,
  primaryHref,
  ctaLabel2,
  ctaHref2,
}: {
  zurueckHref?: string;
  zurueckLabel?: string;
  eyebrow: string;
  titel: string;
  sub: string;
  primaryHref: string;
  ctaLabel2?: string;
  ctaHref2?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line-subtle bg-bg-base">
      <KreisDeko className="right-[6%] top-[20%] hidden lg:block" />
      <span
        className="pointer-events-none absolute -left-16 bottom-0 z-0 hidden h-64 w-64 rounded-full border border-line-medium/60 lg:block"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[55dvh] max-w-[1120px] flex-col justify-center px-6 pb-16 pt-32 lg:px-10">
        <Link
          href={zurueckHref}
          className="t-small w-fit transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
        >
          ← {zurueckLabel}
        </Link>
        <p className="t-label !text-ink-yellow mt-8">{eyebrow}</p>
        <h1 className="t-display mt-4 max-w-[17ch]">{rich(titel)}</h1>
        <p className="t-body-lg mt-6 max-w-[42rem]">{sub}</p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <AnfrageCta href={primaryHref} />
          {ctaLabel2 && ctaHref2 && (
            <Link
              href={ctaHref2}
              className="text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
            >
              {ctaLabel2}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

/**
 * Zeilen-Baustein — Ersatz für Karten: trennt Vergleichs-/Preis-/
 * Software-Punkte durch Haarlinien statt durch Boxen-in-Boxen. Trägt
 * selbst KEINE Border, weil jede Zeile einzeln in <Reveal> steht (eigener
 * Wrapper-Div) — :first-child-Tricks würden dort pro Zeile neu greifen.
 * Stattdessen bekommt die Liste über <RailListe> Border-Top + divide-y.
 */
export function Rail({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`py-8 md:py-10 ${className}`}>{children}</div>;
}

/** Umschließt eine Folge von <Reveal><Rail>…</Rail></Reveal>-Zeilen mit
 *  einer Trennlinie zwischen den Zeilen (divide-y greift auf die direkten
 *  Kind-Elemente — hier die Reveal-Wrapper — unabhängig davon, was darin
 *  liegt) plus einer Linie über der ersten Zeile. */
export function RailListe({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`divide-y divide-line-subtle border-t border-line-subtle ${className}`}>
      {children}
    </div>
  );
}

export function ClusterAbschluss({
  karteLabel,
  karteTitel,
  karteText,
  schlussTitel,
  schlussText,
  primaryHref,
  footnote,
  weitereLinks,
}: {
  karteLabel: string;
  karteTitel: string;
  karteText: string;
  schlussTitel: string;
  schlussText?: string;
  primaryHref: string;
  footnote?: string;
  weitereLinks: { label: string; href: string }[];
}) {
  return (
    <section className="border-t border-line-subtle bg-bg-elevated py-20 md:py-28">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
        <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-16">
          <GelbeKarte label={karteLabel} titel={karteTitel} glyph>
            {karteText}
          </GelbeKarte>
          <div>
            <p className="t-h3 max-w-[30ch]">{schlussTitel}</p>
            {schlussText && <p className="t-body mt-4 max-w-[38rem]">{schlussText}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <AnfrageCta href={primaryHref} />
            </div>
            {footnote && <p className="t-small mt-8 max-w-[38rem]">{footnote}</p>}
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-line-subtle pt-8">
          <span className="t-label !text-[10.5px]">Weitere Vergleiche</span>
          {weitereLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="t-small transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-ink-cream"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
