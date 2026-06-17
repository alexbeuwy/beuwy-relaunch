import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { LogoWall } from "@/components/LogoWall";

export type LogoWallBlockProps = {
  eyebrow?: string;
  tone?: "base" | "raised" | "elevated" | "cream" | "bright";
};

export function LogoWallBlock(props: LogoWallBlockProps) {
  const tone = props.tone ?? "raised";
  return (
    <Section tone={tone}>
      {props.eyebrow && (
        <Reveal>
          <p className="eyebrow mb-8">
            <span className="num">/</span> {props.eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={80}>
        <LogoWall />
      </Reveal>
    </Section>
  );
}
