import { MaklerHero } from "@/components/MaklerHero";
import { StartOben } from "@/components/StartOben";
import { StartUnten } from "@/components/StartUnten";
import { MotionRegie } from "@/components/motion/MotionRegie";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/*
 * Startseite = Haupt-VSL (GOAL Kriterium 1, Dramaturgie BRIEF §6):
 * Hero (Hook) → StartOben (Spiegel, Feindbild + Aha-Vergleich, VSL-Slot,
 * Säulen) → StartUnten (Beweis, Prozess, Qualifizierung, FAQ, Finale).
 *
 * MotionRegie (R7): Lenis + GSAP-Scrubs, Stufe kommt aus dem Studio-Key
 * mk.motion.stufe — "aus" ist der Rollback ohne Deployment.
 */
export default async function HomePage() {
  const c = await getContent();
  return (
    <MotionRegie stufe={c["mk.motion.stufe"]}>
      <MaklerHero c={c} />
      <StartOben c={c} />
      <StartUnten c={c} />
    </MotionRegie>
  );
}
