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
 * Wissensseite (R3 Welle 2, Cluster P) — /makler-kennzahlen. Hauptteil:
 * eine Nummern-Liste mit den 9 Kennzahlen (Anfragequote bis Bewertungsquote),
 * je mit Formel und einem durchgerechneten Beispiel, danach eine
 * Vergleichs-Tabelle, die das Wochenbericht-Prinzip an vier Beispielwochen
 * zeigt (tnum, overflow-x-auto). Das Gratis-Wort aus dem T-Cluster bleibt
 * hier außen vor (Cluster P). GelbeKarte zu Bauchgefühl als teuerster
 * Kennzahl, Beweis-Anriss (RIEGEL: 342.000 €, 9 Abschlüsse in 6 Wochen),
 * FAQ + FAQPage-JSON-LD. Foto 3 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Makler-Kennzahlen: Die 9 Zahlen, die ein Büro steuern | beuwy",
  description:
    "Makler-Kennzahlen: die 9 KPIs von Anfragequote bis Time-to-Notar, mit Formel und Rechenbeispiel. Das Wochenbericht-Prinzip statt Bauchgefühl im Maklerbüro.",
  openGraph: {
    title: "Makler-Kennzahlen: Die 9 Zahlen, die ein Büro steuern | beuwy",
    description:
      "Von der Anfragequote bis zum Time-to-Notar: die 9 Kennzahlen, mit denen ein Maklerbüro sich selbst steuert, statt sich auf ein Gefühl zu verlassen.",
    type: "website",
    locale: "de_DE",
  },
};

const KENNZAHLEN = [
  {
    titel: "Anfragequote",
    text: "Eigentümer-Anfragen ÷ Besucher der Bewertungsseite × 100. Beispiel: 6 Anfragen bei 150 Besuchern in einer Woche ergeben 4 %. Sinkt die Quote, liegt das Problem meist am Rechner oder am Formular, nicht am Werbebudget.",
  },
  {
    titel: "Cost per Lead",
    text: "Marketingkosten ÷ Anzahl Anfragen. Beispiel: 480 € Anzeigenbudget für 12 Anfragen ergeben 40 € je Lead. Steigt der Wert über mehrere Wochen, ist meist die Zielgruppe zu breit eingestellt, nicht das Budget zu klein.",
  },
  {
    titel: "Erreichungsquote",
    text: "Anteil der Anfragen, die innerhalb von fünf Minuten erreicht werden. Beispiel: 9 von 12 Anfragen erreicht ergeben 75 %. Jede Minute darüber kostet Interesse, das direkt auf die Terminquote durchschlägt.",
  },
  {
    titel: "Terminquote",
    text: "Erstgespräche ÷ erreichte Anfragen. Beispiel: 9 erreichte Anfragen, 5 Erstgespräche ergeben 56 %. Bleibt sie niedrig trotz hoher Erreichungsquote, liegt das Problem im Gespräch selbst, nicht im Zufluss.",
  },
  {
    titel: "Alleinauftragsquote",
    text: "Alleinaufträge ÷ Erstgespräche. Beispiel: 5 Erstgespräche, 2 Alleinaufträge ergeben 40 %. Diese Zahl trennt ein vorbereitetes Gespräch mit Vermarktungsplan von einem, das nur den Prozentsatz verteidigt.",
  },
  {
    titel: "Vermarktungsdauer",
    text: "Tage vom Alleinauftrag bis zur ersten verbindlichen Kaufzusage. Beispiel: 34 Tage bei einer Eigentumswohnung in mittlerer Lage. Verlängert sie sich Woche für Woche, zeigt sich meist ein Preis-Problem, bevor der Eigentümer es zugibt.",
  },
  {
    titel: "Time-to-Notar",
    text: "Tage vom Alleinauftrag bis zum Notartermin. Beispiel: 58 Tage bei einer freistehenden Doppelhaushälfte. Je kürzer dieser Wert, desto weniger Zeit bleibt für Rückzieher, Nachverhandlungen oder einen zweiten Makler im Rennen.",
  },
  {
    titel: "Cost per Abschluss",
    text: "Marketingkosten eines Zeitraums ÷ Notartermine im selben Zeitraum. Beispiel: 2.400 € im Quartal bei 4 Abschlüssen ergeben 600 € je Abschluss – die Zahl, die am Ende über die Wirtschaftlichkeit entscheidet, nicht der Cost per Lead allein.",
  },
  {
    titel: "Bewertungsquote",
    text: "Anteil abgeschlossener Mandate, aus denen eine Google-Bewertung wird. Beispiel: 3 von 5 Verkäufern hinterlassen eine Bewertung, macht 60 %. Diese Quote entsteht nicht am Notartermin, sondern im Umgang mit dem Mandat davor.",
  },
] as const;

