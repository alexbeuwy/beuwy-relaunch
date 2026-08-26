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
 * Wissensseite (R3 Welle 2, Cluster W) — /makler-in-kleinstadt. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich, danach eine
 * Vergleichs-Tabelle (Großstadt vs. Kleinstadt entlang der Kriterien, die
 * den Dominanz-Hebel ausmachen) und eine Nummern-Liste mit den drei
 * Schritten zum Marktführer auf 30.000 Einwohner, mit Querverweis auf die
 * Schwesterseiten /immobilien-farming und /seo-fuer-immobilienmakler.
 * GelbeKarte, textlicher Beweis-Anriss (Riegel, Rhein-Neckar-Region), FAQ
 * + FAQPage-JSON-LD. Foto 13 laut R3-SEITENPLAN.json (Hochformat, per
 * object-cover im 21:9-Band beschnitten).
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Makler in der Kleinstadt: Marktführer auf 30.000 Einwohner | beuwy",
  description:
    "Makler in der Kleinstadt: weniger Wettbewerb um Suchbegriffe, günstigere Story-Omnipräsenz. beuwy zeigt, wie digitales Marketing dort schneller zur Dominanz führt.",
  openGraph: {
    title: "Makler in der Kleinstadt: Marktführer auf 30.000 Einwohner | beuwy",
    description:
      "Kleine Stadt, schneller Hebel: weniger Wettbewerb um „Makler + Stadt“, günstigere Reichweite. beuwy baut die Kette, die aus einem Büro den bekannten Namen im Ort macht.",
    type: "website",
    locale: "de_DE",
  },
};

const VERGLEICH = [
  {
    kriterium: "Wettbewerb um „Makler + Stadt“",
    grossstadt: "meist zehn und mehr Büros mit eigenem Auftritt",
    kleinstadt: "oft nur ein bis zwei Büros mit eigener Seite",
  },
  {
    kriterium: "Suchvolumen pro Monat",
    grossstadt: "hoch, aber stark umkämpft",
    kleinstadt: "niedriger, dafür fast ohne Streuung",
  },
  {
    kriterium: "Reichweite pro Werbe-Euro",
    grossstadt: "teuer, viele Mitbieter auf dieselbe Zielgruppe",
    kleinstadt: "günstiger, weniger Bieter im selben Radius",
  },
  {
    kriterium: "Weg zu Platz eins",
    grossstadt: "Monate, oft gegen Portale und Ketten",
    kleinstadt: "häufig Wochen, wenn kaum ein Wettbewerber eine Landingpage hat",
  },
  {
    kriterium: "Wirkung von Empfehlungen",
    grossstadt: "verpufft im großen Netzwerk",
    kleinstadt: "trägt schnell weiter, kurze Wege zwischen Nachbarn",
  },
] as const;

const HEBEL = [
  {
    titel: "Eine Landingpage, die den Ort besetzt",
    text: "„Makler in [Stadtname]“ oder „Immobilie verkaufen [Stadtname]“: In einer Stadt mit 30.000 Einwohnern reicht oft eine sauber gebaute Seite, um auf Platz eins zu stehen, weil kaum ein Wettbewerber überhaupt eine eigene Seite für den Ort gebaut hat.",
  },
  {
    titel: "Farming, das sich schneller rechnet",
    text: "Eine wöchentliche Story mit echten Objekten aus dem Ort erreicht in einer Kleinstadt einen größeren Anteil der relevanten Einwohner pro eingesetztem Euro als dieselbe Story in einer Großstadt mit zersplitterter Zielgruppe.",
  },
  {
    titel: "Der Ruf schließt den Kreis",
    text: "Wer in einer Kleinstadt einmal auffällt, dessen Name trägt weiter, oft über den Nachbarn, den Verein, den Handwerker, mit dem man gerade zu tun hatte. Digitale Sichtbarkeit und dieses Netzwerk verstärken sich gegenseitig, statt getrennt zu laufen.",
  },
] as const;

