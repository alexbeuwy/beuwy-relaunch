import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster K) — /ai-overviews-immobilien. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich: Klickverlust bei
 * generischen Fragen, neue Chance bei Zitierfähigkeit. Hauptteil: PainRows
 * zur Klickverlust-Realität, ein 4-Schritte-Mechanismus (wie eine Seite
 * zitierfähig wird), ein Vorher/Nachher-Beispiel derselben Suchfrage mit
 * und ohne eigene Quelle. GelbeKarte, Beweis-Anriss, FAQ + FAQPage-JSON-LD.
 * Foto 11 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "AI Overviews: Wenn Google selbst antwortet, und Sie zitiert werden | beuwy",
  description:
    "AI Overviews beantworten Suchfragen direkt in Google, oft ohne Klick. Was das für Immobilienmakler konkret bedeutet und wie Ihre Seite trotzdem zitiert wird.",
  openGraph: {
    title: "AI Overviews: Wenn Google selbst antwortet, und Sie zitiert werden | beuwy",
    description:
      "Klickverlust bei generischen Fragen, neue Sichtbarkeit durch Zitate: Wie Google AI Overviews Immobilienmakler treffen und wie Seitenstruktur darauf reagiert.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Die Antwort steht schon über den Ergebnissen, bevor irgendjemand klickt.",
    answer:
      "Bei allgemeinen Fragen wie „Wie läuft ein Hausverkauf ab“ fasst Google die Antwort direkt zusammen. Ein Teil der Nutzer liest diese Zusammenfassung und geht nie zu einer einzelnen Seite weiter, egal wie gut sie rankt.",
  },
  {
    quote: "Platz drei bringt nichts, wenn die Overview die Frage schon beantwortet hat.",
    answer:
      "Ranking war lange die ganze Messlatte. Jetzt kann eine Seite auf Platz drei stehen und trotzdem leer ausgehen, weil der Nutzer seine Antwort bereits gelesen hat, ohne einen der Treffer darunter zu öffnen.",
  },
  {
    quote: "Wer nicht zitiert wird, verschwindet doppelt: kein Klick, keine Erwähnung.",
    answer:
      "Die Overview nennt zwei bis vier Quellen namentlich. Wer dort nicht auftaucht, ist für diese Suchanfrage komplett unsichtbar, nicht nur einen Rang schlechter platziert.",
  },
];

const SCHRITTE = [
  {
    titel: "Literale Antwort",
    text: "Ein Satz, der die Suchfrage direkt beantwortet, meist gleich im ersten Absatz. Google zieht bevorzugt Formulierungen, die ohne Umweg zur Frage passen.",
  },
  {
    titel: "Strukturierte Daten",
    text: "FAQPage- und Article-Markup ordnen Frage und Antwort maschinenlesbar zu, statt sie in Fließtext zu verstecken, den ein System erst interpretieren müsste.",
  },
  {
    titel: "Konsistente Fakten",
    text: "Name, Zahl und Leistungsversprechen stimmen über Website, Google-Profil und Bewertungsportale hinweg überein. Widersprüche kosten Vertrauen bei Mensch und Modell gleichermaßen.",
  },
  {
    titel: "Sichtbare Aktualität",
    text: "Ein Datum, ein aktueller Marktbezug, eine gepflegte Seite statt eines Textes, der seit drei Jahren unverändert dasteht.",
  },
] as const;

