import { MaklerHero } from "@/components/MaklerHero";
import { StartOben } from "@/components/StartOben";
import { StartUnten } from "@/components/StartUnten";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/*
 * Startseite = Haupt-VSL (GOAL Kriterium 1, Dramaturgie BRIEF §6):
 * Hero (Hook) → StartOben (Spiegel, Feindbild, VSL-Slot, Säulen) →
 * StartUnten (Beweis, Prozess, Qualifizierung, FAQ, Finale).
 */
export default async function HomePage() {
  const c = await getContent();
  return (
    <>
      <MaklerHero c={c} />
      <StartOben c={c} />
      <StartUnten c={c} />
    </>
  );
}
