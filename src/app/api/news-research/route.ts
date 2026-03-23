import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

type NewsItem = {
  title: string;
  url: string;
  source: string;
  summary: string;
};

type SearchResult = {
  url: string;
  title: string;
};

// Search groups - batched to stay within timeout
const SEARCH_BATCHES = [
  {
    label: "ゲキサカ / サッカーキング",
    query: "日本サッカー 最新ニュース site:gekisaka.jp OR site:soccerking.jp",
    domains: ["gekisaka", "soccerking"],
  },
  {
    label: "Yahoo!ニュース / Goal.com",
    query: "サッカー 日本代表 最新 site:news.yahoo.co.jp OR site:goal.com/jp",
    domains: ["yahoo.co.jp", "goal.com"],
  },
  {
    label: "超WORLDサッカー / Jリーグ公式",
    query: "サッカー ニュース site:ultra-soccer.jp OR site:jleague.jp",
    domains: ["ultra-soccer", "jleague.jp"],
  },
];

export async function POST() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const allItems: NewsItem[] = [];
        const allSearchResults: SearchResult[] = [];

        // Search each batch sequentially with progress updates
        for (const batch of SEARCH_BATCHES) {
          send({ status: "searching", message: `${batch.label}を検索中...` });

          try {
            const response = await client.messages.create({
              model: "claude-haiku-4-5-20251001",
              max_tokens: 2048,
              system: `あなたはサッカーニュース調査員です。
ウェブ検索で見つかった実際の記事のみを報告してください。
必ずJSON配列のみで返答。前置き・説明文・コードブロックは不要です。
URLは検索結果で見つかった実際のURLのみ使用。推測や捏造は厳禁。
見つからなかった場合は空配列 [] を返してください。`,
              messages: [
                {
                  role: "user",
                  content: `直近24時間の日本サッカーニュースを検索してください。

検索クエリ: ${batch.query}

見つかった記事を以下のJSON配列で出力（最大5件）:
[{"title":"記事タイトル","url":"実際のURL","source":"メディア名","summary":"200文字程度の概要"}]`,
                },
              ],
              tools: [
                {
                  type: "web_search_20250305" as const,
                  name: "web_search",
                  max_uses: 3,
                },
              ],
            });

            // Extract real URLs from search results
            for (const block of response.content) {
              if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
                for (const result of block.content) {
                  if (result.type === "web_search_result" && result.url) {
                    allSearchResults.push({ url: result.url, title: result.title });
                  }
                }
              }
            }

            // Extract text
            let text = "";
            for (const block of response.content) {
              if (block.type === "text") text += block.text;
            }

            // Parse JSON array
            let jsonStr = text.trim();
            const cbm = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (cbm) jsonStr = cbm[1].trim();
            if (!jsonStr.startsWith("[")) {
              const am = jsonStr.match(/(\[[\s\S]*\])/);
              if (am) jsonStr = am[1];
            }

            let items: Array<{ title: string; url: string; source: string; summary: string }> = [];
            try {
              items = JSON.parse(jsonStr);
            } catch {
              console.error(`Parse failed for ${batch.label}:`, text.slice(0, 300));
            }

            if (Array.isArray(items)) {
              for (const item of items) {
                const validUrl = validateUrl(item.url, item.title, batch.domains, allSearchResults);
                if (validUrl) {
                  allItems.push({
                    title: item.title,
                    url: validUrl,
                    source: item.source || batch.label.split(" / ")[0],
                    summary: item.summary || "",
                  });
                }
              }
            }

            send({
              status: "progress",
              message: `${batch.label}: ${items.length}件中${allItems.filter((a) => batch.domains.some((d) => a.url.includes(d))).length}件確認済み`,
            });
          } catch (err) {
            console.error(`Search failed for ${batch.label}:`, err);
            send({ status: "progress", message: `${batch.label}: 検索失敗（スキップ）` });
          }
        }

        // Deduplicate and rank
        send({ status: "processing", message: `${allItems.length}件を集計・ランキング中...` });

        const deduped = deduplicateNews(allItems);
        const ranked = deduped.slice(0, 10).map((item, i) => ({
          rank: i + 1,
          ...item,
        }));

        const data = {
          news: ranked,
          searchedAt: new Date().toISOString(),
          totalFound: allItems.length,
          searchResults: allSearchResults.map((r) => ({ url: r.url, title: r.title })),
        };

        send({ status: "done", data });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error: unknown) {
        console.error("News research error:", error);
        let message = "Unknown error occurred";
        if (error instanceof Anthropic.APIError) {
          message = `Anthropic API error: ${error.status} ${error.message}`;
        } else if (error instanceof SyntaxError) {
          message = error.message || "AIの応答をJSONとして解析できませんでした";
        } else if (error instanceof Error) {
          message = error.message;
        }
        send({ status: "error", error: message });
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

/** Validate URL against actual search results */
function validateUrl(
  url: string,
  title: string,
  expectedDomains: string[],
  searchResults: SearchResult[]
): string {
  if (!url || !url.startsWith("http")) return "";

  // 1. Exact match in search results
  const exact = searchResults.find((sr) => sr.url === url);
  if (exact) return url;

  // 2. URL contains expected domain
  if (expectedDomains.some((d) => url.includes(d))) return url;

  // 3. Try to find matching URL from search results by title
  const words = title.split(/[\s、。「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
  for (const sr of searchResults) {
    const matchCount = words.filter((w) => sr.title.includes(w)).length;
    if (matchCount >= 2 && expectedDomains.some((d) => sr.url.includes(d))) {
      return sr.url;
    }
  }

  return "";
}

/** Deduplicate news by title similarity */
function deduplicateNews(items: NewsItem[]): NewsItem[] {
  const result: NewsItem[] = [];

  for (const item of items) {
    const words = item.title
      .split(/[\s、。・「」『』（）\(\)【】]+/)
      .filter((w) => w.length >= 3);

    const duplicate = result.find((existing) => {
      const ew = existing.title
        .split(/[\s、。・「」『』（）\(\)【】]+/)
        .filter((w) => w.length >= 3);
      let matchCount = 0;
      for (const w of words) {
        if (ew.some((e) => e.includes(w) || w.includes(e))) matchCount++;
      }
      return matchCount >= Math.min(3, Math.floor(words.length * 0.5));
    });

    if (!duplicate) {
      result.push(item);
    } else if (!duplicate.summary && item.summary) {
      const idx = result.indexOf(duplicate);
      result[idx] = item;
    }
  }

  return result;
}
