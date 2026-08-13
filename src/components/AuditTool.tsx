"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Website-Check v4 — Agenten-Orchestrierung (Psychologie- + UX-Audit-Spec):
 * - Scan (~2s, ohne Screenshot) → danach PARALLEL: Screenshot + Analyse.
 *   Der Screenshot-Reveal passiert während der Analyse-Wartezeit.
 * - Status-Zeilen an ECHTE Ereignisse gebunden (Promise-Zustände); während
 *   der laufenden Analyse rotieren Aspekt-Zeilen, die beschreiben, was der
 *   Call wirklich bewertet (Positionierung, Vertrauen, Conversion) — keine
 *   Behauptung, externe Systeme live abzufragen.
 * - Ergebnis v2: Score + Ampel-Diagnose + 5 Kategorie-Balken (4 KI + Technik
 *   aus echten Checks) + Top-3-Befunde offen + Rest aufklappbar + CTA-Block
 *   mit Verlust-Rekapitulation. Sticky-Recall-Bar beim Weiterscrollen.
 */

type Check = { id: string; label: string; ok: boolean; detail: string };

/* HMAC-signierte Payloads unserer API-Routen — Voraussetzung fürs Cachen
   eines teilbaren Gutachtens unter /check/{domain}. */
type Share = { blob: string; sig: string };

type ScanResult = {
  domain: string;
  finalUrl: string;
  checks: Check[];
  techScore: number;
  pageText: string;
  share?: Share | null;
};

type Category = { id: string; label: string; score: number; reason: string };

type Finding = {
  title: string;
  cost: string;
  fix: string;
  effort: string;
  impact: number;
};

type Analysis = {
  score: number;
  visibility: string;
  categories: Category[];
  findings: Finding[];
  source: "anthropic" | "demo";
  share?: Share | null;
};

type Phase = "idle" | "scanning" | "analyzing" | "done" | "error";

const ERROR_TEXT: Record<string, string> = {
  domain_not_found: "Diese Domain ist nicht auffindbar. Tippfehler?",
  domain_blocked: "Diese Adresse kann nicht geprüft werden.",
  fetch_failed: "Die Website antwortet nicht. Bitte später erneut versuchen.",
  rate_limited: "Zu viele Prüfungen in kurzer Zeit. Bitte in ein paar Minuten erneut versuchen.",
  quota_exceeded: "Das Tageskontingent des Checks ist erschöpft. Bitte morgen erneut versuchen.",
  default: "Die Analyse ist fehlgeschlagen. Bitte erneut versuchen.",
};

const BUTTON_LABEL: Record<Phase, string> = {
  idle: "Sichtbarkeits-Check starten",
  scanning: "Seite wird gelesen…",
  analyzing: "beuwy Agenten prüfen…",
  done: "Erneut prüfen",
  error: "Erneut versuchen",
};

/* Aspekt-Zeilen der laufenden Analyse — beschreiben, was der Call wirklich
   bewertet (steht so im System-Prompt). Rotieren im 4s-Takt. */
const ANALYZE_ASPECTS = [
  "beuwy Agenten lesen die Seite wie ein Interessent, der zuerst ChatGPT fragt…",
  "Sichtbarkeit für ChatGPT, Google AI Overviews & Perplexity wird geprüft…",
  "Positionierung wird geprüft: Ist in einem Satz erkennbar, wer Sie sind?",
  "Vertrauenssignale und nächster Schritt für Anfragende werden bewertet…",
  "Sichtbarkeits-Score wird berechnet…",
  "Letzter Abgleich läuft — Ihr Ergebnis ist gleich da…",
];

function scoreBand(score: number): string {
  if (score < 30) return "kommt bei KI-Anfragen praktisch nicht vor.";
  if (score < 50) return "ist vereinzelt auffindbar, wird aber nicht empfohlen.";
  if (score < 70) return "ist teilweise sichtbar — mit klaren Lücken.";
  if (score < 85) return "hat eine solide Basis — mit Luft nach oben.";
  return "ist stark positioniert.";
}

