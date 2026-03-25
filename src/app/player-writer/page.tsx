"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Phase = "idle" | "generating" | "editing" | "done";
type SS = "waiting" | "running" | "done";
const STEPS = ["リサーチ中", "記事執筆中", "ファクトチェック", "AdSense審査"];

export default function PlayerWriterPage() {
  const [playerName, setPlayerName] = useState("");
  const [category, setCategory] = useState<"選手紹介"|"日本代表"|"海外組">("選手紹介");
  const [phase, setPhase] = useState<Phase>("idle");
  const [ss, setSs] = useState<SS[]>(["waiting","waiting","waiting","waiting"]);
  const [streamText, setStreamText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [factCheck, setFactCheck] = useState<any>(null);
  const [adsense, setAdsense] = useState<any>(null);
  const [pubStatus, setPubStatus] = useState<"idle"|"publishing"|"success"|"error">("idle");
  const [pubError, setPubError] = useState("");
  const [tab, setTab] = useState<"edit"|"preview">("edit");
  const [improving, setImproving] = useState(false);

  const generate = async () => {
    if (!playerName.trim()) return;
    setPhase("generating"); setStreamText(""); setSs(["running","waiting","waiting","waiting"]);
    const res = await fetch("/api/player-article", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerName, category }) });
    const reader = res.body!.getReader(); const dec = new TextDecoder(); let buf = "";
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n"); buf = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        try {
          const ev = JSON.parse(line.slice(6));
          if (ev.type === "step") setSs(p => p.map((s,i) => i===ev.step-1?"running":i<ev.step-1?"done":"waiting") as SS[]);
          if (ev.type === "text") setStreamText(p => p + ev.text);
          if (ev.type === "step_done") { setSs(p => p.map((s,i) => i===ev.step-1?"done":s) as SS[]); if(ev.step===3)setFactCheck(ev.data); if(ev.step===4)setAdsense(ev.data); }
          if (ev.type === "done") { setContent(ev.article); setTitle(ev.title||playerName+"——その軌跡"); setTags(playerName+", 日本代表, W杯2026, 選手紹介"); setFactCheck(ev.factCheck); setAdsense(ev.adsense); setSs(["done","done","done","done"]); setPhase("editing"); }
        } catch {}
      }
    }
  };

  const publish = async () => {
    setPubStatus("publishing");
    try {
      const ghToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      const repo = "shunfreestyle/wc2026site"; const path = "src/data/articles.ts";
      const slug = playerName.replace(/[^a-zA-Z0-9ぁ-んァ-ヶ亜-熙]/g,"-").replace(/-+/g,"-").toLowerCase().slice(0,50)+"-profile";
      const today = new Date().toISOString().split("T")[0];
      const tagArray = tags.split(",").map(t=>t.trim()).filter(Boolean);
      const escaped = content.replace(/`/g,"\\`").replace(/\$/g,"\\$");
      const excerpt = content.slice(0,100).replace(/[#<>*`]/g,"").replace(/"/g,'\\"').trim();
      const newArticle = `  {\n    id: "${Date.now()}",\n    slug: "${slug}",\n    title: "${title.replace(/"/g,'\\"')}",\n    excerpt: "${excerpt}...",\n    category: "${category}" as const,\n    tags: ${JSON.stringify(tagArray)},\n    publishedAt: "${today}",\n    isPopular: false,\n    content: \`${escaped}\`,\n  },`;
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, { headers: { Authorization: `token ${ghToken}`, Accept: "application/vnd.github.v3+json" } });
      if (!getRes.ok) throw new Error(`GitHub GET失敗: ${getRes.status}`);
      const fileData = await getRes.json();
      const bytes = Uint8Array.from(atob(fileData.content.replace(/\n/g,"")), c=>c.charCodeAt(0));
      const cur = new TextDecoder().decode(bytes);
      const ip = "export const articles: Article[] = [\n";
      const idx = cur.indexOf(ip); if(idx===-1) throw new Error("articles配列が見つかりません");
      const updated = cur.slice(0,idx+ip.length)+newArticle+"\n"+cur.slice(idx+ip.length);
      const enc = new TextEncoder().encode(updated); let bin="";
      for(let i=0;i<enc.length;i+=8192) bin+=String.fromCharCode(...enc.slice(i,i+8192));
      const base64 = btoa(bin);
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, { method:"PUT", headers:{Authorization:`token ${ghToken}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"}, body:JSON.stringify({message:`feat: add player article "${title.slice(0,50)}"`,content:base64,sha:fileData.sha}) });
      if(!putRes.ok) throw new Error(`GitHub PUT失敗: ${putRes.status}`);
      setPubStatus("success"); setPhase("done");
    } catch(err) { setPubStatus("error"); setPubError(err instanceof Error?err.message:"投稿失敗"); }
  };

  const improveArticle = async () => {
    if (!adsense || !content) return;
    setImproving(true);
    try {
      const res = await fetch("/api/improve-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          issues: adsense.issues || [],
          score: adsense.score,
          breakdown: adsense.breakdown || {},
        }),
      });
      const data = await res.json();
      if (data.improved) {
        setContent(data.improved);
        // AdSenseスコアを再審査
        const adsRes = await fetch("/api/player-article", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerName: "recheck", category, recheck: true, articleContent: data.improved }),
        });
        // recheckモードではJSONレスポンスを期待
        try {
          const adsData = await adsRes.json();
          if (adsData.adsense) setAdsense(adsData.adsense);
        } catch {
          // ストリームレスポンスの場合は無視
        }
      }
    } catch (err) {
      console.error("改善失敗:", err);
    } finally {
      setImproving(false);
    }
  };

  const sc = (n:number) => n>=80?"text-emerald-400":n>=60?"text-amber-400":"text-red-400";

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8"><h1 className="text-2xl font-bold mb-1">⚽ 選手記事ジェネレーター</h1><p className="text-white/50 text-sm">選手名を入力するだけで3000文字のプロフィール記事を自動生成</p></div>

        {phase==="idle" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div><label className="block text-sm font-medium text-white/70 mb-2">選手名</label><input type="text" value={playerName} onChange={e=>setPlayerName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()} placeholder="例: 久保建英 / Takefusa Kubo" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/50"/></div>
            <div><label className="block text-sm font-medium text-white/70 mb-2">カテゴリ</label><select value={category} onChange={e=>setCategory(e.target.value as any)} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/50"><option value="選手紹介">選手紹介</option><option value="日本代表">日本代表</option><option value="海外組">海外組</option></select></div>
            <button onClick={generate} disabled={!playerName.trim()} className="w-full py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] disabled:opacity-40 text-white font-bold text-sm transition-colors">記事を生成する →</button>
          </div>
        )}

        {phase==="generating" && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h2 className="text-sm font-bold text-white/70 mb-4">生成状況</h2>
              <div className="space-y-2">{STEPS.map((label,i)=>(
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${ss[i]==="done"?"bg-emerald-500 text-white":ss[i]==="running"?"bg-[#0057A8] text-white":"bg-white/10 text-white/30"}`}>{ss[i]==="done"?"✓":i+1}</div>
                  <span className={`text-sm ${ss[i]==="running"?"text-white font-bold":ss[i]==="done"?"text-emerald-400":"text-white/30"}`}>{label}{ss[i]==="running"&&<span className="ml-2 animate-pulse">...</span>}</span>
                </div>
              ))}</div>
            </div>
            {streamText && <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-h-48 overflow-y-auto"><p className="text-xs text-white/40 mb-2">生成中...</p><p className="text-xs text-white/60 whitespace-pre-wrap">{streamText.slice(0,400)}{streamText.length>400?"...":""}</p></div>}
          </div>
        )}

        {(phase==="editing"||phase==="done") && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {factCheck && <div className="bg-white/5 border border-white/10 rounded-xl p-4"><h3 className="text-xs font-bold text-white/50 mb-3">ファクトチェック</h3><div className="space-y-1">{factCheck.verified?.slice(0,3).map((v:string,i:number)=><p key={i} className="text-xs text-emerald-400">✓ {v}</p>)}{factCheck.warnings?.map((w:string,i:number)=><p key={i} className="text-xs text-amber-400">⚠ {w}</p>)}</div></div>}
              {adsense && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-white/50 mb-2">AdSense審査</h3>
                  <div className={`text-3xl font-bold ${adsense.score >= 80 ? "text-emerald-400" : adsense.score >= 60 ? "text-amber-400" : "text-red-400"}`}>
                    {adsense.score}<span className="text-base text-white/30">/100</span>
                  </div>
                  <div className={`text-xs font-bold mt-1 ${adsense.verdict === "投稿OK" ? "text-emerald-400" : "text-amber-400"}`}>
                    {adsense.verdict}
                  </div>
                  {adsense.issues?.map((issue: string, i: number) => (
                    <p key={i} className="text-xs text-red-400 mt-1">❌ {issue}</p>
                  ))}
                  {adsense.score < 85 && (
                    <button
                      onClick={improveArticle}
                      disabled={improving}
                      className="mt-3 w-full py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-400 text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      {improving ? "✨ 改善中..." : "✨ 85点を目指して改善する"}
                    </button>
                  )}
                  {improving && (
                    <p className="text-xs text-amber-400/70 mt-2 text-center animate-pulse">AIが記事を書き直しています（30〜60秒）...</p>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div><label className="block text-xs font-medium text-white/50 mb-1">タイトル</label><input type="text" value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none"/></div>
              <div><label className="block text-xs font-medium text-white/50 mb-1">タグ（カンマ区切り）</label><input type="text" value={tags} onChange={e=>setTags(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none"/></div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="flex border-b border-white/10">
                <button onClick={()=>setTab("edit")} className={`px-4 py-2 text-xs font-bold ${tab==="edit"?"text-white bg-white/10":"text-white/40"}`}>編集</button>
                <button onClick={()=>setTab("preview")} className={`px-4 py-2 text-xs font-bold ${tab==="preview"?"text-white bg-white/10":"text-white/40"}`}>プレビュー</button>
              </div>
              {tab==="edit"?<textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full h-96 px-4 py-3 bg-transparent text-white/80 text-xs leading-relaxed resize-none focus:outline-none font-mono"/>:<div className="h-96 overflow-y-auto px-4 py-3 prose prose-invert prose-sm max-w-none"><ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown></div>}
            </div>
            {phase!=="done" && (
              <div>
                {pubStatus==="success"?<div className="text-center py-4 text-emerald-400 font-bold">✅ 投稿完了！Vercelが自動デプロイします</div>:<>
                  <button onClick={publish} disabled={pubStatus==="publishing"} className="w-full py-4 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] disabled:opacity-50 text-white font-bold text-base transition-all">{pubStatus==="publishing"?"投稿中...":"📤 サムライフットボールに投稿"}</button>
                  {pubStatus==="error"&&<p className="text-red-400 text-xs mt-2 text-center">{pubError}</p>}
                </>}
              </div>
            )}
            <button onClick={()=>{setPhase("idle");setPlayerName("");setStreamText("");setPubStatus("idle");}} className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 text-sm transition-colors">別の選手の記事を作る</button>
          </div>
        )}
      </div>
    </div>
  );
}
