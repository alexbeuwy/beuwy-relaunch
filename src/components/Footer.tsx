import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative z-[2] mt-24 border-t border-line-subtle">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="space-y-4 max-w-[420px]">
            <Logo height={32} />
            <p className="t-small">
              beuwy baut digitale Vertriebssysteme für Finanz- und
              Immobilienunternehmen. Ludwigshafen · Mannheim · Berlin.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <FooterCol title="Referenzen">
              <FooterLink href="https://riegel.vercel.app" external>
                Riegel Immobilien
              </FooterLink>
              <FooterLink href="https://saadi-ag.vercel.app" external>
                SAADI AG
              </FooterLink>
            </FooterCol>
            <FooterCol title="Kontakt">
              <FooterLink href="mailto:ap@beuwy.com">ap@beuwy.com</FooterLink>
              <FooterLink href="/#kontakt">Systemgespräch</FooterLink>
            </FooterCol>
            <FooterCol title="Rechtliches">
              <FooterLink href="/impressum">Impressum</FooterLink>
              <FooterLink href="/datenschutz">Datenschutz</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-line-subtle">
          <p className="t-data">© beuwy · Alexander Pütter · seit 2017</p>
          <p className="t-data">Made in Ludwigshafen</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 min-w-[140px]">
      <p className="t-label">{title}</p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className="t-small is-muted transition-colors hover:text-[var(--ink-cream)]"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    </li>
  );
}
