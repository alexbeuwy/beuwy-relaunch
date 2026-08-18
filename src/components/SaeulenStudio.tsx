"use client";

/* ----------------------------------------------------------------
   SAEULEN-STUDIO — „Drei Saeulen. Ein Umsatz."

   Die Buehne ist der Held. Drei massive Saeulen aus gestapelten
   Bausteinen tragen einen breiten Traeger. Wer eine Saeule anklickt,
   schaltet sie ab: die Bausteine kippen auseinander, ihre Farbe faellt
   auf stumpfes Ultramarin, der Traeger senkt sich auf dieser Seite
   und kippt sichtbar.

   Gerendert wird in Risographie: die Beleuchtung wird auf vier Stufen
   quantisiert, zwischen den Stufen blendet ein Punktraster im
   Bildschirmraum, ein Kanal wird um Bruchteile eines Pixels versetzt
   gedruckt, darueber liegt feines Korn. Fuenf Farben, sonst nichts.
   ---------------------------------------------------------------- */

import { useEffect, useMemo, useRef, useState } from "react";
import type * as ThreeNS from "three";

/* ── Palette — genau fuenf Farben ───────────────────────────────── */

const SKY = "#0C4BC3"; /* Himmel, Grund der Buehne */
const SKY_DEEP = "#0A3EA6"; /* Tiefen-Ultramarin */
const SNOW = "#FFFDF6"; /* Schnee */
const ORANGE = "#E8641F"; /* Berg-Orange */
const HILL = "#0B3D1C"; /* Huegel-Gruen, Sockel */

/* ── Inhalt ─────────────────────────────────────────────────────── */

export type Saeule = {
  key: string;
  title: string;
  claim: string;
  text: string;
  proof: string;
  without: string;
};

/* Tragfaehigkeit — feste Werte. Index = Anzahl stehender Saeulen. */
const TRAGKRAFT = [0, 25, 55, 100];

/* ── Bauplan: relative Hoehen und Breiten der Bausteine ─────────── */

const BAUPLAN: { hoehen: number[]; breiten: number[] }[] = [
  {
    hoehen: [1.14, 1.0, 0.96, 1.02, 0.9, 1.0],
    breiten: [1.86, 1.72, 1.76, 1.6, 1.68, 1.5],
  },
  {
    hoehen: [1.06, 0.96, 1.0, 0.92, 1.04, 0.96, 1.06],
    breiten: [1.92, 1.8, 1.7, 1.76, 1.62, 1.68, 1.54],
  },
  {
    hoehen: [1.0, 1.08, 0.94, 1.04, 0.96, 0.98],
    breiten: [1.84, 1.7, 1.76, 1.62, 1.68, 1.52],
  },
];

const SAEULEN_X = [-3.55, 0, 3.55];
const SOCKEL_H = 0.55;
const SOCKEL_B = 11.6;
const SOCKEL_T = 3.3;
const BAU_HOEHE = 4.05;
const FUGE = 0.045;
const TRAEGER_DICKE = 0.44;
const TRAEGER_SPANNE = 10.4;
const TRAEGER_TIEFE = 2.1;
const TRAEGER_Y = BAU_HOEHE + 0.14 + TRAEGER_DICKE / 2;
const TRAEGER_FALL = 3.2; /* Absenkung, wenn eine Seite ohne Stuetze ist */
const FUNKEN_JE_SAEULE = 30;

const KAM_Y = 2.45;
const KAM_Z = 13.7;
const BLICK_Y = 1.9;
const PARALLAXE = KAM_Z * 0.04; /* Zeiger bewegt die Kamera um ± 4 % */
const RASTER_CSS = 5.4; /* Punktabstand des Halbtons in CSS-Pixeln */

/* ================================================================
   GLSL
   ================================================================ */

/* Gemeinsame Riso-Werkzeuge: Rauschen, Punktraster, Bayer-Schwelle
   und die Quantisierung, die beide zusammenfuehrt. */
const GLSL_RISO = `
float sstHash(vec2 p){
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
float sstBayer2(vec2 a){
  a = floor(a);
  return fract(a.x * 0.5 + a.y * a.y * 0.75);
}
float sstBayer4(vec2 a){
  return sstBayer2(a * 0.5) * 0.25 + sstBayer2(a);
}
float sstPunkt(vec2 fc, float weite){
  float c = 0.70710678;
  vec2 p = vec2(fc.x * c - fc.y * c, fc.x * c + fc.y * c) * weite;
  return sin(p.x) * sin(p.y) * 0.5 + 0.5;
}
float sstSchwelle(vec2 fc, float weite){
  return mix(sstPunkt(fc, weite), sstBayer4(fc), 0.34);
}
float sstStufe(float v, float stufen, vec2 fc, float weite){
  float f = clamp(v, 0.0, 1.0) * stufen;
  float b = floor(f);
  float r = f - b;
  b += step(sstSchwelle(fc, weite), r);
  return clamp(b / stufen, 0.0, 1.0);
}
`;

const VERT_KOERPER = `
varying vec3 vNormale;
varying vec3 vBlick;
void main(){
  vNormale = normalize(mat3(modelMatrix) * normal);
  vec4 welt = modelMatrix * vec4(position, 1.0);
  vBlick = cameraPosition - welt.xyz;
  gl_Position = projectionMatrix * viewMatrix * welt;
}
`;

