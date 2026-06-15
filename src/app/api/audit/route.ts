import { NextResponse } from "next/server";

/**
 * In-depth Brand Audit Route
 *
 * Liefert eine 6-dimensionale Analyse + einen Screenshot-Preview der Site
 * für den Glaubwürdigkeits-Anker.
 *
 * Env (Vercel):
 *   ANTHROPIC_API_KEY    — pflicht für live (Claude Opus 4.7 oder höher)
 */

const SYSTEM_PROMPT = `Du bist Senior Brand- und Conversion-Analyst für die Agent-Ära.
Du analysierst eine Domain in genau 6 Dimensionen. Jede Dimension wird mit
1-10 Punkten bewertet, einer 1-Satz-Begründung mit konkretem Evidence-Beleg
("auf der Hero steht…", "im Footer fehlt…"), und genau 1 sofort umsetzbaren
Fix-Vorschlag in 5-12 Wörtern.

Die 6 Dimensionen:
1) positioning   – Hat die Marke eine erkennbare, unterscheidbare These? Oder ist sie ein "AI for X"-Klon?
2) voice         – Klingt die Marke wie ein bestimmtes Unternehmen? Oder wie ein generischer SaaS-Output?
3) agent_layer   – Ist die Site maschinenlesbar (schema.org, llms.txt, semantisches HTML, klare Headlines)? Wird ein LLM die Marke als plausible Antwort in der Kategorie nennen?
4) trust         – Cases mit harten Zahlen, Founder-Footprint, Social Proof, Zitate? Oder Lorem-Ipsum-Testimonials?
5) pricing       – Ist Pricing sichtbar/transparent? Oder "Contact us" — Reibung vor Wertversprechen?
6) conversion    – Ist die CTA klar, sofort sichtbar, action-spezifisch? Oder generisches "Learn More" am Ende?

Schreib auf Deutsch. Knapp, scharf, kein Marketing-Slang.
Keine Floskeln wie "könnte verbessert werden". Sei konkret und nenne Belege.`;

type Dimension = "positioning" | "voice" | "agent_layer" | "trust" | "pricing" | "conversion";

type DimResult = {
  score: number;
  finding: string;
  fix: string;
};

type AuditResult = {
  domain: string;
  screenshot_url: string;
  overall_score: number;
  one_liner: string;
  dimensions: Record<Dimension, DimResult>;
  source: "anthropic" | "stub";
  generated_at: string;
};

const DIM_ORDER: Dimension[] = [
  "positioning",
  "voice",
  "agent_layer",
  "trust",
  "pricing",
  "conversion",
];

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
  const domain = raw
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .toLowerCase();

  // Free, no-key screenshot service — embeds in result card.
  const screenshot_url = `https://image.thum.io/get/png/maxAge/24/width/1280/https://${domain}`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(makeStub(domain, screenshot_url));
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
        model: "claude-opus-4-7",
        max_tokens: 2400,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Analysiere die Marke unter https://${domain}

Liefere reines JSON in genau diesem Shape:
{
  "one_liner": "<ein Satz: dieser Satz fasst die Marke aus LLM-Sicht zusammen — wie ein Modell sie beschreiben würde>",
  "dimensions": {
    "positioning":  { "score": <1-10>, "finding": "<1 Satz mit Evidence>", "fix": "<5-12 Wörter Fix>" },
    "voice":        { "score": <1-10>, "finding": "...", "fix": "..." },
    "agent_layer":  { "score": <1-10>, "finding": "...", "fix": "..." },
    "trust":        { "score": <1-10>, "finding": "...", "fix": "..." },
    "pricing":      { "score": <1-10>, "finding": "...", "fix": "..." },
    "conversion":   { "score": <1-10>, "finding": "...", "fix": "..." }
  }
}

