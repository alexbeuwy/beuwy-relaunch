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
 * Wissens-Seite — /geo-checkliste (R3-SEITENPLAN.json, Cluster K). Angle
 * verlangt explizit eine abarbeitbare Checkliste mit Prüfmethode je Punkt —
 * deshalb hier keine Nummern-Liste als Hauptbaustein, sondern 21
 * Häkchen-Punkte in vier Gruppen (Daten, Struktur, Antworten, Konsistenz),
 * jeder mit eigener Prüfmethode. Titel verspricht "21 Punkte", die Zahl
 * wird eingehalten (5+5+6+5). Foto 19 laut Spec.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "GEO-Checkliste: 21 Punkte, bis die KI Ihren Namen kennt | beuwy",
  description:
    "GEO-Checkliste mit 21 Punkten in vier Gruppen — Daten, Struktur, Antworten, Konsistenz — jeder mit Prüfmethode, damit ChatGPT & Co. Sie als Makler zitieren.",
  openGraph: {
    title: "GEO-Checkliste: 21 Punkte, bis die KI Ihren Namen kennt | beuwy",
    description:
      "21 abarbeitbare Punkte, vier Gruppen, jeder mit Prüfmethode: die GEO-Checkliste, damit KI-Assistenten Sie als Makler in ihrer Antwort nennen.",
    type: "website",
    locale: "de_DE",
  },
};

type Punkt = { titel: string; text: string; pruefung: string };
type Gruppe = { name: string; punkte: Punkt[] };

