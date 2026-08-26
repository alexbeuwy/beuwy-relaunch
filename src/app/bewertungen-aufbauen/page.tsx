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
 * Wissensseite (R3 Welle 2, Cluster C) — /bewertungen-aufbauen. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich (fester Zeitpunkt statt
 * Zufall). Hauptteil: Vier-Stufen-Timing-Rail (Notartermin bis Antwort),
 * ein Formulierungs-Baustein als Textbeispiel zum Übernehmen, PainRows zu
 * rechtlichen Leitplanken und Umgang mit Kritik. GelbeKarte, Beweis-Anriss
 * über Königswege (60 → über 2.300 Partner) als Beleg, wie schnell eine
 * sichtbare, konsistente Marke Vertrauen skaliert. FAQ + FAQPage-JSON-LD.
 * Foto 6 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bewertungen aufbauen: Vom zufriedenen Kunden zur sichtbaren Zahl | beuwy",
  description:
    "Bewertungen aufbauen gelingt mit festem Timing: die Bitte drei Tage nach dem Notartermin, klare Formulierungen, rechtliche Leitplanken und Umgang mit Kritik.",
  openGraph: {
    title: "Bewertungen aufbauen: Vom zufriedenen Kunden zur sichtbaren Zahl | beuwy",
    description:
      "Ein System statt Hoffnung: wann Sie um eine Bewertung bitten, wie die Nachricht klingt, wo die rechtliche Grenze liegt und wie Sie auf Kritik reagieren.",
    type: "website",
    locale: "de_DE",
  },
};

const TIMING = [
  {
    titel: "Tag 0 — Notartermin",
    text: "Im Gespräch kurz ankündigen, dass in wenigen Tagen eine kurze Bitte um eine Bewertung kommt. Das nimmt der Nachricht später die Überraschung und erhöht die Wahrscheinlichkeit einer Antwort spürbar.",
  },
  {
    titel: "Tag 3 — persönliche Nachricht",
    text: "Eine kurze, persönliche Nachricht mit direktem Bewertungslink, per WhatsApp oder E-Mail, nie über einen Massenverteiler. Der Kunde hat den Schlüssel gerade übergeben und erinnert sich an jedes Detail des Prozesses.",
  },
  {
    titel: "Tag 10 — eine Erinnerung",
    text: "Bleibt eine Reaktion aus, folgt genau eine freundliche Erinnerung. Danach nicht weiter nachfassen — wiederholtes Drängen wirkt schneller schädlich als eine fehlende Bewertung.",
  },
  {
    titel: "Danach — immer antworten",
    text: "Jede eingehende Bewertung bekommt eine Antwort, unabhängig vom Sternewert. Ein Dank bei fünf Sternen, eine sachliche Reaktion bei Kritik — beides zeigt jedem künftigen Leser, dass hier jemand hinschaut.",
  },
] as const;

const RECHTLICH = [
  {
    quote: "Bewertungen kaufen oder gegen einen Vorteil anbieten ist verbotene Meinungsmache, kein Marketing-Kniff.",
    answer:
      "Gekaufte oder incentivierte Bewertungen verstoßen sowohl gegen die Google-Richtlinien als auch gegen das Wettbewerbsrecht, das echte von manipulierten Kundenmeinungen unterscheidet. Im Ernstfall drohen die Löschung aller Bewertungen und eine Abmahnung durch Wettbewerber, kein Vorteil, der das Risiko aufwiegt.",
  },
  {
    quote: "Nur zufriedene Kunden gezielt anzuschreiben ist erlaubt — schlechte Bewertungen einfach löschen lassen nicht.",
    answer:
      "Wen Sie um eine Bewertung bitten, dürfen Sie frei wählen, das ist normales Marketing. Eine bestehende, echte Bewertung entfernen zu lassen, gelingt bei Google nur über eine gemeldete Regelverletzung wie Spam oder Beleidigung, nicht schon deshalb, weil sie schlecht ausfällt.",
  },
  {
    quote: "Eine schlechte Bewertung öffentlich zu kontern bringt selten etwas.",
    answer:
      "Eine ruhige, sachliche Antwort mit dem Angebot einer Klärung abseits der Kommentarspalte wirkt auf jeden mitlesenden Interessenten glaubwürdiger als eine Rechtfertigung im Ton der Verteidigung. Der Streit selbst bleibt dann privat, die öffentliche Antwort bleibt professionell.",
  },
];

