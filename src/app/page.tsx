"use client";

import Link from "next/link";
import { useMemo } from "react";
import scheduleData from "@/data/jleague-schedule.json";
import { j1Teams } from "@/data/j1-teams";

/* ---------- types ---------- */
interface Match {
  date: string;
  kickoff: string;
  home: string;
  away: string;
  stadium: string;
  matchday: string;
  category: string;
  categoryColor: string;
  score?: { home: number; away: number };
}

/* ---------- constants ---------- */
const CATEGORY_COLORS: Record<string, string> = {
  J1: "#003087",
  J2: "#00A651",
  J3: "#E8192C",
};

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

/* ---------- helpers ---------- */
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateHeading(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = DAY_LABELS[new Date(y, m - 1, d).getDay()];
  return { display: `${m}/${d}（${dow}）`, isWeekend: [0, 6].includes(new Date(y, m - 1, d).getDay()) };
}

/* ---------- component ---------- */
export default function Home() {
  const today = todayStr();

  // Find matches from today onward, grouped by date (show next 7 days with matches)
  const upcomingDays = useMemo(() => {
    const matches = scheduleData.matches as Match[];
    const grouped: { date: string; matches: Match[] }[] = [];
    let currentDate = "";
    let currentGroup: Match[] = [];

    for (const m of matches) {
      if (m.date < today) continue;
      if (grouped.length >= 7) break;

      if (m.date !== currentDate) {
        if (currentGroup.length > 0) {
          grouped.push({ date: currentDate, matches: currentGroup });
        }
        currentDate = m.date;
        currentGroup = [m];
      } else {
        currentGroup.push(m);
      }
    }
    if (currentGroup.length > 0 && grouped.length < 7) {
      grouped.push({ date: currentDate, matches: currentGroup });
    }

    return grouped;
  }, [today]);

  // Also get recent results (last 3 days with finished matches)
  const recentResults = useMemo(() => {
    const matches = scheduleData.matches as Match[];
    const grouped: { date: string; matches: Match[] }[] = [];
    let currentDate = "";
    let currentGroup: Match[] = [];

    // Go backwards from today
    for (let i = matches.length - 1; i >= 0; i--) {
      const m = matches[i];
      if (m.date >= today || !m.score) continue;
      if (grouped.length >= 3 && m.date !== currentDate) break;

      if (m.date !== currentDate) {
        if (currentGroup.length > 0) {
          grouped.push({ date: currentDate, matches: currentGroup.reverse() });
        }
        currentDate = m.date;
        currentGroup = [m];
      } else {
        currentGroup.push(m);
      }
    }
    if (currentGroup.length > 0) {
      grouped.push({ date: currentDate, matches: currentGroup.reverse() });
    }

    return grouped.reverse();
  }, [today]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "サムライフットボール",
    alternateName: "SAMURAI FOOTBALL",
    url: "https://samurai-football.jp",
    description: "Jリーグの試合日程カレンダー、クラブ情報、日本サッカーの最新情報をお届けする情報サイト",
    inLanguage: "ja",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1A1A2E] via-[#003087] to-[#1A1A2E] text-white py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
            SAMURAI FOOTBALL
          </h1>
          <p className="text-sm sm:text-base text-white/60 mb-6">
            Jリーグ &amp; 日本サッカー情報サイト
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/jleague/calendar"
              className="inline-flex items-center px-6 py-2.5 bg-white text-[#003087] font-bold rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              カレンダーを見る
            </Link>
            <Link
              href="/jleague"
              className="inline-flex items-center px-6 py-2.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              J1クラブ一覧
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Recent results */}
        {recentResults.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gray-400 rounded-full inline-block" />
              最近の結果
            </h2>
            <div className="space-y-4">
              {recentResults.map(({ date, matches }) => (
                <DateMatchGroup key={date} date={date} matches={matches} showScore />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming matches */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 rounded-full inline-block" />
            今後の試合
          </h2>
          {upcomingDays.length === 0 ? (
            <p className="text-sm text-gray-400">今後の試合情報はありません</p>
          ) : (
            <div className="space-y-4">
              {upcomingDays.map(({ date, matches }) => (
                <DateMatchGroup key={date} date={date} matches={matches} showScore={false} />
              ))}
            </div>
          )}
          <div className="mt-6 text-center">
            <Link
              href="/jleague/calendar"
              className="text-sm font-bold text-[#003087] hover:underline"
            >
              全日程をカレンダーで見る →
            </Link>
          </div>
        </section>

        {/* Quick links to J1 teams */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#003087] rounded-full inline-block" />
            J1クラブ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {j1Teams.map((team) => (
              <Link
                key={team.id}
                href={`/jleague/team/${team.id}`}
                className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-sm font-medium text-gray-800"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: team.color }}
                />
                <span className="truncate">{team.shortName}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* W杯2026 Archive link */}
        <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">FIFA W杯 2026 アーカイブ</h3>
              <p className="text-sm text-gray-500 mt-1">
                2026年FIFAワールドカップの全試合結果、トーナメント表、出場国情報
              </p>
            </div>
            <Link
              href="/archive/wc2026"
              className="shrink-0 px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-white transition-colors"
            >
              見る →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- sub-components ---------- */
function DateMatchGroup({
  date,
  matches,
  showScore,
}: {
  date: string;
  matches: Match[];
  showScore: boolean;
}) {
  const { display } = formatDateHeading(date);
  const today = todayStr();
  const isToday = date === today;

  // Group by category
  const byCategory: Record<string, Match[]> = {};
  for (const m of matches) {
    if (!byCategory[m.category]) byCategory[m.category] = [];
    byCategory[m.category].push(m);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div
        className={`px-4 py-2 border-b border-gray-100 flex items-center gap-2 ${
          isToday ? "bg-blue-50" : "bg-gray-50"
        }`}
      >
        <span className={`text-sm font-bold ${isToday ? "text-blue-600" : "text-gray-700"}`}>
          {isToday && "TODAY "}
          {display}
        </span>
        <span className="text-xs text-gray-400">
          {matches.length}試合
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {Object.entries(byCategory).map(([cat, catMatches]) => (
          <div key={cat}>
            <div className="px-4 py-1.5 flex items-center gap-2">
              <span
                className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
                style={{ backgroundColor: CATEGORY_COLORS[cat] || "#666" }}
              >
                {cat}
              </span>
              <span className="text-xs text-gray-400">{catMatches[0].matchday}</span>
            </div>
            {catMatches.map((m, i) => (
              <div
                key={i}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-50/50"
              >
                <span className="text-xs text-gray-400 w-12 shrink-0">{m.kickoff}</span>
                <span className="font-medium text-gray-800 text-right flex-1 truncate">
                  {m.home}
                </span>
                <span className="mx-2 text-xs shrink-0">
                  {showScore && m.score ? (
                    <span className="font-bold text-gray-700">
                      {m.score.home} - {m.score.away}
                    </span>
                  ) : (
                    <span className="text-gray-400">vs</span>
                  )}
                </span>
                <span className="font-medium text-gray-800 flex-1 truncate">{m.away}</span>
                <span className="text-xs text-gray-400 ml-2 hidden sm:block shrink-0 max-w-[120px] truncate">
                  {m.stadium}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
