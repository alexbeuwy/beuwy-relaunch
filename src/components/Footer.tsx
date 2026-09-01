import Link from "next/link";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

/* Light Makler Style: reines Weiß, eine Haarlinie oben — kein
   Hügelband, kein Ultramarin mehr. Vier Spalten tragen die neue
   Seitenarchitektur (BRIEF §6); Impressum/Datenschutz bleiben. */
const leistungen: { label: string; href: string }[] = [
  { label: "Website für Makler", href: "/website-fuer-immobilienmakler" },
  { label: "Leadgenerierung", href: "/leadgenerierung-immobilienmakler" },
  { label: "onOffice-Websites", href: "/onoffice-website" },
  { label: "SEO für Makler", href: "/seo-fuer-immobilienmakler" },
  { label: "GEO: Sichtbar in KI-Suche", href: "/geo-fuer-immobilienmakler" },
  { label: "Social Media für Makler", href: "/social-media-immobilienmakler" },
  { label: "E-Mail-Marketing", href: "/email-marketing-immobilienmakler" },
  { label: "Über beuwy", href: "/ueber-uns" },
];

const wissen: { label: string; href: string }[] = [
  { label: "Immobilienmarketing-Hub", href: "/immobilienmarketing" },
  { label: "Die 30 besten Maklerwebsites", href: "/beste-maklerwebsites" },
  { label: "Was kostet eine Maklerwebsite", href: "/maklerwebsite-kosten" },
  { label: "KI für Immobilienmakler", href: "/ki-fuer-immobilienmakler" },
  { label: "Immobilienmarketing-Agentur?", href: "/immobilienmarketing-agentur" },
  { label: "Marketing für Projektentwickler", href: "/marketing-projektentwickler" },
  { label: "Marketing für Bauträger", href: "/marketing-bautraeger" },
  { label: "Marketing für Immobilienvertriebe", href: "/marketing-immobilienvertrieb" },
  { label: "Kapitalanlage-Immobilien", href: "/marketing-kapitalanlage-immobilien" },
  { label: "Alle Ratgeber im Überblick", href: "/wissen" },
  { label: "Rechner & Tools", href: "/tools" },
];

export function Footer() {
  const jahr = new Date().getFullYear();

  return (
    <footer className="border-t border-line-subtle bg-bg-base">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-w-[320px] space-y-4">
            <Logo height={28} />
            <p className="t-small">
              Unternehmensberatung für Immobilienunternehmen, die ihren
              Vorsprung ausbauen wollen — im gesamten DACH-Raum.
            </p>
          </div>

          <FooterCol title="Leistungen">
            {leistungen.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Wissen">
            {wissen.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Kontakt">
            <FooterLink href="/anfrage">Zusammenarbeit anfragen</FooterLink>
            <FooterLink href="mailto:ap@beuwy.com">ap@beuwy.com</FooterLink>
            <FooterLink href="/impressum">Impressum</FooterLink>
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line-subtle pt-6 md:flex-row md:items-center">
          <p className="t-data">
            © {jahr} beuwy · Alexander Pütter
          </p>
          <p className="t-data">Marke · Website · Automatisierung</p>
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
          "transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream",
          "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)"
        )}
      >
        {children}
      </Link>
    </li>
  );
}
