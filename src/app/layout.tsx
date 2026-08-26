import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NurWebsite } from "@/components/NurWebsite";
import { OrganisationLd } from "@/components/SchemaOrg";
import { cn } from "@/lib/utils";

/* Eine Schrift für alles: Helvena (lizenziert, self-hosted,
   Variable 200–900) — Headlines UND Fließtext. GeistMono nur für
   tabellarische Zahlen. Die frühere Zweitschrift ist entfernt. */
const helvena = localFont({
  src: "./fonts/helvena.woff2",
  variable: "--font-helvena",
  display: "swap",
  weight: "200 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beuwy.com"),
  title: "beuwy — Immobilienmarketing für führende Makler.",
  description:
    "Premium-Boutique für Immobilienmakler, die ihren Vorsprung ausbauen: Marke, Website, E-Mail-Marketing und Automatisierung — done for you, in Wochen statt Quartalen.",
  openGraph: {
    title: "beuwy — Immobilienmarketing für führende Makler.",
    description:
      "Marke, Website und Automatisierung für Immobilienmakler, die führen statt folgen. Geliefert in Wochen, nicht Quartalen.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "beuwy — Immobilienmarketing für führende Makler.",
    description:
      "Marke, Website und Automatisierung für Immobilienmakler, die führen statt folgen.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={cn(GeistMono.variable, helvena.variable, "font-sans")}>
      <body className="min-h-dvh">
        <OrganisationLd />
        <NurWebsite>
          <Nav />
        </NurWebsite>
        <main id="main" className="relative">{children}</main>
        <NurWebsite>
          <Footer />
        </NurWebsite>
      </body>
    </html>
  );
}
