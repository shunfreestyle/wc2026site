import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const maxDuration = 60;

// Existing categories in the site
const CATEGORIES = ["日本代表", "Jリーグ", "W杯", "海外組", "コラム", "選手紹介"] as const;

// Existing tags extracted from the article database
const EXISTING_TAGS = [
  "日本代表", "W杯2026", "Jリーグ", "海外組", "コラム",
  "森保一", "冨安健洋", "塩貝健人", "三笘薫", "守田英正", "植田直通",
  "久保建英", "遠藤航", "南野拓実", "板倉滉", "伊藤洋輝",
  "アーセナル", "アヤックス", "ブライトン", "スポルティング", "ヴォルフスブルク",
  "プレミアリーグ", "ブンデスリーガ", "チャンピオンズリーグ",
  "鹿島アントラーズ", "川崎フロンターレ", "横浜Fマリノス",
  "スコットランド", "イングランド", "オランダ代表",
  "イギリス遠征", "戦術分析", "移籍", "百年構想リーグ",
];

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
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        // Step 1: Generate metadata (category, tags, slug, excerpt)
        send({ type: "status", message: "メタデータを生成中..." });

        const metaResponse = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: `あなたはサッカーニュース記事のメタデータ分類AIです。
必ずJSON形式のみで返答してください。前置きや説明文は一切不要です。
マークダウンのコードブロックで囲わないでください。`,
          messages: [
            {
              role: "user",
              content: `以下のニュースに対して、メタデータを生成してください。

ニュースタイトル: ${title}
出典: ${source}
概要: ${summary}

以下のJSON形式で出力してください:

{
  "category": "カテゴリ名（以下から1つ選択: ${CATEGORIES.join(", ")}）",
  "tags": ["タグ1", "タグ2", ...],
  "slug": "english-slug-for-url",
  "excerpt": "50〜80文字程度の記事の要約文",
  "articleTitle": "【】付きの魅力的な記事タイトル"
}

タグの選択ルール:
- 以下の既存タグから関連するものを優先的に選択: ${EXISTING_TAGS.join(", ")}
- 既存タグにない場合は新規タグを作成してOK
- 3〜7個程度が適切
- 選手名、チーム名、大会名、テーマなどを含める`,
            },
          ],
        });

        let metaText = "";
        for (const block of metaResponse.content) {
          if (block.type === "text") metaText += block.text;
        }

        // Parse metadata JSON
        let metaJsonStr = metaText.trim();
        const codeBlockMatch = metaJsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (codeBlockMatch) metaJsonStr = codeBlockMatch[1].trim();
        if (!metaJsonStr.startsWith("{")) {
          const objMatch = metaJsonStr.match(/(\{[\s\S]*\})/);
          if (objMatch) metaJsonStr = objMatch[1];
        }

        let metadata;
        try {
          metadata = JSON.parse(metaJsonStr);
        } catch {
          console.error("Metadata parse failed:", metaText);
          metadata = {
            category: "日本代表",
            tags: ["日本代表"],
            slug: title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
            excerpt: summary.slice(0, 80),
            articleTitle: title,
          };
        }

        // Validate category
        if (!CATEGORIES.includes(metadata.category)) {
          metadata.category = "日本代表";
        }

        send({ type: "metadata", metadata });

        // Step 2: Generate article content matching site style
        send({ type: "status", message: "記事を生成中..." });

        const stream = await client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: `あなたは「サムライフットボール」というサッカー情報サイトのライターです。
日本サッカーファンに向けた、読み応えのある記事を日本語で執筆してください。

## 記事フォーマット（必ず従うこと）

1. 冒頭は導入文から始める（見出しなしで2〜3文）
2. H2見出し（## ）を2〜4個使い、読みやすく構成する
3. 重要ポイントには以下のHTMLカスタム要素を使う（1〜3個）:

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">ポイントのタイトル</span>
<p class="point-body">ポイントの詳細説明。<strong>重要な固有名詞</strong>は太字にする。</p>
</div>

4. 記事の最後には以下のまとめボックスを必ず付ける:

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>記事全体のまとめ。今後の展望を含めた締めくくり。</p>
</div>

## 文体ルール
- ファン目線で熱量のある文体（ですます調ではなく、だ・である調）
- 事実に基づきつつ、分析や展望を加える
- 選手名は初出時にフルネーム+所属クラブを記載
- 1200〜2000文字程度
- Markdownの見出し（##）とHTMLカスタム要素を組み合わせる
- 出典は記事の末尾に記載しない（別途メタデータで管理するため）`,
          messages: [
            {
              role: "user",
              content: `以下のニュースを元に、サムライフットボール向けの記事を書いてください。

タイトル: ${metadata.articleTitle || title}
出典: ${source}
URL: ${url}
概要: ${summary}

記事本文のみを出力してください。メタデータやfrontmatterは不要です。`,
            },
          ],
        });

        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            send({ type: "text", text: event.delta.text });
          }
        }

        send({ type: "done" });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        console.error("Article generation error:", err);
        send({ type: "error", error: err instanceof Error ? err.message : "記事生成エラー" });
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
