/**
 * Studio-Bereichs-Registry (Leaf U2, 27.08 — "Studio sinnvoll gestalten").
 *
 * Ordnet die realen DEFAULTS-Keys aus src/lib/content.ts den drei
 * bekannten Bereichen der Website zu (Startseite/mk., Rechner & Tools/
 * tools., CRM-Konsole/intern.) und fasst innerhalb jedes Bereichs
 * verwandte Keys zu Untergruppen zusammen — bei der CRM-Konsole exakt
 * eine Untergruppe je Datei-Präfix (aufgaben/pipeline/kontakte/kunden/
 * flows/einblick/shell), bei der Startseite eine je mk.-Sektion.
 *
 * Alles, was zu keinem bekannten Präfix passt (die Vor-Relaunch-Keys wie
 * hero, dream, diagnose … sowie termin, video, abmelden), fällt
 * dynamisch in den Sammel-Bereich "Weitere Texte" — kein Deploy nötig,
 * wenn im Code ein neuer Key-Präfix entsteht, er taucht dort automatisch
 * auf, statt im Studio zu verschwinden.
 */

export type Bereich = {
  /** Key-Präfix inkl. Trenner, z. B. "mk." — "" markiert den Sammel-Bereich. */
  praefix: string;
  titel: string;
  /** lucide-react-Komponentenname, im Editor über eine Map aufgelöst. */
  icon: string;
  /** Route für den "Seite ansehen"-iframe; leer = keine Live-Vorschau. */
  route: string;
  /** Pfad unter public/studio-thumbs/, wenn vorhanden. */
  thumb?: string;
};

export type Feldgruppe = { titel: string; keys: string[] };

export type BereichMitFeldern = Bereich & {
  keys: string[];
  gruppen: Feldgruppe[];
};

/** Die drei bekannten Bereiche — Reihenfolge = Reihenfolge in der Navi. */
export const BEREICHE: Bereich[] = [
  { praefix: "mk.", titel: "Startseite", icon: "Home", route: "/", thumb: "/studio-thumbs/start.webp" },
  {
    praefix: "tools.",
    titel: "Rechner & Tools",
    icon: "Calculator",
    route: "/tools/verkaufspreisrechner",
    thumb: "/studio-thumbs/tools.webp",
  },
  {
    praefix: "intern.",
    titel: "CRM-Konsole",
    icon: "LayoutDashboard",
    route: "/intern",
    thumb: "/studio-thumbs/intern.webp",
  },
];

/** Sammel-Bereich für alles ohne bekannten Präfix — Fallback, kein Deploy nötig. */
export const WEITERE_TEXTE: Bereich = {
  praefix: "",
  titel: "Weitere Texte",
  icon: "Archive",
  route: "",
};

/** Label-Vorspann, den FIELD_LABELS je Bereich voranstellt (siehe content.ts). */
const VORSPANN: Record<string, string> = {
  "mk.": "Makler",
  "tools.": "Tools",
  "intern.": "Intern",
};

/** Menschliche Namen für bekannte Untergruppen-Segmente — reine Kosmetik. */
const GRUPPEN_NAMEN: Record<string, string> = {
  hero: "Hero",
  trust: "Vertrauen",
  stats: "Kennzahlen",
  vsl: "VSL-Video",
  integrationen: "Integrationen",
  pm: "Performance-Grafik",
  podcast: "Podcast",
  beweis: "Beweis",
  schleuse: "Lead-Wall",
  aufgaben: "Aufgaben",
  pipeline: "Pipeline",
  kontakte: "Kontakte",
  kunden: "Kunden",
  flows: "Flows",
  einblick: "Einblick",
  shell: "Dashboard",
};

function gruppenName(segment: string): string {
  return GRUPPEN_NAMEN[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}

/** Segment direkt nach dem Bereichs-Präfix, bis zum nächsten "." oder "_". */
function segmentFuer(key: string, praefix: string): string {
  const rest = praefix && key.startsWith(praefix) ? key.slice(praefix.length) : key;
  const dot = rest.indexOf(".");
  const underscore = rest.indexOf("_");
  const kandidaten = [dot, underscore].filter((i) => i >= 0);
  const cut = kandidaten.length > 0 ? Math.min(...kandidaten) : -1;
  return cut >= 0 ? rest.slice(0, cut) : rest;
}

function gruppieren(keys: string[], praefix: string): Feldgruppe[] {
  const map = new Map<string, string[]>();
  for (const key of keys) {
    const titel = gruppenName(segmentFuer(key, praefix));
    const liste = map.get(titel);
    if (liste) liste.push(key);
    else map.set(titel, [key]);
  }
  return Array.from(map.entries()).map(([titel, keys]) => ({ titel, keys }));
}

/**
 * Baut die vollständige Bereichs-Liste (inkl. "Weitere Texte") aus den
 * echten DEFAULTS-Keys — jeder Key landet in genau einem Bereich, in
 * DEFAULTS-Reihenfolge sortiert.
 */
export function baueBereiche(defaults: Record<string, string>): BereichMitFeldern[] {
  const alleKeys = Object.keys(defaults);
  const zugeordnet = new Set<string>();

  const bekannte = BEREICHE.map((bereich) => {
    const keys = alleKeys.filter((k) => k.startsWith(bereich.praefix));
    keys.forEach((k) => zugeordnet.add(k));
    return { ...bereich, keys, gruppen: gruppieren(keys, bereich.praefix) };
  });

  const rest = alleKeys.filter((k) => !zugeordnet.has(k));
  if (rest.length === 0) return bekannte;

  return [...bekannte, { ...WEITERE_TEXTE, keys: rest, gruppen: gruppieren(rest, "") }];
}

/** FIELD_LABELS-Text ohne den Bereichs-Vorspann ("Makler · " etc.) fürs Karten-Label. */
export function kartenLabel(bereich: Bereich, key: string, labels: Record<string, string>): string {
  const label = labels[key] ?? key;
  const vorspann = VORSPANN[bereich.praefix];
  if (vorspann && label.startsWith(`${vorspann} · `)) {
    return label.slice(vorspann.length + 3);
  }
  return label;
}
