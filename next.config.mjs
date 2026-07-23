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
  },
  async redirects() {
    // One-Pager-Konsolidierung (Masterplan §5): alte Unterseiten -> Anker
    return [
      { source: "/method", destination: "/#prozess", permanent: false },
      { source: "/system", destination: "/#system", permanent: false },
      { source: "/manifesto", destination: "/", permanent: false },
      { source: "/work", destination: "/#proof", permanent: false },
      { source: "/anfrage", destination: "/#kontakt", permanent: false },
      { source: "/audit", destination: "/#tool", permanent: false },
    ];
  },
};

export default nextConfig;
