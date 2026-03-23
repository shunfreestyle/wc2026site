import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export const maxDuration = 60;

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
必ず以下のJSON形式のみで回答し、それ以外のテキストは出力しないでください。`,
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
      "url": "参照URL",
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

    // Extract the text content from the response
    let text = "";
    for (const block of response.content) {
      if (block.type === "text") {
        text += block.text;
      }
    }

    // Parse JSON from the response (handle markdown code blocks)
    let jsonStr = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const data = JSON.parse(jsonStr);
    return NextResponse.json(data);
  } catch (error) {
    console.error("News research error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
