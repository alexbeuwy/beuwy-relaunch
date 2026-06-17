import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export type MechanismLayer = { num?: string; t?: string; sub?: string; out?: string };
export type MechanismBlockProps = {
  title_top?: string;
  title_bottom_before?: string;
  title_emphasis?: string;
  title_bottom_after?: string;
  description?: string;
  input_chip?: string;
  output_chip?: string;
  output_meta?: string;
  layers?: MechanismLayer[];
};

export function MechanismBlock(props: MechanismBlockProps) {
  const layers = props.layers ?? [];
  return (
    <Section id="mechanismus" tone="raised">
      <div
        aria-hidden
        className="glow-orb glow-orb-yellow"
        style={{ top: "15%", left: "-10%", width: 480, height: 480, opacity: 0.4 }}
      />
      <Reveal>
        <HeadlineDisplay size="lg" className="max-w-[980px]">
          {props.title_top}
          <br />
          {props.title_bottom_before}{" "}
          <em className="gradient-text">{props.title_emphasis}</em>
          {props.title_bottom_after}
        </HeadlineDisplay>
      </Reveal>
      <Reveal delay={80}>
        <p
          className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
          style={{ color: "var(--ink-muted)" }}
        >
          {props.description}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <MechanismFlow
          layers={layers}
          inputChip={props.input_chip ?? ""}
          outputChip={props.output_chip ?? ""}
          outputMeta={props.output_meta ?? ""}
        />
      </Reveal>
    </Section>
  );
}

function MechanismFlow({
  layers,
  inputChip,
  outputChip,
  outputMeta,
}: {
  layers: MechanismLayer[];
  inputChip: string;
  outputChip: string;
  outputMeta: string;
}) {
  return (
    <div
      className="mt-12 rounded-[16px] p-6 md:p-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg-raised) 0%, #1F0606 100%)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      <div className="flex items-center gap-3 mb-8">
        <span
          className="chip"
          style={{ background: "var(--bg-elevated)", color: "var(--ink-cream)" }}
        >
          <span className="dot" />
          {inputChip}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-0 md:gap-6 relative">
        {layers.map((l, i) => (
          <div key={l.num ?? i} className="relative">
            <div className="glass p-6 h-full">
              <div className="flex items-center justify-between">
                <span
                  className="font-display"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-yellow)",
                  }}
                >
                  {l.num}
                </span>
                <span
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  LAYER
                </span>
              </div>
              <p
                className="font-display mt-4"
                style={{
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  color: "var(--ink-yellow)",
                  lineHeight: 1.1,
                }}
              >
                {l.t}
              </p>
              <p
                className="mt-3"
                style={{
                  color: "var(--ink-muted)",
                  fontSize: 13,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "-0.005em",
                }}
              >
                {l.sub}
              </p>
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--line-subtle)" }}>
                <span
                  style={{
                    color: "var(--ink-yellow)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                  }}
                >
                  → OUTPUT
                </span>
                <p
                  className="mt-1"
                  style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}
                >
                  {l.out}
                </p>
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 items-center justify-center w-12 h-12 z-10">
                <span
                  className="font-display"
                  style={{ fontSize: 32, color: "var(--ink-yellow)", lineHeight: 1 }}
                >
                  →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span
          className="chip"
          style={{
            background: "var(--ink-yellow)",
            color: "var(--bg-base)",
            border: "1px solid var(--ink-yellow)",
            fontWeight: 510,
          }}
        >
          {outputChip}
        </span>
        <span
          style={{
            color: "var(--ink-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
          }}
        >
          {outputMeta}
        </span>
      </div>
    </div>
  );
}
