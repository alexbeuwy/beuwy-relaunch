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
