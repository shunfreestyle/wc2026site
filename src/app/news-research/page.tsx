"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";

/* ─── Types ─── */
type Article = { title: string; url: string; source: string };
type SiteConfig = { name: string; icon: string; query: string; domain: string };
type SiteResult = SiteConfig & { status: "waiting" | "searching" | "done" | "error"; articles: Article[]; error?: string };

const SITES: SiteConfig[] = [
  { name: "ゲキサカ", icon: "⚽", query: "ゲキサカ サッカーニュース 最新", domain: "gekisaka.jp" },
  { name: "サッカーキング", icon: "👑", query: "サッカーキング 最新ニュース", domain: "soccer-king.jp" },
  { name: "東スポ", icon: "📰", query: "東京スポーツ サッカー 最新", domain: "tokyo-sports.co.jp" },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ─── Core: web_search → extract URLs from tool_result blocks ─── */
async function searchForArticles(query: string, domain: string): Promise<Article[]> {
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
        max_tokens: 256,
        system: "検索を実行してください。テキスト出力は不要です。",
        messages: [{ role: "user", content: `「${query}」を検索してください。` }],
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 2 }],
      }),
    });

    if (res.status === 429) { console.warn("Rate limited, retry 60s"); continue; }
    if (!res.ok) {
      const t = await res.text();
      if (t.includes("rate_limit") && attempt < 2) continue;
      throw new Error(`API ${res.status}`);
    }

    const data = await res.json();
    const content = data.content as Array<Record<string, unknown>>;

    // Extract articles DIRECTLY from web_search_tool_result — no JSON parsing needed
    const articles: Article[] = [];
    for (const block of content) {
      if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
        for (const r of block.content as Array<Record<string, unknown>>) {
          if (r.type === "web_search_result" && r.url && r.title) {
            const url = String(r.url);
            const title = String(r.title);
            // Only keep URLs from the target domain, skip top/listing pages
            if (
              url.includes(domain) &&
              title.length > 10 &&
              !/トップページ|一覧|公式サイト$|ログイン|会員登録/.test(title)
            ) {
              articles.push({ title, url, source: domain });
            }
          }
        }
      }
    }

    console.log(`[search] "${query}" → ${articles.length} articles from ${domain}:`, articles);
    return articles.slice(0, 5);
  }
  throw new Error("レート制限で3回失敗");
}

/* ─── Stream article generation ─── */
async function streamArticle(title: string, url: string, source: string, onText: (t: string) => void) {
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
      system: "サムライフットボールのライター。だ・である調。H2見出し2〜3個。1200〜1800文字。Markdown。選手名は初出時フルネーム＋（所属クラブ）。出典は末尾に書かない。",
      messages: [{ role: "user", content: `記事を書け。本文のみ。\n\nタイトル: ${title}\nURL: ${url}\n出典: ${source}` }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const reader = res.body?.getReader();
  if (!reader) throw new Error("ストリーム失敗");
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
  const [genArticles, setGenArticles] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const updateSite = (name: string, u: Partial<SiteResult>) => {
    setSites((p) => p.map((s) => s.name === name ? { ...s, ...u } : s));
  };

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    setGenArticles({});
    setSites(SITES.map((s) => ({ ...s, status: "waiting" as const, articles: [] })));

    try {
      for (let i = 0; i < SITES.length; i++) {
        const site = SITES[i];
        updateSite(site.name, { status: "searching" });
        if (i > 0) await wait(5000);

        try {
          const found = await searchForArticles(site.query, site.domain);
          updateSite(site.name, { status: "done", articles: found });
        } catch (err) {
          updateSite(site.name, { status: "error", error: err instanceof Error ? err.message : "失敗" });
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
    setGenArticles((p) => ({ ...p, [key]: "" }));
    try {
      await wait(3000);
      await streamArticle(article.title, article.url, siteName, (full) => setGenArticles((p) => ({ ...p, [key]: full })));
    } catch (err) {
      setGenArticles((p) => ({ ...p, [key]: `エラー: ${err instanceof Error ? err.message : "失敗"}` }));
    } finally {
      setGenKey(null);
    }
  };

  const copy = (t: string, k: string) => { navigator.clipboard.writeText(t); setCopied(k); setTimeout(() => setCopied(null), 2000); };
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
        {sites.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📡</div>
            <h2 className="text-xl font-bold text-white mb-2">サッカーニュース収集</h2>
            <p className="text-sm text-white/50 mb-6">ゲキサカ・サッカーキング・東スポから最新記事を取得</p>
            <button onClick={fetchAll} className="px-8 py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] text-white font-bold transition-colors">収集開始</button>
            {error && <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 max-w-md mx-auto">{error}</p>}
          </div>
        )}

        {sites.length > 0 && !allDone && (
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">検索状況</h2>
            {sites.map((s) => (
              <div key={s.name} className={`rounded-xl border p-4 transition-all ${s.status === "searching" ? "bg-blue-500/10 border-blue-500/40" : s.status === "done" ? "bg-emerald-500/10 border-emerald-500/30" : s.status === "error" ? "bg-red-500/10 border-red-500/30" : "bg-white/[0.02] border-white/10"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${s.status === "searching" ? "text-blue-400" : s.status === "done" ? "text-emerald-400" : s.status === "error" ? "text-red-400" : "text-white/40"}`}>{s.name}</p>
                    <p className="text-xs text-white/40">{s.status === "waiting" ? "待機中" : s.status === "searching" ? "検索中..." : s.status === "done" ? `✓ ${s.articles.length}件` : `× ${s.error}`}</p>
                  </div>
                  {s.status === "searching" && <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />}
                </div>
              </div>
            ))}
          </div>
        )}

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
                {site.status === "error" && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">{site.error}</p>}

                <div className="space-y-3">
                  {site.articles.map((article, ai) => {
                    const key = `${site.name}-${ai}`;
                    return (
                      <div key={ai} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <span className="shrink-0 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">{ai + 1}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white mb-2 leading-snug">{article.title}</h4>
                              <div className="flex items-center gap-3 flex-wrap">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-400 hover:text-blue-300 underline underline-offset-2 truncate max-w-[350px]">{article.url}</a>
                                <button onClick={() => genArticle(site.name, ai, article)} disabled={genKey !== null}
                                  className={`shrink-0 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${genArticles[key] && genKey !== key ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : genKey === key ? "bg-white/5 text-white/30 cursor-wait" : "bg-[#E8192C] hover:bg-[#c0141f] text-white"}`}>
                                  {genKey === key ? "生成中..." : genArticles[key] ? "✓" : "記事にする"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {genArticles[key] && (
                          <div className="border-t border-white/10 bg-white/[0.02] p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="text-xs font-bold text-emerald-400">生成された記事</h5>
                              <div className="flex gap-2">
                                <button onClick={() => copy(genArticles[key], key)} className={`px-2 py-0.5 rounded text-[10px] ${copied === key ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"}`}>{copied === key ? "コピー済み!" : "コピー"}</button>
                                <button onClick={() => genArticle(site.name, ai, article)} disabled={genKey !== null} className="px-2 py-0.5 rounded bg-white/10 text-white/50 text-[10px]">再生成</button>
                              </div>
                            </div>
                            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-blue-400 prose-strong:text-white">
                              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{genArticles[key]}</ReactMarkdown>
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
