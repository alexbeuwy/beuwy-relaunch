"use client";

/* ----------------------------------------------------------------
   SAEULEN-STUDIO — „Drei Saeulen. Ein Umsatz."

   Links eine reine Wireframe-Buehne: drei Saeulen aus gestapelten
   Bausteinen tragen einen flachen Traeger. Der Traeger ist der
   Umsatz. Wer eine Saeule abschaltet, sieht die Bausteine kippen
   und den Traeger auf dieser Seite absacken.

   Rechts die Steuerung: drei Schalter, die Tragfaehigkeit und ein
   Detail-Panel zur aktiven Saeule.

   Riso-Regeln: flache Flaechen, keine Lichter, keine Texturen,
   keine Farbverlaeufe. Die Szene besteht ausschliesslich aus Linien.
   ---------------------------------------------------------------- */

import { useEffect, useMemo, useRef, useState } from "react";
import type * as ThreeNS from "three";

/* ── Palette der Buehne ─────────────────────────────────────────── */

const HILL = "#06150A"; /* Huegel-Gruen — Grund der Sektion */
const SNOW = "#FFFDF6"; /* Schnee — Struktur */
const RAIL = "#4C7DFF"; /* helles Ultramarin — Fluss, Belege */
const ORANGE = "#E8641F"; /* aktive Saeule, Warnung */

/* ── Inhalt ─────────────────────────────────────────────────────── */

export type Saeule = {
  key: string;
  title: string;
  claim: string;
  text: string;
  proof: string;
  without: string;
};

/* Tragfaehigkeit — feste Werte, keine Formel.
   Index = Anzahl der stehenden Saeulen. */
const TRAGKRAFT = [0, 25, 55, 100];

/* ── Bauplan: relative Hoehen und Breiten der Bausteine ─────────── */

const BAUPLAN: { hoehen: number[]; breiten: number[] }[] = [
  {
    hoehen: [1.12, 1.0, 0.95, 1.02, 0.9, 1.01],
    breiten: [1.74, 1.62, 1.66, 1.5, 1.58, 1.42],
  },
  {
    hoehen: [1.06, 0.96, 1.0, 0.92, 1.04, 0.96, 1.06],
    breiten: [1.8, 1.68, 1.58, 1.64, 1.5, 1.56, 1.44],
  },
  {
    hoehen: [1.0, 1.08, 0.94, 1.04, 0.96, 0.98],
    breiten: [1.72, 1.58, 1.64, 1.5, 1.56, 1.4],
  },
];

const SAEULEN_X = [-3.45, 0, 3.45];
const BODEN = 0.05;
const BAU_HOEHE = 3.95; /* gesamte Stapelhoehe inklusive Fugen */
const FUGE = 0.06;
const DACH_DICKE = 0.34;
const DACH_Y = BODEN + BAU_HOEHE + DACH_DICKE / 2 + 0.03;
const DACH_SPANNE = 9.9;
const DACH_FALL = 3.1; /* Absenkung, wenn eine Seite ohne Stuetze ist */
const FUNKEN_JE_SAEULE = 6;

const KAM_Y = 2.95;
const KAM_Z = 12.4;
const PARALLAXE = KAM_Z * 0.04; /* Zeiger bewegt die Kamera um ± 4 % */

/* ── Zustandswunsch, den die Szene jeden Frame liest ─────────────── */

type Wunsch = { an: boolean[]; aktiv: number };

type SzenenApi = {
  sync: () => void;
  setLaufend: (laufend: boolean) => void;
};

type Baustein = {
  mesh: ThreeNS.LineSegments;
  y0: number;
  kipp: number;
  dx: number;
  dz: number;
  dy: number;
  phase: number;
};

