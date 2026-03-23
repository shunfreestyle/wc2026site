import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { title, summary, url, source } = await request.json();

  if (!title || !summary) {
    return new Response(JSON.stringify({ error: "title and summary are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = await client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system: `あなたは「サムライフットボール」というサッカー情報サイトのライターです。
日本サッカーファンに向けた、読み応えのある記事を日本語で執筆してください。

記事のスタイル:
- 見出し（h2）を2〜3個使い、読みやすく構成する
- 事実に基づきつつ、ファン目線の分析や展望を加える
- 800〜1200文字程度
- Markdown形式で出力
- 最後に「出典: [メディア名](URL)」を記載`,
      messages: [
        {
          role: "user",
          content: `以下のニュースを元に、サムライフットボール向けの記事を書いてください。

タイトル: ${title}
出典: ${source}
URL: ${url}
概要: ${summary}`,
        },
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: err instanceof Error ? err.message : "Stream error" })}\n\n`
            )
          );
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
  } catch (error) {
    console.error("Article generation error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
