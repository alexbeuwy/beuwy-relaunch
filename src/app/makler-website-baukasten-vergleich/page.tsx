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
 * Wissens-Seite D19 — /makler-website-baukasten-vergleich (R3-SEITENPLAN.json,
 * Cluster V). Angle ist explizit eine Matrix nach Kriterien — anders als die
 * Schwesterseite /immoscout-profil-vs-eigene-website (Zweispalter Portal vs.
 * Website), deshalb hier eine echte Vergleichs-Tabelle nach dem Muster von
 * /bottimmo-erfahrungen (überprüft), mit vier Spalten (Wix/Jimdo, BOTTIMMO,
 * CasaOne, Maßportal) statt zwei. Aussagen zu den einzelnen Systemen bleiben
 * allgemein bekannt/unstrittig, im Zweifel weggelassen — gleiche
 * Zurückhaltung wie /maklersoftware-vergleich. Beweis läuft als Text-Anriss
 * (17 Jahre + RIEGEL), keine zweite CaseGrid, um sich von der Schwesterseite
 * abzusetzen. Foto 4 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Makler-Website-Baukästen im Vergleich: Wix, Jimdo, BOTTIMMO & Co. | beuwy",
  description:
    "Makler-Website-Baukästen im Vergleich: Wix, Jimdo, BOTTIMMO und weitere nach Tempo, CRM, Exposés und SEO geprüft — mit klarer Grenze zum eigenen Maßportal.",
  openGraph: {
    title: "Makler-Website-Baukästen im Vergleich: Wix, Jimdo, BOTTIMMO & Co. | beuwy",
    description:
      "Fünf Kriterien, vier Systeme: wo ein Website-Baukasten für Makler reicht — und wo die Grenze zum eigenen Maßportal beginnt.",
    type: "website",
    locale: "de_DE",
  },
};

type Zeile = { kriterium: string; wix: string; bottimmo: string; casaone: string; massportal: string };

const MATRIX: Zeile[] = [
  {
    kriterium: "Tempo bis Livegang",
    wix: "In Tagen online, generisches Vorlagen-Layout",
    bottimmo: "Website und Anzeigenvorlagen in kurzer Zeit startklar",
    casaone: "Läuft direkt aus dem CRM-System, schnell für Bestandsdaten",
    massportal: "Vier bis sechs Wochen, dafür auf die eigene Marke zugeschnitten",
  },
  {
    kriterium: "CRM-Anbindung",
    wix: "Keine native Anbindung an Maklersoftware, Formulare oft manuell übertragen",
    bottimmo: "Eigenes System, Anbindung an externe CRMs eingeschränkt",
    casaone: "Direkt am eigenen CRM, kaum Anbindung außerhalb des CasaOne-Ökosystems",
    massportal: "Anbindung an das CRM, das Sie bereits nutzen — onOffice, FLOWFACT, Propstack",
  },
  {
    kriterium: "Exposé-Qualität",
    wix: "Freies Baukasten-Layout, Exposé-Logik muss selbst gebaut werden",
    bottimmo: "Vorgefertigte Exposé-Vorlage im Systemlook",
    casaone: "Exposé direkt aus den CRM-Objektdaten, im CasaOne-Raster",
    massportal: "Dramaturgie, die den Preis begründet, im eigenen Markenlook",
  },
  {
    kriterium: "SEO-Fähigkeit",
    wix: "Technische SEO-Grundausstattung vorhanden, Seitenstruktur bleibt generisch",
    bottimmo: "Fertige Themenwelt an Ratgeberinhalten, geteilt mit anderen Kunden des Systems",
    casaone: "Fokus liegt auf Objektverwaltung, SEO bleibt Nebensache",
    massportal: "Eine Seite pro Suchfrage, lokale Landingpages, technisches Fundament fürs Ranking",
  },
  {
    kriterium: "Eigentum an Inhalten",
    wix: "Inhalte bleiben im Baukasten-System gebunden, Umzug bedeutet Neubau",
    bottimmo: "Ratgebertexte sind gemietet, laufen mit der Lizenz aus",
    casaone: "Website bleibt an das CRM-Abo gekoppelt",
    massportal: "Domain, Code und Inhalte gehören dauerhaft Ihrem Büro",
  },
];

