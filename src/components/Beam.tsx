"use client";

import { ReactNode } from "react";
import { BorderBeam } from "border-beam";

/**
 * Marken-Preset für border-beam: warmer, ruhiger Lauf um Premium-Karten.
 * Bewusst gedrosselt (staticColors, niedrige strength) — SaaS-clean,
 * kein Jahrmarkt.
 */
export function Beam({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <BorderBeam
      colorVariant="sunset"
      theme="dark"
      size="md"
      duration={6}
      strength={0.45}
      staticColors
      className={className}
    >
      {children}
    </BorderBeam>
  );
}
