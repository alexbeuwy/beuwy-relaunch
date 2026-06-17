import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export type BigCtaBlockProps = {
  title_top?: string;
  title_emphasis?: string;
  primary_label?: string;
  primary_href?: string;
  secondary_label?: string;
  secondary_href?: string;
  meta?: string;
};

export function BigCtaBlock(props: BigCtaBlockProps) {
  return (
    <section className="relative pt-[112px] md:pt-[160px] pb-[112px] md:pb-[160px] section-divider section-band section-band-base">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal>
          <h2 className="h-display-md max-w-[980px]">
            {props.title_top}
            <br />
            <em className="gradient-text">{props.title_emphasis}</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={props.primary_href ?? "#"} className="btn-primary">
              {props.primary_label}
              <span aria-hidden>→</span>
            </Link>
            <Link href={props.secondary_href ?? "#"} className="audit-close-link">
              {props.secondary_label}
            </Link>
            <span
              className="ml-2 text-[12px]"
              style={{
                color: "var(--ink-dim)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {props.meta}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
