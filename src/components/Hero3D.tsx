"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero3D — "Das System" (Platzhalter-Visual für den Hero-Media-Slot)
 *
 * Erzählung in einem Bild: Links treibt eine breite, ungeordnete Wolke aus
 * grauen Punkten (Leads, unsortiert, ohne Kontur). Sie wird zu einer einzigen
 * Engstelle gezogen — dem einen goldenen Lichtmoment der Szene — und tritt
 * rechts als geordnete, golden glühende Punkte auf sauberen Bahnen wieder aus
 * (qualifizierte Abschlüsse). Chaos → Filter → System.
 *
 * Bildsprache: monochromes Neutral-Grau (#0A0A0A–#161616) als Grund,
 * Pastellgold #F7E99A als einziges Licht, Creme #FFFDF3 als Weißglut an der
 * Engstelle. Kein weiterer Farbton. Bewegung: langsam und schwer, ein
 * kompletter Durchlauf dauert ~17 s. Pointer-Parallax bleibt unter 3°.
 *
 * Technik: reines three (keine examples/-Module, keine Texturen, kein HDR).
 * Alles ist prozedural in vier Shadern gerechnet und kostet vier Draw-Calls:
 * Hintergrundverlauf → Boden/Bahnen/Partikel/Blende → Vignette mit Korn.
 * Die Partikelbahnen werden komplett im Vertex-Shader ausgewertet, die CPU
 * schiebt pro Frame nur eine Zeit-Uniform und die Kamera.
 */

/* ------------------------------------------------------------------ *
 * Bühne (Weltkoordinaten). Der Fluss läuft entlang +X.
 * ------------------------------------------------------------------ */
const X_IN = -8.6; // Einlauf, bewusst außerhalb des Bildrands
const X_GATE = -2.2; // Engstelle — liegt auf der linken Drittel-Linie
const X_OUT = 9.4; // Auslauf, läuft ebenfalls aus dem Bild heraus

const CLOUD_R = 3.5; // Radius der Chaos-Wolke am Einlauf
// Die Kamera steht seitlich, dadurch projiziert die Z-Achse fast waagerecht.
// Tiefe wird deshalb stärker gestaucht als Höhe — sonst schiebt sich die halbe
// Wolke aus dem linken Bildrand.
const CLOUD_Y = 0.8;
const CLOUD_Z = 0.62;

const LANE_ROWS = 4;
const LANE_COLS = 3;
const LANE_COUNT = LANE_ROWS * LANE_COLS;
const LANE_DY = 0.92;
const LANE_DZ = 1.26;

const FLOOR_Y = -2.45;
const FLOOR_W = 30;
const FLOOR_D = 18;
const FLOOR_CX = 1.0;

/* Kamera steht rechts vom Fluss: das Chaos läuft in die Tiefe weg,
   das geordnete Ergebnis kommt dem Betrachter entgegen. */
const CAM_X = 2.55;
const CAM_Y = 2.3;
const CAM_Z = 13.0;
const TARGET_X = -0.55;
const TARGET_Y = -0.35;
const CAM_DIST = 13.4; // ungefähre Distanz Kamera → Zielpunkt, für die FOV-Rechnung
const FRAME_HALF_WIDTH = 7.2; // Weltbreite/2, die immer im Bild bleiben soll

const COUNT_FULL = 2600;
const COUNT_SMALL = 1500;
const DEGRADE_KEEP = 0.42; // Anteil der Partikel nach dem FPS-Notaus
const DEAL_RATIO = 0.07; // Anteil "Abschlüsse": größer und heller
const RAIL_SEGMENTS = 26;
const RAIL_HALF_WIDTH = 0.19;

const CYCLE_BASE = 0.058; // Fortschritt pro Sekunde → ~17 s pro Durchlauf
const CYCLE_JITTER = 0.017;

/* ------------------------------------------------------------------ *
 * Palette — Neutral-Grau als Grund, Gold als einziger Akzent.
 * ------------------------------------------------------------------ */
const C_BG_LOW = 0x0a0a0a; // unterer Bildrand
const C_BG_HIGH = 0x161616; // oberer Bildrand
const C_HAZE_WIDE = 0x1b1b19; // weiter, neutraler Lichtteppich um die Engstelle
const C_HAZE_CORE = 0x37342a; // enger Kern, minimal ins Gold gezogen
const C_HAZE_CLOUD = 0x141414; // leises Aufhellen hinter der Chaos-Wolke
const C_CLOUD = 0x3a3a38; // unsortierte Leads: stumpfes Grau
const C_MID = 0x7e7a6e; // Übergang Grau → Gold (gedämpft, kein Orange)
const C_HOT = 0xfffdf3; // Weißglut exakt an der Engstelle
const C_GOLD = 0xf7e99a; // Markengold, der geordnete Auslauf
const C_VIGNETTE = 0x070707;

const TAU = 6.283185307;

const f = (n: number) => n.toFixed(4);

/** sRGB-Hex → THREE.Color ohne Farbraum-Konvertierung.
 *  Zusammen mit outputColorSpace = Linear laufen die Werte 1:1 durch,
 *  d. h. #F7E99A im Code ist #F7E99A auf dem Schirm. */
const rgb = (hex: number) =>
  new THREE.Color().setRGB(
    ((hex >> 16) & 255) / 255,
    ((hex >> 8) & 255) / 255,
    (hex & 255) / 255,
    THREE.LinearSRGBColorSpace,
  );

/* ------------------------------------------------------------------ *
 * GLSL-Bausteine
 * ------------------------------------------------------------------ */

/** Zielposition einer Bahn im Querschnitt (Y/Z) — geteilt von Partikeln
 *  und Bahn-Geometrie, damit die Punkte exakt auf den Linien sitzen. */
const GLSL_LANES = `
/* pow(0.0, e) und pow(x<0, e) sind in GLSL undefiniert. Da die Ergebnisse
   anschließend durch mix(..., isOut) laufen, würde ein einzelnes NaN die
   ganze Position vergiften (NaN * 0.0 bleibt NaN). Deshalb konsequent ppow. */
float ppow(float x, float e) {
  return pow(max(x, 1e-5), e);
}

vec2 laneOffset(float i) {
  float row = mod(i, ${f(LANE_ROWS)});
  float col = floor(i / ${f(LANE_ROWS)});
  return vec2(
    (row - ${f((LANE_ROWS - 1) / 2)}) * ${f(LANE_DY)},
    (col - ${f((LANE_COLS - 1) / 2)}) * ${f(LANE_DZ)}
  );
}

/* Auffächern hinter der Engstelle: bei 0 laufen alle Bahnen durch einen
   Punkt, danach öffnen sie sich zügig und beruhigen sich. */
float laneSpread(float p) {
  return ppow(smoothstep(0.0, 0.40, p), 0.72);
}

/* Weglänge entlang X. Vor der Engstelle träge und beschleunigend,
   danach schnell und wieder auslaufend. */
float flowX(float pin, float pout, float isOut) {
  float a = mix(${f(X_IN)}, ${f(X_GATE)}, ppow(pin, 1.20));
  float b = mix(${f(X_GATE)}, ${f(X_OUT)}, ppow(pout, 0.78));
  return mix(a, b, isOut);
}
`;

const PARTICLE_VERT = `
attribute vec4 aSeed;   // x: Phase, y: Tempo, z: Radius, w: Winkel
attribute float aLane;
attribute float aDeal;

uniform float uTime;
uniform float uReveal;
uniform float uPixelScale;
uniform float uSizeWorld;
uniform vec3 cCloud;
uniform vec3 cMid;
uniform vec3 cHot;
uniform vec3 cGold;

varying vec3 vCol;
varying float vAlpha;

${GLSL_LANES}

void main() {
  float u = fract(aSeed.x + uTime * (${f(CYCLE_BASE)} + aSeed.y * ${f(CYCLE_JITTER)}));
  float isOut = step(0.5, u);
  float pin = clamp(u * 2.0, 0.0, 1.0);
  float pout = clamp(u * 2.0 - 1.0, 0.0, 1.0);

  float x = flowX(pin, pout, isOut);

  /* --- Einlauf: breite, träge Wolke, die zur Engstelle gesogen wird.
         Der Radius bleibt lange weit und kollabiert erst spät — das gibt
         den eleganten Trichter statt eines simplen Kegels. --- */
  float rIn = ${f(CLOUD_R)} * (1.0 - ppow(pin, 2.6)) * sqrt(aSeed.z);
  float ang = aSeed.w * ${f(TAU)} + pin * 1.15 + uTime * 0.045;
  vec3 pIn = vec3(x, cos(ang) * rIn * ${f(CLOUD_Y)}, sin(ang) * rIn * ${f(CLOUD_Z)});

  float turb = (1.0 - ppow(pin, 1.15)) * 0.9;
  pIn.y += sin(uTime * 0.21 + aSeed.x * 37.0 + x * 0.30) * turb * 0.52;
  pIn.z += cos(uTime * 0.17 + aSeed.w * 29.0 + x * 0.26) * turb * 0.58;
  pIn.x += sin(uTime * 0.13 + aSeed.z * 23.0) * turb * 0.40;

  /* --- Auslauf: geordnete Bahnen, minimal atmend --- */
  vec2 lane = laneOffset(aLane);
  float spread = laneSpread(pout) * (1.0 + 0.03 * sin(uTime * 0.19));
  vec3 pOut = vec3(x, lane.x * spread, lane.y * spread);
  pOut.y += sin(uTime * 0.5 + aLane * 2.1) * 0.02 * spread;

  vec3 pos = mix(pIn, pOut, isOut);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float dist = max(-mv.z, 0.6);
  gl_Position = projectionMatrix * mv;

  /* Farbe: Grau → gedämpftes Gold → Weißglut an der Engstelle → Markengold */
  vec3 colIn = mix(cCloud, cMid, smoothstep(0.10, 0.72, pin));
  colIn = mix(colIn, cHot, smoothstep(0.70, 1.00, pin));
  vec3 colOut = mix(cHot, cGold, smoothstep(0.0, 0.20, pout));
  colOut = mix(colOut, cHot, aDeal * 0.45);
  vec3 col = mix(colIn, colOut, isOut);

  float iIn = mix(0.18, 1.0, ppow(pin, 2.3));
  float iOut = mix(1.0, 0.60, smoothstep(0.0, 0.30, pout)) + aDeal * 0.45;
  float intensity = mix(iIn, iOut, isOut);

  /* Punktgröße in Gerätepixeln, mit Perspektiv-Abfall wie bei
     PointsMaterial (uPixelScale = halbe Höhe des Drawing-Buffers). */
  float szIn = mix(0.95, 1.15, pin);
  float szOut = mix(1.30, 1.00, pout);
  float sz = mix(szIn, szOut, isOut)
           * (0.75 + aSeed.y * 0.5)
           * (1.0 + aDeal * 1.35);
  gl_PointSize = clamp(uPixelScale * uSizeWorld * sz / dist, 1.0, 46.0);

  /* Ein- und Ausblenden an den Enden — nichts darf poppen. Der Ausgang ist
     bewusst früh gesetzt: die Punkte lösen sich noch im Bild auf, statt am
     harten Rahmenrand abgeschnitten zu werden.
     Dazu Tiefendämpfung: was hinten liegt, sinkt in den Dunst. */
  float ends = smoothstep(0.0, 0.10, u) * (1.0 - smoothstep(0.72, 0.92, u));
  float atmo = mix(0.42, 1.0, smoothstep(22.0, 12.0, dist));

  vCol = col * intensity * atmo;
  vAlpha = ends * uReveal;
}
`;

const PARTICLE_FRAG = `
precision highp float;
varying vec3 vCol;
varying float vAlpha;

void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d);
  if (r2 > 0.25) discard;
  float k = r2 * 4.0;
  /* Zwei Abfälle übereinander: harter Kern + weiter Hof.
     Das ist der billigste ehrliche Bloom, den es gibt. */
  float core = exp(-k * 6.5);
  float halo = exp(-k * 1.35) * 0.28;
  gl_FragColor = vec4(vCol, (core + halo) * vAlpha);
}
`;

const RAIL_VERT = `
attribute float aU;
attribute float aV;
attribute float aLane;

uniform float uTime;
uniform float uHalfWidth;

varying float vU;
varying float vV;
varying float vLane;
varying float vDist;

${GLSL_LANES}

void main() {
  float x = flowX(0.0, aU, 1.0);
  vec2 lane = laneOffset(aLane);
  // identisches Atmen wie im Partikel-Shader, sonst laufen die Punkte
  // langsam neben ihren Bahnen her
  float spread = laneSpread(aU) * (1.0 + 0.03 * sin(uTime * 0.19));
  vec3 p = vec3(x, lane.x * spread, lane.y * spread);
  p.y += aV * uHalfWidth;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDist = max(-mv.z, 0.6);
  gl_Position = projectionMatrix * mv;

  vU = aU;
  vV = aV;
  vLane = aLane;
}
`;

const RAIL_FRAG = `
precision highp float;
uniform float uTime;
uniform float uReveal;
uniform vec3 cGold;

varying float vU;
varying float vV;
varying float vLane;
varying float vDist;

void main() {
  /* Gauß quer zur Bahn — dadurch ist die Linie weich und kantenfrei,
     ohne dass wir sie in Hairline-Pixeln zeichnen müssten. */
  float g = exp(-vV * vV * 20.0);
  float ends = smoothstep(0.0, 0.10, vU) * (1.0 - smoothstep(0.32, 0.70, vU));
  float shimmer = 0.82 + 0.18 * sin(vU * 11.0 - uTime * 0.75 + vLane * 1.7);
  float atmo = mix(0.42, 1.0, smoothstep(22.0, 12.0, vDist));
  gl_FragColor = vec4(cGold, g * ends * shimmer * atmo * uReveal * 0.30);
}
`;

/** Die Engstelle selbst: eine zur Kamera gedrehte Blende aus Kern,
 *  anamorphotischem Streifen und weitem Hof. Kein Post-Processing nötig. */
const GATE_VERT = `
uniform vec2 uScale;
varying vec2 vP;

void main() {
  vP = position.xy * 2.0;
  vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  mv.xy += position.xy * uScale;
  gl_Position = projectionMatrix * mv;
}
`;

const GATE_FRAG = `
precision highp float;
uniform float uTime;
uniform float uReveal;
uniform vec3 cHot;
uniform vec3 cGold;
varying vec2 vP;

void main() {
  vec2 e = vP * vec2(2.1, 4.0);
  float core = exp(-dot(e, e) * 1.0);
  float streak = exp(-abs(vP.x) * 2.1) * exp(-vP.y * vP.y * 80.0);
  float glow = exp(-length(vP * vec2(1.0, 1.7)) * 2.4);

  float breath = 0.86 + 0.14 * sin(uTime * 0.42);
  float a = (core * 0.90 + streak * 0.50 + glow * 0.32) * breath * uReveal;

  vec3 col = mix(cGold, cHot, clamp(core + streak * 0.6, 0.0, 1.0));
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

/** Bodenreflex: ein weiches, gestrecktes Licht unter Blende und Bahnen. */
const FLOOR_VERT = `
varying vec2 vP;
void main() {
  vP = uv * 2.0 - 1.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FLOOR_FRAG = `
precision highp float;
uniform float uTime;
uniform float uReveal;
uniform vec3 cGold;
uniform vec3 cMid;
varying vec2 vP;

void main() {
  float gx = ${f((X_GATE - FLOOR_CX) / (FLOOR_W / 2))};
  float dz = exp(-vP.y * vP.y * 5.0);
  // bewusst q*q statt pow(q, 2.0): q wird negativ, und pow() ist für
  // negative Basen in GLSL undefiniert
  float q = (vP.x - gx) * 6.0;
  float gate = exp(-q * q) * dz;
  float trail = smoothstep(-0.02, 0.30, vP.x - gx)
              * (1.0 - smoothstep(0.45, 1.0, vP.x)) * dz * 0.55;
  float ripple = 0.88 + 0.12 * sin(vP.x * 5.0 - uTime * 0.35);
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(vP.y));

  float a = (gate * 0.9 + trail) * ripple * edge * uReveal * 0.20;
  vec3 col = mix(cMid, cGold, smoothstep(0.0, 0.5, vP.x - gx));
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

/* Bildschirmfüllendes Dreieck für Hintergrund und Vignette. */
const SCREEN_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const BG_FRAG = `
precision highp float;
uniform vec2 uGate;
uniform float uAspect;
uniform vec3 cLow;
uniform vec3 cHigh;
uniform vec3 cHazeWide;
uniform vec3 cHazeCore;
uniform vec3 cHazeCloud;
varying vec2 vUv;

void main() {
  vec3 col = mix(cLow, cHigh, smoothstep(0.0, 1.0, vUv.y));

  /* Der Raum atmet um die Engstelle — der Punkt wandert mit der Parallaxe. */
  vec2 d = (vUv - uGate) * vec2(uAspect, 1.0);
  float r2 = dot(d, d);
  col += cHazeWide * exp(-r2 * 1.9) * 0.85;
  col += cHazeCore * exp(-r2 * 11.0) * 0.42;

  /* Kaum sichtbares Aufhellen hinter der Chaos-Wolke, damit die linke
     Bildhälfte Tiefe bekommt statt in Schwarz abzusaufen. */
  vec2 c = (vUv - vec2(0.17, 0.60)) * vec2(uAspect, 1.0);
  col += cHazeCloud * exp(-dot(c, c) * 2.6) * 0.8;

  gl_FragColor = vec4(col, 1.0);
}
`;

const FX_FRAG = `
precision highp float;
uniform float uTime;
uniform float uAspect;
uniform float uGrain;
uniform vec2 uRes;
uniform vec3 cVignette;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  float v = smoothstep(0.45, 1.05, length(p * vec2(0.78, 1.30)));
  float a = v * 0.86;

  /* Unterkante etwas tiefer — setzt die Szene auf den Boden. */
  a += smoothstep(0.28, 0.0, vUv.y) * 0.16;

  /* Filmkorn in 2-Pixel-Blöcken: nimmt dem Verlauf das Banding. */
  float n = hash(floor(vUv * uRes * 0.5) + fract(uTime * 0.37) * 511.0);
  a += (n - 0.5) * uGrain;

  gl_FragColor = vec4(cVignette, clamp(a, 0.0, 1.0));
}
`;

/* ------------------------------------------------------------------ *
 * Komponente
 * ------------------------------------------------------------------ */

type Disposable = { dispose: () => void };

export default function Hero3D({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false, // additive Punkte brauchen kein MSAA, das Korn glättet
        alpha: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
    } catch {
      return; // kein WebGL: der CSS-Verlauf des Hosts bleibt stehen
    }

    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.autoClear = false;
    renderer.setClearColor(rgb(C_BG_LOW), 1);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);

    const trash: Disposable[] = [];
    const keep = <T extends Disposable>(d: T): T => {
      trash.push(d);
      return d;
    };

    /* ---------- geteilte Uniforms ---------- */
    const uTime = { value: 0 };
    const uReveal = { value: 0 };
    const uPixelScale = { value: 300 };
    const uGrain = { value: 0.03 };

    const cCloud = { value: rgb(C_CLOUD) };
    const cMid = { value: rgb(C_MID) };
    const cHot = { value: rgb(C_HOT) };
    const cGold = { value: rgb(C_GOLD) };

    /* ---------- Partikel ---------- */
    const small = host.clientWidth > 0 && host.clientWidth < 620;
    const count = small ? COUNT_SMALL : COUNT_FULL;

    const seeds = new Float32Array(count * 4);
    const lanes = new Float32Array(count);
    const deals = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seeds[i * 4 + 0] = Math.random(); // Phase im Zyklus
      seeds[i * 4 + 1] = Math.random(); // Tempo- und Größenstreuung
      seeds[i * 4 + 2] = Math.random(); // Radius in der Wolke
      seeds[i * 4 + 3] = Math.random(); // Winkel in der Wolke
      lanes[i] = Math.floor(Math.random() * LANE_COUNT);
      deals[i] = Math.random() < DEAL_RATIO ? 1 : 0;
    }

    const particleGeo = keep(new THREE.BufferGeometry());
    // `position` wird im Shader nicht gelesen, three braucht das Attribut aber
    // für die Vertex-Anzahl des Draw-Calls.
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3),
    );
    particleGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 4));
    particleGeo.setAttribute("aLane", new THREE.BufferAttribute(lanes, 1));
    particleGeo.setAttribute("aDeal", new THREE.BufferAttribute(deals, 1));

    const particleMat = keep(
      new THREE.ShaderMaterial({
        vertexShader: PARTICLE_VERT,
        fragmentShader: PARTICLE_FRAG,
        uniforms: {
          uTime,
          uReveal,
          uPixelScale,
          uSizeWorld: { value: 0.24 },
          cCloud,
          cMid,
          cHot,
          cGold,
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );

    const particles = new THREE.Points(particleGeo, particleMat);
    particles.frustumCulled = false;
    particles.renderOrder = 2;

    /* ---------- Bahnen ---------- */
    const quadU: number[] = [];
    const quadV: number[] = [];
    const quadLane: number[] = [];
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      for (let s = 0; s < RAIL_SEGMENTS; s++) {
        const u0 = s / RAIL_SEGMENTS;
        const u1 = (s + 1) / RAIL_SEGMENTS;
        const corners: Array<[number, number]> = [
          [u0, -1],
          [u1, -1],
          [u1, 1],
          [u0, -1],
          [u1, 1],
          [u0, 1],
        ];
        for (const [u, v] of corners) {
          quadU.push(u);
          quadV.push(v);
          quadLane.push(lane);
        }
      }
    }

    const railGeo = keep(new THREE.BufferGeometry());
    railGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(quadU.length * 3), 3),
    );
    railGeo.setAttribute("aU", new THREE.BufferAttribute(new Float32Array(quadU), 1));
    railGeo.setAttribute("aV", new THREE.BufferAttribute(new Float32Array(quadV), 1));
    railGeo.setAttribute(
      "aLane",
      new THREE.BufferAttribute(new Float32Array(quadLane), 1),
    );

    const railMat = keep(
      new THREE.ShaderMaterial({
        vertexShader: RAIL_VERT,
        fragmentShader: RAIL_FRAG,
        uniforms: {
          uTime,
          uReveal,
          uHalfWidth: { value: RAIL_HALF_WIDTH },
          cGold,
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    );

    const rails = new THREE.Mesh(railGeo, railMat);
    rails.frustumCulled = false;
    rails.renderOrder = 1;

    /* ---------- Blende an der Engstelle ---------- */
    const gateGeo = keep(new THREE.PlaneGeometry(1, 1));
    const gateMat = keep(
      new THREE.ShaderMaterial({
        vertexShader: GATE_VERT,
        fragmentShader: GATE_FRAG,
        uniforms: {
          uTime,
          uReveal,
          uScale: { value: new THREE.Vector2(3.6, 2.1) },
          cHot,
          cGold,
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    const gate = new THREE.Mesh(gateGeo, gateMat);
    gate.position.set(X_GATE, 0, 0);
    gate.frustumCulled = false;
    gate.renderOrder = 3;

    /* ---------- Bodenreflex ---------- */
    const floorGeo = keep(new THREE.PlaneGeometry(FLOOR_W, FLOOR_D));
    const floorMat = keep(
      new THREE.ShaderMaterial({
        vertexShader: FLOOR_VERT,
        fragmentShader: FLOOR_FRAG,
        uniforms: { uTime, uReveal, cGold, cMid },
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(FLOOR_CX, FLOOR_Y, 0);
    floor.frustumCulled = false;
    floor.renderOrder = 0;

    const scene = new THREE.Scene();
    scene.add(floor, rails, particles, gate);

    const camera = new THREE.PerspectiveCamera(32, 1.78, 0.1, 100);
    const lookTarget = new THREE.Vector3(TARGET_X, TARGET_Y, 0);
    const gateWorld = new THREE.Vector3(X_GATE, 0, 0);
    const gateProjected = new THREE.Vector3();

    /* ---------- Bildschirm-Pässe ---------- */
    const screenGeo = keep(new THREE.BufferGeometry());
    screenGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
        3,
      ),
    );
    screenGeo.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2),
    );

    const uAspect = { value: 1.78 };
    const uGate = { value: new THREE.Vector2(0.34, 0.5) };
    const uRes = { value: new THREE.Vector2(960, 540) };

    const bgMat = keep(
      new THREE.ShaderMaterial({
        vertexShader: SCREEN_VERT,
        fragmentShader: BG_FRAG,
        uniforms: {
          uAspect,
          uGate,
          cLow: { value: rgb(C_BG_LOW) },
          cHigh: { value: rgb(C_BG_HIGH) },
          cHazeWide: { value: rgb(C_HAZE_WIDE) },
          cHazeCore: { value: rgb(C_HAZE_CORE) },
          cHazeCloud: { value: rgb(C_HAZE_CLOUD) },
        },
        depthTest: false,
        depthWrite: false,
      }),
    );
    const bgScene = new THREE.Scene();
    const bgQuad = new THREE.Mesh(screenGeo, bgMat);
    bgQuad.frustumCulled = false;
    bgScene.add(bgQuad);

    const fxMat = keep(
      new THREE.ShaderMaterial({
        vertexShader: SCREEN_VERT,
        fragmentShader: FX_FRAG,
        uniforms: {
          uTime,
          uAspect,
          uGrain,
          uRes,
          cVignette: { value: rgb(C_VIGNETTE) },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      }),
    );
    const fxScene = new THREE.Scene();
    const fxQuad = new THREE.Mesh(screenGeo, fxMat);
    fxQuad.frustumCulled = false;
    fxScene.add(fxQuad);

    const flatCamera = new THREE.Camera(); // identisch, die Screen-Shader ignorieren sie

    /* ---------- Größe ---------- */
    let degraded = false;

    const applySize = () => {
      const w = Math.max(1, Math.round(host.clientWidth));
      const h = Math.max(1, Math.round(host.clientHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, degraded ? 1.25 : 2);

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      const aspect = w / h;
      camera.aspect = aspect;
      // FOV so wählen, dass immer dieselbe Weltbreite im Bild liegt — die
      // Komposition hält damit von 16:9 bis 1.9:1 und auch schmaler.
      const halfHeight = FRAME_HALF_WIDTH / Math.max(aspect, 0.4);
      camera.fov = THREE.MathUtils.clamp(
        (2 * Math.atan(halfHeight / CAM_DIST) * 180) / Math.PI,
        20,
        64,
      );
      camera.updateProjectionMatrix();

      uAspect.value = aspect;
      uPixelScale.value = h * dpr * 0.5;
      uRes.value.set(w * dpr, h * dpr);
    };

    /* ---------- Parallax ---------- */
    let targetX = 0;
    let targetY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      targetX = THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      targetY = THREE.MathUtils.clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    /* ---------- Frame ---------- */
    const draw = (t: number) => {
      uTime.value = t;
      const r = Math.min(1, t / 1.4);
      uReveal.value = 1 - Math.pow(1 - r, 3); // easeOutCubic

      parallaxX += (targetX - parallaxX) * 0.045;
      parallaxY += (targetY - parallaxY) * 0.045;

      // Eigenleben, damit die Szene ohne Zeiger nicht steht (< 1° Ausschlag)
      const driftX = Math.sin(t * 0.11) * 0.16;
      const driftY = Math.cos(t * 0.085) * 0.11;

      camera.position.set(
        CAM_X + parallaxX * 0.62 + driftX,
        CAM_Y - parallaxY * 0.42 + driftY,
        CAM_Z,
      );
      camera.lookAt(lookTarget);
      camera.updateMatrixWorld();

      gateProjected.copy(gateWorld).project(camera);
      uGate.value.set(gateProjected.x * 0.5 + 0.5, gateProjected.y * 0.5 + 0.5);

      renderer.clear();
      renderer.render(bgScene, flatCamera);
      renderer.render(scene, camera);
      renderer.render(fxScene, flatCamera);
    };

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* ---------- FPS-Notaus: einmalig Qualität senken ---------- */
    let acc = 0;
    let frames = 0;
    let slowRuns = 0;

    const degrade = () => {
      degraded = true;
      particleGeo.setDrawRange(0, Math.max(200, Math.floor(count * DEGRADE_KEEP)));
      uGrain.value = 0.016;
      applySize(); // greift jetzt den niedrigeren DPR-Deckel
    };

    /* ---------- Loop ---------- */
    let raf = 0;
    let running = false;
    let elapsed = 0;
    let prev = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      elapsed += dt;
      draw(elapsed);

      if (!degraded && elapsed > 1.5) {
        acc += dt * 1000;
        frames += 1;
        if (frames >= 45) {
          const avg = acc / frames;
          acc = 0;
          frames = 0;
          slowRuns = avg > 33 ? slowRuns + 1 : 0;
          if (slowRuns >= 2) degrade();
        }
      }

      if (running) raf = requestAnimationFrame(loop);
    };

    let inView = false;
    let pageVisible = !document.hidden;

    const sync = () => {
      const should = inView && pageVisible && !reducedMq.matches;
      if (should && !running) {
        running = true;
        prev = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    /* ---------- Observer ---------- */
    const resizeObserver = new ResizeObserver(() => {
      applySize();
      if (!running) draw(reducedMq.matches ? 9.5 : elapsed);
    });
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(host);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    const onReducedChange = () => {
      sync();
      if (reducedMq.matches) draw(9.5);
    };

    document.addEventListener("visibilitychange", onVisibility);
    reducedMq.addEventListener("change", onReducedChange);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });

    applySize();
    // Ein Standbild sofort — die Szene ist da, bevor der Loop anläuft, und
    // bei prefers-reduced-motion bleibt es genau bei diesem einen Frame.
    draw(9.5);
    sync();

    /* ---------- Aufräumen ---------- */
    return () => {
      running = false;
      cancelAnimationFrame(raf);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMq.removeEventListener("change", onReducedChange);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);

      for (const item of trash) item.dispose();
      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch {
        /* manche Browser mögen das nicht — kein Grund für einen Fehler */
      }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        // Steht auch dann, wenn WebGL fehlt oder noch nicht gezeichnet hat
        background:
          "radial-gradient(120% 96% at 34% 54%, #1b1b19 0%, #121212 42%, #0a0a0a 100%)",
      }}
    />
  );
}
