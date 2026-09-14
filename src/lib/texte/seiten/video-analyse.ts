/** Studio-Texte /video-analyse — Struktur bleibt im Code, jeder Text hier.
 *  Die Seite selbst liest ihre Inhalte weiterhin über die bestehenden
 *  "video.*"-Keys aus src/lib/content.ts (R11-Sperrliste: content.ts wird
 *  hier nicht angefasst) — diese Datei registriert nur die SEO-Metadaten,
 *  die zuvor als export const metadata hart im Code standen. */
export const SEITE = { slug: "video-analyse", titel: "Video-Analyse", route: "/video-analyse" };
const S = "s.video-analyse.";

export const DEFAULTS: Record<string, string> = {
  [`${S}meta.titel`]: "Video-Analyse — beuwy",
  [`${S}meta.beschreibung`]:
    "Domain schicken, persönlich aufgenommene Video-Analyse bekommen: was Interessenten und Maschinen heute sehen — und was ein System ändern würde.",
};

export const LABELS: Record<string, string> = {
  [`${S}meta.titel`]: "SEO · Browser-Titel",
  [`${S}meta.beschreibung`]: "SEO · Meta-Beschreibung",
};
