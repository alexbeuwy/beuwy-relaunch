import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiCheckLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * W-Cluster — /makler-positionierung (R3-SEITENPLAN.json). Antwort auf
 * "Wie positioniere ich mich als Makler richtig?" direkt im Kopf.
 * Hauptbausteine: PainRows gegen den Bauchladen, dann eine Checkliste der
 * drei Positionierungs-Achsen (Zielgruppe, Objektklasse, Region) mit
 * konkreten Nischenbeispielen. Beweis: RIEGEL als regionaler Spezialist.
 * Kompakter Wissens-Kopf statt 70vh-Hero, Foto 9.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Makler-Positionierung: Spezialist schlägt Bauchladen | beuwy",
  description:
    "Makler-Positionierung: warum der Spezialist mehr verdient als der Bauchladen, über Zielgruppe, Objektklasse und Region zur Provision, die sich verteidigt.",
  openGraph: {
    title: "Makler-Positionierung: Spezialist schlägt Bauchladen | beuwy",
    description:
      "Drei Achsen der Positionierung, Zielgruppe, Objektklasse und Region, und warum der Spezialisten-Effekt eine Provision verteidigt, die der Bauchladen nicht halten kann.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote:
      "Sie verkaufen Eigentumswohnungen, Häuser, Gewerbeflächen und Grundstücke, und sind für keins davon die erste Adresse.",
    answer:
      "Wer alles anbietet, wird für nichts als Erster genannt. Ein Eigentümer mit einer denkmalgeschützten Villa und ein Investor mit einem Mehrfamilienhaus suchen beide einen Spezialisten für ihren Fall, nicht einen Generalisten für alle Fälle.",
  },
  {
    quote:
      "Jede Empfehlung beginnt mit „Der macht eigentlich alles“, nie mit einem Namen für einen bestimmten Fall.",
    answer:
      "Empfehlungen funktionieren über Zuordnung: ein Name für eine Situation. Ohne erkennbare Spezialisierung bleibt die Empfehlung vage, und vage Empfehlungen führen seltener zum Anruf als eine, die genau passt.",
  },
  {
    quote: "Bei der Provisionsverhandlung haben Sie kein Argument außer dem Preis.",
    answer:
      "Ein Generalist konkurriert über den Preis, weil er sonst nichts hat, das ihn unterscheidet. Ein Spezialist verhandelt über die Passung: über Marktkenntnis, die kein Vergleichsangebot bieten kann.",
  },
] as const;

type Achse = {
  titel: string;
  text: string;
  beispiele: string[];
};

const ACHSEN: Achse[] = [
  {
    titel: "Zielgruppe",
    text: "Für wen genau Sie arbeiten, nicht nur was Sie vermitteln.",
    beispiele: [
      "Kapitalanleger, die Rendite und Cashflow verstehen wollen",
      "Erstkäufer-Familien, die Begleitung durch den Prozess brauchen",
      "Ruheständler, die von einem großen Haus in eine kleinere Wohnung wechseln",
    ],
  },
  {
    titel: "Objektklasse",
    text: "Welcher Immobilientyp Ihre Marktkenntnis am tiefsten macht.",
    beispiele: [
      "Altbau-Eigentumswohnungen mit ihren typischen Sanierungsfragen",
      "Mehrfamilienhäuser als Kapitalanlage mit Renditerechnung",
      "Denkmalgeschützte Immobilien mit eigenen Auflagen und Förderwegen",
    ],
  },
  {
    titel: "Region",
    text: "Wie eng der Radius ist, in dem Sie jede Straße kennen.",
    beispiele: [
      "Drei Stadtteile statt einer ganzen Stadt",
      "Eine Kleinstadt statt einer ganzen Region",
      "Ein Umkreis, den Sie an einem Vormittag abfahren können",
    ],
  },
];

