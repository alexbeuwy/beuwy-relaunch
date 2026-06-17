import type { MetadataRoute } from "next";

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
  ];

  return routes;
}
