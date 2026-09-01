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
 * Wissens-Seite — /exposes-die-verkaufen (R3-SEITENPLAN.json, Cluster C).
 * Angle verlangt Dramaturgie, Preis-Argumentation und die Abgrenzung zum
 * Standard-Exposé aus der Software — deshalb hier eine Nummern-Liste (fünf
 * Dramaturgie-Stufen, inklusive Preis-Stufe mit konkretem Beispielsatz) als
 * Hauptbaustein, gefolgt von einem Zweispalter (Datenblatt vs.
 * Entscheidungsdokument) für die Abgrenzung. Beweis läuft über RIEGEL, wo
 * die Preis-Argumentation im Exposé Teil des belegten Ergebnisses war.
 * Foto 1 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Exposés, die verkaufen: Vom Datenblatt zum Entscheidungsdokument | beuwy",
  description:
    "Exposés, die verkaufen, folgen einer Dramaturgie mit Preis-Argumentation statt nackter Zahl. So wird aus dem Software-Datenblatt ein Entscheidungsdokument.",
  openGraph: {
    title: "Exposés, die verkaufen: Vom Datenblatt zum Entscheidungsdokument | beuwy",
    description:
      "Die fünf Stufen eines Exposés, das den Alleinauftrag rechtfertigt — inklusive Preis-Argumentation mit echtem Beispiel, nicht nur eine Zahl im Kopfbereich.",
    type: "website",
    locale: "de_DE",
  },
};

type Stufe = { titel: string; text: string };

const DRAMATURGIE: Stufe[] = [
  {
    titel: "Der Aufschlag",
    text: "Die ersten zwei Seiten entscheiden, ob weitergeblättert wird. Ein großformatiges Foto der Immobilie im besten Licht, eine Überschrift, die die Lage oder das Lebensgefühl benennt, statt „Einfamilienhaus zu verkaufen“. Wer hier ein Datenblatt-Deckblatt zeigt, verliert den Leser, bevor der erste Fakt überhaupt fällt.",
  },
  {
    titel: "Die Fakten, eingebettet statt aufgelistet",
    text: "Wohnfläche, Zimmerzahl, Baujahr gehören ins Exposé, aber nicht als trockene Tabelle direkt nach dem Titelbild. Sie stehen eingebettet in einen Absatz, der erklärt, was die Zahl für den künftigen Bewohner bedeutet: „140 m² verteilt auf zwei Ebenen, das Arbeitszimmer im Erdgeschoss mit eigenem Zugang zur Terrasse.“",
  },
  {
    titel: "Die Preis-Argumentation",
    text: "Der Preis steht nie allein im Raum. Er wird begründet: mit dem Sanierungsstand, mit zwei bis drei Vergleichsobjekten aus der gleichen Straße oder demselben Stadtteil und mit dem Bodenrichtwert. Beispiel: „680.000 € bei einem Bodenrichtwert von 420 €/m² auf 1.200 m² Grundstück, zwei vergleichbare Verkäufe in der Nachbarschaft lagen 2025 bei 640.000 € und 710.000 € — jeweils ohne die neue Heizung, die hier seit 2023 verbaut ist.“ Eine Zahl mit Begründung übersteht eine Preisverhandlung, eine Zahl ohne Begründung nicht.",
  },
  {
    titel: "Der Beweis in Bildern",
    text: "Grundriss maßstabsgetreu und lesbar, Fotos zur Golden Hour statt Mittagslicht mit hartem Schatten, mindestens ein Bild pro Raum in der Reihenfolge eines echten Rundgangs. Ein Energieausweis-Wert steht mit einer Einordnung daneben, nicht als isolierte Buchstaben-Zahl-Kombination, die niemand ohne Fachwissen versteht.",
  },
  {
    titel: "Der Abschluss",
    text: "Das Exposé endet nicht mit „Bei Interesse kontaktieren Sie uns“, sondern mit einem konkreten nächsten Schritt: einem Besichtigungstermin-Vorschlag, einer direkten Telefonnummer, einem QR-Code zur Terminbuchung. Wer bis hierhergelesen hat, ist interessiert — der letzte Satz darf diese Energie nicht verpuffen lassen.",
  },
];

type ZweispalterZeile = { thema: string; standard: string; entscheidung: string };

const VERGLEICH: ZweispalterZeile[] = [
  {
    thema: "Aufbau",
    standard: "Feste Software-Vorlage: Deckblatt, Datenblatt, Fotogalerie, Kontaktseite — in dieser Reihenfolge, egal welches Objekt.",
    entscheidung: "Dramaturgie, die auf das konkrete Objekt zugeschnitten ist: Aufschlag, Fakten, Preis-Argumentation, Beweis, Abschluss.",
  },
  {
    thema: "Preis",
    standard: "Eine Zahl im Kopfbereich, meist ohne Herleitung, direkt neben „Käuferprovision 3,57 %“.",
    entscheidung: "Preis mit Vergleichsobjekten, Bodenrichtwert und Zustand begründet — bevor die Verhandlung beginnt, nicht erst währenddessen.",
  },
  {
    thema: "Sprache",
    standard: "Software-Textbausteine: „Diese gepflegte Immobilie bietet…“ — identisch in hunderten anderen Exposés im selben System.",
    entscheidung: "Konkrete Sätze zum Objekt, die ein zweites Exposé aus demselben System nicht auch enthalten könnte.",
  },
  {
    thema: "Wirkung beim Eigentümer",
    standard: "Der Eigentümer sieht dieselbe Vorlage, die auch drei andere Makler in der Stadt verwenden.",
    entscheidung: "Der Eigentümer sieht einen Auftritt, der die Provision rechtfertigt, bevor über sie gesprochen wird.",
  },
];

