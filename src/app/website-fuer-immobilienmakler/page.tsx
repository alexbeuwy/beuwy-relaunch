import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  RiCalculatorLine,
  RiGalleryLine,
  RiMailSendLine,
  RiMapPin2Line,
  RiPlugLine,
  RiSpeedUpLine,
} from "@remixicon/react";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  GelbeKarte,
  Highlight,
  KreisDeko,
  LogoSlot,
  SektionsKopf,
  StempelBadge,
  slugifyMarke,
} from "@/components/MaklerElemente";
import { maklerAsset } from "@/lib/cdn";
import stil from "./hero.module.css";

/**
 * D3 — /website-fuer-immobilienmakler (Kernleistung).
 * VSL-Kurzform für eine bereits solution-aware Zielgruppe: Hook (Hero) →
 * Spiegel (Vergleichs-Realität) → Mechanismus (6 Bausteine, Feature→Hebel
 * wörtlich aus BRIEF §8) → Integrations-Beweis → Prozess → Abgrenzung
 * Baukasten → Einwände → Finale. Ein CTA-Wortlaut, ein Foto (18), Element-
 * Bibliothek aus MaklerElemente. Copy hart im Code (D-Leaves fassen
 * content.ts nicht an) — Studio-Wünsche stehen im Abschlussbericht.
 */

export const metadata: Metadata = {
  title: "Website für Immobilienmakler: Premium statt Baukasten | beuwy",
  description:
    "beuwy baut Websites für Immobilienmakler, die Alleinaufträge rechtfertigen: Bewertungsrechner, CRM-Anbindung, Tempo und Objekt-Präsentation, live in vier Wochen.",
  openGraph: {
    title: "Website für Immobilienmakler: Premium statt Baukasten | beuwy",
    description:
      "Bewertungsrechner, CRM-Anbindung, Tempo und Objekt-Präsentation, die Alleinaufträge rechtfertigen. Live in vier Wochen, keine Vorlage.",
    type: "website",
    locale: "de_DE",
  },
};

const BAUSTEINE = [
  {
    icon: RiCalculatorLine,
    label: "Immobilienbewertungs-Rechner",
    satz: "Der Rechner qualifiziert Eigentümer, während Sie besichtigen: Adresse rein, Ersteinschätzung raus — und der Verkäufer-Lead liegt mit Score im CRM, nicht im Postfach.",
  },
  {
    icon: RiPlugLine,
    label: "onOffice- / CRM-Anbindung",
    satz: "Jede Anfrage landet mit Quelle und nächstem Schritt direkt in Ihrem System. Keine Zettel, kein Copy-Paste, kein vergessener Rückruf.",
  },
  {
    icon: RiSpeedUpLine,
    label: "Tempo & Ladezeit",
    satz: "Eigentümer vergleichen drei Makler in fünf Minuten. Die Seite, die sofort lädt, wirkt wie das Büro, das sofort zurückruft.",
  },
  {
    icon: RiGalleryLine,
    label: "Objekt-Präsentation",
    satz: "Exposés, die aussehen wie das Objekt es verdient — und Alleinaufträge rechtfertigen, bevor Sie im Wohnzimmer sitzen.",
  },
  {
    icon: RiMailSendLine,
    label: "Follow-up-Automation",
    satz: "Wer heute nicht verkauft, bekommt in 6 Monaten die richtige Mail. Automatisch.",
  },
  {
    icon: RiMapPin2Line,
    label: "Lokale Sichtbarkeit",
    satz: "Wenn „Makler + Stadtteil“ gegoogelt wird, steht Ihr Name über dem Portal.",
  },
];

