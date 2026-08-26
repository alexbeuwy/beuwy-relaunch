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
 * Wissensseite (R3 Welle 2, Cluster C) — /google-unternehmensprofil-makler.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich (Kategorie,
 * Kontaktdaten, Fotos, Q&A). Hauptteil: PainRows zu den vier häufigsten
 * Versäumnissen, danach eine Wochenroutine-Tabelle (Wochentag → Aufgabe →
 * Zeitaufwand) als Umsetzungsplan. GelbeKarte, Beweis-Anriss über den
 * RIEGEL-Relaunch (342.000 €/9 Abschlüsse in 6 Wochen, Platz 21 von über
 * 25.000 Maklern beim ImmoScout24-Award). FAQ + FAQPage-JSON-LD. Foto 5
 * laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Google-Unternehmensprofil für Makler: Die unterschätzte Startseite | beuwy",
  description:
    "Google-Unternehmensprofil optimieren heißt für Makler: Kategorie exakt setzen, Fotos aktuell halten, Q&A beantworten — vier Bausteine plus Wochenroutine.",
  openGraph: {
    title: "Google-Unternehmensprofil für Makler: Die unterschätzte Startseite | beuwy",
    description:
      "Für die meisten Eigentümer ist das Google-Unternehmensprofil die erste Seite, die sie von Ihnen sehen. Kategorien, Bewertungs-Prozess, Beiträge, Q&A und eine feste Wochenroutine.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Die Kategorie steht noch auf „Unternehmensberatung“ oder ist gar nicht gesetzt.",
    answer:
      "Google zeigt Ihr Profil im lokalen Suchergebnis vor allem dann, wenn die Hauptkategorie exakt zur Suchanfrage passt. Steht dort die falsche oder eine zu allgemeine Kategorie, taucht Ihr Büro bei „Immobilienmakler in der Nähe“ erst gar nicht in der engeren Auswahl auf.",
  },
  {
    quote: "Das letzte Foto ist drei Jahre alt, das Büro sieht heute anders aus.",
    answer:
      "Ein Profil ohne neue Fotos wirkt verlassen, selbst wenn dahinter ein aktives Büro steht. Google wertet zudem regelmäßige Uploads als Aktivitätssignal — ein Profil, das seit Jahren stillsteht, verliert genau dort an Sichtbarkeit, wo es am günstigsten wäre, sie zu halten.",
  },
  {
    quote: "Eine Frage im Q&A-Bereich steht seit Monaten offen — beantwortet hat sie ein Fremder falsch.",
    answer:
      "Der Fragen-Bereich ist für jeden Nutzer öffentlich beschreibbar, auch die Antworten. Bleibt eine Frage zu Öffnungszeiten oder Leistungen unbeantwortet, beantwortet sie irgendwann jemand anderes, und diese Antwort steht dann dauerhaft unter Ihrem Namen.",
  },
  {
    quote: "Bewertungen kommen nur zufällig herein, nie auf Anfrage.",
    answer:
      "Ohne festen Prozess bleiben Bewertungen dem Zufall überlassen, meist von den lautesten, nicht den zufriedensten Kunden. Ein systematischer Ablauf dafür steht in einer eigenen Anleitung, siehe unten.",
  },
];

const ROUTINE = [
  { tag: "Montag", aufgabe: "Neuer Beitrag: aktuelles Angebot oder verkauftes Objekt der Woche", minuten: "10 Min" },
  { tag: "Mittwoch", aufgabe: "Bewertungsanfrage an den letzten Notartermin verschicken", minuten: "5 Min" },
  { tag: "Freitag", aufgabe: "Zwei bis drei neue Fotos aus der Woche hochladen", minuten: "10 Min" },
  { tag: "Wöchentlich einmal", aufgabe: "Q&A-Bereich prüfen, offene Fragen selbst beantworten", minuten: "5 Min" },
] as const;

