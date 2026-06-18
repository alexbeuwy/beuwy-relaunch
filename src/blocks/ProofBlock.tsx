import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { LogoWall, Testimonials } from "@/components/LogoWall";
import { AssetSlot } from "@/components/AssetSlot";

export type ProofCounter = {
  prefix?: string;
  value?: number;
  suffix?: string;
  display?: string;
  label?: string;
  source?: string;
};
export type ProofCase = {
  client?: string;
  years?: string;
  kpi?: string;
  kpiLabel?: string;
  note?: string;
  href?: string;
};
export type ProofBlockProps = {
  title_emphasis?: string;
  title_top_after?: string;
  title_bottom?: string;
  description?: string;
  counters?: ProofCounter[];
  cases?: ProofCase[];
  testimonials_eyebrow?: string;
  founder_eyebrow?: string;
  founder_bio?: string;
  founder_initials?: string;
  founder_name?: string;
  founder_role?: string;
  founder_quote?: string;
  /** Optional founder portrait. When set, renders the photo above the quote card. */
  founder_image?: string;
  founder_image_alt?: string;
};

export function ProofBlock(props: ProofBlockProps) {
  const counters = props.counters ?? [];
  const cases = props.cases ?? [];
  return (
    <Section id="proof" tone="elevated">
      <div
        aria-hidden
        className="glow-orb glow-orb-yellow"
        style={{ top: "10%", right: "-10%", width: 540, height: 540, opacity: 0.55 }}
      />
      <Reveal>
        <HeadlineDisplay size="lg" className="max-w-[1100px]">
          <em className="gradient-text">{props.title_emphasis}</em> {props.title_top_after}
          <br />
          {props.title_bottom}
        </HeadlineDisplay>
      </Reveal>
      <Reveal delay={60}>
        <p
          className="mt-6 max-w-[700px] text-[16px] leading-[1.55]"
          style={{ color: "var(--ink-muted)" }}
        >
          {props.description}
        </p>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
        {counters.map((s, i) => (
          <Reveal key={s.label ?? i}>
            <div className="glass p-6 h-full">
              <p className="stat-num-display" aria-label={s.display}>
                <CountUp
                  prefix={s.prefix ?? ""}
                  to={s.value ?? 0}
                  suffix={s.suffix ?? ""}
                  duration={1700}
                />
              </p>
              <p
                className="mt-3"
                style={{
                  color: "var(--ink-cream)",
                  fontSize: 14,
                  fontWeight: 510,
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </p>
              <p
                className="mt-3"
                style={{
                  color: "var(--ink-dim)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                }}
              >
                Quelle · {s.source}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {cases.map((c, i) => (
          <Reveal key={c.client ?? i} delay={80 + i * 80}>
            <CaseCard
              client={c.client ?? ""}
              years={c.years ?? ""}
              kpi={c.kpi ?? ""}
              kpiLabel={c.kpiLabel ?? ""}
              note={c.note ?? ""}
              href={c.href ?? "#"}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={320}>
        <div className="mt-16">
          <LogoWall />
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-12">
          <p className="eyebrow mb-5">
            <span className="num">/</span> {props.testimonials_eyebrow}
          </p>
          <Testimonials />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-16 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">
              <span className="num">/</span> {props.founder_eyebrow}
            </p>
            <p
              className="text-[17px] leading-[1.6] max-w-[600px]"
              style={{ color: "var(--ink-muted)" }}
              dangerouslySetInnerHTML={{ __html: props.founder_bio ?? "" }}
            />
          </div>
          <div className="md:col-span-5 space-y-5">
            {props.founder_image && (
              <AssetSlot
                src={props.founder_image}
                alt={props.founder_image_alt ?? props.founder_name ?? "Founder portrait"}
                aspect="4/3"
                caption={`${props.founder_name ?? ""} · Heidelberg`}
                prompt="Editorial founder portrait, late-30s/40s German man, three-quarter angle, calm confident expression, looking slightly off-camera. Warm low-key studio light, deep bordeaux/oxblood background (#1A0404), soft golden rim light. Premium, cinematic, high-end magazine cover quality. Subtle film grain. Not corporate-stocky."
                priority
              />
            )}
            <div className="glass p-7">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--ink-yellow)",
                    fontSize: 18,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {props.founder_initials}
                </div>
                <div>
                  <p style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}>
                    {props.founder_name}
                  </p>
                  <p style={{ color: "var(--ink-dim)", fontSize: 12 }}>
                    {props.founder_role}
                  </p>
                </div>
              </div>
              <p
                className="font-display"
                style={{
                  fontSize: 20,
                  lineHeight: "1.3",
                  letterSpacing: "-0.02em",
                  color: "var(--ink-yellow)",
                }}
                dangerouslySetInnerHTML={{
                  __html: `&ldquo;${props.founder_quote ?? ""}&rdquo;`,
                }}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function CaseCard({
  client,
  years,
  kpi,
  kpiLabel,
  note,
  href,
}: {
  client: string;
  years: string;
  kpi: string;
  kpiLabel: string;
  note: string;
  href: string;
}) {
  return (
    <Link href={href} className="card block h-full group">
      <span
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
        }}
      >
        {client.toUpperCase()} · {years}
      </span>
      <p
        className="font-display mt-4"
        style={{
          fontSize: 44,
          letterSpacing: "-0.025em",
          color: "var(--ink-yellow)",
          lineHeight: 1,
        }}
      >
        {kpi}
      </p>
      <p
        className="mt-2"
        style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}
      >
        {kpiLabel}
      </p>
      <p
        className="mt-4"
        style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}
      >
        {note}
      </p>
      <span
        className="inline-block mt-6 text-[13px] group-hover:text-[var(--ink-yellow)] transition-colors"
        style={{ color: "var(--ink-cream)" }}
      >
        Case lesen →
      </span>
    </Link>
  );
}
