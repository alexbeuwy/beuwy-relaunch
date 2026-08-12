"use client";

import * as React from "react";
import {
  RiArrowRightUpLine,
  RiBarChartLine,
  RiCalendarCheckLine,
  RiCheckLine,
  RiMegaphoneLine,
  RiPaletteLine,
  RiSparkling2Line,
  RiTimeLine,
  RiUserAddLine,
} from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import styles from "./SystemShowcase.module.css";

/* ------------------------------------------------------------------
   SystemShowcase — vier Ansichten auf dasselbe System: Marke, Anzeigen,
   CRM, Zahlen. Alle Werte sind Beispielwerte und dienen ausschliesslich
   der Veranschaulichung (keine echten Kundenzahlen).
   ------------------------------------------------------------------ */

type TabKey = "marke" | "anzeigen" | "crm" | "zahlen";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "marke", label: "Marke", icon: RiPaletteLine },
  { key: "anzeigen", label: "Anzeigen", icon: RiMegaphoneLine },
  { key: "crm", label: "CRM", icon: RiUserAddLine },
  { key: "zahlen", label: "Zahlen", icon: RiBarChartLine },
];

/* ---------- kleine Helfer ----------------------------------------- */

function riseStyle(index: number): React.CSSProperties {
  return { "--i": index } as React.CSSProperties;
}

function barStyle(index: number, pct: number): React.CSSProperties {
  return { "--i": index, "--w": `${pct}%` } as React.CSSProperties;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useInView<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

/* ---------- gemeinsame Bausteine ---------------------------------- */

function Frame({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-white/10 bg-bg-elevated p-4 sm:p-5",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.4)]",
        "transition-colors duration-200 ease-out hover:border-white/20",
        "motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-dim uppercase">
      {children}
    </span>
  );
}

function Track({
  pct,
  index,
  tone = "yellow",
  className,
}: {
  pct: number;
  index: number;
  tone?: "yellow" | "muted";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block h-1.5 w-full overflow-hidden rounded-full bg-white/8",
        className
      )}
    >
      <span
        className={cn(
          styles.barFill,
          tone === "yellow" ? "bg-ink-yellow" : "bg-white/25"
        )}
        style={barStyle(index, pct)}
      />
    </span>
  );
}

function DeltaBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge className="h-5 gap-1 px-2 text-[11px]">
      <RiArrowUpTiny />
      {children}
    </Badge>
  );
}

function RiArrowUpTiny() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
      <path
        d="M6 9.5V2.5M6 2.5L3 5.5M6 2.5l3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Tab 1: Marke ------------------------------------------ */

const MARKE_ROWS = [
  { label: "Wiedererkennung", before: 28, after: 84 },
  { label: "Vertrauen", before: 36, after: 79 },
  { label: "Preisbereitschaft", before: 24, after: 71 },
];

