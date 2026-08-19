"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Branding OS v1 — KPI-Dashboard fürs Personal Branding (/os).
 * Optik nach Skymetrics-Inspo (dunkel, Pill-Funnel, Mono-Zahlen),
 * bewusst NICHT im Site-Look: eigenes internes Werkzeug.
 * Persistenz: localStorage (beuwy-os-v1) + JSON-Export/-Import.
 * Schwellenwerte: docs/branding/KPI-LOGIK.md — hier nur gespiegelt.
 */

type Saeule = "a" | "b" | "c";
type HookTyp = "interrupt" | "kontra" | "zahl";

type Reel = {
  id: string;
  datum: string; // JJJJ-MM-TT
  titel: string;
  saeule: Saeule;
  hook: HookTyp;
  views: number;
  watchtime: number; // Prozent 0–100
  saves: number;
  shares: number;
  kommentare: number;
  profilbesuche: number;
  follows: number;
};

type Tagesstand = { datum: string; ig: number; tt: number };

type OsDaten = { reels: Reel[]; tage: Tagesstand[] };

const STORAGE_KEY = "beuwy-os-v1";
const LEER: OsDaten = { reels: [], tage: [] };

const SAEULEN: Record<Saeule, string> = {
  a: "Selbstständigkeit",
  b: "AI/Claude",
  c: "Webseiten",
};
const HOOKS: Record<HookTyp, string> = {
  interrupt: "Pattern-Interrupt",
  kontra: "Kontra-These",
  zahl: "Konkrete Zahl",
};

const nf = new Intl.NumberFormat("de-DE");
const nf1 = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

