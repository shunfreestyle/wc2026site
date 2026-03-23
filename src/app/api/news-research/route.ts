import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 300;

type SearchResult = {
  url: string;
  title: string;
};

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
        send({ status: "searching", message: "ウェブ検索を実行中..." });

        const response = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: `あなたはサッカーニュースの調査員です。日本語で回答してください。

重要な指示:
- 必ずJSON形式のみで返答してください。前置きや説明文は一切不要です。
- マークダウンのコードブロック（\`\`\`json ... \`\`\`）で囲わないでください。純粋なJSONのみを出力してください。
- URLは検索結果で見つかった実際のURLをそのまま使用してください。URLが見つからない場合は空文字にしてください。`,
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

        send({ status: "processing", message: "検索結果を整理中..." });

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

        // 2. Extract the text (JSON) content
        let text = "";
        for (const block of response.content) {
          if (block.type === "text") {
            text += block.text;
          }
        }

        // 3. Parse JSON (handle markdown code blocks and extra text)
        let jsonStr = text.trim();

        // Remove markdown code block wrappers if present
        const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) {
          jsonStr = codeBlockMatch[1].trim();
        }

        // Try to extract JSON object if there's extra text around it
        if (!jsonStr.startsWith("{")) {
          const jsonObjMatch = jsonStr.match(/(\{[\s\S]*\})/);
          if (jsonObjMatch) {
            jsonStr = jsonObjMatch[1];
          }
        }

        let data;
        try {
          data = JSON.parse(jsonStr);
        } catch (parseError) {
          console.error("JSON parse failed. Raw Claude response:", text);
          console.error("Extracted JSON string:", jsonStr);
          throw new SyntaxError(`AIの応答をJSONとして解析できませんでした`);
        }

        // 4. Replace/validate URLs with actual search result URLs
        if (data.news && Array.isArray(data.news)) {
          for (const item of data.news) {
            const hasValidUrl =
              item.url &&
              item.url.startsWith("http") &&
              !item.url.includes("特定できませんでした");

            if (!hasValidUrl) {
              const match = findBestMatch(item.title, item.source, searchResults);
              item.url = match?.url || "";
            }
          }

          data.searchResults = searchResults.map((r) => ({
            url: r.url,
            title: r.title,
          }));
        }

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

/** Find the best matching search result for a news item */
function findBestMatch(
  title: string,
  source: string,
  results: SearchResult[]
): SearchResult | null {
  if (!results.length) return null;

  const titleWords = title.split(/[\s、。・「」『』（）\(\)]+/).filter((w) => w.length >= 2);
  let bestScore = 0;
  let bestResult: SearchResult | null = null;

  for (const result of results) {
    let score = 0;
    const resultText = result.title + " " + result.url;

    for (const word of titleWords) {
      if (resultText.includes(word)) score++;
    }

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
