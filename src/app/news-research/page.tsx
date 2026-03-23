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

/* ─── API helper ─── */
async function callClaude(system: string, user: string, webSearch = false, stream = false) {
  if (!API_KEY) throw new Error("APIキーが未設定です");
  const body: Record<string, unknown> = {
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4096,
    stream,
    system,
    messages: [{ role: "user", content: user }],
  };
  if (webSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }];
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

/* ─── Parse news JSON from Claude ─── */
function parseNews(data: Record<string, unknown>): NewsItem[] {
  const content = data.content as Array<Record<string, unknown>>;

  // Collect search result URLs as fallback
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

  // Extract JSON
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
    // Fallback: use search results directly
    items = srUrls.slice(0, 10).map((sr, i) => ({
      rank: i + 1, title: sr.title, urls: [{ source: "検索結果", url: sr.url }], summary: "", hoursAgo: undefined,
    }));
  }

  return items.filter((it) => it.title && (!it.hoursAgo || it.hoursAgo <= 48));
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
  const [articles, setArticles] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState<number | null>(null);

  /* ── Fetch news ── */
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
- 直近48時間以内の記事のみ。
- 同じニュースが複数メディアにある場合urlsにまとめる。
- 10件出力。`,
        `直近48時間の日本サッカーニュースをウェブ検索してください。

検索:
1. "日本代表 サッカー 最新ニュース"
2. "Jリーグ 速報 結果 最新"
3. "海外サッカー 日本人選手"
4. "サッカー 移籍 W杯2026"

JSON配列で10件（新しい順）:
[{"title":"タイトル","urls":[{"source":"メディア名","url":"URL"}],"summary":"200〜300文字の概要","hoursAgo":数値}]`,
        true
      );

      const data = await res.json();
      const items = parseNews(data);
      const ranked = items.slice(0, 10).map((it, i) => ({ ...it, rank: i + 1 }));

      if (ranked.length === 0) throw new Error("ニュースが取得できませんでした");
      setNews(ranked);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  /* ── Generate article ── */
  const genArticle = async (item: NewsItem, idx: number) => {
    setGenIdx(idx);
    setArticles((p) => ({ ...p, [idx]: "" }));
    const u = item.urls[0];

    try {
      const res = await callClaude(
        `「サムライフットボール」のライター。日本語。H2見出し2〜3個。1200〜2000文字。だ・である調。Markdown出力。`,
        `記事を書いてください:\nタイトル: ${item.title}\n出典: ${u?.source || ""}\nURL: ${u?.url || ""}\n概要: ${item.summary}`,
        false,
        true
      );

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
              setArticles((p) => ({ ...p, [idx]: full }));
            }
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "生成失敗";
      setArticles((p) => ({ ...p, [idx]: p[idx] ? p[idx] + `\n\n---\n**⚠ ${msg}**` : `エラー: ${msg}` }));
    } finally {
      setGenIdx(null);
    }
  };

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

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
            <p className="text-sm text-white/50 mb-6">直近48時間のトレンドニュースをAIが収集します</p>
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
            <p className="text-white/60 text-sm">ニュースを収集中...</p>
          </div>
        )}

        {/* Results */}
        {news.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">TOP {news.length}</h2>
              <button onClick={fetchNews} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm border border-white/20 transition-colors">再取得</button>
            </div>

            {news.map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black ${item.rank <= 3 ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-white/10 text-white/60"}`}>
                      {item.rank}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Time */}
                      {item.hoursAgo != null && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.hoursAgo < 6 ? "bg-red-500/20 text-red-400" : item.hoursAgo < 24 ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-white/40"}`}>
                          {timeLabel(item.hoursAgo)}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-base font-bold text-white mt-1.5 mb-2 leading-snug">{item.title}</h3>

                      {/* Summary */}
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

                      {/* Generate button */}
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

                {/* Article */}
                {articles[i] && (
                  <div className="border-t border-white/10 bg-white/[0.02] p-5">
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
