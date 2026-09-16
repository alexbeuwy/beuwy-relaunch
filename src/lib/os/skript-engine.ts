import Anthropic from "@anthropic-ai/sdk";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { legeSkripteAn, protokolliere, type SkriptNeu } from "./db";
import { befundAlsText, pruefeTells, type TellBefund } from "./ki-tells";
import type { HookBilanz, SaeulenBilanz } from "./kpi";
import type { Saeule } from "./typen";

/**
 * Skript-Engine: Einzeiler (oder Referenz-Transkript) rein, geprüfter
 * Batch raus.
 *
 * Das Protokoll ist nicht im Code dupliziert — es wird zur Laufzeit aus
 * docs/branding/ gelesen (siehe outputFileTracingIncludes in
 * next.config.mjs). Damit gibt es genau eine Quelle der Wahrheit: die
 * Markdown-Dateien, die Alex auch selbst liest und ändert.
 *
 * Ablauf (docs/branding/PIPELINE.md):
 *   1. Referenz-Modus: Skelett aus dem fremden Transkript extrahieren
 *      (Beats, Zeitanteile, Retention-Geräte) — Opus.
 *   2. Writer: Skripte in das Skelett schreiben, mit Stimmkorpus — Opus.
 *   3. Scanner: KI-Tells deterministisch messen (ki-tells.ts).
 *   4. Kritiker: Sonnet liest Skript + Sprachprofil + Befund, nennt die
 *      Sätze, die neu gesagt werden müssen.
 *   5. Eine Überarbeitung durch den Writer, dann erneut messen.
 *   6. Gespeichert wird nur, was unter der Schwelle liegt.
 *
 * Env: ANTHROPIC_API_KEY · optional OS_PHASE=2 (gibt Phase-2-Säulen frei)
 */

const WRITER = "claude-opus-5";
const KRITIKER = "claude-sonnet-5";

/** Ab diesem Score geht ein Entwurf in die Überarbeitung. */
const SCHWELLE_UEBERARBEITEN = 3;
/** Ab diesem Score wird nach der Überarbeitung verworfen. */
const SCHWELLE_VERWERFEN = 6;

const BASIS = () => path.join(process.cwd(), "docs", "branding");

async function lies(name: string): Promise<string> {
  try {
    return await readFile(path.join(BASIS(), name), "utf8");
  } catch {
    return "";
  }
}

async function protokollTexte(): Promise<string> {
  const dateien = [
    "PROTOKOLL.md",
    "SPRACHPROFIL.md",
    "HOOK-PATTERNS.md",
    "SKELETTE.md",
    "KI-TELLS.md",
  ];
  const teile = await Promise.all(
    dateien.map(async (name) => {
      const text = await lies(name);
      return text ? `\n\n===== ${name} =====\n${text}` : "";
    }),
  );
  return teile.join("");
}

/**
 * Der Korpus ist der Stil. Er geht als eigener Block in den Prompt, mit
 * der Anweisung, Rhythmus zu übernehmen und keinen Satz zu kopieren.
 */
async function stimmkorpus(): Promise<string> {
  const text = await lies("STIMMKORPUS.md");
  if (!text.trim()) return "";
  return `\n\n===== STIMMKORPUS.md (echte Sätze von Alex) =====
Übernimm Rhythmus, Satzlänge, Wortwahl und die Art, wie Zahlen und
Selbstkorrekturen fallen. Kopiere keinen Satz. Erfinde keine Zahl, keinen
Namen und kein Projekt, das hier nicht steht oder in der Idee genannt ist.
${text}`;
}

/** Was die Daten sagen — wird dem Modell als Korrektiv mitgegeben. */
function datenlage(hooks: HookBilanz[], saeulen: SaeulenBilanz[]): string {
  const messbar = hooks.filter((h) => h.anzahl >= 3 && h.watchtime !== null);
  const hookText = messbar.length
    ? messbar
        .map((h) => `${h.name}: ${h.watchtime?.toFixed(0)} % Watchtime über ${h.anzahl} Reels`)
        .join(" · ")
    : "noch keine belastbare Hook-Bilanz (unter 3 Reels je Pattern)";

  const hungernd = saeulen.filter((s) => s.anteil < 20).map((s) => s.name);
  const saeulenText = hungernd.length
    ? `Unterversorgt und deshalb zu bevorzugen: ${hungernd.join(", ")}.`
    : "Die Säulen sind ausgeglichen.";

  return `AKTUELLE DATENLAGE (echte Zahlen aus dem OS)\nHook-Bilanz: ${hookText}\n${saeulenText}`;
}

