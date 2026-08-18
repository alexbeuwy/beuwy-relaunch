import Link from "next/link";
import Image from "next/image";
import { Section, SectionHead } from "@/components/Section";
import { AuditTool } from "@/components/AuditTool";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/RichText";
import ZielRechner from "@/components/ZielRechner";
import { Button } from "@/components/ui/button";
import { WochenberichtShot } from "@/components/WochenberichtShot";
import { SaeulenStudio } from "@/components/SaeulenStudio";
import { PainRows } from "@/components/PainRows";
import { AuthorityBlock } from "@/components/AuthorityBlock";
import { FitBlock } from "@/components/FitBlock";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { CaseGrid } from "@/components/CaseGrid";
import { CASES } from "@/lib/cases";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/* ══════════════════════════════════════════════════════════════════════
   VERKAUFSLEITER — zwölf Stufen, zwölf sichtbare Momente. Jede Stufe hat
   eine eigene Überschrift und einen eigenen Grund; keine Stufe versteckt
   sich als Nebensatz in einer anderen.

   01 Hook          Hero, Ultramarin-Himmel
   02 Pain          Diagnose: drei Sätze aus dem Erstgespräch
   03 Dream State   der Zustand danach + Wochenbericht als Bild davon
   04 Mechanism     warum es bisher nicht lief + Playground als Beweis
   10 CTA-Band      erster Zwischenruf (für die schon Überzeugten)
   05 Proof Stack   Zahlen + drei Fälle (Riegel, Vision mit Film, KW)
   06 Authority     die Seite selbst als Arbeitsprobe + Herkunft
   07 Offer         Rechner + Ablauf + Festpreis-Logik (kein Preis)
   08 Scarcity      Kapazität, in der Ich-Stimme
   09 Disqualifier  15.000-€-Schwelle, ehrlich
   10 CTA-Band      zweiter Zwischenruf
   11 Lead Magnet   Live-Check, ohne Gespräch
   ·· FAQ           Rest-Einwände
   12 Big CTA       Finale, niedrigste Hürde
   ══════════════════════════════════════════════════════════════════════ */

const CLIENT_LOGOS = [
  { src: "https://beuwy-2.b-cdn.net/studio/1778235632911-Vision_Blue_2021_digital.svg", alt: "Vision Real Estate" },
  { src: "https://beuwy-2.b-cdn.net/studio/1778235743118-Logo_KW_Koenigswege_long_white_Final.svg", alt: "Königswege" },
  { src: "https://beuwy-2.b-cdn.net/studio/1778233449613-acta_01_lightBG.svg", alt: "acta" },
  { src: "https://beuwy-2.b-cdn.net/studio/1778240857276-PURELEI_Logo_V3-400.webp", alt: "PURELEI" },
  { src: "https://beuwy-2.b-cdn.net/studio/1778240981246-getsafe-400.webp", alt: "Getsafe" },
  { src: "https://beuwy-2.b-cdn.net/studio/1778240914540-GK_Web_Logos-4-400.webp", alt: "GK" },
];

