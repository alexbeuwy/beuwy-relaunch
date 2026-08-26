import type { Metadata } from "next";
import Link from "next/link";

import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AfaRechner } from "@/components/rechner/AfaRechner";

/**
 * LEAF B4 — /tools/afa-rechner, das Flaggschiff unter den drei
 * Rechner-Tools (R3-PLAN.md). Anspruch: besser als nutzungsdauer.com und
 * immoabschreibung.de — beide zeigen das Ergebnis erst nach der
 * Lead-Wall, dieser Rechner sofort (siehe AfaRechner.tsx). Kompakter Kopf
 * statt 70vh-Hero, der Rechner ist der Blickfang direkt darunter.
 * "kostenlos" ist unter /tools/* ausdrücklich erlaubt (Vertrag).
 */

export const revalidate = 3600;

const TITLE = "AfA-Rechner: Restnutzungsdauer und Abschreibung berechnen | beuwy";
const DESCRIPTION =
  "Kostenlos und sofort: Kaufpreis, Baujahr und Modernisierung eingeben und sehen, ob ein Restnutzungsdauer-Gutachten Ihre AfA erhöht — mit offenem Rechenweg, ohne E-Mail-Pflicht.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/afa-rechner" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "de_DE",
  },
};

const MECHANIK = [
  {
    titel: "Der reguläre Satz unterstellt eine feste Nutzungsdauer",
    text: "Das Finanzamt rechnet bei vermieteten Bestandsimmobilien standardmäßig mit 2 % pro Jahr, bei Neubauten ab 2023 mit 3 % — unabhängig davon, wie alt das Gebäude wirklich ist oder wie gut es in Schuss ist. Das ist eine Pauschale, keine Einzelfallprüfung.",
  },
  {
    titel: "Ein Gutachten ersetzt die Pauschale durch eine echte Zahl",
    text: "Ein Restnutzungsdauer-Gutachten ermittelt, wie viele Jahre das konkrete Gebäude nach Alter, Bauweise und Modernisierungsstand realistisch noch nutzbar ist. Ist diese Zahl kürzer als die gesetzlich unterstellte Nutzungsdauer, steigt die jährliche AfA — Sie schreiben denselben Gebäudewert schneller ab.",
  },
  {
    titel: "Der Bundesfinanzhof hat den Weg dafür 2021 bestätigt",
    text: "Seitdem gilt: Eigentümer dürfen die kürzere Nutzungsdauer mit jeder geeigneten, nachvollziehbaren Methode belegen — nicht nur mit dem starren Rechenweg aus der ImmoWertV. Das Gutachten muss aber methodisch sauber sein, nicht nur eine Behauptung.",
  },
] as const;

const WER_PROFITIERT = [
  "Vermietete Bestandsimmobilien, die deutlich älter sind als 20–30 Jahre — je größer der Abstand zwischen Alter und gesetzlich unterstellter Nutzungsdauer, desto größer der mögliche Effekt.",
  "Käufe mit hohem Grenzsteuersatz — der steuerliche Effekt einer höheren AfA skaliert direkt mit dem persönlichen Steuersatz.",
  "Gebäude ohne umfassende Kernsanierung — ein frisch durchmodernisiertes Haus hat oft schon eine lange Restnutzungsdauer, hier bringt ein Gutachten seltener einen Sprung.",
] as const;

const GUTACHTER_KRITERIEN = [
  "Öffentlich bestellt und vereidigt oder von einer anerkannten Institution zertifiziert (z. B. DEKRA, TÜV, DIA) — keine reine Selbstauskunft ohne Qualifikationsnachweis.",
  "Vor-Ort-Begehung des Gebäudes, nicht nur eine Einschätzung aus Fotos oder Katasterdaten.",
  "Vollständiges Gutachten nach ImmoWertV-Methodik mit nachvollziehbarer Herleitung — kein Kurzgutachten, das nur eine Zahl ohne Begründung liefert.",
] as const;