function fmt(n: number | null): string {
  return n === null || Number.isNaN(n) ? "–" : nf.format(Math.round(n));
}
function fmt1(n: number | null): string {
  return n === null || Number.isNaN(n) ? "–" : nf1.format(n);
}
function heute(): string {
  return new Date().toISOString().slice(0, 10);
}
function tageZurueck(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

/* Ø Watchtime, Saves/1k etc. über eine Reel-Menge */
function kennzahlen(reels: Reel[]) {
  if (reels.length === 0)
    return { views: null, watchtime: null, savesRate: null, followConv: null };
  const sum = (f: (r: Reel) => number) => reels.reduce((a, r) => a + f(r), 0);
  const views = sum((r) => r.views);
  return {
    views: views / reels.length,
    watchtime: sum((r) => r.watchtime) / reels.length,
    savesRate: views > 0 ? (sum((r) => r.saves) / views) * 1000 : null,
    followConv:
      sum((r) => r.profilbesuche) > 0
        ? (sum((r) => r.follows) / sum((r) => r.profilbesuche)) * 100
        : null,
  };
}

/* Ampel nach KPI-LOGIK: Watchtime ≥70 grün, 50–70 gelb, <50 rot */
function ampel(r: Reel): string {
  if (r.watchtime >= 70) return "#7bd88f";
  if (r.watchtime >= 50) return "#e0b653";
  return "#e5484d";
}

function Badge({ wert, invers = false }: { wert: number | null; invers?: boolean }) {
  if (wert === null || Number.isNaN(wert) || !Number.isFinite(wert)) return null;
  const gut = invers ? wert < 0 : wert >= 0;
  return (
    <span
      className="rounded-md px-1.5 py-0.5 font-mono text-[11px]"
      style={{
        color: gut ? "#7bd88f" : "#ff8589",
        background: gut ? "rgba(123,216,143,0.1)" : "rgba(229,72,77,0.12)",
      }}
    >
      {wert >= 0 ? "+" : ""}
      {nf1.format(wert)}%
    </span>
  );
}

function Kachel({
  label,
  wert,
  sub,
  badge,
}: {
  label: string;
  wert: string;
  sub: string;
  badge?: number | null;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#1d1d1b] p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] text-[#8a8880]">{label}</span>
        {badge !== undefined && <Badge wert={badge} />}
      </div>
      <div className="mt-3 font-mono text-[28px] leading-none text-[#e8e6e1]">
        {wert}
      </div>
      <div className="mt-2 text-[12px] text-[#8a8880]">{sub}</div>
    </div>
  );
}

/* Pill-Funnel wie in der Inspo: Höhen zwischen den Stufen interpoliert,
   Potenz-Skala, damit kleine Konversionsraten sichtbar bleiben */
function Funnel({ stufen }: { stufen: { label: string; wert: number | null }[] }) {
  const PILLS = 28;
  const first = stufen[0].wert ?? 0;
  const anker = stufen.map((s, i) => ({
    idx: Math.round((i / (stufen.length - 1)) * (PILLS - 1)),
    h:
      first > 0 && s.wert !== null
        ? Math.max(0.07, Math.pow(s.wert / first, 0.3))
        : 0.07,
  }));
  const hoehe = (p: number) => {
    for (let i = 0; i < anker.length - 1; i++) {
      const a = anker[i];
      const b = anker[i + 1];
      if (p >= a.idx && p <= b.idx) {
        const t = b.idx === a.idx ? 0 : (p - a.idx) / (b.idx - a.idx);
        return a.h + (b.h - a.h) * t;
      }
    }
    return anker[anker.length - 1].h;
  };
  return (
    <div>
      <div className="flex h-[140px] items-end gap-[5px]">
        {Array.from({ length: PILLS }, (_, p) => {
          const istAnker = anker.some((a) => a.idx === p);
          return (
            <div
              key={p}
              className="w-full rounded-full"
              style={{
                height: `${hoehe(p) * 100}%`,
                background: istAnker ? "#7bd88f" : "#33332f",
                minWidth: 5,
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {stufen.map((s, i) => {
          const prev = i === 0 ? null : stufen[i - 1].wert;
          const pct =
            s.wert === null
              ? null
              : i === 0
                ? 100
                : prev && prev > 0
                  ? (s.wert / prev) * 100
                  : null;
          return (
            <div key={s.label}>
              <div className="font-mono text-[13px] text-[#e8e6e1]">
                {pct === null ? "–" : `${nf1.format(pct)}%`}
              </div>
              <div className="mt-0.5 text-[12px] text-[#8a8880]">{s.label}</div>
              <div className="font-mono text-[12px] text-[#8a8880]">
                {fmt(s.wert)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 7-Tage-Linie (Views/Tag) als pures SVG */
function Verlauf({ punkte }: { punkte: { tag: string; wert: number }[] }) {
  const W = 560;
  const H = 150;
  const max = Math.max(1, ...punkte.map((p) => p.wert));
  const x = (i: number) => (i / (punkte.length - 1)) * (W - 16) + 8;
  const y = (v: number) => H - 24 - (v / max) * (H - 40);
  const pfad = punkte
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.wert).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Views pro Tag, letzte 7 Tage">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line
          key={g}
          x1="8"
          x2={W - 8}
          y1={y(max * g)}
          y2={y(max * g)}
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="3 5"
        />
      ))}
      <path d={pfad} fill="none" stroke="#7bd88f" strokeWidth="2" strokeLinejoin="round" />
      {punkte.map((p, i) => (
        <text
          key={p.tag}
          x={x(i)}
          y={H - 6}
          textAnchor="middle"
          fontSize="11"
          fill="#8a8880"
        >
          {p.tag}
        </text>
      ))}
    </svg>
  );
}

const inputKlasse =
  "w-full rounded-lg border border-white/[0.08] bg-[#232321] px-3 py-2 text-[13px] text-[#e8e6e1] placeholder:text-[#5c5a54] focus:border-[#7bd88f]/50 focus:outline-none";

export function BrandingOS() {
  const [daten, setDaten] = useState<OsDaten>(LEER);
  const [geladen, setGeladen] = useState(false);
  const [formOffen, setFormOffen] = useState<"reel" | "tag" | null>(null);
  const dateiRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const roh = localStorage.getItem(STORAGE_KEY);
      if (roh) setDaten(JSON.parse(roh) as OsDaten);
    } catch {
      /* defekter Stand → leer starten */
    }
    setGeladen(true);
  }, []);

  const speichern = (neu: OsDaten) => {
    setDaten(neu);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(neu));
  };

  /* Zeitfenster: letzte 7 Tage vs. die 7 davor */
  const d7 = tageZurueck(6);
  const d14 = tageZurueck(13);
  const woche = daten.reels.filter((r) => r.datum >= d7);
  const vorwoche = daten.reels.filter((r) => r.datum >= d14 && r.datum < d7);
  const kw = kennzahlen(woche);
  const vw = kennzahlen(vorwoche);

  const delta = (a: number | null, b: number | null) =>
    a === null || b === null || b === 0 ? null : ((a - b) / b) * 100;

  const tageSortiert = [...daten.tage].sort((a, b) => a.datum.localeCompare(b.datum));
  const aktuell = tageSortiert.at(-1) ?? null;
  const vor7 = [...tageSortiert].reverse().find((t) => t.datum <= d7) ?? null;
  const followerGesamt = aktuell ? aktuell.ig + aktuell.tt : null;
  const followerProTag =
    aktuell && vor7 && aktuell.datum > vor7.datum
      ? (aktuell.ig + aktuell.tt - vor7.ig - vor7.tt) / 7
      : null;

  const funnelStufen = useMemo(() => {
    const sum = (f: (r: Reel) => number) => woche.reduce((a, r) => a + f(r), 0);
    return [
      { label: "Views", wert: woche.length ? sum((r) => r.views) : null },
      { label: "Profilbesuche", wert: woche.length ? sum((r) => r.profilbesuche) : null },
      { label: "Follows", wert: woche.length ? sum((r) => r.follows) : null },
      { label: "Optins · Phase 2", wert: null },
    ];
  }, [woche]);

  const verlauf = useMemo(() => {
    const wt = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return Array.from({ length: 7 }, (_, i) => {
      const datum = tageZurueck(6 - i);
      return {
        tag: wt[new Date(`${datum}T12:00:00`).getDay()],
        wert: daten.reels
          .filter((r) => r.datum === datum)
          .reduce((a, r) => a + r.views, 0),
      };
    });
  }, [daten.reels]);

  const reelEintragen = (form: FormData) => {
    const zahl = (k: string) => Number(form.get(k) ?? 0) || 0;
    const reel: Reel = {
      id: crypto.randomUUID(),
      datum: String(form.get("datum") || heute()),
      titel: String(form.get("titel") || "Ohne Titel"),
      saeule: (form.get("saeule") as Saeule) || "a",
      hook: (form.get("hook") as HookTyp) || "interrupt",
      views: zahl("views"),
      watchtime: Math.min(100, zahl("watchtime")),
      saves: zahl("saves"),
      shares: zahl("shares"),
      kommentare: zahl("kommentare"),
      profilbesuche: zahl("profilbesuche"),
      follows: zahl("follows"),
    };
    speichern({ ...daten, reels: [...daten.reels, reel] });
    setFormOffen(null);
  };

  const tagEintragen = (form: FormData) => {
    const stand: Tagesstand = {
      datum: String(form.get("datum") || heute()),
      ig: Number(form.get("ig") ?? 0) || 0,
      tt: Number(form.get("tt") ?? 0) || 0,
    };
    speichern({
      ...daten,
      tage: [...daten.tage.filter((t) => t.datum !== stand.datum), stand],
    });
    setFormOffen(null);
  };

  const exportieren = () => {
    const blob = new Blob([JSON.stringify(daten, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `branding-os-${heute()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importieren = async (datei: File) => {
    try {
      const roh = JSON.parse(await datei.text()) as OsDaten;
      if (Array.isArray(roh.reels) && Array.isArray(roh.tage)) speichern(roh);
    } catch {
      /* ungültige Datei ignorieren */
    }
  };

  const reelsSortiert = [...daten.reels]
    .sort((a, b) => b.datum.localeCompare(a.datum))
    .slice(0, 14);

  return (
    <div className="min-h-dvh bg-[#131311] px-4 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[32px] tracking-display text-[#e8e6e1]">
              Branding OS
            </h1>
            <p className="mt-1 text-[13px] text-[#8a8880]">
              Letzte 7 Tage gegen die 7 davor · Regeln: docs/branding/KPI-LOGIK.md
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFormOffen(formOffen === "tag" ? null : "tag")}
              className="rounded-lg border border-white/[0.08] bg-[#1d1d1b] px-3 py-2 text-[13px] text-[#e8e6e1] hover:bg-[#232321]"
            >
              Follower-Stand
            </button>
            <button
              onClick={() => setFormOffen(formOffen === "reel" ? null : "reel")}
              className="rounded-lg bg-[#7bd88f] px-3 py-2 text-[13px] font-medium text-[#131311] hover:bg-[#8fe2a1]"
            >
              Reel eintragen
            </button>
            <button
              onClick={exportieren}
              className="rounded-lg border border-white/[0.08] bg-[#1d1d1b] px-3 py-2 text-[13px] text-[#8a8880] hover:text-[#e8e6e1]"
            >
              Export
            </button>
            <button
              onClick={() => dateiRef.current?.click()}
              className="rounded-lg border border-white/[0.08] bg-[#1d1d1b] px-3 py-2 text-[13px] text-[#8a8880] hover:text-[#e8e6e1]"
            >
              Import
            </button>
            <input
              ref={dateiRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importieren(f);
                e.target.value = "";
              }}
            />
          </div>
        </header>

        {formOffen === "reel" && (
          <form
            action={reelEintragen}
            className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-[#1d1d1b] p-5 sm:grid-cols-4"
          >
            <input name="datum" type="date" defaultValue={heute()} className={inputKlasse} />
            <input name="titel" placeholder="Titel / Idee" className={inputKlasse} />
            <select name="saeule" className={inputKlasse} defaultValue="a">
              {Object.entries(SAEULEN).map(([k, v]) => (
                <option key={k} value={k}>{`Säule ${k} — ${v}`}</option>
              ))}
            </select>
            <select name="hook" className={inputKlasse} defaultValue="interrupt">
              {Object.entries(HOOKS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            {(
              [
                ["views", "Views"],
                ["watchtime", "Watchtime %"],
                ["saves", "Saves"],
                ["shares", "Shares"],
                ["kommentare", "Kommentare"],
                ["profilbesuche", "Profilbesuche"],
                ["follows", "Follows"],
              ] as const
            ).map(([name, label]) => (
              <input
                key={name}
                name={name}
                type="number"
                min="0"
                step="any"
                placeholder={label}
                className={inputKlasse}
              />
            ))}
            <button className="rounded-lg bg-[#7bd88f] px-3 py-2 text-[13px] font-medium text-[#131311]">
              Speichern
            </button>
          </form>
        )}

        {formOffen === "tag" && (
          <form
            action={tagEintragen}
            className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-[#1d1d1b] p-5 sm:grid-cols-4"
          >
            <input name="datum" type="date" defaultValue={heute()} className={inputKlasse} />
            <input name="ig" type="number" min="0" placeholder="Follower Instagram" className={inputKlasse} />
            <input name="tt" type="number" min="0" placeholder="Follower TikTok" className={inputKlasse} />
            <button className="rounded-lg bg-[#7bd88f] px-3 py-2 text-[13px] font-medium text-[#131311]">
              Speichern
            </button>
          </form>
        )}

        {/* KPI-Kacheln */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Kachel
            label="Follower gesamt"
            wert={geladen ? fmt(followerGesamt) : "–"}
            sub={
              followerProTag !== null
                ? `${followerProTag >= 0 ? "+" : ""}${fmt1(followerProTag)} pro Tag`
                : "IG + TikTok, täglicher Stand"
            }
          />
          <Kachel
            label="Ø Reichweite / Reel"
            wert={fmt(kw.views)}
            sub={`${woche.length} Reels diese Woche`}
            badge={delta(kw.views, vw.views)}
          />
          <Kachel
            label="Ø Watchtime"
            wert={kw.watchtime === null ? "–" : `${fmt1(kw.watchtime)}%`}
            sub="Ziel ≥ 70 % · unter 50 % Hook ändern"
            badge={delta(kw.watchtime, vw.watchtime)}
          />
          <Kachel
            label="Saves / 1k"
            wert={fmt1(kw.savesRate)}
            sub="ab 10: Format klonen"
            badge={delta(kw.savesRate, vw.savesRate)}
          />
          <Kachel
            label="Follow-Conversion"
            wert={kw.followConv === null ? "–" : `${fmt1(kw.followConv)}%`}
            sub="Follows ÷ Profilbesuche · Ziel ≥ 5 %"
            badge={delta(kw.followConv, vw.followConv)}
          />
        </div>

        {/* Verlauf + Funnel */}
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#1d1d1b] p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-[#8a8880]">Views pro Tag</span>
              <span className="font-mono text-[20px] text-[#e8e6e1]">
                {fmt(verlauf.reduce((a, p) => a + p.wert, 0))}
              </span>
            </div>
            <div className="mt-4">
              <Verlauf punkte={verlauf} />
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[#1d1d1b] p-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-[#8a8880]">Funnel · 7 Tage</span>
              <span className="text-[12px] text-[#8a8880]">CTA ab Woche 4–6</span>
            </div>
            <div className="mt-4">
              <Funnel stufen={funnelStufen} />
            </div>
          </div>
        </div>

        {/* Reel-Tabelle */}
        <div className="mt-3 overflow-x-auto rounded-2xl border border-white/[0.06] bg-[#1d1d1b] p-5">
          <span className="text-[13px] text-[#8a8880]">Reels · zuletzt eingetragen</span>
          {reelsSortiert.length === 0 ? (
            <p className="mt-4 text-[13px] text-[#5c5a54]">
              Noch keine Daten. Erstes Reel eintragen — ab 10 Reels pro Format
              wird entschieden, vorher nur gemessen.
            </p>
          ) : (
            <table className="mt-3 w-full min-w-[720px] text-left text-[13px]">
              <thead>
                <tr className="text-[12px] text-[#8a8880]">
                  {["", "Datum", "Titel", "Säule", "Hook", "Views", "WT %", "Saves/1k", "Follows"].map(
                    (h, i) => (
                      <th key={i} className="pb-2 pr-4 font-normal">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="font-mono text-[#e8e6e1]">
                {reelsSortiert.map((r) => (
                  <tr key={r.id} className="border-t border-white/[0.05]">
                    <td className="py-2.5 pr-2">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: ampel(r) }}
                      />
                    </td>
                    <td className="pr-4">{r.datum.slice(5)}</td>
                    <td className="max-w-[220px] truncate pr-4 font-sans">{r.titel}</td>
                    <td className="pr-4 font-sans text-[#8a8880]">{SAEULEN[r.saeule]}</td>
                    <td className="pr-4 font-sans text-[#8a8880]">{HOOKS[r.hook]}</td>
                    <td className="pr-4">{fmt(r.views)}</td>
                    <td className="pr-4">{fmt1(r.watchtime)}</td>
                    <td className="pr-4">
                      {r.views > 0 ? fmt1((r.saves / r.views) * 1000) : "–"}
                    </td>
                    <td className="pr-4">{fmt(r.follows)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-4 text-[12px] text-[#5c5a54]">
          v1 · Daten liegen nur in diesem Browser (localStorage). Export als
          Backup nutzen. v2 hängt die Erfassung an Supabase.
        </p>
      </div>
    </div>
  );
}
