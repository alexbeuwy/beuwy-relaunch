"use client";

import { useState } from "react";

type Line = {
  type: "blank" | "raw" | "comment" | "section" | "key";
  key?: string;
  value?: string;
  text?: string;
  /** Tooltip shown when the line is focused. Set on key lines. */
  hint?: string;
};

const LINES: Line[] = [
  { type: "raw", text: "---" },
  { type: "key", key: "version", value: "1.0" },
  { type: "key", key: "name", value: "deine-marke", hint: "Slug. Wird in OG-Image und JSON-LD verwendet." },
  { type: "key", key: "domain", value: "deine-marke.de", hint: "Primärdomain. Andere Domains werden 301 weitergeleitet." },
  { type: "blank" },
  { type: "section", key: "colors", hint: "Token-Set, gelesen von Tailwind config, CSS-Variablen, Sketch-Plugin." },
  { type: "key", key: "  bg", value: "#1A0404", hint: "Page background. Bordeaux-Ink." },
  { type: "key", key: "  raised", value: "#210606", hint: "Eine Stufe heller — Cards, Surfaces." },
  { type: "key", key: "  yellow", value: "#F7E99A", hint: "Brand-Akzent. Genau ein luminescenter Ton. Nicht mehr." },
  { type: "key", key: "  cream", value: "#FFFDF3", hint: "Off-white für Text. Niemals reines Weiss." },
  { type: "blank" },
  { type: "section", key: "typography", hint: "Schrift-Rollen. Cursor / v0 importieren sie automatisch." },
  { type: "key", key: "  display", value: "Fraunces 400 / -0.02em", hint: "Headlines. Italic = Emphasis." },
  { type: "key", key: "  body", value: "Geist 400 / -0.011em", hint: "Body. Tight Tracking, Cool-Neutral." },
  { type: "blank" },
  { type: "section", key: "voice" },
  { type: "key", key: "  thesis", value: "agent-era operator brand", hint: "Eine These pro Brand. Nicht zwei." },
  {
    type: "key",
    key: "  forbidden",
    value: "[AI-powered, revolutionary, synergy]",
    hint: "Wörter, die kein Agent uns je in den Mund legen soll.",
  },
  { type: "blank" },
  { type: "comment", text: "# read by Claude · ChatGPT · Cursor · v0 · Perplexity" },
  { type: "raw", text: "---" },
];

/**
 * Click-to-focus DESIGN.md preview — "mask trick":
 * Clicking a key/section line dims all others and reveals a hint pill.
 * Click outside or the same line again to reset.
 */
export function InteractiveCode({ height = 540 }: { height?: number }) {
  const [focused, setFocused] = useState<number | null>(null);

  const focusable = (l: Line) => l.type === "key" || l.type === "section";

  return (
    <div
      className="interactive-code"
      data-focused={focused !== null}
      onClick={() => setFocused(null)}
      style={{ height }}
    >
      <div
        className="interactive-code-header"
        style={{ borderBottom: "1px solid var(--line-subtle)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-[6px]">
            <span className="block w-[10px] h-[10px] rounded-full" style={{ background: "#3a1212" }} />
            <span className="block w-[10px] h-[10px] rounded-full" style={{ background: "#3a1212" }} />
            <span className="block w-[10px] h-[10px] rounded-full" style={{ background: "#3a1212" }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--ink-muted)",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="editor-live-dot" style={{ color: "var(--ink-yellow)", display: "inline-block", borderRadius: "50%" }}>
              ●
            </span>{" "}
            DESIGN.md{" "}
            <span style={{ color: "var(--ink-dim)" }}>· hover or click any line</span>
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-dim)",
          }}
        >
          {focused === null ? "all lines · ready" : `focus: line ${focused + 1}`}
        </span>
      </div>

      <div className="interactive-code-body">
        {LINES.map((l, i) => {
          const isFocusable = focusable(l);
          const isFocused = focused === i;
          return (
            <div
              key={i}
              className="code-line interactive-code-line"
              data-focusable={isFocusable}
              data-focused={isFocused}
              onClick={(e) => {
                e.stopPropagation();
                if (!isFocusable) return;
                setFocused(isFocused ? null : i);
              }}
            >
              <span className="ln">{i + 1}</span>
              <span>{renderLine(l)}</span>
              {isFocused && l.hint && (
                <span className="interactive-code-hint" role="tooltip">
                  {l.hint}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderLine(l: Line) {
  if (l.type === "blank") return <span>&nbsp;</span>;
  if (l.type === "raw") return <span className="punc">{l.text}</span>;
  if (l.type === "comment") return <span className="comment">{l.text}</span>;
  if (l.type === "section") {
    return (
      <span>
        <span className="key">{l.key}</span>
        <span className="punc">:</span>
      </span>
    );
  }
  return (
    <span>
      <span className="key">{l.key}</span>
      <span className="punc">: </span>
      {l.key && l.key.trim() === "yellow" && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: 2,
            background: "var(--ink-yellow)",
            marginRight: 8,
            verticalAlign: "middle",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
          }}
        />
      )}
      <span className="val-str">{l.value}</span>
    </span>
  );
}
