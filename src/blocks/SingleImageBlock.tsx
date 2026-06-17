import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AssetSlot } from "@/components/AssetSlot";

export type SingleImageBlockProps = {
  image_src?: string;
  image_alt?: string;
  image_caption?: string;
  image_prompt?: string;
  aspect?: "16/9" | "4/3" | "3/2" | "1/1" | "3/4";
  max_width?: number;
  tone?: "base" | "raised" | "elevated" | "cream" | "bright";
};

export function SingleImageBlock(props: SingleImageBlockProps) {
  const tone = props.tone ?? "raised";
  const max = props.max_width ?? 1040;
  return (
    <Section tone={tone}>
      <Reveal>
        <div className="mx-auto" style={{ maxWidth: max }}>
          <AssetSlot
            src={props.image_src ?? ""}
            alt={props.image_alt ?? ""}
            aspect={props.aspect ?? "16/9"}
            caption={props.image_caption}
            prompt={props.image_prompt}
          />
        </div>
      </Reveal>
    </Section>
  );
}
