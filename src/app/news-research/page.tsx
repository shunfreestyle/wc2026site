"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "";

/* ─── Types ─── */
type Article = { title: string; url: string; date: string; description: string };
type SiteConfig = { name: string; icon: string; rss: string; filterCategory?: string };
type SiteResult = SiteConfig & {
  status: "waiting" | "fetching" | "done" | "error";
  articles: Article[];
  error?: string;
};
type ArticleMeta = {
  articleTitle: string;
  category: string;
  tags: string[];
  excerpt: string;
};

const SITES: SiteConfig[] = [
  { name: "ゲキサカ", icon: "⚽", rss: "https://web.gekisaka.jp/feed" },
  { name: "サッカーキング", icon: "👑", rss: "https://www.soccer-king.jp/feed" },
  { name: "フットボールチャンネル", icon: "⚽", rss: "https://www.footballchannel.jp/feed/" },
];

const CATEGORIES = ["日本代表", "Jリーグ", "W杯", "海外組", "コラム", "選手紹介"];
const EXISTING_TAGS = [
  "日本代表", "W杯2026", "Jリーグ", "海外組", "森保一", "冨安健洋", "塩貝健人",
  "三笘薫", "守田英正", "久保建英", "遠藤航", "南野拓実", "板倉滉", "伊藤洋輝",
  "プレミアリーグ", "ブンデスリーガ", "チャンピオンズリーグ",
  "鹿島アントラーズ", "川崎フロンターレ", "横浜Fマリノス",
  "戦術分析", "移籍",
];

/* ─── RSS XML parser ─── */
function parseRss(xml: string, filterCategory?: string): Article[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = doc.querySelectorAll("item");
  const allArticles: Article[] = [];

  items.forEach((item) => {
    if (filterCategory) {
      const cats = item.querySelectorAll("category");
      const catTexts = Array.from(cats).map((c) => c.textContent || "").join(" ");
      const titleText = item.querySelector("title")?.textContent || "";
      if (!catTexts.includes(filterCategory) && !titleText.includes(filterCategory) && !titleText.includes("サッカー") && !titleText.includes("Ｊリーグ") && !titleText.includes("日本代表")) {
        return;
      }
    }
    const title = item.querySelector("title")?.textContent?.trim() || "";
    const link = item.querySelector("link")?.textContent?.trim() || "";
    const pubDate = item.querySelector("pubDate")?.textContent?.trim() || "";
    const desc = item.querySelector("description")?.textContent?.trim() || "";
    if (title && link) {
      const cleanTitle = title.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/\s*\|\s*記事\s*\|\s*東スポWEB$/g, "").trim();
      const cleanDesc = desc.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]*>/g, "").trim();
      allArticles.push({
        title: cleanTitle,
        url: link.replace(/\?utm_.*$/, ""),
        date: pubDate,
        description: cleanDesc.slice(0, 150) + (cleanDesc.length > 150 ? "..." : ""),
      });
    }
  });

  allArticles.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
  return allArticles.slice(0, 10);
}

/* ─── Format date ─── */
function timeAgo(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffH = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffH < 1) return "1時間以内";
    if (diffH < 24) return `約${diffH}時間前`;
    return `約${Math.floor(diffH / 24)}日前`;
  } catch { return dateStr; }
}

/* ─── Call Claude API ─── */
async function callClaude(system: string, user: string, opts?: { stream?: boolean }) {
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
      stream: opts?.stream || false,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res;
}

