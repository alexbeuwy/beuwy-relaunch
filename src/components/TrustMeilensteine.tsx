import { LogoSlot, MARKEN_SLUGS, slugifyMarke } from "./MaklerElemente";

/**
 * TrustMeilensteine — der „große Dinger"-Beweisblock (Alex, 26.08):
 * drei Firmen-Meilensteine als Stat-Kacheln plus eine Kundenlogo-Zeile.
 *
 * Bewusst KEIN Chart: 1.450 Wohneinheiten, 2.300 Partner und 40 Mio. €
 * teilen keine Skala — Balken nebeneinander wären eine Scheinordnung
 * (dataviz-Anti-Pattern). Die richtige Form für inkommensurable
 * Headline-Zahlen ist die Stat-Kachel: Zahl groß (tnum, Gold-als-Text
 * wie im Kennzahlenband), Einordnung klein, ein Story-Satz. Keine
 * Personen, nur Firmen — kein Personenkult.
 *
 * Studio-Keys: mk.beweis.label · mk.beweis.kacheln
 * (Name~Wert~Kontext~Story|…) · mk.beweis.kunden_label ·
 * mk.beweis.kunden (Pipe-Liste, Logos über public/logos/<slug>.svg).
 */
export function TrustMeilensteine({ c }: { c: Record<string, string> }) {
  const kacheln = (c["mk.beweis.kacheln"] ?? "")
    .split("|")
    .map((roh) => {
      const [name, wert, kontext, story] = roh.split("~").map((t) => t.trim());
      return { name, wert, kontext, story };
    })
    .filter((k) => k.name && k.wert);

  const kunden = (c["mk.beweis.kunden"] ?? "")
    .split("|")
    .map((n) => n.trim())
    .filter(Boolean);

  if (kacheln.length === 0) return null;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {kacheln.map((k) => (
          <div
            key={k.name}
            className="flex h-full flex-col rounded-[28px] border border-line-subtle bg-bg-base px-7 py-8"
          >
            {/* Logo statt Textlabel (Alex, 26.08) — Fallback bleibt die Wortmarke */}
            <span className="flex h-6 items-center">
              <LogoSlot
                name={k.name}
                slug={MARKEN_SLUGS[k.name] ?? slugifyMarke(k.name)}
                hoehe={k.name === "RIEGEL Immobilien" ? 24 : 20}
              />
            </span>
            <p className="mt-4 font-display text-[44px] font-bold leading-none tracking-[-0.02em] text-ink-cream tnum lg:text-[52px]">
              {k.wert}
            </p>
            <p className="mt-2.5 text-[13.5px] font-medium leading-snug text-ink-cream">
              {k.kontext}
            </p>
            <p className="mt-4 border-t border-line-subtle pt-4 text-[14px] leading-[1.6] text-ink-muted">
              {k.story}
            </p>
          </div>
        ))}
      </div>

      {kunden.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-line-subtle pt-8">
          <p className="t-label !text-[10.5px]">{c["mk.beweis.kunden_label"]}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {kunden.map((name) => {
              const slug = MARKEN_SLUGS[name] ?? slugifyMarke(name);
              // RIEGEL ist eine kompakte Zweizeiler-Marke — braucht mehr
              // Höhe als die langen Wortmarken, sonst wirkt sie winzig.
              const hoehe = slug === "riegel" ? 32 : 20;
              return <LogoSlot key={name} name={name} slug={slug} hoehe={hoehe} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
