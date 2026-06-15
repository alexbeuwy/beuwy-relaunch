import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/lead
 * Captures the audit lead-gate contact (name, email, phone, domain).
 * Logs + optional webhook forward (LEAD_WEBHOOK_URL). Never blocks the user.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!email || !name) {
    return NextResponse.json({ ok: false, error: "name_email_required" }, { status: 400 });
  }

  // eslint-disable-next-line no-console
  console.log("[lead/audit]", {
    at: new Date().toISOString(),
    name,
    email,
    phone: body.phone,
    domain: body.domain,
  });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "audit-gate", ...body }),
      });
    } catch {
      /* don't block the user on a flaky webhook */
    }
  }

  return NextResponse.json({ ok: true });
}
