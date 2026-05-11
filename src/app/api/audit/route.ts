import { NextResponse } from "next/server";

/**
 * GPT-Audit Route
 *
 * Nimmt eine Domain entgegen und fragt Claude (Anthropic API) — bzw. später
 * auch GPT-5 / Gemini / Perplexity — was die jeweilige Marke aus Sicht eines
 * LLM-Buyers leistet, wo Schwächen liegen, wo Cluster kippen.
 *
 * Erforderliche Env Variables (auf Vercel hinterlegen):
 *   ANTHROPIC_API_KEY    — Claude (claude-opus-4)
 *   OPENAI_API_KEY       — optional (für gpt-cross-check)
 *
 * Wenn kein Key gesetzt ist, fällt die Route auf einen Stub-Response zurück,
 * damit das UI weiterhin funktioniert (für lokales Development / Demo).
 */

const SYSTEM_PROMPT = `Du bist ein Brand- und Sichtbarkeits-Analyst für die Agent-Ära.
Du bekommst eine Domain. Dein Job:
1) Bewerte, ob die Marke maschinenlesbar aufgebaut ist (DESIGN-Tokens, Schema, llms.txt, klare These).
2) Bewerte, ob ein LLM (du selbst) diese Marke als plausible Antwort auf Fragen in ihrer Kategorie nennen würde — oder ob sie austauschbar ist.
3) Liefere drei konkrete, scharfe Beobachtungen — nicht generisch.
4) Liefere drei sofort umsetzbare Empfehlungen.

Antwort-Format:
- score (0-100, ehrlich)
- visibility (1-3 Sätze)
- weaknesses (3 Stichpunkte)
- recommendations (3 Stichpunkte, mit Aufwand in Tagen)

Schreib auf Deutsch, knapp, kein Marketing-Slang.`;

type AuditResult = {
  domain: string;
  score: number;
  visibility: string;
  weaknesses: string[];
  recommendations: string[];
  source: "anthropic" | "stub";
  generated_at: string;
};

export async function POST(req: Request) {
  let body: { domain?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const raw = (body.domain || "").trim();
  if (!raw) {
    return NextResponse.json({ error: "domain_required" }, { status: 400 });
  }
  // strip protocol, path
  const domain = raw
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .toLowerCase();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Stub response so the UI works in local dev / before key is set
    const stub: AuditResult = makeStub(domain);
    return NextResponse.json(stub);
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Bitte analysiere: ${domain}

Liefere reines JSON mit folgendem Shape:
{
  "score": <number 0-100>,
  "visibility": "<text>",
  "weaknesses": ["<text>", "<text>", "<text>"],
  "recommendations": ["<text>", "<text>", "<text>"]
}

Kein Markdown, keine Erklärung außerhalb des JSON.`,
          },
        ],
      }),
    });

    if (!r.ok) {
      const stub = makeStub(domain);
      stub.source = "stub";
      stub.visibility = `(Anthropic-API-Fehler ${r.status} — Fallback-Daten unten)`;
      return NextResponse.json(stub);
    }

    const data = (await r.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text = data.content?.find((c) => c.type === "text")?.text || "";

    let parsed: { score?: number; visibility?: string; weaknesses?: string[]; recommendations?: string[] } = {};
    try {
      // strip code fences if present
      const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      const stub = makeStub(domain);
      stub.visibility = `(Claude-Response konnte nicht geparsed werden — Fallback unten)`;
      return NextResponse.json(stub);
    }

    const result: AuditResult = {
      domain,
      score: typeof parsed.score === "number" ? parsed.score : 50,
      visibility: parsed.visibility || "—",
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.slice(0, 3) : [],
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations.slice(0, 3)
        : [],
      source: "anthropic",
      generated_at: new Date().toISOString(),
    };
    return NextResponse.json(result);
  } catch (err) {
    const stub = makeStub(domain);
    stub.visibility = `(Network-Fehler beim Anthropic-Call — Fallback-Daten unten)`;
    return NextResponse.json(stub);
  }
}

function makeStub(domain: string): AuditResult {
  const seed = domain.length;
  return {
    domain,
    score: 38 + (seed % 24),
    visibility:
      `Die Domain "${domain}" wird in ihrer Kategorie aktuell nicht als plausible Top-3-Antwort von einem Modell genannt. ` +
      `Die Brand-Sprache ist nicht maschinenlesbar abgelegt; es gibt keine erkennbare These, die ein Agent re-generieren könnte. ` +
      `(Stub-Response — sobald ANTHROPIC_API_KEY gesetzt ist, läuft die Live-Analyse.)`,
    weaknesses: [
      "Keine maschinenlesbare Brand-Quelle (kein DESIGN.md, kein llms.txt im Root)",
      "Schwammige Positionierung ohne unterscheidbare These — austauschbar mit 12+ Wettbewerbern",
      "Keine strukturierten Daten (schema.org), die ein Agent als Antwort-Bausteine nutzen kann",
    ],
    recommendations: [
      "DESIGN.md + Voice Charter + Forbidden Phrases ins Repo legen — Tag 1, 0,5 Aufwandstage",
      "Eine kategoriebildende These auf der Startseite verankern — Tag 2, 1 Aufwandstag",
      "schema.org Organization + WebSite + FAQ-Schema ergänzen — Tag 3, 0,5 Aufwandstage",
    ],
    source: "stub",
    generated_at: new Date().toISOString(),
  };
}

export const runtime = "nodejs";