const FRAG_KOERPER = `
uniform vec3 uTief;
uniform vec3 uMitte;
uniform vec3 uHell;
uniform vec3 uSpitze;
uniform vec3 uAkzent;
uniform vec3 uLicht;
uniform vec2 uVersatz;
uniform float uKante;
uniform float uRaster;
uniform float uKorn;
varying vec3 vNormale;
varying vec3 vBlick;
${GLSL_RISO}
vec3 sstDruck(vec2 fc, float lum, float kante){
  float q = sstStufe(lum, 3.0, fc, uRaster);
  vec3 c = mix(uTief, uMitte, step(0.2, q));
  c = mix(c, uHell, step(0.5, q));
  c = mix(c, uSpitze, step(0.83, q));
  float k = sstStufe(kante, 2.0, fc + vec2(23.0, 9.0), uRaster * 1.4);
  return mix(c, uAkzent, k * uKante);
}
void main(){
  vec3 n = normalize(vNormale);
  vec3 b = normalize(vBlick);
  float lum = dot(n, normalize(uLicht)) * 0.5 + 0.5;
  lum = lum * 1.3 - 0.16;
  float kante = pow(1.0 - abs(dot(n, b)), 2.6);
  vec2 fc = gl_FragCoord.xy;
  /* Fehldruck: der rote Kanal sitzt einen Hauch daneben */
  vec3 a = sstDruck(fc + uVersatz, lum + 0.01, kante);
  vec3 c = sstDruck(fc, lum, kante);
  vec3 farbe = mix(c, vec3(a.r, c.g, c.b), 0.5);
  farbe = mix(farbe, uTief, sstHash(fc) * uKorn);
  gl_FragColor = vec4(farbe, 1.0);
}
`;

