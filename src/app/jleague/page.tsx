"use client";

import Link from "next/link";
import { useMemo } from "react";
import { j1Teams } from "@/data/j1-teams";
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
  score?: { home: number; away: number };
}

interface TeamStanding {
  rank: number;
  teamId: string;
  shortName: string;
  fullName: string;
  color: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ("W" | "D" | "L")[];
}

/* ---------- short name → teamId mapping ---------- */
const SHORT_TO_ID: Record<string, string> = {
  "鹿島": "kashima", "水戸": "mito", "浦和": "urawa", "千葉": "chiba",
  "柏": "kashiwa", "FC東京": "fctokyo", "東京V": "verdy", "町田": "machida",
  "川崎F": "kawasaki", "横浜FM": "yokohamafm", "清水": "shimizu",
  "名古屋": "nagoya", "京都": "kyoto", "G大阪": "gosaka", "C大阪": "cosaka",
  "神戸": "kobe", "岡山": "okayama", "広島": "hiroshima", "福岡": "fukuoka",
  "長崎": "nagasaki",
};

const FORM_COLORS: Record<string, string> = {
  W: "#16a34a",
  D: "#d97706",
  L: "#dc2626",
};

/* ---------- compute standings from match data ---------- */
function computeStandings(matches: Match[]): TeamStanding[] {
  const j1Matches = matches.filter((m) => m.category === "J1" && m.score);
  const stats: Record<string, { w: number; d: number; l: number; gf: number; ga: number; results: { date: string; result: "W" | "D" | "L" }[] }> = {};

  // Initialize all J1 teams
  for (const team of j1Teams) {
    stats[team.shortName] = { w: 0, d: 0, l: 0, gf: 0, ga: 0, results: [] };
  }

  for (const m of j1Matches) {
    const s = m.score!;
    const homeStats = stats[m.home];
    const awayStats = stats[m.away];
    if (!homeStats || !awayStats) continue;

    homeStats.gf += s.home;
    homeStats.ga += s.away;
    awayStats.gf += s.away;
    awayStats.ga += s.home;

    if (s.home > s.away) {
      homeStats.w++;
      awayStats.l++;
      homeStats.results.push({ date: m.date, result: "W" });
      awayStats.results.push({ date: m.date, result: "L" });
    } else if (s.home < s.away) {
      homeStats.l++;
      awayStats.w++;
      homeStats.results.push({ date: m.date, result: "L" });
      awayStats.results.push({ date: m.date, result: "W" });
    } else {
      homeStats.d++;
      awayStats.d++;
      homeStats.results.push({ date: m.date, result: "D" });
      awayStats.results.push({ date: m.date, result: "D" });
    }
  }

  const standings: TeamStanding[] = Object.entries(stats).map(([shortName, s]) => {
    const teamId = SHORT_TO_ID[shortName] || shortName;
    const teamInfo = j1Teams.find((t) => t.id === teamId);
    // Sort results by date and take last 5
    const sorted = s.results.sort((a, b) => a.date.localeCompare(b.date));
    const form = sorted.slice(-5).map((r) => r.result);

    return {
      rank: 0,
      teamId,
      shortName,
      fullName: teamInfo?.fullName || shortName,
      color: teamInfo?.color || "#666",
      played: s.w + s.d + s.l,
      won: s.w,
      drawn: s.d,
      lost: s.l,
      gf: s.gf,
      ga: s.ga,
      gd: s.gf - s.ga,
      pts: s.w * 3 + s.d,
      form,
    };
  });

  // Sort by points, then goal difference, then goals scored
  standings.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  standings.forEach((s, i) => { s.rank = i + 1; });

  return standings;
}