const FAQS = [
  {
    q: "Lohnt sich eine eigene Landingpage für eine Stadt mit nur 30.000 Einwohnern?",
    a: "Ja, gerade weil das Suchvolumen kleiner ist als in einer Großstadt, bauen dort selten mehrere Wettbewerber eine eigene Seite für exakt diesen Ort. Eine einzelne saubere Landingpage reicht oft für Platz eins, wo sie in einer Großstadt gegen zehn Konkurrenten antreten müsste.",
  },
  {
    q: "Wie groß muss das Werbebudget in einer Kleinstadt sein?",
    a: "Deutlich kleiner als in einer Großstadt, weil weniger Mitbieter um dieselbe Zielgruppe konkurrieren. Wie viel genau sinnvoll ist, hängt von der Zahl der Eigentümer ab, die dort tatsächlich verkaufen, das prüfen wir vor jeder Kampagne.",
  },
  {
    q: "Reicht Farming allein, ohne SEO?",
    a: "Für den Anfang ja, für Dauerhaftigkeit selten. Farming baut den Ruf im Ort auf, SEO sorgt dafür, dass jemand, der digital sucht statt zu fragen, Sie trotzdem findet. Beides zusammen trägt weiter als jeder Baustein allein.",
  },
  {
    q: "Was, wenn ein großes Portal auch in meiner Kleinstadt aktiv wirbt?",
    a: "Portale werben meist überregional und ohne lokalen Bezug. Eine Landingpage mit echten Ortsbezügen, echten Objekten und einem Namen, den die Nachbarschaft kennt, schlägt eine generische Portal-Anzeige gerade in kleinen Städten häufig, weil Vertrauen dort persönlicher entsteht.",
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

export default function MaklerInKleinstadtPage() {
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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Wachstum</p>
            <h1 className="t-display mt-4">
              {rich("In der Kleinstadt reicht meist *eine* gute Seite.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ja, digitales Marketing funktioniert in kleinen Städten, oft sogar schneller als in
              Großstädten. Der Grund ist nicht Ihr Budget, sondern die Konkurrenz: Wer „Makler in
              [Stadtname]“ sucht, findet in einer Stadt mit 30.000 Einwohnern häufig{" "}
              <Highlight>ein bis zwei Wettbewerber mit eigener Seite statt zehn</Highlight>. Eine
              saubere Landingpage und eine wöchentliche Story im Ort reichen dort oft für die
              Position, für die es in der Großstadt ein ganzes System bräuchte.
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
                src={maklerAsset(13)}
                alt="Makler steht vor einem Objekt in einer kleinen Stadt"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 20%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — Großstadt vs. Kleinstadt ────────────────────── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Unterschied auf einen Blick"
              titel="Weniger Suchvolumen, aber ein *klareres* Feld."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Kriterium</th>
                    <th className="t-label py-3 pr-6 font-semibold">Großstadt</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">
                      Kleinstadt (bis ca. 30.000 Einwohner)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VERGLEICH.map((row) => (
                    <tr key={row.kriterium} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.kriterium}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.grossstadt}</td>
                      <td className="t-body py-4 tnum">{row.kleinstadt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — der Dominanz-Hebel in drei Schritten ─────────────── */}
      <section id="hebel" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Dominanz-Hebel"
              titel="Drei Schritte zum bekannten *Namen* im Ort."
              sub="Alle drei Schritte wirken zusammen. Die volle Systematik hinter dem ersten Schritt steht auf der Seite SEO für Immobilienmakler, hinter dem zweiten auf der Seite Immobilien-Farming."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {HEBEL.map((schritt, i) => (
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
              Ausführlich beschrieben auf{" "}
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                SEO für Immobilienmakler
              </Link>{" "}
              und{" "}
              <Link href="/immobilien-farming" className="ref-link">
                Immobilien-Farming
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Klein ist kein Nachteil. Klein ist ein Hebel." glyph>
              In einer Großstadt kämpfen Sie um Platz vier von zehn. In einer Kleinstadt kämpfen
              Sie oft um Platz eins von zwei, gegen einen Wettbewerber, der überhaupt keine eigene
              Seite für den Ort gebaut hat. Derselbe Aufwand bringt dort ein anderes Ergebnis.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel, regionale Dominanz in Rhein-Neckar ──────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Ein regionaler Makler in der Rhein-Neckar-Region: sechs Wochen nach dem Relaunch
              neun Abschlüsse, 342.000 € Volumen, und Platz 21 von über 25.000 Maklern beim
              ImmoScout24-Award, nicht als bundesweite Kette, sondern als bekannter Name in der
              eigenen Region.
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

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
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

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Dominanz* im Ort.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die Systematik der Omnipräsenz auf{" "}
              <Link href="/immobilien-farming" className="ref-link">
                Immobilien-Farming
              </Link>{" "}
              und der Weg auf Platz eins bei Google auf{" "}
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                SEO für Immobilienmakler
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
