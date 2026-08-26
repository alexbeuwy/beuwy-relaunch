import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * W-Cluster — /markenaufbau-makler (R3-SEITENPLAN.json). Antwort auf
 * "Wie baue ich als Makler eine Marke auf?" direkt im Kopf. Hauptbaustein:
 * eine Nummern-Liste der fünf Markenbausteine, gerahmt von einem
 * Zweispalter Visitenkarte/Instanz und einer GelbeKarte mit der
 * Formel "Wiedererkennung × Beweis". Beweis: Königswege (60→2.300+
 * Partner, Top 10 der deutschen Finanzvertriebe), exakt wie im Angle der
 * Spec verlangt. Kompakter Wissens-Kopf statt 70vh-Hero, Foto 10.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Markenaufbau für Makler: Von der Visitenkarte zur Instanz | beuwy",
  description:
    "Markenaufbau für Makler: von der Visitenkarte zur Instanz, mit Typografie, Bildwelt und Sprache aus einem Guss, belegt am Beispiel 60 auf über 2.300 Partner.",
  openGraph: {
    title: "Markenaufbau für Makler: Von der Visitenkarte zur Instanz | beuwy",
    description:
      "Fünf Bausteine einer Makler-Marke, von Typografie bis Konsistenz über jeden Kontaktpunkt, und warum Wiedererkennung ohne Beweis Dekoration bleibt.",
    type: "website",
    locale: "de_DE",
  },
};

type Baustein = {
  titel: string;
  text: string;
};

const BAUSTEINE: Baustein[] = [
  {
    titel: "Typografie",
    text: "Eine Schrift für alles, Headlines und Fließtext gleichermaßen. Kein Stilbruch zwischen Exposé, Website und Visitenkarte, der bei jedem Kontaktpunkt neu erklärt werden muss.",
  },
  {
    titel: "Bildwelt",
    text: "Ein Bildstil in Licht, Perspektive und Farbstimmung, der auf jedem Kanal wiedererkennbar bleibt, statt fünf verschiedener Fotografen-Handschriften über die Jahre.",
  },
  {
    titel: "Sprache",
    text: "Ein Ton, der sich in der E-Mail genauso liest wie im Exposé und im Social-Media-Profil. Sie-Form oder Du-Form, sachlich oder persönlich, aber überall dieselbe Entscheidung.",
  },
  {
    titel: "Farbwelt",
    text: "Eine Akzentfarbe statt eines Regenbogens aus wechselnden Vorlagen. Wiedererkennung entsteht durch Wiederholung, nicht durch Abwechslung.",
  },
  {
    titel: "Konsistenz über jeden Kontaktpunkt",
    text: "Visitenkarte, Website, Exposé, Social-Profil und E-Mail-Signatur zeigen dieselbe Marke, nicht fünf verschiedene Layouts aus fünf verschiedenen Jahren.",
  },
];

