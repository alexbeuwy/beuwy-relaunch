import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { darfBedienen } from "@/lib/os/zugang";
import { aendereSkript, ladeSnapshot } from "@/lib/os/db";
import { batchGenerieren, engineKonfiguriert } from "@/lib/os/skript-engine";
import { lageBerechnen } from "@/lib/os/kpi";

/**
 * POST  — Einzeiler rein, Batch raus (Claude, mit Sprachprofil, Stimmkorpus
 *         und der aktuellen Hook-Bilanz aus echten Zahlen). Mit `referenz`
 *         (Transkript eines erfolgreichen Reels) läuft der Referenz-Modus:
 *         Skelett übernehmen, Inhalt von Alex (docs/branding/SKELETTE.md).
 * PATCH — Status eines Skripts weiterschieben: idee → skript → gedreht
 *         → geplant → gepostet, oder Hook-Wahl festhalten.
 */

export const runtime = "nodejs";
export const maxDuration = 300;

const STATUS = ["idee", "skript", "gedreht", "geplant", "gepostet", "verworfen"];
const HOOKS = ["interrupt", "kontra", "zahl"];

export async function POST(req: NextRequest) {
  if (!(await darfBedienen(req))) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet" }, { status: 401 });
  }
  if (!engineKonfiguriert()) {
    return NextResponse.json(
      { ok: false, error: "ANTHROPIC_API_KEY ist auf diesem Deployment nicht gesetzt." },
      { status: 503 },
    );
  }

  let body: { idee?: unknown; anzahl?: unknown; referenz?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültiges JSON" }, { status: 400 });
  }

  const idee = typeof body.idee === "string" ? body.idee.trim() : "";
  if (idee.length < 3 || idee.length > 400) {
    return NextResponse.json(
      { ok: false, error: "Idee muss zwischen 3 und 400 Zeichen lang sein." },
      { status: 400 },
    );
  }
  const referenz = typeof body.referenz === "string" ? body.referenz.trim() : "";
  if (referenz.length > 6000) {
    return NextResponse.json(
      { ok: false, error: "Referenz-Transkript darf höchstens 6000 Zeichen haben." },
      { status: 400 },
    );
  }
  /* Im Referenz-Modus reichen drei Skripte: ein Skelett, drei Blickwinkel. */
  const anzahl = referenz
    ? Math.min(6, Math.max(3, Number(body.anzahl) || 3))
    : Math.min(10, Math.max(5, Number(body.anzahl) || 6));

  /* Batch-Nummer fortlaufend, Hook-Bilanz als Korrektiv für den Prompt. */
  const snap = await ladeSnapshot();
  const lage = lageBerechnen(snap);
  const bisher = new Set(snap.skripte.map((s) => s.batch).filter(Boolean));
  const nummer = String(bisher.size + 2).padStart(3, "0");

  const ergebnis = await batchGenerieren({
    idee,
    anzahl,
    batch: `batch-${nummer}`,
    hooks: lage.hooks,
    saeulen: lage.saeulen,
    referenz: referenz || undefined,
  });

  revalidatePath("/os");
  return NextResponse.json(ergebnis, { status: ergebnis.ok ? 200 : 502 });
}

export async function PATCH(req: NextRequest) {
  if (!(await darfBedienen(req))) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültiges JSON" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "Ungültige ID" }, { status: 400 });
  }

  const felder: Record<string, string> = {};
  if (typeof body.status === "string" && STATUS.includes(body.status)) {
    felder.status = body.status;
  }
  if (typeof body.hook_gewaehlt === "string" && HOOKS.includes(body.hook_gewaehlt)) {
    felder.hook_gewaehlt = body.hook_gewaehlt;
  }
  if (typeof body.geplant_fuer === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.geplant_fuer)) {
    felder.geplant_fuer = body.geplant_fuer;
  }
  if (Object.keys(felder).length === 0) {
    return NextResponse.json({ ok: false, error: "Nichts zu ändern" }, { status: 400 });
  }

  const ok = await aendereSkript(id, felder);
  revalidatePath("/os");
  return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
}
