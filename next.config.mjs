/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [],
  },
  env: {
    // Inject the git SHA at build time so it's bundled as a static string.
    // Vercel sets VERCEL_GIT_COMMIT_SHA during build. Falls back to "local"
    // for local dev. Reads as process.env.NEXT_PUBLIC_BUILD_SHA in JSX.
    NEXT_PUBLIC_BUILD_SHA: (process.env.VERCEL_GIT_COMMIT_SHA || "local").slice(0, 7),
  },
};

export default nextConfig;
