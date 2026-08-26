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
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/immobilie-bewerten.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * vertikale Nummern-Liste der drei ImmoWertV-Verfahren (Vergleichswert,
 * Ertragswert, Sachwert) mit je einer vollständig durchgerechneten
 * Beispielrechnung, danach eine Vergleichs-Tabelle mit den Ergebnissen
 * dieser drei Beispiele (tnum). GelbeKarte als Pointe, Beweis-Anriss über
 * den RIEGEL-Case (eigener Bewertungsrechner, belegte Zahlen), FAQ +
 * FAQPage-JSON-LD. Foto 11 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Immobilie bewerten: Die drei Verfahren verständlich erklärt | beuwy",
  description:
    "Immobilie bewerten: Vergleichswert-, Ertrags- oder Sachwertverfahren — mit Beispielrechnung, wann welches Verfahren greift, und einem Rechner als Einstieg.",
  openGraph: {
    title: "Immobilie bewerten: Die drei Verfahren verständlich erklärt | beuwy",
    description:
      "Die drei gesetzlich anerkannten Bewertungsverfahren mit vollständiger Beispielrechnung — und warum ein Online-Rechner keines von ihnen ersetzt.",
    type: "website",
    locale: "de_DE",
  },
};

const VERFAHREN = [
  {
    titel: "Vergleichswertverfahren",
    text: "Der Wert ergibt sich aus tatsächlich erzielten Preisen ähnlicher Objekte. Beispiel: eine 85 m² große Eigentumswohnung in einer Mittelstadt. Aus den letzten zwölf Monaten liegen sieben vergleichbare Verkäufe zwischen 2.250 €/m² und 2.480 €/m² vor, der Median liegt bei 2.380 €/m². 85 m² × 2.380 €/m² ergibt 202.300 €. Ein Abschlag für den fehlenden Balkon (−2 %) und ein Zuschlag für die Südlage (+3 %) führen zu einem Vergleichswert von rund 204.300 €. Eingesetzt wird das Verfahren dort, wo genug Vergleichsverkäufe vorliegen: bei Eigentumswohnungen, Reihen- und Einfamilienhäusern in normalen Lagen.",
  },
  {
    titel: "Ertragswertverfahren",
    text: "Der Wert ergibt sich aus der kapitalisierten Miete. Beispiel: ein Mehrfamilienhaus mit sechs Wohnungen erzielt einen Jahresrohertrag von 54.000 €. Bewirtschaftungskosten von 20 % (Verwaltung, Instandhaltungsrücklage, Mietausfallwagnis) ziehen 10.800 € ab, es bleibt ein Reinertrag von 43.200 €. Der Bodenwert von 140.000 € wird mit dem Liegenschaftszins von 4 % verzinst, das sind 5.600 € pro Jahr, die vom Reinertrag abgehen: 37.600 € Gebäudereinertrag. Bei einer Restnutzungsdauer von 45 Jahren und demselben Zins liefert die Vervielfältiger-Tabelle einen Faktor von rund 20,7. 37.600 € × 20,7 ergibt 778.320 € Gebäudeertragswert, plus 140.000 € Bodenwert: ein Ertragswert von rund 918.000 €. Eingesetzt wird das Verfahren bei vermieteten Mehrfamilienhäusern und Renditeobjekten.",
  },
  {
    titel: "Sachwertverfahren",
    text: "Der Wert ergibt sich getrennt aus Bau- und Bodenkosten. Beispiel: ein freistehendes Einfamilienhaus, 160 m² Wohnfläche, Baujahr 2005, 550 m² Grundstück. Regelherstellungskosten von 1.850 €/m² ergeben 296.000 € Herstellungswert. Nach 21 Jahren Alter bei 80 Jahren Gesamtnutzungsdauer zieht die Alterswertminderung von 26,3 % rund 77.850 € ab, macht 218.150 € Gebäudesachwert. Der Bodenwert (550 m² × 320 €/m²) beträgt 176.000 €. Vorläufiger Sachwert: 394.150 €, ein Marktanpassungsfaktor von 1,05 für die gefragte Lage hebt ihn auf rund 414.000 €. Eingesetzt wird das Verfahren bei selbstgenutzten Häusern ohne genug Vergleichsfälle und bei Sonderimmobilien.",
  },
] as const;

const VERGLEICH = [
  { verfahren: "Vergleichswert", fall: "Eigentumswohnung, ausreichend Vergleichsverkäufe", ergebnis: "204.300 €" },
  { verfahren: "Ertragswert", fall: "Vermietetes Mehrfamilienhaus", ergebnis: "918.000 €" },
  { verfahren: "Sachwert", fall: "Selbstgenutztes Haus ohne Vergleichsfälle", ergebnis: "414.000 €" },
] as const;

