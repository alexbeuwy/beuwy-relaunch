"use client";

/**
 * Die beuwy-Kanone — Endless-Flug über ein angedeutetes Frankfurt am Main.
 * Du fliegst, über der Stadt schweben Marketing-Floskeln und Boomer-Logos
 * auf Würfeln. Abschießen = eine Floskel weniger im Internet.
 *
 * Bewusst raw Three.js (kein react-three-fiber): eine Abhängigkeit weniger,
 * voller Zugriff auf Pooling/Dispose. Alles gepoolt (Gebäude, Würfel, Kugeln,
 * Partikel), keine Allokationen im Frame-Loop. Läuft nur client-side —
 * die Seite lädt das hier via dynamic({ ssr: false }).
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
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
      // Corporate-Beige der 2000er: Verlauf, Arial fett, Schlagschatten.
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
      // Mehrzeilig grob umbrechen
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
      // 90er-WordArt: Regenbogen-Verlauf, Kursiv, dicke Outline.
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
      x.setTransform(1, 0, -0.18, 1, 40, 0); // schräg wie WordArt
      x.strokeText(spec.text, S / 2, S / 2, S - 60);
      x.fillStyle = g;
      x.fillText(spec.text, S / 2, S / 2, S - 60);
      x.setTransform(1, 0, 0, 1, 0, 0);
      break;
    }
    case "starburst": {
      // Prospekt-Sternchen: gelber Stern auf Rot, "MEGA SALE!!!"
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
      // "Wir sind jetzt online!" — Drahtgitter-Globus wie 1999.
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
      // Frames-Ära: schwarzer Grund, giftgrüne Systemschrift, Laufschrift-Pfeile.
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

/** Fenster-Textur für Gebäude: dunkle Wand, zufällig erleuchtete Fenster. */
function makeWindowTexture(): THREE.CanvasTexture {
  const w = 128, h = 256;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  x.fillStyle = "#000000";
  x.fillRect(0, 0, w, h);
  for (let gy = 6; gy < h - 8; gy += 14) {
    for (let gx = 8; gx < w - 10; gx += 16) {
      if (Math.random() < 0.32) {
        x.fillStyle = `rgba(247,233,154,${0.35 + Math.random() * 0.65})`;
        x.fillRect(gx, gy, 8, 7);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* ------------------------------------------------------------------ */
/* Mini-Sound: pew + boom per WebAudio-Oszillator (kein Asset nötig)   */
/* ------------------------------------------------------------------ */

class Sfx {
  private ctx: AudioContext | null = null;
  muted = false;
  ensure() {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
      } catch {
        /* kein Audio — egal */
      }
    }
  }
  private blip(type: OscillatorType, f0: number, f1: number, dur: number, vol: number) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t);
    o.stop(t + dur);
  }
  pew() {
    this.blip("square", 880, 220, 0.09, 0.05);
  }
  boom() {
    this.blip("sawtooth", 140, 36, 0.3, 0.12);
  }
}

/* ------------------------------------------------------------------ */
/* Das Spiel                                                           */
/* ------------------------------------------------------------------ */

type Toast = { id: number; text: string };

