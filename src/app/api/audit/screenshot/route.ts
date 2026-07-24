import { NextResponse } from "next/server";
import { assertPublicHost, takeScreenshot } from "@/lib/audit";
import { packShare } from "@/lib/audit-share";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Screenshot als eigene Route — läuft PARALLEL zur Claude-Analyse statt
 * den Scan zu blockieren. Der Reveal passiert damit genau während der
 * Wartezeit der Analyse (UX-Audit P11-Architektur).
 *
 * Zusätzlich (Gutachten-Links): Wenn BUNNY_STORAGE_KEY gesetzt ist, wird
 * das Bild in die Storage-Zone geladen und die CDN-URL signiert zurückgegeben
 * — nur so landet ein Screenshot im /check/{domain}-Cache. Der Server nimmt
 * den Screenshot selbst auf; fremde Bilder können nicht eingeschleust werden.
 */

export const runtime = "nodejs";
export const maxDuration = 60;

async function uploadToBunny(domain: string, dataUrl: string): Promise<string | null> {
  const key = process.env.BUNNY_STORAGE_KEY;
  const m = /^data:image\/jpeg;base64,(.+)$/.exec(dataUrl);
  if (!key || !m) return null;
  const safe = domain.toLowerCase().replace(/[^a-z0-9.-]/g, "");
  const path = `audit/${safe}-${Date.now().toString(36)}.jpg`;
  try {
    const r = await fetch(`https://storage.bunnycdn.com/beuwy-website/${path}`, {
      method: "PUT",
      headers: { AccessKey: key, "Content-Type": "application/octet-stream" },
      body: Buffer.from(m[1], "base64"),
      signal: AbortSignal.timeout(15_000),
    });
    if (!r.ok) {
      console.error("[screenshot] Bunny-Upload fehlgeschlagen:", r.status);
      return null;
    }
    return `https://beuwy-2.b-cdn.net/${path}`;
  } catch (e) {
    console.error("[screenshot] Bunny-Upload-Exception:", e);
    return null;
  }
}

export async function POST(req: Request) {
  if (!rateLimit(`shot:${clientIp(req)}`, 6, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

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
  if (!screenshot) {
    return NextResponse.json({ screenshot: null });
  }

  const domain = parsed.hostname.replace(/^www\./, "");
  const screenshotUrl = await uploadToBunny(domain, screenshot);

  return NextResponse.json({
    screenshot,
    screenshotUrl,
    share: screenshotUrl
      ? packShare({
          kind: "shot",
          domain,
          screenshotUrl,
          generated_at: new Date().toISOString(),
        })
      : null,
  });
}
