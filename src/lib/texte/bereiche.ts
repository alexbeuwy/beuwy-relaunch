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

import { SEITEN_MANIFEST } from "./seiten";

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

/** Eine Unterseite im Bereich „Unterseiten": eigene Route, eigene Gruppen. */
export type SeiteMitFeldern = { slug: string; titel: string; route: string; keys: string[]; gruppen: Feldgruppe[] };

export type BereichMitFeldern = Bereich & {
  keys: string[];
  gruppen: Feldgruppe[];
  /** Nur im Bereich „Unterseiten" (Präfix s.): Seitenwahl im Editor. */
  seiten?: SeiteMitFeldern[];
};

/** Die drei bekannten Bereiche — Reihenfolge = Reihenfolge in der Navi. */
export const BEREICHE: Bereich[] = [
  /* Spezifischer Präfix VOR "mk." — baueBereiche ordnet in Reihenfolge zu. */
  { praefix: "mk.vsl.front_", titel: "Frontseite /system", icon: "Clapperboard", route: "/system" },
  { praefix: "mk.", titel: "Startseite", icon: "Home", route: "/", thumb: "/studio-thumbs/start.webp" },
  /* R11 (14.09): alle Unterseiten — Keys s.<slug>.<gruppe>.<feld>, Datei je
     Seite unter src/lib/texte/seiten/, Manifest generiert (tools/texte-index.mjs). */
  { praefix: "s.", titel: "Unterseiten", icon: "Files", route: "" },
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
  "mk.vsl.front_": "Frontseite /system",
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
  vgl: "Vergleich",
  motion: "Motion",
  schleuse: "Lead-Wall",
  aufgaben: "Aufgaben",
  pipeline: "Pipeline",
  kontakte: "Kontakte",
  kunden: "Kunden",
  flows: "Flows",
  einblick: "Einblick",
  shell: "Dashboard",
  /* Unterseiten-Sektionen (R11) */
  meta: "SEO — Titel & Beschreibung",
  intro: "Einstieg",
  faq: "FAQ",
  cta: "Call-to-Action",
  fazit: "Fazit",
  prozess: "Prozess",
  saeulen: "Säulen",
  abgrenzung: "Abgrenzung",
  spiegel: "Spiegel",
  anfassen: "Selbst testen",
  showreel: "Showreel",
  finale: "Finale",
  footer: "Footer",
  nav: "Navigation",
  funnel: "Anfrage-Funnel",
  buchung: "Terminbuchung",
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
    const keys = alleKeys.filter((k) => k.startsWith(bereich.praefix) && !zugeordnet.has(k));
    keys.forEach((k) => zugeordnet.add(k));
    if (bereich.praefix === "s.") {
      /* Unterseiten: erst nach Seite (Slug), innerhalb der Seite nach Sektion. */
      const seiten: SeiteMitFeldern[] = SEITEN_MANIFEST.map((seite) => {
        const seitenPraefix = `s.${seite.slug}.`;
        const seitenKeys = keys.filter((k) => k.startsWith(seitenPraefix));
        return { ...seite, keys: seitenKeys, gruppen: gruppieren(seitenKeys, seitenPraefix) };
      })
        .filter((seite) => seite.keys.length > 0)
        .sort((a, b) => a.titel.localeCompare(b.titel, "de"));
      return { ...bereich, keys, gruppen: gruppieren(keys, bereich.praefix), seiten };
    }
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
