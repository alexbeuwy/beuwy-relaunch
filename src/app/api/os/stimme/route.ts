import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { darfBedienen } from "@/lib/os/zugang";
import { ladeSnapshot } from "@/lib/os/db";
import { stimmeKonfiguriert, vertone } from "@/lib/os/stimme";

/**
 * Vertont ein Skript mit Alex' geklonter Stimme. Liegt ein Service-Key
 * für Supabase Storage vor, landet die MP3 dort und die URL am Skript;
 * ohne Storage kommt die Datei direkt als Download zurück.
 */

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  if (!(await darfBedienen(req))) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet" }, { status: 401 });
  }
  if (!stimmeKonfiguriert()) {
    return NextResponse.json(
      { ok: false, error: "ELEVENLABS_API_KEY oder ELEVENLABS_VOICE_ID fehlt." },
      { status: 503 },
    );
  }

  let body: { id?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültiges JSON" }, { status: 400 });
  }
  const id = typeof body.id === "string" ? body.id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "Ungültige ID" }, { status: 400 });
  }

  const snap = await ladeSnapshot();
  const skript = snap.skripte.find((s) => s.id === id);
  if (!skript?.body) {
    return NextResponse.json(
      { ok: false, error: "Skript nicht gefunden oder ohne Text" },
      { status: 404 },
    );
  }

  /* Gesprochen wird der Body plus das Loop-Ende — der Hook steht als Text
     im Bild und wird nicht mitgesprochen. */
  const text = [skript.body, skript.loop_ende].filter(Boolean).join("\n\n");
  const ergebnis = await vertone({ skriptId: id, text });

  if (!ergebnis.ok) {
    return NextResponse.json({ ok: false, error: ergebnis.detail }, { status: 502 });
  }

  revalidatePath("/os");

  if (ergebnis.url) {
    return NextResponse.json({ ok: true, url: ergebnis.url, detail: ergebnis.detail });
  }
  return new NextResponse(ergebnis.audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="${skript.titel.replace(/[^\w]+/g, "-").toLowerCase()}.mp3"`,
    },
  });
}
