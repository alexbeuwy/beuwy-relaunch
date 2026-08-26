import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiCheckLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Wissensseite (R3 Welle 2, Cluster K) — /automatisierung-maklerbuero.
 * Kompakter Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil:
 * eine Vergleichstabelle mit 9 Abläufen (Vorher/Nachher-Richtwerte), ein
 * Zweispalter zum Ticketsystem-Prinzip, eine Checkliste "was beim Menschen
 * bleibt". GelbeKarte, Beweis-Anriss (RIEGEL-Rückrufregel aus cases.ts).
 * FAQ + FAQPage-JSON-LD. Foto 14 (Hochformat) laut R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Automatisierung im Maklerbüro: 9 Abläufe, die niemand vermisst | beuwy",
  description:
    "Automatisierung im Maklerbüro: 9 Abläufe von Follow-up bis Wochenbericht, mit Vorher/Nachher-Richtwerten, plus das Ticketsystem-Prinzip dahinter erklärt.",
  openGraph: {
    title: "Automatisierung im Maklerbüro: 9 Abläufe, die niemand vermisst | beuwy",
    description:
      "Neun Abläufe im Maklerbüro, die sich automatisieren lassen, ohne den persönlichen Kontakt zu verlieren — nach dem Ticketsystem-Prinzip.",
    type: "website",
    locale: "de_DE",
  },
};

const ABLAEUFE = [
  { ablauf: "Follow-up nach der Besichtigung", manuell: "~10 Min, oft vergessen", automatisiert: "läuft am Folgetag von selbst" },
  { ablauf: "Terminvergabe für die nächste Besichtigung", manuell: "~15 Min hin und her", automatisiert: "Kalenderlink, 2 Min bis fix" },
  { ablauf: "Wochenbericht an den Eigentümer", manuell: "~30 Min zusammentragen", automatisiert: "läuft freitags automatisch raus" },
  { ablauf: "Datenmail bei neuem passendem Objekt", manuell: "wird häufig vergessen", automatisiert: "läuft sofort bei Objekteingang" },
  { ablauf: "Rückruf nach sechs Monaten Funkstille", manuell: "passiert in der Praxis kaum", automatisiert: "läuft automatisch zum Stichtag" },
  { ablauf: "Übergabeprotokoll erstellen", manuell: "~20 Min abtippen", automatisiert: "Vorlage füllt sich aus Stichpunkten" },
  { ablauf: "CRM-Eintrag bei neuer Anfrage", manuell: "~5 Min Copy-Paste", automatisiert: "landet direkt mit Quelle im System" },
  { ablauf: "Erinnerung an fehlende Unterlagen", manuell: "wird leicht übersehen", automatisiert: "läuft X Tage nach Mandatsstart" },
  { ablauf: "Bewertungsanfrage nach dem Notartermin", manuell: "wird oft vergessen", automatisiert: "läuft 3 Tage nach dem Termin" },
] as const;

const BLEIBT_BEIM_MENSCHEN = [
  "Das Besichtigungsgespräch selbst, samt Einwänden und Preisverhandlung.",
  "Die Entscheidung, ob ein Sonderfall vom Standardablauf abweichen muss.",
  "Der erste persönliche Anruf bei einem neuen Mandat.",
  "Die Prüfung jeder automatisch versendeten Nachricht, bevor der Ablauf live geht.",
] as const;

