/**
 * Icon-Subset für den Bewertungs-Wizard (Verkaufspreisrechner-Port).
 *
 * Ersatz für Riegels globale `components/icon.tsx` (dort ~40 Glyphen für die
 * ganze Seite) — hier nur die Pfade, die in calculator/report-request/consent
 * tatsächlich verwendet werden. Pfaddaten 1:1 aus dem Original übernommen
 * (24er-Raster, runde Enden), damit die Bildsprache gleich bleibt; nur Größe/
 * Strichstärke laufen jetzt über beuwy-Defaults statt Riegel-Tokens.
 */

const PATHS = {
  pin: (
    <>
      <path d="M12 21c4-4 7-7.2 7-11a7 7 0 1 0-14 0c0 3.8 3 7 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5 9 9M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  euro: <path d="M17 7a6 6 0 1 0 0 10M4 10h7M4 14h6" />,
  printer: (
    <>
      <path d="M6.5 8V3.5h11V8" />
      <path d="M6.5 17.5h-2a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M7 14.5h10v6H7z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4M8 13h3M8 17h6" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M8 12h8M8 16h6" />
    </>
  ),
  chart: <path d="M4 19V5m0 14h16M8 16l3-4 3 2 4-6" />,
  users: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20c0-3 2.7-5 6-5s6 2 6 5M16 5.5a3 3 0 0 1 0 5.8M17 15c2.4.4 4 2.2 4 5" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 18l9 5 9-5" />,
  trend: <path d="M4 17 10 11l3 3 7-7M16 7h4v4" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 5-4 1 2-5 4-1Z" />
    </>
  ),
  shield: <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6l-7-3ZM9 12l2 2 4-4" />,
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3M8 18h4" />
    </>
  ),
  check: <path d="m5 12 4 4 10-10" />,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 24,
  weight = 1.5,
  className = "",
  title,
}: {
  name: IconName;
  size?: number;
  /** Strichstärke (Default 1.5 — feine Linie, wie im Original). */
  weight?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
