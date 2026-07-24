import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { unpackShare } from "@/lib/audit-share";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { Check } from "@/lib/audit";

/**
 * Legt ein abgeschlossenes Check-Ergebnis als teilbares Gutachten unter
 * /check/{domain} ab. Akzeptiert AUSSCHLIESSLICH von unseren eigenen Routen
 * signierte Payloads (HMAC) — gefälschte oder manipulierte Ergebnisse unter
 * fremden Domains sind damit ausgeschlossen. Schreibt über die
 * SECURITY-DEFINER-RPC set_audit_result (Muster: set_website_content).
 */

export const runtime = "nodejs";

type ScanShare = {
  kind: string;
  domain: string;
  finalUrl: string;
  checks: Check[];
  techScore: number;
};

type AnalysisShare = {
  kind: string;
  domain: string;
  score: number;
  visibility: string;
  categories: Array<{ id: string; label: string; score: number; reason: string }>;
  findings: Array<{ title: string; cost: string; fix: string; effort: string; impact: number }>;
  source: string;
  generated_at: string;
};

type ShotShare = { kind: string; domain: string; screenshotUrl: string };

export async function POST(req: Request) {
  if (!rateLimit(`auditsave:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const writeSecret = process.env.AUDIT_WRITE_SECRET;
  if (!supabaseUrl || !anonKey || !writeSecret) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: { scan?: unknown; analysis?: unknown; shot?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const scan = unpackShare<ScanShare>(body.scan);
  const analysis = unpackShare<AnalysisShare>(body.analysis);
  const shot = body.shot ? unpackShare<ShotShare>(body.shot) : null;

  if (!scan || scan.kind !== "scan" || !analysis || analysis.kind !== "analysis") {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 422 });
  }
  if (analysis.source !== "anthropic") {
    return NextResponse.json({ ok: false, error: "demo_not_cacheable" }, { status: 422 });
  }

  const domain = scan.domain.toLowerCase();
  if (analysis.domain.toLowerCase() !== domain) {
    return NextResponse.json({ ok: false, error: "domain_mismatch" }, { status: 422 });
  }
  const screenshotUrl =
    shot && shot.kind === "shot" && shot.domain.toLowerCase() === domain
      ? shot.screenshotUrl
      : null;

  const payload = {
    domain,
    finalUrl: scan.finalUrl,
    checks: scan.checks,
    techScore: scan.techScore,
    analysis: {
      score: analysis.score,
      visibility: analysis.visibility,
      categories: analysis.categories,
      findings: analysis.findings,
      generated_at: analysis.generated_at,
    },
  };

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/set_audit_result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        p_domain: domain,
        p_payload: payload,
        p_screenshot_url: screenshotUrl,
        p_secret: writeSecret,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[audit/save] set_audit_result fehlgeschlagen:", res.status);
      return NextResponse.json({ ok: false, error: "store_failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("[audit/save] Supabase nicht erreichbar:", e);
    return NextResponse.json({ ok: false, error: "store_failed" }, { status: 502 });
  }

  revalidatePath(`/check/${domain}`);
  return NextResponse.json({ ok: true, url: `/check/${encodeURIComponent(domain)}` });
}
