import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "@remixicon/react";
import { maklerAsset } from "@/lib/cdn";
import { rich } from "@/components/RichText";
import { AiPille } from "@/components/AiPille";
import { Highlight, SektionsKopf, StempelBadge } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";

/**
 * D1 — SEO-Hub „Immobilienmarketing". Rankt für das Keyword selbst UND
 * verteilt Autorität auf alle Unterseiten (BRIEF §6, GOAL Kriterium 2).
 * XXL-Hero im Systemstil (Foto 10, ~75vh statt MaklerHeros 92dvh) →
 * Einordnungs-Sektion (echter Fließtext, kein Blabla) → Themen-Rails
 * (KEINE Kartengrids) → 4 Säulen als neutrale Karten (Gelb nur im CTA,
 * ein Akzent pro Viewport) → Finale. Alle Texte hier
 * hardcodiert (content.ts ist für dieses Leaf gesperrt) — gewünschte
 * Studio-Keys stehen im Abschlussbericht.
 */

export const metadata: Metadata = {
  title: "Immobilienmarketing: Der Premium-Ansatz für führende Makler | beuwy",
  description:
    "Was 2026 über Immobilienmarketing entscheidet: Marke, Sichtbarkeit und Tempo. Der Überblick für Makler, die führen wollen — mit allen Themen im Detail.",
  alternates: { canonical: "/immobilienmarketing" },
  openGraph: {
    title: "Immobilienmarketing: Der Premium-Ansatz für führende Makler",
    description:
      "Marke, Sichtbarkeit und Tempo entscheiden 2026 über Immobilienmarketing. Der Überblick für Makler, die ihren Vorsprung ausbauen wollen.",
    type: "article",
    locale: "de_DE",
  },
};

