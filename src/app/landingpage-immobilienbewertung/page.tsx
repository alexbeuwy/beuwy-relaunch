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
 * Wissens-Seite — /landingpage-immobilienbewertung (R3-SEITENPLAN.json,
 * Cluster C). Angle verlangt eine Sektion-für-Sektion-Anatomie am lebenden
 * Beispiel der beuwy-Tools, deshalb hier ein 4-Stufen-Nummern-Rail
 * (Hook, Rechner, Beweis, Formular) statt Zweispalter oder Tabelle — jede
 * Stufe zeigt konkret, was auf /tools/verkaufspreisrechner tatsächlich
 * passiert. Beweis läuft als Text-Anriss (RIEGEL), Traffic-Frage landet in
 * der FAQ mit Verweis auf /performance-marketing-makler. Foto 7 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Die Bewertungs-Landingpage: Anatomie einer Seite, die registriert | beuwy",
  description:
    "Die Bewertungs-Landingpage überzeugt Eigentümer in vier Sektionen: Hook, Rechner, Beweis, Formular — die Seite, die aus einem Klick eine Anfrage macht.",
  openGraph: {
    title: "Die Bewertungs-Landingpage: Anatomie einer Seite, die registriert | beuwy",
    description:
      "Sektion für Sektion am lebenden Beispiel: Hook, Rechner, Beweis, Formular — die Anatomie einer Bewertungs-Landingpage, die Eigentümer tatsächlich konvertiert.",
    type: "website",
    locale: "de_DE",
  },
};

const STUFEN = [
  {
    titel: "Der Hook",
    text: "Headline und Subline stellen die Preisfrage direkt, ohne Umweg über die Firmengeschichte. Wer auf die Seite kommt, weiß in drei Sekunden, dass hier eine Zahl zum eigenen Objekt wartet, keine allgemeine Werbeaussage.",
  },
  {
    titel: "Das Rechner-Modul",
    text: "Adresse eingeben, fertig. Im Hintergrund laufen amtliche Bodenrichtwerte und ausgewertete Vergleichsverkäufe mit, das Ergebnis erscheint mit Score. Genau dieses Modul steht live unter Verkaufspreisrechner.",
  },
  {
    titel: "Der Beweis-Block",
    text: "Bevor das Formular kommt, sieht der Besucher eine belegte Zahl statt eines Werbeversprechens: echte Abschlüsse, echtes Volumen. Das macht die Rechner-Ausgabe glaubwürdig, statt sie wie einen Werbetrick wirken zu lassen.",
  },
  {
    titel: "Das Formular",
    text: "Name, Telefonnummer, Wunschzeitpunkt — mehr nicht. Jedes zusätzliche Feld kostet Abschlüsse. Die Anfrage landet strukturiert im CRM, mit Quelle und Score, nicht als loser Zettel im Postfach.",
  },
] as const;

const FAQS = [
  {
    q: "Muss eine Bewertungs-Landingpage immer einen Rechner haben?",
    a: "Nicht zwingend, aber sie profitiert enorm davon. Ein Formular ohne sofortige Gegenleistung fühlt sich für den Eigentümer wie eine Anfrage bei einer fremden Behörde an. Ein Rechner liefert innerhalb einer Minute etwas Konkretes zurück, bevor überhaupt eine Kontaktdaten-Frage kommt.",
  },
  {
    q: "Wie lang sollte das Formular am Ende sein?",
    a: "So kurz wie möglich für den ersten Schritt: Name, Telefonnummer, ein grober Zeitpunkt. Details wie Wohnfläche oder Zustand fragen Sie im zweiten Schritt oder im ersten Telefonat ab, nicht alle auf einmal in einem Formular, das dann keiner zu Ende ausfüllt.",
  },
  {
    q: "Wohin fließen die Leads aus der Landingpage?",
    a: "Direkt ins CRM, mit Quelle, Score aus dem Rechner und dem nächsten Arbeitsschritt. Kein Copy-Paste aus einem Formular-Postfach, keine Anfrage, die zwischen zwei Mitarbeitern liegen bleibt.",
  },
  {
    q: "Reicht eine Landingpage allein, ohne Anzeigen?",
    a: "Nein. Eine Landingpage ist ein Werkzeug, kein Traffic-Kanal. Ohne Zufluss aus Suche, Anzeigen oder Empfehlung liegt sie nur bereit, aber niemand findet sie. Wie der Zufluss aussieht, zeigt Performance-Marketing für Makler.",
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

export default function LandingpageImmobilienbewertungPage() {
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
            <p className="t-label !text-ink-yellow">Landingpage-Anatomie</p>
            <h1 className="t-display mt-4">
              {rich("Die Bewertungs-Landingpage: Anatomie einer Seite, die *registriert*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Eine Landingpage, die Eigentümer konvertiert, führt in vier Sektionen: ein Hook, der
              die Preisfrage direkt stellt, ein Rechner, der in unter einer Minute eine erste Zahl
              liefert, ein Beweis-Block mit belegten Abschlusszahlen und ein Formular, das nur so
              viel fragt, wie für den nächsten Schritt nötig ist.{" "}
              <Highlight>
                Jede Sektion hat genau eine Aufgabe, keine Sektion wirbt einfach nur für sich
              </Highlight>
              . Am eigenen{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>{" "}
              lässt sich das Muster live nachvollziehen.
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
                src={maklerAsset(7)}
                alt="Bildschirm zeigt den Aufbau einer Landingpage mit Bewertungsrechner und Formular"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Die vier Stufen — Nummern-Rail ───────────────────────────────── */}
      <section id="stufen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Anatomie"
              titel="Vier Stufen. Jede mit *einer* Aufgabe."
              sub="Kein Flyer im Web, sondern ein Funnel: Hook, Rechner, Beweis, Formular — jede Stufe führt den Besucher genau einen Schritt weiter."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {STUFEN.map((stufe, i) => (
              <Reveal key={stufe.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{stufe.titel}</p>
                  <p className="t-body mt-3">{stufe.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Eine Landingpage ist kein digitaler Flyer." glyph>
              Ein Flyer erklärt, wer Sie sind. Eine Landingpage führt einen Besucher in unter zwei
              Minuten vom ersten Klick zu einer qualifizierten Anfrage im CRM. Beides sieht auf den
              ersten Blick ähnlich aus, nur eine der beiden Varianten registriert tatsächlich
              Eigentümer.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Für RIEGEL Immobilien lief genau dieser Aufbau live: Rechner, Beweis, Formular. In
              den ersten sechs Wochen danach neun Abschlüsse, 342.000 € Volumen, Platz 21 von über
              25.000 Maklern beim ImmoScout24-Award.
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
              titel="Was Sie vor dem *eigenen* Aufbau wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Landingpage*, keinen weiteren Flyer.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Das Rechner-Modul aus dieser Anatomie sehen Sie live im{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
              </Link>
              , wie der Zufluss auf die Seite entsteht, zeigt{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                Performance-Marketing für Makler
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