/* ─── Stream article from Claude ─── */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function streamArticle(title: string, url: string, description: string, source: string, onText: (t: string) => void) {
  const res = await callClaude(
    `あなたは「サムライフットボール」のベテラン編集者だ。別の記者が書いた元記事をリライトする。

## リライトのルール
- 元の情報・事実は一切変えない
- 文体・表現・文章構造を完全に変える
- AIが書いたと思われる表現を徹底的に避ける
  - 「〜となっています」「〜とのことです」「〜が期待されます」禁止
  - 「まず」「次に」「そして」「また」「さらに」で文を始めるのは各1回まで
- 体言止めを適度に使う
- 受動態と能動態を自然に混ぜる
- 同じ情報でも別の切り口・順番で伝える
- サッカー専門メディアのベテラン記者らしい文体
- だ・である調で統一
- 1文は40文字以内を意識

## フォーマット
- H2見出し（##）を2〜3個
- 1200〜1800文字
- Markdown出力
- 選手名は初出時フルネーム＋（所属クラブ）
- 出典は末尾に書かない

## HTMLカスタム要素（必ず使え）
重要ポイント（1〜2個）:
<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">タイトル</span>
<p class="point-body">説明。<strong>固有名詞</strong>は太字。</p>
</div>

記事末尾のまとめ（必ず1個）:
<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>まとめ。</p>
</div>`,
    `以下の元記事をリライトしてください。記事本文のみ出力。\n\nタイトル: ${title}\nURL: ${url}\n出典: ${source}\n概要: ${description}`,
    { stream: true }
  );
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

/* ─── Generate metadata via Claude ─── */
async function generateMetadata(title: string, description: string): Promise<ArticleMeta> {
  const res = await callClaude(
    `サッカーニュース記事のメタデータ生成AI。JSON形式のみ。コードブロック不要。`,
    `メタデータを生成:

タイトル: ${title}
概要: ${description}

JSON: {"articleTitle": "【】付きの魅力的なタイトル", "category": "${CATEGORIES.join("|")}から1つ", "tags": ["3〜7個"], "excerpt": "50〜80文字の要約"}

既存タグ優先: ${EXISTING_TAGS.join(", ")}
既存にない場合は新規作成OK。`
  );
  const data = await res.json();
  let text = "";
  for (const b of (data.content as Array<Record<string, unknown>>)) {
    if (b.type === "text") text += String(b.text || "");
  }
  let s = text.trim();
  const cb = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cb) s = cb[1].trim();
  if (!s.startsWith("{")) { const m = s.match(/(\{[\s\S]*\})/); if (m) s = m[1]; }
  try {
    const parsed = JSON.parse(s);
    return {
      articleTitle: parsed.articleTitle || title,
      category: CATEGORIES.includes(parsed.category) ? parsed.category : "日本代表",
      tags: Array.isArray(parsed.tags) ? parsed.tags : ["日本代表"],
      excerpt: parsed.excerpt || description.slice(0, 80),
    };
  } catch {
    return { articleTitle: title, category: "日本代表", tags: ["日本代表"], excerpt: description.slice(0, 80) };
  }
}

