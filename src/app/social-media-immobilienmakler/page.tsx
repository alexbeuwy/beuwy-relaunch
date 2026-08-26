import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { maklerAsset, makler9x16 } from "@/lib/cdn";
import { AiPille } from "@/components/AiPille";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { GelbeKarte, Highlight, SektionsKopf } from "@/components/MaklerElemente";
import { Reveal } from "@/components/Reveal";
import { PainRows } from "@/components/PainRows";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CaseGrid } from "@/components/CaseGrid";
import { caseBySlug } from "@/lib/cases";

/**
 * Zielgruppenseite „Social Media für Immobilienmakler". Eigener Pain
 * (posten ohne Anfrage, Reichweite ohne Registrierung, Personal Branding
 * als Bauchgefühl, Wettbewerber wirkt in der Story größer). Kronzeuge ist
 * acta (Vertrieb über Instagram-Anzeigen, selbst mit aufgebaut) — acta hat
 * in src/lib/cases.ts keinen eigenen CaseStudy-Eintrag/Slug (nur als
 * Kundenlogo + Studio-Kennzahl geführt), ein CaseGrid-Link auf /cases/acta
 * würde also ins Leere laufen. Der Beweis läuft deshalb als Text-Kronzeuge
 * mit den belegten Zahlen, das CaseGrid darunter zeigt riegel-immobilien
 * (echter, verlinkbarer Fall) — dasselbe Muster wie auf jeder anderen
 * XXL-Zielgruppenseite (siehe marketing-bautraeger, leadgenerierung-
 * immobilienmakler). Foto 9 (Dachterrasse-Gruppe, Golden Hour) ist der
 * Hero-Anker, Foto 7 + das echte 9:16-Story-Asset (02) tragen die
 * "so sieht Ihre Story aus"-Sektion.
 */

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Social Media für Immobilienmakler: Anfragen statt Likes | beuwy",
  description:
    "beuwy verbindet Ihren Social-Media-Auftritt mit einem Portal: ein Content-System statt Einzelposts, jede Story mit einem Ziel — Registrierung statt Reichweite ohne Ergebnis.",
  openGraph: {
    title: "Social Media für Immobilienmakler: Anfragen statt Likes | beuwy",
    description:
      "Ein Content-System statt Einzelposts: Anzeigen und organischer Content greifen ineinander, jede Story zahlt auf Ihr Portal ein, statt im Feed zu verpuffen.",
    type: "website",
    locale: "de_DE",
  },
};

const PAINS = [
  {
    quote: "Ich poste fast jeden Tag, aber am Telefon meldet sich trotzdem niemand.",
    answer:
      "Reichweite ist keine Anfrage. Ohne ein System, das jede Reaktion auffängt und weiterverfolgt, verpufft ein Beitrag in dem Moment, in dem der nächste im Feed erscheint.",
  },
  {
    quote: "Das Reel läuft gut, Kommentare, Shares — und trotzdem weiß niemand, wer davon einen Verkauf plant.",
    answer:
      "Ohne eine Stelle, an der sich Interesse registriert, bleibt jede Reaktion anonym. Die Aufmerksamkeit ist da, der Name des Interessenten nicht.",
  },
  {
    quote: "Personal Branding heißt bei mir: noch ein Abend am Schnittprogramm, ohne zu wissen, ob es überhaupt etwas bringt.",
    answer:
      "Ohne Kennzahlen bleibt Personal Branding Bauchgefühl. Sie merken, dass Content Zeit kostet, aber nicht, welcher Beitrag tatsächlich zu einem Mandat führt.",
  },
  {
    quote: "Der Kollege mit den schlechteren Objekten postet einfach öfter — und wirkt in der Story größer als ich.",
    answer:
      "Sichtbarkeit misst sich an der Konkurrenz, nicht am eigenen Bestand. Wer öfter und geplanter erscheint, wirkt größer, unabhängig davon, wessen Objekte besser sind.",
  },
];

const SCHRITTE = [
  {
    titel: "Ein Content-System statt Einzelposts",
    text: "Themen, Formate und Takt stehen für Wochen im Voraus fest. Kein Beitrag entsteht mehr aus der Frage, was heute Abend noch schnell gedreht wird.",
  },
  {
    titel: "Jeder Beitrag zahlt auf das Portal ein",
    text: "Jede Story hat ein Ziel: Eigentümer und Käufer landen nicht im Kommentarfeld, sondern in Ihrem Portal, wo sich Interesse registriert statt zu verpuffen.",
  },
  {
    titel: "Anzeigen und organischer Content greifen ineinander",
    text: "Was organisch funktioniert, wird zur Anzeige. Was als Anzeige zieht, liefert den nächsten organischen Beitrag. Beide Kanäle bauen aufeinander auf.",
  },
  {
    titel: "Die Marke wirkt in jeder Story wie der Marktführer",
    text: "Schnitt, Bildsprache und Wiedererkennung folgen demselben System wie Ihre Website. Wer durch die Story scrollt, sieht ein Haus, das größer wirkt als der nächste Post.",
  },
] as const;

