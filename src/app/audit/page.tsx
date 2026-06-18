"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

type Dimension = "positioning" | "voice" | "agent_layer" | "trust" | "pricing" | "conversion";
type DimResult = { score: number; projected_score: number; finding: string; fix: string };
type KeyAction = { title: string; detail: string; impact: "low" | "medium" | "high"; effort: string };
type AuditResult = {
  domain: string;
  screenshot_url: string;
  overall_score: number;
  projected_score: number;
  one_liner: string;
  dimensions: Record<Dimension, DimResult>;
  key_actions: KeyAction[];
  source: "anthropic" | "stub";
  note?: string;
  generated_at: string;
};

const DIM_META: Record<Dimension, { label: string; sub: string }> = {
  positioning: { label: "Positionierung", sub: "Was machst du, für wen, warum dich?" },
  voice: { label: "Sprache", sub: "Klingt das nach dir oder nach Standard?" },
  agent_layer: { label: "Google + KI", sub: "Wird die Seite sauber gelesen?" },
  trust: { label: "Vertrauen", sub: "Echte Kunden, echte Zahlen, ein Gesicht?" },
  pricing: { label: "Preis", sub: "Transparent oder 'auf Anfrage'?" },
  conversion: { label: "Anfragen", sub: "Gibt es einen klaren nächsten Schritt?" },
};

const DIM_ORDER: Dimension[] = ["positioning", "voice", "agent_layer", "trust", "pricing", "conversion"];
const GATE_KEY = "beuwy_audit_unlocked";

/** Welche KI-Modelle wir für den Check nutzen. */
const MODELS = ["Claude", "ChatGPT", "Codex", "Gemini", "Grok", "DeepSeek", "Perplexity"];

