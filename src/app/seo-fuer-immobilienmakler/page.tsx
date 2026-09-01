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
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * SEO-Cluster — /seo-fuer-immobilienmakler. Eigener Pain (Portale und
 * Konkurrenten stehen vor der eigenen Seite, Platz 8 ist unsichtbar,
 * Blogtexte ohne Suchintention bringen Besucher statt Eigentümer, die
 * eigene Website rankt nur für den Firmennamen). Direkte Antwort auf die
 * Suchfrage direkt nach dem Hero, dann Mechanismus (Seitenarchitektur nach
 * Suchintention, lokale Landingpages, Ranking-Assets, technisches
 * Fundament durch das Portal) inklusive Querverweis auf die
 * Schwesterseite /geo-fuer-immobilienmakler (KI-Suche, entsteht parallel).
 * Foto 10 ist die für dieses Leaf zugeteilte Aufnahme, bereits an
 * anderer Stelle im selben Objektausschnitt kalibriert.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "SEO für Immobilienmakler: Platz 1, wenn Ihre Stadt sucht | beuwy",
  description:
    "SEO für Immobilienmakler heißt: eine Seite pro Suchfrage, lokale Landingpages und ein technisches Fundament, das lädt, bevor der nächste Tab offen ist. beuwy baut das Portal, das rankt und jeden Besucher registriert.",
  openGraph: {
    title: "SEO für Immobilienmakler: Platz 1, wenn Ihre Stadt sucht | beuwy",
    description:
      "beuwy baut die Seitenarchitektur, die lokalen Landingpages und das technische Fundament, damit Sie ranken, wenn Ihre Stadt sucht, nicht nur, wenn jemand Ihren Namen kennt.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Wer „Immobilienmakler [Ihre Stadt]“ sucht, sieht zwei Portale und drei Konkurrenten vor Ihnen.",
    answer:
      "Portale und große Ketten arbeiten seit Jahren an genau dieser Suchfrage. Ohne eine Seite, die exakt auf Ihre Stadt und Ihre Leistung zugeschnitten ist, tritt Ihre Startseite gegen einen Gegner an, der strukturell nicht zu schlagen ist.",
  },
  {
    quote: "Ihre Seite steht auf Platz 8. Genauso gut könnte sie offline sein.",
    answer:
      "Fast jeder Klick geht an die ersten drei Treffer. Platz 8 bedeutet: Die Seite existiert für Google, aber nicht für den Eigentümer, der gerade sucht. Ein Ranking, das niemand sieht, bringt keine Anfrage.",
  },
  {
    quote: "Der Blogartikel bringt Besucher. Eigentümer bringt er keine.",
    answer:
      "Ein Text zu einer allgemeinen Frage zieht Leser an, die sich informieren, nicht verkaufen wollen. Ohne Bezug zur Suchintention eines Verkäufers bleibt der Artikel eine Zahl im Analytics-Tool, kein Kontakt im Postfach.",
  },
  {
    quote: "Die eigene Website rankt für den Firmennamen. Für sonst nichts.",
    answer:
      "Wer nach Ihrem Namen sucht, kennt Sie bereits. SEO, das nur den Firmennamen bedient, holt niemanden neu ab. Die Eigentümer, die noch keinen Makler kennen, finden Sie über diese Seite gar nicht erst.",
  },
];

const SCHRITTE = [
  {
    titel: "Eine Seite pro Suchfrage",
    text: "„Makler in [Stadt]“, „Wohnung verkaufen [Stadt]“, „Maklerprovision [Region]“: Jede Suchfrage bekommt eine eigene Seite, die genau diese Frage beantwortet. Google ordnet jede Seite einer Absicht zu, statt eine Startseite gegen zehn Absichten gleichzeitig antreten zu lassen.",
  },
  {
    titel: "Lokale Landingpages",
    text: "Jede Stadt und jeder Stadtteil, in dem Sie tätig sind, bekommt eine eigene Landingpage mit echten lokalen Bezugspunkten. Wer „Makler Musterstadt-Nord“ eingibt, findet eine Seite, die genau davon handelt.",
  },
  {
    titel: "Ranking-Assets, die etwas zu zeigen haben",
    text: "Ein Bewertungsrechner mit echten Bodenrichtwerten, ein Marktbericht, eine Fallstudie mit belegten Zahlen: Inhalte, die Google als hilfreiche Antwort einstuft und die kein Mitbewerber in einer Woche kopiert.",
  },
  {
    titel: "Ein Fundament, das nicht beim Klick endet",
    text: "Das Portal lädt schnell, trägt strukturierte Daten und verlinkt jede Seite sauber mit der nächsten. Wer über die Suche kommt, wird registriert und qualifiziert, bevor das erste Telefonat überhaupt stattfindet.",
  },
] as const;

