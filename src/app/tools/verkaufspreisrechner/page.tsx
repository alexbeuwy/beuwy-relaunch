import type { Metadata } from "next";
import Link from "next/link";

import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ConsentProvider } from "@/components/bewertung/consent";
import { Calculator } from "@/components/bewertung/calculator";

/**
 * LEAF P2 — /tools/verkaufspreisrechner, jetzt mit dem portierten
 * Verkaufspreis-Wizard (Objektart → Standort → Eckdaten → Analyse →
 * Ergebnis, s. components/bewertung/calculator.tsx). Der Wizard ist above
 * the fold der Held der Seite; das Ergebnis steht sofort da, der optionale
 * PDF-Report kommt danach, ohne Lead-Gate davor. "kostenlos" ist unter
 * /tools/* ausdrücklich erlaubt.
 *
 * ConsentProvider umschließt nur diese Seite (nicht global im Layout) —
 * der Satelliten-Kartenblick im Wizard ist die einzige Stelle der Seite,
 * die externe Kartenkacheln lädt.
 */

export const revalidate = 3600;

const TITLE = "Verkaufspreis berechnen: Was ist Ihre Immobilie wert? | beuwy";
const DESCRIPTION =
  "Kostenlos und sofort: Adresse, Objektart und Eckdaten eingeben und die Verkaufswert-Spanne Ihrer Immobilie sehen — mit amtlichen Bodenrichtwerten, Satellitenblick und PDF-Report, ohne E-Mail-Pflicht vorab.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/verkaufspreisrechner" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "de_DE",
  },
};

const VERFAHREN = [
  {
    titel: "Vergleichswertverfahren",
    text: "Der Preis leitet sich aus tatsächlich verkauften, ähnlichen Objekten in der Umgebung ab. Das gängigste Verfahren bei Eigentumswohnungen und Einfamilienhäusern — und die Basis dieses Rechners.",
  },
  {
    titel: "Sachwertverfahren",
    text: "Bau- und Bodenwert werden getrennt ermittelt und addiert. Der Rechner gleicht dafür live mit den amtlichen Bodenrichtwerten (BORIS) ab — wichtig bei Häusern, Grundstücken und Gewerbeobjekten, wo Grund und Gebäude unterschiedlich altern.",
  },
  {
    titel: "Ertragswertverfahren",
    text: "Der Wert ergibt sich aus der erzielbaren Miete. Standard bei vermieteten Objekten — bei Mehrfamilienhäusern bildet dieser Rechner es direkt über Ihre Jahresnettokaltmiete und einen regionalen Vervielfältiger ab.",
  },
] as const;

const FAQS = [
  {
    q: "Wie genau ist das?",
    a: "So genau, wie ein Modell ohne Objektbesichtigung sein kann: eine Orientierungswert-Spanne um den Mittelwert, kein Gutachten. Die Adresse gleichen wir per Satellitenblick und amtlichen Bodenrichtwerten ab, Zustand, Ausstattung und Energieklasse geben Sie an. Für einen belastbaren Wert braucht es am Ende eine Besichtigung.",
  },
  {
    q: "Was beeinflusst den Preis?",
    a: "Objektart, Lage, Wohn- und Grundstücksfläche, Baujahr, Zustand, Ausstattung und Energieeffizienzklasse — bei Mehrfamilienhäusern zusätzlich die Jahresnettokaltmiete. Im Ergebnis sehen Sie die einzelnen Werttreiber mit ihrem prozentualen Effekt, keine Black Box.",
  },
  {
    q: "Woher kommen die amtlichen Bodenrichtwerte?",
    a: "Aus BORIS, dem Bodenrichtwertinformationssystem der Vermessungs- und Katasterverwaltung. Der Rechner fragt automatisch den Wert für Ihre Koordinaten ab, sobald die Adresse bestätigt ist, und kennzeichnet ihn im Ergebnis deutlich als amtliche Quelle.",
  },
  {
    q: "Verkaufen mit oder ohne Makler?",
    a: "Ohne Makler sparen Sie die Provision, tragen aber Besichtigungen, Verhandlung und Vertragsabwicklung selbst. Ein guter Makler bringt Marktzugang, Verhandlungserfahrung und nimmt Ihnen den Aufwand ab — dafür kostet er. Was sich lohnt, hängt vom Objekt und von Ihrer Zeit ab, nicht von einer pauschalen Antwort.",
  },
  {
    q: "Was macht beuwy mit meiner Berechnung?",
    a: "Ohne Ihre E-Mail-Adresse: nichts. Die Berechnung läuft im Browser, es wird nichts gespeichert und niemand kontaktiert Sie. Der PDF-Report entsteht ebenfalls lokal bei Ihnen und lässt sich direkt herunterladen — erst wenn Sie ihn zusätzlich per E-Mail anfordern, landet Ihre Anfrage bei uns.",
  },
] as const;

export default function VerkaufspreisrechnerPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Hero kompakt — der Wizard ist der Held, above the fold ────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-8 pt-28 lg:px-10 lg:pb-10 lg:pt-32">
          <p className="t-label !text-ink-yellow">Kostenloser Rechner für Eigentümer</p>
          <h1 className="mt-4 max-w-[760px] font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink-cream [text-wrap:balance]">
            {rich("Verkaufspreis berechnen: Was ist Ihre Immobilie *wert*?")}
          </h1>
          <p className="t-body-lg mt-4 max-w-[620px]">
            Adresse, Objektart und ein paar Eckdaten — Satellitenblick, amtliche Bodenrichtwerte und Ihre
            Verkaufswert-Spanne, sofort sichtbar, ohne dass Sie vorher Ihre E-Mail-Adresse eintippen müssen.
          </p>
        </div>
      </section>

      {/* ── Rechner ──────────────────────────────────────────────────── */}
      <section id="rechner" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-10 lg:pb-28">
          <ConsentProvider>
            <Calculator />
          </ConsentProvider>
        </div>
      </section>

      {/* ── Methode — 3 Verfahren kurz ───────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Methode"
              titel="Woher die *Zahl* kommt."
              sub="Immobilienbewertung kennt drei anerkannte Verfahren. Dieser Rechner kombiniert alle drei, je nach Objektart — transparent, nicht als Black Box."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {VERFAHREN.map((verfahren, i) => (
              <Reveal key={verfahren.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">{String(i + 1).padStart(2, "0")}</p>
                  <p className="t-h3 mt-4">{verfahren.titel}</p>
                  <p className="t-body mt-3">{verfahren.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <p className="t-body mt-10 max-w-[640px]">
              Mehr zu allen drei Verfahren und wann welches greift:{" "}
              <Link href="/wissen/immobilie-bewerten" className="ref-link">
                Immobilie bewerten
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf eyebrow="Häufige Fragen" titel="Was Sie vor der *Berechnung* wissen wollen." ausrichtung="mitte" />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Makler-Sektion — dezent, kein Hard-Sell ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Für Makler" titel="Sie sind Makler?" glyph>
              Genau dieses Tool bauen wir in Ihren Farben auf Ihre Domain — Ihr Branding, Ihre Leads, angebunden
              an Ihr CRM.{" "}
              <Link href="/anfrage" className="font-semibold text-ink-cream underline decoration-ink-cream/30 underline-offset-4">
                Zusammenarbeit anfragen →
              </Link>
            </GelbeKarte>
          </Reveal>
        </div>
      </section>
    </>
  );
}
