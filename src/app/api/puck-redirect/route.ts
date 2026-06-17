import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || "";
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(slug)) {
    return NextResponse.redirect(new URL("/build", url.origin));
  }
  return NextResponse.redirect(new URL(`/build/${slug}`, url.origin));
}
