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
 * R2-5 (Erweiterung, Alex 26.08) — Zielgruppenseite Kapitalanlage-Vertriebe.
 * Eigener Pain (gekaufte Listen statt planbarem Zufluss, skalierende
 * Partnerstrukturen, Qualifizierung nach Einkommen/Anlagehorizont,
 * Anleger-Kommunikation bis zum Notartermin) — kein Recycling der Makler-,
 * Projektentwickler- oder Bauträger-Copy. Beweis-Anker: Königswege-Case
 * (Finanzvertrieb, 170 → 2.200+ Partner). Foto 8 ist die für dieses Leaf
 * zugeteilte Aufnahme (Berater-Runde im Gespräch, BRIEF §9-Zuteilung).
 * Kein Loft-Video, siehe Begründung in marketing-projektentwickler —
 * "im Zweifel Foto".
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Marketing für Immobilienvertriebe: Kapitalanleger statt Listenkauf | beuwy",
  description:
    "beuwy baut Kapitalanlage-Vertrieben ein Portal, das Interessenten registriert, nach Einkommen und Anlagehorizont qualifiziert und dem richtigen Berater zuordnet, bis zum Notartermin.",
  openGraph: {
    title: "Marketing für Immobilienvertriebe: Kapitalanleger statt Listenkauf | beuwy",
    description:
      "Ein Portal, das Interessenten registriert, nach Einkommen und Anlagehorizont qualifiziert und dem richtigen Berater zuordnet, bis zum Notartermin.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Eine gekaufte Liste bringt dieselbe Adresse an drei Vertriebe gleichzeitig.",
    answer:
      "Wer zuerst anruft, bekommt das Gespräch, nicht wer das bessere Angebot hat. Sie bezahlen für einen Wettlauf um einen Kontakt, der Sie noch nicht kennt.",
  },
  {
    quote: "Ein neuer Partner bringt eigene Kontakte mit, aber kein System, das mitwächst.",
    answer:
      "Ohne eine Struktur, die Anfragen automatisch verteilt und nachverfolgt, bremst jeder zusätzliche Partner das Team eher, als dass er es skaliert.",
  },
  {
    quote: "Der Interessent füllt ein Formular aus, doch niemand weiß, ob er überhaupt investieren kann.",
    answer:
      "Ohne Qualifizierung nach Einkommen und Anlagehorizont sitzt Ihr Berater im Erstgespräch einem Interessenten gegenüber, der aus Neugier klickte, nicht aus Kaufabsicht.",
  },
];

const SCHRITTE = [
  {
    titel: "Ein Portal statt einer gekauften Liste",
    text: "Interessenten registrieren sich selbst, mit Angaben zu Budget und Anlagehorizont. Die Adresse gehört ab dem ersten Klick nur Ihnen.",
  },
  {
    titel: "Qualifizierung vor der Zuordnung",
    text: "Einkommen, Eigenkapital und Anlagehorizont liegen vor, bevor ein Berater den Kontakt sieht. So bekommt jeder Berater nur Interessenten, die zu seinem Angebot passen.",
  },
  {
    titel: "Automatische Zuordnung zum richtigen Berater",
    text: "Ein System verteilt jede qualifizierte Anfrage nach Region, Kapazität oder Spezialisierung, direkt und ohne Warteschleife.",
  },
  {
    titel: "Anleger-Kommunikation bis zum Notartermin",
    text: "Vom ersten Exposé bis zur Beurkundung läuft jede Nachricht automatisch, mit einem Ansprechpartner, der nach Ticketsystem arbeitet. Niemand wartet zwei Wochen auf eine Rückmeldung.",
  },
] as const;

const FAQS = [
  {
    q: "Funktioniert das Portal auch mit einer wachsenden Partnerstruktur?",
    a: "Ja, genau dafür ist es gebaut. Neue Berater lassen sich einzeln zuordnen, ohne dass die Verteilung der Anfragen manuell neu organisiert werden muss.",
  },
  {
    q: "Was heißt Qualifizierung nach Anlagehorizont konkret?",
    a: "Der Interessent beantwortet wenige Fragen zu Budget, Eigenkapital und Zeitrahmen, bevor er einem Berater zugeordnet wird. Der Berater sieht den Score, bevor er zum Hörer greift.",
  },
  {
    q: "Ersetzt das Portal unsere bestehenden Vertriebspartner?",
    a: "Nein. Es liefert ihnen qualifizierte Anfragen mit Kontext, damit sie ihre Zeit auf Gespräche verwenden, die zu einem Abschluss führen können.",
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

export default async function MarketingImmobilienvertriebPage() {
  const c = await getContent();
  const koenigswege = caseBySlug("koenigswege");

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

      {/* ── Hero — ~70vh, Foto 8, Floating Card mit Studio-Zahl ─────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(8)}
              alt="Drei Berater im Gespräch an einer Küchentheke, warmes Golden-Hour-Licht"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 24%" }}
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
            <p className="t-label !text-ink-yellow">Marketing für Immobilienvertriebe</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Marketing für Immobilienvertriebe, das *Kapitalanleger* bringt, keinen Listenkauf.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              Marketing für Immobilienvertriebe heißt: Interessenten registrieren sich über ein
              eigenes Portal, werden nach Einkommen und Anlagehorizont qualifiziert und landen
              automatisch beim passenden Berater,{" "}
              <Highlight>statt als gekaufte Adresse im Verteiler zu enden</Highlight>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — Listenkauf, Skalierung, fehlende Qualifizierung ───── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der teuerste Kontakt ist der gekaufte"
              titel="Eine Liste kennt Ihren Namen *nicht*, bevor sie bei drei anderen war."
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
              titel="Vier Stufen. Ein Portal, das *skaliert* statt streut."
              sub="beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Werbemittel abliefert. Jedes Portal ist Teil Ihrer Partnerstruktur, mit einem festen Ansprechpartner."
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
            <GelbeKarte label="Der Unterschied" titel="Eine gekaufte Liste ist kein Vertrieb. Ein Portal schon." glyph>
              Standardanbieter verkaufen dieselbe Adresse an mehrere Vertriebe gleichzeitig. Wir
              bauen Ihnen ein Portal, das jeden Interessenten registriert, qualifiziert und dem
              richtigen Berater zuordnet, bis zum Notartermin.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Königswege-Case, ein Ergebnis-Satz ──────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Von 170 auf über 2.200 Partner unter einer Marke, ein Finanzvertrieb, den wir von
              Grund auf begleitet haben.
            </p>
          </Reveal>
          {koenigswege ? (
            <div className="mt-10">
              <CaseGrid cases={[koenigswege]} />
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Anleger-Portal*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              Ein Portal für Kapitalanlage-Vertriebe ist ein Baustein unter mehreren. Einen
              Überblick über alle Bausteine finden Sie im{" "}
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
