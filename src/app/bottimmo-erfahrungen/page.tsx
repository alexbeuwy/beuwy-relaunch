import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster V) — /bottimmo-erfahrungen. Fairer
 * Erfahrungsbericht: Stärken (Tempo, Themenwelt, Wartung inklusive) gegen
 * die Grenze (Vorlagen-Design, gemietete Inhalte, Austauschbarkeit unter
 * Wettbewerbern desselben Systems). Kompakter Wissens-Kopf beantwortet die
 * Suchfrage wörtlich, Nummern-Liste der Stärken, Vergleichstabelle "wann
 * reicht der Baukasten", GelbeKarte, Beweis-Anriss RIEGEL, FAQ +
 * FAQPage-JSON-LD. Foto 18 laut R3-SEITENPLAN.json. Keine Behauptung über
 * BOTTIMMO, die nicht bereits auf /bottimmo-alternative belegt ist.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "BOTTIMMO Erfahrungen 2026: Was der Baukasten kann — und was nicht | beuwy",
  description:
    "BOTTIMMO Erfahrungen 2026: der faire Blick auf Tempo und Themenwelt gegen die Grenze aus Vorlage und gemieteten Inhalten. Wann der Baukasten reicht, wann nicht.",
  openGraph: {
    title: "BOTTIMMO Erfahrungen 2026: Was der Baukasten kann — und was nicht | beuwy",
    description:
      "Der faire Vergleich: BOTTIMMO liefert Tempo und eine fertige Themenwelt, die Grenze ist die geteilte Vorlage. Wann ein eigenes Portal mehr bringt als der Baukasten.",
    type: "website",
    locale: "de_DE",
  },
};

const STAERKEN = [
  {
    titel: "Schnell startklar",
    text: "Website, Anzeigenvorlagen und Funnel stehen in kurzer Zeit, ohne dass ein Büro bei null anfängt. Für den ersten eigenen Online-Auftritt ein echter Vorteil.",
  },
  {
    titel: "Fertige Themenwelt",
    text: "Ratgeberartikel und Inhalte zu Standardfragen liegen bereits vor, statt dass jemand im Büro sie selbst schreiben muss. Das füllt eine Website, die sonst leer bliebe.",
  },
  {
    titel: "Wartung inklusive",
    text: "Updates, technische Pflege und die laufende Funktionsfähigkeit übernimmt der Anbieter. Niemand im Büro muss sich um ein CMS oder ein Sicherheitsupdate kümmern.",
  },
  {
    titel: "Überschaubares Budget",
    text: "Die monatlichen Kosten bewegen sich im dreistelligen Bereich, planbar und ohne größere Vorabinvestition. Ein kalkulierbarer Einstieg für ein kleines Marketingbudget.",
  },
] as const;

type Zeile = { kriterium: string; reicht: string; grenze: string };

const VERGLEICH: Zeile[] = [
  {
    kriterium: "Erster Online-Auftritt",
    reicht: "Ja, schnell und ohne Vorlaufzeit online",
    grenze: "—",
  },
  {
    kriterium: "Design und Bildsprache",
    reicht: "Ausreichend für ein Büro ohne Markenanspruch",
    grenze: "Vorlage, dieselbe wie bei anderen Kunden desselben Systems",
  },
  {
    kriterium: "Inhalte und Ratgeber",
    reicht: "Solide Standardtexte für den Einstieg",
    grenze: "Gemietet, laufen mit der Lizenz aus, keine eigene Stimme",
  },
  {
    kriterium: "Wettbewerb in derselben Stadt",
    reicht: "Unauffällig, solange kein Mitbewerber dasselbe System nutzt",
    grenze: "Zwei Häuser mit demselben Baukasten wirken austauschbar",
  },
  {
    kriterium: "Alleinauftrag gegen den Marktführer",
    reicht: "—",
    grenze: "Ein Vorlagen-Auftritt verliert gegen eine eigene Marke",
  },
  {
    kriterium: "Eigentum am Ergebnis",
    reicht: "—",
    grenze: "Website und Inhalte laufen nur, solange die Lizenz läuft",
  },
];