export function phase(): 1 | 2 {
  return process.env.OS_PHASE === "2" ? 2 : 1;
}

function phasenRegeln(): string {
  return phase() === 2
    ? `PHASE 2 IST FREIGEGEBEN: Immobilien, Steuern, Psychologie der
Selbstständigkeit und Alex' Story sind erlaubt. Säulen d (Immobilien) und
e (Story/Marketing) dürfen verwendet werden. Verletzlichkeit dosiert, nie
als Selbstzweck.`
    : `PHASE 1: keine Immobilien-Inhalte, keine Verletzlichkeits-Posts, kein
CTA. Nur die Säulen a, b, c.`;
}

/* ── Schema ─────────────────────────────────────────────────────────── */

/* Achtung: minItems/maxItems und minimum/maximum sind bei Structured
   Outputs nicht erlaubt (die API lehnt sie mit 400 ab). Die Anzahl steht
   deshalb im Prompt, die Einhaltung prüft pruefen() unten. */

const SCHNITT_EREIGNIS = {
  type: "object",
  properties: {
    sek: { type: "number", description: "Sekundenmarke, z. B. 4.5" },
    zone: { type: "string", enum: ["oben", "unten", "voll"] },
    art: {
      type: "string",
      enum: ["schnitt", "zoom", "karte", "screen", "copy", "flash", "umdrehen"],
    },
    inhalt: { type: "string", description: "Was zu sehen ist, ein Satz" },
  },
  required: ["sek", "zone", "art", "inhalt"],
  additionalProperties: false,
} as const;

const SKRIPT_SCHEMA = {
  type: "object",
  properties: {
    titel: { type: "string", description: "Arbeitstitel, max. 60 Zeichen" },
    saeule: {
      type: "string",
      enum: ["a", "b", "c", "d", "e"],
      description:
        "a = Selbstständigkeit real, b = AI/Claude praktisch, c = Webseiten bauen/verkaufen, d = Immobilien (nur Phase 2), e = Story/Marketing (nur Phase 2)",
    },
    skelett: {
      type: "string",
      description: "Welches Skelett aus SKELETTE.md, z. B. „4 auf 1“ oder „6“",
    },
    hook_interrupt: { type: "string", description: "Pattern-Interrupt, max. 8 Wörter" },
    hook_kontra: { type: "string", description: "Kontra-These, max. 8 Wörter" },
    hook_zahl: { type: "string", description: "Konkrete Zahl, max. 8 Wörter" },
    body: {
      type: "string",
      description:
        "Gesprochener Text in Alex' Sprache. Absätze sind Beats und Schnittmarken.",
    },
    loop_ende: { type: "string", description: "Letzter Satz, ohne CTA, führt zurück zum Hook" },
    regie: { type: "string", description: "Setting, B-Roll, Text-Inserts — 1 bis 3 Sätze" },
    schnittplan: {
      type: "array",
      description:
        "Visuelle Ereignisse im 2-Sekunden-Takt, nie mehr als 2,5 Sekunden Abstand, 2 bis 4 Flash-Inserts",
      items: SCHNITT_EREIGNIS,
    },
    laenge_sek: {
      type: "integer",
      description: "Gesprochene Länge in Sekunden, zwischen 20 und 45",
    },
  },
  required: [
    "titel",
    "saeule",
    "skelett",
    "hook_interrupt",
    "hook_kontra",
    "hook_zahl",
    "body",
    "loop_ende",
    "regie",
    "schnittplan",
    "laenge_sek",
  ],
  additionalProperties: false,
} as const;

