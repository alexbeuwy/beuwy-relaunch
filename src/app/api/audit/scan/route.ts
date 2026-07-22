import { NextResponse } from "next/server";
import {
  normalizeDomain,
  assertPublicHost,
  fetchPage,
  fileExists,
  runChecks,
  extractText,
  takeScreenshot,
} from "@/lib/audit";

/**
 * Schritt 1 des Website-Checks (Masterplan §6): deterministisch, ohne LLM.
 * Screenshot + prüfbare Fakten — das Ergebnis erscheint sofort, während die
 * Claude-Analyse (Schritt 2, /api/audit/analyze) noch läuft.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let body: { domain?: string };
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

  const page = await fetchPage(domain);
  if (!page) {
    return NextResponse.json({ error: "fetch_failed" }, { status: 422 });
  }

  const [llmsTxt, robotsTxt, screenshot] = await Promise.all([
    fileExists(domain, "/llms.txt"),
    fileExists(domain, "/robots.txt"),
    takeScreenshot(page.finalUrl),
  ]);

  const { checks, techScore } = runChecks(page.html, { llmsTxt, robotsTxt });

  return NextResponse.json({
    domain,
    finalUrl: page.finalUrl,
    screenshot,
    checks,
    techScore,
    pageText: extractText(page.html),
    generated_at: new Date().toISOString(),
  });
}
