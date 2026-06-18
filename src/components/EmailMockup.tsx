export function EmailMockup() {
  return (
    <div
      className="rounded-[12px] overflow-hidden max-w-[640px] w-full"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--line-subtle)",
        boxShadow: "0 24px 60px -32px rgba(0,0,0,0.6)",
      }}
    >
      {/* mail header */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--line-subtle)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "var(--bg-elevated)", color: "var(--ink-yellow)", fontWeight: 510, fontSize: 13 }}
          >
            TW
          </div>
          <div>
            <p style={{ color: "var(--ink-cream)", fontSize: 14, fontWeight: 510 }}>
              Thomas Weber
            </p>
            <p style={{ color: "var(--ink-dim)", fontSize: 12, fontFamily: "var(--font-mono)" }}>
              t.weber@hauserlin.de
            </p>
          </div>
        </div>
        <span
          style={{ color: "var(--ink-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}
        >
          Di, 09:14 · Inbox
        </span>
      </div>

      {/* subject */}
      <div className="px-5 pt-4 pb-2">
        <p style={{ color: "var(--ink-dim)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Betreff
        </p>
        <p
          className="font-display"
          style={{
            fontSize: 22,
            letterSpacing: "-0.02em",
            color: "var(--ink-yellow)",
            marginTop: 4,
          }}
        >
          Anfrage · neue Website
        </p>
      </div>

      {/* body */}
      <div className="px-5 pb-5 pt-2 space-y-3">
        <p style={{ color: "var(--ink-cream)", fontSize: 15, lineHeight: "24px" }}>
          Hi Alex,
        </p>
        <p style={{ color: "var(--ink-cream)", fontSize: 15, lineHeight: "24px" }}>
          unsere Seite sieht aus wie von{" "}
          <span
            style={{
              color: "var(--ink-yellow)",
              borderBottom: "1px dashed var(--ink-yellow)",
              fontWeight: 510,
            }}
          >
            2014
          </span>{" "}
          und wir verlieren ständig Anfragen. Können Sie uns eine moderne neue Marke und
          Website bauen? Wir brauchen das schnell — am liebsten in den nächsten Wochen.
        </p>
        <p style={{ color: "var(--ink-cream)", fontSize: 15, lineHeight: "24px" }}>
          Wir wären für Q3 startklar.
        </p>
        <p style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: "22px", paddingTop: 8 }}>
          Beste Grüße<br />
          Thomas Weber<br />
          <span style={{ color: "var(--ink-dim)" }}>Geschäftsführer · Hauserlin</span>
        </p>
      </div>

      {/* footer */}
      <div
        className="px-5 py-2 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--line-subtle)" }}
      >
        <span className="chip">
          <span className="dot" />
          neue Anfrage · heute
        </span>
        <span style={{ color: "var(--ink-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
          ↩ Antwort in 6 Stunden
        </span>
      </div>
    </div>
  );
}
