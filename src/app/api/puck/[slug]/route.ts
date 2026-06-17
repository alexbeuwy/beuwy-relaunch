import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const PUCK_DIR = path.join(process.cwd(), "content", "puck");

function sanitizeSlug(raw: string): string | null {
  if (!raw) return null;
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/i.test(raw)) return null;
  return raw.toLowerCase();
}

async function ensureDir() {
  await fs.mkdir(PUCK_DIR, { recursive: true });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug: raw } = await context.params;
  const slug = sanitizeSlug(raw);
  if (!slug) return NextResponse.json({ error: "invalid slug" }, { status: 400 });

  const file = path.join(PUCK_DIR, `${slug}.json`);
  try {
    const buf = await fs.readFile(file, "utf-8");
    return NextResponse.json(JSON.parse(buf));
  } catch {
    return NextResponse.json({ content: [], root: { props: {} } });
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug: raw } = await context.params;
  const slug = sanitizeSlug(raw);
  if (!slug) return NextResponse.json({ error: "invalid slug" }, { status: 400 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !("content" in payload) ||
    !Array.isArray((payload as { content: unknown }).content)
  ) {
    return NextResponse.json({ error: "invalid puck data shape" }, { status: 400 });
  }

  await ensureDir();
  const file = path.join(PUCK_DIR, `${slug}.json`);
  await fs.writeFile(file, JSON.stringify(payload, null, 2), "utf-8");
  return NextResponse.json({ ok: true, slug });
}
