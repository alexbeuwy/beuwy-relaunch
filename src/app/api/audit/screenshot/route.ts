import { NextResponse } from "next/server";
import { assertPublicHost, takeScreenshot } from "@/lib/audit";

/**
 * Screenshot als eigene Route — läuft PARALLEL zur Claude-Analyse statt
 * den Scan zu blockieren. Der Reveal passiert damit genau während der
 * Wartezeit der Analyse (UX-Audit P11-Architektur).
 */

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(body.url || "");
  } catch {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }
  if (parsed.protocol !== "https:") {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  // SSRF-Schutz wiederholen — die URL kommt vom Client zurück.
  try {
    await assertPublicHost(parsed.hostname);
  } catch {
    return NextResponse.json({ error: "domain_blocked" }, { status: 422 });
  }

  const screenshot = await takeScreenshot(parsed.toString());
  return NextResponse.json({ screenshot });
}
