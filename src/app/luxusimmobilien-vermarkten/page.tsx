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
 * Wissensseite (R3 Welle 2, Cluster W) — /luxusimmobilien-vermarkten.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, danach eine
 * Nummern-Liste zu den drei Bausteinen des Angles (Marke als Türöffner,
 * diskrete Funnels, Qualifizierung vor dem Exposé) und eine Checkliste mit
 * Häkchen, an der sich eine seriöse Vermarktung im Segment erkennen lässt.
 * GelbeKarte, textlicher Beweis-Anriss (Vision Group, KKR-Joint-Venture),
 * FAQ + FAQPage-JSON-LD. Foto 14 laut R3-SEITENPLAN.json (Hochformat, per
 * object-cover im 21:9-Band beschnitten).
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Luxusimmobilien vermarkten: Diskretion trifft Sichtbarkeit | beuwy",
  description:
    "Luxusimmobilien vermarkten heißt: Marke als Türöffner, diskrete Funnels statt offener Portalanzeige, Qualifizierung vor dem Exposé. beuwy baut den passenden Auftritt.",
  openGraph: {
    title: "Luxusimmobilien vermarkten: Diskretion trifft Sichtbarkeit | beuwy",
    description:
      "Off-Market-Anspruch und digitale Präsenz schließen sich nicht aus. beuwy baut Marke, diskrete Funnels und Qualifizierung vor dem Exposé für das Premium-Segment.",
    type: "website",
    locale: "de_DE",
  },
};

const BAUSTEINE = [
  {
    titel: "Marke als Türöffner",
    text: "Bevor ein Exposé überhaupt verschickt wird, hat der Käufer Ihre Website, Ihre Sprache und Ihre Bildwelt gesehen. In diesem Segment ersetzt kein Verkaufsgespräch einen Auftritt, der von der ersten Sekunde an die richtige Preisklasse signalisiert.",
  },
  {
    titel: "Diskrete Funnels statt offener Anzeige",
    text: "Statt einer öffentlichen Portalanzeige mit Adresse und Preis steht ein geschützter Bereich: Anfrage vor Einsicht, keine öffentliche Preisnennung, oft eine Diskretionsvereinbarung, bevor Details überhaupt herausgehen.",
  },
  {
    titel: "Qualifizierung vor dem Exposé",
    text: "Ein kurzes Gespräch oder Formular vor dem Versand klärt, ob die Anfrage zur Preisklasse passt, bevor Zeit in eine Besichtigung fließt. Das schützt den Verkäufer vor Neugierigen und den Käufer vor einem Objekt, das nicht zu seinem Budget passt.",
  },
] as const;

const MERKMALE = [
  "Diskretionsvereinbarung, bevor Objektdetails herausgehen",
  "kein öffentlich genannter Angebotspreis in der Anzeige",
  "Qualifizierungsgespräch vor der ersten Besichtigung",
  "Exposé erst nach Freigabe durch Käufer-Check, nicht per Download-Button",
  "eigene Domain statt reiner Portalanzeige als Erstkontakt",
  "Bildsprache, Sprache und Tempo abgestimmt auf die Preisklasse des Objekts",
] as const;

