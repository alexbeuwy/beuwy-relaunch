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
 * Wissensseite (R3 Welle 2, Cluster K) — /chatgpt-fuer-makler. Kompakter
 * Wissens-Kopf beantwortet die Suchfrage wörtlich. Hauptteil: 12 konkrete
 * Anwendungen als zweispaltige Nummern-Liste (löst das Titel-Versprechen
 * ein), ein konkretes Vorher/Nachher-Beispiel zur Einwand-Vorbereitung
 * (bewusst NICHT das Exposé-Beispiel, das lebt auf der Schwesterseite
 * /ki-expose-texte), GelbeKarte zur Abgrenzung "Systeme statt Chat",
 * Beweis-Anriss, FAQ inkl. DSGVO-Hinweis + FAQPage-JSON-LD. Foto 9 laut
 * R3-SEITENPLAN.json.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ChatGPT für Makler: 12 Anwendungen, die wirklich Zeit sparen | beuwy",
  description:
    "ChatGPT für Makler: 12 konkrete Anwendungen, die wirklich Zeit sparen, von Exposé-Rohtexten bis Übergabeprotokollen. Und die Grenze: Systeme statt Chat-Fenster.",
  openGraph: {
    title: "ChatGPT für Makler: 12 Anwendungen, die wirklich Zeit sparen | beuwy",
    description:
      "Zwölf konkrete Anwendungen für ChatGPT im Maklerbüro, promptfrei erklärt, plus die Grenze: Ein Chat-Fenster ist kein System.",
    type: "website",
    locale: "de_DE",
  },
};

const ANWENDUNGEN = [
  {
    titel: "Exposé-Rohtext aus Eckdaten",
    text: "Adresse, Wohnfläche und Baujahr rein, ein erster Fließtext-Entwurf raus, den Sie mit echten Fakten prüfen und veredeln.",
  },
  {
    titel: "Einwand-Vorbereitung vor der Besichtigung",
    text: "Typische Einwände zu Preis oder Zustand durchspielen, bevor der Eigentümer oder Käufer sie tatsächlich stellt.",
  },
  {
    titel: "Übergabeprotokoll strukturieren",
    text: "Stichpunkte zu Zählerständen und Mängeln in eine vollständige, saubere Vorlage bringen.",
  },
  {
    titel: "E-Mail-Rohentwürfe auf Standardfragen",
    text: "Erste Fassungen für wiederkehrende Fragen zu Besichtigungsterminen oder fehlenden Unterlagen.",
  },
  {
    titel: "Social-Media-Rohtext zum neuen Objekt",
    text: "Ein erster Post-Entwurf, den Sie kürzen und mit echten Fotos statt Stockmaterial versehen.",
  },
  {
    titel: "Energieausweis in Klartext übersetzen",
    text: "Fachbegriffe wie Endenergiebedarf für den Laien verständlich zusammenfassen, ohne den Ausweis selbst zu ersetzen.",
  },
  {
    titel: "Checkliste für den Notartermin",
    text: "Unterlagen und offene Fragen strukturiert zusammenstellen, bevor der Termin ansteht.",
  },
  {
    titel: "Marktbericht-Rohtext aus Rohdaten",
    text: "Zahlen zu Kaufpreisen und Angebotsdauer in einen ersten lesbaren Text verwandeln, den Sie mit Quelle gegenprüfen.",
  },
  {
    titel: "Fragenkatalog fürs Erstgespräch",
    text: "Gezielte Fragen an den Eigentümer vorbereiten, damit im Termin selbst nichts vergessen wird.",
  },
  {
    titel: "Übersetzungs-Rohfassung für internationale Käufer",
    text: "Ein Exposé-Auszug als erste fremdsprachige Fassung, die vor Versand noch geprüft wird.",
  },
  {
    titel: "Gesprächsnotizen in eine Aufgabenliste umwandeln",
    text: "Aus einem Meeting-Protokoll eine klare To-do-Liste mit Verantwortlichkeiten machen.",
  },
  {
    titel: "Rohtext für eine Stellenanzeige",
    text: "Einen ersten Entwurf liefern, wenn das Büro wächst und eine neue Position besetzt werden soll.",
  },
] as const;

