import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";

/**
 * Sitemap für den Light-Makler-Mehrseiter (BRIEF §6). /anfrage bewusst
 * NICHT gelistet — die Seite ist noindex (Vorquali-Funnel, siehe robots.ts).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://beuwy.com";

  const seiten: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },

    /* Hub + Kern-Seiten (BRIEF §6) */
    { url: `${base}/immobilienmarketing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/leadgenerierung-immobilienmakler`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/website-fuer-immobilienmakler`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/onoffice-website`, changeFrequency: "monthly", priority: 0.8 },

    /* Ranking-Asset — Ego-Loop, hohes Verlinkungspotenzial */
    { url: `${base}/beste-maklerwebsites`, changeFrequency: "monthly", priority: 0.8 },

    /* R2-Seiten (BRIEF §9, Repositionierung 26.08) — AI-Pain-Page +
       Zielgruppen-Unterseiten. Priorität zwischen Kern-Seiten und
       Cluster: eigenständige Landingpages, aber schmaler als der Hub. */
    { url: `${base}/ki-fuer-immobilienmakler`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/immobilienmarketing-agentur`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/marketing-projektentwickler`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/marketing-bautraeger`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/marketing-immobilienvertrieb`, changeFrequency: "monthly", priority: 0.75 },

    /* Leistungs- und Über-Seiten (Alex, 26.08: Über uns + 5 neue
       Unterseiten). Gleiche Ebene wie die R2-Zielgruppenseiten. */
    { url: `${base}/ueber-uns`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/seo-fuer-immobilienmakler`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/geo-fuer-immobilienmakler`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/social-media-immobilienmakler`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/email-marketing-immobilienmakler`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/marketing-kapitalanlage-immobilien`, changeFrequency: "monthly", priority: 0.75 },

    /* R3: Tools + Wissens-Hub + 50 Ratgeber (R3-SEITENPLAN.json) */
    { url: `${base}/tools`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/verkaufspreisrechner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/mietpreisrechner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/afa-rechner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/wissen`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/alleinauftrag-gewinnen`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/eigentuemer-leads-generieren`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/immobilien-farming`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/empfehlungsgeschaeft-digitalisieren`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/objektakquise-strategien`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/verkaeufer-ansprechen`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/makler-positionierung`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/markenaufbau-makler`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/immobilienmakler-werbung`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/performance-marketing-makler`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/makler-in-kleinstadt`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/luxusimmobilien-vermarkten`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/bottimmo-erfahrungen`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/propstack-website`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/flowfact-website`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/casaone-website`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/immoscout-profil-vs-eigene-website`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/makler-website-baukasten-vergleich`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/openimmo-schnittstelle`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/makler-crm-einfuehren`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/lead-anbieter-vergleich`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/mcmakler-modell`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/chatgpt-fuer-makler`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/ki-expose-texte`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/ai-overviews-immobilien`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/perplexity-immobiliensuche`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/ki-immobilienbewertung`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/automatisierung-maklerbuero`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/ki-richtlinien-maklerbuero`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/geo-checkliste`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/exposes-die-verkaufen`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/makler-website-fehler`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/immobilienfotografie-briefing`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/video-fuer-makler`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/google-unternehmensprofil-makler`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/bewertungen-aufbauen`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/landingpage-immobilienbewertung`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/makler-newsletter-beispiele`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/website-relaunch-makler`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/barrierefreie-maklerwebsite`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/wissen/immobilie-bewerten`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/wissen/mietpreis-ermitteln`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/wissen/afa-immobilien`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/wissen/restnutzungsdauer-gutachten`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/wissen/verkehrswert-vs-marktpreis`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/wissen/spekulationssteuer-immobilien`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/provision-verteidigen`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/maklerbuero-skalieren`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/makler-kennzahlen`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/onboarding-neuer-mandate`, changeFrequency: "monthly", priority: 0.65 },

    /* Cluster-Seiten (Vergleich) */
    { url: `${base}/bottimmo-alternative`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/maklerwebsite-kosten`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/maklersoftware-vergleich`, changeFrequency: "monthly", priority: 0.7 },

    /* Fallstudien — Übersicht + jeder Slug aus src/lib/cases.ts */
    { url: `${base}/cases`, changeFrequency: "monthly", priority: 0.6 },
    ...CASES.map((c) => ({
      url: `${base}/cases/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),

    /* Bestand */
    { url: `${base}/termin`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/video-analyse`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/impressum`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/datenschutz`, changeFrequency: "yearly", priority: 0.1 },
  ];

  return seiten;
}
