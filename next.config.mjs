/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Kein Framework-Fingerprint im Header (Launch-Audit 14.09). */
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // BunnyCDN Pull-Zone fuer High-End-Assets (docs/ASSETS.md)
    remotePatterns: [
      { protocol: "https", hostname: "beuwy-2.b-cdn.net" },
    ],
  },
  serverExternalPackages: ["@sparticuz/chromium", "playwright-core", "puppeteer-core"],
  // Sparticuz-Chromium liegt als .br-Binaries in bin/ — Next traced die
  // dynamischen Reads nicht, ohne diese Zeile fehlt Chromium im Bundle.
  outputFileTracingIncludes: {
    "/api/audit/scan": ["./node_modules/@sparticuz/chromium/bin/**"],
    // Die Skript-Engine liest Protokoll, Sprachprofil und Hook-Patterns zur
    // Laufzeit aus docs/branding — eine Quelle der Wahrheit statt Kopie im Code.
    "/api/os/skripte": ["./docs/branding/*.md"],
  },
  async redirects() {
    // Light-Makler-Migration (GOAL/BRIEF, Leaf G1): die alten Anker-Ziele
    // aus dem Riso-One-Pager existieren im neuen Mehrseiter nicht mehr,
    // deshalb auf die naechstliegenden echten Seiten gemappt.
    // /anfrage ist jetzt der Vorquali-Funnel selbst (GOAL/BRIEF §6) —
    // kein Anker-Redirect mehr, sonst landet jeder CTA-Klick im Leeren.
    //
    // WordPress-Umzug (Auftrag 2, 2026-09-14): die alte beuwy.com lief auf
    // einem Theme-Demo-Bestand (Avada/Fusion o.ä.) mit von Google indexierten
    // Demo-, Portfolio- und Kategorie-URLs. trailingSlash steht hier bewusst
    // NICHT auf true — Next redirected /pfad/ → /pfad automatisch (Next-
    // Default), /impressum/ und /datenschutz/ brauchen daher keinen eigenen
    // Eintrag. permanent:true = 308 fuer alle echten SEO-Umzuege.
    return [
      { source: "/method", destination: "/immobilienmarketing", permanent: false },
      // /system ist seit 23.09 die Hauptseite (vorher /vsl) — der alte
      // Theme-Demo-Redirect auf /website-fuer-immobilienmakler entfaellt.
      { source: "/manifesto", destination: "/", permanent: false },
      { source: "/work", destination: "/cases", permanent: false },
      { source: "/audit", destination: "/anfrage", permanent: false },

      // VSL-Umbenennung (23.09): /vsl heisst jetzt /system.
      { source: "/vsl", destination: "/system", permanent: true },

      // Leadgen-Landingpage umbenannt
      { source: "/leads", destination: "/leadgenerierung-immobilienmakler", permanent: true },

      // Portfolio (Theme-Demo) → Fallstudien. Erst der konkrete Slug-Fall,
      // dann die Uebersichtsseite selbst.
      { source: "/portfolio/:slug*", destination: "/cases", permanent: true },
      { source: "/portfolio", destination: "/cases", permanent: true },
      { source: "/portfolio_cat/:slug*", destination: "/cases", permanent: true },

      // Yoast page_category-Taxonomie hatte keine Entsprechung — Startseite
      { source: "/page_category/:slug*", destination: "/", permanent: true },

      // Theme-Demo-/Layout-Seiten des alten Themes → Startseite
      { source: "/icon-box", destination: "/", permanent: true },
      { source: "/home-3", destination: "/", permanent: true },
      { source: "/creative-studio", destination: "/", permanent: true },
      { source: "/posts-titles", destination: "/", permanent: true },
      { source: "/classic-medical", destination: "/", permanent: true },
      { source: "/creative-software", destination: "/", permanent: true },
      { source: "/expand-toggle", destination: "/", permanent: true },
      { source: "/justified-bento-grids", destination: "/", permanent: true },
      { source: "/classic-innovators", destination: "/", permanent: true },
      { source: "/creative-prototype", destination: "/", permanent: true },
      { source: "/about-innovators", destination: "/", permanent: true },
      { source: "/contact-lab", destination: "/", permanent: true },
      { source: "/apartments-azure", destination: "/", permanent: true },
      { source: "/apartments-celestial", destination: "/", permanent: true },
      { source: "/classic-saas", destination: "/", permanent: true },
      { source: "/saadi-timeline", destination: "/", permanent: true },
      { source: "/shooting-27-03-2026", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home2", destination: "/", permanent: true },

      // Alte Yoast-XML-Sitemaps → aktuelle einzige Sitemap
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/portfolio-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/portfolio_category-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page_category-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  async headers() {
    // Sichere, seitenweite Security-Header (Auftrag 2). Bewusst OHNE
    // Content-Security-Policy — die bricht Inline-JSON-LD (SchemaOrg) und
    // gsap/next/og-Inline-Skripte; eine CSP ist ein eigenes, sorgfaeltig
    // getestetes Vorhaben und kein Nebenprodukt der Redirect-Migration.
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
