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
 * Wissens-Seite — /makler-newsletter-beispiele (R3-SEITENPLAN.json, Cluster
 * C). Angle verlangt sieben konkrete Mail-Anlässe mit Betreff+Aufbau als
 * Hauptbaustein, deshalb hier eine nummerierte Liste statt Grid oder
 * Tabelle — jeder Punkt bekommt Raum für Betreffzeile und Aufbau. Die
 * geforderte Abgrenzung Massen-Newsletter vs. Datenmail läuft als
 * Zweispalter direkt danach. Beweis läuft als Text-Anriss (17 Jahre),
 * DSGVO-Frage landet vorsichtig gerahmt in der FAQ. Foto 8 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Makler-Newsletter, die geöffnet werden: 7 Beispiele zum Übernehmen | beuwy",
  description:
    "Makler-Newsletter, die geöffnet werden: sieben Mail-Anlässe mit Betreff und Aufbau zum Übernehmen — plus die Abgrenzung Massen-Newsletter gegen die persönliche Datenmail.",
  openGraph: {
    title: "Makler-Newsletter, die geöffnet werden: 7 Beispiele zum Übernehmen | beuwy",
    description:
      "Sieben wiederkehrende Mail-Anlässe mit Betreffzeile und Aufbau, direkt zum Übernehmen — und warum eine Datenmail meist mehr bringt als der Massen-Newsletter.",
    type: "website",
    locale: "de_DE",
  },
};

type NewsletterAnlass = { titel: string; betreff: string; aufbau: string };

const ANLAESSE: NewsletterAnlass[] = [
  {
    titel: "Marktbericht zum Quartal",
    betreff: "Ihr Markt in Zahlen: drittes Quartal 2026",
    aufbau:
      "Drei Kennzahlen aus Ihrer Region — Anzahl Verkäufe, Preisentwicklung, durchschnittliche Vermarktungsdauer —, je mit einem Satz Einordnung. Am Ende ein Link zur eigenen Ersteinschätzung, kein Verkaufsdruck.",
  },
  {
    titel: "Neuer Bodenrichtwert",
    betreff: "Der neue Bodenrichtwert für Ihren Stadtteil ist da",
    aufbau:
      "Kurz erklären, was sich geändert hat und was das für Eigentümer in der Praxis bedeutet. Direkt darunter der Rechner, damit der Empfänger die neue Zahl für die eigene Adresse sieht, statt nur eine allgemeine Aussage zu lesen.",
  },
  {
    titel: "Zinsschritt der EZB",
    betreff: "Was der jüngste Zinsschritt für Ihren Verkaufspreis bedeutet",
    aufbau:
      "Ein Absatz Kontext, ein Absatz Wirkung auf die Finanzierungskraft von Käufern, kein Prognose-Versprechen. Diese Mail funktioniert besonders gut, wenn sie innerhalb weniger Tage nach der Zinsentscheidung verschickt wird.",
  },
  {
    titel: "Neues Exposé, exklusiv vorab",
    betreff: "Vorab für Sie: Reihenhaus in Ihrer Wunschlage, bevor es online geht",
    aufbau:
      "Kurzer Teaser mit einem Foto, klare Ansage, dass Empfänger dieser Mail das Objekt vor der Portalveröffentlichung sehen. Ein Klick führt direkt zur Terminanfrage, keine lange Objektbeschreibung im E-Mail-Text selbst.",
  },
  {
    titel: "Erfolgsgeschichte eines Verkäufers",
    betreff: "Wie Familie K. in sechs Wochen verkauft hat",
    aufbau:
      "Ausgangslage in zwei Sätzen, Vorgehen in drei Punkten, Ergebnis als Zahl. Diese Mail verkauft nichts, sie baut Vertrauen auf, bevor der nächste Eigentümer überhaupt eine Anfrage stellt.",
  },
  {
    titel: "Jahreswechsel-Dank",
    betreff: "Danke für ein Jahr Vertrauen — und ein kurzer Ausblick",
    aufbau:
      "Persönlicher Ton, ein kurzer Rückblick auf die Region, keine Verkaufsabsicht. Diese Mail hält den Kontakt warm bei allen, die aktuell nicht verkaufen wollen, aber es in zwei Jahren vielleicht tun.",
  },
  {
    titel: "Dank nach dem Notartermin",
    betreff: "Geschafft — und eine kurze Bitte",
    aufbau:
      "Drei Tage nach dem Notartermin verschickt, nicht am selben Tag. Dank für die Zusammenarbeit, dazu die Bitte um eine Google-Bewertung. Der richtige Zeitpunkt entscheidet hier mehr als der Text.",
  },
];

