import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster W) — /performance-marketing-makler.
 * Kanonische Erklärseite der 5%-Kette: kompakter Wissens-Kopf beantwortet
 * die Suchfrage wörtlich, danach ein 4-Stufen-Rail mit den mk.pm.*-Studio-
 * Werten (Quote/Mandate/Provision, dieselben wie auf /eigentuemer-leads-
 * generieren) und eine beispielhafte Wochenbericht-Tabelle als Rechenweg.
 * GelbeKarte, textlicher Beweis-Anriss (Riegel), FAQ + FAQPage-JSON-LD.
 * Foto 12 laut R3-SEITENPLAN.json (Hochformat, per object-cover im
 * 21:9-Band beschnitten).
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Performance-Marketing für Makler: Die 5%-Kette erklärt | beuwy",
  description:
    "Performance-Marketing für Makler: Anzeige, Klick, Rechner, Registrierung — vier Stufen mit realistischer Quote. beuwy liefert den Wochenbericht statt Bauchgefühl.",
  openGraph: {
    title: "Performance-Marketing für Makler: Die 5%-Kette erklärt | beuwy",
    description:
      "Jede Stufe der Kette mit realistischer Quote, gemessen in einem Wochenbericht statt geschätzt am Monatsende. beuwy baut die Kette von der Anzeige bis zum Mandat.",
    type: "website",
    locale: "de_DE",
  },
};

const STUFEN = [
  {
    anteil: "100 %",
    titel: "Anzeige gesehen",
    text: "Ihre Marke erscheint bei Eigentümern in Ihrer Region, die noch niemanden beauftragt haben, nicht bei einer zufälligen Reichweite ohne Bezug zum Verkauf.",
  },
  {
    anteil: "38 %",
    titel: "Klick, bleiben dran",
    text: "Wer klickt, landet auf einer Landingpage, die genau die Anzeige fortsetzt, nicht auf einer Startseite, die neu erklären muss, worum es geht.",
  },
  {
    anteil: "14 %",
    titel: "Rechner gestartet",
    text: "Adresse rein, Ersteinschätzung raus: der erste konkrete Schritt, der aus einem Interesse eine Handlung macht.",
  },
  {
    anteil: "5 %",
    titel: "Registriert & qualifiziert",
    text: "Die kommunizierte Quote am Ende der Kette: Der Eigentümer liegt mit Score und Kontext im CRM, nicht als Rohkontakt im Postfach.",
  },
] as const;

const WOCHENBERICHT = [
  { woche: "Woche 1", gesehen: "9.400", klicks: "3.460", rechner: "1.280", registriert: "445" },
  { woche: "Woche 2", gesehen: "11.100", klicks: "4.220", rechner: "1.590", registriert: "588" },
  { woche: "Woche 3", gesehen: "10.600", klicks: "4.030", rechner: "1.510", registriert: "519" },
] as const;

