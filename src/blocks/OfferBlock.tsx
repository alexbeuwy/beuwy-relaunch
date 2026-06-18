import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Editor } from "@/components/Editor";

export type OfferDeliverable = { t?: string; d?: string };
export type OfferBlockProps = {
  title_top?: string;
  title_emphasis?: string;
  title_bottom?: string;
  deliverables?: OfferDeliverable[];
  /** Optional guarantee strip rendered under the deliverables (e.g. "Tag 10 — oder Geld zurück."). */
  guarantee_title?: string;
  guarantee_body?: string;
  guarantee_seal_label?: string;
  guarantee_seal_sub?: string;
  guarantee_href?: string;
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

      {props.guarantee_title && (
        <Reveal delay={300}>
          <GuaranteeStrip
            title={props.guarantee_title}
            body={props.guarantee_body}
            sealLabel={props.guarantee_seal_label ?? "Tag 10"}
            sealSub={props.guarantee_seal_sub ?? "live oder 0 €"}
            href={props.guarantee_href}
          />
        </Reveal>
      )}
    </Section>
  );
}

function GuaranteeStrip({
  title,
  body,
  sealLabel,
  sealSub,
  href,
}: {
  title: string;
  body?: string;
  sealLabel: string;
  sealSub: string;
  href?: string;
}) {
  const Wrapper: React.ElementType = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};
  return (
    <Wrapper
      {...wrapperProps}
      className="mt-12 grid md:grid-cols-12 gap-6 items-center rounded-[16px] p-8 md:p-10"
      style={{
        background: "var(--bg-base)",
        color: "var(--ink-yellow)",
        boxShadow: "0 26px 60px -32px rgba(26,4,4,0.45)",
        textDecoration: "none",
      }}
    >
      <div className="md:col-span-8">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--ink-yellow)",
            textTransform: "uppercase",
            opacity: 0.78,
          }}
        >
          Geld-zurück-Garantie
        </span>
        <p
          className="font-display mt-4"
          style={{
            fontSize: 36,
            letterSpacing: "-0.025em",
            color: "var(--ink-yellow)",
            lineHeight: 1.05,
          }}
        >
          {title}
        </p>
        {body && (
          <p
            className="mt-3 max-w-[560px] text-[15px] leading-[1.6]"
            style={{ color: "var(--ink-cream)" }}
          >
            {body}
          </p>
        )}
      </div>
      <div className="md:col-span-4 flex md:justify-end">
        <div
          className="rounded-full flex flex-col items-center justify-center text-center shrink-0"
          style={{
            width: 132,
            height: 132,
            border: "2px solid var(--ink-yellow)",
            color: "var(--ink-yellow)",
          }}
        >
          <span className="font-display" style={{ fontSize: 32, lineHeight: 1, letterSpacing: "-0.03em" }}>
            {sealLabel}
          </span>
          <span
            className="mt-1"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            {sealSub}
          </span>
        </div>
      </div>
    </Wrapper>
  );
}
