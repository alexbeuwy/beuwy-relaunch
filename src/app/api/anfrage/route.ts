import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/anfrage
 * Accepts the funnel payload and logs it. Wire to Resend / Postmark / Slack
 * for real delivery by reading process.env.ANFRAGE_WEBHOOK_URL and forwarding.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["name", "email", "brief"];
  for (const key of required) {
    if (!body[key] || typeof body[key] !== "string") {
      return NextResponse.json({ ok: false, error: `Missing field: ${key}` }, { status: 400 });
    }
  }

  // eslint-disable-next-line no-console
  console.log("[anfrage]", {
    at: new Date().toISOString(),
    stage: body.stage,
    timing: body.timing,
    budget: body.budget,
    name: body.name,
    email: body.email,
    phone: body.phone,
    brief: typeof body.brief === "string" ? body.brief.slice(0, 200) : "",
  });

  // Optional outbound webhook (Resend, Slack, etc.) — wire by setting env var.
  const webhook = process.env.ANFRAGE_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      // Don't fail the user submit because the webhook is flaky.
      // eslint-disable-next-line no-console
      console.warn("[anfrage] webhook failed", e);
    }
  }

  return NextResponse.json({ ok: true });
}
