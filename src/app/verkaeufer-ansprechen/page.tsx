import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * W-Cluster — /verkaeufer-ansprechen (R3-SEITENPLAN.json). Antwort auf
 * "Wie erreiche ich Eigentümer vor dem Verkaufsentschluss?" direkt im
 * Kopf. Hauptbaustein: eine Nummern-Liste von sechs Lebensereignissen
 * (Frühsignale statt Kaufsignale), je mit einem DSGVO-sauberen
 * Content-Anker, gerahmt von einem Zweispalter Reaktiv/Früh. Beweis:
 * RIEGEL-Bewertungsrechner als Frühanker-Beispiel. Kompakter
 * Wissens-Kopf statt 70vh-Hero, Foto 8.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Verkäufer ansprechen, bevor sie suchen: Frühsignale nutzen | beuwy",
  description:
    "Verkäufer ansprechen, bevor sie suchen: Frühsignale wie Erbschaft, Auszug und Zinsanpassung als Anker, mit Inhalten und Rechnern statt gekaufter Daten.",
  openGraph: {
    title: "Verkäufer ansprechen, bevor sie suchen: Frühsignale nutzen | beuwy",
    description:
      "Sechs Lebensereignisse, die einem Verkauf meist vorausgehen, und wie Inhalte und Rechner dort ansetzen, DSGVO-sauber, statt auf das fertige Kaufsignal zu warten.",
    type: "website",
    locale: "de_DE",
  },
};

type Fruehsignal = {
  titel: string;
  signal: string;
  anker: string;
};

const FRUEHSIGNALE: Fruehsignal[] = [
  {
    titel: "Erbschaft",
    signal:
      "Eine Immobilie fällt in eine Erbengemeinschaft, oft mit unterschiedlichen Interessen zwischen Verkaufen und Behalten.",
    anker:
      "Ein Ratgeber-Artikel zu „Geerbte Immobilie verkaufen oder vermieten“ plus Bewertungsrechner rankt genau dann, wenn ein Erbe zu recherchieren beginnt, ohne dass jemand personenbezogene Daten aus einem Nachlassregister zieht.",
  },
  {
    titel: "Auszug der Kinder",
    signal:
      "Das Haus wird zu groß, die Frage nach Downsizing oder Vermieten der freien Zimmer taucht zum ersten Mal auf.",
    anker:
      "Content zu „Haus zu groß, was jetzt?“ mit einem Vergleichsrechner Verkauf gegen Vermietung fängt genau diesen Moment ab, lange bevor ein Exposé überhaupt in Frage kommt.",
  },
  {
    titel: "Auslaufende Zinsbindung",
    signal:
      "Die Anschlussfinanzierung steht an, der Eigentümer prüft zum ersten Mal ernsthaft Alternativen zum Halten.",
    anker:
      "Ein Artikel zu „Zinsbindung läuft aus: Verkaufen oder refinanzieren?“, ergänzt um eine Datenmail an bereits eingewilligte Kontakte zum passenden Zeitpunkt.",
  },
  {
    titel: "Jobwechsel oder Umzug",
    signal: "Ein Ortswechsel erzwingt eine Entscheidung über die bisherige Immobilie.",
    anker:
      "Eine lokale Landingpage samt Rechner für den Fernverkauf-Prozess erreicht diese Zielgruppe, während sie noch nach dem neuen Wohnort sucht, nicht erst nach einem Makler.",
  },
  {
    titel: "Trennung oder Scheidung",
    signal: "Die gemeinsame Immobilie muss aufgeteilt werden, ein sensibles, oft belastetes Thema.",
    anker:
      "Sachlicher, einfühlsamer Content ohne Verkaufsdruck baut Vertrauen auf, bevor der erste Kontakt entsteht, statt mit einer Werbeanzeige in eine ohnehin schwierige Lage zu platzen.",
  },
  {
    titel: "Renteneintritt",
    signal: "Altersgerechtes Wohnen wird zum ersten Mal ernsthaft zum Thema.",
    anker:
      "Ein Artikel zu „Immobilie im Ruhestand: verkaufen, vermieten oder umbauen“ positioniert Sie als Ansprechpartner, bevor der Entschluss überhaupt feststeht.",
  },
];

