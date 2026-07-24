import { NextResponse } from "next/server";
import type { Check } from "@/lib/audit";
import { packShare, unpackShare } from "@/lib/audit-share";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Schritt 2 des Website-Checks (v2): Claude bewertet auf Basis des ECHTEN
 * Seiteninhalts + der deterministischen Befunde. Liefert Gesamt-Score,
 * 4 Kategorie-Ratings (die 5. "Technische Basis" rechnet der Client aus den
 * Checks) und 5-7 priorisierte Befunde in Geschäfts-Sprache.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `Du bist Analyst für digitale Vertriebssysteme bei beuwy.
Du bekommst: eine Domain, den Textinhalt ihrer Startseite und technische Befunde.
Die Besitzer sind meist inhabergeführte Finanz-/Immobilien-/Dienstleistungs-Unternehmen
(Inhaber 45-60, wenig Geduld, verlustavers).

Bewerte aus Sicht eines Kaufinteressenten, der zuerst Google-AI-Übersichten und
Chat-Assistenten (ChatGPT, Perplexity) fragt, bevor er anruft. Liefere dein
Ergebnis über das Tool submit_analysis.

Regeln:
- categories: exakt die 4 vorgegebenen, in dieser Reihenfolge.
- findings: 5 bis 7 Stück, sortiert nach impact absteigend, dann effort aufsteigend.
- cost NIE in Technik-Jargon. Schlecht: "llms.txt fehlt". Gut: "Wer ChatGPT nach
  Anbietern in Ihrer Region fragt, bekommt Ihre Wettbewerber genannt — nicht Sie."
- Deutsch, Sie-Form, präzise, keine Übertreibung, keine erfundenen Zahlen, keine Emojis.`;

/* Tool-Schema: Die API erzwingt valides JSON — kein String-Parsing nötig. */
const ANALYSIS_TOOL = {
  name: "submit_analysis",
  description: "Liefert das strukturierte Analyse-Ergebnis ab.",
  input_schema: {
    type: "object",
    required: ["score", "visibility", "categories", "findings"],
    properties: {
      score: { type: "integer", minimum: 0, maximum: 100 },
      visibility: {
        type: "string",
        description: "2-3 Sätze, Sie-Form, was die Maschine über den Inhaber denkt",
      },
      categories: {
        type: "array",
        minItems: 4,
        maxItems: 4,
        items: {
          type: "object",
          required: ["id", "label", "score", "reason"],
          properties: {
            id: {
              type: "string",
              enum: ["sichtbarkeit", "positionierung", "vertrauen", "conversion"],
            },
            label: { type: "string" },
            score: { type: "integer", minimum: 0, maximum: 100 },
            reason: { type: "string", description: "1 Satz" },
          },
        },
      },
      findings: {
        type: "array",
        minItems: 5,
        maxItems: 7,
        items: {
          type: "object",
          required: ["title", "cost", "fix", "effort", "impact"],
          properties: {
            title: { type: "string", description: "3-6 Wörter" },
            cost: { type: "string", description: "1 Satz Geschäftssprache: was es kostet" },
            fix: { type: "string", description: "1-2 Sätze konkrete Empfehlung" },
            effort: { type: "string", enum: ["S", "M", "L"] },
            impact: { type: "integer", minimum: 1, maximum: 3 },
          },
        },
      },
    },
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  sichtbarkeit: "Auffindbarkeit bei KI & Google",
  positionierung: "Klarheit des Angebots",
  vertrauen: "Vertrauens- & Kompetenzsignale",
  conversion: "Nächster Schritt für Besucher",
};

/** Tagesdeckel für die KI-Analyse (Kostenschutz) — zählt in Supabase, fail-open. */
async function quotaAllows(): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  const secret = process.env.AUDIT_WRITE_SECRET;
  if (!url || !key || !secret) return true;
  try {
    const r = await fetch(`${url}/rest/v1/rpc/bump_audit_quota`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ p_max: 300, p_secret: secret }),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!r.ok) return true;
    return (await r.json()) === true;
  } catch {
    return true;
  }
}

type ScanShare = {
  kind: string;
  domain: string;
  finalUrl: string;
  checks: Check[];
  techScore: number;
  pageText: string;
};

