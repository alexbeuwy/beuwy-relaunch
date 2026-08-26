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
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/verkehrswert-vs-marktpreis.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil in
 * drei Bausteinen: Zweispalter mit den zwei Definitionen, eine
 * Drei-Gründe-Rail für die Abweichung, eine Tabelle zur Portal-Falle
 * (Angebotspreis vs. Abschlusspreis) mit einer klar markierten
 * Beispielrechnung. "kostenlos" ist hier erlaubt (Cluster T) und wird
 * einmal für den Verweis auf /tools/verkaufspreisrechner genutzt.
 * GelbeKarte, Beweis-Anriss (RIEGEL-Bewertungsrechner mit amtlichen
 * Bodenrichtwerten), FAQ + FAQPage-JSON-LD. Foto 18 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Verkehrswert vs. Marktpreis: Warum zwei Zahlen richtig sein können | beuwy",
  description:
    "Verkehrswert und Marktpreis: zwei Zahlen für dieselbe Immobilie, eine amtlich berechnet, eine im Verkauf verhandelt. Beispielrechnung und Verhandlungsfolgen.",
  openGraph: {
    title: "Verkehrswert vs. Marktpreis: Warum zwei Zahlen richtig sein können | beuwy",
    description:
      "Der Verkehrswert ist eine Rechnung nach § 194 BauGB, der Marktpreis ein Verhandlungsergebnis. Warum beide für dieselbe Immobilie richtig sein können, mit Beispielrechnung.",
    type: "website",
    locale: "de_DE",
  },
};

const GRUENDE = [
  {
    titel: "Angebot und Nachfrage",
    text: "In einer gefragten Lage mit wenig verfügbarem Bestand zahlen mehrere Interessenten gegeneinander, der Marktpreis steigt über den Verkehrswert. Bei Überangebot passiert das Gegenteil, selbst wenn der Verkehrswert gleich bleibt.",
  },
  {
    titel: "Der Zeitpunkt",
    text: "Ein Verkehrswertgutachten hat ein festes Wertermittlungsdatum. Zinsen, Baukosten und Kaufinteresse ändern sich danach weiter, der Marktpreis am Tag der Beurkundung kennt diesen Stichtag nicht.",
  },
  {
    titel: "Was erst bei Besichtigung auffällt",
    text: "Sanierungsstau, Grundriss, Geräuschkulisse: Manches sieht ein Käufer erst vor Ort und preist es sofort ein, ein Vergleichswertverfahren dagegen rechnet mit Durchschnittswerten vergleichbarer Objekte.",
  },
] as const;

const PORTAL_FALLE = [
  { merkmal: "Zahl", angebot: "Angebotspreis auf dem Portal", abschluss: "Abschlusspreis im Notarvertrag" },
  { merkmal: "Beispiel", angebot: "449.000 €", abschluss: "417.000 €" },
  { merkmal: "Enthält Verhandlungsspielraum", angebot: "ja, meist eingepreist", abschluss: "nein, ist das Ergebnis" },
  { merkmal: "Wer setzt die Zahl", angebot: "Verkäufer bzw. Makler", abschluss: "Käufer und Verkäufer gemeinsam" },
] as const;

