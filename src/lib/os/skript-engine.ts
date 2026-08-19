import Anthropic from "@anthropic-ai/sdk";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { legeSkripteAn, protokolliere, type SkriptNeu } from "./db";
import type { HookBilanz, SaeulenBilanz } from "./kpi";
import type { Saeule } from "./typen";

/**
 * Skript-Engine: Einzeiler rein, drehfertiger Batch raus.
 *
 * Das Protokoll ist nicht im Code dupliziert — es wird zur Laufzeit aus
 * docs/branding/ gelesen (siehe outputFileTracingIncludes in
 * next.config.mjs). Damit gibt es genau eine Quelle der Wahrheit: die
 * Markdown-Dateien, die Alex auch selbst liest und ändert.
 *
 * Der Regelkreis schließt sich hier: die aktuelle Hook- und Säulen-Bilanz
 * aus echten Zahlen geht in den Prompt. Die Engine schreibt also nicht
 * gegen die Theorie, sondern gegen das, was bei Alex nachweislich läuft.
 *
 * Env: ANTHROPIC_API_KEY
 */

const MODELL = "claude-opus-5";

async function protokollTexte(): Promise<string> {
  const basis = path.join(process.cwd(), "docs", "branding");
  const dateien = ["PROTOKOLL.md", "SPRACHPROFIL.md", "HOOK-PATTERNS.md"];
  const teile = await Promise.all(
    dateien.map(async (name) => {
      try {
        return `\n\n===== ${name} =====\n${await readFile(path.join(basis, name), "utf8")}`;
      } catch {
        return "";
      }
    }),
  );
  return teile.join("");
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

const SCHEMA = {
  type: "object",
  properties: {
    skripte: {
      type: "array",
      minItems: 5,
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          titel: { type: "string", description: "Arbeitstitel, max. 60 Zeichen" },
          saeule: {
            type: "string",
            enum: ["a", "b", "c"],
            description: "a = Selbstständigkeit real, b = AI/Claude praktisch, c = Webseiten bauen/verkaufen",
          },
          hook_interrupt: { type: "string", description: "Pattern-Interrupt, max. 8 Wörter" },
          hook_kontra: { type: "string", description: "Kontra-These, max. 8 Wörter" },
          hook_zahl: { type: "string", description: "Konkrete Zahl, max. 8 Wörter" },
          body: {
            type: "string",
            description: "Gesprochener Text in Alex' Sprache. Absätze sind Schnittmarken.",
          },
          loop_ende: { type: "string", description: "Letzter Satz, ohne CTA, führt zurück zum Hook" },
          regie: { type: "string", description: "Setting, B-Roll, Text-Inserts, Schnitt — 1 bis 3 Sätze" },
          laenge_sek: { type: "integer", minimum: 20, maximum: 45 },
        },
        required: [
          "titel",
          "saeule",
          "hook_interrupt",
          "hook_kontra",
          "hook_zahl",
          "body",
          "loop_ende",
          "regie",
          "laenge_sek",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["skripte"],
  additionalProperties: false,
} as const;

export type Generiert = SkriptNeu & { saeule: Saeule };

export function engineKonfiguriert(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export async function batchGenerieren(opts: {
  idee: string;
  anzahl: number;
  batch: string;
  hooks: HookBilanz[];
  saeulen: SaeulenBilanz[];
}): Promise<{ ok: boolean; skripte: Generiert[]; detail: string }> {
  if (!engineKonfiguriert()) {
    return { ok: false, skripte: [], detail: "ANTHROPIC_API_KEY fehlt" };
  }

  const client = new Anthropic();
  const system = `Du bist Alex' Personal-Branding-Stratege und Creative Director — kein Caption-Generator.
Arbeite strikt nach dem folgenden Protokoll. Die Strategie ist fix und wird nicht diskutiert.

${await protokollTexte()}

${datenlage(opts.hooks, opts.saeulen)}

HARTE REGELN FÜR DIESE AUSGABE
- Deutsch. Alex' Sprache: direkt, yapping-nativ, kurze Hauptsätze, keine Floskeln.
- Kein CTA, nirgends. Das Ende ist ein Loop.
- Phase 1: keine Immobilien-Inhalte, keine Verletzlichkeits-Posts.
- Jeder Hook maximal 8 Wörter, in 2 Sekunden erfassbar.
- Body 20 bis 45 Sekunden gesprochen — das sind grob 50 bis 110 Wörter.
- Creative Unlock: Die Idee ist der Startpunkt, nicht die Decke. Interpretiere,
  erweitere, dramatisiere. Schütze die Bedeutung, verbessere die Umsetzung frei.
- Verboten: "Lass uns eintauchen", "Game-Changer", "Stell dir vor", "Mindset",
  Motivationssprache, Beratersprech, jede Form von Bettel-CTA.`;

  try {
    const antwort = await client.messages.create({
      model: MODELL,
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      output_config: {
        effort: "high",
        format: { type: "json_schema", schema: SCHEMA },
      },
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "user",
          content: `Einzeiler-Idee: „${opts.idee}"

Baue daraus ${opts.anzahl} Reel-Skripte. Verteile sie über die Phase-1-Säulen,
Schwerpunkt darf der Idee folgen. Jedes Skript muss sofort drehbar sein.`,
        },
      ],
    });

    if (antwort.stop_reason === "refusal") {
      return { ok: false, skripte: [], detail: "Anfrage wurde abgelehnt" };
    }

    const text = antwort.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");
    const daten = JSON.parse(text) as { skripte: Omit<Generiert, "batch" | "nummer">[] };

    const skripte: Generiert[] = daten.skripte.map((s, i) => ({
      ...s,
      batch: opts.batch,
      nummer: i + 1,
    }));

    const gespeichert = await legeSkripteAn(skripte);
    const detail = `${gespeichert} Skripte aus „${opts.idee.slice(0, 60)}"`;
    await protokolliere("skript-engine", gespeichert > 0, gespeichert, detail);
    return { ok: gespeichert > 0, skripte, detail };
  } catch (e) {
    const detail = e instanceof Error ? e.message : "Unbekannter Fehler";
    await protokolliere("skript-engine", false, 0, detail);
    return { ok: false, skripte: [], detail };
  }
}
