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
 * Wissens-Seite — /makler-website-fehler (R3-SEITENPLAN.json, Cluster C).
 * Angle verlangt 11 Fehler mit sichtbarem Beispielmuster + Kosten in
 * Anfragen, dazu einen Selbst-Audit in 10 Minuten — deshalb hier eine lange
 * Nummern-Liste (11 Fehler, vertikal statt Grid, weil die Menge ein
 * Spalten-Raster sprengen würde) gefolgt von einer kompakten
 * Selbst-Audit-Checkliste, die dieselben elf Punkte als Ja/Nein-Fragen
 * bündelt. Kosten-Angaben bleiben qualitativ (keine erfundenen Prozent- oder
 * Anfragenzahlen), wie im Rest der Seite. Foto 2 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Die 11 häufigsten Makler-Website-Fehler — und ihre Kosten | beuwy",
  description:
    "Die 11 häufigsten Makler-Website-Fehler: jedes Muster mit sichtbarem Beispiel und seiner Kosten in Anfragen, plus Selbst-Audit in 10 Minuten zum Nachprüfen.",
  openGraph: {
    title: "Die 11 häufigsten Makler-Website-Fehler — und ihre Kosten | beuwy",
    description:
      "Von langsamer Ladezeit bis fehlender CRM-Anbindung: 11 Muster, an denen Makler-Websites Anfragen verlieren, mit Selbst-Audit in 10 Minuten.",
    type: "website",
    locale: "de_DE",
  },
};

type Fehler = { titel: string; muster: string; kosten: string };

const FEHLER: Fehler[] = [
  {
    titel: "Ladezeit über drei Sekunden",
    muster: "Die Startseite baut sich sichtbar Stück für Stück auf, weil Bilder in voller Auflösung ungeoptimiert nachladen.",
    kosten: "Der Eigentümer öffnet parallel den nächsten Makler-Tab, während Ihre Seite noch lädt — die Konkurrenz gewinnt, bevor Ihr Angebot überhaupt sichtbar ist.",
  },
  {
    titel: "Kein direkter Weg zur Anfrage",
    muster: "Wer eine Immobilie bewerten lassen will, findet nur eine allgemeine Kontaktseite mit Postanschrift statt eines Rechners oder Formulars, das sofort startet.",
    kosten: "Jeder Klick, der zu einer weiteren Seite führt, verliert einen Teil der Besucher — wer suchen muss, bricht ab, statt anzufragen.",
  },
  {
    titel: "Kontaktformular ohne Rückmeldung",
    muster: "Nach dem Absenden erscheint keine Bestätigung, keine Mail geht raus, kein Hinweis, wann sich jemand meldet.",
    kosten: "Der Absender weiß nicht, ob die Anfrage angekommen ist, und schreibt sicherheitshalber gleich noch einem zweiten Makler.",
  },
  {
    titel: "Nicht wirklich mobil optimiert",
    muster: "Texte lassen sich auf dem Smartphone nur mit Pinch-to-Zoom lesen, Buttons liegen so eng, dass der falsche Link geöffnet wird.",
    kosten: "Der größte Teil der Besucher kommt heute über das Smartphone — eine Seite, die dort schlecht bedienbar ist, verliert genau diese Mehrheit zuerst.",
  },
  {
    titel: "Stockfotos statt echter Bilder",
    muster: "Das immer gleiche Lächeln-Team-Stockfoto, das auch auf zehn anderen Makler-Websites in anderen Städten auftaucht.",
    kosten: "Wer ein Stockfoto wiedererkennt, verliert Vertrauen in den ganzen Auftritt — inklusive der echten Zahlen, die daneben stehen.",
  },
  {
    titel: "Exposé nur als PDF hinter einem Formular",
    muster: "Wer sich ein Objekt ansehen will, muss erst Name und Telefonnummer hinterlassen, bevor ein einziges Foto zu sehen ist.",
    kosten: "Ein Teil der Interessenten bricht genau an dieser Hürde ab, statt die Kontaktdaten für ein Objekt herzugeben, das sie noch nicht einmal gesehen haben.",
  },
  {
    titel: "Rechtlich unvollständiges Impressum",
    muster: "Angaben zur Berufshaftpflicht oder zur zuständigen Aufsichtsbehörde fehlen, obwohl sie für Immobilienmakler vorgeschrieben sind.",
    kosten: "Eine Lücke, die ein aufmerksamer Eigentümer als Nachlässigkeit liest — bei einem Geschäft, das auf Vertrauen aufbaut, wirkt das gegen Sie.",
  },
  {
    titel: "Eine Seite für alle Städte und Stadtteile",
    muster: "Die Startseite nennt vage „unsere Region“, ohne dass eine einzige Seite die Stadt oder den Stadtteil beim Namen nennt, in dem gesucht wird.",
    kosten: "Wer „Makler [Stadtteil]“ sucht, findet stattdessen den Mitbewerber, der genau dafür eine eigene Seite gebaut hat.",
  },
  {
    titel: "Keine sichtbaren Trust-Signale",
    muster: "Keine Bewertung, keine Zahl, keine Fallstudie — nur ein Fließtext darüber, wie sehr man sich um jeden Kunden kümmert.",
    kosten: "Eine Behauptung ohne Beleg überzeugt niemanden, der gerade drei Maklerauftritte nebeneinander offen hat.",
  },
  {
    titel: "Schlechte Kontraste und keine Tastaturbedienung",
    muster: "Hellgrauer Text auf weißem Grund, Buttons, die sich ohne Maus nicht anklicken lassen.",
    kosten: "Ein Teil der Besucher kann die Seite so schlicht nicht nutzen — unabhängig von Sehschärfe oder Endgerät. Details zur Pflicht dahinter unter Barrierefreie Maklerwebsite.",
  },
  {
    titel: "Keine Anbindung ans CRM",
    muster: "Anfragen landen in einem allgemeinen Postfach, das mehrere Personen im Büro mitlesen, ohne feste Zuständigkeit.",
    kosten: "Was in keinem System mit Frist steht, wird im Tagesgeschäft vergessen — die Anfrage von gestern Abend ist morgen früh keine Priorität mehr.",
  },
];