function tier(score: number): string {
  if (score < 40) return "low";
  if (score < 70) return "mid";
  return "high";
}

export function AuditTool() {
  const [domain, setDomain] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [shot, setShot] = useState<"pending" | "failed" | string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shotRevealed, setShotRevealed] = useState(false);
  const [aspect, setAspect] = useState(0);
  const [recallDismissed, setRecallDismissed] = useState(false);
  const [panelVisible, setPanelVisible] = useState(true);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const shotShareRef = useRef<Share | null>(null);

  const busy = phase === "scanning" || phase === "analyzing";

  // Vorbefüllung über /check/{domain} → „Check jetzt starten“ (?check=…).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("check");
    if (p) setDomain(p);
  }, []);

  // Aspekt-Rotation nur, solange die Analyse wirklich läuft.
  useEffect(() => {
    if (phase !== "analyzing") return;
    setAspect(0);
    const t = setInterval(
      () => setAspect((a) => Math.min(a + 1, ANALYZE_ASPECTS.length - 1)),
      4000
    );
    return () => clearInterval(t);
  }, [phase]);

  // Sticky-Recall-Bar: sichtbar, wenn Ergebnis da + Panel aus dem Viewport.
  useEffect(() => {
    const node = panelRef.current;
    if (!node || phase !== "done") return;
    const obs = new IntersectionObserver(
      ([entry]) => setPanelVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [phase]);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setScan(null);
    setShot(null);
    setAnalysis(null);
    setShotRevealed(false);
    setRecallDismissed(false);
    setShareUrl(null);
    setCopied(false);
    shotShareRef.current = null;
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

      // Screenshot + Analyse PARALLEL — der Reveal läuft während der Wartezeit.
      setShot("pending");
      const shotP = fetch("/api/audit/screenshot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: scanData.finalUrl }),
      })
        .then(async (r) => {
          const j = r.ok ? await r.json() : null;
          shotShareRef.current = j?.share ?? null;
          setShot(j?.screenshot || "failed");
        })
        .catch(() => setShot("failed"));

      const analyzeP = fetch("/api/audit/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          domain: scanData.domain,
          pageText: scanData.pageText,
          checks: scanData.checks,
          techScore: scanData.techScore,
          share: scanData.share ?? null,
        }),
      }).then(async (r) => {
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          throw new Error(typeof j?.error === "string" ? j.error : "default");
        }
        const a = (await r.json()) as Analysis;
        setAnalysis(a);
        return a;
      });

      let analysisData: Analysis;
      try {
        analysisData = await analyzeP;
      } catch (e) {
        setError(ERROR_TEXT[(e as Error).message] || ERROR_TEXT.default);
        setPhase("error");
        return;
      }
      setPhase("done");

      // Gutachten cachen (→ /check/{domain}), sobald auch der Screenshot
      // entschieden ist. Nur mit signierten Payloads möglich — optional.
      void shotP.then(async () => {
        if (!scanData.share || !analysisData.share) return;
        try {
          const r = await fetch("/api/audit/save", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              scan: scanData.share,
              analysis: analysisData.share,
              shot: shotShareRef.current,
            }),
          });
          const j = r.ok ? await r.json() : null;
          if (j?.url) setShareUrl(j.url as string);
        } catch {
          /* Gutachten-Link ist optional — das Ergebnis bleibt nutzbar */
        }
      });
    } catch {
      setError(ERROR_TEXT.default);
      setPhase("error");
    }
  }

  // Status-Bühne — jede Zeile hängt an einem echten Ereignis.
  const statusLines = useMemo(() => {
    const lines: Array<{
      key: string;
      ok: boolean | null;
      text: string;
      detail?: string;
    }> = [];
    if (phase === "scanning") {
      lines.push({
        key: "load",
        ok: null,
        text: `${domain.trim() || "Seite"} wird geladen…`,
      });
    }
    if (scan) {
      for (const c of scan.checks) {
        lines.push({ key: c.id, ok: c.ok, text: c.label, detail: c.detail });
      }
      if (shot === "pending") {
        lines.push({ key: "shot", ok: null, text: "Agent · Screenshot wird aufgenommen…" });
      } else if (typeof shot === "string" && shot !== "failed") {
        lines.push({ key: "shot", ok: true, text: `Screenshot von ${scan.domain} erstellt` });
      }
    }
    if (phase === "analyzing") {
      lines.push({
        key: `aspect-${aspect}`,
        ok: null,
        text: ANALYZE_ASPECTS[aspect],
      });
    }
    if (phase === "done" && analysis) {
      lines.push({ key: "prio", ok: true, text: "Befunde priorisiert" });
    }
    return lines;
  }, [phase, scan, shot, aspect, analysis, domain]);

  const stageOpen = phase !== "idle" && !error;

  // 5. Kategorie "Technische Basis" — deterministisch aus den echten Checks.
  const allCategories: Category[] = useMemo(() => {
    if (!analysis || !scan) return [];
    const okCount = scan.checks.filter((c) => c.ok).length;
    return [
      ...analysis.categories,
      {
        id: "technik",
        label: "Technische Basis",
        score: scan.techScore,
        reason: `${okCount} von ${scan.checks.length} Technik-Prüfpunkten bestanden.`,
      },
    ];
  }, [analysis, scan]);

  const gapCount = allCategories.filter((c) => c.score < 70).length;
  const topFindings = analysis?.findings.slice(0, 3) ?? [];
  const restFindings = analysis?.findings.slice(3) ?? [];
  const hasShot = typeof shot === "string" && shot !== "failed" && shot !== "pending";

  return (
    <>
      <div
        ref={panelRef}
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
            className="is-cream flex-1 h-14 px-4 rounded-xl bg-transparent font-mono text-[15px] outline-hidden border border-line-subtle focus:border-sky transition-colors min-w-0"
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
                    {l.detail && <span className="t-data min-w-0">{l.detail}</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ergebnis */}
            {scan && (analysis || hasShot) && (
              <div className="rounded-xl panel-inner p-4 md:p-6 mt-3 mx-1 mb-1">
                {/* Kopf: Screenshot | Score + Kategorie-Balken */}
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  {hasShot && (
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
                        <div
                          className="shot-reveal"
                          data-revealed={shotRevealed ? "true" : "false"}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={shot as string}
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

                  <div className={hasShot ? "md:col-span-5" : "md:col-span-12"}>
                    {analysis ? (
                      <>
                        <p className="t-label">Sichtbarkeits-Score</p>
                        <p
                          className="t-score mt-2"
                          aria-label={`${analysis.score} von 100`}
                        >
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
                        <p className="t-small is-cream mt-3">
                          {scan.domain} {scoreBand(analysis.score)}
                        </p>

                        {allCategories.length > 0 && (
                          <div className="mt-5 space-y-3">
                            {allCategories.map((c) => (
                              <div key={c.id} data-tier={tier(c.score)}>
                                <div className="flex items-baseline justify-between gap-3">
                                  <span className="t-small is-cream">{c.label}</span>
                                  <span className="t-data">{c.score}</span>
                                </div>
                                <div className="cat-track mt-1">
                                  <span
                                    className="cat-fill"
                                    style={{ "--pct": `${c.score}%` } as React.CSSProperties}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="t-data">beuwy Agenten prüfen noch…</p>
                    )}
                  </div>
                </div>

                {analysis && (
                  <>
                    <p className="t-body mt-6 is-cream max-w-[560px]">
                      {analysis.visibility}
                    </p>

                    {/* Top-3 Befunde — offen */}
                    {topFindings.length > 0 && (
                      <div className="border-t hairline pt-6 mt-6">
                        <p className="t-label is-fail">Was es Sie kostet</p>
                        <ul className="mt-3 space-y-4">
                          {topFindings.map((f, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="t-data shrink-0 pt-0.5">0{i + 1}</span>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                  <span className="t-small is-cream font-medium">
                                    {f.title}
                                  </span>
                                  <span className="t-data">
                                    Aufwand {f.effort} · Wirkung {f.impact}/3
                                  </span>
                                </div>
                                <p className="t-small mt-1">{f.cost}</p>
                                <p className="t-small mt-1 is-cream">→ {f.fix}</p>
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* Rest — aufklappbar, begrenzte Höhe */}
                        {restFindings.length > 0 && (
                          <div className="audit-findings-scroll mt-5 space-y-0">
                            <p className="t-label mb-2">
                              Weitere Befunde ({restFindings.length})
                            </p>
                            {restFindings.map((f, i) => (
                              <details key={i} className="faq-item border-t hairline py-3">
                                <summary className="cursor-pointer list-none flex items-baseline justify-between gap-4">
                                  <span className="t-small is-cream">{f.title}</span>
                                  <span className="t-data shrink-0">
                                    {f.effort} · {f.impact}/3 <span aria-hidden>+</span>
                                  </span>
                                </summary>
                                <p className="t-small mt-2">{f.cost}</p>
                                <p className="t-small mt-1 is-cream">→ {f.fix}</p>
                              </details>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* CTA-Block — folgt aus der Verlust-Logik, immer am Panel-Ende */}
                    {phase === "done" && (
                      <div className="border-t hairline pt-6 mt-6">
                        <p className="t-h3">Was jetzt?</p>
                        <p className="t-small mt-2 max-w-[520px]">
                          {gapCount > 0
                            ? `${gapCount} von 5 Kategorien zeigen Lücken, die ${scan.domain} heute schon Anfragen kosten. Ob und in welcher Reihenfolge sich das Schließen lohnt, sehen wir uns in 30 Minuten gemeinsam an.`
                            : `${scan.domain} steht gut da. Ob es Hebel gibt, die noch mehr Anfragen bringen, sehen wir uns in 30 Minuten gemeinsam an.`}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <a
                            href={`/termin?domain=${encodeURIComponent(scan.domain)}`}
                            className="btn-primary"
                          >
                            30-Minuten-Systemgespräch buchen
                            <span aria-hidden>→</span>
                          </a>
                        </div>
                        {shareUrl && (
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              className="btn-secondary btn-sm"
                              onClick={() => {
                                navigator.clipboard
                                  ?.writeText(`${window.location.origin}${shareUrl}`)
                                  .then(() => {
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                  });
                              }}
                            >
                              {copied ? "Kopiert ✓" : "Gutachten-Link kopieren"}
                            </button>
                            <span className="t-data">
                              Nur über den Link erreichbar — zum Weiterleiten oder
                              für Kollegen.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky-Recall-Bar — Portal auf body (Sektionen haben isolation:isolate,
          spätere Stacking-Contexte würden die fixe Leiste sonst übermalen) */}
      {phase === "done" && analysis && scan && !panelVisible && !recallDismissed &&
        typeof document !== "undefined" &&
        createPortal(
        <div className="recall-bar" role="complementary">
          <p className="t-small is-cream min-w-0 truncate">
            {scan.domain}: <span className="is-accent">{analysis.score}/100</span> — Ihr
            Systemgespräch wartet
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`/termin?domain=${encodeURIComponent(scan.domain)}`}
              className="btn-primary btn-sm"
            >
              Termin buchen
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              aria-label="Leiste schließen"
              className="recall-close t-data"
              onClick={() => setRecallDismissed(true)}
            >
              ✕
            </button>
          </div>
        </div>,
          document.body
        )}
    </>
  );
}
