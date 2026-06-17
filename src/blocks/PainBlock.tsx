import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export type PainRow = { k?: string; now?: string; after?: string };
export type PainBlockProps = {
  eyebrow_num?: string;
  eyebrow_text?: string;
  title_top?: string;
  title_emphasis?: string;
  title_bottom?: string;
  description?: string;
  rows?: PainRow[];
};

export function PainBlock(props: PainBlockProps) {
  const rows = props.rows ?? [];
  return (
    <Section id="pain" tone="raised">
      <div
        aria-hidden
        className="glow-orb glow-orb-red"
        style={{ top: "20%", right: "-12%", width: 420, height: 420, opacity: 0.35 }}
      />
      <Reveal>
        <span className="eyebrow-rule">
          <span className="num">{props.eyebrow_num}</span> {props.eyebrow_text}
        </span>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="h-display-md max-w-[920px] mt-6">
          {props.title_top}
          <br />
          <em className="gradient-text">{props.title_emphasis}</em> {props.title_bottom}
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <p
          className="mt-6 text-[17px] leading-[1.5] max-w-[600px]"
          style={{ color: "var(--ink-muted)" }}
        >
          {props.description}
        </p>
      </Reveal>

      <div
        className="mt-10 rounded-[12px] overflow-hidden"
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--line-subtle)",
        }}
      >
        {rows.map((row, i) => (
          <Reveal key={row.k ?? i} delay={i * 60}>
            <div
              className="grid grid-cols-12 gap-4 px-5 py-4 items-center"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--line-subtle)",
              }}
            >
              <div className="col-span-12 md:col-span-4">
                <span
                  style={{
                    color: "var(--ink-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="mt-1"
                  style={{
                    color: "var(--ink-cream)",
                    fontSize: 15,
                    fontWeight: 510,
                  }}
                >
                  {row.k}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <span
                  style={{
                    color: "var(--accent-red,#FF5A67)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                  }}
                >
                  JETZT
                </span>
                <p
                  className="mt-1"
                  style={{ color: "var(--ink-muted)", fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: row.now ?? "" }}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <span
                  style={{
                    color: "var(--ink-yellow)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                  }}
                >
                  NACH BEUWY
                </span>
                <p
                  className="mt-1"
                  style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}
                >
                  {row.after}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
