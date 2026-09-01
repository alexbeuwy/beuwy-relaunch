import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiBuilding2Line, RiFlashlightLine, RiFlowChart, RiMegaphoneLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster V) — /mcmakler-modell. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil in drei
 * Schritten: (1) was Hybridmakler wie McMakler strukturell richtig machen
 * (Icon-Reihe), (2) wo der Prozess endet (PainRows, sachlich, keine
 * Herabsetzung), (3) vier Hebel regionaler Dominanz als Konter (Rail wie
 * in seo-fuer-immobilienmakler). GelbeKarte, Beweis-Anriss (Riegel: Platz
 * 21 von über 25.000 Maklern), FAQ + FAQPage-JSON-LD, Marken-Fußnote vor
 * dem Finale. Foto 8 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Das McMakler-Modell: Was Hybridmakler richtig machen — und wo Sie gewinnen | beuwy",
  description:
    "Das McMakler-Modell erklärt: Hybridmakler gewinnen über Prozess und Werbedruck, nicht über Ortskenntnis. Wie regionale Makler mit Beweisführung dagegenhalten.",
  openGraph: {
    title: "Das McMakler-Modell: Was Hybridmakler richtig machen — und wo Sie gewinnen | beuwy",
    description:
      "Prozess und Werbedruck sind die Stärke von Hybridmaklern, nicht Ortskenntnis. Vier Hebel, mit denen regionale Makler dagegenhalten.",
    type: "website",
    locale: "de_DE",
  },
};

const STAERKEN = [
  {
    icon: RiFlowChart,
    label: "Standardisierter Ablauf",
    satz:
      "Jede Anfrage folgt demselben Trichter, unabhängig davon, wer im Callcenter gerade abhebt. Nichts hängt an einer einzelnen Person.",
  },
  {
    icon: RiMegaphoneLine,
    label: "Werbedruck",
    satz:
      "TV, Radio, Bannerwerbung: Der Name ist bekannt, bevor ein Eigentümer überhaupt an Verkauf denkt. Das kann kein einzelnes Büro finanziell mitgehen.",
  },
  {
    icon: RiFlashlightLine,
    label: "Tempo",
    satz:
      "Erste Rückmeldung und Online-Bewertung laufen oft binnen Stunden. Wer schnell antwortet, gewinnt den ersten Eindruck.",
  },
  {
    icon: RiBuilding2Line,
    label: "Skalierung",
    satz:
      "Das Modell funktioniert in jeder Stadt gleich, weil es auf Prozess statt auf lokale Beziehungen gebaut ist.",
  },
] as const;

const PAINS = [
  {
    quote: "Der Anruf kommt schnell. Der Mensch am Telefon wechselt trotzdem.",
    answer:
      "Ein standardisierter Prozess bedeutet selten denselben Ansprechpartner vom ersten Anruf bis zum Notartermin. Für den Eigentümer fühlt sich das nach Warteschleife an, nicht nach Beziehung.",
  },
  {
    quote: "Die Online-Bewertung ist in Minuten da. Die Besichtigung macht trotzdem jemand vor Ort.",
    answer:
      "Ein automatisierter Richtwert kennt weder die sanierte Küche noch die laute Straße. Die eigentliche Einschätzung entsteht erst, wenn jemand mit Ortskenntnis durchs Haus geht.",
  },
  {
    quote: "Das Werbebudget schlägt fast jeden Makler. Die Ortskenntnis nicht.",
    answer:
      "Reichweite lässt sich kaufen, ein über Jahre gewachsenes Netz aus Nachbarn, Notaren und früheren Kunden nicht. Das ist der eine Vorteil, den kein Marketingbudget der Welt ersetzt.",
  },
];

const HEBEL = [
  {
    titel: "Ortskenntnis als Beweis",
    text: "Nicht behaupten, zeigen: konkrete Straßen, reale Bodenrichtwerte, abgeschlossene Fälle aus genau dem Stadtteil, in dem der Eigentümer wohnt.",
  },
  {
    titel: "Kontinuität",
    text: "Ein Name, eine Nummer, vom ersten Anruf bis zum Notartermin. Kein Callcenter, das jedes Mal neu erklärt bekommt, worum es geht.",
  },
  {
    titel: "Beweisführung statt Rabatt",
    text: "Wer die eigene Erfolgsquote, Vermarktungsdauer und Reichweite offenlegt, muss die Provision nicht über den Preis verteidigen.",
  },
  {
    titel: "Auftritt auf Augenhöhe",
    text: "Ein eigenes Portal, das genauso professionell wirkt wie der bundesweite Herausforderer, nimmt der Größe des Gegners die Wirkung.",
  },
] as const;

