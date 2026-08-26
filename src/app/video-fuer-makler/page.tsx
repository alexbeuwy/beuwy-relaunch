import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster C) — /video-fuer-makler. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich (drei Video-Typen).
 * Hauptteil: Vergleichs-Tabelle Objekt-/Marken-/Personenvideo mit
 * Aufwand/Wirkung/Einsatzort, danach das Hero-Video-Prinzip der eigenen
 * beuwy-Startseite als konkretes Beispiel für ein Markenvideo, das immer
 * mitarbeitet. GelbeKarte, Beweis-Anriss über den Vision-Group-Imagefilm
 * (1.450 WE Höchststand 2022, KKR-JV 160 Mio. €, Zahlen aus cases.ts, mit
 * der dort dokumentierten Höchststand-Einordnung). FAQ + FAQPage-JSON-LD.
 * Foto 4 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Video für Makler: Vom Rundgang zum Vertrauensaufbau | beuwy",
  description:
    "Video für Makler heißt drei Typen kennen: Objektvideo, Markenvideo, Personenvideo, mit Aufwand und Wirkung im Vergleich, plus dem Hero-Video-Prinzip erklärt.",
  openGraph: {
    title: "Video für Makler: Vom Rundgang zum Vertrauensaufbau | beuwy",
    description:
      "Drei Video-Typen für Makler im Vergleich: was ein Rundgang leistet, was ein Markenfilm dauerhaft trägt, und warum ein kurzes Personenvideo vor dem ersten Anruf wirkt.",
    type: "website",
    locale: "de_DE",
  },
};

const VERGLEICH = [
  {
    typ: "Objektvideo (Rundgang)",
    aufwand: "mittel, je Objekt neu",
    wirkung: "hoch bei Premium-Objekten, gering bei Standardwohnungen",
    einsatz: "Exposé, Portal-Anzeige",
  },
  {
    typ: "Markenvideo (Imagefilm)",
    aufwand: "hoch, dafür einmalig alle 2–3 Jahre",
    wirkung: "wirkt dauerhaft bei jedem neuen Objekt mit",
    einsatz: "Startseite, erstes Beratungsgespräch",
  },
  {
    typ: "Personenvideo (kurze Vorstellung)",
    aufwand: "gering, Smartphone reicht",
    wirkung: "hoch für Vertrauen vor dem Erstkontakt",
    einsatz: "Social Media, Google-Profil, Website",
  },
] as const;

