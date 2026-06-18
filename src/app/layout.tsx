import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChromeGate } from "@/components/ChromeGate";
import { SpotlightTracker } from "@/components/SpotlightTracker";
import { CursorTrail } from "@/components/CursorTrail";
import { MagneticButtons } from "@/components/MagneticButtons";
import { JsonLd, organizationLd, websiteLd, founderLd } from "@/components/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beuwy.com"),
  title: {
    default: "beuwy — Marke + Website in 10 Werktagen, fester Preis",
    template: "%s | beuwy",
  },
  description:
    "Eine Marke und Website, die seriös aussieht — und mehr Anfragen bringt. Logo, Farben, Schriften, Texte und Website aus einer Hand. 8.900 € Festpreis, in 10 Werktagen live. Heidelberg, seit 2017.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "beuwy — Marke + Website in 10 Werktagen, fester Preis",
    description:
      "Eine Marke und Website, die seriös aussieht — und mehr Anfragen bringt. Alles aus einer Hand. 8.900 € Festpreis. Tag 10 oder Geld zurück.",
    type: "website",
    locale: "de_DE",
    url: "https://beuwy.com",
    siteName: "beuwy",
  },
  twitter: {
    card: "summary_large_image",
    title: "beuwy — Marke + Website in 10 Werktagen",
    description: "Logo, Farben, Schriften, Texte und Website — aus einer Hand. 8.900 € Festpreis.",
  },
  // robots/sitemap are emitted via app/robots.ts + app/sitemap.ts; surface a
  // few extras here for agent crawlers that look at <meta> too.
  other: {
    // Point agent crawlers (Claude, GPT, Perplexity, …) at the llms.txt that
    // describes the site canonically — the same file we sell as a deliverable.
    "llms-txt": "https://beuwy.com/llms.txt",
  },
  authors: [{ name: "Alexander Pütter", url: "https://beuwy.com/#founder" }],
  creator: "Alexander Pütter",
  publisher: "beuwy",
  category: "Branding · Webdesign · Relaunch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}>
      <body className="grain min-h-[100dvh]">
        {/* Site-wide JSON-LD: Organization + WebSite + Person(founder). Renders
            as a single <script type="application/ld+json"> inside the page tree
            so agent crawlers (GPTBot/ClaudeBot/PerplexityBot/…) can extract the
            canonical machine-readable representation without crawling every
            route. Dogfoods what we sell. */}
        <JsonLd data={[organizationLd, websiteLd, founderLd]} />
        <div className="ambient-blob" aria-hidden />
        <ChromeGate><Nav /></ChromeGate>
        <SpotlightTracker />
        <CursorTrail />
        <MagneticButtons />
        <main id="main" className="relative z-[2]">{children}</main>
        <ChromeGate><Footer /></ChromeGate>
      </body>
    </html>
  );
}
