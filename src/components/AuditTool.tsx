"use client";

import { useState } from "react";

/**
 * Website-Check v2 (P3): zweistufig — /api/audit/scan liefert sofort
 * Screenshot + deterministische Befunde, /api/audit/analyze die Claude-
 * Bewertung auf Basis des echten Seiteninhalts. Volle Choreografie
 * (Status-Bühne, Scan-Reveal, Count-up) folgt in P4 nach DESIGN-DIRECTION §3.
 */

type Check = { id: string; label: string; ok: boolean; detail: string };

type ScanResult = {
  domain: string;
  finalUrl: string;
  screenshot: string | null;
  checks: Check[];
  techScore: number;
  pageText: string;
};

type Analysis = {
  score: number;
  visibility: string;
  weaknesses: string[];
  recommendations: string[];
  source: "anthropic" | "demo";
};

type Phase = "idle" | "scanning" | "analyzing" | "done" | "error";

const ERROR_TEXT: Record<string, string> = {
  domain_not_found: "Diese Domain ist nicht auffindbar. Tippfehler?",
  domain_blocked: "Diese Adresse kann nicht geprüft werden.",
  fetch_failed: "Die Website antwortet nicht. Bitte später erneut versuchen.",
  default: "Die Analyse ist fehlgeschlagen. Bitte erneut versuchen.",
};

export function AuditTool() {
  const [domain, setDomain] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const busy = phase === "scanning" || phase === "analyzing";

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setScan(null);
    setAnalysis(null);
    setPhase("scanning");
    try {
      const sr = await fetch("/api/audit/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      if (!sr.ok) {
        const j = await sr.json().catch(() => ({}));
        setError(ERROR_TEXT[j?.error] || ERROR_TEXT.default);
        setPhase("error");
        return;
      }
      const scanData = (await sr.json()) as ScanResult;
      setScan(scanData);
      setPhase("analyzing");

      const ar = await fetch("/api/audit/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          domain: scanData.domain,
          pageText: scanData.pageText,
          checks: scanData.checks,
          techScore: scanData.techScore,
        }),
      });
      if (ar.ok) {
        setAnalysis((await ar.json()) as Analysis);
      }
      setPhase("done");
    } catch {
      setError(ERROR_TEXT.default);
      setPhase("error");
    }
  }

  return (
    <div id="tool" className="panel w-full max-w-[680px] mx-auto rounded-2xl p-2">
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
        <button type="submit" className="btn-primary h-14" disabled={busy}>
          {phase === "scanning"
            ? "Seite wird gelesen…"
            : phase === "analyzing"
              ? "Claude analysiert…"
              : "Analyse starten"}
          <span aria-hidden>→</span>
        </button>
      </form>
      <p className="t-data px-3 py-3">
        Screenshot · Schema-Check · AI-Analyse — ca. 30 Sek., kein Login.
      </p>

      {error && <p className="t-small is-fail px-3 pb-3">{error}</p>}

      {scan && (
        <div className="panel-inner rounded-xl p-6 mt-1 space-y-6">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {scan.screenshot && (
              <figure className="rounded-lg overflow-hidden border hairline">
                <figcaption className="t-data px-3 py-2 border-b hairline">
                  {scan.finalUrl.replace(/^https?:\/\//, "")}
                </figcaption>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scan.screenshot}
                  alt={`Screenshot von ${scan.domain}`}
                  className="w-full h-auto block"
                />
              </figure>
            )}
            <div>
              <p className="t-label">Technische Befunde</p>
              <ul className="mt-3 space-y-2">
                {scan.checks.map((c) => (
                  <li key={c.id} className="flex gap-2 items-baseline">
                    <span
                      className={`t-data shrink-0 ${c.ok ? "is-dim" : "is-fail"}`}
                    >
                      {c.ok ? "OK" : "✕"}
                    </span>
                    <span className="t-small is-cream">{c.label}</span>
                    <span className="t-data truncate">{c.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {phase === "analyzing" && (
            <p className="t-data">Claude liest Ihre Seite und bewertet…</p>
          )}

          {analysis && (
            <div className="border-t hairline pt-6">
              <div className="flex items-baseline gap-3">
                <p className="t-score">{analysis.score}</p>
                <p className="t-data">/100 · {scan.domain}</p>
              </div>
              <p className="t-body mt-4 is-cream max-w-[560px]">
                {analysis.visibility}
              </p>
              {analysis.weaknesses.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="t-label is-fail">Was es Sie kostet</p>
                    <ul className="mt-3 space-y-2">
                      {analysis.weaknesses.map((w, i) => (
                        <li key={i} className="t-small flex gap-2">
                          <span className="t-data shrink-0">0{i + 1}</span>
                          <span className="is-cream">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="t-label is-accent">Sofort-Hebel</p>
                    <ul className="mt-3 space-y-2">
                      {analysis.recommendations.map((r, i) => (
                        <li key={i} className="t-small flex gap-2">
                          <span className="t-data shrink-0">0{i + 1}</span>
                          <span className="is-cream">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:ap@beuwy.com?subject=Systemgespr%C3%A4ch"
                  className="btn-primary"
                >
                  Befunde besprechen
                  <span aria-hidden>→</span>
                </a>
                <p className="t-data">30 min · kostenlos · kein Pitch</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
