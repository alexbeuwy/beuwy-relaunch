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
 * Wissensseite (R3 Welle 2, Cluster P) — /maklerbuero-skalieren. Hauptteil:
 * eine Drei-Stufen-Rail (Zufluss → Prozess → Team) als Kernaussage des
 * Angles, danach ein Zweispalter im Karten-Stil (Falsche Reihenfolge vs.
 * Richtige Reihenfolge), dann eine kurze Passage zur ersten Rolle im Team.
 * Das Gratis-Wort aus dem T-Cluster bleibt hier außen vor (Cluster P).
 * GelbeKarte, Beweis-Anriss (acta, System vor Headcount als
 * Eigenerfahrung, KEIN Case-Link auf /cases/acta — dort existiert kein
 * Eintrag), FAQ + FAQPage-JSON-LD. Foto 2 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Maklerbüro skalieren: Vom Einzelkämpfer zum Team, das trägt | beuwy",
  description:
    "Maklerbüro skalieren gelingt in der Reihenfolge Zufluss, Prozess, Team, nicht umgekehrt. Welche Rolle zuerst kommt und warum System vor Headcount steht.",
  openGraph: {
    title: "Maklerbüro skalieren: Vom Einzelkämpfer zum Team, das trägt | beuwy",
    description:
      "Wer zuerst einstellt und danach systematisiert, verdoppelt das Chaos statt die Kapazität. Die richtige Reihenfolge: Zufluss, dann Prozess, dann Team.",
    type: "website",
    locale: "de_DE",
  },
};

const STUFEN = [
  {
    titel: "Zufluss",
    text: "Ein planbarer Strom an Eigentümer-Anfragen, unabhängig von einzelnen Empfehlungen oder guten Monaten. Ohne diese Grundlage arbeitet jede weitere Stufe mit zu wenig Material.",
  },
  {
    titel: "Prozess",
    text: "Rückrufregel, Terminvergabe, Wochenbericht: Abläufe, die im System stehen statt im Kopf des Inhabers. Erst wenn ein Ablauf ohne Erinnerung funktioniert, ist er ein Prozess.",
  },
  {
    titel: "Team",
    text: "Die erste Einstellung übernimmt einen bereits definierten Teil des Prozesses. Sie lernt einen Ablauf, keine Improvisation, und wird dadurch in Wochen statt Monaten produktiv.",
  },
] as const;

