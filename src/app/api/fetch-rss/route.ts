import { NextRequest } from "next/server";

export const maxDuration = 10;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response(JSON.stringify({ error: "url required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SamuraiFootball/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `${res.status} ${res.statusText}` }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const xml = await res.text();
    return new Response(xml, {
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Fetch failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
