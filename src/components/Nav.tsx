"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/* Drei Anker, ein CTA (Wireframe 00). Kein Preise-Punkt, kein Hamburger —
   mobil bleiben Logo und Schaltfläche. */
const links: { label: string; href: string }[] = [
  { label: "Referenzen", href: "/#referenzen" },
  { label: "System", href: "/#system" },
  { label: "Ihr Ziel", href: "/#ziel" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onTermin = pathname === "/termin";
  /* Nur auf der Startseite startet die Nav transparent im Ultramarin-Himmel;
     überall sonst (und nach 8px Scroll) steht sie auf Papier. */
  const onSky = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-nav
      data-scrolled={scrolled ? "true" : "false"}
      data-on-sky={onSky ? "true" : "false"}
      className="fixed top-0 inset-x-0 z-50"
    >
      <a href="#main" className="skip-link">
        Zum Inhalt springen
      </a>
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 h-[64px] flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-[28px]" aria-label="Hauptnavigation">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link t-small">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Kein Selbstlink: auf /termin führt der CTA zum Live-Check */}
        {onTermin ? (
          <Button size="sm" variant="secondary" render={<Link href="/#check" />}>
            Live-Check
            <span aria-hidden>→</span>
          </Button>
        ) : (
          <Button size="sm" variant="secondary" render={<Link href="/termin" />}>
            Systemgespräch
            <span aria-hidden>→</span>
          </Button>
        )}
      </div>
    </header>
  );
}
