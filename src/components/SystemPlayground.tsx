"use client";

/* ----------------------------------------------------------------
   SYSTEM-SPIELFELD — das interaktive Herzstueck der dunkelgruenen
   Buehne. Links eine reine Wireframe-Szene: Leads fliessen als
   Partikel ueber eine geschwungene Bahn durch vier Stationen. Wer
   eine Station abschaltet, sieht die Leads von der Bahn kippen.
   Rechts drehen Regler und Schalter an derselben Mechanik, mit der
   das Zahlen-Panel rechnet.

   Riso-Regeln: flache Flaechen, keine Lichter, keine Texturen, kein
   Verlauf. Die Szene besteht ausschliesslich aus Linien.
   ---------------------------------------------------------------- */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type * as ThreeNS from "three";

import {
  AnzeigenSurface,
  MarkeSurface,
  VertriebSurface,
  ZahlenSurface,
} from "@/components/ModuleSurfaces";

/* ── Palette der Buehne ─────────────────────────────────────────── */

const HILL = "#06150A"; /* Huegel-Gruen — Grund der Sektion */
const SNOW = "#FFFDF6"; /* Schnee — Hauptstruktur der Linien */
const RAIL = "#4C7DFF"; /* helles Ultramarin — Bahn und Leitungen */
const ORANGE = "#E8641F"; /* aktive Station, Abschluss, Akzent */

const KONFETTI_FARBEN = ["#0C4BC3", "#E8641F", "#FFFDF6", "#3FA34D"];

/* ── Regler ─────────────────────────────────────────────────────── */

const BUDGET_MIN = 500;
const BUDGET_MAX = 10_000;
const BUDGET_STEP = 250;
const BUDGET_START = 3_500;

/* ── Zahlen deutsch, tabellarisch ───────────────────────────────── */

const nf0 = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function ganz(wert: number) {
  return nf0.format(Math.round(wert));
}

function euro(wert: number) {
  /* Geschuetztes Leerzeichen: Zahl und Zeichen brechen nie um */
  return `${nf0.format(Math.round(wert))} €`;
}

/* ── Die Beispielmechanik — deterministisch, ohne Zufall ─────────── */

type Werte = {
  cpl: number;
  anfragen: number;
  termine: number;
  abschluesse: number;
  umsatz: number;
  /* Durchlass-Quote je Station — die Szene zeigt dieselben Faktoren */
  durchlass: [number, number, number, number];
};

function berechne(budget: number, an: boolean[]): Werte {
  let cpl = 60;
  if (an[1]) {
    cpl = 38;
    if (an[3]) cpl *= 0.85;
  }

  const anfragenRoh = budget / cpl;
  const conv = an[0] ? 0.42 : 0.22;
  const loss = an[2] ? 0.95 : 0.55;
  const termineRoh = anfragenRoh * conv * loss;
  const abschluesseRoh = termineRoh * 0.33;
  const umsatzRoh = abschluesseRoh * 9500;

  return {
    cpl,
    anfragen: anfragenRoh,
    termine: termineRoh,
    abschluesse: abschluesseRoh,
    umsatz: umsatzRoh,
    durchlass: [
      an[0] ? 1 : 0.5,
      an[1] ? 0.97 : 0.55,
      an[2] ? 0.95 : 0.55,
      an[3] ? 1 : 0.6,
    ],
  };
}

/* ── Stationen: Position auf der Buehne + Hoehe der Bahn darueber ── */

const STATIONEN: { x: number; z: number; tor: number }[] = [
  { x: -4.3, z: 0.9, tor: 1.72 },
  { x: -1.5, z: -0.7, tor: 2.3 },
  { x: 1.5, z: 0.6, tor: 1.26 },
  { x: 4.3, z: -0.8, tor: 1.6 },
];

const SURFACES = [
  MarkeSurface,
  AnzeigenSurface,
  VertriebSurface,
  ZahlenSurface,
] as const;

const MAX_PARTIKEL = 380;
const BAHN_STUETZEN = 480;

/* Kleiner deterministischer Zufall — nur fuer die Optik, nie fuer Zahlen */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Zustandswunsch, den die Szene jeden Frame liest ─────────────── */

type SzenenWunsch = {
  aktiv: number;
  an: boolean[];
  anfragen: number;
  durchlass: [number, number, number, number];
};

type SzenenApi = {
  sync: () => void;
  setLaufend: (laufend: boolean) => void;
};

/* ── Konfetti-Teilchen ──────────────────────────────────────────── */

type Konfetti = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  b: number;
  h: number;
  farbe: string;
  alter: number;
  dauer: number;
};