const VERT_QUAD = `
void main(){
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

const FRAG_HIMMEL = `
uniform vec2 uAufloesung;
uniform vec3 uHimmel;
uniform vec3 uTief;
uniform float uRaster;
${GLSL_RISO}
void main(){
  vec2 fc = gl_FragCoord.xy;
  float y = fc.y / max(1.0, uAufloesung.y);
  float q = sstStufe(0.56 + y * 0.56, 2.0, fc, uRaster * 0.72);
  vec3 c = mix(uTief, uHimmel, q);
  c = mix(c, uTief, sstHash(fc * 1.7) * 0.09);
  gl_FragColor = vec4(c, 1.0);
}
`;

const VERT_SONNE = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG_SONNE = `
uniform vec3 uSonne;
uniform vec3 uSchnee;
uniform vec3 uTief;
uniform float uRaster;
varying vec2 vUv;
${GLSL_RISO}
void main(){
  vec2 p = vUv * 2.0 - 1.0;
  float d = length(p);
  vec2 fc = gl_FragCoord.xy;
  float s = sstSchwelle(fc, uRaster * 0.82);
  if (d > 1.0 - 0.28 * s) discard;
  float h = sstStufe(0.44 + p.y * 0.46 + p.x * 0.08, 3.0, fc, uRaster);
  vec3 c = uSonne;
  c = mix(c, uSchnee, step(0.83, h));
  c = mix(uTief, c, step(0.17, h));
  c = mix(c, uTief, sstHash(fc) * 0.07);
  gl_FragColor = vec4(c, 1.0);
}
`;

const VERT_FUNKEN = `
attribute float aT;
attribute float aTempo;
attribute float aWinkel;
attribute float aRadius;
uniform float uZeit;
uniform float uBasis;
uniform float uHoehe;
uniform float uGroesse;
uniform float uDpr;
uniform float uStand;
varying float vT;
void main(){
  float t = fract(aT + uZeit * aTempo);
  float w = aWinkel + t * 1.6;
  vec3 p = vec3(cos(w) * aRadius, uBasis + t * uHoehe, sin(w) * aRadius);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uGroesse * uDpr * uStand * (14.0 / max(0.8, -mv.z));
  vT = t;
}
`;

const FRAG_FUNKEN = `
uniform vec3 uSchnee;
uniform vec3 uAkzent;
uniform float uStand;
varying float vT;
void main(){
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float d = dot(p, p);
  if (d > 0.86) discard;
  float a = uStand * (1.0 - vT * 0.5);
  if (a < 0.06) discard;
  vec3 c = mix(uSchnee, uAkzent, smoothstep(0.3, 0.95, vT));
  gl_FragColor = vec4(c, a);
}
`;

/* ================================================================
   Zustand, den die Szene jeden Frame liest
   ================================================================ */

type Wunsch = { an: boolean[]; aktiv: number };

type SzenenApi = {
  sync: () => void;
  setLaufend: (laufend: boolean) => void;
};

type Baustein = {
  mesh: ThreeNS.Mesh;
  x0: number;
  y0: number;
  ry0: number;
  ruheY: number;
  kipp: number;
  neige: number;
  dx: number;
  dz: number;
  start: number;
};

type SaeuleObjekt = {
  gruppe: ThreeNS.Group;
  bausteine: Baustein[];
  mat: ThreeNS.ShaderMaterial;
  funken: ThreeNS.ShaderMaterial;
};

/* Gedaempftes Annaehern — rahmenratenunabhaengig */
function naehere(ist: number, ziel: number, tempo: number, dt: number) {
  return ist + (ziel - ist) * (1 - Math.exp(-tempo * dt));
}

export function SaeulenStudio({
  saeulen,
  hint,
}: {
  saeulen: Saeule[];
  hint: string;
}) {
  const [an, setAn] = useState<boolean[]>([true, true, true]);
  const [aktiv, setAktiv] = useState(0);
  const [ausFolge, setAusFolge] = useState<string[]>([]);
  const [reduziert, setReduziert] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [imBild, setImBild] = useState(false);
  const [bereit, setBereit] = useState(false);

  const wurzelRef = useRef<HTMLDivElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  const wunschRef = useRef<Wunsch>({ an: [true, true, true], aktiv: 0 });
  const apiRef = useRef<SzenenApi | null>(null);
  const imBildRef = useRef(false);
  const zeigerRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(-1);
  const schaltenRef = useRef<(i: number) => void>(() => {});

  const sichtbare = saeulen.slice(0, 3);
  const stehend = an.filter(Boolean).length;
  const tragkraft = TRAGKRAFT[stehend] ?? 0;
  const aktiveSaeule = saeulen[aktiv] ?? saeulen[0];

  /* Zuletzt abgeschaltete Saeule, die noch aus ist */
  const zuletztAus = useMemo(() => {
    for (let i = ausFolge.length - 1; i >= 0; i -= 1) {
      const key = ausFolge[i];
      const idx = saeulen.findIndex((s) => s.key === key);
      if (idx >= 0 && an[idx] === false) return saeulen[idx];
    }
    const offen = saeulen.findIndex((_, i) => an[i] === false);
    return offen >= 0 ? saeulen[offen] : null;
  }, [ausFolge, an, saeulen]);

  const hinweis = stehend === 3 ? hint : (zuletztAus?.without ?? hint);

  /* ── Bewegung reduzieren ─────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lies = () => setReduziert(mq.matches);
    lies();
    mq.addEventListener("change", lies);
    return () => mq.removeEventListener("change", lies);
  }, []);

  /* ── Sichtbarkeit: erst im Viewport wird die Szene gebaut ─────── */
  useEffect(() => {
    const el = wurzelRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      imBildRef.current = true;
      setImBild(true);
      setBereit(true);
      return;
    }
    const obs = new IntersectionObserver(
      (eintraege) => {
        const sichtbar = eintraege.some((e) => e.isIntersecting);
        imBildRef.current = sichtbar;
        setImBild(sichtbar);
        if (sichtbar) setBereit(true);
      },
      { rootMargin: "140px 0px", threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Wunsch an die Szene weitergeben ─────────────────────────── */
  useEffect(() => {
    wunschRef.current = { an, aktiv };
    apiRef.current?.sync();
  }, [an, aktiv]);

  useEffect(() => {
    apiRef.current?.setLaufend(imBild);
  }, [imBild]);

  /* ============================================================
     THREE.JS — Riso-Buehne
     ============================================================ */

  useEffect(() => {
    if (!bereit || !webglOk) return;
    const host = hostRef.current;
    if (!host) return;

    let abgebrochen = false;
    let aufraeumen: (() => void) | null = null;

    const start = async () => {
      const THREE = await import("three");
      if (abgebrochen) return;

      let renderer: ThreeNS.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: false,
          powerPreference: "low-power",
        });
      } catch {
        setWebglOk(false);
        return;
      }

      const geos: ThreeNS.BufferGeometry[] = [];
      const mats: ThreeNS.Material[] = [];

      let breite = Math.max(1, host.clientWidth);
      let hoehe = Math.max(1, host.clientHeight);
      let dpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(dpr);
      renderer.setSize(breite, hoehe, false);
      renderer.setClearColor(new THREE.Color(SKY), 1);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(SKY);

      const camera = new THREE.PerspectiveCamera(33, breite / hoehe, 0.1, 160);
      camera.position.set(0, KAM_Y, KAM_Z);

      const welt = new THREE.Group();
      welt.rotation.y = -0.15;
      scene.add(welt);

      /* ── Farben als rohe sRGB-Werte: der Shader schreibt sie
         unveraendert in den Puffer, die Flaechen bleiben exakt ── */
      const farbe = (hex: string) => {
        const n = parseInt(hex.slice(1), 16);
        return new THREE.Vector3(
          ((n >> 16) & 255) / 255,
          ((n >> 8) & 255) / 255,
          (n & 255) / 255
        );
      };
      const mischung = (a: ThreeNS.Vector3, b: ThreeNS.Vector3, t: number) =>
        a.clone().lerp(b, t);

      const cSky = farbe(SKY);
      const cDeep = farbe(SKY_DEEP);
      const cSnow = farbe(SNOW);
      const cOrange = farbe(ORANGE);
      const cHill = farbe(HILL);

      /* Zwischentoene entstehen ausschliesslich aus diesen fuenf */
      const cDeepSky = mischung(cDeep, cSky, 0.55);
      const cHillHell = mischung(cHill, cSnow, 0.2);

      let rasterWeite = (Math.PI * 2) / (RASTER_CSS * dpr);

      /* ── Materialbau ───────────────────────────────────────────── */
      const koerperMaterial = (
        tief: ThreeNS.Vector3,
        mitte: ThreeNS.Vector3,
        hell: ThreeNS.Vector3,
        spitze: ThreeNS.Vector3,
        kante: number,
        korn: number
      ) => {
        const m = new THREE.ShaderMaterial({
          vertexShader: VERT_KOERPER,
          fragmentShader: FRAG_KOERPER,
          uniforms: {
            uTief: { value: tief.clone() },
            uMitte: { value: mitte.clone() },
            uHell: { value: hell.clone() },
            uSpitze: { value: spitze.clone() },
            uAkzent: { value: cOrange.clone() },
            uLicht: { value: new THREE.Vector3(-0.22, 0.86, 0.52) },
            uVersatz: { value: new THREE.Vector2(0.8 * dpr, -0.6 * dpr) },
            uKante: { value: kante },
            uRaster: { value: rasterWeite },
            uKorn: { value: korn },
          },
        });
        mats.push(m);
        return m;
      };

      /* ── Himmel: Vollbild-Quad, flach und gerastert ────────────── */
      const himmelGeo = new THREE.PlaneGeometry(2, 2);
      geos.push(himmelGeo);
      const matHimmel = new THREE.ShaderMaterial({
        vertexShader: VERT_QUAD,
        fragmentShader: FRAG_HIMMEL,
        uniforms: {
          uAufloesung: {
            value: new THREE.Vector2(breite * dpr, hoehe * dpr),
          },
          uHimmel: { value: cSky.clone() },
          uTief: { value: cDeep.clone() },
          uRaster: { value: rasterWeite },
        },
        depthTest: false,
        depthWrite: false,
      });
      mats.push(matHimmel);
      const himmel = new THREE.Mesh(himmelGeo, matHimmel);
      himmel.frustumCulled = false;
      himmel.renderOrder = -10;
      scene.add(himmel);

      /* ── Sonnenscheibe: zitiert den Berg des Hero ──────────────── */
      const sonneGeo = new THREE.PlaneGeometry(6.2, 6.2);
      geos.push(sonneGeo);
      const matSonne = new THREE.ShaderMaterial({
        vertexShader: VERT_SONNE,
        fragmentShader: FRAG_SONNE,
        uniforms: {
          uSonne: { value: cOrange.clone() },
          uSchnee: { value: cSnow.clone() },
          uTief: { value: cDeep.clone() },
          uRaster: { value: rasterWeite },
        },
        side: THREE.DoubleSide,
      });
      mats.push(matSonne);
      const sonne = new THREE.Mesh(sonneGeo, matSonne);
      sonne.position.set(1.55, 4.25, -7.0);
      welt.add(sonne);

      /* ── Sockelstreifen ────────────────────────────────────────── */
      const sockelGeo = new THREE.BoxGeometry(SOCKEL_B, SOCKEL_H, SOCKEL_T);
      geos.push(sockelGeo);
      const matSockel = koerperMaterial(
        cDeep,
        cHill,
        cHill,
        cHillHell,
        0.14,
        0.1
      );
      const sockel = new THREE.Mesh(sockelGeo, matSockel);
      sockel.position.y = -SOCKEL_H / 2;
      welt.add(sockel);

      /* ── Die drei Saeulen ──────────────────────────────────────── */
      const saeulen3d: SaeuleObjekt[] = [];
      const hitboxen: ThreeNS.Mesh[] = [];

      for (let s = 0; s < 3; s += 1) {
        const plan = BAUPLAN[s];
        const anzahl = plan.hoehen.length;
        const summe = plan.hoehen.reduce((a, b) => a + b, 0);
        const nutzhoehe = BAU_HOEHE - FUGE * (anzahl - 1);

        const mat = koerperMaterial(cDeep, cSky, cSnow, cSnow, 0.55, 0.11);

        const gruppe = new THREE.Group();
        gruppe.position.x = SAEULEN_X[s];
        welt.add(gruppe);

        const bausteine: Baustein[] = [];
        let y = 0;

        for (let i = 0; i < anzahl; i += 1) {
          const h = (plan.hoehen[i] / summe) * nutzhoehe;
          const b = plan.breiten[i];
          const geo = new THREE.BoxGeometry(b, h, b * 0.78);
          geos.push(geo);
          const mesh = new THREE.Mesh(geo, mat);

          /* leicht gegeneinander versetzt gestapelt */
          const seite = i % 2 === 0 ? 1 : -1;
          const x0 = seite * (0.05 + (i % 3) * 0.026);
          const ry0 = seite * 0.055;
          const yc = y + h / 2;
          mesh.position.set(x0, yc, 0);
          mesh.rotation.y = ry0;
          gruppe.add(mesh);

          const anteil = (i + 1) / anzahl;
          bausteine.push({
            mesh,
            x0,
            y0: yc,
            ry0,
            ruheY: h / 2 + 0.02 + (i % 3) * 0.05,
            kipp: seite * (0.5 + anteil * 0.82),
            neige: (i % 3 === 0 ? 0.22 : -0.18) * anteil,
            dx: seite * (0.4 + anteil * 1.65),
            dz: (i % 3 === 0 ? 0.46 : -0.36) * (0.5 + anteil),
            /* Die oberen Bausteine loesen sich zuerst */
            start: 0.4 * (1 - i / Math.max(1, anzahl - 1)),
          });

          y += h + FUGE;
        }

        /* Funkenstrom — steigt an der Saeule hoch in den Traeger */
        const anzahlF = FUNKEN_JE_SAEULE;
        const posF = new Float32Array(anzahlF * 3);
        const aT = new Float32Array(anzahlF);
        const aTempo = new Float32Array(anzahlF);
        const aWinkel = new Float32Array(anzahlF);
        const aRadius = new Float32Array(anzahlF);
        for (let j = 0; j < anzahlF; j += 1) {
          aT[j] = j / anzahlF;
          aTempo[j] = 0.16 + ((j + s) % 5) * 0.035;
          aWinkel[j] = (j * 2.399 + s * 1.1) % (Math.PI * 2);
          aRadius[j] = 1.08 + ((j + s * 2) % 4) * 0.17;
        }
        const funkenGeo = new THREE.BufferGeometry();
        funkenGeo.setAttribute(
          "position",
          new THREE.BufferAttribute(posF, 3)
        );
        funkenGeo.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
        funkenGeo.setAttribute("aTempo", new THREE.BufferAttribute(aTempo, 1));
        funkenGeo.setAttribute(
          "aWinkel",
          new THREE.BufferAttribute(aWinkel, 1)
        );
        funkenGeo.setAttribute(
          "aRadius",
          new THREE.BufferAttribute(aRadius, 1)
        );
        geos.push(funkenGeo);

        const matFunken = new THREE.ShaderMaterial({
          vertexShader: VERT_FUNKEN,
          fragmentShader: FRAG_FUNKEN,
          uniforms: {
            uZeit: { value: 0 },
            uBasis: { value: 0.12 },
            uHoehe: { value: BAU_HOEHE + 0.3 },
            uGroesse: { value: 5.4 },
            uDpr: { value: dpr },
            uStand: { value: 1 },
            uSchnee: { value: cSnow.clone() },
            uAkzent: { value: cOrange.clone() },
          },
          transparent: true,
          depthWrite: false,
        });
        mats.push(matFunken);
        const funken = new THREE.Points(funkenGeo, matFunken);
        funken.frustumCulled = false;
        funken.renderOrder = 4;
        funken.position.x = SAEULEN_X[s];
        welt.add(funken);

        /* Unsichtbare Hitbox — nur fuer den Raycaster */
        const hitGeo = new THREE.BoxGeometry(2.5, BAU_HOEHE + 0.4, 2.1);
        geos.push(hitGeo);
        const hitMat = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        mats.push(hitMat);
        const hit = new THREE.Mesh(hitGeo, hitMat);
        hit.visible = false;
        hit.position.set(SAEULEN_X[s], BAU_HOEHE / 2, 0);
        hit.userData.index = s;
        welt.add(hit);
        hitboxen.push(hit);

        saeulen3d.push({ gruppe, bausteine, mat, funken: matFunken });
      }

      /* ── Traeger ───────────────────────────────────────────────── */
      const traeger = new THREE.Group();
      traeger.position.y = TRAEGER_Y;
      welt.add(traeger);

      const matTraeger = koerperMaterial(cDeep, cSky, cSnow, cSnow, 0.3, 0.11);

      const traegerGeo = new THREE.BoxGeometry(
        TRAEGER_SPANNE,
        TRAEGER_DICKE,
        TRAEGER_TIEFE
      );
      geos.push(traegerGeo);
      traeger.add(new THREE.Mesh(traegerGeo, matTraeger));

      const gurtGeo = new THREE.BoxGeometry(
        TRAEGER_SPANNE - 1.1,
        0.17,
        TRAEGER_TIEFE - 0.55
      );
      geos.push(gurtGeo);
      const gurt = new THREE.Mesh(gurtGeo, matTraeger);
      gurt.position.y = -TRAEGER_DICKE / 2 - 0.36;
      traeger.add(gurt);

      /* Drei Stege verbinden Gurt und Traeger — der Umsatz haengt dran */
      for (let i = -1; i <= 1; i += 1) {
        const stegGeo = new THREE.BoxGeometry(0.19, 0.42, 0.4);
        geos.push(stegGeo);
        const steg = new THREE.Mesh(stegGeo, matTraeger);
        steg.position.set(i * 3.4, -TRAEGER_DICKE / 2 - 0.2, 0);
        traeger.add(steg);
      }

      /* ── Laufende Werte ────────────────────────────────────────── */
      const fall = [0, 0, 0];
      const fallV = [0, 0, 0];
      const aktivWert = [1, 0, 0];
      const hoverWert = [0, 0, 0];
      let traegerY = TRAEGER_Y;
      let traegerKipp = 0;
      let camX = 0;
      let camY = KAM_Y;
      let camZ = KAM_Z;
      let zeit = 0;

      const abstand = () => {
        const seite = breite / Math.max(1, hoehe);
        const weite = seite < 1.55 ? Math.min(1.3, 1.55 / seite) : 1;
        return KAM_Z * weite;
      };

      /* ── Ein Bild rechnen ──────────────────────────────────────── */
      const aktualisiere = (dt: number, sofort: boolean) => {
        const w = wunschRef.current;
        const hov = sofort ? -1 : hoverRef.current;

        for (let s = 0; s < 3; s += 1) {
          const ziel = w.an[s] === false ? 1 : 0;

          if (sofort) {
            fall[s] = ziel;
            fallV[s] = 0;
          } else {
            /* Gedaempfte Feder statt echter Physik */
            fallV[s] += (ziel - fall[s]) * 30 * dt;
            fallV[s] *= Math.exp(-7.6 * dt);
            fall[s] = Math.min(1.14, Math.max(0, fall[s] + fallV[s] * dt));
          }

          aktivWert[s] = sofort
            ? w.aktiv === s
              ? 1
              : 0
            : naehere(aktivWert[s], w.aktiv === s ? 1 : 0, 6.5, dt);
          hoverWert[s] = sofort
            ? 0
            : naehere(hoverWert[s], hov === s ? 1 : 0, 8, dt);

          const saeule = saeulen3d[s];
          const stand = Math.max(0, 1 - Math.min(1, fall[s]));

          for (const b of saeule.bausteine) {
            const spanne = Math.max(0.001, 1 - b.start);
            const lokal = Math.min(1, Math.max(0, (fall[s] - b.start) / spanne));
            const senken = lokal * lokal;
            b.mesh.position.y = b.y0 + (b.ruheY - b.y0) * senken;
            b.mesh.position.x = b.x0 + b.dx * lokal;
            b.mesh.position.z = b.dz * lokal;
            b.mesh.rotation.z = b.kipp * lokal;
            b.mesh.rotation.x = b.neige * lokal;
            b.mesh.rotation.y = b.ry0 + b.dz * lokal * 0.6;
          }

          /* Atmen der aktiven Saeule, minimales Heben beim Hover */
          const atem = sofort
            ? 0
            : aktivWert[s] * 0.015 * (1 + Math.sin(zeit * 1.5 + s * 0.8));
          saeule.gruppe.scale.setScalar(1 + atem * stand);
          saeule.gruppe.position.y = hoverWert[s] * 0.06 * stand;

          /* Palette der Saeule: Schnee im Stand, stumpfes Ultramarin
             im Fall — beides aus derselben Fuenf-Farben-Kiste */
          const u = saeule.mat.uniforms;
          u.uMitte.value.copy(cDeep).lerp(cSky, stand);
          u.uHell.value.copy(cDeepSky).lerp(cSnow, stand);
          u.uSpitze.value.copy(cSky).lerp(cSnow, stand);
          u.uKante.value = 0.55 * stand + aktivWert[s] * 0.45;

          saeule.funken.uniforms.uStand.value = Math.max(
            0,
            stand * 1.25 - 0.25
          );
          saeule.funken.uniforms.uZeit.value = zeit;
        }

        /* Der Traeger sackt dort ab, wo die Stuetze fehlt */
        const st0 = Math.max(0, 1 - Math.min(1, fall[0]));
        const st1 = Math.max(0, 1 - Math.min(1, fall[1]));
        const st2 = Math.max(0, 1 - Math.min(1, fall[2]));
        const stuetzeL = Math.min(1, st0 + 0.38 * st1);
        const stuetzeR = Math.min(1, st2 + 0.38 * st1);
        const gesamt = (st0 + st1 + st2) / 3;
        const yL = TRAEGER_Y - (1 - stuetzeL) * TRAEGER_FALL;
        const yR = TRAEGER_Y - (1 - stuetzeR) * TRAEGER_FALL;
        let zielY = (yL + yR) / 2 - (1 - st1) * 0.42;
        let zielKipp = Math.atan2(yR - yL, TRAEGER_SPANNE);
        if (!sofort) {
          const wanken = Math.min(1, 1 - gesamt + (1 - Math.max(st0, st2)) * 0.5);
          zielKipp += Math.sin(zeit * 0.85) * 0.045 * wanken;
          zielY += Math.sin(zeit * 1.15) * 0.07 * wanken;
        }
        traegerY = sofort ? zielY : naehere(traegerY, zielY, 3.4, dt);
        traegerKipp = sofort ? zielKipp : naehere(traegerKipp, zielKipp, 3.4, dt);
        traeger.position.y = traegerY;
        traeger.rotation.z = traegerKipp;

        const tu = matTraeger.uniforms;
        tu.uKante.value = 0.24 + (1 - gesamt) * 0.62;
        tu.uHell.value.copy(cDeepSky).lerp(cSnow, 0.42 + gesamt * 0.58);
        tu.uSpitze.value.copy(cSky).lerp(cSnow, 0.35 + gesamt * 0.65);

        /* Kamera: sanfte Drift plus Zeiger-Parallaxe */
        const zZiel = abstand();
        if (sofort) {
          camX = 0;
          camY = KAM_Y;
          camZ = zZiel;
        } else {
          const xZiel =
            zeigerRef.current.x * PARALLAXE + Math.sin(zeit * 0.15) * 0.32;
          const yZiel =
            KAM_Y - zeigerRef.current.y * 0.3 + Math.sin(zeit * 0.11) * 0.15;
          camX = naehere(camX, xZiel, 2.2, dt);
          camY = naehere(camY, yZiel, 2.2, dt);
          camZ = naehere(camZ, zZiel, 3, dt);
        }
        camera.position.set(camX, camY, camZ);
        camera.lookAt(0, BLICK_Y, 0);
      };

      const statischesBild = () => {
        zeit = 0;
        aktualisiere(0, true);
        renderer.render(scene, camera);
      };

      /* ── Schleife ──────────────────────────────────────────────── */
      let raf = 0;
      let laufend = false;
      let letzterFrame = 0;
      let dokVerborgen =
        typeof document !== "undefined" ? document.hidden : false;

      const frame = (t: number) => {
        const dt = Math.min(0.05, (t - letzterFrame) / 1000);
        letzterFrame = t;
        zeit += dt;
        aktualisiere(dt, false);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };

      const starteSchleife = () => {
        if (laufend || reduziert || dokVerborgen || !imBildRef.current) return;
        laufend = true;
        letzterFrame =
          typeof performance !== "undefined" ? performance.now() : 0;
        raf = requestAnimationFrame(frame);
      };

      const stoppeSchleife = () => {
        laufend = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      };

      /* ── Groesse ───────────────────────────────────────────────── */
      const messe = () => {
        breite = Math.max(1, host.clientWidth);
        hoehe = Math.max(1, host.clientHeight);
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        rasterWeite = (Math.PI * 2) / (RASTER_CSS * dpr);
        camera.aspect = breite / hoehe;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(dpr);
        renderer.setSize(breite, hoehe, false);
        matHimmel.uniforms.uAufloesung.value.set(breite * dpr, hoehe * dpr);
        matHimmel.uniforms.uRaster.value = rasterWeite;
        matSonne.uniforms.uRaster.value = rasterWeite;
        for (const m of mats) {
          const sm = m as ThreeNS.ShaderMaterial;
          if (!sm.uniforms) continue;
          if (sm.uniforms.uRaster) sm.uniforms.uRaster.value = rasterWeite;
          if (sm.uniforms.uVersatz) {
            sm.uniforms.uVersatz.value.set(0.8 * dpr, -0.6 * dpr);
          }
          if (sm.uniforms.uDpr) sm.uniforms.uDpr.value = dpr;
        }
        if (!laufend) {
          camera.position.z = abstand();
          camera.lookAt(0, BLICK_Y, 0);
          renderer.render(scene, camera);
        }
      };

      let ro: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(messe);
        ro.observe(host);
      }
      window.addEventListener("resize", messe);

      /* ── Zeiger: Parallaxe, Hover, Klick auf die Saeule ────────── */
      const strahl = new THREE.Raycaster();
      const ndc = new THREE.Vector2();

      const getroffen = (e: PointerEvent | MouseEvent) => {
        const r = host.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return -1;
        ndc.set(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          -((e.clientY - r.top) / r.height) * 2 + 1
        );
        camera.updateMatrixWorld();
        welt.updateMatrixWorld(true);
        strahl.setFromCamera(ndc, camera);
        const treffer = strahl.intersectObjects(hitboxen, false);
        if (treffer.length === 0) return -1;
        const idx = treffer[0].object.userData.index;
        return typeof idx === "number" ? idx : -1;
      };

      const aufZeiger = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && e.pointerType !== "touch") {
          zeigerRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
          zeigerRef.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
        }
        const idx = getroffen(e);
        hoverRef.current = idx;
        host.style.cursor = idx >= 0 ? "pointer" : "default";
      };

      const aufZeigerRaus = () => {
        zeigerRef.current.x = 0;
        zeigerRef.current.y = 0;
        hoverRef.current = -1;
        host.style.cursor = "default";
      };

      const aufKlick = (e: MouseEvent) => {
        const idx = getroffen(e);
        if (idx >= 0) schaltenRef.current(idx);
      };

      host.addEventListener("pointermove", aufZeiger);
      host.addEventListener("pointerleave", aufZeigerRaus);
      host.addEventListener("click", aufKlick);

      const aufSichtbarkeit = () => {
        dokVerborgen = document.hidden;
        if (dokVerborgen) stoppeSchleife();
        else starteSchleife();
      };
      document.addEventListener("visibilitychange", aufSichtbarkeit);

      apiRef.current = {
        sync: () => {
          if (reduziert) statischesBild();
        },
        setLaufend: (l: boolean) => {
          if (l) starteSchleife();
          else stoppeSchleife();
        },
      };

      if (reduziert) {
        statischesBild();
      } else {
        aktualisiere(0, true);
        starteSchleife();
        if (!laufend) renderer.render(scene, camera);
      }

      aufraeumen = () => {
        stoppeSchleife();
        apiRef.current = null;
        document.removeEventListener("visibilitychange", aufSichtbarkeit);
        window.removeEventListener("resize", messe);
        host.removeEventListener("pointermove", aufZeiger);
        host.removeEventListener("pointerleave", aufZeigerRaus);
        host.removeEventListener("click", aufKlick);
        ro?.disconnect();
        geos.forEach((g) => g.dispose());
        mats.forEach((m) => m.dispose());
        scene.clear();
        renderer.dispose();
        renderer.forceContextLoss();
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      };
    };

    void start();

    return () => {
      abgebrochen = true;
      aufraeumen?.();
      aufraeumen = null;
    };
  }, [bereit, reduziert, webglOk]);

  /* ============================================================
     ANZEIGE
     ============================================================ */

  const schalten = (i: number) => {
    const key = saeulen[i]?.key ?? String(i);
    const kuenftigAn = an[i] === false;
    setAktiv(i);
    setAn((vorher) => vorher.map((v, k) => (k === i ? !v : v)));
    setAusFolge((vorher) => {
      const ohne = vorher.filter((k) => k !== key);
      return kuenftigAn ? ohne : [...ohne, key];
    });
  };

  useEffect(() => {
    schaltenRef.current = schalten;
  });

  return (
    <div ref={wurzelRef} className="w-full">
      <style dangerouslySetInnerHTML={{ __html: STUDIO_CSS }} />

      {/* ── Buehne ──────────────────────────────────────────────── */}
      <div className="sst-buehne">
        {webglOk ? (
          <div ref={hostRef} aria-hidden="true" className="sst-flaeche" />
        ) : (
          <ul className="sst-notliste">
            {sichtbare.map((s, i) => (
              <li key={s.key} className="sst-notzeile">
                <span className="tnum sst-notnummer">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="sst-nottitel"
                  data-ein={an[i] !== false ? "true" : "false"}
                >
                  {s.title}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="sst-kraft" aria-live="polite">
          <span className="sst-kraft-label">Tragfähigkeit</span>
          <span className="sst-kraft-wert" data-voll={stehend === 3 ? "true" : "false"}>
            <span key={tragkraft} className="tnum sst-kraft-zahl">
              {tragkraft}
            </span>
            <span className="sst-kraft-proz">%</span>
          </span>
        </div>
      </div>

      {/* ── Beschriftung im Bild: die Saeulen selbst sind die Schalter ── */}
      <div className="sst-labels">
        {sichtbare.map((s, i) => {
          const ein = an[i] !== false;
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={ein}
              onClick={() => schalten(i)}
              onPointerEnter={() => {
                hoverRef.current = i;
              }}
              onPointerLeave={() => {
                hoverRef.current = -1;
              }}
              onFocus={() => {
                hoverRef.current = i;
              }}
              onBlur={() => {
                hoverRef.current = -1;
              }}
              className="sst-label"
              data-ein={ein ? "true" : "false"}
              data-aktiv={aktiv === i ? "true" : "false"}
              style={{ "--sst-i": i } as React.CSSProperties}
            >
              <span className="sst-label-titel">{s.title}</span>
              <span className="sst-label-zustand">
                <span aria-hidden="true" className="sst-punkt" />
                {ein ? "an" : "aus"}
              </span>
            </button>
          );
        })}
      </div>

      <p key={hinweis} className="sst-swap sst-hinweis">
        {hinweis}
      </p>

      {/* ── Detail der aktiven Saeule ────────────────────────────── */}
      <div className="sst-detail">
        <div key={aktiveSaeule?.key ?? "leer"} className="sst-swap">
          <h3 className="sst-detail-titel">{aktiveSaeule?.title}</h3>
          <p className="sst-detail-claim">{aktiveSaeule?.claim}</p>
          <p className="sst-detail-text">{aktiveSaeule?.text}</p>
          <span className="sst-beleg">
            <span aria-hidden="true" className="sst-punkt-beleg" />
            {aktiveSaeule?.proof}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   CSS-Insel — Zeiten und Wege kommen ausschliesslich aus den
   Motion-Variablen in globals.css.
   ---------------------------------------------------------------- */

const STUDIO_CSS = `
.sst-buehne{position:relative;height:380px;overflow:hidden;border-radius:18px;background:#0C4BC3;border:1px solid rgba(255,253,246,0.18);}
@media (min-width:768px){.sst-buehne{height:min(70dvh,620px);}}
.sst-flaeche{position:absolute;inset:0;}
.sst-notliste{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:16px;padding:0 32px;}
.sst-notzeile{display:flex;align-items:baseline;gap:14px;font-size:16px;line-height:1.4;}
.sst-notnummer{color:rgba(255,253,246,0.5);}
.sst-nottitel{color:#FFFDF6;font-weight:600;}
.sst-nottitel[data-ein="false"]{color:rgba(255,253,246,0.46);font-weight:400;}
.sst-kraft{position:absolute;left:18px;bottom:16px;display:flex;flex-direction:column;align-items:flex-start;pointer-events:none;}
@media (min-width:768px){.sst-kraft{left:auto;bottom:auto;top:24px;right:28px;align-items:flex-end;}}
.sst-kraft-label{font-size:11px;font-weight:600;letter-spacing:0.09em;text-transform:uppercase;color:rgba(255,253,246,0.68);}
.sst-kraft-wert{display:flex;align-items:baseline;gap:2px;margin-top:5px;color:#FFFDF6;}
.sst-kraft-wert[data-voll="false"]{color:#E8641F;}
.sst-kraft-zahl{font-size:44px;line-height:0.92;font-weight:600;letter-spacing:-0.02em;display:inline-block;animation:sst-tausch var(--duration-quick) var(--ease-in-out) both;}
.sst-kraft-proz{font-size:19px;line-height:1;font-weight:600;}
@media (min-width:768px){.sst-kraft-zahl{font-size:60px;}.sst-kraft-proz{font-size:24px;}}
.sst-labels{display:grid;grid-template-columns:1fr;gap:10px;margin-top:12px;}
@media (min-width:640px){.sst-labels{grid-template-columns:repeat(3,1fr);gap:14px;}}
.sst-label{display:flex;width:100%;min-height:44px;align-items:center;justify-content:space-between;gap:12px;padding:11px 15px;border-radius:12px;text-align:left;background:transparent;border:1px solid rgba(255,253,246,0.2);cursor:pointer;transition:border-color var(--duration-fast) var(--ease-smooth-out),background-color var(--duration-fast) var(--ease-smooth-out),color var(--duration-fast) var(--ease-smooth-out);animation:sst-auf var(--duration-quick) var(--ease-smooth-out) both;animation-delay:calc(var(--duration-stagger) * var(--sst-i, 0));}
.sst-label:hover{background:rgba(255,253,246,0.07);}
.sst-label:focus-visible{outline:2px solid #E8641F;outline-offset:3px;}
.sst-label-titel{font-size:15px;font-weight:600;letter-spacing:-0.01em;line-height:1.25;color:rgba(255,253,246,0.55);transition:color var(--duration-fast) var(--ease-smooth-out);}
.sst-label-zustand{display:inline-flex;align-items:center;gap:7px;font-size:12px;line-height:1;white-space:nowrap;color:rgba(255,253,246,0.45);transition:color var(--duration-fast) var(--ease-smooth-out);}
.sst-punkt{width:8px;height:8px;border-radius:50%;background:rgba(255,253,246,0.3);transition:background-color var(--duration-fast) var(--ease-smooth-out);}
.sst-label[data-ein="true"]{border-color:rgba(255,253,246,0.4);}
.sst-label[data-ein="true"] .sst-label-titel{color:#FFFDF6;}
.sst-label[data-ein="true"] .sst-label-zustand{color:rgba(255,253,246,0.72);}
.sst-label[data-ein="true"] .sst-punkt{background:#FFFDF6;}
.sst-label[data-aktiv="true"]{border-color:#E8641F;background:rgba(232,100,31,0.1);}
.sst-label[data-aktiv="true"] .sst-punkt{background:#E8641F;}
.sst-hinweis{margin-top:14px;max-width:64ch;font-size:13.5px;line-height:1.55;color:rgba(255,253,246,0.68);}
.sst-detail{margin-top:20px;border-radius:14px;padding:24px;background:rgba(255,253,246,0.05);border:1px solid rgba(255,253,246,0.16);}
.sst-detail-titel{font-size:19px;line-height:1.35;font-weight:600;color:#FFFDF6;}
.sst-detail-claim{margin-top:8px;font-size:17px;line-height:1.45;font-weight:500;color:#E8641F;}
.sst-detail-text{margin-top:12px;max-width:68ch;font-size:15.5px;line-height:1.65;color:rgba(255,253,246,0.78);}
.sst-beleg{display:inline-flex;align-items:center;gap:8px;margin-top:14px;font-size:12.5px;letter-spacing:0.02em;line-height:1.3;color:rgba(255,253,246,0.6);}
.sst-punkt-beleg{width:7px;height:7px;border-radius:50%;background:#0C4BC3;box-shadow:0 0 0 1px rgba(255,253,246,0.45);flex:none;}
@keyframes sst-auf{from{opacity:0;transform:translateY(var(--distance-base));}to{opacity:1;transform:none;}}
@keyframes sst-tausch{from{opacity:0;transform:translateY(var(--distance-micro));filter:blur(var(--blur-small));}to{opacity:1;transform:none;filter:blur(0);}}
.sst-swap{animation:sst-tausch var(--duration-quick) var(--ease-in-out) both;}
@media (prefers-reduced-motion: reduce){
.sst-label,.sst-swap,.sst-kraft-zahl{animation:none;}
.sst-label,.sst-label-titel,.sst-label-zustand,.sst-punkt{transition:none;}
}
`;

export default SaeulenStudio;