const FAQS = [
  {
    q: "Wann ist der richtige Zeitpunkt für die erste Einstellung?",
    a: "Wenn der Zufluss an Anfragen bereits stabil über mehrere Monate läuft und ein dokumentierter Prozess dafür existiert, statt Wissen nur im Kopf des Inhabers. Vorher übernimmt jede neue Person Chaos, keine Aufgabe.",
  },
  {
    q: "Soll ich zuerst einen zweiten Makler oder eine Assistenz einstellen?",
    a: "In den meisten Büros zuerst eine Assistenz oder Koordination für Termine, Rückrufe und Datenpflege. Ein zweiter Makler kostet mehr und braucht selbst schon einen funktionierenden Prozess, um produktiv zu sein, eine Koordination entlastet diesen Prozess zuerst.",
  },
  {
    q: "Wie viele Anfragen im Monat rechtfertigen eine Einstellung?",
    a: "Eine feste Zahl gibt es nicht, entscheidend ist die Auslastung: Wenn Anfragen liegen bleiben, Rückrufe sich verzögern oder Besichtigungstermine kollidieren, ist die Kapazität des Inhabers erschöpft, unabhängig von der genauen Anfragenzahl.",
  },
  {
    q: "Was, wenn der Zufluss schon da ist, aber trotzdem Chaos herrscht?",
    a: "Dann fehlt Stufe zwei, nicht Stufe drei. Eine weitere Person würde das bestehende Chaos nur auf mehr Schultern verteilen. Zuerst gehört der Prozess ins System, danach trägt jede zusätzliche Person tatsächlich zur Kapazität bei.",
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

export default function MaklerbueroSkalierenPage() {
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
            <p className="t-label !text-ink-yellow">Skalierung &amp; Team</p>
            <h1 className="t-display mt-4">
              {rich("Maklerbüro skalieren: vom *Einzelkämpfer* zum Team, das trägt.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ein Maklerbüro skaliert nicht über mehr Personal zuerst, sondern in einer festen
              Reihenfolge: erst ein planbarer Zufluss an Eigentümer-Anfragen, dann ein Prozess, der
              diesen Zufluss ohne Zutun des Inhabers verarbeitet, erst danach die erste Einstellung.{" "}
              <Highlight>
                Wer diese Reihenfolge umdreht, stellt eine Person in ein System, das noch gar
                nicht existiert
              </Highlight>
              , und verdoppelt damit das Chaos statt die Kapazität.
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
                alt="Makler bespricht mit einer neuen Teamkollegin einen dokumentierten Ablauf am Bildschirm"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mechanismus — Drei-Stufen-Rail: Zufluss → Prozess → Team ────────── */}
      <section id="stufen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Engpass-Reihenfolge"
              titel="Drei Stufen. Übersprungen wird keine davon *dauerhaft*."
              sub="Jede Stufe baut auf der vorigen auf. Team ohne Prozess kostet, Prozess ohne Zufluss läuft leer."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {STUFEN.map((s, i) => (
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

      {/* ── Zweispalter — falsche vs. richtige Reihenfolge ──────────────────── */}
      <section id="reihenfolge" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zwei Wege, ein Ziel"
              titel="Dieselbe Einstellung, zwei sehr unterschiedliche *Ergebnisse*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">Falsche Reihenfolge: erst Team</p>
                <p className="t-body mt-4">
                  Der Inhaber stellt ein, weil er sich überlastet fühlt. Der Prozess bleibt aber
                  Kopfsache, also fragt die neue Person ständig nach. Der Zufluss ändert sich nicht,
                  die Kosten steigen sofort. Nach wenigen Monaten trägt die Einstellung nicht,
                  sondern bindet zusätzlich Zeit.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">Richtige Reihenfolge: erst System</p>
                <p className="t-body mt-4">
                  Zufluss und Rückrufregel laufen bereits im CRM, ein Wochenbericht zeigt, wo
                  Kapazität fehlt. Die erste Einstellung übernimmt einen klar begrenzten Teil davon,
                  etwa Terminvergabe und Datenpflege, und wird produktiv, ohne dass der Inhaber
                  jeden Handgriff erklären muss.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              Wie sich Rückrufregel, Terminvergabe und Wochenbericht konkret automatisieren
              lassen, bevor überhaupt eine neue Person eingestellt wird, zeigt die Seite{" "}
              <Link href="/automatisierung-maklerbuero" className="ref-link">
                Automatisierung im Maklerbüro
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
            <GelbeKarte label="Der Unterschied" titel="System vor Headcount." glyph>
              Eine zusätzliche Person löst kein Problem, das im Prozess liegt. Sie verdoppelt es
              nur auf zwei Köpfe. Wer zuerst Zufluss und Prozess in ein System bringt, gibt jeder
              neuen Einstellung etwas, in das sie tatsächlich hineinwachsen kann.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — acta, System vor Headcount als Eigenerfahrung ──── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              acta war kein Kunde, sondern unsere eigene Firma: in der Spitze 15 Leute, rund 380
              verkaufte Wohneinheiten in drei Jahren, etwa 40 Millionen Euro Volumen, akquiriert
              über Instagram-Anzeigen. Der Zufluss stand, bevor die Einstellungen kamen.
            </p>
            <Link href="/ueber-uns" className="ref-link mt-6 inline-block">
              Mehr über beuwy erfahren →
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *System*, bevor Sie einstellen.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , welche Abläufe sich zuerst automatisieren lassen, zeigt die Seite{" "}
              <Link href="/automatisierung-maklerbuero" className="ref-link">
                Automatisierung im Maklerbüro
              </Link>
              , unsere eigene Vertriebserfahrung steht auf der Seite{" "}
              <Link href="/ueber-uns" className="ref-link">
                Über uns
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
