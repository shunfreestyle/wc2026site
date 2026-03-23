"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type SourceUrl = { source: string; url: string };

type NewsItem = {
  rank: number;
  title: string;
  urls: SourceUrl[];
  summary: string;
  hoursAgo?: number;
  // compat with article generator
  url?: string;
  source?: string;
};

type NewsData = {
  news: NewsItem[];
  searchedAt: string;
  totalFound?: number;
};

type ArticleMetadata = {
  category: string;
  tags: string[];
  slug: string;
  excerpt: string;
  articleTitle: string;
};

type StepInfo = { step: number; label: string; message: string };

type ArticleData = {
  content: string;
  metadata: ArticleMetadata | null;
  steps: StepInfo[];
};

type SourceStatus = "waiting" | "searching" | "done" | "failed" | "ranking";

const CATEGORY_COLORS: Record<string, string> = {
  "日本代表": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Jリーグ": "bg-green-500/20 text-green-400 border-green-500/30",
  "W杯": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "海外組": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "コラム": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "選手紹介": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
};

const SOURCE_ICONS: Record<string, string> = {
  "ゲキサカ": "⚽", "サッカーキング": "👑", "Yahoo!ニュース": "📰",
  "Goal.com日本版": "🥅", "超WORLDサッカー": "🌍", "Football LAB": "📊",
  "Jリーグ公式": "🏆", "日刊スポーツ": "📄", "スポーツ報知": "📢",
  "footballista": "📖",
};

