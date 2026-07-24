import Link from "next/link";
import Image from "next/image";
import { Section, SectionHead } from "@/components/Section";
import { AuditTool } from "@/components/AuditTool";
import { Reveal } from "@/components/Reveal";
import { HeroHeadline } from "@/components/HeroHeadline";
import { rich, lines } from "@/components/RichText";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const c = await getContent();

  const jsonLd = buildJsonLd(c);
  const tiers = [
    {
      id: "fundament",
      name: c["pricing.tier1_name"],
      result: c["pricing.tier1_result"],
      price: c["pricing.tier1_price"],
      features: lines(c["pricing.tier1_features"]),
      badge: null as string | null,
    },
    {
      id: "vertriebssystem",
      name: c["pricing.tier2_name"],
      result: c["pricing.tier2_result"],
      price: c["pricing.tier2_price"],
      features: lines(c["pricing.tier2_features"]),
      badge: c["pricing.tier2_badge"] || null,
    },
    {
      id: "betriebssystem",
      name: c["pricing.tier3_name"],
      result: c["pricing.tier3_result"],
      price: c["pricing.tier3_price"],
      features: lines(c["pricing.tier3_features"]),
      badge: null as string | null,
    },
  ];

  return (
    <>
      {/* Strukturierte Daten — einzige erlaubte dangerouslySetInnerHTML-Stelle
          (JSON.stringify über CMS-/Code-Daten, kein Nutzer-Input). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 — HERO · proof-first: Kernsatz links, klickbare Live-Referenz rechts */}
      <section className="section-band section-band-base relative overflow-hidden">
        <div className="hero-lamp" aria-hidden />
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-16 md:pb-20 relative z-[1]">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6 hero-split">
              <Reveal delay={60}>
                <HeroHeadline
                  variants={{
                    default: {
                      title: c["hero.title"],
                      subtitle: c["hero.subtitle"],
                    },
                    ad: {
                      title: c["heroad.title"],
                      subtitle: c["heroad.subtitle"],
                    },
                    video: {
                      title: c["herovideo.title"],
                      subtitle: c["herovideo.subtitle"],
                    },
                  }}
                />
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/termin" className="btn-primary">
                    {c["cta.primary"]}
                    <span aria-hidden>→</span>
                  </Link>
                  <a href="#tool" className="btn-secondary">
                    Sichtbarkeits-Check
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-6">
              <Reveal delay={200}>
                <a
                  href="https://riegel.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <figure className="case-plate">
                    <div className="case-chrome">
                      <span className="case-dot" aria-hidden />
                      <span className="case-dot" aria-hidden />
                      <span className="case-dot" aria-hidden />
                      <span className="t-data ml-1 truncate hero-chrome-url">
                        riegel.vercel.app
                      </span>
                    </div>
                    <Image
                      src="/proof/riegel.jpg"
                      alt="Live-Referenz: RIEGEL Immobilien"
                      width={1280}
                      height={800}
                      className="case-shot"
                      priority
                      sizes="(max-width: 768px) 90vw, 540px"
                    />
                    <span className="case-glare" aria-hidden />
                  </figure>
                  <p className="t-data mt-3">
                    {c["hero.plate_context"]} <span className="is-accent">↗</span>
                  </p>
                </a>
              </Reveal>
            </div>
          </div>

        </div>
      </section>

      {/* 02 — STATUS-QUO-KOSTEN (Gelb-Bühne): erst das Problem … */}
      <Section id="kosten" tone="bright">
        <SectionHead
          title={rich(c["kosten.title"])}
          intro={c["kosten.intro"]}
        />
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <ol className="space-y-4">
              {[1, 2, 3].map((n) => (
                <li
                  key={n}
                  className="flex flex-col md:flex-row gap-1 md:gap-4 pb-4 border-b hairline"
                >
                  <span className="t-label shrink-0 md:w-28 pt-1">
                    {c[`kosten.row${n}_label`]}
                  </span>
                  <p className="t-body is-cream">{c[`kosten.row${n}_text`]}</p>
                </li>
              ))}
            </ol>
            <p className="t-body mt-6 max-w-[560px]">{c["kosten.bridge"]}</p>
          </div>
          <div className="md:col-span-5">
            <div className="panel rounded-2xl p-6">
              <p className="t-stat">
                {c["kosten.stat"]}
                <span className="t-data"> %</span>
              </p>
              <p className="t-body mt-3 is-cream">{c["kosten.stat_text"]}</p>
              <p className="t-data mt-4">{c["kosten.stat_source"]}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — SICHTBARKEITS-CHECK: … dann die Selbstdiagnose */}
      <Section id="check" tone="raised">
        <SectionHead
          title={rich(c["check.title"])}
          intro={c["check.intro"]}
        />
        <AuditTool />
      </Section>

      {/* 04 — REFERENZEN */}
      <Section id="proof" tone="base">
        <SectionHead
          title={rich(c["proof.title"])}
          intro={c["proof.intro"]}
        />
        <div className="grid md:grid-cols-2 gap-5">
          <CaseCard
            client="RIEGEL Immobilien"
            branch={c["proof.riegel_branch"]}
            href="https://riegel.vercel.app"
            image={{ src: "/proof/riegel.jpg", alt: "Startseite von RIEGEL Immobilien" }}
            facts={lines(c["proof.riegel_facts"])}
            mechanic={c["proof.riegel_mechanic"]}
          />
          <CaseCard
            client="SAADI AG"
            branch={c["proof.saadi_branch"]}
            href="https://saadi-ag.vercel.app"
            image={{ src: "/proof/saadi.jpg", alt: "Startseite der SAADI AG" }}
            facts={lines(c["proof.saadi_facts"])}
            mechanic={c["proof.saadi_mechanic"]}
          />
        </div>
        <Reveal>
          <div className="mt-10 pt-8 border-t hairline grid md:grid-cols-12 gap-4 md:gap-6 items-baseline">
            <p className="t-stat md:col-span-3">{c["proof.stat"]}</p>
            <div className="md:col-span-9">
              <p className="t-body-lg is-cream max-w-[620px]">{c["proof.stat_text"]}</p>
              <p className="t-data mt-2">{c["proof.stat_note"]}</p>
            </div>
          </div>
        </Reveal>
        <div className="logo-rail mt-10" aria-label="Frühere Kunden">
          {[
            { src: "https://beuwy-2.b-cdn.net/studio/1778235632911-Vision_Blue_2021_digital.svg", alt: "Vision Real Estate" },
            { src: "https://beuwy-2.b-cdn.net/studio/1778235743118-Logo_KW_Koenigswege_long_white_Final.svg", alt: "Königswege" },
            { src: "https://beuwy-2.b-cdn.net/studio/1778233449613-acta_01_lightBG.svg", alt: "acta" },
            { src: "https://beuwy-2.b-cdn.net/studio/1778240857276-PURELEI_Logo_V3-400.webp", alt: "PURELEI" },
            { src: "https://beuwy-2.b-cdn.net/studio/1778240981246-getsafe-400.webp", alt: "Getsafe" },
            { src: "https://beuwy-2.b-cdn.net/studio/1778240914540-GK_Web_Logos-4-400.webp", alt: "GK" },
          ].map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={l.alt} src={l.src} alt={l.alt} className="logo-rail-item" loading="lazy" />
          ))}
        </div>
      </Section>

      {/* 05 — ARBEITSWEISE (Gelb-Bühne) + Mechanik: Wert und Reason-Why VOR dem Preis */}
      <Section id="system" tone="bright">
        <SectionHead
          title={rich(c["system.title"])}
          intro={c["system.intro"]}
        />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((n) => (
            <Reveal key={n}>
              <div className="grid md:grid-cols-12 gap-3 md:gap-6 items-baseline py-5 border-b hairline">
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="t-data">0{n}</span>
                  <h3 className="t-h3">{c[`system.row${n}_title`]}</h3>
                </div>
                <p className="t-body md:col-span-8 max-w-[560px]">{c[`system.row${n}_text`]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 pt-10 border-t hairline">
          <h3 className="t-h2 max-w-[720px]">{rich(c["system.mechanik_title"])}</h3>
          <p className="t-body-lg mt-4 max-w-[560px]">{c["system.mechanik_intro"]}</p>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <Reveal key={n} delay={(n - 1) * 70}>
                <div>
                  <h4 className="t-h3">{c[`system.mechanik${n}_title`]}</h4>
                  <p className="t-body mt-3">{c[`system.mechanik${n}_text`]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 — LEISTUNGSPAKETE (Anker + Decoy, T2 erhöht) — der Preis landet NACH der Mechanik */}
      <Section id="pakete" tone="raised">
        <SectionHead
          title={rich(c["pricing.title"])}
          intro={c["pricing.intro"]}
        />
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {tiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <div
                className={`tier-card h-full flex flex-col ${t.badge ? "tier-card-hero" : ""}`}
              >
                {t.badge && <span className="tier-badge">{t.badge}</span>}
                <h3 className="t-h3">{t.name}</h3>
                <p className="t-small mt-2">{t.result}</p>
                <p className="t-stat mt-5">{t.price}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="t-small is-cream flex gap-2">
                      <span className="t-data shrink-0">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href="/termin"
                    className={t.badge ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}
                  >
                    {c["pricing.cta"]}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 space-y-2 max-w-[720px]">
          <p className="t-small is-cream">{c["pricing.garantie1"]}</p>
          <p className="t-small is-cream">{c["pricing.garantie2"]}</p>
          <p className="t-small">{c["pricing.agentur_vergleich"]}</p>
        </div>
      </Section>

      {/* 07 — PROZESS & QUALIFIZIERUNG */}
      <Section id="prozess" tone="base">
        <SectionHead
          title={rich(c["process.title"])}
          intro={c["process.intro"]}
        />
        <div className="space-y-0">
          {[1, 2, 3].map((n) => (
            <Reveal key={n}>
              <div className="grid md:grid-cols-12 gap-3 md:gap-6 items-baseline py-5 border-b hairline">
                <div className="md:col-span-3 flex items-baseline gap-4">
                  <span className="t-data">0{n}</span>
                  <h3 className="t-h3">{c[`process.step${n}_title`]}</h3>
                </div>
                <p className="t-body md:col-span-6">{c[`process.step${n}_text`]}</p>
                <p className="t-data md:col-span-3 md:text-right">
                  {c[`process.step${n}_meta`]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="t-body mt-8 max-w-[560px] is-cream">{c["process.capacity"]}</p>
      </Section>

      {/* 08 — FOUNDER */}
      <Section id="founder" tone="raised">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <SectionHead title={rich(c["founder.title"])} />
            <p className="t-body-lg max-w-[560px]">{c["founder.text1"]}</p>
            <p className="t-body-lg mt-5 max-w-[560px] is-cream">{c["founder.text2"]}</p>
            <p className="t-body mt-5 max-w-[560px]">{c["founder.solo"]}</p>
          </div>
          <div className="md:col-span-5">
            <figure className="founder-plate">
              <Image
                src="https://beuwy-2.b-cdn.net/studio/1777968744430-brown_studio_4-cmpr-1600.webp"
                alt="Alexander Pütter, Gründer von beuwy"
                width={1600}
                height={1600}
                className="founder-shot"
                sizes="(max-width: 768px) 90vw, 440px"
              />
              <span className="case-glare" aria-hidden />
            </figure>
            <figcaption className="t-data mt-3">{c["founder.caption"]}</figcaption>
          </div>
        </div>
      </Section>

      {/* 09 — FAQ */}
      <Section id="faq" tone="base">
        <SectionHead title={rich(c["faq.title"])} />
        <div className="max-w-[760px]">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <details key={n} className="faq-item group border-b hairline py-5">
              <summary className="t-h3 cursor-pointer list-none flex items-baseline justify-between gap-6">
                {c[`faq.q${n}`]}
                <span className="t-data shrink-0" aria-hidden>
                  +
                </span>
              </summary>
              <p className="t-body mt-3 max-w-[560px]">{c[`faq.a${n}`]}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 10 — CTA (Gelb-Bühne, Qualifizierungs-Frame) */}
      <section id="kontakt" className="cta-invert">
        <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-24 text-center">
          <Reveal>
            <h2 className="t-h2 cta-invert-ink mx-auto max-w-[640px]">{c["cta.title"]}</h2>
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
              <Link
                href="/video-analyse"
                className="cta-invert-ink t-small underline underline-offset-4"
              >
                {c["cta.secondary"]}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <p className="cta-invert-ink t-data mt-5">{c["cta.meta"]}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function buildJsonLd(c: Record<string, string>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://beuwy.com/#org",
        name: "beuwy",
        description:
          "Verkaufsfertige Portale, Custom CRMs und KI-Automatisierungen als Festpreisprojekte für Finanz-, Immobilien- und Medizinunternehmen.",
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
          "Digitale Vertriebssysteme",
          "KI-Automatisierung",
          "Custom CRM",
          "Generative Engine Optimization",
          "Websites für Immobilienmakler",
          "Websites für Finanzvertriebe",
          "CRM-Anbindung (onOffice)",
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
      {
        "@type": "FAQPage",
        "@id": "https://beuwy.com/#faq",
        mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
          "@type": "Question",
          name: c[`faq.q${n}`],
          acceptedAnswer: { "@type": "Answer", text: c[`faq.a${n}`] },
        })),
      },
    ],
  };
}

/* quote bleibt leer, bis die O-Töne über Kanal B (Masterplan §4) vorliegen —
   keine erfundenen Kundenstimmen (Anti-Slop-Regel 1). */
function CaseCard({
  client,
  branch,
  href,
  image,
  facts,
  mechanic,
  quote,
}: {
  client: string;
  branch: string;
  href: string;
  image: { src: string; alt: string };
  facts: string[];
  mechanic: string;
  quote?: { text: string; name: string };
}) {
  const displayUrl = href.replace(/^https?:\/\//, "");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card block h-full group"
    >
      <figure className="case-plate">
        <div className="case-chrome">
          <span className="case-dot" aria-hidden />
          <span className="case-dot" aria-hidden />
          <span className="case-dot" aria-hidden />
          <span className="t-data ml-1 truncate hero-chrome-url">{displayUrl}</span>
        </div>
        <Image
          src={image.src}
          alt={image.alt}
          width={1280}
          height={800}
          className="case-shot"
          sizes="(max-width: 768px) 90vw, 540px"
        />
        <span className="case-glare" aria-hidden />
      </figure>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="t-h3">{client}</h3>
        <span className="t-data">live ↗</span>
      </div>
      <p className="t-data mt-1">{branch}</p>
      <ul className="mt-5 space-y-2">
        {facts.map((f) => (
          <li key={f} className="t-small is-cream flex gap-2">
            <span className="t-data shrink-0">·</span>
            {f}
          </li>
        ))}
      </ul>
      <p className="t-body mt-5">{mechanic}</p>
      {quote && (
        <blockquote className="mt-5 border-t hairline pt-5">
          <p className="t-body is-cream">„{quote.text}“</p>
          <footer className="t-data mt-2">— {quote.name}</footer>
        </blockquote>
      )}
    </a>
  );
}
