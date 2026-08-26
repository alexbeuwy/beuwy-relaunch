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
 * Wissens-Seite — /ki-richtlinien-maklerbuero (R3-SEITENPLAN.json, Cluster
 * K). Angle ist eine Kurz-Policy zum Übernehmen — deshalb hier ein
 * Zweispalter (Erlaubt / Tabu) als Hauptbaustein statt Nummern-Liste, dazu
 * eine kompakte Checkliste "vor dem ersten Prompt". PainRows zeigt vorher
 * die drei Arten, wie es ohne Regeln schiefgeht (Kundendaten, Kennzeichnung,
 * Modell-Wechsel — exakt die drei Reibungspunkte aus der Spec-Angle).
 * Foto 18 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "KI-Richtlinien fürs Maklerbüro: Nutzen ohne Datenpanne | beuwy",
  description:
    "KI-Richtlinien fürs Maklerbüro: eine Kurz-Policy zum Übernehmen für Kundendaten, Freigaben und Kennzeichnung — damit ChatGPT & Co. Zeit sparen statt Ärger.",
  openGraph: {
    title: "KI-Richtlinien fürs Maklerbüro: Nutzen ohne Datenpanne | beuwy",
    description:
      "Eine Kurz-Policy zum Übernehmen: Kundendaten, Freigaben, Kennzeichnung und Modell-Wechsel-Chaos für KI-Tools im Maklerbüro klar geregelt.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Die Adresse des Eigentümers landet im Prompt-Fenster eines fremden Anbieters.",
    answer:
      "Wer Name, Adresse oder Verkaufsgrund in ein öffentliches KI-Tool tippt, gibt Daten an einen Anbieter weiter, mit dem meist kein Auftragsverarbeitungsvertrag besteht. Ohne Regel entscheidet das jeder im Team für sich, mal richtig, mal falsch.",
  },
  {
    quote: "Ein KI-Text geht als eigener Text raus — bis jemand fragt, wer ihn geprüft hat.",
    answer:
      "Ein Exposé-Absatz aus ChatGPT ist ein Rohentwurf, keine geprüfte Objektbeschreibung. Ohne festen Freigabe-Schritt verlässt der Text das Büro so, wie ihn die KI ausgespuckt hat, samt möglicher Falschangabe.",
  },
  {
    quote: "Letzten Monat lief alles über Tool A, diesen Monat läuft die Hälfte über Tool B.",
    answer:
      "Jedes neue Modell verspricht mehr, jeder im Team probiert etwas anderes aus. Ohne eine Linie, wer worüber entscheidet, entsteht kein System, sondern ein loses Sammelsurium an Zugängen, das niemand mehr überblickt.",
  },
];

type PolicyZeile = { thema: string; erlaubt: string; tabu: string };

const POLICY: PolicyZeile[] = [
  {
    thema: "Kundendaten",
    erlaubt: "Anonymisierte Eckdaten in ein KI-Tool geben: Baujahr, Wohnfläche, Lage-Stichwort.",
    tabu: "Name, Adresse, Kontaktdaten oder den Verkaufsgrund eines Eigentümers eintippen.",
  },
  {
    thema: "Exposé-Texte",
    erlaubt: "KI-Rohtext als Startpunkt nutzen, danach gegen die Objektunterlagen prüfen.",
    tabu: "Einen KI-Text ungeprüft ins Exposé übernehmen, weil er sich flüssig liest.",
  },
  {
    thema: "Kennzeichnung",
    erlaubt: "KI-generierte Bilder oder Videos sichtbar als solche kennzeichnen, auf Website und Social Media.",
    tabu: "Ein KI-Bild als reales Foto der Immobilie oder als Team- und Kundenfoto ausgeben.",
  },
  {
    thema: "Freigaben",
    erlaubt: "Jede Zahl, jede Adresse und jede Rechtsaussage aus einem KI-Text von einer Person im Team gegenlesen lassen.",
    tabu: "Einen KI-Text direkt aus dem Chat-Fenster in eine Mail, ein Exposé oder eine Anzeige kopieren.",
  },
  {
    thema: "Werkzeug-Wahl",
    erlaubt: "Ein festgelegtes Tool je Aufgabe nutzen, das im Team bekannt ist und dokumentiert wurde.",
    tabu: "Jede Woche ein neues Tool ausprobieren, ohne dass jemand im Büro weiß, was gerade wo läuft.",
  },
  {
    thema: "Rechtsfragen & Steuerthemen",
    erlaubt: "KI-Antworten zu Steuer- oder Rechtsfragen als ersten Überblick lesen.",
    tabu: "Eine KI-Antwort zu Steuer- oder Rechtsfragen als Auskunft an den Kunden weitergeben — das bleibt Sache von Steuerberater oder Anwalt.",
  },
];

const CHECKLISTE = [
  "Läuft das Tool über einen Geschäfts-Account mit Auftragsverarbeitungsvertrag, nicht über ein privates Konto?",
  "Stehen im Prompt nur anonymisierte Eckdaten, keine Namen, Adressen oder Kontaktdaten?",
  "Gibt es im Team eine feste Person, die KI-Texte vor der Veröffentlichung gegenliest?",
  "Ist jedes KI-Bild und jedes KI-Video sichtbar gekennzeichnet, bevor es online geht?",
] as const;

