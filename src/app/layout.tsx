import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SpotlightTracker } from "@/components/SpotlightTracker";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

/* Body-Schrift: Inter (Alex-Vorgabe); Headline bleibt Helvena */
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });


/* Headline-Schnitt: Helvena (lizenziert, self-hosted, Variable 200–900) */
const helvena = localFont({
  src: "./fonts/helvena.woff2",
  variable: "--font-helvena",
  display: "swap",
  weight: "200 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beuwy.com"),
  title: "beuwy — Premium-Marken und Vertriebssysteme für große Abschlüsse",
  description:
    "beuwy baut die Marke, die zu Ihren Preisen passt, und das System dahinter: Anzeigen, CRM, Telefon-Setup, wöchentliche Auswertung. Festpreis, gebaut von Alexander Pütter.",
  openGraph: {
    title: "beuwy — Premium-Marken und Vertriebssysteme für große Abschlüsse",
    description:
      "Ein Abschluss bringt Ihnen 10.000 €. Wirkt Ihr Auftritt genauso teuer? beuwy baut Marke und Vertriebssystem aus einer Hand — zum Festpreis.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "beuwy — Premium-Marken und Vertriebssysteme für große Abschlüsse",
    description:
      "Ein Abschluss bringt Ihnen 10.000 €. Wirkt Ihr Auftritt genauso teuer? beuwy baut Marke und Vertriebssystem aus einer Hand — zum Festpreis.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={cn(GeistMono.variable, helvena.variable, inter.variable, "font-sans")}>
      <body className="grain min-h-dvh">
        <div className="ambient-blob" aria-hidden />
        <Nav />
        <SpotlightTracker />
        <main id="main" className="relative z-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