const THEMEN = [
  {
    nr: "01",
    titel: "Leadgenerierung für Immobilienmakler",
    href: "/leadgenerierung-immobilienmakler",
    text: "Anfragen sind kein Zufall, wenn das System stimmt: Rechner und Formulare, die Eigentümer qualifizieren, bevor Sie überhaupt telefonieren. So landet eine Adresse mit Score im CRM — nicht eine E-Mail, die im Postfach wartet.",
  },
  {
    nr: "02",
    titel: "Website für Immobilienmakler",
    href: "/website-fuer-immobilienmakler",
    text: "Ihre Website ist der erste Besichtigungstermin, er dauert Sekunden, nicht Minuten. Wir bauen sie als Portal, das Eigentümer registriert und qualifiziert, bevor Sie zurückrufen, mit Exposés, die den Alleinauftrag rechtfertigen.",
  },
  {
    nr: "03",
    titel: "onOffice-Websites",
    href: "/onoffice-website",
    text: "Ihre Website läuft nicht neben onOffice her, sondern daran angebunden: jede Anfrage landet mit Quelle im System, kein Copy-Paste, kein vergessener Rückruf. Für Makler, die onOffice schon nutzen.",
  },
  {
    nr: "04",
    titel: "Die 30 besten Maklerwebsites Deutschlands",
    href: "/beste-maklerwebsites",
    text: "Wir haben dreißig Maklerwebsites nach den Kriterien geprüft, mit denen Eigentümer unbewusst urteilen: Ladezeit, Bildsprache, Vertrauenssignale. Sehen Sie, wo die Besten stehen.",
  },
  {
    nr: "05",
    titel: "Was kostet eine Maklerwebsite?",
    href: "/maklerwebsite-kosten",
    text: "Vom Baukasten für dreihundert Euro bis zur Maßanfertigung — die Spannen liegen weit auseinander. Wir zeigen die realen Marktpreise, damit Sie vergleichen können, bevor Sie unterschreiben.",
  },
  {
    nr: "06",
    titel: "Maklersoftware im Vergleich",
    href: "/maklersoftware-vergleich",
    text: "onOffice, FLOWFACT, Propstack, JUSTIMMO: Die Software entscheidet, was Ihre Website leisten kann. Der Vergleich zeigt, welches System zu welcher Kanzleigröße passt.",
  },
  {
    nr: "07",
    titel: "BOTTIMMO-Alternative",
    href: "/bottimmo-alternative",
    text: "BOTTIMMO und ähnliche Baukästen lösen das Problem für den Durchschnitt. Wer sich davon abheben will, braucht ein Portal, das aussieht, als wäre es für genau sein Büro gebaut, weil es das ist.",
  },
  {
    nr: "08",
    titel: "KI für Immobilienmakler",
    href: "/ki-fuer-immobilienmakler",
    text: "Jede Woche ein neues Modell, ChatGPT, Claude, Kimi, DeepSeek, und kaum jemand kommt mit. Wir übersetzen das in Systeme, die im Alltag wirklich Arbeit abnehmen, nicht in noch mehr Prompts zum Ausprobieren.",
  },
  {
    nr: "09",
    titel: "Immobilienmarketing-Agentur?",
    href: "/immobilienmarketing-agentur",
    text: "Eine Agentur liefert Kampagnen und reicht die Umsetzung weiter. Wir beraten und bauen selbst, seit 17 Jahren, mit nachweisbaren Ergebnissen statt einem weiteren Pitch-Deck.",
  },
  {
    nr: "10",
    titel: "Marketing für Projektentwickler",
    href: "/marketing-projektentwickler",
    text: "Ein Bauvorhaben verkauft sich nicht über eine Postkarte im Briefkasten. Marke, Vertriebsseite und Reservierungs-Funnel für Projekte, die mehrere Einheiten gleichzeitig füllen müssen.",
  },
  {
    nr: "11",
    titel: "Marketing für Bauträger",
    href: "/marketing-bautraeger",
    text: "Vom ersten Spatenstich bis zur letzten Einheit: ein System, das Interessenten registriert, qualifiziert und durch die Vertriebsphasen eines Bauprojekts führt.",
  },
  {
    nr: "12",
    titel: "Marketing für Immobilienvertriebe",
    href: "/marketing-immobilienvertrieb",
    text: "Kapitalanlage-Vertriebe leben von Terminen, nicht von Klicks. Ein System, das aus Anfragen registrierte Kontakte macht und sie an ein Vertriebsteam übergibt, das sie auch erreicht.",
  },
  {
    nr: "13",
    titel: "SEO für Immobilienmakler",
    href: "/seo-fuer-immobilienmakler",
    text: "Bei „Immobilienmakler + Stadt“ stehen Portale und der Wettbewerb vorn, solange die eigene Seite nur für den Firmennamen rankt. Eine Seitenarchitektur nach Suchintention ändert das — und das Portal registriert, was die Rankings bringen.",
  },
  {
    nr: "14",
    titel: "GEO: Sichtbar in der KI-Suche",
    href: "/geo-fuer-immobilienmakler",
    text: "Eigentümer fragen heute ChatGPT, welcher Makler in ihrer Stadt gut ist. Wer in diesen Antworten nicht vorkommt, existiert für sie nicht. GEO macht Ihr Haus zitierfähig — strukturierte Daten, klare Antworten, konsistente Firmendaten.",
  },
  {
    nr: "15",
    titel: "Social Media für Immobilienmakler",
    href: "/social-media-immobilienmakler",
    text: "Jeden Tag posten und trotzdem keine Anfrage: Reichweite verpufft, wenn sie nirgendwo registriert wird. Ein Content-System, das aufs Portal einzahlt — belegt durch unseren eigenen Vertrieb, der 380 Wohneinheiten über Instagram verkauft hat.",
  },
  {
    nr: "16",
    titel: "E-Mail-Marketing für Immobilienmakler",
    href: "/email-marketing-immobilienmakler",
    text: "Im CRM schlummern hunderte Kontakte, während Anzeigen neue Leads teuer einkaufen. Follow-up-Automation und Datenmails zum konkreten Objekt wecken sie — das Postfach verkauft mit.",
  },
  {
    nr: "17",
    titel: "Marketing für Kapitalanlage-Immobilien",
    href: "/marketing-kapitalanlage-immobilien",
    text: "Gekaufte Anleger-Leads sind teuer, mehrfach verkauft und kalt. Ein Portal, das Anleger vorqualifiziert, bevor der Kalender belegt wird — gebaut aus eigener Vertriebserfahrung mit rund 40 Millionen Euro Volumen.",
  },
  {
    nr: "18",
    titel: "Über beuwy",
    href: "/ueber-uns",
    text: "Wer hinter den Portalen steht: eine Unternehmensberatung mit 17 Jahren Markenarbeit und eigener Vertriebserfahrung — drei Stationen zum Nachlesen, vier Zusagen zum Messen.",
  },
] as const;

const SAEULEN = [
  {
    nr: "01",
    titel: "Marke & Design",
    text: "Ein Auftritt, der Vertrauen schafft, bevor der erste Satz gelesen ist — Fotografie, Typografie und Sprache aus einem Guss.",
  },
  {
    nr: "02",
    titel: "Website & Experience",
    text: "Eine Website, die lädt wie das Büro, das sofort zurückruft, mit Exposés, die den Alleinauftrag rechtfertigen.",
  },
  {
    nr: "03",
    titel: "E-Mail & Funnel",
    text: "Formulare und Rechner qualifizieren Eigentümer, während Sie besichtigen — der Lead liegt mit Score im CRM, nicht im Postfach.",
  },
  {
    nr: "04",
    titel: "Automatisierung",
    text: "Wer heute nicht kauft, bekommt in sechs Monaten die richtige E-Mail. Automatisch, ohne dass jemand daran denken muss.",
  },
] as const;

