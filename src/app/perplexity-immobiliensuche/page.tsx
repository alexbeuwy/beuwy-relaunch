import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster K) — /perplexity-immobiliensuche.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich: Ja, ein
 * wachsender Teil recherchiert über Assistenten statt über zehn blaue
 * Links. Hauptteil variiert bewusst gegen die Schwesterseite
 * /ai-overviews-immobilien: eine Damals/Heute-Vergleichstabelle zum
 * Recherche-Muster, eine Nummern-Liste zur Quellen-Logik der Assistenten,
 * ein Vorher/Nachher-Beispiel derselben Frage. GelbeKarte, Beweis-Anriss,
 * FAQ + FAQPage-JSON-LD. Foto 12 (Hochformat) laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Perplexity & Co.: Wie Eigentümer heute Makler recherchieren | beuwy",
  description:
    "Perplexity, ChatGPT-Suche und Copilot verändern, wie Eigentümer einen Makler recherchieren. Das Suchmuster 2026 und was diese Assistenten wirklich zitieren.",
  openGraph: {
    title: "Perplexity & Co.: Wie Eigentümer heute Makler recherchieren | beuwy",
    description:
      "Recherche-Muster 2026, die Quellen-Logik der KI-Assistenten und was tatsächlich zitiert wird: Daten, FAQs, Konsistenz statt Keyword-Dichte.",
    type: "website",
    locale: "de_DE",
  },
};

const DAMALS_HEUTE = [
  { merkmal: "Ausgangspunkt der Suche", damals: "zehn blaue Links", heute: "eine zusammengefasste Antwort" },
  { merkmal: "Anzahl geöffneter Seiten", damals: "3 – 5 Vergleiche", heute: "oft keine, nur die Quellen der Antwort" },
  { merkmal: "Was überzeugt", damals: "Position in der Trefferliste", heute: "Nennung als zitierte Quelle" },
  { merkmal: "Was der Nutzer sieht", damals: "Titel und Meta-Beschreibung", heute: "eine Zusammenfassung aus mehreren Seiten" },
  { merkmal: "Entscheidend für Sichtbarkeit", damals: "Keyword-Dichte, Backlinks", heute: "Konsistenz, echte Zahlen, klare Struktur" },
] as const;

const QUELLEN_LOGIK = [
  {
    titel: "Echte Zahlen statt Marketing-Sprech",
    text: "Eine belegte Kennzahl wiegt für ein Sprachmodell mehr als eine Behauptung wie „führender Makler der Region“, die niemand nachprüfen kann.",
  },
  {
    titel: "Klare Frage-Antwort-Struktur",
    text: "FAQ-Abschnitte lassen sich leicht extrahieren und einer konkreten Nutzerfrage zuordnen, ganz anders als ein langer Fließtext ohne Gliederung.",
  },
  {
    titel: "Konsistenz über alle Profile",
    text: "Name, Adresse und Leistungsversprechen müssen auf der Website, im Google-Profil und auf Bewertungsportalen übereinstimmen, sonst wertet das Modell die Quelle als unsicher.",
  },
  {
    titel: "Sichtbare Aktualität",
    text: "Ein Jahr, ein aktueller Marktbezug oder ein Datum im Text signalisiert, dass die Information nicht seit Jahren unverändert im Netz steht.",
  },
] as const;

