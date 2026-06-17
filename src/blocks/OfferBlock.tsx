import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Editor } from "@/components/Editor";

export type OfferDeliverable = { t?: string; d?: string };
export type OfferBlockProps = {
  title_top?: string;
  title_emphasis?: string;
  title_bottom?: string;
  deliverables?: OfferDeliverable[];
};

export function OfferBlock(props: OfferBlockProps) {
  const deliverables = props.deliverables ?? [];
  return (
    <Section id="offer" tone="cream">
      <Reveal>
        <HeadlineDisplay size="lg" className="max-w-[1000px]">
          {props.title_top}{" "}
          <em className="font-display italic">{props.title_emphasis}</em>
          {props.title_bottom}
        </HeadlineDisplay>
      </Reveal>

      <div className="grid md:grid-cols-12 gap-10 mt-10 items-start">
        <div className="md:col-span-7">
          <Reveal delay={80}>
            <Editor height={420} />
          </Reveal>
        </div>
        <div className="md:col-span-5 space-y-5">
          {deliverables.map((row, i) => (
            <Reveal key={row.t ?? i} delay={120 + i * 60}>
              <div
                className="flex items-start gap-4 pb-5"
                style={{ borderBottom: "1px solid rgba(26,4,4,0.12)" }}
              >
                <span
                  className="font-display shrink-0"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "#B23A48",
                    width: 28,
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <p
                    style={{
                      color: "var(--bg-base)",
                      fontSize: 16,
                      fontWeight: 510,
                      marginBottom: 4,
                    }}
                  >
                    {row.t}
                  </p>
                  <p style={{ color: "rgba(26,4,4,0.7)", fontSize: 14, lineHeight: "22px" }}>
                    {row.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