/* ═══ Component ═══ */
export default function NewsResearchPage() {
  const [sites, setSites] = useState<SiteResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genKey, setGenKey] = useState<string | null>(null);
  const [genArticles, setGenArticles] = useState<Record<string, string>>({});
  const [articleMeta, setArticleMeta] = useState<Record<string, ArticleMeta>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [published, setPublished] = useState<Record<string, string>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Record<string, string>>({});

  const updateSite = (name: string, u: Partial<SiteResult>) => {
    setSites((p) => p.map((s) => s.name === name ? { ...s, ...u } : s));
  };

  const fetchAll = async () => {
    setError(null);
    setGenArticles({});
    setArticleMeta({});
    setSites(SITES.map((s) => ({ ...s, status: "waiting" as const, articles: [] })));

    for (const site of SITES) {
      updateSite(site.name, { status: "fetching" });
      try {
        const res = await fetch(`/api/fetch-rss?url=${encodeURIComponent(site.rss)}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
          throw new Error(data.error || `HTTP ${res.status}`);
        }
        const xml = await res.text();
        const articles = parseRss(xml, site.filterCategory);
        if (articles.length === 0) throw new Error("記事が見つかりませんでした");
        updateSite(site.name, { status: "done", articles });
      } catch (err) {
        updateSite(site.name, { status: "error", error: err instanceof Error ? err.message : "取得失敗" });
      }
    }
  };

  const genArticle = async (siteName: string, idx: number, article: Article) => {
    const key = `${siteName}-${idx}`;
    setGenKey(key);
    setGenArticles((p) => ({ ...p, [key]: "" }));
    try {
      // Generate metadata in parallel with the wait
      const [meta] = await Promise.all([
        generateMetadata(article.title, article.description),
        wait(3000),
      ]);
      setArticleMeta((p) => ({ ...p, [key]: meta }));

      await streamArticle(article.title, article.url, article.description, siteName, (full) => setGenArticles((p) => ({ ...p, [key]: full })));
    } catch (err) {
      setGenArticles((p) => ({ ...p, [key]: `エラー: ${err instanceof Error ? err.message : "失敗"}` }));
    } finally {
      setGenKey(null);
    }
  };

  const copy = (t: string, k: string) => { navigator.clipboard.writeText(t); setCopied(k); setTimeout(() => setCopied(null), 2000); };

  const publishArticle = async (key: string, article: Article, siteName: string, meta?: ArticleMeta) => {
    setPublishing(key);
    try {
      const content = genArticles[key];
      if (!content || content.startsWith("エラー:")) throw new Error("記事がありません");

      const ascii = article.title.replace(/[^a-zA-Z0-9\s]/g, "").trim().replace(/\s+/g, "-").toLowerCase().slice(0, 40);
      const slug = (ascii || "news") + "-" + Date.now().toString(36);
      const today = new Date().toISOString().split("T")[0];
      const escaped = content.replace(/`/g, "\\`").replace(/\$/g, "\\$");

      const pubTitle = (meta?.articleTitle || article.title).replace(/"/g, '\\"');
      const pubExcerpt = (meta?.excerpt || article.description).replace(/"/g, '\\"').slice(0, 80);
      const pubCategory = meta?.category || "日本代表";
      const pubTags = JSON.stringify(meta?.tags ?? ["日本代表"]);

      const newArticle = `  {
    id: "${Date.now()}",
    slug: "${slug}",
    title: "${pubTitle}",
    excerpt: "${pubExcerpt}",
    category: "${pubCategory}" as const,
    tags: ${pubTags},
    publishedAt: "${today}",
    isPopular: false,
    content: \`${escaped}\`,
  },`;

      const ghToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const ghOwner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
      const ghRepo = process.env.NEXT_PUBLIC_GITHUB_REPO;
      if (!ghToken) throw new Error("NEXT_PUBLIC_GITHUB_TOKEN が未設定です");
      if (!ghOwner || !ghRepo) throw new Error("NEXT_PUBLIC_GITHUB_OWNER / REPO が未設定です");

      const repo = `${ghOwner}/${ghRepo}`;
      const path = "src/data/articles.ts";

      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: { Authorization: `token ${ghToken}`, Accept: "application/vnd.github.v3+json" },
      });
      if (!getRes.ok) throw new Error(`GitHub GET失敗: ${getRes.status}`);
      const fileData = await getRes.json();

      const binaryStr = atob(fileData.content.replace(/\n/g, ""));
      const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
      const currentContent = new TextDecoder().decode(bytes);

      const insertPoint = "export const articles: Article[] = [\n";
      const idx = currentContent.indexOf(insertPoint);
      if (idx === -1) throw new Error("articles配列が見つかりません");
      const insertPos = idx + insertPoint.length;
      const updatedContent = currentContent.slice(0, insertPos) + newArticle + "\n" + currentContent.slice(insertPos);

      const encodedBytes = new TextEncoder().encode(updatedContent);
      let binaryString = "";
      const chunkSize = 8192;
      for (let i = 0; i < encodedBytes.length; i += chunkSize) {
        binaryString += String.fromCharCode(...encodedBytes.slice(i, i + chunkSize));
      }
      const base64 = btoa(binaryString);

      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: { Authorization: `token ${ghToken}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `feat: add article "${(meta?.articleTitle || article.title).slice(0, 50)}"`,
          content: base64,
          sha: fileData.sha,
        }),
      });
      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        throw new Error(`GitHub PUT失敗: ${putRes.status} ${err.message || ""}`);
      }

      setPublished((p) => ({ ...p, [key]: "success" }));
    } catch (err) {
      setPublished((p) => ({ ...p, [key]: `error:${err instanceof Error ? err.message : "投稿失敗"}` }));
    } finally {
      setPublishing(null);
    }
  };

  const total = sites.reduce((n, s) => n + s.articles.length, 0);
  const allDone = sites.length > 0 && sites.every((s) => s.status === "done" || s.status === "error");

  const CATEGORY_COLORS: Record<string, string> = {
    "日本代表": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Jリーグ": "bg-green-500/20 text-green-400 border-green-500/30",
    "W杯": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "海外組": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "コラム": "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "選手紹介": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  };

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
            <p className="text-sm text-white/50 mb-6">RSSフィードから最新記事を取得します</p>
            <button onClick={fetchAll} className="px-8 py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] text-white font-bold transition-colors">収集開始</button>
            {error && <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 max-w-md mx-auto">{error}</p>}
          </div>
        )}

        {/* Progress */}
        {sites.length > 0 && !allDone && (
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">取得状況</h2>
            {sites.map((s) => (
              <div key={s.name} className={`rounded-xl border p-4 transition-all ${
                s.status === "fetching" ? "bg-blue-500/10 border-blue-500/40"
                : s.status === "done" ? "bg-emerald-500/10 border-emerald-500/30"
                : s.status === "error" ? "bg-red-500/10 border-red-500/30"
                : "bg-white/[0.02] border-white/10"
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${s.status === "fetching" ? "text-blue-400" : s.status === "done" ? "text-emerald-400" : s.status === "error" ? "text-red-400" : "text-white/40"}`}>{s.name}</p>
                    <p className="text-xs text-white/40">{s.status === "waiting" ? "待機中" : s.status === "fetching" ? "RSSを取得中..." : s.status === "done" ? `✓ ${s.articles.length}件` : `× ${s.error}`}</p>
                  </div>
                  {s.status === "fetching" && <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {allDone && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">最新ニュース（{total}件）</h2>
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
                    const meta = articleMeta[key];
                    return (
                      <div key={ai} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <span className="shrink-0 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">{ai + 1}</span>
                            <div className="flex-1 min-w-0">
                              {article.date && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">{timeAgo(article.date)}</span>
                              )}
                              <h4 className="text-sm font-bold text-white mt-1 mb-1 leading-snug">{article.title}</h4>
                              {article.description && <p className="text-xs text-white/50 leading-relaxed mb-2">{article.description}</p>}
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
                            {/* Metadata display */}
                            {meta && (
                              <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                                {meta.articleTitle && meta.articleTitle !== article.title && (
                                  <div className="mb-2">
                                    <p className="text-[10px] text-white/40 mb-0.5">AIが生成したタイトル</p>
                                    <p className="text-sm font-bold text-amber-300">{meta.articleTitle}</p>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${CATEGORY_COLORS[meta.category] || "bg-white/10 text-white/60 border-white/20"}`}>
                                    {meta.category}
                                  </span>
                                  {meta.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">#{tag}</span>
                                  ))}
                                </div>
                                {meta.excerpt && (
                                  <p className="text-xs text-white/40 mt-2">{meta.excerpt}</p>
                                )}
                              </div>
                            )}

                            <div className="flex items-center justify-between mb-3">
                              <h5 className="text-xs font-bold text-emerald-400">生成された記事</h5>
                              <div className="flex gap-2">
                                <button onClick={() => copy(genArticles[key], key)} className={`px-2 py-0.5 rounded text-[10px] ${copied === key ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/50"}`}>{copied === key ? "コピー済み!" : "コピー"}</button>
                                <button
                                  onClick={() => {
                                    if (editingKey === key) {
                                      setGenArticles((p) => ({ ...p, [key]: editDraft[key] ?? p[key] }));
                                      setEditingKey(null);
                                    } else {
                                      setEditDraft((p) => ({ ...p, [key]: genArticles[key] }));
                                      setEditingKey(key);
                                    }
                                  }}
                                  className={`px-2 py-0.5 rounded text-[10px] ${editingKey === key ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/10 text-white/50"}`}
                                >
                                  {editingKey === key ? "保存" : "編集"}
                                </button>
                                <button onClick={() => genArticle(site.name, ai, article)} disabled={genKey !== null} className="px-2 py-0.5 rounded bg-white/10 text-white/50 text-[10px]">再生成</button>
                              </div>
                            </div>

                            {/* Article body: edit mode or preview mode */}
                            {editingKey === key ? (
                              <textarea
                                value={editDraft[key] ?? ""}
                                onChange={(e) => setEditDraft((p) => ({ ...p, [key]: e.target.value }))}
                                className="w-full h-96 bg-white/5 border border-white/20 rounded-lg p-3 text-sm text-white font-mono resize-y focus:outline-none focus:border-blue-500/50"
                              />
                            ) : (
                              <div className="text-white prose prose-invert prose-sm max-w-none [&_*]:text-white [&_a]:!text-blue-400 [&_strong]:!text-white/90 [&_.point-label]:!text-amber-400 [&_.summary-label]:!text-amber-400">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{genArticles[key]}</ReactMarkdown>
                              </div>
                            )}

                            {/* Publish button */}
                            <div className="mt-4 pt-4 border-t border-white/10">
                              {published[key] === "success" ? (
                                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                                  <span>✓</span>
                                  <span className="font-bold">投稿完了</span>
                                  <span className="text-white/30 text-xs">— Vercelが自動デプロイします</span>
                                </div>
                              ) : published[key]?.startsWith("error:") ? (
                                <div className="space-y-2">
                                  <p className="text-xs text-red-400">{published[key]!.slice(6)}</p>
                                  <button onClick={() => publishArticle(key, article, site.name, meta)} disabled={publishing !== null}
                                    className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold border border-red-500/30 transition-colors">
                                    再試行
                                  </button>
                                </div>
                              ) : (
                                <button onClick={() => publishArticle(key, article, site.name, meta)} disabled={publishing !== null || genKey !== null || editingKey === key}
                                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                                    publishing === key
                                      ? "bg-white/5 text-white/30 cursor-wait"
                                      : editingKey === key
                                      ? "bg-white/5 text-white/20 cursor-not-allowed"
                                      : "bg-gradient-to-r from-[#E8192C] to-[#c0141f] hover:from-[#c0141f] hover:to-[#a01019] text-white shadow-lg shadow-red-500/20"
                                  }`}>
                                  {publishing === key ? "投稿中..." : "📤 サムライフットボールに投稿"}
                                </button>
                              )}
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
