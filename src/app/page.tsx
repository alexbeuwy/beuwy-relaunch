import { Render, type Data } from "@measured/puck";
import { puckConfig } from "@/puck/config";
import { JsonLd, serviceLd, homepageBreadcrumbLd, faqPageLd } from "@/components/JsonLd";
import homeData from "../../content/puck/home.json";

// Pull the FAQ block's items straight out of the page content so the FAQPage
// structured data stays in lockstep with what's rendered — edit the FAQ in
// /build/home and the schema follows automatically. No second source of truth.
function getFaqItems(): { q?: string; a?: string }[] {
  const faq = homeData.content.find((b) => b.type === "Faq") as
    | { props?: { items?: { q?: string; a?: string }[] } }
    | undefined;
  return faq?.props?.items ?? [];
}

// The homepage is itself a Puck document (content/puck/home.json), edited at
// /build/home. Statically imported here so `/` is still server-rendered at
// build time (SSG). Editor saves commit the JSON to Git → Vercel redeploys.
export default function HomePage() {
  const faqLd = faqPageLd(getFaqItems());
  const homepageLd = [serviceLd, homepageBreadcrumbLd, ...(faqLd ? [faqLd] : [])];
  return (
    <>
      {/* Homepage-specific structured data: ProfessionalService + breadcrumb +
          FAQPage (derived from the FAQ block). Layered on top of the site-wide
          Org/WebSite/Person LD in layout.tsx. */}
      <JsonLd data={homepageLd} />
      <Render config={puckConfig} data={homeData as unknown as Data} />
    </>
  );
}
