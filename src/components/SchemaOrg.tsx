/**
 * JSON-LD (GEO/SEO-Paket, R2-7). Zwei Bausteine:
 * - `OrganisationLd` — ProfessionalService, einmal global im Layout.
 * - `ServiceLd` — pro Leistungsseite einbaubar (Aufruf ist Sache der
 *   jeweiligen page.tsx, dieses Leaf verdrahtet nichts außer Layout).
 *
 * Nur Fakten, die im Repo belegt sind (Impressum, content.ts). Keine
 * Ratings, Reviews, Telefonnummern oder Öffnungszeiten — die stehen
 * nirgends und werden nicht erfunden (BRIEF §9 / Gate R2-7 G2).
 */

const SITE_URL = "https://beuwy.com";

const ORGANISATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "beuwy",
  url: SITE_URL,
  sameAs: [SITE_URL],
  email: "ap@beuwy.com",
  founder: {
    "@type": "Person",
    name: "Alexander Pütter",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Max-Bill-Str. 3",
    postalCode: "67061",
    addressLocality: "Ludwigshafen am Rhein",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "Country",
    name: "Deutschland",
  },
  description:
    "beuwy ist eine Unternehmensberatung für Immobilienunternehmen: Makler, Projektentwickler, Bauträger und Kapitalanlage-Vertriebe. Marke, Website, Leadgenerierung und CRM-Anbindung als ein System, das messbar Mandate und Deals erzeugt — seit 17 Jahren Markenarbeit.",
} as const;

/** Entschärft Script-Ausbrüche in JSON.stringify-Output (üblich bei JSON-LD in React). */
function ldJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Einmal global rendern (Layout). Nie pro Seite wiederholen. */
export function OrganisationLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: ldJson(ORGANISATION_SCHEMA) }}
    />
  );
}

/**
 * JSON-LD für eine einzelne Leistungsseite (schema.org/Service).
 * `beschreibung` = 1–2 Sätze, keine erfundenen Zahlen. `url` absolut
 * oder seitenrelativ ab `https://beuwy.com`.
 */
export function ServiceLd({
  name,
  beschreibung,
  url,
}: {
  name: string;
  beschreibung: string;
  url: string;
}) {
  const absoluteUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: beschreibung,
    url: absoluteUrl,
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    provider: {
      "@type": "ProfessionalService",
      name: "beuwy",
      url: SITE_URL,
    },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: ldJson(schema) }}
    />
  );
}
