/** @type {import('next').NextConfig} */
const nextConfig = {
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
    return [
      { source: "/method", destination: "/immobilienmarketing", permanent: false },
      { source: "/system", destination: "/website-fuer-immobilienmakler", permanent: false },
      { source: "/manifesto", destination: "/", permanent: false },
      { source: "/work", destination: "/cases", permanent: false },
      { source: "/audit", destination: "/anfrage", permanent: false },
    ];
  },
};

export default nextConfig;
