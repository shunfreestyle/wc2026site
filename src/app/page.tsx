"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
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

type Category = "J1" | "J2" | "J3";

/* ---------- constants ---------- */
const CATEGORIES: { key: Category; label: string; color: string }[] = [
  { key: "J1", label: "J1", color: "#003087" },
  { key: "J2", label: "J2", color: "#00A651" },
  { key: "J3", label: "J3", color: "#E8192C" },
];

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
const MS_PER_DAY = 86400000;

/* ---------- helpers ---------- */
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getMonday(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d.getTime() + diff * MS_PER_DAY);
  return formatDate(monday);
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return formatDate(d);
}

function formatDateLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = DAY_LABELS[new Date(y, m - 1, d).getDay()];
  return `${m}/${d}（${dow}）`;
}

function formatWeekLabel(mondayStr: string): string {
  const [, m1, d1] = mondayStr.split("-").map(Number);
  const sunday = addDays(mondayStr, 6);
  const [, m2, d2] = sunday.split("-").map(Number);
  return `${m1}/${d1} - ${m2}/${d2}`;
}

/* ---------- component ---------- */
export default function Home() {
  const today = todayStr();
  const currentMonday = getMonday(today);
  const [weekStart, setWeekStart] = useState(currentMonday);
  const [activeFilters, setActiveFilters] = useState<Set<Category>>(new Set(["J1", "J2", "J3"]));

  const weekEnd = addDays(weekStart, 6);
  const isCurrentWeek = weekStart === currentMonday;

  // Get matches for the selected week, filtered
  const weekMatches = useMemo(() => {
    const matches = scheduleData.matches as Match[];
    return matches.filter(
      (m) =>
        m.date >= weekStart &&
        m.date <= weekEnd &&
        activeFilters.has(m.category as Category)
    );
  }, [weekStart, weekEnd, activeFilters]);

  // Group by date
  const groupedByDate = useMemo(() => {
    const groups: { date: string; matches: Match[] }[] = [];
    let currentDate = "";
    let currentGroup: Match[] = [];

    for (const m of weekMatches) {
      if (m.date !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, matches: currentGroup });
        }
        currentDate = m.date;
        currentGroup = [m];
      } else {
        currentGroup.push(m);
      }
    }
    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, matches: currentGroup });
    }
    return groups;
  }, [weekMatches]);

  const toggleFilter = (cat: Category) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const prevWeek = () => setWeekStart(addDays(weekStart, -7));
  const nextWeek = () => setWeekStart(addDays(weekStart, 7));
  const goToCurrentWeek = () => setWeekStart(currentMonday);

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
      <section className="bg-gradient-to-r from-[#1A1A2E] via-[#003087] to-[#1A1A2E] text-white py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-1">
            SAMURAI FOOTBALL
          </h1>
          <p className="text-xs sm:text-sm text-white/50">
            Jリーグ &amp; 日本サッカー情報サイト
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Week navigation + filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          {/* Week nav */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevWeek}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="前の週"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <div className="text-center min-w-[140px]">
              <p className="text-sm font-bold text-gray-900">{formatWeekLabel(weekStart)}</p>
              {!isCurrentWeek && (
                <button
                  onClick={goToCurrentWeek}
                  className="text-[10px] text-[#003087] font-bold hover:underline cursor-pointer"
                >
                  今週に戻る
                </button>
              )}
            </div>
            <button
              onClick={nextWeek}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="次の週"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = activeFilters.has(cat.key);
              return (
                <button
                  key={cat.key}
                  onClick={() => toggleFilter(cat.key)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all cursor-pointer"
                  style={{
                    borderColor: cat.color,
                    backgroundColor: active ? cat.color : "transparent",
                    color: active ? "#fff" : cat.color,
                    opacity: active ? 1 : 0.4,
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Match list by date */}
        {groupedByDate.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-base font-bold mb-1">この週の試合はありません</p>
            <p className="text-sm">別の週を選択するか、フィルターを変更してください</p>
          </div>
        ) : (
          <div className="space-y-3">
            {groupedByDate.map(({ date, matches }) => {
              const isToday = date === today;
              // Group by category within a day
              const byCategory: Record<string, Match[]> = {};
              for (const m of matches) {
                if (!byCategory[m.category]) byCategory[m.category] = [];
                byCategory[m.category].push(m);
              }

              return (
                <div
                  key={date}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Date header */}
                  <div
                    className={`px-4 py-2 border-b border-gray-100 flex items-center gap-2 ${
                      isToday ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    {isToday && (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                        TODAY
                      </span>
                    )}
                    <span className={`text-sm font-bold ${isToday ? "text-blue-600" : "text-gray-700"}`}>
                      {formatDateLabel(date)}
                    </span>
                    <span className="text-xs text-gray-400">{matches.length}試合</span>
                  </div>

                  {/* Matches grouped by category */}
                  <div className="divide-y divide-gray-50">
                    {Object.entries(byCategory).map(([cat, catMatches]) => {
                      const catInfo = CATEGORIES.find((c) => c.key === cat);
                      return (
                        <div key={cat}>
                          <div className="px-4 py-1.5 flex items-center gap-2">
                            <span
                              className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: catInfo?.color || "#666" }}
                            >
                              {cat}
                            </span>
                            <span className="text-xs text-gray-400">
                              {catMatches[0].matchday}
                            </span>
                          </div>
                          {catMatches.map((m, i) => (
                            <div
                              key={i}
                              className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50/50"
                            >
                              <span className="text-xs text-gray-400 w-12 shrink-0">
                                {m.kickoff}
                              </span>
                              <span className="font-medium text-gray-800 text-right flex-1 truncate">
                                {m.home}
                              </span>
                              <span className="mx-2 text-xs shrink-0">
                                {m.score ? (
                                  <span className="font-bold text-gray-700">
                                    {m.score.home} - {m.score.away}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">vs</span>
                                )}
                              </span>
                              <span className="font-medium text-gray-800 flex-1 truncate">
                                {m.away}
                              </span>
                              <span className="text-xs text-gray-400 ml-2 hidden sm:block shrink-0 max-w-[120px] truncate">
                                {m.stadium}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* J1 standings link */}
          <Link
            href="/jleague"
            className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-[#003087] hover:shadow-sm transition-all group"
          >
            <span className="w-10 h-10 rounded-lg bg-[#003087]/10 flex items-center justify-center text-[#003087] font-extrabold text-sm shrink-0">
              J1
            </span>
            <div>
              <p className="font-bold text-gray-900 text-sm group-hover:text-[#003087] transition-colors">J1 順位表</p>
              <p className="text-xs text-gray-400 mt-0.5">全20クラブの順位・成績</p>
            </div>
          </Link>

          {/* Calendar link */}
          <Link
            href="/jleague/calendar"
            className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-[#003087] hover:shadow-sm transition-all group"
          >
            <span className="w-10 h-10 rounded-lg bg-[#003087]/10 flex items-center justify-center text-lg shrink-0">
              📅
            </span>
            <div>
              <p className="font-bold text-gray-900 text-sm group-hover:text-[#003087] transition-colors">カレンダー</p>
              <p className="text-xs text-gray-400 mt-0.5">月間カレンダーで日程を確認</p>
            </div>
          </Link>
        </div>

        {/* J1 teams quick access */}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-gray-500 mb-3">J1クラブ</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
            {j1Teams.map((team) => (
              <Link
                key={team.id}
                href={`/jleague/team/${team.id}`}
                className="flex items-center gap-1.5 px-2 py-2 bg-white rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all text-xs font-medium text-gray-700"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: team.color }}
                />
                <span className="truncate">{team.shortName}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* W杯 Archive */}
        <div className="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">FIFA W杯 2026 アーカイブ</h3>
              <p className="text-xs text-gray-500 mt-0.5">全試合結果・トーナメント表・出場国情報</p>
            </div>
            <Link
              href="/archive/wc2026"
              className="shrink-0 px-3 py-1.5 text-xs font-bold text-gray-600 border border-gray-300 rounded-lg hover:bg-white transition-colors"
            >
              見る →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