export default function NewsResearchPage() {
  const [loading, setLoading] = useState(false);
  const [sourceStatuses, setSourceStatuses] = useState<Record<string, SourceStatus>>({});
  const [sourceList, setSourceList] = useState<string[]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const [articles, setArticles] = useState<Record<number, ArticleData>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    setNewsData(null);
    setArticles({});
    setSourceStatuses({});
    setSourceList([]);
    setFoundCount(0);

    try {
      const res = await fetch("/api/news-research", { method: "POST" });
      if (!res.ok) {
        const text = await res.text();
        let msg = `HTTP ${res.status}`;
        try { const d = JSON.parse(text); msg = d.error || msg; } catch { /* */ }
        throw new Error(msg);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("ストリームを取得できませんでした");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") break;
          try {
            const p = JSON.parse(payload);
            if (p.type === "init") {
              setSourceList(p.sources);
              const init: Record<string, SourceStatus> = {};
              for (const s of p.sources as string[]) init[s] = "waiting";
              setSourceStatuses(init);
            } else if (p.type === "source_status") {
              setSourceStatuses((prev) => ({ ...prev, [p.source]: p.status }));
            } else if (p.type === "source_status_all") {
              setSourceStatuses((prev) => {
                const n = { ...prev };
                for (const k of Object.keys(n)) n[k] = p.status;
                return n;
              });
            } else if (p.type === "progress") {
              setFoundCount(p.found);
            } else if (p.type === "done") {
              setNewsData(p.data as NewsData);
            } else if (p.type === "error") {
              throw new Error(p.error);
            }
          } catch (e) {
            if (e instanceof Error && e.message !== payload) throw e;
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const generateArticle = async (item: NewsItem, index: number) => {
    setGeneratingIndex(index);
    setArticles((prev) => ({ ...prev, [index]: { content: "", metadata: null, steps: [] } }));
    const primaryUrl = item.urls?.[0];
    let receivedDone = false;

    try {
      const res = await fetch("/api/news-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          summary: item.summary,
          url: primaryUrl?.url || "",
          source: primaryUrl?.source || "",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = `HTTP ${res.status}`;
        if (res.status === 504) msg = "サーバータイムアウト（504）— 再試行してください";
        try { const d = JSON.parse(text); msg = d.error || msg; } catch { /* */ }
        throw new Error(msg);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("ストリームを取得できませんでした");
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
          if (!line.startsWith("data: ")) continue;
          const pl = line.slice(6);
          if (pl === "[DONE]") { receivedDone = true; break; }
          try {
            const parsed = JSON.parse(pl);
            if (parsed.type === "ping") continue; // keepalive, ignore
            if (parsed.type === "error") throw new Error(parsed.error);
            if (parsed.type === "done") { receivedDone = true; continue; }
            if (parsed.type === "step") {
              const si: StepInfo = { step: parsed.step, label: parsed.label, message: parsed.message };
              setArticles((prev) => {
                const ex = prev[index];
                const steps = [...(ex?.steps || [])];
                const idx = steps.findIndex((s) => s.step === parsed.step);
                if (idx >= 0) steps[idx] = si; else steps.push(si);
                return { ...prev, [index]: { ...ex, steps } };
              });
            }
            if (parsed.type === "metadata") {
              setArticles((prev) => ({ ...prev, [index]: { ...prev[index], metadata: parsed.metadata } }));
            }
            if (parsed.type === "text") {
              fullText += parsed.text;
              setArticles((prev) => ({ ...prev, [index]: { ...prev[index], content: fullText } }));
            }
          } catch (e) {
            if (e instanceof Error && e.message !== pl) throw e;
          }
        }
      }

      // Stream ended — if we never got a "done" event and have no content, it was a timeout
      if (!receivedDone && !fullText) {
        throw new Error("接続が途切れました（タイムアウトの可能性）。「再生成」で再試行してください。");
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "記事生成に失敗しました";
      setArticles((prev) => {
        const existing = prev[index];
        // If we already have partial content, keep it and append error
        if (existing?.content && !existing.content.startsWith("エラー:")) {
          return {
            ...prev,
            [index]: {
              ...existing,
              content: existing.content + `\n\n---\n\n**⚠ 生成が中断されました:** ${errMsg}`,
            },
          };
        }
        return {
          ...prev,
          [index]: {
            content: `エラー: ${errMsg}`,
            metadata: existing?.metadata || null,
            steps: existing?.steps || [],
          },
        };
      });
    } finally {
      setGeneratingIndex(null);
    }
  };

  const copyArticle = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAsArticleData = (index: number, item: NewsItem) => {
    const article = articles[index];
    if (!article?.metadata) return;
    const m = article.metadata;
    const today = new Date().toISOString().split("T")[0];
    const escaped = article.content.replace(/`/g, "\\`").replace(/\$/g, "\\$");
    const code = `  {
    id: "NEW",
    slug: "${m.slug}",
    title: "${m.articleTitle.replace(/"/g, '\\"')}",
    excerpt: "${m.excerpt.replace(/"/g, '\\"')}",
    category: "${m.category}",
    tags: [${m.tags.map((t: string) => `"${t}"`).join(", ")}],
    publishedAt: "${today}",
    isPopular: false,
    content: \`${escaped}\`,
  },`;
    navigator.clipboard.writeText(code);
    setCopiedIndex(index * 1000);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const hoursAgoLabel = (h?: number) => {
    if (h == null) return null;
    if (h < 1) return "1時間以内";
    if (h < 24) return `約${Math.round(h)}時間前`;
    return `約${Math.round(h / 24)}日前`;
  };

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
          {newsData && (
            <p className="text-xs text-white/40">{new Date(newsData.searchedAt).toLocaleString("ja-JP")}</p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Start screen */}
        {!newsData && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl">📡</div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">サッカーニュース調査</h2>
                <p className="text-sm text-white/50 max-w-md">
                  AIが10メディアから直近48時間のトレンドニュースを収集します
                </p>
              </div>
              <button onClick={fetchNews} className="px-8 py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] text-white font-bold transition-colors">
                ニュース収集開始
              </button>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">{error}</div>
              )}
            </div>
          </div>
        )}

        {/* ═══ Progress UI ═══ */}
        {loading && sourceList.length > 0 && (
          <div className="py-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 border-4 border-white/10 border-t-[#E8192C] rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-lg font-bold text-white mb-1">ニュースを収集中</h2>
              <p className="text-sm text-white/40">各メディアを順番にチェックしています...</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {sourceList.map((src) => {
                const st = sourceStatuses[src] || "waiting";
                return (
                  <div
                    key={src}
                    className={`relative rounded-xl border p-3 text-center transition-all duration-500 ${
                      st === "searching"
                        ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                        : st === "done"
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : st === "ranking"
                        ? "bg-amber-500/10 border-amber-500/30"
                        : st === "failed"
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-white/[0.02] border-white/10"
                    }`}
                  >
                    {st === "searching" && (
                      <div className="absolute inset-0 rounded-xl border-2 border-blue-400/50 animate-pulse" />
                    )}
                    <div className="text-xl mb-1">{SOURCE_ICONS[src] || "📰"}</div>
                    <p className={`text-[11px] font-bold leading-tight ${
                      st === "searching" ? "text-blue-400" :
                      st === "done" ? "text-emerald-400" :
                      st === "ranking" ? "text-amber-400" :
                      "text-white/30"
                    }`}>
                      {src}
                    </p>
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

            {foundCount > 0 && (
              <p className="text-center text-sm text-white/40">
                現在 <span className="text-white font-bold">{foundCount}件</span> のニュースを発見
              </p>
            )}
          </div>
        )}

        {/* Loading fallback (no source list yet) */}
        {loading && sourceList.length === 0 && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#E8192C] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-sm">接続中...</p>
          </div>
        )}

        {/* ═══ Results ═══ */}
        {newsData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">トレンドニュース TOP {newsData.news.length}</h2>
                {newsData.totalFound && (
                  <p className="text-xs text-white/30 mt-1">{newsData.totalFound}件から厳選（重複統合済み）</p>
                )}
              </div>
              <button onClick={fetchNews} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/20 transition-colors">
                再取得
              </button>
            </div>

            {newsData.news.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Rank badge */}
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black ${
                      item.rank <= 3 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-white/10 text-white/60"
                    }`}>
                      {item.rank}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Time badge */}
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {item.hoursAgo != null && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            item.hoursAgo < 6 ? "bg-red-500/20 text-red-400" :
                            item.hoursAgo < 24 ? "bg-amber-500/20 text-amber-400" :
                            "bg-white/5 text-white/40"
                          }`}>
                            {hoursAgoLabel(item.hoursAgo)}
                          </span>
                        )}
                        <span className="text-[10px] text-white/20">
                          {item.urls.length}メディア
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-3">{item.summary}</p>

                      {/* Multiple source URLs */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.urls.map((u, ui) => (
                          <a
                            key={ui}
                            href={u.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-blue-400 hover:bg-white/10 hover:text-blue-300 transition-colors"
                          >
                            <span className="text-white/30">{SOURCE_ICONS[u.source] || "🔗"}</span>
                            {u.source}
                          </a>
                        ))}
                      </div>

                      <button
                        onClick={() => generateArticle(item, i)}
                        disabled={generatingIndex !== null}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          articles[i]?.content && generatingIndex !== i
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : generatingIndex === i
                            ? "bg-white/5 text-white/30 cursor-wait"
                            : "bg-[#E8192C] hover:bg-[#c0141f] text-white"
                        }`}
                      >
                        {generatingIndex === i ? "生成中..." : articles[i]?.content ? "生成済み ✓" : "記事にする"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step progress — show during generation, even if content has started streaming */}
                {generatingIndex === i && articles[i]?.steps?.length > 0 && (
                  <div className="border-t border-white/10 bg-white/[0.02] p-5">
                    <div className="space-y-2">
                      {[
                        { step: 1, label: "深いリサーチ" },
                        { step: 2, label: "ファクトチェック" },
                        { step: 3, label: "メタデータ生成" },
                        { step: 4, label: "執筆" },
                      ].map((s) => {
                        const active = articles[i]?.steps?.find((st) => st.step === s.step);
                        const isComplete = articles[i]?.steps?.some((st) => st.step > s.step);
                        return (
                          <div key={s.step} className="flex items-start gap-3">
                            <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isComplete ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : active ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse"
                                : "bg-white/5 text-white/20 border border-white/10"
                            }`}>{isComplete ? "✓" : s.step}</div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-bold ${active ? "text-white" : "text-white/30"}`}>STEP {s.step}: {s.label}</p>
                              {active && <p className="text-[11px] text-white/50 mt-0.5">{active.message}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Generated article */}
                {articles[i]?.content && (
                  <div className="border-t border-white/10 bg-white/[0.02]">
                    <div className="p-5">
                      {articles[i].steps?.length > 0 && generatingIndex !== i && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {articles[i].steps.map((s) => (
                            <span key={s.step} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">STEP {s.step}: {s.label} ✓</span>
                          ))}
                        </div>
                      )}

                      {articles[i].metadata && (
                        <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${CATEGORY_COLORS[articles[i].metadata!.category] || "bg-white/10 text-white/60 border-white/20"}`}>{articles[i].metadata!.category}</span>
                            <span className="text-[10px] text-white/30">slug: {articles[i].metadata!.slug}</span>
                          </div>
                          <p className="text-sm font-bold text-white mb-1">{articles[i].metadata!.articleTitle}</p>
                          <p className="text-xs text-white/50 mb-3">{articles[i].metadata!.excerpt}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {articles[i].metadata!.tags.map((tag: string) => (
                              <span key={tag} className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                          <span className="w-1.5 h-4 bg-emerald-400 rounded-full" />生成された記事
                        </h4>
                        <div className="flex gap-2">
                          {articles[i].metadata && (
                            <button onClick={() => copyAsArticleData(i, item)} className={`px-3 py-1 rounded-lg text-xs transition-colors ${copiedIndex === i * 1000 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"}`}>
                              {copiedIndex === i * 1000 ? "コピー済み!" : "articles.ts用コピー"}
                            </button>
                          )}
                          <button onClick={() => copyArticle(articles[i].content, i)} className={`px-3 py-1 rounded-lg text-xs transition-colors ${copiedIndex === i ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 hover:bg-white/15 text-white/60"}`}>
                            {copiedIndex === i ? "コピー済み!" : "本文コピー"}
                          </button>
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
