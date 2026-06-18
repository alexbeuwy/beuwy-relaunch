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
  jobTitle: "Macher · beuwy",
  description:
    "Macht seit 2009 Marken — erst für Konzerne (Bosch, Continental, Michelin), seit 2017 mit beuwy für Gründer und kleine Firmen. 2023 selbst Unternehmer: 315 Wohnungen über Instagram verkauft, mitten in der Zinskrise.",
  worksFor: { "@id": ID.org },
  knowsAbout: [
    "Branding",
    "Logo design",
    "Webdesign",
    "Website-Relaunch",
    "Copywriting",
    "Brand identity",
    "Premium positioning",
  ],
  alumniOf: { "@type": "Organization", name: "beuwy" },
};

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ID.org,
  name: "beuwy",
  alternateName: "beuwy — Branding & Webdesign",
  url: SITE,
  logo: `${SITE}/icon.svg`,
  image: `${SITE}/opengraph-image`,
  description:
    "Marke + Website in 10 Werktagen. Logo, Farben, Schriften, Texte und Website aus einer Hand. 8.900 € fester Preis. Tag 10 oder Geld zurück.",
  slogan: "Marke + Website in 10 Werktagen, zum festen Preis.",
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
  serviceType: "Branding · Webdesign · Relaunch",
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Was du bekommst",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marke",                   description: "Logo, 5–6 Farben, Schriften. Hell und dunkel. Ein klarer Look." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website",                 description: "6–8 Sektionen, schnell, mobil, auf deiner Domain — fertig zum Online-gehen." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Texte",                   description: "Klare deutsche Texte. Headlines, Hauptbotschaften, kleine Hinweise. Ohne Marketing-Sprech." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technik im Hintergrund",  description: "Bei Google findbar, auf dem Handy schnell, gleich richtig aufgestellt für ChatGPT & Co." } },
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
    "Marke + Website in 10 Werktagen. 8.900 € fester Preis. Tag 10 oder Geld zurück.",
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
  serviceType: "Branding und Webdesign",
  name: "Marke + Website in 10 Werktagen",
  description:
    "Festpreis-Paket: Marke (Logo, Farben, Schriften), Website (6–8 Sektionen, deine Domain), klare deutsche Texte, plus Google- und KI-Sichtbarkeit eingebaut. Am Tag 10 live, plus 14 Tage Begleitung danach.",
  provider: { "@id": ID.org },
  areaServed: { "@type": "Place", name: "DACH" },
  audience: { "@type": "Audience", audienceType: "Gründer, kleine Firmen, Selbstständige" },
  category: ["Branding", "Webdesign", "Website-Relaunch"],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/LimitedAvailability",
    priceCurrency: "EUR",
    price: 8900,
    description: "Fester Preis: 8.900 €. Lieferung in 10 Werktagen oder Geld zurück.",
  },
};

export const homepageBreadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "beuwy", item: SITE },
  ],
};

/**
 * Build a schema.org FAQPage from {q,a} items. The answer text may contain
 * light HTML (the FaqBlock renders it via dangerouslySetInnerHTML), so we
 * strip tags + decode the few entities we actually use for the structured-
 * data `text` field, which expects plain text. Returns null for an empty
 * list so callers can conditionally render.
 */
export function faqPageLd(items: { q?: string; a?: string }[]) {
  const clean = (s: string) =>
    s
      .replace(/<[^>]+>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .trim();

  const entries = items.filter((it) => it.q && it.a);
  if (entries.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((it) => ({
      "@type": "Question",
      name: clean(it.q!),
      acceptedAnswer: { "@type": "Answer", text: clean(it.a!) },
    })),
  };
}

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
