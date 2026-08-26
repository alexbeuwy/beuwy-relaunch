import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, LogoSlot, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Spitze Schwesterseite von marketing-immobilienvertrieb, fokussiert auf
 * Kapitalanlage-Vertriebe (Anlageimmobilien, Renditeobjekte statt
 * Eigennutzer). Eigener Pain (gekaufter Anleger-Lead ist teuer, mehrfach
 * verkauft und kalt; Nachschub-Abhängigkeit; Vertrauen entscheidet vor
 * Rendite; Interessenten ohne Eigenkapital verstopfen den Kalender), kein
 * Recycling der Vertriebs-, Bauträger- oder Projektentwickler-Copy.
 *
 * Kronzeuge ist acta — geprüft: KEIN Eintrag in cases.ts (nur Logo unter
 * MARKEN_SLUGS + eine Zahlenreihe in SchemaGrafiken.tsx), also kein
 * caseBySlug()/CaseGrid für acta möglich. Die Kernbeweis-Sektion trägt die
 * Zahlen deshalb direkt im Fließtext (Spitze 15 Leute, ca. 380 WE in drei
 * Jahren über Instagram-Anzeigen, ca. 40 Mio. € Volumen — Auftrag des
 * Orchestrators), mit LogoSlot("acta") als visuellem Anker und denselben
 * .case-fakten/.case-fakt-wert-Klassen wie CaseGrid, für optische
 * Konsistenz ohne die Case-Datenstruktur zu verbiegen. Vision Group ist
 * ein echter Case (slug "vision-group") und läuft regulär über CaseGrid
 * als zweite Größenordnung. Foto 8 ist die für dieses Leaf zugeteilte
 * Aufnahme (Berater-Runde im Gespräch). Kein Video, im Zweifel Foto.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Marketing für Kapitalanlage-Immobilien: Anleger statt kalter Leads | beuwy",
  description:
    "beuwy baut Vertrieben von Kapitalanlage-Immobilien ein Portal, das Anleger vor dem Termin nach Eigenkapital, Einkommen und Anlageziel qualifiziert, damit der Kalender voller Gespräche steht, die zum Abschluss führen.",
  openGraph: {
    title: "Marketing für Kapitalanlage-Immobilien: Anleger statt kalter Leads | beuwy",
    description:
      "Ein Portal, das Anleger vor dem Termin nach Eigenkapital und Anlageziel qualifiziert, damit der Kalender voller Gespräche steht, die zum Abschluss führen.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Eine gekaufte Anleger-Liste kostet beim dritten Vertrieb genauso viel wie beim ersten.",
    answer:
      "Sie kaufen keinen Kontakt, Sie kaufen einen Wettlauf. Wer zuerst anruft, bekommt das Gespräch, nicht wer das bessere Angebot hat, und die Adresse war kalt, bevor Ihr Team überhaupt gewählt hat.",
  },
  {
    quote: "Ein Monat bringt zehn Gespräche, der nächste keins, und Ihr Vertrieb dreht Däumchen.",
    answer:
      "Ohne einen Kanal, der jede Woche neue Interessenten liefert, hängt der Umsatz an der Zufälligkeit des Nachschubs, nicht an der Leistung Ihres Teams.",
  },
  {
    quote: "Ein Anleger vertraut sein Geld nicht dem Anbieter an, der aussieht wie jeder andere.",
    answer:
      "Bei Kapitalanlage entscheidet Vertrauen vor Rendite. Ein austauschbarer Auftritt kostet Ihnen den Abschluss, lange bevor der Interessent die Zahlen überhaupt gesehen hat.",
  },
];

const SCHRITTE = [
  {
    titel: "Qualifizierung vor dem Termin",
    text: "Eigenkapital, Einkommensrahmen und Anlageziel liegen vor, bevor ein Berater den Kalender öffnet. Interessenten ohne die nötigen Mittel verstopfen keinen einzigen Termin mehr.",
  },
  {
    titel: "Von der Anzeige zum vorqualifizierten Gespräch",
    text: "Eine Anzeige führt zum Rechner oder zur Registrierung, die Registrierung zu einem qualifizierten Profil. Ihr Berater sieht das Profil, bevor er zum Hörer greift.",
  },
  {
    titel: "Follow-up für die Anleger von morgen",
    text: "Wer heute noch nicht bereit ist, bleibt nicht liegen. Eine Automation hält den Kontakt, bis aus einem später ein jetzt wird.",
  },
  {
    titel: "Ein Wochenbericht statt Bauchgefühl",
    text: "Registrierungen, Qualifizierungsquote, Termine je Berater: jede Woche schwarz auf weiß, damit Entscheidungen auf Zahlen stehen, nicht auf dem Gefühl des lautesten Vertrieblers.",
  },
] as const;

const ACTA_FAKTEN = [
  { wert: "15", label: "Vertriebsleute an der Spitze" },
  { wert: "380", label: "Wohneinheiten in drei Jahren verkauft" },
  { wert: "≈ 40 Mio. €", label: "Volumen über Instagram-Anzeigen" },
] as const;

