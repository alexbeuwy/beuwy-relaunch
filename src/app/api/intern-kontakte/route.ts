import { NextRequest, NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed } from "@/lib/studio-auth";
import { kontakt360, kontaktUpsert, leadNotizAnlegen } from "@/lib/crm/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Mutationen für /intern/kontakte (R5 Leaf G3 — Kontakte & 360-Akte).
 * Klassischer Form-POST statt JSON-Client, exakt wie /api/intern
 * (src/app/api/intern/route.ts): die Formulare auf Liste ("Kontakt
 * anlegen"-Dialog) und Akte (Schnell-Notizfeld) senden
 * application/x-www-form-urlencoded direkt hierher, die Route schreibt
 * ausschließlich über src/lib/crm/db.ts und schickt den Browser per 303
 * zurück — kein Client-JS für die Mutation nötig, nur der Checkbox-Hack
 * fürs Dialog-Ein-/Ausblenden lebt clientseitig in page.tsx (CSS-only).
 *
 * Studio-Cookie ist Pflicht — ohne gültige Sitzung gibt es 401, bevor
 * überhaupt Formulardaten gelesen werden (Muster: /api/intern).
 *
 * Fehler wandern als stabiler CODE im Redirect-Query (?fehler=email etc.),
 * nicht als fertiger Satz — die Zielseite übersetzt den Code über ihre
 * eigenen Studio-Texte (src/lib/texte/intern-kontakte.ts). So bleibt jeder
 * nutzerlesbare Text an einer Stelle redigierbar, nicht doppelt gepflegt.
 *
 * Zwei Aktionen (Auftrag): anlegen · notiz.
 *
 * "notiz" — Design-Entscheidung zur RPC-Lücke: kontaktUpsert() in db.ts
 * nimmt aktuell KEIN Notiz-Feld entgegen (nur email/name/telefon/firma/
 * rolle; BwKontakt.notiz ist zwar als Lese-Spalte typisiert, aber ohne
 * Setter). Der Auftrag nennt "kontakt-Notiz via kontaktUpsert" als
 * Fallback für Kontakte ohne Lead — das ist mit der heutigen db.ts-
 * Signatur nicht ohne Datenverlust umsetzbar (kein p_notiz-Parameter,
 * und db.ts liegt außerhalb der für dieses Leaf erlaubten Dateien). Statt
 * den Text still verschwinden zu lassen (Button "Speichern", Notiz weg —
 * das widerspräche der Design-Direktive Regel 7/9, ehrlich statt stumm),
 * meldet diese Route in dem Fall einen klaren, adressierbaren Fehler
 * zurück. Der Normalfall — ein Kontakt mit mindestens einem Lead, laut
 * R5-FUNKTIONEN.md Modul 3 der Regelfall, da bw_kontakt gerade aus den
 * drei Lead-Quellen dedupliziert entsteht — funktioniert vollständig:
 * die Notiz landet über leadNotizAnlegen() auf dem jüngsten Lead und
 * erscheint dort wie gewohnt in dessen Notizen/Timeline.
 * FOLGE-ARBEIT (außerhalb dieses Leafs): db.ts::kontaktUpsert um einen
 * optionalen p_notiz-Parameter erweitern, dann diesen Fallback-Zweig auf
 * echtes Speichern umstellen.
 */

export const runtime = "nodejs";

const MAX_NAME_ZEICHEN = 200;
const MAX_TELEFON_ZEICHEN = 40;
const MAX_FIRMA_ZEICHEN = 200;
const MAX_ROLLE_ZEICHEN = 100;
const MAX_NOTIZ_ZEICHEN = 4000;

function istEmail(wert: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wert);
}

function redirectZurueck(req: NextRequest, pfad: string, fehlerCode?: string) {
  const url = new URL(pfad, req.url);
  if (fehlerCode) url.searchParams.set("fehler", fehlerCode);
  return NextResponse.redirect(url, { status: 303 });
}

async function aktionAnlegen(req: NextRequest, form: FormData) {
  const name = String(form.get("name") ?? "").trim().slice(0, MAX_NAME_ZEICHEN);
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const telefon = String(form.get("telefon") ?? "").trim().slice(0, MAX_TELEFON_ZEICHEN);
  const firma = String(form.get("firma") ?? "").trim().slice(0, MAX_FIRMA_ZEICHEN);
  const rolle = String(form.get("rolle") ?? "").trim().slice(0, MAX_ROLLE_ZEICHEN);

  if (!istEmail(email)) {
    return redirectZurueck(req, "/intern/kontakte", "email");
  }

  const id = await kontaktUpsert({ email, name, telefon, firma, rolle });
  return redirectZurueck(req, id ? `/intern/kontakte/${encodeURIComponent(id)}` : "/intern/kontakte");
}

async function aktionNotiz(req: NextRequest, form: FormData) {
  const kontaktId = String(form.get("kontaktId") ?? "").trim();
  const text = String(form.get("text") ?? "").trim().slice(0, MAX_NOTIZ_ZEICHEN);

  if (!kontaktId) {
    return redirectZurueck(req, "/intern/kontakte");
  }
  const zielPfad = `/intern/kontakte/${encodeURIComponent(kontaktId)}`;
  if (!text) {
    return redirectZurueck(req, zielPfad, "leer");
  }

  const akte = await kontakt360(kontaktId);
  const leads = akte && Array.isArray((akte as Record<string, unknown>).leads)
    ? ((akte as Record<string, unknown>).leads as Array<Record<string, unknown>>)
    : [];

  const juengsterLead = leads
    .filter((l) => typeof l.id === "string" && typeof l.erstellt === "string")
    .sort((a, b) => new Date(String(b.erstellt)).getTime() - new Date(String(a.erstellt)).getTime())[0];

  if (!juengsterLead) {
    // Design-Entscheidung siehe Datei-Kommentar oben — kontaktUpsert()
    // kann diesen Text heute nicht dauerhaft speichern.
    return redirectZurueck(req, zielPfad, "kein_lead");
  }

  await leadNotizAnlegen(String(juengsterLead.id), text, "alex");
  return redirectZurueck(req, zielPfad);
}

export async function POST(req: NextRequest) {
  if (!rateLimit(`intern-kontakte:${clientIp(req)}`, 60, 10 * 60_000)) {
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
  if (aktion === "anlegen") return aktionAnlegen(req, form);
  if (aktion === "notiz") return aktionNotiz(req, form);

  return NextResponse.json({ ok: false, error: "Unbekannte Aktion." }, { status: 400 });
}
