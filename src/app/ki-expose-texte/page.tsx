import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiCheckLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster K) — /ki-expose-texte. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich: Ja für die Rohfassung,
 * nein für die Objektwahrheit. Hauptteil: Stil-Leitplanken als Checkliste,
 * ein konkretes Vorher/Nachher-Beispiel mit einer erfundenen, unbelegten
 * Behauptung im Rohtext (Risiko irreführender Werbung, sachlich benannt,
 * keine Rechtsberatung), GelbeKarte, Beweis-Anriss, FAQ inkl.
 * Haftungsfrage + FAQPage-JSON-LD. Foto 10 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "KI-Exposé-Texte: Gut genug für den Alleinauftrag? | beuwy",
  description:
    "KI-Exposé-Texte: gut für die Rohfassung, nicht für die Objektwahrheit. Stil-Leitplanken, ein Vorher/Nachher-Beispiel und die Haftungsfrage klar beantwortet.",
  openGraph: {
    title: "KI-Exposé-Texte: Gut genug für den Alleinauftrag? | beuwy",
    description:
      "Wo KI-Exposé-Texte eine gute Rohfassung liefern und wo die Objektwahrheit anfängt: Leitplanken, ein Beispiel und die Haftungsfrage.",
    type: "website",
    locale: "de_DE",
  },
};

const LEITPLANKEN = [
  "Jede Zahl im Text stammt aus geprüften Objektunterlagen, nie aus einer Annahme der KI.",
  "Zustand ehrlich beschreiben, auch Mängel wie fehlender Aufzug oder Sanierungsstau.",
  "Keine Übertreibungen wie „Traumhaus“ oder „einmalig“ ohne einen Beleg dahinter.",
  "Aktive, konkrete Sprache statt Floskeln, die jedes zweite Exposé auch verwendet.",
  "Ein Mensch liest die Fassung laut, bevor sie online geht.",
] as const;

