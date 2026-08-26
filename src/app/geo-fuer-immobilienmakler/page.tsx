import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * /geo-fuer-immobilienmakler — GEO-Leaf (Generative Engine Optimization),
 * gleiche XXL-Systematik wie marketing-bautraeger/ki-fuer-immobilienmakler.
 * Kein CaseGrid: cases.ts geprüft (RIEGEL/Vision Group/Königswege), aber
 * keiner der belegten Fälle behauptet eine KI-Zitierung — die Beweis-
 * Sektion arbeitet stattdessen mit der Studio-Zahl mk.stats.s3 (17 Jahre),
 * um keine Fallstudie in eine Behauptung zu pressen, die sie nicht trägt.
 * Foto 19 (quadratisch, BRIEF §4/§9-Zuteilung) läuft in derselben
 * Hero-Plate wie die querformatigen Fotos anderer R2-Seiten — object-cover
 * füllt den Container unabhängig vom Quellformat, kein eigenes Layout
 * nötig. Querverweis auf die Schwesterseite /seo-fuer-immobilienmakler
 * sitzt im Beweis-Block (die Route existiert noch nicht, Link wird laut
 * Auftrag einfach gesetzt).
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "GEO für Immobilienmakler: Sichtbar in ChatGPT & KI-Suche | beuwy",
  description:
    "GEO für Immobilienmakler heißt: Ihr Büro taucht in den Antworten von ChatGPT, Claude und Perplexity auf, wenn Eigentümer nach einem Makler fragen. beuwy baut die Struktur dafür, in Wochen statt Quartalen.",
  openGraph: {
    title: "GEO für Immobilienmakler: Sichtbar in ChatGPT & KI-Suche | beuwy",
    description:
      "beuwy baut die Struktur, die KI-Antworten zitierfähig macht: literale Antworten, strukturierte Daten, llms.txt und ein Portal, das jede Anfrage auffängt.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote:
      "„Welcher Makler in Köln ist gut?“ fragt der Eigentümer heute nicht Google. Er fragt ChatGPT.",
    answer:
      "Nennt die Antwort drei Namen, sitzt Ihrer entweder mit am Tisch oder gar nicht. Der Eigentümer öffnet danach keine zehn blauen Links mehr, er ruft den ersten Namen an, den er gerade gehört hat.",
  },
  {
    quote: "Google beantwortet die Frage inzwischen selbst, ganz oben, bevor der erste blaue Link überhaupt sichtbar wird.",
    answer:
      "Die AI Overview steht über den gewohnten Ergebnissen. Wer darin nicht zitiert wird, verliert den Klick, unabhängig davon, wie gut die eigene Seite eine Zeile darunter rankt.",
  },
  {
    quote: "Ein Blogartikel im Monat und ein paar Backlinks galten lange als Suchmaschinenoptimierung.",
    answer:
      "Für eine KI-Antwort reicht das allein nicht. Eine KI zitiert Seiten, die eine Frage im ersten Satz eindeutig beantworten, und Firmendaten, die überall gleich lauten. Ein Blogartikel ohne diese Struktur wird beim Zusammenstellen der Antwort übersprungen.",
  },
];

const SCHRITTE = [
  {
    titel: "Seiten, die die Frage sofort beantworten",
    text: "Jede Seite beantwortet ihre Suchfrage im ersten Absatz wörtlich, ohne Anlauf und ohne Einleitung. Genau diesen Absatz liest eine KI, wenn sie eine Antwort zusammenstellt.",
  },
  {
    titel: "Strukturierte Daten, die eine KI lesen kann",
    text: "Organisation, Leistungen und FAQ stehen als strukturierte Daten hinter jeder Seite. Eine KI liest diese Struktur zuverlässiger als einen Absatz voller Nebensätze.",
  },
  {
    titel: "llms.txt und eine Firmenkarte, die überall gleich lautet",
    text: "Eine llms.txt-Datei listet Leistungen, Zielgruppen und Zahlen maschinenlesbar auf. Name, Adresse und Telefonnummer stehen dabei überall identisch, auf der Website, in Verzeichnissen und auf dem Portal.",
  },
  {
    titel: "Verzahnung mit dem Portal",
    text: "Zitiert eine KI Ihr Büro, landet der Klick auf einer Seite, die sofort registriert: Name, Anliegen, nächster Schritt. Die KI zitiert, das Portal registriert. Kein Zitat verpufft im Nichts.",
  },
] as const;

