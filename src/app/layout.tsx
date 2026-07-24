import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SpotlightTracker } from "@/components/SpotlightTracker";

/* Headline-Schnitt: Freiburg (lizenziert, self-hosted, Regular-only) */
const freiburg = localFont({
  src: "./fonts/freiburg.woff2",
  variable: "--font-freiburg",
  display: "swap",
  weight: "400",
});

/* Puff Balloon Bitmaps — Farb-Bitmapfont, subsettet auf 0-9,.%+€ und von
   36 MB auf 0,3 MB verkleinert. Nur als Akzent für einzelne Zahlen. */
const puff = localFont({
  src: "./fonts/puff-digits.woff2",
  variable: "--font-puff",
  display: "swap",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beuwy.com"),
  title: "beuwy — Digitale Vertriebssysteme für Finance & Real Estate",
  description:
    "beuwy baut das Vertriebssystem hinter wachsenden Finanz- und Immobilienunternehmen: Marke, Website, Werkzeuge, CRM-Anbindung und AI-Sichtbarkeit. Gebaut, nicht nur beraten — von Alexander Pütter.",
  openGraph: {
    title: "beuwy — Digitale Vertriebssysteme für Finance & Real Estate",
    description:
      "Der Kunde ruft Sie an — nicht umgekehrt. beuwy baut das Vertriebssystem dahinter: Anfragen holen, vorqualifizieren, ans CRM übergeben. Festpreis, live in Wochen.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "beuwy — Digitale Vertriebssysteme für Finance & Real Estate",
    description:
      "Der Kunde ruft Sie an — nicht umgekehrt. beuwy baut das Vertriebssystem dahinter: Anfragen holen, vorqualifizieren, ans CRM übergeben. Festpreis, live in Wochen.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable} ${freiburg.variable} ${puff.variable}`}>
      <body className="grain min-h-[100dvh]">
        <div className="ambient-blob" aria-hidden />
        <Nav />
        <SpotlightTracker />
        <main id="main" className="relative z-[2]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
