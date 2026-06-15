"use client";

/**
 * AuditPreview — a static, branded mock of what a 15-second audit looks like.
 * Lives in the homepage Magnet section to spark curiosity ("boah, sowas
 * bekomme ich?"). Animated count-up score + scanning shimmer + dimension bars.
 * Not a live call — purely a teaser. Real audit runs on /audit.
 */
export function AuditPreview() {
  const dims = [
    { label: "Positionierung", score: 4 },
    { label: "Agent-Layer", score: 2 },
    { label: "Trust", score: 7 },
    { label: "Conversion", score: 5 },
  ];
  return (
    <div className="audit-preview glass" aria-hidden>
      <div className="audit-preview-chrome">
        <span className="audit-dot" style={{ background: "#3a1212" }} />
        <span className="audit-dot" style={{ background: "#3a1212" }} />
        <span className="audit-dot" style={{ background: "#3a1212" }} />
        <span className="audit-preview-url">beuwy · agent-audit</span>
        <span className="audit-preview-live">
          <span className="audit-preview-live-dot" /> live
        </span>
      </div>
      <div className="audit-preview-body">
        <div className="audit-preview-top">
          <div>
            <span className="audit-preview-mono">AGENT-VISIBILITY-SCORE</span>
            <p className="audit-preview-score">
              47<span className="audit-preview-score-suffix">/100</span>
            </p>
          </div>
          <div className="audit-preview-verdict">
            <span className="audit-preview-mono">SO LESEN DICH DIE AGENTEN</span>
            <p className="audit-preview-quote">
              &bdquo;Generisches Tool in überfüllter Kategorie — die Hero sagt
              »AI-powered platform«, austauschbar mit 50 Wettbewerbern.&ldquo;
            </p>
          </div>
        </div>
        <div className="audit-preview-bars">
          {dims.map((d, i) => (
            <div key={d.label} className="audit-preview-bar-row">
              <span className="audit-preview-bar-label">{d.label}</span>
              <span className="audit-preview-bar-track">
                <span
                  className="audit-preview-bar-fill"
                  data-tier={d.score >= 7 ? "good" : d.score >= 5 ? "ok" : "bad"}
                  style={{ width: `${d.score * 10}%`, animationDelay: `${i * 120}ms` }}
                />
              </span>
              <span className="audit-preview-bar-score">{d.score}/10</span>
            </div>
          ))}
        </div>
        <div className="audit-preview-scanline" />
      </div>
    </div>
  );
}
