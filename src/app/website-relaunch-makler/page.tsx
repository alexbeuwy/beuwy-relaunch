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
 * Wissens-Seite — /website-relaunch-makler (R3-SEITENPLAN.json, Cluster C).
 * Angle nennt Redirect-Plan, Inhalts-Inventur und Messpunkte vorher/nachher
 * als konkrete Bausteine, deshalb hier eine Häkchen-Checkliste (Muster aus
 * /ki-richtlinien-maklerbuero) als Hauptbaustein statt Nummern-Liste oder
 * Tabelle. PainRows zeigt danach die typischen Relaunch-Unfälle, die genau
 * dann passieren, wenn die Checkliste übersprungen wird. Beweis läuft als
 * Text-Anriss (RIEGEL), Cluster-Schwester-Link auf /seo-fuer-immobilienmakler.
 * Foto 9 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Website-Relaunch ohne Sichtbarkeitsverlust: Die Makler-Checkliste | beuwy",
  description:
    "Website-Relaunch ohne Sichtbarkeitsverlust: Redirect-Plan, Inhalts-Inventur und Messpunkte vorher/nachher als Checkliste — inklusive der häufigsten Relaunch-Unfälle.",
  openGraph: {
    title: "Website-Relaunch ohne Sichtbarkeitsverlust: Die Makler-Checkliste | beuwy",
    description:
      "Eine abarbeitbare Checkliste für den Website-Relaunch: Redirect-Plan, Inhalts-Inventur, Messpunkte vorher/nachher — und die Fehler, die Rankings tatsächlich kosten.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Zwei Wochen nach dem Relaunch war die Hälfte der Rankings weg.",
    answer:
      "Fast immer liegt die Ursache nicht am neuen Design, sondern an fehlenden Weiterleitungen. Jede alte URL, die auf eine 404-Seite läuft, verliert ihren Rankingwert, und Google trägt die Seite still aus dem Index aus.",
  },
  {
    quote: "Die neue Seite trug noch das noindex-Tag aus der Staging-Umgebung.",
    answer:
      "Ein einziges vergessenes Meta-Tag reicht, damit Google die neue Seite gar nicht erst aufnimmt. Sechs Wochen Unsichtbarkeit, obwohl der Relaunch technisch längst online war, sind die Folge.",
  },
  {
    quote: "Aus vierzig Unterseiten wurden zwölf — den Rest hat angeblich niemand vermisst.",
    answer:
      "Vermisst hat ihn niemand im Team. Vermisst haben ihn die Suchanfragen, für die genau diese Unterseiten bislang rankten. Ohne Inhalts-Inventur verschwinden Seiten, die tatsächlich Anfragen brachten, einfach in der Zusammenlegung.",
  },
  {
    quote: "Die neue Analytics-Property zählte bei null.",
    answer:
      "Wer für den Relaunch eine neue Property statt der bestehenden anlegt, verliert den kompletten Vorher-Vergleich. Ob der Relaunch tatsächlich funktioniert hat, lässt sich dann nur noch schätzen, nicht mehr belegen.",
  },
];

type ChecklistenGruppe = { titel: string; punkte: string[] };

const GRUPPEN: ChecklistenGruppe[] = [
  {
    titel: "Redirect-Plan",
    punkte: [
      "Jede bestehende URL exportiert und einer neuen Ziel-URL zugeordnet, bevor die alte Seite abgeschaltet wird",
      "301-Redirects gesetzt, dauerhaft, nicht 302 als vermeintlich schnelle Zwischenlösung",
      "Interne Verlinkung auf die neue Struktur nachgezogen, keine internen Links, die über eine Weiterleitung laufen müssen",
    ],
  },
  {
    titel: "Inhalts-Inventur",
    punkte: [
      "Jede bestehende Unterseite bewertet: behalten, zusammenlegen oder bewusst weglassen — nichts fällt einfach durch",
      "robots.txt und Meta-Tags geprüft: Staging-Reste und alte noindex-Anweisungen sind aus der neuen Seite entfernt",
      "Meta-Titel und Descriptions der wichtigsten Seiten übernommen oder gezielt verbessert, nicht ersatzlos gestrichen",
      "Strukturierte Daten aus dem alten Auftritt erneut eingebunden, nicht vergessen",
    ],
  },
  {
    titel: "Messpunkte vorher/nachher",
    punkte: [
      "Rankings, Klicks und Impressionen in der Google Search Console vor dem Umzug dokumentiert",
      "Neue XML-Sitemap erstellt und in der Search Console eingereicht, bestehende Property weiterverwendet",
      "Vier bis sechs Wochen nach dem Livegang: dieselben Werte erneut geprüft, gegen die Vorher-Dokumentation",
    ],
  },
];

