import Link from "next/link";
import Image from "next/image";
import { Section, SectionHead } from "@/components/Section";
import { AuditTool } from "@/components/AuditTool";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/RichText";
import ZielRechner from "@/components/ZielRechner";
import { Button } from "@/components/ui/button";
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
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-12 md:py-14">
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

      {/* 03 — TRACK RECORD: drei Zahlen aus drei verschiedenen Projekten.
          Statisch, keine Karten, keine Animation (Wireframe-Verbot 1). */}
      <Section divider={false}>
        <Reveal>
          <div className="stat-band">
            {stats.map((s) => (
              <div key={s.label} className="stat-cell">
                <p className="stat-num">{s.value}</p>
                <p className="stat-cap">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

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
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 max-w-[960px]">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={(i % 2) * 60}>
              <div>
                <h3 className="t-h3">{m.title}</h3>
                <p className="t-body mt-3">{m.text}</p>
              </div>
            </Reveal>
          ))}
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

      {/* 07 — REFERENZEN: drei Fälle mit Mechanik und Ergebnis. */}
      <Section id="referenzen">
        <SectionHead title={rich(c["refs.title"])} />
        <div className="max-w-[760px]">
          <RefBlock
            name={c["refs.riegel_name"]}
            text={c["refs.riegel_text"]}
            link={{
              label: c["refs.riegel_link"],
              href: "https://www.riegel-immobilien.de",
            }}
          />
          <RefBlock
            name={c["refs.koenigswege_name"]}
            text={c["refs.koenigswege_text"]}
          />
          <RefBlock
            name={c["refs.vision_name"]}
            text={c["refs.vision_text"]}
          />
        </div>
      </Section>

      {/* 08 — IHR ZIEL: der Rechner eröffnet das Gespräch mit einer Zahl
          des Kunden, nicht mit einer Zahl von beuwy. */}
      <Section id="ziel">
        <SectionHead title={rich(c["goal.title"])} intro={c["goal.intro"]} />
        <Reveal>
          <ZielRechner />
        </Reveal>
        <p className="t-body mt-10 max-w-[640px]">{c["goal.after"]}</p>
      </Section>

      {/* 09 — HÄUFIGE FRAGEN: nebeneinander statt Akkordeon — die zwei
          Sachen, die der Kunde vor dem Schreiben noch wissen will. */}
      <Section id="faq">
        <SectionHead title={rich(c["faq.title"])} />
        <div className="faq-grid">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 60}>
              <div className="faq-cell">
                <h3 className="t-h3">{f.q}</h3>
                <p className="t-body mt-3">{f.a}</p>
              </div>
            </Reveal>
          ))}
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

/* Referenz-Block: Name + Fall als ruhiger Absatz + benannter Vertiefungslink
   (kein „Mehr erfahren"). */
function RefBlock({
  name,
  text,
  link,
}: {
  name: string;
  text: string;
  link?: { label: string; href: string };
}) {
  return (
    <Reveal>
      <div className="ref-block">
        <div className="ref-head">
          <h3 className="t-h3">{name}</h3>
          {link ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ref-link"
            >
              {link.label} ↗
            </a>
          ) : null}
        </div>
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
