import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiCheckLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/spekulationssteuer-immobilien.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * eine Fristen-Tabelle (Szenario/Haltedauer/Eigennutzung/Steuerpflicht),
 * eine Checkliste der Eigennutzungs-Ausnahmen und eine konkrete
 * Rechenbeispiel-Passage (Kaufpreis/Verkaufspreis/persönlicher
 * Steuersatz). "kostenlos" ist hier erlaubt (Cluster T) und wird einmal
 * für den Verweis auf /tools/verkaufspreisrechner genutzt. Klare
 * Steuerberatungs-Grenze in GelbeKarte + Antwort-Absatz, keine
 * individuelle Empfehlung. Beweis-Anriss (17 Jahre Erfahrung als
 * Einordnungs-Kompetenz), FAQ + FAQPage-JSON-LD. Foto 19 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Spekulationssteuer bei Immobilien: Fristen, Ausnahmen, Rechenbeispiele | beuwy",
  description:
    "Spekulationssteuer bei Immobilien fällt innerhalb der 10-Jahres-Frist an, außer bei Eigennutzung. Fristen, Ausnahmen und Rechenbeispiele im Überblick.",
  openGraph: {
    title: "Spekulationssteuer bei Immobilien: Fristen, Ausnahmen, Rechenbeispiele | beuwy",
    description:
      "Die 10-Jahres-Frist nach § 23 EStG, die Eigennutzungs-Ausnahme und ein Rechenbeispiel mit persönlichem Steuersatz — verständlich erklärt, mit klarer Grenze zur Steuerberatung.",
    type: "website",
    locale: "de_DE",
  },
};

const SZENARIEN = [
  { szenario: "Vermietet, Verkauf nach 6 Jahren", frist: "6 von 10 Jahren", eigennutzung: "keine", steuerpflicht: "ja, voller Gewinn" },
  { szenario: "Vermietet, Verkauf nach 11 Jahren", frist: "11 von 10 Jahren", eigennutzung: "keine", steuerpflicht: "nein, Frist abgelaufen" },
  { szenario: "Selbst bewohnt, Verkauf nach 4 Jahren", frist: "4 von 10 Jahren", eigennutzung: "durchgehend", steuerpflicht: "nein, Ausnahme greift" },
  { szenario: "Vermietet, dann 2 Jahre selbst bewohnt, Verkauf im 3. Jahr", frist: "beliebig", eigennutzung: "3 Kalenderjahre", steuerpflicht: "nein, Ausnahme greift" },
] as const;

const AUSNAHMEN = [
  "Die Immobilie wurde im Jahr des Verkaufs und in den zwei vollen Kalenderjahren davor durchgehend selbst bewohnt.",
  "Alternativ genügt eine Eigennutzung im Verkaufsjahr, im Vorjahr vollständig und im Jahr davor zumindest zeitweise — es müssen keine drei vollen Jahre sein.",
  "Vermietung an Kinder, für die noch Kindergeld bezogen wird, zählt in der Praxis häufig als Eigennutzung, im Einzelfall bewertet das Finanzamt das unterschiedlich.",
  "Nach zehn Jahren Haltedauer entfällt die Steuerpflicht unabhängig von einer Eigennutzung vollständig.",
] as const;

