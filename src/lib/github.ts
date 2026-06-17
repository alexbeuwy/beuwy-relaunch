/**
 * Commit (create or update) a single file in a GitHub repo via the REST
 * Contents API, then return the commit SHA. Pushing to a branch that Vercel
 * tracks will trigger an auto-redeploy.
 *
 * Docs:
 * - Create or update file contents:
 *   https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents
 * - Get repository content:
 *   https://docs.github.com/en/rest/repos/contents#get-repository-content
 *
 * Token requirements:
 * - Fine-grained PAT: repository permission "Contents" = Read and write.
 *   (Read-only is enough to GET the sha; you need write to PUT.)
 * - Classic PAT: `repo` scope. (Plus `workflow` scope ONLY if you ever write
 *   files under .github/workflows.)
 *
 * Rate limits (authenticated): 5,000 requests/hour for PATs (15,000/hr for
 * GitHub Apps on an Enterprise org). This function spends 1-2 requests per
 * call (one GET for the sha, one PUT). The 60/min secondary "content creation"
 * limit is the one you are most likely to hit if you commit in a tight loop —
 * serialize writes and avoid concurrent PUT + DELETE to the same path.
 *
 * IMPORTANT: must run on the Node.js runtime (default for Route Handlers).
 * This module uses Node's Buffer for base64. Do NOT import it into an
 * edge-runtime file.
 */

const GITHUB_API = "https://api.github.com";
const API_VERSION = "2022-11-28";

export interface CommitFileArgs {
  owner: string;
  repo: string;
  branch: string;
  /** Repo-relative path, e.g. "data/pages.json". No leading slash. */
  path: string;
  /** Raw UTF-8 string content to write. */
  content: string;
  message: string;
  /** Fine-grained PAT (Contents: write) or classic PAT (repo scope). */
  token: string;
}

export interface CommitFileResult {
  ok: true;
  /** SHA of the new commit. */
  commitSha: string;
  /** Blob SHA of the file after the write (useful to cache for the next update). */
  blobSha: string;
  /** true if the file existed and was updated, false if it was created. */
  updated: boolean;
}

function authHeaders(token: string): HeadersInit {
  return {
    // "Bearer" is the modern form and works for both fine-grained and classic
    // PATs. ("token <pat>" is the legacy form and also works for classic PATs.)
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": API_VERSION,
    // GitHub requires a User-Agent on all API requests.
    "User-Agent": "beuwy-relaunch-committer",
  };
}

/**
 * Fetch the current blob SHA for a path on a branch.
 * Returns the sha string, or null if the file does not exist (404).
 * Throws on any other error.
 */
async function getCurrentSha(args: {
  owner: string;
  repo: string;
  branch: string;
  path: string;
  token: string;
}): Promise<string | null> {
  const { owner, repo, branch, path, token } = args;
  const url =
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${encodeContentsPath(path)}` +
    `?ref=${encodeURIComponent(branch)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(token),
    // Always hit the network; never serve a stale sha from a fetch cache.
    cache: "no-store",
  });

  if (res.status === 404) return null; // File doesn't exist yet -> create path.
  if (!res.ok) {
    throw new Error(
      `GitHub GET contents failed: ${res.status} ${res.statusText} - ${await safeBody(res)}`,
    );
  }

  const json = (await res.json()) as { sha?: string; type?: string };
  // If the path is a directory, GitHub returns an array (no top-level sha).
  if (Array.isArray(json) || !json.sha) {
    throw new Error(`GitHub GET contents: "${path}" is not a file (cannot update).`);
  }
  return json.sha;
}

export async function commitFileToGitHub(
  args: CommitFileArgs,
): Promise<CommitFileResult> {
  const { owner, repo, branch, path, content, message, token } = args;

  if (!token) throw new Error("commitFileToGitHub: missing token.");

  // 1) Look up the existing blob sha (null => create).
  const existingSha = await getCurrentSha({ owner, repo, branch, path, token });

  // 2) Base64-encode the UTF-8 content.
  //
  // GOTCHA: btoa()/a naive base64 mangles non-ASCII (é, ü, emoji, etc.) because
  // it operates per-charcode. In Node you MUST round-trip through a UTF-8
  // Buffer so multi-byte code points are encoded correctly:
  const base64Content = Buffer.from(content, "utf-8").toString("base64");

  // 3) PUT. Include `sha` ONLY when updating. Omitting sha on an existing file
  // returns 422 "sha wasn't supplied"; supplying a stale sha returns 409.
  const body: Record<string, unknown> = {
    message,
    content: base64Content,
    branch,
  };
  if (existingSha) body.sha = existingSha;

  const putUrl = `${GITHUB_API}/repos/${owner}/${repo}/contents/${encodeContentsPath(path)}`;
  const res = await fetch(putUrl, {
    method: "PUT",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `GitHub PUT contents failed: ${res.status} ${res.statusText} - ${await safeBody(res)}`,
    );
  }

  // 4) Parse. Response shape:
  //    { content: { sha, path, ... }, commit: { sha, ... } }
  const json = (await res.json()) as {
    commit?: { sha?: string };
    content?: { sha?: string };
  };
  const commitSha = json.commit?.sha;
  if (!commitSha) {
    throw new Error("GitHub PUT contents: response missing commit.sha.");
  }

  return {
    ok: true,
    commitSha,
    blobSha: json.content?.sha ?? "",
    updated: existingSha !== null,
  };
}

/** Encode each path segment but keep the slashes between segments. */
function encodeContentsPath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
}

async function safeBody(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 500);
  } catch {
    return "<no body>";
  }
}
