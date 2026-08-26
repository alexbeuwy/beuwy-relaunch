import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/afa-immobilien.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * Vergleichs-Tabelle der drei gesetzlichen AfA-Sätze (2 %/2,5 %/3 %, tnum),
 * danach ein Zweispalter zu Gebäude- vs. Bodenanteil mit vollständigem
 * Rechenbeispiel inklusive Steuereffekt. GelbeKarte als Pointe,
 * Beweis-Anriss über die Vision-Group-Zahlen als Beleg für Zahlendisziplin
 * (kein Steuerberatungs-Anspruch), FAQ + FAQPage-JSON-LD. Klare
 * Steuerberatungs-Grenze mehrfach markiert. Foto 13 (hochkant) laut
 * R3-SEITENPLAN.json, per object-cover im 21:9-Band.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "AfA bei Immobilien: Abschreibung verständlich — mit Rechenwegen | beuwy",
  description:
    "AfA bei Immobilien: 2, 2,5 oder 3 Prozent je nach Baujahr, Gebäude- vs. Bodenanteil, mit Rechenbeispielen und Steuereffekt. Klare Grenze zur Steuerberatung.",
  openGraph: {
    title: "AfA bei Immobilien: Abschreibung verständlich — mit Rechenwegen | beuwy",
    description:
      "Die drei gesetzlichen AfA-Sätze, der Unterschied zwischen Gebäude- und Bodenanteil, ein vollständiges Rechenbeispiel mit Steuereffekt — ohne Steuerberatungsanspruch.",
    type: "website",
    locale: "de_DE",
  },
};

const SAETZE = [
  { baujahr: "vor 1925", satz: "2,5 %", grundlage: "§ 7 Abs. 4 S. 1 Nr. 1 EStG", beispiel: "7.500 €" },
  { baujahr: "1925–2022", satz: "2 %", grundlage: "§ 7 Abs. 4 S. 1 Nr. 2 Buchst. b EStG", beispiel: "6.000 €" },
  { baujahr: "ab 2023", satz: "3 %", grundlage: "§ 7 Abs. 4 S. 1 Nr. 2 Buchst. a EStG (JStG 2022)", beispiel: "9.000 €" },
] as const;