const FAQS = [
  {
    q: "Ist die Ansprache vor dem Verkaufsentschluss DSGVO-konform?",
    a: "Ja, solange sie über Inhalte läuft, die jemand freiwillig aufruft, statt über gekaufte oder gescrapte Daten zu Lebensereignissen. Ein Rechner oder Ratgeber-Artikel, der bei Google gefunden wird, verarbeitet keine personenbezogenen Daten, bevor der Eigentümer selbst ein Kontaktformular ausfüllt.",
  },
  {
    q: "Woher weiß ich, wer gerade ein Frühsignal hat?",
    a: "Gar nicht im Vorfeld, und das ist der Punkt. Sie bauen Inhalte für jedes Signal, und wer davon betroffen ist, findet sie über die eigene Suche. Sie sprechen niemanden gezielt an, bevor er sich nicht selbst gemeldet hat.",
  },
  {
    q: "Wie lange dauert es, bis diese Strategie Anfragen bringt?",
    a: "Die ersten Inhalte und Rechner stehen innerhalb weniger Wochen. Bis sie zuverlässig ranken und regelmäßig Anfragen bringen, vergehen meist mehrere Monate, abhängig von der Konkurrenz in Ihrer Stadt für die jeweilige Suchfrage.",
  },
  {
    q: "Ersetzt das die klassische Ansprache nach Exposé-Anfrage?",
    a: "Nein, es ergänzt sie. Wer bereits über ein Portal anfragt, ist im Kaufsignal-Stadium und braucht die gewohnte, schnelle Reaktion. Die Frühsignal-Strategie holt zusätzlich die Eigentümer ab, die noch gar nicht wissen, dass sie bald verkaufen.",
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

export default function VerkaeuferAnsprechenPage() {
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

      {/* ── Kompakter Wissens-Kopf ───────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="t-label !text-ink-yellow">Wachstum</p>
          <h1 className="t-display mt-5 max-w-[22ch]">
            {rich("Eigentümer ansprechen, lange bevor sie einen Makler *suchen*.")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">
            Sie erreichen Eigentümer vor dem Verkaufsentschluss, indem Sie nicht auf das
            Kaufsignal warten, sondern auf die Lebensereignisse davor reagieren: Erbschaft,
            Auszug der Kinder, auslaufende Zinsbindung, Trennung oder Renteneintritt. Statt Daten
            zu diesen Ereignissen zu sammeln, was DSGVO-rechtlich nicht zulässig wäre, bauen Sie{" "}
            <Highlight>Inhalte und Rechner, die genau dann gefunden werden, wenn ein
            Eigentümer beginnt, sich zu informieren</Highlight>. So werden Sie sichtbar, bevor der
            erste Suchbegriff „Makler“ überhaupt eingegeben wird.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ZusammenarbeitCta />
            <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
          </div>
        </div>
      </section>

      {/* ── Foto-Band ────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src={maklerAsset(8)}
              alt="Eigentümer liest am Küchentisch einen Ratgeber-Artikel auf dem Tablet"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Reaktiv vs. Früh — Zweispalter ───────────────────────────── */}
      <section id="unterschied" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zwei Ausgangspunkte"
              titel="Das Kaufsignal ist der *letzte*, nicht der erste Moment."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-label">Reaktive Ansprache</p>
              <p className="t-h3 mt-3">Sie warten auf das fertige Exposé-Signal.</p>
              <p className="t-body mt-3">
                Der Eigentümer hat sich längst entschieden und vergleicht bereits drei bis fünf
                Makler. Sie treten in eine Konkurrenzsituation ein, in der nur noch Preis und
                erster Eindruck zählen.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-label">Frühsignal-Ansprache</p>
              <p className="t-h3 mt-3">Sie sind schon da, wenn die Frage erst entsteht.</p>
              <p className="t-body mt-3">
                Der Eigentümer informiert sich zum ersten Mal, findet Ihren Inhalt statt eine
                Werbeanzeige, und verbindet Ihren Namen mit der Antwort, nicht mit dem Verkauf.
                Bis zur Entscheidung sind Sie bereits die vertraute Adresse.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Sechs Frühsignale — Nummern-Liste ────────────────────────── */}
      <section id="signale" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die sechs Frühsignale"
              titel="Jedes Lebensereignis bekommt seinen eigenen *Anker*."
              sub="Kein Zugriff auf Register oder Datenhändler. Jeder Anker ist ein Inhalt oder Rechner, den ein Eigentümer selbst findet, sobald er zu recherchieren beginnt."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 divide-y divide-line-subtle border-t border-line-subtle">
            {FRUEHSIGNALE.map((f, i) => (
              <Reveal key={f.titel} delay={i * 60}>
                <div className="grid gap-4 py-8 md:grid-cols-[3rem_14rem_1fr] md:gap-10">
                  <span className="font-display text-[22px] font-bold text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="t-h3">{f.titel}</p>
                    <p className="t-body mt-2 md:hidden">{f.signal}</p>
                  </div>
                  <div>
                    <p className="t-body hidden md:block">{f.signal}</p>
                    <p className="t-body mt-2 border-l-2 border-akzent pl-4 text-ink-cream md:mt-3">
                      {f.anker}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte
              label="Der Unterschied"
              titel="Wer zuerst hilft, wird zuerst gefragt."
              glyph
            >
              Sie kaufen keine Adressen und schreiben niemanden ungefragt an. Sie bauen die
              Antwort, die ein Eigentümer selbst sucht, sobald das Lebensereignis eintritt. Der
              Kontakt entsteht, wenn er bereit ist, nicht wenn eine Liste behauptet, er sei es.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL-Rechner als Frühanker ────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Ein Bewertungsrechner mit amtlichen Bodenrichtwerten und über 5.000 ausgewerteten
              Verkäufen: Adresse rein, Ersteinschätzung raus, der Lead liegt mit Score im CRM,
              nicht erst im Postfach.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *ersten* Inhalt wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Frühsignal*-Kette.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Frühsignal-Ansprache ist ein Baustein unter mehreren. Passend dazu:{" "}
              <Link href="/tools/mietpreisrechner" className="ref-link">
                der Mietpreisrechner
              </Link>{" "}
              als Downsizing-Anker und{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                E-Mail-Marketing für Immobilienmakler
              </Link>{" "}
              für die zeitlich getriggerte Datenmail. Den Überblick zeigt der{" "}
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