const FAQS = [
  {
    q: "Suchen wirklich schon viele Eigentümer über KI-Assistenten statt über Google?",
    a: "Der Anteil wächst, ist aber noch kleiner als die klassische Google-Suche. Wer sich heute schon auf beide Recherchewege vorbereitet, verliert nichts, wenn der Anteil weiter steigt, und gewinnt schon jetzt die ersten Kontakte, die diesen Weg gehen.",
  },
  {
    q: "Muss ich mich bei Perplexity oder ChatGPT extra anmelden, um gefunden zu werden?",
    a: "Nein. Diese Assistenten greifen auf öffentlich zugängliche Webinhalte zu, ähnlich wie eine Suchmaschine. Es gibt kein Profil, das Sie dort separat anlegen müssten, entscheidend ist die eigene Website.",
  },
  {
    q: "Zitieren Assistenten auch kleine, regionale Makler-Websites?",
    a: "Ja, wenn die Seite die gestellte Frage klar und belegt beantwortet. Größe spielt eine kleinere Rolle als bei klassischen Rankings, weil das Modell nach der besten Antwort sucht, nicht nach der bekanntesten Marke.",
  },
  {
    q: "Wie hängt das mit AI Overviews in der Google-Suche zusammen?",
    a: "Ähnliche Logik, unterschiedliche Bühne. Google fasst innerhalb der eigenen Suche zusammen, Perplexity und ChatGPT-Suche tun das als eigenständiges Werkzeug. Beide Themen und ihre Unterschiede erklärt die Schwesterseite AI Overviews.",
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

export default function PerplexityImmobiliensuchePage() {
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
            <p className="t-label !text-ink-yellow">KI-Suche</p>
            <h1 className="t-display mt-4">
              {rich("Perplexity & Co.: wie Eigentümer heute einen Makler *recherchieren*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ja, ein wachsender Teil der Eigentümer stellt die Frage heute nicht mehr nur Google,
              sondern direkt einem Assistenten wie Perplexity, der ChatGPT-Suche oder Copilot:
              „Welcher Makler in meiner Stadt hat gute Bewertungen?“ Diese Werkzeuge lesen mehrere
              Quellen gleichzeitig und liefern eine zusammengefasste Antwort mit Verweisen zurück,
              statt zehn blaue Links.{" "}
              <Highlight>Welche Quelle in dieser Antwort landet, folgt anderen Regeln
              als ein Google-Ranking</Highlight> — echte Zahlen, klare Struktur und Konsistenz
              zählen mehr als klassische Keyword-Dichte.
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
                alt="Person tippt eine Frage in einen KI-Assistenten am Smartphone, während sie am Küchentisch sitzt"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover object-top"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Das Recherche-Muster — Damals/Heute-Vergleichstabelle ───────────── */}
      <section id="muster" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Recherche-Muster 2026"
              titel="Von zehn Links zu *einer* Antwort mit Quellen."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Merkmal</th>
                    <th className="t-label py-3 pr-6 font-semibold">Google-Suche, klassisch</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">KI-Assistent, 2026</th>
                  </tr>
                </thead>
                <tbody>
                  {DAMALS_HEUTE.map((row) => (
                    <tr key={row.merkmal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.merkmal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.damals}</td>
                      <td className="t-body py-4 tnum">{row.heute}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Quellen-Logik — Nummern-Liste ────────────────────────────────────── */}
      <section id="quellen-logik" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Quellen-Logik"
              titel="Was ein Assistent als *Quelle* auswählt."
              sub="Vier Faktoren, die häufiger über eine Nennung entscheiden als der klassische Rankingfaktor."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-14 border-t border-line-subtle sm:grid-cols-2">
            {QUELLEN_LOGIK.map((q, i) => (
              <Reveal key={q.titel} delay={(i % 4) * 50}>
                <div className="border-b border-line-subtle py-7">
                  <div className="flex items-baseline gap-3">
                    <span className="t-data shrink-0 tnum">{String(i + 1).padStart(2, "0")}</span>
                    <p className="t-h3 !text-[17px]">{q.titel}</p>
                  </div>
                  <p className="t-body mt-2 pl-9">{q.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beispiel — dieselbe Frage, mit und ohne Struktur ────────────────── */}
      <section id="beispiel" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ein Beispiel"
              titel="Dieselbe Frage, zwei sehr *unterschiedliche* Antworten."
              sub="Frage: „Welcher Makler in meiner Stadt kümmert sich um den kompletten Verkauf?“"
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-base p-7">
                <p className="t-label">Ohne klare Struktur</p>
                <p className="t-body mt-4">
                  Ihre Seite beschreibt Leistungen in langen, werblichen Absätzen ohne konkrete
                  Zahl. Der Assistent findet keine eindeutige Antwort zum Extrahieren und
                  zitiert stattdessen einen Wettbewerber mit klarer FAQ-Sektion.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-base p-7">
                <p className="t-label">Mit klarer Struktur</p>
                <p className="t-body mt-4">
                  Eine FAQ-Frage auf Ihrer Seite beantwortet exakt diese Formulierung, mit einer
                  Zahl aus Ihrer eigenen Praxis. Der Assistent zitiert Ihr Büro namentlich als eine
                  von zwei Quellen der Antwort.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Assistent zitiert keine Meinung, sondern einen Beleg." glyph>
              „Führender Makler der Region“ ist eine Behauptung, die ein Sprachmodell nicht
              einordnen kann. Eine Zahl, ein Datum, eine Quelle, die sich nachprüfen lässt, kann
              es. Genau das entscheidet, wer in der Antwort auftaucht und wer nicht.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Buzzword</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              {rich("*Siebzehn* Jahre Markenarbeit heißt: konsistente Fakten waren die Aufgabe, lange bevor ein Sprachmodell sie geprüft hat.")}
            </p>
            <Link href="/geo-fuer-immobilienmakler" className="ref-link mt-6 inline-block">
              Wie wir Seiten zitierfähig machen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
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

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir eine Seite, die *zitiert* wird.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die volle Systematik für KI-Sichtbarkeit auf{" "}
              <Link href="/geo-fuer-immobilienmakler" className="ref-link">
                GEO für Immobilienmakler
              </Link>
              , wie dasselbe Prinzip in der Google-Suche wirkt, zeigt{" "}
              <Link href="/ai-overviews-immobilien" className="ref-link">
                AI Overviews für Immobilienmakler
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
