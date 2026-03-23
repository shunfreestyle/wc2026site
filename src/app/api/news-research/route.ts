import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

type SourceUrl = { source: string; url: string };

const MEDIA_SOURCES = [
  "ゲキサカ", "サッカーキング", "Yahoo!ニュース", "Goal.com日本版",
  "超WORLDサッカー", "Football LAB", "Jリーグ公式",
  "日刊スポーツ", "スポーツ報知", "footballista",
];

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

        // --- Phase 1 ---
        for (const s of MEDIA_SOURCES.slice(0, 5)) send({ type: "source_status", source: s, status: "searching" });

        const r1 = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: `日本サッカーの最新ニュースをウェブ検索してください。

以下の検索を順に実行してください:
1. "日本代表 サッカー ニュース"
2. "Jリーグ ニュース 速報"
3. "サッカー 海外組 日本人選手"

検索結果から見つかった記事を、以下のJSON配列で10件出力してください。
同じニュースが複数メディアにある場合はurlsにまとめてください。

[
  {
    "title": "記事タイトル",
    "urls": [{"source": "メディア名", "url": "実際のURL"}],
    "summary": "200〜300文字の概要",
    "hoursAgo": 推定何時間前か(数値)
  }
]`,
          }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 5 }],
        });

        const sr1 = extractSearchResults(r1);
        const items1 = parseResponseItems(r1);
        console.log(`[Phase1] searchResults=${sr1.length}, parsedItems=${items1.length}`);

        for (const s of MEDIA_SOURCES.slice(0, 5)) send({ type: "source_status", source: s, status: "done" });
        send({ type: "progress", found: items1.length });

        // --- Phase 2 ---
        for (const s of MEDIA_SOURCES.slice(5)) send({ type: "source_status", source: s, status: "searching" });

        const r2 = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: `日本サッカーのニュースを追加で検索してください。

以下の検索を実行:
1. "サッカー 移籍 最新"
2. "日本代表 W杯 2026"

先ほどと異なるニュースを中心に、以下のJSON配列で最大10件:
[
  {
    "title": "記事タイトル",
    "urls": [{"source": "メディア名", "url": "実際のURL"}],
    "summary": "200〜300文字の概要",
    "hoursAgo": 推定何時間前か(数値)
  }
]`,
          }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 5 }],
        });

        const sr2 = extractSearchResults(r2);
        const items2 = parseResponseItems(r2);
        console.log(`[Phase2] searchResults=${sr2.length}, parsedItems=${items2.length}`);

        for (const s of MEDIA_SOURCES.slice(5)) send({ type: "source_status", source: s, status: "done" });

        // --- Phase 3: Merge & rank ---
        send({ type: "source_status_all", status: "ranking" });

        const allSearchResults = [...sr1, ...sr2];
        const allItems = [...items1, ...items2];
        console.log(`[Merge] total items before merge: ${allItems.length}, searchResults: ${allSearchResults.length}`);

        const merged = mergeItems(allItems);
        console.log(`[Merge] after dedup: ${merged.length}`);

        // Enrich URLs from search results (but don't filter out items)
        for (const item of merged) {
          item.urls = enrichUrls(item.urls, item.title, allSearchResults);
        }

        // Sort by recency, keep all items (even without URLs from search results)
        const sorted = merged
          .sort((a, b) => (a.hoursAgo ?? 99) - (b.hoursAgo ?? 99));

        const ranked = sorted.slice(0, 10).map((item, i) => ({
          rank: i + 1,
          title: item.title,
          urls: item.urls.length > 0 ? item.urls : [{ source: "検索結果", url: "" }],
          summary: item.summary,
          hoursAgo: item.hoursAgo,
        }));

        console.log(`[Result] ranked items: ${ranked.length}`);

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

const SYSTEM_PROMPT = `あなたはサッカーニュースの調査員です。日本語で回答してください。

重要ルール:
- 純粋なJSON配列のみ出力。前置き・説明・コードブロック(\`\`\`)は不要。
- URLは検索結果で見つかった実際のURLをそのまま使用してください。
- 同じニュースを複数メディアが報じている場合、urlsに全てのメディアURLを含める。
- 必ず5件以上出力してください。`;

