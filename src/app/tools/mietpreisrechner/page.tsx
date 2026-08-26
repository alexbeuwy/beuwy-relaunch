import type { Metadata } from "next";
import Link from "next/link";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { MietpreisRechner } from "@/components/rechner/MietpreisRechner";

/**
 * B3 — /tools/mietpreisrechner (R3-SEITENPLAN.json, T-Cluster). Kompakter
 * Wissens-Kopf statt 70vh-Hero (der Rechner selbst ist der Blickfang),
 * darunter direkt der Live-Rechner ohne Gate. "kostenlos" ist unter
 * /tools/* erlaubt (R3-PLAN.md, Abschnitt "Verträge"). Der Rechner
 * importiert seine Logik ausschließlich aus src/lib/rechner/*.ts — diese
 * Seite fasst die Zahlen nie selbst an.
 */

export const metadata: Metadata = {
  title: "Mietpreis berechnen: Welche Miete ist realistisch? | beuwy",
  description:
    "Mietpreis kostenlos berechnen: Kaltmiete-Spanne und Preis je Quadratmeter live aus Objekttyp, Lage, Zustand, Ausstattung und Baujahr, mit offenem Rechenweg und Mietpreisbremse-Hinweis.",
  openGraph: {
    title: "Mietpreis berechnen: Welche Miete ist realistisch? | beuwy",
    description:
      "Kaltmiete-Spanne und Preis je Quadratmeter live berechnet, kostenlos und ohne Anmeldung. Rechenweg offen, Mietpreisbremse-Hinweis, wenn relevant.",
    type: "website",
    locale: "de_DE",
  },
};

const FAQS = [
  {
    q: "Wie genau ist der Mietpreisrechner?",
    a: "Der Rechner liefert eine Orientierung auf Basis von Objekttyp, Stadtgröße, Zustand, Ausstattung und Baujahr, keinen Mietspiegelwert. Für Neuvermietungen oder Mieterhöhungen zählt rechtlich der örtliche Mietspiegel, nicht dieser Rechner.",
  },
  {
    q: "Was zählt zur Kaltmiete, die hier berechnet wird?",
    a: "Die reine Nettokaltmiete, ohne Betriebs- und Heizkosten. Nebenkosten kommen je nach Objekt und Abrechnung noch dazu und sind hier bewusst nicht eingerechnet.",
  },
  {
    q: "Wann greift die Mietpreisbremse?",
    a: "Die Mietpreisbremse gilt nur in von den Bundesländern ausgewiesenen Gebieten mit angespanntem Wohnungsmarkt, meist in größeren Städten. Der Rechner zeigt einen Hinweis nach Stadtgröße, ersetzt aber keinen Blick in die tatsächliche Gebietskulisse Ihrer Stadt.",
  },
  {
    q: "Ich bin Makler oder Vermieter mehrerer Objekte — kann ich so einen Rechner auch für meine eigene Website bekommen?",
    a: "Ja. beuwy baut Vermietern und Maklern genau solche Rechner in die eigene Website, mit dem Ergebnis direkt im eigenen Postfach statt bei uns. Schreiben Sie uns über die Zusammenarbeitsanfrage, wir zeigen Ihnen, wie das für Ihr Haus aussieht.",
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

export default function MietpreisrechnerPage() {
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

      {/* ── Kompakter Kopf ───────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 pb-10 pt-32 md:pt-40 lg:px-10">
          <p className="t-label !text-ink-yellow">Mietpreisrechner</p>
          <h1 className="t-display mt-5 max-w-[24ch]">
            {rich("Welche Miete ist für Ihr Objekt *realistisch*?")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">
            Kaltmiete-Spanne und Preis je Quadratmeter, live berechnet aus Objekttyp,
            Stadtgröße, Zustand, Ausstattung und Baujahr — kostenlos und ohne Anmeldung.{" "}
            <Highlight>Der Rechenweg liegt offen, damit Sie nachvollziehen, wie die Zahl
            entsteht</Highlight>.
          </p>
        </div>
      </section>

      {/* ── Rechner — sofort sichtbar, kein Gate ────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1040px] px-6 pb-20 md:pb-28 lg:px-10">
          <MietpreisRechner />
        </div>
      </section>

      {/* ── Vergleichsmiete verstehen ────────────────────────────────── */}
      <section id="vergleichsmiete" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Vergleichsmiete verstehen"
              titel="Drei Dinge entscheiden über *jede* Vergleichsmiete."
              sub="Dieser Rechner liefert eine Orientierung. Die rechtssichere ortsübliche Vergleichsmiete im Sinne des BGB liefert nur der örtliche Mietspiegel."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-3">
            <Reveal>
              <p className="t-h3">Der Mietspiegel</p>
              <p className="t-body mt-3">
                Städte über 50.000 Einwohner veröffentlichen meist einen eigenen Mietspiegel
                mit Preisspannen je Lage, Baujahr und Ausstattung. Er ist die rechtlich
                relevante Grundlage — unser Rechner ersetzt ihn nicht, er bereitet auf ihn vor.
              </p>
            </Reveal>
            <Reveal delay={60}>
              <p className="t-h3">Zu- und Abschläge</p>
              <p className="t-body mt-3">
                Balkon, Einbauküche, energetischer Zustand oder ein fehlendes Bad wirken sich
                auf die erzielbare Miete aus. Zustand und Ausstattung im Rechner bilden diese
                Effekte modellhaft ab.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-h3">Die Mietpreisbremse</p>
              <p className="t-body mt-3">
                In vielen angespannten Wohnungsmärkten begrenzt die Mietpreisbremse
                (§ 556d BGB) die zulässige Neuvermietungsmiete. Der Rechner zeigt einen
                Hinweis, wenn das für Ihre Stadtgröße typischerweise relevant ist.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="t-body mt-10 max-w-[70ch]">
              Wie Sie Schritt für Schritt zur belastbaren Vergleichsmiete kommen, zeigt der
              Leitfaden{" "}
              <Link href="/wissen/mietpreis-ermitteln" className="ref-link">
                Mietpreis ermitteln
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

      {/* ── Vermieter/Makler-Pitch → /anfrage ────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte
              label="Für Vermieter und Makler"
              titel="Dieser Rechner kann auch Ihrer sein."
              glyph
            >
              Als Unternehmensberatung baut beuwy Vermietern mit mehreren Einheiten und
              Maklern, die Eigentümer vor dem ersten Anruf abholen wollen, genau solche
              Rechner in die eigene Website — mit dem Ergebnis direkt im eigenen Postfach.
            </GelbeKarte>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 text-center">
              <ZusammenarbeitCta />
              <p className="t-small mt-4">Antwort innerhalb von 24 Stunden.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