const FAQS = [
  {
    q: "Verliere ich Aufträge, wenn ich mich spezialisiere?",
    a: "Kurzfristig lehnen Sie vereinzelt Anfragen außerhalb Ihrer Achse ab. Mittelfristig gewinnen Sie mehr, weil Empfehlungen und Suchanfragen Sie gezielter erreichen. Die meisten Makler, die spezialisieren, berichten von mehr passenden statt weniger Anfragen insgesamt.",
  },
  {
    q: "Wie eng sollte die Positionierung sein?",
    a: "So eng, dass Sie in einem Satz erklärbar bleibt, und so weit, dass genug Fälle in Ihrem Markt hineinfallen. Eine Kombination aus zwei Achsen, etwa Objektklasse und Region, reicht in den meisten Märkten für eine klare Position.",
  },
  {
    q: "Was, wenn meine Stadt zu klein für eine Nische ist?",
    a: "Dann positionieren Sie sich über die Region statt über die Objektklasse: In einer Kleinstadt reicht oft schon, die eine erkennbare Adresse für den gesamten Ort zu sein, weil dort kaum ein Mitbewerber überhaupt eine erkennbare Marke aufgebaut hat.",
  },
  {
    q: "Kann ich die Positionierung später ändern?",
    a: "Ja, aber nicht beiläufig. Ein Wechsel der Achse bedeutet neue Inhalte, neue Bildwelt und neue Botschaft, und braucht Zeit, bis der Markt die neue Zuordnung übernimmt. Ein sauberer Rebrand ist dafür der richtige Rahmen, kein stiller Umbau nebenbei.",
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

export default function MaklerPositionierungPage() {
  const riegel = caseBySlug("riegel-immobilien");

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
            {rich("Warum der *Spezialist* mehr verdient als der Bauchladen.")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[62ch]">
            Sie positionieren sich als Makler richtig, indem Sie sich auf eine Zielgruppe, eine
            Objektklasse oder eine Region festlegen, statt jedes Objekt in jeder Preisklasse
            anzunehmen. Diese Schärfe wirkt zunächst wie ein Verzicht auf Umsatz, verändert aber,
            wie Eigentümer und Empfehlungsgeber Sie wahrnehmen: als die Adresse für einen Fall,
            nicht als eine von zwanzig austauschbaren Optionen. Genau dieser Unterschied
            verteidigt später die Provision, wenn ein Eigentümer drei Angebote vergleicht.
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
              src={maklerAsset(9)}
              alt="Makler prüft am Tisch Objektunterlagen einer einzelnen Nische"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <AiPille />
          </div>
        </div>
      </section>

      {/* ── Problem — Symptome des Bauchladens ──────────────────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Woran man einen Bauchladen erkennt"
              titel="Wer für *alle* da ist, ist für niemanden die erste Wahl."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Drei Achsen — Checkliste ─────────────────────────────────── */}
      <section id="achsen" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die drei Achsen"
              titel="Zielgruppe, Objektklasse, *Region*: wählen Sie mindestens eine scharf."
              sub="Eine einzelne scharfe Achse reicht oft schon. Zwei kombiniert, etwa Objektklasse und Region, ergeben in den meisten Märkten eine unverwechselbare Position."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {ACHSEN.map((a, i) => (
              <Reveal key={a.titel} delay={i * 60}>
                <div className="border-t border-line-medium pt-6">
                  <p className="t-h3">{a.titel}</p>
                  <p className="t-body mt-2">{a.text}</p>
                  <ul className="mt-5 space-y-3">
                    {a.beispiele.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-akzent-wash">
                          <RiCheckLine className="h-3.5 w-3.5 text-ink-cream" />
                        </span>
                        <span className="text-[14px] leading-[1.5] text-ink-muted">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte
              label="Der Unterschied"
              titel="Ein Spezialist verhandelt nicht über den Preis."
              glyph
            >
              Er verhandelt über die Passung. Wer als einziger im Markt genau diese Objektklasse
              in genau dieser Region kennt, hat ein Argument, das kein Vergleichsangebot
              unterbieten kann: Es gibt keine Alternative, die dieselbe Marktkenntnis mitbringt.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL als regionaler Spezialist ────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Ein Familienunternehmen, klar auf die Rhein-Neckar-Region positioniert: sechs Wochen
              nach dem Relaunch neun Abschlüsse, 342.000 € Volumen, ohne einen einzigen gekauften
              Lead.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *ersten* Nische wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Finden wir Ihre *Achse*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Positionierung ist der erste Schritt, Marke der zweite. Mehr dazu in{" "}
              <Link href="/ueber-uns" className="ref-link">
                Über uns
              </Link>{" "}
              und im vertiefenden Artikel{" "}
              <Link href="/markenaufbau-makler" className="ref-link">
                Markenaufbau für Makler
              </Link>
              . Den Überblick über alle Bausteine zeigt der{" "}
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
