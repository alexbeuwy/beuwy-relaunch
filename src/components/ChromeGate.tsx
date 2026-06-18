"use client";

import { usePathname } from "next/navigation";

/**
 * Hides its children on paid-traffic / funnel routes (`/go/*`). Used to
 * remove the global Nav + Footer from focused VSL-style landing pages so the
 * only available actions are the in-page CTAs. Anywhere else the children
 * render normally.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/go/")) return null;
  return <>{children}</>;
}
