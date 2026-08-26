import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { AnfrageCta, ClusterAbschluss, Rail, RailListe } from "@/components/ClusterElemente";
import { maklerAsset } from "@/lib/cdn";

/**
 * R2-4 — /immobilienmarketing-agentur (Capture-Seite, Leaf-Auftrag R2-4).
 * Wer „Immobilienmarketing Agentur" googelt, landet hier. Kernlogik:
 * Agentur = Dienstleister für Kampagne/Design, Abrechnung nach Aufwand,
 * Ergebnis = Auftritt. beuwy = Unternehmensberatung, Analyse zuerst, Ergebnis
 * = System (Portal, Funnel, Automatisierung) mit messbaren Mandaten und
 * Deals (BRIEF §9). Fair bleiben wie /bottimmo-alternative: für eine
 * einzelne Kampagne oder reines Design ist eine Agentur die richtige Wahl,
 * das steht hier auch so. „Agentur" bezeichnet ausschließlich die andere
 * Kategorie — beuwy wird an keiner Stelle so genannt (Grep-Gate BRIEF §9).
 * Preisspanne im ersten Absatz stammt unverändert aus den Stufen 02/03 von
 * /maklerwebsite-kosten (Template-Agentur 2.000–8.000 €, individuelle
 * Agentur 8.000–25.000 €) — nichts erfunden, nichts eigenes für beuwy.
 * Foto 10 (Analyse-Szene am Tisch) passt zum „Analyse zuerst"-Argument
 * besser als Foto 2 (reines Porträt) und wird bereits auf dem Hub verwendet
 * — Wiederverwendung von Kampagnenfotos über mehrere Seiten ist im
 * bestehenden System üblich (z. B. Foto 18/19).
 */

export const metadata: Metadata = {
  title: "Immobilienmarketing Agentur gesucht? Warum führende Makler anders wählen | beuwy",
  description:
    "Was eine Immobilienmarketing-Agentur leistet, was sie realistisch kostet und wann eine Unternehmensberatung wie beuwy die passendere Wahl ist: der faire Vergleich, Analyse zuerst statt Kampagne zuerst.",
  alternates: { canonical: "/immobilienmarketing-agentur" },
  openGraph: {
    title: "Immobilienmarketing Agentur gesucht? Warum führende Makler anders wählen",
    description:
      "Der faire Vergleich: was eine Immobilienmarketing-Agentur leistet und kostet, und wofür Immobilienunternehmen inzwischen eine Unternehmensberatung beauftragen.",
    type: "article",
    locale: "de_DE",
  },
};

const RAILS: {
  thema: string;
  linksLabel: string;
  linksText: string;
  rechtsLabel: string;
  rechtsText: string;
}[] = [
  {
    thema: "Start der Zusammenarbeit",
    linksLabel: "Briefing",
    linksText:
      "Sie beschreiben, was entstehen soll: Farben, Wording, ein neues Logo. Die Agentur setzt um, was im Briefing steht.",
    rechtsLabel: "Analyse",
    rechtsText:
      "Wir schauen zuerst auf Zahlen: wo Anfragen heute liegen bleiben, welches CRM läuft, was ein System bringen müsste, damit es sich rechnet.",
  },
  {
    thema: "Abrechnung",
    linksLabel: "Nach Aufwand",
    linksText:
      "Stunden, Projekttage oder ein Paketpreis für Design und Kampagne. Bezahlt wird die Arbeit, unabhängig vom Effekt danach.",
    rechtsLabel: "Nach Diagnose",
    rechtsText:
      "Der Festpreis steht nach der Analyse fest, schriftlich, ausgerichtet an dem, was das System an Mandaten bringen soll.",
  },
  {
    thema: "Ergebnis",
    linksLabel: "Ein Auftritt",
    linksText:
      "Website, Anzeige oder Broschüre: fertige Bausteine, die Sie danach selbst bespielen oder weiter beauftragen.",
    rechtsLabel: "Ein System",
    rechtsText:
      "Portal, Funnel und Automatisierung greifen ineinander und arbeiten weiter, auch wenn gerade niemand am Schreibtisch sitzt.",
  },
  {
    thema: "Betreuung",
    linksLabel: "Wechselndes Team",
    linksText:
      "Account Manager, Grafiker, Texter: Je nach Auslastung der Agentur wechseln die Gesichter, Ihre Anfrage läuft über mehrere Postfächer.",
    rechtsLabel: "Ein Ansprechpartner",
    rechtsText:
      "Eine feste Kontaktperson, jede Anfrage nachvollziehbar im Ticketsystem. Sie fragen nicht zwei Wochen später, wie weit Ihre Anpassung ist.",
  },
];

