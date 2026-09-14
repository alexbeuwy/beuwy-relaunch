import type { Metadata } from "next";
import { VideoAnalyseForm } from "@/components/VideoAnalyseForm";
import { rich } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { seitenTexte } from "@/lib/texte/lesen";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = seitenTexte(await getContent(), "video-analyse");
  return {
    title: t("meta.titel"),
    description: t("meta.beschreibung"),
  };
}

export default async function VideoAnalysePage() {
  const c = await getContent();
  return (
    <div className="mx-auto max-w-[1120px] px-6 lg:px-10 pt-32 pb-24">
      <div className="max-w-[720px]">
        <h1 className="t-h2">{rich(c["video.title"])}</h1>
        <p className="t-body-lg mt-5 max-w-[560px]">{c["video.intro"]}</p>
      </div>
      <div className="mt-12">
        <VideoAnalyseForm submitLabel={c["video.submit"]} note={c["video.note"]} />
      </div>
    </div>
  );
}
