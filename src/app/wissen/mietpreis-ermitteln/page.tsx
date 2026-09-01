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
 * Wissensseite (R3 Welle 2, Cluster T) — /wissen/mietpreis-ermitteln.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * vertikale Nummern-Liste mit fünf Schritten (Mietspiegel, Vergleichsmiete,
 * Zu-/Abschläge mit Rechenweg, Mietpreisbremse, Rechner), danach eine
 * Häkchen-Checkliste der häufigsten Zu-/Abschläge. GelbeKarte als Pointe,
 * Beweis-Anriss über 17 Jahre Erfahrung im Bau von Rechenmodellen, FAQ +
 * FAQPage-JSON-LD. Foto 12 (hochkant) laut R3-SEITENPLAN.json, per
 * object-cover im 21:9-Band wie im geo-checkliste-Muster.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Mietpreis ermitteln: Vergleichsmiete, Spiegel und Spielraum | beuwy",
  description:
    "Mietpreis ermitteln: Mietspiegel lesen, Vergleichsmiete finden, Zu- und Abschläge rechnen, Mietpreisbremse prüfen. Mit Rechenbeispiel und Rechner als Einstieg.",
  openGraph: {
    title: "Mietpreis ermitteln: Vergleichsmiete, Spiegel und Spielraum | beuwy",
    description:
      "Vom Mietspiegel über Zu- und Abschläge bis zur Mietpreisbremse: die richtige Miete in fünf nachvollziehbaren Schritten, mit Rechenbeispiel.",
    type: "website",
    locale: "de_DE",
  },
};

const SCHRITTE = [
  {
    titel: "Mietspiegel der Gemeinde prüfen",
    text: "Größere Städte führen einen qualifizierten Mietspiegel nach § 558d BGB, wissenschaftlich erstellt und alle zwei Jahre fortgeschrieben. Kleinere Gemeinden haben oft nur einen einfachen Mietspiegel oder gar keinen — dort helfen Vergleichsangebote aus Portalen für ähnliche Objekte in derselben Lage weiter.",
  },
  {
    titel: "Vergleichsmiete im Mietspiegel finden",
    text: "Im Mietspiegel-Feld für Wohnfläche, Baujahr und Ausstattung steht eine Spanne, kein Punktwert. Beispiel: 75 m², Baujahr 2003, mittlere Ausstattung — das Feld nennt 8,40 bis 9,10 €/m², Mittelwert 8,75 €/m².",
  },
  {
    titel: "Zu- und Abschläge anwenden",
    text: "Merkmale, die der Mietspiegel nicht direkt erfasst, wandern als Zu- oder Abschlag in den m²-Preis. Beispielrechnung auf dem Wert von oben: Balkon +0,30 €/m², Einbauküche +0,20 €/m², Lage an einer Hauptverkehrsachse −0,25 €/m². 8,75 + 0,30 + 0,20 − 0,25 ergibt 9,00 €/m². Bei 75 m² macht das 675 € Kaltmiete im Monat.",
  },
  {
    titel: "Mietpreisbremse prüfen",
    text: "In Gebieten, die eine Landesregierung als angespannten Wohnungsmarkt ausgewiesen hat, darf die Miete bei einer Neuvermietung höchstens zehn Prozent über der ortsüblichen Vergleichsmiete liegen (§ 556d BGB). Ausnahmen gelten für Neubauten nach dem 1. Oktober 2014 und nach umfassender Modernisierung. Diese Seite ist keine Rechtsberatung — ob Ihre Adresse in einem solchen Gebiet liegt und welche Ausnahme greift, klärt im Zweifel ein Anwalt oder Mieterverein.",
  },
  {
    titel: "Rechner als Einstieg nutzen",
    text: "Unser Mietpreisrechner rechnet nach demselben Prinzip wie ein Mietspiegel: eine Basis-Kaltmiete je Objekttyp und Stadtgröße, korrigiert um Zustand, Ausstattung und Baujahr, mit einer Spanne von rund acht Prozent statt einem Punktwert — kostenlos und in unter zwei Minuten nutzbar.",
  },
] as const;

const ZUSCHLAEGE = [
  { text: "Balkon oder Terrasse", richtung: "+" },
  { text: "Einbauküche", richtung: "+" },
  { text: "Aufzug im Mehrfamilienhaus", richtung: "+" },
  { text: "Stellplatz oder Garage", richtung: "+" },
  { text: "Fußbodenheizung oder hochwertige Sanitäranlagen", richtung: "+" },
  { text: "Lage an einer Hauptverkehrsachse", richtung: "−" },
  { text: "Erdgeschoss ohne Balkon oder Garten", richtung: "−" },
  { text: "Sichtbarer Sanierungsstau", richtung: "−" },
] as const;

