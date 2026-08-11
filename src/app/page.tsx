import Link from "next/link";
import { Section, SectionHead } from "@/components/Section";
import { AuditTool } from "@/components/AuditTool";
import { Reveal } from "@/components/Reveal";
import { ShaderBG } from "@/components/ShaderBG";
import { rich, lines } from "@/components/RichText";
import { PuffNumber } from "@/components/PuffNumber";
import { Beam } from "@/components/Beam";
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

  const tiers = [
    {
      id: "fundament",
      name: c["pricing.tier1_name"],
      price: c["pricing.tier1_price"],
      result: c["pricing.tier1_result"],
      badge: null as string | null,
    },
    {
      id: "vertriebssystem",
      name: c["pricing.tier2_name"],
      price: c["pricing.tier2_price"],
      result: c["pricing.tier2_result"],
      badge: c["pricing.tier2_badge"] || null,
    },
    {
      id: "betriebssystem",
      name: c["pricing.tier3_name"],
      price: c["pricing.tier3_price"],
      result: c["pricing.tier3_result"],
      badge: null as string | null,
    },
  ];

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

      {/* 01 — HERO: Shader-Bühne, Riesenwort, ein Satz, Media-Frame (Codex-Muster).
          Kein CTA — erst Nutzen zeigen, dann fragen. */}
      <section className="hero-stage">
        <ShaderBG />
        <div className="hero-stage-inner mx-auto max-w-[1120px] px-6 lg:px-10 pt-40 md:pt-52 pb-20 md:pb-28 text-center">
          <Reveal delay={40}>
            <h1 className="hero-brand">{c["hero.brand"]}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="hero-tagline mt-8 mx-auto max-w-[560px]">
              {c["hero.tagline"]}
            </p>
          </Reveal>
          <Reveal delay={240}>
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

      {/* 03 — FEATURES: eine Headline, vier Blöcke (Titel + Text + Visual) */}
      <Section id="system" tone="base">
        <SectionHead title={rich(c["features.title"])} intro={c["features.intro"]} />
        <div className="space-y-20 md:space-y-28">
          {features.map((f, i) => (
            <Reveal key={f.title}>
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <h3 className="t-h3 text-[24px]">{f.title}</h3>
                  <p className="t-body-lg mt-4">{f.text}</p>
                </div>
                <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="visual-slot" data-variant={f.variant} aria-hidden />
                </div>
              </div>
            </Reveal>
          ))}

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

      {/* 04 — PREIS-TEASER: drei Karten, Name + Preis + ein Satz + Button */}
      <Section id="pakete" tone="base">
        <SectionHead title={rich(c["pricing.title"])} intro={c["pricing.intro"]} />
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {tiers.map((t, i) => {
            const card = (
              <div className="tier-min h-full">
                <p className="t-data">{t.name}</p>
                <p className="t-stat">{t.price}</p>
                <p className="t-body flex-1">{t.result}</p>
                <div>
                  <Link
                    href="/termin"
                    className={
                      t.badge
                        ? "btn-primary w-full justify-center"
                        : "btn-secondary w-full justify-center"
                    }
                  >
                    {c["pricing.cta"]}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            );
            return (
              <Reveal key={t.id} delay={i * 80}>
                {t.badge ? (
                  <div className="relative h-full">
                    <Beam className="h-full">{card}</Beam>
                    <span className="tier-badge z-10">{t.badge}</span>
                  </div>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 space-y-2 max-w-[760px]">
          <p className="t-small is-cream">{c["pricing.prozess"]}</p>
          <p className="t-small is-cream">{c["pricing.einordnung"]}</p>
          <p className="t-small">{c["pricing.garantie1"]}</p>
          <p className="t-small">{c["pricing.garantie2"]}</p>
        </div>
      </Section>

      {/* 05 — BEWEIS: drei Ergebnis-Karten direkt vor dem Schluss-CTA */}
      <Section id="proof" tone="base">
        <SectionHead title={rich(c["proof.title"])} intro={c["proof.intro"]} />
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          <ResultCard
            branch={c["proof.riegel_branch"]}
            facts={lines(c["proof.riegel_facts"])}
            mechanic={c["proof.riegel_mechanic"]}
            link={{ label: c["proof.riegel_link"], href: "https://www.riegel-immobilien.de" }}
          />
          <ResultCard
            branch={c["proof.vision_branch"]}
            facts={lines(c["proof.vision_facts"])}
            mechanic={c["proof.vision_mechanic"]}
          />
          <ResultCard
            branch={c["proof.koenigswege_branch"]}
            facts={lines(c["proof.koenigswege_facts"])}
            mechanic={c["proof.koenigswege_mechanic"]}
          />
        </div>
        <Reveal>
          <div className="mt-12 pt-8 border-t hairline flex flex-wrap items-end gap-x-6 gap-y-4">
            <PuffNumber value={c["proof.stat"]} size="clamp(44px, 5vw, 68px)" />
            <p className="t-body-lg is-cream max-w-[420px] pb-1">{c["proof.stat_text"]}</p>
          </div>
          <p className="t-body mt-8 max-w-[640px]">{c["proof.founder_line"]}</p>
          <p className="t-body-lg is-cream mt-3 max-w-[640px]">
            „{c["proof.founder_quote"]}“
          </p>
        </Reveal>
      </Section>

      {/* 06 — SCHLUSS-CTA: der eine Gelb-Moment */}
      <section id="kontakt" className="cta-invert">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24 text-center">
          <Reveal>
            <h2 className="t-display cta-invert-ink mx-auto max-w-[900px]">{rich(c["cta.title"])}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-body-lg cta-invert-ink mt-5 mx-auto max-w-[520px]">
              {c["cta.text"]}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/termin" className="btn-inverse">
                {c["cta.primary"]}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* Hero-Media-Frame (Codex-Muster): großes Produkt-Visual unter dem
   Riesenwort. URL kommt aus /studio (hero.media_url) — .webm/.mp4 läuft
   als stummes Loop-Video, Bilder als <img>. Ohne URL: abstrakter
   Dashboard-Platzhalter, bis das Higgsfield-Asset da ist. */
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
        <div className="hero-media-ph" aria-hidden>
          <div className="hm-side" />
          <div className="hm-main">
            <div className="hm-row">
              <span className="hm-card" />
              <span className="hm-card" />
              <span className="hm-card" />
            </div>
            <div className="hm-chart" />
          </div>
        </div>
      )}
    </figure>
  );
}

/* Ergebnis-Referenz: Panel mit Branche, Fakten und Mechanik — bewusst ohne
   Screenshot-Assets (Visuals folgen über Higgsfield). */
function ResultCard({
  branch,
  facts,
  mechanic,
  link,
}: {
  branch: string;
  facts: string[];
  mechanic: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="panel rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-baseline justify-between gap-4">
        <p className="t-data">{branch}</p>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="t-data is-accent whitespace-nowrap"
          >
            {link.label} ↗
          </a>
        )}
      </div>
      <ul className="mt-4 space-y-2">
        {facts.map((f) => (
          <li key={f} className="t-small is-cream flex gap-2">
            <span className="t-data shrink-0">·</span>
            {f}
          </li>
        ))}
      </ul>
      <p className="t-body mt-4 flex-1">{mechanic}</p>
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
        priceRange: "ab 7.900 €",
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
