import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const { content, issues, score, factCheckWarnings, factCheckVerified } = await request.json();
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001", // コスト削減: claude-sonnet-4-20250514 → claude-haiku-4-5-20251001
    max_tokens: 8000,
    system: `あなたはAdSense審査を熟知したサッカーライター。記事を85点以上になるよう改善する。

## 絶対に守るルール
- ファクトチェックで要確認・不正確と指摘された表現は必ず削除または修正する
- テーブルHTMLは必ず完全に閉じる（tbody・tr・th・td すべて）
- profile-tableとschedule-tableは必ず含める・完成させる
- highlight-boxを最低2個含める
- summary-cardを必ず含める
- 文字数は3000文字以上
- だ・である調を維持
- 主観的・誇張表現（至宝・輝く・魔法使い・類まれなる等）を削除して具体的な数字・事実に置き換える
- 改善後の記事本文のみ出力（説明や注釈は不要）`,
    messages: [{
      role: "user",
      content: `## AdSense審査で指摘された問題点（必ず修正）
${issues && issues.length > 0 ? issues.map((i: string) => `- ${i}`).join("\n") : "なし"}

## ファクトチェックで不正確・要確認と指摘された内容（必ず修正）
${factCheckWarnings && factCheckWarnings.length > 0 ? factCheckWarnings.map((w: string) => `- ${w}`).join("\n") : "なし"}

## ファクトチェックで確認済みの事実（維持する）
${factCheckVerified && factCheckVerified.length > 0 ? factCheckVerified.map((v: string) => `- ${v}`).join("\n") : "なし"}

## 現在のスコア: ${score}点 → 目標: 85点以上

【改善前の記事】
${content}`,
    }],
  });

  const improved = response.content.find((b: { type: string }) => b.type === "text")?.text || content;
  return NextResponse.json({ improved });
}
