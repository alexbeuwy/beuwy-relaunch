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
 * Wissensseite (R3 Welle 2, Cluster V) — /lead-anbieter-vergleich. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich, danach PainRows zum
 * Mehrfachverkauf/No-Shows, eine Rechnungs-Tabelle mit marktüblichen
 * Richtwerten (klar als Beispielrechnung markiert, keine Anbieter-Zusage)
 * und eine konkrete Break-even-Passage. GelbeKarte, Beweis-Anriss (Riegel:
 * ohne einen einzigen gekauften Lead), FAQ + FAQPage-JSON-LD. Foto 7 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Lead-Anbieter im Vergleich: Gekaufte Kontakte gegen eigene Quelle | beuwy",
  description:
    "Lead-Anbieter im Vergleich: Was ein gekaufter Eigentümer-Kontakt inklusive Mehrfachverkauf und No-Shows wirklich kostet, und wann sich die eigene Quelle rechnet.",
  openGraph: {
    title: "Lead-Anbieter im Vergleich: Gekaufte Kontakte gegen eigene Quelle | beuwy",
    description:
      "Der reale Preis eines gekauften Eigentümer-Kontakts, inklusive Mehrfachverkauf und No-Shows, im Vergleich zur eigenen Lead-Quelle. Break-even transparent gerechnet.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Ein Lead kostet 55 €. Klingt günstig, bis Sie hören, wie oft er verkauft wurde.",
    answer:
      "Die meisten Anbieter geben denselben Kontakt an drei bis fünf Makler gleichzeitig weiter. Sie zahlen den vollen Preis für ein Rennen, das schon läuft, wenn Ihre Mail rausgeht.",
  },
  {
    quote: "Jeder dritte Kontakt geht gar nicht erst ans Telefon.",
    answer:
      "Falsche Nummern, längst vergebene Objekte, Eigentümer, die nur mal schauen wollten: Ein spürbarer Teil jeder Liste lässt sich nicht in ein Gespräch verwandeln, egal wie schnell Sie anrufen.",
  },
  {
    quote: "Der Lead gehört dem Anbieter. Ihnen gehört nur die Rechnung.",
    answer:
      "Endet das Abo, endet der Zufluss, sofort und vollständig. Eine eigene Quelle bleibt bestehen, auch wenn Sie einen Monat kein Budget nachlegen.",
  },
];

const RECHNUNG = [
  { merkmal: "Preis pro Kontakt", gekauft: "45 € – 90 €", eigen: "keine Stückkosten" },
  { merkmal: "Käufer je Kontakt (Mehrfachverkauf)", gekauft: "meist 3 – 5 Makler", eigen: "nur Sie" },
  { merkmal: "Anteil nicht erreichbar / bereits vergeben", gekauft: "ca. 25 % – 35 %", eigen: "entfällt strukturell" },
  { merkmal: "Realistische Abschlussquote je Kontakt", gekauft: "meist unter 5 %", eigen: "abhängig von der eigenen Kette" },
  { merkmal: "Läuft weiter, wenn das Budget pausiert", gekauft: "nein", eigen: "ja" },
] as const;

