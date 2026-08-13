"use client";

import { useMemo, useState } from "react";

/**
 * Studio-Editor: gruppiert die Content-Keys nach Sektion (Präfix vor dem
 * ersten Punkt), zeigt pro Feld ein Textarea mit Abweichungs-Badge und
 * Zurücksetzen auf den Standardtext. Gespeichert werden nur die Felder,
 * die sich gegenüber dem geladenen Stand geändert haben.
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

  // Sektionen: Präfix vor dem ersten Punkt, in DEFAULTS-Reihenfolge.
  const groups = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const key of Object.keys(defaults)) {
      const dot = key.indexOf(".");
      const prefix = dot > 0 ? key.slice(0, dot) : "allgemein";
      const list = map.get(prefix);
      if (list) list.push(key);
      else map.set(prefix, [key]);
    }
    return Array.from(map.entries());
  }, [defaults]);

  const dirtyKeys = Object.keys(values).filter((key) => values[key] !== baseline[key]);

  function setValue(key: string, next: string) {
    setValues((prev) => ({ ...prev, [key]: next }));
    setStatus({ kind: "idle" });
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
        setStatus({
          kind: "error",
          text: data?.error || "Speichern fehlgeschlagen — bitte erneut versuchen.",
        });
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
          setStatus({
            kind: "success",
            text: "Gespeichert — Seite aktualisiert sich in <1 min.",
          });
        } else {
          setStatus({
            kind: "error",
            text: `${failedKeys.length} von ${savedKeys.length + failedKeys.length} Feldern konnten nicht gespeichert werden — bitte erneut versuchen.`,
          });
        }
      }
    } catch {
      setStatus({ kind: "error", text: "Netzwerkfehler — bitte erneut versuchen." });
    }
    setBusy(false);
  }

  const idleText =
    dirtyKeys.length === 0
      ? "Keine ungespeicherten Änderungen."
      : dirtyKeys.length === 1
        ? "1 ungespeicherte Änderung."
        : `${dirtyKeys.length} ungespeicherte Änderungen.`;

  return (
    <div>
      <div className="space-y-8">
        {groups.map(([prefix, keys]) => (
          <section key={prefix} className="panel rounded-xl p-6 sm:p-8">
            <h2 className="t-label">{prefix}</h2>
            <div className="mt-6 space-y-7">
              {keys.map((key) => {
                const value = values[key];
                const label = labels[key] || key;
                const changedFromDefault = value !== defaults[key];
                return (
                  <div key={key}>
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
                            <span
                              aria-hidden
                              className="inline-block h-1.5 w-1.5 rounded-full bg-(--ink-yellow)"
                            />
                            Geändert
                          </span>
                        )}
                      </label>
                      {changedFromDefault && (
                        <button
                          type="button"
                          onClick={() => setValue(key, defaults[key])}
                          className="t-data cursor-pointer transition-colors hover:text-(--ink-cream)"
                        >
                          Zurücksetzen
                        </button>
                      )}
                    </div>
                    {label !== key && <p className="t-data mt-0.5">{key}</p>}
                    <textarea
                      id={`studio-${key}`}
                      className="booking-input mt-2 w-full resize-y"
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
    </div>
  );
}
