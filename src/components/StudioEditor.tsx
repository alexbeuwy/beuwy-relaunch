"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Archive,
  Calculator,
  ChevronDown,
  Home,
  LayoutDashboard,
  Monitor,
  RefreshCw,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { rich } from "@/components/RichText";
import { baueBereiche, kartenLabel, type BereichMitFeldern } from "@/lib/texte/bereiche";

/**
 * Studio-Editor (Leaf U2, 27.08 — "Studio sinnvoll gestalten"): links eine
 * schmale Bereichs-Navi wie im CRM (/intern/layout.tsx), rechts die Felder
 * des gewählten Bereichs als Karten, gruppiert nach Unterseite. Zwei
 * Vorschau-Stufen: eine leichte Text-Vorschau, die beim Tippen sofort
 * mitzieht, und ein Iframe der echten Bereichs-Route, der erst bei Klick
 * lädt (lightweight) und nach dem Speichern automatisch neu lädt.
 *
 * Save-Mechanik unverändert übernommen aus der Vorversion: nur die
 * gegenüber dem geladenen Stand geänderten Felder gehen raus, Teilfehler
 * werden pro Feld gesammelt, die Baseline zieht nur bei tatsächlichem
 * Erfolg nach.
 */

type SaveResponse = {
  ok?: boolean;
  saved?: string[];
  failed?: string[];
  error?: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "success"; text: string }
  | { kind: "error"; text: string };

/** Grobe Auto-Höhe: Zeilenumbrüche und Textlänge bestimmen die rows. */
function rowsFor(text: string): number {
  const lines = text.split("\n").length;
  const wrapped = Math.ceil(text.length / 70) || 1;
  return Math.min(12, Math.max(2, lines, wrapped));
}

const ICONS: Record<string, LucideIcon> = { Home, Calculator, LayoutDashboard, Archive };
function bereichIcon(name: string): LucideIcon {
  return ICONS[name] ?? Archive;
}

/* Text-Vorschau: welches Key-Segment gilt als Headline bzw. als Sub-/
   Fließtext. Exakter Segment-Vergleich (nicht "enthält") — sonst würde
   z. B. "subtitle" über "title" fälschlich als Headline erkannt. */
const HEADLINE_SEGMENTE = new Set(["title", "titel", "h1"]);
const BODY_SEGMENTE = new Set(["subtitle", "sub", "text", "intro", "tagline"]);

function segmente(key: string): string[] {
  return key.split(/[._]/);
}
function istHeadlineKey(key: string): boolean {
  return segmente(key).some((s) => HEADLINE_SEGMENTE.has(s));
}
function istBodyKey(key: string): boolean {
  return segmente(key).some((s) => BODY_SEGMENTE.has(s));
}

type VorschauZeile = { titel: string; headlineKey?: string; bodyKey?: string };

