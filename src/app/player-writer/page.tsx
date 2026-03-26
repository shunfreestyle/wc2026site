"use client";
import { useState } from "react";

type Phase = "idle" | "generating" | "editing";
type SS = "waiting" | "running" | "done";
const STEPS = ["Wikipediaリサーチ", "ファクトチェック", "記事執筆", "AdSense審査"];

export default function PlayerWriterPage() {
  const [playerName, setPlayerName] = useState("");
  const [category, setCategory] = useState<"選手紹介" | "日本代表" | "海外組">("選手紹介");
  const [phase, setPhase] = useState<Phase>("idle");
  const [ss, setSs] = useState<SS[]>(["waiting", "waiting", "waiting", "waiting"]);
  const [streamText, setStreamText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [adsense, setAdsense] = useState<any>(null);
  const [factCheck, setFactCheck] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "review">("edit");
  const [reviewing, setReviewing] = useState(false);
  const [pubStatus, setPubStatus] = useState<"idle" | "publishing" | "success" | "error">("idle");
  const [pubError, setPubError] = useState("");

  const generate = async () => {
    if (!playerName.trim()) return;
    setPhase("generating");
    setStreamText("");
    setAdsense(null);
    setFactCheck(null);
    setSources([]);
    setSs(["running", "waiting", "waiting", "waiting"]);

    const res = await fetch("/api/player-article-v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName, category }),
    });
    const reader = res.body!.getReader();
    const dec = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        try {
          const ev = JSON.parse(line.slice(6));
          if (ev.type === "step") {
            setSs((p) => p.map((s, i) => (i === ev.step - 1 ? "running" : i < ev.step - 1 ? "done" : "waiting")) as SS[]);
          }
          if (ev.type === "text") {
            setStreamText((p) => p + ev.text);
          }
          if (ev.type === "step_done") {
            setSs((p) => p.map((s, i) => (i === ev.step - 1 ? "done" : s)) as SS[]);
            if (ev.step === 2) setFactCheck(ev.data);
            if (ev.step === 4) setAdsense(ev.data);
          }
          if (ev.type === "done") {
            setContent(ev.article);
            setTitle(ev.title || playerName + "——その軌跡");
            setTags(playerName + ", 日本代表, W杯2026, 選手紹介");
            setAdsense(ev.adsense);
            setFactCheck(ev.factData);
            setSources(ev.sources || []);
            setSs(["done", "done", "done", "done"]);
            setPhase("editing");
          }
        } catch {}
      }
    }
  };

  const reviewArticle = async () => {
    if (!content) return;
    setReviewing(true);
    setActiveTab("review");
    try {
      const res = await fetch("/api/review-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, playerName }),
      });
      const data = await res.json();
      if (data.adsense) setAdsense(data.adsense);
      if (data.factCheck) setFactCheck(data.factCheck);
    } catch (err) {
      console.error("審査失敗:", err);
    } finally {
      setReviewing(false);
    }
  };

  const publish = async () => {
    setPubStatus("publishing");
    try {
      const ghToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const repo = "shunfreestyle/wc2026site";
      const path = "src/data/articles.ts";
      const slug = playerName.replace(/[^a-zA-Z0-9ぁ-んァ-ヶ亜-熙]/g, "-").replace(/-+/g, "-").toLowerCase().slice(0, 50) + "-profile";
      const today = new Date().toISOString().split("T")[0];
      const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const escaped = content.replace(/`/g, "\\`").replace(/\$/g, "\\$");
      const excerpt = content.slice(0, 100).replace(/[#<>*`]/g, "").replace(/"/g, '\\"').trim();
      const newArticle = `  {\n    id: "${Date.now()}",\n    slug: "${slug}",\n    title: "${title.replace(/"/g, '\\"')}",\n    excerpt: "${excerpt}...",\n    category: "${category}" as const,\n    tags: ${JSON.stringify(tagArray)},\n    publishedAt: "${today}",\n    isPopular: false,\n    content: \`${escaped}\`,\n  },`;
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: { Authorization: `token ${ghToken}`, Accept: "application/vnd.github.v3+json" },
      });
      if (!getRes.ok) throw new Error(`GitHub GET失敗: ${getRes.status}`);
      const fileData = await getRes.json();
      const bytes = Uint8Array.from(atob(fileData.content.replace(/\n/g, "")), (c) => c.charCodeAt(0));
      const cur = new TextDecoder().decode(bytes);
      const ip = "export const articles: Article[] = [\n";
      const idx = cur.indexOf(ip);
      if (idx === -1) throw new Error("articles配列が見つかりません");
      const updated = cur.slice(0, idx + ip.length) + newArticle + "\n" + cur.slice(idx + ip.length);
      const enc = new TextEncoder().encode(updated);
      let bin = "";
      for (let i = 0; i < enc.length; i += 8192) bin += String.fromCharCode(...enc.slice(i, i + 8192));
      const base64 = btoa(bin);
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: { Authorization: `token ${ghToken}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" },
        body: JSON.stringify({ message: `feat: add player article "${title.slice(0, 50)}"`, content: base64, sha: fileData.sha }),
      });
      if (!putRes.ok) throw new Error(`GitHub PUT失敗: ${putRes.status}`);
      setPubStatus("success");
    } catch (err) {
      setPubStatus("error");
      setPubError(err instanceof Error ? err.message : "投稿失敗");
    }
  };

  const charCount = content.length;
  const scoreColor = (n: number) => (n >= 80 ? "text-emerald-400" : n >= 60 ? "text-amber-400" : "text-red-400");

  const previewHtml = content
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:700;margin:1.2rem 0 0.5rem;color:#1a1a1a">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.3rem;font-weight:700;margin:1.5rem 0 0.8rem;color:#0a1628;border-bottom:2px solid #e5e7eb;padding-bottom:0.3rem">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p style='margin:0.6rem 0;line-height:1.8'>")
    .replace(/\n/g, "<br>");

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">⚽ 選手記事ジェネレーター v2</h1>
          <p className="text-white/50 text-sm">Wikipedia + ファクトチェックで正確な選手プロフィール記事を自動生成</p>
        </div>

        {/* ── idle ── */}
        {phase === "idle" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">選手名</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="例: 久保建英 / Takefusa Kubo"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">カテゴリ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/50"
              >
                <option value="選手紹介">選手紹介</option>
                <option value="日本代表">日本代表</option>
                <option value="海外組">海外組</option>
              </select>
            </div>
            <button
              onClick={generate}
              disabled={!playerName.trim()}
              className="w-full py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] disabled:opacity-40 text-white font-bold text-sm transition-colors"
            >
              記事を生成する →
            </button>
          </div>
        )}

        {/* ── generating ── */}
        {phase === "generating" && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-white/70 mb-4">生成状況</h2>
              <div className="space-y-2">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        ss[i] === "done" ? "bg-emerald-500 text-white" : ss[i] === "running" ? "bg-[#0057A8] text-white" : "bg-white/10 text-white/30"
                      }`}
                    >
                      {ss[i] === "done" ? "✓" : i + 1}
                    </div>
                    <span className={`text-sm ${ss[i] === "running" ? "text-white font-bold" : ss[i] === "done" ? "text-emerald-400" : "text-white/30"}`}>
                      {label}
                      {ss[i] === "running" && <span className="ml-2 animate-pulse">...</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {streamText && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-h-48 overflow-y-auto">
                <p className="text-xs text-white/40 mb-2">執筆中...</p>
                <p className="text-xs text-white/60 whitespace-pre-wrap">
                  {streamText.slice(0, 600)}
                  {streamText.length > 600 ? "..." : ""}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── editing ── */}
        {phase === "editing" && (
          <div className="space-y-4">
            {/* ステータスバー */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-xs text-white/50">
                文字数: <span className={charCount >= 3000 ? "text-emerald-400" : "text-amber-400"}>{charCount.toLocaleString()}</span>
              </span>
              {adsense && (
                <span className="text-xs text-white/50">
                  AdSense: <span className={scoreColor(adsense.score)}>{adsense.score}点</span>
                </span>
              )}
              {sources.length > 0 && <span className="text-xs text-white/30">出典: {sources.join(", ")}</span>}
              <div className="flex-1" />
              <button
                onClick={reviewArticle}
                disabled={reviewing}
                className="px-4 py-1.5 rounded-lg bg-[#0057A8]/30 hover:bg-[#0057A8]/50 border border-[#0057A8]/40 text-[#4da6ff] text-xs font-bold transition-colors disabled:opacity-50"
              >
                {reviewing ? "審査中..." : "📊 審査する"}
              </button>
              <button
                onClick={() => {
                  setPhase("idle");
                  setPlayerName("");
                  setStreamText("");
                  setContent("");
                  setAdsense(null);
                  setFactCheck(null);
                  setPubStatus("idle");
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 text-xs transition-colors"
              >
                最初から
              </button>
            </div>

            {/* タイトル・タグ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">タイトル</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">タグ（カンマ区切り）</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* タブ */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`px-4 py-2 text-xs font-bold ${activeTab === "edit" ? "text-white bg-white/10" : "text-white/40"}`}
                >
                  ✏️ 編集
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 text-xs font-bold ${activeTab === "preview" ? "text-white bg-white/10" : "text-white/40"}`}
                >
                  👁 プレビュー
                </button>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`px-4 py-2 text-xs font-bold ${activeTab === "review" ? "text-white bg-white/10" : "text-white/40"}`}
                >
                  📊 審査結果{adsense ? `(${adsense.score}点)` : ""}
                </button>
              </div>

              {/* 編集タブ */}
              {activeTab === "edit" && (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[520px] px-4 py-3 bg-transparent text-white/80 text-xs leading-relaxed resize-none focus:outline-none font-mono"
                />
              )}

              {/* プレビュータブ */}
              {activeTab === "preview" && (
                <div className="h-[520px] overflow-y-auto bg-white">
                  <link rel="stylesheet" href="/article-preview.css" />
                  <div
                    className="max-w-3xl mx-auto px-6 py-8 article-page"
                    dangerouslySetInnerHTML={{
                      __html: `<div class="article-body"><p>${previewHtml}</p></div>`,
                    }}
                  />
                </div>
              )}

              {/* 審査結果タブ */}
              {activeTab === "review" && (
                <div className="h-[520px] overflow-y-auto px-5 py-4">
                  {reviewing ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white/50 text-sm animate-pulse">審査中...</p>
                    </div>
                  ) : !adsense && !factCheck ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <p className="text-white/40 text-sm">まだ審査していません</p>
                      <button
                        onClick={reviewArticle}
                        className="px-6 py-2 rounded-lg bg-[#0057A8] hover:bg-[#004a91] text-white text-sm font-bold transition-colors"
                      >
                        📊 審査する
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {/* AdSenseスコア */}
                      {adsense && (
                        <div>
                          <h3 className="text-xs font-bold text-white/50 mb-3">AdSense審査スコア</h3>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className={`text-4xl font-bold ${scoreColor(adsense.score)}`}>{adsense.score}</span>
                            <span className="text-white/30">/100</span>
                            <span className={`text-sm font-bold ml-2 ${scoreColor(adsense.score)}`}>{adsense.verdict}</span>
                          </div>
                          {adsense.breakdown && (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {Object.entries(adsense.breakdown).map(([key, val]) => (
                                <div key={key} className="bg-white/5 rounded-lg px-3 py-2">
                                  <span className="text-xs text-white/40">{key}</span>
                                  <span className={`block text-lg font-bold ${scoreColor(val as number)}`}>{val as number}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {adsense.good?.map((g: string, i: number) => (
                            <p key={i} className="text-xs text-emerald-400 mb-1">✓ {g}</p>
                          ))}
                          {adsense.issues?.map((issue: string, i: number) => (
                            <p key={i} className="text-xs text-red-400 mb-1">❌ {issue}</p>
                          ))}
                        </div>
                      )}
                      {/* ファクトチェック */}
                      {factCheck && (
                        <div>
                          <h3 className="text-xs font-bold text-white/50 mb-3">ファクトチェック</h3>
                          {factCheck.verified?.map((v: string, i: number) => (
                            <p key={i} className="text-xs text-emerald-400 mb-1">✓ {v}</p>
                          ))}
                          {factCheck.corrections?.map((c: string, i: number) => (
                            <p key={i} className="text-xs text-red-400 mb-1">⚠ 修正: {c}</p>
                          ))}
                          {factCheck.warnings?.map((w: string, i: number) => (
                            <p key={i} className="text-xs text-amber-400 mb-1">⚠ {w}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 投稿ボタン */}
            {pubStatus === "success" ? (
              <div className="text-center py-4 text-emerald-400 font-bold">✅ 投稿完了！Vercelが自動デプロイします</div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={publish}
                  disabled={pubStatus === "publishing"}
                  className="w-full py-4 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] disabled:opacity-50 text-white font-bold text-base transition-all"
                >
                  {pubStatus === "publishing" ? "投稿中..." : "📤 サムライフットボールに投稿"}
                </button>
                {pubStatus === "error" && <p className="text-red-400 text-xs text-center">{pubError}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
