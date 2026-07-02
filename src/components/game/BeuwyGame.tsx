"use client";

/**
 * Die beuwy-Kanone — Endless-Flug über ein angedeutetes Frankfurt am Main.
 * Du fliegst 60 Sekunden, über der Stadt schweben Marketing-Floskeln und
 * Boomer-Logos auf Würfeln. Abschießen = Punkte, Ketten = Multiplikator.
 *
 * Architektur: raw Three.js (kein r3f), alles gepoolt (Gebäude, Würfel,
 * Tracer, Partikel, Schockwellen, DOM-Popups), keine Allokationen im
 * Frame-Loop. React-State nur für seltene HUD-Events (Score, Toasts, Phase,
 * Multiplikator); alles im Frame-Takt (Timer, Combo-Balken) läuft über
 * direkte DOM-Writes via Refs.
 *
 * Grafik: ACES-Tonemapping + UnrealBloomPass (RenderPass→Bloom→OutputPass).
 * Emitter liegen bewusst in HDR (emissiveIntensity > 1, color×2.5), damit
 * der Bloom-Threshold nur Fenster/Tracer/Explosionen glühen lässt — die
 * weißen Floskel-Texturen bleiben darunter. Auf schwacher Hardware wird
 * per FPS-Probe erst die pixelRatio gesenkt, dann der Composer umgangen
 * (die additiven Glow-Sprites liefern den Fake-Bloom-Grundlook überall).
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Inhalte: Floskeln + Boomer-Logos (aus VOICE.md-Verbotsliste erweitert) */
/* ------------------------------------------------------------------ */

type TargetSpec = { style: "floskel" | "wordart" | "starburst" | "globe" | "retro"; text: string };

const TARGETS: TargetSpec[] = [
  { style: "floskel", text: "Synergien nutzen" },
  { style: "floskel", text: "Ganzheitliche Lösungen" },
  { style: "floskel", text: "Innovativ & dynamisch" },
  { style: "floskel", text: "Ihr kompetenter Partner" },
  { style: "floskel", text: "Maßgeschneiderte Konzepte" },
  { style: "floskel", text: "Wir holen Sie da ab, wo Sie stehen" },
  { style: "floskel", text: "Mehrwert generieren" },
  { style: "floskel", text: "110 % Einsatz" },
  { style: "floskel", text: "Full-Service aus einer Hand" },
  { style: "wordart", text: "WILLKOMMEN" },
  { style: "wordart", text: "QUALITÄT SEIT 1987" },
  { style: "wordart", text: "AI-POWERED" },
  { style: "starburst", text: "MEGA SALE!!!" },
  { style: "starburst", text: "NEU!!!" },
  { style: "globe", text: "Wir sind jetzt online!" },
  { style: "globe", text: "Besucher: 000042" },
  { style: "retro", text: "Optimiert für IE 6" },
  { style: "retro", text: "⌂ Startseite | Kontakt" },
];

const HIT_LINES = [
  "Eine Floskel weniger im Internet.",
  "Das Internet dankt.",
  "Sauber.",
  "Boom. Klartext.",
  "Weg damit.",
  "Die hätte fast jemand auf seine Website geschrieben.",
];

const ESCAPE_LINES = [
  "Eine Floskel ist entkommen. Sie landet jetzt auf irgendeiner Startseite…",
  "Durchgerutscht. Irgendwo schreibt sie gerade jemand in seinen Hero.",
];

const MILESTONE_LINES = [
  "10 Floskeln entsorgt. Das Internet atmet auf.",
  "20! Irgendwo löscht ein Praktikant gerade ‚Synergien‘.",
  "30 — dich stellen wir sofort ein.",
  "40. Frankfurt ist fast sauber.",
  "50?! Okay. Beeindruckend.",
];

const RUN_SECONDS = 60;
const BEST_KEY = "beuwy_kanone_best";

/* ------------------------------------------------------------------ */
/* Textur-Maler: hässliche Logos & Floskel-Kacheln per Canvas          */
/* ------------------------------------------------------------------ */

