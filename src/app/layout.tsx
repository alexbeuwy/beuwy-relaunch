import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
  title: "beuwy — Marke ist kein Geschmack. Marke ist Umsatz.",
  description:
    "beuwy baut Marke, Anzeigen und Vertriebssystem als ein zusammenhängendes System — und verantwortet, was dabei herauskommt: Anfragen, Termine, Abschlüsse.",
  openGraph: {
    title: "beuwy — Marke ist kein Geschmack. Marke ist Umsatz.",
    description:
      "Marke, Anzeigen und Vertriebssystem als ein System, mit einem Verantwortlichen. Unternehmensberatung von Alexander Pütter.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "beuwy — Marke ist kein Geschmack. Marke ist Umsatz.",
    description:
      "Marke, Anzeigen und Vertriebssystem als ein System, mit einem Verantwortlichen. Unternehmensberatung von Alexander Pütter.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={cn(GeistMono.variable, helvena.variable, inter.variable, "font-sans")}>
      <body className="min-h-dvh">
        <Nav />
        <main id="main" className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