Kein Markdown, keine Erklärung außerhalb des JSON. Streng JSON-konform.`,
          },
        ],
      }),
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      const stub = makeStub(domain, screenshot_url);
      stub.one_liner = `(Anthropic-API-Fehler ${r.status} — Fallback unten). ${errText.slice(0, 120)}`;
      return NextResponse.json(stub);
    }

    const data = (await r.json()) as { content?: Array<{ type: string; text?: string }> };
    const text = data.content?.find((c) => c.type === "text")?.text || "";

    let parsed: { one_liner?: string; dimensions?: Record<Dimension, DimResult> } = {};
    try {
      const cleaned = text
        .replace(/^```(?:json)?/i, "")
        .replace(/```$/, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      const stub = makeStub(domain, screenshot_url);
      stub.one_liner = "(Claude-Response konnte nicht geparst werden — Fallback unten)";
      return NextResponse.json(stub);
    }

    const dims = parsed.dimensions || ({} as Record<Dimension, DimResult>);
    const dimensions = DIM_ORDER.reduce<Record<Dimension, DimResult>>((acc, k) => {
      const d = dims[k];
      acc[k] = {
        score: typeof d?.score === "number" ? Math.max(1, Math.min(10, d.score)) : 5,
        finding: d?.finding || "—",
        fix: d?.fix || "—",
      };
      return acc;
    }, {} as Record<Dimension, DimResult>);

    const overall_score = Math.round(
      (DIM_ORDER.reduce((sum, k) => sum + dimensions[k].score, 0) / DIM_ORDER.length) * 10
    );

    const result: AuditResult = {
      domain,
      screenshot_url,
      overall_score,
      one_liner: parsed.one_liner || "—",
      dimensions,
      source: "anthropic",
      generated_at: new Date().toISOString(),
    };
    return NextResponse.json(result);
  } catch (err) {
    const stub = makeStub(domain, screenshot_url);
    stub.one_liner = "(Network-Fehler beim Anthropic-Call — Fallback-Daten unten)";
    return NextResponse.json(stub);
  }
}

function makeStub(domain: string, screenshot_url: string): AuditResult {
  const seed = domain.length;
  const baseScores: Record<Dimension, number> = {
    positioning: 3 + (seed % 4),
    voice: 4 + ((seed >> 1) % 3),
    agent_layer: 2 + (seed % 4),
    trust: 5 + ((seed >> 2) % 3),
    pricing: 3 + ((seed >> 3) % 4),
    conversion: 4 + ((seed >> 1) % 4),
  };
  const dimensions: Record<Dimension, DimResult> = {
    positioning: {
      score: baseScores.positioning,
      finding: "Hero benutzt 'AI-powered platform for…' – Pattern-Match mit 50+ Wettbewerbern.",
      fix: "Eine kategoriebildende These auf den Hero",
    },
    voice: {
      score: baseScores.voice,
      finding: "Voice fühlt sich generisch SaaS an. Keine Founder-Stimme. Keine Voice-Charter abrufbar.",
      fix: "Voice-Charter + 12 Forbidden Phrases",
    },
    agent_layer: {
      score: baseScores.agent_layer,
      finding: "Kein llms.txt, kein schema.org/Organization, semantic HTML schwach. LLM hat nichts zum Zitieren.",
      fix: "llms.txt + schema.org + DESIGN.md ins Repo",
    },
    trust: {
      score: baseScores.trust,
      finding: "Logos ohne Kontext. Keine harten Zahlen. Kein Founder-Footprint.",
      fix: "Drei Cases mit ehrlichen KPIs in den Hero",
    },
    pricing: {
      score: baseScores.pricing,
      finding: "'Contact Sales' statt sichtbarem Preis. Reibung vor Wert.",
      fix: "Festpreis-Range sichtbar machen",
    },
    conversion: {
      score: baseScores.conversion,
      finding: "Generisches 'Learn More'. Keine Slot-Verknappung, kein klares Next-Action.",
      fix: "CTA: konkret + Verknappung sichtbar",
    },
  };
  return {
    domain,
    screenshot_url,
    overall_score: Math.round(
      (DIM_ORDER.reduce((sum, k) => sum + dimensions[k].score, 0) / DIM_ORDER.length) * 10
    ),
    one_liner:
      `${domain} liest sich aus LLM-Sicht wie ein generisches Tool in einer überfüllten Kategorie — keine erkennbare These, kein Agent-Layer, austauschbar. (Stub-Daten — sobald ANTHROPIC_API_KEY gesetzt ist, läuft die Live-Analyse.)`,
    dimensions,
    source: "stub",
    generated_at: new Date().toISOString(),
  };
}

export const runtime = "nodejs";
