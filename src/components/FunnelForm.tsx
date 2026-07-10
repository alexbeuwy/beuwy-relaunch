"use client";

import { useEffect, useState } from "react";

type Variant = "default" | "immobilien" | "makler";

type Opt = { id: string; label: string; sub: string };

type FunnelData = {
  stage?: string;
  timing?: string;
  budget?: string; // immobilien-Variante: Projektgröße
  brief?: string;
  name?: string;
  email?: string;
  phone?: string;
};

const TOTAL_STEPS = 5;

/* ---------- Option-Sets je Variante ---------- */
const OPTIONS: Record<Variant, { stage: Opt[]; timing: Opt[]; budget: Opt[] }> = {
  default: {
    stage: [
      { id: "new", label: "Komplett neu", sub: "Kein Brand, keine Site, keine Agent-Sichtbarkeit." },
      { id: "rebrand", label: "Brand steht, Site veraltet", sub: "Logo + Voice sitzen. Site + Funnel sind 2022." },
      { id: "agent-layer", label: "Site läuft, Agenten fehlen", sub: "Wir sind sichtbar bei Google. Nicht bei Claude/ChatGPT." },
    ],
    timing: [
      { id: "now", label: "Sofort", sub: "Slot Q3/2026 — Start innerhalb 14 Tagen." },
      { id: "next-q", label: "Nächstes Quartal", sub: "Slot Q4/2026 — Frame jetzt, Build später." },
      { id: "2027", label: "Wir planen 2027", sub: "Kein Druck. Wir können trotzdem schon sprechen." },
    ],
    budget: [
      { id: "under-25", label: "< 25.000 €", sub: "Frame oder Audit. Kein 10-Tage-Build." },
      { id: "25-60", label: "25 – 60.000 €", sub: "Eine Auslieferung. Brand · oder · Site · oder · Agent-Layer." },
      { id: "60-plus", label: "60.000 € +", sub: "Voller 10-Tage-Build. Alle drei Auslieferungen." },
    ],
  },
  immobilien: {
    stage: [
      { id: "planung", label: "In Planung", sub: "Grundstück/Genehmigung steht. Vermarktung noch nicht gestartet." },
      { id: "vertrieb", label: "Vertrieb läuft", sub: "Verkauf hat begonnen — aber Material und Anfragen stimmen nicht." },
      { id: "bestand", label: "Bestand / Sanierung", sub: "Wiederverkauf oder Renovierungsobjekt, das vermarktet werden muss." },
    ],
    timing: [
      { id: "sofort", label: "Sofort", sub: "Vertriebsstart steht an. Launch-ready in 4 Wochen." },
      { id: "next-q", label: "Nächstes Quartal", sub: "Vorlauf da. Frame jetzt, Launch geplant." },
      { id: "offen", label: "Noch offen", sub: "Wir sondieren. Zeitpunkt steht noch nicht fest." },
    ],
    budget: [
      { id: "le8", label: "bis 8 WE", sub: "Light · 10.000 € netto." },
      { id: "8-12", label: "8 – 12 WE", sub: "Standard · 12.000 € netto." },
      { id: "12-plus", label: "12+ WE", sub: "Premium · 20.000 € netto (mit Video)." },
      { id: "gross", label: "40+ / mehrere Phasen", sub: "Individuell. Zahl in 6 h." },
    ],
  },
  makler: {
    stage: [
      { id: "onoffice", label: "onOffice", sub: "Du pflegst deine Objekte schon in onOffice." },
      { id: "flowfact", label: "FlowFact", sub: "Du nutzt FlowFact statt onOffice." },
      { id: "andere", label: "Anderes oder keins", sub: "Anderes System, eine Excel-Liste oder noch gar nichts." },
    ],
    timing: [
      { id: "sofort", label: "Sofort", sub: "Du willst die Demo so schnell wie möglich sehen." },
      { id: "naechstes-quartal", label: "Nächstes Quartal", sub: "Vorlauf ist da, der Launch steht aber schon fest." },
      { id: "offen", label: "Noch offen", sub: "Du sondierst erst, ob das Portal zu dir passt." },
    ],
    budget: [
      { id: "unter-10", label: "Unter 10", sub: "Kleines, aktives Portfolio." },
      { id: "10-30", label: "10 bis 30", sub: "Solide Anzahl laufender Objekte." },
      { id: "ueber-30", label: "Über 30", sub: "Großes Portfolio, viel zu zeigen." },
    ],
  },
};

