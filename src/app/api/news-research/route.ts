import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

type SourceUrl = { source: string; url: string };

const MEDIA_SOURCES = [
  "ゲキサカ", "サッカーキング", "Yahoo!ニュース", "Goal.com日本版",
  "超WORLDサッカー", "Football LAB", "Jリーグ公式",
  "日刊スポーツ", "スポーツ報知", "footballista",
];

const SYSTEM_PROMPT = `あなたはサッカーニュース調査員です。日本語で回答。

ルール:
- 純粋なJSON配列のみ出力。前置き・説明・コードブロック不要。
- URLは検索結果で見つかった実際のURLのみ使用。
- 直近48時間以内に公開された記事のみ対象。古い記事は含めない。
- hoursAgoは記事の公開からの推定経過時間。48より大きい場合は含めないこと。
- 必ず5件以上出力。`;

export async function POST() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (d: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(d)}\n\n`));
      };

      try {
        send({ type: "init", sources: MEDIA_SOURCES });

        const allItems: RawItem[] = [];
        const allSR: { url: string; title: string }[] = [];

        // --- Batch 1: 代表 & Jリーグ ---
        for (const s of MEDIA_SOURCES.slice(0, 4)) send({ type: "source_status", source: s, status: "searching" });

        const r1 = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `以下の検索を全て実行し、直近48時間以内のサッカーニュースを集めてください:

1. "日本代表 サッカー 最新ニュース"
2. "Jリーグ 速報 結果"
3. "サッカー日本代表 2026"

各検索から見つかった記事をJSON配列で出力（合計8〜10件）:
[{"title":"記事タイトル","urls":[{"source":"メディア名","url":"URL"}],"summary":"200文字の概要","hoursAgo":数値}]` }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 5 }],
        });
        allSR.push(...extractSearchResults(r1));
        allItems.push(...parseResponseItems(r1));
        console.log(`[Batch1] sr=${allSR.length}, items=${allItems.length}`);

        for (const s of MEDIA_SOURCES.slice(0, 4)) send({ type: "source_status", source: s, status: "done" });
        send({ type: "progress", found: allItems.length });

        // --- Batch 2: 海外組 & 移籍 ---
        for (const s of MEDIA_SOURCES.slice(4, 7)) send({ type: "source_status", source: s, status: "searching" });

        const r2 = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `以下の検索を全て実行し、直近48時間以内のサッカーニュースを集めてください:

1. "海外サッカー 日本人選手 最新"
2. "サッカー 移籍情報 最新"
3. "W杯2026 最新情報"

Batch1と異なるニュースを中心に、JSON配列で8〜10件:
[{"title":"記事タイトル","urls":[{"source":"メディア名","url":"URL"}],"summary":"200文字の概要","hoursAgo":数値}]` }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 5 }],
        });
        allSR.push(...extractSearchResults(r2));
        allItems.push(...parseResponseItems(r2));
        console.log(`[Batch2] sr=${allSR.length}, items=${allItems.length}`);

        for (const s of MEDIA_SOURCES.slice(4, 7)) send({ type: "source_status", source: s, status: "done" });
        send({ type: "progress", found: allItems.length });

        // --- Batch 3: スポーツ紙 & 補完 ---
        for (const s of MEDIA_SOURCES.slice(7)) send({ type: "source_status", source: s, status: "searching" });

        const r3 = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `以下の検索を全て実行し、直近48時間以内のサッカーニュースを集めてください:

1. "サッカー 速報 今日"
2. "日本サッカー ニュース 注目"

