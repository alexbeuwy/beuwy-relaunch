import type { Check } from "@/lib/audit";

/**
 * Lesezugriff auf gecachte Website-Check-Gutachten (public-read RLS).
 * Fail-open: ohne Env oder bei Fehlern gibt es schlicht kein Gutachten.
 */

export type AuditCategory = { id: string; label: string; score: number; reason: string };
export type AuditFinding = {
  title: string;
  cost: string;
  fix: string;
  effort: string;
  impact: number;
};

export type AuditCacheRow = {
  domain: string;
  screenshot_url: string | null;
  updated_at: string;
  payload: {
    domain: string;
    finalUrl: string;
    checks: Check[];
    techScore: number;
    analysis: {
      score: number;
      visibility: string;
      categories: AuditCategory[];
      findings: AuditFinding[];
      generated_at: string;
    };
  };
};

export function sanitizeCheckDomain(raw: string): string | null {
  const d = decodeURIComponent(raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
  if (!d || d.length > 200 || !d.includes(".") || !/^[a-z0-9.-]+$/.test(d)) {
    return null;
  }
  return d;
}

export async function getAuditResult(domain: string): Promise<AuditCacheRow | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const r = await fetch(
      `${url}/rest/v1/audit_results?domain=eq.${encodeURIComponent(domain)}&select=domain,payload,screenshot_url,updated_at`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 300 },
      }
    );
    if (!r.ok) return null;
    const rows = (await r.json()) as AuditCacheRow[];
    const row = rows?.[0];
    if (!row || typeof row.payload !== "object" || !row.payload?.analysis) return null;
    return row;
  } catch {
    return null;
  }
}
