import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster W) — /eigentuemer-leads-generieren.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, danach eine
 * Vergleichs-Tabelle (eigene Quelle vs. gemieteter Portal-Kontakt) und ein
 * Zweispalter zur 5%-Kette, gespeist aus den Studio-Werten mk.pm.* (siehe
 * PerformanceStory/StartOben) statt neu erfundener Zahlen. GelbeKarte,
 * textlicher Beweis-Anriss (Riegel), FAQ + FAQPage-JSON-LD. Foto 4 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Eigentümer-Leads generieren: Die eigene Quelle statt Portal-Miete | beuwy",
  description:
    "Eigentümer-Leads generieren: eigene Quelle statt gemieteter Portal-Kontakte, die jeder Wettbewerber bekommt. beuwy baut Rechner, Anzeigen und Portal als System.",
  openGraph: {
    title: "Eigentümer-Leads generieren: Die eigene Quelle statt Portal-Miete | beuwy",
    description:
      "Eigene Lead-Quelle statt gemieteter Portal-Kontakte, die jeder Wettbewerber ebenfalls bekommt. beuwy baut Rechner, Anzeigen und Portal als ein System nach der 5%-Systematik.",
    type: "website",
    locale: "de_DE",
  },
};

const VERGLEICH = [
  {
    merkmal: "Exklusivität",
    eigen: "Landet nur in Ihrem System",
    portal: "oft an 3–5 Makler gleichzeitig verkauft",
  },
  {
    merkmal: "Vorwissen des Eigentümers",
    eigen: "kennt Ihren Namen, bevor er anruft",
    portal: "kennt nur ein ausgefülltes Formular",
  },
  {
    merkmal: "Lebensdauer",
    eigen: "bleibt bestehen, arbeitet weiter",
    portal: "endet mit dem gebuchten Abo",
  },
  {
    merkmal: "Qualifizierung",
    eigen: "Score liegt bei Registrierung im CRM",
    portal: "Roh-Kontakt ohne Vorqualifizierung",
  },
  {
    merkmal: "Kostenlogik",
    eigen: "Investition in eigene Sichtbarkeit",
    portal: "laufende Miete pro Kontakt",
  },
] as const;

const KETTE = [
  { anteil: "100 %", label: "Anzeige gesehen", text: "Ihre Marke erscheint bei Eigentümern, die noch niemanden beauftragt haben." },
  { anteil: "38 %", label: "Bleiben dran", text: "Wer klickt, landet auf einem Portal, nicht auf einer Visitenkarte." },
  { anteil: "14 %", label: "Rechner gestartet", text: "Adresse rein, Ersteinschätzung raus, der erste konkrete Schritt." },
  { anteil: "5 %", label: "Registriert & qualifiziert", text: "Die kommunizierte Quote: Der Eigentümer liegt mit Score im CRM." },
] as const;