/* ---------- component ---------- */
export default function JLeaguePage() {
  const standings = useMemo(
    () => computeStandings(scheduleData.matches as Match[]),
    []
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1A1A2E] via-[#003087] to-[#1A1A2E] text-white">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
          <p className="text-xs font-bold tracking-widest text-white/50 mb-1">
            MEIJI YASUDA J1 LEAGUE 2026/27
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            J1リーグ 順位表
          </h1>
          <p className="text-sm text-white/60 mt-1">
            {scheduleData.season}シーズン
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Standings table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop header */}
          <div className="hidden sm:grid grid-cols-[40px_1fr_40px_40px_40px_40px_40px_40px_44px_48px_140px] gap-0 items-center px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <span className="text-center">#</span>
            <span>クラブ</span>
            <span className="text-center">試</span>
            <span className="text-center">勝</span>
            <span className="text-center">分</span>
            <span className="text-center">敗</span>
            <span className="text-center">得</span>
            <span className="text-center">失</span>
            <span className="text-center">差</span>
            <span className="text-center">勝点</span>
            <span className="text-center">直近5試合</span>
          </div>

          {/* Rows */}
          {standings.map((team) => (
            <Link
              key={team.teamId}
              href={`/jleague/team/${team.teamId}`}
              className="block border-b border-gray-100 last:border-b-0 hover:bg-blue-50/30 transition-colors"
            >
              {/* Desktop row */}
              <div className="hidden sm:grid grid-cols-[40px_1fr_40px_40px_40px_40px_40px_40px_44px_48px_140px] gap-0 items-center px-4 py-3 text-sm">
                <span className={`text-center font-bold text-sm ${team.rank <= 3 ? "text-[#003087]" : team.rank >= 18 ? "text-red-500" : "text-gray-500"}`}>
                  {team.rank}
                </span>
                <span className="flex items-center gap-2 min-w-0">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: team.color }} />
                  <span className="font-bold text-gray-900 truncate">{team.fullName}</span>
                </span>
                <span className="text-center text-gray-600">{team.played}</span>
                <span className="text-center text-gray-600">{team.won}</span>
                <span className="text-center text-gray-600">{team.drawn}</span>
                <span className="text-center text-gray-600">{team.lost}</span>
                <span className="text-center text-gray-600">{team.gf}</span>
                <span className="text-center text-gray-600">{team.ga}</span>
                <span className={`text-center font-bold ${team.gd > 0 ? "text-green-600" : team.gd < 0 ? "text-red-500" : "text-gray-400"}`}>
                  {team.gd > 0 ? `+${team.gd}` : team.gd}
                </span>
                <span className="text-center font-extrabold text-gray-900 text-base">{team.pts}</span>
                <span className="flex items-center justify-center gap-1">
                  {team.form.map((f, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: FORM_COLORS[f] }}
                    >
                      {f}
                    </span>
                  ))}
                  {/* Fill empty slots */}
                  {Array.from({ length: 5 - team.form.length }).map((_, i) => (
                    <span key={`e${i}`} className="w-5 h-5 rounded-full bg-gray-100" />
                  ))}
                </span>
              </div>

              {/* Mobile row */}
              <div className="sm:hidden px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center font-bold text-sm shrink-0 ${team.rank <= 3 ? "text-[#003087]" : team.rank >= 18 ? "text-red-500" : "text-gray-400"}`}>
                    {team.rank}
                  </span>
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: team.color }} />
                  <span className="font-bold text-gray-900 text-sm flex-1 truncate">{team.shortName}</span>
                  <span className="font-extrabold text-gray-900 text-base shrink-0">{team.pts}</span>
                  <span className="text-[10px] text-gray-400 shrink-0">pts</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 ml-9">
                  <span className="text-[11px] text-gray-500">
                    {team.played}試 {team.won}勝 {team.drawn}分 {team.lost}敗
                  </span>
                  <span className={`text-[11px] font-bold ${team.gd > 0 ? "text-green-600" : team.gd < 0 ? "text-red-500" : "text-gray-400"}`}>
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </span>
                  <span className="flex items-center gap-0.5 ml-auto">
                    {team.form.map((f, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ backgroundColor: FORM_COLORS[f] }}
                      >
                        {f}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-[10px] text-gray-400">
          <span>試=試合数 勝=勝利 分=引分 敗=敗戦 得=得点 失=失点 差=得失点差</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/jleague/calendar"
            className="text-sm font-bold text-[#003087] hover:underline"
          >
            カレンダーで日程を見る →
          </Link>
          <Link
            href="/jleague/j2j3"
            className="text-sm font-bold text-gray-500 hover:underline"
          >
            J2・J3リーグへ →
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          出典: Jリーグ公式サイト (jleague.jp) ─ {new Date(scheduleData.updatedAt).toLocaleDateString("ja-JP")}時点
        </p>
      </div>
    </>
  );
}
