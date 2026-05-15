"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";

const links: { label: string; href: string }[] = [
  { label: "Methode", href: "/method" },
  { label: "Arbeit", href: "/work" },
  { label: "System", href: "/system" },
  { label: "Manifest", href: "/manifesto" },
  { label: "Audit", href: "/audit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10 h-[64px] flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-[28px]" aria-label="Hauptnavigation">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className="nav-link text-[14px] font-[510] tracking-[-0.005em] transition-colors"
                style={{ color: active ? "var(--ink-yellow)" : "var(--ink-muted)" }}
              >
                <span className="hover:text-[var(--ink-yellow)] transition-colors">
                  {l.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/anfrage"
            className="hidden sm:inline-flex btn-primary"
            style={{ height: 36, padding: "0 16px", fontSize: 13 }}
          >
            Brief schicken
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/anfrage"
            className="sm:hidden text-[13px] font-[510]"
            style={{ color: "var(--ink-yellow)" }}
          >
            Brief →
          </Link>
        </div>
      </div>
    </header>
  );
}
