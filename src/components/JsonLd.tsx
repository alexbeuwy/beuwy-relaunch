/**
 * Embed a JSON-LD (schema.org) structured-data block into the page so search
 * engines and agent crawlers (GPTBot, ClaudeBot, PerplexityBot, …) can parse
 * a canonical machine-readable representation of who we are, what we sell,
 * and who the founder is.
 *
 * Why a component, not a `<head>` script tag: in Next 15 App Router the
 * recommended way to inject JSON-LD is to render a `<script>` tag inside the
 * page tree using `dangerouslySetInnerHTML`. React 19 also allows native
 * `<script>` rendering, but we keep `dangerouslySetInnerHTML` so the JSON is
 * preserved verbatim (no React JSX-escaping of the `</` sequence etc.) and
 * crawlers see byte-for-byte what we wrote.
 *
 * Usage:
 *   <JsonLd data={organizationLd} />
 *   <JsonLd data={[serviceLd, breadcrumbLd]} />
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // Escape the only character that can break out of a <script> block.
      // No other escaping is needed inside a JSON string.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}

const SITE = "https://beuwy.com";

/** A stable @id we can reuse to link Organization ⇄ Person ⇄ Service. */
const ID = {
  org: `${SITE}/#organization`,
  founder: `${SITE}/#founder`,
  website: `${SITE}/#website`,
  service: `${SITE}/#service`,
} as const;

export const founderLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": ID.founder,
  name: "Alexander Pütter",
  givenName: "Alexander",
  familyName: "Pütter",
  jobTitle: "Founder, Operator",
  description:
    "Brand-Arbeit für Konzerne seit 2009 (Bosch, Continental, Michelin). beuwy als Operator-Studio seit 2017. 2023 selbst Unternehmer: 315 Wohnungen über Instagram verkauft, mitten in der Zinskrise.",
  worksFor: { "@id": ID.org },
  knowsAbout: [
    "Brand systems",
    "Machine-readable design",
    "schema.org structured data",
    "llms.txt",
    "AI agent visibility",
    "Owner-led marketing",
    "Premium positioning",
  ],
  alumniOf: { "@type": "Organization", name: "beuwy" },
};

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ID.org,
  name: "beuwy",
  alternateName: "beuwy — Operator-Studio",
  url: SITE,
  logo: `${SITE}/icon.svg`,
  image: `${SITE}/opengraph-image`,
  description:
    "Operator-led Studio. Brand · Site · Agent-Layer in 10 Tagen. Festpreis, ein Operator, drei Auslieferungen — live, nicht in Figma.",
  slogan: "Die Marke, die ein Agent zuerst empfiehlt.",
  foundingDate: "2017",
  founder: { "@id": ID.founder },
  founders: [{ "@id": ID.founder }],
  employee: [{ "@id": ID.founder }],
  email: "hello@beuwy.com",
  address: [
    { "@type": "PostalAddress", addressLocality: "Heidelberg", addressCountry: "DE" },
    { "@type": "PostalAddress", addressLocality: "Mannheim",   addressCountry: "DE" },
    { "@type": "PostalAddress", addressLocality: "Berlin",     addressCountry: "DE" },
  ],
  areaServed: { "@type": "Place", name: "DACH" },
  knowsLanguage: ["de", "en"],
  serviceType: "Brand · Site · Agent-Layer",
  priceRange: "€€€",
  // Surface beuwy's offer catalog so agent search results can answer "what
  // does beuwy do" with a structured list, not a free-form crawl.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Was wir liefern",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DESIGN.md",          description: "Brand-Tokens, Voice, Vocabulary, Forbidden Phrases. Maschinenlesbar." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Live-Site",          description: "Next.js, Vercel, deine Domain. Eine Seite wie diese — auf dich angepasst." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agent-Layer",        description: "schema.org · llms.txt · Cluster-Brief · GPT-Audit der aktuellen Sichtbarkeit." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "30 Tage Compounding", description: "Nach Launch: Experimente, Cohort-Receipts, ein Operator auf Standby." } },
    ],
  },
  sameAs: [
    // Add socials here when we publish them — kept empty rather than guessed.
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE,
  name: "beuwy",
  inLanguage: "de-DE",
  description:
    "Brand · Site · Agent-Layer in 10 Tagen. Operator-led Studio für die Agent-Ära.",
  publisher: { "@id": ID.org },
  // Sitelinks-search-box hint for Google + agent crawlers that respect it.
  // /audit accepts ?domain=, which is exactly the on-site search pattern.
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/audit?domain={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": ID.service,
  serviceType: "Brand · Site · Agent-Layer",
  name: "10-Tage-Engagement",
  description:
    "Festpreis-Engagement: Brand-System, Live-Site auf Next.js und Agent-Layer (schema.org, llms.txt, Cluster-Brief) — am Tag 10 live, danach 30 Tage Compound-Standby.",
  provider: { "@id": ID.org },
  areaServed: { "@type": "Place", name: "DACH" },
  audience: { "@type": "Audience", audienceType: "Founders, owner-led brands" },
  category: ["Brand strategy", "Web development", "AI agent visibility"],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/LimitedAvailability",
    eligibleQuantity: { "@type": "QuantitativeValue", value: 6, unitText: "slots per year" },
    priceCurrency: "EUR",
    description: "Festpreis pro Slot — 6 Slots pro Jahr. Aktuell: Q3/2026 2 Slots offen, Q4/2026 Warteliste.",
  },
};

export const homepageBreadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "beuwy", item: SITE },
  ],
};

export function breadcrumbLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.href.startsWith("http") ? it.href : `${SITE}${it.href}`,
    })),
  };
}
