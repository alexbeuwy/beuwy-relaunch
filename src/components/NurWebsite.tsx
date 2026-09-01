"use client";

import { usePathname } from "next/navigation";

/**
 * Blendet Website-Rahmen (Nav, Footer) auf den internen Werkzeugseiten aus.
 * /os ist ein Dashboard, keine Verkaufsseite — Marketing-Footer und
 * heller Navigationsbalken haben dort nichts zu suchen.
 */
const INTERN = ["/os", "/intern"];

export function NurWebsite({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (INTERN.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
