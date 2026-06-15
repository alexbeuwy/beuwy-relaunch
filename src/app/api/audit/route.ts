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

const SYSTEM_PROMPT = `Du bist das beuwy-Agenten-Analyse-Panel — ein Senior Brand- und Conversion-Analyst für die Agent-Ära, der quer über Claude, ChatGPT, Codex, Gemini, Grok, DeepSeek und Perplexity denkt.

Du bekommst den TATSÄCHLICHEN Seiteninhalt (Title, Meta, Headlines, Text-Snippets) einer Domain. Du analysierst in genau 6 Dimensionen. Jede Dimension: 1-10 Punkte, eine 1-2-Satz-Begründung MIT konkretem Beleg AUS DEM ECHTEN INHALT, und genau 1 sofort umsetzbarer Fix in 5-12 Wörtern.

ABSOLUT PFLICHT für Glaubwürdigkeit:
- Zitiere in MINDESTENS 2 der 6 findings eine echte Headline / einen echten Satz der Seite WÖRTLICH in »Anführungszeichen«. Beispiel: »Die Hero sagt »AI-powered platform for teams« — das matcht mit 50 Wettbewerbern.«
- Beziehe dich konkret auf das, was wirklich da steht (oder fehlt). Niemals generisch. Wenn ein llms.txt / schema fehlt, sag das. Wenn die H1 stark ist, lobe sie konkret.
- Jede Begründung muss sich lesen, als hätte ein Mensch die Seite WIRKLICH geöffnet.

Die 6 Dimensionen:
1) positioning   – Hat die Marke eine erkennbare, unterscheidbare These? Oder ein "AI for X"-Klon? (Zitiere die Hero-Headline.)
2) voice         – Klingt die Marke nach einem bestimmten Unternehmen oder nach generischem SaaS-Output? (Zitiere eine echte Formulierung.)
3) agent_layer   – Maschinenlesbar (schema.org, llms.txt, semantic HTML, klare Headlines)? Würde ein LLM die Marke als Top-3-Antwort der Kategorie nennen?
4) trust         – Cases mit harten Zahlen, Founder-Footprint, echte Quotes? Oder Lorem-Ipsum?
5) pricing       – Pricing sichtbar/transparent oder "Contact us"?
6) conversion    – CTA klar, action-spezifisch, sofort sichtbar? Oder generisches "Learn More"? (Zitiere die echte CTA.)

Schreib auf Deutsch. Knapp, scharf, kein Marketing-Slang. Keine Floskeln wie "könnte verbessert werden". Sei konkret und belege alles.`;

/**
 * Fetch the live page and extract the signal a real analyst would skim:
 * title, meta description, h1/h2/h3 text, button/cta labels, and whether
 * machine-readable hints (llms.txt hint, json-ld) are present.
 */
async function fetchPageContext(domain: string): Promise<string> {
  try {
    const res = await fetch(`https://${domain}`, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; beuwy-audit/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return `(Seite antwortete mit Status ${res.status} — Analyse auf Basis der Domain.)`;
    const html = await res.text();
    const slice = html.slice(0, 400_000);

    const pick = (re: RegExp, max = 12) => {
      const out: string[] = [];
      let m: RegExpExecArray | null;
      const r = new RegExp(re.source, "gi");
      while ((m = r.exec(slice)) && out.length < max) {
        const t = m[1]
          .replace(/<[^>]+>/g, " ")
          .replace(/&[a-z]+;/gi, " ")
          .replace(/\s+/g, " ")
          .trim();
        if (t && t.length > 1 && t.length < 200) out.push(t);
      }
      return out;
    };

    const title = (slice.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/\s+/g, " ").trim();
    const desc =
      slice.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      slice.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1] ||
      "";
    const h1 = pick(/<h1[^>]*>([\s\S]*?)<\/h1>/, 6);
    const h2 = pick(/<h2[^>]*>([\s\S]*?)<\/h2>/, 14);
    const ctas = pick(/<(?:button|a)[^>]*>([\s\S]*?)<\/(?:button|a)>/, 24).filter(
      (t) => t.length < 40 && /\b(start|jetzt|demo|kontakt|sign|get|book|buy|try|kaufen|anfrage|los|mehr|contact|learn)\b/i.test(t)
    );
    const hasJsonLd = /application\/ld\+json/i.test(slice);
    const hasLlms = /llms\.txt/i.test(slice);

    return [
      `TITLE: ${title || "—"}`,
      `META: ${desc || "—"}`,
      `H1: ${h1.join(" | ") || "—"}`,
      `H2: ${h2.join(" | ") || "—"}`,
      `CTA-LABELS: ${[...new Set(ctas)].slice(0, 10).join(" | ") || "—"}`,
      `JSON-LD vorhanden: ${hasJsonLd ? "ja" : "nein"}`,
      `llms.txt erwähnt: ${hasLlms ? "ja" : "nein"}`,
    ].join("\n");
  } catch {
    return "(Seite nicht erreichbar — Analyse auf Basis der Domain + Kategorie-Heuristik.)";
  }
}

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
  note?: string;
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

  // Fast, no-key screenshot: Microlink embed returns the PNG directly (302).
  // Loaded lazily on the client AFTER the lead gate, so cold-generation
  // latency is fully hidden behind the form step.
  const screenshot_url = `https://api.microlink.io/?url=${encodeURIComponent(
    "https://" + domain
  )}&screenshot=true&embed=screenshot.url&meta=false&viewport.width=1280&viewport.height=800`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    const stub = makeStub(domain, screenshot_url);
    stub.note = "Demo-Analyse — Live-Analyse aktiviert sich, sobald der API-Key hinterlegt ist.";
    return NextResponse.json(stub);
  }

  // Crawl the real page so the agents can quote actual headlines.
  const pageContext = await fetchPageContext(domain);

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2600,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Analysiere die Marke unter https://${domain}

HIER IST DER ECHTE SEITENINHALT, DEN DIE AGENTEN GECRAWLT HABEN:
"""
${pageContext}
"""

Nutze AUSSCHLIESSLICH diesen echten Inhalt für deine Belege. Zitiere mindestens 2 echte Headlines/Sätze wörtlich in »Anführungszeichen«.

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
      // Never leak raw API errors to the UI. Map to a clean note, keep the
      // demo data so the experience stays intact.
      const errText = await r.text().catch(() => "");
      const stub = makeStub(domain, screenshot_url);
      if (r.status === 400 && /credit balance/i.test(errText)) {
        stub.note = "Demo-Analyse — Live-Kontingent vorübergehend erschöpft.";
      } else if (r.status === 429) {
        stub.note = "Demo-Analyse — gerade hohe Last, gleich wieder live.";
      } else {
        stub.note = "Demo-Analyse — Live-Analyse temporär nicht erreichbar.";
      }
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
      stub.note = "Demo-Analyse — Antwort konnte nicht verarbeitet werden.";
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
    stub.note = "Demo-Analyse — Netzwerk-Fehler.";
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
      `${domain} liest sich aus LLM-Sicht wie ein generisches Tool in einer überfüllten Kategorie — keine erkennbare These, kein Agent-Layer, austauschbar.`,
    dimensions,
    source: "stub",
    generated_at: new Date().toISOString(),
  };
}

export const runtime = "nodejs";
