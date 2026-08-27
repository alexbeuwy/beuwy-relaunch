import type { Metadata } from "next";
import Link from "next/link";
import { RiPaletteLine, RiRouteLine, RiTimerFlashLine } from "@remixicon/react";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, KreisDeko, SektionsKopf, Wortmarke } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";

/**
 * /beste-maklerwebsites — das Ranking-Asset (Leaf E1, docs/redesign/gates/E1.md).
 * Doppelte Funktion: SEO-Magnet für „beste Maklerwebsites" UND Ego-Loop —
 * gelistete Häuser verlinken zurück, nicht gelistete rufen an.
 *
 * INTEGRITÄTS-REGEL (hart, GOAL/BRIEF): keine erfundenen Scores oder
 * Bewertungstexte für echte Unternehmen. Jeder Wertungs-Slot zeigt „–" mit
 * Label „Bewertung läuft"/„Wird derzeit geprüft" — ausnahmslos, auch bei den
 * acht großen Netzwerken oben. Die Reihenfolge der großen Acht ist keine
 * Qualitätsaussage (Disclaimer direkt über der Liste) — sie stehen zuerst,
 * weil sie zuerst geprüft werden. Keine Herabwürdigung: kein negatives
 * Urteil über ein benanntes Haus, nirgends auf der Seite.
 *
 * Texte sind hier bewusst NICHT über src/lib/content.ts verdrahtet (Datei
 * steht auf der Sperrliste dieses Leafs) — Studio-Key-Wünsche stehen im
 * Leaf-Report statt im Code. Die große Ausnahme: GROSSE_ACHT ist absichtlich
 * eine lokale Konstante und liest NICHT aus mk.trust.namen — sonst würde
 * eine Umbenennung der Hero-Vertrauensleiste im Studio ungewollt auch die
 * Rangliste verändern (zwei verschiedene Jobs, ein Namensraum wäre eine
 * versteckte Kopplung).
 */

export const metadata: Metadata = {
  title: "Die 30 besten Maklerwebsites Deutschlands 2026 | beuwy",
  description:
    "Die 30 besten Maklerwebsites Deutschlands 2026, bewertet nach Design, Ladezeit und Conversion-Pfad. Redaktionsstand: die Bewertung läuft, die Kriterien liegen offen.",
};

/* Reihenfolge = BRIEF §6 / GOAL Kriterium 5, identisch zu MARKEN_SLUGS in
   MaklerElemente.tsx — Wortmarke greift über den Namen automatisch die
   richtige Markentypo. Bewusst eine lokale Liste, siehe Kommentar oben. */
const GROSSE_ACHT = [
  "ENGEL & VÖLKERS",
  "VON POLL IMMOBILIEN",
  "DAHLER & COMPANY",
  "KENSINGTON",
  "RE/MAX",
  "McMakler",
  "Homeday",
  "BETTERHOMES",
] as const;

const PLAETZE_9_BIS_30 = Array.from({ length: 22 }, (_, i) => i + 9);

const KRITERIEN = [
  {
    icon: RiPaletteLine,
    gewicht: "40 %",
    titel: "Design",
    text: "Wir sehen, was in den ersten Sekunden hängen bleibt: Bildsprache, Typografie, Weißraum. Ein Blick reicht, dann entscheidet der Eindruck, nicht die Beschreibung.",
  },
  {
    icon: RiTimerFlashLine,
    gewicht: "30 %",
    titel: "Ladezeit",
    text: "Wir messen, wie lange die Startseite bis zur echten Bedienbarkeit braucht, auf dem Mobiltelefon, nicht im Idealfall. Wer drei Sekunden wartet, ist beim nächsten Ergebnis.",
  },
  {
    icon: RiRouteLine,
    gewicht: "30 %",
    titel: "Conversion-Pfad",
    text: "Wir zählen die Schritte von der Startseite bis zur Anfrage. Jeder Umweg kostet einen Interessenten, der eigentlich schon überzeugt war.",
  },
] as const;

