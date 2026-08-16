import Link from "next/link";
import Image from "next/image";
import { Section, SectionHead } from "@/components/Section";
import { AuditTool } from "@/components/AuditTool";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/RichText";
import ZielRechner from "@/components/ZielRechner";
import { Button } from "@/components/ui/button";
import { WochenberichtShot } from "@/components/WochenberichtShot";
import {
  MarkeSurface,
  AnzeigenSurface,
  VertriebSurface,
  ZahlenSurface,
} from "@/components/ModuleSurfaces";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/* Aufbau nach dem Wireframe (12.08.2026, Fintech-50-Research):
   01 Hero (These im Himmel des Riso-Bildes) → 02 Herkunft (Logos auf dem
   Hügelband) → 03 Track Record (3 statische Zahlen aus 3 Projekten) →
   04 Diagnose → 05 System (4 Module) → 06 Live-Check → 07 Referenzen →
   08 Ihr Ziel → 09 Häufige Fragen → 10 Abschluss (Ultramarin-Finale).
   Das Hero-Bild gibt der Seite die Palette: Himmel #0C4BC3, Papier,
   Tinte, Orange nur als betontes Wort. */

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

  const modules = [1, 2, 3, 4].map((n) => ({
    title: c[`system.m${n}_title`],
    text: c[`system.m${n}_text`],
  }));

  const faq = [1, 2, 3, 4].map((n) => ({
    q: c[`faq.q${n}`],
    a: c[`faq.a${n}`],
  }));

  return (
    <>
      {/* Strukturierte Daten — einzige erlaubte dangerouslySetInnerHTML-Stelle
          (statisches JSON, kein Nutzer-Input). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 — HERO: Die These steht klein und mittig im Himmel des Bildes.
          Sektionsgrund = Bild-Oberkante (#0C4BC3), dadurch keine Naht. */}
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

      {/* 02 — HERKUNFT: Logos auf dem Hügelband. Der Sektionsgrund setzt die
          Bild-Unterkante (#06150A) fort — die Seite steht auf dem Hügel. */}
      <section className="band-hill">
        {/* pb macht Platz für den Wochenbericht, der aus dem Hügel steigt */}
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-12 md:pt-14 pb-32 md:pb-40">
          <Reveal>
            <p className="t-label text-center">{c["trust.label"]}</p>
            <div
              className="logo-rail mt-8 justify-center"
              aria-label="Frühere Kunden"
            >
              {CLIENT_LOGOS.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  className="logo-rail-item"
                  loading="lazy"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — SYSTEM IM BETRIEB: der Produkt-Shot. Der Wochenbericht steigt
          aus dem Hügel — die Seite behauptet kein System, sie zeigt eins.
          Darunter der Track Record: drei Zahlen aus drei Projekten, statisch. */}
      <section className="section-band-base">
        {/* flow-root verhindert Margin-Collapse — sonst zieht das negative
            margin die ganze Sektion hoch statt das Panel in den Hügel */}
        <div className="flow-root mx-auto max-w-[1120px] px-6 lg:px-10 pb-16 md:pb-24">
          <div className="relative z-10 -mt-20 md:-mt-28 flex justify-center">
            <Reveal>
              <WochenberichtShot />
            </Reveal>
          </div>
          <p className="t-small text-center mt-6 mx-auto max-w-[560px]">
            {c["shot.caption"]}
          </p>
          <Reveal>
            <div className="stat-band mt-16 md:mt-24">
              {stats.map((s) => (
                <div key={s.label} className="stat-cell">
                  <p className="stat-num">{s.value}</p>
                  <p className="stat-cap">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 — DIAGNOSE: wörtliche Zitate aus Erstgesprächen. Der Leser
          erkennt sich selbst sagen hören. */}
      <Section id="diagnose">
        <SectionHead title={rich(c["diagnose.title"])} />
        <div>
          {diagnose.map((d, i) => (
            <Reveal key={d.quote} delay={i * 60}>
              <div className="diag-row">
                <p className="diag-quote">{d.quote}</p>
                <p className="diag-answer">{d.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 05 — SYSTEM: vier Module, ein Verantwortlicher. */}
      <Section id="system">
        <SectionHead
          title={rich(c["system.title"])}
          intro={c["system.intro"]}
        />
        <div className="grid sm:grid-cols-2 gap-5 max-w-[1000px]">
          {modules.map((m, i) => {
            const Surface = [
              MarkeSurface,
              AnzeigenSurface,
              VertriebSurface,
              ZahlenSurface,
            ][i];
            return (
              <Reveal key={m.title} delay={(i % 2) * 60}>
                <div className="card h-full">
                  <Surface />
                  <h3 className="t-h3 mt-5">{m.title}</h3>
                  <p className="t-body mt-2">{m.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 06 — LIVE-CHECK: der gleichwertige zweite Weg neben dem Gespräch —
          eine laufende Maschine statt einer Behauptung. */}
      <Section id="check">
        <SectionHead title={rich(c["check.title"])} intro={c["check.text"]} />
        <div id="tool">
          <AuditTool />
        </div>
      </Section>

      {/* 07 — REFERENZEN: der Flaggschiff-Fall mit echtem Screenshot im
          Browser-Rahmen (Column-Muster: ein Fall braucht ein Bild, eine
          Mechanik und ein Ergebnis), die weiteren Fälle als ruhige Zeilen. */}
      <Section id="referenzen">
        <SectionHead title={rich(c["refs.title"])} />
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <div className="case-frame">
              <div className="case-frame-bar" aria-hidden>
                <span className="case-frame-dot" />
                <span className="case-frame-dot" />
                <span className="case-frame-dot" />
                <span className="case-frame-url">riegel-immobilien.de</span>
              </div>
              <Image
                src="/refs/riegel.webp"
                width={1280}
                height={800}
                alt="Startseite von RIEGEL Immobilien nach dem Relaunch: dunkle Bühne, Claim „Regional zuhause. National vernetzt.“"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <h3 className="t-h3">{c["refs.riegel_name"]}</h3>
              <p className="t-body mt-3">{c["refs.riegel_text"]}</p>
              <a
                href="https://www.riegel-immobilien.de"
                target="_blank"
                rel="noopener noreferrer"
                className="ref-link inline-block mt-4"
              >
                {c["refs.riegel_link"]} ↗
              </a>
            </div>
          </Reveal>
        </div>
        {/* Die zwei weiteren Fälle als gleichgewichtige Karten — bewusste
            Hierarchie (Flaggschiff groß, Belege kompakt), keine Fußnoten. */}
        <div className="grid sm:grid-cols-2 gap-5 mt-8">
          <RefCard
            name={c["refs.koenigswege_name"]}
            text={c["refs.koenigswege_text"]}
          />
          <RefCard
            name={c["refs.vision_name"]}
            text={c["refs.vision_text"]}
          />
        </div>
      </Section>

      {/* 08 — IHR ZIEL: der Rechner eröffnet das Gespräch mit einer Zahl
          des Kunden, nicht mit einer Zahl von beuwy. */}
      <Section id="ziel">
        <SectionHead title={rich(c["goal.title"])} intro={c["goal.intro"]} />
        {/* Rechner links, rechts der Ablauf + die Preislogik — die Spalte
            füllt den Raum mit dem, was der Käufer als Nächstes wissen will. */}
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
                    <span className="tnum t-data text-sky w-5 shrink-0">
                      {i + 1}
                    </span>
                    <span className="prozess-step">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="t-body mt-8">{c["goal.after"]}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 09 — HÄUFIGE FRAGEN: nebeneinander statt Akkordeon — die zwei
          Sachen, die der Kunde vor dem Schreiben noch wissen will. */}
      <Section id="faq">
        <SectionHead title={rich(c["faq.title"])} />
        {/* Zwei unabhängige Spalten statt gekoppeltem Grid — sonst reißt
            die lange KI-Antwort Lücken in die Nachbarspalte. */}
        <div className="grid md:grid-cols-2 gap-x-14">
          {[faq.filter((_, i) => i % 2 === 0), faq.filter((_, i) => i % 2 === 1)].map(
            (col, ci) => (
              <div key={ci}>
                {col.map((f, i) => (
                  <Reveal key={f.q} delay={i * 60}>
                    <div className="faq-cell">
                      <h3 className="t-h3">{f.q}</h3>
                      <p className="t-body mt-3">{f.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )
          )}
        </div>
      </Section>

      {/* 10 — ABSCHLUSS: der Ultramarin-Buchdeckel spiegelt den Himmel.
          Ein Weg, H2 statt Riesenwort, die Hürde wird gesenkt. */}
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

/* Referenz-Karte: gleichgewichtige Fallkarte ohne Bild — Name als Kopf,
   Fall als Absatz. Bewusst dieselbe Kartenform wie die System-Module. */
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
          "Unternehmensberatung für Marke und Vertriebssysteme: Marke, Anzeigen, CRM mit Telefonanbindung und wöchentliche Auswertung als ein zusammenhängendes System — mit einem Verantwortlichen.",
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
