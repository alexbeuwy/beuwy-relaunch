/**
 * HTTP Basic Auth gate for the Puck editor surfaces.
 *
 * Runtime: Edge (the default for middleware in Next.js 15). We deliberately
 * stay on `middleware.ts` rather than the Next 16 `proxy.ts` convention because
 * `proxy.ts` is forced onto the Node.js runtime and drops edge support. On
 * Next 15.5 `middleware.ts` is current and runs at the edge.
 *
 * Location: this file lives at `src/middleware.ts` (the src root), NOT inside
 * `src/app`. With a src directory, that is the only place Next.js looks for it.
 *
 * Docs:
 * - Middleware: https://nextjs.org/docs/app/api-reference/file-conventions/middleware
 * - matcher syntax: https://nextjs.org/docs/app/api-reference/file-conventions/middleware#matcher
 * - Edge Runtime APIs (atob/crypto available, no Node Buffer/fs):
 *   https://nextjs.org/docs/app/api-reference/edge
 */
import { NextRequest, NextResponse } from "next/server";

const REALM = "Beuwy Editor";

export async function middleware(req: NextRequest) {
  const user = process.env.EDITOR_USER;
  const pass = process.env.EDITOR_PASSWORD;

  // --- Fail-open in dev, fail-closed in prod -----------------------------
  // If credentials are not configured:
  //   - On Vercel (prod/preview) -> fail CLOSED (return 401). Never expose the
  //     editor unprotected in a deployed environment.
  //   - In local dev -> fail OPEN (let the request through) so you are not
  //     forced to set env vars to use the editor locally.
  // VERCEL_ENV is "production" | "preview" | "development" on Vercel, and
  // undefined locally. NODE_ENV is "production" during `next build`/`next start`
  // and "development" under `next dev`.
  if (!user || !pass) {
    const isDeployed = !!process.env.VERCEL_ENV || process.env.NODE_ENV === "production";
    if (isDeployed) return unauthorized(); // fail closed
    return NextResponse.next(); // fail open (local dev only)
  }

  const header = req.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) return unauthorized();

  // Decode "Basic <base64>". In the Edge Runtime atob() is available; Node's
  // Buffer is NOT part of the edge Web API surface, so use atob + the Web
  // standard string splitting. Note the password may itself contain ":", so
  // only split on the FIRST colon.
  let decoded: string;
  try {
    decoded = atob(header.slice("Basic ".length).trim());
  } catch {
    return unauthorized();
  }
  const sep = decoded.indexOf(":");
  if (sep === -1) return unauthorized();
  const givenUser = decoded.slice(0, sep);
  const givenPass = decoded.slice(sep + 1);

  // Compute BOTH comparisons before deciding so we don't short-circuit on the
  // username check (which would leak whether the username was correct).
  const [userOk, passOk] = await Promise.all([
    timingSafeEqual(givenUser, user),
    timingSafeEqual(givenPass, pass),
  ]);
  if (!userOk || !passOk) return unauthorized();

  return NextResponse.next();
}

function unauthorized() {
  // The WWW-Authenticate header does two jobs:
  //  1. Browsers show the native username/password prompt on a 401 with this
  //     header, then retry the request with an Authorization: Basic header.
  //  2. Once the browser has cached those credentials for the origin/realm, a
  //     same-origin fetch() from your already-authenticated editor page will
  //     automatically attach the same Authorization header (no manual headers
  //     needed) — so /api/puck/* calls from /build just work.
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

/**
 * Genuinely constant-time string comparison for the edge.
 *
 * We SHA-256 both sides first, then compare the digests. Because digests are
 * always 32 bytes regardless of input length, this leaks neither the secret's
 * length nor where the first mismatch occurs — closing the length-oracle and
 * early-exit timing leaks a naive char-by-char compare has. crypto.subtle is
 * part of the edge Web API surface.
 */
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [da, db] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const va = new Uint8Array(da);
  const vb = new Uint8Array(db);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

export const config = {
  // Cover /build and everything under it, plus everything under /api/puck.
  // Does NOT touch /p/* render pages, the homepage, or other routes.
  //
  // matcher entries are matched against the pathname. `/:path*` means "this
  // segment and any number of following segments" (so /build AND /build/x/y).
  // matcher values must be static (known at build time) — no runtime vars.
  matcher: ["/build", "/build/:path*", "/api/puck/:path*"],
};