const FAQS = [
  {
    q: "Darf ich als Eigentümer die Miete einfach über den Mietspiegel-Mittelwert setzen?",
    a: "Bei einer Neuvermietung ja, solange keine Mietpreisbremse greift oder eine zulässige Ausnahme vorliegt. Bei einer laufenden Mieterhöhung gelten zusätzliche Grenzen wie die Kappungsgrenze — dafür lohnt sich vorab ein Blick in den aktuellen Mietspiegel Ihrer Gemeinde.",
  },
  {
    q: "Was mache ich, wenn meine Gemeinde keinen Mietspiegel hat?",
    a: "Dann orientieren Sie sich an mindestens drei bis vier vergleichbaren Angeboten aus Portalen, möglichst mit ähnlicher Wohnfläche, Baujahr und Lage. Je weniger Vergleichsfälle vorliegen, desto größer sollte die Spanne sein, die Sie einkalkulieren.",
  },
  {
    q: "Wie oft sollte ich den Mietpreis meiner Bestandsimmobilie neu prüfen?",
    a: "Ein jährlicher Check reicht in den meisten Märkten. Bei spürbaren Veränderungen in der Nachbarschaft — neue Infrastruktur, größere Sanierungsprojekte in der Umgebung, ein neuer Mietspiegel — lohnt sich ein Blick auch außerhalb des Rhythmus.",
  },
  {
    q: "Wie hängt der Mietpreis mit dem Verkaufswert meiner Immobilie zusammen?",
    a: "Bei vermieteten Objekten fließt die erzielbare Miete direkt in den Verkehrswert ein, über das Ertragswertverfahren. Wie das im Detail gerechnet wird, zeigt die Seite Immobilie bewerten.",
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

function ZuschlagIcon({ richtung }: { richtung: "+" | "−" }) {
  const positiv = richtung === "+";
  return (
    <span
      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[13px] font-bold tnum ${
        positiv ? "bg-akzent text-ink-cream" : "border border-line-medium text-ink-muted"
      }`}
      aria-hidden
    >
      {richtung}
    </span>
  );
}

export default function MietpreisErmittelnPage() {
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
              {rich("Mietpreis ermitteln: die *richtige* Zahl vor der ersten Anzeige.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Der richtige Mietpreis ergibt sich aus dem Mietspiegel oder vergleichbaren
              Angeboten Ihrer Stadt, korrigiert um Zu- und Abschläge für Lage, Ausstattung und
              Zustand.{" "}
              <Highlight>
                In Städten mit angespanntem Wohnungsmarkt begrenzt zusätzlich die
                Mietpreisbremse die zulässige Miete bei einer Neuvermietung auf höchstens zehn
                Prozent über der ortsüblichen Vergleichsmiete
              </Highlight>
              . Ein Online-Rechner mit Basiswerten für Objekttyp und Stadtgröße liefert in wenigen
              Minuten eine erste Spanne, ersetzt aber weder den Mietspiegel noch eine rechtliche
              Prüfung im Einzelfall.
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
                src={maklerAsset(12)}
                alt="Person prüft Mietspiegel und Vergleichsangebote auf einem Tablet am Wohnungsfenster"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Fünf Schritte — vertikale Nummern-Liste mit Rechenweg ───────────── */}
      <section id="schritte" className="bg-bg-elevated">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="In fünf Schritten"
              titel="Vom Mietspiegel zur *belastbaren* Zahl."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 divide-y divide-line-subtle border-t border-line-subtle">
            {SCHRITTE.map((s, i) => (
              <Reveal key={s.titel} delay={i * 60}>
                <div className="grid gap-3 py-10 sm:grid-cols-[88px_1fr] sm:gap-8">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{s.titel}</p>
                    <p className="t-body mt-3">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Checkliste — häufigste Zu- und Abschläge ────────────────────────── */}
      <section id="zuschlaege" className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zum Nachschlagen"
              titel="Die häufigsten *Zu- und Abschläge* auf einen Blick."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ZUSCHLAEGE.map((z, i) => (
              <Reveal key={z.text} delay={i * 40}>
                <div className="flex items-center gap-3">
                  <ZuschlagIcon richtung={z.richtung} />
                  <p className="t-body">{z.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Rechner kennt keinen Straßenlärm." glyph>
              Ein Algorithmus rechnet mit Durchschnittswerten für Ihre Stadtgröße, nicht mit der
              Baustelle vor dem Fenster oder dem Blick ins Grüne. Die Zahl aus dem Rechner ist der
              Startpunkt für ein Gespräch, nicht das letzte Wort dazu.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — 17 Jahre Erfahrung im Bau von Rechenmodellen ────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              17 Jahre Erfahrung darin, Zahlen für Menschen verständlich zu machen, die keine
              Fachleute sind, stecken in jedem Rechenmodell, das wir bauen — vom Investoren-Pitch
              bis zum Mietpreisrechner, der Ihre Eigentümer-Anfragen registriert.
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
              titel="Was Sie vor der *ersten* Anzeige wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Vermietungsstrecke*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Eine erste Spanne liefert unser{" "}
              <Link href="/tools/mietpreisrechner" className="ref-link">
                Mietpreisrechner
              </Link>{" "}
              kostenlos in unter zwei Minuten. Wie dieselben Grundfragen bei einem Verkauf
              beantwortet werden, zeigt{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                Immobilie bewerten
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
