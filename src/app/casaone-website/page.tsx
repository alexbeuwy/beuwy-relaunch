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
 * Wissensseite (R3 Welle 2, Cluster V) — /casaone-website. Beantwortet
 * "Reicht eine CasaOne-Website für mein Büro?" wörtlich im Kopf: für den
 * Start ja, im Premium-Segment meist nicht mehr. Checkliste mit Häkchen
 * (Anzeichen, dass der Baukasten nicht mehr reicht), Nummern-Liste als
 * ehrlicher Migrationspfad (CasaOne bleibt CRM, nur der Auftritt
 * wechselt), GelbeKarte, Beweis-Anriss Vision Group (Premium-Auftritt für
 * den Investorenmarkt), FAQ + FAQPage-JSON-LD. Foto 2 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "CasaOne-Website: Grenzen des Baukastens im Premium-Segment | beuwy",
  description:
    "CasaOne-Website: für den Start reicht der Baukasten, im Premium-Segment stößt die Vorlage an Grenzen bei Typografie, Bildwelt und Funnel. Der Migrationspfad.",
  openGraph: {
    title: "CasaOne-Website: Grenzen des Baukastens im Premium-Segment | beuwy",
    description:
      "CasaOne verwaltet Objekte zuverlässig. Sobald Eigentümer hochpreisiger Objekte vergleichen, entscheidet die eigene Marke: der ehrliche Migrationspfad ohne Systemwechsel.",
    type: "website",
    locale: "de_DE",
  },
};

const ANZEICHEN = [
  "Sie verkaufen überwiegend Objekte über 800.000 €",
  "Eigentümer vergleichen Sie mit Maklern, die eine eigene Marke zeigen",
  "Ihre Website sieht aus wie die des Mitbewerbers im selben CRM-System",
  "Es gibt keinen eigenen Bewertungsrechner, nur ein Kontaktformular",
  "Die Bildsprache stammt aus Stock-Fotos statt aus echten Objekten",
  "Ein Alleinauftrag ging zuletzt an einen Mitbewerber mit stärkerem Auftritt",
] as const;

const SCHRITTE = [
  {
    titel: "Analyse des bestehenden Auftritts",
    text: "Wir sichten Ihre CasaOne-Struktur, Ihre Objektklasse und den Auftritt der Mitbewerber, die Sie tatsächlich verlieren.",
  },
  {
    titel: "Markenkern definieren",
    text: "Typografie, Farbwelt und Sprache entstehen für Ihre Preisklasse, nicht aus einer Vorlage, die andere CasaOne-Kunden ebenfalls nutzen.",
  },
  {
    titel: "Objekt-Sync migrieren",
    text: "CasaOne bleibt Ihr CRM. Objekte laufen weiter automatisch, jetzt im Layout Ihrer neuen Marke statt im Baukasten-Raster.",
  },
  {
    titel: "Livegang mit Parallelbetrieb",
    text: "Das neue Portal steht, bevor die alte Website abgeschaltet wird: kein Tag ohne Auftritt, kein verlorener Eigentümer-Kontakt.",
  },
] as const;

