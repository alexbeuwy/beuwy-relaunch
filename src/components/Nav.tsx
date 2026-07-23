"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

const links: { label: string; href: string }[] = [
  { label: "Referenzen", href: "/#proof" },
  { label: "System", href: "/#system" },
  { label: "Prozess", href: "/#prozess" },
  { label: "FAQ", href: "/#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
      className="fixed top-0 inset-x-0 z-50"
    >
      <a href="#main" className="skip-link">
        Zum Inhalt springen
      </a>
      <div className="mx-auto max-w-[1120px] px-6 lg:px-10 h-[64px] flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-[28px]" aria-label="Hauptnavigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link t-small transition-colors hover:text-[var(--ink-cream)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/termin" className="btn-primary btn-sm">
          Systemgespräch
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
