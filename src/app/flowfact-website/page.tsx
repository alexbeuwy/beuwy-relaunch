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
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissensseite (R3 Welle 2, Cluster V) — /flowfact-website. Beantwortet
 * "Wie kommt meine Website an FLOWFACT?" wörtlich im Kopf, dann PainRows
 * zur Schnittstellen-Realität (doppelte Datenpflege als stiller
 * Kostenfaktor), eine Nummern-Liste mit dem Anbindungsmuster von beuwy,
 * GelbeKarte, Beweis-Anriss (RIEGEL CRM-Anbindung + 17 Jahre
 * Systemarbeit), FAQ + FAQPage-JSON-LD. Foto 1 laut R3-SEITENPLAN.json.
 * Nur ein Spec-Link (maklersoftware-vergleich) — Finale entsprechend
 * schlanker als bei den anderen drei Routen.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FLOWFACT-Website: Anbindung statt Insellösung | beuwy",
  description:
    "FLOWFACT-Website: wie die Anbindung an Ihr CRM funktioniert, warum doppelte Datenpflege ein stiller Kostenfaktor ist, und das Anbindungsmuster von beuwy.",
  openGraph: {
    title: "FLOWFACT-Website: Anbindung statt Insellösung | beuwy",
    description:
      "Objekte aus FLOWFACT automatisch auf die Website, Anfragen mit Quelle zurück ins CRM: das Anbindungsmuster gegen doppelte Datenpflege und getrennte Insellösungen.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Der Preis wird in FLOWFACT geändert. Auf der Website steht noch der alte.",
    answer:
      "Ohne Anbindung sind Website und CRM zwei getrennte Wahrheiten. Jede Änderung im System muss jemand ein zweites Mal von Hand auf der Website nachziehen, sonst sieht der Interessent einen falschen Preis.",
  },
  {
    quote: "Ein neues Objekt braucht zwei Uploads, eins ins CRM, eins auf die Website.",
    answer:
      "Doppelte Pflege kostet Zeit, die niemand bucht, die aber jede Woche anfällt. Bei fünf neuen Objekten im Monat sind das fünf Vorgänge, die es mit einer sauberen Anbindung gar nicht gäbe.",
  },
  {
    quote: "Anfragen von der Website landen im allgemeinen Postfach, nicht im FLOWFACT-Vorgang.",
    answer:
      "Ohne Rückkanal weiß niemand, welche Anfrage zu welchem Objekt und welchem Vorgang gehört. Der Rückruf verzögert sich, oder er fällt ganz durch, weil die Information im falschen System liegt.",
  },
  {
    quote: "Niemand im Team weiß mehr, welches System gerade die Wahrheit ist.",
    answer:
      "Wachsen Website und CRM getrennt, driften Objektstatus, Preise und Kontaktdaten irgendwann auseinander. Am Ende prüft das Team beide Systeme, bevor es einem Eigentümer eine verbindliche Auskunft gibt.",
  },
] as const;

const SCHRITTE = [
  {
    titel: "Analyse der bestehenden FLOWFACT-Struktur",
    text: "Wir sichten Objektfelder, Vorgangslogik und die vorhandene Schnittstelle, bevor eine Zeile Website-Code entsteht.",
  },
  {
    titel: "Objekt-Sync einrichten",
    text: "Objekte laufen automatisch aus FLOWFACT auf die Website, im Layout Ihrer Marke statt im Standard-Raster.",
  },
  {
    titel: "Anfrage-Routing mit Score",
    text: "Jede Anfrage schreibt mit Quelle und Score direkt in den passenden FLOWFACT-Vorgang, kein Postfach dazwischen.",
  },
  {
    titel: "Testphase mit echten Objekten",
    text: "Vor dem Livegang prüfen wir Preisänderungen, neue Objekte und eingehende Anfragen im echten Datenfluss, nicht nur mit Testdaten.",
  },
] as const;