const FAQS = [
  {
    q: "Wie viele Eigentümer-Leads kann ich realistisch pro Monat erwarten?",
    a: "Das hängt von Ihrer Region, dem Werbebudget und der Zahl der Eigentümer ab, die dort gerade verkaufen. Die Kette selbst ist planbar (Anzeige, Klick, Rechner, Registrierung), die Menge am Ende nicht ohne Ihren Markt zu kennen. Eine feste Zahl nennen wir erst nach dem ersten Blick auf Ihre Region.",
  },
  {
    q: "Was kostet ein selbst generierter Lead im Vergleich zum gekauften?",
    a: "Anders als beim gekauften Kontakt sinken die Kosten je registriertem Eigentümer meist, je länger die eigene Quelle läuft, weil Rechner und Portal weiterarbeiten, ohne dass jede Anzeige neu bezahlt wird. Eine pauschale Zahl wäre unseriös, das hängt zu stark von Region und Wettbewerb ab.",
  },
  {
    q: "Ersetzt die eigene Quelle Portale wie ImmoScout komplett?",
    a: "Nein. Bleiben Sie dort gelistet, Portale ersetzen wir nicht. Wir bauen daneben die Quelle auf, die Ihnen gehört und nicht endet, sobald ein Wettbewerber mehr für dieselbe Anzeige zahlt.",
  },
  {
    q: "Brauche ich dafür ein neues CRM?",
    a: "Nicht zwingend. Die Anfrage muss nur strukturiert in Ihr bestehendes System einlaufen, mit Quelle und nächstem Schritt, statt im Postfach liegen zu bleiben.",
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

export default async function EigentuemerLeadsGenerierenPage() {
  const c = await getContent();
  const quote = c["mk.pm.quote"] ?? "5 %";
  const mandate = c["mk.pm.mandate"] ?? "5";
  const provision = c["mk.pm.provision"] ?? "31.285 €";

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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Akquise</p>
            <h1 className="t-display mt-4">
              {rich("Eigentümer-Leads, die *Ihnen* gehören.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie generieren Eigentümer-Leads, indem Sie eine{" "}
              <Highlight>eigene Quelle</Highlight> bauen statt gemietete Kontakte einzukaufen:
              eine Anzeige, die auf einen Bewertungsrechner führt, der eine Adresse in eine
              Ersteinschätzung verwandelt und den Eigentümer mit Score direkt in Ihr System
              registriert. Ein gekaufter Lead kennt Ihren Namen nicht, bevor das Telefon klingelt,
              und wird oft an mehrere Makler gleichzeitig verkauft. Eine eigene Quelle gehört
              ausschließlich Ihnen und arbeitet weiter, auch während Sie eine Besichtigung führen.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 lg:px-10">
          <Reveal delay={80}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
              <Image
                src={maklerAsset(4)}
                alt="Eigentümer gibt eine Adresse in den Bewertungsrechner ein"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — eigene Quelle vs. gemieteter Kontakt ───────── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Unterschied auf einen Blick"
              titel="Eigene Quelle gegen *gemieteten* Kontakt."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Merkmal</th>
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">
                      Eigene Quelle (Rechner + Ads + Portal)
                    </th>
                    <th className="t-label py-3 font-semibold">Gemieteter Portal-Kontakt</th>
                  </tr>
                </thead>
                <tbody>
                  {VERGLEICH.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.eigen}</td>
                      <td className="t-body py-4 tnum">{row.portal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zweispalter — die 5%-Kette, gespeist aus mk.pm.* ────────────────── */}
      <section id="kette" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die 5 %-Systematik"
              titel="Vier Stufen, bis aus einer Anzeige ein *Mandat* wird."
              sub="Jede Stufe hat eine realistische Quote statt Bauchgefühl. Das Ende der Kette ist die Zahl, die zählt: Wie viele Eigentümer registrieren sich qualifiziert."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="divide-y divide-line-subtle border-t border-line-subtle">
              {KETTE.map((stufe, i) => (
                <Reveal key={stufe.label} delay={i * 60}>
                  <div className="flex items-baseline justify-between gap-6 py-6">
                    <div>
                      <p className="t-h3">{stufe.label}</p>
                      <p className="t-body mt-2 max-w-[42ch]">{stufe.text}</p>
                    </div>
                    <p className="font-display shrink-0 text-[26px] font-bold tracking-[-0.01em] text-ink-yellow tnum">
                      {stufe.anteil}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="rounded-[28px] border border-line-subtle bg-bg-elevated p-8">
                <p className="t-label">Was das im Jahr bedeutet</p>
                <p className="mt-4 font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                  {quote}
                </p>
                <p className="t-body mt-2">
                  registrierte und qualifizierte Eigentümer, gemessen an allen, die die Anzeige
                  sehen.
                </p>
                <div className="mt-8 border-t border-line-subtle pt-6">
                  <p className="t-data !text-ink-cream tnum">{mandate} zusätzliche Mandate</p>
                  <p className="t-small mt-1">im Jahr, bei Ø {provision} Provision je Mandat.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Gemietet ist nicht Ihres." glyph>
              Ein gekaufter Kontakt gehört dem Portal, das ihn verkauft, nicht Ihnen. Eine eigene
              Quelle gehört Ihnen, arbeitet weiter, wenn Sie im Termin sind, und wird mit jeder
              Anzeige, jedem Rechner-Durchlauf wertvoller statt teurer.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Rechner als lebendes Beispiel ────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien liegt genau dieser Bewertungsrechner mit amtlichen
              Bodenrichtwerten hinter der eigenen Quelle: neun Abschlüsse, 342.000 € Volumen in den
              ersten sechs Wochen nach dem Relaunch, ohne einen einzigen gekauften Lead.
            </p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              Fallstudie RIEGEL Immobilien lesen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre eigene *Quelle*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die volle Systematik auf der Seite{" "}
              <Link href="/leadgenerierung-immobilienmakler" className="ref-link">
                Leadgenerierung für Immobilienmakler
              </Link>
              , den Rechner selbst im{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>{" "}
              und wie die Anzeigen dazu laufen im{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                Performance-Marketing für Makler
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
