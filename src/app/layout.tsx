import { TrackBeacon } from "@/components/TrackBeacon";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav, type NavTexte } from "@/components/Nav";
import { Footer, type FooterTexte } from "@/components/Footer";
import { NurWebsite } from "@/components/NurWebsite";
import { OrganisationLd } from "@/components/SchemaOrg";
import { cn } from "@/lib/utils";
import { getContent } from "@/lib/content";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // R11: Nav/Footer-Texte (mk.nav.*/mk.footer.*, src/lib/texte/rahmen.ts)
  // kommen aus dem Studio — layout.tsx ist Server-Komponente, liest
  // getContent() und reicht nur serialisierbare Props an die
  // Client-Komponenten Nav/Footer durch.
  const c = await getContent();
  const navTexte: NavTexte = {
    skip: c["mk.nav.skip"],
    punkt1: c["mk.nav.punkt1_label"],
    punkt2: c["mk.nav.punkt2_label"],
    punkt3: c["mk.nav.punkt3_label"],
    punkt4: c["mk.nav.punkt4_label"],
    punkt5: c["mk.nav.punkt5_label"],
    cta: c["mk.nav.cta"],
  };
  const footerTexte: FooterTexte = {
    intro: c["mk.footer.intro"],
    leistungenTitel: c["mk.footer.leistungen_titel"],
    leistungen: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => c[`mk.footer.leistungen${n}_label`]),
    wissenTitel: c["mk.footer.wissen_titel"],
    wissen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => c[`mk.footer.wissen${n}_label`]),
    kontaktTitel: c["mk.footer.kontakt_titel"],
    kontaktAnfrage: c["mk.footer.kontakt_anfrage"],
    kontaktEmail: c["mk.footer.kontakt_email"],
    kontaktImpressum: c["mk.footer.kontakt_impressum"],
    kontaktDatenschutz: c["mk.footer.kontakt_datenschutz"],
    copyrightVor: c["mk.footer.copyright_vor"],
    copyrightNach: c["mk.footer.copyright_nach"],
    claim: c["mk.footer.claim"],
  };

  return (
    <html lang="de" className={cn(GeistMono.variable, helvena.variable, "font-sans")}>
      <body className="min-h-dvh">
        {/* First-Party-Tracking (Einblick, R5) — cookielos, oeffentliche
            Seiten only (Blocklist im Client und in /api/track) */}
        <TrackBeacon />
        <OrganisationLd />
        <NurWebsite>
          <Nav texte={navTexte} />
        </NurWebsite>
        <main id="main" className="relative">{children}</main>
        <NurWebsite>
          <Footer texte={footerTexte} />
        </NurWebsite>
      </body>
    </html>
  );
}
