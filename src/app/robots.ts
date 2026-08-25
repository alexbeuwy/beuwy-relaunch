import type { MetadataRoute } from "next";

/**
 * /anfrage ist der Vorquali-Funnel (noindex, siehe generateMetadata dort)
 * — hier zusätzlich vom Crawling ausgenommen, damit keine Zwischenschritte
 * indexiert werden.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/anfrage"] }],
    sitemap: "https://beuwy.com/sitemap.xml",
  };
}