const FAQS = [
  {
    q: "Darf ich Kunden aktiv um eine Bewertung bitten?",
    a: "Ja, das ist eine übliche und zulässige Praxis. Problematisch wird es erst, wenn die Bitte mit einem Vorteil verknüpft, gezielt gefälscht oder unter Druck erzwungen wird — die reine, unaufgeforderte Bitte um eine ehrliche Rückmeldung ist davon nicht betroffen.",
  },
  {
    q: "Wie reagiere ich auf eine unfaire negative Bewertung?",
    a: "Antworten Sie sachlich, ohne Rechtfertigungston, und bieten Sie eine Klärung außerhalb der Kommentarspalte an. Eine Entfernung durch Google gelingt nur bei einem tatsächlichen Regelverstoß, etwa wenn die Bewertung nachweislich nicht von einem echten Kunden stammt, nicht schon deshalb, weil sie unangenehm ist.",
  },
  {
    q: "Wie viele Bewertungen brauche ich, um sichtbar zu wirken?",
    a: "Eine feste Zahl gibt es nicht, entscheidender ist ein stetiger Zufluss und eine hohe Antwortquote auf jede einzelne Bewertung. Ein Profil mit wenigen, aber aktuellen und beantworteten Bewertungen wirkt vertrauenswürdiger als eines mit vielen alten ohne jede Reaktion.",
  },
  {
    q: "Kann ich alte, schlechte Bewertungen einfach löschen lassen?",
    a: "Nur über das offizielle Melde-Verfahren von Google und nur bei einem klaren Regelverstoß, etwa Fake-Konten oder beleidigenden Inhalten. Eine echte, aber kritische Bewertung bleibt bestehen — hier hilft eine gute, öffentlich sichtbare Antwort mehr als der Versuch, sie verschwinden zu lassen.",
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

export default function BewertungenAufbauenPage() {
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
            <p className="t-label !text-ink-yellow">Vertrauen sichtbar machen</p>
            <h1 className="t-display mt-4">
              {rich("Bewertungen aufbauen: vom zufriedenen Kunden zur *sichtbaren* Zahl.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie bekommen systematisch Google-Bewertungen, indem Sie den Moment fest terminieren,
              statt darauf zu hoffen, dass jemand von sich aus schreibt: Die Bitte kommt drei Tage
              nach dem Notartermin, persönlich und mit direktem Link, nicht als Massenmail Monate
              später.{" "}
              <Highlight>Ein Kunde, der gerade den Schlüssel übergeben hat, ist
              bereitwilliger als einer, der sich drei Monate später kaum noch an den Namen des
              Maklers erinnert</Highlight> — feste Formulierungen und eine klare Regel für Kritik
              gehören mit ins System.
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
                src={maklerAsset(6)}
                alt="Makler übergibt lächelnd die Schlüssel an ein Paar vor der Haustür"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Timing — Vier-Stufen-Rail ────────────────────────────────────────── */}
      <section id="timing" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Timing"
              titel="Vier Termine, die aus Zufall ein *System* machen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {TIMING.map((schritt, i) => (
              <Reveal key={schritt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{schritt.titel}</p>
                  <p className="t-body mt-3">{schritt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulierungs-Baustein — Textbeispiel zum Übernehmen ────────────── */}
      <section id="formulierung" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zum Übernehmen"
              titel="Eine Nachricht, die *persönlich* klingt, nicht nach Formular."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 max-w-[640px] rounded-[24px] border border-line-subtle bg-bg-elevated p-7 sm:p-8">
              <p className="t-label !text-ink-yellow">Beispiel, drei Tage nach Notartermin</p>
              <p className="t-body mt-4">
                „Guten Tag Frau Weber, seit dem Notartermin ist jetzt eine Woche vergangen und ich
                hoffe, der Einzug läuft gut. Wenn Sie zwei Minuten haben: Eine kurze Bewertung bei
                Google würde mir sehr helfen, damit auch andere Eigentümer meine Arbeit einordnen
                können. Hier der Link: [Link]. Vielen Dank, und melden Sie sich jederzeit, falls
                noch etwas offen ist.“
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-8 max-w-[640px]">
              Der Ton bleibt derselbe wie im persönlichen Kontakt davor — keine Marketing-Sprache,
              kein Rabatt für eine bestimmte Sternezahl, nur eine klare, kurze Bitte.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Leitplanken — PainRows zu Recht und Kritik ──────────────────────── */}
      <section id="leitplanken" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Rechtliche Leitplanken"
              titel="Was erlaubt ist, und wo die *Grenze* verläuft."
              sub="Eine allgemeine Einordnung, keine Rechtsberatung im Einzelfall — bei konkreten Streitfällen hilft ein Fachanwalt für Wettbewerbsrecht weiter."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={RECHTLICH} />
          </div>
          <Reveal delay={200}>
            <p className="t-body mt-10 max-w-[640px]">
              Wie diese Sichtbarkeit anschließend im Google-Unternehmensprofil ankommt, zeigt{" "}
              <Link href="/google-unternehmensprofil-makler" className="ref-link">
                Google-Unternehmensprofil für Makler
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Fünf Sterne sind kein Zufall. Sie sind ein Termin im Kalender." glyph>
              Wer auf Bewertungen wartet, bekommt sie unregelmäßig und selten von den richtigen
              Kunden. Wer sie terminiert, bekommt beides: mehr Bewertungen und mehr davon von genau
              den Kunden, deren Meinung einen neuen Eigentümer wirklich überzeugt.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Königswege, Vertrauen skaliert ──────────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, keine Behauptung</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Bei Königswege haben wir gesehen, wie schnell eine sichtbare, konsistente Marke
              Vertrauen skaliert: aus 60 Personen beim Start der Zusammenarbeit wurden über 2.300
              Partner unter derselben Marke.
            </p>
            <p className="t-body mt-4 max-w-[52ch]">
              Reputation wächst selten über Nacht, aber sie wächst zuverlässig, wenn Auftritt und
              sichtbare Bestätigung durch andere konsequent zusammenwirken.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Link href="/cases/koenigswege" className="ref-link mt-8 inline-block">
              Fallstudie Königswege lesen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *ersten* Bitte wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA + Textlinks zu Hub und Spec-Links ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Bewertungssystem*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wo die Bewertungen anschließend sichtbar werden, zeigt{" "}
              <Link href="/google-unternehmensprofil-makler" className="ref-link">
                Google-Unternehmensprofil für Makler
              </Link>
              , wie Empfehlungen insgesamt online ankommen, zeigt{" "}
              <Link href="/empfehlungsgeschaeft-digitalisieren" className="ref-link">
                Empfehlungsgeschäft digitalisieren
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
