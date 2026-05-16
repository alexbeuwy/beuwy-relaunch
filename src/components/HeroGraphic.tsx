"use client";

/**
 * Dark-luxe "sneaky" hero graphic:
 *   - 11x6 dot grid drifts very slowly (no JS, pure CSS).
 *   - Three connecting lines draw themselves over the dots on mount.
 *   - One node pulses (the "answer node" that an agent would cite).
 *
 * Pure SVG + CSS animation. Pointer-events none. Respects prefers-reduced-motion.
 */
export function HeroGraphic() {
  const cols = 11;
  const rows = 6;
  const w = 720;
  const h = 360;
  const cx = (i: number) => 40 + (i * (w - 80)) / (cols - 1);
  const cy = (j: number) => 40 + (j * (h - 80)) / (rows - 1);

  const dots: { x: number; y: number; key: string }[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      dots.push({ x: cx(i), y: cy(j), key: `${i}-${j}` });
    }
  }

  // Three highlighted nodes (constellation): top-left, center, bottom-right.
  const node1 = { x: cx(2), y: cy(1) };
  const node2 = { x: cx(5), y: cy(3) };
  const node3 = { x: cx(8), y: cy(4) };

  return (
    <svg
      className="hero-graphic"
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="hg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(247,233,154,0.45)" />
          <stop offset="100%" stopColor="rgba(247,233,154,0)" />
        </radialGradient>
      </defs>

      {/* Dot field */}
      <g className="hero-graphic-dots">
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={1.5} />
        ))}
      </g>

      {/* Two connecting lines that draw themselves */}
      <line
        className="hero-graphic-line hero-graphic-line-1"
        x1={node1.x}
        y1={node1.y}
        x2={node2.x}
        y2={node2.y}
      />
      <line
        className="hero-graphic-line hero-graphic-line-2"
        x1={node2.x}
        y1={node2.y}
        x2={node3.x}
        y2={node3.y}
      />

      {/* The three highlighted nodes */}
      <circle className="hero-graphic-node" cx={node1.x} cy={node1.y} r={3.5} />
      <circle className="hero-graphic-node hero-graphic-node-pulse" cx={node2.x} cy={node2.y} r={4.5} />
      <circle className="hero-graphic-node" cx={node3.x} cy={node3.y} r={3.5} />

      {/* Pulse halo around the center node */}
      <circle
        className="hero-graphic-halo"
        cx={node2.x}
        cy={node2.y}
        r={18}
        fill="url(#hg-glow)"
      />
    </svg>
  );
}
