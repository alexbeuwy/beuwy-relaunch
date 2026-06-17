import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Render, type Data } from "@measured/puck";
import { puckConfig } from "@/puck/config";

export const dynamic = "force-dynamic";

function sanitizeSlug(raw: string): string | null {
  if (!raw) return null;
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/i.test(raw)) return null;
  return raw.toLowerCase();
}

async function loadData(slug: string): Promise<Data | null> {
  const file = path.join(process.cwd(), "content", "puck", `${slug}.json`);
  try {
    const buf = await fs.readFile(file, "utf-8");
    return JSON.parse(buf) as Data;
  } catch {
    return null;
  }
}

export default async function PuckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: raw } = await params;
  const slug = sanitizeSlug(raw);
  if (!slug) notFound();
  const data = await loadData(slug);
  if (!data) notFound();
  return <Render config={puckConfig} data={data} />;
}
