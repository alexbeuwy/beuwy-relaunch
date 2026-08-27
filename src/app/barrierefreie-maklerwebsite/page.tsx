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
 * Wissens-Seite — /barrierefreie-maklerwebsite (R3-SEITENPLAN.json, Cluster
 * C, Rechtsthema BFSG). Angle verlangt eine Einordnung ohne Panik plus die
 * 10 wirksamsten Maßnahmen, deshalb hier eine Nummern-Liste (zehn Punkte)
 * statt Checkliste — /website-relaunch-makler nutzt die Häkchen-Checkliste
 * bereits, hier soll die Bauplan-Vorgabe "nicht jede Seite gleich" sichtbar
 * bleiben. Rechtsteil bleibt bewusst gehedged (BFSG-Anwendungsbereich ist
 * eine Einzelfallfrage, keine Rechtsberatung), passend zur Vorgabe für
 * BFSG/DSGVO-Themen. Beweis läuft als Text-Anriss (17 Jahre). Foto 10 laut
 * Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Barrierefreie Maklerwebsite: Pflicht, Chance und Praxis (BFSG) | beuwy",
  description:
    "Barrierefreie Maklerwebsite nach BFSG: wer wirklich betroffen ist, die 10 wirksamsten Maßnahmen für den Alltag, und warum sie die Conversion erhöhen.",
  openGraph: {
    title: "Barrierefreie Maklerwebsite: Pflicht, Chance und Praxis (BFSG) | beuwy",
    description:
      "BFSG ohne Panik eingeordnet, die 10 wirksamsten Maßnahmen für eine barrierefreie Maklerwebsite, und warum sie mehr Anfragen bringt, nicht nur Compliance erfüllt.",
    type: "website",
    locale: "de_DE",
  },
};

const MASSNAHMEN = [
  {
    titel: "Farbkontrast prüfen",
    text: "Text zu Hintergrund mindestens im Verhältnis 4,5 zu 1, besonders dort, wo helle Akzentfarbe auf hellem Grund steht. Ein einfacher Kontrast-Checker reicht für die erste Prüfung jeder Seite.",
  },
  {
    titel: "Tastatur-Bedienbarkeit",
    text: "Jede Funktion muss ohne Maus erreichbar sein, mit sichtbarem Fokus-Rahmen statt eines entfernten Outline-Stils. Wer per Tab durch das Kontaktformular springt, muss jederzeit sehen, wo er gerade steht.",
  },
  {
    titel: "Alt-Texte für jedes Bild",
    text: "Exposé-Fotos und Grundrisse bekommen einen beschreibenden Alt-Text, nicht nur Dekor-Bilder eine leere Zeile. Ein Screenreader-Nutzer soll ein Objekt verstehen können, ohne ein einziges Foto zu sehen.",
  },
  {
    titel: "Klare Formularlabels",
    text: "Jedes Feld trägt ein sichtbares Label, Fehlermeldungen erscheinen als Text, nicht nur als rote Umrandung. Ein Kontaktformular, das nur über Farbe kommuniziert, was falsch ist, verliert Anfragen, nicht nur Barrierefreiheits-Punkte.",
  },
  {
    titel: "Saubere Überschriften-Hierarchie",
    text: "Eine H1 pro Seite, H2 und H3 in der richtigen Reihenfolge, keine Sprünge nur wegen der optischen Größe. Das hilft Screenreadern beim Navigieren und macht die Seite nebenbei für Google leichter lesbar.",
  },
  {
    titel: "Skalierbare Schrift",
    text: "Zoom bis 200 Prozent ohne Layoutbruch, keine festen Pixel-Höhen für Textblöcke. Wer die Schrift auf dem Handy vergrößert, soll noch immer das ganze Exposé lesen können, nicht nur die Hälfte eines abgeschnittenen Absatzes.",
  },
  {
    titel: "Verständliche Sprache",
    text: "Kurze Sätze, Fachbegriffe erklärt, vor allem auf Finanzierungs- und Ablaufseiten. Das hilft älteren Verkäufern genauso wie jedem, der eine Immobilienseite nebenbei auf dem Handy liest.",
  },
  {
    titel: "Untertitel für Videos",
    text: "Objekt-Rundgänge und Imagefilme bekommen Untertitel, nicht nur Ton. Wer ein Video ohne Kopfhörer im Wartezimmer oder Zug ansieht, versteht sonst nur die Hälfte des Inhalts.",
  },
  {
    titel: "Nie nur Farbe als Signal",
    text: "Ein Pflichtfeld oder ein Status wird zusätzlich mit Text oder Symbol markiert, nicht nur mit einer Farbe. Menschen mit Farbsehschwäche sind ein Teil jeder Zielgruppe, auch wenn es im Alltag selten auffällt.",
  },
  {
    titel: "Barrierefreiheitserklärung veröffentlichen",
    text: "Eine kurze Seite mit Stand, bekannten Lücken und einer Kontaktmöglichkeit für Rückmeldungen. Das zeigt, dass Barrierefreiheit ein laufender Prozess ist, kein einmaliges Häkchen.",
  },
] as const;