const FAQS = [
  {
    q: "Welches Video sollte ich als Erstes produzieren lassen?",
    a: "Meist das Personenvideo, weil es am wenigsten kostet und am schnellsten steht — eine kurze, ruhige Vorstellung reicht, gedreht mit dem Smartphone. Objekt- und Markenvideo folgen, sobald ein passendes Objekt oder ein Anlass für den größeren Dreh da ist.",
  },
  {
    q: "Brauche ich für jedes Objekt ein eigenes Video?",
    a: "Nein. Bei Standardwohnungen im mittleren Preissegment reichen gute Fotos meist aus, ein Rundgang lohnt sich vor allem bei besonderem Grundriss, hochwertiger Ausstattung oder wenn Interessenten überregional anreisen müssten und sich vorab ein genaueres Bild machen sollen.",
  },
  {
    q: "Wie lange sollte ein Objektvideo sein?",
    a: "Zwischen 60 und 120 Sekunden für die Portalversion, geschnitten in der Reihenfolge des Exposés: Eingang, Wohnbereich, Außenbereich. Längere Fassungen funktionieren als Anhang auf der eigenen Website, auf dem Portal bricht die Aufmerksamkeit danach meist ab.",
  },
  {
    q: "Was ist der Unterschied zwischen einem Objektvideo und einem Imagefilm?",
    a: "Ein Objektvideo verkauft ein einzelnes Haus und verliert danach seinen Zweck. Ein Imagefilm zeigt, wer Sie sind und wie Sie arbeiten, und bleibt Jahre im Einsatz — auf der eigenen Website, im ersten Gespräch, unabhängig davon, welches Objekt gerade vermarktet wird.",
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

export default function VideoFuerMaklerPage() {
  const vision = caseBySlug("vision-group");

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
            <p className="t-label !text-ink-yellow">Bewegtbild fürs Maklerbüro</p>
            <h1 className="t-display mt-4">
              {rich("Video für Makler: vom Rundgang zum *Vertrauensaufbau*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Als Makler brauchen Sie im Kern drei Video-Typen: das Objektvideo für den einzelnen
              Rundgang, das Markenvideo für den Wiedererkennungswert über alle Objekte hinweg, und
              das Personenvideo, das Sie zeigt, bevor der Eigentümer Sie am Telefon hat.{" "}
              <Highlight>Ein Objektvideo verkauft ein Haus, Marken- und Personenvideo
              verkaufen Sie selbst</Highlight> — und nur die beiden Letzteren wirken über den
              Verkauf eines einzelnen Objekts hinaus weiter.
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
                src={maklerAsset(4)}
                alt="Kamera auf Schulterstativ filmt einen Rundgang durch ein helles Wohnzimmer"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleich — drei Video-Typen mit Aufwand/Wirkung/Einsatzort ─────── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Vergleich"
              titel="Drei Video-Typen, drei *unterschiedliche* Aufgaben."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">Video-Typ</th>
                    <th className="t-label py-3 pr-6 font-semibold">Aufwand</th>
                    <th className="t-label py-3 pr-6 font-semibold">Wirkung</th>
                    <th className="t-label py-3 font-semibold">Einsatzort</th>
                  </tr>
                </thead>
                <tbody>
                  {VERGLEICH.map((row) => (
                    <tr key={row.typ} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.typ}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.aufwand}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.wirkung}</td>
                      <td className="t-body py-4 tnum">{row.einsatz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Hero-Video-Prinzip — eigene Startseite als lebendes Beispiel ────── */}
      <section id="prinzip" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Hero-Video-Prinzip"
              titel="Ein Markenvideo, das *jeden* Besuch mitträgt."
              sub="Unsere eigene Startseite öffnet mit einem lautlosen Loop statt einem statischen Bild — dasselbe Prinzip, das wir für ein Markenvideo empfehlen: kein Ton nötig, keine Ladepause, der Ton der Marke steht in den ersten drei Sekunden fest, bevor ein Wort fällt."
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body mt-8 max-w-[640px]">
              Übertragen auf ein Maklerbüro heißt das: Das Markenvideo läuft leise im Hintergrund
              der eigenen Website und im ersten Beratungsgespräch, während jedes einzelne
              Objektvideo kommt und wieder verschwindet, sobald das Haus verkauft ist. Wer beide
              Ebenen trennt, muss nicht bei jedem neuen Objekt wieder bei null anfangen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Rundgang zeigt ein Haus. Ihr Gesicht zeigt, wem man vertraut." glyph>
              Objektvideos verbrauchen sich mit dem Verkauf. Marken- und Personenvideo bauen etwas
              auf, das bleibt, wenn das nächste Objekt noch gar nicht im Bestand ist — der Grund,
              warum wir beide Ebenen getrennt planen, statt sie in einem einzigen Dreh zu
              vermischen.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Vision-Group-Imagefilm ──────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Showreel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Für die Vision Group haben wir den Imagefilm gebaut, der die Investorenstory trug —
              am Höchststand 2022 stand das Haus bei 1.450 entwickelten Wohneinheiten und ging ein
              Joint Venture mit KKR über 160 Mio. € ein.
            </p>
            {vision?.video && (
              <p className="t-body mt-4 max-w-[52ch]">
                Der Film war kein Nebenprodukt, sondern Teil der Unterlagen, mit denen ein
                Dreierteam vor internationalen Investoren bestand.
              </p>
            )}
          </Reveal>
          <Reveal delay={60}>
            <Link href="/cases/vision-group" className="ref-link mt-8 inline-block">
              Fallstudie Vision Group ansehen →
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
              titel="Was Sie vor dem *ersten* Dreh wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Bewegtbild-System*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie ein Personenvideo auf{" "}
              <Link href="/social-media-immobilienmakler" className="ref-link">
                Social Media
              </Link>{" "}
              wirkt und wie Sie einen Dreh überhaupt briefen, zeigt{" "}
              <Link href="/immobilienfotografie-briefing" className="ref-link">
                das Fotografie-Briefing
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
