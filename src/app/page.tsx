import Link from "next/link";
import { Section, SectionHead } from "@/components/Section";
import { AuditTool } from "@/components/AuditTool";
import { Reveal } from "@/components/Reveal";
import { ShaderBG } from "@/components/ShaderBG";
import { rich, lines } from "@/components/RichText";
import { PuffNumber } from "@/components/PuffNumber";
import { StatFacts } from "@/components/StatFacts";
import Hero3D from "@/components/Hero3D";
import ZielRechner from "@/components/ZielRechner";
import SystemShowcase from "@/components/SystemShowcase";
import { CtaFocus } from "@/components/CtaFocus";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/* Aufbau 1:1 nach der Codex-Referenz: Hero (Riesenwort + ein Satz, ohne
   Bild, ohne CTA) → Trust-Leiste → Feature-Blöcke (Titel + kurzer Text +
   1 Visual) → Preis-Teaser → Beweis-Block → Schluss-CTA. */

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

  const features = [1, 2, 3, 4].map((n) => ({
    title: c[`features.f${n}_title`],
    text: c[`features.f${n}_text`],
    variant: String(n),
  }));

  return (
    <>
      {/* Strukturierte Daten — einzige erlaubte dangerouslySetInnerHTML-Stelle
          (statisches JSON, kein Nutzer-Input). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 — HERO: Shader-Bühne. Die H1 gehört dem Leser, nicht der Marke —
          Traumzustand groß, darunter was geliefert wird und für wen. */}
      <section className="hero-stage">
        <ShaderBG />
        <div className="hero-stage-inner mx-auto max-w-[1120px] px-6 lg:px-10 pt-36 md:pt-44 pb-20 md:pb-28 text-center">
          <Reveal delay={40}>
            <p className="hero-eyebrow mx-auto max-w-[620px]">
              {c["hero.founder_line"]}
            </p>
          </Reveal>
          <Reveal delay={110}>
            <h1 className="hero-h1 mt-6 mx-auto max-w-[1000px]">
              {rich(c["hero.title"])}
            </h1>
          </Reveal>
          <Reveal delay={190}>
            <p className="hero-tagline mt-7 mx-auto max-w-[600px]">
              {c["hero.subtitle"]}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" render={<Link href="/termin" />}>
                {c["hero.cta"]}
                <span aria-hidden>→</span>
              </Button>
              <Button size="lg" variant="secondary" render={<a href="#proof" />}>
                {c["hero.cta_secondary"]}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <HeroMedia url={c["hero.media_url"]} />
          </Reveal>
        </div>
      </section>

      {/* 02 — TRUST-LEISTE: nackte Logos, keine Zahlen, keine Claims */}
      <section className="section-band section-band-base">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-12 md:py-14">
          <Reveal>
            <p className="t-label text-center">{c["trust.label"]}</p>
            <div className="logo-rail mt-7 justify-center" aria-label="Frühere Kunden">
              {CLIENT_LOGOS.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l.alt} src={l.src} alt={l.alt} className="logo-rail-item" loading="lazy" />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — BEWEIS: der Aha-Moment (Maßanzug vs. Jogginghose) und direkt
          danach die Zahlen als Auflösung. Keine Karten — großzügiges
          Fakten-Band mit animierten Kennzahlen und Icon-Slots, darunter die
          Referenzen als ruhige Zeilen. */}
      <Section id="proof" tone="base">
        <SectionHead title={rich(c["proof.title"])} intro={c["proof.intro"]} />
        <Reveal>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
            <PuffNumber value={c["proof.stat"]} size="clamp(52px, 6vw, 84px)" />
            <p className="t-body-lg is-cream max-w-[420px] pb-1">{c["proof.stat_text"]}</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <StatFacts
            facts={[1, 2, 3].map((n) => ({
              value: c[`proof.stat${n}_value`],
              suffix: c[`proof.stat${n}_suffix`],
              label: c[`proof.stat${n}_label`],
              icon: c[`proof.stat${n}_icon`],
            }))}
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="proof-rows">
            <ProofRow
              branch={c["proof.riegel_branch"]}
              facts={lines(c["proof.riegel_facts"])}
              link={{ label: c["proof.riegel_link"], href: "https://www.riegel-immobilien.de" }}
            />
            <ProofRow
              branch={c["proof.vision_branch"]}
              facts={lines(c["proof.vision_facts"])}
            />
            <ProofRow
              branch={c["proof.koenigswege_branch"]}
              facts={lines(c["proof.koenigswege_facts"])}
            />
          </div>
          <p className="t-body mt-10 max-w-[640px]">{c["proof.founder_line"]}</p>
          <p className="t-body-lg is-cream mt-3 max-w-[640px]">
            „{c["proof.founder_quote"]}“
          </p>
        </Reveal>
      </Section>

      {/* 04 — PROBLEM: die Erkenntnis, bevor irgendetwas verkauft wird */}
      <Section id="problem" tone="base">
        <SectionHead title={rich(c["problem.title"])} intro={c["problem.intro"]} />
        <ol className="space-y-4 max-w-[760px]">
          {[1, 2, 3].map((n) => (
            <li
              key={n}
              className="flex flex-col md:flex-row gap-1 md:gap-4 pb-4 border-b hairline"
            >
              <span className="t-label shrink-0 md:w-28 pt-1">
                {c[`problem.row${n}_label`]}
              </span>
              <p className="t-body is-cream">{c[`problem.row${n}_text`]}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 05 — SYSTEM: eine Headline, das interaktive Dashboard (Workflow-Build)
          und darunter die vier Textblöcke kompakt — die leeren Visual-Slots
          sind Geschichte. */}
      <Section id="system" tone="base">
        <SectionHead title={rich(c["features.title"])} intro={c["features.intro"]} />
        <Reveal>
          <SystemShowcase />
        </Reveal>
        <div className="mt-14 md:mt-16 grid sm:grid-cols-2 gap-x-12 gap-y-10 max-w-[960px]">
          {features.map((f) => (
            <Reveal key={f.title}>
              <div>
                <h3 className="t-h3 text-[20px]">{f.title}</h3>
                <p className="t-body mt-3">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 md:mt-24 space-y-20">
          {/* Block 5 — der Live-Check: das interaktive Visual ist echt */}
          <Reveal>
            <div id="check">
              <div className="max-w-[560px]">
                <h3 className="t-h3 text-[24px]">{c["check.title"]}</h3>
                <p className="t-body-lg mt-4">{c["check.text"]}</p>
              </div>
              <div className="mt-8">
                <AuditTool />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 06 — ZIEL: keine offenen Preise (Hormozi-Logik) — hier rechnet der
          Besucher mit seinen eigenen Zielen; der interaktive ZielRechner
          aus dem Workflow-Build wird hier eingesetzt. */}
      <Section id="pakete" tone="base">
        <SectionHead title={rich(c["goal.title"])} intro={c["goal.intro"]} />
        <Reveal>
          <div className="flex justify-center">
            <ZielRechner />
          </div>
        </Reveal>
        <div className="mt-10 space-y-2 max-w-[760px] mx-auto text-center">
          <p className="t-body is-cream">{c["goal.prozess"]}</p>
          <p className="t-small">{c["goal.garantie1"]}</p>
          <p className="t-small">{c["goal.garantie2"]}</p>
        </div>
      </Section>


      {/* 07 — SCHLUSS-CTA: kein Gelb-Vollflächen-Block mehr — beim Scrollen
          ans Ende legt sich ein weicher, leicht geblurrter Schleier über
          alles andere und der Fokus liegt auf EINER Karte (CtaFocus). */}
      <CtaFocus
        id="kontakt"
        title={c["cta.title"]}
        text={c["cta.text"]}
        buttonLabel={c["cta.primary"]}
        href="/termin"
        note="Antwort innerhalb von 24 Stunden."
      />
    </>
  );
}

/* Hero-Media-Frame (Codex-Muster): großes Produkt-Visual unter dem
   Riesenwort. URL kommt aus /studio (hero.media_url) — .webm/.mp4 läuft
   als stummes Loop-Video, Bilder als <img>. Ohne URL: die Three.js-Szene
   (Leads → Engstelle → Abschlüsse), bis das Higgsfield-Asset da ist. */
function HeroMedia({ url }: { url: string }) {
  const u = (url || "").trim();
  const isVideo = /\.(webm|mp4)(\?|$)/i.test(u);
  return (
    <figure className="hero-media mx-auto mt-14 md:mt-16">
      <div className="case-chrome">
        <span className="case-dot" aria-hidden />
        <span className="case-dot" aria-hidden />
        <span className="case-dot" aria-hidden />
      </div>
      {u ? (
        isVideo ? (
          <video src={u} autoPlay muted loop playsInline className="hero-media-asset" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u} alt="" className="hero-media-asset" />
        )
      ) : (
        <div className="hero-media-3d" aria-hidden>
          <Hero3D />
        </div>
      )}
    </figure>
  );
}

/* Referenz-Zeile: Marke links, Fakten als ruhige Zeile, Link rechts —
   ersetzt die früheren Panel-Karten (zu kleinteilig). */
function ProofRow({
  branch,
  facts,
  link,
}: {
  branch: string;
  facts: string[];
  link?: { label: string; href: string };
}) {
  return (
    <div className="proof-row">
      <p className="proof-row-brand">{branch}</p>
      <p className="proof-row-facts">
        {facts.map((f, i) => (
          <span key={f}>
            {i === 0 ? <b>{f}</b> : f}
            {i < facts.length - 1 && <span aria-hidden>&ensp;·&ensp;</span>}
          </span>
        ))}
      </p>
      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="proof-row-link"
        >
          {link.label} ↗
        </a>
      ) : (
        <span />
      )}
    </div>
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
          "Premium-Markendesign und Lead-Generierung für Anbieter mit hohen Auftragswerten: Marke, Anzeigen auf Instagram, Facebook, LinkedIn und TikTok, eigenes CRM und Telefon-Setup — als Festpreisprojekte.",
        url: "https://beuwy.com",
        email: "ap@beuwy.com",
        founder: { "@type": "Person", name: "Alexander Pütter" },
        foundingDate: "2017",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mendelssohnstraße 52",
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
