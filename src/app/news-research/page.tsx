"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";

/* ─── Types ─── */
type SourceUrl = { source: string; url: string };
type RawItem = { title: string; urls: SourceUrl[]; summary: string; hoursAgo?: number };
type NewsItem = RawItem & { rank: number };
type NewsData = { news: NewsItem[]; searchedAt: string; totalFound: number };
type ArticleMetadata = { category: string; tags: string[]; slug: string; excerpt: string; articleTitle: string };
type ArticleData = { content: string; metadata: ArticleMetadata | null };
type SourceStatus = "waiting" | "searching" | "done" | "failed" | "ranking";

/* ─── Search batches ─── */
const BATCHES = [
  {
    id: "1",
    sources: ["ゲキサカ", "サッカーキング", "Yahoo!ニュース"],
    query: `以下を検索し、直近48時間以内の日本サッカーニュースを集めてください:
1. "日本代表 サッカー 最新ニュース"
2. "Jリーグ 速報 結果"`,
  },
  {
    id: "2",
    sources: ["Goal.com日本版", "超WORLDサッカー", "Football LAB"],
    query: `以下を検索し、直近48時間以内の日本サッカーニュースを集めてください:
1. "海外サッカー 日本人選手 最新"
2. "サッカー 移籍情報 2026"`,
  },
  {
    id: "3",
    sources: ["Jリーグ公式", "日刊スポーツ", "スポーツ報知", "footballista"],
    query: `以下を検索し、直近48時間以内の日本サッカーニュースを集めてください:
1. "W杯2026 日本 最新情報"
2. "サッカー 速報 今日"`,
  },
];

const ALL_SOURCES = BATCHES.flatMap((b) => b.sources);

const SOURCE_ICONS: Record<string, string> = {
  "ゲキサカ": "⚽", "サッカーキング": "👑", "Yahoo!ニュース": "📰",
  "Goal.com日本版": "🥅", "超WORLDサッカー": "🌍", "Football LAB": "📊",
  "Jリーグ公式": "🏆", "日刊スポーツ": "📄", "スポーツ報知": "📢",
  "footballista": "📖",
};

const CATEGORY_COLORS: Record<string, string> = {
  "日本代表": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Jリーグ": "bg-green-500/20 text-green-400 border-green-500/30",
  "W杯": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "海外組": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "コラム": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "選手紹介": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
};

/* ─── Direct Anthropic API call (browser → API, no server) ─── */
async function callClaude(systemPrompt: string, userPrompt: string, webSearch = false) {
  if (!API_KEY) throw new Error("NEXT_PUBLIC_ANTHROPIC_API_KEY が設定されていません");
  const body: Record<string, unknown> = {
    model: "claude-haiku-4-5-20251001",
    max_tokens: 3000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  };
  if (webSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }];
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
    const err = await res.text();
    throw new Error(`API ${res.status}: ${err.slice(0, 200)}`);
  }

  return res.json();
}

