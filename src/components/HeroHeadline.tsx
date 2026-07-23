"use client";

import { useEffect, useState } from "react";
import { rich } from "./RichText";

type Variant = { title: string; subtitle: string };

/**
 * Hero-Varianten ohne dynamisches Rendering: Die Seite bleibt statisch,
 * ?via=ad / ?via=video tauschen Headline+Subline clientseitig
 * (Paid-Traffic bzw. Cold-Outreach-Besucher, siehe docs/CONVERSION.md).
 */
export function HeroHeadline({ variants }: { variants: Record<string, Variant> }) {
  const [active, setActive] = useState("default");

  useEffect(() => {
    const via = new URLSearchParams(window.location.search).get("via");
    if (via && variants[via]) setActive(via);
  }, [variants]);

  const v = variants[active] ?? variants.default;

  return (
    <>
      <h1 className="t-display mt-4">{rich(v.title)}</h1>
      <p className="t-body-lg mt-5 max-w-[520px]">{rich(v.subtitle)}</p>
    </>
  );
}