const FAQS = [
  {
    q: "Verschwinden klassische Rankings durch AI Overviews komplett?",
    a: "Nein. Overviews erscheinen vor allem bei allgemeinen Informationsfragen, nicht bei jeder Suche. Bei konkreten, kommerziellen Anfragen wie „Makler Musterstadt“ zeigt Google weiterhin die gewohnten organischen Treffer, oft ganz ohne Overview darüber.",
  },
  {
    q: "Wie erfahre ich, ob meine Seite in einer Overview zitiert wurde?",
    a: "Ein verlässliches, flächendeckendes Tool dafür gibt es bisher nicht. Google Search Console zeigt Teilsignale, ansonsten hilft nur die Stichprobe: die eigene Zielfrage regelmäßig selbst eingeben und nachsehen, wer genannt wird.",
  },
  {
    q: "Muss ich meine Texte jetzt komplett für KI umschreiben?",
    a: "Nein, die Grundlagen sind dieselben wie bei gutem SEO: eine klare Antwort auf eine konkrete Frage, saubere Struktur, echte Fakten statt Marketing-Sprech. Wer das schon macht, muss nichts grundlegend ändern.",
  },
  {
    q: "Gilt das auch für ChatGPT und Perplexity, nicht nur für Google?",
    a: "Ja, mit ähnlicher Logik, aber eigenen Regeln bei der Quellenwahl. Wie Eigentümer heute über solche Assistenten recherchieren, zeigt die Schwesterseite Perplexity & Co.",
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

export default function AiOverviewsImmobilienPage() {
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
              {rich("AI Overviews: wenn Google selbst antwortet, und Sie trotzdem *zitiert* werden.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Google AI Overviews bedeuten für Makler zwei Dinge gleichzeitig: Bei allgemeinen
              Fragen wie „Wie läuft ein Hausverkauf ab“ fasst Google die Antwort direkt über den
              Ergebnissen zusammen, ein Teil der Klicks bleibt aus. Gleichzeitig entsteht eine
              neue Chance, wenn Ihre Seite als eine der zitierten Quellen erscheint:{" "}
              <Highlight>Ihr Name steht dann in der Antwort selbst, auch wenn niemand
              klickt</Highlight>. Wer weiter nur für einen Rankingplatz schreibt, tritt gegen eine
              Zusammenfassung an, die er nicht sieht, wer literale Antworten liefert, wird Teil
              davon.
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
                src={maklerAsset(11)}
                alt="Makler prüft eine Google-Suchergebnisseite am Laptop, Notizblock mit Stichpunkten daneben"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem — Klickverlust-Realität ─────────────────────────────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Klickverlust-Realität"
              titel="Ranking ist nicht mehr gleich *Sichtbarkeit*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, wie eine Seite zitierfähig wird ────── */}
      <section id="mechanismus" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Bedingungen, damit eine Seite *zitiert* wird."
              sub="Zitierfähigkeit ist keine neue Disziplin, sondern eine Verschärfung der alten: klare Antworten, sauber ausgezeichnet, konsistent gehalten."
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

      {/* ── Beispiel — dieselbe Suchfrage, mit und ohne eigene Quelle ───────── */}
      <section id="beispiel" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ein Beispiel"
              titel="Dieselbe Frage, zwei sehr *unterschiedliche* Ergebnisse."
              sub="Suchfrage: „Was kostet ein Makler beim Hausverkauf?“"
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-base p-7">
                <p className="t-label">Overview ohne Ihre Seite als Quelle</p>
                <p className="t-body mt-4">
                  Google fasst die Provisionsspanne aus zwei großen Portalen zusammen und nennt
                  deren Namen als Quelle. Ihr Büro taucht in der Antwort nicht auf, obwohl Ihre
                  eigene Seite dieselbe Frage längst beantwortet.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-base p-7">
                <p className="t-label">Overview mit Ihrer Seite als Quelle</p>
                <p className="t-body mt-4">
                  Ihre Seite beantwortet dieselbe Frage in einem Satz, mit FAQ-Markup und einer
                  Zahl aus Ihrer eigenen Praxis. Google nennt Ihr Büro namentlich als eine der
                  Quellen, direkt in der Zusammenfassung, ganz ohne Klick.
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
            <GelbeKarte label="Der Unterschied" titel="Nicht geklickt ist nicht dasselbe wie nicht gesehen." glyph>
              Ein Klick ist messbar, eine Erwähnung in einer Zusammenfassung wirkt trotzdem: Wer
              seinen Namen dort liest, merkt ihn sich für den nächsten Schritt. Wer fehlt, ist für
              diese Suchanfrage schlicht nicht vorhanden gewesen.
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
              {rich("*Siebzehn* Jahre Markenarbeit, geprüft heute doppelt: vom Menschen und vom Sprachmodell, das nur zitiert, was es belegen kann.")}
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
              , die klassische Grundlage dazu auf{" "}
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
