import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/api-auth";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const authError = verifyAdmin(request);
  if (authError) return authError;

  const { playerName, category } = await request.json();
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      try {
        // ── STEP 1: Wikipedia専用リサーチ ──
        send({ type: "step", step: 1, message: "Wikipediaリサーチ中..." });
        const researchRes = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          system: `サッカー選手リサーチャー。Wikipedia（en.wikipedia.org / ja.wikipedia.org）を主要ソースとして調査する。
JSON形式のみで返答。コードブロック不要。`,
          messages: [{
            role: "user",
            content: `「${playerName}」についてWikipediaを中心に調査してください。
JSON: {
  "name":"日本語名",
  "nameEn":"English Name",
  "birthDate":"YYYY-MM-DD",
  "birthPlace":"出身地",
  "height":数値cm,
  "weight":数値kg,
  "position":"ポジション",
  "currentClub":"現所属クラブ",
  "nationalTeam":{"caps":数値,"goals":数値,"debutYear":"YYYY"},
  "career":[{"year":"期間","club":"クラブ","detail":"詳細"}],
  "episodes":["エピソード1","エピソード2"],
  "awards":["受賞歴1","受賞歴2"],
  "style":"プレースタイル説明",
  "youthCareer":"ユース経歴",
  "wikiUrl":"WikipediaのURL"
}`,
          }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 3 }],
        });
        let researchText = "";
        for (const block of researchRes.content) { if (block.type === "text") researchText += block.text; }
        const wikiData = (() => { try { return JSON.parse((researchText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return {}; } })();
        send({ type: "step_done", step: 1, data: wikiData });

        // ── STEP 2: 他サイトでファクトチェック ──
        send({ type: "step", step: 2, message: "ファクトチェック中..." });
        const factRes = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2000,
          system: `サッカー選手ファクトチェッカー。Transfermarkt・JFA・ESPN・Goal.comなどでデータを検証する。
JSON形式のみで返答。コードブロック不要。`,
          messages: [{
            role: "user",
            content: `以下のWikipediaデータを他のソースで検証してください。
選手: ${playerName}
データ: ${JSON.stringify(wikiData)}

JSON: {
  "verified":["確認済み事実1","確認済み事実2"],
  "corrections":["修正: ○○は△△が正しい"],
  "additions":["追加情報1"],
  "sources":["Transfermarkt","JFA公式"...]
}`,
          }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 3 }],
        });
        let factText = "";
        for (const b of factRes.content) { if (b.type === "text") factText += b.text; }
        const factData = (() => { try { return JSON.parse((factText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return { verified: [], corrections: [], additions: [], sources: [] }; } })();
        send({ type: "step_done", step: 2, data: factData });

        // ── STEP 3: 記事執筆ストリーミング ──
        send({ type: "step", step: 3, message: "記事執筆中..." });
        let articleContent = "";
        const stream = client.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 10000,
          system: `あなたは30年以上サッカー業界に関わってきたプロのサッカージャーナリストだ。
1990年代のJリーグ創設期から現場を取材し、ワールドカップは7大会連続で現地取材。
選手のプレーを技術的・戦術的な視点から分析し、その選手が「なぜ成長できたのか」「何が他の選手と違うのか」を言語化することに長けている。
単なる経歴の羅列ではなく、選手の人間性・成長の軌跡・転換点を深く掘り下げた読み応えのある記事を書く。

## ライティングスタイル
- だ・である調
- 1文は40文字以内
- 3000文字以上
- 誇張表現禁止（至宝・輝く・魔法使い・類まれなる等）→ 具体的数字・事実に置換
- Wikipediaで確認された事実のみを使用する
- ファクトチェックのcorrectionsがあれば修正後のデータを使う

## 記事構成
1. 冒頭リード（選手の立ち位置・特徴を端的に。キャッチーだが事実ベース）
2. ## プロフィール（profile-table HTMLテーブル）
3. ## サッカーとの出会い（幼少期・ユース時代の環境・恩師・転機）
4. ## プロキャリアの歩み（各クラブでの成長・なぜそのクラブか・具体的な成績）
5. ## 欧州での挑戦（移籍の背景・現地での評価・技術的な変化を分析）
6. ## 日本代表での実績（役割・印象的な試合・チームへの貢献を分析）
7. highlight-box × 3個（技術分析・記録・転換点をテーマに）
8. ## 選手経歴（schedule-tableのHTMLテーブル・完全に閉じる）
9. summary-card（キャリア全体の評価と2026W杯への展望・200文字以上）

## HTMLテーブルの書き方（必ず完全に閉じること）
profile-table:
<table class="profile-table"><tbody>
<tr><th>名前</th><td>フルネーム</td></tr>
<tr><th>生年月日</th><td>YYYY年MM月DD日</td></tr>
<tr><th>出身地</th><td>出身地</td></tr>
<tr><th>身長</th><td>XXXcm</td></tr>
<tr><th>体重</th><td>XXkg</td></tr>
<tr><th>ポジション</th><td>ポジション</td></tr>
<tr><th>所属クラブ</th><td>クラブ名</td></tr>
<tr><th>代表</th><td>出場数・得点数</td></tr>
</tbody></table>

schedule-table:
<table class="schedule-table"><thead><tr><th>年</th><th>クラブ</th><th>出場</th><th>得点</th></tr></thead><tbody>
<tr><td>年</td><td>クラブ名</td><td>数値</td><td>数値</td></tr>
</tbody></table>

highlight-box:
<div class="highlight-box">
<span class="point-label">POINT N</span>
<span class="point-title">分析的なタイトル</span>
<p class="point-body">技術的・戦術的な分析を含む説明。<strong>固有名詞</strong>は太字。100文字以上。</p>
</div>

summary-card:
<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>キャリア全体の評価と2026W杯での役割・展望を分析的な視点で。200文字以上。</p>
</div>`,
          messages: [{
            role: "user",
            content: `「${playerName}」（カテゴリ: ${category}）の記事を書いてください。本文のみ出力。

## Wikipediaリサーチデータ
${JSON.stringify(wikiData, null, 2)}

## ファクトチェック結果
${JSON.stringify(factData, null, 2)}`,
          }],
        });
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            articleContent += event.delta.text;
            send({ type: "text", text: event.delta.text });
          }
        }
        send({ type: "step_done", step: 3, data: {} });

        // ── STEP 4: AdSense審査 ──
        send({ type: "step", step: 4, message: "AdSense品質審査中..." });
        const adsRes = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: "AdSense審査専門家。100点満点で評価。JSON形式のみ。コードブロック不要。",
          messages: [{
            role: "user",
            content: `文字数:${articleContent.length}\n記事冒頭500字:${articleContent.slice(0, 500)}\n\nJSON:{"score":数値,"breakdown":{"originality":数値,"information":数値,"readability":数値,"policy":数値},"good":["良い点"],"issues":["問題点"],"verdict":"投稿OK or 要改善"}`,
          }],
        });
        let adsenseText = "";
        for (const b of adsRes.content) { if (b.type === "text") adsenseText += b.text; }
        const adsense = (() => { try { return JSON.parse((adsenseText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return { score: 80, verdict: "投稿OK" }; } })();
        send({ type: "step_done", step: 4, data: adsense });

        // ── 完了 ──
        const title = wikiData.name
          ? `${wikiData.name}——${(wikiData.style || "その軌跡と挑戦").slice(0, 20)}`
          : `${playerName}——その軌跡と挑戦`;

        send({
          type: "done",
          article: articleContent,
          title,
          wikiData,
          factData,
          adsense,
          sources: factData.sources || [],
        });
        controller.close();
      } catch (err) {
        send({ type: "error", error: err instanceof Error ? err.message : "Unknown error" });
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}
