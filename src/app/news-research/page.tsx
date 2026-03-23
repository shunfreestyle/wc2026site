"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";

/* ─── Types ─── */
type SourceUrl = { source: string; url: string };
type NewsItem = { rank: number; title: string; urls: SourceUrl[]; summary: string; hoursAgo?: number };
type StepInfo = { step: number; label: string; message: string; done?: boolean };

/* ─── API helper ─── */
async function callClaude(
  system: string,
  user: string,
  opts: { webSearch?: boolean; stream?: boolean; model?: string; maxTokens?: number } = {},
) {
  if (!API_KEY) throw new Error("APIキーが未設定です");
  const body: Record<string, unknown> = {
    model: opts.model || "claude-haiku-4-5-20251001",
    max_tokens: opts.maxTokens || 4096,
    stream: opts.stream || false,
    system,
    messages: [{ role: "user", content: user }],
  };
  if (opts.webSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }];
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`API ${res.status}: ${t.slice(0, 200)}`);
  }
  return res;
}

function extractText(data: Record<string, unknown>): string {
  const content = data.content as Array<Record<string, unknown>>;
  let text = "";
  for (const b of content) {
    if (b.type === "text") text += String(b.text || "");
  }
  return text;
}

function parseJsonSafe<T>(text: string, fallback: T): T {
  let s = text.trim();
  const cb = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cb) s = cb[1].trim();
  if (!s.startsWith("{") && !s.startsWith("[")) {
    const m = s.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (m) s = m[1];
  }
  try { return JSON.parse(s); } catch { return fallback; }
}

/* ─── Parse news JSON from Claude ─── */
function parseNews(data: Record<string, unknown>): NewsItem[] {
  const content = data.content as Array<Record<string, unknown>>;
  const srUrls: { url: string; title: string }[] = [];
  let text = "";
  for (const b of content) {
    if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
      for (const r of b.content as Array<Record<string, unknown>>) {
        if (r.type === "web_search_result" && r.url) srUrls.push({ url: String(r.url), title: String(r.title || "") });
      }
    }
    if (b.type === "text") text += String(b.text || "");
  }

  let json = text.trim();
  const cb = json.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cb) json = cb[1].trim();
  if (!json.startsWith("[")) { const m = json.match(/(\[[\s\S]*\])/); if (m) json = m[1]; }
  if (!json.startsWith("[") && json.startsWith("{")) json = `[${json}]`;

  let items: NewsItem[] = [];
  try {
    const raw = JSON.parse(json) as Array<Record<string, unknown>>;
    items = raw.map((r, i) => ({
      rank: i + 1,
      title: String(r.title || ""),
      urls: Array.isArray(r.urls)
        ? (r.urls as SourceUrl[]).filter((u) => u?.url?.startsWith("http"))
        : r.url ? [{ source: String(r.source || ""), url: String(r.url) }] : [],
      summary: String(r.summary || ""),
      hoursAgo: typeof r.hoursAgo === "number" ? r.hoursAgo : undefined,
    }));
  } catch {
    items = srUrls.slice(0, 3).map((sr, i) => ({
      rank: i + 1, title: sr.title, urls: [{ source: "検索結果", url: sr.url }], summary: "", hoursAgo: undefined,
    }));
  }

  return items.filter((it) => it.title && (!it.hoursAgo || it.hoursAgo <= 48));
}

/* ─── Stream reader helper ─── */
async function readStream(res: Response, onText: (t: string) => void) {
  const reader = res.body?.getReader();
  if (!reader) throw new Error("ストリーム取得失敗");
  const dec = new TextDecoder();
  let buf = "", full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
      try {
        const ev = JSON.parse(line.slice(6));
        if (ev.type === "content_block_delta" && ev.delta?.text) {
          full += ev.delta.text;
          onText(full);
        }
      } catch { /* skip */ }
    }
  }
  return full;
}

/* ─── Helpers ─── */
const timeLabel = (h?: number) => {
  if (h == null) return null;
  if (h < 1) return "1時間以内";
  if (h < 24) return `約${Math.round(h)}時間前`;
  return `約${Math.round(h / 24)}日前`;
};

const SOURCE_ICONS: Record<string, string> = {
  "ゲキサカ": "⚽", "サッカーキング": "👑", "Yahoo!ニュース": "📰", "Goal.com": "🥅",
  "超WORLDサッカー": "🌍", "Jリーグ公式": "🏆", "日刊スポーツ": "📄", "スポーツ報知": "📢",
};