export default async function HomePage() {
  const c = await getContent();
  const jsonLd = buildJsonLd();

  const stats = [1, 2, 3].map((n) => ({
    value: c[`stats.s${n}_value`],
    label: c[`stats.s${n}_label`],
  }));
  const diagnose = [1, 2, 3].map((n) => ({
    quote: c[`diagnose.q${n}`],
    answer: c[`diagnose.a${n}`],
  }));
  const saeulen = [1, 2, 3].map((n) => ({
    key: `p${n}`,
    title: c[`pillar${n}_title`],
    claim: c[`pillar${n}_claim`],
    text: c[`pillar${n}_text`],
    proof: c[`pillar${n}_proof`],
    without: c[`pillar${n}_without`],
  }));
  const faq = [1, 2, 3, 4].map((n) => ({
    q: c[`faq.q${n}`],
    a: c[`faq.a${n}`],
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 01 HOOK ─────────────────────────────────────────────────── */}
      <section className="hero-riso">
        <div className="hero-riso-copy on-sky">
          <Reveal delay={40}>
            <h1 className="hero-h1 mx-auto max-w-[880px]">
              {rich(c["hero.title"])}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="hero-tagline mt-5 mx-auto max-w-[540px]">
              {c["hero.subtitle"]}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button render={<Link href="/termin" />}>
                {c["hero.cta"]}
                <span aria-hidden>→</span>
              </Button>
              <Button variant="secondary" render={<a href="#check" />}>
                {c["hero.cta_secondary"]}
              </Button>
            </div>
          </Reveal>
        </div>
        <Image
          src="/hero-riso.webp"
          width={2000}
          height={1116}
          priority
          alt="Risographie-Landschaft: orangener Berg mit Schneekuppe hinter einem grünen Hügel unter ultramarinblauem Himmel"
          className="hero-riso-img"
        />
      </section>

      {/* Herkunft — schmales Hügelband, Vertrauen vor dem Problem */}
      <section className="band-hill">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-12 md:py-14">
          <Reveal>
            <p className="t-label text-center">{c["trust.label"]}</p>
            <div className="logo-rail mt-8 justify-center" aria-label="Frühere Kunden">
              {CLIENT_LOGOS.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l.alt} src={l.src} alt={l.alt} className="logo-rail-item" loading="lazy" />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 PAIN AGITATE ─────────────────────────────────────────── */}
      <Section id="problem">
        <SectionHead title={rich(c["diagnose.title"])} />
        <PainRows items={diagnose.map((d) => ({ quote: d.quote, answer: d.answer }))} />
      </Section>

      {/* ── 03 DREAM STATE — der Wochenbericht ist das Bild davon ────── */}
      <Section id="ziel-zustand" tone="raised">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div>
              <h2 className="t-h2">{rich(c["dream.title"])}</h2>
              <p className="t-body-lg mt-5 max-w-[520px]">{c["dream.text"]}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <WochenberichtShot />
              <p className="t-small mt-5 max-w-[520px]">{c["shot.caption"]}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── 04 MECHANISM — Entlastung, dann das System zum Anfassen ──── */}
      <section id="system" className="section-band-bright on-sky">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24">
          <Reveal>
            <div className="max-w-[760px]">
              <h2 className="t-h2">{rich(c["mech.title"])}</h2>
              <p className="t-body-lg mt-5 max-w-[640px]">{c["mech.text"]}</p>
            </div>
          </Reveal>
          <div className="mt-14 md:mt-16">
            <Reveal>
              <h3 className="t-h3 mb-8">{rich(c["play.title"])}</h3>
            </Reveal>
            <SaeulenStudio saeulen={saeulen} hint={c["play.hint"]} />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <p className="t-h3">{c["play.tagline"]}</p>
            <Button render={<Link href="/termin" />}>
              {c["hero.cta"]}
              <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 05 PROOF STACK — Zahlen, dann fünf Fallstudien mit eigener
          Unterseite. Die Überschrift jeder Karte erzählt die Reise. ── */}
      <Section id="referenzen">
        <Reveal>
          <div className="stat-band mb-16 md:mb-20">
            {stats.map((s) => (
              <div key={s.label} className="stat-cell">
                <p className="stat-num">{s.value}</p>
                <p className="stat-cap">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <SectionHead title={rich(c["refs.title"])} intro={c["refs.intro"]} />
        <CaseGrid cases={CASES} />
      </Section>

      {/* ── 06 AUTHORITY — die Seite selbst ist die Referenz ─────────── */}
      <Section id="autoritaet" tone="raised">
        <div className="max-w-[820px]">
          <Reveal>
            <h2 className="t-h2 mb-8">{rich(c["authority.title"])}</h2>
          </Reveal>
          <AuthorityBlock
            text={c["authority.text"]}
            brandsLabel={c["authority.brands_label"]}
            brands={(c["authority.brands"] || "").split("|").filter(Boolean)}
          />
        </div>
      </Section>

      {/* ── 10a MULTIPLE CTAs — erster Zwischenruf ───────────────────── */}
      <CtaBand
        tone="sky"
        title={c["band1.title"]}
        note={c["band1.note"]}
        buttonLabel={c["hero.cta"]}
      />

      {/* ── 07 OFFER — Rechner, Ablauf, Festpreis (nie ein Preis) ────── */}
      <Section id="ziel">
        <SectionHead title={rich(c["goal.title"])} intro={c["goal.intro"]} />
        <div className="grid lg:grid-cols-[minmax(0,680px)_1fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <ZielRechner />
          </Reveal>
          <Reveal delay={80}>
            <div className="lg:pt-2">
              <p className="t-label">Der Ablauf</p>
              <ol className="mt-5 space-y-4" aria-label="Ablauf">
                {(c["goal.steps"] || "").split("|").map((s, i) => (
                  <li key={s} className="flex items-baseline gap-4">
                    <span className="tnum t-data text-sky w-5 shrink-0">{i + 1}</span>
                    <span className="prozess-step">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="t-body mt-8">{c["goal.after"]}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── 08 SCARCITY + 09 DISQUALIFIER — eigener Moment, Ich-Stimme ─ */}
      <section id="passung" className="band-hill on-sky">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-20">
          <Reveal>
            <h2 className="t-h2 max-w-[720px]">{rich(c["fit.title"])}</h2>
          </Reveal>
          <div className="mt-10 max-w-[900px]">
            <FitBlock
              cards={[
                { num: c["fit.num1"], text: c["fit.line1"] },
                { num: c["fit.num2"], text: c["fit.line2"] },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 11 LEAD MAGNET — etwas mitnehmen, ohne zu reden ──────────── */}
      <Section id="check">
        <SectionHead title={rich(c["check.title"])} intro={c["check.text"]} />
        <div id="tool" className="check-frame">
          <AuditTool />
        </div>
      </Section>

      {/* ── FAQ — Rest-Einwände ──────────────────────────────────────── */}
      <Section id="faq" tone="raised">
        <SectionHead title={rich(c["faq.title"])} />
        <div className="max-w-[820px]">
          <FaqAccordion items={faq} />
        </div>
      </Section>

      {/* ── 12 BIG CTA ──────────────────────────────────────────────── */}
      <Section id="kontakt" tone="bright" divider={false} className="on-sky">
        <div className="text-center max-w-[620px] mx-auto py-6 md:py-10">
          <h2 className="t-h2">{rich(c["final.title"])}</h2>
          <p className="t-body-lg mt-5">{c["final.text"]}</p>
          <div className="mt-9 flex justify-center">
            <Button size="lg" render={<Link href="/termin" />}>
              {c["final.cta"]}
              <span aria-hidden>→</span>
            </Button>
          </div>
          <p className="t-small mt-4">{c["final.note"]}</p>
        </div>
      </Section>
    </>
  );
}

/* Referenz-Karte ohne Bild — gleiche Form wie die Modul-Karten. */
function RefCard({ name, text }: { name: string; text: string }) {
  return (
    <Reveal>
      <div className="card h-full">
        <h3 className="t-h3">{name}</h3>
        <p className="t-body mt-3">{text}</p>
      </div>
    </Reveal>
  );
}

function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://beuwy.com/#org",
        name: "beuwy",
        description:
          "Unternehmensberatung für Marke und Vertriebssysteme: Marke, Werbeanzeigen, CRM mit Telefonanbindung und wöchentliche Auswertung als ein zusammenhängendes System — mit einem Verantwortlichen.",
        url: "https://beuwy.com",
        email: "ap@beuwy.com",
        founder: { "@type": "Person", name: "Alexander Pütter" },
        foundingDate: "2017",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Max-Bill-Str. 3",
          postalCode: "67061",
          addressLocality: "Ludwigshafen am Rhein",
          addressCountry: "DE",
        },
        areaServed: "DE",
        knowsAbout: [
          "Markendesign",
          "Lead-Generierung",
          "Performance-Anzeigen (Meta, LinkedIn, TikTok)",
          "Custom CRM",
          "Vertriebssysteme",
          "Websites für Immobilienmakler",
          "Websites für Finanzvertriebe",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://beuwy.com/#website",
        url: "https://beuwy.com",
        name: "beuwy",
        inLanguage: "de",
        publisher: { "@id": "https://beuwy.com/#org" },
      },
    ],
  };
}
