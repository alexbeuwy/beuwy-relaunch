import { Block, RenderBlocks } from "@/blocks";
import home from "../../content/pages/home.json";

export default function HomePage() {
  const blocks = (home.blocks ?? []) as Block[];
  return <RenderBlocks blocks={blocks} />;
}