export function BeuwyGame() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"intro" | "playing" | "fallback">("intro");
  const [score, setScore] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [muted, setMuted] = useState(false);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const sfxRef = useRef<Sfx>(new Sfx());
  sfxRef.current.muted = muted;
  const toastId = useRef(0);

  const pushToast = (text: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { id, text }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2200);
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /* ---------- Renderer (mit Fallback, wenn WebGL fehlt) ---------- */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setPhase("fallback");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const FOG = new THREE.Color("#1A0404");
    const scene = new THREE.Scene();
    scene.background = FOG;
    scene.fog = new THREE.Fog(FOG, 70, 340);

    const camera = new THREE.PerspectiveCamera(62, host.clientWidth / host.clientHeight, 0.1, 500);
    camera.position.set(0, 9, 20);
    camera.lookAt(0, 8, -60);

    scene.add(new THREE.HemisphereLight(0x3a2a1a, 0x120202, 1.1));
    const key = new THREE.DirectionalLight(0xf7e99a, 0.8);
    key.position.set(-40, 80, 30);
    scene.add(key);

    /* ---------- Boden, Main, Sterne ---------- */
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 900),
      new THREE.MeshLambertMaterial({ color: 0x150404 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.z = -300;
    scene.add(ground);

    const riverMat = new THREE.MeshBasicMaterial({ color: 0x11223a });
    const rivers: THREE.Mesh[] = [];
    for (let i = 0; i < 2; i++) {
      const r = new THREE.Mesh(new THREE.PlaneGeometry(500, 22), riverMat);
      r.rotation.x = -Math.PI / 2;
      r.position.set(0, 0.05, -150 - i * 300);
      scene.add(r);
      rivers.push(r);
    }

    {
      const n = 260;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 500;
        pos[i * 3 + 1] = 60 + Math.random() * 160;
        pos[i * 3 + 2] = -420 + Math.random() * 380;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xf7e99a, size: 0.7, transparent: true, opacity: 0.5 })));
    }

    /* ---------- Skyline (Pool, recycelt) — angedeutetes Frankfurt ---------- */
    const winTexes = [makeWindowTexture(), makeWindowTexture(), makeWindowTexture()];
    const wallMats = winTexes.map(
      (t) =>
        new THREE.MeshLambertMaterial({
          color: 0x2a0d0d,
          emissive: new THREE.Color(0xf7e99a),
          emissiveMap: t,
          emissiveIntensity: 0.55,
        })
    );
    const roofMat = new THREE.MeshLambertMaterial({ color: 0x1c0707 });
    const spireMat = new THREE.MeshLambertMaterial({ color: 0x241010, emissive: 0xf7e99a, emissiveIntensity: 0.08 });

    type Building = { grp: THREE.Group; box: THREE.Mesh; spire?: THREE.Mesh };
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
      // Messeturm-Gruß: Pyramidenspitze auf Landmark-Türmen
      if (b.spire) {
        b.spire.visible = landmark;
        b.spire.position.y = hei + 4;
        b.spire.scale.setScalar(landmark ? 1 : 0.001);
      }
      const t = winTexes[(Math.random() * winTexes.length) | 0];
      t.repeat.set(Math.max(1, Math.round(wid / 6)), Math.max(1, Math.round(hei / 12)));
      b.grp.position.set(xPos, 0, z);
    };

    for (let i = 0; i < 56; i++) {
      const grp = new THREE.Group();
      const box = new THREE.Mesh(buildingGeo, [roofMat, roofMat, roofMat, roofMat, roofMat, roofMat]);
      const spire = new THREE.Mesh(new THREE.ConeGeometry(3.4, 9, 4), spireMat);
      grp.add(box, spire);
      scene.add(grp);
      const b = { grp, box, spire };
      randomizeBuilding(b, -i * 11 - 10);
      buildings.push(b);
    }

    /* ---------- Spieler-Flugzeug (low-poly, Marken-Gelb) ---------- */
    const plane = new THREE.Group();
    {
      const yellow = new THREE.MeshLambertMaterial({ color: 0xf7e99a });
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

    /* ---------- Ziel-Würfel (Pool) ---------- */
    const targetTexes = TARGETS.map((t) => ({ spec: t, tex: makeTargetTexture(t) }));
    type Cube = { mesh: THREE.Mesh; active: boolean; text: string; spin: THREE.Vector3 };
    const cubes: Cube[] = [];
    const cubeGeo = new THREE.BoxGeometry(3.4, 3.4, 3.4);
    for (let i = 0; i < 14; i++) {
      const mesh = new THREE.Mesh(cubeGeo, new THREE.MeshLambertMaterial({ map: targetTexes[0].tex }));
      mesh.visible = false;
      scene.add(mesh);
      cubes.push({ mesh, active: false, text: "", spin: new THREE.Vector3() });
    }
    const spawnCube = () => {
      const c = cubes.find((c) => !c.active);
      if (!c) return;
      const pick = targetTexes[(Math.random() * targetTexes.length) | 0];
      (c.mesh.material as THREE.MeshLambertMaterial).map = pick.tex;
      (c.mesh.material as THREE.MeshLambertMaterial).needsUpdate = true;
      c.text = pick.spec.text;
      c.mesh.position.set((Math.random() - 0.5) * 30, 4 + Math.random() * 13, -330);
      c.spin.set((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 0.8);
      c.mesh.visible = true;
      c.active = true;
    };

    /* ---------- Kugeln (Pool) ---------- */
    type Bullet = { mesh: THREE.Mesh; active: boolean };
    const bullets: Bullet[] = [];
    const bulletGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const bulletMat = new THREE.MeshBasicMaterial({ color: 0xf7e99a });
    for (let i = 0; i < 24; i++) {
      const mesh = new THREE.Mesh(bulletGeo, bulletMat);
      mesh.visible = false;
      scene.add(mesh);
      bullets.push({ mesh, active: false });
    }

    /* ---------- Explosionen (Pool aus Points-Bursts) ---------- */
    type Burst = { points: THREE.Points; vel: Float32Array; life: number; active: boolean };
    const bursts: Burst[] = [];
    for (let i = 0; i < 8; i++) {
      const n = 42;
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      const m = new THREE.PointsMaterial({ color: 0xf7e99a, size: 0.55, transparent: true });
      const points = new THREE.Points(g, m);
      points.visible = false;
      scene.add(points);
      bursts.push({ points, vel: new Float32Array(n * 3), life: 0, active: false });
    }
    const explode = (at: THREE.Vector3) => {
      const b = bursts.find((b) => !b.active);
      if (!b) return;
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
    };

    /* ---------- Input ---------- */
    const target = new THREE.Vector2(0, 9);
    let firing = false;
    let lastShot = 0;

    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.x = nx * 16;
      target.y = THREE.MathUtils.clamp(10 - ny * 8, 2.5, 17.5);
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
    };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    const onResize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ---------- Loop ---------- */
    let raf = 0;
    let last = performance.now();
    let spawnTimer = 0;
    let hits = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (document.hidden) return;

      const playing = phaseRef.current === "playing";
      // Intro: Stadt zieht langsam vorbei. Spiel: volles Tempo, steigt mit Score.
      const speed = playing ? 46 + Math.min(hits * 0.8, 30) : 14;

      // Welt nach vorne schieben, hinter der Kamera recyceln
      for (const b of buildings) {
        b.grp.position.z += speed * dt;
        if (b.grp.position.z > 30) randomizeBuilding(b, b.grp.position.z - 620);
      }
      for (const r of rivers) {
        r.position.z += speed * dt;
        if (r.position.z > 40) r.position.z -= 600;
      }

      // Flugzeug lenken (weiches Nachziehen + Banking)
      plane.position.x += (target.x - plane.position.x) * Math.min(1, 7 * dt);
      plane.position.y += (target.y - plane.position.y) * Math.min(1, 7 * dt);
      plane.rotation.z = (plane.position.x - target.x) * 0.08;
      plane.rotation.x = (plane.position.y - target.y) * 0.04;
      camera.position.x = plane.position.x * 0.35;
      camera.position.y = 9 + (plane.position.y - 9) * 0.25;

      // Würfel
      if (playing) {
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
          spawnCube();
          spawnTimer = Math.max(0.55, 1.25 - hits * 0.02);
        }
      }
      for (const c of cubes) {
        if (!c.active) continue;
        c.mesh.position.z += speed * dt * 1.15;
        c.mesh.rotation.x += c.spin.x * dt;
        c.mesh.rotation.y += c.spin.y * dt;
        if (c.mesh.position.z > 26) {
          c.active = false;
          c.mesh.visible = false;
          if (playing && Math.random() < 0.25) pushToast(ESCAPE_LINES[(Math.random() * ESCAPE_LINES.length) | 0]);
        }
      }

      // Schießen
      if (playing && firing && now - lastShot > 150) {
        lastShot = now;
        const b = bullets.find((b) => !b.active);
        if (b) {
          b.mesh.position.copy(plane.position).add(new THREE.Vector3(0, -0.3, -2.8));
          b.active = true;
          b.mesh.visible = true;
          sfxRef.current.pew();
        }
      }
      for (const b of bullets) {
        if (!b.active) continue;
        // Swept-Kollision: bei niedriger FPS legt die Kugel pro Frame mehr
        // Strecke zurück als der Würfel breit ist — deshalb gegen das ganze
        // Flugsegment dieses Frames prüfen, nicht nur den Endpunkt.
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
          if (cz > prevZ + 2.4 || cz < b.mesh.position.z - 2.4) continue;
          const dx = b.mesh.position.x - c.mesh.position.x;
          const dy = b.mesh.position.y - c.mesh.position.y;
          if (dx * dx + dy * dy < 6.2) {
            c.active = false;
            c.mesh.visible = false;
            b.active = false;
            b.mesh.visible = false;
            explode(c.mesh.position);
            sfxRef.current.boom();
            hits++;
            setScore(hits);
            pushToast(
              hits % 3 === 0
                ? HIT_LINES[(Math.random() * HIT_LINES.length) | 0]
                : `Tschüss, „${c.text.length > 26 ? c.text.slice(0, 26) + "…" : c.text}“.`
            );
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
          pos[i * 3 + 2] += (b.vel[i * 3 + 2] + 40) * dt; // driftet mit der Welt
        }
        (b.points.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
        (b.points.material as THREE.PointsMaterial).opacity = b.life / 0.7;
      }

      renderer.render(scene, camera);
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
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    sfxRef.current.ensure();
    setPhase("playing");
  };

  return (
    <div ref={hostRef} className="bgame" style={{ touchAction: "none" }}>
      {/* HUD */}
      {phase === "playing" && (
        <>
          <div className="bgame-hud-left">
            <span className="bgame-score-label">Floskeln entsorgt</span>
            <span className="bgame-score">{score}</span>
          </div>
          <div className="bgame-toasts" aria-live="polite">
            {toasts.map((t) => (
              <p key={t.id} className="bgame-toast">{t.text}</p>
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
            <span className="eyebrow"><span className="num">/</span> Ein Spiel · 30 Sekunden Spaß</span>
            <h1 className="bgame-title">Die beuwy-Kanone</h1>
            <p className="bgame-sub">
              Über Frankfurt schweben Marketing-Floskeln und Boomer-Logos.
              Schieß sie ab, bevor sie auf der nächsten Website landen.
            </p>
            <button className="btn-primary" onClick={start}>
              Los geht’s <span aria-hidden>→</span>
            </button>
            <p className="bgame-controls">Maus bewegen = fliegen · Klick oder Leertaste = schießen</p>
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