const FAQS = [
  {
    q: "Ab wann läuft die 10-Jahres-Frist?",
    a: "Sie beginnt mit dem Datum des notariellen Kaufvertrags, nicht mit dem Einzug oder der Grundbucheintragung. Für den Verkauf zählt ebenso das Datum des notariellen Verkaufsvertrags, nicht der Übergabetermin.",
  },
  {
    q: "Zählt eine Schenkung oder Erbschaft als Neuanschaffung?",
    a: "Nein. Bei Schenkung und Erbschaft übernimmt die neue Eigentümerin oder der neue Eigentümer die Anschaffungsdaten der Vorbesitzer. Wer eine seit zwölf Jahren im Familienbesitz befindliche Immobilie erbt und sofort verkauft, zahlt in der Regel keine Spekulationssteuer.",
  },
  {
    q: "Wie hoch ist die Spekulationssteuer konkret?",
    a: "Es gibt keinen festen Steuersatz. Der Veräußerungsgewinn wird dem übrigen Einkommen zugerechnet und mit dem individuellen, progressiven Einkommensteuersatz versteuert, der je nach Gesamteinkommen zwischen rund 14 % und 45 % liegt.",
  },
  {
    q: "Kann ein Makler die Steuerpflicht für mich prüfen?",
    a: "Ein Makler kann die Frist einordnen und auf die Eigennutzungs-Ausnahme hinweisen, das ersetzt aber keine steuerliche Beratung. Für eine verbindliche Berechnung, insbesondere bei Sonderfällen wie Teilverkäufen oder häuslichem Arbeitszimmer, braucht es einen Steuerberater.",
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

export default function SpekulationssteuerImmobilienPage() {
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
            <p className="t-label !text-ink-yellow">Steuer &amp; Fristen</p>
            <h1 className="t-display mt-4">
              {rich("Spekulationssteuer bei Immobilien: die *10-Jahres-Frist* einfach erklärt.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Spekulationssteuer fällt nach § 23 Einkommensteuergesetz an, wenn zwischen Kauf und
              Verkauf einer nicht selbst genutzten Immobilie weniger als zehn Jahre liegen. Der
              Gewinn aus dem Verkauf wird dann wie normales Einkommen mit dem persönlichen
              Steuersatz versteuert.{" "}
              <Highlight>
                Wurde die Immobilie im Verkaufsjahr und den zwei Jahren davor selbst bewohnt,
                entfällt die Steuer unabhängig von der Haltedauer
              </Highlight>
              . Nach Ablauf von zehn Jahren entfällt sie ebenfalls, ganz ohne Eigennutzung.
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
                src={maklerAsset(19)}
                alt="Eigentümer und Makler prüfen gemeinsam Vertragsunterlagen und Fristen am Tisch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Fristen-Tabelle — vier typische Szenarien ────────────────────────── */}
      <section id="fristen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Vier Szenarien"
              titel="Dieselbe Frist, vier ganz unterschiedliche *Ergebnisse*."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Szenario</th>
                    <th className="t-label py-3 pr-6 font-semibold">Haltedauer</th>
                    <th className="t-label py-3 pr-6 font-semibold">Eigennutzung</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">Steuerpflicht</th>
                  </tr>
                </thead>
                <tbody>
                  {SZENARIEN.map((row) => (
                    <tr key={row.szenario} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.szenario}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.frist}</td>
                      <td className="t-body py-4 pr-6">{row.eigennutzung}</td>
                      <td className="t-body py-4">{row.steuerpflicht}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              Rechenbeispiel: Kaufpreis 300.000 € im Jahr 2019, Verkauf 2026 für 420.000 €, ohne
              Eigennutzung, also nach sieben von zehn Jahren. Der Veräußerungsgewinn beträgt
              120.000 €. Bei einem persönlichen Steuersatz von 42 % ergibt das rund 50.400 €
              Einkommensteuer auf diesen Gewinn, zusätzlich zum sonstigen Einkommen des Jahres.
              Hätte dieselbe Person bis 2029 gewartet, wäre der gesamte Gewinn steuerfrei geblieben.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — wann die Eigennutzungs-Ausnahme greift ──────────────── */}
      <section id="ausnahmen" className="bg-bg-base">
        <div className="mx-auto max-w-[900px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Eigennutzungs-Ausnahme"
              titel="Vier Punkte, an denen die *Steuerpflicht* tatsächlich entfällt."
              className="max-w-[720px]"
            />
          </Reveal>
          <ul className="mt-10 space-y-5">
            {AUSNAHMEN.map((punkt, i) => (
              <Reveal key={punkt} delay={i * 50}>
                <li className="flex items-start gap-3 border-b border-line-subtle pb-5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent-wash">
                    <RiCheckLine className="h-4 w-4 text-ink-cream" />
                  </span>
                  <span className="t-body">{punkt}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe, klare Grenze ────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Die Grenze" titel="Wir ordnen ein. Rechnen tut Ihr Steuerberater." glyph>
              Ein Makler kann die Frist und die Eigennutzungs-Ausnahme frühzeitig ansprechen, damit
              ein Eigentümer nicht mitten im Verkaufsprozess von der Steuer überrascht wird. Eine
              verbindliche Berechnung, insbesondere bei anteiliger Eigennutzung oder mehreren
              Objekten, gehört in die Hände einer Steuerberatung. Wir geben hier keine
              individuelle Steuer- oder Rechtsberatung.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Einordnungskompetenz statt Kundenzahl ───────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              17 Jahre Markenarbeit, unter anderem für Bosch, Continental und Michelin, plus eigene
              Vertriebserfahrung: Klarheit in komplexen Themen ist unser tägliches Geschäft, auch
              wenn Steuerfragen am Ende in die Hände eines Steuerberaters gehören.
            </p>
            <Link href="/ueber-uns" className="ref-link mt-6 inline-block">
              Mehr über beuwy erfahren →
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
            <h2 className="t-h2 mt-4">{rich("Verkaufen Sie mit *Überblick*, nicht mit Überraschung.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die Abschreibungsregeln für vermietete Objekte auf der Seite{" "}
              <Link href="/wissen/afa-immobilien" className="ref-link">
                AfA bei Immobilien
              </Link>
              , eine erste, kostenlose Werteinschätzung liefert der{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
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
