import Link from "next/link";
import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";

export type ImageWithTextBlockProps = {
  eyebrow?: string;
  title_top?: string;
  title_emphasis?: string;
  title_bottom?: string;
  body?: string;
  image_src?: string;
  image_alt?: string;
  image_caption?: string;
  image_prompt?: string;
  layout?: "image_left" | "image_right";
  tone?: "base" | "raised" | "elevated" | "cream" | "bright";
  cta_label?: string;
  cta_href?: string;
};

export function ImageWithTextBlock(props: ImageWithTextBlockProps) {
  const layout = props.layout ?? "image_left";
  const tone = props.tone ?? "raised";
  const imageCol = (
    <Reveal>
      <AssetSlot
        src={props.image_src ?? ""}
        alt={props.image_alt ?? ""}
        aspect="4/3"
        caption={props.image_caption}
        prompt={props.image_prompt}
      />
    </Reveal>
  );
  const textCol = (
    <div>
      {props.eyebrow && (
        <Reveal>
          <span className="eyebrow-rule">
            <span className="num">/</span> {props.eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={60}>
        <HeadlineDisplay size="md" className="mt-4 max-w-[600px]">
          {props.title_top}{" "}
          {props.title_emphasis && (
            <em className="gradient-text">{props.title_emphasis}</em>
          )}{" "}
          {props.title_bottom}
        </HeadlineDisplay>
      </Reveal>
      {props.body && (
        <Reveal delay={120}>
          <p
            className="mt-6 text-[17px] leading-[1.55] max-w-[560px]"
            style={{ color: "var(--ink-muted)" }}
            dangerouslySetInnerHTML={{ __html: props.body }}
          />
        </Reveal>
      )}
      {props.cta_label && (
        <Reveal delay={180}>
          <Link href={props.cta_href ?? "#"} className="btn-primary mt-8">
            {props.cta_label}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      )}
    </div>
  );

  return (
    <Section tone={tone}>
      <div className="grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          {layout === "image_left" ? imageCol : textCol}
        </div>
        <div className="md:col-span-6">
          {layout === "image_left" ? textCol : imageCol}
        </div>
      </div>
    </Section>
  );
}