const FAQS = [
  {
    q: "Wie oft sollte ich einen Newsletter verschicken?",
    a: "Ein fester Marktbericht einmal im Monat reicht als Grundrhythmus, dazu kommen anlassbezogene Mails wie ein neuer Bodenrichtwert oder ein Zinsschritt. Wer wöchentlich verschickt, ohne dass sich wöchentlich etwas Relevantes ändert, kassiert vor allem Abmeldungen.",
  },
  {
    q: "Brauche ich für jede dieser sieben Mails eine eigene Vorlage?",
    a: "Ja, aber jede Vorlage bauen Sie einmal und nutzen sie dauerhaft wieder. Wie eine vollständige Sequenz aus mehreren Vorlagen technisch aufgesetzt wird, zeigt E-Mail-Marketing für Immobilienmakler.",
  },
  {
    q: "Ist der Versand an Bestandskontakte DSGVO-konform?",
    a: "Das hängt vom Einzelfall ab: Grundsätzlich brauchen Sie eine Einwilligung, für werbliche Mails an bestehende Kundenbeziehungen gelten enge gesetzliche Ausnahmen. Das ist keine Rechtsberatung — lassen Sie Ihren konkreten Versandprozess von einer Fachperson prüfen, bevor Sie eine Liste anschreiben.",
  },
  {
    q: "Was, wenn ich noch keine E-Mail-Liste habe?",
    a: "Dann beginnt der Aufbau über ein Formular mit echtem Nutzen für den Absender — etwa eine Ersteinschätzung zum eigenen Objekt. Verkäufer ansprechen, bevor sie suchen zeigt, wie sich diese Liste schon vor dem Verkaufsentschluss füllt.",
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

export default function MaklerNewsletterBeispielePage() {
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
            <p className="t-label !text-ink-yellow">Newsletter-Beispiele</p>
            <h1 className="t-display mt-4">
              {rich("Makler-Newsletter, die *geöffnet* werden: 7 Beispiele zum Übernehmen.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Im Makler-Newsletter schreiben Sie über sieben wiederkehrende Anlässe, die einen
              echten Öffnungsgrund liefern: der Marktbericht zum Quartal, ein neuer Bodenrichtwert,
              ein Zinsschritt, ein neues Exposé, eine Erfolgsgeschichte, der Jahreswechsel und der
              Dank nach dem Notartermin.{" "}
              <Highlight>
                Jede Mail beantwortet eine Frage, die der Empfänger gerade hat, statt allgemein für
                sich zu werben
              </Highlight>
              . Ein Massen-Newsletter mit gleichem Inhalt an alle Kontakte bringt dabei weniger als
              eine Datenmail, die auf ein einzelnes Ereignis reagiert.
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
                src={maklerAsset(8)}
                alt="Person entwirft am Bildschirm eine Newsletter-Vorlage für Immobilienmakler"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Die sieben Anlässe — nummerierte Liste mit Betreff+Aufbau ───── */}
      <section id="beispiele" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Sieben Anlässe"
              titel="Jede Mail hat einen *Grund*, keine läuft einfach nur mit."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 space-y-10">
            {ANLAESSE.map((anlass, i) => (
              <Reveal key={anlass.titel} delay={i * 40}>
                <div className="grid gap-3 border-t border-line-subtle pt-6 sm:grid-cols-[3.5rem_1fr]">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{anlass.titel}</p>
                    <p className="t-small mt-2 !text-ink-dim">Betreff: „{anlass.betreff}“</p>
                    <p className="t-body mt-3">{anlass.aufbau}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Abgrenzung — Zweispalter Massen-Newsletter vs. Datenmail ────── */}
      <section id="abgrenzung" className="bg-bg-base">
        <div className="mx-auto max-w-[1000px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Abgrenzung"
              titel="Massen-Newsletter und *Datenmail* sind nicht dasselbe Werkzeug."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <Reveal delay={40}>
              <div className="rounded-[24px] border border-line-subtle p-7">
                <p className="t-label !text-ink-dim">Massen-Newsletter</p>
                <p className="t-body mt-4">
                  Ein Inhalt geht an die gesamte Liste, meist im festen Rhythmus. Gut für
                  Markenpräsenz und Kontinuität, aber jeder Empfänger bekommt dieselbe Zahl, egal
                  ob sie ihn gerade betrifft oder nicht — die Relevanz je Empfänger bleibt niedrig.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-[24px] bg-akzent-wash p-7">
                <p className="t-label !text-ink-dim">Datenmail</p>
                <p className="t-body mt-4">
                  Ausgelöst durch ein Ereignis oder ein Datenmerkmal — ein Objekt in der Region, ein
                  Fristablauf, eine Bewertungsanfrage. Automatisiert versendet, aber persönlich in
                  der Sache: Öffnungs- und Klickrate liegen deutlich über dem Massenversand.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <GelbeKarte label="Der Unterschied" titel="Ein Newsletter ohne Anlass ist Rauschen." glyph>
            Sieben Vorlagen, einmal gebaut, ersetzen den wöchentlichen Griff zur leeren Seite. Jede
            trägt einen konkreten Anlass, keine ist ein weiterer Rundruf ohne Grund. Genau das
            unterscheidet einen Newsletter, der geöffnet wird, von einem, der zwischen Werbung und
            Spam landet.
          </GelbeKarte>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Textbaustein</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              17 Jahre Markenarbeit, davor für Bosch, Continental und Michelin. Vorlagen, die einmal
              sauber gebaut sind, laufen Monate ohne neuen Aufwand — das ist der Unterschied
              zwischen einem System und einem einzelnen Newsletter.
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
              titel="Was Sie vor dem *ersten* Versand wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Sequenz*, keinen weiteren Rundruf.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie eine vollständige Sequenz technisch aufgesetzt wird, zeigt{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                E-Mail-Marketing für Immobilienmakler
              </Link>
              , wie Sie Eigentümer schon vor dem Verkaufsentschluss erreichen{" "}
              <Link href="/verkaeufer-ansprechen" className="ref-link">
                Verkäufer ansprechen, bevor sie suchen
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
