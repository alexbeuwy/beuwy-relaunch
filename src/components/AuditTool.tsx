"use client";

import { useState } from "react";

/**
 * Website-Check v1 (P2): funktionale Basis — Eingabe, Analyse via /api/audit,
 * Ergebnis. Die volle Choreografie (Status-Bühne, Screenshot-Scan-Reveal,
 * Score-Count-up, BorderBeam) kommt in P4 nach DESIGN-DIRECTION §3.
 */

type AuditResult = {
  domain: string;
  score: number;
  visibility: string;
  weaknesses: string[];
  recommendations: string[];
  source: "anthropic" | "stub";
  generated_at: string;
};

export function AuditTool() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
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
        setError("Die Analyse ist fehlgeschlagen. Bitte erneut versuchen.");
        return;
      }
      setResult((await r.json()) as AuditResult);
    } catch {
      setError("Netzwerk-Fehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="tool"
      className="panel w-full max-w-[680px] mx-auto rounded-2xl p-2"
    >
      <form onSubmit={run} className="flex items-stretch gap-2">
        <label htmlFor="audit-domain" className="sr-only">
          Ihre Domain
        </label>
        <input
          id="audit-domain"
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
          placeholder="ihre-domain.de"
          autoComplete="off"
          spellCheck={false}
          className="is-cream flex-1 h-14 px-4 rounded-xl bg-transparent font-mono text-[15px] outline-none border border-[rgba(247,233,154,0.14)] focus:border-[rgba(247,233,154,0.45)] transition-colors"
        />
        <button type="submit" className="btn-primary h-14" disabled={loading}>
          {loading ? "Wird geprüft…" : "Analyse starten"}
          <span aria-hidden>→</span>
        </button>
      </form>
      <p className="t-data px-3 py-3">
        Screenshot · Schema-Check · AI-Analyse — ca. 30 Sek., kein Login.
      </p>

      {error && (
        <p className="t-small is-fail px-3 pb-3">{error}</p>
      )}

      {result && (
        <div className="panel-inner rounded-xl p-6 mt-1">
          <div className="flex items-baseline gap-3">
            <p className="t-score">{result.score}</p>
            <p className="t-data">/100 · {result.domain}</p>
          </div>
          <p className="t-body mt-4">{result.visibility}</p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <p className="t-label is-fail">Befunde</p>
              <ul className="mt-3 space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="t-small flex gap-2">
                    <span className="t-data shrink-0">0{i + 1}</span>
                    <span className="is-cream">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-label is-accent">Sofort-Fixes</p>
              <ul className="mt-3 space-y-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="t-small flex gap-2">
                    <span className="t-data shrink-0">0{i + 1}</span>
                    <span className="is-cream">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
