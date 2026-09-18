import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { crmKonfiguriert, dummyLoeschen } from "@/lib/crm/db";
import { dummyFuellen } from "@/lib/crm/dummy";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Mutationen für /intern/einstellungen (R11b, 14.09): Dummy-Daten
 * befüllen / löschen. Klassischer Form-POST + 303 zurück auf die Seite,
 * Ergebnis als Query-Codes (Muster: /api/intern-aufgaben). Studio-Cookie
 * Pflicht. Das Befüllen macht ~200 RPC-Aufrufe — deshalb maxDuration 60.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

const ZIEL = "/intern/einstellungen";

function zurueck(req: NextRequest, query: Record<string, string>): NextResponse {
  const url = new URL(ZIEL, req.nextUrl.origin);
  for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
  return NextResponse.redirect(url, 303);
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern-einstellungen:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json({ ok: false, error: "Zu viele Anfragen — bitte kurz warten." }, { status: 429 });
  }
  if (!(await isStudioAuthed(req.cookies.get(STUDIO_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet." }, { status: 401 });
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }
  const aktion = String(form.get("aktion") ?? "");
  if (!crmKonfiguriert()) return zurueck(req, { fehler: "nicht_konfiguriert" });

  if (aktion === "dummy_fuellen") {
    try {
      const e = await dummyFuellen();
      return zurueck(req, {
        ok: e.verteilt ? "gefuellt" : "teilweise",
        n: [e.kontakte, e.leads, e.deals, e.aufgaben, e.konten, e.tickets, e.mails, e.ereignisse, e.flows].join(","),
      });
    } catch (err) {
      console.error("[intern-einstellungen] dummy_fuellen:", err);
      return zurueck(req, { fehler: "unbekannt" });
    }
  }
  if (aktion === "dummy_loeschen") {
    const zaehler = await dummyLoeschen();
    if (!zaehler) return zurueck(req, { fehler: "migration" });
    return zurueck(req, { ok: "geloescht", n: Object.values(zaehler).map((v) => String(v)).join(",") });
  }
  return NextResponse.json({ ok: false, error: "Unbekannte Aktion." }, { status: 400 });
}