const FAQS = [
  {
    q: "Welcher Baukasten ist der beste für Makler?",
    a: "Das hängt vom Anspruch ab, nicht von einer festen Rangliste. Für den ersten Online-Auftritt mit kleinem Budget ist ein Baukasten oft ausreichend. Für den Alleinauftrag gegen den führenden Makler der Stadt entscheidet meist die eigene Marke, nicht die geteilte Vorlage.",
  },
  {
    q: "Kann ich später vom Baukasten auf ein eigenes Portal wechseln?",
    a: "Ja, das ist der übliche Weg. Domains und Inhalte aus dem Baukasten lassen sich meist nicht direkt übernehmen, weil sie an das jeweilige System gebunden sind. Der Wechsel läuft parallel: das neue Portal steht, bevor die alte Lizenz endet.",
  },
  {
    q: "Warum dauert ein Maßportal länger als ein Baukasten?",
    a: "Ein Baukasten füllt eine bestehende Vorlage mit Ihren Daten. Ein Maßportal entsteht neu, von der Marke über die Seitenarchitektur bis zur CRM-Anbindung — das braucht vier bis sechs Wochen, dafür ist das Ergebnis nicht mit dem des Mitbewerbers austauschbar.",
  },
  {
    q: "Was kostet ein eigenes Portal im Vergleich zum Baukasten?",
    a: "Ein Baukasten läuft meist über eine monatliche Lizenz im dreistelligen Bereich, ein Maßportal über eine höhere Investition im Voraus, dafür gehört Ihnen das Ergebnis dauerhaft. Details und Spannen stehen unter Maklerwebsite-Kosten.",
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

export default function MaklerWebsiteBaukastenVergleichPage() {
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

      {/* ── Wissens-Kopf ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Vergleich</p>
            <h1 className="t-display mt-4">
              {rich("Welcher Website-Baukasten passt für *Makler* — und wann keiner mehr reicht.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Welcher Website-Baukasten für Makler passt, hängt von Ihrem Anspruch ab, nicht von
              einer festen Rangliste. Wix und Jimdo liefern ein freies Layout ohne Maklerbezug, BOTTIMMO eine
              fertige Themenwelt speziell für Makler, CasaOne eine Website direkt aus dem
              CRM-System heraus.{" "}
              <Highlight>
                Bei allen dreien bleiben Design und Inhalte an das jeweilige System gebunden
              </Highlight>
              . Ein eigenes Maßportal löst genau diese Bindung, kostet dafür mehr Zeit beim Bau.
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
                src={maklerAsset(4)}
                alt="Makler vergleicht am Bildschirm mehrere Website-Baukästen nebeneinander"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Positionierung — kein „bestes" System, sondern passende Grenze ── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Unsere Position"
              titel="Es gibt keinen *besten* Baukasten — nur die passende Grenze für Ihr Haus."
              sub="Diese Seite bewertet nicht, welches System gewinnt. Sie zeigt, an welchem Punkt ein geteiltes System an seine Grenze stößt und ein eigenes Portal mehr bringt als jede weitere Vorlagen-Anpassung."
              className="max-w-[720px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Matrix — fünf Kriterien, vier Systeme ───────────────────────── */}
      <section id="matrix" className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Matrix"
              titel="Fünf Kriterien, vier Systeme im *direkten* Vergleich."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Kriterium</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Wix / Jimdo</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">BOTTIMMO</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">CasaOne</th>
                  <th className="py-3 t-label !text-[10.5px] !text-ink-yellow">Maßportal</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((z) => (
                  <tr key={z.kriterium} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 t-body max-w-[10rem] !text-ink-cream font-medium">
                      {z.kriterium}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{z.wix}</td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{z.bottimmo}</td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{z.casaone}</td>
                    <td className="py-4 t-body max-w-[15rem]">{z.massportal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="t-small mt-8 max-w-[62ch]">
            Wix, Jimdo, BOTTIMMO und CasaOne sind Marken der jeweiligen Anbieter. beuwy ist
            unabhängiger Dienstleister ohne Gesellschafterbindung an diese Anbieter. Ausführlicher
            zu BOTTIMMO:{" "}
            <Link href="/bottimmo-erfahrungen" className="ref-link">
              BOTTIMMO Erfahrungen
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Baukasten ist kein Maßportal." glyph>
              Er füllt eine bestehende Vorlage mit Ihren Daten, schnell und zuverlässig. Ein
              Maßportal entsteht neu um Ihre Marke herum — Seitenarchitektur, CRM-Anbindung und
              SEO-Fundament eingeschlossen. Das braucht mehr Zeit beim Bau, dafür kein zweites
              Büro mit derselben Vorlage.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Text-Kronzeuge, keine zweite CaseGrid ───────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              17 Jahre Markenarbeit, davor für Bosch und Continental. Für RIEGEL Immobilien
              bedeutete der Wechsel vom Vorlagen-Auftritt zum eigenen Portal: neun Abschlüsse,
              342.000 € Volumen in sechs Wochen, Platz 21 von über 25.000 Maklern beim
              ImmoScout24-Award.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *Systemwahl* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub und Spec-Links ───────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Maßportal*, keine weitere Vorlage.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Den ausführlichen Erfahrungsbericht zu einem der Systeme lesen Sie unter{" "}
              <Link href="/bottimmo-erfahrungen" className="ref-link">
                BOTTIMMO Erfahrungen
              </Link>
              , was ein eigenes Portal kostet zeigt{" "}
              <Link href="/maklerwebsite-kosten" className="ref-link">
                Maklerwebsite-Kosten
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