type SaeuleObjekt = {
  gruppe: ThreeNS.Group;
  bausteine: Baustein[];
  mat: ThreeNS.LineBasicMaterial;
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
  const waehleRef = useRef<(i: number) => void>(() => {});

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
      { rootMargin: "120px 0px", threshold: 0.01 }
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

  useEffect(() => {
    waehleRef.current = (i: number) => setAktiv(i);
  }, []);

  /* ============================================================
     THREE.JS — reine Wireframe-Buehne
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

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(breite, hoehe, false);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(HILL);
      scene.fog = new THREE.Fog(HILL, 14, 30);

      const camera = new THREE.PerspectiveCamera(34, breite / hoehe, 0.1, 120);
      camera.position.set(0, KAM_Y, KAM_Z);

      /* Die Buehne steht einen Hauch schraeg — nur so viel, dass die
         Quader als Koerper lesbar werden */
      const welt = new THREE.Group();
      welt.rotation.y = -0.14;
      welt.position.y = -0.55;
      scene.add(welt);

      const cSnow = new THREE.Color(SNOW);
      const cOrange = new THREE.Color(ORANGE);

      /* ── Materialien ───────────────────────────────────────────── */
      const matRaster = new THREE.LineBasicMaterial({
        color: SNOW,
        transparent: true,
        opacity: 0.1,
      });
      const matRahmen = new THREE.LineBasicMaterial({
        color: SNOW,
        transparent: true,
        opacity: 0.28,
      });
      const matDach = new THREE.LineBasicMaterial({
        color: SNOW,
        transparent: true,
        opacity: 0.66,
      });
      const matFachwerk = new THREE.LineBasicMaterial({
        color: SNOW,
        transparent: true,
        opacity: 0.3,
      });
      const matFluss = new THREE.LineBasicMaterial({
        color: RAIL,
        transparent: true,
        opacity: 0.85,
      });
      const matUmsatz = new THREE.LineBasicMaterial({
        color: RAIL,
        transparent: true,
        opacity: 0.7,
      });
      mats.push(
        matRaster,
        matRahmen,
        matDach,
        matFachwerk,
        matFluss,
        matUmsatz
      );

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

      const linie = (punkte: number[], mat: ThreeNS.LineBasicMaterial) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(punkte, 3));
        geos.push(g);
        return new THREE.Line(g, mat);
      };

      /* ── Fundament: duennes Raster plus Rahmen ─────────────────── */
      const gx = 5.6;
      const gz = 1.75;
      const raster: number[] = [];
      for (let x = -gx; x <= gx + 0.001; x += 0.8) {
        raster.push(x, 0, -gz, x, 0, gz);
      }
      for (let z = -gz; z <= gz + 0.001; z += 0.7) {
        raster.push(-gx, 0, z, gx, 0, z);
      }
      const rasterGeo = new THREE.BufferGeometry();
      rasterGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(raster, 3)
      );
      geos.push(rasterGeo);
      welt.add(new THREE.LineSegments(rasterGeo, matRaster));

      welt.add(
        linie(
          [-gx, 0, -gz, gx, 0, -gz, gx, 0, gz, -gx, 0, gz, -gx, 0, -gz],
          matRahmen
        )
      );

      /* ── Die drei Saeulen ──────────────────────────────────────── */
      const saeulen3d: SaeuleObjekt[] = [];
      const hitboxen: ThreeNS.Mesh[] = [];

      for (let s = 0; s < 3; s += 1) {
        const plan = BAUPLAN[s];
        const anzahl = plan.hoehen.length;
        const summe = plan.hoehen.reduce((a, b) => a + b, 0);
        const nutzhoehe = BAU_HOEHE - FUGE * (anzahl - 1);

        const mat = new THREE.LineBasicMaterial({
          color: SNOW,
          transparent: true,
          opacity: 0.74,
        });
        mats.push(mat);

        const gruppe = new THREE.Group();
        gruppe.position.x = SAEULEN_X[s];
        welt.add(gruppe);

        const bausteine: Baustein[] = [];
        let y = BODEN;

        for (let i = 0; i < anzahl; i += 1) {
          const h = (plan.hoehen[i] / summe) * nutzhoehe;
          const b = plan.breiten[i];
          const mesh = kanten(new THREE.BoxGeometry(b, h, b * 0.74), mat);
          const yc = y + h / 2;
          mesh.position.y = yc;
          gruppe.add(mesh);

          const seite = i % 2 === 0 ? 1 : -1;
          const anteil = (i + 1) / anzahl;
          bausteine.push({
            mesh,
            y0: yc,
            kipp: seite * (0.14 + anteil * 0.52),
            dx: seite * (0.22 + anteil * 1.05),
            dz: (i % 3 === 0 ? 0.3 : -0.24) * anteil,
            dy: 0.1 + anteil * 0.3,
            phase: i * 0.72 + s * 1.35,
          });

          y += h + FUGE;
        }

        /* Unsichtbare Hitbox — nur fuer den Raycaster */
        const hitGeo = new THREE.BoxGeometry(2.3, BAU_HOEHE + 0.5, 1.9);
        geos.push(hitGeo);
        const hitMat = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        mats.push(hitMat);
        const hit = new THREE.Mesh(hitGeo, hitMat);
        hit.visible = false;
        hit.position.set(SAEULEN_X[s], BODEN + BAU_HOEHE / 2, 0);
        hit.userData.index = s;
        welt.add(hit);
        hitboxen.push(hit);

        saeulen3d.push({ gruppe, bausteine, mat });
      }

      /* ── Traeger: der Umsatz liegt auf den drei Saeulen ────────── */
      const dach = new THREE.Group();
      dach.position.y = DACH_Y;
      welt.add(dach);

      dach.add(
        kanten(
          new THREE.BoxGeometry(DACH_SPANNE, DACH_DICKE, 2.0),
          matDach
        )
      );

      /* Untergurt plus Zickzack — der Traeger liest sich als Fachwerk */
      const halb = DACH_SPANNE / 2 - 0.25;
      const untenY = -DACH_DICKE / 2 - 0.42;
      dach.add(linie([-halb, untenY, 0, halb, untenY, 0], matFachwerk));
      const zickzack: number[] = [];
      const felder = 12;
      for (let i = 0; i <= felder; i += 1) {
        const x = -halb + (i / felder) * (halb * 2);
        zickzack.push(x, i % 2 === 0 ? -DACH_DICKE / 2 : untenY, 0);
      }
      dach.add(linie(zickzack, matFachwerk));

      /* Umsatz-Balken auf dem Traeger — Laenge folgt der Tragfaehigkeit */
      const umsatz = linie(
        [-halb, DACH_DICKE / 2 + 0.05, 0, halb, DACH_DICKE / 2 + 0.05, 0],
        matUmsatz
      );
      dach.add(umsatz);

      /* ── Funkenfluss: kurze Striche laufen die Saeulen hoch ────── */
      const funkenAnzahl = 3 * FUNKEN_JE_SAEULE;
      const funkenPos = new Float32Array(funkenAnzahl * 6);
      const funkenGeo = new THREE.BufferGeometry();
      funkenGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(funkenPos, 3)
      );
      geos.push(funkenGeo);
      welt.add(new THREE.LineSegments(funkenGeo, matFluss));

      const funkenT = new Float32Array(funkenAnzahl);
      const funkenTempo = new Float32Array(funkenAnzahl);
      const funkenOx = new Float32Array(funkenAnzahl);
      const funkenOz = new Float32Array(funkenAnzahl);
      for (let s = 0; s < 3; s += 1) {
        for (let j = 0; j < FUNKEN_JE_SAEULE; j += 1) {
          const k = s * FUNKEN_JE_SAEULE + j;
          funkenT[k] = j / FUNKEN_JE_SAEULE;
          funkenTempo[k] = 0.28 + ((j + s) % 3) * 0.05;
          funkenOx[k] = (j % 2 === 0 ? 1 : -1) * (0.52 + (j % 3) * 0.09);
          funkenOz[k] = (j % 3 === 0 ? 0.44 : -0.4) * 0.9;
        }
      }
      const funkenAttr = funkenGeo.getAttribute(
        "position"
      ) as ThreeNS.BufferAttribute;

      /* ── Laufende Werte ────────────────────────────────────────── */
      const stand = [1, 1, 1];
      const aktivWert = [1, 0, 0];
      let dachY = DACH_Y;
      let dachKipp = 0;
      let umsatzAnteil = 1;
      let camX = 0;
      let camY = KAM_Y;
      let camZ = KAM_Z;
      let zeit = 0;

      const abstand = () => {
        const seite = breite / Math.max(1, hoehe);
        const weite = seite < 1.55 ? Math.min(1.7, 1.55 / seite) : 1;
        return KAM_Z * weite;
      };

      /* ── Ein Bild rechnen ──────────────────────────────────────── */
      const aktualisiere = (dt: number, sofort: boolean) => {
        const w = wunschRef.current;

        for (let s = 0; s < 3; s += 1) {
          const zielStand = w.an[s] === false ? 0 : 1;
          const zielAktiv = w.aktiv === s ? 1 : 0;
          stand[s] = sofort
            ? zielStand
            : naehere(stand[s], zielStand, 4.2, dt);
          aktivWert[s] = sofort
            ? zielAktiv
            : naehere(aktivWert[s], zielAktiv, 6.5, dt);

          const fall = 1 - stand[s];
          const saeule = saeulen3d[s];

          for (const b of saeule.bausteine) {
            b.mesh.position.y = b.y0 - fall * (b.y0 * 0.62 + b.dy);
            b.mesh.position.x = b.dx * fall;
            b.mesh.position.z = b.dz * fall;
            b.mesh.rotation.z = b.kipp * fall;
            b.mesh.rotation.x = b.dz * fall * 0.6;
            const puls = sofort
              ? 0
              : Math.sin(zeit * 1.5 + b.phase) *
                (0.004 + aktivWert[s] * 0.014) *
                stand[s];
            b.mesh.scale.setScalar(1 + puls);
          }

          saeule.mat.color.copy(cSnow).lerp(cOrange, aktivWert[s]);
          const atem = sofort ? 0 : Math.sin(zeit * 1.6 + s * 0.9) * 0.05;
          saeule.mat.opacity = 0.24 + stand[s] * (0.5 + atem);
        }

        /* Der Traeger sackt dort ab, wo die Stuetze fehlt */
        const stuetzeL = Math.min(1, stand[0] + 0.35 * stand[1]);
        const stuetzeR = Math.min(1, stand[2] + 0.35 * stand[1]);
        const yL = DACH_Y - (1 - stuetzeL) * DACH_FALL;
        const yR = DACH_Y - (1 - stuetzeR) * DACH_FALL;
        const gesamt = (stand[0] + stand[1] + stand[2]) / 3;
        let zielY = (yL + yR) / 2;
        let zielKipp = Math.atan2(yR - yL, DACH_SPANNE);
        if (!sofort) {
          /* Was nicht ganz getragen wird, wankt — am staerksten, wenn
             der Traeger nur noch auf der Mitte balanciert */
          const wanken = Math.min(
            1,
            1 - gesamt + (1 - Math.max(stand[0], stand[2])) * 0.5
          );
          zielKipp += Math.sin(zeit * 0.85) * 0.06 * wanken;
          zielY += Math.sin(zeit * 1.15) * 0.08 * wanken;
        }
        dachY = sofort ? zielY : naehere(dachY, zielY, 3.4, dt);
        dachKipp = sofort ? zielKipp : naehere(dachKipp, zielKipp, 3.4, dt);
        dach.position.y = dachY;
        dach.rotation.z = dachKipp;

        matDach.color.copy(cSnow).lerp(cOrange, (1 - gesamt) * 0.9);
        matDach.opacity = 0.44 + gesamt * 0.24;
        matFachwerk.opacity = 0.16 + gesamt * 0.16;

        umsatzAnteil = sofort
          ? gesamt
          : naehere(umsatzAnteil, gesamt, 3.4, dt);
        umsatz.scale.x = Math.max(0.001, umsatzAnteil);
        matUmsatz.opacity = 0.18 + umsatzAnteil * 0.62;

        /* Funken — nur an stehenden Saeulen, nie im Ruhebild */
        for (let s = 0; s < 3; s += 1) {
          const laeuft = !sofort && stand[s] > 0.6;
          for (let j = 0; j < FUNKEN_JE_SAEULE; j += 1) {
            const k = s * FUNKEN_JE_SAEULE + j;
            const o = k * 6;
            if (!laeuft) {
              for (let q = 0; q < 6; q += 1) funkenPos[o + q] = 0;
              continue;
            }
            funkenT[k] += funkenTempo[k] * dt;
            if (funkenT[k] > 1) funkenT[k] -= 1;
            const t = funkenT[k];
            const x = SAEULEN_X[s] + funkenOx[k];
            const z = funkenOz[k];
            const y1 = BODEN + t * (BAU_HOEHE - 0.28);
            const y2 = y1 + 0.26 * (1 - t * 0.55);
            funkenPos[o] = x;
            funkenPos[o + 1] = y1;
            funkenPos[o + 2] = z;
            funkenPos[o + 3] = x;
            funkenPos[o + 4] = y2;
            funkenPos[o + 5] = z;
          }
        }
        funkenAttr.needsUpdate = true;

        /* Kamera: sanfte Drift plus Zeiger-Parallaxe */
        const zZiel = abstand();
        if (sofort) {
          camX = 0;
          camY = KAM_Y;
          camZ = zZiel;
        } else {
          const xZiel =
            zeigerRef.current.x * PARALLAXE + Math.sin(zeit * 0.15) * 0.3;
          const yZiel =
            KAM_Y - zeigerRef.current.y * 0.28 + Math.sin(zeit * 0.11) * 0.14;
          camX = naehere(camX, xZiel, 2.2, dt);
          camY = naehere(camY, yZiel, 2.2, dt);
          camZ = naehere(camZ, zZiel, 3, dt);
        }
        camera.position.set(camX, camY, camZ);
        camera.lookAt(0, 1.55, 0);
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
        camera.aspect = breite / hoehe;
        camera.updateProjectionMatrix();
        renderer.setSize(breite, hoehe, false);
        if (!laufend) {
          camera.position.z = abstand();
          camera.lookAt(0, 1.55, 0);
          renderer.render(scene, camera);
        }
      };

      let ro: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(messe);
        ro.observe(host);
      }
      window.addEventListener("resize", messe);

      /* ── Zeiger: Parallaxe, Hover, Auswahl ─────────────────────── */
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
        host.style.cursor = getroffen(e) >= 0 ? "pointer" : "default";
      };

      const aufZeigerRaus = () => {
        zeigerRef.current.x = 0;
        zeigerRef.current.y = 0;
        host.style.cursor = "default";
      };

      const aufKlick = (e: MouseEvent) => {
        const idx = getroffen(e);
        if (idx >= 0) waehleRef.current(idx);
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

  return (
    <div ref={wurzelRef} className="w-full">
      <style dangerouslySetInnerHTML={{ __html: STUDIO_CSS }} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        {/* ── Buehne ──────────────────────────────────────────── */}
        <div
          className="relative h-[320px] overflow-hidden rounded-[18px] lg:h-[480px]"
          style={{
            background: HILL,
            border: "1px solid rgba(255,253,246,0.14)",
          }}
        >
          {webglOk ? (
            <div ref={hostRef} aria-hidden="true" className="absolute inset-0" />
          ) : (
            <ul className="absolute inset-0 flex flex-col justify-center gap-4 px-8">
              {saeulen.map((s, i) => (
                <li
                  key={s.key}
                  className="tnum flex items-baseline gap-3 text-[15.5px]"
                >
                  <span style={{ color: "rgba(255,253,246,0.4)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      color:
                        an[i] === false
                          ? "rgba(255,253,246,0.38)"
                          : i === aktiv
                            ? ORANGE
                            : "rgba(255,253,246,0.86)",
                    }}
                  >
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Steuerung ───────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Tragfaehigkeit des Traegers */}
          <div
            className="rounded-[14px] p-5"
            style={{
              background: "rgba(255,253,246,0.05)",
              border: "1px solid rgba(255,253,246,0.16)",
            }}
            aria-live="polite"
          >
            <span
              className="text-[11.5px] font-semibold tracking-[0.07em] uppercase"
              style={{ color: "rgba(255,253,246,0.55)" }}
            >
              Tragfähigkeit
            </span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span
                key={tragkraft}
                className="sst-wert tnum text-[46px] leading-none font-semibold"
                style={{ color: stehend === 3 ? SNOW : ORANGE }}
              >
                {tragkraft}
              </span>
              <span
                className="text-[19px] leading-none font-semibold"
                style={{ color: stehend === 3 ? SNOW : ORANGE }}
              >
                %
              </span>
            </div>
            <p
              key={hinweis}
              className="sst-swap mt-3 text-[13.5px] leading-[1.55]"
              style={{ color: "rgba(255,253,246,0.68)" }}
            >
              {hinweis}
            </p>
          </div>

          {/* Drei Schalter */}
          <div className="flex flex-col gap-2.5">
            {saeulen.map((s, i) => {
              const ein = an[i] !== false;
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={ein}
                  onClick={() => schalten(i)}
                  className="sst-schalter cursor-pointer"
                  data-ein={ein ? "true" : "false"}
                  data-aktiv={aktiv === i ? "true" : "false"}
                  style={{ "--sst-i": i } as React.CSSProperties}
                >
                  <span className="sst-block">
                    <span className="sst-titel">{s.title}</span>
                    <span className="sst-claim">{s.claim}</span>
                  </span>
                  <span className="sst-zustand">
                    <span aria-hidden="true" className="sst-punkt" />
                    {ein ? "an" : "aus"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Detail-Panel der aktiven Saeule ───────────────────── */}
      <div
        className="mt-6 rounded-[14px] p-6"
        style={{
          background: "rgba(255,253,246,0.05)",
          border: "1px solid rgba(255,253,246,0.16)",
        }}
      >
        <div key={aktiveSaeule?.key ?? "leer"} className="sst-swap">
          <h3
            className="text-[19px] leading-[1.35] font-semibold"
            style={{ color: SNOW }}
          >
            {aktiveSaeule?.title}
          </h3>
          <p
            className="mt-2 text-[17px] leading-[1.45] font-medium"
            style={{ color: ORANGE }}
          >
            {aktiveSaeule?.claim}
          </p>
          <p
            className="mt-3 max-w-[68ch] text-[15.5px] leading-[1.65]"
            style={{ color: "rgba(255,253,246,0.78)" }}
          >
            {aktiveSaeule?.text}
          </p>
          <span className="sst-beleg">
            <span aria-hidden="true" className="sst-punkt-rail" />
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
.sst-schalter{display:flex;width:100%;min-height:44px;align-items:center;justify-content:space-between;gap:14px;text-align:left;padding:12px 14px;border-radius:12px;background:transparent;border:1px solid rgba(255,253,246,0.2);color:rgba(255,253,246,0.6);transition:border-color var(--duration-fast) var(--ease-smooth-out),background-color var(--duration-fast) var(--ease-smooth-out),color var(--duration-fast) var(--ease-smooth-out);animation:sst-auf var(--duration-quick) var(--ease-smooth-out) both;animation-delay:calc(var(--duration-stagger) * var(--sst-i, 0));}
.sst-schalter:hover{background:rgba(255,253,246,0.06);}
.sst-schalter:focus-visible{outline:2px solid #4C7DFF;outline-offset:3px;}
.sst-block{display:flex;flex-direction:column;gap:4px;min-width:0;}
.sst-titel{font-size:15px;font-weight:600;letter-spacing:-0.01em;line-height:1.25;color:rgba(255,253,246,0.6);transition:color var(--duration-fast) var(--ease-smooth-out);}
.sst-claim{font-size:12.5px;line-height:1.4;color:rgba(255,253,246,0.42);transition:color var(--duration-fast) var(--ease-smooth-out);}
.sst-zustand{display:inline-flex;align-items:center;gap:7px;font-size:12px;line-height:1;white-space:nowrap;color:rgba(255,253,246,0.45);transition:color var(--duration-fast) var(--ease-smooth-out);}
.sst-punkt{width:8px;height:8px;border-radius:50%;background:rgba(255,253,246,0.28);transition:background-color var(--duration-fast) var(--ease-smooth-out);}
.sst-schalter[data-ein="true"]{border-color:#E8641F;}
.sst-schalter[data-ein="true"] .sst-titel{color:#FFFDF6;}
.sst-schalter[data-ein="true"] .sst-claim{color:rgba(255,253,246,0.66);}
.sst-schalter[data-ein="true"] .sst-zustand{color:rgba(255,253,246,0.72);}
.sst-schalter[data-ein="true"] .sst-punkt{background:#E8641F;}
.sst-schalter[data-aktiv="true"]{background:rgba(255,253,246,0.08);}
.sst-beleg{display:inline-flex;align-items:center;gap:8px;margin-top:14px;font-size:12.5px;line-height:1.3;color:rgba(255,253,246,0.6);}
.sst-punkt-rail{width:7px;height:7px;border-radius:50%;background:#4C7DFF;flex:none;}
@keyframes sst-auf{from{opacity:0;transform:translateY(var(--distance-base));}to{opacity:1;transform:none;}}
@keyframes sst-tausch{from{opacity:0;transform:translateY(var(--distance-micro));filter:blur(var(--blur-small));}to{opacity:1;transform:none;filter:blur(0);}}
.sst-swap{animation:sst-tausch var(--duration-quick) var(--ease-in-out) both;}
.sst-wert{display:inline-block;animation:sst-tausch var(--duration-quick) var(--ease-in-out) both;}
@media (prefers-reduced-motion: reduce){
.sst-schalter,.sst-swap,.sst-wert{animation:none;}
.sst-schalter,.sst-titel,.sst-claim,.sst-zustand,.sst-punkt{transition:none;}
}
`;

export default SaeulenStudio;