function CtaPill({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/anfrage"
      className={`group inline-flex items-center gap-2.5 rounded-full bg-akzent px-7 py-3.5 text-[15px] font-semibold text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover ${className}`}
    >
      Zusammenarbeit anfragen
      <RiArrowRightUpLine
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

function HubHero() {
  return (
    <header className="relative bg-bg-base">
      <div className="relative min-h-[70dvh] lg:min-h-[76dvh]">
        {/* Media-Plate: randlos rechts + oben, linke Kante fadet ins Weiß.
            Mobile: eigener Block über dem Text (wie MaklerHero-Konvention). */}
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
          <Image
            src={maklerAsset(10)}
            alt="Menschen besprechen Baupläne an einer Kücheninsel im Golden-Hour-Licht"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
          <AiPille />

          {/* Layering-Element (REFERENZ-ANALYSE Pflicht): Stempel-Badge auf der Bildecke */}
          <StempelBadge
            text="Immobilienmarketing · beuwy"
            groesse={100}
            className="absolute right-5 top-5 lg:right-7 lg:top-7"
          />
        </div>

        {/* Textspalte */}
        <div className="relative z-10 mx-auto flex min-h-full max-w-[1120px] flex-col justify-center px-6 pb-14 pt-24 lg:min-h-[76dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1120px)/2))] lg:pr-[54vw] lg:pt-24">
          <p className="t-label !text-ink-yellow">Immobilienmarketing für führende Makler</p>
          <h1 className="t-display mt-5 max-w-[16ch]">
            {rich("Immobilienmarketing, das *führende* Makler weiterbringt.")}
          </h1>
          <p className="t-body-lg mt-6 max-w-[34rem]">
            Die meisten Maklerbüros posten mehr und warten auf mehr Anfragen. Wir bauen Marke,
            Website und Automatisierung als ein System — eines, das{" "}
            <Highlight>auch dann arbeitet, wenn Sie gerade in der Besichtigung stehen</Highlight>.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <CtaPill />
            <span className="t-small">Antwort innerhalb von 24 Stunden</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function EinordnungSection() {
  return (
    <section className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow="Einordnung"
            titel="Was 2026 über Immobilienmarketing *wirklich* entscheidet."
            className="max-w-[720px]"
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          <Reveal delay={0}>
            <h3 className="t-h3">Marke, Sichtbarkeit, Automatisierung</h3>
            <p className="t-body mt-4">
              Drei Dinge trennen 2026 die Maklerbüros, die wachsen, von denen, die nur verwalten.
              Erstens eine Marke, die in den ersten Sekunden Vertrauen schafft — nicht nur ein
              Logo, sondern Fotografie, Typografie und Sprache, die auf jedem Kanal gleich
              aussehen. Zweitens digitale{" "}
              <Link
                href="/leadgenerierung-immobilienmakler"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                Sichtbarkeit
              </Link>{" "}
              dort, wo Eigentümer tatsächlich suchen: bei Google, nicht nur auf Portalen, in die
              jeder Wettbewerber ohnehin einzahlt. Drittens Automatisierung, die die Anfrage von
              Freitagabend nicht im Postfach liegen lässt, bis am Montag jemand Zeit findet. Eine
              Marke ohne Sichtbarkeit bleibt intern schön. Sichtbarkeit ohne Automatisierung
              bringt Anfragen, die trotzdem versickern. Wer nur eins davon hat, verliert gegen
              den, der alle drei kombiniert.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="t-h3">Warum Eigentümer anders suchen als Käufer</h3>
            <p className="t-body mt-4">
              Käufer vergleichen zwanzig Angebote an einem Abend, scrollen Portale, klicken sich
              durch Grundrisse, speichern fünf Favoriten für später. Eigentümer suchen anders:
              einmal, meist entschlossen — den eigenen Stadtteil plus „Makler", den Namen, den
              der Nachbar erwähnt hat, oder direkt Ihre Kanzlei. Meist vergleicht er dabei nur
              zwei oder drei Websites und entscheidet nach Bauchgefühl, welches Büro größer
              wirkt. Dieser eine Moment entscheidet, ob Ihre{" "}
              <Link
                href="/website-fuer-immobilienmakler"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                Website
              </Link>{" "}
              den Alleinauftrag holt oder verliert, bevor das erste Gespräch überhaupt
              stattfindet. Wer hier nicht sofort überzeugt, bekommt keine zweite Chance — der
              Eigentümer ruft einfach den nächsten Namen auf der Liste an.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="t-h3">Warum Tempo der unterschätzte Faktor ist</h3>
            <p className="t-body mt-4">
              Eine Anfrage, die nicht binnen Minuten beantwortet wird, ist kalt, bevor das Exposé
              fertig ist. Das gilt für den Rückruf genauso wie für die Website selbst: Eine Seite,
              die in unter zwei Sekunden lädt, wirkt wie das Büro, das sofort abhebt. Ein Rückruf,
              der erst am nächsten Morgen kommt, wirkt wie eine Absage — auch wenn er keine ist.
              Tempo ist kein technisches Detail für die Entwicklung im Hintergrund — es ist das
              erste Signal, das ein Eigentümer über die Professionalität eines Maklers bekommt,
              lange bevor er ein einziges Wort gelesen hat. Genau hier entscheidet sich, welche{" "}
              <Link
                href="/maklersoftware-vergleich"
                className="text-ink-cream underline decoration-line-medium underline-offset-4 transition-colors duration-(--duration-quick) hover:decoration-ink-cream"
              >
                CRM-Anbindung
              </Link>{" "}
              im Alltag wirklich trägt.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ThemenSection() {
  return (
    <section className="border-t border-line-subtle bg-bg-elevated">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow="Themen"
            titel="Vertiefen Sie, was für Sie gerade *zählt*."
            sub="Jede Seite steht für sich — und führt zurück hierher."
            className="max-w-[640px]"
          />
        </Reveal>

        <div className="mt-14">
          {THEMEN.map((thema, i) => (
            <Reveal key={thema.href} delay={i * 40}>
              <Link
                href={thema.href}
                className={`group grid grid-cols-1 gap-3 py-8 md:grid-cols-[64px_1fr_auto] md:items-start md:gap-8 md:py-9 ${
                  i > 0 ? "border-t border-line-subtle" : ""
                }`}
              >
                <span className="t-data tnum">{thema.nr}</span>
                <div className="md:max-w-[640px]">
                  <h3 className="t-h3 transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:text-ink-yellow">
                    {thema.titel}
                  </h3>
                  <p className="t-body mt-2.5">{thema.text}</p>
                </div>
                <span className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-ink-cream md:mt-0">
                  <span className="hidden md:inline">Mehr erfahren</span>
                  <RiArrowRightLine
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-line-subtle" />
        </div>
      </div>
    </section>
  );
}

function SaeulenSection() {
  return (
    <section className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
        <Reveal>
          <SektionsKopf
            eyebrow="Was wir bauen"
            titel="Vier Säulen. *Ein* System."
            sub="Getrennt eingekauft bringt keine der vier etwas. Zusammen gebaut tragen sie sich gegenseitig."
            ausrichtung="mitte"
          />
        </Reveal>

        {/* Neutrale Karten, ein Akzent pro Viewport (BRIEF §3): das einzige
            Gelb dieser Sektion ist die CtaPill darunter — vier gelbe Karten
            nebeneinander wären Akzent-Inflation. */}
        <div className="mx-auto mt-14 grid max-w-[880px] gap-6 sm:grid-cols-2">
          {SAEULEN.map((saeule, i) => (
            <Reveal key={saeule.titel} delay={i * 60}>
              <div className="h-full rounded-[28px] border border-line-subtle bg-bg-base px-7 py-8 sm:px-8 sm:py-9">
                <p className="t-data tnum text-ink-yellow">{saeule.nr}</p>
                <p className="mt-3 font-display text-[26px] leading-[1.18] tracking-[-0.015em] text-ink-cream [font-weight:640] [text-wrap:balance]">
                  {saeule.titel}
                </p>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">
                  {saeule.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CtaPill />
        </div>
      </div>
    </section>
  );
}

function FinaleSection() {
  return (
    <section className="border-t border-line-subtle bg-bg-elevated">
      <div className="mx-auto max-w-[640px] px-6 py-20 text-center md:py-24 lg:px-10">
        <Reveal>
          <p className="t-label">Passt das zu Ihnen?</p>
          <h2 className="t-h2 mt-4">
            {rich("Für Makler, die schon *führen* — nicht für den nächsten Baukasten.")}
          </h2>
          <div className="mt-9 flex flex-col items-center gap-3">
            <CtaPill />
            <span className="t-small">Antwort innerhalb von 24 Stunden</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ImmobilienmarketingPage() {
  return (
    <>
      <HubHero />
      <article>
        <EinordnungSection />
        <ThemenSection />
        <SaeulenSection />
        <FinaleSection />
      </article>
    </>
  );
}
