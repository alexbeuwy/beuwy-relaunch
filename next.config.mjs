/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@sparticuz/chromium", "playwright-core"],
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
