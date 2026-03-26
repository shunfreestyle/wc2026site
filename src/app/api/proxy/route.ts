import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/api-auth";

export const maxDuration = 15;

export async function GET(request: NextRequest) {
  const authError = verifyAdmin(request);
  if (authError) return authError;

  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "url parameter required" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ja,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Fetch failed: ${res.status} ${res.statusText}`, url },
        { status: 502 }
      );
    }

    const html = await res.text();
    console.log(`[proxy] ${url} -> ${html.length} chars, status ${res.status}`);

    // Return up to 30000 chars to ensure article list section is included
    return NextResponse.json({
      html: html.slice(0, 30000),
      url,
      totalLength: html.length,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Fetch failed";
    console.error(`[proxy] ${url} -> ERROR: ${msg}`);
    return NextResponse.json({ error: msg, url }, { status: 502 });
  }
}