const FAQS = [
  {
    q: "Funktioniert das auch für kleinere Vertriebe?",
    a: "Ja. Die Qualifizierungslogik und die Anzeigenstruktur skalieren nach unten genauso wie nach oben. Ein Team mit fünf Beratern qualifiziert nach denselben Kriterien wie eines mit fünfzig.",
  },
  {
    q: "Woher kommen die Anleger?",
    a: "Über Anzeigen, die wir für Sie ausspielen, meist auf Instagram und Meta, genauso wie wir es bei unserem eigenen Vertrieb betrieben haben. Kein Listenkauf, keine dritte Adresse.",
  },
  {
    q: "Wie schnell steht das System?",
    a: "Vier bis sechs Wochen von der Aufnahme bis zum Livegang. Den Termin bekommen Sie schriftlich, bevor das Projekt beginnt.",
  },
  {
    q: "Übernehmt ihr auch die Anzeigen?",
    a: "Ja. Wir planen, schalten und optimieren die Kampagnen selbst, mit demselben Ansatz, den wir bei unserem eigenen Vertrieb genutzt haben, nicht als Zusatzleistung eines Drittanbieters.",
  },
  {
    q: "Was unterscheidet euch von Lead-Verkäufern?",
    a: "Ein Lead-Verkäufer verkauft eine Adresse an jeden, der zahlt. Wir bauen Ihnen ein eigenes Portal, das Ihnen allein gehört. Wir haben ein Anleger-Geschäft selbst betrieben, nicht nur beraten.",
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

export default async function MarketingKapitalanlageImmobilienPage() {
  const c = await getContent();
  const visionGroup = caseBySlug("vision-group");

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
            <p className="t-label !text-ink-yellow">Marketing für Kapitalanlage-Vertriebe</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Marketing für Kapitalanlage-Vertriebe, das *vorqualifizierte Anleger* bringt, keine kalten Listen.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              Marketing für Kapitalanlage-Immobilien heißt: Anzeigen führen zu einem eigenen
              Portal, das Anleger nach Eigenkapital, Einkommen und Anlageziel qualifiziert, bevor
              ein Berater den Termin sieht,{" "}
              <Highlight>statt eine gekaufte Adresse an drei Vertriebe gleichzeitig zu
              verteilen</Highlight>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — teure kalte Leads, Nachschub, Vertrauen ───────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der teuerste Anleger ist der gekaufte"
              titel="Eine Liste kennt Ihren Anleger *nicht*, bevor sie bei drei anderen war."
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
              titel="Vier Stufen. Ein Portal, das *qualifiziert* statt nur sammelt."
              sub="beuwy arbeitet als Unternehmensberatung für Ihren Vertrieb, nicht als Agentur, die einzelne Anzeigen abliefert. Jedes Portal ist Teil Ihrer Anleger-Akquise, mit einem festen Ansprechpartner."
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
            <GelbeKarte label="Der Unterschied" titel="Eine gekaufte Liste verkauft niemand. Ein qualifiziertes Portal schon." glyph>
              Lead-Verkäufer liefern dieselbe Adresse an so viele Vertriebe, wie sie finden. Wir
              bauen Ihnen ein Portal, das Anleger selbst gewinnt, vor dem ersten Anruf
              qualifiziert und dem richtigen Berater zuordnet.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Kernbeweis — eigene Sektion: acta (Fließtext, kein Case-Eintrag) ── */}
      {/*    + Vision Group als zweite Größenordnung über CaseGrid ─────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Beweis, kein Beispiel"
              titel="Wir haben *diesen* Vertrieb selbst aufgebaut, mit eigenem Geld."
              sub="Bevor wir für andere Kapitalanlage-Vertriebe bauten, haben wir selbst verkauft. Kein Fallbeispiel, kein Pitch, ein eigener Vertrieb mit eigenem Risiko."
              className="max-w-[760px]"
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 lg:grid-cols-[1fr,1.15fr] lg:gap-16">
              <div className="flex flex-col justify-center">
                <LogoSlot name="acta" slug="acta" hoehe={26} />
                <p className="t-body mt-5 max-w-[42ch]">
                  Bei acta stand unsere eigene Vertriebsspitze bei 15 Leuten. Über drei Jahre
                  haben wir rund 380 Wohneinheiten verkauft, ausschließlich über
                  Instagram-Anzeigen gewonnen, ein Volumen von rund 40 Mio. €. Wir kennen
                  Anleger-Akquise aus eigenem Geld, nicht aus Fallstudien.
                </p>
              </div>
              <div className="case-fakten">
                {ACTA_FAKTEN.map((f) => (
                  <div key={f.label}>
                    <p className="case-fakt-wert tnum">{f.wert}</p>
                    <p className="t-data mt-1">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="t-label mt-16">Die zweite Größenordnung</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Bei Vision Group ging es um dieselbe Sprache, eine Liga größer: 1.450 Wohneinheiten
              im Höchststand, ein Joint Venture mit KKR über 160 Mio. €.
            </p>
          </Reveal>
          {visionGroup ? (
            <div className="mt-10">
              <CaseGrid cases={[visionGroup]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              Weitere Fallstudien ansehen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 5 Fragen, FaqAccordion + JSON-LD oben im Head ─────────── */}
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Anleger-System*.")}</h2>
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