const FAQS = [
  {
    q: "Wie lange dauert es, bis erste Rankings sichtbar werden?",
    a: "Die Seitenarchitektur und die ersten lokalen Landingpages stehen innerhalb von vier bis sechs Wochen. Bis Google eine neue Seite einordnet und sie auf den vorderen Plätzen zeigt, vergehen meist weitere Wochen bis Monate, abhängig von Ihrer Stadt und der dortigen Konkurrenz. Eine feste Zahl nennen wir erst, wenn wir Ihren Markt kennen.",
  },
  {
    q: "Lohnt sich SEO auch in kleinen Städten?",
    a: "Ja, mit angepasster Erwartung. In einer Kleinstadt suchen weniger Menschen gleichzeitig einen Makler als in einer Großstadt, also kommen weniger Anfragen. Dafür reicht dort oft schon eine sauber gebaute Landingpage für Platz eins, weil kaum ein Mitbewerber überhaupt eine eigene Seite für den Ort aufgebaut hat.",
  },
  {
    q: "Was ist mit Portalen wie ImmoScout?",
    a: "Bleiben Sie dort gelistet. Portale ersetzen wir nicht, wir bauen daneben die Sichtbarkeit auf, die Ihnen gehört und nicht endet, sobald das Portal-Abo ausläuft oder ein Mitbewerber mehr für dieselbe Anzeige zahlt.",
  },
  {
    q: "Schreiben Sie auch Blogartikel?",
    a: "Nur wenn ein Artikel eine echte Suchfrage beantwortet, die Eigentümer oder Käufer tatsächlich stellen. Ein Blog ohne Suchintention bringt Leser, aber keine Anfragen, deshalb bauen wir lieber die Landingpage, die genau diese Frage direkt beantwortet.",
  },
  {
    q: "Braucht es dafür eine neue Website?",
    a: "Nicht zwingend. Trägt das technische Fundament Ihrer bestehenden Seite, ziehen wir die Architektur dort ein. Laden die Seiten langsam oder fehlen strukturierte Daten, empfehlen wir den Wechsel auf ein Portal, das von Anfang an auf Suchintention ausgelegt ist.",
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

export default async function SeoFuerImmobilienmaklerPage() {
  const c = await getContent();
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

      {/* ── Hero — ~70vh, Foto 10, Floating Card mit Studio-Zahl ────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(10)}
              alt="Team bespricht eine Markt- und Keyword-Analyse an einer Kücheninsel im Golden-Hour-Licht"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">Beweis, keine Behauptung</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s1_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s1_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">SEO für Immobilienmakler</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("SEO für Immobilienmakler, das *Platz eins* bringt, nicht Platz acht.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              SEO für Immobilienmakler heißt nicht, für den eigenen Namen zu ranken und sonst für
              nichts. Es heißt, für jede Suchfrage, die ein Eigentümer in Ihrer Stadt eingibt,{" "}
              <Highlight>die passende Seite bereitzuhalten und jeden Besucher zu
              registrieren, sobald er da ist</Highlight>.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Antwort — beantwortet die Suchfrage wörtlich, direkt nach dem Hero ── */}
      <section id="antwort" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-16 md:py-20 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Kurz beantwortet"
              titel="Was *SEO für Immobilienmakler* leistet, und woran es meistens scheitert."
              sub="SEO für Immobilienmakler sorgt dafür, dass Eigentümer und Käufer Sie bei Google finden, wenn sie „Makler + Stadt“ oder eine konkrete Preisfrage eingeben, nicht erst, nachdem sie durch drei Portale gescrollt sind. Dafür braucht es eine Seite pro Suchfrage, lokale Landingpages und ein technisches Fundament, das schnell lädt. Woran es in der Praxis meistens scheitert: eine einzelne Startseite, die für zehn Suchbegriffe gleichzeitig antreten soll, und ein Blog, der Besucher bringt, aber keine Eigentümer."
              className="max-w-[820px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Problem — Portale vorn, Platz 8, Blog ohne Suchintention, Firmenname ── */}
      <section id="problem" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ranking ist nicht gleich Sichtbarkeit"
              titel="Eine Seite, die *niemand* sieht, ist keine Seite, die verkauft."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, plus Querverweis auf GEO-Schwesterseite ── */}
      <section id="system" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Stufen. Eine Seite für jede Suchfrage, die zählt."
              sub="beuwy arbeitet als Unternehmensberatung an Ihrer Sichtbarkeit, nicht als Agentur, die einzelne Keywords abliefert. Jede Seite ist Teil eines Portals, mit einem festen Ansprechpartner."
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
          <Reveal delay={240}>
            <p className="t-body mt-12 max-w-[640px]">
              Google-Rankings sind der eine Kanal. Wie Sie zusätzlich in der KI-Suche auftauchen,
              zeigt die Schwesterseite{" "}
              <Link href="/geo-fuer-immobilienmakler" className="ref-link">
                GEO für Immobilienmakler
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Platz acht ist kein Erfolg." glyph>
              Die meisten SEO-Angebote verkaufen eine Position in einer Tabelle. Wir bauen ein
              Portal, in dem jede Suchfrage ihre eigene Seite bekommt und jeder Besucher
              registriert wird, sobald er da ist. Kein Zusatzmodul neben der Website. Das
              Fundament selbst.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Case, Ranking als Ergebnis-Satz ──────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Sechs Wochen nach dem Relaunch: Platz 21 von über 25.000 Maklern beim
              ImmoScout24-Award, neun Abschlüsse, 342.000 € Volumen, ohne einen einzigen
              gekauften Lead.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              Weitere Fallstudien ansehen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — 5 Fragen, FaqAccordion + JSON-LD oben im Head ─────────── */}
      <section id="faq" className="bg-bg-base">
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

      {/* ── Finale — CTA, Links zu Hub + Cases im Text ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Ranking*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              SEO ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine finden Sie
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
