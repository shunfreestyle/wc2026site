import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const maxDuration = 60;

const CATEGORIES = ["日本代表", "Jリーグ", "W杯", "海外組", "コラム", "選手紹介"] as const;

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

function extractText(response: Anthropic.Message): string {
  let text = "";
  for (const block of response.content) {
    if (block.type === "text") text += block.text;
  }
  return text;
}

function parseJsonSafe(text: string, fallback: unknown = null): unknown {
  let s = text.trim();
  const cb = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cb) s = cb[1].trim();
  if (!s.startsWith("{") && !s.startsWith("[")) {
    const m = s.match(/(\{[\s\S]*\})/);
    if (m) s = m[1];
  }
  try {
    return JSON.parse(s);
  } catch {
    console.error("JSON parse failed:", text.slice(0, 500));
    return fallback;
  }
}

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

      // Keepalive: send a ping every 8 seconds to prevent Vercel/browser timeout
      const keepalive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "ping" })}\n\n`));
        } catch {
          // controller already closed
        }
      }, 8000);

      try {
        // =============================================
        // STEP 1: 深いリサーチ + ファクトチェック（1回のAPI呼び出しに統合）
        // =============================================
        send({ type: "step", step: 1, label: "深いリサーチ", message: "複数サイトから情報収集・検証中..." });

        const researchResponse = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: `あなたはスポーツジャーナリストのリサーチャー兼ファクトチェッカーです。
与えられたニュースについて徹底調査し、事実を収集したうえで正確性を検証してください。

必ずJSON形式のみで返答。コードブロック不要。`,
          messages: [
            {
              role: "user",
              content: `以下のニュースについてウェブ検索で5〜8件の関連記事を調査し、ファクトチェックも同時に行ってください。

ニュース: ${title}
概要: ${summary}
元記事URL: ${url}
元記事メディア: ${source}

調査項目:
- 選手のフルネーム・所属クラブ・年齢・背番号
- スコア・日付・会場などの具体的な数字
- 監督や選手のコメント（原文に近い形で）
- 各メディアの論調の違い
- 関連する過去の出来事や文脈

ファクトチェック:
- 複数ソース間の矛盾を特定
- 固有名詞・数字の正確性を検証
- 不確かな情報を除外リストに追加

JSON形式で出力:
{
  "facts": [{"fact": "確認された事実", "sources": ["ソース名1", "ソース名2"]}],
  "quotes": [{"speaker": "発言者名", "quote": "発言内容", "source": "ソース名"}],
  "context": "このニュースの背景・文脈（200文字程度）",
  "playerDetails": [{"name": "選手名", "club": "所属クラブ", "age": 25, "position": "ポジション"}],
  "numbers": [{"label": "数字の説明", "value": "具体的な数字"}],
  "doNotInclude": ["不確かまたは矛盾がある情報"],
  "sourceCount": 5
}`,
            },
          ],
          tools: [
            {
              type: "web_search_20250305" as const,
              name: "web_search",
              max_uses: 8,
            },
          ],
        });

        const researchText = extractText(researchResponse);
        const research = parseJsonSafe(researchText, {
          facts: [],
          quotes: [],
          context: summary,
          playerDetails: [],
          numbers: [],
          doNotInclude: [],
          sourceCount: 0,
        }) as Record<string, unknown>;

        send({
          type: "step",
          step: 1,
          label: "深いリサーチ",
          message: `完了 — ${(research.facts as Array<unknown>)?.length || 0}件の事実、${(research.quotes as Array<unknown>)?.length || 0}件のコメント収集`,
        });

        // =============================================
        // STEP 2: ファクトチェック（固有名詞・数字の再確認）
        // =============================================
        send({ type: "step", step: 2, label: "ファクトチェック", message: "固有名詞・数字をウェブ検索で再確認中..." });

        const factCheckResponse = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2048,
          system: `スポーツニュースのファクトチェッカーです。固有名詞と数字を検証してください。
必ずJSON形式のみで返答。コードブロック不要。`,
          messages: [
            {
              role: "user",
              content: `以下のリサーチ結果の固有名詞と数字を最終確認してください。

元ニュース: ${title}
選手情報: ${JSON.stringify(research.playerDetails || [], null, 2)}
数字情報: ${JSON.stringify(research.numbers || [], null, 2)}
除外候補: ${JSON.stringify(research.doNotInclude || [], null, 2)}

ウェブ検索で確認:
- 選手名のフルネーム（漢字表記）
- 所属クラブ名（正式名称）
- 年齢・ポジション
- スコア・日付

