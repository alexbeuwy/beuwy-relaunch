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
 * Wissensseite (R3 Welle 2, Cluster P) — /onboarding-neuer-mandate. Eigener
 * Pain (Unterlagen häppchenweise, Preisvorstellung erst nach der ersten
 * Preissenkung besprochen, Eigentümer hört wochenlang nichts). Hauptteil:
 * eine Checkliste Tag 1–7 mit Häkchen-Icon (Unterlagen, Fototermin,
 * Preisstory, Exposé-Rohfassung, Erwartungsgespräch, Vermarktungsstart,
 * erste Zahlen) — wie im Angle gefordert. Das Gratis-Wort aus dem
 * T-Cluster bleibt hier außen vor (Cluster P). GelbeKarte zur Bewertung,
 * die an Tag eins beginnt statt am Notartermin, Beweis-Anriss (RIEGEL:
 * Terminstrecke + Rückrufregel als System von Anfang an), FAQ +
 * FAQPage-JSON-LD. Foto 4 laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Onboarding neuer Mandate: Die erste Woche entscheidet die Bewertung | beuwy",
  description:
    "Onboarding neuer Mandate: die Checkliste für Tag 1 bis 7 – Unterlagen, Fototermin, Preisstory, Erwartungsgespräch. So beginnt die spätere 5-Sterne-Bewertung.",
  openGraph: {
    title: "Onboarding neuer Mandate: Die erste Woche entscheidet die Bewertung | beuwy",
    description:
      "Ein fester Ablauf für die ersten sieben Tage eines Mandats entscheidet mehr über die spätere Bewertung als jedes Gespräch am Notartermin.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Die Unterlagen kommen häppchenweise, über drei Wochen verteilt.",
    answer:
      "Jede fehlende Seite verzögert Exposé und Anzeige gleichermaßen. Was am ersten Tag eine einzige E-Mail hätte sein können, wird zu fünf Nachfragen über mehrere Wochen – und der Eigentümer erlebt genau diese Verzögerung als ersten Eindruck vom Mandat.",
  },
  {
    quote: "Die Preisvorstellung des Eigentümers und die Markteinschätzung klaffen auseinander – gesagt wird das erst nach der ersten Preissenkung.",
    answer:
      "Ohne eine belegte Preisstory in der ersten Woche bleibt die Preisfrage ein Gefühl auf beiden Seiten. Kommt die Differenz erst nach Wochen ohne Anfragen ans Licht, wirkt jede spätere Korrektur wie ein Eingeständnis, nicht wie Marktkenntnis von Anfang an.",
  },
  {
    quote: "Der Eigentümer hört vier Wochen lang nichts – und fragt sich, ob überhaupt etwas passiert.",
    answer:
      "Ohne ein Erwartungsgespräch in der ersten Woche weiß der Eigentümer nicht, wann welche Rückmeldung zu erwarten ist. Stille wird dann nicht als Arbeit im Hintergrund gelesen, sondern als Untätigkeit – und genau das prägt die Bewertung am Ende, unabhängig vom tatsächlichen Ergebnis.",
  },
] as const;

