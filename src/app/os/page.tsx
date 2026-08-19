import type { Metadata } from "next";
import { BrandingOS } from "@/components/BrandingOS";

/**
 * Branding OS — internes KPI-Dashboard fürs Personal Branding
 * (Antigravity-Protokoll, docs/branding/). Nicht verlinkt, noindex.
 * v1: Daten bleiben im localStorage des Browsers (Key: beuwy-os-v1).
 */

export const metadata: Metadata = {
  title: "Branding OS — beuwy",
  robots: { index: false, follow: false },
};

export default function OsPage() {
  return <BrandingOS />;
}
