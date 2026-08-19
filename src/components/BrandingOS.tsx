"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Dringlichkeit, Lage } from "@/lib/os/kpi";
import { HOOKS, SAEULEN, type Skript, type Snapshot } from "@/lib/os/typen";

/**
 * Branding OS — das Dashboard zum Antigravity-Protokoll.
 *
 * Aufbau folgt der Frage „was tue ich jetzt": zuerst die Entscheidungen,
 * dann die Pipeline, erst danach die Zahlen, aus denen beides folgt.
 * Optik: dunkle Karten, Mono-Zahlen, Pill-Funnel — bewusst nicht im
 * Look der Website, das hier ist Werkzeug, keine Verkaufsseite.
 */

type Anbindungen = {
  datenbank: boolean;
  instagram: boolean;
  tiktok: boolean;
  engine: boolean;
  stimme: boolean;
};

const nf = new Intl.NumberFormat("de-DE");
const nf1 = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

const fmt = (n: number | null) =>
  n === null || Number.isNaN(n) ? "–" : nf.format(Math.round(n));
const fmt1 = (n: number | null) =>
  n === null || Number.isNaN(n) ? "–" : nf1.format(n);

const STUFEN: Record<Dringlichkeit, { farbe: string; wort: string }> = {
  handeln: { farbe: "#ff8589", wort: "Jetzt" },
  beobachten: { farbe: "#e0b653", wort: "Diese Woche" },
  sammeln: { farbe: "#7c9cf5", wort: "Sammeln" },
  laeuft: { farbe: "#7bd88f", wort: "Läuft" },
};

const STATUS_FOLGE: Record<string, { naechster: string; label: string } | null> = {
  idee: { naechster: "skript", label: "Als Skript markieren" },
  skript: { naechster: "gedreht", label: "Gedreht" },
  gedreht: { naechster: "gepostet", label: "Gepostet" },
  geplant: { naechster: "gepostet", label: "Gepostet" },
  gepostet: null,
  verworfen: null,
};

/* ── Bausteine ────────────────────────────────────────────────────── */

function Karte({
  titel,
  extra,
  children,
  className = "",
}: {
  titel: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.06] bg-[#1d1d1b] p-5 ${className}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[13px] text-[#8a8880]">{titel}</h2>
        {extra}
      </div>
      {children}
    </section>
  );
}

function Badge({ wert }: { wert: number | null }) {
  if (wert === null || !Number.isFinite(wert)) return null;
  const gut = wert >= 0;
  return (
    <span
      className="rounded-md px-1.5 py-0.5 font-mono text-[11px]"
      style={{
        color: gut ? "#7bd88f" : "#ff8589",
        background: gut ? "rgba(123,216,143,0.1)" : "rgba(229,72,77,0.12)",
      }}
    >
      {gut ? "+" : ""}
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
      <div className="mt-3 font-mono text-[28px] leading-none text-[#e8e6e1]">{wert}</div>
      <div className="mt-2 text-[12px] leading-snug text-[#8a8880]">{sub}</div>
    </div>
  );
}