const TAGE = [
  {
    tag: "Tag 1",
    titel: "Unterlagen komplett anfordern",
    text: "Grundbuchauszug, Energieausweis, Grundriss, bei Eigentumswohnungen zusätzlich Teilungserklärung und die letzten drei Protokolle der Eigentümerversammlung – als eine einzige Liste, nicht als Serie von Nachfragen. Parallel wird der Fototermin fest im Kalender fixiert.",
  },
  {
    tag: "Tag 2",
    titel: "Fototermin vorbereiten und durchführen",
    text: "Aufräumen, Licht, Perspektiven: eine kurze Checkliste an den Eigentümer vorab spart am Tag selbst Zeit. Außenaufnahmen möglichst zur Golden Hour, wo Lage und Fassade es hergeben.",
  },
  {
    tag: "Tag 3",
    titel: "Preisstory entwickeln",
    text: "Bewertung mit Vergleichsobjekten und amtlichen Bodenrichtwerten, nicht mit einer Zahl aus dem Bauchgefühl. Am Ende von Tag 3 liegt die Preisstory schriftlich vor, inklusive der Argumente, die eine Preisfrage beantworten, bevor sie gestellt wird.",
  },
  {
    tag: "Tag 4",
    titel: "Exposé-Rohfassung fertigstellen",
    text: "Text, Grundriss, erste Fotoauswahl in einer Rohfassung – nicht die Endversion, aber genug, um am nächsten Tag mit dem Eigentümer durchzugehen, was noch fehlt.",
  },
  {
    tag: "Tag 5",
    titel: "Erwartungsgespräch führen",
    text: "Zeitplan, Rhythmus der Rückmeldungen und der Umgang mit einer möglichen Preisanpassung nach den ersten Wochen ohne Angebot: alles wird an Tag 5 einmal ausgesprochen, nicht erst, wenn ein Problem entsteht.",
  },
  {
    tag: "Tag 6",
    titel: "Vermarktung live schalten",
    text: "Portale, eigene Website, gegebenenfalls Social-Media-Reichweite gehen gemeinsam an einem Tag online, nicht gestaffelt über zwei Wochen. Der erste Eindruck bei Interessenten entsteht in den ersten 48 Stunden nach Veröffentlichung.",
  },
  {
    tag: "Tag 7",
    titel: "Erste Zahlen mit dem Eigentümer teilen",
    text: "Aufrufe des Exposés, Anfragen, erste Besichtigungswünsche: eine kurze Rückmeldung nach der ersten Woche, bevor der Eigentümer selbst nachfragen muss. Der Rhythmus für die folgenden Wochenberichte steht damit bereits fest.",
  },
] as const;

