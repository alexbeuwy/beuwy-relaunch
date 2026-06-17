import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export type FaqItem = { q?: string; a?: string };
export type FaqBlockProps = {
  eyebrow?: string;
  title_top?: string;
  title_emphasis?: string;
  title_bottom?: string;
  items?: FaqItem[];
  tone?: "base" | "raised" | "elevated" | "cream" | "bright";
};

export function FaqBlock(props: FaqBlockProps) {
  const items = props.items ?? [];
  const tone = props.tone ?? "raised";
  return (
    <Section tone={tone}>
      {props.eyebrow && (
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> {props.eyebrow}
          </span>
        </Reveal>
      )}
      {(props.title_top || props.title_emphasis || props.title_bottom) && (
        <Reveal delay={60}>
          <HeadlineDisplay size="lg" className="mt-6 max-w-[900px]">
            {props.title_top}{" "}
            {props.title_emphasis && (
              <em className="gradient-text">{props.title_emphasis}</em>
            )}{" "}
            {props.title_bottom}
          </HeadlineDisplay>
        </Reveal>
      )}

      <div
        className="mt-10 rounded-[12px] overflow-hidden"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--line-subtle)",
        }}
      >
        {items.map((item, i) => (
          <Reveal key={item.q ?? i} delay={i * 60}>
            <details
              className="group"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--line-subtle)",
              }}
            >
              <summary
                className="flex items-center justify-between px-6 py-5 cursor-pointer list-none"
                style={{ color: "var(--ink-cream)", fontSize: 16, fontWeight: 510 }}
              >
                <span>{item.q}</span>
                <span
                  className="font-display ml-4 transition-transform group-open:rotate-45"
                  style={{
                    color: "var(--ink-yellow)",
                    fontSize: 24,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <div
                className="px-6 pb-5 text-[15px] leading-[1.6]"
                style={{ color: "var(--ink-muted)" }}
                dangerouslySetInnerHTML={{ __html: item.a ?? "" }}
              />
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
