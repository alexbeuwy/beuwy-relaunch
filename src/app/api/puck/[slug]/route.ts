import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { commitFileToGitHub } from "@/lib/github";

// Uses Node's fs + Buffer (via the github helper) — must be the Node runtime.
export const runtime = "nodejs";

const PUCK_DIR = path.join(process.cwd(), "content", "puck");
const REPO_REL_DIR = "content/puck";

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

  // Normalize: Puck's <Render> expects a `root` object. The editor always sends
  // one, but guard against a malformed payload missing it.
  const data = payload as { content: unknown[]; root?: unknown };
  const normalized = {
    ...data,
    root: data.root && typeof data.root === "object" ? data.root : { props: {} },
  };

  const serialized = JSON.stringify(normalized, null, 2) + "\n";
  const token = process.env.GITHUB_TOKEN;

  // --- Persistence strategy --------------------------------------------------
  // Two backends, both writing the same content/puck/<slug>.json:
  //   • Git commit (production): the only durable store on Vercel, whose
  //     filesystem is read-only at runtime. Pushing to the tracked branch
  //     triggers an auto-redeploy, so the new content goes live on next build.
  //   • Filesystem (local dev): instant, no token needed, picked up by HMR.
  // We try a local write first (best-effort — it silently no-ops on a read-only
  // prod FS), then commit to Git when a token is configured.
  let wroteFs = false;
  try {
    await ensureDir();
    await fs.writeFile(path.join(PUCK_DIR, `${slug}.json`), serialized, "utf-8");
    wroteFs = true;
  } catch {
    // Read-only filesystem (e.g. Vercel runtime) — expected in production.
    wroteFs = false;
  }

  if (token) {
    const owner = process.env.GITHUB_OWNER || "alexbeuwy";
    const repo = process.env.GITHUB_REPO || "beuwy-relaunch";
    const branch =
      process.env.GITHUB_COMMIT_BRANCH ||
      process.env.VERCEL_GIT_COMMIT_REF ||
      "main";
    try {
      const result = await commitFileToGitHub({
        owner,
        repo,
        branch,
        path: `${REPO_REL_DIR}/${slug}.json`,
        content: serialized,
        message: `content(puck): update ${slug} via /build editor`,
        token,
      });
      return NextResponse.json({
        ok: true,
        slug,
        backend: "git",
        committed: true,
        commitSha: result.commitSha,
        updated: result.updated,
        wroteFs,
      });
    } catch (err) {
      return NextResponse.json(
        { ok: false, slug, backend: "git", error: (err as Error).message },
        { status: 502 }
      );
    }
  }

  // No token → local-dev filesystem mode.
  if (!wroteFs) {
    return NextResponse.json(
      {
        ok: false,
        slug,
        error:
          "No GITHUB_TOKEN set and filesystem is not writable. Set GITHUB_TOKEN for production persistence.",
      },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, slug, backend: "filesystem", committed: false });
}