const FAQS = [
  {
    q: "Muss ich die AfA jedes Jahr neu beantragen?",
    a: "Sie tragen die AfA jedes Jahr erneut in der Anlage V Ihrer Steuererklärung ein — automatisch läuft nichts. Wer eine Steuersoftware oder einen Steuerberater nutzt, muss die Grunddaten (Kaufpreis, Gebäudeanteil, Baujahr) einmal hinterlegen, danach übernimmt das Programm die Fortschreibung.",
  },
  {
    q: "Kann ich AfA auch für meine selbstgenutzte Wohnung absetzen?",
    a: "Nein. Die AfA gilt nur für vermietete oder betrieblich genutzte Immobilien, weil sie Einkünfte aus Vermietung und Verpachtung mindert. Für selbstgenutztes Wohneigentum gibt es keine laufende Abschreibung.",
  },
  {
    q: "Was passiert mit der AfA, wenn ich die Immobilie verkaufe?",
    a: "Die AfA des Verkäufers endet mit dem Verkauf. Der neue Eigentümer beginnt eine eigene Berechnung auf Basis seines eigenen Kaufpreises — der Satz richtet sich dabei weiterhin nach dem Baujahr des Gebäudes, nicht nach dem Jahr des Erwerbs.",
  },
  {
    q: "Lohnt sich für mein Gebäude ein Restnutzungsdauer-Gutachten?",
    a: "Das hängt vom Alter, Modernisierungsgrad und Gebäudewert ab. Die Mechanik, wer typischerweise profitiert und woran Sie ein seriöses Gutachten erkennen, zeigt die Seite Restnutzungsdauer-Gutachten.",
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

export default function AfaImmobilienPage() {
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
              {rich("AfA bei Immobilien: 2, 2,5 oder 3 Prozent — und warum das *zählt*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Die Abschreibung für Abnutzung (AfA) verteilt die Anschaffungskosten eines
              vermieteten Gebäudes über die gesetzlich unterstellte Nutzungsdauer und mindert
              damit jedes Jahr die Steuerlast.{" "}
              <Highlight>
                Der reguläre Satz richtet sich nach dem Baujahr: 2,5 Prozent vor 1925, 2 Prozent
                für 1925 bis 2022, 3 Prozent für Neubauten ab 2023
              </Highlight>
              . Abgeschrieben wird ausschließlich der Gebäudeanteil des Kaufpreises, nicht der
              Bodenanteil, weil Grund und Boden sich nicht abnutzen. Mit einem
              Restnutzungsdauer-Gutachten lässt sich der Satz in bestimmten Fällen erhöhen — dazu
              mehr auf der Nachbarseite.
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
                src={maklerAsset(13)}
                alt="Person rechnet Abschreibungswerte für eine vermietete Immobilie an einem Notebook durch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — die drei gesetzlichen AfA-Sätze ────────────── */}
      <section id="saetze" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die drei Fälle"
              titel="Ein halbes Prozent entscheidet über *tausende* Euro."
              sub="Beispielrechnung in der letzten Spalte: derselbe Gebäudewert von 300.000 € mit dem jeweils passenden Satz."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Baujahr</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">AfA-Satz</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Rechtsgrundlage</th>
                  <th className="py-3 t-label !text-[10.5px]">Beispiel: 300.000 € Gebäudewert</th>
                </tr>
              </thead>
              <tbody>
                {SAETZE.map((z) => (
                  <tr key={z.baujahr} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 t-body max-w-[9rem] !text-ink-cream font-medium">
                      {z.baujahr}
                    </td>
                    <td className="py-4 pr-4 font-mono text-[14px] text-ink-cream tnum">{z.satz}</td>
                    <td className="py-4 pr-4 t-body max-w-[18rem]">{z.grundlage}</td>
                    <td className="py-4 font-mono text-[14px] text-ink-cream tnum">
                      {z.beispiel}/Jahr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Zweispalter — Gebäude- vs. Bodenanteil, mit Rechenweg ───────────── */}
      <section id="gebaeudeanteil" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Gebäudeanteil vs. Bodenanteil"
              titel="Nur das *Gebäude* nutzt sich ab — der Boden nicht."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-h3">Warum die Aufteilung zählt</p>
              <p className="t-body mt-3">
                Das Finanzamt erkennt die AfA nur für den Gebäudeanteil eines Kaufpreises an, weil
                sich Grund und Boden nicht abnutzen. Die Aufteilung steht im Idealfall bereits im
                Kaufvertrag. Fehlt sie, hilft ersatzweise die Arbeitshilfe des
                Bundesfinanzministeriums oder ein Gutachten. In der Praxis liegt der
                Gebäudeanteil bei Bestandsimmobilien meist zwischen 65 und 85 Prozent des
                Kaufpreises, abhängig vom örtlichen Bodenrichtwert.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-h3">Vollständiges Rechenbeispiel</p>
              <p className="t-body mt-3">
                Kaufpreis 420.000 €, der Bodenrichtwert weist einen Grundstücksanteil von 22
                Prozent aus. Gebäudeanteil: 420.000 € × 78 % = 327.600 €. Baujahr 1998, also 2 %
                AfA-Satz. Jährliche AfA: 6.552 €. Bei einem Grenzsteuersatz von 42 % ergibt das
                eine Steuerersparnis von rund 2.752 € pro Jahr, über zehn Jahre 27.520 €.
              </p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="t-small mt-10 max-w-[720px] !text-ink-dim">
              Orientierungswert, kein Gutachten und keine Steuerberatung. Der tatsächliche
              Gebäudeanteil, Sonderabschreibungen und Ihr persönlicher Grenzsteuersatz hängen vom
              Einzelfall ab — klären Sie das mit einem Steuerberater, bevor Sie eine Zahl für die
              Steuererklärung übernehmen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="0,5 Prozentpunkte sind kein Rundungsfehler." glyph>
              Auf einen Gebäudewert von 300.000 € macht der Unterschied zwischen 2 und 2,5 Prozent
              1.500 € pro Jahr, über zwanzig Jahre 30.000 €. Baujahr und Gebäudeanteil sauber
              einzuordnen ist deshalb keine Formalie, sondern die Grundlage für jede weitere
              Rechnung.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Vision Group, Zahlendisziplin ohne Steuerbezug ──── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Für Vision Group haben wir Investorenunterlagen aufgesetzt, die einer Prüfung durch
              einen Konzern wie KKR standhielten — 1.450 Wohneinheiten, ein Joint Venture über 160
              Mio. €. Dieselbe Disziplin gilt für jede Zahl, die am Ende ein Finanzamt liest: nur
              eine sauber hergeleitete Rechnung hält stand.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 4 Fragen, FaqAccordion + JSON-LD oben im Head ─────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *nächsten* Steuererklärung wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub + Spec-Links ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Zahlenbasis*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Ihren eigenen Rechenweg mit Modernisierungsgrad und Steuereffekt liefert unser{" "}
              <Link href="/tools/afa-rechner" className="ref-link">
                AfA-Rechner
              </Link>{" "}
              kostenlos in wenigen Minuten. Ob sich für Ihr Gebäude ein Gutachten lohnt, zeigt{" "}
              <Link href="/wissen/restnutzungsdauer-gutachten" className="ref-link">
                Restnutzungsdauer-Gutachten
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
