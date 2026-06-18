import type { MetadataRoute } from "next";
import { cases } from "@/lib/cases";

const BASE = "https://beuwy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Last-modified is set to the build date so search/agent crawlers see fresh
  // dates on every deploy. For per-route freshness control we could query the
  // git mtime of each content/puck/<slug>.json, but a global build date is
  // accurate enough — the site is small and recrawled on every deploy.
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,         lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/method`,    lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/sichtbar`,  lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/work`,      lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/system`,    lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/manifesto`, lastModified, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/anfrage`,   lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/audit`,     lastModified, changeFrequency: "monthly", priority: 0.7 },
    // Each case study is its own indexable detail page — strong signal for
    // search + agent crawlers that we have substantive, sourced proof per client.
    ...cases.map((c) => ({
      url: `${BASE}/work/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // /go/* is paid-traffic landing (noindex via per-page robots meta) — kept
    // out of the sitemap so it doesn't dilute organic crawl priority.
  ];

  return routes;
}
