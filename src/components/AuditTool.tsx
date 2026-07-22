"use client";

import { useMemo, useState } from "react";

/**
 * Website-Check v3 (P4): volle Choreografie nach DESIGN-DIRECTION §3.
 * Zustandsmaschine: idle → scanning → analyzing → done | error.
 * - Status-Bühne klappt per grid-rows-Transition auf, Zeilen kommen per
 *   Badge-Pop, echte Fakten statt Spinner.
 * - Screenshot als Scan-Reveal (clip-path + Scanlinie + ein Sheen-Sweep).
 * - Score zählt per Digit-Stagger hoch, Panel weitet sich auf 960px.
 * - BorderBeam läuft ausschließlich, solange die Analyse arbeitet.
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

const BUTTON_LABEL: Record<Phase, string> = {
  idle: "Analyse starten",
  scanning: "Seite wird gelesen…",
  analyzing: "Claude analysiert…",
  done: "Erneut prüfen",
  error: "Erneut versuchen",
};

export function AuditTool() {
  const [domain, setDomain] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shotRevealed, setShotRevealed] = useState(false);

  const busy = phase === "scanning" || phase === "analyzing";

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setScan(null);
    setAnalysis(null);
    setShotRevealed(false);
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

  // Status-Bühne: erst die Lade-Zeile, nach dem Scan die echten Befunde.
  const statusLines = useMemo(() => {
    const lines: Array<{ key: string; ok: boolean | null; text: string; detail?: string }> = [];
    if (phase === "scanning") {
      lines.push({ key: "load", ok: null, text: "Seite wird geladen…" });
    }
    if (scan) {
      for (const c of scan.checks) {
        lines.push({ key: c.id, ok: c.ok, text: c.label, detail: c.detail });
      }
      if (scan.screenshot) {
        lines.push({ key: "shot", ok: true, text: "Screenshot erstellt" });
      }
    }
    if (phase === "analyzing") {
      lines.push({
        key: "claude",
        ok: null,
        text: "Claude liest die Seite und bewertet…",
      });
    }
    return lines;
  }, [phase, scan]);

  const stageOpen = phase !== "idle" && !error;

  return (
    <div
      className="audit-panel panel w-full max-w-[680px] mx-auto rounded-2xl p-2"
      data-stage={phase}
      data-busy={busy ? "true" : "false"}
      id="tool"
    >
      <div className="audit-beam" aria-hidden />

      <form onSubmit={run} className="flex flex-col sm:flex-row items-stretch gap-2">
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
          className="is-cream flex-1 h-14 px-4 rounded-xl bg-transparent font-mono text-[15px] outline-none border border-[rgba(247,233,154,0.14)] focus:border-[rgba(247,233,154,0.45)] transition-colors min-w-0"
        />
        <button
          type="submit"
          className="btn-primary h-14 justify-center"
          disabled={busy}
        >
          {BUTTON_LABEL[phase]}
          <span aria-hidden>→</span>
        </button>
      </form>

      {phase === "idle" && (
        <p className="t-data px-3 py-3">
          Screenshot · Schema-Check · AI-Analyse — ca. 30 Sek., kein Login.
        </p>
      )}

      {error && <p className="t-small is-fail px-3 py-3">{error}</p>}

      {/* Status-Bühne */}
      <div className="audit-stagewrap" data-open={stageOpen ? "true" : "false"}>
        <div>
          <div className="px-3 pt-4 pb-2" aria-live="polite">
            <ul className="space-y-1.5">
              {statusLines.map((l, i) => (
                <li
                  key={l.key}
                  className="audit-status-line flex gap-2 items-baseline"
                  style={{ "--line-index": Math.min(i, 10) } as React.CSSProperties}
                >
                  <span
                    className={`t-data shrink-0 w-6 ${
                      l.ok === null ? "is-accent" : l.ok ? "is-dim" : "is-fail"
                    }`}
                  >
                    {l.ok === null ? "…" : l.ok ? "OK" : "✕"}
                  </span>
                  <span className="t-small is-cream shrink-0">{l.text}</span>
                  {l.detail && (
                    <span className="t-data truncate">{l.detail}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Ergebnis */}
          {scan && (
            <div className="rounded-xl panel-inner p-4 md:p-6 mt-3 mx-1 mb-1">
              <div className="grid md:grid-cols-12 gap-6 items-start">
                {scan.screenshot && (
                  <figure className="md:col-span-7">
                    <div
                      className="shot-frame rounded-lg border hairline"
                      data-revealed={shotRevealed ? "true" : "false"}
                    >
                      <figcaption className="t-data px-3 py-2 border-b hairline flex items-center gap-2">
                        <span className="inline-flex gap-1" aria-hidden>
                          <span className="w-2 h-2 rounded-full border hairline" />
                          <span className="w-2 h-2 rounded-full border hairline" />
                          <span className="w-2 h-2 rounded-full border hairline" />
                        </span>
                        {scan.finalUrl.replace(/^https?:\/\//, "")}
                      </figcaption>
                      <div className="shot-reveal" data-revealed={shotRevealed ? "true" : "false"}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={scan.screenshot}
                          alt={`Screenshot von ${scan.domain}`}
                          className="w-full h-auto block"
                          onLoad={() => setShotRevealed(true)}
                        />
                      </div>
                      <span className="shot-scanline" aria-hidden />
                      <span className="shot-sheen" aria-hidden />
                    </div>
                  </figure>
                )}

                <div className={scan.screenshot ? "md:col-span-5" : "md:col-span-12"}>
                  {analysis ? (
                    <>
                      <p className="t-label">Sichtbarkeits-Score</p>
                      <p className="t-score mt-2" aria-label={`${analysis.score} von 100`}>
                        {String(analysis.score)
                          .split("")
                          .map((ch, i) => (
                            <span
                              key={i}
                              className="score-digit"
                              style={{ "--digit-index": i } as React.CSSProperties}
                              aria-hidden
                            >
                              {ch}
                            </span>
                          ))}
                        <span className="t-data"> /100</span>
                      </p>
                      <p className="t-small mt-4 is-cream">{analysis.visibility}</p>
                    </>
                  ) : (
                    <p className="t-data">Analyse läuft…</p>
                  )}
                </div>
              </div>

              {analysis && analysis.weaknesses.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mt-6 border-t hairline pt-6">
                  <div>
                    <p className="t-label is-fail">Was es Sie kostet</p>
                    <ul className="mt-3 space-y-2">
                      {analysis.weaknesses.map((w, i) => (
                        <li
                          key={i}
                          className="audit-status-line t-small flex gap-2"
                          style={{ "--line-index": i } as React.CSSProperties}
                        >
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
                        <li
                          key={i}
                          className="audit-status-line t-small flex gap-2"
                          style={{ "--line-index": i + 3 } as React.CSSProperties}
                        >
                          <span className="t-data shrink-0">0{i + 1}</span>
                          <span className="is-cream">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {phase === "done" && (
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t hairline pt-6">
                  <a
                    href="mailto:ap@beuwy.com?subject=Systemgespr%C3%A4ch"
                    className="btn-primary"
                  >
                    Befunde besprechen
                    <span aria-hidden>→</span>
                  </a>
                  <p className="t-data">30 min · kostenlos · kein Pitch</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
