"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";

/* ─── Types ─── */
type Article = { title: string; url: string; summary: string; timeAgo: string };
type SiteResult = {
  name: string;
  icon: string;
  query: string;
  status: "waiting" | "searching" | "done" | "error";
  articles: Article[];
  error?: string;
};

/* ─── Sites with site: search queries ─── */
const SITES: SiteResult[] = [
  { name: "ゲキサカ", icon: "⚽", query: "site:web.gekisaka.jp サッカー", status: "waiting", articles: [] },
  { name: "サッカーキング", icon: "👑", query: "site:www.soccer-king.jp サッカー", status: "waiting", articles: [] },
  { name: "東スポ", icon: "📰", query: "site:www.tokyo-sports.co.jp サッカー", status: "waiting", articles: [] },
];

/* ─── Helpers ─── */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ─── Call Claude with web_search ─── */
async function searchSite(query: string): Promise<{ articles: Article[]; rawHits: Array<{ url: string; title: string }> }> {
  if (!API_KEY) throw new Error("APIキーが未設定");

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await wait(60000);

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
        max_tokens: 2048,
        system: `必ずJSON配列のみで返答。前置き・説明文・コードブロック不要。`,
        messages: [{
          role: "user",
          content: `「${query}」でウェブ検索してください。

検索結果から最新のニュース記事を5件選んでJSON配列で出力してください。

ルール:
- titleは記事の見出し（サイト名やカテゴリ名ではない）
- urlは検索結果に表示された実際の記事URL
- summaryは記事内容を100〜150文字で要約
- timeAgoは「約3時間前」「約1日前」など。不明なら空文字

[{"title":"記事見出し","url":"https://...","summary":"100〜150文字","timeAgo":"約X時間前"}]`,
        }],
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }],
      }),
    });

    if (res.status === 429) { console.warn("Rate limited, retry in 60s"); continue; }
    if (!res.ok) {
      const t = await res.text();
      if (t.includes("rate_limit") && attempt < 2) continue;
      throw new Error(`API ${res.status}: ${t.slice(0, 200)}`);
    }

    const data = await res.json();
    const content = data.content as Array<Record<string, unknown>>;

    // 1. Extract URLs directly from web_search_tool_result
    const rawHits: Array<{ url: string; title: string }> = [];
    for (const block of content) {
      if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
        for (const r of block.content as Array<Record<string, unknown>>) {
          if (r.type === "web_search_result" && r.url && r.title) {
            rawHits.push({ url: String(r.url), title: String(r.title) });
          }
        }
      }
    }
    console.log(`[searchSite] "${query}" -> ${rawHits.length} raw hits:`, rawHits);

    // 2. Parse Claude's JSON
    let text = "";
    for (const b of content) { if (b.type === "text") text += String(b.text || ""); }

    let articles: Article[] = [];
    if (text.trim()) {
      let json = text.trim();
      const cb = json.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (cb) json = cb[1].trim();
      if (!json.startsWith("[")) { const m = json.match(/(\[[\s\S]*\])/); if (m) json = m[1]; }
      try {
        const arr = JSON.parse(json);
        if (Array.isArray(arr)) {
          articles = arr
            .filter((a: Record<string, unknown>) => a.title && String(a.title).length > 5)
            .slice(0, 5)
            .map((a: Record<string, unknown>) => ({
              title: String(a.title),
              url: String(a.url || ""),
              summary: String(a.summary || ""),
              timeAgo: String(a.timeAgo || ""),
            }));
        }
      } catch { console.warn("[searchSite] JSON parse failed:", text.slice(0, 300)); }
    }

    // 3. If Claude's JSON failed or is empty, build from raw search hits
    if (articles.length === 0 && rawHits.length > 0) {
      console.log("[searchSite] Using raw hits as fallback");
      articles = rawHits
        .filter((h) => h.title.length > 10 && !/トップ|ホーム|公式サイト$|一覧|ログイン/.test(h.title))
        .slice(0, 5)
        .map((h) => ({ title: h.title, url: h.url, summary: "", timeAgo: "" }));
    }

    // 4. Validate URLs: prefer ones found in raw hits
    for (const article of articles) {
      if (!article.url || !article.url.startsWith("http")) {
        const match = rawHits.find((h) => {
          const words = article.title.split(/[\s、。]+/).filter((w) => w.length >= 3);
          return words.filter((w) => h.title.includes(w)).length >= 2;
        });
        if (match) article.url = match.url;
      }
    }

    return { articles: articles.filter((a) => a.url.startsWith("http")), rawHits };
  }
  throw new Error("レート制限で3回失敗");
}

/* ─── Stream article generation ─── */
async function streamArticle(title: string, summary: string, url: string, source: string, onText: (t: string) => void) {
  if (!API_KEY) throw new Error("APIキーが未設定");
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
      system: `サムライフットボールのライター。だ・である調。H2見出し2〜3個。1200〜1800文字。Markdown出力。選手名は初出時フルネーム＋（所属クラブ）。出典は末尾に書かない。`,
      messages: [{ role: "user", content: `記事を書け。本文のみ出力。\n\nタイトル: ${title}\nURL: ${url}\n出典: ${source}\n概要: ${summary}` }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
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
        if (ev.type === "content_block_delta" && ev.delta?.text) { full += ev.delta.text; onText(full); }
      } catch { /* skip */ }
    }
  }
}

