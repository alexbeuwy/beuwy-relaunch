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
 * Zielgruppenseite E-Mail-Marketing für Immobilienmakler. Eigener Pain
 * (der ungeöffnete Newsletter, schlummernde CRM-Kontakte neben teuer
 * eingekauften Leads, das vergessene Follow-up, Massen-Mails, die nach
 * Massen-Mail riechen) und ein eigener Mechanismus (Follow-up-Automation,
 * personalisierte Datenmails statt Newsletter, Terminanfragen nach
 * Dringlichkeit, Wochenbericht statt Bauchgefühl). Gleiche XXL-Systematik
 * und Element-Bibliothek wie marketing-bautraeger und
 * marketing-projektentwickler. Foto 13 ist die für dieses Leaf zugeteilte
 * Aufnahme — im Gegensatz zu den Querformaten 1–11 ein Hochformat, die
 * Hero-Plate übernimmt deshalb die Hochformat-Proportionen (analog
 * onoffice-website statt marketing-bautraeger).
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "E-Mail-Marketing für Immobilienmakler: Das Postfach verkauft mit | beuwy",
  description:
    "beuwy baut Immobilienmaklern automatisiertes E-Mail-Marketing: Follow-up, der nichts vergisst, personalisierte Datenmails zum Objekt statt Massen-Newsletter, Terminanfragen nach Dringlichkeit sortiert.",
  openGraph: {
    title: "E-Mail-Marketing für Immobilienmakler: Das Postfach verkauft mit | beuwy",
    description:
      "Automatisiertes E-Mail-Marketing statt Massen-Newsletter: Follow-up, der nichts vergisst, personalisierte Datenmails zum Objekt, Terminanfragen nach Dringlichkeit sortiert, ein Wochenbericht statt Bauchgefühl.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Der Newsletter geht am Monatsanfang raus. Die Öffnungsrate sagt, dass ihn kaum einer liest.",
    answer:
      "Ein Verteiler, der jeden Monat dieselbe Nachricht an alle schickt, wird irgendwann übersehen, noch bevor er geöffnet wird. Die Adresse bleibt im System, das Vertrauen nicht.",
  },
  {
    quote: "Hunderte Kontakte liegen im CRM, während die nächste Anzeigenkampagne wieder neue Leads einkauft.",
    answer:
      "Bestandskontakte kosten nichts mehr, sobald sie einmal da sind. Wer sie liegen lässt und stattdessen für jeden neuen Kontakt zahlt, verbrennt Budget für etwas, das im eigenen System schon wartet.",
  },
  {
    quote: "Der Eigentümer, der vor vier Monaten sagte, er verkauft vielleicht nächstes Jahr, hat gerade beim Wettbewerber unterschrieben.",
    answer:
      "Ohne eine Regel, die genau diesen Moment nachhält, verschwindet die Notiz in einer Liste, die niemand mehr öffnet. Der Wettbewerber ruft an, wenn Sie längst weitergezogen sind.",
  },
  {
    quote: "Jede Mail riecht nach Massen-Mail, noch bevor der Eigentümer sie öffnet.",
    answer:
      "„Sehr geehrte Damen und Herren“ und ein Betreff wie ein Werbeprospekt verraten den Verteiler auf den ersten Blick. Was wie an alle gerichtet wirkt, landet im Kopf auch wie an niemanden, und im Zweifel im Papierkorb.",
  },
];

const SCHRITTE = [
  {
    titel: "Follow-up, das niemand vergisst",
    text: "Wer heute nicht verkauft, bekommt in sechs Monaten automatisch die richtige E-Mail. Die Regel merkt sich den Kontakt, nicht Ihr Kopf.",
  },
  {
    titel: "Personalisierte Datenmails statt Massen-Newsletter",
    text: "Jede Mail bezieht sich auf ein konkretes Objekt, einen Rechner-Wert oder eine Preisänderung. Kein Verteiler, der an tausend gleiche Adressen geht.",
  },
  {
    titel: "Terminanfragen sortieren sich selbst",
    text: "Nach Dringlichkeit und Objektwert: Der heiße Verkäufer-Lead landet oben in Ihrer Liste, die reine Info-Anfrage weiter unten.",
  },
  {
    titel: "Jede Mail zahlt aufs Portal ein",
    text: "Registrierung, Rechner, Termin: Jede Nachricht führt zurück ins System. Der Wochenbericht zeigt, was ankommt, statt dass Sie raten müssen.",
  },
] as const;

