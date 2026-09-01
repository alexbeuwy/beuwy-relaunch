import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster W) — /alleinauftrag-gewinnen.
 * Antwortet die Suchfrage direkt im kompakten Wissens-Kopf (GEO-Prinzip),
 * dann Mechanismus als Nummern-Liste (die drei Checks vor dem Termin),
 * PainRows für die Rabatt-Einwände, GelbeKarte-Pointe, Riegel-Beweis,
 * FAQ + FAQPage-JSON-LD im Muster von /seo-fuer-immobilienmakler.
 * Foto 3 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Alleinauftrag gewinnen: So entscheidet sich der Eigentümer für Sie | beuwy",
  description:
    "Alleinauftrag gewinnen: Eigentümer prüfen Google, Website und Exposé vor dem Termin. beuwy baut den Auftritt, der überzeugt: Beweisführung statt Rabatt.",
  openGraph: {
    title: "Alleinauftrag gewinnen: So entscheidet sich der Eigentümer für Sie | beuwy",
    description:
      "Der Alleinauftrag fällt vor dem Termin: Google-Check, Website-Vergleich, Exposé-Qualität. beuwy baut den Auftritt, der überzeugt, bevor Sie klingeln.",
    type: "website",
    locale: "de_DE",
  },
};

const CHECKS = [
  {
    titel: "Der Google-Check",
    text: "Der Eigentümer tippt Ihren Namen oder „Makler + Stadt“ in die Suche, oft noch am Küchentisch, bevor der Termin überhaupt bestätigt ist. Was dort auftaucht, oder eben nicht auftaucht, entscheidet mit, ob er sich auf das Gespräch freut oder es nur aus Höflichkeit führt.",
  },
  {
    titel: "Der Website-Vergleich",
    text: "Drei Tabs offen, drei Makler nebeneinander: Wer wirkt wie ein Unternehmen mit über zwanzig Jahren Erfahrung, wer wie eine digitale Visitenkarte aus dem Baukasten? Diesen Vergleich trifft der Eigentümer in unter einer Minute, meist unbewusst.",
  },
  {
    titel: "Der Exposé-Blick",
    text: "Viele Eigentümer bitten vor dem ersten Termin um ein Muster-Exposé oder finden eines auf der Website. Ein Datenblatt mit Grundriss und drei Handyfotos sagt: Standard-Abwicklung. Ein Exposé mit Preis-Argumentation und durchdachten Bildern sagt: Diese Person verkauft, nicht nur verwaltet.",
  },
] as const;

const PAINS = [
  {
    quote: "„Ich biete einfach eine niedrigere Provision an, dann entscheidet sich der Eigentümer für mich.“",
    answer:
      "Ein Rabatt beantwortet keine der drei Fragen von oben. Er bestätigt sogar den Verdacht, den ein schwacher Auftritt weckt: dass hier über den Preis verkauft wird, weil sonst nichts überzeugt.",
  },
  {
    quote: "„Meine Erfahrung spricht doch für sich.“",
    answer:
      "Erfahrung, die online nicht sichtbar ist, existiert für den Eigentümer nicht. Zwanzig Jahre im Markt zählen erst, wenn Website, Exposé und Bewertungen sie belegen, nicht weil Sie sie im Termin erwähnen.",
  },
  {
    quote: "„Ich habe doch ein ImmoScout-Profil.“",
    answer:
      "Ein Portal-Profil zeigt Sie neben drei Wettbewerbern auf derselben Fläche. Es beantwortet nicht, warum der Eigentümer ausgerechnet Sie beauftragen sollte. Dafür braucht es einen eigenen Auftritt, den niemand sonst teilt.",
  },
] as const;