const FAQS = [
  {
    q: "Was ist GEO für Immobilienmakler?",
    a: "GEO steht für Generative Engine Optimization: die Arbeit daran, dass ChatGPT, Claude oder Perplexity Ihr Büro nennen, wenn jemand nach einem Makler fragt. Statt für einen Platz in der Trefferliste zu optimieren, optimieren Sie für einen Platz in der Antwort selbst.",
  },
  {
    q: "Was unterscheidet GEO von klassischem SEO?",
    a: "Klassisches SEO zielt auf Rankings und Klicks aus einer Ergebnisliste. GEO zielt auf Zitierfähigkeit: Eine KI liest Ihre Seite, versteht sie in einem Satz und nennt Ihren Namen in ihrer Antwort. Die Grundlagen überschneiden sich, aber Struktur und strukturierte Daten wiegen bei GEO schwerer als Backlinks.",
  },
  {
    q: "Wie lange dauert es, bis eine KI mein Büro nennt?",
    a: "Die Struktur, literale Antworten, strukturierte Daten und llms.txt, steht in vier bis sechs Wochen. Wann eine KI zum ersten Mal zitiert, hängt zusätzlich vom Modell und der Konkurrenz in Ihrer Stadt ab. Das besprechen wir ehrlich im Gespräch, statt einen pauschalen Termin zu versprechen.",
  },
  {
    q: "Was kostet GEO für Immobilienmakler?",
    a: "Das hängt vom Umfang Ihres bestehenden Auftritts ab. Ein Gespräch klärt das in dreißig Minuten, mit einer konkreten Einschätzung statt einer Preisliste von der Stange.",
  },
  {
    q: "Funktioniert das auch für kleinere Städte?",
    a: "Gerade dort. Eine KI-Antwort auf „Makler in einer Kleinstadt mit 20.000 Einwohnern“ nennt oft nur ein oder zwei Namen, weil kaum jemand die Struktur dafür baut. Wer dort zuerst steht, bleibt lange stehen.",
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
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover ${className}`}
    >
      Zusammenarbeit anfragen
      <PfeilRechts className="transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5" />
    </Link>
  );
}

export default async function GeoFuerImmobilienmaklerPage() {
  const c = await getContent();

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

      {/* ── Hero — Foto 19, Floating Card mit Studio-Zahl s4 ─────────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(19)}
              alt="Makler bespricht mit einer Kollegin eine Objektübersicht am Tisch, warmes Licht im Büro"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 38%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">Messbar, nicht behauptet</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s4_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s4_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">GEO für Immobilienmakler</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("GEO für Immobilienmakler: Ihr Name in der *Antwort*, bevor der erste blaue Link erscheint.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              Eigentümer fragen heute nicht mehr nur Google. Sie fragen ChatGPT, Claude oder
              Perplexity nach einem Makler in ihrer Stadt, und die Antwort{" "}
              <Highlight>nennt nur eine Handvoll Namen</Highlight>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — literale Definition, dann Pain-Erzählung ──────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Was GEO bedeutet"
              titel="Wer in der *Antwort* fehlt, existiert für diesen Eigentümer nicht."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={40}>
            <p className="t-body-lg mt-6 max-w-[680px]">
              GEO, Generative Engine Optimization, ist die Arbeit daran, dass ChatGPT, Claude oder
              Perplexity Ihr Büro nennen, wenn ein Eigentümer nach einem Makler fragt. Das Ziel
              heißt Zitierfähigkeit: Eine KI-Antwort spricht Ihren Namen aus, mit Ort und
              Leistung, statt nur einen blauen Link in einer Ergebnisliste zu zeigen. Für
              Immobilienmakler zählt das, weil genau diese Frage heute zuerst in einem
              Chat-Fenster landet, nicht mehr in einer Suchleiste.
            </p>
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, konkret statt Buzzword ─────────── */}
      <section id="system" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Bausteine, damit eine KI Ihren Namen *kennt*."
              sub="Kein Trick, keine Abkürzung. Struktur, die eine KI lesen kann, und ein Portal, das den Klick auffängt, sobald sie zitiert."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {SCHRITTE.map((schritt, i) => (
              <Reveal key={schritt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{schritt.titel}</p>
                  <p className="t-body mt-3">{schritt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Abgrenzung — GelbeKarte, Unternehmensberatung statt Agentur ── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Die Abgrenzung" titel="Zehn weitere Backlinks sind kein GEO." glyph>
              <p>
                Agenturen verkaufen GEO gern als denselben alten Trick mit neuem Namen: ein
                Blogartikel im Monat, ein paar Backlinks, fertig.
              </p>
              <p className="mt-3">
                Wir bauen Struktur, die eine KI tatsächlich liest: literale Antworten,
                strukturierte Daten, ein konsistentes Firmenprofil und ein Portal, das jede
                Anfrage auffängt. Als Unternehmensberatung mit einem festen Ansprechpartner, nicht
                als Agentur, die ein Werbemittel abliefert und wieder verschwindet.
              </p>
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis — Studio-Zahl s3, Querverweis auf die Schwesterseite ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Buzzword</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              {rich("*Siebzehn* Jahre Systematik, jetzt auf Antworten übersetzt.")}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-10 max-w-[420px]">
              <p className="font-display text-[44px] font-bold tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s3_wert"]}
              </p>
              <p className="t-body mt-2">{c["mk.stats.s3_label"]}</p>
            </div>
            <p className="t-body mt-8 max-w-[52ch]">
              Was seit siebzehn Jahren für Marken funktioniert, gilt jetzt für Antworten: Eine
              klare, belegte Position wird zitiert, eine reine Behauptung wird übersprungen.
              Klassische Suchmaschinenoptimierung bleibt das Fundament darunter, mehr dazu auf der
              Schwesterseite{" "}
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                SEO für Immobilienmakler
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 5 Fragen, FaqAccordion + JSON-LD oben im Head ─────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem ersten *Gespräch* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Links zu Hub + Cases im Text ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir die Struktur, die eine KI *zitiert*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              GEO ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie
              im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , Referenzen in den{" "}
              <Link href="/cases" className="ref-link">
                Fallstudien
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
