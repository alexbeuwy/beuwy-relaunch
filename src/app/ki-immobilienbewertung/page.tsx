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
 * Wissensseite (R3 Welle 2, Cluster K) — /ki-immobilienbewertung. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich: gut für die erste
 * Orientierung, blind für Sanierungszustand und Mikrolage. Hauptteil: ein
 * 4-Schritte-Mechanismus (AVM-Prinzip), PainRows zu den Fehlerquellen,
 * eine Vergleichstabelle Rechner vs. Sachverständigengutachten. GelbeKarte,
 * Beweis-Anriss über den Bewertungsrechner, den beuwy für RIEGEL mit
 * amtlichen Bodenrichtwerten gebaut hat (Fakt aus cases.ts, nicht mit dem
 * öffentlichen Tool /tools/verkaufspreisrechner verwechselt — das rechnet
 * regelbasiert ohne Bodenrichtwerte, siehe dessen eigene FAQ). FAQ inkl.
 * klarer Gutachter-Grenze + FAQPage-JSON-LD. Foto 13 (Hochformat) laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "KI-Immobilienbewertung: Was Modelle können und wo der Gutachter bleibt | beuwy",
  description:
    "KI-Immobilienbewertung liefert in Sekunden eine Wertspanne, sieht aber weder Sanierungszustand noch Mikrolage. Das AVM-Prinzip und die Gutachter-Grenze erklärt.",
  openGraph: {
    title: "KI-Immobilienbewertung: Was Modelle können und wo der Gutachter bleibt | beuwy",
    description:
      "Wie ein AVM-Modell rechnet, wo es blind bleibt und ab wann ein Sachverständigengutachten statt eines Rechners nötig ist.",
    type: "website",
    locale: "de_DE",
  },
};

const SCHRITTE = [
  {
    titel: "Vergleichsdaten",
    text: "Tausende tatsächliche Verkäufe aus der Region fließen als Grundlage ein, nicht nur Angebotspreise aus Anzeigen.",
  },
  {
    titel: "Merkmale",
    text: "Wohnfläche, Baujahr, Objekttyp, Postleitzahl und bei Häusern die Grundstücksfläche gehen als feste Größen in die Rechnung ein.",
  },
  {
    titel: "Gewichtung",
    text: "Das Modell gewichtet, wie stark jedes Merkmal den Preis in genau dieser Region historisch beeinflusst hat, statt eine pauschale Formel über alle Orte zu legen.",
  },
  {
    titel: "Ausgabe als Spanne",
    text: "Am Ende steht eine Wertspanne, keine einzelne Zahl — die verbleibende Unsicherheit wird sichtbar gemacht, nicht versteckt.",
  },
] as const;

const PAINS = [
  {
    quote: "Der Sanierungszustand hinter der Fassade sieht kein Modell.",
    answer:
      "Ob das Bad 2023 saniert wurde oder seit 1985 unverändert ist, macht einen Unterschied von mehreren Prozentpunkten. Ein Modell ohne Besichtigung kennt nur die gemeldeten Eckdaten, nicht den tatsächlichen Zustand.",
  },
  {
    quote: "Die Mikrolage zählt nicht als Datenpunkt.",
    answer:
      "Straßenlärm, ein Neubau direkt vor dem Balkon oder ein besonders ruhiger Innenhof wirken sich real auf den Preis aus, tauchen aber in keiner Postleitzahlen-Statistik auf.",
  },
  {
    quote: "Sondermerkmale fehlen komplett.",
    answer:
      "Erbpacht, Denkmalschutz oder ein eingetragenes Wohnrecht verändern den Wert erheblich, sind in den meisten automatisierten Modellen aber schlicht nicht vorgesehen.",
  },
];

const VERGLEICH = [
  { merkmal: "Dauer bis zum Ergebnis", rechner: "Sekunden", gutachten: "mehrere Tage bis Wochen" },
  { merkmal: "Objektbesichtigung", rechner: "nein", gutachten: "ja, vor Ort" },
  { merkmal: "Rechtssicherheit", rechner: "Orientierungswert, kein Gutachten", gutachten: "gerichtsfest, anerkannt" },
  { merkmal: "Typischer Einsatzzweck", rechner: "erste Einschätzung, Verkaufsvorbereitung", gutachten: "Gericht, Finanzamt, Erbschaft, Scheidung" },
  { merkmal: "Berücksichtigt Sanierung/Mikrolage", rechner: "nur über Ihre eigene Schätzung", gutachten: "ja, direkt geprüft" },
] as const;

