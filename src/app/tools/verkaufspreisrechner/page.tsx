import type { Metadata } from "next";
import Link from "next/link";

import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { VerkaufspreisRechner } from "@/components/rechner/VerkaufspreisRechner";

/**
 * LEAF B2 — /tools/verkaufspreisrechner. Das Tool selbst ist der Held der
 * Seite: kompakter Hero (kein 70vh), sofort danach der Rechner, Ergebnis
 * ohne Lead-Gate — der bewusste Unterschied zu BOTTIMMO & Co. (siehe
 * VerkaufspreisRechner.tsx). "kostenlos" ist hier laut Vertrag
 * (R3-PLAN.md) ausdrücklich erlaubt, weil /tools/* das Eigentümer-Suchwort
 * bedient.
 */

export const revalidate = 3600;

const TITLE = "Verkaufspreis berechnen: Was ist Ihre Immobilie wert? | beuwy";
const DESCRIPTION =
  "Kostenlos und sofort: Wohnfläche, Baujahr, Lage eingeben und die Verkaufswert-Spanne Ihrer Immobilie sehen — ohne E-Mail-Pflicht, mit nachvollziehbarem Rechenweg.";

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
    text: "Bau- und Bodenwert werden getrennt ermittelt und addiert. Wichtig bei Häusern mit Grundstück, wo Grund und Gebäude unterschiedlich altern — dieser Rechner nutzt diese Logik zusätzlich bei EFH/MFH.",
  },
  {
    titel: "Ertragswertverfahren",
    text: "Der Wert ergibt sich aus der erzielbaren Miete. Standard bei vermieteten Wohnungen und reinen Anlageimmobilien — dieser Rechner bildet es nicht ab, das übernimmt der Mietpreisrechner als Grundlage.",
  },
] as const;

const FAQS = [
  {
    q: "Wie genau ist das?",
    a: "So genau, wie ein Modell ohne Objektbesichtigung sein kann: eine Orientierungswert-Spanne von ±10 % um den Mittelwert, kein Gutachten. Zustand, Lage und Ausstattung sehen wir nicht — die schätzen Sie über die Regler ein. Für einen belastbaren Wert braucht es am Ende einen Besichtigungstermin.",
  },
  {
    q: "Was beeinflusst den Preis?",
    a: "Objekttyp, Wohnfläche, Baujahr, Zustand, Stadtgröße und Mikrolage — bei Häusern und Mehrfamilienhäusern zusätzlich die Grundstücksfläche. Jede Änderung an einem Regler wirkt sich sofort auf die Spanne aus, im Rechenweg sehen Sie genau, mit welchem Faktor.",
  },
  {
    q: "Verkaufen mit oder ohne Makler?",
    a: "Ohne Makler sparen Sie die Provision, tragen aber Besichtigungen, Verhandlung und Vertragsabwicklung selbst. Ein guter Makler bringt Marktzugang, Verhandlungserfahrung und nimmt Ihnen den Aufwand ab — dafür kostet er. Was sich lohnt, hängt vom Objekt und von Ihrer Zeit ab, nicht von einer pauschalen Antwort.",
  },
  {
    q: "Was macht beuwy mit meiner Berechnung?",
    a: "Ohne Ihre E-Mail-Adresse: nichts. Die Berechnung läuft im Browser, es wird nichts gespeichert und niemand kontaktiert Sie. Erst wenn Sie freiwillig die detaillierte Auswertung per E-Mail anfordern, landet Ihre Anfrage bei uns.",
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

      {/* ── Hero kompakt — Tool ist der Held, above the fold ────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-8 pt-28 lg:px-10 lg:pb-10 lg:pt-32">
          <p className="t-label !text-ink-yellow">Kostenloser Rechner für Eigentümer</p>
          <h1 className="mt-4 max-w-[760px] font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink-cream [text-wrap:balance]">
            {rich("Verkaufspreis berechnen: Was ist Ihre Immobilie *wert*?")}
          </h1>
          <p className="t-body-lg mt-4 max-w-[620px]">
            Sechs Angaben, eine Spanne — sofort sichtbar, ohne dass Sie vorher Ihre E-Mail-Adresse
            eintippen müssen.
          </p>
        </div>
      </section>

      {/* ── Rechner ──────────────────────────────────────────────────── */}
      <section id="rechner" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-10 lg:pb-28">
          <VerkaufspreisRechner />
        </div>
      </section>

      {/* ── Methode — 3 Verfahren kurz ───────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Methode"
              titel="Woher die *Zahl* kommt."
              sub="Immobilienbewertung kennt drei anerkannte Verfahren. Dieser Rechner kombiniert die ersten beiden — transparent, nicht als Black Box."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {VERFAHREN.map((verfahren, i) => (
              <Reveal key={verfahren.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
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
              Genau dieses Tool bauen wir in Ihren Farben auf Ihre Domain — Ihr Branding, Ihre
              Leads, angebunden an Ihr CRM.{" "}
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