const FAQS = [
  {
    q: "Wie genau ist dieser Rechner?",
    a: "Er zeigt eine Orientierung auf Basis von Baujahr, Modernisierungsgrad und einer vereinfachten Nutzungsdauer-Logik, kein Gutachtenergebnis. Ob sich ein Gutachten für Ihr konkretes Objekt lohnt, prüft am Ende ein Sachverständiger vor Ort.",
  },
  {
    q: "Erkennt das Finanzamt das an?",
    a: "Grundsätzlich ja, mit Einschränkungen: Seit dem BFH-Urteil von 2021 dürfen Sie eine kürzere Nutzungsdauer mit jeder geeigneten Methode nachweisen. Das Finanzamt prüft das Gutachten im Einzelfall — akzeptiert werden in der Praxis vor allem methodisch saubere Gutachten von qualifizierten, unabhängigen Sachverständigen, nicht jede pauschale Kurzeinschätzung. Eine Garantie gibt es nie, das ist Aufgabe Ihres Steuerberaters.",
  },
  {
    q: "Was kostet ein Restnutzungsdauer-Gutachten?",
    a: "Das hängt von Objektgröße und Gutachter ab. Ob sich die Kosten lohnen, zeigt der Vergleich mit der Mehr-Abschreibung über mehrere Jahre, die dieser Rechner als Orientierung ausgibt — bei kleinen Kaufpreisen oder bereits kurzer verbleibender Nutzungsdauer kann sich ein Gutachten schlicht nicht rechnen.",
  },
  {
    q: "Gilt das auch für selbst genutzte Immobilien?",
    a: "Nein. Die AfA nach § 7 EStG und damit auch dieser Rechner betreffen ausschließlich vermietete Immobilien im Privatvermögen. Bei einer selbst genutzten Wohnung gibt es keine Abschreibung auf den Kaufpreis.",
  },
  {
    q: "Was macht beuwy mit meiner Berechnung?",
    a: "Ohne Ihre E-Mail-Adresse: nichts. Die Berechnung läuft im Browser, es wird nichts gespeichert und niemand kontaktiert Sie. Erst wenn Sie freiwillig die detaillierte Auswertung per E-Mail anfordern, landet Ihre Anfrage bei uns.",
  },
] as const;

export default function AfaRechnerPage() {
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
          <p className="t-label !text-ink-yellow">Kostenloser AfA-Rechner für Eigentümer</p>
          <h1 className="mt-4 max-w-[780px] font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink-cream [text-wrap:balance]">
            {rich("AfA-Rechner: Wie viel *mehr* Abschreibung steckt in Ihrer Immobilie?")}
          </h1>
          <p className="t-body-lg mt-4 max-w-[640px]">
            Kaufpreis, Baujahr und Modernisierung eingeben — die Spanne zwischen regulärer AfA und AfA mit
            Restnutzungsdauer-Gutachten steht sofort da.{" "}
            <Highlight>Kein E-Mail-Zwang, um das Ergebnis zu sehen</Highlight>, anders als bei den meisten
            AfA-Rechnern im Netz.
          </p>
        </div>
      </section>

      {/* ── Rechner ──────────────────────────────────────────────────── */}
      <section id="rechner" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 pb-20 lg:px-10 lg:pb-28">
          <AfaRechner />
        </div>
      </section>

      {/* ── Mechanik — wie ein Gutachten die AfA erhöht ─────────────────── */}
      <section id="mechanik" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Mechanik"
              titel="Wie ein Restnutzungsdauer-Gutachten die *AfA* erhöht."
              sub="Drei Schritte erklären den Effekt, den der Rechner oben in Zahlen zeigt."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-3">
            {MECHANIK.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 60}>
                <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="t-h3 mt-4">{punkt.titel}</p>
                <p className="t-body mt-3">{punkt.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-16 grid gap-10 md:grid-cols-2">
              <div>
                <p className="t-h3">Für wen sich ein Gutachten meistens lohnt</p>
                <ul className="mt-4 space-y-3">
                  {WER_PROFITIERT.map((punkt) => (
                    <li key={punkt} className="t-body flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-akzent" />
                      <span>{punkt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="t-h3">Woran Sie einen seriösen Gutachter erkennen</p>
                <ul className="mt-4 space-y-3">
                  {GUTACHTER_KRITERIEN.map((punkt) => (
                    <li key={punkt} className="t-body flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-akzent" />
                      <span>{punkt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="t-body mt-12 max-w-[720px]">
              Mehr zum Ablauf eines Gutachtens und was es kostet:{" "}
              <Link href="/wissen/restnutzungsdauer-gutachten" className="ref-link">
                Restnutzungsdauer-Gutachten
              </Link>
              . Wie die AfA für Immobilien grundsätzlich funktioniert, auch jenseits dieses Rechners:{" "}
              <Link href="/wissen/afa-immobilien" className="ref-link">
                AfA Immobilien
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
            <SektionsKopf eyebrow="Häufige Fragen" titel="Was Sie vor dem *Gutachten* wissen wollen." ausrichtung="mitte" />
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