/* ---------- Copy je Variante ---------- */
type StepCopy = { label: string; q: string; sub: string };
const COPY: Record<
  Variant,
  { s0: StepCopy; s1: StepCopy; s2: StepCopy; s3: StepCopy; briefPlaceholder: string }
> = {
  default: {
    s0: { label: "01 · Stand", q: "Wo stehst du gerade?", sub: "Drei Sätze. Such dir den nächstgelegenen aus." },
    s1: { label: "02 · Timing", q: "Wann willst du live gehen?", sub: "Wir nehmen 6 Projekte / Jahr. Slots sind harte Slots." },
    s2: { label: "03 · Budget", q: "Welche Budget-Range?", sub: "Wir sind transparent. Auch wenn es nicht matcht." },
    s3: {
      label: "04 · Brief",
      q: "Worum geht's wirklich?",
      sub: "2–3 Sätze reichen. Was ist das Problem, was wäre die ideale Lösung, was hindert dich?",
    },
    briefPlaceholder:
      "Z.B.: Wir launchen Series A in Q4, brauchen eine Brand, die Investoren UND Agenten verstehen. Aktuell drei Fragmente, kein roter Faden.",
  },
  immobilien: {
    s0: { label: "01 · Projekt", q: "Wo steht dein Projekt?", sub: "Such dir den nächstgelegenen Stand aus." },
    s1: { label: "02 · Launch", q: "Wann soll die Vermarktung stehen?", sub: "Launch-ready in 4 Wochen ab Briefing — oder 50% zurück." },
    s2: { label: "03 · Größe", q: "Wie viele Wohneinheiten?", sub: "Bestimmt das Paket. Alle Preise netto." },
    s3: {
      label: "04 · Projekt",
      q: "Erzähl mir vom Projekt.",
      sub: "Lage, Einheiten, Stand der Vermarktung — und was bisher hakt.",
    },
    briefPlaceholder:
      "Z.B.: 11 Eigentumswohnungen in Heidelberg-Handschuhsheim, Vertriebsstart Q4. Visualisierungen sind da, aber das Exposé wirkt billig und wir bekommen kaum qualifizierte Anfragen.",
  },
  makler: {
    s0: { label: "01 · System", q: "Welches System nutzt du?", sub: "Damit wir wissen, wie wir deine Objekte anbinden." },
    s1: { label: "02 · Timing", q: "Wann soll deine Demo stehen?", sub: "Wir bauen ein Portal zur Zeit. Slots sind harte Slots." },
    s2: { label: "03 · Objekte", q: "Wie viele Objekte hast du gerade aktiv?", sub: "Bestimmt, wie viel wir für die Demo synchronisieren." },
    s3: {
      label: "04 · Brief",
      q: "Kurz zu dir und deinen Objekten.",
      sub: "2 bis 3 Sätze reichen. Wer du bist, wo du sitzt, was für Objekte du vermarktest.",
    },
    briefPlaceholder: "Kurz: wer bist du, welche Stadt, was für Objekte?",
  },
};

/* Check-Modus überschreibt nur den Brief-Schritt */
const CHECK_BRIEF: StepCopy = {
  label: "04 · Check",
  q: "Welches Projekt soll ich mir ansehen?",
  sub: "Link zur Landingpage rein. Das Exposé (PDF) schickst du danach per Mail-Antwort — geht in 48 h ein 15-Min-Video an dich zurück.",
};
const CHECK_PLACEHOLDER =
  "Z.B.: https://landingpage-meines-projekts.de — 14 Wohnungen in Mannheim, Vertrieb läuft seit 8 Wochen, kaum Anfragen. Exposé hänge ich an die Mail.";

