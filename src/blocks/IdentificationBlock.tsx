import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export type IdentificationCard = { n?: string; t?: string; s?: string };
export type IdentificationBlockProps = {
  eyebrow_num?: string;
  eyebrow_text?: string;
  title_top?: string;
  title_bottom_before?: string;
  title_emphasis?: string;
  title_bottom_after?: string;
  cards?: IdentificationCard[];
  kicker?: string;
};

export function IdentificationBlock(props: IdentificationBlockProps) {
  const cards = props.cards ?? [];
  return (
    <Section id="disqualifier" tone="cream">
      <Reveal>
        <span className="eyebrow-rule">
          <span className="num">{props.eyebrow_num}</span> {props.eyebrow_text}
        </span>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="h-display-md max-w-[1000px] mt-6">
          {props.title_top}
          <br />
          {props.title_bottom_before}{" "}
          <em className="gradient-text">{props.title_emphasis}</em>{" "}
          {props.title_bottom_after}
        </h2>
      </Reveal>

      <div className="identification-grid mt-12">
        {cards.map((item, i) => (
          <Reveal key={item.n ?? i} delay={i * 60}>
            <div className="identification-card">
              <span className="identification-num">{item.n}</span>
              <p className="identification-title">{item.t}</p>
              <p
                className="identification-body"
                dangerouslySetInnerHTML={{ __html: item.s ?? "" }}
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={400}>
        <p
          className="identification-kicker"
          dangerouslySetInnerHTML={{ __html: props.kicker ?? "" }}
        />
      </Reveal>
    </Section>
  );
}