function MiniSite({ variant }: { variant: "alt" | "neu" }) {
  const neu = variant === "neu";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border",
        neu
          ? "border-ink-yellow/25 bg-bg-raised"
          : "border-white/8 bg-black/25"
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
        <span className="size-1.5 rounded-full bg-white/15" />
      </div>
      <div className="space-y-2 px-3 py-4">
        <div
          className={cn(
            "h-2 rounded-full",
            neu ? "w-14 bg-ink-yellow/70" : "w-10 bg-white/12"
          )}
        />
        <div
          className={cn(
            "h-3 rounded-full",
            neu ? "w-full bg-ink-cream/85" : "w-2/3 bg-white/14"
          )}
        />
        <div
          className={cn(
            "h-3 rounded-full",
            neu ? "w-4/5 bg-ink-cream/55" : "w-1/2 bg-white/10"
          )}
        />
        <div className="pt-2">
          <div
            className={cn(
              "h-5 rounded-full",
              neu ? "w-24 bg-ink-yellow" : "w-16 bg-white/12"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function MarkePanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Frame className={styles.rise} style={riseStyle(0)}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <FieldLabel>Auftritt heute</FieldLabel>
            <p className="mt-1 text-sm text-ink-muted">Austauschbar, blass</p>
          </div>
          <Badge variant="secondary" className="h-5 px-2 text-[11px]">
            vorher
          </Badge>
        </div>

        <div className="mt-4">
          <MiniSite variant="alt" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <FieldLabel>Wahrnehmung</FieldLabel>
            <div className="font-display mt-1 text-[40px] leading-none tracking-display text-ink-muted tabular-nums">
              34
            </div>
          </div>
          <span className="pb-1 text-xs text-ink-dim">von 100</span>
        </div>
      </Frame>

      <Frame
        className={cn(
          styles.rise,
          "border-ink-yellow/25 bg-bg-raised hover:border-ink-yellow/40"
        )}
        style={riseStyle(1)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <FieldLabel>Auftritt neu</FieldLabel>
            <p className="mt-1 text-sm text-ink-cream">Klar, eigenständig</p>
          </div>
          <Badge className="h-5 gap-1 px-2 text-[11px]">
            <RiSparkling2Line />
            nachher
          </Badge>
        </div>

        <div className="mt-4">
          <MiniSite variant="neu" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <FieldLabel>Wahrnehmung</FieldLabel>
            <div className="font-display mt-1 text-[40px] leading-none tracking-display text-ink-yellow tabular-nums">
              82
            </div>
          </div>
          <DeltaBadge>48 Punkte</DeltaBadge>
        </div>
      </Frame>

      <Frame className={cn(styles.rise, "sm:col-span-2")} style={riseStyle(2)}>
        <FieldLabel>Wahrnehmungs-Score im Detail</FieldLabel>
        <ul className="mt-4 space-y-4">
          {MARKE_ROWS.map((row, i) => (
            <li key={row.label} className="grid gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-ink-cream">{row.label}</span>
                <span className="text-xs text-ink-dim tabular-nums">
                  {row.before} → <span className="text-ink-yellow">{row.after}</span>
                </span>
              </div>
              <div className="grid gap-1.5">
                <Track pct={row.before} index={i} tone="muted" />
                <Track pct={row.after} index={i + 1} />
              </div>
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  );
}

/* ---------- Tab 2: Anzeigen --------------------------------------- */

const KAMPAGNEN = [
  {
    name: "Umkreis 25 km",
    kanal: "Suche",
    anteil: 42,
    budget: "1.260 €",
    ctr: "2,4 %",
    smart: true,
  },
  {
    name: "Wiederkehrende Besucher",
    kanal: "Social",
    anteil: 24,
    budget: "720 €",
    ctr: "1,8 %",
    smart: false,
  },
  {
    name: "Ähnliche Profile",
    kanal: "Social",
    anteil: 21,
    budget: "630 €",
    ctr: "1,5 %",
    smart: false,
  },
  {
    name: "Breite Reichweite",
    kanal: "Display",
    anteil: 13,
    budget: "390 €",
    ctr: "0,9 %",
    smart: false,
  },
];

function AnzeigenPanel() {
  return (
    <div className="grid gap-4">
      <Frame className={styles.rise} style={riseStyle(0)}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <FieldLabel>Monatsbudget</FieldLabel>
            <div className="font-display mt-1 text-[40px] leading-none tracking-display text-ink-cream tabular-nums">
              3.000 €
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="h-5 px-2 text-[11px]">
              4 Zielgruppen
            </Badge>
            <Badge className="h-5 gap-1 px-2 text-[11px]">
              <RiSparkling2Line />
              automatisch verteilt
            </Badge>
          </div>
        </div>
      </Frame>

      <Frame className={cn(styles.rise, "p-0 sm:p-0")} style={riseStyle(1)}>
        <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
          <FieldLabel>Verteilung</FieldLabel>
          <span className="text-xs text-ink-dim">Anteil · Budget · Klickrate</span>
        </div>

        <ul>
          {KAMPAGNEN.map((k, i) => (
            <li
              key={k.name}
              className={cn(
                "relative px-4 py-3.5 sm:px-5",
                i > 0 && "border-t border-white/8",
                "transition-colors duration-200 ease-out hover:bg-white/3",
                "motion-reduce:transition-none",
                k.smart && "bg-ink-yellow/6"
              )}
            >
              {k.smart && (
                <span
                  className="absolute inset-y-0 left-0 w-0.5 bg-ink-yellow"
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-sm text-ink-cream">{k.name}</span>
                <span className="text-xs text-ink-dim tabular-nums">
                  {k.budget} · {k.ctr}
                </span>
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <Track
                  pct={k.anteil}
                  index={i}
                  tone={k.smart ? "yellow" : "muted"}
                />
                <span
                  className={cn(
                    "w-10 shrink-0 text-right text-xs tabular-nums",
                    k.smart ? "text-ink-yellow" : "text-ink-dim"
                  )}
                >
                  {k.anteil} %
                </span>
              </div>
              {k.smart && (
                <p className="mt-2.5 flex items-center gap-1.5 text-xs text-ink-yellow">
                  <RiSparkling2Line className="size-3.5 shrink-0" aria-hidden="true" />
                  KI verschiebt Budget → beste Zielgruppe
                  <RiArrowRightUpLine className="size-3.5 shrink-0" aria-hidden="true" />
                </p>
              )}
              <span className="sr-only">Kanal: {k.kanal}</span>
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  );
}

/* ---------- Tab 3: CRM -------------------------------------------- */

const STAGES = [
  { label: "Neu", value: "12", icon: RiUserAddLine },
  { label: "Kontaktiert in 3 Min", value: "11", icon: RiTimeLine },
  { label: "Termin", value: "6", icon: RiCalendarCheckLine },
  { label: "Abschluss", value: "2", icon: RiCheckLine },
];

type Anfrage = {
  id: number;
  quelle: string;
  status: "Neu" | "Kontaktiert" | "Termin";
  zeit: string;
};

const QUELLEN = ["Formular", "Anruf", "Anzeige", "WhatsApp"];

const START_ANFRAGEN: Anfrage[] = [
  { id: 1042, quelle: "Formular", status: "Neu", zeit: "gerade eben" },
  { id: 1041, quelle: "Anzeige", status: "Kontaktiert", zeit: "vor 3 Min" },
  { id: 1040, quelle: "Anruf", status: "Termin", zeit: "vor 12 Min" },
  { id: 1039, quelle: "WhatsApp", status: "Kontaktiert", zeit: "vor 26 Min" },
];

function StatusPill({ status }: { status: Anfrage["status"] }) {
  if (status === "Neu") {
    return (
      <Badge className="h-5 px-2 text-[11px]">Neu</Badge>
    );
  }
  if (status === "Termin") {
    return (
      <Badge variant="outline" className="h-5 px-2 text-[11px]">
        Termin
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="h-5 px-2 text-[11px]">
      Kontaktiert
    </Badge>
  );
}

function CrmPanel({ live }: { live: boolean }) {
  const [anfragen, setAnfragen] = React.useState<Anfrage[]>(START_ANFRAGEN);
  const nextId = React.useRef(1043);
  const quelleIndex = React.useRef(0);

  React.useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setAnfragen((prev) => {
        const id = nextId.current;
        nextId.current += 1;
        const quelle = QUELLEN[quelleIndex.current % QUELLEN.length] ?? "Formular";
        quelleIndex.current += 1;
        const neu: Anfrage = {
          id,
          quelle,
          status: "Neu",
          zeit: "gerade eben",
        };
        const verschoben = prev.map((a, i) =>
          i === 0
            ? { ...a, status: "Kontaktiert" as const, zeit: "vor 3 Min" }
            : a
        );
        return [neu, ...verschoben].slice(0, 4);
      });
    }, 4800);
    return () => window.clearInterval(timer);
  }, [live]);

  return (
    <div className="grid gap-4">
      <Frame className={cn(styles.rise, "p-0 sm:p-0")} style={riseStyle(0)}>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {STAGES.map((s, i) => (
            <li
              key={s.label}
              className={cn(
                "px-4 py-4 sm:px-5",
                i % 2 === 1 && "border-l border-white/8",
                i > 1 && "border-t border-white/8 sm:border-t-0",
                i === 2 && "sm:border-l",
                i === 3 && "sm:border-l"
              )}
            >
              <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] text-ink-dim uppercase">
                <s.icon className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{s.label}</span>
              </span>
              <div className="font-display mt-2 text-[32px] leading-none tracking-display text-ink-cream tabular-nums">
                {s.value}
              </div>
            </li>
          ))}
        </ul>
      </Frame>

      <Frame className={cn(styles.rise, "p-0 sm:p-0")} style={riseStyle(1)}>
        <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
          <FieldLabel>Eingang</FieldLabel>
          <span className="flex items-center gap-1.5 text-xs text-ink-dim">
            <span
              className={cn(
                "size-1.5 rounded-full bg-ink-yellow",
                live && styles.pulse
              )}
              aria-hidden="true"
            />
            Beispielansicht
          </span>
        </div>

        <ul aria-live="off">
          {anfragen.map((a, i) => (
            <li
              key={a.id}
              className={cn(
                i > 0 && "border-t border-white/8",
                i === 0 && styles.rowIn,
                "flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5",
                "transition-colors duration-200 ease-out hover:bg-white/3",
                "motion-reduce:transition-none"
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-ink-cream">
                  Anfrage {a.id}
                </p>
                <p className="truncate text-xs text-ink-dim">
                  {a.quelle} · {a.zeit}
                </p>
              </div>
              <StatusPill status={a.status} />
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  );
}

/* ---------- Tab 4: Zahlen ----------------------------------------- */

const KENNZAHLEN = [
  { label: "Anfragen", value: "48", delta: "12 %" },
  { label: "Termine", value: "19", delta: "9 %" },
  { label: "Abschlüsse", value: "7", delta: "4 %" },
];

const VERLAUF = [22, 26, 24, 31, 29, 36, 41, 48];
const WOCHE = [
  { tag: "Mo", pct: 62 },
  { tag: "Di", pct: 78 },
  { tag: "Mi", pct: 54 },
  { tag: "Do", pct: 88 },
  { tag: "Fr", pct: 71 },
  { tag: "Sa", pct: 34 },
  { tag: "So", pct: 22 },
];

function Sparkline({ values }: { values: number[] }) {
  const width = 320;
  const height = 72;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - 6 - ((v - min) / span) * (height - 16);
    return { x, y };
  });

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[72px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Verlauf der Anfragen über acht Wochen, Beispielwerte"
    >
      <defs>
        <linearGradient id="sysShowcaseSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7E99A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#F7E99A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sysShowcaseSpark)" className={styles.sparkArea} />
      <path
        d={line}
        fill="none"
        stroke="#F7E99A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className={styles.sparkPath}
      />
      {last && (
        <circle
          cx={last.x - 2}
          cy={last.y}
          r="2.5"
          fill="#F7E99A"
          className={styles.sparkArea}
        />
      )}
    </svg>
  );
}

function ZahlenPanel() {
  return (
    <div className="grid gap-4">
      <Frame className={styles.rise} style={riseStyle(0)}>
        <div className="flex items-center justify-between gap-3">
          <FieldLabel>Wochenreport</FieldLabel>
          <Badge variant="secondary" className="h-5 px-2 text-[11px]">
            KW 32 · Beispiel
          </Badge>
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
          {KENNZAHLEN.map((k) => (
            <li key={k.label} className="min-w-0">
              <span className="text-sm text-ink-muted">{k.label}</span>
              <div className="mt-1.5 flex items-end gap-2.5">
                <span className="font-display text-[44px] leading-none tracking-display text-ink-cream tabular-nums">
                  {k.value}
                </span>
                <span className="pb-1.5">
                  <DeltaBadge>{k.delta}</DeltaBadge>
                </span>
              </div>
              <p className="mt-1.5 text-xs text-ink-dim">gegenüber Vorwoche</p>
            </li>
          ))}
        </ul>
      </Frame>

      <div className="grid gap-4 sm:grid-cols-2">
        <Frame className={styles.rise} style={riseStyle(1)}>
          <div className="flex items-center justify-between gap-3">
            <FieldLabel>Anfragen · 8 Wochen</FieldLabel>
            <RiLineTiny />
          </div>
          <div className="mt-4">
            <Sparkline values={VERLAUF} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-ink-dim">
            <span>KW 25</span>
            <span>KW 32</span>
          </div>
        </Frame>

        <Frame className={styles.rise} style={riseStyle(2)}>
          <FieldLabel>Termine nach Wochentag</FieldLabel>
          <ul className="mt-4 flex h-[72px] items-end gap-2">
            {WOCHE.map((w, i) => (
              <li
                key={w.tag}
                className="flex h-full flex-1 flex-col justify-end rounded-[3px] bg-white/6"
              >
                <span
                  className={cn(styles.colFill, "bg-ink-yellow/70")}
                  style={{ "--i": i, "--h": `${w.pct}%` } as React.CSSProperties}
                />
              </li>
            ))}
          </ul>
          <ul className="mt-2 flex gap-2">
            {WOCHE.map((w) => (
              <li
                key={w.tag}
                className="flex-1 text-center text-[11px] text-ink-dim"
              >
                {w.tag}
              </li>
            ))}
          </ul>
        </Frame>
      </div>
    </div>
  );
}

function RiLineTiny() {
  return (
    <RiBarChartLine className="size-4 text-ink-dim" aria-hidden="true" />
  );
}

/* ---------- Hauptkomponente --------------------------------------- */

export type SystemShowcaseProps = {
  className?: string;
  defaultTab?: TabKey;
};

export default function SystemShowcase({
  className,
  defaultTab = "marke",
}: SystemShowcaseProps) {
  const [tab, setTab] = React.useState<TabKey>(defaultTab);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);
  const reduced = usePrefersReducedMotion();

  const live = tab === "crm" && inView && !reduced;

  return (
    <div
      ref={rootRef}
      className={cn(
        "rounded-[14px] border border-white/10 bg-bg-raised",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_60px_-40px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as TabKey)}
        className="gap-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 p-3 sm:p-4">
          <TabsList
            aria-label="Ansichten des Vertriebssystems"
            className="max-w-full"
          >
            {TABS.map((t) => (
              <TabsTrigger key={t.key} value={t.key} className="gap-2">
                <t.icon data-icon="inline-start" aria-hidden="true" />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <span className="hidden pr-1 text-xs text-ink-dim sm:inline">
            Beispieldaten
          </span>
        </div>

        <div className={cn(styles.stack, "p-3 sm:p-4")}>
          <TabsContent
            value="marke"
            keepMounted
            data-current={tab === "marke"}
            className={styles.panel}
          >
            <MarkePanel />
          </TabsContent>

          <TabsContent
            value="anzeigen"
            keepMounted
            data-current={tab === "anzeigen"}
            className={styles.panel}
          >
            <AnzeigenPanel />
          </TabsContent>

          <TabsContent
            value="crm"
            keepMounted
            data-current={tab === "crm"}
            className={styles.panel}
          >
            <CrmPanel live={live} />
          </TabsContent>

          <TabsContent
            value="zahlen"
            keepMounted
            data-current={tab === "zahlen"}
            className={styles.panel}
          >
            <ZahlenPanel />
          </TabsContent>
        </div>
      </Tabs>

      <p className="border-t border-white/8 px-4 py-3 text-xs text-ink-dim sm:px-5">
        Alle Werte sind Beispielwerte zur Veranschaulichung des Systems.
      </p>
    </div>
  );
}
