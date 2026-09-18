import Link from "next/link";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { RAHMEN_DEFAULTS } from "@/lib/texte/rahmen";

/* Light Makler Style: reines Weiß, eine Haarlinie oben — kein
   Hügelband, kein Ultramarin mehr. Vier Spalten tragen die neue // studio:ok
   Seitenarchitektur (BRIEF §6); Impressum/Datenschutz bleiben. */ // studio:ok

/* R11: Labels kommen als Studio-Key (mk.footer.*) über das `texte`-Prop
   aus layout.tsx. hrefs bleiben Code — nur die Anzeigetexte sind
   Studio-editierbar. Die Defaults hier sind der Fallback, falls ein // studio:ok
   fremder Aufrufer Footer ohne Prop einbindet. */
export type FooterTexte = {
  intro: string;
  leistungenTitel: string;
  leistungen: string[];
  wissenTitel: string;
  wissen: string[];
  kontaktTitel: string;
  kontaktAnfrage: string;
  kontaktEmail: string;
  kontaktImpressum: string;
  kontaktDatenschutz: string;
  copyrightVor: string;
  copyrightNach: string;
  claim: string;
};

const FOOTER_TEXTE_STANDARD: FooterTexte = {
  intro: RAHMEN_DEFAULTS["mk.footer.intro"],
  leistungenTitel: RAHMEN_DEFAULTS["mk.footer.leistungen_titel"], // studio:ok
  leistungen: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => RAHMEN_DEFAULTS[`mk.footer.leistungen${n}_label`]), // studio:ok
  wissenTitel: RAHMEN_DEFAULTS["mk.footer.wissen_titel"],
  wissen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => RAHMEN_DEFAULTS[`mk.footer.wissen${n}_label`]), // studio:ok
  kontaktTitel: RAHMEN_DEFAULTS["mk.footer.kontakt_titel"],
  kontaktAnfrage: RAHMEN_DEFAULTS["mk.footer.kontakt_anfrage"], // studio:ok
  kontaktEmail: RAHMEN_DEFAULTS["mk.footer.kontakt_email"],
  kontaktImpressum: RAHMEN_DEFAULTS["mk.footer.kontakt_impressum"], // studio:ok
  kontaktDatenschutz: RAHMEN_DEFAULTS["mk.footer.kontakt_datenschutz"], // studio:ok
  copyrightVor: RAHMEN_DEFAULTS["mk.footer.copyright_vor"],
  copyrightNach: RAHMEN_DEFAULTS["mk.footer.copyright_nach"], // studio:ok
  claim: RAHMEN_DEFAULTS["mk.footer.claim"],
};

const LEISTUNGEN_HREFS = [
  "/website-fuer-immobilienmakler",
  "/leadgenerierung-immobilienmakler",
  "/onoffice-website",
  "/seo-fuer-immobilienmakler",
  "/geo-fuer-immobilienmakler",
  "/social-media-immobilienmakler",
  "/email-marketing-immobilienmakler",
  "/ueber-uns",
];

const WISSEN_HREFS = [
  "/immobilienmarketing",
  "/beste-maklerwebsites",
  "/maklerwebsite-kosten",
  "/ki-fuer-immobilienmakler",
  "/immobilienmarketing-agentur",
  "/marketing-projektentwickler",
  "/marketing-bautraeger",
  "/marketing-immobilienvertrieb",
  "/marketing-kapitalanlage-immobilien",
  "/wissen",
  "/tools",
];

export function Footer({ texte }: { texte?: Partial<FooterTexte> }) {
  const t = { ...FOOTER_TEXTE_STANDARD, ...texte };
  const leistungen = LEISTUNGEN_HREFS.map((href, i) => ({ href, label: t.leistungen[i] }));
  const wissen = WISSEN_HREFS.map((href, i) => ({ href, label: t.wissen[i] }));
  const jahr = new Date().getFullYear();

  return (
    <footer className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-w-[320px] space-y-4">
            <Logo height={28} />
            <p className="t-small">{t.intro}</p>
          </div>

          <FooterCol title={t.leistungenTitel}>
            {leistungen.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={t.wissenTitel}>
            {wissen.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={t.kontaktTitel}>
            <FooterLink href="/anfrage">{t.kontaktAnfrage}</FooterLink>
            <FooterLink href="mailto:ap@beuwy.com">{t.kontaktEmail}</FooterLink>
            <FooterLink href="/impressum">{t.kontaktImpressum}</FooterLink>
            <FooterLink href="/datenschutz">{t.kontaktDatenschutz}</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line-subtle pt-6 md:flex-row md:items-center">
          <p className="t-data">
            {t.copyrightVor} {jahr} {t.copyrightNach}
          </p>
          <p className="t-data">{t.claim}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3.5">
      <p className="t-label">{title}</p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "t-small inline-block",
          "transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream", // studio:ok
          "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)" // studio:ok
        )}
      >
        {children}
      </Link>
    </li>
  );
}
