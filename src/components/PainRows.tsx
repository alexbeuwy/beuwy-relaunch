import { Reveal } from "@/components/Reveal";

/**
 * Nummerierte Einwand-Zeilen. Nummer + Zitat + Antwort — Grid kommt aus .pain-row.
 */
export function PainRows({
  items,
}: {
  items: { quote: string; answer: string }[];
}) {
  return (
    <div>
      {items.map((item, i) => (
        <Reveal key={item.quote} delay={i * 60}>
          <div className="pain-row">
            <p className="pain-num tnum">{String(i + 1).padStart(2, "0")}</p>
            <p className="pain-quote">{item.quote}</p>
            <p className="pain-answer t-body">{item.answer}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
