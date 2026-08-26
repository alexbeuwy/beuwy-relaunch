import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Wissens-Seite D18 — /immoscout-profil-vs-eigene-website (R3-SEITENPLAN.json,
 * Cluster V). Kompakter Wissens-Kopf statt 70vh-Hero: Antwort auf die
 * Suchfrage direkt unter dem H1 (GEO-Prinzip). Hauptteil als Zweispalter
 * (Portal-Profil vs. eigene Website), weil die Seite zwei Flächen
 * nebeneinanderstellt statt eine Matrix aus mehreren Anbietern — dafür ist
 * /makler-website-baukasten-vergleich mit einer echten Tabelle da. Beweis
 * läuft über RIEGEL (CaseGrid), weil der Case selbst über ein
 * ImmoScout24-Ranking geführt wird und damit exakt zum Thema passt. Foto 3
 * laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ImmoScout-Profil vs. eigene Website: Wo Eigentümer wirklich prüfen | beuwy",
  description:
    "ImmoScout-Profil vs. eigene Website: Ihr Portal-Profil steht direkt neben jedem Konkurrenten, Ihre eigene Domain ist der einzige Ort ohne Vergleichsspalte.",
  openGraph: {
    title: "ImmoScout-Profil vs. eigene Website: Wo Eigentümer wirklich prüfen | beuwy",
    description:
      "Ihr Portal-Profil steht direkt neben jedem Konkurrenten. Ihre eigene Domain ist der einzige Ort, an dem ein Eigentümer Sie ohne Vergleichsspalte sieht.",
    type: "website",
    locale: "de_DE",
  },
};

const VERGLEICH = [
  {
    aspekt: "Nachbarschaft",
    portal:
      "Ihr Angebot steht in derselben Trefferliste wie der Konkurrent von nebenan — oft direkt über oder unter ihm, mit einem Klick zum Vergleich.",
    eigen:
      "Auf Ihrer Domain gibt es keinen Wettbewerber auf derselben Seite. Der Eigentümer sieht nur Sie, nicht die Alternative daneben.",
  },
  {
    aspekt: "Gestaltung",
    portal:
      "Gleiches Template, gleiche Schriftart, gleiche Kachelgröße wie bei über 25.000 anderen Maklerprofilen auf derselben Plattform.",
    eigen:
      "Ihre Marke, Ihre Bildsprache, Ihre Reihenfolge der Argumente — nichts davon teilen Sie mit dem nächsten Profil in der Liste.",
  },
  {
    aspekt: "Exposé-Tiefe",
    portal:
      "Datenfelder in der Reihenfolge, die das Portal vorgibt: Zahlen zuerst, Geschichte des Objekts gar nicht.",
    eigen:
      "Eine Dramaturgie, die den Preis begründet, bevor die Zahl überhaupt fällt — mehr dazu unter Exposés, die verkaufen.",
  },
  {
    aspekt: "Anfrage-Weg",
    portal:
      "Die Anfrage geht zuerst an das Portal-Postfach, häufig mit Zeitverzug und ohne Angabe, welches Objekt gemeint war.",
    eigen:
      "Die Anfrage landet direkt mit Quelle und Objektbezug in Ihrem CRM, bevor der Eigentümer den Tab wieder schließt.",
  },
  {
    aspekt: "Google-Ranking",
    portal:
      "Sie ranken für die Marke des Portals. Sucht jemand „Immobilienmakler [Ihre Stadt]“, taucht Ihr Profil bestenfalls tief unten auf.",
    eigen:
      "Jede Suche nach Ihrer Stadt kann zu Ihnen führen — vorausgesetzt, die Seite ist dafür gebaut. Details dazu im SEO-Ratgeber.",
  },
  {
    aspekt: "Lebensdauer",
    portal:
      "Das Profil existiert, solange das Portal-Abo läuft. Kündigen Sie, verschwindet jede bisherige Sichtbarkeit mit ihm.",
    eigen:
      "Die Domain gehört Ihnen. Jede Fallstudie, jede Bewertung, jeder Rang bleibt erhalten, unabhängig vom Portal-Vertrag.",
  },
] as const;

