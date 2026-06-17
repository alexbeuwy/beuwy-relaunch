import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export type QuoteBlockProps = {
  quote?: string;
  author_name?: string;
  author_role?: string;
  author_initials?: string;
  tone?: "base" | "raised" | "elevated" | "cream" | "bright";
};

export function QuoteBlock(props: QuoteBlockProps) {
  const tone = props.tone ?? "elevated";
  return (
    <Section tone={tone}>
      <Reveal>
        <div className="mx-auto max-w-[920px]">
          <p
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--ink-yellow)",
            }}
            dangerouslySetInnerHTML={{ __html: `&ldquo;${props.quote ?? ""}&rdquo;` }}
          />
          {(props.author_name || props.author_role) && (
            <div className="flex items-center gap-3 mt-8">
              {props.author_initials && (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--ink-yellow)",
                    fontSize: 18,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {props.author_initials}
                </div>
              )}
              <div>
                {props.author_name && (
                  <p style={{ color: "var(--ink-cream)", fontSize: 15, fontWeight: 510 }}>
                    {props.author_name}
                  </p>
                )}
                {props.author_role && (
                  <p style={{ color: "var(--ink-dim)", fontSize: 13 }}>
                    {props.author_role}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
