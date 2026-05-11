"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

type AuditResult = {
  domain: string;
  score: number;
  visibility: string;
  weaknesses: string[];
  recommendations: string[];
  source: "anthropic" | "stub";
  generated_at: string;
};

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

  // auto-run when arriving with ?domain=
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
    } catch (err) {
      setError("Netzwerk-Fehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="pt-[140px] md:pt-[180px] pb-[40px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">
              <span className="num">/</span> Audit · 60 Sek
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="h-display mt-7 text-[44px] sm:text-[64px] md:text-[88px] leading-[0.98] max-w-[1100px]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Was sagt ChatGPT über{" "}
              <em className="font-display italic">deine</em> Marke?
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[640px] text-[17px] leading-[1.55]"
              style={{ color: "var(--ink-muted)" }}
            >
              Trag deine Domain ein. Wir fragen Claude live, wie sichtbar du in der Agent-Ära
              bist — und liefern drei Schwächen plus drei Sofort-Fixes. Kostenlos, kein Login.
            </p>
          </Reveal>
        </div>
      </section>

      <Section chapter="01 Form" title="Domain eingeben" date="2026 / 01" divider={false}>
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
              {loading ? "Frage Claude..." : "Audit starten"}
              <span aria-hidden>→</span>
            </button>
          </div>
          {error && (
            <p
              className="mt-3"
              style={{ color: "var(--accent-red,#FF5A67)", fontSize: 13 }}
            >
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
    <div className="mt-16">
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Score panel */}
        <div className="md:col-span-4">
          <div
            className="rounded-[12px] p-7"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line-subtle)",
            }}
          >
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
            <p
              className="font-display mt-4"
              style={{
                fontSize: 88,
                letterSpacing: "-0.025em",
                color: "var(--ink-yellow)",
                lineHeight: 0.9,
              }}
            >
              {result.score}
              <span style={{ fontSize: 32, color: "var(--ink-muted)" }}>/100</span>
            </p>
            <p
              className="mt-3"
              style={{
                color: "var(--ink-cream)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.04em",
              }}
            >
              für {result.domain}
            </p>
            <p
              className="mt-5"
              style={{
                color: "var(--ink-dim)",
                fontSize: 11,
                letterSpacing: "0.02em",
              }}
            >
              {result.source === "anthropic"
                ? "Live von Claude · " + new Date(result.generated_at).toLocaleString("de-DE")
                : "Stub-Response · API-Key fehlt"}
            </p>
          </div>
        </div>

        {/* Visibility + lists */}
        <div className="md:col-span-8 space-y-8">
          <div>
            <p
              className="font-display"
              style={{
                fontSize: 24,
                letterSpacing: "-0.02em",
                color: "var(--ink-yellow)",
                lineHeight: 1.2,
              }}
            >
              Sichtbarkeit
            </p>
            <p
              className="mt-3 max-w-[640px]"
              style={{ color: "var(--ink-muted)", fontSize: 15, lineHeight: "24px" }}
            >
              {result.visibility}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p
                style={{
                  color: "var(--accent-red,#FF5A67)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                }}
              >
                ✕ DREI SCHWÄCHEN
              </p>
              <ul className="mt-3 space-y-3">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      style={{
                        color: "var(--ink-dim)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        minWidth: 18,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span style={{ color: "var(--ink-cream)", fontSize: 14, lineHeight: "22px" }}>
                      {w}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p
                style={{
                  color: "var(--ink-yellow)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                }}
              >
                ✓ DREI SOFORT-FIXES
              </p>
              <ul className="mt-3 space-y-3">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      style={{
                        color: "var(--ink-yellow)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        minWidth: 18,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span style={{ color: "var(--ink-cream)", fontSize: 14, lineHeight: "22px" }}>
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="rounded-[12px] p-6"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--line-subtle)",
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: 22,
                letterSpacing: "-0.02em",
                color: "var(--ink-yellow)",
                lineHeight: 1.2,
              }}
            >
              Willst du das in <em className="font-display italic">10 Tagen</em> live haben?
            </p>
            <p
              className="mt-3 max-w-[560px]"
              style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}
            >
              Der Audit ist der erste Touchpoint. Wir setzen dieselben Fixes als
              Brand-System + Live-Site + Agent-Layer um. Festpreis, 10 Tage, ein Operator.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/anfrage" className="btn-primary">
                Brief schicken
                <span aria-hidden>→</span>
              </Link>
              <Link href="/method" className="btn-secondary">
                Methode lesen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