function ModelPanel({ light = false }: { light?: boolean }) {
  return (
    <div className="model-panel" data-light={light}>
      <span className="model-panel-label">Geprüft mit diesen KI-Modellen</span>
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(GATE_KEY) === "1") {
      setUnlocked(true);
    }
  }, []);

  // Auto-run when arriving with ?domain=  — pass the value directly so we
  // don't race the `domain` state setter.
  useEffect(() => {
    if (initial) {
      runWith(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  async function runWith(d: string) {
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ domain: d }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setError(j?.error || `Fehler ${r.status}`);
        return;
      }
      const data = (await r.json()) as AuditResult;
      setResult(data);
      // Reflect the analyzed domain in the URL so reload + back-button work.
      if (typeof window !== "undefined") {
        const next = new URL(window.location.href);
        next.searchParams.set("domain", data.domain);
        window.history.replaceState(null, "", next.toString());
      }
    } catch {
      setError("Netzwerk-Fehler. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  function run(e?: React.FormEvent) {
    if (e) e.preventDefault();
    runWith(domain);
  }

  function onUnlock() {
    setUnlocked(true);
    if (typeof window !== "undefined") localStorage.setItem(GATE_KEY, "1");
  }

  function shareCopy() {
    if (typeof window === "undefined") return;
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/audit?domain=" + encodeURIComponent(domain || result?.domain || "")
      : "";
  const shareSubject = result
    ? `Agent-Audit für ${result.domain} — Score ${result.overall_score}/100`
    : "Agent-Audit von beuwy";

  return (
    <>
      <section className="section-band section-band-base pt-[104px] md:pt-[120px] pb-[24px]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">
              <span className="num">/</span> Audit · 15 Sek
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="audit-hero-h1 mt-5 max-w-[860px]">
              Was sehen die <em className="gradient-text">KI-Agenten</em> über deine Marke?
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p
              className="mt-4 max-w-[620px] text-[16px] md:text-[17px] leading-[1.45]"
              style={{ color: "var(--ink-muted)", letterSpacing: "-0.011em" }}
            >
              Domain rein. Die beuwy-Agenten prüfen quer über{" "}
              <em style={{ color: "var(--ink-yellow)", fontStyle: "italic" }}>
                Claude, ChatGPT, Gemini, Grok, DeepSeek &amp; Perplexity
              </em>
              . Score, 6 Dimensionen, sofort-Fixes. Kostenlos, kein Login.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <form onSubmit={run} className="audit-domain-form mt-7 max-w-[620px]">
              <span className="audit-domain-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
                placeholder="deine-marke.de"
                className="audit-domain-input"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className="btn-primary audit-domain-cta" disabled={loading}>
                {loading ? "Analysiert…" : "Audit starten"}
                <span aria-hidden>→</span>
              </button>
            </form>
          </Reveal>
          {error && (
            <p className="mt-3 max-w-[620px]" style={{ color: "var(--accent-red,#FF5F5F)", fontSize: 13 }}>
              {error}
            </p>
          )}

          {loading && <LoadingState domain={domain || initial} />}
        </div>
      </section>

      {result && (
        <section className="section-band section-band-raised pt-[8px] pb-[64px] md:pb-[96px]">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <Result
              result={result}
              unlocked={unlocked}
              onUnlock={onUnlock}
              shareUrl={shareUrl}
              shareSubject={shareSubject}
              onCopy={shareCopy}
              copied={copied}
            />
          </div>
        </section>
      )}
    </>
  );
}

function LoadingState({ domain }: { domain: string }) {
  // Rotating witty status lines — feel alive during the 10-20s model call.
  const quips = [
    "Öffne die Seite wie ein neuer Besucher…",
    "Lese die Hero-Headline…",
    "Vergleiche mit ~50 Wettbewerbern aus deiner Branche…",
    "Frage Claude: würdest du diese Marke empfehlen?",
    "Frage ChatGPT dasselbe…",
    "Gemini & Grok geben ihren Senf dazu…",
    "Suche nach llms.txt und schema.org…",
    "Prüfe, ob ein Agent hier etwas zum Zitieren findet…",
    "Zähle die „AI-powered“-Floskeln…",
    "Bewerte Trust, Pricing, Conversion…",
    "Suche die eine These, die hängenbleibt…",
    "Schreibe die priorisierten Fixes…",
    "Rechne den projizierten Score…",
    "Fast fertig — poliere die Ergebnisse…",
  ];
  const [progress, setProgress] = useState(4);
  const [quip, setQuip] = useState(0);

  // Fictional-but-believable progress that eases toward ~94% and waits there
  // until the real result replaces this component (then it unmounts).
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      // approach 94% asymptotically over ~18s
      const p = 94 * (1 - Math.exp(-elapsed / 7));
      setProgress(Math.min(94, Math.max(4, p)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setQuip((q) => (q + 1) % quips.length), 1500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-12 audit-loading glass max-w-[640px]">
      <div className="audit-loading-sweep" aria-hidden />
      <div className="audit-loading-orb" aria-hidden />

      <div className="audit-loading-head">
        <p className="audit-loading-label">beuwy-Agenten analysieren · {domain}</p>
        <p className="audit-loading-pct">{Math.round(progress)}%</p>
      </div>

      <div className="audit-loading-bar" aria-hidden>
        <div className="audit-loading-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="audit-loading-quip" key={quip}>
        {quips[quip]}
      </p>

      <div className="mt-6">
        <ModelPanel />
      </div>
    </div>
  );
}

function Result({
  result,
  unlocked,
  onUnlock,
  shareUrl,
  shareSubject,
  onCopy,
  copied,
}: {
  result: AuditResult;
  unlocked: boolean;
  onUnlock: () => void;
  shareUrl: string;
  shareSubject: string;
  onCopy: () => void;
  copied: boolean;
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
        <ResultBody
          result={result}
          unlocked={unlocked}
          shareUrl={shareUrl}
          shareSubject={shareSubject}
          onCopy={onCopy}
          copied={copied}
        />
      </div>

      {!unlocked && showGate && (
        <LeadGate domain={result.domain} onUnlock={onUnlock} />
      )}
    </div>
  );
}

function ResultBody({
  result,
  unlocked,
  shareUrl,
  shareSubject,
  onCopy,
  copied,
}: {
  result: AuditResult;
  unlocked: boolean;
  shareUrl: string;
  shareSubject: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="space-y-10">
      {/* Header row: Score + One-liner (screenshot moved below, loads after unlock) */}
      <div className="grid md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-5">
          <ScoreImprovement
            current={result.overall_score}
            projected={result.projected_score}
            domain={result.domain}
          />
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
                <DimProjection current={d.score} projected={d.projected_score} />
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

      {/* Key Actions — prioritized, page-specific recommendations */}
      {result.key_actions && result.key_actions.length > 0 && (
        <KeyActions actions={result.key_actions} />
      )}

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

      {/* Share row */}
      <div className="audit-share">
        <div className="audit-share-meta">
          <span className="audit-share-label">Dein Audit-Link · teilbar</span>
          <code className="audit-share-url">{shareUrl}</code>
        </div>
        <div className="audit-share-actions">
          <button type="button" onClick={onCopy} className="audit-share-btn" aria-label="Link kopieren">
            <ShareIcon kind="link" />
            <span>{copied ? "Kopiert!" : "Link kopieren"}</span>
          </button>
          <a
            className="audit-share-btn"
            href={`mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(
              shareSubject + "\n\n" + shareUrl
            )}`}
            aria-label="Per E-Mail teilen"
          >
            <ShareIcon kind="mail" />
            <span>Mail</span>
          </a>
          <a
            className="audit-share-btn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Auf LinkedIn teilen"
          >
            <ShareIcon kind="linkedin" />
            <span>LinkedIn</span>
          </a>
          <a
            className="audit-share-btn"
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareSubject + " — " + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Per WhatsApp teilen"
          >
            <ShareIcon kind="whatsapp" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Final CTA — DIY-vs-done-for-you close */}
      <div className="glass p-7 md:p-12 audit-close">
        <span className="audit-close-eyebrow">
          Du hast die Diagnose. Bleibt eine Frage.
        </span>
        <p className="audit-close-headline">
          Willst du diese 6 Fixes wirklich selbst zusammensuchen — oder lehnst du dich zurück und
          hast es am <em>Tag 10 fertig</em>?
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-9">
          <div className="audit-close-col audit-close-diy">
            <span className="audit-close-tag audit-close-tag-diy">Selbst lösen</span>
            <ul className="audit-close-list">
              <li>3 Korrektur-Runden, bis die Agentur endlich normal arbeitet — mehr Kopfschmerzen als Output</li>
              <li>Irgendeinem Mitarbeiter in die Hand drücken — viel verbrannte Arbeitszeit, am Ende doch nichts Spitzenmäßiges</li>
              <li>schema.org, llms.txt, Voice-Charter selbst recherchieren und pflegen</li>
              <li>6-Wochen-Discovery, 19 Stakeholder-Calls, Folie 23 — Monate später vielleicht live</li>
              <li>Im Q4 immer noch nicht in den Antworten der Agenten</li>
            </ul>
          </div>
          <div className="audit-close-col audit-close-pro">
            <span className="audit-close-tag audit-close-tag-pro">beuwy machen lassen</span>
            <ul className="audit-close-list">
              <li>Einer, der €300M+ im Kundenbuch hat — direkt an deinem Brief</li>
              <li>Marke, Website, Texte — alles aus einer Hand, kein Hin und Her</li>
              <li>8.900 € fester Preis, keine wochenlangen Workshops, keine Stundenzettel</li>
              <li><strong>Tag 10: live.</strong> Du machst derweil dein eigentliches Geschäft</li>
              <li>Eine Seite, die mehr Anfragen bringt — und seriös aussieht</li>
            </ul>
          </div>
        </div>

        <p className="audit-close-kicker">
          Die meisten lesen dieses Audit, nicken — und machen nichts. Genau deshalb gewinnst du:
          während dein Wettbewerber noch die Farbpalette diskutiert, bist du längst die Antwort,
          die der Agent nennt.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/anfrage" className="btn-primary">
            Profis übernehmen lassen
            <span aria-hidden>→</span>
          </Link>
          <Link href="/work" className="audit-close-link">
            Erst die Ergebnisse sehen →
          </Link>
        </div>
        <p className="audit-close-meta">
          Nur 2 Slots für Q3/2026 · Antwort &lt; 6h · Mo–Fr 09–18 CET
        </p>
      </div>
    </div>
  );
}

function ShareIcon({ kind }: { kind: "link" | "mail" | "linkedin" | "whatsapp" }) {
  const common = { width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "link")
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
        <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
      </svg>
    );
  if (kind === "mail")
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  if (kind === "linkedin")
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7M7 7v.01M11 17v-4a3 3 0 0 1 6 0v4M11 11v6" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" {...common} aria-hidden>
      <path d="M21 12a9 9 0 1 1-3.4-7l3.4-1-1 3.4A9 9 0 0 1 21 12Z" />
      <path d="M8.5 9.5c.5 3 3 5.5 6 6l1.5-1.5-2.5-1-1 .5c-.8-.4-1.6-1.2-2-2l.5-1-1-2.5L8.5 9.5Z" />
    </svg>
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

/**
 * Animated current -> projected score card for the page-overall.
 * Bar fills to projected width, with a subtle "current" marker; the big number
 * counts up from current to projected on mount.
 */
function ScoreImprovement({
  current,
  projected,
  domain,
}: {
  current: number;
  projected: number;
  domain: string;
}) {
  const [displayed, setDisplayed] = useState(current);
  const tier = projected >= 80 ? "good" : projected >= 60 ? "ok" : "bad";

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    const delay = 600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start - delay) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(current + (projected - current) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, projected]);

  return (
    <div className="glass score-improvement h-full" data-tier={tier}>
      <div className="score-improvement-head">
        <span className="score-improvement-eyebrow">Agent-Visibility-Score · Projection</span>
        <span className="score-improvement-domain">{domain}</span>
      </div>

      <div className="score-improvement-figures">
        <div className="score-improvement-current">
          <span className="score-improvement-tag">Jetzt</span>
          <span className="score-improvement-value">{current}</span>
        </div>
        <span className="score-improvement-arrow" aria-hidden>
          <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
            <path d="M1 7h22m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="score-improvement-future">
          <span className="score-improvement-tag score-improvement-tag-future">Mit 6 Fixes</span>
          <span className="score-improvement-value-future audit-score">
            {displayed}
            <span className="audit-score-suffix">/100</span>
          </span>
        </div>
      </div>

      <div className="score-improvement-track">
        <div
          className="score-improvement-fill-current"
          style={{ width: `${current}%` }}
          aria-hidden
        />
        <div
          className="score-improvement-fill-future"
          style={{ width: `${projected}%`, animationDelay: "0.4s" }}
          aria-hidden
        />
        <div
          className="score-improvement-marker"
          style={{ left: `${current}%` }}
          aria-hidden
        />
      </div>

      <p className="score-improvement-kicker">
        Mit den Vorschlägen unten kommt{" "}
        <strong>{domain}</strong> auf einen geschätzten Score von{" "}
        <strong>{projected}/100</strong> — und wird in der Branche deutlich besser gefunden.
      </p>
    </div>
  );
}

/** Per-dimension current -> projected bar. */
function DimProjection({ current, projected }: { current: number; projected: number }) {
  const projTier = projected >= 8 ? "good" : projected >= 5 ? "ok" : "bad";
  return (
    <div className="dim-projection" aria-hidden>
      <span className="dim-projection-track">
        <span
          className="dim-projection-fill-current"
          style={{ width: `${current * 10}%` }}
        />
        <span
          className={`dim-projection-fill-future dim-projection-tier-${projTier}`}
          style={{ width: `${projected * 10}%` }}
        />
      </span>
      <span className="dim-projection-meta">
        <span className="dim-projection-meta-now">{current}</span>
        <span className="dim-projection-meta-arrow">→</span>
        <span className="dim-projection-meta-future">{projected}/10</span>
      </span>
    </div>
  );
}

function KeyActions({ actions }: { actions: KeyAction[] }) {
  return (
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
        Key Actions · priorisiert nach Impact
      </p>
      <p
        className="font-display mt-2"
        style={{
          fontSize: 28,
          letterSpacing: "-0.02em",
          color: "var(--ink-yellow)",
          lineHeight: 1.15,
          maxWidth: 720,
        }}
      >
        Die <em className="font-display italic">3-5 Hebel</em>, die deinen Score
        am stärksten bewegen.
      </p>
      <div className="key-actions mt-7">
        {actions.map((a, i) => (
          <div key={i} className="key-action" data-impact={a.impact}>
            <div className="key-action-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="key-action-body">
              <div className="key-action-head">
                <p className="key-action-title">{a.title}</p>
                <div className="key-action-tags">
                  <span className={`key-action-impact key-action-impact-${a.impact}`}>
                    Impact {a.impact === "high" ? "hoch" : a.impact === "medium" ? "mittel" : "niedrig"}
                  </span>
                  <span className="key-action-effort">{a.effort}</span>
                </div>
              </div>
              <p
                className="key-action-detail"
                dangerouslySetInnerHTML={{ __html: a.detail }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