export function FunnelForm({
  variant = "default",
  check = false,
  quelle,
}: {
  variant?: Variant;
  check?: boolean;
  quelle?: string;
}) {
  const opts = OPTIONS[variant];
  const copy = COPY[variant];
  const briefCopy = check ? CHECK_BRIEF : copy.s3;
  const briefPlaceholder = check ? CHECK_PLACEHOLDER : copy.briefPlaceholder;

  const [step, setStep] = useState(0);
  const [data, setData] = useState<FunnelData>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Auto-advance on card-pick steps for that "easy click" feel
  const pick = (field: "stage" | "timing" | "budget", value: string) => {
    setData((d) => ({ ...d, [field]: value }));
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
        body: JSON.stringify({ ...data, quelle, check, variant }),
      });
      if (!res.ok) throw new Error("Server antwortet nicht.");
      setDone(true);
    } catch {
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
    return <Confirmation data={data} opts={opts} check={check} />;
  }

  return (
    <div className="funnel">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div className="funnel-step-shell">
        {step === 0 && (
          <FunnelStep label={copy.s0.label} question={copy.s0.q} sub={copy.s0.sub}>
            <CardGrid>
              {opts.stage.map((opt) => (
                <FunnelCard
                  key={opt.id}
                  label={opt.label}
                  sub={opt.sub}
                  selected={data.stage === opt.id}
                  onClick={() => pick("stage", opt.id)}
                />
              ))}
            </CardGrid>
          </FunnelStep>
        )}

        {step === 1 && (
          <FunnelStep label={copy.s1.label} question={copy.s1.q} sub={copy.s1.sub}>
            <CardGrid>
              {opts.timing.map((opt) => (
                <FunnelCard
                  key={opt.id}
                  label={opt.label}
                  sub={opt.sub}
                  selected={data.timing === opt.id}
                  onClick={() => pick("timing", opt.id)}
                />
              ))}
            </CardGrid>
          </FunnelStep>
        )}

        {step === 2 && (
          <FunnelStep label={copy.s2.label} question={copy.s2.q} sub={copy.s2.sub}>
            <CardGrid>
              {opts.budget.map((opt) => (
                <FunnelCard
                  key={opt.id}
                  label={opt.label}
                  sub={opt.sub}
                  selected={data.budget === opt.id}
                  onClick={() => pick("budget", opt.id)}
                />
              ))}
            </CardGrid>
          </FunnelStep>
        )}

        {step === 3 && (
          <FunnelStep label={briefCopy.label} question={briefCopy.q} sub={briefCopy.sub}>
            <textarea
              autoFocus
              value={data.brief || ""}
              onChange={(e) => setData((d) => ({ ...d, brief: e.target.value }))}
              placeholder={briefPlaceholder}
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
              nextLabel={sending ? "Wird gesendet…" : check ? "Check anfragen" : "Brief senden"}
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
    <button type="button" onClick={onClick} data-selected={selected} className="funnel-card">
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
      <button type="button" onClick={onNext} disabled={nextDisabled} className="btn-primary funnel-next">
        {nextLabel}
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

function Confirmation({
  data,
  opts,
  check,
}: {
  data: FunnelData;
  opts: { stage: Opt[]; timing: Opt[]; budget: Opt[] };
  check: boolean;
}) {
  const stageLabel = opts.stage.find((o) => o.id === data.stage)?.label;
  const timingLabel = opts.timing.find((o) => o.id === data.timing)?.label;
  const budgetLabel = opts.budget.find((o) => o.id === data.budget)?.label;
  return (
    <div className="funnel-done">
      <span className="eyebrow">
        <span className="num">✓</span> {check ? "Check angefragt" : "Brief eingegangen"}
      </span>
      <h2 className="h-display funnel-done-h">
        Danke, {data.name?.split(" ")[0] || "schön dich zu hören"}.
        <br />
        {check ? (
          <>
            Dein Video kommt in <em className="font-display italic">48 h</em>.
          </>
        ) : (
          <>
            Wir antworten in <em className="font-display italic">&lt; 6h</em>.
          </>
        )}
      </h2>
      <p className="funnel-done-p">
        {check ? (
          <>
            Antworte kurz auf die Bestätigungs-Mail und häng dein Exposé (PDF) an. Du bekommst in 48 h ein
            15-Min-Video: was zieht, was bremst, wo du Leads verlierst. Kein Verkaufsdruck danach.
          </>
        ) : (
          <>
            Mo–Fr, 09–18 CET. Direkt mit Termin, Festpreis-Range — oder ehrlichem Nicht-passt. Du hast den Brief auch
            in deinem Postfach: kurz drauf antworten, falls etwas fehlt.
          </>
        )}
      </p>
      <details className="funnel-done-summary">
        <summary>Dein Brief im Überblick</summary>
        <dl>
          <dt>Stand</dt>
          <dd>{stageLabel}</dd>
          <dt>Timing</dt>
          <dd>{timingLabel}</dd>
          <dt>Größe / Budget</dt>
          <dd>{budgetLabel}</dd>
          <dt>Brief</dt>
          <dd>{data.brief}</dd>
          <dt>Kontakt</dt>
          <dd>
            {data.name} · {data.email}
            {data.phone ? ` · ${data.phone}` : ""}
          </dd>
        </dl>
      </details>
    </div>
  );
}
