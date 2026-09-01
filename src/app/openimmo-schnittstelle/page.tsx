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
 * Wissens-Seite D20 — /openimmo-schnittstelle (R3-SEITENPLAN.json, Cluster
 * V). Technischer Erklärartikel statt Vergleich — deshalb hier weder
 * Zweispalter noch Matrix, sondern eine kurze Erklärung (was OpenImmo ist),
 * eine Nummern-Liste (die drei Stellen, an denen der Export ruckelt) und
 * eine Abnahme-Checkliste mit selbst gezeichnetem Häkchen-Icon — die Form,
 * die der Leaf-Auftrag für diese Seite ausdrücklich vorsieht. Keine
 * erfundenen Versionsnummern oder Prozentwerte zum OpenImmo-Standard
 * selbst, nur allgemein bekannte Mechanik. Beweis läuft als Text-Anriss auf
 * RIEGEL, weil die saubere Anbindung dort Teil des belegten Ergebnisses
 * war. Foto 5 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "OpenImmo verstehen: Die Schnittstelle, an der Websites scheitern | beuwy",
  description:
    "OpenImmo verstehen: Die Schnittstelle, an der Maklerwebsites scheitern — Formatgrenzen, Bild-Reihenfolgen, Render-Unterschiede, plus Abnahme-Checkliste.",
  openGraph: {
    title: "OpenImmo verstehen: Die Schnittstelle, an der Websites scheitern | beuwy",
    description:
      "Was OpenImmo ist, warum der Objekt-Export trotzdem ruckelt, und die Abnahme-Checkliste, die vor dem Livegang jeden Fehler abfängt.",
    type: "website",
    locale: "de_DE",
  },
};

const STELLEN = [
  {
    titel: "Formatgrenzen",
    text: "OpenImmo legt fest, welche Felder es gibt, nicht wie jedes System sie befüllt. Freitextfelder, Sonderausstattung oder Energiewerte landen je nach Software in leicht anderer Struktur — beim Import zeigt sich das als fehlendes oder falsch zugeordnetes Feld.",
  },
  {
    titel: "Bild-Reihenfolgen",
    text: "Die Sortierung der Fotos ist im Standard vorgesehen, geht beim Export aus manchen Systemen aber verloren. Ergebnis: Das Titelbild landet an dritter Stelle, die Grundriss-Skizze ganz vorn, ohne dass jemand das im Büro so eingestellt hat.",
  },
  {
    titel: "Render-Unterschiede",
    text: "Dieselbe OpenImmo-Datei liest jedes Portal mit eigener Darstellungslogik: Absätze, Sonderzeichen und Bildausschnitte sehen auf ImmoScout anders aus als auf der eigenen Website, selbst wenn die Quelldaten identisch sind.",
  },
] as const;

const CHECKLISTE = [
  "Titelbild ist nach dem Export tatsächlich das erste Bild, nicht der Grundriss",
  "Alle Sonderzeichen (Umlaute, €-Zeichen, Bindestriche) erscheinen korrekt, nicht als Fragezeichen",
  "Energiewerte und Pflichtangaben sind vollständig, nicht nur teilweise übernommen",
  "Freitext-Beschreibung bricht nicht mitten im Satz ab",
  "Preisänderung im CRM erscheint innerhalb der zugesagten Frist auch auf der Website",
  "Ein deaktiviertes Objekt verschwindet auf allen angebundenen Flächen, nicht nur auf einer",
  "Kontaktdaten der Anfrage landen mit Objektbezug im CRM, nicht in einem allgemeinen Postfach",
] as const;