JSON形式:
{
  "corrections": [{"item": "修正対象", "before": "修正前", "after": "修正後"}],
  "finalDoNotInclude": ["記事に含めない不確かな情報"]
}`,
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

        const checkText = extractText(factCheckResponse);
        const factCheck = parseJsonSafe(checkText, {
          corrections: [],
          finalDoNotInclude: [],
        }) as Record<string, unknown>;

        const allDoNotInclude = [
          ...((research.doNotInclude as string[]) || []),
          ...((factCheck.finalDoNotInclude as string[]) || []),
        ];

        send({
          type: "step",
          step: 2,
          label: "ファクトチェック",
          message: `完了 — ${(factCheck.corrections as Array<unknown>)?.length || 0}件修正、${allDoNotInclude.length}件除外`,
        });

        // =============================================
        // STEP 3: メタデータ生成 + 執筆開始を同時に
        // =============================================
        send({ type: "step", step: 3, label: "メタデータ生成", message: "カテゴリ・タグ・タイトルを生成中..." });

        const metaResponse = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: `サッカーニュース記事のメタデータ生成AI。JSON形式のみ。コードブロック不要。`,
          messages: [
            {
              role: "user",
              content: `メタデータを生成:

タイトル: ${title}
出典: ${source}
概要: ${summary}

JSON: {"category": "${CATEGORIES.join("|")}から1つ", "tags": ["3〜7個"], "slug": "english-slug", "excerpt": "50〜80文字", "articleTitle": "【】付きタイトル"}

既存タグ優先: ${EXISTING_TAGS.join(", ")}`,
            },
          ],
        });

        const metaText = extractText(metaResponse);
        let metadata = parseJsonSafe(metaText, null) as Record<string, unknown> | null;
        if (!metadata) {
          metadata = {
            category: "日本代表",
            tags: ["日本代表"],
            slug: "news-" + Date.now(),
            excerpt: summary.slice(0, 80),
            articleTitle: title,
          };
        }
        if (!CATEGORIES.includes(metadata.category as typeof CATEGORIES[number])) {
          metadata.category = "日本代表";
        }

        send({ type: "metadata", metadata });
        send({
          type: "step",
          step: 3,
          label: "メタデータ生成",
          message: `完了 — ${metadata.category} / ${(metadata.tags as string[])?.length || 0}タグ`,
        });

        // =============================================
        // STEP 4: 執筆（ストリーミング）
        // =============================================
        send({ type: "step", step: 4, label: "執筆", message: "リサーチ結果をもとに記事を執筆中..." });

        const stream = await client.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 6000,
          system: `あなたは「サムライフットボール」のベテランライターだ。10年以上サッカーを取材してきた。
読者は日本サッカーに詳しいファン層。彼らの期待に応える深みのある記事を書け。

## 絶対に守るルール

### 文体
- だ・である調で統一
- 「〜となっています」「〜とのことです」「〜が期待されます」は禁止。AI臭い
- 「まず」「次に」「そして」「また」「さらに」で文を始めるのは各1回まで。繰り返すな
- 同じ構文・言い回しを連続させない。「〜した。〜した。〜した。」のような単調なリズムを避けろ
- 体言止め、倒置法、問いかけ、比喩を適度に織り交ぜろ
- 1文を40文字以内に抑える意識。長文は区切れ

### 構成
1. 冒頭リード文（見出しなし、2〜3文で読者を引き込む）
2. ## 見出し1（H2）— 核心の事実を伝える
3. highlight-box（POINT 1〜2）— 重要情報を強調
4. ## 見出し2（H2）— 分析・背景・展望
5. ## 見出し3（H2）— 今後の注目点やファン視点の考察（任意）
6. summary-card — 記事の締め

### HTMLカスタム要素（必ず使うこと）

重要ポイント（1〜3個使用）:
<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">タイトル</span>
<p class="point-body">説明文。<strong>固有名詞</strong>は太字。</p>
</div>

記事末尾のまとめ（必ず1個）:
<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>まとめ文。</p>
</div>

### 事実の扱い
- 提供されたリサーチ結果とファクトチェック結果のみを使用
- 「除外すべき情報」に指定されたものは絶対に書かない
- 選手名は初出時フルネーム＋（所属クラブ）
- コメント引用は「」で囲み、発言者を明記

### 分量
- 1500〜2500文字
- 出典は本文末尾に書かない（メタデータで管理）`,
          messages: [
            {
              role: "user",
              content: `以下の素材をもとに記事を書いてください。記事本文のみ出力。

■ テーマ: ${metadata.articleTitle || title}

■ リサーチで収集した事実:
${JSON.stringify(research.facts || [], null, 2)}

■ 引用可能なコメント:
${JSON.stringify(research.quotes || [], null, 2)}

■ 背景・文脈:
${research.context || summary}

■ 選手情報:
${JSON.stringify(research.playerDetails || [], null, 2)}

■ 確認済みの数字:
${JSON.stringify(research.numbers || [], null, 2)}

■ 修正情報:
${JSON.stringify(factCheck.corrections || [], null, 2)}

■ 記事に含めてはいけない不確かな情報:
${JSON.stringify(allDoNotInclude, null, 2)}`,
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

        clearInterval(keepalive);
        send({ type: "done" });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        clearInterval(keepalive);
        console.error("Article generation error:", err);
        const msg = err instanceof Error ? err.message : "記事生成エラー";
        try {
          send({ type: "error", error: msg });
          controller.close();
        } catch {
          // controller may already be closed
        }
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