const FAQS = [
  {
    q: "Sind gekaufte Leads grundsätzlich schlecht?",
    a: "Nein. Für einen schnellen Test in einer neuen Region oder zur Überbrückung einer stillen Phase können sie sinnvoll sein. Problematisch wird es erst, wenn gekaufte Kontakte die einzige Quelle bleiben, obwohl derselbe Betrag in eine eigene Kette jeden Monat mehr Ertrag bringen würde.",
  },
  {
    q: "Wie erkenne ich, ob ein Anbieter seriös ist?",
    a: "Fragen Sie direkt nach der Exklusivität: Wird der Kontakt nur an Sie oder an mehrere Makler gleichzeitig vergeben, und wie alt ist die Anfrage zum Zeitpunkt des Verkaufs? Ein seriöser Anbieter beantwortet beide Fragen ohne Umschweife.",
  },
  {
    q: "Ab wann rechnet sich eine eigene Lead-Quelle?",
    a: "Sobald die monatlichen Ausgaben für gekaufte Kontakte über mehrere Monate stabil anfallen. Ab diesem Punkt kostet der Aufbau einer eigenen Kette meist nicht mehr als der Weiterbezug, arbeitet danach aber weiter, ohne dass jeder Kontakt neu bezahlt wird.",
  },
  {
    q: "Kann ich gekaufte Leads und eine eigene Quelle parallel nutzen?",
    a: "Ja, das ist sogar der übliche Weg. Viele Büros laufen gekaufte Kontakte weiter, während die eigene Quelle aufgebaut wird, und reduzieren den Einkauf erst, wenn die eigene Kette zuverlässig genug Anfragen liefert.",
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

export default function LeadAnbieterVergleichPage() {
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
            <p className="t-label !text-ink-yellow">Anbieter-Vergleich</p>
            <h1 className="t-display mt-4">
              {rich("Lead-Anbieter im *Vergleich*: Was ein Kontakt wirklich kostet.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Gekaufte Eigentümer-Leads lohnen sich nur in engen Grenzen. Der einzelne Kontakt
              kostet meist zwischen 45 € und 90 €, wird aber häufig an drei bis fünf Makler
              gleichzeitig verkauft, sodass Sie selten der Einzige am Telefon sind. Rechnet man{" "}
              <Highlight>Mehrfachverkauf und nicht erreichbare Kontakte ein</Highlight>, liegt der
              reale Preis pro Mandat deutlich über dem Listenpreis. Für einen kurzen Testlauf kann
              der Einkauf trotzdem sinnvoll sein, als dauerhafte Quelle rechnet sich meist die
              eigene Kette schneller.
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
                src={maklerAsset(7)}
                alt="Makler prüft eine Liste eingekaufter Kontakte am Laptop, Notizblock daneben"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem — Mehrfachverkauf, No-Shows, kein bleibender Wert ───────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Listenpreis täuscht"
              titel="Der Preis auf der Rechnung ist nicht der Preis pro *Mandat*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Die Rechnung — Richtwerte-Tabelle + Beispielrechnung ────────────── */}
      <section id="rechnung" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Rechnung"
              titel="Gekaufter Kontakt gegen *eigene* Quelle, Zeile für Zeile."
              sub="Richtwerte aus dem Markt, keine Zusage einzelner Anbieter. Ihr tatsächlicher Preis hängt von Region, Objektklasse und Anbieter ab."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Merkmal</th>
                    <th className="t-label py-3 pr-6 font-semibold">Gekaufter Lead</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">Eigene Quelle</th>
                  </tr>
                </thead>
                <tbody>
                  {RECHNUNG.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.gekauft}</td>
                      <td className="t-body py-4 tnum">{row.eigen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              Beispielrechnung, wenn ein Anbieter 55 € pro Kontakt verlangt: Bei 20 Kontakten im
              Monat zahlen Sie 1.100 €. Erreichen lassen sich davon realistisch 13 bis 14, weil ein
              Teil nicht abhebt oder das Objekt längst vergeben ist. Wird daraus im Schnitt ein
              Mandat, liegt der reale Preis bei rund 1.100 € pro Abschluss, nicht bei den 55 € auf
              der Rechnung. Eine eigene Quelle kostet in der Anlaufphase ähnlich viel, wird danach
              aber mit jedem Monat günstiger, weil Anzeige und Rechner weiterlaufen, ohne dass ein
              Kontakt einzeln neu bezahlt wird — die volle Systematik dahinter zeigt die Seite{" "}
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                Eigentümer-Leads generieren
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Kontakt ist kein Mandat." glyph>
              Der Listenpreis eines Leads verschweigt drei Dinge: wie oft er verkauft wurde, wie
              alt er beim Verkauf schon war, und ob überhaupt jemand abhebt. Eine eigene Quelle hat
              keinen Listenpreis, dafür einen Preis pro Mandat, der mit der Zeit sinkt statt gleich
              bleibt.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel, ohne einen einzigen gekauften Lead ──────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              342.000 € Volumen, neun Abschlüsse in sechs Wochen nach dem Relaunch, ohne einen
              einzigen gekauften Lead.
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre eigene *Quelle*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die Systematik dahinter auf der Seite{" "}
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                Eigentümer-Leads generieren
              </Link>
              . Für Kapitalanleger-Objekte gilt eine eigene Logik, nachzulesen unter{" "}
              <Link href="/marketing-kapitalanlage-immobilien" className="ref-link">
                Marketing für Kapitalanlage-Immobilien
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
