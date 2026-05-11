"use client";

import { useEffect, useRef, useState } from "react";

type Line =
  | { type: "blank" }
  | { type: "comment"; text: string }
  | { type: "key"; key: string; value: string }
  | { type: "section"; key: string }
  | { type: "raw"; text: string };

function buildLines(domain: string, name: string): Line[] {
  return [
    { type: "raw", text: "---" },
    { type: "key", key: "version", value: "1.0" },
    { type: "key", key: "name", value: name || "deine-marke" },
    { type: "key", key: "domain", value: domain || "deine-marke.de" },
    { type: "key", key: "ship", value: "10 days" },
    { type: "blank" },
    { type: "section", key: "colors" },
    { type: "key", key: "  bg", value: "#1A0404" },
    { type: "key", key: "  raised", value: "#210606" },
    { type: "key", key: "  yellow", value: "#F7E99A" },
    { type: "key", key: "  cream", value: "#F2EFE1" },
    { type: "blank" },
    { type: "section", key: "typography" },
    { type: "key", key: "  display", value: "Fraunces 400 / -0.02em" },
    { type: "key", key: "  body", value: "Geist 400 / -0.011em" },
    { type: "key", key: "  mono", value: "Geist Mono 500" },
    { type: "blank" },
    { type: "section", key: "voice" },
    { type: "key", key: "  thesis", value: "agent-era operator brand" },
    {
      type: "key",
      key: "  forbidden",
      value: "[AI-powered, revolutionary, synergy]",
    },
    { type: "blank" },
    { type: "comment", text: "# read by Claude · ChatGPT · Cursor · v0 · Perplexity" },
    { type: "raw", text: "---" },
  ];
}

export function Editor({
  height = 460,
  interactive = true,
  initialDomain = "deine-marke.de",
  initialName = "deine-marke",
}: {
  height?: number;
  interactive?: boolean;
  initialDomain?: string;
  initialName?: string;
}) {
  const [domain, setDomain] = useState(initialDomain);
  const [name, setName] = useState(initialName);
  const lines = buildLines(domain, name);

  // typewriter
  const [typed, setTyped] = useState(0); // index of fully visible lines
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    setTyped(0);
    const interval = setInterval(() => {
      setTyped((t) => {
        if (t >= lines.length) {
          clearInterval(interval);
          return t;
        }
        return t + 1;
      });
    }, 110);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const visibleLines = lines.slice(0, typed);

  return (
    <div
      ref={ref}
      className="rounded-[12px] overflow-hidden"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
        boxShadow: "0 1px 0 rgba(247,233,154,0.04), 0 24px 60px -32px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-[10px]"
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
            <span style={{ color: "var(--ink-yellow)" }}>●</span>{" "}
            {(name || "DESIGN").toUpperCase()}.md{" "}
            <span style={{ color: "var(--ink-dim)" }}>· UTF-8 · LF · YAML</span>
          </span>
        </div>
        {interactive ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={domain}
              onChange={(e) => {
                const v = e.target.value;
                setDomain(v);
                const guess = v.replace(/^https?:\/\//, "").split(".")[0] || "deine-marke";
                setName(guess);
              }}
              spellCheck={false}
              className="px-3 py-1 rounded-[6px] outline-none"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--ink-yellow)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                border: "1px solid var(--line-subtle)",
                width: 180,
              }}
            />
            <span
              style={{
                color: "var(--ink-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.05em",
              }}
            >
              ↳ live
            </span>
          </div>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-dim)",
            }}
          >
            autosaved · synced to Claude · ChatGPT · Cursor
          </span>
        )}
      </div>

      {/* Code body */}
      <div
        className="overflow-hidden"
        style={{
          height,
          padding: "16px 0",
          background:
            "linear-gradient(180deg, var(--bg-raised) 0%, #1F0606 100%)",
        }}
      >
        {visibleLines.map((l, i) => (
          <CodeRow key={i} line={l} index={i + 1} />
        ))}
        {typed < lines.length && (
          <div className="code-line">
            <span className="ln">{typed + 1}</span>
            <span>
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 14,
                  background: "var(--ink-yellow)",
                  verticalAlign: "middle",
                  animation: "caret-blink 1s steps(2, start) infinite",
                }}
              />
            </span>
          </div>
        )}
        <style>{`
          @keyframes caret-blink { to { opacity: 0; } }
        `}</style>
      </div>

      {/* Footer status */}
      <div
        className="px-4 py-[8px] flex items-center justify-between"
        style={{ borderTop: "1px solid var(--line-subtle)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-dim)",
          }}
        >
          ⎇  branch: <span style={{ color: "var(--ink-yellow)" }}>v2-linear-redesign</span>
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-dim)",
          }}
        >
          {typed} / {lines.length} lines · 5+ agents reading
        </span>
      </div>
    </div>
  );
}

function CodeRow({ line, index }: { line: Line; index: number }) {
  if (line.type === "blank") {
    return (
      <div className="code-line">
        <span className="ln">{index}</span>
        <span>&nbsp;</span>
      </div>
    );
  }
  if (line.type === "raw") {
    return (
      <div className="code-line">
        <span className="ln">{index}</span>
        <span className="punc">{line.text}</span>
      </div>
    );
  }
  if (line.type === "comment") {
    return (
      <div className="code-line">
        <span className="ln">{index}</span>
        <span className="comment">{line.text}</span>
      </div>
    );
  }
  if (line.type === "section") {
    return (
      <div className="code-line">
        <span className="ln">{index}</span>
        <span>
          <span className="key">{line.key}</span>
          <span className="punc">:</span>
        </span>
      </div>
    );
  }
  return (
    <div className="code-line">
      <span className="ln">{index}</span>
      <span>
        <span className="key">{line.key}</span>
        <span className="punc">: </span>
        <span className="val-str">&quot;{line.value}&quot;</span>
      </span>
    </div>
  );
}
