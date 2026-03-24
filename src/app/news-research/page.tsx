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

/* ─── Helpers ─── */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ─── API helper with auto-retry on rate limit ─── */
async function callClaude(
  system: string,
  user: string,
  opts: { webSearch?: boolean; stream?: boolean; model?: string; maxTokens?: number; onRetry?: (sec: number) => void } = {},
): Promise<Response> {
  if (!API_KEY) throw new Error("APIキーが未設定です");
  const body: Record<string, unknown> = {
    model: opts.model || "claude-haiku-4-5-20251001",
    max_tokens: opts.maxTokens || 4096,
    stream: opts.stream || false,
    system,
    messages: [{ role: "user", content: user }],
  };
  if (opts.webSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }];
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      const delaySec = 60;
      opts.onRetry?.(delaySec);
      await wait(delaySec * 1000);
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

    if (res.status === 429) {
      console.warn(`Rate limited (attempt ${attempt + 1}/3), will retry in 60s`);
      continue;
    }
    if (!res.ok) {
      const t = await res.text();
      if (t.includes("rate_limit") && attempt < 2) {
        console.warn(`Rate limit in body (attempt ${attempt + 1}/3), will retry in 60s`);
        continue;
      }
      throw new Error(`API ${res.status}: ${t.slice(0, 200)}`);
    }
    return res;
  }
  throw new Error("レート制限で3回失敗しました。しばらく待ってから再試行してください。");
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

