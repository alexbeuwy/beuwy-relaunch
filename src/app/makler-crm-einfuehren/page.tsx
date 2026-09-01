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
 * Wissens-Seite D21 — /makler-crm-einfuehren (R3-SEITENPLAN.json, Cluster
 * V). Prozess-Seite statt Vergleich — deshalb hier ein Phasen-Rail (30-Tage-
 * Plan, vier Etappen) statt Tabelle, plus PainRows für die typischen
 * Einführungs-Fehler (bislang auf keiner der drei Schwesterseiten dieser
 * Welle verwendet, sichert die geforderte Varianz). Beweis läuft über acta
 * (Text-Kronzeuge, kein eigener CaseGrid-Eintrag — Wortlaut übernommen aus
 * /immobilien-farming und /ueber-uns), weil die Pointe „Zufluss vor System"
 * genau dort belegt ist. Foto 6 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Makler-CRM einführen ohne Chaos: Der 30-Tage-Plan | beuwy",
  description:
    "Makler-CRM einführen ohne Chaos: Der 30-Tage-Plan für Migration, Datenhygiene und Team-Adoption. Ein CRM wird erst mit Zufluss aus dem Portal wertvoll.",
  openGraph: {
    title: "Makler-CRM einführen ohne Chaos: Der 30-Tage-Plan | beuwy",
    description:
      "Vier Phasen, dreißig Tage: Datenhygiene vor Migration, Struktur vor Zugriff, Anbindung vor Schulung, und warum ein CRM erst mit echtem Zufluss wertvoll wird.",
    type: "website",
    locale: "de_DE",
  },
};

const PHASEN = [
  {
    nr: "Tag 1–7",
    titel: "Datenhygiene",
    text: "Bestehende Kontakte sichten, Dubletten zusammenführen, veraltete Einträge markieren. Was hier nicht bereinigt wird, gilt im neuen System als Wahrheit.",
  },
  {
    nr: "Tag 8–14",
    titel: "Struktur & Rechte",
    text: "Felder, Status und Zuständigkeiten festlegen, bevor die erste Zeile importiert wird. Wer welche Anfrage sieht und bearbeitet, steht vor dem Livegang fest.",
  },
  {
    nr: "Tag 15–22",
    titel: "Migration & Anbindung",
    text: "Bereinigte Daten importieren, Website-Formulare und Bewertungsrechner ans CRM anbinden. Ab hier landet jede neue Anfrage automatisch mit Quelle im System.",
  },
  {
    nr: "Tag 23–30",
    titel: "Team-Adoption",
    text: "Schulung im laufenden Betrieb, nicht nur am Starttag. Nach den ersten echten Anfragen zeigt sich, wo noch Rückfragen bleiben. Die werden hier geklärt, bevor sie zur Gewohnheit werden.",
  },
] as const;

const PAINS = [
  {
    quote: "Wir migrieren erst, bereinigen später.",
    answer:
      "Jede Dublette und jede veraltete Telefonnummer landet unverändert im neuen System und wird dort zur neuen Wahrheit, weil sie niemand mehr hinterfragt.",
  },
  {
    quote: "Das ganze Team bekommt ab Tag eins Vollzugriff auf alles.",
    answer:
      "Ohne klare Rollen trägt jeder Daten anders ein. Aus einem einheitlichen System wird binnen Wochen wieder ein Sammelsurium, nur digital statt auf Papier.",
  },
  {
    quote: "Das CRM läuft, aber die Website spielt nicht mit.",
    answer:
      "Ohne Anbindung an Formulare und Bewertungsrechner bleibt der wichtigste Zufluss aus. Das System füllt sich nur, wenn jemand von Hand einträgt, und das passiert selten zuverlässig.",
  },
  {
    quote: "Die Schulung fand einmalig am Starttag statt.",
    answer:
      "Nach zwei Wochen im Tagesgeschäft sind die ersten Handgriffe vergessen. Ohne Wiederholung fällt das Team zurück in Zettel, Excel-Liste und E-Mail-Postfach.",
  },
] as const;