type RawItem = {
  title: string;
  urls: SourceUrl[];
  summary: string;
  hoursAgo?: number;
};

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
    console.error("[parseResponseItems] No text content in response. Content types:", response.content.map((b) => b.type));
    // Fallback: build items from search results directly
    return buildItemsFromSearchResults(response);
  }

  let jsonStr = text.trim();

  // Remove markdown code block wrappers
  const cbm = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cbm) jsonStr = cbm[1].trim();

  // Try to find JSON array
  if (!jsonStr.startsWith("[")) {
    const m = jsonStr.match(/(\[[\s\S]*\])/);
    if (m) jsonStr = m[1];
  }

  // Try to find JSON object (single item)
  if (!jsonStr.startsWith("[") && jsonStr.startsWith("{")) {
    jsonStr = `[${jsonStr}]`;
  }

  try {
    const items = JSON.parse(jsonStr);
    if (!Array.isArray(items)) {
      console.error("[parseResponseItems] Parsed result is not array:", typeof items);
      return buildItemsFromSearchResults(response);
    }
    const parsed = items.map((item: Record<string, unknown>) => ({
      title: String(item.title || ""),
      urls: Array.isArray(item.urls)
        ? (item.urls as SourceUrl[]).filter((u) => u && u.url)
        : (item.url ? [{ source: String(item.source || ""), url: String(item.url) }] : []),
      summary: String(item.summary || ""),
      hoursAgo: typeof item.hoursAgo === "number" ? item.hoursAgo : undefined,
    }));
    console.log(`[parseResponseItems] Successfully parsed ${parsed.length} items`);
    return parsed;
  } catch (e) {
    console.error("[parseResponseItems] JSON parse failed:", e);
    console.error("[parseResponseItems] Raw text (first 1000 chars):", text.slice(0, 1000));
    // Fallback: build from search results
    return buildItemsFromSearchResults(response);
  }
}

/** Fallback: create news items directly from web search result blocks */
function buildItemsFromSearchResults(response: Anthropic.Message): RawItem[] {
  const items: RawItem[] = [];
  for (const block of response.content) {
    if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
      for (const r of block.content) {
        if (r.type === "web_search_result" && r.url && r.title) {
          const src = identifySource(r.url);
          if (src) {
            items.push({
              title: r.title,
              urls: [{ source: src, url: r.url }],
              summary: "",
              hoursAgo: undefined,
            });
          }
        }
      }
    }
  }
  console.log(`[buildItemsFromSearchResults] Built ${items.length} items from search results`);
  return items;
}

function mergeItems(items: RawItem[]): RawItem[] {
  const result: RawItem[] = [];

  for (const item of items) {
    if (!item.title) continue;
    const words = item.title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);

    const dup = result.find((existing) => {
      const ew = existing.title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
      let mc = 0;
      for (const w of words) {
        if (ew.some((e) => e.includes(w) || w.includes(e))) mc++;
      }
      return mc >= Math.min(3, Math.floor(words.length * 0.4));
    });

    if (dup) {
      for (const u of item.urls) {
        if (!dup.urls.some((eu) => eu.url === u.url)) dup.urls.push(u);
      }
      if (!dup.summary && item.summary) dup.summary = item.summary;
      if (item.hoursAgo != null && (dup.hoursAgo == null || item.hoursAgo < dup.hoursAgo)) {
        dup.hoursAgo = item.hoursAgo;
      }
    } else {
      result.push({ ...item, urls: [...item.urls] });
    }
  }

  return result;
}

/** Enrich item URLs with matching search results. Does NOT remove items. */
function enrichUrls(
  urls: SourceUrl[],
  title: string,
  searchResults: { url: string; title: string }[]
): SourceUrl[] {
  const result: SourceUrl[] = [];
  const seenUrls = new Set<string>();

  // Keep all existing URLs that look valid
  for (const u of urls) {
    if (u.url && u.url.startsWith("http") && !seenUrls.has(u.url)) {
      // Assign source name if missing
      if (!u.source) {
        u.source = identifySource(u.url) || "その他";
      }
      result.push(u);
      seenUrls.add(u.url);
    }
  }

  // Add matching URLs from search results
  const words = title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
  for (const sr of searchResults) {
    if (seenUrls.has(sr.url)) continue;
    const mc = words.filter((w) => sr.title.includes(w)).length;
    if (mc >= 2) {
      const src = identifySource(sr.url);
      result.push({ source: src || "その他", url: sr.url });
      seenUrls.add(sr.url);
    }
    if (result.length >= 5) break;
  }

  return result;
}

function identifySource(url: string): string | null {
  const map: [string, string][] = [
    ["gekisaka", "ゲキサカ"],
    ["soccerking", "サッカーキング"],
    ["news.yahoo.co.jp", "Yahoo!ニュース"],
    ["goal.com", "Goal.com"],
    ["ultra-soccer", "超WORLDサッカー"],
    ["football-lab", "Football LAB"],
    ["jleague.jp", "Jリーグ公式"],
    ["nikkansports.com", "日刊スポーツ"],
    ["hochi.news", "スポーツ報知"],
    ["footballista", "footballista"],
    ["sponichi", "スポニチ"],
    ["nhk.or.jp", "NHK"],
    ["sportsnavi", "スポーツナビ"],
    ["qoly", "Qoly"],
    ["mainichi", "毎日新聞"],
    ["asahi", "朝日新聞"],
    ["sankei", "産経新聞"],
    ["yomiuri", "読売新聞"],
    ["number.bunshun", "Number"],
    ["thedigestweb", "ダイジェスト"],
  ];
  for (const [domain, name] of map) {
    if (url.includes(domain)) return name;
  }
  return null;
}
