import {
  HOOKS,
  SAEULEN,
  type HookTyp,
  type Reel,
  type Saeule,
  type Skript,
  type Snapshot,
} from "./typen";

/**
 * Entscheidungs-Engine. Übersetzt die Zahlen in Anweisungen — exakt nach
 * den Schwellen aus docs/branding/KPI-LOGIK.md. Wer hier etwas ändert,
 * ändert es dort mit; die Datei ist die Begründung, dieser Code die
 * Ausführung.
 *
 * Grundregel: kein Urteil vor MINDEST_STICHPROBE Reels. Alles darunter
 * wird als "sammelt noch" ausgewiesen, nicht als Ergebnis.
 */

export const MINDEST_STICHPROBE = 10;

/* Start der Kadenz — bestimmt Woche, Phase und CTA-Freigabe.
   Über OS_START in der Env überschreibbar (Format JJJJ-MM-TT). */
export function startDatum(): Date {
  const roh = process.env.OS_START || process.env.NEXT_PUBLIC_OS_START;
  const d = roh ? new Date(`${roh}T00:00:00Z`) : null;
  return d && !Number.isNaN(d.getTime()) ? d : new Date("2026-08-19T00:00:00Z");
}

export function tagIso(versatz = 0): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + versatz);
  return d.toISOString().slice(0, 10);
}

export type Kennzahlen = {
  anzahl: number;
  views: number | null;
  watchtime: number | null;
  savesRate: number | null;
  shareRate: number | null;
  followConv: number | null;
};

export function kennzahlen(reels: Reel[]): Kennzahlen {
  if (reels.length === 0) {
    return {
      anzahl: 0,
      views: null,
      watchtime: null,
      savesRate: null,
      shareRate: null,
      followConv: null,
    };
  }
  const summe = (f: (r: Reel) => number) => reels.reduce((a, r) => a + f(r), 0);
  const views = summe((r) => r.views);
  /* Watchtime nur über die Reels mitteln, die einen Wert haben — sonst
     zieht jedes TikTok-Reel (ohne Watchtime) den Schnitt nach unten. */
  const mitWt = reels.filter((r) => r.watchtime_prozent !== null);
  const profil = summe((r) => r.profilbesuche);
  return {
    anzahl: reels.length,
    views: views / reels.length,
    watchtime: mitWt.length
      ? mitWt.reduce((a, r) => a + (r.watchtime_prozent as number), 0) / mitWt.length
      : null,
    savesRate: views > 0 ? (summe((r) => r.saves) / views) * 1000 : null,
    shareRate: views > 0 ? (summe((r) => r.shares) / views) * 1000 : null,
    followConv: profil > 0 ? (summe((r) => r.follows) / profil) * 100 : null,
  };
}

export type Dringlichkeit = "handeln" | "beobachten" | "laeuft" | "sammeln";

export type Entscheidung = {
  titel: string;
  begruendung: string;
  aktion: string;
  stufe: Dringlichkeit;
};

export type HookBilanz = {
  typ: HookTyp;
  name: string;
  anzahl: number;
  watchtime: number | null;
  views: number | null;
};

export type SaeulenBilanz = {
  saeule: Saeule;
  name: string;
  anzahl: number;
  anteil: number;
  views: number | null;
};

export type Lage = {
  woche: number;
  ctaFrei: boolean;
  phase: string;
  streak: number;
  heuteGepostet: boolean;
  woche7: Kennzahlen;
  vorwoche: Kennzahlen;
  follower: { gesamt: number | null; proTag: number | null };
  hooks: HookBilanz[];
  saeulen: SaeulenBilanz[];
  entscheidungen: Entscheidung[];
  pipeline: Record<string, number>;
  naechste: Skript[];
};

