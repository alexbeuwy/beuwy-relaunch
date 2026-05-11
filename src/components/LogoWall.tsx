/**
 * LogoWall — typografische Marken-Repräsentation, weil wir keine Lizenz
 * für Kunden-Logo-Files haben (und ein Text-Marquee Cope ist).
 * Jede Marke bekommt eine eigene typografische Stimme — als hätte sie
 * ein Logotype-Pass durch beuwy bekommen.
 */

type Brand = {
  name: string;
  italic?: boolean;
  weight?: 400 | 500;
  family?: "display" | "body" | "mono";
  size?: number;
  letter?: string;
  sub?: string;
};

const brands: Brand[] = [
  { name: "Vision", family: "display", weight: 400, italic: true, sub: "Real Estate" },
  { name: "Königswege", family: "display", weight: 400, sub: "Finance · DE" },
  { name: "acta", family: "display", weight: 400, italic: true, sub: "Real Estate" },
  { name: "PURELEI", family: "body", weight: 500, letter: "0.18em", sub: "DTC · 1M+" },
  { name: "hellogetsafe", family: "body", weight: 400, sub: "Insurtech" },
  { name: "Snocks", family: "body", weight: 500, italic: true, sub: "DTC · Apparel" },
  { name: "KKR", family: "display", weight: 400, letter: "0.06em", sub: "Joint Venture" },
  { name: "Bosch", family: "body", weight: 500, sub: "Pre-2017" },
  { name: "Continental", family: "body", weight: 400, italic: true, sub: "Pre-2017" },
  { name: "Michelin", family: "display", weight: 400, sub: "Pre-2017" },
];

export function LogoWall() {
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        style={{ borderBottom: "none" }}
      >
        {brands.map((b, i) => {
          const family =
            b.family === "display"
              ? "var(--font-fraunces)"
              : b.family === "mono"
              ? "var(--font-mono)"
              : "var(--font-body)";
          // border edges to make a real grid
          const col = i % 5;
          const row = Math.floor(i / 5);
          return (
            <div
              key={b.name}
              className="flex flex-col items-center justify-center text-center px-3 py-8 md:py-10"
              style={{
                borderRight:
                  col < 4 ? "1px solid var(--line-subtle)" : "none",
                borderBottom:
                  row === 0 ? "1px solid var(--line-subtle)" : "none",
                color: "var(--ink-cream)",
              }}
            >
              <span
                style={{
                  fontFamily: family,
                  fontStyle: b.italic ? "italic" : "normal",
                  fontWeight: b.weight ?? 400,
                  fontSize: b.size ?? 22,
                  letterSpacing: b.letter ?? "-0.015em",
                  color: "var(--ink-cream)",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {b.name}
              </span>
              {b.sub && (
                <span
                  className="mt-2"
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  {b.sub}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--line-subtle)" }}
      >
        <span
          style={{
            color: "var(--ink-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
          }}
        >
          17 Jahre · 10 Marken · €300M+ kumulative Outcomes
        </span>
        <span className="chip">
          <span className="dot" />
          aktualisiert · Q2/2026
        </span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const items = [
    {
      quote:
        "beuwy hat das Brand-System gebaut, das unseren Skalierungsweg von 170 auf 2.240 Partner getragen hat. Ohne diese Arbeit wären wir heute nicht in der cash-online Top-10.",
      who: "Geschäftsführung",
      where: "Königswege",
      year: "2017 → 2024",
      initials: "KW",
    },
    {
      quote:
        "Die Brand stand vor dem KKR-Deal. Wir wären nie als institutioneller Kapital-Match in dem Pricing-Bereich erschienen, wenn die visuelle und narrative Substanz nicht da gewesen wäre.",
      who: "Co-Founder",
      where: "Vision Real Estate",
      year: "2019 → 2023",
      initials: "VR",
    },
    {
      quote:
        "Drei Geschäftspartner, ein Brand-System — und Instagram-Funnel, die in der Zinskrise tatsächlich €48M Volumen geliefert haben. Beuwy denkt wie ein Operator, nicht wie eine Agentur.",
      who: "Geschäftsführung",
      where: "acta",
      year: "2023 → live",
      initials: "AC",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {items.map((t) => (
        <div
          key={t.where}
          className="card h-full flex flex-col"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--line-subtle)",
          }}
        >
          <span
            style={{
              color: "var(--ink-yellow)",
              fontFamily: "var(--font-fraunces)",
              fontSize: 36,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            &ldquo;
          </span>
          <p
            className="mt-3 font-display flex-1"
            style={{
              fontSize: 18,
              letterSpacing: "-0.012em",
              color: "var(--ink-yellow)",
              lineHeight: 1.35,
            }}
          >
            {t.quote}
          </p>
          <div
            className="flex items-center gap-3 mt-6 pt-5"
            style={{ borderTop: "1px solid var(--line-subtle)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-display"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--ink-yellow)",
                fontSize: 14,
                letterSpacing: "-0.02em",
              }}
            >
              {t.initials}
            </div>
            <div>
              <p style={{ color: "var(--ink-cream)", fontSize: 13, fontWeight: 510 }}>
                {t.who} · {t.where}
              </p>
              <p
                style={{
                  color: "var(--ink-dim)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.04em",
                }}
              >
                {t.year}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