function RedaktionsPille({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full bg-akzent-wash px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-cream ${className}`}
    >
      Redaktionsstand · August 2026
    </span>
  );
}

/* Die acht großen Netzwerke: eigene Zeile, Wortmarke-Typo, sichtbar
   prominenter als die 22 Prüf-Slots darunter — der Ego-Loop lebt vom
   Kontrast zwischen „gelistet" und „noch nicht". */
function RangzeileGross({ nr, name }: { nr: number; name: string }) {
  return (
    <div className="flex flex-col gap-4 border-b border-line-subtle py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-center gap-5">
        <span className="w-9 shrink-0 font-mono text-[13px] text-ink-dim tnum">
          {String(nr).padStart(2, "0")}
        </span>
        <div>
          <Wortmarke name={name} />
          <p className="mt-1.5 text-[12px] text-ink-dim">Bundesweit</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:justify-end">
        <div className="flex items-center gap-6">
          {["Design", "Ladezeit", "Conversion"].map((k) => (
            <div key={k} className="text-center">
              <p className="font-mono text-[15px] text-ink-dim tnum">–</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.06em] text-ink-dim/70">{k}</p>
            </div>
          ))}
        </div>
        <span className="t-label !text-[9.5px] shrink-0 whitespace-nowrap rounded-full bg-bg-elevated px-3 py-1.5 !text-ink-dim">
          Bewertung läuft
        </span>
      </div>
    </div>
  );
}

/* Plätze 9–30: kompakt, zwei Spalten, bewusst zurückhaltender als die
   großen Acht — die Verknappung, die den Anruf auslöst. */
function RangzeileKlein({ nr }: { nr: number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line-subtle py-4">
      <div className="flex items-center gap-4">
        <span className="w-8 shrink-0 font-mono text-[12px] text-ink-dim/70 tnum">
          {String(nr).padStart(2, "0")}
        </span>
        <div>
          <p className="text-[13.5px] font-medium text-ink-dim">Wird derzeit geprüft</p>
          <p className="text-[11px] text-ink-dim/60">Standort folgt</p>
        </div>
      </div>
      <span className="shrink-0 font-mono text-[11px] text-ink-dim/50 tnum">– / – / –</span>
    </div>
  );
}

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wie kommt man in die Liste?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wir prüfen jede Website nach der Kriterienliste oben: Design, Ladezeit, Conversion-Pfad. Die acht großen Netzwerke stehen zuerst, weil wir mit ihnen begonnen haben. Der Rest folgt in der Reihenfolge, in der wir ihn geprüft haben. Ein Platz in der Liste ist keine Bewerbung. Er ist das Ergebnis einer Prüfung.",
      },
    },
    {
      "@type": "Question",
      name: "Kann man sich einkaufen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Ihr Listenplatz hat nichts mit einem Auftrag bei uns zu tun, auch nicht umgekehrt. Wer bei uns baut, taucht in der Liste auf, sobald die Website die Kriterien erfüllt. Nicht früher, nicht automatisch.",
      },
    },
  ],
};

export default function BesteMaklerwebsitenPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      {/* ── 1. Hero — kompakt, typografisch, KreisDeko statt Foto ── */}
      <section className="relative flex min-h-[60dvh] items-center overflow-hidden bg-bg-base px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-40">
        <KreisDeko className="right-[6%] top-[22%] hidden lg:block" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <p className="t-label text-ink-yellow">Ranking · Maklerwebsites 2026</p>
          <h1 className="t-display mt-5 max-w-[780px]">
            {rich("Die 30 besten Maklerwebsites Deutschlands *2026*.")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[36rem]">
            Bewertet nach Design, Ladezeit und Conversion-Pfad,{" "}
            <Highlight>von Leuten, die Maklerwebsites bauen</Highlight>.
          </p>
        </div>
      </section>

      {/* ── 2. Methodik — macht das Ranking glaubwürdig ── */}
      <section className="border-t border-line-subtle bg-bg-elevated px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <SektionsKopf
              eyebrow="Methodik"
              titel="Drei Kriterien, *ein* Maßstab."
              sub="Jede Website in dieser Liste durchläuft dieselbe Prüfung: kein Bauchgefühl, keine Sonderregeln."
            />
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0">
            {KRITERIEN.map((k, i) => {
              const Icon = k.icon;
              return (
                <Reveal key={k.titel} delay={i * 70}>
                  <div className={i > 0 ? "md:border-l md:border-line-subtle md:pl-10" : ""}>
                    <Icon size={22} className="text-ink-yellow" aria-hidden />
                    <p className="t-stat mt-5 tnum">{k.gewicht}</p>
                    <h3 className="t-h3 mt-2">{k.titel}</h3>
                    <p className="t-body mt-3 max-w-[32ch]">{k.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={220}>
            <p className="t-small mt-14 max-w-[58ch] border-t border-line-subtle pt-8">
              Jede Website durchläuft dieselbe Prüfliste: eine echte Ladezeitmessung auf mobilen
              Endgeräten und ein fester Kriterienkatalog für Design und Conversion-Pfad. Kein
              Bauchgefühl, sondern derselbe Maßstab für alle 30 Häuser, geprüft von einem Team,
              das seit 17 Jahren Marken baut.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Die Liste — Plätze 1 bis 30 ── */}
      <section className="border-t border-line-subtle bg-bg-base px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Ranking"
              titel="Platz 1 bis *30*."
              sub="Wir beginnen mit den acht größten Maklernetzwerken Deutschlands. Nicht, weil ihr Platz feststeht, sondern weil sie zuerst geprüft werden. Die Reihenfolge unten ist noch kein Urteil."
            />
            <RedaktionsPille className="mt-6" />
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <p className="t-label !text-ink-dim">Die großen Acht</p>
              <div className="mt-4">
                {GROSSE_ACHT.map((name, i) => (
                  <RangzeileGross key={name} nr={i + 1} name={name} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="t-label mt-14 !text-ink-dim">Platz 9–30 · Bewertung läuft</p>
              <div className="mt-4 grid gap-x-10 sm:grid-cols-2">
                {PLAETZE_9_BIS_30.map((nr) => (
                  <RangzeileKlein key={nr} nr={nr} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Ego-Loop — der Grund anzurufen ── */}
      <section className="border-t border-line-subtle bg-bg-elevated px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <GelbeKarte
              glyph
              label="Für Häuser ohne Eintrag"
              titel="Ihr Haus fehlt in der Liste?"
              className="mx-auto max-w-[640px]"
            >
              <p>
                Es gibt zwei Gründe: Wir haben Ihre Website noch nicht geprüft, oder sie ist noch
                nicht so weit. Beides lässt sich ändern.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/anfrage"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-cream px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-ink-cream/85"
                >
                  Zusammenarbeit anfragen
                </Link>
                <Link
                  href="/anfrage"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-cream/25 px-6 py-3 text-[14px] font-semibold text-ink-cream transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-ink-cream/50"
                >
                  Website prüfen lassen
                </Link>
              </div>
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className="border-t border-line-subtle bg-bg-base px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <SektionsKopf eyebrow="Häufige Fragen" titel="Fragen zum *Ranking*." />
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div>
                <h3 className="t-h3">Wie kommt man in die Liste?</h3>
                <p className="t-body mt-3">
                  Wir prüfen jede Website nach der Kriterienliste oben: Design, Ladezeit,
                  Conversion-Pfad. Die acht großen Netzwerke stehen zuerst, weil wir mit ihnen
                  begonnen haben. Der Rest folgt in der Reihenfolge, in der wir ihn geprüft haben.
                  Ein Platz in der Liste ist keine Bewerbung. Er ist das Ergebnis einer Prüfung.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div>
                <h3 className="t-h3">Kann man sich einkaufen?</h3>
                <p className="t-body mt-3">
                  Nein. Ihr Listenplatz hat nichts mit einem Auftrag bei uns zu tun, auch nicht
                  umgekehrt. Wer bei uns baut, taucht in der Liste auf, sobald die Website die
                  Kriterien erfüllt. Nicht früher, nicht automatisch.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="t-small mt-16 border-t border-line-subtle pt-8">
              Mehr zum Thema:{" "}
              <Link
                href="/immobilienmarketing"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-muted"
              >
                Immobilienmarketing im Überblick
              </Link>{" "}
              ·{" "}
              <Link
                href="/website-fuer-immobilienmakler"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-[var(--duration-quick)] hover:text-ink-muted"
              >
                Was eine gute Maklerwebsite braucht
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