const FAQS = [
  {
    q: "Muss ich CasaOne kündigen, um zu wechseln?",
    a: "Nein. CasaOne bleibt Ihr CRM für Objekte und Kontakte, wir tauschen ausschließlich den Auftritt davor. Ob und wann Sie die alte Website-Lizenz kündigen, entscheiden Sie unabhängig davon.",
  },
  {
    q: "Ab welcher Preisklasse lohnt sich der Wechsel?",
    a: "Eine feste Grenze gibt es nicht. Als Richtwert: Sobald Sie regelmäßig Objekte über 800.000 € vermarkten und Eigentümer Sie mit Häusern vergleichen, die eine eigene Marke zeigen, wird der Vorlagen-Auftritt zum Nachteil.",
  },
  {
    q: "Verliere ich beim Wechsel meine Objektdaten?",
    a: "Nein. Die Objektdaten bleiben in CasaOne, wo sie heute schon liegen. Das neue Portal liest sie über die bestehende Anbindung, nichts wird doppelt gepflegt oder geht verloren.",
  },
  {
    q: "Wie lange dauert der Migrationspfad?",
    a: "Analyse, Markenkern, Objekt-Sync und Livegang laufen üblicherweise über mehrere Wochen, mit Parallelbetrieb bis zum Umstellungstag. Eine feste Zahl nennen wir erst nach dem ersten Gespräch über Ihren Bestand.",
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

function HakenIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.8 8.2l2.1 2.1 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.5"
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

export default function CasaOneWebsitePage() {
  const vision = caseBySlug("vision-group");

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
            <p className="t-label !text-ink-yellow">CRM · CasaOne</p>
            <h1 className="t-display mt-4">
              {rich("CasaOne-Website: wo der Baukasten im *Premium*-Segment endet.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Für den Start reicht sie: CasaOne verwaltet Objekte und Kontakte zuverlässig und
              liefert eine CRM-Website, die läuft. Für ein Büro im Premium-Segment reicht sie
              meist nicht mehr, weil{" "}
              <Highlight>Typografie, Bildwelt und Funnel aus der Vorlage stammen</Highlight>,
              nicht aus Ihrer Positionierung. Ein Eigentümer einer 1,2-Mio.-€-Immobilie
              vergleicht Sie mit Maklern, die einen eigenen Auftritt zeigen. Der Wechsel ist kein
              Bruch: CasaOne bleibt CRM, nur der Auftritt davor wird ausgetauscht.
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
                src={maklerAsset(2)}
                alt="Makler zeigt einer Eigentümerin eine hochpreisige Immobilie im Premium-Segment"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — Anzeichen, dass der Baukasten nicht mehr reicht ── */}
      <section id="checkliste" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Selbst-Check"
              titel="Sechs Anzeichen, dass CasaOne nicht mehr *reicht*."
              sub="Trifft mehr als die Hälfte zu, kostet die Vorlage Sie vermutlich bereits Alleinaufträge."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {ANZEICHEN.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-akzent-hover">
                    <HakenIcon />
                  </span>
                  <p className="t-body">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nummern-Liste — der ehrliche Migrationspfad ──────────────────── */}
      <section id="migration" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Migrationspfad"
              titel="Vier Schritte. CasaOne bleibt, der *Auftritt* wechselt."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {SCHRITTE.map((s, i) => (
              <Reveal key={s.titel} delay={i * 40}>
                <div className="border-t border-line-subtle pt-5">
                  <p className="t-label">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-[15px] font-semibold text-ink-cream">{s.titel}</p>
                  <p className="t-body mt-2">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="CasaOne bleibt Ihr CRM. Nur der Auftritt wechselt die Liga." glyph>
              Ein Baukasten reicht, solange niemand vergleicht. Im Premium-Segment vergleicht
              jeder Eigentümer, meist bevor er anruft. Die Marke entscheidet dort, wo die Vorlage
              aufhört.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Vision Group, Auftritt für den Investorenmarkt ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Für Vision Group bauten wir Marke und Auftritt für den Investorenmarkt: aus einem
              Dreierteam wurde eine 160-Mio.-€-Partnerschaft mit KKR, 1.450 Wohneinheiten
              entwickelt im Höchststand. Ohne Auftritt kein Gespräch dieser Größenordnung.
            </p>
          </Reveal>
          {vision ? (
            <div className="mt-10">
              <CaseGrid cases={[vision]} />
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
              titel="Was Sie vor dem *Wechsel* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
          <p className="t-small mt-10 max-w-[54ch]">
            CasaOne ist eine Marke der CasaOne AG. beuwy ist unabhängiger Dienstleister.
          </p>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir den Auftritt für Ihre *Preisklasse*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Was ein eigenes Portal kostet, zeigt{" "}
              <Link href="/maklerwebsite-kosten" className="ref-link">
                Maklerwebsite-Kosten
              </Link>
              , den Aufbau im Detail{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                Website für Immobilienmakler
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