const FAQS = [
  {
    q: "Erkennt Google KI-generierte Exposé-Texte und bestraft sie?",
    a: "Google bewertet nach Nutzen und Genauigkeit des Inhalts, nicht danach, wie er entstanden ist. Ein sauber geprüfter, korrekter Text hat keinen Nachteil. Ein erkennbar automatisch wirkender, ungeprüfter Text schadet eher dem Vertrauen des Lesers als dem Ranking.",
  },
  {
    q: "Haftet der Makler für Fehler in einem KI-generierten Text?",
    a: "Der Makler veröffentlicht das Exposé, also trägt er die Verantwortung für dessen Inhalt, unabhängig davon, welches Werkzeug den Text vorformuliert hat. Das ist eine allgemeine Einordnung, keine Rechtsberatung im Einzelfall.",
  },
  {
    q: "Wie viel Zeit spart das wirklich?",
    a: "Die Rohfassung steht in ein bis zwei Minuten statt in zwanzig. Die Prüfung und Veredelung braucht weiterhin Zeit, weil sie nicht entfallen darf. Unterm Strich bleibt trotzdem eine spürbare Zeitersparnis pro Exposé.",
  },
  {
    q: "Kann ich auch Fotos von KI beschreiben lassen?",
    a: "Technisch ja, inhaltlich mit Vorsicht. Eine KI erkennt sichtbare Merkmale wie einen Balkon oder eine offene Küche, aber nicht, ob eine Wand tatsächlich tragend ist oder ein Boden frisch verlegt wurde. Auch hier gilt: Rohfassung ja, letzte Prüfung durch eine Person.",
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

export default function KiExposeTextePage() {
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
            <p className="t-label !text-ink-yellow">KI im Maklerbüro</p>
            <h1 className="t-display mt-4">
              {rich("KI-Exposé-Texte: gut für den *Rohtext*, nicht für die Wahrheit.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ja, für die Rohfassung: KI verwandelt Eckdaten in Sekunden in einen ersten,
              lesbaren Fließtext. Nein, für die Objektwahrheit:{" "}
              <Highlight>sie kennt weder den echten Zustand des Bades noch, ob die
              „ruhige Lage“ stimmt</Highlight>, und erfindet plausible Details, wenn Angaben
              fehlen. Zwischen beidem liegt die Arbeit, die bei Ihnen bleibt: prüfen, korrigieren,
              veredeln, bevor der Text den Alleinauftrag rechtfertigt.
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
                alt="Makler vergleicht einen Textentwurf am Bildschirm mit den Objektunterlagen auf Papier"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stil-Leitplanken — Checkliste ────────────────────────────────────── */}
      <section id="leitplanken" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Leitplanken"
              titel="Fünf Regeln, bevor ein KI-Text online *geht*."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-10 max-w-[640px] space-y-4">
              {LEITPLANKEN.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent-wash">
                    <RiCheckLine className="h-4 w-4 text-ink-cream" />
                  </span>
                  <span className="t-body">{punkt}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Vorher/Nachher — konkretes Beispiel ──────────────────────────────── */}
      <section id="beispiel" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ein Beispiel"
              titel="Dieselben Eckdaten, zwei sehr *unterschiedliche* Texte."
              sub="Objekt: 3-Zimmer-Altbauwohnung, 78 m², Balkon, Baujahr 1905, saniert 2018, dritter Stock ohne Aufzug."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">KI-Rohtext, ungeprüft veröffentlicht</p>
                <p className="t-body mt-4">
                  &bdquo;Diese Wohnung ist ein wahres Schmuckstück mit traumhaftem Ausblick und
                  bietet auf 78 m² alles, was das Herz begehrt. Eine Rarität für Liebhaber
                  gepflegter Altbauten.&ldquo;
                </p>
                <p className="t-small mt-4">
                  Problem: „traumhafter Ausblick“ ist unbelegt, der fehlende Aufzug fehlt ganz.
                  Beides riskiert eine Diskussion beim Besichtigungstermin, im schlimmsten Fall
                  eine irreführende Aussage im Exposé.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">Geprüfte, veredelte Fassung</p>
                <p className="t-body mt-4">
                  &bdquo;Die 78 m² große Altbauwohnung im dritten Stock liegt in einem 1905
                  errichteten und 2018 sanierten Haus, mit Balkon zum ruhigen Innenhof. Ein
                  Aufzug ist nicht vorhanden, die Deckenhöhe und die sanierte Bausubstanz prägen
                  den Charakter der Wohnung.&ldquo;
                </p>
                <p className="t-small mt-4">
                  Jede Angabe stammt aus den Objektunterlagen, der fehlende Aufzug steht bewusst
                  im Text statt im Kleingedruckten.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Die Grenze — GelbeKarte, Haftung sachlich benannt ───────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Die Grenze" titel="Ihre Unterschrift steht am Ende, nicht die der KI." glyph>
              Ein Exposé mit einer erfundenen Eigenschaft ist keine kleine Ungenauigkeit, sondern
              ein Risiko für Vertrauen und im Zweifel für die Zulässigkeit der Werbung. KI liefert
              den Rohtext. Die Prüfung gegen die echten Objektunterlagen bleibt bei Ihnen, jedes
              einzelne Mal.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Prompt-Versuch</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              {rich("*Siebzehn* Jahre Markenarbeit — Texte, die einer Prüfung standhalten.")}
            </p>
            <p className="t-body mt-4 max-w-[52ch]">
              Dieselbe Sorgfalt, mit der wir Investorenunterlagen für die Vision Group aufgesetzt
              haben, wenden wir auf jedes Exposé an, das über unser System läuft.
            </p>
            <Link href="/exposes-die-verkaufen" className="ref-link mt-6 inline-block">
              Wie ein verkaufendes Exposé aufgebaut ist →
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
              titel="Was Sie vor dem *ersten* KI-Exposé wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Exposés, die dem *Alleinauftrag* standhalten.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die volle Dramaturgie eines verkaufenden Exposés auf{" "}
              <Link href="/exposes-die-verkaufen" className="ref-link">
                Exposés, die verkaufen
              </Link>
              , weitere Anwendungen rund um ChatGPT im Maklerbüro auf{" "}
              <Link href="/chatgpt-fuer-makler" className="ref-link">
                ChatGPT für Makler
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
