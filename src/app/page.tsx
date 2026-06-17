import { Render, type Data } from "@measured/puck";
import { puckConfig } from "@/puck/config";
import homeData from "../../content/puck/home.json";

// The homepage is itself a Puck document (content/puck/home.json), edited at
// /build/home. Statically imported here so `/` is still server-rendered at
// build time (SSG). Editor saves commit the JSON to Git → Vercel redeploys.
export default function HomePage() {
  return <Render config={puckConfig} data={homeData as unknown as Data} />;
}
