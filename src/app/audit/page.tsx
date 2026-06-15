"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

type Dimension = "positioning" | "voice" | "agent_layer" | "trust" | "pricing" | "conversion";
type DimResult = { score: number; finding: string; fix: string };
type AuditResult = {
  domain: string;
  screenshot_url: string;
  overall_score: number;
  one_liner: string;
  dimensions: Record<Dimension, DimResult>;
  source: "anthropic" | "stub";
  generated_at: string;
};

const DIM_META: Record<Dimension, { label: string; sub: string }> = {
  positioning: { label: "Positionierung", sub: "Unterscheidbare These?" },
  voice: { label: "Voice", sub: "Klingt nach dir oder nach SaaS-Output?" },
  agent_layer: { label: "Agent-Layer", sub: "schema.org · llms.txt · semantic HTML" },
  trust: { label: "Trust", sub: "Cases · Zahlen · Founder-Footprint" },
  pricing: { label: "Pricing", sub: "Transparent oder 'Contact us'?" },
  conversion: { label: "Conversion", sub: "Action-spezifische CTA?" },
};

const DIM_ORDER: Dimension[] = ["positioning", "voice", "agent_layer", "trust", "pricing", "conversion"];

export default function AuditPage() {
  return (
    <Suspense fallback={null}>
      <AuditInner />
    </Suspense>
  );
}