const BATCH_SCHEMA = {
  type: "object",
  properties: {
    skelett_analyse: {
      type: "string",
      description:
        "Nur im Referenz-Modus: Beats des Referenz-Reels mit Funktion und Zeitanteil, Retention-Geräte, gewähltes Skelett. Sonst leer.",
    },
    skripte: {
      type: "array",
      description: "Die geforderte Anzahl Reel-Skripte, nicht mehr und nicht weniger",
      items: SKRIPT_SCHEMA,
    },
  },
  required: ["skelett_analyse", "skripte"],
  additionalProperties: false,
} as const;

const KRITIK_SCHEMA = {
  type: "object",
  properties: {
    urteile: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nummer: { type: "integer", description: "Index des Skripts, ab 1" },
          bestanden: { type: "boolean" },
          befund: {
            type: "string",
            description:
              "Welche Sätze nicht nach Alex klingen und warum, welche Regel des Sprachprofils verletzt ist. Leer, wenn bestanden.",
          },
        },
        required: ["nummer", "bestanden", "befund"],
        additionalProperties: false,
      },
    },
  },
  required: ["urteile"],
  additionalProperties: false,
} as const;

/* ── Typen ──────────────────────────────────────────────────────────── */

export type SchnittEreignis = {
  sek: number;
  zone: "oben" | "unten" | "voll";
  art: "schnitt" | "zoom" | "karte" | "screen" | "copy" | "flash" | "umdrehen";
  inhalt: string;
};

type Entwurf = {
  titel: string;
  saeule: "a" | "b" | "c" | "d" | "e";
  skelett: string;
  hook_interrupt: string;
  hook_kontra: string;
  hook_zahl: string;
  body: string;
  loop_ende: string;
  regie: string;
  schnittplan: SchnittEreignis[];
  laenge_sek: number;
};

export type Generiert = SkriptNeu & {
  saeule: Saeule | null;
  skelett: string;
  schnittplan: SchnittEreignis[];
  tells: TellBefund;
  kritik: string;
};

