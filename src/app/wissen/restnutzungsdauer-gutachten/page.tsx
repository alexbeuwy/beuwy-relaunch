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

/**
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/restnutzungsdauer-gutachten.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, inklusive
 * BFH-Kontext. Hauptteil: vier PainRows gegen gängige Fehlannahmen, ein
 * Zweispalter mit der Mechanik (kürzere RND → höherer Satz) plus
 * vollständigem Rechenbeispiel, danach eine Häkchen-Checkliste seriöser
 * Gutachter-Kriterien. GelbeKarte als Pointe, Beweis-Anriss über die
 * Transparenz des eigenen AfA-Rechners (keine Steuerberatung), FAQ +
 * FAQPage-JSON-LD. Foto 14 (hochkant) laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Restnutzungsdauer-Gutachten: Wann sich kürzere AfA-Zeiträume lohnen | beuwy",
  description:
    "Restnutzungsdauer-Gutachten erklärt: kürzere Nutzungsdauer erhöht die jährliche AfA. Mechanik, wer profitiert, BFH-Einordnung, Kriterien für seriöse Gutachter.",
  openGraph: {
    title: "Restnutzungsdauer-Gutachten: Wann sich kürzere AfA-Zeiträume lohnen | beuwy",
    description:
      "Wie eine kürzere Restnutzungsdauer die jährliche AfA erhöht, wer davon profitiert und woran Sie ein Gutachten erkennen, das vor dem Finanzamt besteht.",
    type: "website",
    locale: "de_DE",
  },
};

const EINWAENDE = [
  {
    quote: "Ein Gutachten kostet mehr, als es bringt.",
    answer:
      "Nicht bei größeren Objekten. Bei 400.000 € Gebäudewert und einer vom regulären Satz auf eine nachgewiesene Restnutzungsdauer von 30 Jahren verkürzten AfA steigt die jährliche Abschreibung um mehrere tausend Euro. Ein Gutachtenhonorar von 1.500 bis 3.500 € amortisiert sich dann oft im ersten Jahr über die Steuerersparnis.",
  },
  {
    quote: "Das Finanzamt erkennt sowieso jedes Gutachten an.",
    answer:
      "Nein. Seit einem BMF-Schreiben von 2023 verlangt die Finanzverwaltung eine methodisch nachvollziehbare Herleitung nach der ImmoWertV, kein Kurzverfahren aus einem Online-Formular. Ein Gutachten ohne Vor-Ort-Besichtigung und ohne dokumentierten Rechenweg wird häufig abgelehnt.",
  },
  {
    quote: "Bei einem jüngeren Gebäude lohnt sich das ohnehin nicht.",
    answer:
      "Das stimmt meistens. Je jünger und je besser modernisiert ein Gebäude ist, desto kleiner ist der Abstand zwischen der gesetzlich unterstellten und der tatsächlichen Restnutzungsdauer. Am stärksten profitieren ältere Gebäude ohne umfassende Modernisierung.",
  },
  {
    quote: "Einmal Gutachten, für immer gültig.",
    answer:
      "Ein Gutachten gilt für den Zeitraum, den es belegt, und für den Eigentümer, der es beauftragt hat. Bei einem Verkauf beginnt die Betrachtung für den neuen Eigentümer neu — ein bestehendes Gutachten lässt sich nicht einfach übertragen.",
  },
] as const;

const KRITERIEN = [
  "Öffentlich bestellt und vereidigt oder zertifiziert nach DIN EN ISO/IEC 17024",
  "Besichtigt das Objekt vor Ort, statt ein Ferngutachten anhand weniger Fotos zu erstellen",
  "Leitet die Restnutzungsdauer nachvollziehbar nach ImmoWertV und Sachwertrichtlinie her",
  "Liefert ein schriftliches Gutachten mit begründetem Rechenweg, nicht nur einen Ergebniswert",
  "Arbeitet unabhängig von Verkäufer oder Vermittler, ohne Erfolgshonorar",
  "Bringt Erfahrung mit Bestandsimmobilien vergleichbaren Alters mit",
] as const;

const FAQS = [
  {
    q: "Ist ein Restnutzungsdauer-Gutachten dasselbe wie ein Verkehrswertgutachten?",
    a: "Nein. Ein Restnutzungsdauer-Gutachten ist enger gefasst: Es weist ausschließlich die tatsächliche Restnutzungsdauer für die AfA nach, nicht den gesamten Marktwert. Dadurch ist es in der Regel schneller und günstiger als ein vollständiges Verkehrswertgutachten.",
  },
  {
    q: "Wie lange dauert ein Restnutzungsdauer-Gutachten?",
    a: "Von der Objektbesichtigung bis zum fertigen Gutachten vergehen meist ein bis drei Wochen, abhängig vom Gutachter und der Auslastung. Für die Steuererklärung eines laufenden Jahres sollten Sie das rechtzeitig einplanen.",
  },
  {
    q: "Kann ich das Gutachten selbst mit einem Online-Tool erstellen?",
    a: "Nein. Ein Online-Rechner liefert eine erste Einschätzung, ob sich ein Gutachten überhaupt lohnen könnte — er ersetzt kein Gutachten mit Vor-Ort-Besichtigung, das die Finanzverwaltung anerkennt.",
  },
  {
    q: "Was passiert, wenn das Finanzamt das Gutachten trotzdem ablehnt?",
    a: "Das kann vorkommen, wenn die Methodik nicht sauber dokumentiert ist. Ein Einspruch ist möglich, verzögert aber den Steuervorteil. Deshalb lohnt sich vorab ein Blick auf die Kriterien seriöser Gutachter — und ein Gespräch mit Ihrem Steuerberater vor der Beauftragung.",
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

function Haken() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent" aria-hidden>
      <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5.2 4.4 8.6 11 1.4"
          stroke="#161613"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function RestnutzungsdauerGutachtenPage() {
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
            <p className="t-label !text-ink-yellow">Wissen</p>
            <h1 className="t-display mt-4">
              {rich("Restnutzungsdauer-Gutachten: wann sich eine *kürzere* Zahl auszahlt.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ein Restnutzungsdauer-Gutachten lohnt sich, wenn ein Sachverständiger für Ihre
              vermietete Immobilie eine kürzere Restnutzungsdauer nachweist, als der gesetzliche
              AfA-Satz unterstellt — denn eine kürzere Nutzungsdauer bedeutet automatisch eine
              höhere jährliche Abschreibung.{" "}
              <Highlight>
                Der Bundesfinanzhof hat 2021 bestätigt, dass Eigentümer diesen Nachweis mit jeder
                geeigneten gutachterlichen Methode nach der ImmoWertV führen dürfen
              </Highlight>
              . Am stärksten profitieren ältere Gebäude ohne umfassende Modernisierung. Ob es
              sich für Sie rechnet, hängt vom Gebäudewert, dem Gutachterhonorar und Ihrem
              Grenzsteuersatz ab.
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
                src={maklerAsset(14)}
                alt="Sachverständiger begutachtet die Bausubstanz eines älteren Gebäudes vor Ort"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vier Einwände — PainRows gegen gängige Fehlannahmen ─────────────── */}
      <section id="einwaende" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Vier Fehlannahmen"
              titel="Was über Restnutzungsdauer-Gutachten *falsch* erzählt wird."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[780px]">
            <PainRows items={[...EINWAENDE]} />
          </div>
        </div>
      </section>

      {/* ── Zweispalter — Mechanik, mit vollständigem Rechenbeispiel ────────── */}
      <section id="mechanik" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Mechanik"
              titel="Kürzere Restnutzungsdauer, *höhere* Abschreibung."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-h3">In zwei Sätzen</p>
              <p className="t-body mt-3">
                Der reguläre AfA-Satz unterstellt eine feste Nutzungsdauer — bei 2 % sind das
                rechnerisch 50 Jahre. Weist ein Gutachten eine kürzere tatsächliche
                Restnutzungsdauer nach, ersetzt der Kehrwert dieser Zahl (100 geteilt durch die
                Restnutzungsdauer in Jahren) den regulären Satz, und die jährliche AfA steigt.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-h3">Vollständiges Rechenbeispiel</p>
              <p className="t-body mt-3">
                Gebäudewert 350.000 €, Baujahr 1975, regulärer Satz 2 % = 7.000 €/Jahr. Ein
                Gutachten weist eine Restnutzungsdauer von 28 Jahren nach, statt der gesetzlich
                unterstellten 50 Jahre. Neuer Satz: 100 / 28 = 3,57 % = 12.500 €/Jahr. Das sind
                5.500 € mehr Abschreibung pro Jahr, über zehn Jahre 55.000 €. Bei 42 %
                Grenzsteuersatz macht das 2.310 € Steuerersparnis pro Jahr, über zehn Jahre
                23.100 €.
              </p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="t-small mt-10 max-w-[720px] !text-ink-dim">
              Orientierungswert, kein Gutachten und keine Steuerberatung. Ob eine
              Restnutzungsdauer von 28 Jahren für Ihr konkretes Gebäude nachweisbar ist,
              entscheidet ausschließlich ein Sachverständiger vor Ort.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — seriöse Gutachter-Kriterien ─────────────────────────── */}
      <section id="kriterien" className="bg-bg-elevated">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Vor der Beauftragung prüfen"
              titel="Woran Sie ein *seriöses* Gutachten erkennen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 max-w-[680px] space-y-4">
            {KRITERIEN.map((k, i) => (
              <Reveal key={k} delay={i * 50}>
                <div className="flex items-start gap-3">
                  <Haken />
                  <p className="t-body pt-0.5">{k}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Kurzgutachten ist kein Beweis." glyph>
              Seit die Finanzverwaltung ihre Anforderungen 2023 verschärft hat, prüfen
              Finanzämter genauer, ob ein Gutachten methodisch sauber hergeleitet ist. Ein
              günstiges Online-Kurzverfahren ohne Besichtigung hält dieser Prüfung oft nicht
              stand — ein teureres, sauber dokumentiertes Gutachten schon.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Transparenz des eigenen AfA-Rechners ────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Unser AfA-Rechner zeigt jeden Rechenschritt offen — vom Gebäudewert über die
              Modernisierungspunkte bis zur Restnutzungsdauer —, damit Sie vor jedem Gespräch mit
              einem Gutachter oder Steuerberater schon wissen, ob sich der nächste Schritt
              überhaupt lohnt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 4 Fragen, FaqAccordion + JSON-LD oben im Head ─────────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *Beauftragung* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub + Spec-Links ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Prüfen Sie zuerst, ob es sich *lohnt*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Eine erste Einschätzung mit Modernisierungspunkten liefert unser{" "}
              <Link href="/tools/afa-rechner" className="ref-link">
                AfA-Rechner
              </Link>{" "}
              kostenlos in wenigen Minuten. Die Grundlagen zur regulären AfA und zum
              Gebäudeanteil zeigt{" "}
              <Link href="/wissen/afa-immobilien" className="ref-link">
                AfA bei Immobilien
              </Link>
              . Den Überblick über alle Bausteine bietet der{" "}
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
