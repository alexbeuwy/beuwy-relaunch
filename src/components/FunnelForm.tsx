"use client";

import { useEffect, useState } from "react";

type Stage = "new" | "rebrand" | "agent-layer";
type Timing = "now" | "next-q" | "2027";
type Budget = "under-25" | "25-60" | "60-plus";

type FunnelData = {
  stage?: Stage;
  timing?: Timing;
  budget?: Budget;
  brief?: string;
  name?: string;
  email?: string;
  phone?: string;
};

const TOTAL_STEPS = 5;

const STAGE_OPTIONS: { id: Stage; label: string; sub: string }[] = [
  { id: "new", label: "Komplett neu", sub: "Kein Brand, keine Site, keine Agent-Sichtbarkeit." },
  { id: "rebrand", label: "Brand steht, Site veraltet", sub: "Logo + Voice sitzen. Site + Funnel sind 2022." },
  { id: "agent-layer", label: "Site läuft, Agenten fehlen", sub: "Wir sind sichtbar bei Google. Nicht bei Claude/ChatGPT." },
];

const TIMING_OPTIONS: { id: Timing; label: string; sub: string }[] = [
  { id: "now", label: "Sofort", sub: "Slot Q3/2026 — Start innerhalb 14 Tagen." },
  { id: "next-q", label: "Nächstes Quartal", sub: "Slot Q4/2026 — Frame jetzt, Build später." },
  { id: "2027", label: "Wir planen 2027", sub: "Kein Druck. Wir können trotzdem schon sprechen." },
];

const BUDGET_OPTIONS: { id: Budget; label: string; sub: string }[] = [
  { id: "under-25", label: "< 25.000 €", sub: "Frame oder Audit. Kein 10-Tage-Build." },
  { id: "25-60", label: "25 – 60.000 €", sub: "Eine Auslieferung. Brand · oder · Site · oder · Agent-Layer." },
  { id: "60-plus", label: "60.000 € +", sub: "Voller 10-Tage-Build. Alle drei Auslieferungen." },
];

export function FunnelForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FunnelData>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Auto-advance on card-pick steps for that "easy click" feel
  const pickStage = (stage: Stage) => {
    setData((d) => ({ ...d, stage }));
    setTimeout(next, 240);
  };
  const pickTiming = (timing: Timing) => {
    setData((d) => ({ ...d, timing }));
    setTimeout(next, 240);
  };
  const pickBudget = (budget: Budget) => {
    setData((d) => ({ ...d, budget }));
    setTimeout(next, 240);
  };

  const submit = async () => {
    if (sending) return;
    setError(null);
    if (!data.email || !data.name || !data.brief) {
      setError("Bitte fülle Name, E-Mail und Brief aus.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server antwortet nicht.");
      setDone(true);
    } catch (e) {
      setError("Konnte nicht senden. Bitte direkt an hi@beuwy.com schicken.");
    } finally {
      setSending(false);
    }
  };

  // Keyboard: Enter advances on text steps; arrows for review/back
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === "Enter" && (step === 3 || step === 4)) {
        const target = e.target as HTMLElement;
        if (target.tagName === "TEXTAREA" && !e.metaKey && !e.ctrlKey) return;
        e.preventDefault();
        if (step === 4) submit();
        else next();
      }
      if (e.key === "Escape" && step > 0 && !done) back();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, data, done]);

  if (done) {
    return <Confirmation data={data} />;
  }

  return (
    <div className="funnel">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div className="funnel-step-shell">
        {step === 0 && (
          <FunnelStep
            label="01 · Stand"
            question="Wo stehst du gerade?"
            sub="Drei Sätze. Such dir den nächstgelegenen aus."
          >
            <CardGrid>
              {STAGE_OPTIONS.map((opt) => (
                <FunnelCard
                  key={opt.id}
                  label={opt.label}
                  sub={opt.sub}
                  selected={data.stage === opt.id}
                  onClick={() => pickStage(opt.id)}
                />
              ))}
            </CardGrid>
          </FunnelStep>
        )}

        {step === 1 && (
          <FunnelStep
            label="02 · Timing"
            question="Wann willst du live gehen?"
            sub="Wir nehmen 6 Projekte / Jahr. Slots sind harte Slots."
          >
            <CardGrid>
              {TIMING_OPTIONS.map((opt) => (
                <FunnelCard
                  key={opt.id}
                  label={opt.label}
                  sub={opt.sub}
                  selected={data.timing === opt.id}
                  onClick={() => pickTiming(opt.id)}
                />
              ))}
            </CardGrid>
          </FunnelStep>
        )}

        {step === 2 && (
          <FunnelStep
            label="03 · Budget"
            question="Welche Budget-Range?"
            sub="Wir sind transparent. Auch wenn es nicht matcht."
          >
            <CardGrid>
              {BUDGET_OPTIONS.map((opt) => (
                <FunnelCard
                  key={opt.id}
                  label={opt.label}
                  sub={opt.sub}
                  selected={data.budget === opt.id}
                  onClick={() => pickBudget(opt.id)}
                />
              ))}
            </CardGrid>
          </FunnelStep>
        )}

        {step === 3 && (
          <FunnelStep
            label="04 · Brief"
            question="Worum geht's wirklich?"
            sub="2–3 Sätze reichen. Was ist das Problem, was wäre die ideale Lösung, was hindert dich?"
          >
            <textarea
              autoFocus
              value={data.brief || ""}
              onChange={(e) => setData((d) => ({ ...d, brief: e.target.value }))}
              placeholder="Z.B.: Wir launchen Series A in Q4, brauchen eine Brand, die Investoren UND Agenten verstehen. Aktuell drei Fragmente, kein roter Faden."
              rows={6}
              className="funnel-textarea"
            />
            <FunnelNav onBack={back} onNext={next} nextDisabled={!data.brief || data.brief.length < 10} nextLabel="Weiter" />
          </FunnelStep>
        )}

        {step === 4 && (
          <FunnelStep
            label="05 · Kontakt"
            question="Wie erreichen wir dich?"
            sub="Antwort kommt in < 6h, Mo–Fr 09–18 CET. Telefon nur wenn du das willst."
          >
            <div className="funnel-fields">
              <FunnelField
                label="Name"
                value={data.name || ""}
                onChange={(v) => setData((d) => ({ ...d, name: v }))}
                placeholder="Wie sollen wir dich nennen?"
                autoFocus
              />
              <FunnelField
                label="E-Mail"
                value={data.email || ""}
                onChange={(v) => setData((d) => ({ ...d, email: v }))}
                placeholder="hi@deine-marke.de"
                type="email"
              />
              <FunnelField
                label="Telefon (optional)"
                value={data.phone || ""}
                onChange={(v) => setData((d) => ({ ...d, phone: v }))}
                placeholder="+49 …"
                type="tel"
              />
            </div>
            {error && <p className="funnel-error">{error}</p>}
            <FunnelNav
              onBack={back}
              onNext={submit}
              nextDisabled={!data.name || !data.email || sending}
              nextLabel={sending ? "Wird gesendet…" : "Brief senden"}
            />
          </FunnelStep>
        )}
      </div>

      <p className="funnel-shortcut" aria-hidden>
        Enter weiter · Esc zurück
      </p>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="funnel-progress" aria-hidden>
      <div className="funnel-progress-bar" style={{ width: `${pct}%` }} />
      <span className="funnel-progress-label">
        Schritt {step + 1} / {total} · {pct} %
      </span>
    </div>
  );
}

