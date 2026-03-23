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
        // Send media list so client can render cards
        send({ type: "init", sources: MEDIA_SOURCES });

        // --- Phase 1: Broad search for top stories ---
        send({ type: "source_status", source: "ゲキサカ", status: "searching" });
        send({ type: "source_status", source: "サッカーキング", status: "searching" });
        send({ type: "source_status", source: "Yahoo!ニュース", status: "searching" });
        send({ type: "source_status", source: "Goal.com日本版", status: "searching" });
        send({ type: "source_status", source: "超WORLDサッカー", status: "searching" });

        const r1 = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: `直近48時間の日本サッカーに関するニュースをウェブ検索してください。

以下の検索を実行してください:
1. "日本サッカー 最新ニュース 2026" — 全般的なトレンド
2. "日本代表 サッカー 速報" — 代表関連
3. "Jリーグ 結果 移籍 ニュース" — Jリーグ関連
4. "サッカー 海外組 日本人" — 海外組関連

各ニュースについて、同じニュースを報じている複数のメディアURLをできるだけ集めてください。

以下のJSON形式で10件出力してください:
[
  {
    "title": "ニュースのタイトル",
    "urls": [
      {"source": "メディア名", "url": "実際のURL"},
      {"source": "別のメディア名", "url": "実際のURL"}
    ],
    "summary": "200〜300文字の概要",
    "hoursAgo": 推定何時間前のニュースか(数値)
  }
]`,
          }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 5 }],
        });

        const sr1 = extractSearchResults(r1);
        const items1 = parseResponseItems(r1);

        send({ type: "source_status", source: "ゲキサカ", status: "done" });
        send({ type: "source_status", source: "サッカーキング", status: "done" });
        send({ type: "source_status", source: "Yahoo!ニュース", status: "done" });
        send({ type: "source_status", source: "Goal.com日本版", status: "done" });
        send({ type: "source_status", source: "超WORLDサッカー", status: "done" });
        send({ type: "progress", found: items1.length });

        // --- Phase 2: Additional sources ---
        send({ type: "source_status", source: "Football LAB", status: "searching" });
        send({ type: "source_status", source: "Jリーグ公式", status: "searching" });
        send({ type: "source_status", source: "日刊スポーツ", status: "searching" });
        send({ type: "source_status", source: "スポーツ報知", status: "searching" });
        send({ type: "source_status", source: "footballista", status: "searching" });

        const r2 = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: `直近48時間のサッカーニュースを以下のメディアから検索してください:

1. "site:nikkansports.com サッカー" — 日刊スポーツ
2. "site:hochi.news サッカー" — スポーツ報知
3. "site:footballista.jp" — footballista
4. "site:jleague.jp ニュース" — Jリーグ公式
5. "site:football-lab.jp" — Football LAB

各記事に複数のメディアURLを含めてください。同じ話題の記事は統合してURLを追加すること。

以下のJSON形式で最大10件:
[
  {
    "title": "ニュースのタイトル",
    "urls": [
      {"source": "メディア名", "url": "実際のURL"}
    ],
    "summary": "200〜300文字の概要",
    "hoursAgo": 推定何時間前のニュースか(数値)
  }
]`,
          }],
          tools: [{ type: "web_search_20250305" as const, name: "web_search", max_uses: 5 }],
        });

        const sr2 = extractSearchResults(r2);
        const items2 = parseResponseItems(r2);

        send({ type: "source_status", source: "Football LAB", status: "done" });
        send({ type: "source_status", source: "Jリーグ公式", status: "done" });
        send({ type: "source_status", source: "日刊スポーツ", status: "done" });
        send({ type: "source_status", source: "スポーツ報知", status: "done" });
        send({ type: "source_status", source: "footballista", status: "done" });

        // --- Phase 3: Merge, validate, rank ---
        send({ type: "source_status_all", status: "ranking" });

        const allSearchResults = [...sr1, ...sr2];
        const merged = mergeItems([...items1, ...items2]);

        // Validate URLs and enrich with search results
        for (const item of merged) {
          item.urls = validateAndEnrichUrls(item.urls, item.title, allSearchResults);
        }

        // Filter items with at least 1 valid URL, sort by recency
        const valid = merged
          .filter((item) => item.urls.length >= 1)
          .sort((a, b) => (a.hoursAgo ?? 48) - (b.hoursAgo ?? 48));

        const ranked = valid.slice(0, 10).map((item, i) => ({
          rank: i + 1,
          title: item.title,
          urls: item.urls,
          summary: item.summary,
          hoursAgo: item.hoursAgo,
        }));

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
- URLは検索結果で見つかった実際のURLのみ使用。推測・捏造は厳禁。
- 同じニュースを複数メディアが報じている場合、urlsに全てのメディアURLを含める。
- 見つからない場合は空配列 [] を返す。`;

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

  let jsonStr = text.trim();
  const cbm = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (cbm) jsonStr = cbm[1].trim();
  if (!jsonStr.startsWith("[")) {
    const m = jsonStr.match(/(\[[\s\S]*\])/);
    if (m) jsonStr = m[1];
  }

  try {
    const items = JSON.parse(jsonStr);
    if (!Array.isArray(items)) return [];
    return items.map((item: Record<string, unknown>) => ({
      title: String(item.title || ""),
      urls: Array.isArray(item.urls) ? (item.urls as SourceUrl[]).filter((u) => u.url && u.source) : [],
      summary: String(item.summary || ""),
      hoursAgo: typeof item.hoursAgo === "number" ? item.hoursAgo : undefined,
    }));
  } catch {
    console.error("Parse failed:", text.slice(0, 500));
    return [];
  }
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
      // Merge URLs
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

function validateAndEnrichUrls(
  urls: SourceUrl[],
  title: string,
  searchResults: { url: string; title: string }[]
): SourceUrl[] {
  const validated: SourceUrl[] = [];
  const seenUrls = new Set<string>();

  // Validate existing URLs
  for (const u of urls) {
    if (!u.url || !u.url.startsWith("http") || seenUrls.has(u.url)) continue;
    // Check if URL exists in search results or has a known domain
    const inResults = searchResults.some((sr) => sr.url === u.url);
    const hasKnownDomain = KNOWN_DOMAINS.some((d) => u.url.includes(d));
    if (inResults || hasKnownDomain) {
      validated.push(u);
      seenUrls.add(u.url);
    }
  }

  // Enrich: find more URLs from search results matching this title
  if (validated.length < 3) {
    const words = title.split(/[\s、。・「」『』（）\(\)【】]+/).filter((w) => w.length >= 3);
    for (const sr of searchResults) {
      if (seenUrls.has(sr.url)) continue;
      const mc = words.filter((w) => sr.title.includes(w)).length;
      if (mc >= 2) {
        const src = identifySource(sr.url);
        if (src) {
          validated.push({ source: src, url: sr.url });
          seenUrls.add(sr.url);
        }
      }
      if (validated.length >= 5) break;
    }
  }

  return validated;
}

const KNOWN_DOMAINS = [
  "gekisaka", "soccerking", "yahoo.co.jp", "goal.com", "ultra-soccer",
  "football-lab", "jleague.jp", "nikkansports.com", "hochi.news",
  "footballista", "sponichi", "mainichi", "asahi", "nhk.or.jp",
  "sportsnavi", "web.gekisaka", "qoly",
];

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
  ];
  for (const [domain, name] of map) {
    if (url.includes(domain)) return name;
  }
  return null;
}
