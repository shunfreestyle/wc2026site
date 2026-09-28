"use client";

import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import scheduleData from "@/data/jleague-schedule.json";
import { j1Teams } from "@/data/j1-teams";
import { generateMatchId, getMatchDetailById } from "@/data/jleague-match-details";

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

type Category = "J1" | "J2" | "J3" | "天皇杯" | "ルヴァン" | "日本代表" | "アジア大会";

/* ---------- constants ---------- */
const CATEGORIES: { key: Category; label: string; color: string }[] = [
  { key: "J1", label: "J1", color: "#003087" },
  { key: "J2", label: "J2", color: "#00A651" },
  { key: "J3", label: "J3", color: "#E8192C" },
  { key: "天皇杯", label: "天皇杯", color: "#FFB800" },
  { key: "ルヴァン", label: "ルヴァン", color: "#8B5CF6" },
  { key: "日本代表", label: "代表", color: "#1E3A5F" },
  { key: "アジア大会", label: "アジア大会", color: "#E91E63" },
];

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

const MONTHS = [
  { year: 2026, month: 8 },
  { year: 2026, month: 9 },
  { year: 2026, month: 10 },
  { year: 2026, month: 11 },
  { year: 2026, month: 12 },
  { year: 2027, month: 1 },
  { year: 2027, month: 2 },
  { year: 2027, month: 3 },
  { year: 2027, month: 4 },
  { year: 2027, month: 5 },
  { year: 2027, month: 6 },
];

/* ---------- helpers ---------- */
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateLabel(dateStr: string): string {
  const [, m, d] = dateStr.split("-").map(Number);
  const dow = DAY_LABELS[new Date(dateStr + "T00:00:00").getDay()];
  return `${m}/${d}（${dow}）`;
}