const FAQS = [
  {
    q: "Brauchen wir dafür ein langes Dokument?",
    a: "Nein. Eine Seite reicht, wenn sie die sechs Punkte oben konkret für Ihr Büro festhält: welches Tool, welcher Account, wer freigibt. Ein langes Grundsatzpapier liest im Alltag ohnehin niemand zweimal.",
  },
  {
    q: "Wer im Team ist für die Einhaltung verantwortlich?",
    a: "In der Praxis funktioniert eine feste Ansprechperson am besten, meist die Büroleitung oder wer das CRM pflegt. Diese Person entscheidet über neue Tools und ist die letzte Prüfstation vor der Veröffentlichung eines KI-Texts.",
  },
  {
    q: "Gilt das auch für Gratis-Tools ohne Abo?",
    a: "Gerade dort besonders. Solche Tools finanzieren sich oft über die eingegebenen Daten, ein Auftragsverarbeitungsvertrag fehlt häufig ganz. Kundendaten haben in einem solchen Tool nichts verloren, anonymisierte Eckdaten sind unkritischer.",
  },
  {
    q: "Ist das eine Rechtsberatung zum Datenschutz?",
    a: "Nein. Diese Seite ordnet ein, wie Maklerbüros KI-Tools im Alltag sinnvoll und mit gesundem Menschenverstand einsetzen. Für eine rechtssichere Bewertung Ihrer konkreten Prozesse ist ein Datenschutzbeauftragter oder Anwalt die richtige Adresse.",
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

export default function KiRichtlinienMaklerbueroPage() {
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
            <p className="t-label !text-ink-yellow">KI im Maklerbüro</p>
            <h1 className="t-display mt-4">
              {rich("KI-Richtlinien fürs Maklerbüro: Nutzen, ohne dass eine *Datenpanne* draus wird.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ihr Team braucht für KI-Tools sechs klare Regeln, keine Grundsatzabhandlung:
              welche Daten in ein Prompt-Fenster dürfen, wer einen KI-Text vor der
              Veröffentlichung freigibt, wie KI-Bilder gekennzeichnet werden und wer im Büro
              über ein neues Tool entscheidet.{" "}
              <Highlight>
                Ohne diese Linie entscheidet jeder im Team für sich — mal richtig, mal mit
                Kundendaten im falschen Fenster
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
                src={maklerAsset(18)}
                alt="Team bespricht am Bildschirm eine Richtlinie für den Umgang mit KI-Tools"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem — drei Reibungspunkte ohne Regeln ───────────────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ohne Regel entscheidet jeder für sich"
              titel="Drei Stellen, an denen KI im Büro-Alltag *schiefläuft*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Die Policy — Zweispalter Erlaubt/Tabu, sechs Themen ─────────── */}
      <section id="policy" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Kurz-Policy"
              titel="Sechs Themen, je eine Grenze — zum *Übernehmen* fürs eigene Büro."
              sub="Keine Rechtsabhandlung, sondern eine Linie, die jeder im Team in einer Minute versteht und im Alltag anwenden kann."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-14 space-y-8">
            {POLICY.map((zeile, i) => (
              <Reveal key={zeile.thema} delay={i * 50}>
                <div className="border-t border-line-subtle pt-6">
                  <p className="t-label !text-ink-dim">{zeile.thema}</p>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-akzent-wash text-[11px] font-bold text-ink-yellow">
                        ✓
                      </span>
                      <p className="t-body">{zeile.erlaubt}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink-cream/[0.06] text-[11px] font-bold text-ink-dim">
                        ✕
                      </span>
                      <p className="t-body">{zeile.tabu}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Checkliste — vor dem ersten Prompt ──────────────────────────── */}
      <section id="checkliste" className="bg-bg-elevated">
        <div className="mx-auto max-w-[860px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Vor dem ersten Prompt"
              titel="Vier Fragen, die vor jedem neuen KI-Einsatz *geklärt* sein sollten."
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
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Eine Regel, die keiner kennt, ist keine Regel." glyph>
              Eine Policy im Ordner ändert nichts am Alltag. Wirksam wird sie erst, wenn sie in
              den Ablauf eingebaut ist: im CRM, in der Freigabe-Kette, im Tool, das das Team
              tatsächlich täglich öffnet. Genau das bauen wir statt eines weiteren Dokuments.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Prompt-Versuch</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              17 Jahre Systembau, davor für Bosch, Continental und Michelin. Abläufe, die ein
              Modellwechsel im Hintergrund nicht ins Wanken bringt, entstehen in vier bis sechs
              Wochen, nicht in einem Quartal.
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
              titel="Was Sie vor der eigenen *Policy* wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir ein System, keine weitere *Policy*-Datei.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Zwölf konkrete Anwendungen für den Büro-Alltag zeigt{" "}
              <Link href="/chatgpt-fuer-makler" className="ref-link">
                ChatGPT für Makler
              </Link>
              , welche Abläufe sich lohnen{" "}
              <Link href="/automatisierung-maklerbuero" className="ref-link">
                Automatisierung im Maklerbüro
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
