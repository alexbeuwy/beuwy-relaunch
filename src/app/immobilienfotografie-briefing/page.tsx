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
 * Wissensseite (R3 Welle 2, Cluster C) — /immobilienfotografie-briefing.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich (Briefing als
 * Dokument statt Zuruf am Terminmorgen). Hauptteil: eine übernehmbare
 * Fünf-Punkte-Nummernliste (Golden Hour, Achsen, Pflichtaufnahmen, Details,
 * Lieferformat), eine kurze Bildrechte-Checkliste mit Häkchen, Übergang
 * zu Video statt Foto. GelbeKarte, Beweis-Anriss über 17 Jahre
 * Markenarbeit (Bosch, Continental, Michelin) als Beleg für Bilddisziplin,
 * FAQ + FAQPage-JSON-LD. Foto 3 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Immobilienfotografie: Das Briefing, das Objekte größer macht | beuwy",
  description:
    "Immobilienfotografie briefen Sie mit einem festen Dokument statt einem Zuruf am Terminmorgen: Golden Hour, feste Achsen, Pflichtaufnahmen, Bildrechte und Lieferformat in fünf Punkten.",
  openGraph: {
    title: "Immobilienfotografie: Das Briefing, das Objekte größer macht | beuwy",
    description:
      "Das übernehmbare Briefing für Immobilienfotografen: Tageszeit, Kamera-Achsen, Pflichtaufnahmen je Raum, Bildrechte und wann ein Video das Foto ergänzt.",
    type: "website",
    locale: "de_DE",
  },
};

const PUNKTE = [
  {
    titel: "Zeitfenster",
    text: "Fassade und Garten entstehen in der Golden Hour, kurz nach Sonnenaufgang oder vor Sonnenuntergang — flaches Licht ohne harte Schatten. Innenräume dagegen brauchen einen bedeckten oder milden Tag, damit kein Fenster ausbrennt und kein Raum halb im Gegenlicht liegt.",
  },
  {
    titel: "Achsen",
    text: "Kamerahöhe fest zwischen 1,20 und 1,40 Meter, immer auf Stativ. Senkrechte Linien bleiben senkrecht, keine Weitwinkel-Verzerrung, die Wände nach innen kippen lässt. Von der Tür schräg in die Raumdiagonale fotografieren zeigt die Tiefe, die ein Raum tatsächlich hat.",
  },
  {
    titel: "Pflichtaufnahmen je Raum",
    text: "Wohnzimmer und Küche mit je zwei bis drei Perspektiven, jedes weitere Zimmer mit einer, dazu Fassade, Garten oder Balkon, Straßenansicht und Eingangsbereich. Eine feste Liste verhindert, dass der Fotograf vor Ort improvisiert, was er zeigt und was nicht.",
  },
  {
    titel: "Detail-Liste",
    text: "Einbauküche mit Marke, Bodenbelag, Aussicht, Stellplatz, besondere Ausstattung wie Fußbodenheizung oder Kamin — genau die Details, nach denen Interessenten im Exposé später suchen, nicht die, die zufällig gut aussehen.",
  },
  {
    titel: "Lieferformat",
    text: "Mindestauflösung für Druck und Portal, Lieferung innerhalb von drei bis fünf Werktagen, sortiert in der Reihenfolge des Exposés: Eingang, Wohnbereich, Nebenräume, Außenbereich. Ein wahllos benannter Ordner kostet am Ende Zeit, die niemand einplant.",
  },
] as const;

const RECHTE = [
  "Nutzungsrecht für Portale und die eigene Website steht schriftlich im Auftrag, nicht als mündliche Annahme.",
  "Laufzeit ist geklärt: zeitlich begrenzt auf die Vermarktung oder dauerhaft für spätere Referenzen.",
  "Sind Personen im Bild, liegt zusätzlich eine Einwilligung vor — ohne sie darf das Foto nicht veröffentlicht werden.",
] as const;