function formatDateLabelLong(dateStr: string): string {
  const [, m, d] = dateStr.split("-").map(Number);
  const dow = DAY_LABELS[new Date(dateStr + "T00:00:00").getDay()];
  return `${m}月${d}日（${dow}）`;
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startDow = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: { date: string; inMonth: boolean; day: number }[] = [];

  if (startDow > 0) {
    const prevLast = new Date(year, month - 1, 0).getDate();
    for (let i = startDow - 1; i >= 0; i--) {
      const d = prevLast - i;
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      days.push({
        date: `${prevYear}-${String(prevMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        inMonth: false,
        day: d,
      });
    }
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      inMonth: true,
      day: d,
    });
  }

  const endDow = new Date(year, month - 1, daysInMonth).getDay();
  if (endDow < 6) {
    for (let d = 1; d <= 6 - endDow; d++) {
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      days.push({
        date: `${nextYear}-${String(nextMonth).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        inMonth: false,
        day: d,
      });
    }
  }

  return days;
}

/* ---------- component ---------- */
export default function Home() {
  const today = todayStr();
  const currentDate = new Date();
  const initialMonthIdx = MONTHS.findIndex(
    (m) => m.year === currentDate.getFullYear() && m.month === currentDate.getMonth() + 1
  );

  const [monthIdx, setMonthIdx] = useState(Math.max(0, initialMonthIdx));
  const [activeFilters, setActiveFilters] = useState<Set<Category>>(
    new Set(["J1", "J2", "J3", "天皇杯", "ルヴァン", "日本代表", "アジア大会"])
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(today);

  const matchListRef = useRef<HTMLDivElement>(null);

  const { year, month } = MONTHS[monthIdx];

  // All matches indexed by date
  const matchesByDate = useMemo(() => {
    const map: Record<string, Match[]> = {};
    for (const m of scheduleData.matches as Match[]) {
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    }
    return map;
  }, []);

  // Filtered matches indexed by date
  const filteredByDate = useMemo(() => {
    const map: Record<string, Match[]> = {};
    for (const m of scheduleData.matches as Match[]) {
      if (!activeFilters.has(m.category as Category)) continue;
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    }
    return map;
  }, [activeFilters]);

  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);

  // Matches to show in the list
  const displayMatches = useMemo(() => {
    if (selectedDate) {
      const matches = filteredByDate[selectedDate] || [];
      return [{ date: selectedDate, matches }];
    }
    // No date selected: show all matches in current month
    const groups: { date: string; matches: Match[] }[] = [];
    const sortedDates = Object.keys(filteredByDate).sort();
    const monthPrefix = `${year}-${String(month).padStart(2, "0")}`;
    for (const date of sortedDates) {
      if (date.startsWith(monthPrefix)) {
        groups.push({ date, matches: filteredByDate[date] });
      }
    }
    return groups;
  }, [selectedDate, filteredByDate, year, month]);

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

  const handleDateClick = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
      // Scroll match list into view on mobile
      setTimeout(() => {
        matchListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // When month changes, clear selected date
  const handleMonthChange = (newIdx: number) => {
    setMonthIdx(newIdx);
    setSelectedDate(null);
  };

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
      <section className="bg-gradient-to-r from-[#1A1A2E] via-[#003087] to-[#1A1A2E] text-white py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-1">
            SAMURAI FOOTBALL
          </h1>
          <p className="text-xs sm:text-sm text-white/50">
            Jリーグ &amp; 日本サッカー情報サイト
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          <span className="text-xs font-bold text-gray-500 mr-1">表示:</span>
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

        {/* Main layout: Calendar + Matches */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ═══ LEFT: Match list ═══ */}
          <div ref={matchListRef} className="flex-1 min-w-0 order-2 lg:order-1">
            {/* Title */}
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedDate
                  ? `${formatDateLabelLong(selectedDate)} の試合`
                  : `${year}年${month}月の試合`}
              </h2>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  ✕ 絞り込み解除
                </button>
              )}
            </div>

            {displayMatches.length === 0 || (displayMatches.length === 1 && displayMatches[0].matches.length === 0) ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm font-bold text-gray-400 mb-1">試合はありません</p>
                <p className="text-xs text-gray-300">別の日付を選択するか、フィルターを変更してください</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayMatches.map(({ date, matches }) => {
                  if (matches.length === 0) return null;
                  const isToday = date === today;
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
                        {CATEGORIES.filter((c) => activeFilters.has(c.key)).map((cat) => {
                          const catMatches = byCategory[cat.key];
                          if (!catMatches || catMatches.length === 0) return null;
                          return (
                            <div key={cat.key}>
                              <div className="px-4 py-1.5 flex items-center gap-2">
                                <span
                                  className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
                                  style={{ backgroundColor: cat.color, color: cat.key === "天皇杯" ? "#1a1a1a" : "#fff" }}
                                >
                                  {cat.key}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {catMatches[0].matchday}
                                </span>
                              </div>
                              {catMatches.map((m, i) => {
                                const mid = generateMatchId(m.date, m.home);
                                const hasDetail = m.score && getMatchDetailById(mid);
                                const row = (
                                  <>
                                    <span className="text-xs text-gray-400 w-12 shrink-0">
                                      {m.kickoff}
                                    </span>
                                    <span className="font-medium text-gray-800 text-right flex-1 min-w-0 truncate">
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
                                    <span className="font-medium text-gray-800 flex-1 min-w-0 truncate">
                                      {m.away}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-2 hidden sm:block shrink-0 max-w-[100px] truncate">
                                      {m.stadium}
                                    </span>
                                    {hasDetail && (
                                      <span className="text-[9px] text-blue-500 ml-1 shrink-0">▶</span>
                                    )}
                                  </>
                                );
                                return hasDetail ? (
                                  <Link
                                    key={i}
                                    href={`/jleague/match/${mid}`}
                                    className="flex items-center px-4 py-2.5 text-sm hover:bg-blue-50/50 transition-colors"
                                  >
                                    {row}
                                  </Link>
                                ) : (
                                  <div key={i} className="flex items-center px-4 py-2.5 text-sm">
                                    {row}
                                  </div>
                                );
                              })}
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
              <Link
                href="/archive/wc2026"
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-[#003087] hover:shadow-sm transition-all group"
              >
                <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg shrink-0">
                  🏆
                </span>
                <div>
                  <p className="font-bold text-gray-900 text-sm group-hover:text-[#003087] transition-colors">W杯 2026 アーカイブ</p>
                  <p className="text-xs text-gray-400 mt-0.5">全試合結果・トーナメント表</p>
                </div>
              </Link>
            </div>

            {/* J1 teams */}
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
          </div>

          {/* ═══ RIGHT: Calendar (sticky on desktop) ═══ */}
          <div className="w-full lg:w-[340px] shrink-0 order-1 lg:order-2">
            <div className="lg:sticky lg:top-4">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => handleMonthChange(Math.max(0, monthIdx - 1))}
                  disabled={monthIdx === 0}
                  className="px-2 py-1 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
                >
                  ‹
                </button>
                <h2 className="text-base font-bold text-gray-900">
                  {year}年{month}月
                </h2>
                <button
                  onClick={() => handleMonthChange(Math.min(MONTHS.length - 1, monthIdx + 1))}
                  disabled={monthIdx === MONTHS.length - 1}
                  className="px-2 py-1 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
                >
                  ›
                </button>
              </div>

              {/* Calendar grid */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-gray-200">
                  {DAY_LABELS.map((d, i) => (
                    <div
                      key={d}
                      className={`text-center text-[10px] font-bold py-1.5 ${
                        i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7">
                  {calendarDays.map(({ date, inMonth, day }) => {
                    const dayMatches = filteredByDate[date] || [];
                    const allDayMatches = matchesByDate[date] || [];
                    const isToday = date === today;
                    const isSelected = date === selectedDate;
                    const dow = new Date(date + "T00:00:00").getDay();
                    const hasMatches = dayMatches.length > 0;
                    const dayCats = [...new Set(dayMatches.map((m) => m.category))] as Category[];

                    return (
                      <button
                        key={date}
                        onClick={() => handleDateClick(date)}
                        className={`relative min-h-[52px] p-1 border-b border-r border-gray-100 text-left transition-all cursor-pointer ${
                          !inMonth ? "bg-gray-50/50" : "bg-white"
                        } ${isSelected
                          ? "ring-2 ring-inset ring-blue-500 bg-blue-50"
                          : hasMatches
                            ? "hover:bg-blue-50/40"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-medium block mb-0.5 ${
                            !inMonth
                              ? "text-gray-300"
                              : isToday
                                ? "text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold"
                                : dow === 0
                                  ? "text-red-500"
                                  : dow === 6
                                    ? "text-blue-500"
                                    : "text-gray-700"
                          }`}
                        >
                          {day}
                        </span>
                        {dayCats.length > 0 && (
                          <div className="flex flex-wrap gap-px">
                            {dayCats.map((cat) => {
                              const catInfo = CATEGORIES.find((c) => c.key === cat);
                              return (
                                <span
                                  key={cat}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: catInfo?.color || "#666" }}
                                />
                              );
                            })}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-2 mt-2 px-1">
                {CATEGORIES.filter((c) => activeFilters.has(c.key)).map((cat) => (
                  <div key={cat.key} className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-[10px] text-gray-400">{cat.label}</span>
                  </div>
                ))}
              </div>

              {/* Today button */}
              {selectedDate !== today && (
                <button
                  onClick={() => {
                    const todayMonth = MONTHS.findIndex(
                      (m) => m.year === currentDate.getFullYear() && m.month === currentDate.getMonth() + 1
                    );
                    if (todayMonth >= 0) setMonthIdx(todayMonth);
                    setSelectedDate(today);
                  }}
                  className="w-full mt-3 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  📅 今日に戻る
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
