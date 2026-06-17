import { promises as fs } from "fs";
import path from "path";
import type { Data } from "@measured/puck";
import { PuckEditor } from "./PuckEditor";

export const dynamic = "force-dynamic";

const EMPTY: Data = { content: [], root: { props: {} } };

function sanitizeSlug(raw: string): string | null {
  if (!raw) return null;
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/i.test(raw)) return null;
  return raw.toLowerCase();
}

async function loadData(slug: string): Promise<Data> {
  const file = path.join(process.cwd(), "content", "puck", `${slug}.json`);
  try {
    const buf = await fs.readFile(file, "utf-8");
    return JSON.parse(buf) as Data;
  } catch {
    return EMPTY;
  }
}

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: raw } = await params;
  const slug = sanitizeSlug(raw);
  if (!slug) {
    return (
      <main style={{ padding: 40, color: "#F2EBDA", background: "#1A0404", minHeight: "100vh" }}>
        Ungültiger Slug. Erlaubt: a-z, 0-9, Bindestrich.
      </main>
    );
  }
  const data = await loadData(slug);
  return <PuckEditor slug={slug} initialData={data} />;
}
