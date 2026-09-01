import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * W-Cluster — /objektakquise-strategien (R3-SEITENPLAN.json). Antwort auf
 * "Welche Objektakquise-Strategien funktionieren 2026?" direkt im Kopf.
 * Hauptbaustein: eine ehrliche Vergleichstabelle von Kaltakquise bis zum
 * eigenen Portal (Aufwand/erste Wirkung/Eignung), gerahmt von PainRows
 * gegen generische Ranglisten-Artikel und einer GelbeKarte gegen die
 * Illusion der einen Wunderstrategie. Beweis: RIEGEL (Kap. 342.000 €/9
 * Abschlüsse in 6 Wochen). Kompakter Wissens-Kopf statt 70vh-Hero, Foto 7.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Objektakquise: 7 Strategien, die 2026 wirklich Mandate bringen | beuwy",
  description:
    "Objektakquise 2026: 7 Strategien ehrlich verglichen, von Kaltakquise bis zum eigenen Portal, mit Aufwand und Eignung je Kanal statt einer Wunderliste.",
  openGraph: {
    title: "Objektakquise: 7 Strategien, die 2026 wirklich Mandate bringen | beuwy",
    description:
      "Ehrliches Ranking der Objektakquise-Strategien 2026: Aufwand, erste Wirkung und Eignung je Kanal, von Kaltakquise bis zum eigenen Portal als SEO-Fundament.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Zehn Objektakquise-Tipps in einer Liste, aber keine Zeile dazu, welcher Tipp wie viel Zeit frisst.",
    answer:
      "Eine Rangliste ohne Aufwand-Wirkung-Verhältnis ist keine Entscheidungshilfe. Ein Makler mit zwei Wochenstunden für Akquise braucht andere Kanäle als ein Büro mit eigenem Marketing-Budget.",
  },
  {
    quote: "Der Artikel empfiehlt Kaltakquise und Social Media und SEO und Empfehlungsmarketing, gleichzeitig, ab morgen.",
    answer:
      "Wer alles gleichzeitig anfängt, bringt keinen Kanal auf ein Niveau, das trägt. Jede Strategie braucht eine eigene Anlaufzeit, bevor sie überhaupt Ergebnisse zeigen kann.",
  },
  {
    quote: "Kein Wort dazu, wie lange es bis zur ersten Anfrage dauert.",
    answer:
      "Kaltakquise kann in derselben Woche ein Mandat bringen, ein eigenes Portal frühestens nach Wochen. Ohne diese Zeitachse plant kein Büro sein Budget oder seine Geduld richtig.",
  },
] as const;

type Strategie = {
  name: string;
  aufwand: string;
  wirkung: string;
  eignung: string;
};

const STRATEGIEN: Strategie[] = [
  {
    name: "Kaltakquise (Anruf, Klingeln)",
    aufwand: "Sehr hoch, mehrere Stunden am Tag, dauerhaft",
    wirkung: "Sofort möglich, aber unberechenbar",
    eignung: "Einzelmakler mit viel Zeit, wenig Marketingbudget",
  },
  {
    name: "Postwurf und Flyer",
    aufwand: "Mittel, Layout und Verteilung je Runde",
    wirkung: "Wochen bis Monate, breite Streuung",
    eignung: "Ergänzung zum digitalen Auftritt, keine Alleinstrategie",
  },
  {
    name: "Empfehlungsmarketing",
    aufwand: "Gering laufend, hoch beim Aufbau der Servicequalität",
    wirkung: "Monate bis Jahre, dann konstant",
    eignung: "Jedes etablierte Büro, kaum in der Geschwindigkeit steuerbar",
  },
  {
    name: "Google-Unternehmensprofil und Bewertungen",
    aufwand: "Gering, laufende Pflege statt Projekt",
    wirkung: "Wochen bis erste Sichtbarkeit, Monate bis Wirkung",
    eignung: "Pflichtprogramm für jedes Büro, unabhängig von der Größe",
  },
  {
    name: "Regionales Social-Media-Farming",
    aufwand: "Hoch, fester Content-Rhythmus über Monate",
    wirkung: "Monate bis Reichweite im Stadtteil spürbar wird",
    eignung: "Makler vor der Kamera oder mit Team dafür",
  },
  {
    name: "Performance-Marketing mit Bewertungsrechner",
    aufwand: "Hoch beim Aufbau, gering in der laufenden Steuerung",
    wirkung: "Wochen bis erste Leads, planbar über das Budget",
    eignung: "Büros mit klarem Anfrageziel und Anzeigenbudget",
  },
  {
    name: "Eigenes Portal als SEO-Fundament",
    aufwand: "Hoch beim Aufbau, sehr gering laufend",
    wirkung: "Monate bis erste Rankings, danach dauerhaft wachsend",
    eignung: "Büros mit langfristigem Anspruch, nicht für schnelle Einzelfälle",
  },
];

