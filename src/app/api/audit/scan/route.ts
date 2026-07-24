import { NextResponse } from "next/server";
import {
  normalizeDomain,
  assertPublicHost,
  fetchPage,
  fileExists,
  runChecks,
  extractText,
} from "@/lib/audit";
import { packShare } from "@/lib/audit-share";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Schritt 1 des Website-Checks (Masterplan §6): deterministisch, ohne LLM.
 * Screenshot + prüfbare Fakten — das Ergebnis erscheint sofort, während die
 * Claude-Analyse (Schritt 2, /api/audit/analyze) noch läuft.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!rateLimit(`scan:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { domain?: string; debug?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const domain = normalizeDomain(body.domain || "");
  if (!domain || !domain.includes(".")) {
    return NextResponse.json({ error: "domain_required" }, { status: 400 });
  }

  try {
    await assertPublicHost(domain);
  } catch (e) {
    const code = e instanceof Error ? e.message : "blocked_host";
    return NextResponse.json(
      { error: code === "dns_failed" ? "domain_not_found" : "domain_blocked" },
      { status: 422 }
    );
  }

  // Alles von Anfang an parallel — der Scan antwortet in ~1,5-3s.
  // Der Screenshot läuft NICHT mehr hier (eigene Route, parallel zur Analyse).
  const [page, llmsTxt, robotsTxt] = await Promise.all([
    fetchPage(domain),
    fileExists(domain, "/llms.txt"),
    fileExists(domain, "/robots.txt"),
  ]);
  if (!page) {
    return NextResponse.json({ error: "fetch_failed" }, { status: 422 });
  }

  const { checks, techScore } = runChecks(page.html, { llmsTxt, robotsTxt });
  const pageText = extractText(page.html);
  const generated_at = new Date().toISOString();

  return NextResponse.json({
    domain,
    finalUrl: page.finalUrl,
    checks,
    techScore,
    pageText,
    generated_at,
    // Signierter Scan — einzige akzeptierte Basis für ein cachebares Gutachten.
    share: packShare({
      kind: "scan",
      domain,
      finalUrl: page.finalUrl,
      checks,
      techScore,
      pageText,
      generated_at,
    }),
  });
}