const FAQS = [
  {
    q: "Widersprechen sich Diskretion und digitale Sichtbarkeit nicht?",
    a: "Nein, sie betreffen zwei verschiedene Ebenen. Sichtbar ist die Marke, damit der richtige Käufer überhaupt weiß, dass Sie dieses Segment bedienen. Diskret bleibt das einzelne Objekt, sichtbar wird es erst, nachdem eine Anfrage qualifiziert wurde.",
  },
  {
    q: "Sollte der Preis im Exposé stehen?",
    a: "Im ersten öffentlichen Kontakt meist nicht. Der Preis gehört ins qualifizierte Gespräch oder in das Exposé nach Freigabe, nicht in eine frei zugängliche Anzeige, die jeder ohne Vorprüfung öffnen kann.",
  },
  {
    q: "Brauche ich für jedes Luxusobjekt eine eigene Landingpage?",
    a: "Für außergewöhnliche Einzelobjekte lohnt sich das häufig, weil eine eigene Seite mehr Raum für Bildsprache und Diskretionshinweise bietet als eine Zeile in einer allgemeinen Objektliste. Für das laufende Portfolio reicht meist ein durchgängiger, geschützter Bereich.",
  },
  {
    q: "Lohnen sich Portale wie ImmoScout im Premium-Segment überhaupt?",
    a: "Als ein Kanal unter mehreren ja, als einziger Kanal selten. Portale erreichen Breite, das Premium-Segment entscheidet aber häufig über Empfehlung, Netzwerk und eine Marke, die vor dem ersten Anruf schon Vertrauen aufgebaut hat.",
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

export default function LuxusimmobilienVermarktenPage() {
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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Premium</p>
            <h1 className="t-display mt-4">
              {rich("Luxusimmobilien verkaufen sich über *Vertrauen*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Hochpreisige Immobilien vermarkten Sie, indem Sie zwei scheinbare Gegensätze
              verbinden: den Off-Market-Anspruch, den Käufer in diesem Segment erwarten, und eine
              digitale Präsenz, die{" "}
              <Highlight>genug Vertrauen aufbaut, damit sich der richtige Käufer meldet</Highlight>.
              Die Marke öffnet die Tür, ein diskreter Funnel schützt das einzelne Objekt, und eine
              Qualifizierung vor dem Exposé stellt sicher, dass nur passende Anfragen überhaupt
              Details sehen.
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
                src={maklerAsset(14)}
                alt="Makler bespricht diskret ein hochpreisiges Objekt mit einem Interessenten"
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

      {/* ── Nummern-Liste — die drei Bausteine des Angles ────────────────────── */}
      <section id="bausteine" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Drei Bausteine, bevor das erste *Exposé* rausgeht."
              sub="Alle drei greifen ineinander. Fehlt einer, kippt das Gleichgewicht entweder in Richtung reiner Geheimniskrämerei ohne Anfragen oder in Richtung Portalanzeige ohne Diskretion."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {BAUSTEINE.map((baustein, i) => (
              <Reveal key={baustein.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{baustein.titel}</p>
                  <p className="t-body mt-3">{baustein.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Checkliste — Merkmale einer seriösen Vermarktung im Segment ─────── */}
      <section id="merkmale" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zum Prüfen"
              titel="Woran Sie eine *seriöse* Vermarktung erkennen."
              sub="Sechs Merkmale, die zusammen den Unterschied zwischen einer Premium-Vermarktung und einer Standard-Anzeige mit höherem Preisschild ausmachen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {MERKMALE.map((item, i) => (
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

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Das Exposé ist hier der letzte Schritt." glyph>
              In den meisten Segmenten öffnet das Exposé das Gespräch. Im Premium-Segment ist es
              umgekehrt: Marke und Qualifizierung öffnen das Gespräch, das Exposé folgt erst, wenn
              feststeht, dass die Anfrage zum Objekt passt.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Vision Group, Marke als Türöffner zu KKR ─────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Aus einem Dreierteam ohne eigenen Auftritt wurde ein Haus mit 1.450 entwickelten
              Wohneinheiten und einem Joint Venture mit KKR über 160 Mio. €. Ohne Marke kein
              Gespräch mit einem Investor dieser Größenordnung.
            </p>
          </Reveal>
          {vision ? (
            <div className="mt-10">
              <CaseGrid cases={[vision]} />
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihren *diskreten* Auftritt.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie sich die richtige Zielgruppe scharf fassen lässt auf{" "}
              <Link href="/makler-positionierung" className="ref-link">
                Makler-Positionierung
              </Link>{" "}
              und wie das Exposé danach aussehen sollte auf{" "}
              <Link href="/exposes-die-verkaufen" className="ref-link">
                Exposés, die verkaufen
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