const FAQ_ITEMS: { q: string; a: ReactNode; aText: string }[] = [
  {
    q: "Ist beuwy eine Agentur?",
    a: (
      <>
        Nein. beuwy ist eine Unternehmensberatung für Immobilienunternehmen. Statt direkt mit
        Design zu starten, beginnen wir mit einer Analyse Ihres Anfragevolumens und Ihres CRM und
        bauen danach ein System aus Portal, Funnel und Automatisierung, mit einem festen
        Ansprechpartner, dessen Arbeit im Ticketsystem nachvollziehbar bleibt.
      </>
    ),
    aText:
      "Nein. beuwy ist eine Unternehmensberatung für Immobilienunternehmen. Statt direkt mit Design zu starten, beginnen wir mit einer Analyse Ihres Anfragevolumens und Ihres CRM und bauen danach ein System aus Portal, Funnel und Automatisierung, mit einem festen Ansprechpartner, dessen Arbeit im Ticketsystem nachvollziehbar bleibt.",
  },
  {
    q: "Wann reicht eine klassische Immobilienmarketing-Agentur?",
    a: (
      <>
        Für eine einzelne Kampagne, ein neues Logo oder reines Design ohne CRM-Anbindung ist eine
        Agentur oft die schnellere und günstigere Wahl. Erst wenn ein System entstehen soll, das
        Anfragen automatisch verarbeitet und Mandate nachweisbar macht, lohnt sich der Wechsel zu
        einer Beratung wie beuwy.
      </>
    ),
    aText:
      "Für eine einzelne Kampagne, ein neues Logo oder reines Design ohne CRM-Anbindung ist eine Agentur oft die schnellere und günstigere Wahl. Erst wenn ein System entstehen soll, das Anfragen automatisch verarbeitet und Mandate nachweisbar macht, lohnt sich der Wechsel zu einer Beratung wie beuwy.",
  },
  {
    q: "Was kostet eine Immobilienmarketing-Agentur im Vergleich zu beuwy?",
    a: (
      <>
        Klassische Agenturen liegen je nach Umfang zwischen 2.000 und 25.000 Euro pro Projekt,
        die realistischen Marktspannen dazu stehen auf unserer Seite{" "}
        <Link href="/maklerwebsite-kosten" className="btn-link">
          Was kostet eine Maklerwebsite
        </Link>
        . Der Preis für ein beuwy-System steht erst nach der Analyse fest, weil er von
        CRM-Anbindung, Objektzahl und Automatisierungsgrad abhängt, und wird schriftlich genannt,
        bevor ein Projekt startet.
      </>
    ),
    aText:
      "Klassische Agenturen liegen je nach Umfang zwischen 2.000 und 25.000 Euro pro Projekt, die realistischen Marktspannen dazu stehen auf unserer Seite zu den Maklerwebsite-Kosten. Der Preis für ein beuwy-System steht erst nach der Analyse fest, weil er von CRM-Anbindung, Objektzahl und Automatisierungsgrad abhängt, und wird schriftlich genannt, bevor ein Projekt startet.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.aText },
  })),
};

