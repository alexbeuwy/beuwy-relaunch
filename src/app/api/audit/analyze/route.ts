import { NextResponse } from "next/server";
import type { Check } from "@/lib/audit";

/**
 * Schritt 2 des Website-Checks: Claude bewertet auf Basis des ECHTEN
 * Seiteninhalts (nicht nur des Domain-Namens) plus der deterministischen
 * Befunde aus Schritt 1. Befunde in Geschäfts-Sprache, nicht in Technik.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `Du bist Analyst für digitale Vertriebssysteme bei beuwy.
Du bekommst: eine Domain, den Textinhalt ihrer Startseite und technische Befunde.
Die Besitzer sind meist inhabergeführte Finanz-/Immobilien-/Dienstleistungs-Unternehmen.

Bewerte aus Sicht eines Kaufinteressenten, der zuerst Google-AI-Übersichten und
Chat-Assistenten fragt:
1) Würde eine Maschine diese Firma als Antwort auf Fragen ihrer Kategorie nennen?
2) Ist die Positionierung in einem Satz erkennbar und nachsprechbar?
3) Gibt die Seite einem Besucher sofort etwas (Werkzeug, Antwort, nächster Schritt)?

Regeln für deine Ausgabe:
- score: 0-100, ehrlich, konsistent mit den technischen Befunden.
- visibility: 2-3 Sätze, direkt an den Inhaber gerichtet (Sie-Form).
- weaknesses: genau 3, in GESCHÄFTS-Sprache (was es kostet), nicht Technik-Jargon.
  Schlecht: "llms.txt fehlt". Gut: "Wer ChatGPT nach Anbietern in Ihrer Region
  fragt, bekommt Ihre Wettbewerber genannt — Sie kommen nicht vor."
- recommendations: genau 3, konkret umsetzbar, mit grober Aufwandsangabe.
- Deutsch, präzise, kein Marketing-Slang, keine Übertreibung.

Antworte NUR mit JSON: {"score": n, "visibility": "...", "weaknesses": ["...","...","..."], "recommendations": ["...","...","..."]}`;

export async function POST(req: Request) {
  let body: {
    domain?: string;
    pageText?: string;
    checks?: Check[];
    techScore?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const domain = (body.domain || "").slice(0, 200);
  const pageText = (body.pageText || "").slice(0, 4000);
  const checks = Array.isArray(body.checks) ? body.checks.slice(0, 12) : [];
  if (!domain) {
    return NextResponse.json({ error: "domain_required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      domain,
      score: body.techScore ?? 50,
      visibility:
        "Demo-Modus: Die AI-Analyse ist hier nicht aktiv. Die technischen Befunde oben sind echt.",
      weaknesses: [],
      recommendations: [],
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
        max_tokens: 1200,
        system: SYSTEM_PROMPT,
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
      signal: AbortSignal.timeout(45_000),
    });

    if (!r.ok) {
      return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
    }

    const data = (await r.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.find((c) => c.type === "text")?.text || "";
    const cleaned = text
      .replace(/^```(?:json)?/i, "")
      .replace(/```\s*$/, "")
      .trim();

    let parsed: {
      score?: number;
      visibility?: string;
      weaknesses?: string[];
      recommendations?: string[];
    };
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
    }

    return NextResponse.json({
      domain,
      score: Math.min(100, Math.max(0, Math.round(parsed.score ?? 50))),
      visibility: (parsed.visibility || "—").slice(0, 900),
      weaknesses: (parsed.weaknesses || []).slice(0, 3).map((s) => String(s).slice(0, 300)),
      recommendations: (parsed.recommendations || [])
        .slice(0, 3)
        .map((s) => String(s).slice(0, 300)),
      source: "anthropic",
      generated_at: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "analysis_failed" }, { status: 502 });
  }
}