/* ═══ Component ═══ */
export default function NewsResearchPage() {
  const [sites, setSites] = useState<SiteResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genKey, setGenKey] = useState<string | null>(null);
  const [articles, setArticles] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const updateSite = (name: string, u: Partial<SiteResult>) => {
    setSites((p) => p.map((s) => s.name === name ? { ...s, ...u } : s));
  };

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    setArticles({});
    setSites(SITES.map((s) => ({ ...s, status: "waiting", articles: [], error: undefined })));

    try {
      for (let i = 0; i < SITES.length; i++) {
        const site = SITES[i];
        updateSite(site.name, { status: "searching" });
        if (i > 0) await wait(5000);

        try {
          const { articles: found } = await searchSite(site.query);
          console.log(`[${site.name}] Found ${found.length} articles`);
          updateSite(site.name, { status: "done", articles: found });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "検索失敗";
          console.error(`[${site.name}] Error:`, err);
          updateSite(site.name, { status: "error", error: msg });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラー");
    } finally {
      setLoading(false);
    }
  };

  const genArticle = async (siteName: string, idx: number, article: Article) => {
    const key = `${siteName}-${idx}`;
    setGenKey(key);
    setArticles((p) => ({ ...p, [key]: "" }));
    try {
      await wait(3000);
      await streamArticle(article.title, article.summary, article.url, siteName, (full) => setArticles((p) => ({ ...p, [key]: full })));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "生成失敗";
      setArticles((p) => ({ ...p, [key]: `エラー: ${msg}` }));
    } finally {
      setGenKey(null);
    }
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const total = sites.reduce((n, s) => n + s.articles.length, 0);
  const allDone = sites.length > 0 && sites.every((s) => s.status === "done" || s.status === "error");

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
        {sites.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📡</div>
            <h2 className="text-xl font-bold text-white mb-2">サッカーニュース収集</h2>
            <p className="text-sm text-white/50 mb-2">ゲキサカ・サッカーキング・東スポから最新ニュースを検索</p>
            <p className="text-xs text-white/30 mb-6">web_search (site:) で各サイトの記事を直接取得します</p>
            <button onClick={fetchAll} className="px-8 py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] text-white font-bold transition-colors">
              収集開始
            </button>
            {error && <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 max-w-md mx-auto">{error}</p>}
          </div>
        )}

        {/* Progress */}
        {sites.length > 0 && !allDone && (
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">検索状況</h2>
            {sites.map((s) => (
              <div key={s.name} className={`rounded-xl border p-4 transition-all duration-500 ${
                s.status === "searching" ? "bg-blue-500/10 border-blue-500/40"
                : s.status === "done" ? "bg-emerald-500/10 border-emerald-500/30"
                : s.status === "error" ? "bg-red-500/10 border-red-500/30"
                : "bg-white/[0.02] border-white/10"
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${s.status === "searching" ? "text-blue-400" : s.status === "done" ? "text-emerald-400" : s.status === "error" ? "text-red-400" : "text-white/40"}`}>{s.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {s.status === "waiting" && "待機中..."}
                      {s.status === "searching" && "検索中..."}
                      {s.status === "done" && `✓ ${s.articles.length}件取得`}
                      {s.status === "error" && `× ${s.error}`}
                    </p>
                  </div>
                  {s.status === "searching" && <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {allDone && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">取得結果（{total}件）</h2>
              <button onClick={fetchAll} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm border border-white/20 transition-colors">再取得</button>
            </div>

            {sites.map((site) => (
              <div key={site.name}>
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-xl">{site.icon}</span>{site.name}
                  <span className="text-xs text-white/30 font-normal">({site.articles.length}件)</span>
                </h3>

                {site.status === "error" && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">{site.error}</p>
                )}

                <div className="space-y-3">
                  {site.articles.map((article, ai) => {
                    const key = `${site.name}-${ai}`;
                    return (
                      <div key={ai} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <span className="shrink-0 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">{ai + 1}</span>
                            <div className="flex-1 min-w-0">
                              {article.timeAgo && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">{article.timeAgo}</span>
                              )}
                              <h4 className="text-sm font-bold text-white mt-1 mb-1 leading-snug">{article.title}</h4>
                              {article.summary && <p className="text-xs text-white/50 leading-relaxed mb-2">{article.summary}</p>}
                              <div className="flex items-center gap-3 flex-wrap">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-400 hover:text-blue-300 underline underline-offset-2 truncate max-w-[300px]">{article.url}</a>
                                <button onClick={() => genArticle(site.name, ai, article)} disabled={genKey !== null}
                                  className={`shrink-0 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                    articles[key] && genKey !== key ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : genKey === key ? "bg-white/5 text-white/30 cursor-wait"
                                    : "bg-[#E8192C] hover:bg-[#c0141f] text-white"
                                  }`}>
                                  {genKey === key ? "生成中..." : articles[key] ? "✓" : "記事にする"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {articles[key] && (
                          <div className="border-t border-white/10 bg-white/[0.02] p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="text-xs font-bold text-emerald-400">生成された記事</h5>
                              <div className="flex gap-2">
                                <button onClick={() => copy(articles[key], key)} className={`px-2 py-0.5 rounded text-[10px] ${copied === key ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"}`}>
                                  {copied === key ? "コピー済み!" : "コピー"}
                                </button>
                                <button onClick={() => genArticle(site.name, ai, article)} disabled={genKey !== null} className="px-2 py-0.5 rounded bg-white/10 text-white/50 text-[10px]">再生成</button>
                              </div>
                            </div>
                            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-blue-400 prose-strong:text-white">
                              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{articles[key]}</ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
