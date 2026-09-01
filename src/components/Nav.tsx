"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

/* Light Makler Style: die Nav steht von Anfang an auf Weiß — kein
   Himmel-Zustand mehr. Nach 8px Scroll bekommt sie eine Haarlinie und
   etwas Deckkraft samt Weichzeichner, damit Inhalt beim Scrollen nicht
   nahtlos durchscheint. Drei Anker, ein CTA — bewusst reduziert, kein
   Hamburger, mobil bleiben nur Logo und Schaltfläche. */
const links: { label: string; href: string }[] = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Ergebnisse", href: "/#ergebnisse" },
  { label: "Tools", href: "/tools" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Wissen", href: "/immobilienmarketing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [eingeloggt, setEingeloggt] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Nav ist eine Client-Komponente — sie kann das httpOnly-Sitzungscookie
     "konto_auth" (src/lib/konto-auth.ts) serverseitig gar nicht lesen, ohne
     den Login-Zustand als Prop durchs Root-Layout zu reichen. Das Root-
     Layout (src/app/layout.tsx) liegt außerhalb der für dieses Leaf
     zugewiesenen Dateien, deshalb die kleinste saubere Alternative: beim
     Login setzt konto-auth.ts zusätzlich ein reines Anzeige-Cookie
     "konto_da=1" — nicht httpOnly, ohne Signatur oder Identität, dient nur
     dazu, hier den Akzent-Punkt am Konto-Icon zu zeigen. Anfangszustand
     bleibt false (kein Hydration-Mismatch), erst nach dem Mount wird
     document.cookie gelesen — gleiches Muster wie oben bei "scrolled". */
  useEffect(() => {
    setEingeloggt(document.cookie.split("; ").includes("konto_da=1"));
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "fixed top-0 inset-x-0 z-50 border-b",
        "transition-[background-color,border-color,backdrop-filter] duration-(--duration-fast) ease-(--ease-smooth-out)",
        scrolled
          ? "bg-bg-base/90 border-line-subtle backdrop-blur-md"
          : "bg-bg-base border-transparent"
      )}
    >
      <a href="#main" className="skip-link">
        Zum Inhalt springen
      </a>

      <div className="mx-auto grid h-16 max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10">
        <div className="flex items-center">
          <Logo />
        </div>

        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Hauptnavigation"
        >
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/anfrage"
            className={cn(
              "group inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-akzent",
              "px-3.5 py-2 text-[12px] leading-[1.55] font-medium text-ink-cream",
              "sm:gap-1.5 sm:px-5 sm:py-2.5 sm:text-[13px]",
              "transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-akzent-hover",
              "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)"
            )}
          >
            Zusammenarbeit anfragen
            <RiArrowRightUpLine
              aria-hidden="true"
              className="size-3.5 shrink-0 transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4"
            />
          </Link>
          <KontoIcon eingeloggt={eingeloggt} />
        </div>
      </div>
    </header>
  );
}

/* Dezentes Konto-Icon rechts neben dem CTA (Person im Kreis, 32px) —
   UX-Referenz Riegel (site-header.tsx AccountLink), hier ohne fremde
   Icon-Bibliothek: reines Inline-SVG-Subset. Eingeloggt = gefüllter
   Akzent-Punkt oben rechts am Icon, sonst nur der ruhige Kreis. Bleibt auf
   allen Breiten sichtbar, auch mobil — kein hidden/md:flex. */
function KontoIcon({ eingeloggt }: { eingeloggt: boolean }) {
  return (
    <Link
      href="/konto"
      aria-label={eingeloggt ? "Ihr Konto (angemeldet)" : "Konto / Anmelden"}
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full border border-line-subtle text-ink-muted",
        "transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:border-line-medium hover:text-ink-cream",
        "outline-offset-2 focus-visible:outline-2 focus-visible:outline-(--ring)"
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
        <circle cx="12" cy="8.5" r="3.25" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M4.75 19.25c1.35-3.55 4.05-5.35 7.25-5.35s5.9 1.8 7.25 5.35"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      {eingeloggt && (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-akzent ring-2 ring-white"
        />
      )}
    </Link>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center text-[13px] leading-[1.55] text-ink-muted",
        "transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:text-ink-cream",
        "outline-offset-4 focus-visible:outline-2 focus-visible:outline-(--ring)"
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-ink-cream",
          "transition-transform duration-(--duration-quick) ease-(--ease-smooth-out)",
          "group-hover:scale-x-100 group-focus-visible:scale-x-100"
        )}
      />
    </Link>
  );
}