export function StudioEditor({
  defaults,
  overrides,
  labels,
}: {
  defaults: Record<string, string>;
  overrides: Record<string, string>;
  labels: Record<string, string>;
}) {
  // Ausgangszustand = aktueller Live-Stand (Override, sonst Default).
  const initial = useMemo(() => {
    const map: Record<string, string> = {};
    for (const key of Object.keys(defaults)) {
      map[key] = overrides[key] ?? defaults[key];
    }
    return map;
  }, [defaults, overrides]);

  const [values, setValues] = useState<Record<string, string>>(initial);
  // baseline = zuletzt gespeicherter Stand; dagegen wird "dirty" gerechnet.
  const [baseline, setBaseline] = useState<Record<string, string>>(initial);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const bereiche = useMemo(() => baueBereiche(defaults), [defaults]);
  const [aktiverPraefix, setAktiverPraefix] = useState(bereiche[0]?.praefix ?? "");
  const aktiverBereich: BereichMitFeldern = useMemo(
    () => bereiche.find((b) => b.praefix === aktiverPraefix) ?? bereiche[0],
    [bereiche, aktiverPraefix],
  );

  const [showPreview, setShowPreview] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const dirtyKeys = Object.keys(values).filter((key) => values[key] !== baseline[key]);

  function setValue(key: string, next: string) {
    setValues((prev) => ({ ...prev, [key]: next }));
    setStatus({ kind: "idle" });
  }

  function waehleBereich(praefix: string) {
    setAktiverPraefix(praefix);
    setShowPreview(false);
  }

  /** Wie viele Felder eines Bereichs vom Standardtext abweichen — für die Navi-Zähler. */
  function zaehleGeaendert(bereich: BereichMitFeldern): number {
    return bereich.keys.reduce((n, k) => n + (values[k] !== defaults[k] ? 1 : 0), 0);
  }

  async function save() {
    if (busy || dirtyKeys.length === 0) return;
    const changes: Record<string, string> = {};
    for (const key of dirtyKeys) changes[key] = values[key];

    setBusy(true);
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/studio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changes }),
      });
      const data = (await res.json().catch(() => null)) as SaveResponse | null;

      if (res.status === 401) {
        setStatus({
          kind: "error",
          text: "Sitzung abgelaufen — bitte Seite neu laden und erneut anmelden.",
        });
      } else if (!res.ok || !data) {
        const text = data?.error || "Speichern fehlgeschlagen — bitte erneut versuchen.";
        setStatus({ kind: "error", text });
        toast.error(text);
      } else {
        const savedKeys = data.saved ?? [];
        const failedKeys = data.failed ?? [];
        if (savedKeys.length > 0) {
          // Baseline auf die tatsächlich gespeicherten Werte nachziehen.
          setBaseline((prev) => {
            const next = { ...prev };
            for (const key of savedKeys) {
              if (key in changes) next[key] = changes[key];
            }
            return next;
          });
        }
        if (failedKeys.length === 0) {
          const text = "Gespeichert — Seite aktualisiert sich in <1 min.";
          setStatus({ kind: "success", text });
          toast.success(text);
          // Save-API revalidiert bereits gezielt — der iframe zeigt den
          // frischen Stand, sobald die Antwort da ist.
          if (showPreview) {
            iframeRef.current?.contentWindow?.location.reload();
          }
        } else {
          const text = `${failedKeys.length} von ${savedKeys.length + failedKeys.length} Feldern konnten nicht gespeichert werden — bitte erneut versuchen.`;
          setStatus({ kind: "error", text });
          toast.error(text);
        }
      }
    } catch {
      const text = "Netzwerkfehler — bitte erneut versuchen.";
      setStatus({ kind: "error", text });
      toast.error(text);
    }
    setBusy(false);
  }

  const idleText =
    dirtyKeys.length === 0
      ? "Keine ungespeicherten Änderungen."
      : dirtyKeys.length === 1
        ? "1 ungespeicherte Änderung."
        : `${dirtyKeys.length} ungespeicherte Änderungen.`;

  // Text-Vorschau: bis zu vier Unterseiten-Zeilen mit Headline + Sub/Text,
  // damit der Block bei großen Bereichen (CRM-Konsole) lightweight bleibt.
  const vorschauZeilen = useMemo<VorschauZeile[]>(() => {
    const zeilen: VorschauZeile[] = [];
    for (const gruppe of aktiverBereich.gruppen) {
      const headlineKey = gruppe.keys.find(istHeadlineKey);
      const bodyKey = gruppe.keys.find((k) => istBodyKey(k) && k !== headlineKey);
      if (headlineKey || bodyKey) zeilen.push({ titel: gruppe.titel, headlineKey, bodyKey });
      if (zeilen.length >= 4) break;
    }
    return zeilen;
  }, [aktiverBereich]);

  return (
    <div>
      {/* Mobil: horizontale Chips statt linker Navi */}
      <nav aria-label="Studio-Bereiche" className="mb-6 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
        {bereiche.map((b) => {
          const Icon = bereichIcon(b.icon);
          const geaendert = zaehleGeaendert(b);
          const aktiv = b.praefix === aktiverBereich.praefix;
          return (
            <button
              key={b.praefix || "weitere"}
              type="button"
              onClick={() => waehleBereich(b.praefix)}
              aria-current={aktiv ? "true" : undefined}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) ${
                aktiv
                  ? "border-akzent bg-akzent-wash text-ink-cream"
                  : "border-line-subtle text-ink-muted hover:bg-bg-elevated hover:text-ink-cream"
              }`}
            >
              <Icon size={15} className="shrink-0" aria-hidden />
              {b.titel}
              {geaendert > 0 && <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-akzent" />}
            </button>
          );
        })}
      </nav>

      <div className="lg:flex lg:items-start lg:gap-8">
        {/* Desktop: linke Navi, 240px, mit Mini-Thumb + Zähler */}
        <nav
          aria-label="Studio-Bereiche"
          className="hidden shrink-0 lg:sticky lg:top-28 lg:block lg:w-[240px]"
        >
          <div className="flex flex-col gap-1.5">
            {bereiche.map((b) => {
              const Icon = bereichIcon(b.icon);
              const geaendert = zaehleGeaendert(b);
              const aktiv = b.praefix === aktiverBereich.praefix;
              return (
                <button
                  key={b.praefix || "weitere"}
                  type="button"
                  onClick={() => waehleBereich(b.praefix)}
                  aria-current={aktiv ? "true" : undefined}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) ${
                    aktiv ? "border-akzent bg-akzent-wash" : "border-transparent hover:bg-bg-elevated"
                  }`}
                >
                  {b.thumb ? (
                    <Image
                      src={b.thumb}
                      alt=""
                      width={56}
                      height={40}
                      className="h-10 w-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="grid h-10 w-14 shrink-0 place-items-center rounded-lg bg-bg-elevated">
                      <Icon size={18} className="text-ink-dim" aria-hidden />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-cream">
                      <Icon size={13} className="shrink-0 text-ink-dim" aria-hidden />
                      <span className="truncate">{b.titel}</span>
                    </span>
                    <span className="t-data mt-0.5 flex items-center gap-1.5">
                      {b.keys.length} {b.keys.length === 1 ? "Feld" : "Felder"}
                      {geaendert > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                          · {geaendert} geändert
                          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-akzent" />
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Rechts: gewählter Bereich */}
        <div className="min-w-0 flex-1">
          {vorschauZeilen.length > 0 && (
            <div className="mb-8 rounded-xl border border-line-subtle bg-bg-elevated p-6 sm:p-7">
              <p className="t-label">Text-Vorschau</p>
              <div className="mt-4 space-y-5">
                {vorschauZeilen.map((zeile, i) => (
                  <div key={zeile.titel}>
                    {vorschauZeilen.length > 1 && <p className="t-data mb-1">{zeile.titel}</p>}
                    {zeile.headlineKey && (
                      <p className="t-h2" style={i === 0 ? undefined : { fontSize: "clamp(20px, 2.6vw, 28px)" }}>
                        {rich(values[zeile.headlineKey] || "—")}
                      </p>
                    )}
                    {zeile.bodyKey && (
                      <p className="t-body mt-1.5 max-w-[62ch]">{rich(values[zeile.bodyKey] || "—")}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {aktiverBereich.route && (
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line-subtle px-3.5 py-2 text-[13px] font-medium text-ink-cream transition-colors duration-(--duration-quick) ease-(--ease-smooth-out) hover:bg-bg-elevated"
                >
                  <Monitor size={15} aria-hidden />
                  {showPreview ? "Seite ausblenden" : "Seite ansehen"}
                  <ChevronDown
                    size={14}
                    aria-hidden
                    className={`transition-transform duration-(--duration-quick) ease-(--ease-smooth-out) motion-reduce:transition-none ${showPreview ? "rotate-180" : ""}`}
                  />
                </button>
                {showPreview && (
                  <button
                    type="button"
                    onClick={() => iframeRef.current?.contentWindow?.location.reload()}
                    className="t-data inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-ink-cream"
                  >
                    <RefreshCw size={12} aria-hidden />
                    Neu laden
                  </button>
                )}
              </div>
              {showPreview && (
                <div className="mt-3 overflow-hidden rounded-xl border border-line-subtle">
                  <iframe
                    ref={iframeRef}
                    key={aktiverBereich.praefix}
                    src={aktiverBereich.route}
                    title={`Live-Vorschau — ${aktiverBereich.titel}`}
                    className="h-[70vh] w-full bg-white"
                  />
                </div>
              )}
            </div>
          )}

          <div className="space-y-9">
            {aktiverBereich.gruppen.map((gruppe) => (
              <section key={gruppe.titel}>
                {aktiverBereich.gruppen.length > 1 && <h2 className="t-label mb-3">{gruppe.titel}</h2>}
                <div className="space-y-3">
                  {gruppe.keys.map((key) => {
                    const value = values[key];
                    const label = kartenLabel(aktiverBereich, key, labels);
                    const changedFromDefault = value !== defaults[key];
                    return (
                      <div
                        key={key}
                        className="rounded-xl border border-line-subtle bg-white p-5"
                        style={changedFromDefault ? { boxShadow: "inset 3px 0 0 0 var(--akzent)" } : undefined}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <label
                            htmlFor={`studio-${key}`}
                            className="t-small is-cream inline-flex items-baseline gap-2"
                          >
                            {label}
                            {changedFromDefault && (
                              <span
                                className="t-data is-accent inline-flex items-center gap-1.5"
                                title="Weicht vom Standardtext ab"
                              >
                                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-akzent" />
                                Geändert
                              </span>
                            )}
                          </label>
                          {changedFromDefault && (
                            <button
                              type="button"
                              onClick={() => setValue(key, defaults[key])}
                              className="t-data inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-ink-cream"
                            >
                              <RotateCcw size={11} aria-hidden />
                              Zurücksetzen
                            </button>
                          )}
                        </div>
                        <p className="mt-0.5 font-mono text-[11px] text-ink-dim">{key}</p>
                        <textarea
                          id={`studio-${key}`}
                          className="booking-input mt-2.5 w-full resize-y"
                          rows={rowsFor(value)}
                          value={value}
                          onChange={(e) => setValue(key, e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 mt-10 pb-5">
        <div className="panel flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-xl px-5 py-4 shadow-[0_-12px_30px_-18px_rgba(16,25,15,0.18)]">
          <p
            className={
              status.kind === "success"
                ? "t-small is-accent"
                : status.kind === "error"
                  ? "t-small is-fail"
                  : "t-small is-dim"
            }
            role="status"
          >
            {status.kind === "idle" ? idleText : status.text}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={busy || dirtyKeys.length === 0}
            className="btn-primary btn-sm disabled:pointer-events-none disabled:opacity-40"
          >
            <span>{busy ? "Speichert …" : "Speichern"}</span>
          </button>
        </div>
      </div>

      <Toaster position="bottom-right" richColors={false} />
    </div>
  );
}
