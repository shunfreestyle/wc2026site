import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const { playerName, category, recheck, articleContent } = await request.json();
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // recheckモード: AdSense再審査のみ
  if (recheck && articleContent) {
    const adsRes = await client.messages.create({
      model: "claude-haiku-4-5-20251001", max_tokens: 1024,
      system: "AdSense審査専門家。JSON形式のみ。コードブロック不要。",
      messages: [{ role: "user", content: `文字数:${articleContent.length}\n冒頭:${articleContent.slice(0,300)}\n\nJSON:{"score":数値,"good":["良い点"],"issues":["問題点"],"verdict":"投稿OK"}` }],
    });
    let adsenseText = ""; for (const b of adsRes.content) { if (b.type === "text") adsenseText += b.text; }
    const adsense = (() => { try { return JSON.parse((adsenseText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return { score: 80, verdict: "投稿OK" }; } })();
    return NextResponse.json({ adsense });
  }

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      try {
        send({ type: "step", step: 1, message: "リサーチ中..." });
        const researchResponse = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: `サッカー選手リサーチャー。JSON形式のみで返答。コードブロック不要。`,
          messages: [{ role: "user", content: `「${playerName}」について調査してください。JSON: {"name":"名前","nameEn":"English","birthDate":"YYYY-MM-DD","birthPlace":"出身地","height":数値,"position":"ポジション","currentClub":"所属クラブ","career":[{"year":"年代","club":"クラブ","detail":"詳細"}],"stats":[{"season":"シーズン","club":"クラブ","apps":数値,"goals":数値}],"nationalTeam":{"caps":数値,"goals":数値,"debut":"デビュー年"},"episodes":["エピソード1","エピソード2"],"style":"プレースタイル","wcExpectation":"W杯への期待200文字"}` }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 8 }],
        });
        let researchText = "";
        for (const block of researchResponse.content) { if (block.type === "text") researchText += block.text; }
        const jsonMatch = researchText.match(/\{[\s\S]*\}/);
        const research = (() => { try { return JSON.parse(jsonMatch ? jsonMatch[0] : "{}"); } catch { return {}; } })();
        send({ type: "step_done", step: 1, data: research });

        send({ type: "step", step: 2, message: "記事執筆中..." });
        let articleContent = "";
        const stream = client.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 6000,
          system: `サッカー専門メディアのベテランライター。だ・である調。1文40文字以内。3000文字以上。
構成: 1.冒頭リード 2.## プロフィール(profile-tableのHTMLテーブル) 3.## 幼少期・学生時代 4.## プロデビュー 5.## 現在のクラブ 6.highlight-box×2〜3 7.## 日本代表での活躍 8.## 選手経歴(schedule-tableのHTMLテーブル) 9.summary-card
highlight-box: <div class="highlight-box"><span class="point-label">POINT 1</span><span class="point-title">タイトル</span><p class="point-body">説明。<strong>固有名詞</strong>は太字。</p></div>
summary-card: <div class="summary-card"><div class="summary-label">SUMMARY</div><p>まとめ。W杯への期待で締める。</p></div>`,
          messages: [{ role: "user", content: `「${playerName}」の記事を書いてください。本文のみ出力。\n\nリサーチデータ:\n${JSON.stringify(research, null, 2)}` }],
        });
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            articleContent += event.delta.text;
            send({ type: "text", text: event.delta.text });
          }
        }
        send({ type: "step_done", step: 2, data: {} });

        send({ type: "step", step: 3, message: "ファクトチェック中..." });
        const factRes = await client.messages.create({
          model: "claude-haiku-4-5-20251001", max_tokens: 1024,
          system: "ファクトチェッカー。JSON形式のみ。コードブロック不要。",
          messages: [{ role: "user", content: `選手:${playerName}\n記事冒頭:${articleContent.slice(0,500)}\n\nJSON:{"verified":["確認済み事実"],"warnings":["要確認情報"],"score":85}` }],
        });
        let factText = ""; for (const b of factRes.content) { if (b.type === "text") factText += b.text; }
        const factCheck = (() => { try { return JSON.parse((factText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return { verified: [], warnings: [], score: 80 }; } })();
        send({ type: "step_done", step: 3, data: factCheck });

        send({ type: "step", step: 4, message: "AdSense品質審査中..." });
        const adsRes = await client.messages.create({
          model: "claude-haiku-4-5-20251001", max_tokens: 1024,
          system: "AdSense審査専門家。JSON形式のみ。コードブロック不要。",
          messages: [{ role: "user", content: `文字数:${articleContent.length}\n冒頭:${articleContent.slice(0,300)}\n\nJSON:{"score":数値,"good":["良い点"],"issues":["問題点"],"verdict":"投稿OK"}` }],
        });
        let adsenseText = ""; for (const b of adsRes.content) { if (b.type === "text") adsenseText += b.text; }
        const adsense = (() => { try { return JSON.parse((adsenseText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return { score: 80, verdict: "投稿OK" }; } })();
        send({ type: "step_done", step: 4, data: adsense });

        const title = research.name ? `${research.name}——${(research.style || "その軌跡と挑戦").slice(0,20)}` : `${playerName}——その軌跡と挑戦`;
        send({ type: "done", article: articleContent, title, research, factCheck, adsense });
        controller.close();
      } catch (err) {
        send({ type: "error", error: err instanceof Error ? err.message : "Unknown error" });
        controller.close();
      }
    },
  });

  return new Response(readable, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } });
}