/* Balken auf gemeinsamer Skala — für Hook-Bilanz und Säulen-Balance. */
function Balken({
  zeilen,
  einheit,
  ziel,
}: {
  zeilen: { name: string; wert: number | null; neben: string }[];
  einheit: string;
  ziel?: number;
}) {
  const max = Math.max(ziel ?? 0, ...zeilen.map((z) => z.wert ?? 0), 1);
  return (
    <div className="mt-4 space-y-3">
      {zeilen.map((z) => (
        <div key={z.name}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-[#e8e6e1]">{z.name}</span>
            <span className="font-mono text-[13px] text-[#8a8880]">
              {z.wert === null ? "–" : `${fmt1(z.wert)}${einheit}`}
              <span className="ml-2 text-[#5c5a54]">{z.neben}</span>
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#2a2a27]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${Math.min(100, ((z.wert ?? 0) / max) * 100)}%`,
                background:
                  ziel !== undefined && (z.wert ?? 0) < ziel ? "#e0b653" : "#7bd88f",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Funnel({ stufen }: { stufen: { label: string; wert: number | null }[] }) {
  const PILLS = 26;
  const first = stufen[0].wert ?? 0;
  const anker = stufen.map((s, i) => ({
    idx: Math.round((i / (stufen.length - 1)) * (PILLS - 1)),
    h: first > 0 && s.wert !== null ? Math.max(0.07, Math.pow(s.wert / first, 0.3)) : 0.07,
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
    return anker.at(-1)?.h ?? 0.07;
  };
  return (
    <div>
      <div className="mt-4 flex h-[120px] items-end gap-[5px]">
        {Array.from({ length: PILLS }, (_, p) => (
          <div
            key={p}
            className="w-full rounded-full"
            style={{
              height: `${hoehe(p) * 100}%`,
              background: anker.some((a) => a.idx === p) ? "#7bd88f" : "#33332f",
              minWidth: 5,
            }}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {stufen.map((s, i) => {
          const prev = i === 0 ? null : stufen[i - 1].wert;
          const pct =
            s.wert === null ? null : i === 0 ? 100 : prev && prev > 0 ? (s.wert / prev) * 100 : null;
          return (
            <div key={s.label}>
              <div className="font-mono text-[13px] text-[#e8e6e1]">
                {pct === null ? "–" : `${nf1.format(pct)}%`}
              </div>
              <div className="mt-0.5 text-[12px] leading-tight text-[#8a8880]">{s.label}</div>
              <div className="font-mono text-[12px] text-[#5c5a54]">{fmt(s.wert)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Verlauf({ punkte }: { punkte: { tag: string; wert: number }[] }) {
  const W = 560;
  const H = 140;
  const max = Math.max(1, ...punkte.map((p) => p.wert));
  const x = (i: number) => (i / Math.max(1, punkte.length - 1)) * (W - 16) + 8;
  const y = (v: number) => H - 24 - (v / max) * (H - 44);
  const pfad = punkte
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.wert).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Views pro Tag">
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
        <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="11" fill="#8a8880">
          {p.tag}
        </text>
      ))}
    </svg>
  );
}

/* ── Dashboard ────────────────────────────────────────────────────── */

export function BrandingOS({
  snapshot,
  lage,
  anbindungen,
}: {
  snapshot: Snapshot;
  lage: Lage;
  anbindungen: Anbindungen;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [idee, setIdee] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [meldung, setMeldung] = useState<string | null>(null);
  const [offen, setOffen] = useState<string | null>(null);

  const aktualisieren = () => startTransition(() => router.refresh());

  async function ruf(pfad: string, init: RequestInit, wasLaeuft: string) {
    setBusy(wasLaeuft);
    setMeldung(null);
    try {
      const res = await fetch(pfad, init);
      const daten = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; detail?: string }
        | null;
      setMeldung(
        res.ok && daten?.ok
          ? daten.detail || "Fertig."
          : daten?.error || daten?.detail || `Fehlgeschlagen (${res.status})`,
      );
      if (res.ok) aktualisieren();
    } catch {
      setMeldung("Netzwerkfehler.");
    }
    setBusy(null);
  }

  const generieren = () => {
    if (idee.trim().length < 3) return;
    void ruf(
      "/api/os/skripte",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idee: idee.trim(), anzahl: 6 }),
      },
      "engine",
    ).then(() => setIdee(""));
  };

  const statusSetzen = (id: string, status: string) =>
    void ruf(
      "/api/os/skripte",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      },
      `status-${id}`,
    );

  const vertonen = (id: string) =>
    void ruf(
      "/api/os/stimme",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      },
      `stimme-${id}`,
    );

  const delta = (a: number | null, b: number | null) =>
    a === null || b === null || b === 0 ? null : ((a - b) / b) * 100;

  const verlauf = useMemo(() => {
    const wt = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - (6 - i));
      const iso = d.toISOString().slice(0, 10);
      return {
        tag: wt[d.getUTCDay()],
        wert: snapshot.reels
          .filter((r) => r.veroeffentlicht_am.slice(0, 10) === iso)
          .reduce((a, r) => a + r.views, 0),
      };
    });
  }, [snapshot.reels]);

  const funnel = useMemo(() => {
    const d7 = new Date();
    d7.setUTCDate(d7.getUTCDate() - 6);
    const iso = d7.toISOString().slice(0, 10);
    const woche = snapshot.reels.filter((r) => r.veroeffentlicht_am.slice(0, 10) >= iso);
    const s = (f: (r: (typeof woche)[number]) => number) => woche.reduce((a, r) => a + f(r), 0);
    return [
      { label: "Views", wert: woche.length ? s((r) => r.views) : null },
      { label: "Profilbesuche", wert: woche.length ? s((r) => r.profilbesuche) : null },
      { label: "Follows", wert: woche.length ? s((r) => r.follows) : null },
      { label: lage.ctaFrei ? "Webinar-Optins" : "Optins · ab Woche 4", wert: null },
    ];
  }, [snapshot.reels, lage.ctaFrei]);

  const reels = snapshot.reels.slice(0, 12);
  const drehbereit = snapshot.skripte.filter(
    (s) => s.status === "skript" || s.status === "gedreht" || s.status === "idee",
  );

  return (
    <div className="min-h-dvh bg-[#131311] px-4 pb-20 pt-10 sm:px-8">
      <div className="mx-auto max-w-[1100px]">
        {/* Kopf: Woche, Phase, Kadenz */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[32px] leading-none tracking-display text-[#e8e6e1]">
              Branding OS
            </h1>
            <p className="mt-2 text-[13px] text-[#8a8880]">
              Woche {lage.woche} · {lage.phase} ·{" "}
              <span style={{ color: lage.heuteGepostet ? "#7bd88f" : "#ff8589" }}>
                {lage.heuteGepostet
                  ? `heute gepostet · ${lage.streak} Tage Serie`
                  : "heute noch nichts raus"}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => void ruf("/api/os/sync", { method: "POST" }, "sync")}
              disabled={busy !== null}
              className="rounded-lg border border-white/[0.08] bg-[#1d1d1b] px-3 py-2 text-[13px] text-[#e8e6e1] hover:bg-[#232321] disabled:opacity-50"
            >
              {busy === "sync" ? "Hole Zahlen…" : "Zahlen holen"}
            </button>
            <button
              onClick={aktualisieren}
              disabled={pending}
              className="rounded-lg border border-white/[0.08] bg-[#1d1d1b] px-3 py-2 text-[13px] text-[#8a8880] hover:text-[#e8e6e1] disabled:opacity-50"
            >
              Neu laden
            </button>
          </div>
        </header>

        {meldung && (
          <p className="mt-4 rounded-lg border border-white/[0.08] bg-[#232321] px-4 py-2.5 text-[13px] text-[#e8e6e1]">
            {meldung}
          </p>
        )}

        {/* 1. Entscheidungen — was jetzt zu tun ist */}
        <Karte
          titel="Entscheidungen"
          extra={
            <span className="text-[12px] text-[#5c5a54]">
              Schwellen aus docs/branding/KPI-LOGIK.md
            </span>
          }
          className="mt-6"
        >
          {lage.entscheidungen.length === 0 ? (
            <p className="mt-4 text-[13px] text-[#5c5a54]">
              Keine Signale. Sobald Zahlen da sind, steht hier, was zu ändern ist.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {lage.entscheidungen.map((e, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-[#232321] p-4"
                  style={{ borderLeft: `2px solid ${STUFEN[e.stufe].farbe}` }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className="text-[11px] uppercase tracking-[0.05em]"
                      style={{ color: STUFEN[e.stufe].farbe }}
                    >
                      {STUFEN[e.stufe].wort}
                    </span>
                    <span className="text-[15px] font-medium text-[#e8e6e1]">{e.titel}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#8a8880]">
                    {e.begruendung}
                  </p>
                  <p className="mt-1.5 text-[13px] text-[#e8e6e1]">→ {e.aktion}</p>
                </li>
              ))}
            </ul>
          )}
        </Karte>

        {/* 2. Content-Engine + Pipeline */}
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.1fr]">
          <Karte
            titel="Content-Engine"
            extra={
              <span className="text-[12px] text-[#5c5a54]">
                {anbindungen.engine ? "Claude Opus 5" : "Kein API-Key"}
              </span>
            }
          >
            <p className="mt-3 text-[13px] leading-relaxed text-[#8a8880]">
              Einzeiler rein, sechs drehfertige Skripte raus — mit Sprachprofil,
              drei Hooks pro Skript und der aktuellen Hook-Bilanz aus echten Zahlen.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                value={idee}
                onChange={(e) => setIdee(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generieren()}
                placeholder="z. B. Warum Stundensätze Selbstständige bestrafen"
                className="w-full rounded-lg border border-white/[0.08] bg-[#232321] px-3 py-2 text-[13px] text-[#e8e6e1] placeholder:text-[#5c5a54] focus:border-[#7bd88f]/50 focus:outline-none"
              />
              <button
                onClick={generieren}
                disabled={busy !== null || !anbindungen.engine || idee.trim().length < 3}
                className="shrink-0 rounded-lg bg-[#7bd88f] px-4 py-2 text-[13px] font-medium text-[#131311] hover:bg-[#8fe2a1] disabled:opacity-40"
              >
                {busy === "engine" ? "Schreibt…" : "Batch"}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 border-t border-white/[0.05] pt-4">
              {(["idee", "skript", "gedreht", "gepostet"] as const).map((s) => (
                <div key={s}>
                  <div className="font-mono text-[20px] text-[#e8e6e1]">
                    {lage.pipeline[s] ?? 0}
                  </div>
                  <div className="text-[12px] capitalize text-[#8a8880]">{s}</div>
                </div>
              ))}
            </div>
          </Karte>

          <Karte
            titel="Drehbereit"
            extra={<span className="text-[12px] text-[#5c5a54]">{drehbereit.length} Stück</span>}
          >
            {drehbereit.length === 0 ? (
              <p className="mt-4 text-[13px] text-[#5c5a54]">
                Nichts in der Pipeline. Idee links eingeben — dann liegen sechs Skripte hier.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-white/[0.05]">
                {drehbereit.slice(0, 5).map((s) => (
                  <SkriptZeile
                    key={s.id}
                    skript={s}
                    offen={offen === s.id}
                    busy={busy}
                    stimmeAn={anbindungen.stimme}
                    onToggle={() => setOffen(offen === s.id ? null : s.id)}
                    onStatus={statusSetzen}
                    onVertonen={vertonen}
                  />
                ))}
              </ul>
            )}
          </Karte>
        </div>

        {/* 3. Zahlen */}
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Kachel
            label="Follower"
            wert={fmt(lage.follower.gesamt)}
            sub={
              lage.follower.proTag !== null
                ? `${lage.follower.proTag >= 0 ? "+" : ""}${fmt1(lage.follower.proTag)} pro Tag`
                : "IG + TikTok, sobald der Sync läuft"
            }
          />
          <Kachel
            label="Ø Reichweite"
            wert={fmt(lage.woche7.views)}
            sub={`${lage.woche7.anzahl} Reels diese Woche`}
            badge={delta(lage.woche7.views, lage.vorwoche.views)}
          />
          <Kachel
            label="Ø Watchtime"
            wert={lage.woche7.watchtime === null ? "–" : `${fmt1(lage.woche7.watchtime)}%`}
            sub="Ziel ≥ 70 % · unter 50 % Hook ändern"
            badge={delta(lage.woche7.watchtime, lage.vorwoche.watchtime)}
          />
          <Kachel
            label="Saves / 1k"
            wert={fmt1(lage.woche7.savesRate)}
            sub="ab 10 Format klonen · unter 5 konkreter werden"
            badge={delta(lage.woche7.savesRate, lage.vorwoche.savesRate)}
          />
          <Kachel
            label="Follow-Conversion"
            wert={lage.woche7.followConv === null ? "–" : `${fmt1(lage.woche7.followConv)}%`}
            sub="Follows ÷ Profilbesuche · Ziel ≥ 5 %"
            badge={delta(lage.woche7.followConv, lage.vorwoche.followConv)}
          />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Karte
            titel="Views pro Tag"
            extra={
              <span className="font-mono text-[20px] text-[#e8e6e1]">
                {fmt(verlauf.reduce((a, p) => a + p.wert, 0))}
              </span>
            }
          >
            <Verlauf punkte={verlauf} />
          </Karte>
          <Karte
            titel="Funnel · 7 Tage"
            extra={
              <span className="text-[12px] text-[#5c5a54]">
                {lage.ctaFrei ? "CTA frei" : "CTA gesperrt"}
              </span>
            }
          >
            <Funnel stufen={funnel} />
          </Karte>
        </div>

        {/* 4. Der Lernkreis: welcher Hook trägt, welche Säule hungert */}
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <Karte
            titel="Hook-Bilanz"
            extra={<span className="text-[12px] text-[#5c5a54]">Watchtime je Pattern</span>}
          >
            <Balken
              einheit="%"
              ziel={70}
              zeilen={lage.hooks.map((h) => ({
                name: h.name,
                wert: h.anzahl >= 3 ? h.watchtime : null,
                neben: `${h.anzahl} Reels`,
              }))}
            />
            <p className="mt-4 text-[12px] leading-relaxed text-[#5c5a54]">
              Ab 3 Reels je Pattern wird gewertet. Liegt eins 8 Punkte vorn,
              steht die Empfehlung oben in den Entscheidungen.
            </p>
          </Karte>
          <Karte
            titel="Säulen-Balance"
            extra={<span className="text-[12px] text-[#5c5a54]">letzte 14 Tage</span>}
          >
            <Balken
              einheit="%"
              ziel={20}
              zeilen={lage.saeulen.map((s) => ({
                name: s.name,
                wert: s.anteil,
                neben: `${s.anzahl} Reels`,
              }))}
            />
            <p className="mt-4 text-[12px] leading-relaxed text-[#5c5a54]">
              Keine Säule länger als zwei Wochen unter 20 %. Gelb heißt:
              nächsten Batch dorthin ziehen.
            </p>
          </Karte>
        </div>

        {/* 5. Reels */}
        <Karte
          titel="Reels"
          extra={<span className="text-[12px] text-[#5c5a54]">zuletzt veröffentlicht</span>}
          className="mt-3 overflow-x-auto"
        >
          {reels.length === 0 ? (
            <p className="mt-4 text-[13px] text-[#5c5a54]">
              Noch keine Reels erfasst. Der Sync holt sie zweimal täglich —
              oder oben „Zahlen holen" drücken.
            </p>
          ) : (
            <table className="mt-3 w-full min-w-[760px] text-left text-[13px]">
              <thead>
                <tr className="text-[12px] text-[#8a8880]">
                  {["", "Datum", "Titel", "Kanal", "Säule", "Views", "WT %", "Saves/1k", "Shares"].map(
                    (h, i) => (
                      <th key={i} className="pb-2 pr-4 font-normal">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="font-mono text-[#e8e6e1]">
                {reels.map((r) => {
                  const wt = r.watchtime_prozent;
                  const farbe =
                    wt === null ? "#5c5a54" : wt >= 70 ? "#7bd88f" : wt >= 50 ? "#e0b653" : "#e5484d";
                  return (
                    <tr key={r.id} className="border-t border-white/[0.05]">
                      <td className="py-2.5 pr-2">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ background: farbe }}
                        />
                      </td>
                      <td className="pr-4">{r.veroeffentlicht_am.slice(5, 10)}</td>
                      <td className="max-w-[220px] truncate pr-4 font-sans">
                        {r.permalink ? (
                          <a
                            href={r.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#7bd88f]"
                          >
                            {r.titel || "ohne Titel"}
                          </a>
                        ) : (
                          r.titel || "ohne Titel"
                        )}
                      </td>
                      <td className="pr-4 font-sans text-[#8a8880]">
                        {r.plattform === "instagram" ? "Instagram" : "TikTok"}
                      </td>
                      <td className="pr-4 font-sans text-[#8a8880]">
                        {r.saeule ? SAEULEN[r.saeule] : "—"}
                      </td>
                      <td className="pr-4">{fmt(r.views)}</td>
                      <td className="pr-4">
                        {wt !== null
                          ? fmt1(wt)
                          : r.avg_watchtime_sek !== null
                            ? `${fmt1(r.avg_watchtime_sek)}s`
                            : "–"}
                      </td>
                      <td className="pr-4">
                        {r.views > 0 ? fmt1((r.saves / r.views) * 1000) : "–"}
                      </td>
                      <td className="pr-4">{fmt(r.shares)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Karte>

        {/* 6. Anbindungen — was füttert das OS wirklich */}
        <Karte
          titel="Anbindungen"
          extra={
            <span className="text-[12px] text-[#5c5a54]">
              Sync 05:00 und 17:00 · Report sonntags 18:00
            </span>
          }
          className="mt-3"
        >
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {(
              [
                ["Datenbank", anbindungen.datenbank, "Supabase"],
                ["Instagram", anbindungen.instagram, "Graph API"],
                ["TikTok", anbindungen.tiktok, "Display API"],
                ["Skript-Engine", anbindungen.engine, "Claude"],
                ["Stimme", anbindungen.stimme, "ElevenLabs"],
              ] as const
            ).map(([name, an, wie]) => (
              <div key={name} className="rounded-xl bg-[#232321] p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: an ? "#7bd88f" : "#4a4a45" }}
                  />
                  <span className="text-[13px] text-[#e8e6e1]">{name}</span>
                </div>
                <div className="mt-1 text-[12px] text-[#5c5a54]">
                  {an ? wie : "Key fehlt"}
                </div>
              </div>
            ))}
          </div>
          {snapshot.log.length > 0 && (
            <ul className="mt-4 space-y-1 border-t border-white/[0.05] pt-3 font-mono text-[12px]">
              {snapshot.log.slice(0, 5).map((l) => (
                <li key={l.id} className="flex gap-3 text-[#5c5a54]">
                  <span>{new Date(l.zeit).toLocaleString("de-DE").slice(0, 17)}</span>
                  <span style={{ color: l.ok ? "#7bd88f" : "#ff8589" }}>{l.quelle}</span>
                  <span className="truncate">{l.detail}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-[12px] text-[#5c5a54]">
            Fehlende Anbindungen: siehe docs/branding/ANBINDUNGEN.md — dort steht
            pro Dienst, welche Variable wo herkommt.
          </p>
        </Karte>
      </div>
    </div>
  );
}

/* Eine Zeile in der Drehbereit-Liste: aufklappbar, mit Statuswechsel. */
function SkriptZeile({
  skript,
  offen,
  busy,
  stimmeAn,
  onToggle,
  onStatus,
  onVertonen,
}: {
  skript: Skript;
  offen: boolean;
  busy: string | null;
  stimmeAn: boolean;
  onToggle: () => void;
  onStatus: (id: string, status: string) => void;
  onVertonen: (id: string) => void;
}) {
  const folge = STATUS_FOLGE[skript.status];
  const hooks = [
    ["interrupt", skript.hook_interrupt],
    ["kontra", skript.hook_kontra],
    ["zahl", skript.hook_zahl],
  ] as const;

  return (
    <li className="py-3">
      <button onClick={onToggle} className="flex w-full items-baseline gap-3 text-left">
        <span className="font-mono text-[12px] text-[#5c5a54]">
          {skript.batch?.replace("batch-", "") ?? "—"}·{skript.nummer ?? "—"}
        </span>
        <span className="flex-1 truncate text-[13px] text-[#e8e6e1]">{skript.titel}</span>
        <span className="text-[12px] text-[#8a8880]">
          {skript.saeule ? SAEULEN[skript.saeule] : "—"}
        </span>
        <span className="font-mono text-[12px] text-[#5c5a54]">{skript.laenge_sek ?? "?"}s</span>
      </button>

      {offen && (
        <div className="mt-3 rounded-xl bg-[#232321] p-4">
          <div className="space-y-1.5">
            {hooks.map(([typ, text]) =>
              text ? (
                <div key={typ} className="flex gap-2 text-[13px]">
                  <span className="w-[112px] shrink-0 text-[#5c5a54]">{HOOKS[typ]}</span>
                  <span className="text-[#e8e6e1]">„{text}"</span>
                </div>
              ) : null,
            )}
          </div>
          {skript.body && (
            <p className="mt-3 whitespace-pre-line border-t border-white/[0.05] pt-3 text-[13px] leading-relaxed text-[#c9c7c1]">
              {skript.body}
            </p>
          )}
          {skript.loop_ende && (
            <p className="mt-2 text-[13px] italic leading-relaxed text-[#8a8880]">
              {skript.loop_ende}
            </p>
          )}
          {skript.regie && (
            <p className="mt-3 border-t border-white/[0.05] pt-3 text-[12px] leading-relaxed text-[#5c5a54]">
              Regie: {skript.regie}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {folge && (
              <button
                onClick={() => onStatus(skript.id, folge.naechster)}
                disabled={busy !== null}
                className="rounded-lg bg-[#7bd88f] px-3 py-1.5 text-[12px] font-medium text-[#131311] hover:bg-[#8fe2a1] disabled:opacity-40"
              >
                {busy === `status-${skript.id}` ? "…" : folge.label}
              </button>
            )}
            {skript.audio_url ? (
              <a
                href={skript.audio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[12px] text-[#7bd88f]"
              >
                Audio anhören
              </a>
            ) : (
              <button
                onClick={() => onVertonen(skript.id)}
                disabled={busy !== null || !stimmeAn}
                className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[12px] text-[#8a8880] hover:text-[#e8e6e1] disabled:opacity-40"
                title={stimmeAn ? "" : "ElevenLabs nicht konfiguriert"}
              >
                {busy === `stimme-${skript.id}` ? "Vertont…" : "Vertonen"}
              </button>
            )}
            <button
              onClick={() => onStatus(skript.id, "verworfen")}
              disabled={busy !== null}
              className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-[12px] text-[#5c5a54] hover:text-[#ff8589] disabled:opacity-40"
            >
              Verwerfen
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