const FAQS = [
  {
    q: "Ersetzt eine KI-Bewertung ein Sachverständigengutachten?",
    a: "Nein. Eine KI-Bewertung liefert eine Orientierungswert-Spanne ohne Besichtigung, ein Gutachten prüft das Objekt vor Ort und ist als einziges gerichtsfest. Das ist eine allgemeine Einordnung, keine Rechts- oder Steuerberatung im Einzelfall.",
  },
  {
    q: "Wie genau ist so eine Spanne wirklich?",
    a: "Bei einem gut trainierten Modell und ausreichend Vergleichsdaten liegt der reale Verkaufspreis meist innerhalb der ausgegebenen Spanne, oft um die zehn Prozent um den Mittelwert. Zustand, Lage und Ausstattung fließen nur so genau ein, wie sie eingegeben wurden.",
  },
  {
    q: "Wann brauche ich zwingend einen Sachverständigen statt eines Rechners?",
    a: "Bei Gerichtsverfahren, gegenüber dem Finanzamt, bei einer Erbauseinandersetzung oder Scheidung verlangen die beteiligten Stellen üblicherweise ein geprüftes Gutachten. Ein Rechner reicht dort nicht aus, auch nicht als Ersatz für eine kurzfristige Verhandlung.",
  },
  {
    q: "Kann ein Makler eine KI-Schätzung einfach als Verkaufspreis übernehmen?",
    a: "Nein, sie ist ein Ausgangspunkt, kein fertiges Angebot. Ein Makler prüft Zustand, Ausstattung und Mikrolage vor Ort und passt die Preisstrategie entsprechend an, bevor eine Zahl im Exposé steht.",
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

export default function KiImmobilienbewertungPage() {
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
            <p className="t-label !text-ink-yellow">KI im Maklerbüro</p>
            <h1 className="t-display mt-4">
              {rich("KI-Immobilienbewertung: was ein Modell *schätzt*, und wo der Gutachter übernimmt.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              KI-basierte Immobilienbewertung, auch AVM genannt (Automated Valuation Model),
              liefert eine Wertspanne aus tausenden vergleichbaren Verkäufen und Objektdaten,
              meist in Sekunden — gut genug für eine erste Orientierung.{" "}
              <Highlight>Was das Modell nicht sieht: den Sanierungszustand hinter
              der Fassade, die tatsächliche Mikrolage, ein zweites Bad im Dachgeschoss</Highlight>{" "}
              — das bleibt eine Fehlerquelle, die nur eine Besichtigung schließt. Für den Verkauf
              reicht die Schätzung als Startpunkt, für Gericht, Finanzamt oder Erbauseinandersetzung
              braucht es ein Gutachten von einem Sachverständigen.
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
                alt="Makler betrachtet eine Wertspanne auf dem Bildschirm, Grundriss der Immobilie liegt daneben"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover object-top"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, AVM-Prinzip ────────────────────────── */}
      <section id="mechanismus" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das AVM-Prinzip"
              titel="So rechnet ein *automatisiertes* Bewertungsmodell."
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

      {/* ── Fehlerquellen — PainRows ─────────────────────────────────────────── */}
      <section id="fehlerquellen" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Wo das Modell blind bleibt"
              titel="Drei Dinge, die *kein* Rechner sieht."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Vergleich — Rechner vs. Sachverständigengutachten ───────────────── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Vergleich"
              titel="Rechner und Gutachten lösen *unterschiedliche* Aufgaben."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Merkmal</th>
                    <th className="t-label py-3 pr-6 font-semibold">KI-Rechner</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">Sachverständigengutachten</th>
                  </tr>
                </thead>
                <tbody>
                  {VERGLEICH.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.rechner}</td>
                      <td className="t-body py-4 tnum">{row.gutachten}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Rechner schätzt. Ein Gutachter urteilt." glyph>
              Beide Werkzeuge haben ihren Platz, aber nicht denselben. Ein Rechner gibt in
              Sekunden eine Richtung vor, ein Gutachten steht am Ende einer Prüfung vor Ort und
              trägt eine Unterschrift, die vor Gericht und Finanzamt Bestand hat.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL-Rechner mit amtlichen Bodenrichtwerten ───── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Prototyp</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Für RIEGEL Immobilien haben wir einen Bewertungsrechner mit amtlichen
              Bodenrichtwerten und über 5.000 ausgewerteten Verkäufen gebaut — Adresse rein,
              Ersteinschätzung raus, der Lead liegt mit Score im CRM.
            </p>
            <p className="t-body mt-4 max-w-[52ch]">
              Unser eigener{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>{" "}
              zeigt das Grundprinzip live: eine Wertspanne mit nachvollziehbarem Rechenweg, als
              Orientierungswert, kein Gutachten.
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
        </div>
      </section>

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihren eigenen *Bewertungsrechner*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , probieren können Sie das Prinzip direkt am{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>
              , wie KI insgesamt im Maklerbüro zu einem System statt zu einem Prompt wird, zeigt{" "}
              <Link href="/ki-fuer-immobilienmakler" className="ref-link">
                KI für Immobilienmakler
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
