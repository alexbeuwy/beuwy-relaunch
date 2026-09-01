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
 * Wissensseite (R3 Welle 2, Cluster V) — /propstack-website. Beantwortet
 * "Kann ich meine Website direkt aus Propstack betreiben?" wörtlich im
 * Kopf, dann ein Zweispalter (was das CRM liefert vs. was ein eigenes
 * Portal zusätzlich braucht), eine Nummern-Liste zur sauberen Anbindung,
 * GelbeKarte im Motor/Schaufenster-Bild (konsistent zu
 * /maklersoftware-vergleich), Beweis-Anriss RIEGEL (CRM-Anbindung), FAQ +
 * FAQPage-JSON-LD. Foto 19 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Propstack-Website: Was das CRM kann und wo der Auftritt beginnt | beuwy",
  description:
    "Propstack-Website: Das CRM liefert eine funktionierende Objekt-Website, aber ein Datenblatt, keine Marke. Wo Propstack endet und ein eigenes Portal beginnt.",
  openGraph: {
    title: "Propstack-Website: Was das CRM kann und wo der Auftritt beginnt | beuwy",
    description:
      "Propstack liefert eine funktionierende CRM-Website. Für den Alleinauftrag zählt, was ein Eigentümer vorher sieht — dafür braucht es Marke und saubere Anbindung statt Ersatz.",
    type: "website",
    locale: "de_DE",
  },
};

const PROPSTACK_LIEFERT = [
  "Automatische Objekt-Veröffentlichung direkt aus dem CRM-Datensatz",
  "Ein technisch laufendes Grundgerüst ohne separate Website-Software",
  "Konsistente Objektdaten, weil Website und CRM dieselbe Quelle nutzen",
  "Eine offene Schnittstellenphilosophie, die Anbindungen grundsätzlich erlaubt",
] as const;

const PORTAL_BRAUCHT_ZUSAETZLICH = [
  "Eigene Typografie, Farbwelt und Bildsprache statt CRM-Vorlage",
  "Einen Bewertungsrechner, der Eigentümer-Leads vorqualifiziert, nicht nur ein Kontaktformular",
  "Lokale Landingpages pro Stadtteil, die eine reine Objekt-Website nicht kennt",
  "Eine Registrierungs- und Nachfassstrecke, die weiterläuft, wenn der Eigentümer nicht sofort verkauft",
] as const;

const SCHRITTE = [
  {
    titel: "Objekt-Sync direkt aus Propstack",
    text: "Objekte laufen automatisch aus Propstack auf die Website — im Layout Ihrer Marke, nicht im Raster des CRM. Ändern Sie den Preis im System, zieht die Website nach.",
  },
  {
    titel: "Anfragen mit Quelle und Score zurück ins CRM",
    text: "Jede Anfrage landet mit Quelle und Score direkt in Ihrem Propstack, kein Copy-Paste, kein Zettel, kein vergessener Rückruf.",
  },
  {
    titel: "Bewertungsrechner als Vorqualifizierung",
    text: "Der Rechner nimmt die Adresse auf und liefert eine Ersteinschätzung — der Eigentümer-Lead liegt als Kontakt mit Score im CRM, nicht nur als E-Mail im Postfach.",
  },
  {
    titel: "Ein Datensatz, keine Parallelpflege",
    text: "Objektdaten bleiben ausschließlich in Propstack. Die Website liest sie über die bestehende Schnittstelle, statt eine zweite Wahrheit aufzubauen.",
  },
] as const;