const FAQS = [
  {
    q: "Wie lange dauert ein Relaunch, ohne dass Rankings einbrechen?",
    a: "Der technische Umzug selbst läuft an einem Tag. Sicher wird er durch die Vorbereitung davor: Redirect-Tabelle, Inhalts-Inventur und dokumentierte Ausgangswerte, das braucht je nach Seitenumfang ein bis zwei Wochen zusätzlich zum eigentlichen Website-Bau.",
  },
  {
    q: "Was tun, wenn Rankings trotzdem einbrechen?",
    a: "Zuerst die Redirect-Tabelle gegen die tatsächlichen 404-Fehler in der Search Console prüfen, dann die Meta-Robots-Tags kontrollieren. In den meisten Fällen liegt die Ursache in einer dieser beiden Stellen, nicht in einer generellen Google-Abwertung.",
  },
  {
    q: "Muss ich beim Relaunch die Domain wechseln?",
    a: "In den meisten Fällen nein, und das ist auch besser so. Ein Domainwechsel ist eine eigene, riskantere Migration als ein reiner Design- und Technik-Relaunch auf derselben Domain. Ist ein Wechsel unvermeidbar, braucht er einen eigenen, noch sorgfältigeren Plan.",
  },
  {
    q: "Reicht es, nur das Design zu ändern, wenn die URLs gleich bleiben?",
    a: "Dann ist das Risiko deutlich kleiner, ein Redirect-Plan wird meist gar nicht gebraucht. Die Messpunkte vorher und nachher lohnen sich trotzdem, damit eine mögliche Ladezeit- oder Struktur-Änderung nicht unbemerkt bleibt.",
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

function HaekchenIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="shrink-0 text-ink-yellow"
      aria-hidden
    >
      <circle cx="7.5" cy="7.5" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.6 7.7l1.8 1.8 4-4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WebsiteRelaunchMaklerPage() {
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
            <p className="t-label !text-ink-yellow">Website-Relaunch</p>
            <h1 className="t-display mt-4">
              {rich("Website-Relaunch ohne *Sichtbarkeitsverlust*: Die Makler-Checkliste.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Nein, nicht zwangsläufig — Rankings gehen beim Relaunch fast immer durch fehlende
              Weiterleitungen verloren, nicht durch den Relaunch selbst. Mit einem Redirect-Plan
              von jeder alten URL auf ihr neues Ziel, einer vollständigen Inhalts-Inventur und
              dokumentierten Messpunkten vor und nach dem Umzug bleibt der Großteil der Sichtbarkeit
              erhalten.{" "}
              <Highlight>
                Wer die Rankings vor dem Livegang dokumentiert, sieht sofort, ob nach dem Umzug
                etwas fehlt
              </Highlight>
              , statt es erst Wochen später zu bemerken.
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
                src={maklerAsset(9)}
                alt="Bildschirm zeigt eine Redirect-Tabelle während des Website-Relaunchs"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Typische Relaunch-Unfälle — PainRows ────────────────────────── */}
      <section id="unfaelle" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Was ohne Plan passiert"
              titel="Vier *Relaunch-Unfälle*, die sich alle vermeiden lassen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Die Checkliste — drei Gruppen, Häkchen-Punkte ───────────────── */}
      <section id="checkliste" className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Checkliste"
              titel="Drei Gruppen, zehn Punkte, vor dem *Livegang* abgehakt."
              className="max-w-[640px]"
            />
          </Reveal>
          <div className="mt-12 space-y-10">
            {GRUPPEN.map((gruppe, gi) => (
              <Reveal key={gruppe.titel} delay={gi * 60}>
                <div>
                  <p className="t-label !text-ink-dim">{gruppe.titel}</p>
                  <div className="mt-4 space-y-4">
                    {gruppe.punkte.map((punkt) => (
                      <div key={punkt} className="flex items-start gap-3 border-b border-line-subtle pb-4">
                        <span className="mt-0.5">
                          <HaekchenIcon />
                        </span>
                        <p className="t-body">{punkt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <GelbeKarte label="Der Unterschied" titel="Ein Relaunch ist kein Neuanfang bei Google." glyph>
            Google kennt Ihre Domain schon, mit jeder Signalgeschichte, die sie in den letzten
            Jahren aufgebaut hat. Ein Redirect-Plan trägt diese Geschichte in die neue Seite hinüber.
            Ohne ihn fängt Google faktisch bei null an — und Sie mit ihm.
          </GelbeKarte>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Für RIEGEL Immobilien bedeutete der technische Neuaufbau keinen Rankingverlust,
              sondern in denselben sechs Wochen neun Abschlüsse, 342.000 € Volumen und Platz 21 von
              über 25.000 Maklern beim ImmoScout24-Award.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *eigenen* Relaunch wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub und Spec-Links ───────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihren *Relaunch*, ohne Rankingverlust.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie die Seitenarchitektur danach für neue Rankings sorgt, zeigt{" "}
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                SEO für Immobilienmakler
              </Link>
              , welche Fehler einen Relaunch besonders teuer machen{" "}
              <Link href="/makler-website-fehler" className="ref-link">
                Die 11 häufigsten Makler-Website-Fehler
              </Link>
              . Den Überblick über alle Bausteine bietet der{" "}
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