const FAQS = [
  {
    q: "Brauche ich für jedes Portal eine eigene Export-Datei?",
    a: "Nein. Der Export erzeugt eine OpenImmo-Datei, die mehrere Portale gleichzeitig lesen. Wie diese Datei am Ende aussieht, entscheidet trotzdem jedes Portal selbst — deshalb kann dieselbe Datei auf zwei Flächen unterschiedlich wirken.",
  },
  {
    q: "Warum fehlen nach dem Export manchmal Fotos?",
    a: "Meist liegt es an Dateinamen, Reihenfolge oder einem Format, das die Zielseite nicht verarbeitet. Eine Abnahme vor dem Livegang, wie in der Checkliste oben, fängt genau das ab, bevor ein Eigentümer die Lücke sieht.",
  },
  {
    q: "Kann ich OpenImmo auch ohne Maklersoftware nutzen?",
    a: "Technisch ja, in der Praxis läuft der Export fast immer über die vorhandene Maklersoftware oder das CRM. Einen Überblick über die gängigen Systeme und ihre Anbindung finden Sie im Maklersoftware-Vergleich.",
  },
  {
    q: "Wie lange dauert eine saubere Abnahme?",
    a: "Im Rahmen eines Website-Projekts meist wenige Tage, weil die Prüfung entlang der Checkliste läuft, statt jedes Feld einzeln zu suchen. Bei einer bestehenden, ungeprüften Anbindung kann die erste Abnahme länger dauern.",
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

export default function OpenimmoSchnittstellePage() {
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
            <p className="t-label !text-ink-yellow">Schnittstelle</p>
            <h1 className="t-display mt-4">
              {rich("OpenImmo verstehen: die Schnittstelle, an der *Websites* scheitern.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              OpenImmo ist ein deutschlandweiter Datenstandard, über den Maklersoftware
              Objektdaten wie Preis, Fläche und Fotos an Portale und Websites exportiert, ohne
              dass jemand jedes Feld von Hand abtippt.{" "}
              <Highlight>
                Ruckelt der Export trotzdem, liegt es fast immer an drei Stellen
              </Highlight>
              : Feldern, die der Standard offenlässt, Bildern, deren Reihenfolge verloren geht,
              und Portalen, die dieselbe Datei unterschiedlich darstellen.
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
                alt="Bildschirm mit Objektdaten, die aus einer Maklersoftware exportiert werden"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Nummern-Liste — die drei Stellen, an denen es ruckelt ───────── */}
      <section id="stellen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Warum der Export ruckelt"
              titel="Drei Stellen, an denen aus einer sauberen Datei ein *falsches* Exposé wird."
              sub="Der Standard selbst ist stabil. Die Probleme entstehen an den Rändern — dort, wo jedes System eigene Entscheidungen trifft."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {STELLEN.map((s, i) => (
              <Reveal key={s.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{s.titel}</p>
                  <p className="t-body mt-3">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Checkliste — Abnahme vor dem Livegang, mit Häkchen ──────────── */}
      <section id="checkliste" className="bg-bg-base">
        <div className="mx-auto max-w-[860px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Vor dem Livegang"
              titel="Die Abnahme-Checkliste, die jeder Export *bestehen* sollte."
              className="max-w-[640px]"
            />
          </Reveal>
          <div className="mt-10 space-y-4">
            {CHECKLISTE.map((punkt, i) => (
              <Reveal key={punkt} delay={i * 40}>
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
            <GelbeKarte label="Der Unterschied" titel="Die Schnittstelle ist unsichtbar — bis sie fehlt." glyph>
              Läuft der Export sauber, merkt kein Eigentümer, dass dahinter ein Datenstandard
              arbeitet. Läuft er nicht sauber, sieht er ein Exposé mit vertauschten Bildern — und
              zieht daraus einen Schluss über Ihr ganzes Büro.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Text-Kronzeuge RIEGEL ───────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien lief der Objekt-Export von Anfang an sauber, weil die
              Abnahme-Checkliste vor dem Livegang durchlaufen wurde. Ergebnis: 342.000 €
              Abschlussvolumen in sechs Wochen, ohne einen einzigen doppelt gepflegten Datensatz.
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
              titel="Was Sie vor der *Anbindung* wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir eine Anbindung, die *keiner* bemerkt.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Welches CRM Sie einsetzen und wie die Anbindung dort im Detail aussieht, steht im{" "}
              <Link href="/maklersoftware-vergleich" className="ref-link">
                Maklersoftware-Vergleich
              </Link>
              . Speziell zur Anbindung an FLOWFACT lesen Sie{" "}
              <Link href="/flowfact-website" className="ref-link">
                FLOWFACT-Website
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
