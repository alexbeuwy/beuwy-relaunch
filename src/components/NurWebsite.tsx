"use client";

import { usePathname } from "next/navigation";

/**
 * Blendet Website-Rahmen (Nav, Footer) auf den internen Werkzeugseiten aus.
 * /os ist ein Dashboard, keine Verkaufsseite — Marketing-Footer und
 * heller Navigationsbalken haben dort nichts zu suchen. /system ist die
 * schlanke Frontseite mit eigenem Mini-Rahmen — ein Claim, ein CTA, kein
 * Menü, das vom Video wegführt.
 */
const INTERN = ["/os", "/intern", "/system"];

export function NurWebsite({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (INTERN.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