/* ─── Parse Claude response ─── */
function parseNewsResponse(data: Record<string, unknown>): { items: RawItem[]; searchResults: { url: string; title: string }[] } {
  const content = data.content as Array<Record<string, unknown>>;
  const searchResults: { url: string; title: string }[] = [];
  let text = "";

  for (const block of content) {
    if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
      for (const r of block.content as Array<Record<string, unknown>>) {
        if (r.type === "web_search_result" && r.url) {
          searchResults.push({ url: String(r.url), title: String(r.title || "") });
        }
      }
    }
    if (block.type === "text") text += String(block.text || "");
  }

  if (!text.trim()) {
    // Fallback: build from search results
    return {
      items: searchResults.filter((r) => identifySource(r.url)).map((r) => ({
        title: r.title, urls: [{ source: identifySource(r.url) || "その他", url: r.url }], summary: "", hoursAgo: undefined,
      })),
      searchResults,
    };
  }

  let jsonStr = text.trim();
  const cbm = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cbm) jsonStr = cbm[1].trim();
  if (!jsonStr.startsWith("[")) {
    const m = jsonStr.match(/(\[[\s\S]*\])/);
    if (m) jsonStr = m[1];
  }
  if (!jsonStr.startsWith("[") && jsonStr.startsWith("{")) jsonStr = `[${jsonStr}]`;

  try {
    const raw = JSON.parse(jsonStr);
    if (!Array.isArray(raw)) throw new Error("not array");
    const items: RawItem[] = raw
      .map((item: Record<string, unknown>) => ({
        title: String(item.title || ""),
        urls: Array.isArray(item.urls)
          ? (item.urls as SourceUrl[]).filter((u) => u?.url?.startsWith("http")).map((u) => ({ source: u.source || identifySource(u.url) || "その他", url: u.url }))
          : item.url ? [{ source: String(item.source || identifySource(String(item.url)) || "その他"), url: String(item.url) }] : [],
        summary: String(item.summary || ""),
        hoursAgo: typeof item.hoursAgo === "number" ? item.hoursAgo : undefined,
      }))
      .filter((item: RawItem) => !item.hoursAgo || item.hoursAgo <= 48);
    return { items, searchResults };
  } catch {
    return {
      items: searchResults.filter((r) => identifySource(r.url)).map((r) => ({
        title: r.title, urls: [{ source: identifySource(r.url) || "その他", url: r.url }], summary: "", hoursAgo: undefined,
      })),
      searchResults,
    };
  }
}

function identifySource(url: string): string | null {
  const map: [string, string][] = [
    ["gekisaka", "ゲキサカ"], ["soccerking", "サッカーキング"],
    ["news.yahoo.co.jp", "Yahoo!ニュース"], ["goal.com", "Goal.com"],
    ["ultra-soccer", "超WORLDサッカー"], ["football-lab", "Football LAB"],
    ["jleague.jp", "Jリーグ公式"], ["nikkansports.com", "日刊スポーツ"],
    ["hochi.news", "スポーツ報知"], ["footballista", "footballista"],
    ["sponichi", "スポニチ"], ["nhk.or.jp", "NHK"],
    ["sportsnavi", "スポーツナビ"], ["number.bunshun", "Number"],
  ];
  for (const [d, n] of map) { if (url.includes(d)) return n; }
  return null;
}