const FAQS = [
  {
    q: "Ersetzt ein eigenes Portal Propstack?",
    a: "Nein. Propstack bleibt Ihr CRM und Ihre Objektverwaltung. Ein eigenes Portal ist der Auftritt davor, der an genau dieses System andockt, statt es zu ersetzen.",
  },
  {
    q: "Reicht die Propstack-Website für den Start?",
    a: "Für die reine Objektpräsenz ja. Für den Alleinauftrag gegen einen Mitbewerber mit eigener Marke entscheidet meist, was der Eigentümer vorher im Netz sieht, nicht nur, ob das Objekt korrekt dargestellt ist.",
  },
  {
    q: "Wie lange dauert die Anbindung an Propstack?",
    a: "Analyse, Design und Anbindung stehen üblicherweise innerhalb weniger Wochen. Eine feste Zahl nennen wir erst, wenn wir Ihre bestehende Datenstruktur kennen.",
  },
  {
    q: "Funktioniert dasselbe Prinzip auch mit anderen CRMs?",
    a: "Ja, das Prinzip ist bei jedem System dasselbe. Welche Anbindung sich für Ihr Haus lohnt, zeigt der Maklersoftware-Vergleich.",
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

export default function PropstackWebsitePage() {
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
            <p className="t-label !text-ink-yellow">CRM · Propstack</p>
            <h1 className="t-display mt-4">
              {rich("Propstack-Website: wo das CRM endet und Ihr *Auftritt* beginnt.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ja, Propstack liefert eine eigene Objekt-Website, die Objekte automatisch aus dem
              CRM-Datensatz veröffentlicht — technisch reicht das für einen laufenden Auftritt.
              Das Ergebnis bleibt aber ein Datenblatt, keine Marke:{" "}
              <Highlight>Layout, Struktur und Sprache folgen der CRM-Vorlage</Highlight>, nicht
              Ihrer Positionierung. Für die reine Objektpräsenz reicht das. Für den
              Alleinauftrag entscheidet, was der Eigentümer vor dem Termin über Sie sieht.
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
                src={maklerAsset(19)}
                alt="Makler prüft am Tablet eine CRM-Objektliste neben dem geplanten Markenauftritt"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Zweispalter — Was Propstack liefert vs. was ein Portal zusätzlich braucht ── */}
      <section id="zweispalter" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Zwei Ebenen, ein System"
              titel="Was Propstack liefert. Was ein *Portal* zusätzlich braucht."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="t-label">Propstack liefert</p>
              <ul className="mt-5 space-y-4 border-t border-line-subtle pt-5">
                {PROPSTACK_LIEFERT.map((zeile) => (
                  <li key={zeile} className="t-body border-b border-line-subtle pb-4">
                    {zeile}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-label !text-ink-cream">Ein eigenes Portal braucht zusätzlich</p>
              <ul className="mt-5 space-y-4 border-t border-line-subtle pt-5">
                {PORTAL_BRAUCHT_ZUSAETZLICH.map((zeile) => (
                  <li key={zeile} className="t-body border-b border-line-subtle pb-4">
                    {zeile}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Nummern-Liste — die saubere Anbindung ────────────────────────── */}
      <section id="anbindung" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Anbindung statt Ersatz"
              titel="Vier Schritte, wie eine *saubere* Anbindung aussieht."
              sub="Kein neues System, keine Schulung fürs Team — vier Verbindungen zwischen Ihrem Portal und dem Propstack, das Sie schon nutzen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 border-t border-line-subtle">
            {SCHRITTE.map((s, i) => (
              <Reveal key={s.titel} delay={i * 40}>
                <div className="grid gap-3 border-b border-line-subtle py-8 sm:grid-cols-[56px_1fr] sm:gap-8 md:grid-cols-[56px_15rem_1fr] md:gap-10">
                  <span className="font-mono text-[13px] text-ink-dim tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] font-semibold text-ink-cream">{s.titel}</p>
                  <p className="t-body max-w-[36rem]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte, Motor/Schaufenster ─────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Propstack ist der Motor. Der Auftritt ist das Schaufenster." glyph>
              Ein starkes CRM organisiert, was im Hintergrund passiert. Ob ein Eigentümer anruft,
              entscheidet sich am Schaufenster davor. Wir bauen das Schaufenster und die Leitung
              dazwischen — Ihr Propstack bleibt exakt so, wie es ist.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, CRM-Anbindung ────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien landet jede Anfrage mit Quelle und nächstem Schritt direkt im
              Maklersystem. Ergebnis der ersten sechs Wochen: neun Abschlüsse, 342.000 € Volumen.
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
              titel="Was Sie vor dem *ersten* Gespräch wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
          <p className="t-small mt-10 max-w-[54ch]">
            Propstack ist eine Marke der Propstack GmbH. beuwy ist unabhängiger Dienstleister.
          </p>
        </div>
      </section>

      {/* ── Finale ───────────────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Ihr Propstack bleibt. Ihr *Auftritt* wechselt die Liga.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Wie sich andere CRM-Systeme anbinden lassen, zeigt der{" "}
              <Link href="/maklersoftware-vergleich" className="ref-link">
                Maklersoftware-Vergleich
              </Link>
              , das gleiche Prinzip für onOffice steht unter{" "}
              <Link href="/onoffice-website" className="ref-link">
                onOffice-Website
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