const FAQS = [
  {
    q: "Was, wenn Unterlagen wie das Grundbuch länger dauern als eine Woche?",
    a: "Dann läuft das Onboarding trotzdem weiter, mit einem klaren Vermerk gegenüber dem Eigentümer, welche Unterlagen noch fehlen und wer sie beim Amt angefordert hat. Nur die Veröffentlichung wartet auf die fehlenden Dokumente, die Preisstory und das Erwartungsgespräch nicht.",
  },
  {
    q: "Muss die Exposé-Endversion schon in der ersten Woche fertig sein?",
    a: "Nein, eine Rohfassung reicht bis Tag vier. Was ein Exposé am Ende tatsächlich verkaufsfähig macht, ist eine eigene Frage, die über die erste Woche hinausgeht – die Endversion folgt, sobald alle Fotos und Unterlagen vorliegen.",
  },
  {
    q: "Wie spreche ich eine unrealistische Preisvorstellung schon in der ersten Woche an?",
    a: "Mit der Preisstory aus Tag drei, nicht mit einer Behauptung. Vergleichsobjekte und Bodenrichtwerte zeigen dem Eigentümer eine Zahl, die er nachvollziehen kann, bevor eine Preisdiskussion überhaupt entsteht.",
  },
  {
    q: "Wann genau bitte ich um die Google-Bewertung?",
    a: "Nicht in der ersten Woche. Der richtige Zeitpunkt liegt rund drei Tage nach dem Notartermin, wenn der Verkauf abgeschlossen ist und noch frisch im Gedächtnis liegt. Vorbereitet wird dieser Moment trotzdem schon jetzt, durch eine erste Woche, an die sich der Eigentümer positiv erinnert.",
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

export default function OnboardingNeuerMandatePage() {
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
            <p className="t-label !text-ink-yellow">Onboarding &amp; Erwartungsmanagement</p>
            <h1 className="t-display mt-4">
              {rich("Onboarding neuer Mandate: die *erste Woche* entscheidet die Bewertung.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Ein neues Mandat starten Sie professionell mit einem festen Ablauf für die ersten
              sieben Tage: Unterlagen und Fototermin an Tag eins, eine belegbare Preisstory bis Tag
              drei, eine Exposé-Rohfassung bis Tag vier, ein Erwartungsgespräch zum Zeitplan bis Tag
              fünf, bevor die Vermarktung an Tag sechs live geht.{" "}
              <Highlight>
                Diese erste Woche entscheidet mehr über die spätere Bewertung als jedes Gespräch am
                Notartermin
              </Highlight>
              , weil sie zeigt, ob sich der Eigentümer auf Sie verlassen kann, bevor der erste
              Interessent überhaupt anruft.
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
                src={maklerAsset(4)}
                alt="Makler geht am ersten Tag eines neuen Mandats mit dem Eigentümer eine Unterlagen-Checkliste durch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Problem — Unterlagen, Preisvorstellung, Stille ──────────────────── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ohne Plan verliert sich die erste Woche"
              titel="Was am Tag 1 fünf Minuten kostet, kostet ohne Plan *Wochen*."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={[...PAINS]} />
          </div>
        </div>
      </section>

      {/* ── Checkliste — Tag 1 bis 7 mit Häkchen ────────────────────────────── */}
      <section id="checkliste" className="bg-bg-base">
        <div className="mx-auto max-w-[900px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Checkliste"
              titel="Sieben Tage. Jeder Tag hat *genau eine* Aufgabe, die zählt."
              sub="Kein Tag ersetzt den vorigen. Wer Tag 3 überspringt, holt die Preisdiskussion später mit Zinsen nach."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 space-y-6">
            {TAGE.map((t, i) => (
              <Reveal key={t.tag} delay={i * 40}>
                <div className="flex items-start gap-3 border-b border-line-subtle pb-6">
                  <span className="mt-1">
                    <HaekchenIcon />
                  </span>
                  <div>
                    <p className="t-label !text-ink-yellow">{t.tag}</p>
                    <p className="t-body mt-1 font-medium !text-ink-cream">{t.titel}</p>
                    <p className="t-body mt-1.5">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280}>
            <p className="t-body mt-10 max-w-[68ch]">
              Wie aus dieser Rohfassung ein Exposé wird, das den Alleinauftrag rechtfertigt, statt
              nur Fotos aneinanderzureihen, zeigt die Seite{" "}
              <Link href="/exposes-die-verkaufen" className="ref-link">
                Exposés, die verkaufen
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
            <GelbeKarte label="Der Unterschied" titel="Die Bewertung beginnt an Tag 1, nicht am Notartermin." glyph>
              Ein Eigentümer erinnert sich am Ende nicht an jede einzelne Besichtigung. Er
              erinnert sich, ob die erste Woche geordnet wirkte oder chaotisch. Diese Erinnerung
              entscheidet später über einen Satz in der Bewertung – nicht die Zahl im Kaufvertrag
              allein.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, Terminstrecke + Rückrufregel als System ─── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Bei RIEGEL Immobilien landet jede Anfrage von Tag 1 an mit Quelle und nächstem
              Schritt im System, samt Terminstrecke und Rückrufregel. Sechs Wochen nach dem
              Relaunch: neun Abschlüsse, 342.000 € Volumen – ein Ergebnis, das im geordneten
              Ablauf der ersten Woche beginnt, nicht erst beim Notartermin.
            </p>
            <Link href="/cases/riegel-immobilien" className="ref-link mt-6 inline-block">
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
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihre *erste Woche*.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie aus der Rohfassung ein Exposé wird, das verkauft, zeigt die Seite{" "}
              <Link href="/exposes-die-verkaufen" className="ref-link">
                Exposés, die verkaufen
              </Link>
              , wie Sie danach systematisch Bewertungen gewinnen, zeigt die Seite{" "}
              <Link href="/bewertungen-aufbauen" className="ref-link">
                Bewertungen aufbauen
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
