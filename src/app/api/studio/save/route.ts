import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";

/**
 * Studio-Speichern: schreibt geänderte Texte über die serverseitig
 * abgesicherte RPC public.set_website_content nach Supabase. Das
 * CONTENT_WRITE_SECRET verlässt den Server nie. Teilfehler werden
 * gesammelt zurückgemeldet ({ ok, saved, failed }), danach werden
 * "/" und "/studio" revalidiert.
 *
 * LEAF U2 (27.08): der Studio-Editor kann eine Bereichs-Seite live in
 * einem iframe zeigen und lädt sie nach dem Speichern automatisch neu
 * ("immer top aktuell"). getContent() cached seinen Supabase-Fetch aber
 * per Tag ("content", 60s) — revalidatePath("/") allein erreicht davon
 * nur die Startseite. revalidateTag("content") räumt den Daten-Cache für
 * JEDEN getContent()-Aufrufer auf (auch künftige Bereiche), zusätzlich
 * noch die zwei bekannten Bereichs-Routen als ISR-Seiten gezielt.
 */

export const runtime = "nodejs";

const MAX_KEYS = 100;
const MAX_VALUE_LENGTH = 5000;
const MAX_KEY_LENGTH = 200;

export async function POST(req: NextRequest) {
  if (!(await isStudioAuthed(req.cookies.get(STUDIO_COOKIE)?.value))) {
    return NextResponse.json(
      { ok: false, error: "Nicht angemeldet — bitte im Studio neu anmelden." },
      { status: 401 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const writeSecret = process.env.CONTENT_WRITE_SECRET;
  if (!supabaseUrl || !anonKey || !writeSecret) {
    return NextResponse.json(
      { ok: false, error: "Studio ist auf diesem Deployment nicht konfiguriert." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const changes = body.changes;
  if (typeof changes !== "object" || changes === null || Array.isArray(changes)) {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage — es wurden keine Änderungen übermittelt." },
      { status: 400 },
    );
  }

  const entries = Object.entries(changes as Record<string, unknown>);
  if (entries.length === 0) {
    return NextResponse.json({ ok: true, saved: [], failed: [] });
  }
  if (entries.length > MAX_KEYS) {
    return NextResponse.json(
      { ok: false, error: `Zu viele Felder auf einmal (max. ${MAX_KEYS}).` },
      { status: 422 },
    );
  }
  for (const [key, value] of entries) {
    if (!key || key.length > MAX_KEY_LENGTH || typeof value !== "string") {
      return NextResponse.json(
        { ok: false, error: "Ungültige Anfrage — ein Feld hat ein unerwartetes Format." },
        { status: 422 },
      );
    }
    if (value.length > MAX_VALUE_LENGTH) {
      return NextResponse.json(
        { ok: false, error: `Ein Text ist zu lang (max. ${MAX_VALUE_LENGTH} Zeichen): „${key}“.` },
        { status: 422 },
      );
    }
  }

  const saved: string[] = [];
  const failed: string[] = [];

  for (const [key, value] of entries as [string, string][]) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/rpc/set_website_content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ p_key: key, p_value: value, p_secret: writeSecret }),
        cache: "no-store",
      });
      if (res.ok) {
        saved.push(key);
      } else {
        console.error(`[studio] set_website_content fehlgeschlagen für "${key}": ${res.status}`);
        failed.push(key);
      }
    } catch (err) {
      console.error(`[studio] set_website_content nicht erreichbar für "${key}":`, err);
      failed.push(key);
    }
  }

  if (saved.length > 0) {
    revalidatePath("/");
    revalidatePath("/studio");
    revalidatePath("/intern");
    revalidatePath("/tools/verkaufspreisrechner");
    revalidateTag("content");
  }

  return NextResponse.json({ ok: failed.length === 0, saved, failed });
}