const FAQS = [
  {
    q: "Ist BOTTIMMO für Makler grundsätzlich zu empfehlen?",
    a: "Für den ersten eigenen Online-Auftritt und ein überschaubares Marketingbudget ja. Das Paket bringt ein Büro schnell und ohne Vorlaufzeit online, ohne dass jemand bei null anfängt.",
  },
  {
    q: "Woran erkenne ich, dass ich aus dem Baukasten herausgewachsen bin?",
    a: "Wenn Eigentümer Sie mit einem Mitbewerber vergleichen, der eine eigene Marke zeigt — und Sie den Alleinauftrag genau dort verlieren. Oder wenn ein Konkurrent in derselben Stadt dasselbe System nutzt und beide Auftritte sich kaum unterscheiden.",
  },
  {
    q: "Muss ich BOTTIMMO kündigen, um zu wechseln?",
    a: "Das entscheiden Sie unabhängig von uns, meist läuft der Wechsel parallel: das neue Portal steht, bevor die alte Lizenz endet, damit kein Tag ohne Website vergeht.",
  },
  {
    q: "Was kostet ein eigenes Portal im Vergleich zum Baukasten?",
    a: "Ein eigenes Portal ist eine höhere Investition im Voraus, dafür gehört Ihnen das Ergebnis dauerhaft, statt an eine laufende Lizenz gebunden zu sein. Einen konkreten Betrag nennen wir erst nach dem ersten Gespräch über Ihren Markt.",
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

export default function BottimmoErfahrungenPage() {
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

      {/* ── Wissens-Kopf ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Erfahrungsbericht · BOTTIMMO</p>
            <h1 className="t-display mt-4">
              {rich("BOTTIMMO Erfahrungen 2026: was der Baukasten *wirklich* kann.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              BOTTIMMO liefert ein schnelles, fertiges Marketing-Paket: eigene Website,
              vorgefertigte Anzeigen und eine breite Themenwelt an Ratgeberinhalten, in kurzer
              Zeit startklar. Für den ersten eigenen Online-Auftritt ist das eine solide Lösung.
              Die Grenze liegt im System selbst:{" "}
              <Highlight>Design, Funnel und Inhalte laufen als Vorlage bei vielen
              anderen Maklern im selben Markt parallel</Highlight>. Ob das reicht, hängt vom
              Anspruch ab — als Einstieg gut, als Unterscheidung gegen den führenden Makler der
              Stadt nicht.
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
                alt="Makler prüft am Bildschirm die eigene Website neben einem Baukasten-Vorlagenraster"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — Stärken, ehrlich benannt ────────────────────── */}
      <section id="staerken" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Was der Baukasten gut kann"
              titel="Vier *Stärken*, ohne die BOTTIMMO nicht so verbreitet wäre."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {STAERKEN.map((s, i) => (
              <Reveal key={s.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{s.titel}</p>
                  <p className="t-body mt-3">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vergleichstabelle — wann reicht der Baukasten, wann nicht ───── */}
      <section id="vergleich" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der ehrliche Vergleich"
              titel="Sechs Kriterien: wann der Baukasten *reicht* — wann nicht."
              sub="Keine Wertung über BOTTIMMO als System, sondern über die Frage, die zählt: passt eine geteilte Vorlage zu Ihrem Anspruch in Ihrer Stadt?"
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-medium">
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Nr.</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Kriterium</th>
                  <th className="py-3 pr-4 t-label !text-[10.5px]">Baukasten reicht</th>
                  <th className="py-3 t-label !text-[10.5px]">Baukasten stößt an Grenze</th>
                </tr>
              </thead>
              <tbody>
                {VERGLEICH.map((z, i) => (
                  <tr key={z.kriterium} className="border-b border-line-subtle align-top">
                    <td className="py-4 pr-4 font-mono text-[13px] text-ink-muted tnum">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[13rem] !text-ink-cream font-medium">
                      {z.kriterium}
                    </td>
                    <td className="py-4 pr-4 t-body max-w-[17rem]">{z.reicht}</td>
                    <td className="py-4 t-body max-w-[17rem]">{z.grenze}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Der Baukasten ist Handwerk. Eine Marke ist es nicht." glyph>
              BOTTIMMO baut zuverlässig, was jedes Büro braucht. Nur baut es dasselbe auch für den
              Mitbewerber zwei Straßen weiter. Eine Marke entscheidet den Alleinauftrag genau da,
              wo die Vorlage aufhört.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, eigenes Portal statt Baukasten ──────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Sechs Wochen nach dem Relaunch mit eigener Marke statt Vorlage: neun Abschlüsse,
              342.000 € Volumen, Platz 21 von über 25.000 Maklern beim ImmoScout24-Award.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *Entscheidung* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
          <p className="t-small mt-10 max-w-[54ch]">
            BOTTIMMO ist eine Marke der BOTTIMMO AG. beuwy steht in keiner Verbindung zu BOTTIMMO.
          </p>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Marke*, nicht die nächste Vorlage.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Den fairen Vergleich mit ausführlicher Gegenüberstellung lesen Sie unter{" "}
              <Link href="/bottimmo-alternative" className="ref-link">
                BOTTIMMO-Alternative
              </Link>
              , was ein eigenes Portal kostet zeigt{" "}
              <Link href="/maklerwebsite-kosten" className="ref-link">
                Maklerwebsite-Kosten
              </Link>
              . Den Überblick über alle Bausteine finden Sie im{" "}
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
