import type { Metadata } from "next";
import { SektionsKopf } from "@/components/MaklerElemente";
import { ClusterHero, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { Reveal } from "@/components/Reveal";

/**
 * F2 — /maklerwebsite-kosten (Cluster-Vergleichsseite, Leaf-Auftrag F).
 * Echte Marktspannen, sonst rankt und hilft die Seite nicht (Leaf-Vorgabe).
 * Kein beuwy-Preis — BRIEF §5: nur Marktspannen, kein eigener Preis.
 */

export const metadata: Metadata = {
  title: "Was kostet eine Maklerwebsite? Preise 2026 im Überblick | beuwy",
  description:
    "Baukasten, Template-Agentur, individuelle Agentur oder Premium-System mit CRM-Anbindung: die realistischen Preisspannen für Maklerwebsites 2026, und warum die günstigste Website oft die teuerste ist.",
};

const STUFEN: {
  nr: string;
  name: string;
  preis: string;
  bekommt: string;
  grenze: string;
  versteckt: string;
}[] = [
  {
    nr: "01",
    name: "Baukasten-Website",
    preis: "0–50 €/Monat",
    bekommt:
      "Fertige Vorlage, Standard-Baustein-Editor, Hosting inklusive, in Stunden online.",
    grenze:
      "Austauschbares Design mit wenig Spielraum für eine eigene Marke, kaum Anbindung an CRM oder Automatisierung.",
    versteckt:
      "Eigene Zeit für Pflege und Texte, laufende Lizenzgebühr statt Einmalpreis, ein Anbieterwechsel bedeutet meist Neustart.",
  },
  {
    nr: "02",
    name: "Template-Agentur",
    preis: "2.000–8.000 €",
    bekommt:
      "Professionelles Design auf Basis eines Templates, eigene Inhalte, meist auf einem gängigen Baukastensystem.",
    grenze:
      "Das Design bleibt im Rahmen der Vorlage. Individuelle Funktionen wie Rechner oder CRM-Anbindung sind Zusatzaufwand.",
    versteckt:
      "Wartung, Plugin-Updates und Hosting laufen häufig separat weiter, Änderungen nach Launch werden meist nach Aufwand berechnet.",
  },
  {
    nr: "03",
    name: "Individuelle Agentur",
    preis: "8.000–25.000 €",
    bekommt:
      "Eigenes Design ohne Templatezwang, individuelle Struktur, oft mit eigener Konzeptphase.",
    grenze:
      "Automatisierung, CRM-Anbindung und laufende Weiterentwicklung sind meist nicht Teil des Pakets.",
    versteckt:
      "Pflege und technische Wartung nach Launch, zusätzliche Kosten für jede spätere Erweiterung.",
  },
  {
    nr: "04",
    name: "Premium-System mit CRM-Anbindung & Automatisierung",
    preis: "15.000–50.000+ €",
    bekommt:
      "Ein eigenes System mit direkter CRM-Anbindung, automatisierten Abläufen: Rechner, Follow-up, Lead-Scoring.",
    grenze:
      "Lohnt sich nur, wenn genug Anfragevolumen da ist, das System auch zu füttern.",
    versteckt:
      "Lizenzkosten der angebundenen Software sowie Aufwand für Betreuung und Weiterentwicklung nach dem Livegang.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Warum steht hier kein beuwy-Preis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Weil ein seriöser Preis erst nach der Diagnose feststeht: welches CRM angebunden werden soll, wie viele Objekttypen, welche Automatisierung. Die Marktspannen oben zeigen die Bandbreite; Ihren Festpreis nennen wir nach dem ersten Gespräch, schriftlich.",
      },
    },
    {
      "@type": "Question",
      name: "Lohnt sich ein Premium-System auch für kleinere Büros?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nur, wenn genug Anfragevolumen da ist, das System auch zu füttern. Für ein Ein-Personen-Büro mit wenigen Objekten im Jahr ist häufig eine individuelle Agentur-Lösung die vernünftigere Stufe. Das sagen wir auch so, wenn es zutrifft.",
      },
    },
  ],
};