function FunnelStep({
  label,
  question,
  sub,
  children,
}: {
  label: string;
  question: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="funnel-step">
      <span className="funnel-step-label">{label}</span>
      <h2 className="funnel-step-question h-display">{question}</h2>
      <p className="funnel-step-sub">{sub}</p>
      <div className="funnel-step-body">{children}</div>
    </div>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="funnel-card-grid">{children}</div>;
}

function FunnelCard({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-selected={selected}
      className="funnel-card"
    >
      <span className="funnel-card-label h-display">{label}</span>
      <span className="funnel-card-sub">{sub}</span>
      <span className="funnel-card-arrow" aria-hidden>→</span>
    </button>
  );
}

function FunnelField({
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
    <label className="funnel-label">
      <span className="funnel-label-text">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="funnel-input"
      />
    </label>
  );
}

function FunnelNav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
  nextLabel: string;
}) {
  return (
    <div className="funnel-nav">
      <button type="button" onClick={onBack} className="btn-secondary funnel-back">
        <span aria-hidden>←</span> Zurück
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="btn-primary funnel-next"
      >
        {nextLabel}
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

function Confirmation({ data }: { data: FunnelData }) {
  return (
    <div className="funnel-done">
      <span className="eyebrow">
        <span className="num">✓</span> Brief eingegangen
      </span>
      <h2 className="h-display funnel-done-h">
        Danke, {data.name?.split(" ")[0] || "schön dich zu hören"}.
        <br />
        Wir antworten in <em className="font-display italic">&lt; 6h</em>.
      </h2>
      <p className="funnel-done-p">
        Mo–Fr, 09–18 CET. Direkt mit Termin, Festpreis-Range — oder ehrlichem Nicht-passt.
        Du hast den Brief auch in deinem Postfach: kurz drauf antworten, falls etwas fehlt.
      </p>
      <details className="funnel-done-summary">
        <summary>Dein Brief im Überblick</summary>
        <dl>
          <dt>Stand</dt>
          <dd>{STAGE_OPTIONS.find((o) => o.id === data.stage)?.label}</dd>
          <dt>Timing</dt>
          <dd>{TIMING_OPTIONS.find((o) => o.id === data.timing)?.label}</dd>
          <dt>Budget</dt>
          <dd>{BUDGET_OPTIONS.find((o) => o.id === data.budget)?.label}</dd>
          <dt>Brief</dt>
          <dd>{data.brief}</dd>
          <dt>Kontakt</dt>
          <dd>{data.name} · {data.email}{data.phone ? ` · ${data.phone}` : ""}</dd>
        </dl>
      </details>
    </div>
  );
}