const FAQS = [
  {
    q: "Brauche ich einen Profifotografen oder reicht das Smartphone?",
    a: "Für ein Standardobjekt in mittlerer Preislage reicht ein Smartphone mit Stativ und Weitwinkel-Vorsicht, wenn das Briefing trotzdem steht. Ab dem gehobenen Segment macht ein Profi mit Vollformatkamera und Belichtungsreihen einen Unterschied, den man im Exposé direkt sieht — Lichtführung und Perspektive lassen sich mit dem Handy nur begrenzt kontrollieren.",
  },
  {
    q: "Wie lange dauert ein Fototermin?",
    a: "Für eine durchschnittliche Wohnung rechnen Sie 60 bis 90 Minuten vor Ort, bei einem Haus mit Garten eher zwei Stunden. Golden-Hour-Aufnahmen von Fassade oder Garten verlängern den Termin um ein festes Zeitfenster am frühen Morgen oder späten Nachmittag, das wetterabhängig verschoben werden kann.",
  },
  {
    q: "Wem gehören die Bilder nach dem Shooting?",
    a: "Ohne ausdrückliche Regelung bleibt das Nutzungsrecht meist beim Fotografen, der es Ihnen nur für den vereinbarten Zweck einräumt. Klären Sie vor dem Termin schriftlich, ob die Bilder auf Portalen, der eigenen Website und in Social-Media-Anzeigen verwendet werden dürfen, sonst drohen spätere Nutzungsstreitigkeiten.",
  },
  {
    q: "Wann lohnt sich ein Video zusätzlich zum Foto?",
    a: "Bei Objekten im gehobenen Segment oder mit besonderem Grundriss schafft ein kurzer Rundgang ein Raumgefühl, das Einzelfotos nicht liefern. Welche Video-Typen dafür infrage kommen und mit welchem Aufwand, zeigt die Seite Video für Makler.",
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

function Haken() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent" aria-hidden>
      <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5.2 4.4 8.6 11 1.4"
          stroke="#161613"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ImmobilienfotografieBriefingPage() {
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
            <p className="t-label !text-ink-yellow">Bildwelt fürs Exposé</p>
            <h1 className="t-display mt-4">
              {rich(
                "Immobilienfotografie-Briefing: das Dokument, das Objekte *größer* macht."
              )}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie briefen einen Immobilienfotografen mit einem festen Dokument, nicht mit einem
              Anruf am Morgen des Termins: Zeitfenster für Fassade und Garten, feste Kamera-Achsen
              statt Weitwinkel-Verzerrung, eine Pflichtliste je Raum und eine klare Regel für
              Bildrechte, bevor die erste Datei verschickt wird.{" "}
              <Highlight>Ohne dieses Dokument entscheidet der Fotograf vor Ort
              improvisierend, was er zeigt und was nicht</Highlight> — und genau das sieht man dem
              Exposé an. Reicht die Zeit für einen Termin nicht für jeden Raum einzeln, ersetzt ein
              kurzer Rundgang einen Teil der Einzelfotos, ohne dass die Bildsprache bricht.
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
                src={maklerAsset(3)}
                alt="Fotograf richtet die Kamera auf ein Stativ in Raumhöhe aus, Wohnzimmer im weichen Tageslicht"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Das Briefing — Fünf-Punkte-Nummernliste, übernehmbar ────────────── */}
      <section id="briefing" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zum Übernehmen"
              titel="Fünf Punkte, die aus einem Zuruf ein *Briefing* machen."
              sub="Jeder Punkt geht unverändert an den Fotografen — als Dokument, nicht als Gedächtnisstütze für das Telefonat davor."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {PUNKTE.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 60}>
                <div className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{punkt.titel}</p>
                  <p className="t-body mt-3">{punkt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bildrechte — Checkliste mit Häkchen ─────────────────────────────── */}
      <section id="bildrechte" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Bildrechte in drei Sätzen"
              titel="Wer die Bilder *nutzen* darf, gehört ins Auftragsdokument."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-10 max-w-[640px] space-y-4">
            {RECHTE.map((punkt, i) => (
              <Reveal key={punkt} delay={i * 60}>
                <div className="flex items-start gap-3">
                  <Haken />
                  <p className="t-body pt-0.5">{punkt}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="t-body mt-10 max-w-[640px]">
              Reicht die Zeit oder das Budget für ein klassisches Fotoshooting je Raum nicht,
              lohnt sich oft ein kurzer Rundgang statt zusätzlicher Einzelfotos. Welche
              Video-Typen dafür infrage kommen und mit welchem Aufwand, zeigt{" "}
              <Link href="/video-fuer-makler" className="ref-link">
                Video für Makler
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Foto zeigt einen Raum. Ein Briefing zeigt zwölf gleich." glyph>
              Ohne festes Dokument hängt jedes Objekt von der Tagesform des Fotografen ab. Mit
              Briefing sehen zwölf Objekte aus zwölf unterschiedlichen Terminen aus, als kämen sie
              aus derselben Bildwelt — genau das erwartet ein Eigentümer, der vorher drei Makler
              verglichen hat.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — 17 Jahre Markenarbeit als Bildsprache-Beleg ─────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Stilblatt</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              17 Jahre Markenarbeit, unter anderem für Bosch, Continental und Michelin: dieselbe
              Disziplin, mit der Weltmarken ihre Bildsprache kontrollieren, steckt in jedem
              Briefing-Dokument, das wir für ein Maklerbüro aufsetzen.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Link href="/exposes-die-verkaufen" className="ref-link mt-8 inline-block">
              Wie das Exposé aus diesen Bildern ein Entscheidungsdokument macht →
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
              titel="Was Sie vor dem *ersten* Termin wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Bildwelt*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie aus den Bildern ein{" "}
              <Link href="/exposes-die-verkaufen" className="ref-link">
                Exposé, das verkauft
              </Link>{" "}
              wird, und wann ein Rundgang das Foto ergänzt, zeigt{" "}
              <Link href="/video-fuer-makler" className="ref-link">
                Video für Makler
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
