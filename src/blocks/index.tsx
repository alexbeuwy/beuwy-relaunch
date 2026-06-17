import { HeroBlock, HeroBlockProps } from "./HeroBlock";
import { PainBlock, PainBlockProps } from "./PainBlock";
import { DreamBlock, DreamBlockProps } from "./DreamBlock";
import { MechanismBlock, MechanismBlockProps } from "./MechanismBlock";
import { ProofBlock, ProofBlockProps } from "./ProofBlock";
import { OfferBlock, OfferBlockProps } from "./OfferBlock";
import { ScarcityBlock, ScarcityBlockProps } from "./ScarcityBlock";
import { IdentificationBlock, IdentificationBlockProps } from "./IdentificationBlock";
import { MagnetBlock, MagnetBlockProps } from "./MagnetBlock";
import { BigCtaBlock, BigCtaBlockProps } from "./BigCtaBlock";
import { ImageWithTextBlock, ImageWithTextBlockProps } from "./ImageWithTextBlock";
import { SingleImageBlock, SingleImageBlockProps } from "./SingleImageBlock";
import { QuoteBlock, QuoteBlockProps } from "./QuoteBlock";
import { LogoWallBlock, LogoWallBlockProps } from "./LogoWallBlock";
import { FaqBlock, FaqBlockProps } from "./FaqBlock";

export type Block =
  | ({ _template: "hero" } & HeroBlockProps)
  | ({ _template: "pain" } & PainBlockProps)
  | ({ _template: "dream" } & DreamBlockProps)
  | ({ _template: "mechanism" } & MechanismBlockProps)
  | ({ _template: "proof" } & ProofBlockProps)
  | ({ _template: "offer" } & OfferBlockProps)
  | ({ _template: "scarcity" } & ScarcityBlockProps)
  | ({ _template: "identification" } & IdentificationBlockProps)
  | ({ _template: "magnet" } & MagnetBlockProps)
  | ({ _template: "bigCta" } & BigCtaBlockProps)
  | ({ _template: "imageWithText" } & ImageWithTextBlockProps)
  | ({ _template: "singleImage" } & SingleImageBlockProps)
  | ({ _template: "quote" } & QuoteBlockProps)
  | ({ _template: "logoWall" } & LogoWallBlockProps)
  | ({ _template: "faq" } & FaqBlockProps);

export function RenderBlock({ block }: { block: Block }) {
  switch (block._template) {
    case "hero":
      return <HeroBlock {...block} />;
    case "pain":
      return <PainBlock {...block} />;
    case "dream":
      return <DreamBlock {...block} />;
    case "mechanism":
      return <MechanismBlock {...block} />;
    case "proof":
      return <ProofBlock {...block} />;
    case "offer":
      return <OfferBlock {...block} />;
    case "scarcity":
      return <ScarcityBlock {...block} />;
    case "identification":
      return <IdentificationBlock {...block} />;
    case "magnet":
      return <MagnetBlock {...block} />;
    case "bigCta":
      return <BigCtaBlock {...block} />;
    case "imageWithText":
      return <ImageWithTextBlock {...block} />;
    case "singleImage":
      return <SingleImageBlock {...block} />;
    case "quote":
      return <QuoteBlock {...block} />;
    case "logoWall":
      return <LogoWallBlock {...block} />;
    case "faq":
      return <FaqBlock {...block} />;
    default:
      return null;
  }
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </>
  );
}
