import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const { title, summary, url, source } = await request.json();

  if (!title || !summary) {
    return NextResponse.json(
      { error: "title and summary are required" },
      { status: 400 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
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

    let article = "";
    for (const block of response.content) {
      if (block.type === "text") {
        article += block.text;
      }
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Article generation error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
