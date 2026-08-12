#!/usr/bin/env node
/**
 * Jリーグ試合日程スクレイパー
 * data.j-league.or.jp から J1/J2/J3 の試合日程を取得し、JSONファイルに保存する
 *
 * 使い方: node scripts/scrape-jleague.mjs
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const COMPETITIONS = [
  { id: 1, name: "J1", color: "#003087" },
  { id: 2, name: "J2", color: "#00A651" },
  { id: 3, name: "J3", color: "#E8192C" },
];

const BASE_URL = "https://data.j-league.or.jp/SFMS01/search";
const YEAR = 2026;

function parseHTML(html) {
  const matches = [];
  // <tbody>...</tbody> の中身を抽出
  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/);
  if (!tbodyMatch) return matches;

  const tbody = tbodyMatch[1];
  // 各行を分割
  const rows = tbody.split(/<tr>/g).filter((r) => r.includes("<td"));

  for (const row of rows) {
    const cells = [];
    // 各セルの中身を抽出（タグ内テキスト）
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
    let m;
    while ((m = tdRegex.exec(row)) !== null) {
      // HTMLタグを除去してテキストのみ取得
      let text = m[1].replace(/<[^>]+>/g, "").trim();
      // 全角英数を半角に変換
      text = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0xfee0)
      );
      cells.push(text);
    }

    if (cells.length < 8) continue;

    // cells: [シーズン, 大会, 節, 試合日, K/O時刻, ホーム, スコア, アウェイ, スタジアム, 入場者数, 放送]
    const competition = cells[1].trim();
    const matchday = cells[2].trim();
    const dateStr = cells[3].trim(); // "26/08/07(金)"
    const kickoff = cells[4].trim(); // "19:26"
    const home = cells[5].trim();
    const score = cells[6].trim(); // "3-4" or "vs" or ""
    const away = cells[7].trim();
    const stadium = cells[8] ? cells[8].trim() : "";

    // 日付をパース: "26/08/07(金)" -> "2026-08-07"
    const dateMatch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{2})/);
    if (!dateMatch) continue;
    const date = `20${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;

    const match = {
      date,
      kickoff,
      home,
      away,
      stadium,
      matchday,
      competition,
    };

    // スコアがあれば追加
    if (score && score !== "vs" && score.includes("-")) {
      const [h, a] = score.split("-").map(Number);
      if (!isNaN(h) && !isNaN(a)) {
        match.score = { home: h, away: a };
      }
    }

    matches.push(match);
  }

  return matches;
}

async function fetchCompetition(comp) {
  const url = `${BASE_URL}?competition_years=${YEAR}&competition_frame_ids=${comp.id}&home_away_club_flag=0`;
  console.log(`  Fetching ${comp.name}...`);

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`  Error fetching ${comp.name}: ${res.status}`);
    return [];
  }

  const html = await res.text();
  const matches = parseHTML(html);
  console.log(`  ${comp.name}: ${matches.length} matches found`);

  return matches.map((m) => ({
    ...m,
    category: comp.name,
    categoryColor: comp.color,
  }));
}

async function main() {
  console.log("Jリーグ試合日程スクレイピング開始...\n");

  const allMatches = [];

  for (const comp of COMPETITIONS) {
    const matches = await fetchCompetition(comp);
    allMatches.push(...matches);
  }

  // 日付順にソート
  allMatches.sort((a, b) => {
    const d = a.date.localeCompare(b.date);
    if (d !== 0) return d;
    return a.kickoff.localeCompare(b.kickoff);
  });

  const output = {
    updatedAt: new Date().toISOString(),
    season: `${YEAR}/${YEAR + 1 - 2000}`,
    totalMatches: allMatches.length,
    matches: allMatches,
  };

  const outPath = resolve(__dirname, "../src/data/jleague-schedule.json");
  writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");

  console.log(`\n合計 ${allMatches.length} 試合を保存しました → ${outPath}`);
}

main().catch(console.error);
