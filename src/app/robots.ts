import type { MetadataRoute } from "next";

const BASE = "https://beuwy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Editor surfaces are auth-gated at the middleware level anyway, but
        // we also tell well-behaved bots to skip them.
        disallow: ["/build", "/build/", "/api/"],
      },
      // Explicit allow for the well-known agent / model crawlers, so there is
      // no ambiguity about whether their training/lookup pipelines may read
      // the site or llms.txt. (The default UA "*" rule already permits it;
      // listing these makes the intent legible to ops + auditors.)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
