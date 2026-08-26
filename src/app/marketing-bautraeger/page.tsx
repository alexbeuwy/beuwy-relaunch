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
 * R2-5 — Zielgruppenseite Bauträger. Eigener Pain (Vermarktungsstart,
 * Reservierungen statt Anfrage-Chaos, Preislisten, Musterwohnungs-Termine,
 * Käufer-Kommunikation über Bauphasen), kein Recycling der Makler- oder
 * Projektentwickler-Copy. Foto 6 ist die für dieses Leaf zugeteilte
 * Aufnahme (Gruppe im Wohnraum, liest sich als Musterwohnungs-Besichtigung,
 * BRIEF §9-Zuteilung). Kein Loft-Video, siehe Begründung in der
 * Schwesterseite marketing-projektentwickler — "im Zweifel Foto".
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Marketing für Bauträger: Reservierungen statt Anfrage-Chaos | beuwy",
  description:
    "beuwy baut Bauträgern ein Vertriebsportal für den Vermarktungsstart: Preislisten, die sich pflegen lassen, Musterwohnungs-Termine, die sich selbst füllen, und automatische Käuferkommunikation.",
  openGraph: {
    title: "Marketing für Bauträger: Reservierungen statt Anfrage-Chaos | beuwy",
    description:
      "Ein Vertriebsportal für den Vermarktungsstart: Preislisten, die sich pflegen lassen, Musterwohnungs-Termine, die sich selbst füllen, Käuferkommunikation über jede Bauphase.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Am ersten Tag der Vermarktung klingelt das Telefon durchgehend, und niemand weiß, wer schon angerufen hat.",
    answer:
      "Ohne ein System, das jede Anfrage sofort erfasst, verlieren Sie am wichtigsten Tag der Vermarktung genau die Übersicht, die über die ersten Reservierungen entscheidet.",
  },
  {
    quote: "Die Preisliste von letzter Woche kursiert noch, obwohl sich seitdem drei Einheiten geändert haben.",
    answer:
      "Ein PDF, das per Mail verschickt wird, veraltet, sobald es verschickt ist. Interessenten vergleichen dann Preise, die längst nicht mehr stimmen, und Ihr Vertrieb erklärt Unstimmigkeiten statt zu verkaufen.",
  },
  {
    quote: "Die Musterwohnung steht bereit, aber die Terminliste kommt per Nachricht am Vorabend.",
    answer:
      "Ohne eine Terminbuchung, die selbst mitdenkt, verwaltet Ihr Team Kalender statt Käufer zu begleiten, und Doppelbuchungen kosten Vertrauen, bevor der Interessent die Wohnung überhaupt betritt.",
  },
];

const SCHRITTE = [
  {
    titel: "Reservierung statt Rückruf-Zettel",
    text: "Interessenten reservieren eine Einheit direkt im Portal, mit Zeitstempel und Priorität. Kein Zettel, der zwischen zwei Schreibtischen verschwindet.",
  },
  {
    titel: "Preislisten, die sich selbst pflegen",
    text: "Ändert sich ein Preis oder ist eine Einheit reserviert, aktualisiert sich das Exposé automatisch. Niemand verschickt mehr eine veraltete PDF von letzter Woche.",
  },
  {
    titel: "Musterwohnungs-Termine, die sich selbst füllen",
    text: "Interessenten buchen ihren Termin im freien Slot, die Bestätigung geht automatisch raus. Ihr Team führt Besichtigungen, statt Kalender zu jonglieren.",
  },
  {
    titel: "Käufer-Kommunikation über jede Bauphase",
    text: "Vom Reservierungsschreiben bis zur Übergabe löst jede Bauphase die passende Nachricht automatisch aus. Ein Ansprechpartner arbeitet nach Ticketsystem, damit niemand nach zwei Wochen fragen muss, wie weit eine Anpassung ist.",
  },
] as const;

const FAQS = [
  {
    q: "Funktioniert das Portal, wenn wir mehrere Bauträger-Projekte gleichzeitig vermarkten?",
    a: "Ja. Jedes Projekt bekommt eine eigene Preisliste, eigene Musterwohnungs-Termine und ein eigenes Reporting, alles über dasselbe Portal gesteuert.",
  },
  {
    q: "Wie schnell steht das Portal vor dem Vermarktungsstart?",
    a: "Vier bis sechs Wochen von der Aufnahme bis zum Livegang. Den Termin für den Vermarktungsstart bekommen Sie schriftlich, bevor das Projekt beginnt.",
  },
  {
    q: "Was passiert mit Interessenten, die schon vor dem Livegang auf einer Warteliste stehen?",
    a: "Die übernehmen wir ins Portal und qualifizieren sie mit, noch bevor die erste Musterwohnung öffnet.",
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

export default async function MarketingBautraegerPage() {
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

      {/* ── Hero — ~70vh, Foto 6, Floating Card mit Studio-Zahl ─────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(6)}
              alt="Gruppe von Interessenten bei einem Besichtigungstermin in einer möblierten Musterwohnung, Golden-Hour-Licht"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "48% 38%" }}
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
            <p className="t-label !text-ink-yellow">Marketing für Bauträger</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Marketing für Bauträger, das *Reservierungen* bringt, kein Anfrage-Chaos.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              Marketing für Bauträger heißt: Der Vermarktungsstart läuft über ein Portal, das
              Interessenten registriert, Preislisten aktuell hält und{" "}
              <Highlight>Musterwohnungs-Termine selbst vergibt, statt dass jede Anfrage
              einzeln im Postfach landet</Highlight>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — Vermarktungsstart, Preislisten, Musterwohnung ─────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Vermarktungsstart entscheidet"
              titel="Der *wichtigste* Tag der Vermarktung ist oft auch der chaotischste."
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
              titel="Vier Stufen. Ein Portal von der *Reservierung* bis zur Übergabe."
              sub="beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Werbemittel abliefert. Jedes Portal ist Teil Ihres Vermarktungsstarts, mit einem festen Ansprechpartner."
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
            <GelbeKarte label="Der Unterschied" titel="Anfrage-Chaos ist kein Vermarktungsstart." glyph>
              Standardanbieter schicken Interessenten ins offene Postfach und hoffen, dass jemand
              zurückruft. Wir bauen Ihnen ein Portal, das reserviert, terminiert und kommuniziert,
              vom ersten Klick bis zur Schlüsselübergabe.
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
              titel="Was Sie vor dem *Vermarktungsstart* wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihren *Vermarktungsstart*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              Ein Portal für Bauträger ist ein Baustein unter mehreren. Einen Überblick über alle
              Bausteine finden Sie im{" "}
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
