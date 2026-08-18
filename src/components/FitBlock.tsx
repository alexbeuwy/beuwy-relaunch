import { Reveal } from "@/components/Reveal";

/**
 * Zwei Karten nebeneinander auf dem dunklen Hügel — .fit-card liefert Rand/Fläche,
 * .band-hill auf der Sektion kippt die Textfarben bereits auf hell.
 */
export function FitBlock({
  cards,
}: {
  cards: { num: string; text: string }[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((card, i) => (
        <Reveal key={card.num} delay={i * 60}>
          <div className="fit-card">
            <p className="fit-card-num tnum">{card.num}</p>
            <p className="t-body mt-4">{card.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
