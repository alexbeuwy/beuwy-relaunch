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
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster W) — /empfehlungsgeschaeft-digitalisieren.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, danach
 * PainRows (typische Denkfehler reiner Empfehlungs-Makler) und eine
 * Nummern-Liste mit den vier Schritten. GelbeKarte, Königswege-Beweis
 * (Empfehlungswachstum 60→2.300+ Partner), FAQ + FAQPage-JSON-LD. Foto 6
 * laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Empfehlungsgeschäft digitalisieren: Wenn der Ruf online ankommt | beuwy",
  description:
    "Empfehlungsgeschäft digitalisieren heißt: Die Anfrage kommt durch Empfehlung, Google entscheidet sie. beuwy baut Bewertungen, Cases und Marke als Verstärker.",
  openGraph: {
    title: "Empfehlungsgeschäft digitalisieren: Wenn der Ruf online ankommt | beuwy",
    description:
      "Die Empfehlung bringt die Anfrage, Google entscheidet sie. beuwy baut Bewertungen, Cases und eine konsistente Marke als Verstärker für Ihr Empfehlungsgeschäft.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "„Ich lebe von Empfehlungen, Werbung passt nicht zu mir.“",
    answer:
      "Empfehlungen bringen die Anfrage, nicht die Entscheidung. Der Empfohlene googelt trotzdem, bevor er anruft, und findet dort entweder die Bestätigung des Vertrauens oder den ersten Zweifel daran.",
  },
  {
    quote: "„Meine Kunden empfehlen mich sowieso weiter, dafür muss ich nichts tun.“",
    answer:
      "Eine Empfehlung ohne online sichtbare Bestätigung bleibt ein einzelnes Gespräch zwischen zwei Menschen. Erst eine Bewertung, ein Case und ein konsistenter Auftritt machen aus der einen Empfehlung ein Muster, das sich wiederholt.",
  },
  {
    quote: "„Bewertungen aktiv einzufordern wirkt mir zu aufdringlich.“",
    answer:
      "Der richtige Moment, kurz nach dem Notartermin, wenn die Erleichterung noch frisch ist, macht daraus keine Bitte, sondern einen natürlichen letzten Schritt des Verkaufsprozesses.",
  },
] as const;

const SCHRITTE = [
  {
    titel: "Google-Profil vollständig",
    text: "Kategorien, Öffnungszeiten, echte Bewertungen statt eines leeren Eintrags mit fünf Sternen aus dem Freundeskreis.",
  },
  {
    titel: "Fallstudien statt Behauptungen",
    text: "Eine Reise mit echten Zahlen zeigt, was Sie leisten, greifbarer als jedes „langjährige Erfahrung“ im Fließtext.",
  },
  {
    titel: "Eine Marke, überall gleich",
    text: "Website, Profil und Social-Kanal erzählen dieselbe Geschichte, damit der Empfohlene Sie überall wiedererkennt.",
  },
  {
    titel: "Bewertung als fester Schritt",
    text: "Ein Prozess, der nach jedem Abschluss aktiv um eine Bewertung bittet, statt darauf zu hoffen, dass sie von allein kommt.",
  },
] as const;

const FAQS = [
  {
    q: "Reicht ein Google-Profil, oder brauche ich eine eigene Website?",
    a: "Ein gepflegtes Google-Profil ist der erste, wichtigste Anker, weil es genau dort steht, wo der Empfohlene sucht. Eine eigene Website ergänzt es um das, was ein Profil nicht kann: Fallstudien, Preis-Argumentation, einen Auftritt, der Ihre gesamte Marke trägt.",
  },
  {
    q: "Wie bekomme ich Kunden dazu, überhaupt zu bewerten?",
    a: "Der Zeitpunkt entscheidet mehr als die Formulierung: kurz nach dem Notartermin, wenn Erleichterung und Dankbarkeit am größten sind. Eine direkte, persönliche Bitte in diesem Moment wirkt deutlich besser als eine automatisierte Massen-Mail Wochen später.",
  },
  {
    q: "Was ist der Unterschied zwischen einer Empfehlung und einem Case?",
    a: "Eine Empfehlung ist mündlich und bleibt beim einzelnen Gespräch. Ein Case macht dieselbe Geschichte online nachlesbar, mit Zahlen, für jeden, der Ihren Namen googelt, nicht nur für den einen Freundeskreis.",
  },
  {
    q: "Wie schnell wirkt eine digitalisierte Empfehlungskette?",
    a: "Google-Profil und die ersten Bewertungen wirken oft schon innerhalb weniger Wochen. Bis eine konsistente Marke aus mehreren Empfehlungen ein verlässliches Muster macht, vergehen meist Monate, das ist ein Aufbau, kein Schalter.",
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

export default function EmpfehlungsgeschaeftDigitalisierenPage() {
  const koenigswege = caseBySlug("koenigswege");

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
            <h1 className="t-display mt-4">{rich("Wenn der *Ruf* online ankommt.")}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie machen Ihr Empfehlungsgeschäft digital sichtbar, indem Sie online genau das
              bestätigen, was Freund oder Nachbar mündlich versprochen haben: ein Google-Profil
              mit echten Bewertungen, sichtbare Fallstudien und eine Marke, die auf jeder Seite
              gleich auftritt. Die Empfehlung bringt die Anfrage, aber{" "}
              <Highlight>die Google-Suche direkt danach entscheidet</Highlight>, ob daraus ein
              Termin wird. Ein leeres Profil oder eine veraltete Website weckt Zweifel an der
              Empfehlung selbst.
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
                src={maklerAsset(6)}
                alt="Zufriedener Kunde gibt kurz nach dem Notartermin eine Bewertung ab"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Einwände — typische Denkfehler reiner Empfehlungs-Makler ────────── */}
      <section id="einwaende" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der übliche Reflex"
              titel="„Ich brauche kein Marketing“ ist selbst schon eine *Wette*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — Nummern-Liste, vier Schritte ──────────────────────── */}
      <section id="schritte" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Schritte, die aus einer Empfehlung eine *Anfrage* machen."
              sub="Keiner der vier Schritte ersetzt die Empfehlung selbst. Zusammen sorgen sie dafür, dass sie online ankommt, statt im Gespräch stecken zu bleiben."
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

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Die Empfehlung öffnet die Tür. Google hält sie offen." glyph>
              Ohne digitale Bestätigung bleibt jede Empfehlung ein Zufall, der beim nächsten
              Gespräch neu entstehen muss. Mit Profil, Cases und konsistenter Marke wird aus dem
              Zufall ein System, das jede einzelne Empfehlung verstärkt statt verpuffen lässt.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Königswege, Wachstum durch Empfehlung und Marke ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Ein Finanzvertrieb, der fast ausschließlich über Menschen wächst, die sich der Marke
              anschließen wollen: Aus 60 Personen wurden über 2.300 Partner unter derselben Marke.
            </p>
          </Reveal>
          {koenigswege ? (
            <div className="mt-10">
              <CaseGrid cases={[koenigswege]} />
            </div>
          ) : null}
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr digitales *Echo*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wer hinter dem System steht, zeigt die Seite{" "}
              <Link href="/ueber-uns" className="ref-link">
                Über uns
              </Link>
              , und der passende Auftritt dazu ist die{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                Maklerwebsite
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