const FAQS = [
  {
    q: "Ist das McMakler-Modell seriös?",
    a: "Ja, es ist ein etabliertes Geschäftsmodell mit klarer Logik: standardisierter Prozess, zentraler Vertrieb, hoher Werbedruck. Ob es für einen einzelnen Eigentümer die richtige Wahl ist, hängt vom Objekt und vom gewünschten Maß an persönlicher Betreuung ab, nicht von der Seriosität des Modells.",
  },
  {
    q: "Verliert ein Regionalmakler grundsätzlich gegen Hybridmakler?",
    a: "Nein. Beim Werbebudget verliert fast jedes einzelne Büro, bei Ortskenntnis, Kontinuität und einem professionellen eigenen Auftritt nicht. Genau diese drei Hebel entscheiden häufig, wem der Eigentümer am Ende zusagt.",
  },
  {
    q: "Was, wenn ein Eigentümer bereits ein Angebot von McMakler hat?",
    a: "Dann zählt der direkte Vergleich: derselbe Ansprechpartner über die gesamte Vermarktung, echte Ortskenntnis und ein Auftritt, der Vertrauen zeigt statt nur Reichweite. Ein Rabatt auf die eigene Provision ist selten das überzeugendste Argument.",
  },
  {
    q: "Brauche ich das gleiche Marketingbudget wie ein Hybridmakler?",
    a: "Nein. Regionale Dominanz in einer Stadt oder einem Stadtteil kostet einen Bruchteil eines bundesweiten TV-Budgets, weil Sie nur dort sichtbar sein müssen, wo Ihre Zielgruppe tatsächlich sucht.",
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

export default function McmaklerModellPage() {
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
            <p className="t-label !text-ink-yellow">Wettbewerb</p>
            <h1 className="t-display mt-4">
              {rich("Das McMakler-Modell: stark im Prozess, *schwach* vor Ort.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie konkurrieren mit Hybridmaklern wie McMakler nicht über Werbebudget, das gewinnen
              Sie strukturell nicht. Sie gewinnen über das, was ein bundesweiter Prozess nicht
              leisten kann:{" "}
              <Highlight>echte Ortskenntnis, denselben Ansprechpartner bis zum Notar
              und einen Auftritt, der genauso professionell wirkt</Highlight>. Deren Stärke ist
              Tempo und Reichweite, Ihre ist die Region, in der Sie schon jeden Straßenzug kennen.
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
                src={maklerAsset(8)}
                alt="Makler bespricht eine Objektstrategie am Tisch, Stadtplan der Region im Hintergrund"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Was Hybridmakler richtig machen — Icon-Reihe ────────────────────── */}
      <section id="staerken" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ehrlich betrachtet"
              titel="Was Hybridmakler *richtig* machen."
              sub="Bevor eine Gegenstrategie funktioniert, muss die Stärke des Gegners stimmen. Vier Dinge, die das Modell strukturell besser kann als ein einzelnes Büro."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 border-t border-line-subtle">
            {STAERKEN.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 50}>
                  <div className="grid gap-4 border-b border-line-subtle py-9 sm:grid-cols-[240px_1fr] sm:items-start sm:gap-10 lg:grid-cols-[280px_1fr]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-akzent-wash text-ink-yellow">
                        <Icon aria-hidden className="size-[18px]" />
                      </span>
                      <p className="t-label !text-ink-dim">{s.label}</p>
                    </div>
                    <p className="font-display text-[20px] font-medium leading-[1.35] tracking-[-0.012em] text-ink-cream sm:text-[22px]">
                      {s.satz}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Wo der Prozess endet — PainRows, sachlich ────────────────────────── */}
      <section id="grenzen" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Grenze des Modells"
              titel="Wo der *Prozess* endet und die Region anfängt."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Vier Hebel regionaler Dominanz — Rail-Layout ─────────────────────── */}
      <section id="hebel" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Konter"
              titel="Vier Hebel, mit denen Sie regional *gewinnen*."
              sub="Kein Wettrüsten beim Werbebudget. Vier Hebel, die ein bundesweiter Prozess strukturell nicht in derselben Tiefe bedienen kann."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {HEBEL.map((h, i) => (
              <Reveal key={h.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{h.titel}</p>
                  <p className="t-body mt-3">{h.text}</p>
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
            <GelbeKarte label="Der Unterschied" titel="Reichweite ist mietbar. Vertrauen nicht." glyph>
              Ein bundesweiter Prozess kauft Aufmerksamkeit ein, Woche für Woche, Kampagne für
              Kampagne. Ortskenntnis und ein über Jahre aufgebauter Ruf lassen sich nicht kaufen,
              nur verdienen. Genau das ist der Vorsprung, den kein Werbebudget ausgleicht.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel, Platz 21 von über 25.000 Maklern ────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Sechs Wochen nach dem Relaunch: Platz 21 von über 25.000 Maklern beim
              ImmoScout24-Award, ein regionales Haus gegen bundesweite Konkurrenz.
            </p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              Fallstudie RIEGEL Immobilien lesen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
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
          <p className="t-small mx-auto mt-10 max-w-[62ch] text-center">
            McMakler ist eine Marke der McMakler GmbH. beuwy ist unabhängiger Dienstleister ohne
            Gesellschafterbindung an dieses Unternehmen; die Angaben zum Geschäftsmodell beruhen
            auf öffentlich bekannten Informationen.
          </p>
        </div>
      </section>

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre regionale *Dominanz*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              . Wie sich der Hebel in kleineren Städten besonders schnell auszahlt, zeigt die Seite{" "}
              <Link href="/makler-in-kleinstadt" className="ref-link">
                Makler in der Kleinstadt
              </Link>
              , wie Sie den Wiedererkennungswert dafür aufbauen, die Seite{" "}
              <Link href="/markenaufbau-makler" className="ref-link">
                Markenaufbau für Makler
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