const FAQS = [
  {
    q: "Verliert die Automatisierung den persönlichen Kontakt zum Kunden?",
    a: "Nein, sie übernimmt nur das Erinnern und Nachfassen, nicht das Gespräch selbst. Ein Eigentümer merkt vor allem, dass niemand vergisst zurückzurufen, nicht, dass im Hintergrund ein System läuft.",
  },
  {
    q: "Brauche ich dafür ein komplett neues CRM?",
    a: "Nicht zwingend. Entscheidend ist, ob das bestehende System Automatisierung überhaupt zulässt und ob Anfragen dort zuverlässig ankommen. Trägt es das nicht, lohnt sich ein Wechsel eher wegen fehlender Anbindung als wegen der Automatisierung selbst.",
  },
  {
    q: "Was passiert, wenn ein Fall wirklich individuelle Aufmerksamkeit braucht?",
    a: "Das System schlägt den nächsten Schritt vor, ein Mensch entscheidet weiterhin. Kein Ablauf versendet automatisch eine Nachricht, wenn ein Fall als Sonderfall markiert wurde.",
  },
  {
    q: "Wie lange dauert es, bis solche Abläufe wirklich laufen?",
    a: "Je nach Umfang meist wenige Wochen, nicht Quartale, weil es sich um feste Bausteine handelt, nicht um eine Individualentwicklung von null. Wie schnell es bei Ihnen konkret geht, hängt vom bestehenden System ab.",
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

export default function AutomatisierungMaklerbueroPage() {
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
            <p className="t-label !text-ink-yellow">KI im Maklerbüro</p>
            <h1 className="t-display mt-4">
              {rich("Automatisierung im Maklerbüro: neun Abläufe, die *niemand* vermisst.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Automatisieren lassen sich vor allem die Abläufe, die heute Zeit fressen, ohne dass
              ein Mensch dabei wirklich entscheiden muss: das Follow-up nach einer Besichtigung,
              die Terminvergabe, der Wochenbericht an den Eigentümer und die Datenmail zum
              passenden Angebot.{" "}
              <Highlight>Jeder dieser neun Abläufe folgt demselben Prinzip</Highlight> — eine
              eingehende Anfrage wird zu einem Ticket mit Status, Verantwortlichem und nächstem
              Schritt, statt in einer Inbox zu verschwinden. Was bleibt, ist die Arbeit, die
              tatsächlich einen Menschen braucht: das Gespräch selbst.
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
                src={maklerAsset(14)}
                alt="Makler prüft eine Übersicht laufender Vorgänge am Bildschirm, Kalender und Notizen daneben"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover object-top"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Die 9 Abläufe — Vergleichstabelle Vorher/Nachher ────────────────── */}
      <section id="ablaeufe" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die 9 Abläufe"
              titel="Neun Aufgaben, Vorher und *Nachher*."
              sub="Richtwerte aus der Praxis, keine Zusage für Ihr konkretes Büro. Die Größenordnung bleibt in fast jedem Fall ähnlich."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-subtle">
                    <th className="t-label py-3 pr-6 font-semibold">Ablauf</th>
                    <th className="t-label py-3 pr-6 font-semibold">Manuell</th>
                    <th className="t-label py-3 font-semibold !text-ink-cream">Automatisiert</th>
                  </tr>
                </thead>
                <tbody>
                  {ABLAEUFE.map((row) => (
                    <tr key={row.ablauf} className="border-b border-line-subtle">
                      <td className="t-data py-4 pr-6 !text-ink-cream">{row.ablauf}</td>
                      <td className="t-body py-4 pr-6 tnum">{row.manuell}</td>
                      <td className="t-body py-4 tnum">{row.automatisiert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Ticketsystem-Prinzip — Zweispalter ───────────────────────────────── */}
      <section id="ticketsystem" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Das Ticketsystem-Prinzip"
              titel="Jede Anfrage bekommt einen *Status*, keine verschwindet."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">Ohne System</p>
                <p className="t-body mt-4">
                  Anfragen verteilen sich auf E-Mail-Postfach, WhatsApp und Notizzettel. Was
                  niemand aufschreibt, wird niemand nachfassen — und was nicht nachgefasst wird,
                  entscheidet sich woanders.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">Mit Ticketsystem</p>
                <p className="t-body mt-4">
                  Jede Anfrage bekommt einen Status, einen Verantwortlichen und einen nächsten
                  Schritt mit Datum. Nichts bleibt offen, ohne dass es für jemanden sichtbar
                  offen ist.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Was beim Menschen bleibt — Checkliste ────────────────────────────── */}
      <section id="beim-menschen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die Grenze"
              titel="Was auch nach der Automatisierung beim *Menschen* bleibt."
              className="max-w-[720px]"
            />
          </Reveal>
          <Reveal delay={80}>
            <ul className="mt-10 max-w-[640px] space-y-4">
              {BLEIBT_BEIM_MENSCHEN.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-akzent-wash">
                    <RiCheckLine className="h-4 w-4 text-ink-cream" />
                  </span>
                  <span className="t-body">{punkt}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Automatisierung ersetzt nicht das Gespräch." glyph>
              Sie sorgt dafür, dass es überhaupt stattfindet — weil niemand mehr vergisst,
              zurückzurufen, nachzufassen oder den Wochenbericht zu schreiben. Das Gespräch
              selbst bleibt bei Ihnen, jedes einzelne Mal.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss — RIEGEL, Rückrufregel nach sechs Monaten ─────────── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Konzept</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              Bei RIEGEL Immobilien läuft die Terminstrecke und Rückrufregel automatisch: Wer
              heute nicht verkauft, bekommt in sechs Monaten von selbst die richtige Mail.
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir die *Abläufe*, die niemand mehr vergisst.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , Follow-up und Datenmails im Detail auf{" "}
              <Link href="/email-marketing-immobilienmakler" className="ref-link">
                E-Mail-Marketing für Immobilienmakler
              </Link>
              , wie KI insgesamt zum System statt zum Prompt wird, zeigt{" "}
              <Link href="/ki-fuer-immobilienmakler" className="ref-link">
                KI für Immobilienmakler
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
