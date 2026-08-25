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
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * D2 — Leadgenerierung für Immobilienmakler. VSL-Dramaturgie
 * Problem → Mechanismus (BRIEF §8-Tabelle als Sprachquelle) → Beweis
 * (Riegel-Case) → FAQ → Finale. Foto 11 ist die für dieses Leaf
 * zugeteilte, eindeutige Kampagnenaufnahme (GOAL Asset-Zuteilung).
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Leadgenerierung für Immobilienmakler: Eigentümer statt Kontakte | beuwy",
  description:
    "Kein gemieteter Portal-Kontakt: beuwy baut Immobilienmaklern die eigene Quelle für Eigentümer-Anfragen — Sichtbarkeit, Bewertungsrechner und CRM-Anbindung als ein System.",
  openGraph: {
    title: "Leadgenerierung für Immobilienmakler: Eigentümer statt Kontakte | beuwy",
    description:
      "beuwy baut die eigene Quelle für Eigentümer-Anfragen — Sichtbarkeit, Bewertungsrechner und CRM-Anbindung als ein System, nicht als gemieteter Portal-Kontakt.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Derselbe Eigentümer bekommt an einem Abend vier Anrufe.",
    answer:
      "Lead-Portale verkaufen eine Adresse an mehrere Makler gleichzeitig. Wer zuerst anruft, führt das Gespräch — nicht wer den besseren Marktpreis nennt. Sie bezahlen für einen Wettlauf, nicht für einen Kunden.",
  },
  {
    quote: "Wer über ein Portal kommt, vergleicht drei Provisionen, bevor er Ihren Namen kennt.",
    answer:
      "Der Kontakt hat noch keine Meinung von Ihnen — nur ein Formular ausgefüllt. Er prüft Angebote, nicht Menschen. Die Beziehung, die einen Alleinauftrag rechtfertigt, fängt bei null an.",
  },
  {
    quote: "Ein gekaufter Kontakt kennt Ihren Namen nicht, bevor das Telefon klingelt.",
    answer:
      "Er weiß nicht, wer Sie sind, was Sie verkauft haben oder warum er Ihnen vertrauen sollte. Jedes Gespräch beginnt bei der Einwandbehandlung — nie beim Verkaufen.",
  },
];

const SCHRITTE = [
  {
    titel: "Sichtbarkeit dort, wo Eigentümer suchen",
    text: "Wenn „Makler + Stadtteil“ gegoogelt wird, steht Ihr Name über dem Portal.",
  },
  {
    titel: "Der Rechner qualifiziert, während Sie besichtigen",
    text: "Adresse rein, Ersteinschätzung raus — der Verkäufer-Lead bekommt sofort einen Score.",
  },
  {
    titel: "Die Anfrage landet im CRM, nicht im Postfach",
    text: "Jede Anfrage kommt mit Quelle und nächstem Schritt an. Keine Zettel, kein Copy-Paste, kein vergessener Rückruf.",
  },
  {
    titel: "Automatisches Nachfassen über Monate",
    text: "Wer heute nicht verkauft, bekommt in 6 Monaten die richtige Mail. Automatisch.",
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

export default async function LeadgenerierungPage() {
  const c = await getContent();
  const riegel = caseBySlug("riegel-immobilien");

  return (
    <>
      {/* ── Hero — ~70vh, Foto 11, Layering per Floating Card ──────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(11)}
              alt="Makler bespricht eine Eigentümer-Anfrage mit Score-Wert auf dem Tablet"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "72% 32%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            {/* Floating Card — Ergebnis-Kennzahl, Studio-editierbar über mk.stats.s2 */}
            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">Ergebnis bei Bestandskunden</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s2_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s2_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">Eigene Quelle statt Portal-Kontakt</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Leadgenerierung für Immobilienmakler — *Eigentümer*, keine Adressen.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[34rem]">
              Lead-Portale verkaufen denselben Kontakt an mehrere Makler zeitgleich. Unser System
              sorgt dafür, dass{" "}
              <Highlight>Eigentümer Sie finden, bevor sie beim Portal ankommen</Highlight> — und
              die Anfrage bei Ihnen landet, nicht bei drei Konkurrenten gleichzeitig.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — warum gekaufte Leads die teuersten sind ──────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Problem mit gekauften Leads"
              titel="Der teuerste Lead ist der, den *drei andere* Makler auch gerade anrufen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, Feindbild Lead-Portale ─────────── */}
      <section id="system" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Stufen. Eine Quelle, die *Ihnen* gehört."
              sub="Ein Lead-Portal endet, sobald Sie aufhören zu zahlen. Ein eigenes System bleibt und arbeitet weiter — auch am Wochenende, auch im Termin."
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
            <GelbeKarte label="Der Unterschied" titel="Portale vermieten Ihnen Kontakte." glyph>
              Wir bauen Ihnen die Quelle: eine eigene Sichtbarkeit, die Ihnen gehört — nicht
              gemietet, nicht geteilt, nicht kündbar durch einen Algorithmus.
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
              Sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen — ohne einen
              einzigen gekauften Lead.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ — 3 Fragen, natives details/summary ─────────────────────── */}
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
            <details className="faq-item">
              <summary className="faq-trigger">
                <span className="t-h3">Wie lange dauert es bis zu den ersten Eigentümer-Anfragen?</span>
                <span aria-hidden className="shrink-0 text-2xl font-light leading-none text-ink-dim">
                  +
                </span>
              </summary>
              <div className="faq-panel-inner">
                <p className="t-body">
                  Sichtbarkeit und Rechner stehen innerhalb von vier bis sechs Wochen. Die ersten
                  qualifizierten Anfragen kommen meist in den Wochen danach — abhängig von Ihrem
                  Markt und davon, wie viele Eigentümer dort gerade verkaufen. Eine feste Zahl
                  nennen wir erst, wenn wir Ihren Markt kennen.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-trigger">
                <span className="t-h3">Funktioniert das auch in kleinen Märkten?</span>
                <span aria-hidden className="shrink-0 text-2xl font-light leading-none text-ink-dim">
                  +
                </span>
              </summary>
              <div className="faq-panel-inner">
                <p className="t-body">
                  Ja — mit angepasster Erwartung. In einer Kleinstadt suchen weniger Menschen
                  gleichzeitig einen Makler als in einer Großstadt, also kommen weniger Anfragen,
                  aber genauso qualifizierte. Sichtbarkeit vor Ort wirkt dort sogar leichter, weil
                  kaum ein Mitbewerber sie überhaupt aufbaut.
                </p>
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-trigger">
                <span className="t-h3">Was ist mit Portalen wie ImmoScout?</span>
                <span aria-hidden className="shrink-0 text-2xl font-light leading-none text-ink-dim">
                  +
                </span>
              </summary>
              <div className="faq-panel-inner">
                <p className="t-body">
                  Bleiben Sie dort gelistet. Portale ersetzen wir nicht — wir ergänzen sie um das,
                  was ihnen fehlt: eine Quelle, die nur Ihnen gehört und nach dem ersten Klick
                  weiterarbeitet, statt den Kontakt an den Nächstbietenden weiterzureichen.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Links zu Hub + Schwesterseite im Text ─────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre eigene *Quelle*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              Leadgenerierung ist der erste Baustein. Die meisten Makler kombinieren sie mit einer
              eigenen{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                Maklerwebsite
              </Link>
              , die den Rechner trägt. Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
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