const FAQS = [
  {
    q: "Wie lange dauert es, bis ein neuer Auftritt beim Alleinauftrag hilft?",
    a: "Der eigene Auftritt, Website, Exposé-Vorlage, Bewertungsprofil, steht in vier bis sechs Wochen. Ab dann läuft er bei jedem neuen Termin mit. Ob er den nächsten Alleinauftrag bringt, entscheidet weiterhin das Gespräch selbst, nicht die Website allein.",
  },
  {
    q: "Reicht ein besseres Exposé nicht schon aus?",
    a: "Ein besseres Exposé hilft, ersetzt aber nicht den Google-Check und den Website-Vergleich, die meist davor liegen. Alle drei Checks zusammen entscheiden, nicht ein einzelner Baustein.",
  },
  {
    q: "Was, wenn der Eigentümer schon zwei andere Makler kennt?",
    a: "Dann läuft genau der Vergleich, um den es hier geht. Der Auftritt entscheidet, ob Sie als Dritter mithalten oder als der wirken, der die Sache versteht.",
  },
  {
    q: "Funktioniert das auch ohne Bewertungen?",
    a: "Ja, mit etwas mehr Gewicht auf Website und Exposé am Anfang. Bewertungen kommen mit jedem Abschluss dazu und verstärken den Auftritt, sie tragen ihn aber nicht allein.",
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

export default function AlleinauftragGewinnenPage() {
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

      {/* ── Wissens-Kopf — kompakt statt 70vh-Hero, Antwort direkt darunter ── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Akquise</p>
            <h1 className="t-display mt-4">
              {rich("Der Alleinauftrag fällt, bevor Sie *klingeln*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie gewinnen den Alleinauftrag, indem Sie die Entscheidung{" "}
              <Highlight>schon vor dem Termin</Highlight> für sich klären: Der Eigentümer googelt
              Ihren Namen, vergleicht drei Maklerwebsites und schaut sich an, wie ein Exposé von
              Ihnen aussieht. Wer dort überzeugt, muss im Wohnzimmer nur noch bestätigen, was er
              online schon gesehen hat. Wer dort verliert, verhandelt gegen einen Nachlass auf die
              Provision, gegen etwas, das der Eigentümer ohnehin nicht bewerten kann.
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
                src={maklerAsset(3)}
                alt="Eigentümer und Makler prüfen gemeinsam ein Exposé am Tisch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mechanismus — Nummern-Liste, die drei Checks vor dem Termin ────── */}
      <section id="checks" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Drei Checks. Und Sie sitzen noch gar nicht am *Tisch*."
              sub="Der Eigentümer trifft die Vorentscheidung, bevor das erste Wort im Termin fällt. Diese drei Prüfungen laufen fast immer davor ab, oft ohne dass er es selbst bemerkt."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {CHECKS.map((check, i) => (
              <Reveal key={check.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{check.titel}</p>
                  <p className="t-body mt-3">{check.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Einwände — Rabatt-Reflex vs. Beweisführung ─────────────────────── */}
      <section id="einwaende" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der übliche Reflex"
              titel="Der Rabatt löst das *falsche* Problem."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Beweisführung schlägt Rabatt." glyph>
              Ein Nachlass auf die Provision beantwortet keine der drei Fragen, die sich der
              Eigentümer stellt. Ein Auftritt, der Google-Check, Website-Vergleich und Exposé-Blick
              besteht, beantwortet alle drei und macht den Alleinauftrag zur logischen Folge, nicht
              zur Verhandlungssache.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Case ──────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Sechs Wochen nach dem Auftritt-Relaunch bei RIEGEL Immobilien: neun unterschriebene
              Aufträge, 342.000 € Abschlussvolumen, ohne einen einzigen Rabatt auf die Provision.
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihren *Alleinauftrag*-Auftritt.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Der Auftritt ist ein Baustein unter mehreren. Einen Überblick finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , dazu die passende{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                Maklerwebsite
              </Link>
              ,{" "}
              <Link href="/exposes-die-verkaufen" className="ref-link">
                Exposés, die verkaufen
              </Link>{" "}
              und der{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>{" "}
              als Erstanker für den Eigentümer.
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
