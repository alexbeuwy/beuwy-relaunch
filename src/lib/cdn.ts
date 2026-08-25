/**
 * BunnyCDN-Assets für den Light Makler Style. Die Pull-Zone ist in
 * next.config.mjs freigeschaltet (beuwy-2.b-cdn.net). Alle Bilder sind
 * KI-generierte Kampagnenwelt — im UI immer mit <AiPille /> kennzeichnen,
 * nie als Team oder Kunden ausgeben (BRIEF §4/§7).
 *
 * makler-1..11, 18: quer 2400×1792 · 12, 13: hoch 1536×2752 ·
 * 14: hoch 1856×2304 · 19: quadratisch 2048×2048.
 * 15–17 sind Design-Comps und werden NICHT als <img> verwendet.
 */

const BASIS = "https://beuwy-2.b-cdn.net/assets/makler%20assets";

export function maklerAsset(nummer: number): string {
  return `${BASIS}/makler-${nummer}.webp`;
}

export const HERO_VIDEO = `${BASIS}/hero-video.webm`;

/** Poster fürs Hero-Video und reduced-motion-Fallback. */
export const HERO_POSTER = maklerAsset(1);

export const MAKLER_MASSE: Record<number, { w: number; h: number }> = {
  1: { w: 2400, h: 1792 }, 2: { w: 2400, h: 1792 }, 3: { w: 2400, h: 1792 },
  4: { w: 2400, h: 1792 }, 5: { w: 2400, h: 1792 }, 6: { w: 2400, h: 1792 },
  7: { w: 2400, h: 1792 }, 8: { w: 2400, h: 1792 }, 9: { w: 2400, h: 1792 },
  10: { w: 2400, h: 1792 }, 11: { w: 2400, h: 1792 }, 12: { w: 1536, h: 2752 },
  13: { w: 1536, h: 2752 }, 14: { w: 1856, h: 2304 }, 18: { w: 2400, h: 1792 },
  19: { w: 2048, h: 2048 },
};
