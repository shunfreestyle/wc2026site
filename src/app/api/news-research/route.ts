import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/api-auth";

export const maxDuration = 30;

type SourceUrl = { source: string; url: string };
type RawItem = { title: string; urls: SourceUrl[]; summary: string; hoursAgo?: number };

const BATCHES: Record<string, { label: string; query: string }> = {
  "1": {
    label: "日本代表 & Jリーグ",
    query: `以下の検索を実行し、直近48時間以内のサッカーニュースを集めてください:
1. "日本代表 サッカー 最新ニュース"
2. "Jリーグ 速報 結果"`,
  },
  "2": {
    label: "海外組 & 移籍",
    query: `以下の検索を実行し、直近48時間以内のサッカーニュースを集めてください:
1. "海外サッカー 日本人選手 最新"
2. "サッカー 移籍情報 2026"`,
  },
  "3": {
    label: "W杯 & 速報",
    query: `以下の検索を実行し、直近48時間以内のサッカーニュースを集めてください:
1. "W杯2026 日本 最新情報"
2. "サッカー 速報 今日"`,
  },
};

export async function POST(request: NextRequest) {
  const authError = verifyAdmin(request);
  if (authError) return authError;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY is not configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const batchId = String(body.batch || "1");
  const batch = BATCHES[batchId];

  if (!batch) {
    return NextResponse.json({ error: `Invalid batch: ${batchId}` }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      system: `あなたはサッカーニュース調査員です。日本語で回答。

ルール:
- 純粋なJSON配列のみ出力。前置き・説明・コードブロック不要。
- URLは検索結果で見つかった実際のURLのみ使用。推測禁止。
- 直近48時間以内の記事のみ。hoursAgoが48以上の記事は含めない。
- 必ず3件以上出力。`,
      messages: [{
        role: "user",
        content: `${batch.query}

検索結果から見つかった記事をJSON配列で5〜8件出力してください:
[{"title":"記事タイトル","urls":[{"source":"メディア名","url":"実際のURL"}],"summary":"150文字の概要","hoursAgo":数値}]`,
      }],
      tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 3 }],
    });

    // Extract search results for URL enrichment
    const searchResults: { url: string; title: string }[] = [];
    for (const block of response.content) {
      if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
        for (const r of block.content) {
          if (r.type === "web_search_result" && r.url) {
            searchResults.push({ url: r.url, title: r.title });
          }
        }
      }
    }

    // Parse items
    const items = parseItems(response, searchResults);

    return NextResponse.json({
      batch: batchId,
      label: batch.label,
      items,
      searchResults: searchResults.map((r) => ({ url: r.url, title: r.title })),
    });
  } catch (error: unknown) {
    console.error(`[Batch${batchId}] error:`, error);
    let message = "Unknown error";
    if (error instanceof Anthropic.APIError) message = `API error: ${error.status} ${error.message}`;
    else if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message, batch: batchId, items: [] }, { status: 500 });
  }
}

function parseItems(
  response: Anthropic.Message,
  searchResults: { url: string; title: string }[]
): RawItem[] {
  let text = "";
  for (const block of response.content) {
    if (block.type === "text") text += block.text;
  }

  if (!text.trim()) {
    return buildFromSearchResults(searchResults);
  }

  let jsonStr = text.trim();
  const cbm = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cbm) jsonStr = cbm[1].trim();
  if (!jsonStr.startsWith("[")) {
    const m = jsonStr.match(/(\[[\s\S]*\])/);
    if (m) jsonStr = m[1];
  }
  if (!jsonStr.startsWith("[") && jsonStr.startsWith("{")) jsonStr = `[${jsonStr}]`;

  try {
    const raw = JSON.parse(jsonStr);
    if (!Array.isArray(raw)) return buildFromSearchResults(searchResults);

    return raw
      .map((item: Record<string, unknown>) => ({
        title: String(item.title || ""),
        urls: Array.isArray(item.urls)
          ? (item.urls as SourceUrl[]).filter((u) => u?.url?.startsWith("http")).map((u) => ({
              source: u.source || identifySource(u.url) || "その他",
              url: u.url,
            }))
          : item.url
          ? [{ source: String(item.source || identifySource(String(item.url)) || "その他"), url: String(item.url) }]
          : [],
        summary: String(item.summary || ""),
        hoursAgo: typeof item.hoursAgo === "number" ? item.hoursAgo : undefined,
      }))
      .filter((item: RawItem) => !item.hoursAgo || item.hoursAgo <= 48);
  } catch {
    console.error("[parse] failed:", text.slice(0, 300));
    return buildFromSearchResults(searchResults);
  }
}

function buildFromSearchResults(searchResults: { url: string; title: string }[]): RawItem[] {
  return searchResults
    .filter((r) => identifySource(r.url))
    .slice(0, 5)
    .map((r) => ({
      title: r.title,
      urls: [{ source: identifySource(r.url) || "その他", url: r.url }],
      summary: "",
      hoursAgo: undefined,
    }));
}

function identifySource(url: string): string | null {
  const map: [string, string][] = [
    ["gekisaka", "ゲキサカ"], ["soccerking", "サッカーキング"],
    ["news.yahoo.co.jp", "Yahoo!ニュース"], ["goal.com", "Goal.com"],
    ["ultra-soccer", "超WORLDサッカー"], ["football-lab", "Football LAB"],
    ["jleague.jp", "Jリーグ公式"], ["nikkansports.com", "日刊スポーツ"],
    ["hochi.news", "スポーツ報知"], ["footballista", "footballista"],
    ["sponichi", "スポニチ"], ["nhk.or.jp", "NHK"],
    ["sportsnavi", "スポーツナビ"], ["number.bunshun", "Number"],
    ["mainichi", "毎日新聞"], ["asahi", "朝日新聞"],
  ];
  for (const [d, n] of map) { if (url.includes(d)) return n; }
  return null;
}