const FAQS = [
  {
    q: "Ist Kaltakquise 2026 noch sinnvoll?",
    a: "Als eine von mehreren Strategien ja, vor allem für schnelle Einzelmandate. Als einzige Quelle nicht: Der Zeitaufwand pro Termin ist hoch, und jedes Ergebnis endet mit dem Anruf, statt weiterzuwirken wie eine Landingpage oder ein Rechner, die auch nachts arbeiten.",
  },
  {
    q: "Wie viele Akquise-Kanäle sollte ich gleichzeitig bespielen?",
    a: "Zwei bis drei, mit einem klaren Schwerpunkt. Ein schneller Kanal für kurzfristige Mandate, kombiniert mit einem Kanal, der über Monate compoundiert, etwa ein Google-Profil oder ein eigenes Portal. Fünf Kanäle gleichzeitig bedeuten meist fünf halb gepflegte Kanäle.",
  },
  {
    q: "Was kostet der Aufbau eines eigenen Portals im Vergleich zu laufender Kaltakquise?",
    a: "Ein Portal ist eine Investition im Voraus, Kaltakquise eine laufende Zeitkosten-Rechnung ohne Ende. Nach dem Aufbau sinkt der Aufwand beim Portal auf Pflege, während Kaltakquise jede Woche denselben Einsatz verlangt. Einen konkreten Betrag nennen wir erst nach dem ersten Gespräch.",
  },
  {
    q: "Wie schnell zeigen sich erste Ergebnisse?",
    a: "Kaltakquise kann in derselben Woche einen Termin bringen. Performance-Marketing mit Rechner zeigt erste Leads meist innerhalb weniger Wochen. Ein eigenes Portal als SEO-Fundament braucht Monate, bevor es zuverlässig rankt, dafür trägt es danach ohne täglichen Einsatz weiter.",
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

export default function ObjektakquiseStrategienPage() {
  const riegel = caseBySlug("riegel-immobilien");

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

      {/* ── Kompakter Wissens-Kopf ───────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="t-label !text-ink-yellow">Wachstum</p>
          <h1 className="t-display mt-5 max-w-[22ch]">
            {rich("Sieben Objektakquise-Strategien – und welche 2026 wirklich *Mandate* bringen.")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">
            2026 funktionieren Objektakquise-Strategien am besten kombiniert: Kaltakquise und
            Postwurf bringen einzelne Mandate, aber mit hohem Zeitaufwand pro Abschluss.
            Empfehlungsmarketing und ein gepflegtes Google-Profil skalieren langsamer, dafür ohne
            laufende Kosten. Performance-Marketing mit eigenem Bewertungsrechner und ein eigenes
            Portal als SEO-Fundament liefern den planbarsten, am besten skalierenden Zufluss,
            brauchen aber Vorlauf, bevor die ersten Anfragen kommen.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ZusammenarbeitCta />
            <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
          </div>
        </div>
      </section>

      {/* ── Foto-Band ────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src={maklerAsset(7)}
              alt="Makler bespricht am Tisch eine Übersicht mehrerer Akquise-Kanäle"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Problem — Wunderlisten ohne Aufwand/Wirkung ─────────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Warum Ranglisten meistens nicht helfen"
              titel="Eine Liste ohne *Aufwand* ist keine Strategie."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Vergleichstabelle — 7 Strategien, Kaltakquise bis Portal ─── */}
      <section id="strategien" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der ehrliche Vergleich"
              titel="Sieben Kanäle, von *Kaltakquise* bis zum eigenen Portal."
              sub="Kein Ranking nach Sympathie, sondern nach Aufwand, erster Wirkung und Eignung. Die Reihenfolge folgt der Logik: was zuerst trägt, bis das nächste compoundiert."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Rang</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Strategie</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Aufwand</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Erste Wirkung</th>
                  <th className="py-3 t-label !text-[10.5px]">Eignung</th>
                </tr>
              </thead>
              <tbody>
                {STRATEGIEN.map((s, i) => (
                  <tr key={s.name} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 font-mono text-[13px] text-ink-muted tnum">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[13rem] !text-ink-cream font-medium">
                      {s.name}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[15rem]">{s.aufwand}</td>
                    <td className="py-4 pr-4 t-body max-w-[14rem]">{s.wirkung}</td>
                    <td className="py-4 t-body max-w-[16rem]">{s.eignung}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Reveal delay={80}>
            <p className="t-body mt-8 max-w-[70ch]">
              Die letzte Zeile ist bewusst die letzte: Ein eigenes Portal braucht am längsten, bis
              es rankt, dafür arbeitet es danach weiter, ohne dass jede Woche neuer Einsatz
              nötig wird. Genau darauf ist unsere Arbeit als Unternehmensberatung ausgelegt, nicht
              auf eine einzelne Kampagne.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte
              label="Der Unterschied"
              titel="Es gibt keine beste Strategie. Es gibt die richtige Kette."
              glyph
            >
              Kaltakquise füllt die Lücke, bis das eigene Portal rankt. Ein Bewertungsrechner
              fängt die Anfrage ab, die eine Anzeige gerade geweckt hat. Keine dieser Strategien
              ersetzt die andere, sie übergeben sich gegenseitig den nächsten Interessenten.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL ───────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Sechs Wochen nach dem Relaunch: neun Abschlüsse, 342.000 € Volumen, ohne einen
              einzigen gekauften Lead, allein über den eigenen Bewertungsrechner.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *ersten* Kampagne wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Kette*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Objektakquise ist ein Baustein unter mehreren. Vertiefend zu einzelnen Kanälen:{" "}
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                Eigentümer-Leads generieren
              </Link>{" "}
              und{" "}
              <Link href="/alleinauftrag-gewinnen" className="ref-link">
                Alleinauftrag gewinnen
              </Link>
              . Den Überblick über alle Bausteine zeigt der{" "}
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
