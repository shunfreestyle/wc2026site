"use client";

import { useState, useMemo } from "react";
import scheduleData from "@/data/jleague-schedule.json";

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
function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const startDow = firstDay.getDay(); // 0=Sun
  const daysInMonth = lastDay.getDate();

  const days: { date: string; inMonth: boolean; day: number }[] = [];

  // Padding from previous month
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

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      inMonth: true,
      day: d,
    });
  }

  // Padding from next month
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

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateLabel(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = DAY_LABELS[new Date(y, m - 1, d).getDay()];
  return `${m}月${d}日（${dow}）`;
}

/* ---------- component ---------- */
export default function CalendarPage() {
  const today = todayStr();
  const currentDate = new Date();
  const initialMonthIdx = MONTHS.findIndex(
    (m) => m.year === currentDate.getFullYear() && m.month === currentDate.getMonth() + 1
  );

  const [monthIdx, setMonthIdx] = useState(Math.max(0, initialMonthIdx));
  const [activeFilters, setActiveFilters] = useState<Set<Category>>(
    new Set(["J1", "J2", "J3"])
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { year, month } = MONTHS[monthIdx];

  // Build a map of date -> matches (filtered)
  const matchesByDate = useMemo(() => {
    const map: Record<string, Match[]> = {};
    for (const m of scheduleData.matches as Match[]) {
      if (!activeFilters.has(m.category as Category)) continue;
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    }
    return map;
  }, [activeFilters]);

  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);

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

  const selectedMatches = selectedDate ? (matchesByDate[selectedDate] || []) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Jリーグ カレンダー</h1>
      <p className="text-sm text-gray-500 mb-5">
        {scheduleData.season}シーズン 試合日程
        <span className="text-xs text-gray-400 ml-2">
          最終更新: {new Date(scheduleData.updatedAt).toLocaleDateString("ja-JP")}
        </span>
      </p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
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
                opacity: active ? 1 : 0.5,
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
          disabled={monthIdx === 0}
          className="px-3 py-1.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
        >
          ← 前月
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          {year}年{month}月
        </h2>
        <button
          onClick={() => setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1))}
          disabled={monthIdx === MONTHS.length - 1}
          className="px-3 py-1.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-default"
        >
          翌月 →
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {DAY_LABELS.map((d, i) => (
            <div
              key={d}
              className={`text-center text-xs font-bold py-2 ${
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
            const dayMatches = matchesByDate[date] || [];
            const isToday = date === today;
            const isSelected = date === selectedDate;
            const dow = new Date(date).getDay();

            // Get unique categories for this day
            const dayCats = [...new Set(dayMatches.map((m) => m.category))] as Category[];

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(isSelected ? null : date)}
                className={`relative min-h-[70px] sm:min-h-[85px] p-1 sm:p-1.5 border-b border-r border-gray-100 text-left transition-colors cursor-pointer ${
                  !inMonth ? "bg-gray-50" : "bg-white hover:bg-blue-50/30"
                } ${isSelected ? "ring-2 ring-inset ring-blue-500 bg-blue-50" : ""}`}
              >
                <span
                  className={`text-xs sm:text-sm font-medium block ${
                    !inMonth
                      ? "text-gray-300"
                      : isToday
                        ? "text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                        : dow === 0
                          ? "text-red-500"
                          : dow === 6
                            ? "text-blue-500"
                            : "text-gray-700"
                  }`}
                >
                  {day}
                </span>
                {/* Category badges */}
                {dayCats.length > 0 && (
                  <div className="flex flex-wrap gap-0.5 mt-0.5">
                    {dayCats.map((cat) => {
                      const catInfo = CATEGORIES.find((c) => c.key === cat);
                      const count = dayMatches.filter((m) => m.category === cat).length;
                      return (
                        <span
                          key={cat}
                          className="text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded text-white leading-none"
                          style={{ backgroundColor: catInfo?.color || "#666" }}
                        >
                          {cat}
                          <span className="opacity-70 ml-0.5">{count}</span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected date detail */}
      {selectedDate && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {formatDateLabel(selectedDate)} の試合
          </h3>
          {selectedMatches.length === 0 ? (
            <p className="text-sm text-gray-400">この日の試合はありません</p>
          ) : (
            <div className="space-y-2">
              {/* Group by category */}
              {CATEGORIES.filter((c) => activeFilters.has(c.key)).map((cat) => {
                const catMatches = selectedMatches.filter((m) => m.category === cat.key);
                if (catMatches.length === 0) return null;
                return (
                  <div key={cat.key}>
                    <div
                      className="text-xs font-bold text-white px-2 py-1 rounded-t inline-block"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.label} {catMatches[0].matchday}
                    </div>
                    <div className="border rounded-b rounded-tr border-gray-200 divide-y divide-gray-100">
                      {catMatches.map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center px-3 py-2.5 text-sm"
                        >
                          <span className="text-xs text-gray-400 w-12 shrink-0">
                            {m.kickoff}
                          </span>
                          <span className="font-bold text-gray-800 text-right flex-1 min-w-0 truncate">
                            {m.home}
                          </span>
                          <span className="mx-2 text-xs text-gray-400 shrink-0">
                            {m.score
                              ? `${m.score.home} - ${m.score.away}`
                              : "vs"}
                          </span>
                          <span className="font-bold text-gray-800 flex-1 min-w-0 truncate">
                            {m.away}
                          </span>
                          <span className="text-xs text-gray-400 ml-2 hidden sm:block shrink-0 max-w-[120px] truncate">
                            {m.stadium}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
