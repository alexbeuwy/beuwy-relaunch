import { MaklerHero } from "@/components/MaklerHero";
import { getContent } from "@/lib/content";

export const revalidate = 60;

/* Sektionen 2–10 folgen in Leaves B3/B4 (docs/redesign/PLAN.md). */
export default async function HomePage() {
  const c = await getContent();
  return <MaklerHero c={c} />;
}
