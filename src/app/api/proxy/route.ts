import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 15;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url parameter required" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SamuraiFootball/1.0)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Fetch failed: ${res.status}` }, { status: 502 });
    }

    const html = await res.text();
    // Return first 8000 chars — enough for headlines, not too much for Claude
    return NextResponse.json({ html: html.slice(0, 8000), url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Fetch failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