function makeTargetTexture(spec: TargetSpec): THREE.CanvasTexture {
  const S = 512;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d")!;

  const fitText = (text: string, font: (px: number) => string, maxW: number) => {
    let px = 84;
    do {
      x.font = font(px);
      px -= 4;
    } while (x.measureText(text).width > maxW && px > 18);
  };

  switch (spec.style) {
    case "floskel": {
      const g = x.createLinearGradient(0, 0, 0, S);
      g.addColorStop(0, "#f4f2ea");
      g.addColorStop(1, "#d9d4c0");
      x.fillStyle = g;
      x.fillRect(0, 0, S, S);
      x.strokeStyle = "#9a2f2f";
      x.lineWidth = 14;
      x.strokeRect(10, 10, S - 20, S - 20);
      x.fillStyle = "#1d3f75";
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.shadowColor = "rgba(0,0,0,0.35)";
      x.shadowOffsetX = 4;
      x.shadowOffsetY = 4;
      const words = spec.text.split(" ");
      const lines: string[] = [];
      let line = "";
      for (const w of words) {
        if ((line + " " + w).trim().length > 14) {
          lines.push(line.trim());
          line = w;
        } else line = (line + " " + w).trim();
      }
      if (line) lines.push(line);
      const fs = lines.length > 2 ? 56 : 68;
      x.font = `bold ${fs}px Arial, sans-serif`;
      lines.forEach((l, i) => x.fillText(l, S / 2, S / 2 + (i - (lines.length - 1) / 2) * (fs + 12), S - 70));
      break;
    }
    case "wordart": {
      x.fillStyle = "#ffffff";
      x.fillRect(0, 0, S, S);
      const g = x.createLinearGradient(0, S * 0.3, S, S * 0.7);
      ["#ff0000", "#ff9900", "#ffee00", "#22bb22", "#2244ff", "#9900cc"].forEach((col, i, a) =>
        g.addColorStop(i / (a.length - 1), col)
      );
      x.textAlign = "center";
      x.textBaseline = "middle";
      fitText(spec.text, (px) => `italic 900 ${px}px Georgia, serif`, S - 60);
      x.lineWidth = 10;
      x.strokeStyle = "#333";
      x.setTransform(1, 0, -0.18, 1, 40, 0);
      x.strokeText(spec.text, S / 2, S / 2, S - 60);
      x.fillStyle = g;
      x.fillText(spec.text, S / 2, S / 2, S - 60);
      x.setTransform(1, 0, 0, 1, 0, 0);
      break;
    }
    case "starburst": {
      x.fillStyle = "#cc1111";
      x.fillRect(0, 0, S, S);
      x.fillStyle = "#ffe22e";
      x.beginPath();
      const spikes = 14;
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? S * 0.46 : S * 0.3;
        const a = (i / (spikes * 2)) * Math.PI * 2;
        const px = S / 2 + Math.cos(a) * r;
        const py = S / 2 + Math.sin(a) * r;
        i === 0 ? x.moveTo(px, py) : x.lineTo(px, py);
      }
      x.closePath();
      x.fill();
      x.fillStyle = "#cc1111";
      x.textAlign = "center";
      x.textBaseline = "middle";
      fitText(spec.text, (px) => `900 ${px}px Arial, sans-serif`, S * 0.5);
      x.save();
      x.translate(S / 2, S / 2);
      x.rotate(-0.12);
      x.fillText(spec.text, 0, 0, S * 0.52);
      x.restore();
      break;
    }
    case "globe": {
      x.fillStyle = "#e8eef8";
      x.fillRect(0, 0, S, S);
      x.strokeStyle = "#2b62b5";
      x.lineWidth = 5;
      const cx = S / 2, cy = S * 0.42, R = S * 0.27;
      x.beginPath();
      x.arc(cx, cy, R, 0, Math.PI * 2);
      x.stroke();
      for (let i = -2; i <= 2; i++) {
        x.beginPath();
        x.ellipse(cx, cy, R, Math.abs(R * (i / 3)) + 2, 0, 0, Math.PI * 2);
        x.stroke();
        x.beginPath();
        x.ellipse(cx, cy, Math.abs(R * (i / 3)) + 2, R, 0, 0, Math.PI * 2);
        x.stroke();
      }
      x.fillStyle = "#1d3f75";
      x.textAlign = "center";
      x.textBaseline = "middle";
      fitText(spec.text, (px) => `bold ${px}px "Times New Roman", serif`, S - 60);
      x.fillText(spec.text, S / 2, S * 0.84, S - 60);
      break;
    }
    case "retro": {
      x.fillStyle = "#000000";
      x.fillRect(0, 0, S, S);
      x.strokeStyle = "#00ee44";
      x.lineWidth = 6;
      x.strokeRect(18, 18, S - 36, S - 36);
      x.fillStyle = "#00ee44";
      x.textAlign = "center";
      x.textBaseline = "middle";
      fitText(spec.text, (px) => `bold ${px}px "Courier New", monospace`, S - 80);
      x.fillText(spec.text, S / 2, S / 2, S - 80);
      x.font = "bold 40px 'Courier New', monospace";
      x.fillText("<<< +++ >>>", S / 2, S * 0.82);
      break;
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 2;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Fenster-Textur mit Etagen-Logik: pro Reihe wird gewürfelt, ob die Etage
 * "Büro voll an" (12%), halb (28%) oder fast dunkel ist — das erzeugt den
 * typischen Hochhaus-Reihen-Look statt Rauschen. Jedes Fenster bekommt
 * einen Halo-Bleed (wirkt mit Linear-Filtering wie Mini-Glow) und leichte
 * Farbvarianz (Gelb/Warmweiß/Amber).
 */
function makeWindowTexture(): THREE.CanvasTexture {
  const w = 128, h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  x.fillStyle = "#000000";
  x.fillRect(0, 0, w, h);
  for (let gy = 6; gy < h - 8; gy += 14) {
    const roll = Math.random();
    const p = roll < 0.12 ? 0.85 : roll < 0.4 ? 0.45 : 0.16;
    for (let gx = 8; gx < w - 10; gx += 16) {
      if (Math.random() < p) {
        const cr = Math.random();
        const col = cr < 0.7 ? "247,233,154" : cr < 0.92 ? "255,244,214" : "255,190,120";
        const a = 0.45 + Math.random() * 0.55;
        x.fillStyle = `rgba(${col},${a * 0.14})`;
        x.fillRect(gx - 2, gy - 2, 12, 11);
        x.fillStyle = `rgba(${col},${a})`;
        x.fillRect(gx, gy, 8, 7);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Weicher radialer Glow — geteilt von Halos, Mündungsfeuer, Trail, Mond. */
function makeGlowTexture(): THREE.CanvasTexture {
  const S = 64;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d")!;
  const g = x.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, "rgba(255,253,243,1)");
  g.addColorStop(0.4, "rgba(247,233,154,0.55)");
  g.addColorStop(1, "rgba(247,233,154,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, S, S);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Horizont-Lichtdom: vertikaler Verlauf + radialer Downtown-Hotspot. */
function makeHorizonTexture(): THREE.CanvasTexture {
  const w = 1024, h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  const g = x.createLinearGradient(0, h, 0, 0);
  g.addColorStop(0, "rgba(247,233,154,0.38)");
  g.addColorStop(0.45, "rgba(120,26,14,0.26)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);
  const r = x.createRadialGradient(w / 2, h, 0, w / 2, h, w * 0.4);
  r.addColorStop(0, "rgba(247,233,154,0.24)");
  r.addColorStop(1, "rgba(247,233,154,0)");
  x.fillStyle = r;
  x.fillRect(0, 0, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Skyline-Scherenschnitt mit Frankfurt-Zitaten: Messeturm-Pyramide,
 * Antennenmasten, Europaturm-Kugel. withWindows streut winzige Lichtpunkte.
 */
function makeSilhouetteTexture(fill: string, withWindows: boolean): THREE.CanvasTexture {
  const w = 1024, h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  x.fillStyle = fill;
  let px = 0;
  while (px < w) {
    const tw = 24 + Math.random() * 70;
    const th = 40 + Math.random() * 130;
    x.fillRect(px, h - th, tw, th);
    if (withWindows) {
      for (let i = 0; i < 4; i++) {
        x.fillStyle = "rgba(247,233,154,0.5)";
        x.fillRect(px + 4 + Math.random() * (tw - 10), h - th + 6 + Math.random() * (th - 14), 2, 2);
      }
      x.fillStyle = fill;
    }
    px += tw + 4 + Math.random() * 26;
  }
  // Messeturm: Turm + Pyramidenspitze
  x.fillRect(240, h - 200, 44, 200);
  x.beginPath();
  x.moveTo(236, h - 200);
  x.lineTo(262, h - 236);
  x.lineTo(288, h - 200);
  x.closePath();
  x.fill();
  // Antennenmasten
  x.fillRect(560, h - 226, 5, 226);
  x.fillRect(760, h - 190, 4, 190);
  // Europaturm: Stab + Kugel
  x.fillRect(880, h - 186, 8, 186);
  x.beginPath();
  x.arc(884, h - 186, 17, 0, Math.PI * 2);
  x.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Fluss-Spiegelung: vertikale Licht-Schmierstreifen (Gold + etwas Rotorange). */
function makeRiverStreakTexture(): THREE.CanvasTexture {
  const w = 256, h = 128;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  for (let i = 0; i < 50; i++) {
    const sx = Math.random() * w;
    const len = 15 + Math.random() * 45;
    const sy = Math.random() * (h - len);
    const wd = 1 + Math.random() * 2;
    const col = Math.random() < 0.85 ? "247,233,154" : "255,110,60";
    x.fillStyle = `rgba(${col},${0.05 + Math.random() * 0.05})`;
    x.fillRect(sx - 1, sy, wd + 2, len);
    x.fillStyle = `rgba(${col},${0.15 + Math.random() * 0.2})`;
    x.fillRect(sx, sy, wd, len);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ------------------------------------------------------------------ */
/* Mini-Sound: WebAudio-Oszillatoren + Noise-Whoosh (kein Asset nötig) */
/* ------------------------------------------------------------------ */

class Sfx {
  private ctx: AudioContext | null = null;
  private noise: AudioBuffer | null = null;
  muted = false;
  ensure() {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
        const n = this.ctx.sampleRate * 0.3;
        this.noise = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
        const d = this.noise.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      } catch {
        /* kein Audio — egal */
      }
    }
  }
  private blip(type: OscillatorType, f0: number, f1: number, dur: number, vol: number, delay = 0) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + dur);
  }
  pew() {
    this.blip("square", 880, 220, 0.09, 0.045);
  }
  /** Treffer-Boom; pitch steigt mit der Combo-Stufe (Belohnungstreppe). */
  boom(pitch = 1) {
    this.blip("sawtooth", 140 * pitch, 36 * pitch, 0.3, 0.12);
  }
  fanfare() {
    this.blip("square", 523, 523, 0.1, 0.06, 0);
    this.blip("square", 659, 659, 0.1, 0.06, 0.07);
    this.blip("square", 784, 784, 0.16, 0.07, 0.14);
  }
  whoosh() {
    if (!this.ctx || !this.noise || this.muted) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.setValueAtTime(1200, t);
    f.frequency.exponentialRampToValueAtTime(300, t + 0.25);
    f.Q.value = 1.2;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.1, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    src.connect(f).connect(g).connect(this.ctx.destination);
    src.start(t);
    src.stop(t + 0.3);
  }
  roll() {
    this.blip("sine", 280, 620, 0.28, 0.05);
  }
}

/* ------------------------------------------------------------------ */
/* Das Spiel                                                           */
/* ------------------------------------------------------------------ */

type Toast = { id: number; text: string; big?: boolean };
type OverStats = { points: number; hits: number; maxCombo: number; best: number; isRecord: boolean };

export function BeuwyGame() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"intro" | "playing" | "over" | "fallback">("intro");
  const [score, setScore] = useState(0);
  const [mult, setMult] = useState(1);
  const [over, setOver] = useState<OverStats | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [muted, setMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const sfxRef = useRef<Sfx>(new Sfx());
  sfxRef.current.muted = muted;
  const toastId = useRef(0);

  // Frame-Takt-HUD läuft über direkte DOM-Writes, nie über setState:
  const timerEl = useRef<HTMLSpanElement>(null);
  const comboBarEl = useRef<HTMLDivElement>(null);
  const popEls = useRef<(HTMLDivElement | null)[]>([]);
  // Brücke React ↔ Spiel-Closure:
  const startRef = useRef<() => void>(() => {});

  const pushToast = (text: string, big = false) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { id, text, big }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), big ? 2800 : 2200);
  };
  const pushToastRef = useRef(pushToast);
  pushToastRef.current = pushToast;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /* ---------- Renderer + Composer (mit Fallback ohne WebGL) ---------- */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setPhase("fallback");
      return;
    }
    const mobile =
      (typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches) ||
      window.innerWidth < 768;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    // pixelRatio VOR dem Composer setzen — der Konstruktor snapshottet sie.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const FOG = new THREE.Color("#200505");
    const scene = new THREE.Scene();
    scene.background = FOG;
    scene.fog = new THREE.Fog(FOG, 70, 340);

    const camera = new THREE.PerspectiveCamera(62, host.clientWidth / host.clientHeight, 0.1, 500);
    camera.position.set(0, 9, 20);
    camera.lookAt(0, 8, -60);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.7, 0.4, 0.6);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    let useComposer = true;

    scene.add(new THREE.HemisphereLight(0x3a2a1a, 0x120202, 1.1));
    const key = new THREE.DirectionalLight(0xf7e99a, 0.8);
    key.position.set(-60, 80, -60); // aus Mondrichtung
    scene.add(key);

    const glowTex = makeGlowTexture();

    /* ---------- Himmel: Lichtdom, Silhouetten, Mond, Sterne ---------- */
    const horizon = new THREE.Mesh(
      new THREE.PlaneGeometry(1100, 180),
      new THREE.MeshBasicMaterial({
        map: makeHorizonTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    horizon.position.set(0, 70, -450);
    horizon.renderOrder = 1;
    scene.add(horizon);

    const silFar = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 110),
      new THREE.MeshBasicMaterial({ map: makeSilhouetteTexture("#120303", false), transparent: true, fog: false, depthWrite: false })
    );
    silFar.position.set(0, 55, -430);
    silFar.renderOrder = 2;
    scene.add(silFar);

    const silMid = new THREE.Mesh(
      new THREE.PlaneGeometry(900, 90),
      new THREE.MeshBasicMaterial({ map: makeSilhouetteTexture("#1E0505", true), transparent: true, fog: false, depthWrite: false })
    );
    silMid.position.set(0, 45, -370);
    silMid.renderOrder = 3;
    scene.add(silMid);

    const moonMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xfff6d8,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    });
    const moon = new THREE.Sprite(moonMat);
    moon.position.set(-120, 130, -440);
    moon.scale.set(65, 65, 1);
    scene.add(moon);
    const moonHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0xf7e99a,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    moonHalo.position.copy(moon.position);
    moonHalo.scale.set(150, 150, 1);
    scene.add(moonHalo);

    // Sterne: 3 Twinkle-Gruppen (Größen-/Farbvarianz), fog aus, nur oben.
    const starMats: THREE.PointsMaterial[] = [];
    for (let gI = 0; gI < 3; gI++) {
      const n = 90;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 500;
        pos[i * 3 + 1] = 80 + Math.random() * 140;
        pos[i * 3 + 2] = -440 + Math.random() * 380;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const m = new THREE.PointsMaterial({
        color: [0xfffdf3, 0xf7e99a, 0xead8c8][gI],
        size: [0.5, 0.8, 1.3][gI],
        transparent: true,
        opacity: 0.4,
      });
      m.fog = false;
      starMats.push(m);
      scene.add(new THREE.Points(g, m));
    }

    /* ---------- Boden, Main (mit Fake-Spiegelung), Laternen ---------- */
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 900),
      new THREE.MeshLambertMaterial({ color: 0x150404 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.z = -300;
    scene.add(ground);

    const riverTex = makeRiverStreakTexture();
    riverTex.repeat.set(20, 1);
    const riverBaseMat = new THREE.MeshBasicMaterial({ color: 0x0d1830 });
    const riverStreakMat = new THREE.MeshBasicMaterial({
      map: riverTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.55,
    });
    const rivers: THREE.Group[] = [];
    for (let i = 0; i < 2; i++) {
      const grp = new THREE.Group();
      const base = new THREE.Mesh(new THREE.PlaneGeometry(500, 22), riverBaseMat);
      base.rotation.x = -Math.PI / 2;
      const streak = new THREE.Mesh(new THREE.PlaneGeometry(500, 22), riverStreakMat);
      streak.rotation.x = -Math.PI / 2;
      streak.position.y = 0.03;
      grp.add(base, streak);
      grp.position.set(0, 0.05, -150 - i * 300);
      scene.add(grp);
      rivers.push(grp);
    }

    // Straßenlaternen: 2 Reihen als EIN Points-Objekt, Scroll per Modulo.
    const LAMP_STEP = 7.5;
    {
      const n = 160;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const row = i % 2 === 0 ? -22 : 22;
        pos[i * 3] = row;
        pos[i * 3 + 1] = 2.5;
        pos[i * 3 + 2] = -570 + Math.floor(i / 2) * LAMP_STEP;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      var lamps = new THREE.Points(
        g,
        new THREE.PointsMaterial({
          color: 0xffb45e,
          size: 1.3,
          map: glowTex, // sonst harte Quadrate in Kameranähe
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      lamps.frustumCulled = false;
      scene.add(lamps);
    }

    /* ---------- Skyline (Pool, recycelt) — angedeutetes Frankfurt ---------- */
    const winTexes = [makeWindowTexture(), makeWindowTexture(), makeWindowTexture(), makeWindowTexture(), makeWindowTexture()];
    // emissive WEISS + Farben in der Textur (sonst doppelte Gelbfärbung);
    // Intensität > 1 = HDR, damit der Bloom-Threshold die Fenster fängt.
    const wallMats = winTexes.slice(0, 3).map(
      (t) =>
        new THREE.MeshLambertMaterial({
          color: 0x2a0d0d,
          emissive: new THREE.Color(0xffffff),
          emissiveMap: t,
          emissiveIntensity: 1.6,
        })
    );
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x1c0707 });
    const spireMat = new THREE.MeshLambertMaterial({ color: 0x241010, emissive: 0xf7e99a, emissiveIntensity: 0.1 });
    const beaconMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xff3333,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    type Building = { grp: THREE.Group; box: THREE.Mesh; spire: THREE.Mesh; beacon: THREE.Sprite; phase: number };
    const buildings: Building[] = [];
    const buildingGeo = new THREE.BoxGeometry(1, 1, 1);

    const randomizeBuilding = (b: Building, z: number) => {
      const side = Math.random() < 0.5 ? -1 : 1;
      const xPos = side * (26 + Math.random() * 60);
      const wid = 6 + Math.random() * 10;
      const dep = 6 + Math.random() * 10;
      const landmark = Math.random() < 0.09;
      const hei = landmark ? 70 + Math.random() * 55 : 10 + Math.random() * 40;
      b.box.scale.set(wid, hei, dep);
      b.box.position.y = hei / 2;
      const mat = wallMats[(Math.random() * wallMats.length) | 0];
      (b.box.material as THREE.Material[]).splice(0, 6, mat, mat, roofMat, roofMat, mat, mat);
      b.spire.visible = landmark;
      b.spire.position.y = hei + 4;
      b.spire.scale.setScalar(landmark ? 1 : 0.001);
      b.beacon.position.y = hei + 8;
      b.beacon.visible = false;
      b.phase = Math.random() * 1.6;
      const t = winTexes[(Math.random() * 3) | 0];
      t.repeat.set(Math.max(1, Math.round(wid / 6)), Math.max(1, Math.round(hei / 12)));
      b.grp.position.set(xPos, 0, z);
    };

    for (let i = 0; i < 56; i++) {
      const grp = new THREE.Group();
      const box = new THREE.Mesh(buildingGeo, [roofMat, roofMat, roofMat, roofMat, roofMat, roofMat]);
      const spire = new THREE.Mesh(new THREE.ConeGeometry(3.4, 9, 4), spireMat);
      const beacon = new THREE.Sprite(beaconMat);
      beacon.scale.setScalar(2.2);
      grp.add(box, spire, beacon);
      scene.add(grp);
      const b = { grp, box, spire, beacon, phase: 0 };
      randomizeBuilding(b, -i * 11 - 10);
      buildings.push(b);
    }

    /* ---------- Spieler-Flugzeug + Mündungsfeuer + Contrails ---------- */
    const plane = new THREE.Group();
    {
      // Leichtes Eigenleuchten: das Key-Light kommt aus Mondrichtung (hinten),
      // ohne Emissive wäre das Flugzeug vor dem hellen Horizont nur Silhouette.
      const yellow = new THREE.MeshLambertMaterial({
        color: 0xf7e99a,
        emissive: 0xf7e99a,
        emissiveIntensity: 0.42,
      });
      const dark = new THREE.MeshLambertMaterial({ color: 0x3a0808 });
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.7, 4.6, 6), yellow);
      body.rotation.x = -Math.PI / 2;
      const wings = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.16, 1.5), yellow);
      wings.position.z = 0.4;
      const tail = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.14, 0.8), yellow);
      tail.position.set(0, 0.5, 2);
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.2, 0.9), dark);
      fin.position.set(0, 0.7, 2);
      const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 1.6, 8), dark);
      cannon.rotation.x = Math.PI / 2;
      cannon.position.set(0, -0.25, -2.4);
      plane.add(body, wings, tail, fin, cannon);
    }
    plane.position.set(0, 9, 0);
    scene.add(plane);

    // Mündungsfeuer: EIN permanentes PointLight (nie togglen — Licht-Anzahl-
    // Wechsel triggert Shader-Rekompilierung) + Flash-Sprite, beide als
    // Kinder der Kanone. r155+ rechnet physikalisch: Peak hoch ansetzen.
    const muzzle = new THREE.PointLight(0xf7e99a, 0, 26, 2);
    muzzle.position.set(0, -0.25, -3.3);
    plane.add(muzzle);
    const flashMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xfffdf3,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flash = new THREE.Sprite(flashMat);
    flash.position.set(0, -0.25, -3.3);
    plane.add(flash);

    // Wingtip-Contrails: Ringpuffer-Points mit RGBA-Vertex-Colors
    // (itemSize 4 aktiviert USE_COLOR_ALPHA — per-Punkt-Fade ohne Shader).
    const TRAIL_N = 128;
    const trailPos = new Float32Array(TRAIL_N * 3);
    const trailCol = new Float32Array(TRAIL_N * 4);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
    trailGeo.setAttribute("color", new THREE.BufferAttribute(trailCol, 4));
    const trail = new THREE.Points(
      trailGeo,
      new THREE.PointsMaterial({
        size: 0.35,
        map: glowTex,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    trail.frustumCulled = false;
    scene.add(trail);
    let trailHead = 0;
    let trailAcc = 0;
    const tipL = new THREE.Vector3();
    const tipR = new THREE.Vector3();
    const emitTrail = (v: THREE.Vector3) => {
      trailPos[trailHead * 3] = v.x;
      trailPos[trailHead * 3 + 1] = v.y;
      trailPos[trailHead * 3 + 2] = v.z;
      trailCol[trailHead * 4] = 1;
      trailCol[trailHead * 4 + 1] = 0.92;
      trailCol[trailHead * 4 + 2] = 0.6;
      trailCol[trailHead * 4 + 3] = 0.5;
      trailHead = (trailHead + 1) % TRAIL_N;
    };

    /* ---------- Ziel-Würfel (Pool) + Halos + Kill-Punch ---------- */
    const targetTexes = TARGETS.map((t) => ({ spec: t, tex: makeTargetTexture(t) }));
    const haloMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xf7e99a,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    type Cube = { mesh: THREE.Mesh; active: boolean; dying: number; text: string; spin: THREE.Vector3; nearMissDone: boolean };
    const cubes: Cube[] = [];
    const cubeGeo = new THREE.BoxGeometry(3.4, 3.4, 3.4);
    for (let i = 0; i < 14; i++) {
      const mesh = new THREE.Mesh(cubeGeo, new THREE.MeshLambertMaterial({ map: targetTexes[0].tex }));
      const halo = new THREE.Sprite(haloMat);
      halo.scale.setScalar(2.6);
      mesh.add(halo);
      mesh.visible = false;
      scene.add(mesh);
      cubes.push({ mesh, active: false, dying: 0, text: "", spin: new THREE.Vector3(), nearMissDone: false });
    }
    const spawnCube = () => {
      const c = cubes.find((c) => !c.active && c.dying <= 0);
      if (!c) return;
      const pick = targetTexes[(Math.random() * targetTexes.length) | 0];
      (c.mesh.material as THREE.MeshLambertMaterial).map = pick.tex;
      (c.mesh.material as THREE.MeshLambertMaterial).needsUpdate = true;
      c.text = pick.spec.text;
      c.mesh.position.set((Math.random() - 0.5) * 30, 4 + Math.random() * 13, -330);
      c.mesh.scale.setScalar(1);
      c.spin.set((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 0.8);
      c.nearMissDone = false;
      c.mesh.visible = true;
      c.active = true;
    };

    /* ---------- Tracer-Kugeln (Pool) ---------- */
    type Bullet = { mesh: THREE.Mesh; active: boolean };
    const bullets: Bullet[] = [];
    // Kapsel-Achse ist Y → einmalig auf Z drehen, Loop bleibt unverändert.
    const bulletGeo = new THREE.CapsuleGeometry(0.12, 2.8, 3, 6);
    bulletGeo.rotateX(Math.PI / 2);
    const bulletMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    bulletMat.color.setHex(0xf7e99a).multiplyScalar(2.5); // HDR → Bloom fängt die Tracer
    for (let i = 0; i < 24; i++) {
      const mesh = new THREE.Mesh(bulletGeo, bulletMat);
      mesh.visible = false;
      scene.add(mesh);
      bullets.push({ mesh, active: false });
    }
    const MUZZLE_OFFSET = new THREE.Vector3(0, -0.3, -2.8);

    /* ---------- Explosionen: Partikel-Bursts + Schockwellen-Ringe ---------- */
    type Burst = { points: THREE.Points; vel: Float32Array; life: number; active: boolean };
    const bursts: Burst[] = [];
    for (let i = 0; i < 8; i++) {
      const n = 42;
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      const m = new THREE.PointsMaterial({
        size: 0.55,
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      m.color.setHex(0xf7e99a).multiplyScalar(2);
      const points = new THREE.Points(g, m);
      points.visible = false;
      scene.add(points);
      bursts.push({ points, vel: new Float32Array(n * 3), life: 0, active: false });
    }
    type Wave = { mesh: THREE.Mesh; life: number; active: boolean };
    const shockwaves: Wave[] = [];
    const waveGeo = new THREE.RingGeometry(0.72, 1, 36);
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(
        waveGeo,
        new THREE.MeshBasicMaterial({
          color: 0xf7e99a,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
      m.visible = false;
      scene.add(m);
      shockwaves.push({ mesh: m, life: 0, active: false });
    }
    const explode = (at: THREE.Vector3) => {
      const b = bursts.find((b) => !b.active);
      if (b) {
        const pos = (b.points.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
        for (let i = 0; i < pos.length / 3; i++) {
          pos[i * 3] = at.x;
          pos[i * 3 + 1] = at.y;
          pos[i * 3 + 2] = at.z;
          b.vel[i * 3] = (Math.random() - 0.5) * 24;
          b.vel[i * 3 + 1] = (Math.random() - 0.2) * 24;
          b.vel[i * 3 + 2] = (Math.random() - 0.5) * 24;
        }
        (b.points.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
        b.life = 0.7;
        b.active = true;
        b.points.visible = true;
      }
      const w = shockwaves.find((w) => !w.active);
      if (w) {
        w.mesh.position.copy(at);
        w.mesh.quaternion.copy(camera.quaternion); // einmalig billboarden reicht
        w.mesh.scale.setScalar(1);
        w.life = 0.45;
        w.active = true;
        w.mesh.visible = true;
      }
    };

    /* ---------- Spielzustand (Closure) ---------- */
    const target = new THREE.Vector2(0, 9);
    let firing = false;
    let lastShot = 0;
    let spawnTimer = 0;
    let hits = 0;
    let points = 0;
    let combo = 0;
    let comboTimer = 0;
    let maxCombo = 0;
    let multStage = 1;
    let timeLeft = RUN_SECONDS;
    let lastTimerText = -1;
    let shake = 0;
    let hitStop = 0;
    let cityGlow = 0;
    let rollT = 0;
    let rollDir = 1;
    let rolledOnce = false;
    let curFov = 62;
    const popV = new THREE.Vector3();
    let popIdx = 0;

    const popupAt = (worldPos: THREE.Vector3, text: string) => {
      popV.copy(worldPos).project(camera);
      if (popV.z > 1) return;
      const el = popEls.current[popIdx++ % popEls.current.length];
      if (!el) return;
      el.textContent = text;
      el.style.left = `${(popV.x * 0.5 + 0.5) * 100}%`;
      el.style.top = `${(-popV.y * 0.5 + 0.5) * 100}%`;
      el.animate(
        [
          { opacity: 1, transform: "translate(-50%, 0) scale(1)" },
          { opacity: 0, transform: "translate(-50%, -46px) scale(1.15)" },
        ],
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
      );
    };

    const setMultStage = (stage: number) => {
      if (stage !== multStage) {
        multStage = stage;
        setMult(stage);
      }
    };

    const resetRun = () => {
      hits = 0;
      points = 0;
      combo = 0;
      comboTimer = 0;
      maxCombo = 0;
      timeLeft = RUN_SECONDS;
      lastTimerText = -1;
      shake = 0;
      hitStop = 0;
      cityGlow = 0;
      rollT = 0;
      rolledOnce = false;
      spawnTimer = 0;
      for (const c of cubes) {
        c.active = false;
        c.dying = 0;
        c.mesh.visible = false;
      }
      for (const b of bullets) {
        b.active = false;
        b.mesh.visible = false;
      }
      for (const b of bursts) {
        b.active = false;
        b.points.visible = false;
      }
      for (const w of shockwaves) {
        w.active = false;
        w.mesh.visible = false;
      }
      trailCol.fill(0);
      setScore(0);
      setMult(1);
      multStage = 1;
    };
    startRef.current = () => {
      resetRun();
      setPhase("playing");
    };

    const endRun = () => {
      const best = Number(localStorage.getItem(BEST_KEY) || 0);
      const isRecord = points > best;
      if (isRecord) localStorage.setItem(BEST_KEY, String(points));
      setOver({ points, hits, maxCombo, best: Math.max(best, points), isRecord });
      setPhase("over");
    };

    /* ---------- Input ---------- */
    let lastPX = 0;
    let lastPT = 0;
    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.x = nx * 16;
      target.y = THREE.MathUtils.clamp(10 - ny * 8, 2.5, 17.5);
      // Flick-Erkennung (Mobile-Barrel-Roll): schnelle horizontale Bewegung
      const now = performance.now();
      if (lastPT > 0 && rollT <= 0 && phaseRef.current === "playing") {
        const vx = (e.clientX - lastPX) / Math.max(1, now - lastPT); // px/ms
        if (Math.abs(vx) > 3.2) startRoll(Math.sign(vx));
      }
      lastPX = e.clientX;
      lastPT = now;
    };
    const startRoll = (dir: number) => {
      rollT = 1;
      rollDir = dir || 1;
      sfxRef.current.roll();
      if (!rolledOnce) {
        rolledOnce = true;
        pushToastRef.current("Ein Barrel Roll. Dein Marketing-Budget rotiert mit.");
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      onPointerMove(e);
      firing = true;
    };
    const onPointerUp = () => (firing = false);
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (phaseRef.current === "playing") e.preventDefault();
        firing = e.type === "keydown";
      }
      if (e.type === "keydown" && (e.code === "KeyR") && rollT <= 0 && phaseRef.current === "playing") {
        startRoll(Math.random() < 0.5 ? -1 : 1);
      }
    };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    const onResize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h); // CSS-Pixel, NICHT × devicePixelRatio
    };
    window.addEventListener("resize", onResize);

    /* ---------- FPS-Probe: dpr senken → notfalls Bloom aus ---------- */
    let frameN = 0;
    let probeAcc = 0;
    let qualityStage = 0; // 0 = voll, 1 = dpr 1.0, 2 = ohne Composer

    /* ---------- Loop ---------- */
    let raf = 0;
    let last = performance.now();

    const doRender = () => (useComposer ? composer.render() : renderer.render(scene, camera));

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (document.hidden) return;

      // Hit-Stop: Welt friert für ~3 Frames — das Hirn liest das als Wucht.
      if (hitStop > 0) {
        hitStop -= dt;
        doRender();
        return;
      }

      // FPS-Probe (Frames 30–149 und ggf. 300–419)
      frameN++;
      if (qualityStage < 2) {
        if (frameN >= 30 && frameN < 150) probeAcc += dt;
        if (frameN === 150 && qualityStage === 0) {
          if (120 / probeAcc < 45) {
            qualityStage = 1;
            probeAcc = 0;
            renderer.setPixelRatio(1.0);
            composer.setPixelRatio(1.0);
          }
        }
        if (qualityStage === 1) {
          if (frameN >= 300 && frameN < 420) probeAcc += dt;
          if (frameN === 420 && 120 / probeAcc < 42) {
            qualityStage = 2;
            useComposer = false;
          }
        }
      }

      const playing = phaseRef.current === "playing";
      const speed = playing ? 46 + Math.min(hits * 0.8, 30) : 14;

      // Timer (DOM-Write, kein React-State im Frame-Takt)
      if (playing) {
        timeLeft -= dt;
        const shown = Math.max(0, Math.ceil(timeLeft));
        if (shown !== lastTimerText) {
          lastTimerText = shown;
          if (timerEl.current) timerEl.current.textContent = String(shown);
        }
        if (timeLeft <= 0) endRun();
      }

      // Welt nach vorne schieben, hinter der Kamera recyceln
      for (const b of buildings) {
        b.grp.position.z += speed * dt;
        if (b.grp.position.z > 30) randomizeBuilding(b, b.grp.position.z - 620);
        if (b.spire.visible) b.beacon.visible = ((now * 0.001 + b.phase) % 1.6) < 0.4;
      }
      for (const r of rivers) {
        r.position.z += speed * dt;
        if (r.position.z > 40) r.position.z -= 600;
      }
      lamps.position.z += speed * dt;
      if (lamps.position.z > LAMP_STEP) lamps.position.z -= LAMP_STEP; // uniformes Raster → Sprung unsichtbar
      riverTex.offset.x += dt * 0.02;
      riverTex.offset.y -= speed * dt * 0.004;

      // Sterne-Twinkle + Halo-Puls + Milestone-Skyline-Glow
      starMats[0].opacity = 0.32 + 0.22 * Math.sin(now * 0.0011);
      starMats[1].opacity = 0.32 + 0.22 * Math.sin(now * 0.0007 + 2.1);
      starMats[2].opacity = 0.3 + 0.2 * Math.sin(now * 0.0016 + 4.2);
      haloMat.opacity = 0.18 + 0.06 * Math.sin(now * 0.004);
      if (cityGlow > 0.005) {
        cityGlow *= Math.exp(-3 * dt);
        const e = 1.6 + cityGlow * 1.2;
        for (const m of wallMats) m.emissiveIntensity = e;
      }

      // Flugzeug lenken (weiches Nachziehen + Banking + Barrel Roll)
      plane.position.x += (target.x - plane.position.x) * Math.min(1, 7 * dt);
      plane.position.y += (target.y - plane.position.y) * Math.min(1, 7 * dt);
      plane.position.z += (0 - plane.position.z) * Math.min(1, 10 * dt); // Recoil federt zurück
      const bank = (plane.position.x - target.x) * 0.08;
      let rollOffset = 0;
      if (rollT > 0) {
        rollT = Math.max(0, rollT - dt / 0.55);
        const e = 1 - rollT;
        const ease = e * e * (3 - 2 * e); // smoothstep
        rollOffset = rollDir * ease * Math.PI * 2;
      }
      plane.rotation.z = bank + rollOffset;
      plane.rotation.x = (plane.position.y - target.y) * 0.04;

      // Kamera: Follow + Roll-Mitnahme + Shake (Trauma-Quadrat)
      camera.position.x = plane.position.x * 0.35;
      camera.position.y = 9 + (plane.position.y - 9) * 0.25;
      shake *= Math.exp(-7 * dt);
      const s = shake * shake;
      camera.position.x += Math.sin(now * 0.043) * 0.4 * s;
      camera.position.y += Math.cos(now * 0.057) * 0.3 * s;
      camera.rotation.z = bank * 0.3 + Math.sin(now * 0.061) * 0.03 * s;

      // Tempo-Gefühl: FOV zieht mit der Geschwindigkeit auf
      const targetFov = playing ? 62 + (speed - 46) * 0.12 : 62;
      if (Math.abs(targetFov - curFov) > 0.01) {
        curFov += (targetFov - curFov) * Math.min(1, 3 * dt);
        camera.fov = curFov;
        camera.updateProjectionMatrix();
      }

      // Contrails
      trailAcc += dt;
      if (playing && trailAcc > 0.024) {
        trailAcc = 0;
        plane.updateMatrixWorld();
        tipL.set(-3.75, 0, 0.55);
        plane.localToWorld(tipL);
        emitTrail(tipL);
        tipR.set(3.75, 0, 0.55);
        plane.localToWorld(tipR);
        emitTrail(tipR);
      }
      for (let i = 0; i < TRAIL_N; i++) {
        const a = trailCol[i * 4 + 3];
        if (a <= 0) continue;
        trailCol[i * 4 + 3] = a - 1.4 * dt;
        trailPos[i * 3 + 2] += speed * 0.85 * dt;
      }
      trailGeo.attributes.position.needsUpdate = true;
      trailGeo.attributes.color.needsUpdate = true;

      // Combo-Decay (Balken als DOM-Write)
      if (comboTimer > 0) {
        comboTimer -= dt;
        if (comboTimer <= 0) {
          combo = 0;
          setMultStage(1);
        }
      }
      if (comboBarEl.current) {
        comboBarEl.current.style.transform = `scaleX(${Math.max(0, Math.min(1, comboTimer / 2.2))})`;
      }

      // Würfel
      if (playing) {
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
          spawnCube();
          spawnTimer = Math.max(0.55, 1.25 - hits * 0.02);
        }
      }
      for (const c of cubes) {
        if (c.dying > 0) {
          // Kill-Punch: kurz aufblähen, dann kollabieren
          c.dying -= dt;
          c.mesh.position.z += speed * dt * 1.15;
          const t = 1 - Math.max(0, c.dying) / 0.12;
          c.mesh.scale.setScalar(t < 0.35 ? 1 + t * 1.15 : Math.max(0.001, 1.4 * (1 - (t - 0.35) / 0.65)));
          if (c.dying <= 0) {
            c.mesh.visible = false;
            c.mesh.scale.setScalar(1);
          }
          continue;
        }
        if (!c.active) continue;
        c.mesh.position.z += speed * dt * 1.15;
        c.mesh.rotation.x += c.spin.x * dt;
        c.mesh.rotation.y += c.spin.y * dt;
        // Near-Miss: knapp am Flugzeug vorbei → Whoosh + Trostpunkte
        if (playing && !c.nearMissDone && Math.abs(c.mesh.position.z - plane.position.z) < 3) {
          const dx = c.mesh.position.x - plane.position.x;
          const dy = c.mesh.position.y - plane.position.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 36 && d2 > 6) {
            c.nearMissDone = true;
            shake = Math.max(shake, 0.2);
            sfxRef.current.whoosh();
            points += 25;
            setScore(points);
            popupAt(c.mesh.position, "+25 knapp!");
          }
        }
        if (c.mesh.position.z > 26) {
          c.active = false;
          c.mesh.visible = false;
          if (playing) {
            combo = 0;
            setMultStage(1);
            if (Math.random() < 0.2) pushToastRef.current(ESCAPE_LINES[(Math.random() * ESCAPE_LINES.length) | 0]);
          }
        }
      }

      // Schießen
      if (playing && firing && now - lastShot > 150) {
        lastShot = now;
        const b = bullets.find((b) => !b.active);
        if (b) {
          b.mesh.position.copy(plane.position).add(MUZZLE_OFFSET);
          b.active = true;
          b.mesh.visible = true;
          sfxRef.current.pew();
          muzzle.intensity = 90;
          flashMat.opacity = 0.9;
          flashMat.rotation = Math.random() * Math.PI;
          flash.scale.setScalar(1.4 + Math.random() * 0.6);
          plane.position.z += 0.12; // Recoil
          shake = Math.min(shake + 0.06, 1);
        }
      }
      muzzle.intensity *= Math.exp(-28 * dt);
      flashMat.opacity *= Math.exp(-24 * dt);

      for (const b of bullets) {
        if (!b.active) continue;
        // Swept-Kollision gegen das ganze Flugsegment dieses Frames —
        // verhindert Tunneling bei niedriger FPS.
        const prevZ = b.mesh.position.z;
        b.mesh.position.z -= 190 * dt;
        if (b.mesh.position.z < -300) {
          b.active = false;
          b.mesh.visible = false;
          continue;
        }
        for (const c of cubes) {
          if (!c.active) continue;
          const cz = c.mesh.position.z;
          if (cz > prevZ + 3.0 || cz < b.mesh.position.z - 3.0) continue;
          const dx = b.mesh.position.x - c.mesh.position.x;
          const dy = b.mesh.position.y - c.mesh.position.y;
          if (dx * dx + dy * dy < 6.2) {
            // --- Treffer ---
            c.active = false;
            c.dying = 0.12;
            b.active = false;
            b.mesh.visible = false;
            explode(c.mesh.position);
            hits++;
            combo++;
            comboTimer = 2.2;
            maxCombo = Math.max(maxCombo, combo);
            const stage = Math.min(1 + (combo >> 2), 5);
            setMultStage(stage);
            const gained = 100 * stage * (rollT > 0 ? 2 : 1);
            points += gained;
            setScore(points);
            popupAt(c.mesh.position, `+${gained}${rollT > 0 ? " Stil!" : ""}`);
            sfxRef.current.boom(1 + 0.12 * (stage - 1));
            shake = Math.min(shake + 0.55, 1);
            hitStop = 0.05;
            if (hits % 10 === 0) {
              cityGlow = 1;
              shake = Math.min(shake + 0.4, 1);
              sfxRef.current.fanfare();
              pushToastRef.current(
                MILESTONE_LINES[Math.min(hits / 10 - 1, MILESTONE_LINES.length - 1)],
                true
              );
            } else if (hits % 4 === 0) {
              pushToastRef.current(
                Math.random() < 0.5
                  ? HIT_LINES[(Math.random() * HIT_LINES.length) | 0]
                  : `Tschüss, „${c.text.length > 26 ? c.text.slice(0, 26) + "…" : c.text}“.`
              );
            }
            break;
          }
        }
      }

      // Explosions-Partikel
      for (const b of bursts) {
        if (!b.active) continue;
        b.life -= dt;
        if (b.life <= 0) {
          b.active = false;
          b.points.visible = false;
          continue;
        }
        const pos = (b.points.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
        for (let i = 0; i < pos.length / 3; i++) {
          pos[i * 3] += b.vel[i * 3] * dt;
          pos[i * 3 + 1] += (b.vel[i * 3 + 1] -= 22 * dt) * dt;
          pos[i * 3 + 2] += (b.vel[i * 3 + 2] + 40) * dt;
        }
        (b.points.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
        (b.points.material as THREE.PointsMaterial).opacity = b.life / 0.7;
      }
      // Schockwellen
      for (const w of shockwaves) {
        if (!w.active) continue;
        w.life -= dt;
        if (w.life <= 0) {
          w.active = false;
          w.mesh.visible = false;
          continue;
        }
        w.mesh.scale.addScalar(26 * dt);
        w.mesh.position.z += speed * dt;
        (w.mesh.material as THREE.MeshBasicMaterial).opacity = (w.life / 0.45) * 0.8;
      }

      doRender();
    };
    raf = requestAnimationFrame(tick);

    /* ---------- Cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        for (const mat of mats) {
          const anyMat = mat as THREE.MeshLambertMaterial;
          anyMat.map?.dispose();
          anyMat.emissiveMap?.dispose();
          mat.dispose();
        }
      });
      try {
        bloom.dispose();
        composer.dispose();
      } catch {
        /* r185: dispose vorhanden; defensive */
      }
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    sfxRef.current.ensure();
    startRef.current();
  };

  const share = () => {
    if (!over) return;
    const text = `Ich habe ${over.hits} Marketing-Floskeln über Frankfurt abgeschossen — ${over.points.toLocaleString("de-DE")} Punkte. Schaffst du mehr?`;
    const url = typeof window !== "undefined" ? window.location.origin + "/spiel" : "https://beuwy.com/spiel";
    if (navigator.share) {
      navigator.share({ title: "Die beuwy-Kanone", text, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${text} ${url}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
    }
  };

  return (
    <div ref={hostRef} className="bgame" style={{ touchAction: "none" }}>
      {/* Punkte-Popups: 8 gepoolte DOM-Elemente, via WAAPI animiert */}
      <div className="bgame-pops" aria-hidden>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="bgame-pop"
            ref={(el) => {
              popEls.current[i] = el;
            }}
          />
        ))}
      </div>

      {/* HUD */}
      {phase === "playing" && (
        <>
          <div className="bgame-hud-left">
            <span className="bgame-score-label">Klartext-Punkte</span>
            <span className="bgame-score">{score.toLocaleString("de-DE")}</span>
            <span className="bgame-combo" data-active={mult > 1} key={mult}>
              ×{mult}
              <span className="bgame-combo-track">
                <span className="bgame-combo-bar" ref={comboBarEl} />
              </span>
            </span>
          </div>
          <div className="bgame-timer">
            <span ref={timerEl}>{RUN_SECONDS}</span>
            <em>Sek</em>
          </div>
          <div className="bgame-toasts" aria-live="polite">
            {toasts.map((t) => (
              <p key={t.id} className={`bgame-toast${t.big ? " bgame-toast--big" : ""}`}>{t.text}</p>
            ))}
          </div>
          <button className="bgame-mute" onClick={() => setMuted((m) => !m)} aria-label="Ton an/aus">
            {muted ? "🔇" : "🔊"}
          </button>
          <div className="bgame-cta">
            <span>Deine Seite hat auch solche Sätze?</span>
            <Link href="/audit" className="btn-primary">Kostenlos prüfen <span aria-hidden>→</span></Link>
          </div>
        </>
      )}

      {/* Intro-Overlay */}
      {phase === "intro" && (
        <div className="bgame-overlay">
          <div className="bgame-overlay-card glass">
            <span className="eyebrow"><span className="num">/</span> Ein Spiel · 60 Sekunden</span>
            <h1 className="bgame-title">Die beuwy-Kanone</h1>
            <p className="bgame-sub">
              Über Frankfurt schweben Marketing-Floskeln und Boomer-Logos.
              Du hast 60 Sekunden. Schieß sie ab, bevor sie auf der nächsten Website landen.
            </p>
            <button className="btn-primary" onClick={start}>
              Los geht’s <span aria-hidden>→</span>
            </button>
            <p className="bgame-controls">
              Maus = fliegen · Klick / Leertaste = schießen · R = Barrel Roll (frag nicht)
            </p>
          </div>
        </div>
      )}

      {/* Ergebnis-Overlay: der emotionale Peak — hier wohnt der CTA */}
      {phase === "over" && over && (
        <div className="bgame-overlay">
          <div className="bgame-overlay-card glass">
            <span className="eyebrow"><span className="num">/</span> Schicht vorbei</span>
            {over.isRecord && <p className="bgame-record">Neuer Rekord!</p>}
            <p className="bgame-over-points">{over.points.toLocaleString("de-DE")}</p>
            <p className="bgame-over-meta">
              {over.hits} Floskeln entsorgt · längste Kette ×{Math.min(1 + (over.maxCombo >> 2), 5)}
              {!over.isRecord && <> · Bestwert {over.best.toLocaleString("de-DE")}</>}
            </p>
            <div className="bgame-over-buttons">
              <button className="btn-primary" onClick={start}>
                Nochmal <span aria-hidden>→</span>
              </button>
              <button className="btn-secondary" onClick={share}>
                {copied ? "Kopiert!" : "Ergebnis teilen"}
              </button>
            </div>
            <p className="bgame-sub" style={{ marginTop: 4 }}>
              {over.hits} Floskeln in 60 Sekunden. Deine Website räumen wir fast genauso schnell auf.
            </p>
            <Link href="/audit" className="btn-link">Website kostenlos prüfen →</Link>
          </div>
        </div>
      )}

      {/* Fallback ohne WebGL */}
      {phase === "fallback" && (
        <div className="bgame-overlay">
          <div className="bgame-overlay-card glass">
            <h1 className="bgame-title">Kein 3D in diesem Browser.</h1>
            <p className="bgame-sub">
              Macht nichts — das echte Aufräumen passiert sowieso hier:
            </p>
            <Link href="/audit" className="btn-primary">Website kostenlos prüfen <span aria-hidden>→</span></Link>
          </div>
        </div>
      )}
    </div>
  );
}