const WOCHEN = [
  { woche: "Woche 31", anfragen: "8", erreicht: "88 %", termine: "4", alleinauftraege: "1", cpl: "42 €" },
  { woche: "Woche 32", anfragen: "11", erreicht: "91 %", termine: "6", alleinauftraege: "2", cpl: "37 €" },
  { woche: "Woche 33", anfragen: "6", erreicht: "83 %", termine: "3", alleinauftraege: "0", cpl: "55 €" },
  { woche: "Woche 34", anfragen: "13", erreicht: "92 %", termine: "7", alleinauftraege: "3", cpl: "33 €" },
] as const;

const FAQS = [
  {
    q: "Muss ich alle neun Kennzahlen von Anfang an tracken?",
    a: "Nein. Starten Sie mit Anfragequote, Terminquote und Alleinauftragsquote – die drei zeigen die größten Lücken im Trichter zwischen Website und Notartermin. Die übrigen sechs Kennzahlen ergänzen Sie, sobald eine Tabelle oder ein CRM die Zahlen ohnehin mitschreibt.",
  },
  {
    q: "Wie oft sollte ich die Zahlen auswerten?",
    a: "Wöchentlich, nicht monatlich. Ein Monat verschleift genau die Schwankung, die zeigt, ob ein Problem einmalig war oder sich wiederholt. Ein kurzer Wochenbericht mit denselben fünf, sechs Zahlen reicht dafür völlig aus.",
  },
  {
    q: "Was, wenn eine einzelne Woche schlecht aussieht?",
    a: "Eine Woche ist kein Trend, wie die Beispieltabelle mit Woche 33 zeigt. Reagieren Sie erst, wenn sich eine Abweichung über drei bis vier Wochen bestätigt – sonst korrigieren Sie ein System, das eigentlich funktioniert, wegen eines Ausreißers.",
  },
  {
    q: "Reicht eine einfache Tabelle, oder brauche ich dafür ein CRM?",
    a: "Für den Einstieg reicht eine Tabelle, in die jede Anfrage mit Datum, Quelle und Ergebnis eingetragen wird. Ab einer zweistelligen Zahl an Anfragen im Monat wird das schnell fehleranfällig, dann übernimmt ein CRM die Erfassung automatisch, ohne dass jede Zahl von Hand nachgetragen wird.",
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

export default function MaklerKennzahlenPage() {
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
            <p className="t-label !text-ink-yellow">Kennzahlen &amp; Steuerung</p>
            <h1 className="t-display mt-4">
              {rich("Makler-Kennzahlen: die *9 Zahlen*, die ein Büro wirklich steuern.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Als Makler sollten Sie neun Kennzahlen regelmäßig messen: Anfragequote, Cost per
              Lead, Erreichungsquote, Terminquote, Alleinauftragsquote, Vermarktungsdauer,
              Time-to-Notar, Cost per Abschluss und Bewertungsquote. Jede Zahl zeigt eine andere
              Stelle im Trichter zwischen Website-Besuch und Notartermin, und{" "}
              <Highlight>
                erst zusammen ergeben sie ein Bild, dem ein Büro folgen kann, statt einem Gefühl
              </Highlight>
              . Ohne diese Zahlen bleibt jede Entscheidung – mehr Werbebudget, eine Einstellung,
              ein Rabatt auf die Provision – eine Vermutung.
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
                alt="Makler wertet am Bildschirm einen Wochenbericht mit Anfragen und Terminquote aus"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — die 9 Kennzahlen mit Formel und Rechenbeispiel ──── */}
      <section id="kennzahlen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die 9 Zahlen"
              titel="Vom Website-Besuch bis zum Notartermin: eine Zahl je *Stufe*."
              sub="Jede Kennzahl beantwortet eine andere Frage. Zusammen zeigen sie, an welcher Stelle im Trichter tatsächlich etwas verloren geht."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[820px] divide-y divide-line-subtle">
            {KENNZAHLEN.map((k, i) => (
              <Reveal key={k.titel} delay={i * 40}>
                <div className="flex gap-5 py-6 first:pt-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-body font-medium !text-ink-cream">{k.titel}</p>
                    <p className="t-body mt-1.5">{k.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wochenbericht-Prinzip — Vergleichs-Tabelle über vier Wochen ─────── */}
      <section id="wochenbericht" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Wochenbericht-Prinzip"
              titel="Eine Woche zeigt einen Ausschlag. Vier Wochen zeigen einen *Trend*."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Woche</th>
                    <th className="t-label py-3 pr-6 font-semibold">Anfragen</th>
                    <th className="t-label py-3 pr-6 font-semibold">Erreichungsquote</th>
                    <th className="t-label py-3 pr-6 font-semibold">Termine</th>
                    <th className="t-label py-3 pr-6 font-semibold">Alleinaufträge</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">Cost per Lead</th>
                  </tr>
                </thead>
                <tbody>
                  {WOCHEN.map((w) => (
                    <tr key={w.woche} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{w.woche}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.anfragen}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.erreicht}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.termine}</td>
                      <td className="t-body py-4 pr-6 tnum">{w.alleinauftraege}</td>
                      <td className="t-body py-4 tnum">{w.cpl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              Woche 33 sieht schlecht aus: weniger Anfragen, keine Alleinaufträge, ein Cost per
              Lead von 55 €. Ein Bauchgefühl hätte an dieser Stelle das Budget gekürzt oder die
              Kampagne pausiert. Der Wochenbericht zeigt stattdessen, dass Woche 34 wieder über dem
              Schnitt liegt – derselbe Aufbau, dieselbe Zielgruppe, nur eine schwächere Woche
              dazwischen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Bauchgefühl ist die teuerste Kennzahl." glyph>
              Ein Bauchgefühl kostet nichts in dem Moment, in dem Sie es äußern. Bezahlt wird es
              später: in einer Preissenkung nach einer einzigen schwachen Woche, obwohl der Trend
              über vier Wochen stabil war, oder in einem Werbebudget, das seit Monaten steigt, ohne
              dass jemand den Cost per Lead kennt. Neun Zahlen sind der günstigere Weg.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, Wochenbericht als System in der Praxis ──── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien landet jede Anfrage mit Quelle im System, samt Terminstrecke
              und Rückrufregel. Sechs Wochen nach dem Relaunch stand die Zahl fest: neun Abschlüsse,
              342.000 € Volumen – nachvollziehbar über genau die Kennzahlen, die vorher fehlten.
            </p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              Fallstudie RIEGEL Immobilien lesen →
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihren *Wochenbericht*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie sich der Cost per Lead über Anzeigen und Rechner senken lässt, zeigt die Seite{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                Performance-Marketing für Makler
              </Link>
              , wann aus den Zahlen die erste Einstellung folgt, zeigt die Seite{" "}
              <Link href="/maklerbuero-skalieren" className="ref-link">
                Maklerbüro skalieren
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