function Hero() {
  return (
    <header className="relative bg-bg-base">
      <div className="relative min-h-[70dvh] lg:min-h-[78dvh]">
        {/* Media-Plate: randlos rechts + oben, linke Kante fadet ins Weiß
            (gleiches Muster wie HubHero in /immobilienmarketing). */}
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
          <Image
            src={maklerAsset(10)}
            alt="Fünf Personen besprechen lachend einen Grundriss und Kennzahlen auf Tablets an einer Kücheninsel im Golden-Hour-Licht"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
          <AiPille />
        </div>

        {/* Textspalte */}
        <div className="relative z-10 mx-auto flex min-h-full max-w-[1120px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[78dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1120px)/2))] lg:pr-[54vw] lg:pt-24">
          <Link
            href="/immobilienmarketing"
            className="t-small w-fit transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
          >
            ← Zur Immobilienmarketing-Übersicht
          </Link>
          <p className="t-label !text-ink-yellow mt-8">Vergleich · Immobilienmarketing Agentur</p>
          <h1 className="t-display mt-5 max-w-[20ch]">
            {rich("Immobilienmarketing Agentur gesucht? Führende Makler wählen *anders*.")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[36rem]">
            Eine Immobilienmarketing-Agentur liefert Kampagnen und ein neues Design. Wer schon zu
            den führenden Häusern seiner Stadt zählt, will mehr: eine Analyse zuerst, danach ein
            System, das Anfragen von selbst in Mandate verwandelt.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <AnfrageCta href="/anfrage" />
            <Link
              href="#einordnung"
              className="text-[14px] font-medium text-ink-muted underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream"
            >
              Was eine Agentur wirklich leistet ↓
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ImmobilienmarketingAgenturPage() {
  return (
    <>
      <Hero />

      {/* ── Einordnung: Suchfrage wörtlich beantwortet ─────────────── */}
      <section id="einordnung" className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Einordnung"
              titel="Was eine Immobilienmarketing-Agentur *leistet*, und was sie kostet."
              className="max-w-[720px]"
            />
            <div className="mt-8 max-w-[62ch] space-y-5">
              <p className="t-body">
                Eine Immobilienmarketing-Agentur plant, gestaltet und betreut Kampagnen für
                Immobilienmakler: Anzeigen, Website, Broschüren, gelegentlich auch die Betreuung
                der Social-Media-Kanäle. Abgerechnet wird nach Projekt oder nach Aufwand, üblich
                sind zwischen 2.000 Euro für ein Template-Projekt und 25.000 Euro für eine
                individuelle Konzeption, so die realistischen Marktspannen auf unserer Seite{" "}
                <Link href="/maklerwebsite-kosten" className="btn-link">
                  Was kostet eine Maklerwebsite
                </Link>
                . Am Ende der Zusammenarbeit steht ein Auftritt: eine Website, eine Anzeigenserie,
                ein neues Logo.
              </p>
              <p className="t-body">
                beuwy setzt vor dem Design an. Bevor ein Entwurf entsteht, steht die Analyse: wo
                Anfragen heute liegen bleiben, welches CRM im Hintergrund läuft und wie viele
                Mandate ein neues System pro Jahr bräuchte, damit es sich rechnet. Aus dieser
                Analyse entsteht kein einzelner Auftritt, sondern{" "}
                <Highlight>ein System aus Portal, Funnel und Automatisierung</Highlight>. Das
                Ergebnis sind keine schönen Bilder, sondern messbare Mandate und Deals, betreut
                von einem Ansprechpartner, dessen Arbeit im Ticketsystem nachvollziehbar bleibt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gegenüberstellung ────────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <SektionsKopf eyebrow="Der Unterschied" titel="Agentur-Modell. Oder *Beratungs-Modell*." />
          <RailListe className="mt-8">
            {RAILS.map((r, i) => (
              <Reveal key={r.thema} delay={i * 60}>
                <Rail>
                  <p className="t-label !text-[10.5px]">{r.thema}</p>
                  <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-12">
                    <div>
                      <p className="t-h3">{r.linksLabel}</p>
                      <p className="t-body mt-2 max-w-[36ch]">{r.linksText}</p>
                    </div>
                    <div className="md:border-l md:border-line-subtle md:pl-12">
                      <p className="t-h3">{r.rechtsLabel}</p>
                      <p className="t-body mt-2 max-w-[36ch]">{r.rechtsText}</p>
                    </div>
                  </div>
                </Rail>
              </Reveal>
            ))}
          </RailListe>
        </div>
      </section>

      {/* ── Für wen eine Agentur reicht / für wen nicht ─────────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ehrlich gesagt"
              titel="Nicht jede Aufgabe braucht eine *Unternehmensberatung*."
            />
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">Für wen eine Agentur die richtige Wahl bleibt</p>
                <p className="t-body mt-3 max-w-[40ch]">
                  Für eine einzelne Kampagne, ein neues Logo oder reines Design ohne Anbindung an
                  CRM oder Automatisierung. Wenn die Aufgabe klar umrissen ist und danach niemand
                  ein System pflegen muss, ist eine Agentur oft schneller und günstiger. Eine
                  vernünftige Entscheidung, keine Notlösung.
                </p>
              </div>
              <div className="border-t border-line-subtle pt-6">
                <p className="t-h3">Für wen beuwy richtig ist</p>
                <p className="t-body mt-3 max-w-[40ch]">
                  Für Makler, Projektentwickler, Bauträger und Vertriebsteams, die ihren Vorsprung
                  ausbauen wollen: mehr Mandate, mehr Deals, weniger liegen gebliebene Anfragen.
                  Hier zahlt sich Analyse vor Design aus, weil ein System mehr trägt als ein
                  einzelner Auftritt.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ + FAQPage-JSON-LD ────────────────────────────────────── */}
      <section className="border-t border-line-subtle bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 lg:px-10 lg:py-28">
          <SektionsKopf
            eyebrow="Häufige Fragen"
            titel="Agentur oder Beratung: Was Sie *vorher* wissen sollten."
          />
          <div className="mt-12">
            <FaqAccordion items={FAQ_ITEMS.map(({ q, a }) => ({ q, a }))} />
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* ── GelbeKarte-Finale + CTA ───────────────────────────────────── */}
      <ClusterAbschluss
        karteLabel="Für Ihr Haus"
        karteTitel="Eine Agentur liefert einen Auftritt. Wir liefern ein System, das Mandate bringt."
        karteText="Kampagnen und Design sind das Handwerk einer Agentur. Wir fangen bei der Analyse an und bauen danach ein System aus Portal, Funnel und Automatisierung, mit einem Ansprechpartner, der jede Anfrage im Ticketsystem nachweisbar bearbeitet."
        schlussTitel="Sprechen wir über Ihr System, nicht über ein Briefing."
        schlussText="Im ersten Gespräch schauen wir auf Ihr Anfragevolumen und Ihr CRM und sagen Ihnen ehrlich, ob eine Beratung wie beuwy der richtige nächste Schritt ist oder eine klassische Agentur für Ihre Aufgabe reicht."
        primaryHref="/anfrage"
        weitereLinks={[
          { label: "Was kostet eine Maklerwebsite?", href: "/maklerwebsite-kosten" },
          { label: "Website für Makler", href: "/website-fuer-immobilienmakler" },
          { label: "Zur Immobilienmarketing-Übersicht", href: "/immobilienmarketing" },
        ]}
      />
    </>
  );
}
