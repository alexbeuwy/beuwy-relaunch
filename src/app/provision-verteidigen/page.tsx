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
 * Wissensseite (R3 Welle 2, Cluster P) — /provision-verteidigen. Eigener
 * Pain (Eigentümer vergleicht drei Angebote nach dem Prozentsatz, ein
 * Rabatt heute ist ein Präzedenzfall für jeden Verkauf danach). Hauptteil:
 * eine Drei-Schritte-Rail (Vermarktungsplan vor Unterschrift,
 * Reichweiten-Nachweis während der Laufzeit, Wochenbericht bis zum
 * Notartermin) und eine Gegenüberstellungs-Tabelle Rabatt-Gespräch vs.
 * Beweis-Gespräch. Das Gratis-Wort aus dem T-Cluster bleibt hier außen vor
 * (Cluster P). GelbeKarte, Beweis-Anriss (RIEGEL, CRM-Anbindung +
 * Rückrufregel als sichtbares System), FAQ + FAQPage-JSON-LD. Foto 1 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Provision verteidigen: Beweise statt Rabatte | beuwy",
  description:
    "Provision verteidigen gelingt nicht über Rabatte, sondern über sichtbare Leistung: Vermarktungsplan, Reichweiten-Nachweis und Wochenbericht als Beweis.",
  openGraph: {
    title: "Provision verteidigen: Beweise statt Rabatte | beuwy",
    description:
      "Wer Vermarktungsplan, Reichweiten-Nachweis und Wochenbericht liefert, muss die eigene Provision nicht rechtfertigen. Der Eigentümer sieht, wofür er zahlt.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Drei Makler, drei Angebote, ein Vergleich: nur der Prozentsatz.",
    answer:
      "Ohne sichtbaren Unterschied in der Leistung bleibt der Preis das einzige Kriterium, das ein Eigentümer vergleichen kann. Wer nichts zeigt, konkurriert automatisch über den niedrigsten Satz.",
  },
  {
    quote: "„Können Sie da nicht noch etwas runtergehen?“ fällt fast in jedem Erstgespräch.",
    answer:
      "Die Frage kommt nicht aus Geiz, sondern aus Unsicherheit: Der Eigentümer weiß nicht, wofür die Provision konkret bezahlt wird. Ohne Antwort darauf ist jeder Rabatt nur eine Frage der Hartnäckigkeit.",
  },
  {
    quote: "Ein Nachlass heute ist ein Präzedenzfall für den nächsten Verkauf.",
    answer:
      "Wer einmal drei Zehntel Prozentpunkte abgibt, gibt sie in der Regel jedes Mal wieder ab, sobald ein Eigentümer danach fragt. Der Rabatt wird zur Erwartung, nicht zur Ausnahme.",
  },
] as const;

const SCHRITTE = [
  {
    titel: "Vermarktungsplan vor Unterschrift",
    text: "Vor dem Alleinauftrag liegt ein konkretes Dokument auf dem Tisch: welche Kanäle, welches Budget, welcher Zeitplan bis zur ersten Besichtigung. Kein Versprechen, sondern ein Plan mit Datum.",
  },
  {
    titel: "Reichweiten-Nachweis während der Laufzeit",
    text: "Wie viele Impressionen die Anzeige erzielt hat, wie oft das Exposé geöffnet wurde, wie viele Anfragen eingegangen sind: Zahlen statt der Auskunft, es „laufe gut“.",
  },
  {
    titel: "Wochenbericht bis zum Notartermin",
    text: "Eine kurze, regelmäßige Zusammenfassung: Besichtigungen, Rückmeldungen, nächste Schritte. Der Eigentümer sieht die Arbeit, ohne selbst nachfragen zu müssen.",
  },
] as const;

const GESPRAECH = [
  { argument: "Wie rechtfertigen Sie die Provision?", ohne: "„Das ist der übliche Satz in der Region.“", mit: "Vermarktungsplan mit Kanälen, Budget und Zeitplan liegt vor" },
  { argument: "Was passiert, wenn es länger dauert?", ohne: "keine belastbare Antwort", mit: "wöchentliche Reichweiten-Zahlen zeigen die Entwicklung" },
  { argument: "Woher weiß ich, dass etwas passiert?", ohne: "Anruf auf Nachfrage des Eigentümers", mit: "Wochenbericht ohne eigenes Nachfragen" },
  { argument: "Reaktion auf die Rabattfrage", ohne: "Nachlass, um den Auftrag nicht zu verlieren", mit: "Verweis auf den bereits gezeigten Leistungsumfang" },
] as const;