const FAQS = [
  {
    q: "Ersetzt ChatGPT einen Werbetexter oder Redakteur?",
    a: "Für Rohfassungen und erste Entwürfe ja, für die Feinarbeit nicht. Ein Text, der verkaufen soll, braucht am Ende eine Person, die Ton, Wahrheitsgehalt und Wirkung prüft. ChatGPT liefert den Rohling, nicht das fertige Ergebnis.",
  },
  {
    q: "Darf ich Kundendaten in ChatGPT eingeben?",
    a: "Seien Sie zurückhaltend mit personenbezogenen Daten in einem offenen Chat-Fenster ohne passende Datenverarbeitungsvereinbarung. Anonymisierte Eckdaten wie Wohnfläche oder Baujahr sind unkritisch, Namen, Adressen und Vertragsdetails gehören eher in ein geprüftes System als in einen Chat. Das ist eine allgemeine Einordnung, keine Rechtsberatung. Bei Zweifeln fragen Sie Ihren Datenschutzbeauftragten.",
  },
  {
    q: "Wie genau sind KI-generierte Texte über die Immobilie?",
    a: "Nur so genau wie die Eingabe. ChatGPT erfindet plausibel klingende Details, wenn Angaben fehlen. Jede Zahl und jede Eigenschaft im fertigen Text muss gegen die echten Objektunterlagen geprüft werden, bevor er veröffentlicht wird.",
  },
  {
    q: "Was ist der Unterschied zwischen ChatGPT nutzen und einem System bauen?",
    a: "ChatGPT beantwortet eine einzelne Aufgabe, wenn Sie danach fragen. Ein System merkt sich, was wann zu tun ist, und läuft ohne tägliches Prompten von selbst weiter, etwa beim Nachfassen oder bei der Exposé-Erstellung.",
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

export default function ChatgptFuerMaklerPage() {
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
              {rich("ChatGPT für Makler: zwölf *Anwendungen*, die wirklich helfen.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sie können ChatGPT als Makler für alles nutzen, was heute als Rohfassung oder erste
              Vorbereitung auf Ihrem Schreibtisch liegt: Exposé-Rohtexte aus Eckdaten, eine{" "}
              <Highlight>Einwand-Vorbereitung vor der Besichtigung, ein sauber
              strukturiertes Übergabeprotokoll</Highlight> und neun weitere Anwendungen. Die
              Grenze liegt dort, wo aus einem Prompt ein wiederkehrender Ablauf werden soll, das
              schafft ein Chat-Fenster allein nicht, dafür braucht es ein System.
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
                src={maklerAsset(9)}
                alt="Makler tippt einen Textentwurf am Laptop, Objektunterlagen liegen daneben auf dem Tisch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 12 Anwendungen — zweispaltige Nummern-Liste ─────────────────────── */}
      <section id="anwendungen" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Die 12 Anwendungen"
              titel="Wofür ChatGPT im Maklerbüro *wirklich* Zeit spart."
              sub="Promptfrei erklärt: nicht die Formulierung des Prompts zählt, sondern die Aufgabe, die dahinter steckt."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-14 border-t border-line-subtle sm:grid-cols-2">
            {ANWENDUNGEN.map((a, i) => (
              <Reveal key={a.titel} delay={(i % 6) * 40}>
                <div className="border-b border-line-subtle py-7">
                  <div className="flex items-baseline gap-3">
                    <span className="t-data shrink-0 tnum">{String(i + 1).padStart(2, "0")}</span>
                    <p className="t-h3 !text-[17px]">{a.titel}</p>
                  </div>
                  <p className="t-body mt-2 pl-9">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ein Beispiel — Einwand-Vorbereitung, konkret ────────────────────── */}
      <section id="beispiel" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Ein Beispiel"
              titel="So sieht die Einwand-Vorbereitung *konkret* aus."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border border-line-subtle bg-bg-elevated p-7">
                <p className="t-label">Die Situation</p>
                <p className="t-body mt-4">
                  Eine Altbauwohnung steht für 480.000 € im Exposé. Ein Interessent nennt beim
                  Rundgang den sichtbaren Sanierungsstau am Bad als Grund für ein niedrigeres
                  Gebot.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="h-full rounded-[24px] border-l-2 border-akzent bg-bg-elevated p-7">
                <p className="t-label">Die Vorbereitung</p>
                <p className="t-body mt-4">
                  Vor dem Termin liefert ChatGPT drei Antwortbausteine: eine Einordnung der
                  Sanierungskosten in Relation zum Kaufpreis, einen Vergleich zu ähnlichen Objekten
                  ohne Sanierungsstau in der Umgebung, und eine Formulierung, die den Zustand nicht
                  kleinredet. Sie wählen im Gespräch den passenden Baustein, statt spontan zu
                  improvisieren.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Die Grenze — GelbeKarte, Systeme statt Chat ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Die Grenze" titel="Ein Chat-Fenster ist kein System." glyph>
              Jede der zwölf Anwendungen spart Minuten an einer einzelnen Aufgabe. Was ein
              Maklerbüro wirklich entlastet, ist ein Ablauf, der sich selbst merkt, wann ein
              Exposé fällig ist oder wann nachgefasst werden muss. Genau das bauen wir, statt
              Ihnen eine weitere Prompt-Liste zu geben.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Prompt-Versuch</p>
            <p className="t-h3 mt-3 max-w-[46ch]">
              {rich("*Siebzehn* Jahre Systembau, nicht erst seit dem ersten Sprachmodell.")}
            </p>
            <p className="t-body mt-4 max-w-[52ch]">
              Wir übersetzen KI-Werkzeuge seit Jahren in feste Abläufe für Marken, die vor
              ChatGPT genauso auf funktionierende Prozesse angewiesen waren wie Ihr Büro heute.
            </p>
            <Link href="/ki-fuer-immobilienmakler" className="ref-link mt-6 inline-block">
              Wie wir KI in Abläufe übersetzen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ — inkl. DSGVO-Hinweis, sauber eingeordnet ───────────────────── */}
      <section id="faq" className="bg-bg-elevated">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Makler vor dem *ersten* Prompt wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir das *System*, nicht den nächsten Prompt.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[56ch]">
              Einen Überblick über alle Bausteine finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , wie wir KI-Werkzeuge in bleibende Abläufe übersetzen, zeigt die Seite{" "}
              <Link href="/ki-fuer-immobilienmakler" className="ref-link">
                KI für Immobilienmakler
              </Link>
              . Speziell zu Exposé-Texten und ihrer Objektwahrheit geht es auf{" "}
              <Link href="/ki-expose-texte" className="ref-link">
                KI-Exposé-Texte
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
