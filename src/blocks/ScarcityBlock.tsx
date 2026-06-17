import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export type ScarcitySlot = { q?: string; state?: string };
export type ScarcityBlockProps = {
  title_top?: string;
  title_emphasis?: string;
  title_mid?: string;
  title_bottom?: string;
  description?: string;
  cta_label?: string;
  cta_href?: string;
  slots?: ScarcitySlot[];
};

export function ScarcityBlock(props: ScarcityBlockProps) {
  const slots = props.slots ?? [];
  return (
    <Section id="scarcity" divider={true} tone="elevated">
      <div
        aria-hidden
        className="glow-orb glow-orb-red"
        style={{ top: "15%", right: "-10%", width: 460, height: 460, opacity: 0.4 }}
      />
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <Reveal>
            <HeadlineDisplay size="lg">
              {props.title_top} <em className="gradient-text">{props.title_emphasis}</em>{" "}
              {props.title_mid}
              <br />
              {props.title_bottom}
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-6 text-[17px] leading-[1.55] max-w-[560px]"
              style={{ color: "var(--ink-muted)" }}
            >
              {props.description}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link href={props.cta_href ?? "#"} className="btn-primary mt-8">
              {props.cta_label}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delay={120}>
            <SlotGrid slots={slots} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function SlotGrid({ slots }: { slots: ScarcitySlot[] }) {
  const stateMeta: Record<string, { label: string; color: string }> = {
    shipped: { label: "shipped", color: "var(--ink-dim)" },
    open: { label: "open", color: "var(--ink-yellow)" },
    waitlist: { label: "waitlist", color: "var(--ink-muted)" },
  };
  return (
    <div
      className="rounded-[12px] p-5"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      <p
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
          marginBottom: 14,
        }}
      >
        SLOT-PLAN · 6 / Jahr
      </p>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((s, i) => {
          const m = stateMeta[s.state ?? "open"] ?? stateMeta.open;
          return (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-3 rounded-[8px]"
              style={{
                background: s.state === "open" ? "rgba(247,233,154,0.06)" : "transparent",
                border:
                  s.state === "open"
                    ? "1px solid rgba(247,233,154,0.32)"
                    : "1px solid var(--line-subtle)",
              }}
            >
              <span
                style={{
                  color: "var(--ink-cream)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                }}
              >
                {s.q}
              </span>
              <span
                style={{
                  color: m.color,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                }}
              >
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
