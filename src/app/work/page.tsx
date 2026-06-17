import type { Metadata } from "next";
import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Arbeit — Vier Mal von 0 zur Kategorie",
  description:
    "Vision · Königswege · acta · PURELEI. €160M KKR JV · 2.240 Partner · 315 Wohnungen · 1M Follower — eine Hand, seit 2017.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Arbeit — Vier Mal von 0 zur Kategorie",
    description: "Vision · Königswege · acta · PURELEI. €300M+ in den Büchern unserer Kunden.",
    type: "article",
    url: "https://beuwy.com/work",
  },
  twitter: { card: "summary_large_image" },
};

const breadcrumb = breadcrumbLd([{ name: "beuwy", href: "/" }, { name: "Arbeit", href: "/work" }]);

const cases = [
  {
    id: "vision",
    client: "Vision Real Estate",
    cat: "Real Estate · DACH",
    years: "2019 → 2023",
    kpi: "€160M",
    kpiLabel: "KKR Joint Venture",
    headline: "3 Gründer → 70 Mitarbeitende. Brand vor KKR.",
    body: "Vor dem Rebranding: drei Mitarbeitende, ein lokaler Player. Nach beuwy: 70 Köpfe, eine bundesweit zitierte Brand, CMO-Sitz und ein Joint Venture mit dem größten Private Equity der Welt.",
    deliverables: ["Brand-Architektur", "vision.de Relaunch", "Investor-Narrativ", "Sales-Material für institutionelle Kapitalgeber"],
  },
  {
    id: "koenigswege",
    client: "Königswege",
    cat: "Finanzberatung · DE",
    years: "2017 → live",
    kpi: "170 → 2.240",
    kpiLabel: "Partner · Top-10 DE",
    headline: "Vom No-Name in die Top-10 DE.",
    body: "139.774 Kunden. 74 Standorte. Cited Top-10 DE Finance auf der cash-online Hitliste 2024. Der Relaunch 2020 hat das Unternehmen explodieren lassen — von 170 auf 2.240 Partner.",
    deliverables: ["Brand-Strategie", "Web-System", "Partner-Materialien", "Recruiting-Funnel"],
  },
  {
    id: "acta",
    client: "acta",
    cat: "Real Estate · DE",
    years: "2023 → live",
    kpi: "315 / €48,4M",
    kpiLabel: "Wohnungen · Instagram-only",
    headline: "315 Wohnungen in der Zinskrise. Über Instagram.",
    body: "Ø Ticket €153.842. Owner-led, zero Outside Marketing Team. Drei Geschäftspartner. 15 Mitarbeitende in der Spitze. Etwas, wofür man vor Jahren ausgelacht worden wäre: Wohnungen über's Internet, teilweise ohne Besichtigung.",
    deliverables: ["Brand-Identität", "Paid-Social-System", "Funnel-Architektur", "Sales-Enablement"],
  },
  {
    id: "purelei",
    client: "PURELEI",
    cat: "DTC · Lifestyle",
    years: "2018 → live",
    kpi: "1M+",
    kpiLabel: "Follower · 20–30 Mio. Ø Umsatz/Jahr",
    headline: "Founder-led Brand-Build. Aus dem Wohnzimmer.",
    body: "2018 intensiv mitgebaut, heute fast 1 Mio. Follower auf Instagram und konstant 20–30 Mio. Umsatz pro Jahr. Brand-Sprache, Content-System, Founder-Stimme — eingerichtet, dass es ohne uns weiter skaliert.",
    deliverables: ["Brand-Language", "Content-System", "Influencer-Brief", "Founder-Voice"],
  },
  {
    id: "hellogetsafe",
    client: "hellogetsafe",
    cat: "Insurtech · 2019",
    years: "2019",
    kpi: "Pre-Series-A",
    kpiLabel: "Brand-Build vor Funding",
    headline: "Die Brand, die der Demo vorausläuft.",
    body: "Pre-Series-A Brand-Build. Der Wert war: das Pitchdeck hat sich von selbst verkauft, weil die Marke schon stand.",
    deliverables: ["Brand-Build", "Investor-Materials"],
  },
  {
    id: "snocks",
    client: "Snocks",
    cat: "DTC · Apparel",
    years: "Selected Content",
    kpi: "—",
    kpiLabel: "Einzelne Content-Pieces",
    headline: "Hand-picked Content-Drops.",
    body: "Einzelne Content-Pieces in einer Phase, in der Snocks selbst dabei war, sein Format zu finden.",
    deliverables: ["Content-Drops"],
  },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <section className="pt-[140px] md:pt-[180px] pb-[64px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow"><span className="num">/</span> Arbeit · 2017 → 2026</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display-xl mt-7 max-w-[1100px]"
            >
              4× von <em className="gradient-text">0</em> zur{" "}
              <em>Kategorie</em>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>€300M+</em> in den Büchern unserer Kunden.
              PURELEI · Vision · Königswege · acta — seit 2017 dieselbe Hand am Steuer.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Selected" title="Cases" date="2017 / live" tone="raised">
        <div className="space-y-6">
          {cases.map((c, i) => (
            <Reveal key={c.id} delay={i * 40}>
              <article
                id={c.id}
                className="glass grid md:grid-cols-12 gap-8 items-start p-7 md:p-10"
              >
                <div className="md:col-span-12">
                  <AssetSlot
                    src={`/assets/cases/${c.id}.jpg`}
                    alt={`${c.client} — case visual`}
                    aspect="16/9"
                    caption={`${c.client} · ${c.cat}`}
                    prompt={`Premium editorial photograph for ${c.client} (${c.cat}) — moody dark bordeaux background with yellow accent lighting, sculptural mockup or product hero shot, 16:9`}
                  />
                </div>
                <div className="md:col-span-4">
                  <span
                    style={{
                      color: "var(--ink-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} · {c.cat.toUpperCase()} · {c.years}
                  </span>
                  <p
                    className="font-display mt-3"
                    style={{
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1.1,
                    }}
                  >
                    {c.client}
                  </p>
                  <p
                    className="font-display mt-5"
                    style={{
                      fontSize: 56,
                      letterSpacing: "-0.025em",
                      color: "var(--ink-yellow)",
                      lineHeight: 0.95,
                    }}
                  >
                    {c.kpi}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      color: "var(--ink-cream)",
                      fontSize: 13,
                      fontWeight: 510,
                    }}
                  >
                    {c.kpiLabel}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <p
                    className="font-display"
                    style={{
                      fontSize: 28,
                      letterSpacing: "-0.02em",
                      color: "var(--ink-yellow)",
                      lineHeight: 1.15,
                    }}
                  >
                    {c.headline}
                  </p>
                  <p
                    className="mt-4 max-w-[640px]"
                    style={{
                      color: "var(--ink-muted)",
                      fontSize: 15,
                      lineHeight: "24px",
                    }}
                  >
                    {c.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.deliverables.map((d) => (
                      <li
                        key={d}
                        className="chip"
                        style={{ background: "var(--bg-elevated)" }}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section chapter="02 Next" title="Was wir 2026 → 2030 bauen" date="2026 / next" tone="elevated">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            AI · Agenten · Software · Fintech · Proptech · DefTech ·{" "}
            <em className="font-display italic">Longevity</em>.
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 max-w-[640px] text-[17px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            2024 nach intensiver Arbeit mit einem US-AI-Agenten-Startup spannen wir die Fäden in
            Felder, die in den nächsten fünf Jahren explodieren — und in denen es jetzt darum geht,
            die <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>Sprache</em>{" "}
            zu setzen, nicht das Feature.
          </p>
        </Reveal>
        <div className="mt-8">
          <Link href="/anfrage" className="btn-primary">
            Vielleicht deins? — Brief schicken
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