const FAQS = [
  {
    q: "Wie lange dauert der Markenaufbau als Makler?",
    a: "Die sichtbaren Bausteine, Typografie, Bildwelt und Website, stehen meist innerhalb von vier bis acht Wochen. Bis die Marke im Markt als Instanz wahrgenommen wird, vergehen typischerweise mehrere Monate konsequenter Anwendung über jeden Kontaktpunkt.",
  },
  {
    q: "Brauche ich einen neuen Namen oder reicht ein neuer Auftritt?",
    a: "In den meisten Fällen reicht ein neuer Auftritt. Ein Namenswechsel lohnt sich nur, wenn der bestehende Name bereits negativ belegt ist oder die neue Positionierung inhaltlich nicht mehr zu ihm passt.",
  },
  {
    q: "Lohnt sich Markenaufbau, wenn ich schon lange am Markt bin?",
    a: "Gerade dann. Ein langjähriger Makler hat oft schon den Beweis, die belegten Ergebnisse und Referenzen, aber keinen Auftritt, der das zeigt. Der Markenaufbau macht sichtbar, was an Vertrauen bereits vorhanden ist.",
  },
  {
    q: "Was kostet Markenaufbau im Vergleich zu laufender Werbung?",
    a: "Markenaufbau ist eine einmalige Investition mit langer Wirkdauer, Werbung eine laufende Ausgabe, die mit jeder Pause endet. Beides ergänzt sich: Eine Anzeige auf einer austauschbaren Marke verpufft schneller als dieselbe Anzeige auf einer erkennbaren.",
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

export default function MarkenaufbauMaklerPage() {
  const koenigswege = caseBySlug("koenigswege");

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

      {/* ── Kompakter Wissens-Kopf ───────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="t-label !text-ink-yellow">Wachstum</p>
          <h1 className="t-display mt-5 max-w-[22ch]">
            {rich("Vom Visitenkarten-Logo zur *Instanz* am Markt.")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">
            Sie bauen als Makler eine Marke auf, indem Typografie, Bildwelt und Sprache über
            jeden Kontaktpunkt hinweg gleich bleiben, Website, Exposé, Visitenkarte,
            Social-Media-Profil, und indem diese Konsistenz mit belegten Ergebnissen unterfüttert
            wird, nicht nur mit einem neuen Logo. Wiedererkennung ohne Beweis bleibt Dekoration,
            Beweis ohne Wiedererkennung verpufft beim nächsten Kontaktpunkt. Erst beides zusammen
            macht aus einer Visitenkarte eine Instanz, an der in der Region niemand vorbeikommt.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ZusammenarbeitCta />
            <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
          </div>
        </div>
      </section>

      {/* ── Foto-Band ────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src={maklerAsset(10)}
              alt="Team stimmt Typografie und Bildsprache eines Markenauftritts ab"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Fünf Bausteine — Nummern-Liste ───────────────────────────── */}
      <section id="bausteine" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die fünf Bausteine"
              titel="Eine Marke ist kein Logo. Sie ist ein *Guss*."
              sub="Fünf Entscheidungen, einmal getroffen, dann überall gleich angewendet. Nicht fünf verschiedene Vorlagen, die zufällig dieselbe Akzentfarbe teilen."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 divide-y divide-line-subtle border-t border-line-subtle">
            {BAUSTEINE.map((b, i) => (
              <Reveal key={b.titel} delay={i * 60}>
                <div className="grid gap-3 py-7 md:grid-cols-[3rem_14rem_1fr] md:items-baseline md:gap-10">
                  <span className="font-display text-[22px] font-bold text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="t-h3">{b.titel}</p>
                  <p className="t-body">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visitenkarte vs. Instanz — Zweispalter ──────────────────── */}
      <section id="unterschied" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zwei Ergebnisse desselben Aufwands"
              titel="Der Unterschied zeigt sich nicht am Logo, sondern am *Empfang*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-line-subtle pt-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-label">Visitenkarten-Marke</p>
              <p className="t-h3 mt-3">Logo, Foto, Kontaktdaten. Austauschbar.</p>
              <p className="t-body mt-3">
                Der Auftritt existiert, aber niemand erinnert sich an ihn, sobald das Gespräch
                vorbei ist. Beim nächsten Vergleich zählt nur noch, was auf dem Papier steht.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-label">Instanz-Marke</p>
              <p className="t-h3 mt-3">Wiedererkennung plus Beweis. Erste Wahl.</p>
              <p className="t-body mt-3">
                Empfehlungsgeber nennen den Namen automatisch, weil er mit einem klaren Bild
                verbunden ist. Eigentümer haben den Auftritt oft schon gesehen, bevor sie
                überhaupt anrufen.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte
              label="Die Formel"
              titel="Marke = Wiedererkennung × Beweis."
              glyph
            >
              Fehlt einer der beiden Faktoren, bleibt das Ergebnis null. Wiedererkennung ohne
              Beweis ist ein hübsches Logo ohne Substanz. Beweis ohne Wiedererkennung ist eine
              gute Zahl, die niemand mit Ihnen verbindet.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Königswege 60 → 2.300+ ──────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Marke und Auftritt komplett neu aufgesetzt: aus 60 Personen beim Start der
              Zusammenarbeit wurden über 2.300 Partner unter einer Marke, heute Top 10 der
              deutschen Finanzvertriebe.
            </p>
          </Reveal>
          {koenigswege ? (
            <div className="mt-10">
              <CaseGrid cases={[koenigswege]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              Weitere Fallstudien ansehen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *ersten* Rebrand wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Instanz*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Marke setzt eine klare Positionierung voraus. Vertiefend dazu:{" "}
              <Link href="/makler-positionierung" className="ref-link">
                Makler-Positionierung
              </Link>
              . Weitere belegte Ergebnisse in den{" "}
              <Link href="/cases" className="ref-link">
                Fallstudien
              </Link>
              , den Überblick über alle Bausteine zeigt der{" "}
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
