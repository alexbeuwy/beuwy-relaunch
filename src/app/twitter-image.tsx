// Twitter card image. Identical composition to the Open Graph image — re-export
// its renderer so we get an explicit `twitter:image` meta tag (1200x630,
// summary_large_image) instead of only the og:image fallback. Single source of
// truth for the art lives in opengraph-image.tsx. `runtime` is declared here
// directly (Next can't statically read a re-exported runtime field).
export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";