const GRUPPEN: Gruppe[] = [
  {
    name: "Daten",
    punkte: [
      {
        titel: "Google-Unternehmensprofil vollständig",
        text: "Kategorie, Öffnungszeiten, Telefonnummer und Leistungsbeschreibung sind ausgefüllt, nicht nur der Name.",
        pruefung: "Google-Unternehmensprofil öffnen, jedes Feld einzeln durchgehen.",
      },
      {
        titel: "NAP-Konsistenz",
        text: "Name, Adresse und Telefonnummer stehen auf Website, Google-Profil und allen Portalen identisch, bis zum Schreibfehler in der Straße.",
        pruefung: "Alle drei Quellen nebeneinander öffnen und Zeichen für Zeichen vergleichen.",
      },
      {
        titel: "Strukturierte Daten für das Unternehmen",
        text: "Ein LocalBusiness-Schema auf der Website nennt Name, Adresse und Leistung maschinenlesbar, nicht nur im Fließtext.",
        pruefung: "Seitenquelltext nach „LocalBusiness“ durchsuchen oder den Rich-Results-Test von Google nutzen.",
      },
      {
        titel: "Belegte Zahlen statt Behauptungen",
        text: "Mindestens eine überprüfbare Zahl steht auf der Seite: Jahre am Markt, Anzahl vermittelter Objekte, ein Award-Platz.",
        pruefung: "Startseite und Über-uns-Seite auf eine konkrete, mit Jahr oder Quelle belegte Zahl prüfen.",
      },
      {
        titel: "Aktualitätsdatum sichtbar",
        text: "Ratgeberseiten und Marktberichte zeigen ein Datum oder einen Aktualisierungshinweis, keine zeitlose Formulierung ohne Anker.",
        pruefung: "Fünf Ratgeberseiten öffnen und auf ein sichtbares Datum prüfen.",
      },
    ],
  },
  {
    name: "Struktur",
    punkte: [
      {
        titel: "Eine Seite pro Suchfrage",
        text: "Jede typische Eigentümerfrage hat eine eigene URL, nicht nur einen Absatz auf der Startseite.",
        pruefung: "Fünf typische Suchfragen notieren und prüfen, ob dafür jeweils eine eigene Seite existiert.",
      },
      {
        titel: "Klare Überschriften-Hierarchie",
        text: "Jede Seite hat genau eine H1, die die Kernfrage benennt, darunter H2/H3 in logischer Reihenfolge.",
        pruefung: "Seitenquelltext nach H1-Tags durchsuchen — genau einer pro Seite.",
      },
      {
        titel: "Antwort direkt im ersten Absatz",
        text: "Die Kernfrage wird in zwei bis vier Sätzen direkt unter der Überschrift beantwortet, nicht erst nach der Anfahrtsbeschreibung.",
        pruefung: "Erste 300 Zeichen unter der H1 lesen und prüfen, ob die Frage darin beantwortet ist.",
      },
      {
        titel: "Ladezeit unter zwei Sekunden",
        text: "Die Seite steht, bevor der nächste Tab geöffnet ist — sonst bricht der Assistent den Abruf ab oder wertet die Quelle schlechter.",
        pruefung: "PageSpeed Insights oder einen vergleichbaren Test für die wichtigsten Seiten laufen lassen.",
      },
      {
        titel: "robots.txt und Sitemap erlauben Zugriff",
        text: "Kein Crawler-Ausschluss blockiert versehentlich die Seiten, die KI-Systeme lesen sollen.",
        pruefung: "robots.txt der Domain öffnen und auf Disallow-Zeilen prüfen, Sitemap-URL im Browser aufrufen.",
      },
    ],
  },
  {
    name: "Antworten",
    punkte: [
      {
        titel: "FAQ mit echten Fragen",
        text: "Die FAQ beantwortet Fragen, die Eigentümer wirklich stellen, in eigenen Worten, nicht in Marketingsprache.",
        pruefung: "Drei Eigentümer oder Kollegen fragen, welche Fragen sie vor der Maklerwahl hatten, und mit der FAQ abgleichen.",
      },
      {
        titel: "FAQPage-Markup hinterlegt",
        text: "Fragen und Antworten stehen zusätzlich als strukturierte Daten im Quelltext, nicht nur sichtbar im Akkordeon.",
        pruefung: "Seite im Rich-Results-Test von Google prüfen, ob FAQPage erkannt wird.",
      },
      {
        titel: "Zahlen mit Einordnung, nicht nur Wert",
        text: "Eine Kennzahl steht nie allein — daneben, was sie bedeutet und wie sie zustande kam.",
        pruefung: "Jede Zahl auf der Seite markieren und prüfen, ob ein Einordnungssatz direkt daneben steht.",
      },
      {
        titel: "Kurze, zitierfähige Sätze",
        text: "Mindestens ein Satz pro Seite beantwortet die Kernfrage komplett in sich, ohne dass der vorherige Satz nötig ist, um ihn zu verstehen.",
        pruefung: "Absatz unter der H1 isoliert lesen, so wie ein Assistent ihn zitieren würde.",
      },
      {
        titel: "Fachbegriffe erklärt, nicht vorausgesetzt",
        text: "Ein Begriff wie Alleinauftrag oder Verkehrswert wird bei erster Nennung kurz erklärt.",
        pruefung: "Seite von jemandem außerhalb der Branche gegenlesen lassen, unbekannte Begriffe markieren.",
      },
      {
        titel: "Autor oder Fachperson erkennbar",
        text: "Hinter der Seite steht eine erkennbare Person oder ein Unternehmen mit Name, nicht ein anonymer Redaktionsblock.",
        pruefung: "Prüfen, ob Autor, Unternehmen oder eine Über-uns-Verlinkung auf der Seite sichtbar ist.",
      },
    ],
  },
  {
    name: "Konsistenz",
    punkte: [
      {
        titel: "Gleiche Kernaussagen über alle Plattformen",
        text: "Website, Google-Profil, Portale und Social-Media-Bio nennen dieselbe Positionierung, nicht vier verschiedene Versionen.",
        pruefung: "Bio-Texte und Beschreibungen aller Profile nebeneinander kopieren und vergleichen.",
      },
      {
        titel: "Bewertungen aktiv und beantwortet",
        text: "Google-Bewertungen kommen regelmäßig dazu und werden beantwortet, nicht nur gesammelt.",
        pruefung: "Datum der letzten fünf Bewertungen und der letzten Antwort im Profil prüfen.",
      },
      {
        titel: "Verlinkung zwischen den eigenen Seiten",
        text: "Verwandte Themen verweisen aufeinander, damit ein Assistent den Zusammenhang der Inhalte erkennt.",
        pruefung: "Zehn Ratgeberseiten öffnen und zählen, wie viele auf eine andere eigene Seite verlinken.",
      },
      {
        titel: "Keine widersprüchlichen alten Profile",
        text: "Kein verwaistes Profil auf einer alten Plattform zeigt eine andere Adresse oder Telefonnummer.",
        pruefung: "Eigenen Firmennamen bei Google suchen und alle erscheinenden Profile öffnen.",
      },
      {
        titel: "Regelmäßige Aktualisierung statt einmaliger Aufbau",
        text: "Mindestens ein Inhalt pro Monat wird aktualisiert oder ergänzt, damit die Seite als lebendig gilt.",
        pruefung: "Änderungsdatum der letzten drei veröffentlichten Seiten prüfen.",
      },
    ],
  },
];

const GESAMT = GRUPPEN.reduce((n, g) => n + g.punkte.length, 0);