const FAQS = [
  {
    q: "Welches CRM sollte ich einführen?",
    a: "Das hängt von Größe, Budget und bestehenden Anbindungen Ihres Büros ab, keine pauschale Empfehlung passt für jedes Haus. Einen neutralen Überblick über die verbreitetsten Systeme finden Sie im Maklersoftware-Vergleich.",
  },
  {
    q: "Wie lange dauert die Migration bei einem großen Altbestand?",
    a: "Der Phasenplan bleibt gleich, die Dauer je Phase wächst mit der Menge und dem Zustand der Altdaten. Bei mehreren Tausend unsauberen Kontakten dauert allein die Datenhygiene oft länger als eine Woche.",
  },
  {
    q: "Muss ich alte Daten wirklich bereinigen, bevor ich migriere?",
    a: "Ja. Eine Migration überträgt Dubletten und veraltete Einträge eins zu eins ins neue System. Bereinigung danach ist deutlich aufwendiger, weil sich die Fehler bereits in den täglichen Arbeitsablauf eingenistet haben.",
  },
  {
    q: "Wie bekomme ich das Team zum Mitziehen?",
    a: "Über klare Rollen, wiederholte Schulung statt einmaligem Termin, und einen sichtbaren Nutzen im Alltag, etwa dass niemand mehr eine Anfrage von Hand aus dem Postfach ins System kopiert.",
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

export default function MaklerCrmEinfuehrenPage() {
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
            <p className="t-label !text-ink-yellow">Prozess</p>
            <h1 className="t-display mt-4">
              {rich("Ein CRM einführen, ohne dass das Tagesgeschäft *stillsteht*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ein CRM führen Sie in Ihrem Maklerbüro am wirkungsvollsten in vier Phasen über rund
              dreißig Tage ein: zuerst den Datenbestand bereinigen, dann Struktur und Rechte festlegen, danach
              migrieren und ans Portal anbinden, zuletzt das Team im laufenden Betrieb schulen.
              Wer zuerst migriert und später bereinigt, überträgt jeden alten Fehler unverändert
              ins neue System.{" "}
              <Highlight>Wertvoll wird ein CRM erst, wenn danach echter Zufluss aus der
              eigenen Website hineinfließt</Highlight>
              , sonst bleibt es eine gepflegte, aber leere Tabelle.
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
                alt="Team bereinigt und strukturiert Kontaktdaten am Bildschirm vor der CRM-Migration"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Phasen-Rail — der 30-Tage-Plan ───────────────────────────────── */}
      <section id="plan" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Plan"
              titel="Vier Phasen. Dreißig Tage. Keine *umgedrehte* Reihenfolge."
              sub="Jede Phase baut auf der vorherigen auf. Wer eine Phase überspringt, holt den Aufwand später doppelt nach."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {PHASEN.map((p, i) => (
              <Reveal key={p.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="t-data tnum">{p.nr}</p>
                  <p className="t-h3 mt-3">{p.titel}</p>
                  <p className="t-body mt-3">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PainRows — die vier häufigsten Einführungs-Fehler ───────────── */}
      <section id="fehler" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Was die Einführung verzögert"
              titel="Vier Sätze, die man in fast *jedem* Maklerbüro hört."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein leeres CRM ist eine teure Tabelle." glyph>
              Migration, Struktur und Schulung sind die Vorarbeit. Wert entsteht erst, wenn
              Anfragen von der eigenen Website automatisch dort landen, nicht wenn ein weiteres
              System eingerichtet, aber nie gefüttert wird.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Text-Kronzeuge acta, Zufluss vor System ─────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei acta stand der Zufluss, bevor ein System zur Pflicht wurde: rund 380 vermarktete
              Wohneinheiten über Instagram-Anzeigen, ein Volumen von rund 40 Mio. €. Ohne
              Anfragen ist das beste CRM eine leere Tabelle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *Einführung* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Textlinks zu Hub und Spec-Links ───────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir den *Zufluss*, der Ihr CRM füllt.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Welches System zu Ihrem Haus passt, zeigt der{" "}
              <Link href="/maklersoftware-vergleich" className="ref-link">
                Maklersoftware-Vergleich
              </Link>
              . Wie Sie Ihre Kontakte danach regelmäßig und ohne Streuverlust erreichen, steht
              unter{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                E-Mail-Marketing für Immobilienmakler
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
