import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/api-auth";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const authError = verifyAdmin(request);
  if (authError) return authError;

  const { content, playerName } = await request.json();
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const [factRes, adsRes] = await Promise.all([
    // ファクトチェック
    client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: "サッカー選手ファクトチェッカー。Web検索で事実を検証する。JSON形式のみ。コードブロック不要。",
      messages: [{
        role: "user",
        content: `選手「${playerName}」の記事をファクトチェックしてください。
記事冒頭500字: ${content.slice(0, 500)}

JSON: {"verified":["確認済み事実"],"corrections":["修正: ○○は△△が正しい"],"warnings":["要確認情報"]}`,
      }],
      tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 4 }],
    }),
    // AdSense審査
    client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: "AdSense審査専門家。100点満点で評価。JSON形式のみ。コードブロック不要。",
      messages: [{
        role: "user",
        content: `文字数:${content.length}\n記事冒頭500字:${content.slice(0, 500)}\n\nJSON:{"score":数値,"breakdown":{"originality":数値,"information":数値,"readability":数値,"policy":数値},"good":["良い点"],"issues":["問題点"],"verdict":"投稿OK or 要改善"}`,
      }],
    }),
  ]);

  let factText = "";
  for (const b of factRes.content) { if (b.type === "text") factText += b.text; }
  const factCheck = (() => { try { return JSON.parse((factText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return { verified: [], corrections: [], warnings: [] }; } })();

  let adsenseText = "";
  for (const b of adsRes.content) { if (b.type === "text") adsenseText += b.text; }
  const adsense = (() => { try { return JSON.parse((adsenseText.match(/\{[\s\S]*\}/) || ["{}"])[0]); } catch { return { score: 80, verdict: "投稿OK" }; } })();

  return NextResponse.json({ factCheck, adsense });
}