const FAQS = [
  {
    q: "Was ist GEO genau?",
    a: "GEO steht für Generative Engine Optimization: die Arbeit daran, dass KI-Assistenten wie ChatGPT, Perplexity oder Googles AI Overviews Sie in ihrer Antwort nennen, statt nur Google eine Rangliste von Links liefern zu lassen. Mehr zur Einordnung in Ihrem Markt zeigt GEO für Immobilienmakler.",
  },
  {
    q: "Reicht diese Checkliste allein für Sichtbarkeit in der KI-Suche?",
    a: "Sie ist das Fundament, keine Garantie. Wie eine KI eine Quelle auswählt, hängt zusätzlich vom Modell, der Frage und dem Wettbewerb in Ihrer Stadt ab. Alle 21 Punkte umzusetzen erhöht die Chance deutlich, ersetzt aber keine laufende Beobachtung.",
  },
  {
    q: "Wie oft sollte ich die Liste durchgehen?",
    a: "Einmal komplett zum Start, danach reicht ein Quartalscheck. Die Punkte unter Daten und Struktur ändern sich selten, die unter Konsistenz und Antworten am ehesten, weil dort Bewertungen und Inhalte laufend dazukommen.",
  },
  {
    q: "Was mache ich, wenn mehrere Punkte gleichzeitig fehlen?",
    a: "Mit den Punkten unter Daten anfangen — ohne konsistente Adresse und ein vollständiges Unternehmensprofil bringt die beste Antwort auf der Website wenig. Danach Struktur, dann Antworten und Konsistenz.",
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

export default function GeoChecklistePage() {
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
            <p className="t-label !text-ink-yellow">GEO-Checkliste</p>
            <h1 className="t-display mt-4">
              {rich(`GEO-Checkliste: ${GESAMT} Punkte, bis die *KI* Ihren Namen kennt.`)}
            </h1>
            <p className="t-body-lg mt-6 max-w-[62ch]">
              Sichtbar werden Sie in KI-Antworten, wenn vier Ebenen zusammenspielen: saubere
              Grunddaten, eine Seitenstruktur nach Suchfragen, Antworten, die sich in einem Satz
              zitieren lassen, und Konsistenz über alle Plattformen hinweg.{" "}
              <Highlight>
                {GESAMT} Punkte, vier Gruppen, jeder mit einer Methode, wie Sie ihn selbst prüfen
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
                src={maklerAsset(19)}
                alt="Person geht eine Checkliste auf einem Tablet Punkt für Punkt durch"
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover"
              />
              <AiPille />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Checkliste — vier Gruppen à 5-6 Punkte mit Prüfmethode ──────── */}
      {GRUPPEN.map((gruppe, gi) => (
        <section
          key={gruppe.name}
          id={`gruppe-${gi + 1}`}
          className={gi % 2 === 0 ? "bg-bg-elevated" : "bg-bg-base"}
        >
          <div className="mx-auto max-w-[900px] px-6 py-16 md:py-20 lg:px-10">
            <Reveal>
              <p className="t-label !text-ink-yellow">
                Gruppe {gi + 1} von {GRUPPEN.length}
              </p>
              <h2 className="t-h2 mt-3">{gruppe.name}</h2>
            </Reveal>
            <div className="mt-10 space-y-6">
              {gruppe.punkte.map((punkt, i) => (
                <Reveal key={punkt.titel} delay={i * 40}>
                  <div className="flex items-start gap-3 border-b border-line-subtle pb-6">
                    <span className="mt-1">
                      <HaekchenIcon />
                    </span>
                    <div>
                      <p className="t-body font-medium !text-ink-cream">{punkt.titel}</p>
                      <p className="t-body mt-1.5">{punkt.text}</p>
                      <p className="t-small mt-2 !text-ink-dim">Prüfmethode: {punkt.pruefung}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Der Unterschied — GelbeKarte als Pointe ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Eine Checkliste ist kein Ranking-Garant." glyph>
              Diese {GESAMT} Punkte sind das Fundament, das jede KI-Suche voraussetzt. Ob ein
              Assistent Sie am Ende tatsächlich nennt, entscheidet zusätzlich der Wettbewerb in
              Ihrer Stadt — genau dort setzt laufende Arbeit an, nicht eine einmalige Abhakliste.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis-Anriss ────────────────────────────────────────────────── */}
      <section id="beweis" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, kein Beispiel</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              Für RIEGEL Immobilien stand das technische Fundament aus Struktur, Daten und
              FAQPage-Markup innerhalb von sechs Wochen. Ergebnis in diesem Zeitraum: neun
              Abschlüsse, 342.000 € Volumen, Platz 21 von über 25.000 Maklern.
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
              titel="Was Sie vor dem *ersten* Durchlauf wissen wollen."
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
            <h2 className="t-h2 mt-4">{rich("Bauen wir das Fundament, das die *KI* zitiert.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[54ch]">
              Die Einordnung, warum das überhaupt zählt, steht unter{" "}
              <Link href="/geo-fuer-immobilienmakler" className="ref-link">
                GEO für Immobilienmakler
              </Link>
              , was Googles KI-Antworten für Sie bedeuten unter{" "}
              <Link href="/ai-overviews-immobilien" className="ref-link">
                AI Overviews
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
