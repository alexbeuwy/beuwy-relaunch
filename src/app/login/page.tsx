import { redirect } from "next/navigation";

/**
 * /login — merkbarer Alias auf das Studio (Text-CMS mit Passwortschutz).
 * Dort ist jede Headline und jeder Text der Seite ohne Deploy editierbar.
 * Zugleich der gemeinsame Anmelde-Einstieg für alle internen Bereiche
 * (Studio, OS, /intern — R3 Leaf R2, Auth-UX): /intern/layout.tsx leitet
 * ohne gültiges Cookie hierher.
 *
 * weiter-Param: Ziel nach erfolgreichem Login, z. B. "/login?weiter=/intern".
 * Nur relative Pfade werden übernommen — kein "//host" (protokoll-relativ),
 * kein Backslash (Browser lesen "\" in einer Redirect-Location teils wie
 * "/" und machen aus "/\evil.com" ein "//evil.com") und kein eingebettetes
 * "://". Alles andere wäre eine offene Weiterleitung. Ungültig oder fehlend
 * → Standardziel /studio, unverändertes Verhalten von vorher.
 *
 * Das Ziel wandert als eigener weiter-Param an /studio weiter. Honoriert
 * wird es dort erst, sobald src/app/studio/page.tsx `searchParams.weiter`
 * an <StudioLogin ziel={...} /> durchreicht (die Komponente hat den Prop
 * bereits) — das liegt außerhalb der für dieses Leaf zugewiesenen Dateien,
 * genau wie der /intern-Eintrag in der NurWebsite-Liste (siehe dortiger
 * Kommentar). Bis dahin landet der Login weiterhin ehrlich auf /studio.
 */

function istSicheresZiel(wert: string | undefined): wert is string {
  if (!wert || wert.length > 200) return false;
  if (wert.includes("\\")) return false;
  if (!wert.startsWith("/") || wert.startsWith("//")) return false;
  if (wert.includes("://")) return false;
  return true;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  const { weiter } = await searchParams;
  const ziel = istSicheresZiel(weiter) ? `/studio?weiter=${encodeURIComponent(weiter)}` : "/studio";
  redirect(ziel);
}
