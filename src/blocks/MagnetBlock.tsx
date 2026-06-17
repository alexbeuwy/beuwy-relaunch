import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AuditPreview } from "@/components/AuditPreview";

export type MagnetBlockProps = {
  title_top?: string;
  title_emphasis?: string;
  title_bottom?: string;
  description?: string;
  audit_placeholder?: string;
  audit_cta?: string;
  audit_hint?: string;
};

export function MagnetBlock(props: MagnetBlockProps) {
  return (
    <Section id="magnet" tone="bright">
      <div
        aria-hidden
        className="glow-orb glow-orb-cream"
        style={{ top: "30%", right: "-8%", width: 420, height: 420, opacity: 0.7 }}
      />
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <HeadlineDisplay size="lg">
              {props.title_top}{" "}
              <em className="font-display italic">{props.title_emphasis}</em>{" "}
              {props.title_bottom}
            </HeadlineDisplay>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-6 text-[17px] leading-[1.55] max-w-[460px]"
              style={{ color: "var(--ink-muted)" }}
            >
              {props.description}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-7">
              <AuditForm
                placeholder={props.audit_placeholder ?? ""}
                cta={props.audit_cta ?? ""}
                hint={props.audit_hint ?? ""}
              />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={120}>
            <AuditPreview />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function AuditForm({
  placeholder,
  cta,
  hint,
}: {
  placeholder: string;
  cta: string;
  hint: string;
}) {
  return (
    <form
      action="/audit"
      method="get"
      className="audit-form-pill rounded-[12px] p-2"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      <div className="flex items-stretch gap-2">
        <input
          type="text"
          name="domain"
          required
          placeholder={placeholder}
          className="audit-form-input flex-1 px-4 py-3 rounded-[10px]"
          style={{
            background: "transparent",
            color: "var(--ink-cream)",
            fontSize: 14,
            outline: "none",
            border: "1px solid var(--line-subtle)",
            fontFamily: "var(--font-mono)",
          }}
        />
        <button type="submit" className="btn-primary" style={{ height: 44 }}>
          {cta}
          <span aria-hidden>→</span>
        </button>
      </div>
      <p
        className="audit-form-hint px-2 py-3"
        style={{ fontSize: 11, letterSpacing: "0.04em" }}
      >
        {hint}
      </p>
    </form>
  );
}