function AuditInner() {
  const params = useSearchParams();
  const initial = params.get("domain") || "";
  const [domain, setDomain] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial && !result && !loading) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  async function run(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setError(j?.error || `Fehler ${r.status}`);
        return;
      }
      const data = (await r.json()) as AuditResult;
      setResult(data);
    } catch {
      setError("Netzwerk-Fehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="section-band section-band-base pt-[140px] md:pt-[180px] pb-[40px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">
              <span className="num">/</span> Audit · 60 Sek
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h-display-xl mt-7 max-w-[1100px]">
              Was sagt Claude über <em className="gradient-text">deine</em> Marke?
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[680px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Domain rein, 60 Sekunden warten. Wir liefern <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>6 Dimensionen</em>,
              Score pro Dimension, Evidence + sofort-Fix. Kostenlos, kein Login.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Form" title="Domain eingeben" date="2026 / 01" tone="raised" divider={false}>
        <form onSubmit={run} className="max-w-[680px]">
          <label
            style={{
              color: "var(--ink-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Deine Domain
          </label>
          <div
            className="mt-3 rounded-[12px] p-2 flex items-stretch gap-2"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line-subtle)",
            }}
          >
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
              placeholder="deine-marke.de"
              className="flex-1 px-4 py-3 rounded-[10px]"
              style={{
                background: "transparent",
                color: "var(--ink-cream)",
                fontSize: 15,
                outline: "none",
                border: "1px solid var(--line-subtle)",
                fontFamily: "var(--font-mono)",
              }}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Claude analysiert…" : "Audit starten"}
              <span aria-hidden>→</span>
            </button>
          </div>
          {error && (
            <p className="mt-3" style={{ color: "var(--accent-red,#FF5A67)", fontSize: 13 }}>
              {error}
            </p>
          )}
        </form>

        {result && <Result result={result} />}
      </Section>
    </>
  );
}

function Result({ result }: { result: AuditResult }) {
  return (
    <div className="mt-16 space-y-10">
      {/* Header row: Screenshot + Score + One-liner */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-5">
          <div className="audit-screenshot-frame">
            <div className="audit-screenshot-chrome">
              <span className="audit-dot" style={{ background: "#3a1212" }} />
              <span className="audit-dot" style={{ background: "#3a1212" }} />
              <span className="audit-dot" style={{ background: "#3a1212" }} />
              <span className="audit-url">{result.domain}</span>
            </div>
            <div className="audit-screenshot-canvas">
              {/* plain img so missing/blocked screenshot just collapses */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.screenshot_url}
                alt={`Screenshot von ${result.domain}`}
                className="audit-screenshot-img"
                loading="lazy"
              />
              <span className="audit-screenshot-watermark">analysiert</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="glass p-7">
            <span
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
              }}
            >
              AGENT-VISIBILITY-SCORE
            </span>
            <p className="audit-score">
              {result.overall_score}
              <span className="audit-score-suffix">/100</span>
            </p>
            <p
              className="mt-2"
              style={{
                color: "var(--ink-cream)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.04em",
              }}
            >
              für {result.domain}
            </p>
          </div>
          <div className="glass p-7">
            <span
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
              }}
            >
              SO LIEST CLAUDE DEINE MARKE
            </span>
            <p
              className="mt-3 font-display"
              style={{
                fontSize: 22,
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "var(--ink-yellow)",
              }}
            >
              {result.one_liner}
            </p>
            <p
              className="mt-4"
              style={{
                color: "var(--ink-dim)",
                fontSize: 11,
                letterSpacing: "0.02em",
              }}
            >
              {result.source === "anthropic"
                ? "Live von Claude · " + new Date(result.generated_at).toLocaleString("de-DE")
                : "Stub-Response · ANTHROPIC_API_KEY noch nicht gesetzt"}
            </p>
          </div>
        </div>
      </div>

      {/* Dimensions grid */}
      <div>
        <p
          style={{
            color: "var(--ink-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          6 Dimensionen · Score · Evidence · Fix
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {DIM_ORDER.map((key) => {
            const d = result.dimensions[key];
            const meta = DIM_META[key];
            return (
              <div key={key} className="glass p-6 audit-dim-card" data-score={d.score}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="font-display"
                      style={{
                        fontSize: 22,
                        letterSpacing: "-0.015em",
                        color: "var(--ink-yellow)",
                        lineHeight: 1.1,
                      }}
                    >
                      {meta.label}
                    </p>
                    <p
                      className="mt-1"
                      style={{
                        color: "var(--ink-dim)",
                        fontSize: 12,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {meta.sub}
                    </p>
                  </div>
                  <ScoreBadge score={d.score} />
                </div>
                <p
                  className="mt-5"
                  style={{
                    color: "var(--ink-cream)",
                    fontSize: 14,
                    lineHeight: "22px",
                  }}
                >
                  {d.finding}
                </p>
                <div
                  className="mt-5 pt-4"
                  style={{ borderTop: "1px solid var(--line-subtle)" }}
                >
                  <p
                    style={{
                      color: "var(--ink-yellow)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    ↳ Fix
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      color: "var(--ink-cream)",
                      fontSize: 14,
                      fontWeight: 510,
                      lineHeight: "20px",
                    }}
                  >
                    {d.fix}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass p-7 md:p-10">
        <p
          className="font-display"
          style={{
            fontSize: 28,
            letterSpacing: "-0.02em",
            color: "var(--ink-yellow)",
            lineHeight: 1.15,
          }}
        >
          Diese 6 Fixes umsetzen? <em className="font-display italic">10 Tage</em>. Festpreis. Live.
        </p>
        <p
          className="mt-3 max-w-[640px]"
          style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}
        >
          Der Audit ist der Diagnose-Touchpoint. Wir setzen die Fixes als Brand-System +
          Live-Site + Agent-Layer um. Ein Operator, ein Festpreis, ein Liefertag.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/anfrage" className="btn-primary">
            Slot sichern
            <span aria-hidden>→</span>
          </Link>
          <Link href="/method" className="btn-secondary">
            Methode lesen
          </Link>
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 8 ? "good" : score >= 5 ? "ok" : "bad";
  return (
    <span className={`audit-score-badge audit-score-${cls}`} aria-label={`Score ${score} von 10`}>
      <span className="audit-score-num">{score}</span>
      <span className="audit-score-denom">/10</span>
    </span>
  );
}
