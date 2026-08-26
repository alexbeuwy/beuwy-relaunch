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
 * Wissensseite (R3 Welle 2, Cluster W) — /immobilienmakler-werbung.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich, danach eine
 * Vergleichs-Tabelle (Print/Bus/Portal-Buchung vs. Performance+Portal) und
 * eine Checkliste, mit der jede Werbeausgabe an der 5%-Kette gemessen wird.
 * GelbeKarte, textlicher Beweis-Anriss (Riegel), FAQ + FAQPage-JSON-LD.
 * Foto 11 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Werbung für Immobilienmakler: Was wirkt, was verbrennt Geld | beuwy",
  description:
    "Werbung für Immobilienmakler: Print, Bus und Portal-Buchung erzeugen Sichtbarkeit ohne Kette zur Anfrage. beuwy misst jede Ausgabe an der 5%-Kette bis zum Mandat.",
  openGraph: {
    title: "Werbung für Immobilienmakler: Was wirkt, was verbrennt Geld | beuwy",
    description:
      "Kanal-Ehrlichkeit statt Werbeglaube: Print, Bus und Portal-Buchung vs. Performance-Marketing plus eigenes Portal. beuwy misst jede Ausgabe an der 5%-Kette.",
    type: "website",
    locale: "de_DE",
  },
};

const KANAELE = [
  {
    kanal: "Postwurf / Flyer",
    messbarkeit: "kaum messbar, kein Klick, kein Rechner",
    ziel: "Startseite oder gar keine",
    eignung: "Anker im Farming-Gebiet, kein Anfrage-Kanal",
  },
  {
    kanal: "Bus- / Plakatwerbung",
    messbarkeit: "keine Klick-Daten, nur Markenwirkung",
    ziel: "keine Landingpage dahinter",
    eignung: "Namensbekanntheit, keine Vorqualifizierung",
  },
  {
    kanal: "Portal-Featured-Listing",
    messbarkeit: "Klicks beim Portal, nicht bei Ihnen",
    ziel: "Portal-Profil neben dem Wettbewerber",
    eignung: "kurzfristiger Schub, endet mit dem Abo",
  },
  {
    kanal: "Performance-Marketing + eigenes Portal",
    messbarkeit: "jede Stufe messbar, wöchentlich",
    ziel: "Landingpage mit Rechner, Registrierung im CRM",
    eignung: "planbare, wiederholbare Anfragen",
  },
] as const;

const PRUEFUNG = [
  "Führt der Klick auf eine Landingpage oder nur auf die Startseite?",
  "Gibt es dort einen Rechner oder ein Formular, das registriert?",
  "Landet die Anfrage mit Quelle im CRM oder in einem geteilten Postfach?",
  "Lässt sich ein Preis je Registrierung berechnen, nicht nur ein Media-Budget?",
  "Bekommen Sie einen Wochenbericht oder erst die Rechnung am Monatsende?",
] as const;