まだ出ていない新しいトピックのニュースを中心に、JSON配列で5〜8件:
[{"title":"記事タイトル","urls":[{"source":"メディア名","url":"URL"}],"summary":"200文字の概要","hoursAgo":数値}]` }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 5 }],
        });
        allSR.push(...extractSearchResults(r3));
        allItems.push(...parseResponseItems(r3));
        console.log(`[Batch3] sr=${allSR.length}, items=${allItems.length}`);

        for (const s of MEDIA_SOURCES.slice(7)) send({ type: "source_status", source: s, status: "done" });

        // --- Merge, filter, rank ---
        send({ type: "source_status_all", status: "ranking" });

        const merged = mergeItems(allItems);
        console.log(`[Merge] before filter: ${merged.length}`);

        // Enrich URLs
        for (const item of merged) {
          item.urls = enrichUrls(item.urls, item.title, allSR);
        }

        // Filter: 48時間以内のみ（hoursAgoがundefinedの場合は含める = 時間不明は除外しない）
        const filtered = merged.filter((item) => {
          if (item.hoursAgo == null) return true; // 不明は許容
          return item.hoursAgo <= 48;
        });
        console.log(`[Filter] after 48h filter: ${filtered.length} (removed ${merged.length - filtered.length})`);

        // Sort by recency
        const sorted = filtered.sort((a, b) => (a.hoursAgo ?? 24) - (b.hoursAgo ?? 24));

        const ranked = sorted.slice(0, 10).map((item, i) => ({
          rank: i + 1,
          title: item.title,
          urls: item.urls.length > 0 ? item.urls : [{ source: "検索結果", url: "" }],
          summary: item.summary,
          hoursAgo: item.hoursAgo,
        }));

        console.log(`[Result] final: ${ranked.length} items`);

        send({
          type: "done",
          data: {
            news: ranked,
            searchedAt: new Date().toISOString(),
            totalFound: merged.length,
          },
        });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error: unknown) {
        console.error("News research error:", error);
        let message = "Unknown error";
        if (error instanceof Anthropic.APIError) message = `API error: ${error.status} ${error.message}`;
        else if (error instanceof Error) message = error.message;
        send({ type: "error", error: message });
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}

type RawItem = { title: string; urls: SourceUrl[]; summary: string; hoursAgo?: number };

function extractSearchResults(response: Anthropic.Message) {
  const results: { url: string; title: string }[] = [];
  for (const block of response.content) {
    if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
      for (const r of block.content) {
        if (r.type === "web_search_result" && r.url) {
          results.push({ url: r.url, title: r.title });
        }
      }
    }
  }
  return results;
}

function parseResponseItems(response: Anthropic.Message): RawItem[] {
  let text = "";
  for (const block of response.content) {
    if (block.type === "text") text += block.text;
  }

  if (!text.trim()) {
    console.log("[parse] No text, falling back to search results");
    return buildFromSearchResults(response);
  }

  let jsonStr = text.trim();
  const cbm = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cbm) jsonStr = cbm[1].trim();
  if (!jsonStr.startsWith("[")) {
    const m = jsonStr.match(/(\[[\s\S]*\])/);
    if (m) jsonStr = m[1];
  }
  if (!jsonStr.startsWith("[") && jsonStr.startsWith("{")) {
    jsonStr = `[${jsonStr}]`;
  }

  try {
    const items = JSON.parse(jsonStr);
    if (!Array.isArray(items)) return buildFromSearchResults(response);
    return items.map((item: Record<string, unknown>) => ({
      title: String(item.title || ""),
      urls: Array.isArray(item.urls)
        ? (item.urls as SourceUrl[]).filter((u) => u && u.url)
        : item.url ? [{ source: String(item.source || ""), url: String(item.url) }] : [],
      summary: String(item.summary || ""),
      hoursAgo: typeof item.hoursAgo === "number" ? item.hoursAgo : undefined,
    }));
  } catch {
    console.error("[parse] JSON failed, first 500 chars:", text.slice(0, 500));
    return buildFromSearchResults(response);
  }
}

function buildFromSearchResults(response: Anthropic.Message): RawItem[] {
  const items: RawItem[] = [];
  for (const block of response.content) {
    if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
      for (const r of block.content) {
        if (r.type === "web_search_result" && r.url && r.title) {
          const src = identifySource(r.url);
          if (src) {
            items.push({ title: r.title, urls: [{ source: src, url: r.url }], summary: "", hoursAgo: undefined });
          }
        }
      }
    }
  }
  console.log(`[fallback] Built ${items.length} items from search results`);
  return items;
}

function mergeItems(items: RawItem[]): RawItem[] {
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

function enrichUrls(urls: SourceUrl[], title: string, searchResults: { url: string; title: string }[]): SourceUrl[] {
  const result: SourceUrl[] = [];
  const seen = new Set<string>();
  for (const u of urls) {
    if (u.url && u.url.startsWith("http") && !seen.has(u.url)) {
      if (!u.source) u.source = identifySource(u.url) || "その他";
      result.push(u);
      seen.add(u.url);
    }
  }
  const words = title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
  for (const sr of searchResults) {
    if (seen.has(sr.url)) continue;
    const mc = words.filter((w) => sr.title.includes(w)).length;
    if (mc >= 2) {
      result.push({ source: identifySource(sr.url) || "その他", url: sr.url });
      seen.add(sr.url);
    }
    if (result.length >= 5) break;
  }
  return result;
}

function identifySource(url: string): string | null {
  const map: [string, string][] = [
    ["gekisaka", "ゲキサカ"], ["soccerking", "サッカーキング"],
    ["news.yahoo.co.jp", "Yahoo!ニュース"], ["goal.com", "Goal.com"],
    ["ultra-soccer", "超WORLDサッカー"], ["football-lab", "Football LAB"],
    ["jleague.jp", "Jリーグ公式"], ["nikkansports.com", "日刊スポーツ"],
    ["hochi.news", "スポーツ報知"], ["footballista", "footballista"],
    ["sponichi", "スポニチ"], ["nhk.or.jp", "NHK"],
    ["sportsnavi", "スポーツナビ"], ["qoly", "Qoly"],
    ["mainichi", "毎日新聞"], ["asahi", "朝日新聞"],
    ["number.bunshun", "Number"], ["thedigestweb", "ダイジェスト"],
    ["sankei", "産経"], ["yomiuri", "読売"],
  ];
  for (const [d, n] of map) { if (url.includes(d)) return n; }
  return null;
}
