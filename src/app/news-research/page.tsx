"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type NewsItem = {
  rank: number;
  title: string;
  url: string;
  source: string;
  summary: string;
};

type SearchResult = {
  url: string;
  title: string;
};

type NewsData = {
  news: NewsItem[];
  searchedAt: string;
  searchResults?: SearchResult[];
};

type ArticleMetadata = {
  category: string;
  tags: string[];
  slug: string;
  excerpt: string;
  articleTitle: string;
};

type ArticleData = {
  content: string;
  metadata: ArticleMetadata | null;
};

const CATEGORY_COLORS: Record<string, string> = {
  "日本代表": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Jリーグ": "bg-green-500/20 text-green-400 border-green-500/30",
  "W杯": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "海外組": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "コラム": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "選手紹介": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
};

export default function NewsResearchPage() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
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
    setLoadingMessage("接続中...");

    try {
      const res = await fetch("/api/news-research", { method: "POST" });

      if (!res.ok) {
        const text = await res.text();
        let msg = `HTTP ${res.status}`;
        try { const d = JSON.parse(text); msg = d.error || msg; } catch { /* ignore */ }
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
            const parsed = JSON.parse(payload);
            if (parsed.status === "searching" || parsed.status === "processing") {
              setLoadingMessage(parsed.message);
            } else if (parsed.status === "done") {
              setNewsData(parsed.data as NewsData);
            } else if (parsed.status === "error") {
              throw new Error(parsed.error);
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
      setLoadingMessage("");
    }
  };

  const generateArticle = async (item: NewsItem, index: number) => {
    setGeneratingIndex(index);
    setArticles((prev) => ({ ...prev, [index]: { content: "", metadata: null } }));
    try {
      const res = await fetch("/api/news-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          summary: item.summary,
          url: item.url,
          source: item.source,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = `HTTP ${res.status}`;
        try {
          const data = JSON.parse(text);
          msg = data.error || msg;
        } catch { /* ignore */ }
        throw new Error(msg);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("ストリームを取得できませんでした");

      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

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
            const parsed = JSON.parse(payload);
            if (parsed.type === "error") throw new Error(parsed.error);
            if (parsed.type === "metadata") {
              setArticles((prev) => ({
                ...prev,
                [index]: { ...prev[index], metadata: parsed.metadata },
              }));
            }
            if (parsed.type === "text") {
              fullText += parsed.text;
              setArticles((prev) => ({
                ...prev,
                [index]: { ...prev[index], content: fullText },
              }));
            }
          } catch (e) {
            if (e instanceof Error && e.message !== payload) throw e;
          }
        }
      }
    } catch (err) {
      setArticles((prev) => ({
        ...prev,
        [index]: {
          content: `エラー: ${err instanceof Error ? err.message : "記事生成に失敗しました"}`,
          metadata: null,
        },
      }));
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

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a1628]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              ← トップ
            </Link>
            <div className="w-px h-5 bg-white/20" />
            <h1 className="text-lg font-bold text-white">
              News Research
            </h1>
            <span className="text-xs text-amber-400 border border-amber-400/30 rounded px-2 py-0.5">
              ADMIN
            </span>
          </div>
          {newsData && (
            <p className="text-xs text-white/40">
              {new Date(newsData.searchedAt).toLocaleString("ja-JP")}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Action area */}
        {!newsData && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl">
                📡
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  サッカーニュース調査
                </h2>
                <p className="text-sm text-white/50 max-w-md">
                  AIがゲキサカ、サッカーキング、Yahoo!ニュースなどから
                  直近24時間のトレンドニュースを収集します
                </p>
              </div>
              <button
                onClick={fetchNews}
                className="px-8 py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] text-white font-bold transition-colors"
              >
                ニュース収集開始
              </button>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-white/10 border-t-[#E8192C] rounded-full animate-spin" />
              <p className="text-white/60 text-sm">
                {loadingMessage || "AIがニュースを収集中..."}
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {newsData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                トレンドニュース TOP {newsData.news.length}
              </h2>
              <button
                onClick={fetchNews}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/20 transition-colors"
              >
                再取得
              </button>
            </div>

            {newsData.news.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                {/* News card */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div
                      className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black ${
                        item.rank <= 3
                          ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {item.rank}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded">
                          {item.source}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-3">
                        {item.summary}
                      </p>
                      <div className="flex items-center gap-3">
                        {item.url && item.url.startsWith("http") ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors truncate max-w-xs"
                          >
                            {item.url}
                          </a>
                        ) : (
                          <span className="text-xs text-white/30">URL未取得</span>
                        )}
                        <button
                          onClick={() => generateArticle(item, i)}
                          disabled={generatingIndex !== null}
                          className={`shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            articles[i]?.content
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : generatingIndex === i
                              ? "bg-white/5 text-white/30 cursor-wait"
                              : "bg-[#E8192C] hover:bg-[#c0141f] text-white"
                          }`}
                        >
                          {generatingIndex === i
                            ? "生成中..."
                            : articles[i]?.content
                            ? "生成済み ✓"
                            : "記事にする"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generated article */}
                {articles[i]?.content && (
                  <div className="border-t border-white/10 bg-white/[0.02]">
                    <div className="p-5">
                      {/* Metadata display */}
                      {articles[i].metadata && (
                        <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${CATEGORY_COLORS[articles[i].metadata!.category] || "bg-white/10 text-white/60 border-white/20"}`}>
                              {articles[i].metadata!.category}
                            </span>
                            <span className="text-[10px] text-white/30">
                              slug: {articles[i].metadata!.slug}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-white mb-1">
                            {articles[i].metadata!.articleTitle}
                          </p>
                          <p className="text-xs text-white/50 mb-3">
                            {articles[i].metadata!.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {articles[i].metadata!.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                          <span className="w-1.5 h-4 bg-emerald-400 rounded-full" />
                          生成された記事
                        </h4>
                        <div className="flex gap-2">
                          {articles[i].metadata && (
                            <button
                              onClick={() => copyAsArticleData(i, item)}
                              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                                copiedIndex === i * 1000
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {copiedIndex === i * 1000 ? "コピー済み!" : "articles.ts用コピー"}
                            </button>
                          )}
                          <button
                            onClick={() => copyArticle(articles[i].content, i)}
                            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                              copiedIndex === i
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-white/10 hover:bg-white/15 text-white/60"
                            }`}
                          >
                            {copiedIndex === i ? "コピー済み!" : "本文コピー"}
                          </button>
                          <button
                            onClick={() => generateArticle(item, i)}
                            disabled={generatingIndex !== null}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white/60 text-xs transition-colors"
                          >
                            再生成
                          </button>
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