export default function MaklerwebsiteKostenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <ClusterHero
        eyebrow="Preise 2026"
        titel="Was kostet eine *Maklerwebsite* wirklich?"
        sub="Vier Preisstufen, vier verschiedene Ergebnisse. Der Überblick über die realistischen Marktspannen 2026, inklusive der Kosten, die auf keiner Rechnung stehen."
        primaryHref="/anfrage"
        ctaLabel2="Direkt zu den Preisstufen ↓"
        ctaHref2="#preisstufen"
      />

      {/* ── Vier Preisstufen ────────────────────────────────────────── */}
      <section id="preisstufen" className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf
            eyebrow="Die vier Preisstufen"
            titel="Von der Baukasten-Website bis zum *Premium-System*."
          />
          <RailListe className="mt-8">
            {STUFEN.map((s, i) => (
              <Reveal key={s.nr} delay={i * 60}>
                <Rail>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-14">
                    <div>
                      <p className="t-data">{s.nr}</p>
                      <p className="t-h3 mt-2 max-w-[16ch]">{s.name}</p>
                      <p className="t-stat tnum mt-3 !text-[clamp(26px,2.6vw,36px)]">{s.preis}</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-3 sm:gap-8">
                      <div>
                        <p className="t-label !text-[10.5px]">Was man bekommt</p>
                        <p className="t-body mt-2">{s.bekommt}</p>
                      </div>
                      <div>
                        <p className="t-label !text-[10.5px]">Wo die Grenze liegt</p>
                        <p className="t-body mt-2">{s.grenze}</p>
                      </div>
                      <div>
                        <p className="t-label !text-[10.5px]">Versteckte Kosten</p>
                        <p className="t-body mt-2">{s.versteckt}</p>
                      </div>
                    </div>
                  </div>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      {/* ── Reframe: die teuerste Website bringt keine Anfragen ─────── */}
      <section className="border-t border-line-subtle bg-bg-elevated py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Denkfehler bei der Preisfrage"
              titel="Die teuerste Website ist die, die keine *Eigentümer-Anfragen* bringt."
            />
            <p className="t-body mt-6 max-w-[62ch]">
              Jede Preisstufe hat ihren Platz. Die Frage, die den Unterschied macht, lautet nicht
              &bdquo;was kostet die Website&ldquo;, sondern &bdquo;was bringt sie zurück&ldquo;.
              Ein Rechenbeispiel dazu:
            </p>
            <div className="mt-10 grid gap-8 border-t border-line-subtle pt-10 sm:grid-cols-3">
              <div>
                <p className="t-stat tnum">10.000–15.000 €</p>
                <p className="t-body mt-2 max-w-[26ch]">Courtage, die ein Alleinauftrag im Schnitt bringt.</p>
              </div>
              <div>
                <p className="t-stat tnum">3</p>
                <p className="t-body mt-2 max-w-[26ch]">
                  zusätzliche Alleinaufträge im Jahr, die ohne die Website nicht zustande gekommen
                  wären.
                </p>
              </div>
              <div>
                <p className="t-stat">Rechnet sich</p>
                <p className="t-body mt-2 max-w-[26ch]">
                  auf jeder der vier Preisstufen, die Baukasten-Website eingeschlossen.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-bg-base py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <SektionsKopf eyebrow="Häufige Fragen" titel="Was Sie vorher *wissen* wollen." />
          <RailListe className="mt-8 max-w-[62ch]">
            <Reveal>
              <Rail>
                <p className="t-h3">Warum steht hier kein beuwy-Preis?</p>
                <p className="t-body mt-3">
                  Weil ein seriöser Preis erst nach der Diagnose feststeht: welches CRM
                  angebunden werden soll, wie viele Objekttypen, welche Automatisierung. Die
                  Marktspannen oben zeigen die Bandbreite; Ihren Festpreis nennen wir nach dem
                  ersten Gespräch, schriftlich.
                </p>
              </Rail>
            </Reveal>
            <Reveal delay={60}>
              <Rail>
                <p className="t-h3">Lohnt sich ein Premium-System auch für kleinere Büros?</p>
                <p className="t-body mt-3">
                  Nur, wenn genug Anfragevolumen da ist, das System auch zu füttern. Für ein
                  Ein-Personen-Büro mit wenigen Objekten im Jahr ist häufig eine individuelle
                  Agentur-Lösung die vernünftigere Stufe. Das sagen wir auch so, wenn es
                  zutrifft.
                </p>
              </Rail>
            </Reveal>
          </RailListe>
        </div>
      </section>

      <ClusterAbschluss
        karteLabel="Bevor Sie sich entscheiden"
        karteTitel="Wir sagen Ihnen ehrlich, welche Stufe zu Ihrem Haus passt."
        karteText="Nicht jedes Haus braucht ein Premium-System. Im ersten Gespräch schauen wir auf Ihr Anfragevolumen und Ihren Markt und sagen Ihnen, ob sich der Sprung überhaupt rechnet. 17 Jahre Markterfahrung zeigen, wann sich eine Stufe lohnt und wann nicht."
        schlussTitel="Sprechen wir über Ihre Zahlen, nicht über eine Preisliste."
        schlussText="Wie viele Alleinaufträge bräuchte Ihre Website pro Jahr, damit sich eine neue Stufe rechnet? Das beantworten wir gemeinsam, in einem kurzen Gespräch."
        primaryHref="/anfrage"
        weitereLinks={[
          { label: "BOTTIMMO-Alternative", href: "/bottimmo-alternative" },
          { label: "Maklersoftware im Vergleich", href: "/maklersoftware-vergleich" },
          { label: "Website für Makler", href: "/website-fuer-immobilienmakler" },
        ]}
      />
    </>
  );
}
