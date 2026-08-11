"use client";

import { useEffect, useRef } from "react";

/**
 * ShaderBG — träge fließender WebGL-Farbnebel als Bühnenlicht.
 * Palette: tiefes Bordeaux → Glut → seltene Gold-Lichter (Markenfarben).
 * Performance: DPR auf 1 gedeckelt, pausiert außerhalb des Viewports und
 * bei prefers-reduced-motion (dann statisches erstes Frame).
 */

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_t;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0);
  float t = u_t * 0.03;

  /* zwei gegenläufige Nebelfelder */
  float n1 = fbm(p * 1.6 + vec2(t, -t * 0.6));
  float n2 = fbm(p * 2.4 - vec2(t * 0.7, t * 0.4) + n1);
  float glow = fbm(p * 1.1 + vec2(-t * 0.4, t * 0.25) + n2);

  vec3 base = vec3(0.070, 0.008, 0.008);   /* #120202 */
  vec3 ember = vec3(0.290, 0.055, 0.040);  /* Glut-Bordeaux */
  vec3 gold = vec3(0.969, 0.914, 0.604);   /* #F7E99A */

  vec3 col = base;
  col = mix(col, ember, smoothstep(0.45, 0.95, n2) * 0.9);
  /* Gold nur als seltene Lichtkante oben */
  float top = smoothstep(0.75, 0.05, uv.y);
  col = mix(col, gold, smoothstep(0.82, 0.98, glow) * 0.10 * top);

  /* Vignette hält die Ränder tief dunkel */
  float vig = smoothstep(1.25, 0.35, length(uv - vec2(0.5, 0.42)));
  col *= mix(0.55, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

export function ShaderBG({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; /* fail-open: CSS-Fallback-Gradient bleibt sichtbar */

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    let raf = 0;
    let running = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const frame = () => {
      resize();
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running && !reduced) raf = requestAnimationFrame(frame);
    };

    const obs = new IntersectionObserver(([e]) => {
      const shouldRun = e.isIntersecting;
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    obs.observe(canvas);

    /* reduced-motion: genau ein Frame rendern, dann stehen lassen */
    if (reduced) {
      resize();
      gl.uniform1f(uT, 12.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    window.addEventListener("resize", resize);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={`shader-bg ${className}`} aria-hidden />;
}
