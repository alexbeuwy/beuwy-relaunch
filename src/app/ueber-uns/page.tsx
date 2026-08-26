import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GRUENDER_FOTO, maklerAsset } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import {
  GelbeKarte,
  Highlight,
  LogoSlot,
  MARKEN_SLUGS,
  SektionsKopf,
  slugifyMarke,
} from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

/**
 * Über-uns-Seite (Alex, 26.08: „über uns ausarbeiten und high end
 * texten"). Dramaturgie: Haltung → drei Stationen als Story-Karten
 * (Vision Group, Königswege, acta — mit Logos) → Arbeitsweise →
 * kompakte Gründer-Karte. Kein Personenkult (BRIEF §7): die Firma
 * und die Häuser tragen die Seite, der Gründer bekommt eine Karte,
 * kein Kapitel. GRUENDER_FOTO ist echt — bewusst OHNE AiPille.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Über beuwy: Unternehmensberatung für Immobilienmarketing | beuwy",
  description:
    "beuwy ist eine Unternehmensberatung für Immobilienmarketing: Marke, Portal und Vertriebssystem aus einer Hand. 17 Jahre Markenarbeit, eigene Vertriebserfahrung, messbar in Mandaten und Deals.",
  openGraph: {
    title: "Über beuwy: Unternehmensberatung für Immobilienmarketing | beuwy",
    description:
      "Marke, Portal und Vertriebssystem aus einer Hand — von einer Beratung, die Vertrieb aus eigenem Geld kennt, nicht aus Fallstudien.",
    type: "website",
    locale: "de_DE",
  },
};

const STATIONEN = [
  {
    marke: "Vision Group",
    zeitraum: "Begleitet vom Gründungsbüro an",
    titel: "Aus drei Leuten wurde eine Gruppe, mit der Private Equity verhandelt.",
    text: "Als die Vision Group anfing, passte das Team in ein Büro. beuwy hat Marke, Auftritt und Anfragesystem über die Jahre mitentwickelt — bis zu 1.450 Wohneinheiten im Bestand und einem Joint Venture mit KKR über 160 Millionen Euro.",
  },
  {
    marke: "Königswege",
    zeitraum: "Vom Mittelfeld in die Top 10",
    titel: "Von 60 Partnern auf über 2.300 — die Marke rekrutiert heute von selbst.",
    text: "Königswege kam mit 60 Partnern. Heute gehört das Haus zu den zehn größten Finanzvertrieben Deutschlands, und der Auftritt, den wir gebaut haben, ist das Erste, was jeder neue Partner sieht.",
  },
  {
    marke: "acta",
    zeitraum: "Selbst gegründet, selbst betrieben",
    titel: "Unser eigener Vertrieb: 380 Wohneinheiten über Instagram-Anzeigen.",
    text: "acta war kein Kunde, sondern unsere eigene Firma: in der Spitze 15 Leute, rund 380 verkaufte Wohneinheiten in drei Jahren, etwa 40 Millionen Euro Volumen — akquiriert über Anzeigen, Rechner und Registrierung. Genau dieses System bauen wir heute für Sie.",
  },
] as const;

const ARBEITSWEISE = [
  {
    titel: "Done for you, in Wochen",
    text: "Marke, Portal, Funnel und Automationen liefern wir fertig. Ihr Aufwand: vier Termine. Livegang in Wochen, nicht in Quartalen — den Termin bekommen Sie schriftlich.",
  },
  {
    titel: "Ticketsystem statt Zuruf",
    text: "Jedes Ihrer Anliegen läuft als Ticket, mit Status und Nachweis, bis es erledigt ist. Niemand fragt nach zwei Wochen, wie weit sein Dokument ist.",
  },
  {
    titel: "Maßarbeit statt Baukasten",
    text: "Kein Template, keine Standard-Exposés, die auch der Wettbewerber nutzt. Jedes Portal wird für ein Haus gebaut und gehört diesem Haus.",
  },
  {
    titel: "Quoten statt Bauchgefühl",
    text: "Jeden Montag steht der Wochenbericht im Postfach: Anfragen, Quellen, Status. Sie sehen, was das System liefert — nicht, was jemand behauptet.",
  },
] as const;

const FAQS = [
  {
    q: "Was ist beuwy — Agentur oder Beratung?",
    a: "Eine Unternehmensberatung für Immobilienmarketing. Der Unterschied ist die Verantwortung: Eine Agentur liefert Werbemittel ab, wir verantworten ein System, das messbar Mandate und Deals bringt — und weisen das jeden Montag im Wochenbericht nach.",
  },
  {
    q: "Welche Erfahrung steht hinter beuwy?",
    a: "17 Jahre Markenarbeit, unter anderem für Bosch, Continental und Michelin — und eigene Vertriebserfahrung: Mit acta haben wir einen Kapitalanlage-Vertrieb selbst aufgebaut und rund 380 Wohneinheiten über Instagram-Anzeigen verkauft.",
  },
  {
    q: "Arbeitet beuwy nur mit Immobilienmaklern?",
    a: "Der Fokus liegt auf führenden Maklern. Daneben betreuen wir Projektentwickler, Bauträger und Immobilienvertriebe — Zielgruppen, deren Vertrieb nach derselben Logik funktioniert: registrieren, qualifizieren, abschließen.",
  },
  {
    q: "Wer betreut mich in der Zusammenarbeit?",
    a: "Sie haben einen festen Ansprechpartner, und jedes Anliegen läuft zusätzlich über ein Ticketsystem — nachweisbar, mit Status, bis es erledigt ist. Kein Wunsch bleibt offen.",
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

export default async function UeberUnsPage() {
  const c = await getContent();

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

      {/* ── Hero — die Firma, nicht die Person ──────────────────────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(11)}
              alt="Beratungsszene aus der beuwy-Kampagnenwelt in der Golden Hour"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 40%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">Das Fundament</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s3_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s3_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(40px,calc((100vw-1120px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">Über beuwy</p>
            <h1 className="mt-5 font-display text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Wir bauen die Systeme, mit denen Immobilienhäuser *groß* werden.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              beuwy ist eine Unternehmensberatung für Immobilienmarketing: Marke, Portal und
              Vertriebssystem aus einer Hand. <Highlight>Seit 17 Jahren, messbar in Mandaten
              und Deals</Highlight> — nicht in Klicks.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Haltung — warum Beratung, nicht Agentur ─────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Warum es beuwy gibt"
              titel="Wir haben zu viele gute Häuser mit *austauschbaren* Auftritten gesehen."
              className="max-w-[760px]"
            />
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <p className="t-body-lg">
                  Angefangen hat alles in der Markenarbeit für Häuser wie Bosch, Continental und
                  Michelin — dort lernt man, was eine Marke tragen muss, wenn Millionen auf sie
                  schauen.
                </p>
                <p className="t-body-lg">
                  Dann kam die Immobilienbranche. Und mit ihr eine Beobachtung, die uns nicht
                  losließ: Die besten Makler ihrer Stadt treten online auf wie der Drittbeste.
                  Gleiche Baukasten-Website, gleiche Standard-Exposés, gleiches Bauchgefühl statt
                  Bericht.
                </p>
              </div>
              <div className="space-y-6">
                <p className="t-body-lg">
                  Deshalb verkauft beuwy keine Websites. Wir bauen Portale, die Eigentümer
                  registrieren und vorqualifizieren — und ein System drumherum, das{" "}
                  <Highlight>jede Woche nachweist, was es liefert</Highlight>.
                </p>
                <p className="t-body-lg">
                  Und weil Beratung ohne eigene Narben wohlfeil ist, haben wir einen Vertrieb
                  selbst gegründet und betrieben. Was wir empfehlen, haben wir mit eigenem Geld
                  bezahlt und mit eigenem Team verkauft.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Drei Stationen — Story-Karten mit Logos ─────────────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Drei Stationen"
              titel="Drei Häuser, drei Größenordnungen — *ein* Muster."
              sub="Zum Nachlesen, nicht zum Glauben: Was aus Häusern wird, wenn Marke und System zusammen gebaut werden."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {STATIONEN.map((s, i) => (
              <Reveal key={s.marke} delay={i * 70}>
                <article className="flex h-full flex-col rounded-[28px] border border-line-subtle bg-white px-7 py-8">
                  <span className="flex h-6 items-center">
                    <LogoSlot
                      name={s.marke}
                      slug={MARKEN_SLUGS[s.marke] ?? slugifyMarke(s.marke)}
                      hoehe={20}
                    />
                  </span>
                  <p className="t-label mt-6 !text-[10px]">{s.zeitraum}</p>
                  <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.015em] text-ink-cream">
                    {s.titel}
                  </h3>
                  <p className="mt-4 border-t border-line-subtle pt-4 text-[14.5px] leading-[1.65] text-ink-muted">
                    {s.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Arbeitsweise — vier Zusagen ─────────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="So arbeiten wir"
              titel="Vier Zusagen, an denen Sie uns *messen* können."
              className="max-w-[680px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {ARBEITSWEISE.map((punkt, i) => (
              <Reveal key={punkt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{punkt.titel}</p>
                  <p className="t-body mt-3">{punkt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gründer — eine Karte, kein Kapitel (kein Personenkult) ──────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[880px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <div className="flex flex-col items-start gap-8 rounded-[28px] border border-line-subtle bg-white p-8 sm:flex-row sm:items-center lg:p-10">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={GRUENDER_FOTO}
                  alt="Alexander Pütter, Gründer von beuwy"
                  fill
                  sizes="112px"
                  className="object-cover"
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>
              <div>
                <p className="t-label !text-[10.5px]">Gründer</p>
                <p className="mt-2 text-[19px] font-semibold text-ink-cream">Alexander Pütter</p>
                <p className="t-body mt-3 max-w-[46ch]">
                  Führt beuwy seit dem ersten Projekt.{" "}
                  <Highlight>„Ins Rampenlicht gehört Ihre Marke, nicht meine."</Highlight> Deshalb
                  finden Sie hier keine Bühnenfotos — sondern Wochenberichte, Quoten und drei
                  Stationen zum Nachlesen.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pointe ──────────────────────────────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Wir sind keine Agentur." glyph>
              Eine Agentur liefert Werbemittel ab und ist fertig. Eine Unternehmensberatung
              verantwortet ein Ergebnis: ein System, das Eigentümer registriert, Termine bringt
              und jeden Montag Rechenschaft ablegt.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Häuser über *beuwy* wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale ──────────────────────────────────────────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Lernen wir uns über Ihre *Zahlen* kennen.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              Was beuwy baut, sehen Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , was dabei herauskommt, in den{" "}
              <Link href="/cases" className="ref-link">
                Fallstudien
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
