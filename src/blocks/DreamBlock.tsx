import { Section, HeadlineDisplay } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EmailMockup } from "@/components/EmailMockup";
import { AssetSlot } from "@/components/AssetSlot";

export type DreamBlockProps = {
  title_top?: string;
  title_emphasis?: string;
  title_bottom?: string;
  description?: string;
  image_src?: string;
  image_alt?: string;
  image_caption?: string;
  image_prompt?: string;
};

export function DreamBlock(props: DreamBlockProps) {
  return (
    <Section id="dream" tone="cream">
      <Reveal>
        <HeadlineDisplay size="lg" className="max-w-[1000px]">
          {props.title_top} <em className="font-display italic">{props.title_emphasis}</em>
          <br />
          {props.title_bottom}
        </HeadlineDisplay>
      </Reveal>
      <Reveal delay={80}>
        <p
          className="mt-6 text-[19px] leading-[1.5] max-w-[620px]"
          dangerouslySetInnerHTML={{ __html: props.description ?? "" }}
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
              src={props.image_src ?? ""}
              alt={props.image_alt ?? ""}
              aspect="3/4"
              caption={props.image_caption}
              prompt={props.image_prompt}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
