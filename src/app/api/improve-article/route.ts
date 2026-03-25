import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const { content, issues, score, breakdown } = await request.json();
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const weakPoints: string[] = [];
  if (breakdown?.originality < 20) weakPoints.push("独自性が低い：他にはない視点・エピソード・考察を追加する");
  if (breakdown?.information < 20) weakPoints.push("情報量が不足：具体的な数字・年号・エピソードをさらに追加する");
  if (breakdown?.readability < 20) weakPoints.push("読みやすさを改善：長い文を分割、見出しを増やす、体言止めを活用する");
  if (breakdown?.policy < 18) weakPoints.push("ポリシー適合：事実に基づいた表現に修正、誇張表現を削除する");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    system: `あなたはGoogle AdSense審査を熟知したサッカーライター。
記事をAdSense基準で85点以上になるよう改善する。

## 改善の優先順位
1. 独自性：他サイトにない独自の視点・分析・エピソードを追加
2. 情報量：具体的な数字・年号・エピソードを充実させる
3. 読みやすさ：文章の流れを改善、見出し構成を最適化
4. ポリシー適合：誇張や未確認情報を修正

## ルール
- マークダウン形式を維持すること
- 元の記事の良い部分はそのまま残すこと
- 改善した記事本文のみを出力すること（説明や注釈は不要）
- 3000文字以上を維持すること`,
    messages: [{
      role: "user",
      content: `現在のAdSenseスコア: ${score}/100
指摘された問題点: ${issues.join(", ") || "なし"}
弱い項目: ${weakPoints.join(", ") || "特になし"}

【改善すべき記事】
${content}`,
    }],
  });

  const improved = response.content.find(b => b.type === "text")?.text || content;
  return NextResponse.json({ improved });
}