const FAQS = [
  {
    q: "Muss ich FLOWFACT wechseln?",
    a: "Nein. Ihr CRM bleibt exakt so, wie es ist — wir docken an, wir ersetzen nichts.",
  },
  {
    q: "Wie technisch aufwendig ist eine FLOWFACT-Anbindung?",
    a: "Das hängt von Ihrer bestehenden Datenstruktur ab. In den meisten Fällen läuft die Anbindung über eine vorhandene Exportschnittstelle, die wir sauber an die Website anbinden, statt eine neue Insellösung zu bauen.",
  },
  {
    q: "Was kostet doppelte Datenpflege wirklich?",
    a: "Selten einen sichtbaren Posten in der Buchhaltung, aber jede Woche Zeit im Team: ein zweiter Upload je Objekt, eine zweite Preisänderung, eine Anfrage, die erst gesucht werden muss. Genau das fällt mit einer sauberen Anbindung weg.",
  },
  {
    q: "Funktioniert dasselbe Prinzip auch mit anderen CRMs?",
    a: "Ja. Das Prinzip ist bei jedem System dasselbe — welche Anbindung sich für Ihr Haus lohnt, zeigt der Maklersoftware-Vergleich.",
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

export default function FlowfactWebsitePage() {
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

      {/* ── Wissens-Kopf ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">CRM · FLOWFACT</p>
            <h1 className="t-display mt-4">
              {rich("FLOWFACT-Website: *Anbindung* statt Insellösung.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Über eine Schnittstelle, die Objekte automatisch aus FLOWFACT auf die Website
              spielt und Anfragen mit Quelle zurück in den passenden Vorgang schreibt, statt
              Website und CRM als zwei getrennte Systeme zu pflegen. In der Praxis läuft das über
              die vorhandene Exportstrecke oder eine direkte Anbindung —{" "}
              <Highlight>technisch lösbar, aber nur so gut, wie die Website sie sauber
              entgegennimmt</Highlight>. Fehlt diese Anbindung, pflegt jemand im Team dieselben
              Daten zweimal.
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
                alt="Makler gleicht am Bildschirm zwei Systeme ab, CRM-Vorgang und Website-Ansicht"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem — Schnittstellen-Realität, PainRows ─────────────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Schnittstellen-Realität"
              titel="Zwei Systeme ohne Anbindung sind zwei *Wahrheiten*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Nummern-Liste — Anbindungsmuster von beuwy ───────────────────── */}
      <section id="anbindung" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Anbindungsmuster"
              titel="Vier Schritte von der *Analyse* bis zum Livegang."
              sub="Kein neues CRM, keine Umstellung für das Team — die Website lernt, mit FLOWFACT zu sprechen, nicht umgekehrt."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {SCHRITTE.map((s, i) => (
              <Reveal key={s.titel} delay={i * 40}>
                <div className="border-t border-line-subtle pt-5">
                  <p className="t-label">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-[15px] font-semibold text-ink-cream">{s.titel}</p>
                  <p className="t-body mt-2">{s.text}</p>
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
            <GelbeKarte label="Der Unterschied" titel="Zwei Systeme. Eine Wahrheit." glyph>
              Jede doppelt gepflegte Objektzeile kostet Zeit, die niemand bucht, aber jeder im
              Team spürt. Eine saubere Anbindung macht FLOWFACT und Website zu einem System mit
              zwei Ansichten, statt zu zwei Systemen, die jemand von Hand synchron hält.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL + Systemarbeit seit 17 Jahren ─────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              beuwy verbindet Marke und System seit 17 Jahren, zuletzt für Häuser wie Ihres. Bei
              RIEGEL Immobilien landet jede Anfrage mit Quelle und nächstem Schritt direkt im
              Maklersystem — Ergebnis: neun Abschlüsse, 342.000 € Volumen in sechs Wochen.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor der *Anbindung* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
          <p className="t-small mt-10 max-w-[54ch]">
            FLOWFACT ist eine Marke der FLOWFACT AG. beuwy ist unabhängiger Dienstleister.
          </p>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Eine Wahrheit. Ein *System*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie die Anbindung bei anderen Systemen aussieht, zeigt der{" "}
              <Link href="/maklersoftware-vergleich" className="ref-link">
                Maklersoftware-Vergleich
              </Link>
              . Den Überblick über alle Bausteine finden Sie im{" "}
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