export function engineKonfiguriert(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/* ── Hilfen ─────────────────────────────────────────────────────────── */

function textAus(antwort: Anthropic.Message): string {
  return antwort.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

/**
 * Ersetzt die Schema-Constraints, die Structured Outputs nicht kennt:
 * Anzahl kappen, Länge in den drehbaren Bereich zwingen, Schnittplan
 * nach Sekunde sortieren. Lieber ein zurechtgerückter Batch als ein
 * harter Fehler.
 */
function pruefen(roh: Entwurf[], anzahl: number): Entwurf[] {
  return roh.slice(0, anzahl).map((s) => ({
    ...s,
    laenge_sek: Math.min(45, Math.max(20, Math.round(Number(s.laenge_sek) || 30))),
    schnittplan: (Array.isArray(s.schnittplan) ? s.schnittplan : [])
      .map((e) => ({ ...e, sek: Math.max(0, Number(e.sek) || 0) }))
      .sort((a, b) => a.sek - b.sek),
  }));
}

/** Der Schnittplan landet lesbar in der Regie, weil die DB kein eigenes Feld hat. */
function schnittplanAlsText(plan: SchnittEreignis[]): string {
  if (!plan.length) return "";
  return plan
    .map((e) => `${e.sek.toFixed(1).padStart(5)}  ${e.zone.padEnd(5)} ${e.art.padEnd(8)} ${e.inhalt}`)
    .join("\n");
}

function messen(s: Entwurf): TellBefund {
  return pruefeTells({
    body: s.body,
    loop_ende: s.loop_ende,
    hooks: [s.hook_interrupt, s.hook_kontra, s.hook_zahl],
  });
}

/* ── Kritiker (Sonnet) ──────────────────────────────────────────────── */

async function kritisieren(
  client: Anthropic,
  entwuerfe: Entwurf[],
  befunde: TellBefund[],
): Promise<Map<number, string>> {
  const sprachprofil = await lies("SPRACHPROFIL.md");
  const korpus = await lies("STIMMKORPUS.md");

  const skriptText = entwuerfe
    .map(
      (s, i) => `--- Skript ${i + 1} (Säule ${s.saeule}, Skelett ${s.skelett}) ---
Hooks: ${s.hook_interrupt} | ${s.hook_kontra} | ${s.hook_zahl}
Body:
${s.body}
Loop: ${s.loop_ende}
Scanner: ${befundAlsText(befunde[i]) || "Score 0"}`,
    )
    .join("\n\n");

  const antwort = await client.messages.create({
    model: KRITIKER,
    max_tokens: 6000,
    output_config: { format: { type: "json_schema", schema: KRITIK_SCHEMA } },
    system: `Du bist der Kritiker in Alex' Skript-Engine. Du schreibst nichts um.
Du prüfst, ob jeder gesprochene Satz klingt, als hätte Alex ihn beim Gehen in
die Frontkamera gesagt. Maßstab ist ausschließlich das Sprachprofil und der
Stimmkorpus unten. Nicht bestanden heißt: mindestens ein Satz ist
Berater-Deutsch, KI-Deutsch, Motivationssprache oder eine Floskel, oder das
Skript enthält keine Zahl, kein Ich, keinen Eigennamen, oder die Phasenregel
wird verletzt.
Phasenregel: ${phasenRegeln()}
Sei streng. Ein Skript, das „gut klingt", aber von jedem Creator sein könnte,
ist nicht bestanden. Nenne im Befund die konkreten Sätze.

===== SPRACHPROFIL.md =====
${sprachprofil}

===== STIMMKORPUS.md =====
${korpus}`,
    messages: [{ role: "user", content: skriptText }],
  });

  const daten = JSON.parse(textAus(antwort)) as {
    urteile: { nummer: number; bestanden: boolean; befund: string }[];
  };
  const map = new Map<number, string>();
  for (const u of daten.urteile ?? []) {
    if (!u.bestanden && u.befund.trim()) map.set(u.nummer - 1, u.befund.trim());
  }
  return map;
}

/* ── Writer (Opus) ──────────────────────────────────────────────────── */

async function schreiben(
  client: Anthropic,
  system: string,
  verlauf: Anthropic.MessageParam[],
): Promise<{ text: string; verlauf: Anthropic.MessageParam[] } | null> {
  const antwort = await client.messages.create({
    model: WRITER,
    max_tokens: 24000,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "high",
      format: { type: "json_schema", schema: BATCH_SCHEMA },
    },
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: verlauf,
  });
  if (antwort.stop_reason === "refusal") return null;
  const text = textAus(antwort);
  return {
    text,
    verlauf: [...verlauf, { role: "assistant", content: text }],
  };
}

/* ── Öffentlich ─────────────────────────────────────────────────────── */

export async function batchGenerieren(opts: {
  idee: string;
  anzahl: number;
  batch: string;
  hooks: HookBilanz[];
  saeulen: SaeulenBilanz[];
  /** Transkript eines nachweislich erfolgreichen Reels — schaltet den Referenz-Modus ein. */
  referenz?: string;
}): Promise<{ ok: boolean; skripte: Generiert[]; detail: string; skelett_analyse: string }> {
  if (!engineKonfiguriert()) {
    return { ok: false, skripte: [], detail: "ANTHROPIC_API_KEY fehlt", skelett_analyse: "" };
  }

  const referenz = opts.referenz?.trim() ?? "";
  const modus = referenz ? "referenz" : "frei";
  const client = new Anthropic();

  const system = `Du bist Alex' Personal-Branding-Stratege und Creative Director — kein Caption-Generator.
Arbeite strikt nach dem folgenden Protokoll. Die Strategie ist fix und wird nicht diskutiert.

${await protokollTexte()}
${await stimmkorpus()}

${datenlage(opts.hooks, opts.saeulen)}

${phasenRegeln()}

HARTE REGELN FÜR DIESE AUSGABE
- Deutsch. Alex' Sprache: direkt, yapping-nativ, kurze Hauptsätze, keine Floskeln.
- Kein CTA, nirgends. Das Ende ist ein Loop.
- Jeder Hook maximal 8 Wörter, in 2 Sekunden erfassbar. Der erste gesprochene
  Satz wiederholt keinen Hook wörtlich.
- Body 20 bis 45 Sekunden gesprochen — das sind grob 50 bis 110 Wörter.
  Absätze sind Beats des gewählten Skeletts.
- Jedes Skript enthält mindestens eine konkrete Zahl, ein „ich" und einen
  Eigennamen (Tool, Kunde, Ort). Nichts davon erfinden: nur aus Stimmkorpus,
  Protokoll oder der Idee.
- Schnittplan nach SKELETTE.md Teil 4: Ereignisse im 2-Sekunden-Takt, nie
  mehr als 2,5 Sekunden Abstand, Copy-Hook bei 0.0, 2 bis 4 Flash-Inserts
  (0,8 bis 1,5 Sekunden), Loop-Schnitt am Ende auf das Anfangsbild.
- Vor der Ausgabe jeden Satz gegen KI-TELLS.md prüfen. Ein Treffer heißt:
  den Satz neu sagen, nicht umstellen.
- Creative Unlock: Die Idee ist der Startpunkt, nicht die Decke. Interpretiere,
  erweitere, dramatisiere. Schütze die Bedeutung, verbessere die Umsetzung frei.`;

  const auftrag =
    modus === "referenz"
      ? `REFERENZ-MODUS (SKELETTE.md Teil 3).

Transkript eines Reels, das nachweislich funktioniert hat:
"""
${referenz.slice(0, 6000)}
"""

Alex' Thema: „${opts.idee}"

Schritt 1: Extrahiere das Skelett des Referenz-Reels. Ordne jedem Satz eine
Funktion zu (Hook, Kontext, Bruch, Beleg, Zwischenstation, Reward, Loop),
schätze Zeitanteile, notiere die Retention-Geräte (offene Lücken, Zahlen,
Widersprüche, Flash-Inserts, Kamerawechsel). Benenne, welchem Skelett aus
SKELETTE.md das entspricht. Schreibe das in „skelett_analyse".

Schritt 2: Schreibe ${opts.anzahl} Skripte zu Alex' Thema in genau dieses
Skelett. Gleiche Funktion, gleiche Position, gleicher Zeitanteil je Beat.
Kein Wort des Originals übernehmen. Jedes Skript nimmt einen anderen
Blickwinkel auf das Thema, das Skelett bleibt gleich.`
      : `Einzeiler-Idee: „${opts.idee}"

Wähle für jedes Skript ein Skelett aus SKELETTE.md, das zur Idee passt, und
schreibe es Beat für Beat hinein. Baue ${opts.anzahl} Reel-Skripte. Verteile
sie über die erlaubten Säulen, Schwerpunkt darf der Idee folgen. Jedes
Skript muss sofort drehbar sein. „skelett_analyse" bleibt leer.`;

  try {
    /* 1+2: Writer */
    const erster = await schreiben(client, system, [{ role: "user", content: auftrag }]);
    if (!erster) {
      return { ok: false, skripte: [], detail: "Anfrage wurde abgelehnt", skelett_analyse: "" };
    }
    const daten = JSON.parse(erster.text) as { skelett_analyse: string; skripte: Entwurf[] };
    if (!Array.isArray(daten.skripte) || daten.skripte.length === 0) {
      return { ok: false, skripte: [], detail: "Modell lieferte keine Skripte", skelett_analyse: "" };
    }
    let entwuerfe = pruefen(daten.skripte, opts.anzahl);
    const skelettAnalyse = daten.skelett_analyse ?? "";

    /* 3+4: Scanner und Kritiker */
    let befunde = entwuerfe.map(messen);
    let kritik = await kritisieren(client, entwuerfe, befunde).catch(() => new Map<number, string>());

    /* 5: eine Überarbeitung für alles, was auffällt */
    const nacharbeit = entwuerfe
      .map((s, i) => {
        const gruende: string[] = [];
        if (befunde[i].score >= SCHWELLE_UEBERARBEITEN) gruende.push(befundAlsText(befunde[i]));
        if (kritik.has(i)) gruende.push(`Kritiker: ${kritik.get(i)}`);
        return gruende.length ? `Skript ${i + 1}: ${gruende.join(" · ")}` : "";
      })
      .filter(Boolean);

    if (nacharbeit.length) {
      const zweiter = await schreiben(client, system, [
        ...erster.verlauf,
        {
          role: "user",
          content: `PRÜFUNG. Diese Skripte sind durchgefallen:

${nacharbeit.join("\n\n")}

Gib den kompletten Batch erneut aus (alle ${entwuerfe.length} Skripte, gleiche
Reihenfolge, „skelett_analyse" unverändert). Die beanstandeten Sätze werden
nicht umgestellt, sondern neu gesagt: so, wie Alex sie beim Gehen sagen würde.
Skripte ohne Beanstandung bleiben wörtlich gleich.`,
        },
      ]);
      if (zweiter) {
        const neu = JSON.parse(zweiter.text) as { skripte: Entwurf[] };
        if (Array.isArray(neu.skripte) && neu.skripte.length === entwuerfe.length) {
          entwuerfe = pruefen(neu.skripte, opts.anzahl);
          befunde = entwuerfe.map(messen);
          kritik = await kritisieren(client, entwuerfe, befunde).catch(() => kritik);
        }
      }
    }

    /* 6: nur speichern, was trägt */
    const erlaubteSaeulen: ReadonlySet<string> =
      phase() === 2 ? new Set(["a", "b", "c", "d", "e"]) : new Set(["a", "b", "c"]);
    const fertig: Generiert[] = [];
    let verworfen = 0;
    entwuerfe.forEach((s, i) => {
      if (befunde[i].score >= SCHWELLE_VERWERFEN || !erlaubteSaeulen.has(s.saeule)) {
        verworfen += 1;
        return;
      }
      const dbSaeule: Saeule | null =
        s.saeule === "a" || s.saeule === "b" || s.saeule === "c" ? s.saeule : null;
      const plan = schnittplanAlsText(s.schnittplan);
      fertig.push({
        batch: opts.batch,
        nummer: fertig.length + 1,
        titel: s.titel,
        saeule: dbSaeule,
        hook_interrupt: s.hook_interrupt,
        hook_kontra: s.hook_kontra,
        hook_zahl: s.hook_zahl,
        body: s.body,
        loop_ende: s.loop_ende,
        regie: [s.regie, `Skelett ${s.skelett}`, plan ? `Schnittplan:\n${plan}` : ""]
          .filter(Boolean)
          .join("\n\n"),
        laenge_sek: s.laenge_sek,
        skelett: s.skelett,
        schnittplan: s.schnittplan,
        tells: befunde[i],
        kritik: kritik.get(i) ?? "",
      });
    });

    if (fertig.length === 0) {
      const detail = `Alle ${entwuerfe.length} Skripte verworfen (Score ≥ ${SCHWELLE_VERWERFEN} oder Säule gesperrt)`;
      await protokolliere("skript-engine", false, 0, detail);
      return { ok: false, skripte: [], detail, skelett_analyse: skelettAnalyse };
    }

    const gespeichert = await legeSkripteAn(
      fertig.map(({ skelett: _s, schnittplan: _p, tells: _t, kritik: _k, ...rest }) => rest),
    );
    const scores = fertig.map((s) => s.tells.score).join("/");
    const detail =
      `${gespeichert} Skripte aus „${opts.idee.slice(0, 60)}" · Modus ${modus} · ` +
      `Tells ${scores}` +
      (verworfen ? ` · ${verworfen} verworfen` : "") +
      (nacharbeit.length ? ` · ${nacharbeit.length} überarbeitet` : "");
    await protokolliere("skript-engine", gespeichert > 0, gespeichert, detail);
    return { ok: gespeichert > 0, skripte: fertig, detail, skelett_analyse: skelettAnalyse };
  } catch (e) {
    const detail = e instanceof Error ? e.message : "Unbekannter Fehler";
    await protokolliere("skript-engine", false, 0, detail);
    return { ok: false, skripte: [], detail, skelett_analyse: "" };
  }
}