const FAQS = [
  {
    q: "Muss ich selbst vor die Kamera?",
    a: "Nein, aber es hilft. Gesichter erzeugen mehr Vertrauen als reine Objektbilder. Wer nicht selbst drehen will, bekommt Formate, die ohne eigenes Gesicht funktionieren — Objektwelt, Zahlen, Prozess. Wer will, bekommt ein Skript, das sich in einer Minute drehen lässt.",
  },
  {
    q: "Wie oft posten?",
    a: "Regelmäßiger als bisher, aber nach Plan statt aus Zufall. Ein fester Takt über Wochen schlägt tägliches Posten ohne System — Ihr Konto braucht Wiedererkennung, nicht Frequenz um jeden Preis.",
  },
  {
    q: "Instagram oder TikTok?",
    a: "Meistens beide, mit unterschiedlichem Gewicht. Instagram trägt heute den Großteil der Anfragen im Maklergeschäft, TikTok baut Reichweite bei jüngeren Zielgruppen auf. Welcher Kanal zuerst kommt, hängt von Ihrer Zielgruppe ab.",
  },
  {
    q: "Was bringt das für Verkäufer-Leads?",
    a: "Sichtbarkeit, die einen Eigentümer erreicht, bevor er drei Makler vergleicht. Jede Story, die aufs Portal einzahlt, macht aus einem stillen Zuschauer einen registrierten Kontakt — mit Adresse, nicht nur mit einem Like.",
  },
  {
    q: "Übernehmt ihr das komplett?",
    a: "Ja, wenn Sie das wollen. Dreh, Schnitt, Veröffentlichung und die Anbindung ans Portal laufen über uns. Wer selbst vor die Kamera will, bekommt das Skript, wir übernehmen den Rest.",
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

export default async function SocialMediaImmobilienmaklerPage() {
  const c = await getContent();
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

      {/* ── Hero — ~70vh, Foto 9, Floating Card mit Studio-Zahl ─────────── */}
      <section className="relative bg-bg-base">
        <div className="relative min-h-[70dvh]">
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[52vw] lg:rounded-bl-[48px]">
            <Image
              src={maklerAsset(9)}
              alt="Drei Personen auf einer Dachterrasse mit Blick über die Stadt bei Sonnenuntergang"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "44% 32%" }}
            />
            <span className="pointer-events-none absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-bg-base to-transparent lg:block" />
            <AiPille className="!bottom-auto !top-4 right-4" />

            <div className="absolute bottom-8 left-6 max-w-[13.5rem] rounded-2xl bg-white/95 p-5 backdrop-blur-sm lg:bottom-12 lg:left-10">
              <p className="t-label !text-[10px]">Erfahrung, kein Experiment</p>
              <p className="mt-1 font-display text-[40px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum">
                {c["mk.stats.s1_wert"]}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink-muted">
                {c["mk.stats.s1_label"]}
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-full max-w-[1200px] flex-col justify-center px-6 pb-14 pt-28 lg:min-h-[70dvh] lg:max-w-none lg:pl-[max(24px,calc((100vw-1280px)/2))] lg:pr-[55vw] lg:pt-24">
            <p className="t-label !text-ink-yellow">Social Media für Immobilienmakler</p>
            <h1 className="mt-5 font-display text-[clamp(34px,4.4vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink-cream [text-wrap:balance]">
              {rich("Social Media für Makler, das *Anfragen* bringt, keine Likes.")}
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              Content ist erst Marketing, wenn er landet. Wir bauen{" "}
              <Highlight>ein System, das jede Story mit Ihrem Portal verbindet</Highlight>, statt
              einzelne Posts ins Leere zu schicken.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ZusammenarbeitCta />
              <span className="t-small w-full sm:w-auto">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem — Posten ohne Anfrage, Reichweite ohne Registrierung ── */}
      <section id="problem" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Reichweite ist kein Ergebnis"
              titel="Posten ist keine Strategie. *Anschluss* an ein System ist eine."
              sub="Social Media kann für Immobilienmakler eine verlässliche Quelle für Anfragen sein — aber nur, wenn jeder Beitrag an ein System angeschlossen ist, das registriert, wer reagiert, und daraus einen Kontakt macht. Ohne diese Anbindung bleibt Content Unterhaltung."
              className="max-w-[760px]"
            />
          </Reveal>
          <div className="mt-12 max-w-[760px]">
            <PainRows items={PAINS} />
          </div>
        </div>
      </section>

      {/* ── Mechanismus — 4-Stufen-Rail, Unternehmensberatung statt Agentur ── */}
      <section id="system" className="bg-bg-base">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Der Mechanismus"
              titel="Vier Stufen. Ein Content-System, das aufs *Portal* einzahlt."
              sub="beuwy arbeitet als Unternehmensberatung für Ihren Content, nicht als Agentur, die einzelne Reels abliefert. Jede Story ist Teil Ihres Vertriebssystems, mit einem festen Ansprechpartner."
              className="max-w-[720px]"
            />
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-line-subtle pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-subtle">
            {SCHRITTE.map((schritt, i) => (
              <Reveal key={schritt.titel} delay={i * 60}>
                <div className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <p className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-yellow tnum">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="t-h3 mt-4">{schritt.titel}</p>
                  <p className="t-body mt-3">{schritt.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual-Besonderheit — echtes 9:16-Story-Format + Foto 7 ─────── */}
      <section id="story" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
            <Reveal>
              <SektionsKopf
                eyebrow="Vom Post zum Portal"
                titel="So sieht Ihre *Story* aus, wenn sie zum System gehört."
                sub="Story-Omnipräsenz heißt: dieselbe Bildsprache, derselbe Wiedererkennungswert auf jedem Format — nicht nur im Feed, auch dort, wo die meisten Eigentümer heute zuerst hinschauen."
              />
            </Reveal>
            <Reveal delay={80}>
              <div className="flex items-end justify-center gap-5">
                <div className="relative aspect-[9/16] w-full max-w-[240px] overflow-hidden rounded-[18px] border border-line-subtle shadow-[0_10px_30px_rgba(20,20,18,0.10)]">
                  <Image
                    src={makler9x16("02")}
                    alt="Drei Personen im Story-Hochformat, lachend an einem Tisch mit Skyline im Fenster"
                    fill
                    sizes="(min-width: 1024px) 240px, 55vw"
                    className="object-cover"
                  />
                  <AiPille />
                </div>
                <div className="relative hidden aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-[18px] border border-line-subtle shadow-[0_10px_30px_rgba(20,20,18,0.10)] sm:block">
                  <Image
                    src={maklerAsset(7)}
                    alt="Fünf Personen besprechen Objektunterlagen an einer Kücheninsel"
                    fill
                    sizes="200px"
                    className="object-cover"
                    style={{ objectPosition: "50% 30%" }}
                  />
                  <AiPille />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Der Unterschied — GelbeKarte als eigene Pointe ──────────────── */}
      <section className="bg-bg-base">
        <div className="mx-auto max-w-[680px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <GelbeKarte label="Der Unterschied" titel="Reichweite ist kein Vertrieb." glyph>
              Ein Feed voller Reaktionen bringt nichts, wenn niemand registriert, wer dahinter
              steckt. Wir bauen Ihnen kein Content-Kalender-Abo, sondern ein System, das jede
              Story mit Ihrem Portal verbindet — von der ersten Ansicht bis zur Anfrage.
            </GelbeKarte>
          </Reveal>
        </div>
      </section>

      {/* ── Beweis — acta als Kronzeuge, riegel als verlinkbarer Case ───── */}
      <section id="beweis" className="bg-bg-elevated">
        <div className="mx-auto max-w-[1120px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <p className="t-label">Beweis, keine Theorie</p>
            <p className="t-h3 mt-3 max-w-[52ch]">
              acta: rund 380 Wohneinheiten in drei Jahren verkauft, über Instagram-Anzeigen, rund
              40 Mio. € Volumen.
            </p>
            <p className="t-body mt-4 max-w-[58ch]">
              Diesen Vertrieb hat beuwy selbst mit aufgebaut, in der Spitze mit 15 Leuten. Das ist
              Erfahrung aus eigenem Geld, keine Theorie.
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

      {/* ── FAQ — 5 Fragen, FaqAccordion + JSON-LD oben im Head ─────────── */}
      <section id="faq" className="bg-bg-base">
        <div className="mx-auto max-w-[760px] px-6 py-20 md:py-28 lg:px-10">
          <Reveal>
            <SektionsKopf
              eyebrow="Häufige Fragen"
              titel="Was Sie vor dem *ersten* Post wissen wollen."
              ausrichtung="mitte"
            />
          </Reveal>
          <div className="mt-12">
            <FaqAccordion items={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* ── Finale — CTA, Links zu Hub + Cases im Text ──────────────────── */}
      <section className="bg-bg-elevated">
        <div className="mx-auto max-w-[720px] px-6 py-24 text-center md:py-32 lg:px-10">
          <Reveal>
            <p className="t-label">Der nächste Schritt</p>
            <h2 className="t-h2 mt-4">{rich("Bauen wir Ihr *Content*-System.")}</h2>
            <p className="t-body-lg mx-auto mt-5 max-w-[52ch]">
              Social Media ist ein Baustein unter mehreren. Einen Überblick über alle Bausteine
              finden Sie im{" "}
              <Link href="/immobilienmarketing" className="ref-link">
                Immobilienmarketing-Hub
              </Link>
              , Referenzen in den{" "}
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