export async function POST(req: Request) {
  if (!rateLimit(`analyze:${clientIp(req)}`, 6, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: {
    domain?: string;
    pageText?: string;
    checks?: Check[];
    techScore?: number;
    share?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Signierter Scan als Basis? Dann zählen NUR dessen verifizierte Daten —
  // und nur dann wird die Analyse ihrerseits signiert (cachebar für /check).
  const scanShare = unpackShare<ScanShare>(body.share);
  const verified = scanShare?.kind === "scan" ? scanShare : null;

  const domain = (verified?.domain ?? body.domain ?? "").slice(0, 200);
  const pageText = (verified?.pageText ?? body.pageText ?? "").slice(0, 4000);
  const rawChecks = verified?.checks ?? body.checks;
  const checks = Array.isArray(rawChecks) ? rawChecks.slice(0, 12) : [];
  if (!domain) {
    return NextResponse.json({ error: "domain_required" }, { status: 400 });
  }

  if (!(await quotaAllows())) {
    return NextResponse.json({ error: "quota_exceeded" }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      domain,
      score: verified?.techScore ?? body.techScore ?? 50,
      visibility:
        "Demo-Modus: Die KI-Analyse ist hier nicht aktiv. Die technischen Befunde oben sind echt.",
      categories: [],
      findings: [],
      source: "demo",
      generated_at: new Date().toISOString(),
    });
  }

  const checkLines = checks
    .map((c) => `- ${c.label}: ${c.ok ? "OK" : "FEHLT"} (${c.detail})`)
    .join("\n");

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 2400,
        system: SYSTEM_PROMPT,
        tools: [ANALYSIS_TOOL],
        tool_choice: { type: "tool", name: "submit_analysis" },
        messages: [
          {
            role: "user",
            content: `Domain: ${domain}

Technische Befunde (deterministisch geprüft):
${checkLines || "(keine)"}

Textinhalt der Startseite (Auszug):
"""
${pageText || "(kein Text extrahierbar)"}
"""`,
          },
        ],
      }),
      signal: AbortSignal.timeout(50_000),
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      console.error("[analyze] API-Fehler:", r.status, errText.slice(0, 300));
      return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
    }

    const data = (await r.json()) as {
      content?: Array<{ type: string; input?: unknown }>;
    };
    const toolUse = data.content?.find((c) => c.type === "tool_use");
    if (!toolUse || typeof toolUse.input !== "object" || toolUse.input === null) {
      console.error("[analyze] Kein tool_use-Block in der Antwort");
      return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
    }
    const parsed = toolUse.input as {
      score?: number;
      visibility?: string;
      categories?: Array<{ id?: string; label?: string; score?: number; reason?: string }>;
      findings?: Array<{ title?: string; cost?: string; fix?: string; effort?: string; impact?: number }>;
    };

    const clampScore = (n: unknown) =>
      Math.min(100, Math.max(0, Math.round(Number(n) || 0)));
    const effort = (e: unknown) =>
      ["S", "M", "L"].includes(String(e)) ? String(e) : "M";
    const impact = (i: unknown) => Math.min(3, Math.max(1, Math.round(Number(i) || 2)));

    const analysis = {
      domain,
      score: clampScore(parsed.score ?? 50),
      visibility: (parsed.visibility || "—").slice(0, 900),
      categories: (parsed.categories || []).slice(0, 4).map((c) => ({
        id: String(c.id || "").slice(0, 30),
        label: String(c.label || CATEGORY_LABELS[String(c.id)] || "").slice(0, 60),
        score: clampScore(c.score),
        reason: String(c.reason || "").slice(0, 240),
      })),
      findings: (parsed.findings || []).slice(0, 7).map((f) => ({
        title: String(f.title || "").slice(0, 80),
        cost: String(f.cost || "").slice(0, 300),
        fix: String(f.fix || "").slice(0, 300),
        effort: effort(f.effort),
        impact: impact(f.impact),
      })),
      source: "anthropic" as const,
      generated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      ...analysis,
      // Nur Analysen auf Basis eines signierten Scans sind ihrerseits signiert
      // — und damit die einzigen, die /api/audit/save in den Cache lässt.
      share: verified ? packShare({ kind: "analysis", ...analysis }) : null,
    });
  } catch {
    return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
  }
}