/* ─── Parse news JSON from Claude (no fallback) ─── */
function parseNews(data: Record<string, unknown>): NewsItem[] {
  const content = data.content as Array<Record<string, unknown>>;
  let text = "";
  for (const b of content) {
    if (b.type === "text") text += String(b.text || "");
  }

  if (!text.trim()) throw new Error("AIからテキスト応答がありませんでした");

  // Extract JSON from response
  let json = text.trim();
  const cb = json.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cb) json = cb[1].trim();
  if (!json.startsWith("[")) {
    const m = json.match(/(\[[\s\S]*\])/);
    if (m) json = m[1];
  }
  if (!json.startsWith("[") && json.startsWith("{")) json = `[${json}]`;

  const raw = JSON.parse(json) as Array<Record<string, unknown>>;
  if (!Array.isArray(raw)) throw new Error("JSONが配列ではありません");

  return raw
    .map((r, i) => ({
      rank: i + 1,
      title: String(r.title || ""),
      urls: Array.isArray(r.urls)
        ? (r.urls as SourceUrl[]).filter((u) => u?.url?.startsWith("http"))
        : r.url ? [{ source: String(r.source || ""), url: String(r.url) }] : [],
      summary: String(r.summary || ""),
      hoursAgo: typeof r.hoursAgo === "number" ? r.hoursAgo : undefined,
    }))
    .filter((it) => it.title && it.urls.length > 0 && (!it.hoursAgo || it.hoursAgo <= 48));
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
  const [loadMsg, setLoadMsg] = useState("");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genIdx, setGenIdx] = useState<number | null>(null);
  const [genSteps, setGenSteps] = useState<StepInfo[]>([]);
  const [articles, setArticles] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState<number | null>(null);

  const QUERIES = [
    { label: "サッカーニュース", q: "サッカー ニュース" },
    { label: "日本代表", q: "サッカー日本代表 ニュース" },
    { label: "Jリーグ", q: "Jリーグ ニュース" },
    { label: "ワールドカップ", q: "ワールドカップ サッカー ニュース" },
  ];

  const SYS_SEARCH = `必ずJSON形式のみで返答してください。前置き・説明文・コードブロック記号は一切不要です。

あなたはサッカーニュースの調査員です。ウェブ検索の結果から「個別のニュース記事」を抽出してください。

重要な注意:
- サイトのトップページや記事一覧ページは除外すること（例: 「ゲキサカ - サッカー速報」はNG）
- 個別の記事ページのみを対象にすること（例: 「三笘薫がゴール、ブライトンが3-1で勝利」はOK）
- titleはニュース記事の見出しをそのまま使うこと（サイト名ではない）
- summaryは記事の内容を200〜300文字で要約すること（省略禁止）
- urlは検索結果に表示された実際の記事URLのみ使用（推測禁止）
- publishedAtは記事の公開日時をISO 8601形式で記載
- 直近48時間以内の記事のみ対象`;

  /* ── Fetch news (4 queries → merge → top 10) ── */
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    setNews([]);
    setArticles({});
    setLoadMsg("検索準備中...");

    type RawItem = { title: string; urls: SourceUrl[]; summary: string; hoursAgo?: number };
    const allItems: RawItem[] = [];

    try {
      for (let i = 0; i < QUERIES.length; i++) {
        const { label, q } = QUERIES[i];
        setLoadMsg(`(${i + 1}/${QUERIES.length}) ${label}を検索中...`);

        if (i > 0) await wait(5000); // レート制限対策

        try {
          const res = await callClaude(
            SYS_SEARCH,
            `「${q}」でウェブ検索してください。

検索結果に含まれる「個別のニュース記事」を見つけて、以下のJSON配列で3〜5件出力してください。
サイトのトップページや一覧ページは含めないでください。

[
  {
    "title": "記事の見出し（サイト名ではない）",
    "url": "記事の実際のURL",
    "source": "メディア名（ゲキサカ、Yahoo!ニュース等）",
    "summary": "記事内容の200〜300文字の要約",
    "publishedAt": "2026-03-24T10:00:00Z",
    "hoursAgo": 3
  }
]`,
            { webSearch: true }
          );
          const data = await res.json();
          const items = parseNews(data);
          allItems.push(...items.map((it) => ({ title: it.title, urls: it.urls, summary: it.summary, hoursAgo: it.hoursAgo })));
        } catch (err) {
          console.warn(`Query "${label}" failed:`, err);
        }
      }

      setLoadMsg("結果を整理中...");

      // Deduplicate: merge URLs of similar titles
      const merged: RawItem[] = [];
      for (const item of allItems) {
        if (!item.title) continue;
        const words = item.title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
        const dup = merged.find((ex) => {
          const ew = ex.title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
          let mc = 0;
          for (const w of words) { if (ew.some((e) => e.includes(w) || w.includes(e))) mc++; }
          return mc >= Math.min(3, Math.floor(words.length * 0.4));
        });
        if (dup) {
          for (const u of item.urls) { if (!dup.urls.some((eu) => eu.url === u.url)) dup.urls.push(u); }
          if (!dup.summary && item.summary) dup.summary = item.summary;
          if (item.hoursAgo != null && (dup.hoursAgo == null || item.hoursAgo < dup.hoursAgo)) dup.hoursAgo = item.hoursAgo;
        } else {
          merged.push({ ...item, urls: [...item.urls] });
        }
      }

      // Sort: more URLs first, then recency
      const sorted = merged.sort((a, b) => {
        const urlDiff = b.urls.length - a.urls.length;
        if (urlDiff !== 0) return urlDiff;
        return (a.hoursAgo ?? 24) - (b.hoursAgo ?? 24);
      });

      const ranked = sorted.slice(0, 10).map((it, i) => ({
        rank: i + 1, title: it.title, urls: it.urls, summary: it.summary, hoursAgo: it.hoursAgo,
      }));

      if (ranked.length === 0) throw new Error("ニュースが取得できませんでした。再試行してください。");
      setNews(ranked);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
      setLoadMsg("");
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
      // ── STEP 1: リサーチ ──
      updateStep(1, "リサーチ", "関連情報を収集中...");
      await wait(4000); // Rate limit対策

      const retryMsg = (sec: number) => updateStep(1, "リサーチ", `レート制限 — ${sec}秒後にリトライ...`);

      const researchRes = await callClaude(
        `スポーツニュース調査員。JSON形式のみ出力。コードブロック不要。`,
        `ニュース「${item.title}」をウェブ検索で調査。
概要: ${item.summary}

JSON: {"facts":["事実1","事実2"],"quotes":[{"speaker":"名前","quote":"発言"}],"context":"背景200文字","playerDetails":[{"name":"名","club":"クラブ"}]}`,
        { webSearch: true, onRetry: retryMsg }
      );

      const researchData = await researchRes.json();
      const researchText = extractText(researchData);
      const research = parseJsonSafe(researchText, {
        facts: [], quotes: [], context: item.summary, playerDetails: [],
      });

      updateStep(1, "リサーチ", `完了 — ${research.facts?.length || 0}件の事実収集`, true);

      // ── STEP 2: 執筆（ストリーミング） ──
      updateStep(2, "執筆", "記事を執筆中...");
      await wait(4000); // Rate limit対策

      const retryMsgWrite = (sec: number) => updateStep(2, "執筆", `レート制限 — ${sec}秒後にリトライ...`);

      const writeRes = await callClaude(
        `サムライフットボールのライター。だ・である調。H2見出し2〜3個。1500〜2000文字。Markdown出力。
highlight-box（POINT）とsummary-card（SUMMARY）のHTML要素を使え。
選手名は初出時フルネーム＋（所属クラブ）。出典は末尾に書かない。`,
        `以下の素材で記事を書け。本文のみ出力。

テーマ: ${item.title}
事実: ${JSON.stringify((research.facts || []).slice(0, 8))}
コメント: ${JSON.stringify((research.quotes || []).slice(0, 3))}
背景: ${research.context || item.summary}
選手: ${JSON.stringify((research.playerDetails || []).slice(0, 5))}`,
        { stream: true, onRetry: retryMsgWrite }
      );

      await readStream(writeRes, (full) => {
        setArticles((p) => ({ ...p, [idx]: full }));
      });

      updateStep(2, "執筆", "完了", true);

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
    { step: 1, label: "リサーチ" },
    { step: 2, label: "執筆" },
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
            <p className="text-sm text-white/50 mb-6">直近48時間のトレンドニュース TOP 10 をAIが収集します</p>
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
            <p className="text-white/60 text-sm">{loadMsg || "ニュースを収集中..."}</p>
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