const FAQS = [
  {
    q: "Ist klassische Werbung wie Flyer oder Plakat komplett nutzlos?",
    a: "Nein, aber sie beantwortet eine andere Frage als Performance-Marketing. Ein Flyer im Farming-Gebiet erinnert an Ihren Namen, er registriert aber niemanden und lässt sich nicht in Anfragen zurückrechnen. Als alleinige Werbeausgabe reicht das selten.",
  },
  {
    q: "Wie viel sollte ich für Werbung als Makler ausgeben?",
    a: "Das hängt von Ihrer Region, dem Wettbewerb und Ihrem Mandats-Ziel ab. Wichtiger als die Summe ist die Kette dahinter: Ohne Landingpage, Rechner und CRM-Anbindung verpufft auch ein großes Budget in reiner Sichtbarkeit.",
  },
  {
    q: "Lohnt sich ein Featured-Listing bei ImmoScout?",
    a: "Als kurzfristiger Schub für ein einzelnes Objekt kann das funktionieren. Als Werbestrategie für Ihr Büro nicht, weil die Anfrage über das Portal läuft, nicht über Sie, und mit dem Abo endet.",
  },
  {
    q: "Was unterscheidet beuwy von einer klassischen Werbeagentur?",
    a: "Eine Agentur liefert meist Anzeigen. beuwy arbeitet als Unternehmensberatung an der ganzen Kette: Anzeige, Landingpage, Rechner, CRM und Wochenbericht, damit jede Ausgabe eine Zahl bekommt statt nur eine Rechnung.",
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

export default function ImmobilienmaklerWerbungPage() {
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

      {/* ── Wissens-Kopf — kompakt, Antwort direkt darunter ─────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 pb-4 pt-32 lg:px-10 lg:pt-36">
          <Reveal>
            <p className="t-label !text-ink-yellow">Akquise</p>
            <h1 className="t-display mt-4">
              {rich("Werbung, die *nachweisbar* wirkt, nicht die, die auffällt.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Werbung lohnt sich für Immobilienmakler, wenn sie sich an einer Kette messen lässt:
              Anzeige, Klick, Rechner, Registrierung, Mandat. Postwurf, Bus-Plakat und ungezielte
              Portal-Buchungen erzeugen{" "}
              <Highlight>Sichtbarkeit, die sich nicht in Anfragen zurückrechnen lässt</Highlight>.
              Performance-Marketing mit einem eigenen Portal dahinter lässt sich lückenlos messen,
              von der ersten Anzeige bis zur registrierten Anfrage im CRM.
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
                src={maklerAsset(11)}
                alt="Makler prüft eine Werbeauswertung am Bildschirm"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vergleichs-Tabelle — Kanal-Ehrlichkeit ──────────────────────────── */}
      <section id="kanaele" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Kanal-Ehrlichkeit"
              titel="Vier Kanäle, ein *ehrlicher* Blick auf die Messbarkeit."
              sub="Nicht jede Ausgabe, die nach Werbung aussieht, endet in einer Kette bis zur Anfrage. Diese vier Kanäle im ehrlichen Vergleich, ohne einen davon schlechtzureden."
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold !text-ink-cream">Kanal</th>
                    <th className="t-label py-3 pr-6 font-semibold">Messbarkeit</th>
                    <th className="t-label py-3 pr-6 font-semibold">Wohin führt der Klick</th>
                    <th className="t-label py-3 font-semibold">Eignung</th>
                  </tr>
                </thead>
                <tbody>
                  {KANAELE.map((row) => (
                    <tr key={row.kanal} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.kanal}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.messbarkeit}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.ziel}</td>
                      <td className="t-body py-4 tnum">{row.eignung}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-body mt-10 max-w-[680px]">
              Die letzte Zeile ist keine Kanal-Empfehlung, sondern eine Kette: Wie diese vier
              Stufen im Detail funktionieren und mit welcher Quote sie realistisch rechnen können,
              zeigt die Seite{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                Performance-Marketing für Makler
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — jede Werbeausgabe vor der Buchung prüfen ───────────── */}
      <section id="pruefung" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Vor der nächsten Buchung"
              titel="Fünf Fragen, bevor Sie das *nächste* Budget freigeben."
              sub="Stellen Sie diese fünf Fragen jeder Werbeausgabe, egal ob Print, Portal oder Anzeige. Wer zwei oder mehr mit Nein beantwortet, kauft Sichtbarkeit statt Anfragen."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid max-w-[720px] gap-5">
            {PRUEFUNG.map((item, i) => (
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
            <GelbeKarte label="Der Unterschied" titel="Sichtbarkeit ist keine Anfrage." glyph>
              Ein Plakat, das jeder sieht, und eine Anzeige, die niemand anklickt, kosten oft
              ähnlich viel. Der Unterschied zeigt sich erst am Ende der Kette: bei der Zahl der
              Anfragen, die tatsächlich im CRM landen, nicht bei der Zahl der Blicke.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — Riegel-Case, Werbung mit Kette bis zum Abschluss ── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Sechs Wochen nach dem Relaunch bei RIEGEL Immobilien: neun Abschlüsse, 342.000 €
              Volumen, jeder davon über eine Kette aus Anzeige, Rechner und CRM, ohne einen
              einzigen gekauften Lead.
            </p>
          </Reveal>
          {riegel ? (
            <div className="mt-10">
              <CaseGrid cases={[riegel]} />
            </div>
          ) : null}
          <Reveal delay={60}>
            <Link href="/cases" className="ref-link mt-8 inline-block">
              Weitere Fallstudien ansehen →
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
              titel="Was Sie vor dem *ersten* Budget wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *messbare* Kette.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , die Mechanik der Kette auf der Seite{" "}
              <Link href="/performance-marketing-makler" className="ref-link">
                Performance-Marketing für Makler
              </Link>{" "}
              und den ersten Anker für Eigentümer im{" "}
              <Link href="/tools/verkaufspreisrechner" className="ref-link">
                Verkaufspreisrechner
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
