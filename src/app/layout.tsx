import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SpotlightTracker } from "@/components/SpotlightTracker";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
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
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}>
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