const PROZESS = [
  {
    titel: "Aufnahme & Struktur",
    text: "Wir sichten Ihre Objekte, Ihr CRM und Ihre Marke. Daraus entsteht die Informationsarchitektur, nicht ein Standard-Menü von der Stange.",
  },
  {
    titel: "Design & Text",
    text: "Jede Seite entsteht als Entwurf mit echten Texten, nicht mit Platzhaltern. Sie sehen, wie es wird, bevor programmiert wird.",
  },
  {
    titel: "Technik & Anbindung",
    text: "Bewertungsrechner, CRM-Schnittstelle und Formulare gehen live und werden gegen Ihre echten Daten getestet.",
  },
  {
    titel: "Test & Go-Live",
    text: "Ladezeit, mobile Darstellung und Weiterleitungen der alten Seite werden geprüft. Dann schalten wir um, ohne dass eine Anfrage verloren geht.",
  },
];

const SOFTWARE = ["onOffice", "FLOWFACT", "Propstack", "JUSTIMMO", "CasaOne"];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Website für Immobilienmakler bei beuwy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das hängt vom Umfang ab. Vom Bewertungsrechner bis zur CRM-Anbindung ist nicht jedes Haus gleich weit. Die realistischen Marktspannen und was sie beeinflusst, finden Sie auf der Seite Was kostet eine Maklerwebsite.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert der Aufbau?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vier Wochen, von der Aufnahme bis zum Go-Live. Den Termin für den Livegang bekommen Sie schriftlich, bevor das Projekt startet.",
      },
    },
    {
      "@type": "Question",
      name: "Was passiert mit meiner alten Seite und Domain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ihre Domain bleibt Ihre Domain. Wir richten für jede alte Seite eine Weiterleitung ein, damit keine Anfrage und kein Google-Ranking verloren geht, während die neue Seite live geht und danach.",
      },
    },
  ],
};

export default function WebsiteFuerImmobilienmaklerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      {/* ── 1 · Hero — Foto 18, ~70vh, Hook + Traumzustand ──────────── */}
      <header className="relative bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 pt-28 pb-16 lg:px-10 lg:pt-32 lg:pb-20">
          <Link
            href="/immobilienmarketing"
            className="t-small inline-flex items-center gap-1.5 text-ink-muted transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            ← Immobilienmarketing für Makler
          </Link>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:min-h-[62vh] lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
            <div>
              <p
                className={`t-label !text-ink-yellow ${stil.enter}`}
                style={{ "--i": 0 } as React.CSSProperties}
              >
                Kernleistung · Website für Immobilienmakler
              </p>
              <h1
                className={`mt-5 font-display text-[clamp(34px,4.2vw,54px)] font-bold leading-[1.06] tracking-[-0.026em] text-ink-cream [text-wrap:balance] ${stil.enter}`}
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {rich("Die Website für Immobilienmakler, die *Alleinaufträge* rechtfertigt.")}
              </h1>
              <p
                className={`t-body-lg mt-6 max-w-[34rem] ${stil.enter}`}
                style={{ "--i": 2 } as React.CSSProperties}
              >
                Eigentümer vergleichen drei Makler-Websites in fünf Minuten, bevor sie zum
                Telefon greifen. Wer dabei{" "}
                <Highlight>teurer und schneller wirkt</Highlight>, bekommt öfter den
                Alleinauftrag. Nicht, wer die bessere Arbeit macht.
              </p>

              <div
                className={`mt-9 flex flex-wrap items-center gap-5 ${stil.enter}`}
                style={{ "--i": 3 } as React.CSSProperties}
              >
                <Link
                  href="/anfrage"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
                >
                  Zusammenarbeit anfragen
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <path
                      d="M1 7h11M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <span className="t-small">Antwort innerhalb von 24 Stunden</span>
              </div>
            </div>

            <div className={`relative ${stil.mediaEnter}`}>
              <KreisDeko className="-bottom-10 -left-10 lg:-left-14" />
              <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[28px]">
                <Image
                  src={maklerAsset(18)}
                  alt="Makler bespricht mit Eigentümern den Grundriss auf einem Tablet, warmes Licht, Blick über die Stadt im Hintergrund"
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <AiPille />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2 · Spiegel — Vergleichs-Realität, drei rhetorische Fragen ── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf
            eyebrow="Der Vergleich, den Eigentümer wirklich machen"
            titel="Eigentümer vergleichen drei Makler in *fünf Minuten*."
            sub="Was Ihre heutige Seite in dieser Zeit über Sie verrät, entscheiden Sie nicht mehr selbst — Tempo, Exposés und Vertrauen sprechen ohne Sie."
            className="max-w-[640px]"
          />
          <div className="mt-12">
            <PainRows
              items={[
                {
                  quote: "Lädt Ihre Seite so schnell, wie Sie ans Telefon gehen?",
                  answer:
                    "Fünf Sekunden Ladezeit, und der zweite Tab ist schon offen. Sie verlieren den Vergleich, bevor der Eigentümer eine Zeile gelesen hat.",
                },
                {
                  quote: "Sieht Ihr Exposé aus wie das Objekt es verdient?",
                  answer:
                    "Ein Grundriss als PDF-Anhang und drei Handyfotos wirken wie ein Nebenjob. Der Eigentümer merkt sich das Objekt, nicht den Makler dahinter.",
                },
                {
                  quote: "Erkennt ein Fremder in zehn Sekunden, warum er Ihnen sein Haus anvertraut?",
                  answer:
                    "Ohne Zahlen, Referenzen und ein klares Gesicht bleibt nur ein Name auf einer Visitenkarte. Vertrauen entsteht vor dem ersten Anruf, oder gar nicht.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 3 · Was eine beuwy-Website enthält — Editorial-Rails ────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf
            eyebrow="Leistungsumfang"
            titel="Was Ihr *Portal* für Sie erledigt."
            sub="Sechs Bausteine, jeder einzeln erklärt. Zusammen bringen sie Mandate, die ein Baukasten nicht kopieren kann."
            className="max-w-[640px]"
          />
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

      {/* ── 4 · Integrationen — prominent, Kompatibilität statt Partnerschaft ── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="relative mx-auto max-w-[1120px] px-6 py-20 lg:px-10 lg:py-28">
          <StempelBadge
            text="INTEGRIERT · GEPRÜFT · VERNETZT"
            groesse={108}
            className="absolute right-6 top-16 hidden sm:block lg:right-10 lg:top-20"
          />
          <SektionsKopf
            eyebrow="Anbindung"
            titel="Nahtlos mit den Tools, die Sie *schon nutzen*."
            className="max-w-[600px]"
          />
          <div className="mt-10 flex max-w-[640px] flex-wrap items-center gap-x-10 gap-y-5">
            {SOFTWARE.map((name) => (
              <LogoSlot key={name} name={name} slug={slugifyMarke(name)} />
            ))}
          </div>
          <p className="t-body-lg mt-8 max-w-[600px]">
            Ihre Website docken wir direkt an onOffice, FLOWFACT, Propstack, JUSTIMMO oder
            CasaOne an, unabhängig davon, welches System Sie heute nutzen. Bewertungsrechner,
            Kontaktformulare und Exposé-Anfragen landen dort, wo Ihr Team ohnehin arbeitet,
            nicht in einem zusätzlichen Postfach.
          </p>
          <Link href="/onoffice-website" className="btn-link t-small mt-6 inline-block">
            Speziell zur Anbindung an onOffice →
          </Link>
        </div>
      </section>

      {/* ── 5 · Prozess — vier Wochen, vier Schritte, schmal ────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf
            eyebrow="Ablauf"
            titel="In vier Wochen live, nicht in vier *Monaten*."
            ausrichtung="mitte"
          />
          <ol className="mt-14 list-none">
            {PROZESS.map((step, i) => (
              <Reveal key={step.titel} delay={i * 60}>
                <li
                  className={`grid grid-cols-[64px_1fr] gap-5 py-7 sm:grid-cols-[88px_1fr] ${
                    i > 0 ? "border-t border-line-subtle" : ""
                  }`}
                >
                  <p className="t-label !text-ink-yellow tnum">Woche {i + 1}</p>
                  <div>
                    <p className="t-h3">{step.titel}</p>
                    <p className="t-body mt-2">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="t-small mt-10 border-t border-line-subtle pt-8 text-center">
            Ein Ansprechpartner, jede Anfrage nachweisbar im Ticketsystem. Sie sehen den Stand
            Ihres Projekts, ohne nach zwei Wochen selbst nachzufragen.
          </p>
        </div>
      </section>

      {/* ── 6 · Abgrenzung Baukasten — GelbeKarte, ein Fokus-Element ── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 py-20 lg:px-10 lg:py-28">
          <GelbeKarte
            label="Abgrenzung"
            titel="Ein Baukasten verkauft Vorlagen. Wir bauen Portale, die Mandate bringen."
            glyph
          >
            <p>
              Baukästen verkaufen dieselbe Vorlage an tausend Makler gleichzeitig, nur mit
              anderem Logo und anderem Foto.
            </p>
            <p className="mt-3">
              beuwy baut seit 17 Jahren Marken für anspruchsvolle Auftraggeber und überträgt das
              auf Ihr Portal: Maßarbeit für Ihre Marke, Ihre Objekte und Ihr CRM, nicht eine von
              tausend Varianten desselben Templates. Es registriert Eigentümer und qualifiziert
              sie, bevor Sie zurückrufen.
            </p>
            <p className="mt-3">
              Den Unterschied zu Baukästen wie{" "}
              <Link
                href="/bottimmo-alternative"
                className="text-ink-cream underline decoration-ink-cream/40 underline-offset-2 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                BOTTIMMO
              </Link>{" "}
              und was eine Maklerwebsite realistisch{" "}
              <Link
                href="/maklerwebsite-kosten"
                className="text-ink-cream underline decoration-ink-cream/40 underline-offset-2 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                kostet
              </Link>
              , lesen Sie in den beiden Vergleichen.
            </p>
          </GelbeKarte>
        </div>
      </section>

      {/* ── 7 · FAQ — drei Resteinwände ──────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf eyebrow="Häufige Fragen" titel="Was Makler vorher *wissen* wollen." />
          <div className="mt-12">
            <FaqAccordion
              items={[
                {
                  q: "Was kostet eine Website für Immobilienmakler bei beuwy?",
                  a: (
                    <>
                      Das hängt vom Umfang ab. Vom Bewertungsrechner bis zur CRM-Anbindung ist
                      nicht jedes Haus gleich weit. Die realistischen Marktspannen und was sie
                      beeinflusst, finden Sie auf der Seite{" "}
                      <Link href="/maklerwebsite-kosten" className="btn-link">
                        Was kostet eine Maklerwebsite
                      </Link>
                      .
                    </>
                  ),
                },
                {
                  q: "Wie lange dauert der Aufbau?",
                  a: "Vier Wochen, von der Aufnahme bis zum Go-Live. Den Termin für den Livegang bekommen Sie schriftlich, bevor das Projekt startet.",
                },
                {
                  q: "Was passiert mit meiner alten Seite und Domain?",
                  a: "Ihre Domain bleibt Ihre Domain. Wir richten für jede alte Seite eine Weiterleitung ein, damit keine Anfrage und kein Google-Ranking verloren geht, während die neue Seite live geht und danach.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 8 · Finale CTA ───────────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-24 text-center lg:px-10 lg:py-32">
          <p className="t-label !text-ink-yellow">Nächster Schritt</p>
          <h2 className="t-h2 mx-auto mt-4 max-w-[22ch]">
            {rich("Ihre nächste Website entscheidet den nächsten *Alleinauftrag*.")}
          </h2>
          <p className="t-body-lg mx-auto mt-5 max-w-[46ch]">
            Schreiben Sie uns, was Ihre heutige Seite bremst. Wir sagen Ihnen im Gespräch, was
            ein Neubau in vier Wochen ändert.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <Link
              href="/anfrage"
              className="group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover"
            >
              Zusammenarbeit anfragen
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5"
                aria-hidden
              >
                <path
                  d="M1 7h11M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <span className="t-small">Antwort innerhalb von 24 Stunden</span>
          </div>
          <p className="t-small mt-10">
            Mehr zum Gesamtsystem im{" "}
            <Link href="/immobilienmarketing" className="btn-link">
              Immobilienmarketing-Hub
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