const FAQS = [
  {
    q: "Ersetzt eine Online-Bewertung ein Gutachten oder eine Maklereinschätzung?",
    a: "Nein. Ein Online-Rechner liefert in wenigen Minuten eine erste Hausnummer auf Basis von Durchschnittswerten. Ein Gutachten oder eine Einschätzung vor Ort berücksichtigt zusätzlich Zustand, Modernisierungsgrad und die tatsächliche Mikrolage — Faktoren, die ein Formular nicht sehen kann.",
  },
  {
    q: "Welches der drei Verfahren nutzt eine Bank bei der Finanzierung?",
    a: "Banken rechnen meist konservativer als der Markt und ermitteln zusätzlich einen eigenen Beleihungswert, der unter dem Verkehrswert liegt. Je nach Objekt fließen dabei Elemente des Sachwert- oder Ertragswertverfahrens ein, mit Sicherheitsabschlägen, die über die reine Wertermittlung hinausgehen.",
  },
  {
    q: "Warum weichen zwei Bewertungen für dieselbe Immobilie oft voneinander ab?",
    a: "Meist, weil unterschiedliche Vergleichsobjekte, ein anderer Stichtag oder ein anderes Verfahren zugrunde gelegt wurden. Auch Zu- und Abschläge für Zustand und Lage sind zu einem gewissen Grad Ermessenssache — zwei Sachverständige können hier unterschiedlich gewichten, ohne dass einer falsch liegt.",
  },
  {
    q: "Was ist der Unterschied zwischen dem berechneten Wert und dem Preis, der am Ende erzielt wird?",
    a: "Alle drei Verfahren liefern einen Verkehrswert — eine objektive Einschätzung zum Stichtag. Was ein Käufer tatsächlich zahlt, hängt zusätzlich von Nachfrage, Verhandlung und Vermarktung ab. Die Einordnung dieser beiden Zahlen zeigt die Seite Verkehrswert vs. Marktpreis.",
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

export default function ImmobilieBewertenPage() {
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
              {rich("Immobilie bewerten: drei Verfahren, eine *verlässliche* Zahl.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Eine Immobilie wird nach einem von drei gesetzlich anerkannten Verfahren bewertet:
              dem Vergleichswertverfahren, das den Preis ähnlicher verkaufter Objekte heranzieht,
              dem Ertragswertverfahren, das die erzielbare Miete kapitalisiert, und dem
              Sachwertverfahren, das Bau- und Bodenkosten getrennt berechnet.{" "}
              <Highlight>
                Welches Verfahren greift, hängt vom Objekt ab — ein Online-Rechner ersetzt keines
                der drei, liefert aber in wenigen Minuten eine erste Hausnummer
              </Highlight>
              . Wohnungen und Häuser mit genug Vergleichsverkäufen laufen meist über den
              Vergleichswert, vermietete Mehrfamilienhäuser über den Ertragswert, Sonderobjekte
              über den Sachwert.
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
                src={maklerAsset(11)}
                alt="Person prüft Unterlagen und eine Wertermittlung am Tisch, Grundriss und Zahlen im Blick"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Die drei Verfahren — vertikale Nummern-Liste mit Rechenweg ──────── */}
      <section id="verfahren" className="bg-bg-elevated">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die drei Verfahren"
              titel="Jedes Verfahren rechnet *anders* — und kommt trotzdem zu einer belastbaren Zahl."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 divide-y divide-line-subtle border-t border-line-subtle">
            {VERFAHREN.map((v, i) => (
              <Reveal key={v.titel} delay={i * 60}>
                <div className="grid gap-3 py-10 sm:grid-cols-[88px_1fr] sm:gap-8">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{v.titel}</p>
                    <p className="t-body mt-3">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — die drei Beispiel-Ergebnisse nebeneinander ── */}
      <section id="vergleich" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Auf einen Blick"
              titel="Wann welches Verfahren greift."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Verfahren</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Typischer Fall</th>
                  <th className="py-3 t-label !text-[10.5px]">Ergebnis im Beispiel oben</th>
                </tr>
              </thead>
              <tbody>
                {VERGLEICH.map((z) => (
                  <tr key={z.verfahren} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 t-body max-w-[13rem] !text-ink-cream font-medium">
                      {z.verfahren}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[20rem]">{z.fall}</td>
                    <td className="py-4 font-mono text-[14px] text-ink-cream tnum">{z.ergebnis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Reveal delay={100}>
            <p className="t-small mt-6 max-w-[640px] !text-ink-dim">
              Orientierungswert, kein Gutachten. Alle drei Beispiele rechnen mit angenommenen,
              realistischen Marktdaten — Ihre tatsächliche Zahl hängt von der echten Mikrolage und
              dem Zustand vor Ort ab.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Rechner ist keine Wertermittlung." glyph>
              Ein Online-Rechner nutzt Durchschnittswerte für Objekttyp und Stadtgröße, weil er
              Ihre Immobilie nie betreten hat. Ein Gutachten oder eine fundierte
              Maklereinschätzung sieht den Zustand, die Mikrolage und den Modernisierungsgrad —
              genau die Faktoren, die am Ende über mehrere zehntausend Euro entscheiden.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL-Case, eigener Bewertungsrechner ──────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Für RIEGEL Immobilien haben wir einen Bewertungsrechner mit amtlichen
              Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen gebaut: Adresse rein,
              Ersteinschätzung raus, der Lead liegt mit Score im CRM. Ergebnis in den ersten sechs
              Wochen: neun Abschlüsse, 342.000 € Volumen.
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
              titel="Was Sie vor der *ersten* Zahl wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Bewertungsstrecke*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Eine erste Einschätzung liefert unser{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>{" "}
              kostenlos in wenigen Minuten. Wie gut KI-basierte Bewertungen inzwischen sind und wo
              der Sachverständige bleibt, zeigt{" "}
              <Link href="/ki-immobilienbewertung" className="ref-link">
                KI-Immobilienbewertung
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