const FAQS = [
  {
    q: "Soll ich mein ImmoScout-Profil dann kündigen?",
    a: "Nein. Portale bringen Reichweite, die eine junge Website allein nicht aufbaut. Die Frage ist nicht Portal oder Website, sondern ob Ihre eigene Domain überhaupt existiert, wenn ein Eigentümer nach dem Profil noch einmal googelt.",
  },
  {
    q: "Prüfen Eigentümer wirklich beides?",
    a: "In der Praxis ja. Ein Eigentümer, der drei Makler auf einem Portal sieht, googelt danach meist mindestens einen Namen — und findet entweder eine eigene Seite mit Substanz oder gar nichts außer dem Profil, das er schon kannte.",
  },
  {
    q: "Reicht eine einfache Website mit Kontaktformular?",
    a: "Als Minimum ja, als Entscheidungsgrundlage selten. Eine Website ohne Fallstudien, ohne Bewertungsrechner und ohne klare Positionierung unterscheidet sich für den Eigentümer kaum vom Portal-Profil daneben.",
  },
  {
    q: "Wie schnell steht eine eigene Website, die diesen Unterschied macht?",
    a: "Je nach Umfang vier bis sechs Wochen von der Analyse bis zum Livegang. Ein Systemgespräch reicht, um den Aufwand für Ihr Haus konkret einzuschätzen.",
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

export default function ImmoscoutProfilVsEigeneWebsitePage() {
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

      {/* ── Wissens-Kopf — kompakt statt 70vh-Hero, Antwort direkt unter H1 ── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Vergleich</p>
            <h1 className="t-display mt-4">
              {rich("ImmoScout-Profil oder eigene Website: Wo Eigentümer wirklich *prüfen*.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Nein — Ihr ImmoScout-Profil reicht als alleiniger Online-Auftritt nicht aus, weil es
              neben dem Profil des nächsten Maklers auf derselben Seite steht, im selben Layout,
              oft direkt unter dem Wettbewerber mit dem günstigeren Angebot.{" "}
              <Highlight>
                Eine eigene Website ist die einzige Fläche, auf der ein Eigentümer Sie ohne
                Vergleichsspalte sieht
              </Highlight>
              . Wer beide Kanäle kombiniert, Portal-Reichweite und eigene Domain, gewinnt den
              Alleinauftrag häufiger als wer sich allein aufs Portal verlässt.
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
                alt="Makler prüft am Laptop den eigenen Online-Auftritt neben dem Portal-Profil"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zweispalter — Portal-Profil vs. eigene Website, sechs Aspekte ── */}
      <section id="vergleich" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zwei Flächen, ein Eigentümer"
              titel="Gemietete Fläche gegen *eigene* Domain."
              sub="Sechs Aspekte, an denen der Unterschied für den Eigentümer sichtbar wird — nicht abstrakt, sondern an dem, was er auf beiden Seiten tatsächlich sieht."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 border-t border-line-subtle">
            {VERGLEICH.map((v, i) => (
              <Reveal key={v.aspekt} delay={i * 50}>
                <div className="grid gap-4 border-b border-line-subtle py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 lg:grid-cols-[10rem_1fr_1fr] lg:gap-10">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.04em] text-ink-dim">
                    {v.aspekt}
                  </p>
                  <div>
                    <p className="t-data mb-2">Auf dem Portal</p>
                    <p className="t-body">{v.portal}</p>
                  </div>
                  <div>
                    <p className="t-data mb-2 !text-ink-yellow">Auf Ihrer Website</p>
                    <p className="t-body">{v.eigen}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ihr Profil gehört dem Portal." glyph>
              Es steht neben dem Konkurrenten, trägt dessen Layout und verschwindet mit dem
              Abo. Eine eigene Website gehört Ihnen — inklusive jedem Rang, jeder Fallstudie und
              jeder Bewertung, die Sie darauf aufbauen.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, weil der Case über ein ImmoScout24-Ranking läuft ── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              RIEGEL Immobilien stand vorher auf ImmoScout24 wie jeder Wettbewerber daneben. Nach
              dem Relaunch der eigenen Website: Platz 21 von über 25.000 Maklern beim
              ImmoScout24-Award, neun Abschlüsse, 342.000 € Volumen in sechs Wochen.
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
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *nächsten* Vergleich wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *eigene* Fläche.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie eine Website aussieht, die den Vergleich gewinnt, statt daneben zu stehen, zeigt
              der Ratgeber{" "}
              <Link href="/website-fuer-immobilienmakler" className="ref-link">
                Website für Immobilienmakler
              </Link>
              . Wie Sie zusätzlich eigene Eigentümer-Leads statt gemieteter Portal-Kontakte
              aufbauen, steht unter{" "}
              <Link href="/eigentuemer-leads-generieren" className="ref-link">
                Eigentümer-Leads generieren
              </Link>
              . Einen Überblick über alle Bausteine bietet der{" "}
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