const AUDIT = FEHLER.map((f) => `${f.titel}: geprüft?`);

const FAQS = [
  {
    q: "Wie lange dauert der Selbst-Audit wirklich?",
    a: "Zehn Minuten reichen, wenn Sie die eigene Website parallel auf dem Smartphone und am Rechner öffnen und die elf Punkte der Reihe nach durchgehen. Für eine rechtliche Prüfung von Impressum und Datenschutz braucht es danach trotzdem einen genaueren Blick.",
  },
  {
    q: "Welcher Fehler kostet am meisten?",
    a: "Meist die Kombination aus langsamer Ladezeit und fehlendem direktem Weg zur Anfrage — beide zusammen sorgen dafür, dass ein interessierter Besucher die Seite verlässt, bevor er überhaupt eine Möglichkeit hatte, Kontakt aufzunehmen.",
  },
  {
    q: "Reicht es, einzelne Fehler zu beheben?",
    a: "Kurzfristig hilft das, langfristig bleibt eine Website mit Software-Vorlage anfällig für den nächsten Fehler auf der Liste. Ein Portal, das von Anfang an auf diese Punkte ausgelegt ist, spart die wiederkehrende Fehlersuche.",
  },
  {
    q: "Was kostet ein Website-Relaunch, der diese Fehler vermeidet?",
    a: "Das hängt vom Umfang ab, eine Einordnung nach Leistungsstufen zeigt Maklerwebsite-Kosten.",
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

function HaekchenIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className="shrink-0 text-ink-yellow"
      aria-hidden
    >
      <circle cx="7.5" cy="7.5" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.6 7.7l1.8 1.8 4-4.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MaklerWebsiteFehlerPage() {
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
            <p className="t-label !text-ink-yellow">Website-Fehler</p>
            <h1 className="t-display mt-4">
              {rich("Die 11 häufigsten Makler-Website-*Fehler* — und ihre Kosten.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Makler-Websites verlieren Anfragen selten an einem einzigen großen Problem,
              sondern an elf immer wiederkehrenden Mustern: von der Ladezeit über fehlende
              Trust-Signale bis zur Anfrage, die im allgemeinen Postfach verschwindet.{" "}
              <Highlight>
                Jeder Fehler kostet nicht Geld direkt, sondern die Anfrage, die dadurch nie
                entsteht
              </Highlight>
              .
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
                src={maklerAsset(2)}
                alt="Makler prüft die eigene Website auf Laptop und Smartphone nebeneinander"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — 11 Fehler, Muster + Kosten ──────────────────── */}
      <section id="fehler" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Elf Muster"
              titel="Jeder Fehler hat ein sichtbares Muster — und eine *Kosten*-Seite."
              sub="Kein Fehler steht für sich allein. Zusammen erklären sie, warum eine Website online steht und trotzdem keine Anfragen bringt."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 space-y-10 border-t border-line-subtle pt-10">
            {FEHLER.map((fehler, i) => (
              <Reveal key={fehler.titel} delay={(i % 6) * 40}>
                <div className="grid gap-3 sm:grid-cols-[64px_1fr] sm:gap-8">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="t-h3">{fehler.titel}</p>
                    <p className="t-body mt-3 max-w-[62ch]">{fehler.muster}</p>
                    <p className="t-small mt-2 max-w-[62ch] !text-ink-dim">{fehler.kosten}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selbst-Audit — 11 Punkte in 10 Minuten ──────────────────────── */}
      <section id="audit" className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Selbst-Audit"
              titel="Elf Fragen, *zehn* Minuten, ein ehrliches Bild Ihrer Website."
              sub="Öffnen Sie Ihre Website parallel auf dem Smartphone und gehen Sie jeden Punkt einmal durch."
              className="max-w-[640px]"
            />
          </Reveal>
          <div className="mt-10 space-y-4">
            {AUDIT.map((punkt, i) => (
              <Reveal key={punkt} delay={i * 30}>
                <div className="flex items-start gap-3 border-b border-line-subtle pb-4">
                  <span className="mt-0.5">
                    <HaekchenIcon />
                  </span>
                  <p className="t-body">{punkt}</p>
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
            <GelbeKarte label="Der Unterschied" titel="Elf einzelne Fixes sind kein Fundament." glyph>
              Jeder Punkt oben lässt sich einzeln flicken. Ein Portal, das von Anfang an auf
              Tempo, Struktur und CRM-Anbindung gebaut ist, muss diese Liste kein zweites Mal
              abarbeiten, weil keiner der elf Fehler im Bauplan vorkommt.
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
              RIEGEL Immobilien startete mit genau diesen Fehlern im alten Auftritt. Nach dem
              Relaunch: neun Abschlüsse, 342.000 € Volumen in sechs Wochen, Platz 21 von über
              25.000 Maklern beim ImmoScout24-Award.
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
              titel="Was Sie vor dem eigenen *Audit* wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir eine Website ohne diese *elf* Fehler.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie ein Auftritt aussieht, der von Anfang an keinen dieser Fehler macht, zeigt{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                Website für Immobilienmakler
              </Link>
              . Einen direkten Weg zur Anfrage testen Sie am{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
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