const FAQS = [
  {
    q: "Ist ein Preisnachlass manchmal trotzdem sinnvoll?",
    a: "In Ausnahmefällen ja, etwa bei einem sehr großen Volumen oder mehreren Objekten desselben Eigentümers. Zur Regel sollte der Nachlass aber nicht werden, sonst verliert die Provision jede Verhandlungsbasis für künftige Mandate.",
  },
  {
    q: "Was gehört mindestens in einen Vermarktungsplan?",
    a: "Die geplanten Kanäle, ein grobes Budget, ein Zeitplan bis zur ersten Besichtigung und die Zuständigkeiten im eigenen Büro. Je konkreter das Dokument, desto schwerer fällt dem Eigentümer der Preisvergleich mit einem Makler ohne Plan.",
  },
  {
    q: "Wie oft sollte ein Wochenbericht verschickt werden?",
    a: "Wöchentlich, solange das Mandat aktiv vermarktet wird. Ist eine Woche ereignislos, reicht ein kurzer Satz dazu, wichtiger als die Länge ist die Regelmäßigkeit, damit der Eigentümer nie selbst nachfragen muss.",
  },
  {
    q: "Hilft das auch beim Erstgespräch, bevor überhaupt ein Auftrag besteht?",
    a: "Ja, sogar besonders dort. Ein Muster-Vermarktungsplan oder ein anonymisierter Wochenbericht aus einem früheren Mandat zeigt schon im Erstgespräch, wofür die Provision steht, bevor die Preisfrage überhaupt gestellt wird.",
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

export default function ProvisionVerteidigenPage() {
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
            <p className="t-label !text-ink-yellow">Provision &amp; Verhandlung</p>
            <h1 className="t-display mt-4">
              {rich("Provision verteidigen: *Beweise* statt Rabatte.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ihre Provision begründen Sie nicht mit einem Satz, sondern mit sichtbarer Leistung:
              einem konkreten Vermarktungsplan vor der Unterschrift, einem Reichweiten-Nachweis
              während der Vermarktung und einem Wochenbericht bis zum Notartermin.{" "}
              <Highlight>
                Wer diese drei Dinge liefert, muss die Provision nicht rechtfertigen, weil der
                Eigentümer sieht, wofür er zahlt
              </Highlight>
              . Ein Rabatt ersetzt diesen Beweis nicht, er verschiebt nur die nächste Preisfrage.
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
                alt="Makler legt einem Eigentümer am Tisch einen konkreten Vermarktungsplan vor"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem — Prozentsatz-Vergleich, Rabattfrage, Präzedenzfall ─────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ohne Beweis bleibt nur der Preis"
              titel="Ein Prozentsatz ohne Leistung dahinter ist *verhandelbar*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — Drei-Schritte-Rail ─────────────────────────────────── */}
      <section id="schritte" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Drei Nachweise, die aus einem Prozentsatz eine *Leistung* machen."
              sub="Keiner der drei Schritte ist aufwendig. Zusammen sorgen sie dafür, dass die Provision am Ende des Mandats nachvollziehbar ist, nicht nur behauptet."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {SCHRITTE.map((s, i) => (
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

      {/* ── Gegenüberstellung — Rabatt-Gespräch vs. Beweis-Gespräch ─────────── */}
      <section id="gespraech" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Dasselbe Gespräch, zwei Verläufe"
              titel="Was Sie antworten, wenn die *Preisfrage* kommt."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Frage des Eigentümers</th>
                    <th className="t-label py-3 pr-6 font-semibold">Ohne Nachweis</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">Mit Vermarktungsplan &amp; Wochenbericht</th>
                  </tr>
                </thead>
                <tbody>
                  {GESPRAECH.map((row) => (
                    <tr key={row.argument} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.argument}</td>
                      <td className="t-body py-4 pr-6">{row.ohne}</td>
                      <td className="t-body py-4">{row.mit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[68ch]">
              Der Unterschied entsteht nicht im Gespräch selbst, sondern vorher. Wer den
              Vermarktungsplan erst erfindet, wenn die Rabattfrage schon im Raum steht, wirkt
              unvorbereitet. Wer ihn vor der Unterschrift zeigt und danach beim Wort hält, führt
              das Gespräch gar nicht erst über den Preis, sondern über den nächsten Schritt zum
              Alleinauftrag. Details dazu auf der Seite{" "}
              <Link href="/alleinauftrag-gewinnen" className="ref-link">
                Alleinauftrag gewinnen
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Ein Rabatt ist ein Signal. Ein Nachweis ist ein Argument." glyph>
              Ein Preisnachlass sagt dem Eigentümer: Der ursprüngliche Preis war nicht ganz ernst
              gemeint. Ein Vermarktungsplan mit Reichweiten-Zahlen und Wochenbericht sagt etwas
              anderes: Hier wird gearbeitet, sichtbar, mit Nachweis, nicht auf Zuruf.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, CRM-Anbindung + Rückrufregel als System ─── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien landet jede Anfrage mit Quelle und nächstem Schritt direkt im
              System, samt Terminstrecke und Rückrufregel. Sechs Wochen nach dem Relaunch: neun
              Abschlüsse, 342.000 € Volumen, ohne einen einzigen gekauften Lead.
            </p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
              Fallstudie RIEGEL Immobilien lesen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
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
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihren *Nachweis*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie der Alleinauftrag vor dem Termin entschieden wird, zeigt die Seite{" "}
              <Link href="/alleinauftrag-gewinnen" className="ref-link">
                Alleinauftrag gewinnen
              </Link>
              , die Systematik hinter den Reichweiten-Zahlen erklärt{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                Performance-Marketing für Makler
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
