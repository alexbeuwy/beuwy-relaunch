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
 * Wissensseite (R3 Welle 2, Cluster W) — /immobilien-farming. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich, danach ein Zweispalter
 * (klassischer Postwurf vs. digitale Omnipräsenz) und eine Checkliste mit
 * Häkchen für die digitale Grundausstattung. GelbeKarte, textlicher
 * Beweis-Anriss (acta, Instagram-Anzeigen), FAQ + FAQPage-JSON-LD. Foto 5
 * laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Immobilien-Farming: Der Stadtteil, der an Sie denkt | beuwy",
  description:
    "Immobilien-Farming digital heißt: regionale Omnipräsenz vom Google-Profil bis zur Story statt nur Postwurf. beuwy baut die Dominanz in Ihrem Stadtteil auf.",
  openGraph: {
    title: "Immobilien-Farming: Der Stadtteil, der an Sie denkt | beuwy",
    description:
      "Farming klassisch lief über den Postwurf, digital heißt es Omnipräsenz vom Google-Profil bis zur Story. beuwy baut die Dominanz, die Eigentümer im Stadtteil an Sie denken lässt.",
    type: "website",
    locale: "de_DE",
  },
};

const KLASSISCH = [
  "Flyer und Postwurf alle sechs bis acht Wochen im festgelegten Gebiet",
  "Streuverlust: der Flyer landet bei jedem Briefkasten, nicht nur bei Verkaufswilligen",
  "Ein Kontaktpunkt pro Wurf, dann Stille bis zur nächsten Runde",
  "Kaum messbar, welcher Flyer welchen Anruf ausgelöst hat",
] as const;

const DIGITAL = [
  "Google-Unternehmensprofil mit stadtteilgenauer Kategorie und laufenden Beiträgen",
  "Eine Landingpage pro Stadtteil statt einer Seite für die ganze Stadt",
  "Wöchentliche Story mit echten Objekten aus der Gegend, keine Stock-Bilder",
  "Datenmail an registrierte Interessenten, sobald ein Objekt im Gebiet online geht",
  "Jeder Touchpoint messbar: Klicks, Rechner-Starts, Registrierungen pro Stadtteil",
] as const;

const CHECKLISTE = [
  "Google-Unternehmensprofil mit Postleitzahl-genauer Kategorie",
  "Eine eigene Landingpage je Stadtteil, nicht eine für die ganze Stadt",
  "Wöchentliche Story mit Objekten aus genau diesem Gebiet",
  "Datenmail bei jedem neuen Objekt im Farming-Gebiet",
  "Bewertungen, die den Stadtteil im Klartext nennen",
  "Bewertungsrechner, der die Adresse aus dem Gebiet als Erstanker aufnimmt",
] as const;

const FAQS = [
  {
    q: "Reicht Social Media allein für digitales Farming?",
    a: "Nein. Eine Story ohne Google-Profil, ohne Landingpage und ohne Rechner ist nur ein einzelner Kontaktpunkt, wie ein Flyer. Farming funktioniert, wenn mehrere Kanäle im selben Gebiet gleichzeitig laufen und sich gegenseitig bestätigen.",
  },
  {
    q: "Wie groß sollte ein Farming-Gebiet sein?",
    a: "So groß, wie Sie es glaubwürdig mit lokalem Wissen füllen können, meist ein Stadtteil oder eine Kleinstadt, nicht eine ganze Großstadt auf einmal. Kleinere Gebiete mit hoher Wiederholung schlagen große Gebiete mit dünner Präsenz.",
  },
  {
    q: "Ist der klassische Postwurf jetzt überflüssig?",
    a: "Nicht zwingend. Viele Häuser fahren beides parallel: der Flyer bleibt ein physischer Anker, die digitale Ebene liefert die Wiederholung und die Messbarkeit, die Papier allein nicht schafft.",
  },
  {
    q: "Wie schnell zeigt digitales Farming Wirkung?",
    a: "Profil, Landingpage und die ersten Story-Formate stehen in vier bis sechs Wochen. Bis ein Stadtteil Sie als die naheliegende Adresse kennt, vergehen meist mehrere Monate konsequenter Wiederholung, keine einzelne Aktion.",
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

function HakenIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.8 8.2l2.1 2.1 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.5"
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

export default function ImmobilienFarmingPage() {
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
            <p className="t-label !text-ink-yellow">Akquise</p>
            <h1 className="t-display mt-4">{rich("Der Stadtteil, der an *Sie* denkt.")}</h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Farming heißt, in einem festgelegten Gebiet so konsequent präsent zu sein, dass
              Eigentümer dort <Highlight>automatisch an Sie denken</Highlight>, sobald sie
              verkaufen. Klassisch lief das über den Postwurf im Briefkasten. Digital heißt Farming:
              dieselbe Konsequenz, verteilt über Google-Profil, lokale Landingpage, Story-Präsenz
              und Datenmail, jedes davon ein weiterer, messbarer Kontaktpunkt im selben Stadtteil.
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
                src={maklerAsset(5)}
                alt="Makler geht durch einen Stadtteil, den er systematisch betreut"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zweispalter — Klassisch vs. Digital ─────────────────────────────── */}
      <section id="zweispalter" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zwei Wege, ein Ziel"
              titel="Derselbe Stadtteil, *zwei* Systeme."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="t-label">Klassisch: der Postwurf</p>
              <ul className="mt-5 space-y-4 border-t border-line-subtle pt-5">
                {KLASSISCH.map((zeile) => (
                  <li key={zeile} className="t-body border-b border-line-subtle pb-4">
                    {zeile}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-label !text-ink-cream">Digital: die Omnipräsenz</p>
              <ul className="mt-5 space-y-4 border-t border-line-subtle pt-5">
                {DIGITAL.map((zeile) => (
                  <li key={zeile} className="t-body border-b border-line-subtle pb-4">
                    {zeile}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Checkliste — die digitale Grundausstattung ──────────────────────── */}
      <section id="checkliste" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Grundausstattung"
              titel="Sechs Bausteine für ein *digitales* Farming-Gebiet."
              sub="Kein Baustein wirkt allein. Zusammen ergeben sie die Wiederholung, die ein Postwurf nie erreicht."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {CHECKLISTE.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-akzent-hover">
                    <HakenIcon />
                  </span>
                  <p className="t-body">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Dominanz ist Wiederholung, keine Anzeige." glyph>
              Eine einzelne Kampagne fällt auf. Sechs Wochen später ist sie vergessen. Ein
              Farming-System bleibt sichtbar, Woche für Woche, bis der Stadtteil Sie nicht mehr
              wiedererkennt, sondern erwartet.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — acta, Instagram-Anzeigen als Wiederholungs-Beleg ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              beuwy hat acta selbst mit aufgebaut: rund 380 vermarktete Wohneinheiten über
              Instagram-Anzeigen, ein Volumen von rund 40 Mio. €. Nicht eine Kampagne, sondern die
              Wiederholung, die digitales Farming ausmacht.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *ersten* Gespräch wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *Omnipräsenz*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die Story- und Kanal-Seite unter{" "}
              <Link href="/social-media-immobilienmakler" className="ref-link">
                Social Media für Immobilienmakler
              </Link>{" "}
              und die Datenmail-Strecke im{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                E-Mail-Marketing für Immobilienmakler
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
