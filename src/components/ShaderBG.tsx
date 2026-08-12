"use client";

import { useEffect, useRef } from "react";

/**
 * ShaderBG — "Quantum Cubes" (KIFS-Raymarcher, Original von Noztol) als
 * Bühnenlicht hinter dem Hero. Angepasst:
 * - Palette auf die Marke gezogen: Neutral-Grau → gedämpftes Gold → Gold statt Regenbogen
 * - deutlich langsamer (Flug- und Twist-Tempo ~0,3× des Originals)
 * - Helligkeit gedeckelt + Vignette, damit weiße Headlines lesbar bleiben
 *
 * Performance: der Raymarcher ist teuer, deshalb rendert er auf reduzierter
 * Auflösung (RENDER_SCALE) und wird per CSS hochskaliert — bei dieser
 * Nebel-Optik sieht man den Unterschied nicht. Läuft nur im Viewport,
 * bei prefers-reduced-motion nur ein einziges Standbild.
 */

const RENDER_SCALE = 0.62; // Anteil der CSS-Pixel, auf denen wirklich gerechnet wird
const STEPS_DESKTOP = 60;
const STEPS_SMALL = 36;

const frag = (steps: number) => `
precision highp float;
uniform vec2 u_res;
uniform float u_t;

/* Marken-Palette (Cosinus-Palette): Graphit → gedämpftes Gold → Gold.
   Ersetzt die Regenbogen-Palette H(h) des Originals. */
vec3 H(float h) {
  return vec3(0.52, 0.20, 0.13)
       + vec3(0.48, 0.36, 0.17)
       * cos(6.28318 * (vec3(1.00, 0.92, 0.80) * h + vec3(0.02, 0.11, 0.24)));
}

mat2 rot(float a) { return mat2(cos(a), sin(a), -sin(a), cos(a)); }

void main() {
  vec2 C = gl_FragCoord.xy;
  vec2 uv = (C - 0.5 * u_res.xy) / u_res.y;

  /* Zeitbasis: ~0,3× des Originals — ruhiger Flug statt Achterbahn */
  float T = u_t * 0.30;

  float time = T * 0.5;
  vec3 ro = vec3(sin(time * 0.5) * 2.0, cos(time * 0.3) * 1.5, time * 3.0);
  vec3 ta = ro + vec3(sin(time * 0.4) * 0.5, cos(time * 0.3) * 0.5, 1.0);

  vec3 cw = normalize(ta - ro);
  vec3 cu = normalize(cross(cw, vec3(0, 1, 0)));
  vec3 cv = normalize(cross(cu, cw));
  vec3 rd = normalize(uv.x * cu + uv.y * cv + 1.2 * cw);

  float t2 = T * 0.15 + ((0.25 + 0.05 * sin(T * 0.1)) / (length(uv) + 0.51)) * 2.0;
  rd.xy *= rot(t2);

  float g = 0.0;
  vec3 col = vec3(0.0);

  for (int i = 0; i < ${steps}; i++) {
    vec3 p = ro + g * rd;
    p += sin(p.zxy * 5.0) * 0.05;

    vec3 n1 = p;
    n1.xy *= rot(-t2 * 0.5);
    float a = 7.0;
    n1 = mod(n1 - a, a * 2.0) - a;

    float s = 1.0;
    float e = 1.0;

    for (int j = 0; j < 8; j++) {
      n1 = 0.4 - abs(n1);
      if (n1.x < n1.z) n1.xz = n1.zx;
      if (n1.z < n1.y) n1.zy = n1.yz;
      if (n1.y < n1.x) n1.xy = n1.yx;

      n1.xz *= rot(0.15);
      s *= e = 1.4 + sin(T * 0.1) * 0.05;

      n1 = abs(n1) * e - vec3(
        1.2 + cos(T * 0.2) * 0.3,
        2.5,
        1.2 + sin(T * 0.3) * 0.3
      );
    }

    float boxDist = max(abs(n1.x), max(abs(n1.y), abs(n1.z)));
    float sphDist = length(n1);
    float dist = mix(sphDist, boxDist, 0.4) / s;

    g += dist * 0.5;
    col += mix(vec3(1.0), H(g * 0.3), 0.86) * 0.015 / (0.01 + dist * dist * 35.0);
  }

  col *= exp(-g * 0.02);

  /* Die Struktur steckt in der Helligkeit — sie bekommt die Markenrampe.
     So bleiben die Kristallkanten scharf, statt in Nebel zu ertrinken. */
  float l = dot(max(col, 0.0), vec3(0.30, 0.59, 0.11));
  l = l / (l + 0.58);
  l = pow(clamp(l, 0.0, 1.0), 1.45);

  vec3 c0 = vec3(0.035, 0.035, 0.037); /* fast schwarzes Neutral-Grau */
  vec3 c1 = vec3(0.155, 0.150, 0.145); /* Graphit, minimal warm */
  vec3 c2 = vec3(0.55, 0.48, 0.28);    /* gedämpftes Gold */
  vec3 c3 = vec3(0.97, 0.91, 0.60);    /* Gold (#F7E99A) */

  vec3 outc = mix(c0, c1, smoothstep(0.00, 0.30, l));
  outc = mix(outc, c2, smoothstep(0.30, 0.66, l));
  outc = mix(outc, c3, smoothstep(0.66, 0.94, l));

  /* Vignette: Ränder tief, damit die Bühne gerahmt wirkt */
  vec2 q = (C - 0.5 * u_res.xy) / u_res.xy;
  float vig = smoothstep(1.05, 0.22, length(q * vec2(1.05, 1.30)));
  outc *= mix(0.28, 1.0, vig);

  /* Ruhige Zone unter Riesenwort und Satz — Lesbarkeit geht vor Effekt */
  vec2 tc = (C - vec2(0.5, 0.60) * u_res.xy) / u_res.xy;
  float calm = smoothstep(0.62, 0.02, length(tc * vec2(0.85, 1.45)));
  outc *= mix(1.0, 0.40, calm);

  outc *= 0.88;
  outc = max(outc, c0 * 0.85);

  gl_FragColor = vec4(outc, 1.0);
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

    const steps = window.innerWidth < 768 ? STEPS_SMALL : STEPS_DESKTOP;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[ShaderBG]", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, frag(steps));
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
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

    /* Adaptive Auflösung: Ein KIFS-Raymarcher kann schwache GPUs in die Knie
       zwingen. Bleibt die Bildrate unter 30 fps, wird die Renderfläche
       stufenweise verkleinert, statt die Seite ruckeln zu lassen. */
    let scale = RENDER_SCALE;
    const MIN_SCALE = 0.28;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
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

    let frames = 0;
    let windowStart = performance.now();

    const frame = () => {
      resize();
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      frames++;
      const now = performance.now();
      if (now - windowStart >= 1000) {
        const fps = (frames * 1000) / (now - windowStart);
        if (fps < 30 && scale > MIN_SCALE) {
          scale = Math.max(MIN_SCALE, scale * 0.75);
        }
        frames = 0;
        windowStart = now;
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      /* Standbild: ein Frame mit hübschem Zeitpunkt, dann Ruhe */
      scale = RENDER_SCALE;
      resize();
      gl.uniform1f(uT, 34.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!e.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      obs.observe(canvas);
      window.addEventListener("resize", resize);
      return () => {
        obs.disconnect();
        running = false;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
      };
    }

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={ref} className={`shader-bg ${className}`} aria-hidden />;
}
