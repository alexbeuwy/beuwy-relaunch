import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { HeroGraphic } from "@/components/HeroGraphic";

export type HeroBlockProps = {
  eyebrow?: string;
  title_top?: string;
  title_mid_before?: string;
  title_emphasis?: string;
  title_mid_after?: string;
  subtitle?: string;
  audit_placeholder?: string;
  audit_cta?: string;
  audit_hint?: string;
  secondary_link_label?: string;
  meta_response?: string;
  meta_slots?: string;
};

export function HeroBlock(props: HeroBlockProps) {
  return (
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
            {props.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={120} variant="mask">
          <h1 className="hero-headline mt-7 max-w-[1100px]">
            {props.title_top}
            <br />
            {props.title_mid_before} <em className="gradient-text">{props.title_emphasis}</em>{" "}
            {props.title_mid_after}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="hero-sub mt-7 max-w-[640px]">{props.subtitle}</p>
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
                placeholder={props.audit_placeholder}
                className="hero-audit-input"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className="btn-primary hero-audit-cta">
                {props.audit_cta}
                <span aria-hidden>→</span>
              </button>
            </form>
            <p className="hero-audit-hint">{props.audit_hint}</p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero-secondary mt-10">
            <Link href="/anfrage" className="hero-secondary-link">
              {props.secondary_link_label}
              <span aria-hidden>→</span>
            </Link>
            <span className="hero-secondary-sep" aria-hidden>·</span>
            <span className="hero-secondary-meta">{props.meta_response}</span>
            <span className="hero-secondary-sep" aria-hidden>·</span>
            <span className="hero-secondary-meta">{props.meta_slots}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