function deduplicateItems(items: RawItem[]): RawItem[] {
  const result: RawItem[] = [];
  for (const item of items) {
    if (!item.title) continue;
    const words = item.title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
    const dup = result.find((ex) => {
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
      result.push({ ...item, urls: [...item.urls] });
    }
  }
  return result;
}

const hoursAgoLabel = (h?: number) => {
  if (h == null) return null;
  if (h < 1) return "1時間以内";
  if (h < 24) return `約${Math.round(h)}時間前`;
  return `約${Math.round(h / 24)}日前`;
};

/* ═══════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════ */
export default function NewsResearchPage() {
  const [loading, setLoading] = useState(false);
  const [sourceStatuses, setSourceStatuses] = useState<Record<string, SourceStatus>>({});
  const [foundCount, setFoundCount] = useState(0);
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const [articles, setArticles] = useState<Record<number, ArticleData>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  /* ─── Fetch news (browser → Anthropic API directly) ─── */
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    setNewsData(null);
    setArticles({});
    setFoundCount(0);

    const initStatus: Record<string, SourceStatus> = {};
    for (const s of ALL_SOURCES) initStatus[s] = "waiting";
    setSourceStatuses(initStatus);

    const allItems: RawItem[] = [];

    try {
      for (const batch of BATCHES) {
        // Mark searching
        for (const s of batch.sources) setSourceStatuses((p) => ({ ...p, [s]: "searching" }));

        try {
          const data = await callClaude(
            `あなたはサッカーニュース調査員です。日本語で回答。
ルール:
- 純粋なJSON配列のみ出力。前置き・説明・コードブロック不要。
- URLは検索結果で見つかった実際のURLのみ使用。推測禁止。
- 直近48時間以内の記事のみ。hoursAgo>48は含めない。
- 5件以上出力。`,
            `${batch.query}

検索結果から見つかった記事をJSON配列で5〜8件:
[{"title":"記事タイトル","urls":[{"source":"メディア名","url":"実際のURL"}],"summary":"150文字の概要","hoursAgo":数値}]`,
            true
          );

          const { items } = parseNewsResponse(data);
          allItems.push(...items);
          setFoundCount(allItems.length);
          for (const s of batch.sources) setSourceStatuses((p) => ({ ...p, [s]: "done" }));
        } catch (err) {
          console.error(`Batch ${batch.id} failed:`, err);
          for (const s of batch.sources) setSourceStatuses((p) => ({ ...p, [s]: "failed" }));
        }
      }

      // Rank
      setSourceStatuses((p) => {
        const n = { ...p };
        for (const k of Object.keys(n)) if (n[k] === "done") n[k] = "ranking";
        return n;
      });

      const merged = deduplicateItems(allItems);
      const sorted = merged.sort((a, b) => (a.hoursAgo ?? 24) - (b.hoursAgo ?? 24));
      const ranked = sorted.slice(0, 10).map((item, i) => ({ rank: i + 1, ...item }));

      if (ranked.length === 0) throw new Error("ニュースを取得できませんでした。再試行してください。");

      setNewsData({ news: ranked, searchedAt: new Date().toISOString(), totalFound: allItems.length });
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  /* ─── Generate article (browser → Anthropic API directly) ─── */
  const generateArticle = async (item: NewsItem, index: number) => {
    setGeneratingIndex(index);
    setArticles((p) => ({ ...p, [index]: { content: "", metadata: null } }));
    const primaryUrl = item.urls?.[0];

    try {
      // Step 1: metadata
      const metaData = await callClaude(
        `サッカーニュース記事のメタデータ分類AI。JSON形式のみ出力。コードブロック不要。`,
        `以下のニュースのメタデータを生成:
タイトル: ${item.title}
概要: ${item.summary}

JSON形式:
{"category":"日本代表|Jリーグ|W杯|海外組|コラム|選手紹介","tags":["タグ1","タグ2"],"slug":"english-slug","excerpt":"50〜80文字の要約","articleTitle":"【】付きの記事タイトル"}`
      );

      let metaText = "";
      for (const block of (metaData.content as Array<Record<string, unknown>>)) {
        if (block.type === "text") metaText += String(block.text || "");
      }
      let metadata: ArticleMetadata | null = null;
      try {
        let mj = metaText.trim();
        const cbm = mj.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (cbm) mj = cbm[1].trim();
        if (!mj.startsWith("{")) { const m = mj.match(/(\{[\s\S]*\})/); if (m) mj = m[1]; }
        metadata = JSON.parse(mj);
      } catch { /* ignore */ }

      setArticles((p) => ({ ...p, [index]: { ...p[index], metadata } }));

      // Step 2: article (streaming)
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          stream: true,
          system: `「サムライフットボール」のライター。日本語で執筆。
- H2見出し2〜3個、1200〜2000文字
- ファン目線の分析、だ・である調
- Markdown + HTML要素（highlight-box, summary-card）使用
- 出典は末尾に記載しない`,
          messages: [{ role: "user", content: `以下のニュースの記事を書いてください:
タイトル: ${metadata?.articleTitle || item.title}
出典: ${primaryUrl?.source || ""}
URL: ${primaryUrl?.url || ""}
概要: ${item.summary}

記事本文のみ出力。` }],
        }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("ストリーム取得失敗");

      const decoder = new TextDecoder();
      let buf = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          try {
            const ev = JSON.parse(line.slice(6));
            if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") {
              fullText += ev.delta.text;
              setArticles((p) => ({ ...p, [index]: { ...p[index], content: fullText } }));
            }
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "記事生成に失敗";
      setArticles((p) => {
        const ex = p[index];
        if (ex?.content && !ex.content.startsWith("エラー:")) {
          return { ...p, [index]: { ...ex, content: ex.content + `\n\n---\n**⚠ 中断:** ${msg}` } };
        }
        return { ...p, [index]: { content: `エラー: ${msg}`, metadata: ex?.metadata || null } };
      });
    } finally {
      setGeneratingIndex(null);
    }
  };

  const copyArticle = (text: string, idx: number) => {
    navigator.clipboard.writeText(text); setCopiedIndex(idx); setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAsArticleData = (idx: number, item: NewsItem) => {
    const a = articles[idx]; if (!a?.metadata) return;
    const m = a.metadata;
    const today = new Date().toISOString().split("T")[0];
    const escaped = a.content.replace(/`/g, "\\`").replace(/\$/g, "\\$");
    const code = `  {
    id: "NEW",
    slug: "${m.slug}",
    title: "${m.articleTitle.replace(/"/g, '\\"')}",
    excerpt: "${m.excerpt.replace(/"/g, '\\"')}",
    category: "${m.category}",
    tags: [${m.tags.map((t) => `"${t}"`).join(", ")}],
    publishedAt: "${today}",
    isPopular: false,
    content: \`${escaped}\`,
  },`;
    navigator.clipboard.writeText(code); setCopiedIndex(idx * 1000); setTimeout(() => setCopiedIndex(null), 2000);
  };

  /* ═══ Render ═══ */
  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a1628]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">← トップ</Link>
            <div className="w-px h-5 bg-white/20" />
            <h1 className="text-lg font-bold text-white">News Research</h1>
            <span className="text-xs text-amber-400 border border-amber-400/30 rounded px-2 py-0.5">ADMIN</span>
          </div>
          {newsData && <p className="text-xs text-white/40">{new Date(newsData.searchedAt).toLocaleString("ja-JP")}</p>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Start */}
        {!newsData && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl">📡</div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">サッカーニュース調査</h2>
                <p className="text-sm text-white/50 max-w-md">ブラウザから直接AIに接続し、10メディアのニュースを収集します</p>
              </div>
              <button onClick={fetchNews} className="px-8 py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] text-white font-bold transition-colors">ニュース収集開始</button>
              {error && <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400 max-w-md">{error}</div>}
            </div>
          </div>
        )}

        {/* Progress */}
        {loading && (
          <div className="py-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 border-4 border-white/10 border-t-[#E8192C] rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-lg font-bold text-white mb-1">ニュースを収集中</h2>
              <p className="text-sm text-white/40">各メディアを順番にチェックしています...</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {ALL_SOURCES.map((src) => {
                const st = sourceStatuses[src] || "waiting";
                return (
                  <div key={src} className={`relative rounded-xl border p-3 text-center transition-all duration-500 ${
                    st === "searching" ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    : st === "done" ? "bg-emerald-500/10 border-emerald-500/30"
                    : st === "ranking" ? "bg-amber-500/10 border-amber-500/30"
                    : st === "failed" ? "bg-red-500/10 border-red-500/30"
                    : "bg-white/[0.02] border-white/10"
                  }`}>
                    {st === "searching" && <div className="absolute inset-0 rounded-xl border-2 border-blue-400/50 animate-pulse" />}
                    <div className="text-xl mb-1">{SOURCE_ICONS[src] || "📰"}</div>
                    <p className={`text-[11px] font-bold leading-tight ${st === "searching" ? "text-blue-400" : st === "done" ? "text-emerald-400" : st === "ranking" ? "text-amber-400" : st === "failed" ? "text-red-400" : "text-white/30"}`}>{src}</p>
                    <p className="text-[10px] mt-1 h-4">
                      {st === "waiting" && <span className="text-white/20">待機中</span>}
                      {st === "searching" && <span className="text-blue-400 animate-pulse">検索中...</span>}
                      {st === "done" && <span className="text-emerald-400">✓ 完了</span>}
                      {st === "ranking" && <span className="text-amber-400">集計中</span>}
                      {st === "failed" && <span className="text-red-400">× 失敗</span>}
                    </p>
                  </div>
                );
              })}
            </div>
            {foundCount > 0 && <p className="text-center text-sm text-white/40">現在 <span className="text-white font-bold">{foundCount}件</span> のニュースを発見</p>}
          </div>
        )}

        {/* Results */}
        {newsData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">トレンドニュース TOP {newsData.news.length}</h2>
                <p className="text-xs text-white/30 mt-1">{newsData.totalFound}件から厳選（重複統合済み）</p>
              </div>
              <button onClick={fetchNews} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/20 transition-colors">再取得</button>
            </div>

            {newsData.news.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black ${item.rank <= 3 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-white/10 text-white/60"}`}>{item.rank}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {item.hoursAgo != null && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.hoursAgo < 6 ? "bg-red-500/20 text-red-400" : item.hoursAgo < 24 ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-white/40"}`}>{hoursAgoLabel(item.hoursAgo)}</span>
                        )}
                        <span className="text-[10px] text-white/20">{item.urls.length}メディア</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-3">{item.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.urls.map((u, ui) => (
                          <a key={ui} href={u.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-blue-400 hover:bg-white/10 hover:text-blue-300 transition-colors">
                            <span className="text-white/30">{SOURCE_ICONS[u.source] || "🔗"}</span>{u.source}
                          </a>
                        ))}
                      </div>
                      <button onClick={() => generateArticle(item, i)} disabled={generatingIndex !== null} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${articles[i]?.content && generatingIndex !== i ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : generatingIndex === i ? "bg-white/5 text-white/30 cursor-wait" : "bg-[#E8192C] hover:bg-[#c0141f] text-white"}`}>
                        {generatingIndex === i ? "生成中..." : articles[i]?.content ? "生成済み ✓" : "記事にする"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Article */}
                {articles[i]?.content && (
                  <div className="border-t border-white/10 bg-white/[0.02]">
                    <div className="p-5">
                      {articles[i].metadata && (
                        <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${CATEGORY_COLORS[articles[i].metadata!.category] || "bg-white/10 text-white/60 border-white/20"}`}>{articles[i].metadata!.category}</span>
                            <span className="text-[10px] text-white/30">slug: {articles[i].metadata!.slug}</span>
                          </div>
                          <p className="text-sm font-bold text-white mb-1">{articles[i].metadata!.articleTitle}</p>
                          <p className="text-xs text-white/50 mb-3">{articles[i].metadata!.excerpt}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {articles[i].metadata!.tags.map((tag) => (
                              <span key={tag} className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2"><span className="w-1.5 h-4 bg-emerald-400 rounded-full" />生成された記事</h4>
                        <div className="flex gap-2">
                          {articles[i].metadata && (
                            <button onClick={() => copyAsArticleData(i, item)} className={`px-3 py-1 rounded-lg text-xs transition-colors ${copiedIndex === i * 1000 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"}`}>{copiedIndex === i * 1000 ? "コピー済み!" : "articles.ts用コピー"}</button>
                          )}
                          <button onClick={() => copyArticle(articles[i].content, i)} className={`px-3 py-1 rounded-lg text-xs transition-colors ${copiedIndex === i ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 hover:bg-white/15 text-white/60"}`}>{copiedIndex === i ? "コピー済み!" : "本文コピー"}</button>
                          <button onClick={() => generateArticle(item, i)} disabled={generatingIndex !== null} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white/60 text-xs transition-colors">再生成</button>
                        </div>
                      </div>
                      <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-blue-400 prose-strong:text-white">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{articles[i].content}</ReactMarkdown>
                      </div>
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