const FAQS = [
  {
    q: "Wie lange dauert es, bis ein optimiertes Profil Wirkung zeigt?",
    a: "Rechnen Sie mit mehreren Wochen. Google sammelt Aktivitäts- und Relevanzsignale über Zeit, ein einmaliges Update ändert das Ranking selten über Nacht. Eine feste Wochenroutine wirkt zuverlässiger als ein aufwendiger Einmal-Aufwand.",
  },
  {
    q: "Kann ich mehrere Standorte in einem Profil verwalten?",
    a: "Nein, jeder Standort mit eigener Adresse braucht ein eigenes, einzeln verifiziertes Profil. Bei mehreren Büros lohnt sich die Standortgruppen-Funktion von Google, damit Beiträge und Einstellungen sich zentral pflegen lassen, ohne dass die Profile getrennt bleiben.",
  },
  {
    q: "Was mache ich mit einer schlechten Bewertung im Profil?",
    a: "Antworten Sie sachlich und öffentlich, bieten Sie eine Klärung außerhalb der Kommentarspalte an. Eine Löschung fordert Google nur bei einem echten Regelverstoß, nicht wegen einer unangenehmen, aber zutreffenden Kritik. Wie Sie systematisch mehr Bewertungen aufbauen, zeigt eine eigene Anleitung.",
  },
  {
    q: "Ersetzt das Google-Profil die eigene Website?",
    a: "Nein. Das Profil ist der erste Kontaktpunkt und schafft Vertrauen auf den ersten Blick, die eigene Website liefert die Tiefe: Referenzen, Bewertungsrechner, den vollständigen Auftritt. Beides zusammen entscheidet, ob aus einem Suchtreffer eine Anfrage wird.",
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

export default function GoogleUnternehmensprofilMaklerPage() {
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
            <p className="t-label !text-ink-yellow">Google-Sichtbarkeit</p>
            <h1 className="t-display mt-4">
              {rich("Google-Unternehmensprofil für Makler: die *unterschätzte* Startseite.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie optimieren Ihr Google-Unternehmensprofil, indem Sie die Hauptkategorie exakt auf
              „Immobilienmakler“ setzen, Kontaktdaten und Öffnungszeiten aktuell halten, laufend
              echte Fotos statt Stockmaterial hochladen und Fragen im Q&A-Bereich selbst
              beantworten, bevor es ein Fremder falsch tut.{" "}
              <Highlight>Für die meisten Eigentümer ist das Profil die erste Seite,
              die sie von Ihnen sehen, noch vor der eigenen Website</Highlight> — wer es leer oder
              veraltet lässt, verliert genau in diesem ersten Moment.
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
                alt="Makler prüft das eigene Google-Unternehmensprofil auf dem Laptop im Büro"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Versäumnisse — PainRows ──────────────────────────────────────────── */}
      <section id="versaeumnisse" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Was am häufigsten fehlt"
              titel="Vier Lücken, die ein Profil *unsichtbar* machen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Wochenroutine — Tabelle als Umsetzungsplan ──────────────────────── */}
      <section id="routine" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Wochenroutine"
              titel="30 Minuten pro Woche, fest *eingeplant* statt spontan."
              sub="Ein Profil lebt von Regelmäßigkeit, nicht von einer großen Kampagne im Januar. Diese vier Termine reichen für die meisten Maklerbüros."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">Termin</th>
                    <th className="t-label py-3 pr-6 font-semibold">Aufgabe</th>
                    <th className="t-label py-3 font-semibold">Zeitaufwand</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTINE.map((row) => (
                    <tr key={row.tag} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.tag}</td>
                      <td className="t-body py-4 pr-6">{row.aufgabe}</td>
                      <td className="t-body py-4 tnum">{row.minuten}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-8 max-w-[640px]">
              Wie aus der Bewertungsanfrage vom Mittwoch systematisch eine sichtbare Zahl wird,
              zeigt die eigene Anleitung{" "}
              <Link href="/bewertungen-aufbauen" className="ref-link">
                Bewertungen aufbauen
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
            <GelbeKarte label="Der Unterschied" titel="Das Profil ist keine Visitenkarte. Es ist die erste Landingpage." glyph>
              Die meisten Makler behandeln ihr Google-Profil wie ein einmalig ausgefülltes
              Formular. Wer es wie eine Landingpage pflegt — mit Beiträgen, aktuellen Fotos und
              beantworteten Fragen — verschafft sich einen Vorsprung, für den kein Wettbewerber
              extra bezahlen muss, ihn aber trotzdem kaum jemand nutzt.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL-Relaunch ─────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, keine Behauptung</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Für RIEGEL Immobilien haben wir den gesamten digitalen Auftritt neu aufgesetzt, das
              Google-Unternehmensprofil eingeschlossen: sechs Wochen später standen neun
              Abschlüsse, 342.000 € Volumen und Platz 21 von über 25.000 Maklern beim
              ImmoScout24-Award.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-8 inline-block">
              Fallstudie RIEGEL Immobilien lesen →
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
              titel="Was Sie vor dem *ersten* Update wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *erste* Landingpage.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie das Profil in die gesamte Sichtbarkeitsstrategie einzahlt, zeigt{" "}
              <Link href="/seo-fuer-immobilienmakler" className="ref-link">
                SEO für Immobilienmakler
              </Link>
              , wie Empfehlungen online ankommen, zeigt{" "}
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
