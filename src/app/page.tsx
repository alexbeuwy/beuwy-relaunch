import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Editor } from "@/components/Editor";
import { EmailMockup } from "@/components/EmailMockup";
import { LogoWall, Testimonials } from "@/components/LogoWall";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { HeroGraphic } from "@/components/HeroGraphic";
import { AssetSlot } from "@/components/AssetSlot";
import { AuditPreview } from "@/components/AuditPreview";
import home from "../../content/pages/home.json";

export default function HomePage() {
  const { hero, pain, dream, mechanism, proof, offer, scarcity, identification, magnet, bigCta } = home;

  return (
    <>
      {/* ============================================================
          01 — HERO — Apple-clean, audit-first conversion
         ============================================================ */}
      <section className="hero-clean section-band section-band-base relative overflow-hidden">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "10%", left: "-10%", width: 560, height: 560 }}
        />
        <div
          aria-hidden
          className="glow-orb glow-orb-red"
          style={{ top: "55%", right: "-12%", width: 460, height: 460, animationDelay: "-6s" }}
        />
        <HeroGraphic />

        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 pt-[120px] md:pt-[168px] pb-[88px] md:pb-[120px] relative z-[1]">
          <Reveal>
            <span className="hero-eyebrow-chip">
              <span className="dot" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={120} variant="mask">
            <h1 className="hero-headline mt-7 max-w-[1100px]">
              {hero.title_top}
              <br />
              {hero.title_mid_before} <em className="gradient-text">{hero.title_emphasis}</em>{" "}
              {hero.title_mid_after}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero-sub mt-7 max-w-[640px]">{hero.subtitle}</p>
          </Reveal>

          <Reveal delay={220}>
            <div className="hero-audit mt-9">
              <form action="/audit" method="get" className="hero-audit-form" role="search">
                <span className="hero-audit-icon" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="domain"
                  required
                  placeholder={hero.audit_placeholder}
                  className="hero-audit-input"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button type="submit" className="btn-primary hero-audit-cta">
                  {hero.audit_cta}
                  <span aria-hidden>→</span>
                </button>
              </form>
              <p className="hero-audit-hint">{hero.audit_hint}</p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-secondary mt-10">
              <Link href="/anfrage" className="hero-secondary-link">
                {hero.secondary_link_label}
                <span aria-hidden>→</span>
              </Link>
              <span className="hero-secondary-sep" aria-hidden>·</span>
              <span className="hero-secondary-meta">{hero.meta_response}</span>
              <span className="hero-secondary-sep" aria-hidden>·</span>
              <span className="hero-secondary-meta">{hero.meta_slots}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          02 — PAIN AGITATE (Diagnose-Tabelle)
         ============================================================ */}
      <Section id="pain" tone="raised">
        <div
          aria-hidden
          className="glow-orb glow-orb-red"
          style={{ top: "20%", right: "-12%", width: 420, height: 420, opacity: 0.35 }}
        />
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">{pain.eyebrow_num}</span> {pain.eyebrow_text}
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-display-md max-w-[920px] mt-6">
            {pain.title_top}
            <br />
            <em className="gradient-text">{pain.title_emphasis}</em> {pain.title_bottom}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.5] max-w-[600px]"
            style={{ color: "var(--ink-muted)" }}
          >
            {pain.description}
          </p>
        </Reveal>

        <div
          className="mt-10 rounded-[12px] overflow-hidden"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--line-subtle)",
          }}
        >
          {pain.rows.map((row, i) => (
            <Reveal key={row.k} delay={i * 60}>
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
                    dangerouslySetInnerHTML={{ __html: row.now }}
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

      {/* ============================================================
          03 — DREAM STATE — the LIGHT editorial moment
         ============================================================ */}
      <Section id="dream" tone="cream">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            {dream.title_top} <em className="font-display italic">{dream.title_emphasis}</em>
            <br />
            {dream.title_bottom}
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[19px] leading-[1.5] max-w-[620px]"
            dangerouslySetInnerHTML={{ __html: dream.description }}
          />
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 items-center mt-12">
          <div className="md:col-span-7">
            <Reveal>
              <EmailMockup />
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <AssetSlot
                src={dream.image_src}
                alt={dream.image_alt}
                aspect="3/4"
                caption={dream.image_caption}
                prompt={dream.image_prompt}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          04 — MECHANISM
         ============================================================ */}
      <Section id="mechanismus" tone="raised">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "15%", left: "-10%", width: 480, height: 480, opacity: 0.4 }}
        />
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[980px]">
            {mechanism.title_top}
            <br />
            {mechanism.title_bottom_before}{" "}
            <em className="gradient-text">{mechanism.title_emphasis}</em>
            {mechanism.title_bottom_after}
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={80}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[640px]"
            style={{ color: "var(--ink-muted)" }}
          >
            {mechanism.description}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <MechanismFlow
            layers={mechanism.layers}
            inputChip={mechanism.input_chip}
            outputChip={mechanism.output_chip}
            outputMeta={mechanism.output_meta}
          />
        </Reveal>
      </Section>

      {/* ============================================================
          05 — PROOF STACK
         ============================================================ */}
      <Section id="proof" tone="elevated">
        <div
          aria-hidden
          className="glow-orb glow-orb-yellow"
          style={{ top: "10%", right: "-10%", width: 540, height: 540, opacity: 0.55 }}
        />
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1100px]">
            <em className="gradient-text">{proof.title_emphasis}</em> {proof.title_top_after}
            <br />
            {proof.title_bottom}
          </HeadlineDisplay>
        </Reveal>
        <Reveal delay={60}>
          <p
            className="mt-6 max-w-[700px] text-[16px] leading-[1.55]"
            style={{ color: "var(--ink-muted)" }}
          >
            {proof.description}
          </p>
        </Reveal>

        {/* Counter wall — count-up on enter, sneaky-fast easeOutCubic */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {proof.counters.map((s) => (
            <Reveal key={s.label}>
              <div className="glass p-6 h-full">
                <p
                  className="stat-num-display"
                  aria-label={s.display}
                >
                  <CountUp prefix={s.prefix} to={s.value} suffix={s.suffix} duration={1700} />
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

        {/* Inline cases */}
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {proof.cases.map((c, i) => (
            <Reveal key={c.client} delay={80 + i * 80}>
              <CaseCard
                client={c.client}
                years={c.years}
                kpi={c.kpi}
                kpiLabel={c.kpiLabel}
                note={c.note}
                href={c.href}
              />
            </Reveal>
          ))}
        </div>

        {/* Logo wall — 10 brands as typographic representation */}
        <Reveal delay={320}>
          <div className="mt-16">
            <LogoWall />
          </div>
        </Reveal>

        {/* External testimonials — 3 customer quotes */}
        <Reveal delay={400}>
          <div className="mt-12">
            <p className="eyebrow mb-5">
              <span className="num">/</span> {proof.testimonials_eyebrow}
            </p>
            <Testimonials />
          </div>
        </Reveal>

        {/* Authority — merged into Proof: who builds it + founder quote */}
        <Reveal delay={120}>
          <div className="mt-16 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">
                <span className="num">/</span> {proof.founder_eyebrow}
              </p>
              <p
                className="text-[17px] leading-[1.6] max-w-[600px]"
                style={{ color: "var(--ink-muted)" }}
                dangerouslySetInnerHTML={{ __html: proof.founder_bio }}
              />
            </div>
            <div className="md:col-span-5">
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
                    {proof.founder_initials}
                  </div>
                  <div>
                    <p style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}>
                      {proof.founder_name}
                    </p>
                    <p style={{ color: "var(--ink-dim)", fontSize: 12 }}>
                      {proof.founder_role}
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
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${proof.founder_quote}&rdquo;` }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ============================================================
          07 — OFFER
         ============================================================ */}
      <Section id="offer" tone="cream">
        <Reveal>
          <HeadlineDisplay size="lg" className="max-w-[1000px]">
            {offer.title_top}{" "}
            <em className="font-display italic">{offer.title_emphasis}</em>
            {offer.title_bottom}
          </HeadlineDisplay>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 mt-10 items-start">
          <div className="md:col-span-7">
            <Reveal delay={80}>
              <Editor height={420} />
            </Reveal>
          </div>
          <div className="md:col-span-5 space-y-5">
            {offer.deliverables.map((row, i) => (
              <Reveal key={row.t} delay={120 + i * 60}>
                <div
                  className="flex items-start gap-4 pb-5"
                  style={{
                    borderBottom: "1px solid rgba(26,4,4,0.12)",
                  }}
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

      {/* ============================================================
          08 — SCARCITY
         ============================================================ */}
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
                {scarcity.title_top} <em className="gradient-text">{scarcity.title_emphasis}</em>{" "}
                {scarcity.title_mid}
                <br />
                {scarcity.title_bottom}
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[17px] leading-[1.55] max-w-[560px]"
                style={{ color: "var(--ink-muted)" }}
              >
                {scarcity.description}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Link href={scarcity.cta_href} className="btn-primary mt-8">
                {scarcity.cta_label}
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <SlotGrid slots={scarcity.slots} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ============================================================
          07 — IDENTIFICATION (was: Disqualifier — flipped to positive)
         ============================================================ */}
      <Section id="disqualifier" tone="raised">
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">{identification.eyebrow_num}</span> {identification.eyebrow_text}
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h-display-md max-w-[1000px] mt-6">
            {identification.title_top}
            <br />
            {identification.title_bottom_before}{" "}
            <em className="gradient-text">{identification.title_emphasis}</em>{" "}
            {identification.title_bottom_after}
          </h2>
        </Reveal>

        <div className="identification-grid mt-12">
          {identification.cards.map((item, i) => (
            <Reveal key={item.n} delay={i * 60}>
              <div className="identification-card">
                <span className="identification-num">{item.n}</span>
                <p className="identification-title">{item.t}</p>
                <p
                  className="identification-body"
                  dangerouslySetInnerHTML={{ __html: item.s }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <p
            className="identification-kicker"
            dangerouslySetInnerHTML={{ __html: identification.kicker }}
          />
        </Reveal>
      </Section>

      {/* ============================================================
          08 — LEAD MAGNET (free audit, low-friction entry)
         ============================================================ */}
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
                {magnet.title_top}{" "}
                <em className="font-display italic">{magnet.title_emphasis}</em>{" "}
                {magnet.title_bottom}
              </HeadlineDisplay>
            </Reveal>
            <Reveal delay={80}>
              <p
                className="mt-6 text-[17px] leading-[1.55] max-w-[460px]"
                style={{ color: "var(--ink-muted)" }}
              >
                {magnet.description}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-7">
                <AuditForm
                  placeholder={magnet.audit_placeholder}
                  cta={magnet.audit_cta}
                  hint={magnet.audit_hint}
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

      {/* ============================================================
          12 — BIG CTA
         ============================================================ */}
      <section className="relative pt-[112px] md:pt-[160px] pb-[112px] md:pb-[160px] section-divider section-band section-band-base">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <h2 className="h-display-md max-w-[980px]">
              {bigCta.title_top}
              <br />
              <em className="gradient-text">{bigCta.title_emphasis}</em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={bigCta.primary_href} className="btn-primary">
                {bigCta.primary_label}
                <span aria-hidden>→</span>
              </Link>
              <Link href={bigCta.secondary_href} className="audit-close-link">
                {bigCta.secondary_label}
              </Link>
              <span
                className="ml-2 text-[12px]"
                style={{
                  color: "var(--ink-dim)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {bigCta.meta}
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- subcomponents ---------- */

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

function MechanismFlow({
  layers,
  inputChip,
  outputChip,
  outputMeta,
}: {
  layers: { num: string; t: string; sub: string; out: string }[];
  inputChip: string;
  outputChip: string;
  outputMeta: string;
}) {
  return (
    <div
      className="mt-12 rounded-[16px] p-6 md:p-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-raised) 0%, #1F0606 100%)",
        border: "1px solid var(--line-subtle)",
      }}
    >
      {/* Input row */}
      <div className="flex items-center gap-3 mb-8">
        <span
          className="chip"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--ink-cream)",
          }}
        >
          <span className="dot" />
          {inputChip}
        </span>
      </div>

      {/* 3 Layer */}
      <div className="grid md:grid-cols-3 gap-0 md:gap-6 relative">
        {layers.map((l, i) => (
          <div key={l.num} className="relative">
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
              <div
                className="mt-5 pt-4"
                style={{ borderTop: "1px solid var(--line-subtle)" }}
              >
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
            {/* Arrow between */}
            {i < layers.length - 1 && (
              <div
                className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 items-center justify-center w-12 h-12 z-10"
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: 32,
                    color: "var(--ink-yellow)",
                    lineHeight: 1,
                  }}
                >
                  →
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Output row */}
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
        style={{
          color: "var(--ink-cream)",
          fontSize: 14,
          fontWeight: 510,
        }}
      >
        {kpiLabel}
      </p>
      <p
        className="mt-4"
        style={{
          color: "var(--ink-muted)",
          fontSize: 14,
          lineHeight: "22px",
        }}
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

function SlotGrid({ slots }: { slots: { q: string; state: string }[] }) {
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
          const m = stateMeta[s.state] ?? stateMeta.open;
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