const FAQS = [
  {
    q: "Woher stammen die 100 %, 38 %, 14 %, 5 %?",
    a: "Das ist die Quote, mit der wir bei beuwy intern rechnen und kommunizieren, gemessen über eine größere Zahl an Kampagnen. Ihre tatsächliche Kette weicht je nach Region, Objektart und Anzeigenqualität ab, deshalb steht am Ende jeder Woche ein Bericht, keine Prognose.",
  },
  {
    q: "Was, wenn eine Stufe deutlich schlechter läuft als erwartet?",
    a: "Genau dafür existiert der Wochenbericht. Bricht die Kette an einer Stufe ein, zum Beispiel viele Klicks, aber wenige Rechner-Starts, sehen wir das in der ersten Woche und passen die Landingpage oder die Anzeige an, statt erst am Monatsende zu reagieren.",
  },
  {
    q: "Reicht Performance-Marketing ohne eigenes Portal?",
    a: "Nein, nicht auf Dauer. Eine Anzeige, die auf ein fremdes Formular oder eine generische Portalseite führt, verliert die Registrierungs-Stufe. Der Rechner und die Registrierung müssen auf einer Seite liegen, die Ihnen gehört.",
  },
  {
    q: "Wie schnell sehe ich die ersten Zahlen?",
    a: "Die Kette selbst steht, sobald Landingpage, Rechner und CRM-Anbindung live sind, meist innerhalb von vier bis sechs Wochen. Den ersten Wochenbericht mit echten Zahlen bekommen Sie in der ersten vollen Woche nach dem Livegang der Kampagne.",
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

export default async function PerformanceMarketingMaklerPage() {
  const c = await getContent();
  const quote = c["mk.pm.quote"] ?? "5 %";
  const mandate = c["mk.pm.mandate"] ?? "5";
  const provision = c["mk.pm.provision"] ?? "31.285 €";
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
            <p className="t-label !text-ink-yellow">Akquise</p>
            <h1 className="t-display mt-4">
              {rich("Performance-Marketing, das jede Stufe *misst*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Performance-Marketing für Makler funktioniert als Kette aus vier messbaren Stufen:
              Eine Anzeige führt auf Ihr Portal, ein Klick landet auf einer Landingpage mit
              Bewertungsrechner, der Rechner endet in einer Registrierung mit Kontaktdaten, und
              aus der Registrierung wird ein qualifiziertes Mandat.{" "}
              <Highlight>Jede Stufe hat eine realistische Quote</Highlight>, die wöchentlich
              gemessen wird, statt dass am Monatsende nur eine Rechnung ohne Ergebnis steht.
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
                src={maklerAsset(12)}
                alt="Makler wertet einen Wochenbericht zu laufenden Anzeigen aus"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stufen-Rail — die 5%-Kette als vierteiliges Rail ────────────────── */}
      <section id="kette" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Stufen. Eine Quote statt eines *Gefühls*."
              sub="Jede Stufe der Kette ist einzeln messbar und einzeln optimierbar. Bricht eine Stufe ein, sehen Sie genau, wo, statt erst am Monatsende zu rätseln."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {STUFEN.map((stufe, i) => (
              <Reveal key={stufe.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[32px] font-bold leading-none tracking-[-0.02em] text-ink-yellow tnum">
                    {stufe.anteil}
                  </p>
                  <p className="t-h3 mt-4">{stufe.titel}</p>
                  <p className="t-body mt-3">{stufe.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={260}>
            <div className="mt-14 max-w-[560px] rounded-[28px] border border-line-subtle bg-bg-base p-8">
              <p className="t-label">Was das im Jahr bedeutet</p>
              <p className="mt-4 font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {quote}
              </p>
              <p className="t-body mt-2">
                registrierte und qualifizierte Eigentümer, gemessen an allen, die die Anzeige
                sehen.
              </p>
              <div className="mt-8 border-t border-line-subtle pt-6">
                <p className="t-data !text-ink-cream tnum">{mandate} zusätzliche Mandate</p>
                <p className="t-small mt-1">im Jahr, bei Ø {provision} Provision je Mandat.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Wochenbericht — beispielhafter Rechenweg statt Bauchgefühl ──────── */}
      <section id="wochenbericht" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Statt Bauchgefühl"
              titel="So liest sich ein *Wochenbericht* in der Praxis."
              sub="Ein Beispiel mit angenommenen Zahlen, damit die Kette greifbar wird. Ihre eigenen Werte hängen von Region, Objektart und Anzeigenqualität ab und stehen im echten Bericht, nicht hier."
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">Zeitraum</th>
                    <th className="t-label py-3 pr-6 font-semibold">Anzeige gesehen</th>
                    <th className="t-label py-3 pr-6 font-semibold">Klicks</th>
                    <th className="t-label py-3 pr-6 font-semibold">Rechner gestartet</th>
                    <th className="t-label py-3 font-semibold">Registriert</th>
                  </tr>
                </thead>
                <tbody>
                  {WOCHENBERICHT.map((row) => (
                    <tr key={row.woche} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.woche}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.gesehen}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.klicks}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.rechner}</td>
                      <td className="t-body py-4 tnum">{row.registriert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-8 max-w-[680px]">
              Drei Wochen, drei leicht unterschiedliche Quoten, alle innerhalb der Bandbreite, mit
              der wir intern rechnen. Genau diese Schwankung ist der Grund, warum ein einzelner
              Tag oder eine einzelne Woche nichts über den Erfolg einer Kampagne aussagt, der
              Verlauf über mehrere Wochen dagegen schon.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Eine Kette lügt nicht." glyph>
              Ein Media-Budget allein sagt nichts über Anfragen. Erst die Kette aus Anzeige,
              Landingpage, Rechner und Registrierung macht sichtbar, wo Interesse verloren geht,
              und genau dort setzt die Optimierung an, nicht am Bauchgefühl.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Rechner als lebende Kette ────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien läuft genau diese Kette mit einem Bewertungsrechner auf
              amtlichen Bodenrichtwerten: neun Abschlüsse, 342.000 € Volumen in den ersten sechs
              Wochen, ohne einen einzigen gekauften Lead.
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
              titel="Was Sie vor dem *ersten* Budget wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Kette*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die volle Systematik der eigenen Quelle auf der Seite{" "}
              <Link href="/leadgenerierung-immobilienmakler" className="ref-link">
                Leadgenerierung für Immobilienmakler
              </Link>{" "}
              und wie sich eigene Quelle gegen gekauften Kontakt rechnet unter{" "}
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                Eigentümer-Leads generieren
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
