import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * R2-5 — Zielgruppenseite Projektentwickler. Eigener Pain (Abverkauf vor
 * Fertigstellung, Kapitalbindung, Portal statt PDF-Exposé, Reporting),
 * kein Recycling der Makler-Copy. Foto 3 ist die für dieses Leaf
 * zugeteilte Aufnahme (zwei Entscheider im Gespräch, BRIEF §9-Zuteilung).
 * Kein Loft-Video: der Lazy-Viewport-Pattern aus VslSlot.tsx braucht eine
 * eigene "use client"-Datei, und dieses Leaf darf nur die beiden
 * Seitendateien anfassen — also Foto statt Video (Auftrag: "im Zweifel Foto").
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Marketing für Projektentwickler: Abverkauf, bevor der Kran steht | beuwy",
  description:
    "beuwy baut Projektentwicklern ein Vertriebsportal, das Interessenten registriert und qualifiziert, während gebaut wird. Reporting je Bauabschnitt statt PDF-Exposés per Mail.",
  openGraph: {
    title: "Marketing für Projektentwickler: Abverkauf, bevor der Kran steht | beuwy",
    description:
      "Ein Vertriebsportal, das Interessenten registriert und qualifiziert, während gebaut wird, mit Reporting je Bauabschnitt statt PDF-Exposés per Mail.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Die Bank fragt nach dem Vorverkaufsstand, nicht nach der Fassade.",
    answer:
      "Kapitalbindung kostet jeden Monat, den eine Einheit unverkauft bleibt. Marketing, das erst zur Fertigstellung anläuft, kommt für die Finanzierungsfrage zu spät.",
  },
  {
    quote: "Jede Anfrage bekommt dasselbe PDF-Exposé, egal ob sie ernst gemeint ist.",
    answer:
      "Ohne Qualifizierung wissen Sie erst im Verkaufsgespräch, ob ein Interessent überhaupt finanzieren kann. Das kostet Termine, die nie zu einer Reservierung werden.",
  },
  {
    quote:
      "Am Monatsende fragt die Geschäftsführung nach dem Vertriebsstand, und die Antwort steht in drei verschiedenen Tabellen.",
    answer:
      "Ohne ein System, das jede Anfrage vom ersten Klick bis zur Reservierung verfolgt, bleibt Reporting eine Fleißarbeit statt einer Entscheidungsgrundlage.",
  },
];

const SCHRITTE = [
  {
    titel: "Ein Portal statt eines PDF-Verteilers",
    text: "Interessenten registrieren sich selbst, mit Budget, Etage und Wunschgröße. Kein Exposé verschwindet mehr im Postfach eines Maklers, der drei andere Projekte gleichzeitig verkauft.",
  },
  {
    titel: "Qualifizierung vor dem ersten Anruf",
    text: "Anlagehorizont, Eigenkapital und Finanzierungsstand liegen vor, bevor der Vertrieb zum Hörer greift. Nur wer ernsthaft kaufen kann, bekommt den nächsten Termin.",
  },
  {
    titel: "Reporting, das die Geschäftsführung liest",
    text: "Vorverkaufsstand, Interessentenzahl und Conversion je Bauabschnitt, jede Woche automatisch. Eine Zahl statt drei Tabellen zum Zusammensuchen.",
  },
  {
    titel: "Ein Ansprechpartner, keine Warteschleife",
    text: "Neue Preisliste, zusätzlicher Grundriss, geänderter Text: Alles läuft über ein Ticketsystem mit festem Ansprechpartner. Niemand fragt nach zwei Wochen, wie weit die Anpassung ist.",
  },
] as const;

const FAQS = [
  {
    q: "Funktioniert das Portal auch für ein einzelnes Bauprojekt, nicht nur für ein ganzes Unternehmen?",
    a: "Ja. Das Portal steht pro Projekt oder projektübergreifend, je nachdem, wie Sie vertreiben. Bei mehreren Bauabschnitten sehen Sie Vorverkaufsstand und Interessenten getrennt nach Abschnitt.",
  },
  {
    q: "Ersetzt das Portal unseren Vertriebspartner oder Makler vor Ort?",
    a: "Nein. Es qualifiziert die Anfragen, die bei Ihrem Vertrieb ankommen, und liefert sie mit Score und Kontext aus. Wer telefoniert und abschließt, bleibt Ihr Team.",
  },
  {
    q: "Wie schnell steht das Portal, bevor ein Bauabschnitt vermarktet wird?",
    a: "Vier bis sechs Wochen von der Aufnahme bis zum Livegang, wie bei jedem beuwy-Portal. Bei mehreren Bauabschnitten timen wir den Start auf Ihren Vertriebsplan.",
  },
] as const;

function PfeilRechts({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden>
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZusammenarbeitCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/anfrage"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-akzent-hover ${className}`}
    >
      Zusammenarbeit anfragen
      <PfeilRechts className="transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:translate-x-0.5" />
    </Link>
  );
}

export default async function MarketingProjektentwicklerPage() {
  const c = await getContent();
  const riegel = caseBySlug("riegel-immobilien");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero — ~70vh, Foto 3, Floating Card mit Studio-Zahl ─────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(3)}
              alt="Zwei Entscheider besprechen den Vertriebsstand eines Bauprojekts am Küchentresen, Golden-Hour-Licht"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "56% 24%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">Beweis, keine Behauptung</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s3_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s3_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">Marketing für Projektentwickler</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Marketing für Projektentwickler, das *verkauft*, bevor der Kran steht.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              Marketing für Projektentwickler heißt: Käufer und Investoren finden Ihr Projekt und
              registrieren sich über ein eigenes Portal, das sie{" "}
              <Highlight>qualifiziert, lange bevor Sie ein PDF-Exposé verschicken</Highlight>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — Kapitalbindung, PDF-Chaos, fehlendes Reporting ────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Unterschied zwischen Bauen und Verkaufen"
              titel="Ihr Kran steht. Ihr Vertrieb *nicht* immer."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, Unternehmensberatung statt Agentur ── */}
      <section id="system" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Stufen. Ein Portal, das *verkauft* statt verschickt."
              sub="beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Werbemittel abliefert. Jedes Portal ist Teil Ihres Vertriebssystems, mit einem festen Ansprechpartner."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {SCHRITTE.map((schritt, i) => (
              <Reveal key={schritt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{schritt.titel}</p>
                  <p className="t-body mt-3">{schritt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein PDF-Exposé verkauft nichts. Ein Portal schon." glyph>
              Standardanbieter verschicken Grundrisse per Mail und hoffen auf einen Rückruf. Wir
              bauen Ihnen ein Portal, das jeden Interessenten registriert, qualifiziert und dem
              richtigen nächsten Schritt zuordnet, vom ersten Klick bis zur Reservierung.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Case, ein Ergebnis-Satz ──────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen, ohne einen
              einzigen gekauften Lead.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              Weitere Fallstudien ansehen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 3 Fragen, FaqAccordion + JSON-LD oben im Head ─────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *ersten* Gespräch wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Links zu Hub + Cases im Text ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Vertriebsportal*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              Ein Portal für Projektentwickler ist ein Baustein unter mehreren. Einen Überblick
              über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , Referenzen in den{" "}
              <Link href="/cases" className="ref-link">
                Fallstudien
              </Link>
              .
            </p>
            <div className="mt-9 flex justify-center">
              <ZusammenarbeitCta />
            </div>
            <p className="t-small mt-4">Antwort innerhalb von 24 Stunden.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
