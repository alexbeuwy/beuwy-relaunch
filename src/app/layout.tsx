import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SpotlightTracker } from "@/components/SpotlightTracker";
import { SmoothScroll } from "@/components/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beuwy.com"),
  title: "beuwy — Brand · Site · Agent-Layer in 10 Tagen",
  description:
    "Operator-led Studio für die Agent-Ära. Ein Operator, ein Festpreis, drei Auslieferungen — live in 10 Tagen. Vier Mal von 0 zur Kategorie. Heidelberg · Mannheim · Berlin · seit 2017.",
  openGraph: {
    title: "beuwy — Brand · Site · Agent-Layer in 10 Tagen",
    description:
      "Empfehlungen sind kein Vertrieb. Glück. — Wir bauen die Marke, die ein Agent versteht. Ein Operator, ein Festpreis, 10 Tage.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "beuwy — Brand · Site · Agent-Layer in 10 Tagen",
    description: "Operator-led Studio für die Agent-Ära.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}>
      <body className="grain min-h-[100dvh]">
        <div className="ambient-blob" aria-hidden />
        <Nav />
        <SmoothScroll />
        <SpotlightTracker />
        <main id="main" className="relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
