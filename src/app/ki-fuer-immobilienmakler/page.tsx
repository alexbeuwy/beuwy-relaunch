import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  RiCalculatorLine,
  RiFileTextLine,
  RiListCheck3,
  RiMailSendLine,
} from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import stil from "./hero.module.css";

/**
 * R2-3 — /ki-fuer-immobilienmakler. AI-Pain-Narrativ aus BRIEF §9 trägt
 * die Dramaturgie: Hook (Modelle-Flut, Namen genau einmal) → Problem
 * vertiefen (Prompt liefert Text, kein System) → Lösung (beuwy übersetzt
 * KI in Abläufe — KI leise, Nutzen laut) → Abgrenzung (beuwy positioniert
 * sich strikt als Unternehmensberatung, Fremdbezeichnung ausgeschlossen) →
 * Beweis (17 Jahre, Wochen statt Quartale, Studio-Zahlen referenziert) →
 * Qualifizierung → FAQ (+ FAQPage-JSON-LD) → Finale. Foto
 * 11 ist bereits für dieselbe Bildaussage kalibriert (Objektposition aus
 * leadgenerierung-immobilienmakler übernommen). Copy hart im Code
 * (R-Leaves fassen content.ts nicht an, außer referenzierten Studio-Zahlen).
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "KI für Immobilienmakler: Systeme statt Prompt-Frust | beuwy",
  description:
    "KI für Immobilienmakler heißt nicht mehr Prompts lernen: beuwy übersetzt ChatGPT, Claude & Co. in feste Abläufe für Anfragen, Exposés und Nachfassen. Als Unternehmensberatung, in Wochen statt Quartalen.",
  openGraph: {
    title: "KI für Immobilienmakler: Systeme statt Prompt-Frust | beuwy",
    description:
      "beuwy übersetzt KI-Werkzeuge in feste Abläufe für Anfragen, Exposés und Nachfassen — als Unternehmensberatung, in Wochen statt Quartalen.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Ein guter Prompt liefert einen guten Text.",
    answer:
      "Aber nur einen Text. Morgen brauchen Sie den nächsten Prompt, für die nächste Mail, das nächste Exposé. Die Arbeit fängt jedes Mal wieder bei null an.",
  },
  {
    quote: "Automatisieren wollen alle. Wie, weiß selten jemand.",
    answer:
      "Prozesse abgeben, Agenten einrichten, Systeme verbinden: Dafür fehlt in den meisten Maklerbüros weder der Wille noch das Team. Es fehlt die Zeit, sich selbst einzuarbeiten.",
  },
  {
    quote: "Die Anfrage von heute Abend liegt morgen früh noch im Postfach.",
    answer:
      "Kein einzelnes Werkzeug merkt sich das von selbst. Ohne festen Ablauf bleibt jede Automatisierung ein Versuch, den irgendwann keiner mehr weiterverfolgt.",
  },
];

const BAUSTEINE = [
  {
    icon: RiMailSendLine,
    label: "Follow-up-Automation",
    satz:
      "Ein Ablauf merkt sich, wer heute nicht kauft, und schickt in sechs Monaten automatisch die richtige Mail. Niemand im Team muss sich das Datum notieren.",
  },
  {
    icon: RiCalculatorLine,
    label: "Bewertungsrechner-Qualifizierung",
    satz:
      "Adresse rein, Ersteinschätzung raus. Der Rechner bewertet im Hintergrund und legt den Verkäufer-Lead mit Score ins CRM, während Sie noch besichtigen.",
  },
  {
    icon: RiFileTextLine,
    label: "Exposés im eigenen Markenlook",
    satz:
      "Objektdaten, Fotos und Ihr Markenlook laufen automatisch zu einem fertigen Exposé zusammen. Kein Dokument, das am Ende noch von Hand nachgebaut wird.",
  },
  {
    icon: RiListCheck3,
    label: "Prozesse, die an alles denken",
    satz:
      "Ein Nachfass-Termin, eine Frist, eine offene Unterschrift: Das System merkt es sich und meldet sich von selbst. Ihr Team muss nur noch entscheiden, nicht mehr daran denken.",
  },
];

const FAQS = [
  {
    q: "Ersetzt das mein Team?",
    a: "Nein. Der Ablauf übernimmt die Wege, die heute liegen bleiben: Nachfassen, Sortieren, den Exposé-Zusammenbau. Entscheidungen, Besichtigungen und das Gespräch mit dem Eigentümer bleiben bei Ihrem Team. Es bekommt nur mehr Zeit dafür.",
  },
  {
    q: "Welche Tools nutzen Sie?",
    a: "Das wechselt ständig und ist für Ihr Ergebnis nicht entscheidend. Wir wählen bei jedem Baustein das Werkzeug, das gerade am zuverlässigsten arbeitet, und tauschen es aus, sobald ein besseres verfügbar ist. Sie merken davon nichts außer dem Ergebnis.",
  },
  {
    q: "Was, wenn nächste Woche wieder alles neu ist?",
    a: "Dann ändert sich, was unter der Haube läuft, nicht Ihr Ablauf. Das System ist so gebaut, dass ein neues Modell ausgetauscht werden kann, ohne dass Ihre Prozesse, Formulare oder Ihr CRM neu aufgesetzt werden müssen.",
  },
  {
    q: "Muss mein Team lernen, wie man promptet?",
    a: "Nein. Der Ablauf läuft im Hintergrund, ohne dass jemand ein Prompt-Fenster öffnet. Ihr Team bedient gewohnte Oberflächen wie CRM, Postfach und Website. Die KI-Arbeit passiert dahinter, unsichtbar.",
  },
];

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

export default async function KiFuerImmobilienmaklerPage() {
  const c = await getContent();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero — Hook: Modelle-Flut (Namen genau einmal), GEO-Absatz ─── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div
            className={`relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px] ${stil.mediaEnter}`}
          >
            <Image
              src={maklerAsset(11)}
              alt="Makler zeigt Kollegen ein digitales System auf dem Tablet, warmes Licht im Büro"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "72% 32%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            {/* Floating Card — Studio-Zahl mk.stats.s4, eigene Rahmen-Zeile */}
            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">Von der Diagnose bis zum ersten Ablauf</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s4_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s4_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
            <p
              className={`t-label !text-ink-yellow ${stil.enter}`}
              style={{ "--i": 0 } as React.CSSProperties}
            >
              KI für Immobilienmakler
            </p>
            <h1
              className={`mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance] ${stil.enter}`}
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {rich("KI für Immobilienmakler — *Systeme*, kein Prompt-Frust.")}
            </h1>
            <p
              className={`t-body-lg mt-6 max-w-[34rem] ${stil.enter}`}
              style={{ "--i": 2 } as React.CSSProperties}
            >
              KI für Immobilienmakler heißt nicht, mit ChatGPT, Claude, Kimi oder DeepSeek
              herumzuprobieren, bis ein brauchbarer Text steht, während schon das nächste
              Modell ansteht. Es heißt, aus diesen Werkzeugen{" "}
              <Highlight>feste Abläufe für Anfragen, Exposés und Nachfassen</Highlight> zu bauen,
              die laufen, ohne dass jemand im Team jeden Tag daran denken muss.
            </p>
            <div
              className={`mt-9 flex flex-wrap items-center gap-5 ${stil.enter}`}
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem vertiefen — Prompt liefert Text, kein System ────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Prompt-Problem"
              titel="Wer *promptet*, bekommt Nettes. Nicht was trägt."
              sub="Ein Prompt ist schnell getippt. Ein Ablauf, der jede Woche von selbst läuft, ist etwas anderes. Genau da hören die meisten Erklärungen zu KI im Maklerbüro auf."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Lösung — vier Bausteine, KI leise, Nutzen laut ──────────────── */}
      <section id="system" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Was daraus wird"
              titel="Wir übersetzen KI in Abläufe, die *bleiben*."
              sub="Vier Bausteine, die heute in Maklerbüros laufen. Welches Modell gerade im Hintergrund rechnet, muss niemand im Team wissen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 border-t border-line-subtle">
            {BAUSTEINE.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.label} delay={i * 50}>
                  <div className="grid gap-4 border-b border-line-subtle py-9 sm:grid-cols-[240px_1fr] sm:items-start sm:gap-10 lg:grid-cols-[280px_1fr]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-akzent-wash text-ink-yellow">
                        <Icon aria-hidden className="size-[18px]" />
                      </span>
                      <p className="t-label !text-ink-dim">{b.label}</p>
                    </div>
                    <p className="font-display text-[20px] font-medium leading-[1.35] tracking-[-0.012em] text-ink-cream sm:text-[22px]">
                      {b.satz}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Abgrenzung — beuwy als Unternehmensberatung positioniert ────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte
              label="Die Abgrenzung"
              titel="Wir sind eine Unternehmensberatung, kein Prompt-Kurs."
              glyph
            >
              <p>
                Wir verkaufen keine Fortbildung im Prompten und keine Liste von Werkzeugen, die
                Ihr Team selbst zusammenstecken muss.
              </p>
              <p className="mt-3">
                Wir bauen die Abläufe, testen sie an Ihrem Betrieb und liefern ein System, das
                läuft. Beratung mit Ergebnis, keine Hausaufgabe.
              </p>
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis — Studio-Zahlen referenziert, 17 Jahre + Wochen ──────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Prompt-Versuch</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              {rich("*Siebzehn* Jahre Systembau, nicht erst seit dem ersten Sprachmodell.")}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-10 grid max-w-[560px] gap-10 sm:grid-cols-2">
              <div>
                <p className="font-display text-[44px] font-bold tracking-[-0.02em] text-ink-cream tnum">
                  {c["mk.stats.s3_wert"]}
                </p>
                <p className="t-body mt-2">{c["mk.stats.s3_label"]}</p>
              </div>
              <div>
                <p className="font-display text-[44px] font-bold tracking-[-0.02em] text-ink-cream tnum">
                  {c["mk.stats.s4_wert"]}
                </p>
                <p className="t-body mt-2">{c["mk.stats.s4_label"]}</p>
              </div>
            </div>
            <p className="t-body mt-8 max-w-[46ch]">
              Wochen, nicht Quartale: Ein Modellwechsel irgendwo im Hintergrund lässt Sie nicht
              wieder bei null anfangen, weil der Ablauf drumherum gebaut ist, nicht um ein
              einzelnes Werkzeug.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Qualifizierung — ehrliche Verknappung ───────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Für wen das gebaut ist"
              titel="Nicht für den ersten *Versuch* mit einem Sprachmodell."
              sub="Das hier ist für Büros mit laufendem Betrieb, die keine Vorlaufzeit mehr zum Ausprobieren haben. Stehen Sie noch ganz am Anfang, lohnt sich ein Gespräch trotzdem: Wir sagen ehrlich, ob sich der Aufbau eines Systems für Sie schon rechnet oder ob ein guter Prompt fürs Erste reicht."
              className="max-w-[680px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — vier Einwände, JSON-LD oben identisch verlinkt ────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Makler vor dem *ersten* Gespräch wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Links zu Hub + Kernleistung im Text ───────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">
              {rich("Bauen wir das *System*, nicht den nächsten Prompt.")}
            </h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              Schreiben Sie, welchen Ablauf Ihr Team heute noch von Hand erledigt. Im Gespräch
              sagen wir Ihnen, was ein System davon übernehmen kann. Wie das in eine eigene{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                Maklerwebsite
              </Link>{" "}
              eingebettet aussieht, zeigt die Kernleistung; einen Überblick über alle Bausteine
              gibt der{" "}
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