const FAQS = [
  {
    q: "Woher kommen die Kontakte für die E-Mails?",
    a: "Aus Ihrem eigenen System: Eigentümer, die den Bewertungsrechner genutzt haben, Interessenten, die sich fürs Portal registriert haben, und Bestandskontakte aus Ihrem CRM. Wir verschicken nicht an gekaufte Adresslisten.",
  },
  {
    q: "Ist das DSGVO-konform machbar?",
    a: "Ja, mit sauberer Einwilligung: Double-Opt-in bei neuen Kontakten, ein klarer Abmeldelink in jeder Mail, dokumentierte Zustimmung im System. Wir bauen den Prozess technisch sauber auf, für die rechtliche Bewertung im Einzelfall empfehlen wir trotzdem die Rücksprache mit Ihrem Datenschutzbeauftragten oder Anwalt.",
  },
  {
    q: "Wie persönlich sind automatische Mails wirklich?",
    a: "Persönlicher als die meisten von Hand getippten Rundmails. Jede Mail zieht Name, Objekt und den letzten Schritt des Kontakts, kein „Sehr geehrte Damen und Herren“, sondern ein Satz, der zu dem passt, was diese Person gerade tatsächlich getan hat.",
  },
  {
    q: "Wie viele Mails sind zu viele?",
    a: "Weniger, als Sie denken, wenn jede Mail einen Grund hat. Die Regel richtet sich nach dem Schritt des Kontakts, nicht nach einem Kalender. Wer sich abmeldet, bekommt keine weitere Mail, das Portal merkt sich das.",
  },
  {
    q: "Funktioniert das mit onOffice oder meinem CRM?",
    a: "Ja. Die Automation dockt an onOffice, FLOWFACT, Propstack, JUSTIMMO oder CasaOne an. Jede Mail wird im System dokumentiert, mit Quelle und nächstem Schritt, kein Zettel, kein Copy-Paste.",
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

export default async function EmailMarketingImmobilienmaklerPage() {
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

      {/* ── Hero — ~70vh, Foto 13 (Hochformat), Floating Card mit Studio-Zahl ── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[40vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(13)}
              alt="Premium-Büroszene aus der beuwy-Kampagnenwelt, Symbolbild für automatisiertes E-Mail-Marketing im Maklerbüro"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 14%" }}
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

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[43vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">E-Mail-Marketing für Immobilienmakler</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("E-Mail-Marketing für Immobilienmakler, das *verkauft*, nicht nur verschickt.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              E-Mail-Marketing für Makler heißt: Jeder Kontakt bekommt automatisiert und
              personalisiert die Mail, die zu seinem Moment passt —{" "}
              <Highlight>vom ersten Rechner-Ergebnis bis zur Erinnerung sechs Monate
              später</Highlight>, ohne dass jemand von Hand nachfasst.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — ungeöffneter Newsletter, schlummerndes CRM, vergessenes Follow-up ── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ihr Postfach arbeitet nicht für Sie"
              titel="Hunderte Kontakte warten. Ihr Postfach bleibt *stumm*."
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
              titel="Vier Stufen. Ein Postfach, das *mitverkauft*."
              sub="beuwy arbeitet als Unternehmensberatung für Ihr Vertriebssystem, nicht als Agentur, die einzelne Kampagnen verschickt. E-Mail-Marketing ist Teil Ihres Portals, mit einem festen Ansprechpartner."
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

      {/* ── Der Unterschied — GelbeKarte, Postfach als Teil der regionalen Dominanz ── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Newsletter ist kein System. Ihr Postfach schon." glyph>
              Standardanbieter verschicken einmal im Monat dieselbe Nachricht an alle und hoffen
              auf eine Öffnung. Wir bauen Ihrem Postfach ein System: automatisiert, personalisiert,
              verbunden mit Portal und Rechner — ein Baustein der regionalen Dominanz, die
              Eigentümer an Sie erinnert, lange bevor sie verkaufen wollen.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Case, Rückrufregel als konkreter Beleg ────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen, ohne einen
              einzigen gekauften Lead.
            </p>
            <p className="t-body mt-4 max-w-[54ch]">
              Ein Teil davon lief automatisch: Die Rückrufregel schickt jedem Eigentümer, der
              heute nicht verkauft, in sechs Monaten von selbst die passende E-Mail.
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

      {/* ── FAQ — 5 Fragen, FaqAccordion + JSON-LD oben im Head ─────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *ersten* Versand wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Links zu Hub + Cases im Text ──────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Postfach-System*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              E-Mail-Marketing ist ein Baustein unter mehreren. Einen Überblick über alle
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
