import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

type SearchResult = {
  url: string;
  title: string;
};

export async function POST() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: `あなたはサッカーニュースの調査員です。日本語で回答してください。
必ず以下のJSON形式のみで回答し、それ以外のテキストは出力しないでください。
URLは検索結果で見つかった実際のURLをそのまま使用してください。URLが見つからない場合は空文字にしてください。`,
      messages: [
        {
          role: "user",
          content: `直近24時間の日本サッカーに関する最新ニュースをウェブ検索で調査してください。

対象メディア:
- ゲキサカ
- サッカーキング
- Yahoo!ニュース（スポーツ）
- Football LAB
- 超WORLDサッカー
- その他の主要サッカーメディア

トレンド順（注目度が高い順）にトップ10をランキングし、以下のJSON形式で出力してください:

{
  "news": [
    {
      "rank": 1,
      "title": "ニュースのタイトル",
      "url": "検索結果から取得した実際のURL",
      "source": "メディア名",
      "summary": "300文字程度の概要"
    }
  ],
  "searchedAt": "検索実行日時(ISO 8601)"
}`,
        },
      ],
      tools: [
        {
          type: "web_search_20250305" as const,
          name: "web_search",
          max_uses: 10,
        },
      ],
    });

    // 1. Extract actual URLs from web_search_tool_result blocks
    const searchResults: SearchResult[] = [];
    for (const block of response.content) {
      if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
        for (const result of block.content) {
          if (result.type === "web_search_result" && result.url) {
            searchResults.push({ url: result.url, title: result.title });
          }
        }
      }
    }

    // 2. Extract the text (JSON) content from the response
    let text = "";
    for (const block of response.content) {
      if (block.type === "text") {
        text += block.text;
      }
    }

    // 3. Parse JSON from the response (handle markdown code blocks)
    let jsonStr = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const data = JSON.parse(jsonStr);

    // 4. Replace/validate URLs with actual search result URLs
    if (data.news && Array.isArray(data.news)) {
      for (const item of data.news) {
        // If the URL is missing, placeholder, or doesn't look like a real URL
        const hasValidUrl =
          item.url &&
          item.url.startsWith("http") &&
          !item.url.includes("特定できませんでした");

        if (!hasValidUrl) {
          // Try to find a matching URL from search results by title similarity
          const match = findBestMatch(item.title, item.source, searchResults);
          item.url = match?.url || "";
        }
      }

      // Attach all search result URLs for reference
      data.searchResults = searchResults.map((r) => ({
        url: r.url,
        title: r.title,
      }));
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("News research error:", error);
    let message = "Unknown error occurred";
    let status = 500;
    if (error instanceof Anthropic.APIError) {
      message = `Anthropic API error: ${error.status} ${error.message}`;
      status = error.status >= 400 && error.status < 600 ? error.status : 500;
    } else if (error instanceof SyntaxError) {
      message = "AIの応答をJSONとして解析できませんでした";
    } else if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status });
  }
}

/** Find the best matching search result for a news item */
function findBestMatch(
  title: string,
  source: string,
  results: SearchResult[]
): SearchResult | null {
  if (!results.length) return null;

  // Score each result by keyword overlap
  const titleWords = title.split(/[\s、。・「」『』（）\(\)]+/).filter((w) => w.length >= 2);
  let bestScore = 0;
  let bestResult: SearchResult | null = null;

  for (const result of results) {
    let score = 0;
    const resultText = result.title + " " + result.url;

    for (const word of titleWords) {
      if (resultText.includes(word)) score++;
    }

    // Bonus for source domain match
    if (source && result.url) {
      const sourceDomainMap: Record<string, string[]> = {
        ゲキサカ: ["gekisaka"],
        サッカーキング: ["soccerking"],
        "Yahoo!ニュース": ["yahoo.co.jp"],
        "Football LAB": ["football-lab"],
        超WORLDサッカー: ["ultra-soccer"],
      };
      for (const [name, domains] of Object.entries(sourceDomainMap)) {
        if (source.includes(name)) {
          for (const domain of domains) {
            if (result.url.includes(domain)) score += 3;
          }
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestResult = result;
    }
  }

  return bestScore >= 2 ? bestResult : null;
}
