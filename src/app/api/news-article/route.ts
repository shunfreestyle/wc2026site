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

      try {
        // =============================================
        // STEP 1: 深いリサーチ（web_search で複数サイト収集）
        // =============================================
        send({ type: "step", step: 1, label: "深いリサーチ", message: "5〜8サイトから情報収集中..." });

        const researchResponse = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: `あなたはスポーツジャーナリストのリサーチャーです。
与えられたニュースについて徹底的に調査し、複数のソースから事実を収集してください。

必ずJSON形式のみで返答。コードブロック不要。`,
          messages: [
            {
              role: "user",
              content: `以下のニュースについて、ウェブ検索で5〜8件の関連記事を調査してください。

ニュース: ${title}
概要: ${summary}
元記事URL: ${url}
元記事メディア: ${source}

調査で以下を正確に把握してください：
- 選手のフルネーム・所属クラブ・年齢・背番号
- スコア・日付・会場などの具体的な数字
- 監督や選手のコメント（原文に近い形で）
- 各メディアの論調・切り口の違い
- 関連する過去の出来事や文脈

以下のJSON形式で出力:
{
  "facts": [
    {"fact": "確認された事実", "sources": ["ソース名1", "ソース名2"]}
  ],
  "quotes": [
    {"speaker": "発言者名", "quote": "発言内容", "source": "ソース名"}
  ],
  "context": "このニュースの背景・文脈の説明（200文字程度）",
  "playerDetails": [
    {"name": "選手名", "club": "所属クラブ", "age": 25, "position": "ポジション"}
  ],
  "numbers": [
    {"label": "数字の説明", "value": "具体的な数字"}
  ],
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
          sourceCount: 0,
        }) as Record<string, unknown>;

        send({
          type: "step",
          step: 1,
          label: "深いリサーチ",
          message: `完了 — ${(research.facts as Array<unknown>)?.length || 0}件の事実、${(research.quotes as Array<unknown>)?.length || 0}件のコメントを収集`,
        });

        // =============================================
        // STEP 2: ファクトチェック（2回）
        // =============================================
        send({ type: "step", step: 2, label: "ファクトチェック", message: "1回目: 情報の矛盾・誤りを検証中..." });

        const factCheck1 = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: `あなたはスポーツニュースのファクトチェッカーです。
収集された情報を精査し、矛盾や疑わしい点を指摘してください。
必ずJSON形式のみで返答。コードブロック不要。`,
          messages: [
            {
              role: "user",
              content: `以下のリサーチ結果をファクトチェックしてください。

元ニュース: ${title}

リサーチ結果:
${JSON.stringify(research, null, 2)}

以下を検証:
1. 事実同士に矛盾はないか
2. 数字（スコア、日付、年齢、移籍金額等）に不整合はないか
3. 選手名・チーム名の表記揺れや誤りはないか
4. コメントの文脈は正しいか

JSON形式で出力:
{
  "issues": [{"description": "問題点", "severity": "high/medium/low", "suggestion": "修正案"}],
  "verifiedFacts": ["確認済みの事実1", "確認済みの事実2"],
  "unreliableFacts": ["不確かな情報1"],
  "correctedNumbers": [{"original": "元の値", "corrected": "修正値", "reason": "修正理由"}]
}`,
            },
          ],
        });

        const check1Text = extractText(factCheck1);
        const check1 = parseJsonSafe(check1Text, {
          issues: [],
          verifiedFacts: [],
          unreliableFacts: [],
          correctedNumbers: [],
        }) as Record<string, unknown>;

        send({
          type: "step",
          step: 2,
          label: "ファクトチェック",
          message: `1回目完了 — ${(check1.issues as Array<unknown>)?.length || 0}件の問題検出、2回目の検証中...`,
        });

        // 2回目：固有名詞・数字の再確認（web_search付き）
        const factCheck2 = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: `あなたはスポーツニュースの最終ファクトチェッカーです。
固有名詞と数字に特化して最終確認を行います。ウェブ検索で裏取りしてください。
必ずJSON形式のみで返答。コードブロック不要。`,
          messages: [
            {
              role: "user",
              content: `以下の情報について、固有名詞と数字の最終確認を行ってください。

元ニュース: ${title}
1回目チェック結果: ${JSON.stringify(check1, null, 2)}
リサーチ結果の選手情報: ${JSON.stringify(research.playerDetails || [], null, 2)}
リサーチ結果の数字情報: ${JSON.stringify(research.numbers || [], null, 2)}

ウェブ検索で以下を再確認:
- 選手名のフルネーム（漢字表記）
- 所属クラブ名（正式名称）
- 年齢・背番号・ポジション
- スコア・日付・会場

JSON形式で出力:
{
  "finalFacts": ["最終確認済みの事実1", ...],
  "corrections": [{"item": "修正対象", "before": "修正前", "after": "修正後"}],
  "doNotInclude": ["記事に含めるべきでない不確かな情報"]
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

        const check2Text = extractText(factCheck2);
        const check2 = parseJsonSafe(check2Text, {
          finalFacts: [],
          corrections: [],
          doNotInclude: [],
        }) as Record<string, unknown>;

        send({
          type: "step",
          step: 2,
          label: "ファクトチェック",
          message: `完了 — ${(check2.corrections as Array<unknown>)?.length || 0}件の修正、${(check2.doNotInclude as Array<unknown>)?.length || 0}件の除外情報`,
        });

        // =============================================
        // STEP 3: メタデータ生成
        // =============================================
        send({ type: "step", step: 3, label: "メタデータ生成", message: "カテゴリ・タグ・タイトルを生成中..." });

        const metaResponse = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: `サッカーニュース記事のメタデータを生成するAIです。
必ずJSON形式のみで返答。前置き・コードブロック不要。`,
          messages: [
            {
              role: "user",
              content: `以下のニュースのメタデータを生成してください。

ニュースタイトル: ${title}
出典: ${source}
概要: ${summary}

JSON形式:
{
  "category": "${CATEGORIES.join(" | ")} から1つ",
  "tags": ["3〜7個"],
  "slug": "english-slug",
  "excerpt": "50〜80文字の要約",
  "articleTitle": "【】付きの記事タイトル"
}

タグは既存タグ優先: ${EXISTING_TAGS.join(", ")}
既存にない場合は新規作成OK。`,
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

        // =============================================
        // STEP 4: 執筆（人間的な文章）
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

■ ファクトチェックで確認済みの事実:
${JSON.stringify(check2.finalFacts || [], null, 2)}

■ 修正された情報:
${JSON.stringify(check2.corrections || [], null, 2)}

■ 記事に含めてはいけない不確かな情報:
${JSON.stringify(check2.doNotInclude || [], null, 2)}`,
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