const FAQS = [
  {
    q: "Gilt das BFSG auch für kleine Maklerbüros?",
    a: "Für reine Dienstleistungen gibt es eine Ausnahme für Kleinstunternehmen mit weniger als 10 Mitarbeitenden und begrenztem Jahresumsatz. Ob diese Ausnahme im eigenen Fall greift und ob die Website überhaupt in den Anwendungsbereich fällt, ist eine Einzelfallfrage. Das ist keine Rechtsberatung.",
  },
  {
    q: "Ab wann muss eine Website barrierefrei sein?",
    a: "Das BFSG gilt seit dem 28. Juni 2025 für neue, in den Anwendungsbereich fallende digitale Dienstleistungen, für bestehende Angebote existieren teils längere Übergangsfristen. Die genaue Frist für Ihre konkrete Website klärt im Zweifel ein Anwalt für IT- oder Wettbewerbsrecht.",
  },
  {
    q: "Reicht ein Overlay-Plugin für automatische Barrierefreiheit?",
    a: "Nein, in der Praxis meist nicht. Solche Plugins legen eine Schicht über bestehenden Code, ohne die zugrunde liegende Struktur zu verändern. Screenreader stolpern trotzdem über fehlende Labels oder eine falsche Überschriften-Reihenfolge. Echte Fixes passieren im Code, nicht per Zusatz-Skript.",
  },
  {
    q: "Ist diese Seite eine Rechtsberatung zum BFSG?",
    a: "Nein. Diese Seite ordnet ein, was Barrierefreiheit für eine Maklerwebsite praktisch bedeutet, und zeigt wirksame Maßnahmen. Eine rechtssichere Bewertung, ob und in welchem Umfang Ihre Website unter das Gesetz fällt, ersetzt das nicht. Das gehört in die Hände einer Fachperson.",
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

export default function BarrierefreieMaklerwebsitePage() {
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
            <p className="t-label !text-ink-yellow">BFSG für Makler</p>
            <h1 className="t-display mt-4">
              {rich("Barrierefreie Maklerwebsite: Pflicht, Chance und *Praxis*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Das hängt vom Einzelfall ab: Das Barrierefreiheitsstärkungsgesetz verpflichtet seit
              Juni 2025 bestimmte digitale Dienstleistungen gegenüber Verbrauchern, etwa
              E-Commerce, Bankdienstleistungen oder Reiseinformationsdienste. Immobilienvermittlung
              zählt nicht zu diesen benannten Kategorien, eine reine Exposé- und Kontaktseite fällt
              in den meisten Fällen nicht direkt unter das Gesetz.{" "}
              <Highlight>
                Sobald Ihre Website einen echten Vertragsabschluss im elektronischen
                Geschäftsverkehr ermöglicht, kann sich das ändern
              </Highlight>
              . Eine rechtssichere Einzelfallprüfung ersetzt dieser Absatz nicht.
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
                src={maklerAsset(10)}
                alt="Bildschirm zeigt eine Maklerwebsite mit hohem Kontrast und sichtbarem Tastatur-Fokus"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Warum es hilft — kurzer Nutzen-Absatz vor der Liste ─────────── */}
      <section id="nutzen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Mehr als Compliance"
              titel="Barrierefreiheit ist ein *Conversion*-Hebel, kein Bußgeld-Thema."
              sub="Viele Verkäufer sind über 60, geerbte Objekte bringen oft noch ältere Angehörige ins Spiel. Höherer Kontrast hilft beim Lesen im hellen Garten, klare Formularlabels senken Abbrüche, und eine saubere Überschriften-Struktur macht dieselbe Seite auch für Google leichter lesbar."
              className="max-w-[720px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Die 10 Maßnahmen — Nummern-Liste ─────────────────────────────── */}
      <section id="massnahmen" className="bg-bg-base">
        <div className="mx-auto max-w-[900px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Maßnahmen"
              titel="Zehn Punkte, die im Alltag *tatsächlich* etwas ändern."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 space-y-8">
            {MASSNAHMEN.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 30}>
                <div className="grid gap-3 border-t border-line-subtle pt-6 sm:grid-cols-[3rem_1fr]">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{punkt.titel}</p>
                    <p className="t-body mt-2">{punkt.text}</p>
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
          <GelbeKarte label="Der Unterschied" titel="Barrierefrei ist kein Compliance-Häkchen." glyph>
            Ein Overlay-Plugin erzeugt den Anschein von Barrierefreiheit, ohne die Struktur darunter
            zu ändern. Ein Portal, das von Anfang an mit klarem Kontrast, echten Alt-Texten und
            sauberer Überschriften-Hierarchie gebaut wird, ist für Screenreader lesbar und für
            Google gleich mit dazu, ohne ein zweites Projekt und ohne nachträgliches Flicken.
          </GelbeKarte>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              17 Jahre Markenarbeit, davor für Bosch, Continental und Michelin. Ein Portal entsteht
              bei beuwy in vier bis sechs Wochen. Diese zehn Maßnahmen sind darin von Anfang an
              enthalten, statt später in ein bestehendes System gepresst zu werden.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *Einordnung* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub und Spec-Links ───────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir ein Portal, das *niemanden* ausschließt.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie ein technischer Neuaufbau ohne Rankingverlust abläuft, zeigt{" "}
              <Link href="/website-relaunch-makler" className="ref-link">
                Website-Relaunch ohne Sichtbarkeitsverlust
              </Link>
              , welche Fehler eine Maklerwebsite sonst noch kosten{" "}
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