const FAQS = [
  {
    q: "Welcher Wert zählt bei einer Erbschaft oder Scheidung?",
    a: "Der Verkehrswert. Finanzamt und Familiengericht brauchen eine neutrale, nachvollziehbar berechnete Zahl, keine Momentaufnahme aus dem aktuellen Marktgeschehen. Deshalb verlangen beide ein Gutachten, kein Portal-Exposé.",
  },
  {
    q: "Warum zeigt das Portal oft einen höheren Preis als der Gutachter?",
    a: "Der Angebotspreis enthält üblicherweise einen Verhandlungspuffer, den Verkäufer oder Makler bewusst einrechnen. Der Verkehrswert tut das nicht, er bildet ausschließlich den nach Verfahren berechneten Wert ab, ohne taktischen Aufschlag.",
  },
  {
    q: "Kann der Marktpreis unter dem Verkehrswert liegen?",
    a: "Ja. Bei Überangebot in der Region, bei sichtbarem Sanierungsstau oder wenn ein Objekt lange auf dem Markt steht, sinkt der erzielbare Preis unter den rechnerischen Wert, auch wenn sich am Gutachten nichts ändert.",
  },
  {
    q: "Ersetzt ein Online-Rechner das Verkehrswertgutachten?",
    a: "Nein. Ein Rechner liefert eine kostenlose Ersteinschätzung auf Basis von Bodenrichtwerten und vergleichbaren Verkäufen, ein Verkehrswertgutachten braucht einen öffentlich bestellten Sachverständigen. Für Bank, Gericht oder Finanzamt zählt nur Letzteres.",
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

export default function VerkehrswertVsMarktpreisPage() {
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
            <p className="t-label !text-ink-yellow">Bewertung &amp; Marktpreis</p>
            <h1 className="t-display mt-4">
              {rich("Verkehrswert vs. Marktpreis: Warum *beide* Zahlen richtig sein können.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Der Verkehrswert ist die amtlich berechnete, objektive Zahl nach § 194 Baugesetzbuch,
              ermittelt über Vergleichs-, Ertrags- oder Sachwertverfahren, unabhängig davon, wer
              gerade kauft oder verkauft. Der Marktpreis ist die Zahl, die tatsächlich verhandelt
              und bezahlt wird, und schwankt mit Nachfrage, Zeitpunkt und dem, was ein einzelner
              Käufer bereit ist zu zahlen.{" "}
              <Highlight>
                Beide können für dieselbe Immobilie richtig sein und trotzdem zehn Prozent oder
                mehr auseinanderliegen
              </Highlight>
              , weil der eine eine Rechnung ist und der andere ein Verhandlungsergebnis.
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
                src={maklerAsset(18)}
                alt="Makler erklärt einem Eigentümer am Tisch den Unterschied zwischen zwei Preiszahlen"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zwei Definitionen — Zweispalter im Karten-Stil ──────────────────── */}
      <section id="definitionen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zwei Definitionen"
              titel="Eine Zahl aus dem *Gesetz*, eine Zahl aus dem Verhandeln."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-base p-7">
                <p className="t-label">Verkehrswert</p>
                <p className="t-body mt-4">
                  Der nach § 194 BauGB definierte, objektiv berechnete Wert einer Immobilie zu
                  einem festen Stichtag, ermittelt über ein anerkanntes Verfahren
                  (Vergleichswert-, Ertragswert- oder Sachwertverfahren). Er interessiert Banken,
                  Gerichte und das Finanzamt, weil er unabhängig von der Verhandlung zwischen zwei
                  konkreten Personen entsteht.
                </p>
                <p className="t-small mt-4">
                  Zuständig: öffentlich bestellter und vereidigter Sachverständiger, nicht der
                  Makler.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-base p-7">
                <p className="t-label">Marktpreis</p>
                <p className="t-body mt-4">
                  Der Preis, den ein konkreter Käufer für ein konkretes Objekt an einem konkreten
                  Tag tatsächlich zahlt. Er entsteht aus Angebot, Nachfrage, Vermarktung und
                  Verhandlungsgeschick, nicht aus einer Formel. Zwei baugleiche Wohnungen im
                  selben Haus können deshalb zu unterschiedlichen Marktpreisen verkauft werden.
                </p>
                <p className="t-small mt-4">
                  Zuständig: Käufer und Verkäufer gemeinsam, moderiert durch den Makler.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Drei Gründe für die Abweichung — Rail ────────────────────────────── */}
      <section id="gruende" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Warum sie auseinanderlaufen"
              titel="Drei Gründe, warum der Markt anders rechnet als das Gutachten."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {GRUENDE.map((g, i) => (
              <Reveal key={g.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{g.titel}</p>
                  <p className="t-body mt-3">{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portal-Falle — Angebotspreis vs. Abschlusspreis, Beispielrechnung ── */}
      <section id="portal-falle" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Portal-Falle"
              titel="Was auf dem Portal steht, ist nicht das, was am Ende *bezahlt* wird."
              sub="Beispielrechnung, keine Zusage für ein konkretes Objekt. Der tatsächliche Abstand hängt von Lage, Zustand und Verhandlungsdauer ab."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Merkmal</th>
                    <th className="t-label py-3 pr-6 font-semibold">Angebotspreis</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">Abschlusspreis</th>
                  </tr>
                </thead>
                <tbody>
                  {PORTAL_FALLE.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.angebot}</td>
                      <td className="t-body py-4 tnum">{row.abschluss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              Steht ein Objekt für 449.000 € auf dem Portal, ist das der Angebotspreis, meist mit
              eingerechnetem Verhandlungsspielraum. Nach Besichtigungen und Verhandlung liegt der
              Notarvertrag am Ende häufig darunter, im Beispiel bei 417.000 €, eine Differenz von
              rund sieben Prozent. Für Eigentümer heißt das: Der Angebotspreis ist eine
              Vermarktungsentscheidung, keine Prognose. Wer vorab wissen will, in welchem Korridor
              der Verkehrswert liegt, bekommt eine erste, kostenlose Einschätzung über den{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>
              , ausführlicher erklärt auf der Seite{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                Immobilie bewerten
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Gutachten verhandelt nicht mit." glyph>
              Der Verkehrswert schützt vor einer willkürlichen Zahl, der Marktpreis schützt vor
              einem zu langen Vermarktungszeitraum. Ein guter Preisvorschlag orientiert sich an
              beidem: am Verkehrswert als Untergrenze der Seriosität, am Marktpreis als Zielzone
              für den tatsächlichen Verkauf.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, Bewertungsrechner mit Bodenrichtwerten ──── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Der Bewertungsrechner von RIEGEL Immobilien rechnet mit amtlichen Bodenrichtwerten
              und über 5.000 ausgewerteten Verkäufen. Sechs Wochen nach dem Relaunch: neun
              Abschlüsse, 342.000 € Volumen.
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
            <h2 className="t-h2 mt-4">{rich("Klären wir Ihren *Preis*, bevor der Markt es tut.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die drei Bewertungsverfahren im Detail auf der Seite{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                Immobilie bewerten
              </Link>
              , eine erste Zahl liefert der{" "}
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