export function SystemPlayground({
  modules,
}: {
  modules: { title: string; text: string }[];
}) {
  const [budget, setBudget] = useState(BUDGET_START);
  const [an, setAn] = useState<boolean[]>([true, true, true, true]);
  const [aktiv, setAktiv] = useState(0);
  const [reduziert, setReduziert] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [imBild, setImBild] = useState(false);
  const [bereit, setBereit] = useState(false);

  const buehneRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const konfettiRef = useRef<HTMLCanvasElement | null>(null);

  const werte = useMemo(() => berechne(budget, an), [budget, an]);

  const wunschRef = useRef<SzenenWunsch>({
    aktiv: 0,
    an: [true, true, true, true],
    anfragen: berechne(BUDGET_START, [true, true, true, true]).anfragen,
    durchlass: [1, 0.97, 0.95, 1],
  });
  const apiRef = useRef<SzenenApi | null>(null);
  const imBildRef = useRef(false);
  const zeigerRef = useRef({ x: 0, y: 0 });

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
    const el = buehneRef.current;
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
      { rootMargin: "120px 0px", threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Wunsch an die Szene weitergeben ─────────────────────────── */
  useEffect(() => {
    wunschRef.current = {
      aktiv,
      an,
      anfragen: werte.anfragen,
      durchlass: werte.durchlass,
    };
    apiRef.current?.sync();
  }, [aktiv, an, werte]);

  useEffect(() => {
    apiRef.current?.setLaufend(imBild);
  }, [imBild]);

  /* ============================================================
     KONFETTI — eigener 2D-Overlay, kein Dauer-Loop
     ============================================================ */

  const konfState = useRef({
    teile: [] as Konfetti[],
    raf: 0,
    letzterFrame: 0,
    letzterBurst: 0,
    breite: 0,
    hoehe: 0,
  });

  const burst = useCallback(() => {
    if (reduziert) return;
    const canvas = konfettiRef.current;
    if (!canvas) return;
    const s = konfState.current;
    const jetzt =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    if (jetzt - s.letzterBurst < 800) return;
    s.letzterBurst = jetzt;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (s.teile.length === 0) {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.breite = Math.max(1, Math.round(rect.width));
      s.hoehe = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(s.breite * dpr);
      canvas.height = Math.round(s.hoehe * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const anzahl = 60 + Math.floor(Math.random() * 31); /* 60–90 */
    for (let i = 0; i < anzahl; i += 1) {
      const winkel = (-115 + Math.random() * 70) * (Math.PI / 180);
      const tempo = 320 + Math.random() * 320;
      s.teile.push({
        x: s.breite * (0.28 + Math.random() * 0.44),
        y: s.hoehe * (0.56 + Math.random() * 0.16),
        vx: Math.cos(winkel) * tempo,
        vy: Math.sin(winkel) * tempo,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 18,
        b: 5 + Math.random() * 6,
        h: 2 + Math.random() * 5,
        farbe:
          KONFETTI_FARBEN[Math.floor(Math.random() * KONFETTI_FARBEN.length)] ??
          ORANGE,
        alter: 0,
        dauer: 1.25 + Math.random() * 0.3,
      });
    }

    if (s.raf) return;
    s.letzterFrame = jetzt;

    const schritt = (t: number) => {
      const dt = Math.min(0.05, (t - s.letzterFrame) / 1000);
      s.letzterFrame = t;
      ctx.clearRect(0, 0, s.breite, s.hoehe);

      let lebend = 0;
      for (const p of s.teile) {
        p.alter += dt;
        if (p.alter >= p.dauer) continue;
        lebend += 1;
        p.vy += 900 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        const rest = p.dauer - p.alter;
        const alpha = rest < 0.45 ? Math.max(0, rest / 0.45) : 1;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.farbe;
        ctx.fillRect(-p.b / 2, -p.h / 2, p.b, p.h);
        ctx.restore();
      }

      if (lebend === 0) {
        s.teile = [];
        s.raf = 0;
        ctx.clearRect(0, 0, s.breite, s.hoehe);
        return;
      }
      s.teile = s.teile.filter((p) => p.alter < p.dauer);
      s.raf = requestAnimationFrame(schritt);
    };

    s.raf = requestAnimationFrame(schritt);
  }, [reduziert]);

  useEffect(
    () => () => {
      const s = konfState.current;
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.teile = [];
    },
    []
  );

  /* Auslöser: ganzzahlige Schwelle bei Abschluessen, 80 % am Regler */
  const letzteAbschluesse = useRef(werte.abschluesse);
  const warUeber80 = useRef(
    (BUDGET_START - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN) > 0.8
  );

  useEffect(() => {
    const vorher = letzteAbschluesse.current;
    letzteAbschluesse.current = werte.abschluesse;
    const anteil = (budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN);
    const jetztUeber80 = anteil > 0.8;
    const schwelleGerissen =
      Math.floor(werte.abschluesse) > Math.floor(vorher) &&
      werte.abschluesse > vorher;
    const reglerGerissen = jetztUeber80 && !warUeber80.current;
    warUeber80.current = jetztUeber80;
    if (schwelleGerissen || reglerGerissen) burst();
  }, [werte.abschluesse, budget, burst]);

  /* ============================================================
     THREE.JS — reine Wireframe-Buehne
     ============================================================ */

  useEffect(() => {
    if (!bereit || !webglOk) return;
    const host = canvasHostRef.current;
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

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(breite, hoehe, false);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(HILL);
      scene.fog = new THREE.Fog(HILL, 9, 32);

      const camera = new THREE.PerspectiveCamera(38, breite / hoehe, 0.1, 120);
      camera.position.set(0, 4.4, 11.2);

      /* Die Buehne kippt leicht — ein Hauch Schraege, kein Kunststueck */
      const welt = new THREE.Group();
      welt.rotation.z = 0.028;
      welt.rotation.x = 0.05;
      scene.add(welt);

      const matGrid = new THREE.LineBasicMaterial({
        color: SNOW,
        transparent: true,
        opacity: 0.11,
      });
      const matRahmen = new THREE.LineBasicMaterial({
        color: SNOW,
        transparent: true,
        opacity: 0.3,
      });
      const matBahn = new THREE.LineBasicMaterial({
        color: RAIL,
        transparent: true,
        opacity: 0.8,
      });
      const matBahnEcho = new THREE.LineBasicMaterial({
        color: RAIL,
        transparent: true,
        opacity: 0.26,
      });
      const matZiel = new THREE.LineBasicMaterial({
        color: ORANGE,
        transparent: true,
        opacity: 0.85,
      });
      mats.push(matGrid, matRahmen, matBahn, matBahnEcho, matZiel);

      /* ── Buehnenboden: Raster + Rahmen ─────────────────────────── */
      const gx = 6.6;
      const gz = 3.2;
      const gitter: number[] = [];
      for (let x = -gx; x <= gx + 0.001; x += 1.1) {
        gitter.push(x, 0, -gz, x, 0, gz);
      }
      for (let z = -gz; z <= gz + 0.001; z += 1.06) {
        gitter.push(-gx, 0, z, gx, 0, z);
      }
      const gitterGeo = new THREE.BufferGeometry();
      gitterGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(gitter, 3)
      );
      geos.push(gitterGeo);
      welt.add(new THREE.LineSegments(gitterGeo, matGrid));

      const rahmenGeo = new THREE.BufferGeometry();
      rahmenGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          [-gx, 0, -gz, gx, 0, -gz, gx, 0, gz, -gx, 0, gz, -gx, 0, -gz],
          3
        )
      );
      geos.push(rahmenGeo);
      welt.add(new THREE.Line(rahmenGeo, matRahmen));

      /* ── Helfer ────────────────────────────────────────────────── */
      const kanten = (
        quelle: ThreeNS.BufferGeometry,
        mat: ThreeNS.LineBasicMaterial
      ) => {
        const eg = new THREE.EdgesGeometry(quelle, 1);
        quelle.dispose();
        geos.push(eg);
        return new THREE.LineSegments(eg, mat);
      };

      const ringLinie = (
        radius: number,
        mat: ThreeNS.LineBasicMaterial,
        segmente = 26
      ) => {
        const pts: number[] = [];
        for (let i = 0; i <= segmente; i += 1) {
          const a = (i / segmente) * Math.PI * 2;
          pts.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
        geos.push(g);
        return new THREE.Line(g, mat);
      };

      const stehringLinie = (
        radius: number,
        mat: ThreeNS.LineBasicMaterial,
        segmente = 28
      ) => {
        const pts: number[] = [];
        for (let i = 0; i <= segmente; i += 1) {
          const a = (i / segmente) * Math.PI * 2;
          pts.push(Math.cos(a) * radius, Math.sin(a) * radius, 0);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
        geos.push(g);
        return new THREE.Line(g, mat);
      };

      const linie = (punkte: number[], mat: ThreeNS.LineBasicMaterial) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(punkte, 3));
        geos.push(g);
        return new THREE.Line(g, mat);
      };

      /* ── Vier Stationen, je ein eigenes Linien-Material ────────── */
      const stationMats: ThreeNS.LineBasicMaterial[] = [];
      const stationGruppen: ThreeNS.Group[] = [];

      for (let i = 0; i < 4; i += 1) {
        const mat = new THREE.LineBasicMaterial({
          color: SNOW,
          transparent: true,
          opacity: 0.78,
        });
        mats.push(mat);
        stationMats.push(mat);

        const g = new THREE.Group();
        const s = STATIONEN[i] ?? { x: 0, z: 0, tor: 1.6 };
        g.position.set(s.x, 0, s.z);

        if (i === 0) {
          /* Marke — Prisma/Pyramide */
          const pyr = kanten(new THREE.ConeGeometry(0.82, 1.5, 4), mat);
          pyr.position.y = 0.75;
          pyr.rotation.y = Math.PI / 4;
          g.add(pyr);
          const sockel = ringLinie(0.98, mat, 4);
          sockel.rotation.y = Math.PI / 4;
          sockel.position.y = 0.02;
          g.add(sockel);
        } else if (i === 1) {
          /* Anzeigen — Antennen-Mast: Kegel plus Ringe */
          const kegel = kanten(
            new THREE.ConeGeometry(0.5, 1.7, 6, 1, true),
            mat
          );
          kegel.position.y = 0.85;
          g.add(kegel);
          [0.34, 0.86, 1.36].forEach((y, k) => {
            const r = ringLinie(0.44 - k * 0.13, mat, 20);
            r.position.y = y;
            g.add(r);
          });
          g.add(linie([0, 1.7, 0, 0, 2.3, 0], mat));
          const spitze = ringLinie(0.16, mat, 14);
          spitze.position.y = 2.3;
          g.add(spitze);
        } else if (i === 2) {
          /* Vertriebssystem — Box-Raster (CRM) */
          const zelle = new THREE.EdgesGeometry(
            new THREE.BoxGeometry(0.4, 0.32, 0.4),
            1
          );
          geos.push(zelle);
          for (let cx = 0; cx < 3; cx += 1) {
            for (let cy = 0; cy < 2; cy += 1) {
              const box = new THREE.LineSegments(zelle, mat);
              box.position.set(-0.48 + cx * 0.48, 0.2 + cy * 0.4, 0);
              g.add(box);
            }
          }
          const huelle = kanten(new THREE.BoxGeometry(1.62, 1.02, 0.62), mat);
          huelle.position.y = 0.5;
          g.add(huelle);
        } else {
          /* Zahlen — gestapelte Balken, ein Turm aus Berichten */
          const platte = new THREE.EdgesGeometry(
            new THREE.BoxGeometry(0.88, 0.24, 0.88),
            1
          );
          geos.push(platte);
          for (let k = 0; k < 4; k += 1) {
            const p = new THREE.LineSegments(platte, mat);
            p.position.y = 0.13 + k * 0.29;
            p.rotation.y = k * 0.14;
            g.add(p);
          }
          [0.44, 0.82, 1.24].forEach((h, k) => {
            const bar = kanten(new THREE.BoxGeometry(0.14, h, 0.14), mat);
            bar.position.set(0.72, h / 2, -0.28 + k * 0.28);
            g.add(bar);
          });
        }

        welt.add(g);
        stationGruppen.push(g);
      }

      /* ── Die Bahn: Himmel → Station 1 … 4 → Ziel ───────────────── */
      const stuetzen = [
        new THREE.Vector3(-8.4, 5.6, 3.1),
        new THREE.Vector3(-6.7, 3.5, 2.2),
        new THREE.Vector3(-5.4, 2.25, 1.5),
        new THREE.Vector3(
          STATIONEN[0]!.x,
          STATIONEN[0]!.tor,
          STATIONEN[0]!.z
        ),
        new THREE.Vector3(-3.0, 2.16, 0.1),
        new THREE.Vector3(
          STATIONEN[1]!.x,
          STATIONEN[1]!.tor,
          STATIONEN[1]!.z
        ),
        new THREE.Vector3(0, 1.78, -0.05),
        new THREE.Vector3(
          STATIONEN[2]!.x,
          STATIONEN[2]!.tor,
          STATIONEN[2]!.z
        ),
        new THREE.Vector3(2.9, 1.58, -0.12),
        new THREE.Vector3(
          STATIONEN[3]!.x,
          STATIONEN[3]!.tor,
          STATIONEN[3]!.z
        ),
        new THREE.Vector3(5.8, 1.15, 0.3),
        new THREE.Vector3(7.5, 0.6, 1.3),
      ];
      const kurve = new THREE.CatmullRomCurve3(
        stuetzen,
        false,
        "catmullrom",
        0.4
      );
      const bahnPunkte = kurve.getSpacedPoints(BAHN_STUETZEN);
      const bahnArr = new Float32Array((BAHN_STUETZEN + 1) * 3);
      bahnPunkte.forEach((p, i) => {
        bahnArr[i * 3] = p.x;
        bahnArr[i * 3 + 1] = p.y;
        bahnArr[i * 3 + 2] = p.z;
      });

      const bahnGeo = new THREE.BufferGeometry().setFromPoints(bahnPunkte);
      geos.push(bahnGeo);
      welt.add(new THREE.Line(bahnGeo, matBahn));

      const echoGeo = new THREE.BufferGeometry().setFromPoints(
        bahnPunkte.map((p) => new THREE.Vector3(p.x, p.y - 0.11, p.z))
      );
      geos.push(echoGeo);
      welt.add(new THREE.Line(echoGeo, matBahnEcho));

      /* Sprossen zwischen Bahn und Echo — die Bahn liest als Leitung */
      const sprossen: number[] = [];
      for (let i = 6; i < BAHN_STUETZEN; i += 14) {
        const p = bahnPunkte[i];
        if (!p) continue;
        sprossen.push(p.x, p.y, p.z, p.x, p.y - 0.11, p.z);
      }
      const sprossenGeo = new THREE.BufferGeometry();
      sprossenGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(sprossen, 3)
      );
      geos.push(sprossenGeo);
      welt.add(new THREE.LineSegments(sprossenGeo, matBahnEcho));

      /* Tore: Index auf der Bahn, an dem eine Station entscheidet */
      const torT: number[] = STATIONEN.map((s) => {
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i <= BAHN_STUETZEN; i += 1) {
          const dx = bahnArr[i * 3]! - s.x;
          const dy = bahnArr[i * 3 + 1]! - s.tor;
          const dz = bahnArr[i * 3 + 2]! - s.z;
          const d = dx * dx + dy * dy + dz * dz;
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        return best / BAHN_STUETZEN;
      });

      /* Ziel-Reifen am Ende der Bahn */
      const ende = bahnPunkte[BAHN_STUETZEN]!;
      const vorEnde = bahnPunkte[BAHN_STUETZEN - 6] ?? ende;
      const zielGruppe = new THREE.Group();
      zielGruppe.position.copy(ende);
      zielGruppe.add(stehringLinie(0.42, matZiel));
      zielGruppe.add(stehringLinie(0.22, matZiel, 20));
      zielGruppe.lookAt(
        new THREE.Vector3(
          ende.x + (ende.x - vorEnde.x),
          ende.y + (ende.y - vorEnde.y),
          ende.z + (ende.z - vorEnde.z)
        )
      );
      welt.add(zielGruppe);

      /* Start-Trichter im Himmel */
      const startTrichter = kanten(
        new THREE.ConeGeometry(0.55, 0.9, 5, 1, true),
        matBahnEcho
      );
      startTrichter.position.copy(stuetzen[0]!);
      startTrichter.rotation.z = -0.5;
      welt.add(startTrichter);

      /* ── Partikel: die Leads ───────────────────────────────────── */
      const pPos = new Float32Array(MAX_PARTIKEL * 3);
      const pCol = new Float32Array(MAX_PARTIKEL * 3);
      const pVel = new Float32Array(MAX_PARTIKEL * 3);
      const pT = new Float32Array(MAX_PARTIKEL);
      const pTempo = new Float32Array(MAX_PARTIKEL);
      const pLeben = new Float32Array(MAX_PARTIKEL);
      const pStatus = new Uint8Array(MAX_PARTIKEL); /* 0 frei 1 fliegt 2 faellt 3 ziel */
      const pTore = new Uint8Array(MAX_PARTIKEL);

      const partikelGeo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(pPos, 3);
      const colAttr = new THREE.BufferAttribute(pCol, 3);
      posAttr.setUsage(THREE.DynamicDrawUsage);
      colAttr.setUsage(THREE.DynamicDrawUsage);
      partikelGeo.setAttribute("position", posAttr);
      partikelGeo.setAttribute("color", colAttr);
      partikelGeo.boundingSphere = new THREE.Sphere(
        new THREE.Vector3(0, 2, 0),
        30
      );
      geos.push(partikelGeo);

      const matPartikel = new THREE.PointsMaterial({
        size: 0.13,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      });
      mats.push(matPartikel);
      welt.add(new THREE.Points(partikelGeo, matPartikel));

      const rnd = mulberry32(0x5eed1234);

      const bahnAt = (t: number, ziel: { x: number; y: number; z: number }) => {
        const f = Math.max(0, Math.min(1, t)) * BAHN_STUETZEN;
        const i = Math.min(BAHN_STUETZEN - 1, Math.floor(f));
        const a = f - i;
        const j = i * 3;
        ziel.x = bahnArr[j]! + (bahnArr[j + 3]! - bahnArr[j]!) * a;
        ziel.y = bahnArr[j + 1]! + (bahnArr[j + 4]! - bahnArr[j + 1]!) * a;
        ziel.z = bahnArr[j + 2]! + (bahnArr[j + 5]! - bahnArr[j + 2]!) * a;
      };

      const tmp = { x: 0, y: 0, z: 0 };
      let cursor = 0;

      const setzeFarbe = (i: number, r: number, g: number, b: number) => {
        pCol[i * 3] = r;
        pCol[i * 3 + 1] = g;
        pCol[i * 3 + 2] = b;
      };

      const spawn = () => {
        for (let n = 0; n < MAX_PARTIKEL; n += 1) {
          const i = (cursor + n) % MAX_PARTIKEL;
          if (pStatus[i] === 0) {
            cursor = (i + 1) % MAX_PARTIKEL;
            pStatus[i] = 1;
            pT[i] = 0;
            pTore[i] = 0;
            pLeben[i] = 0;
            pTempo[i] = 0.125 + rnd() * 0.035;
            bahnAt(0, tmp);
            pPos[i * 3] = tmp.x + (rnd() - 0.5) * 0.2;
            pPos[i * 3 + 1] = tmp.y + (rnd() - 0.5) * 0.2;
            pPos[i * 3 + 2] = tmp.z + (rnd() - 0.5) * 0.2;
            setzeFarbe(i, 0.42, 0.58, 1);
            return;
          }
        }
      };

      const toete = (i: number) => {
        pStatus[i] = 0;
        setzeFarbe(i, 0, 0, 0);
      };

      /* ── Kamera-Blickwinkel je Station ─────────────────────────── */
      const blicke = STATIONEN.map((s, i) => ({
        pos: new THREE.Vector3(s.x * 0.42, 4.25 + (i % 2) * 0.4, 11.1),
        ziel: new THREE.Vector3(s.x * 0.62, 1.2, s.z * 0.4),
      }));
      const camZiel = new THREE.Vector3().copy(blicke[0]!.pos);
      const blickZiel = new THREE.Vector3().copy(blicke[0]!.ziel);
      const blickJetzt = new THREE.Vector3().copy(blicke[0]!.ziel);
      camera.position.copy(camZiel);
      camera.lookAt(blickJetzt);

      const stationMix = [0, 0, 0, 0];
      const farbeSnow = new THREE.Color(SNOW);
      const farbeOrange = new THREE.Color(ORANGE);

      /* ── Statischer Zustand (auch fuer reduzierte Bewegung) ────── */
      const stationenSetzen = (zeit: number, dt: number) => {
        const w = wunschRef.current;
        /* dt = 0 setzt den Zielzustand sofort (statisches Bild) */
        const k = dt > 0 ? 1 - Math.exp(-dt * 5) : 1;
        for (let i = 0; i < 4; i += 1) {
          const aktivZiel = w.aktiv === i ? 1 : 0;
          const mix = stationMix[i]! + (aktivZiel - stationMix[i]!) * k;
          stationMix[i] = mix;
          const mat = stationMats[i]!;
          mat.color.copy(farbeSnow).lerp(farbeOrange, mix);
          const ein = w.an[i] !== false;
          mat.opacity = (ein ? 0.78 : 0.3) + mix * (ein ? 0.22 : 0.3);
          const puls =
            dt > 0 && w.aktiv === i
              ? 1 + (Math.sin(zeit * 2.2) * 0.5 + 0.5) * 0.04
              : 1;
          stationGruppen[i]!.scale.setScalar(puls);
        }
      };

      const statischesBild = () => {
        stationenSetzen(0, 0);
        /* Partikel ruhen als stille Punkte auf der Bahn */
        for (let i = 0; i < MAX_PARTIKEL; i += 1) {
          if (i < 72) {
            const t = (i + 0.5) / 72;
            bahnAt(t, tmp);
            pPos[i * 3] = tmp.x;
            pPos[i * 3 + 1] = tmp.y;
            pPos[i * 3 + 2] = tmp.z;
            setzeFarbe(i, 0.42, 0.58, 1);
            pStatus[i] = 1;
          } else {
            toete(i);
          }
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
        const b = blicke[wunschRef.current.aktiv] ?? blicke[0]!;
        camera.position.copy(b.pos);
        camera.lookAt(b.ziel);
        renderer.render(scene, camera);
      };

      /* ── Schleife ──────────────────────────────────────────────── */
      let raf = 0;
      let laufend = false;
      let letzterFrame = 0;
      let zeit = 0;
      let spawnAkku = 0;
      let dokVerborgen =
        typeof document !== "undefined" ? document.hidden : false;

      const frame = (t: number) => {
        if (!laufend) return;
        const dt = Math.min(0.05, Math.max(0, (t - letzterFrame) / 1000));
        letzterFrame = t;
        zeit += dt;
        const w = wunschRef.current;

        /* Kamera: Blickwinkel der aktiven Station + Drift + Parallaxe */
        const b = blicke[w.aktiv] ?? blicke[0]!;
        camZiel.copy(b.pos);
        camZiel.x += Math.sin(zeit * 0.18) * 0.55 + zeigerRef.current.x * 0.45;
        camZiel.y += Math.sin(zeit * 0.13 + 1.1) * 0.26 - zeigerRef.current.y * 0.3;
        camZiel.z += Math.cos(zeit * 0.11) * 0.42;
        const k = 1 - Math.exp(-dt * 1.9);
        camera.position.lerp(camZiel, k);
        blickZiel.copy(b.ziel);
        blickJetzt.lerp(blickZiel, k);
        camera.lookAt(blickJetzt);

        stationenSetzen(zeit, dt);

        /* Nachschub: Spawn-Rate spiegelt die Anfragen */
        const rate = Math.max(1.1, Math.min(20, w.anfragen / 14));
        spawnAkku += rate * dt;
        while (spawnAkku >= 1) {
          spawnAkku -= 1;
          spawn();
        }

        for (let i = 0; i < MAX_PARTIKEL; i += 1) {
          const st = pStatus[i]!;
          if (st === 0) continue;

          if (st === 1) {
            pT[i] = pT[i]! + pTempo[i]! * dt;
            const tp = pT[i]!;
            let gefallen = false;
            for (let s = 0; s < 4; s += 1) {
              const bit = 1 << s;
              if ((pTore[i]! & bit) === 0 && tp >= torT[s]!) {
                pTore[i] = pTore[i]! | bit;
                if (rnd() > w.durchlass[s]!) {
                  pStatus[i] = 2;
                  pLeben[i] = 1.15;
                  pVel[i * 3] = (rnd() - 0.5) * 1.3;
                  pVel[i * 3 + 1] = 0.35 + rnd() * 0.5;
                  pVel[i * 3 + 2] = 0.5 + rnd() * 0.9;
                  gefallen = true;
                  break;
                }
              }
            }
            if (gefallen) continue;

            if (tp >= 1) {
              pStatus[i] = 3;
              pLeben[i] = 0.5;
              bahnAt(1, tmp);
              pPos[i * 3] = tmp.x;
              pPos[i * 3 + 1] = tmp.y;
              pPos[i * 3 + 2] = tmp.z;
              continue;
            }
            bahnAt(tp, tmp);
            pPos[i * 3] = tmp.x;
            pPos[i * 3 + 1] = tmp.y;
            pPos[i * 3 + 2] = tmp.z;
            const nahAmZiel = tp > 0.94 ? (tp - 0.94) / 0.06 : 0;
            setzeFarbe(
              i,
              0.42 + nahAmZiel * 0.5,
              0.58 - nahAmZiel * 0.18,
              1 - nahAmZiel * 0.8
            );
          } else if (st === 2) {
            pVel[i * 3 + 1] = pVel[i * 3 + 1]! - 3.4 * dt;
            pPos[i * 3] = pPos[i * 3]! + pVel[i * 3]! * dt;
            pPos[i * 3 + 1] = pPos[i * 3 + 1]! + pVel[i * 3 + 1]! * dt;
            pPos[i * 3 + 2] = pPos[i * 3 + 2]! + pVel[i * 3 + 2]! * dt;
            pLeben[i] = pLeben[i]! - dt;
            if (pLeben[i]! <= 0) {
              toete(i);
              continue;
            }
            const f = Math.max(0, pLeben[i]! / 1.15) ** 1.5;
            setzeFarbe(i, 0.42 * f, 0.5 * f, 0.9 * f);
          } else {
            pLeben[i] = pLeben[i]! - dt;
            if (pLeben[i]! <= 0) {
              toete(i);
              continue;
            }
            const f = pLeben[i]! / 0.5;
            const glanz = 0.5 + f * 1.5;
            pPos[i * 3 + 1] = pPos[i * 3 + 1]! + dt * 0.35;
            setzeFarbe(i, 0.91 * glanz, 0.39 * glanz, 0.12 * glanz);
          }
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
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
        camera.aspect = breite / hoehe;
        camera.updateProjectionMatrix();
        renderer.setSize(breite, hoehe, false);
        if (!laufend) renderer.render(scene, camera);
      };

      let ro: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(messe);
        ro.observe(host);
      }
      window.addEventListener("resize", messe);

      /* ── Zeiger-Parallaxe (nicht auf Touch) ────────────────────── */
      const aufZeiger = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const r = host.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        zeigerRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        zeigerRef.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      const aufZeigerRaus = () => {
        zeigerRef.current.x = 0;
        zeigerRef.current.y = 0;
      };
      host.addEventListener("pointermove", aufZeiger);
      host.addEventListener("pointerleave", aufZeigerRaus);

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
        for (let i = 0; i < MAX_PARTIKEL; i += 1) toete(i);
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

  const anteil = (budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN);
  const Surface = SURFACES[aktiv] ?? MarkeSurface;
  const aktivesModul = modules[aktiv] ?? modules[0];

  const abschluesseText =
    werte.abschluesse < 10
      ? nf1.format(Math.round(werte.abschluesse * 10) / 10)
      : ganz(werte.abschluesse);

  const zeilen: { label: string; wert: string; betont?: "orange" | "gross" }[] =
    [
      { label: "Anfragen / Monat", wert: ganz(werte.anfragen) },
      { label: "Termine", wert: ganz(werte.termine) },
      { label: "Abschlüsse", wert: abschluesseText, betont: "orange" },
      {
        label: "Mehr Umsatz / Monat",
        wert: euro(Math.round(werte.umsatz / 100) * 100),
        betont: "gross",
      },
    ];

  const schalten = (i: number) => {
    setAktiv(i);
    setAn((vorher) => vorher.map((v, k) => (k === i ? !v : v)));
  };

  return (
    <div ref={buehneRef} className="w-full">
      <style dangerouslySetInnerHTML={{ __html: SPIEL_CSS }} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[7fr_5fr] lg:gap-8">
        {/* ── Canvas-Buehne ───────────────────────────────────── */}
        <div
          className="relative h-[300px] overflow-hidden rounded-[16px] lg:h-[460px]"
          style={{
            background: HILL,
            border: "1px solid rgba(255,253,246,0.14)",
          }}
        >
          {webglOk ? (
            <div ref={canvasHostRef} className="absolute inset-0" />
          ) : (
            <ul className="absolute inset-0 flex flex-col justify-center gap-3 px-7">
              {modules.map((m, i) => (
                <li
                  key={m.title}
                  className="tnum flex items-baseline gap-3 text-[15px]"
                  style={{ color: "rgba(255,253,246,0.72)" }}
                >
                  <span style={{ color: "rgba(255,253,246,0.4)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      color: i === aktiv ? ORANGE : "rgba(255,253,246,0.86)",
                    }}
                  >
                    {m.title}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Stationsleiste — verbindet Szene und Schalter */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-center gap-4 px-5 pb-4 sm:flex">
            {modules.map((m, i) => (
              <span
                key={m.title}
                className="tnum text-[11px] whitespace-nowrap"
                style={{
                  color:
                    i === aktiv
                      ? ORANGE
                      : an[i]
                        ? "rgba(255,253,246,0.55)"
                        : "rgba(255,253,246,0.28)",
                }}
              >
                {i + 1} · {m.title}
              </span>
            ))}
          </div>

          <canvas
            ref={konfettiRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        </div>

        {/* ── Kontroll-Panel ──────────────────────────────────── */}
        <div
          className="rounded-[14px] p-6"
          style={{
            background: "rgba(255,253,246,0.05)",
            border: "1px solid rgba(255,253,246,0.16)",
          }}
        >
          {/* 1 — Budget */}
          <div className="flex items-baseline justify-between gap-4">
            <span
              className="text-[11.5px] font-semibold tracking-[0.07em] uppercase"
              style={{ color: "rgba(255,253,246,0.55)" }}
            >
              Werbebudget im Monat
            </span>
            <span
              className="tnum text-[26px] leading-none font-semibold"
              style={{ color: SNOW }}
            >
              {euro(budget)}
            </span>
          </div>

          <div className="mt-4">
            <input
              className="spg-range"
              type="range"
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={budget}
              aria-label="Werbebudget im Monat in Euro"
              onChange={(e) => setBudget(Number(e.currentTarget.value))}
              style={
                {
                  "--spg-fill": `${Math.round(anteil * 100)}%`,
                } as React.CSSProperties
              }
            />
          </div>
          <div
            className="tnum mt-2 flex justify-between text-[11px]"
            style={{ color: "rgba(255,253,246,0.45)" }}
          >
            <span>{euro(BUDGET_MIN)}</span>
            <span>{euro(BUDGET_MAX)}</span>
          </div>

          {/* 2 — Modul-Schalter */}
          <div
            className="mt-6 border-t pt-6"
            style={{ borderColor: "rgba(255,253,246,0.12)" }}
          >
            <span
              className="text-[11.5px] font-semibold tracking-[0.07em] uppercase"
              style={{ color: "rgba(255,253,246,0.55)" }}
            >
              Module im System
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {modules.map((m, i) => {
                const ein = an[i] !== false;
                const istAktiv = aktiv === i;
                return (
                  <button
                    key={m.title}
                    type="button"
                    aria-pressed={ein}
                    onClick={() => schalten(i)}
                    className="spg-modul"
                    data-ein={ein ? "true" : "false"}
                    data-aktiv={istAktiv ? "true" : "false"}
                  >
                    <span className="spg-modul-name">{m.title}</span>
                    <span className="spg-modul-zeile">
                      <span aria-hidden="true" className="spg-punkt" />
                      <span className={ein ? "" : "line-through"}>
                        {ein ? "an" : "aus"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 — Zahlen */}
          <div
            className="mt-6 border-t pt-5"
            style={{ borderColor: "rgba(255,253,246,0.12)" }}
            aria-live="polite"
          >
            {zeilen.map((z) => (
              <div
                key={z.label}
                className="flex items-baseline justify-between gap-4 py-[7px]"
              >
                <span
                  className="text-[13.5px]"
                  style={{ color: "rgba(255,253,246,0.72)" }}
                >
                  {z.label}
                </span>
                <span
                  key={z.wert}
                  className={`spg-wert tnum ${
                    z.betont === "gross"
                      ? "text-[22px] font-semibold"
                      : "text-[17px] font-semibold"
                  }`}
                  style={{
                    color: z.betont === "orange" ? ORANGE : SNOW,
                  }}
                >
                  {z.wert}
                </span>
              </div>
            ))}
          </div>

          {/* 4 — Fussnote */}
          <p
            className="mt-4 text-[11px] leading-[1.5]"
            style={{ color: "rgba(255,253,246,0.55)" }}
          >
            Beispielmechanik — Ihre echten Zahlen klären wir im
            Systemgespräch.
          </p>
        </div>
      </div>

      {/* ── Detail-Panel des aktiven Moduls ───────────────────── */}
      <div
        className="mt-6 rounded-[14px] p-6"
        style={{
          background: "rgba(255,253,246,0.05)",
          border: "1px solid rgba(255,253,246,0.16)",
        }}
      >
        <div
          key={aktiv}
          className="spg-fade grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,340px)_1fr] md:gap-8"
        >
          <div
            className="rounded-[12px] p-4"
            style={{ background: SNOW, color: "#10190f" }}
          >
            <Surface />
          </div>
          <div>
            <h3
              className="text-[19px] leading-[1.35] font-semibold"
              style={{ color: SNOW }}
            >
              {aktivesModul?.title}
            </h3>
            <p
              className="mt-2 text-[15.5px] leading-[1.65]"
              style={{ color: "rgba(255,253,246,0.78)" }}
            >
              {aktivesModul?.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   CSS-Insel — Regler und Schalter brauchen echte Pseudo-Elemente
   (accent-color reicht nicht) und funktionieren so in Chrome
   und Firefox gleich.
   ---------------------------------------------------------------- */

const SPIEL_CSS = `
.spg-range{-webkit-appearance:none;appearance:none;display:block;width:100%;height:20px;background:transparent;cursor:pointer;margin:0;}
.spg-range:focus{outline:none;}
.spg-range::-webkit-slider-runnable-track{height:6px;border-radius:999px;background:linear-gradient(to right,rgba(232,100,31,0.85) var(--spg-fill,0%),rgba(255,253,246,0.22) var(--spg-fill,0%));}
.spg-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;margin-top:-7px;border-radius:50%;background:#FFFDF6;border:3px solid #E8641F;box-shadow:0 0 0 1px rgba(6,21,10,0.55);}
.spg-range::-moz-range-track{height:6px;border-radius:999px;background:rgba(255,253,246,0.22);}
.spg-range::-moz-range-progress{height:6px;border-radius:999px;background:rgba(232,100,31,0.85);}
.spg-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#FFFDF6;border:3px solid #E8641F;box-shadow:0 0 0 1px rgba(6,21,10,0.55);}
.spg-range:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px rgba(232,100,31,0.35);}
.spg-range:focus-visible::-moz-range-thumb{box-shadow:0 0 0 4px rgba(232,100,31,0.35);}

.spg-modul{display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:left;padding:11px 13px 10px;border-radius:11px;background:transparent;border:1px solid rgba(255,253,246,0.2);cursor:pointer;transition:border-color 150ms ease-out,background-color 150ms ease-out,color 150ms ease-out;}
.spg-modul:hover{background:rgba(255,253,246,0.06);}
.spg-modul:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(232,100,31,0.4);}
.spg-modul-name{font-size:13.5px;font-weight:600;letter-spacing:-0.01em;line-height:1.25;color:rgba(255,253,246,0.6);}
.spg-modul-zeile{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;line-height:1;color:rgba(255,253,246,0.5);}
.spg-punkt{width:7px;height:7px;border-radius:50%;background:rgba(255,253,246,0.3);}
.spg-modul[data-ein="true"]{border-color:#E8641F;}
.spg-modul[data-ein="true"] .spg-modul-name{color:#FFFDF6;}
.spg-modul[data-ein="true"] .spg-punkt{background:#E8641F;}
.spg-modul[data-ein="true"] .spg-modul-zeile{color:rgba(255,253,246,0.72);}
.spg-modul[data-aktiv="true"]{background:rgba(255,253,246,0.08);}

@keyframes spg-fade-in{from{opacity:0}to{opacity:1}}
.spg-fade{animation:spg-fade-in 150ms ease-out both;}
.spg-wert{animation:spg-fade-in 120ms ease-out both;}
@media (prefers-reduced-motion: reduce){
.spg-fade,.spg-wert{animation:none;}
.spg-modul{transition:none;}
}
`;

export default SystemPlayground;