const FAQS = [
  {
    q: "Muss jedes Exposé komplett individuell gestaltet werden?",
    a: "Die Dramaturgie bleibt gleich, die Inhalte wechseln pro Objekt. Ein fester Aufbau mit fünf Stufen, gefüllt mit echten Details statt Textbausteinen, ist der praktikable Mittelweg zwischen Handarbeit für jedes Exposé und einer austauschbaren Vorlage.",
  },
  {
    q: "Wie viele Vergleichsobjekte gehören in die Preis-Argumentation?",
    a: "Zwei bis drei reichen meist, mehr wirkt wie eine Marktanalyse statt eines Exposés. Wichtig ist, dass die Objekte wirklich vergleichbar sind — Lage, Größe und Zustand sollten nah genug beieinanderliegen, damit der Vergleich hält.",
  },
  {
    q: "Kann KI die Exposé-Texte schreiben?",
    a: "Für die Rohfassung ja, für die Objektwahrheit nein. Details dazu, wo KI beim Exposé hilft und wo die Grenze liegt, stehen unter KI-Exposé-Texte.",
  },
  {
    q: "Reicht ein gutes Exposé, um den Alleinauftrag zu gewinnen?",
    a: "Ein Baustein von mehreren. Der Eigentümer prüft vorher meist auch die Website und den Google-Auftritt. Wie alle Bausteine zusammenspielen, zeigt Alleinauftrag gewinnen.",
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

export default function ExposesDieVerkaufenPage() {
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
            <p className="t-label !text-ink-yellow">Exposé-Dramaturgie</p>
            <h1 className="t-display mt-4">
              {rich("Exposés, die verkaufen: vom Datenblatt zum *Entscheidungsdokument*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ein Exposé, das den Alleinauftrag rechtfertigt, folgt einer Dramaturgie aus fünf
              Stufen: Aufschlag, eingebettete Fakten, eine begründete Preis-Argumentation,
              Beweis in Bildern und ein klarer Abschluss.{" "}
              <Highlight>
                Der Preis steht nie allein im Raum, sondern mit Vergleichsobjekten und
                Bodenrichtwert daneben
              </Highlight>
              . Das unterscheidet ein Entscheidungsdokument von der Software-Vorlage, die jeder
              Mitbewerber im selben System nutzt.
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
                src={maklerAsset(1)}
                alt="Aufgeschlagenes Exposé mit Grundriss und Fotostrecke auf einem Tisch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Dramaturgie — fünf Stufen, Preis-Stufe mit Rechenweg ────────── */}
      <section id="dramaturgie" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Dramaturgie"
              titel="Fünf Stufen, vom ersten Bild bis zum *nächsten* Schritt."
              sub="Jede Stufe hat eine eigene Aufgabe. Fehlt eine, bricht die Wirkung der nächsten weg."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 space-y-10 border-t border-line-subtle pt-10">
            {DRAMATURGIE.map((stufe, i) => (
              <Reveal key={stufe.titel} delay={i * 50}>
                <div className="grid gap-3 sm:grid-cols-[64px_1fr] sm:gap-8">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{stufe.titel}</p>
                    <p className="t-body mt-3 max-w-[62ch]">{stufe.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Zweispalter — Standard-Exposé vs. Entscheidungsdokument ─────── */}
      <section id="vergleich" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Abgrenzung"
              titel="Das Software-Exposé sieht *fertig* aus. Verkauft hat es noch keines."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 space-y-8">
            {VERGLEICH.map((zeile, i) => (
              <Reveal key={zeile.thema} delay={i * 50}>
                <div className="border-t border-line-subtle pt-6">
                  <p className="t-label !text-ink-dim">{zeile.thema}</p>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="t-small !text-ink-dim">Standard-Exposé aus der Software</p>
                      <p className="t-body mt-1.5">{zeile.standard}</p>
                    </div>
                    <div>
                      <p className="t-small !text-ink-yellow">Entscheidungsdokument</p>
                      <p className="t-body mt-1.5">{zeile.entscheidung}</p>
                    </div>
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
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Exposé ist Ihr letztes Wort vor der Entscheidung." glyph>
              Der Eigentümer vergleicht drei Makler, nicht drei Objekte. Das Exposé ist der Punkt,
              an dem er sieht, wie Sie arbeiten — nicht nur, was Sie verkaufen. Ein
              Entscheidungsdokument beantwortet die Preisfrage, bevor sie gestellt wird.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien trug die Preis-Argumentation im Exposé den Verkaufsprozess
              mit: neun Abschlüsse, 342.000 € Volumen in sechs Wochen, ohne einen einzigen
              gekauften Lead.
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
              titel="Was Sie vor dem nächsten *Exposé* wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Entscheidungsdokument*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie ein starkes Exposé den Alleinauftrag mitentscheidet, zeigt{" "}
              <Link href="/alleinauftrag-gewinnen" className="ref-link">
                Alleinauftrag gewinnen
              </Link>
              , wo KI beim Rohtext helfen kann{" "}
              <Link href="/ki-expose-texte" className="ref-link">
                KI-Exposé-Texte
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