function median(werte: number[]): number {
  if (werte.length === 0) return 0;
  const s = [...werte].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/**
 * Die eigentliche Logik: aus einem Snapshot wird die Lage.
 * Alle Zeitfenster in UTC-Tagen, damit Server und Browser dasselbe sehen.
 */
export function lageBerechnen(snap: Snapshot): Lage {
  const heute = tagIso();
  const d7 = tagIso(-6);
  const d14 = tagIso(-13);

  const woche = Math.max(
    1,
    Math.floor((Date.now() - startDatum().getTime()) / (7 * 864e5)) + 1,
  );
  const ctaFrei = woche >= 4;

  const imFenster = (r: Reel, von: string, bis?: string) => {
    const t = r.veroeffentlicht_am.slice(0, 10);
    return t >= von && (!bis || t < bis);
  };

  const aktuell = snap.reels.filter((r) => imFenster(r, d7));
  const vorher = snap.reels.filter((r) => imFenster(r, d14, d7));
  const w7 = kennzahlen(aktuell);
  const vw = kennzahlen(vorher);

  /* Kadenz: an wie vielen Tagen in Folge (rückwärts ab gestern) lag mindestens
     ein Post? Heute zählt mit, wenn schon gepostet wurde. */
  const posttage = new Set(snap.reels.map((r) => r.veroeffentlicht_am.slice(0, 10)));
  const heuteGepostet = posttage.has(heute);
  let streak = 0;
  for (let i = heuteGepostet ? 0 : 1; i < 400; i++) {
    if (!posttage.has(tagIso(-i))) break;
    streak++;
  }

  /* Follower: aktueller Stand über alle Plattformen, Zuwachs über 7 Tage. */
  const proPlattform = new Map<string, { datum: string; follower: number }[]>();
  for (const t of snap.tage) {
    const liste = proPlattform.get(t.plattform) ?? [];
    liste.push({ datum: t.datum, follower: t.follower });
    proPlattform.set(t.plattform, liste);
  }
  let gesamt: number | null = null;
  let vor7 = 0;
  let hatVergleich = false;
  for (const liste of proPlattform.values()) {
    liste.sort((a, b) => a.datum.localeCompare(b.datum));
    const letzter = liste.at(-1);
    if (!letzter) continue;
    gesamt = (gesamt ?? 0) + letzter.follower;
    const alt = [...liste].reverse().find((t) => t.datum <= d7);
    if (alt && alt.datum < letzter.datum) {
      vor7 += alt.follower;
      hatVergleich = true;
    }
  }
  const proTag =
    gesamt !== null && hatVergleich ? Math.round(((gesamt - vor7) / 7) * 10) / 10 : null;

  /* Hook-Bilanz: welches Pattern hält die Aufmerksamkeit? */
  const hooks: HookBilanz[] = (Object.keys(HOOKS) as HookTyp[]).map((typ) => {
    const menge = snap.reels.filter((r) => r.hook_typ === typ);
    const k = kennzahlen(menge);
    return {
      typ,
      name: HOOKS[typ],
      anzahl: menge.length,
      watchtime: k.watchtime,
      views: k.views,
    };
  });

  /* Säulen-Balance über die letzten 14 Tage. */
  const letzte14 = snap.reels.filter((r) => imFenster(r, d14));
  const saeulen: SaeulenBilanz[] = (Object.keys(SAEULEN) as Saeule[]).map((s) => {
    const menge = letzte14.filter((r) => r.saeule === s);
    const k = kennzahlen(menge);
    return {
      saeule: s,
      name: SAEULEN[s],
      anzahl: menge.length,
      anteil: letzte14.length ? (menge.length / letzte14.length) * 100 : 0,
      views: k.views,
    };
  });

  /* Pipeline-Zählung und die nächsten drehbaren Skripte. */
  const pipeline: Record<string, number> = {};
  for (const s of snap.skripte) pipeline[s.status] = (pipeline[s.status] ?? 0) + 1;
  const naechste = snap.skripte
    .filter((s) => s.status === "skript" || s.status === "gedreht")
    .sort((a, b) => (a.geplant_fuer ?? "9999").localeCompare(b.geplant_fuer ?? "9999"))
    .slice(0, 4);

  return {
    woche,
    ctaFrei,
    phase: ctaFrei
      ? "Phase 1 · CTA frei (max. 1×/Woche)"
      : `Phase 1 · reiner Value bis Woche 4 (noch ${4 - woche})`,
    streak,
    heuteGepostet,
    woche7: w7,
    vorwoche: vw,
    follower: { gesamt, proTag },
    hooks,
    saeulen,
    pipeline,
    naechste,
    entscheidungen: entscheidungen({
      snap,
      w7,
      vw,
      hooks,
      saeulen,
      pipeline,
      streak,
      heuteGepostet,
      woche,
    }),
  };
}

function entscheidungen(x: {
  snap: Snapshot;
  w7: Kennzahlen;
  vw: Kennzahlen;
  hooks: HookBilanz[];
  saeulen: SaeulenBilanz[];
  pipeline: Record<string, number>;
  streak: number;
  heuteGepostet: boolean;
  woche: number;
}): Entscheidung[] {
  const liste: Entscheidung[] = [];
  const alle = x.snap.reels;
  const bewertbar = alle.length >= MINDEST_STICHPROBE;

  /* 1. Kadenz zuerst — ohne Post nützt die beste Analyse nichts. */
  const drehbereit = (x.pipeline["skript"] ?? 0) + (x.pipeline["gedreht"] ?? 0);
  if (!x.heuteGepostet) {
    liste.push({
      titel: "Heute ist noch nichts raus",
      begruendung:
        drehbereit > 0
          ? `${drehbereit} Skripte liegen drehbereit in der Pipeline.`
          : "Und es liegt kein fertiges Skript bereit.",
      aktion: drehbereit > 0 ? "Nächstes Skript drehen und posten" : "Batch generieren, dann drehen",
      stufe: "handeln",
    });
  }
  if (drehbereit < 3) {
    liste.push({
      titel: "Pipeline läuft leer",
      begruendung: `Nur ${drehbereit} drehbereite Skripte — bei einem Reel pro Tag reicht das ${drehbereit} Tage.`,
      aktion: "Einzeiler-Idee eingeben, Batch generieren lassen",
      stufe: drehbereit === 0 ? "handeln" : "beobachten",
    });
  }

  /* 2. Watchtime — die Währung. */
  if (!bewertbar) {
    liste.push({
      titel: `Noch ${MINDEST_STICHPROBE - alle.length} Reels bis zum ersten Urteil`,
      begruendung: `${alle.length} von ${MINDEST_STICHPROBE} erfasst. Einzelne Reels streuen zu stark, um daraus etwas zu lernen.`,
      aktion: "Weiter produzieren, nichts an der Strategie ändern",
      stufe: "sammeln",
    });
  } else if (x.w7.watchtime !== null) {
    if (x.w7.watchtime < 50) {
      liste.push({
        titel: `Watchtime bei ${x.w7.watchtime.toFixed(0)} % — die ersten Sekunden verlieren`,
        begruendung:
          "Unter 50 % steigen die Leute in der Hook aus, nicht im Body. Der Inhalt ist nicht das Problem.",
        aktion: "Hook-Pattern wechseln, härter schneiden: erstes Bild in Bewegung",
        stufe: "handeln",
      });
    } else if (x.w7.watchtime < 70) {
      liste.push({
        titel: `Watchtime ${x.w7.watchtime.toFixed(0)} % — trägt, reißt aber nicht`,
        begruendung: "Zwischen 50 und 70 % hält der Hook, der Body verliert das Tempo.",
        aktion: "Body kürzen: ein Gedanke, konkrete Zahl in den ersten 10 Sekunden",
        stufe: "beobachten",
      });
    } else {
      liste.push({
        titel: `Watchtime ${x.w7.watchtime.toFixed(0)} % — Format sitzt`,
        begruendung: "Über 70 %: der Aufbau funktioniert, nichts daran ändern.",
        aktion: "Bauweise beibehalten, nur Themen tauschen",
        stufe: "laeuft",
      });
    }
  }

  /* 3. Saves = Value-Dichte. */
  if (bewertbar && x.w7.savesRate !== null) {
    if (x.w7.savesRate >= 10) {
      liste.push({
        titel: `${x.w7.savesRate.toFixed(1)} Saves je 1.000 Views — Value-Winner`,
        begruendung: "Ab 10 gespeicherten je 1.000 Views ist das Format nachweislich nützlich.",
        aktion: "Format klonen: gleiches Skelett, neues Thema",
        stufe: "laeuft",
      });
    } else if (x.w7.savesRate < 5 && (x.w7.watchtime ?? 0) >= 50) {
      liste.push({
        titel: `Nur ${x.w7.savesRate.toFixed(1)} Saves je 1.000 Views`,
        begruendung: "Gut angesehen, aber nicht aufgehoben: unterhaltsam statt nützlich.",
        aktion: "Konkreter werden — Zahlen, Schritte, echte Projektbeispiele",
        stufe: "handeln",
      });
    }
  }

  /* 4. Profil hält nicht, was das Reel verspricht. */
  if (bewertbar && x.w7.followConv !== null && x.w7.followConv < 5) {
    liste.push({
      titel: `Follow-Conversion ${x.w7.followConv.toFixed(1)} %`,
      begruendung:
        "Die Leute kommen aufs Profil und gehen wieder. Das Problem liegt nicht im Reel, sondern im Profil.",
      aktion: "Bio, Highlights und die drei angehefteten Reels überarbeiten",
      stufe: "handeln",
    });
  }

  /* 5. Hook-Pattern: Gewinner gegen Verlierer, nur bei echter Stichprobe. */
  const gemessen = x.hooks.filter((h) => h.anzahl >= 3 && h.watchtime !== null);
  if (gemessen.length >= 2) {
    const sortiert = [...gemessen].sort(
      (a, b) => (b.watchtime as number) - (a.watchtime as number),
    );
    const best = sortiert[0];
    const schlecht = sortiert.at(-1) as HookBilanz;
    const spanne = (best.watchtime as number) - (schlecht.watchtime as number);
    if (spanne >= 8) {
      liste.push({
        titel: `${best.name} schlägt ${schlecht.name} um ${spanne.toFixed(0)} Punkte`,
        begruendung: `${best.watchtime?.toFixed(0)} % gegen ${schlecht.watchtime?.toFixed(0)} % Watchtime über ${best.anzahl} bzw. ${schlecht.anzahl} Reels.`,
        aktion: `Die nächsten 5 Reels mit ${best.name} drehen`,
        stufe: "laeuft",
      });
    }
  }

  /* 6. Säulen-Balance: keine Säule länger als 2 Wochen unter 20 %. */
  const hungernd = x.saeulen.filter((s) => s.anteil < 20);
  if (x.snap.reels.length >= 6 && hungernd.length > 0) {
    liste.push({
      titel: `Säule ${hungernd.map((s) => s.name).join(" und ")} unterversorgt`,
      begruendung: hungernd
        .map((s) => `${s.name}: ${s.anteil.toFixed(0)} % der letzten 14 Tage`)
        .join(" · "),
      aktion: "Nächsten Batch auf diese Säule ziehen",
      stufe: "beobachten",
    });
  }

  /* 7. Ausreißer: > 3× Median-Views verlangt binnen 48 h eine Fortsetzung. */
  const med = median(alle.map((r) => r.views));
  if (med > 0) {
    const grenze = tagIso(-2);
    const ausreisser = alle.filter(
      (r) => r.views > med * 3 && r.veroeffentlicht_am.slice(0, 10) >= grenze,
    );
    for (const r of ausreisser.slice(0, 2)) {
      liste.push({
        titel: `Ausreißer: „${r.titel ?? "ohne Titel"}"`,
        begruendung: `${r.views.toLocaleString("de-DE")} Views bei einem Median von ${Math.round(med).toLocaleString("de-DE")}.`,
        aktion: "Binnen 48 Stunden ein Folge-Reel zum selben Thema",
        stufe: "handeln",
      });
    }
  }

  /* 8. CTA-Fenster. */
  if (x.woche >= 4 && x.woche <= 6) {
    liste.push({
      titel: `Woche ${x.woche} — CTA ist frei`,
      begruendung: "Ab Woche 4 ist ein Aufruf erlaubt, maximal einer pro Woche.",
      aktion: "Ein Reel dieser Woche auf das Webinar enden lassen",
      stufe: "beobachten",
    });
  }

  const rang: Record<Dringlichkeit, number> = {
    handeln: 0,
    beobachten: 1,
    sammeln: 2,
    laeuft: 3,
  };
  return liste.sort((a, b) => rang[a.stufe] - rang[b.stufe]);
}