/* ═══ Component ═══ */
export default function NewsResearchPage() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genIdx, setGenIdx] = useState<number | null>(null);
  const [genSteps, setGenSteps] = useState<StepInfo[]>([]);
  const [articles, setArticles] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState<number | null>(null);

  /* ── Fetch news (3 items) ── */
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    setNews([]);
    setArticles({});

    try {
      const res = await callClaude(
        `あなたはサッカーニュース調査員です。日本語で回答。
ルール:
- 純粋なJSON配列のみ出力。前置き・説明・コードブロック不要。
- URLは検索結果の実際のURLのみ。推測禁止。
- 直近48時間以内で最もトレンドのニュースを厳選して3件のみ。
- 同じニュースが複数メディアで報じられている場合はurlsにまとめる（最大5メディア）。
- summaryは300〜400文字で詳しく。5W1Hを含めること。
- 3件それぞれ異なるトピックであること。`,
        `直近48時間の日本サッカーニュースをウェブ検索してください。

検索:
1. "日本代表 サッカー 最新ニュース"
2. "Jリーグ 速報 結果 最新"
3. "海外サッカー 日本人選手"
4. "サッカー 移籍 W杯2026"

最もトレンドの3件をJSON配列で出力（注目度順）:
[{"title":"タイトル","urls":[{"source":"メディア名","url":"実際のURL"}],"summary":"300〜400文字の詳細な概要","hoursAgo":数値}]`,
        { webSearch: true }
      );

      const data = await res.json();
      const items = parseNews(data);
      const ranked = items.slice(0, 3).map((it, i) => ({ ...it, rank: i + 1 }));

      if (ranked.length === 0) throw new Error("ニュースが取得できませんでした");
      setNews(ranked);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  /* ── Update step state ── */
  const updateStep = (step: number, label: string, message: string, done = false) => {
    setGenSteps((prev) => {
      const next = [...prev];
      const idx = next.findIndex((s) => s.step === step);
      const info = { step, label, message, done };
      if (idx >= 0) next[idx] = info; else next.push(info);
      return next;
    });
  };

  /* ── Generate article (3-step pipeline) ── */
  const genArticle = async (item: NewsItem, idx: number) => {
    setGenIdx(idx);
    setGenSteps([]);
    setArticles((p) => ({ ...p, [idx]: "" }));
    const u = item.urls[0];

    try {
      // ── STEP 1: 深いリサーチ + ファクトチェック ──
      updateStep(1, "深いリサーチ", "5〜8サイトから情報収集・ファクトチェック中...");

      const researchRes = await callClaude(
        `あなたはスポーツジャーナリストのリサーチャー兼ファクトチェッカーだ。
与えられたニュースを徹底調査し、複数ソースから事実を収集しつつ正確性を検証せよ。
必ずJSON形式のみで返答。コードブロック不要。`,
        `以下のニュースをウェブ検索で5〜8件の関連記事から調査・ファクトチェックせよ。

ニュース: ${item.title}
概要: ${item.summary}
元記事URL: ${u?.url || ""}
元記事メディア: ${u?.source || ""}

調査項目:
- 選手のフルネーム・所属クラブ・年齢・背番号
- スコア・日付・会場の正確な数字
- 監督や選手のコメント（原文に近い形）
- 関連する過去の出来事や文脈

ファクトチェック:
- 複数ソース間の矛盾を特定
- 固有名詞・数字の正確性を検証
- 不確かな情報を除外

JSON形式:
{
  "facts": [{"fact": "確認済みの事実", "sources": ["ソース名1", "ソース名2"]}],
  "quotes": [{"speaker": "発言者名", "quote": "発言内容", "source": "ソース名"}],
  "context": "ニュースの背景・文脈（200文字程度）",
  "playerDetails": [{"name": "選手名", "club": "所属クラブ", "age": 25, "position": "ポジション"}],
  "numbers": [{"label": "説明", "value": "数字"}],
  "doNotInclude": ["不確かまたは矛盾のある情報"]
}`,
        { webSearch: true, model: "claude-sonnet-4-20250514" }
      );

      const researchData = await researchRes.json();
      const researchText = extractText(researchData);
      const research = parseJsonSafe(researchText, {
        facts: [], quotes: [], context: item.summary, playerDetails: [], numbers: [], doNotInclude: [],
      });

      updateStep(1, "深いリサーチ", `完了 — ${research.facts?.length || 0}件の事実、${research.quotes?.length || 0}件のコメント収集`, true);

      // ── STEP 2: 固有名詞・数字の最終検証 ──
      updateStep(2, "ファクトチェック", "固有名詞・数字をウェブ検索で再確認中...");

      const checkRes = await callClaude(
        `スポーツニュースのファクトチェッカー。固有名詞と数字を検証。JSON形式のみ。コードブロック不要。`,
        `固有名詞と数字の最終確認:

元ニュース: ${item.title}
選手情報: ${JSON.stringify(research.playerDetails || [])}
数字情報: ${JSON.stringify(research.numbers || [])}
除外候補: ${JSON.stringify(research.doNotInclude || [])}

ウェブ検索で確認:
- 選手名フルネーム（漢字）
- 所属クラブ正式名称
- 年齢・ポジション
- スコア・日付

JSON: {"corrections": [{"item": "対象", "before": "修正前", "after": "修正後"}], "finalDoNotInclude": ["除外情報"]}`,
        { webSearch: true }
      );

      const checkData = await checkRes.json();
      const checkText = extractText(checkData);
      const factCheck = parseJsonSafe(checkText, { corrections: [], finalDoNotInclude: [] });

      const allDoNotInclude = [...(research.doNotInclude || []), ...(factCheck.finalDoNotInclude || [])];

      updateStep(2, "ファクトチェック", `完了 — ${factCheck.corrections?.length || 0}件修正、${allDoNotInclude.length}件除外`, true);

      // ── STEP 3: 執筆（ストリーミング） ──
      updateStep(3, "執筆", "リサーチ結果をもとに記事を執筆中...");

      const writeRes = await callClaude(
        `あなたは「サムライフットボール」のベテランライターだ。10年以上サッカーを取材してきた。
読者は日本サッカーに詳しいファン層。深みのある記事を書け。

## 絶対に守るルール

### 文体
- だ・である調で統一
- 「〜となっています」「〜とのことです」「〜が期待されます」は禁止。AI臭い
- 「まず」「次に」「そして」「また」「さらに」で文を始めるのは各1回まで。繰り返すな
- 同じ構文・言い回しを連続させない。「〜した。〜した。〜した。」は禁止
- 体言止め、倒置法、問いかけ、比喩を織り交ぜろ
- 1文は40文字以内を意識。長文は区切れ

### 構成
1. 冒頭リード文（見出しなし、2〜3文で引き込む）
2. ## 見出し1 — 核心の事実
3. highlight-box（POINT 1〜2）
4. ## 見出し2 — 分析・背景・展望
5. ## 見出し3 — 今後の注目点（任意）
6. summary-card — 締め

### HTMLカスタム要素（必ず使え）

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">タイトル</span>
<p class="point-body">説明。<strong>固有名詞</strong>は太字。</p>
</div>

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>まとめ。</p>
</div>

### 事実の扱い
- 提供されたリサーチ結果のみ使用
- 「除外すべき情報」は絶対に書くな
- 選手名は初出時フルネーム＋（所属クラブ）
- コメント引用は「」で囲み発言者を明記

### 分量
- 1500〜2500文字
- 出典は末尾に書かない`,
        `以下の素材で記事を書け。記事本文のみ出力。

■ テーマ: ${item.title}

■ 事実:
${JSON.stringify(research.facts || [])}

■ コメント:
${JSON.stringify(research.quotes || [])}

■ 背景:
${research.context || item.summary}

■ 選手情報:
${JSON.stringify(research.playerDetails || [])}

■ 数字:
${JSON.stringify(research.numbers || [])}

■ 修正:
${JSON.stringify(factCheck.corrections || [])}

■ 書くな（不確か）:
${JSON.stringify(allDoNotInclude)}`,
        { stream: true, model: "claude-sonnet-4-20250514", maxTokens: 6000 }
      );

      await readStream(writeRes, (full) => {
        setArticles((p) => ({ ...p, [idx]: full }));
      });

      updateStep(3, "執筆", "完了", true);

    } catch (err) {
      const msg = err instanceof Error ? err.message : "生成失敗";
      setArticles((p) => ({
        ...p,
        [idx]: p[idx] ? p[idx] + `\n\n---\n\n**⚠ 生成が中断されました:** ${msg}` : `エラー: ${msg}`,
      }));
    } finally {
      setGenIdx(null);
    }
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  /* ─── Step indicator ─── */
  const STEPS = [
    { step: 1, label: "深いリサーチ" },
    { step: 2, label: "ファクトチェック" },
    { step: 3, label: "執筆" },
  ];

  /* ── Render ── */
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <div className="border-b border-white/10 bg-[#0a1628]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-white/50 hover:text-white text-sm">← トップ</Link>
          <div className="w-px h-5 bg-white/20" />
          <h1 className="text-lg font-bold text-white">News Research</h1>
          <span className="text-xs text-amber-400 border border-amber-400/30 rounded px-2 py-0.5">ADMIN</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Start */}
        {news.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📡</div>
            <h2 className="text-xl font-bold text-white mb-2">サッカーニュース調査</h2>
            <p className="text-sm text-white/50 mb-6">直近48時間のトレンドニュース TOP 3 をAIが厳選します</p>
            <button onClick={fetchNews} className="px-8 py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] text-white font-bold transition-colors">
              ニュース収集開始
            </button>
            {error && <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 max-w-md mx-auto">{error}</p>}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#E8192C] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-sm">トレンドニュースを厳選中...</p>
          </div>
        )}

        {/* Results */}
        {news.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">トレンド TOP {news.length}</h2>
              <button onClick={fetchNews} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm border border-white/20 transition-colors">再取得</button>
            </div>

            {news.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black bg-gradient-to-br from-amber-400 to-amber-600 text-white">
                      {item.rank}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Time */}
                      {item.hoursAgo != null && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.hoursAgo < 6 ? "bg-red-500/20 text-red-400" : item.hoursAgo < 24 ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-white/40"}`}>
                          {timeLabel(item.hoursAgo)}
                        </span>
                      )}

                      <h3 className="text-base font-bold text-white mt-1.5 mb-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-3">{item.summary}</p>

                      {/* Source URLs */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.urls.map((u, ui) => (
                          <a key={ui} href={u.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-blue-400 hover:bg-white/10 transition-colors">
                            <span className="text-white/30">{SOURCE_ICONS[u.source] || "🔗"}</span>
                            {u.source || "リンク"}
                          </a>
                        ))}
                      </div>

                      <button onClick={() => genArticle(item, i)} disabled={genIdx !== null}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          articles[i] && genIdx !== i ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : genIdx === i ? "bg-white/5 text-white/30 cursor-wait"
                          : "bg-[#E8192C] hover:bg-[#c0141f] text-white"
                        }`}>
                        {genIdx === i ? "生成中..." : articles[i] ? "生成済み ✓" : "記事にする"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step progress during generation */}
                {genIdx === i && genSteps.length > 0 && (
                  <div className="border-t border-white/10 bg-white/[0.02] px-5 py-4">
                    <div className="space-y-2">
                      {STEPS.map((s) => {
                        const active = genSteps.find((st) => st.step === s.step);
                        const isDone = active?.done;
                        return (
                          <div key={s.step} className="flex items-start gap-3">
                            <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : active ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse"
                              : "bg-white/5 text-white/20 border border-white/10"
                            }`}>
                              {isDone ? "✓" : s.step}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-bold ${active ? "text-white" : "text-white/30"}`}>
                                STEP {s.step}: {s.label}
                              </p>
                              {active && <p className="text-[11px] text-white/50 mt-0.5">{active.message}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Article */}
                {articles[i] && (
                  <div className="border-t border-white/10 bg-white/[0.02] p-5">
                    {/* Completed steps summary */}
                    {genIdx !== i && genSteps.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {genSteps.filter((s) => s.done).map((s) => (
                          <span key={s.step} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">
                            STEP {s.step}: {s.label} ✓
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-emerald-400">生成された記事</h4>
                      <div className="flex gap-2">
                        <button onClick={() => copy(articles[i], i)}
                          className={`px-3 py-1 rounded-lg text-xs transition-colors ${copied === i ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 hover:bg-white/15 text-white/60"}`}>
                          {copied === i ? "コピー済み!" : "コピー"}
                        </button>
                        <button onClick={() => genArticle(item, i)} disabled={genIdx !== null}
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white/60 text-xs transition-colors">再生成</button>
                      </div>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-blue-400 prose-strong:text-white">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{articles[i]}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
