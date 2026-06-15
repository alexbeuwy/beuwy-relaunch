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
  note?: string;
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
const GATE_KEY = "beuwy_audit_unlocked";

/** The model panel the beuwy-Agenten run the analysis across. */
const MODELS = ["Claude", "ChatGPT", "Codex", "Gemini", "Grok", "DeepSeek", "Perplexity"];

function ModelPanel({ light = false }: { light?: boolean }) {
  return (
    <div className="model-panel" data-light={light}>
      <span className="model-panel-label">beuwy-Agenten · Modell-Panel</span>
      <div className="model-panel-chips">
        {MODELS.map((m) => (
          <span key={m} className="model-chip">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

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
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(GATE_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

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

  function onUnlock() {
    setUnlocked(true);
    if (typeof window !== "undefined") localStorage.setItem(GATE_KEY, "1");
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
              Was sehen die <em className="gradient-text">KI-Agenten</em>, wenn sie deine Marke lesen?
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="mt-7 max-w-[700px] text-[19px] md:text-[22px] leading-[1.45]"
              style={{ color: "var(--ink-cream)", letterSpacing: "-0.011em" }}
            >
              Unsere beuwy-Agenten prüfen deine Domain quer über{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>
                Claude, ChatGPT, Codex, Gemini, Grok, DeepSeek &amp; Perplexity
              </em>
              . Score, 6 Dimensionen, Evidence + sofort-Fix. Kostenlos, kein Login.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8">
              <ModelPanel />
            </div>
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
              {loading ? "beuwy-Agenten analysieren…" : "Audit starten"}
              <span aria-hidden>→</span>
            </button>
          </div>
          {error && (
            <p className="mt-3" style={{ color: "var(--accent-red,#FF5F5F)", fontSize: 13 }}>
              {error}
            </p>
          )}
        </form>

        {loading && <LoadingState domain={domain} />}
        {result && (
          <Result result={result} unlocked={unlocked} onUnlock={onUnlock} />
        )}
      </Section>
    </>
  );
}

function LoadingState({ domain }: { domain: string }) {
  const steps = [
    "beuwy-Agenten laden Seite & Meta-Daten",
    "Modell-Panel prüft Positionierung & Voice",
    "Scan Agent-Layer (schema · llms.txt)",
    "Konsens über Trust, Pricing, Conversion",
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => Math.min(a + 1, steps.length - 1)), 900);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-12 glass p-7 max-w-[560px]">
      <p
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.06em",
        }}
      >
        beuwy-Agenten analysieren · {domain}
      </p>
      <div className="mt-4">
        <ModelPanel />
      </div>
      <ul className="mt-5 space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className="audit-load-dot"
              data-state={i < active ? "done" : i === active ? "active" : "idle"}
            />
            <span
              style={{
                color: i <= active ? "var(--ink-cream)" : "var(--ink-dim)",
                fontSize: 14,
              }}
            >
              {s}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Result({
  result,
  unlocked,
  onUnlock,
}: {
  result: AuditResult;
  unlocked: boolean;
  onUnlock: () => void;
}) {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (unlocked) return;
    const t = setTimeout(() => setShowGate(true), 2000);
    return () => clearTimeout(t);
  }, [unlocked]);

  return (
    <div className="mt-16 relative">
      <div className={unlocked ? "" : "audit-locked"} aria-hidden={!unlocked && showGate}>
        <ResultBody result={result} unlocked={unlocked} />
      </div>

      {!unlocked && showGate && (
        <LeadGate domain={result.domain} onUnlock={onUnlock} />
      )}
    </div>
  );
}

function ResultBody({ result, unlocked }: { result: AuditResult; unlocked: boolean }) {
  return (
    <div className="space-y-10">
      {/* Header row: Score + One-liner (screenshot moved below, loads after unlock) */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-5">
          <div className="glass p-7 h-full flex flex-col justify-center">
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
        </div>
        <div className="md:col-span-7">
          <div className="glass p-7 h-full">
            <span
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
              }}
            >
              SO LESEN DIE AGENTEN DEINE MARKE
            </span>
            <p
              className="mt-3 font-display"
              style={{
                fontSize: 24,
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "var(--ink-yellow)",
              }}
            >
              {result.one_liner}
            </p>
            <p
              className="mt-4"
              style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: "0.02em" }}
            >
              {result.source === "anthropic"
                ? "Live · beuwy-Agenten · " + new Date(result.generated_at).toLocaleString("de-DE")
                : result.note || "Demo-Analyse"}
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
              <div key={key} className="glass p-6">
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
                <p className="mt-5" style={{ color: "var(--ink-cream)", fontSize: 14, lineHeight: "22px" }}>
                  {d.finding}
                </p>
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--line-subtle)" }}>
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
                    style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510, lineHeight: "20px" }}
                  >
                    {d.fix}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screenshot — only mounts (and therefore loads) after unlock. Late on purpose. */}
      {unlocked && (
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
            Analysierter Stand · {result.domain}
          </p>
          <div className="audit-screenshot-frame mt-4 max-w-[760px]">
            <div className="audit-screenshot-chrome">
              <span className="audit-dot" style={{ background: "#3a1212" }} />
              <span className="audit-dot" style={{ background: "#3a1212" }} />
              <span className="audit-dot" style={{ background: "#3a1212" }} />
              <span className="audit-url">{result.domain}</span>
            </div>
            <div className="audit-screenshot-canvas">
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
      )}

      {/* Final CTA — DIY-vs-done-for-you close */}
      <div className="glass p-7 md:p-12 audit-close">
        <span
          style={{
            color: "var(--ink-yellow)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Du hast jetzt die Diagnose. Bleibt eine Frage.
        </span>
        <p
          className="font-display mt-4 max-w-[820px]"
          style={{ fontSize: 34, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.1 }}
        >
          Willst du die 6 Fixes wirklich selbst zusammensuchen — oder lehnst du dich zurück und
          hast es am <em className="font-display italic">Tag 10 fertig</em>?
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-9">
          <div className="audit-close-col audit-close-diy">
            <span className="audit-close-tag audit-close-tag-diy">Selbst machen</span>
            <ul className="audit-close-list">
              <li>Agentur-Briefings, 3 Logo-Runden, 6 Wochen Discovery</li>
              <li>schema.org + llms.txt selbst recherchieren &amp; pflegen</li>
              <li>Voice, Tokens, Copy — und am Ende doch generisch</li>
              <li>Monate später live. Vielleicht.</li>
            </ul>
          </div>
          <div className="audit-close-col audit-close-pro">
            <span className="audit-close-tag audit-close-tag-pro">beuwy machen lassen</span>
            <ul className="audit-close-list">
              <li>Ein Operator, der €300M+ Kunden-Outcomes gebaut hat</li>
              <li>Brand · Website · Agent-Layer — alles aus einer Hand</li>
              <li>Festpreis, null Procurement-Pingpong</li>
              <li><strong>Tag 10: live.</strong> Du machst derweil dein Geschäft.</li>
            </ul>
          </div>
        </div>

        <p
          className="mt-8 max-w-[680px]"
          style={{ color: "var(--ink-cream)", fontSize: 17, lineHeight: "26px" }}
        >
          Die meisten lesen dieses Audit, nicken — und machen nichts. Genau deshalb gewinnst du:
          während dein Wettbewerber noch die Farbpalette diskutiert, bist du längst die Antwort,
          die der Agent nennt.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href="/anfrage" className="btn-primary">
            Profis übernehmen lassen
            <span aria-hidden>→</span>
          </Link>
          <Link href="/work" className="btn-secondary">
            Erst die Ergebnisse sehen
          </Link>
          <span
            className="text-[12px]"
            style={{ color: "var(--ink-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            Nur 2 Slots für Q3 · Antwort &lt; 6h
          </span>
        </div>
      </div>
    </div>
  );
}

function LeadGate({ domain, onUnlock }: { domain: string; onUnlock: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      setErr("Name und E-Mail bitte ausfüllen.");
      return;
    }
    setSending(true);
    setErr(null);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, phone, domain }),
      });
    } catch {
      /* unlock anyway — we don't want to punish the user for a flaky network */
    } finally {
      setSending(false);
      onUnlock();
    }
  }

  return (
    <div className="audit-gate" role="dialog" aria-modal="true" aria-label="Ergebnis freischalten">
      <div className="audit-gate-card glass">
        <span
          style={{
            color: "var(--ink-yellow)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Ergebnis ist fertig ✓
        </span>
        <h3
          className="font-display mt-4"
          style={{ fontSize: 30, letterSpacing: "-0.02em", color: "var(--ink-yellow)", lineHeight: 1.12 }}
        >
          Wohin schicken wir die volle Analyse?
        </h3>
        <p className="mt-3" style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px" }}>
          Wir schützen unsere Tools gegen Missbrauch — und jeder Audit kostet uns echtes Geld
          (Live-Modell + Screenshot). Kurz die Daten, dann ist das Ergebnis sofort frei. Kein Spam,
          versprochen.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <GateField label="Name" value={name} onChange={setName} placeholder="Wie heißt du?" autoFocus />
          <GateField label="E-Mail" value={email} onChange={setEmail} placeholder="hi@deine-marke.de" type="email" />
          <GateField label="Telefon (optional)" value={phone} onChange={setPhone} placeholder="+49 …" type="tel" />
          {err && <p style={{ color: "var(--accent-red,#FF5F5F)", fontSize: 13 }}>{err}</p>}
          <button type="submit" className="btn-primary w-full justify-center" disabled={sending}>
            {sending ? "Schalte frei…" : "Ergebnis freischalten"}
            <span aria-hidden>→</span>
          </button>
        </form>
        <p className="mt-4" style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: "0.02em" }}>
          Antwort & Audit-PDF in &lt; 6h · Mo–Fr · 09–18 CET
        </p>
      </div>
    </div>
  );
}

function GateField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span
        style={{
          color: "var(--ink-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="mt-1 w-full px-4 py-3 rounded-[10px]"
        style={{
          background: "var(--bg-base)",
          color: "var(--ink-cream)",
          fontSize: 15,
          outline: "none",
          border: "1px solid var(--line-subtle)",
        }}
      />
    </label>
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
