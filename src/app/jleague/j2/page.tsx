"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { j2j3Teams } from "@/data/j2j3-teams";
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

/* ---------- short name → team info ---------- */
const J2_TEAMS = j2j3Teams.filter((t) => {
  const j2ShortNames = new Set([
    "札幌","仙台","山形","秋田","八戸","横浜FC","栃木C","湘南",
    "大宮","磐田","甲府","藤枝","いわき","新潟","富山","徳島",
    "今治","宮崎","大分","鳥栖",
  ]);
  return j2ShortNames.has(t.shortName);
});

const SHORT_TO_INFO: Record<string, { id: string; fullName: string; color: string }> = {};
for (const t of J2_TEAMS) {
  SHORT_TO_INFO[t.shortName] = { id: t.id, fullName: t.fullName, color: t.color };
}

const FORM_COLORS: Record<string, string> = {
  W: "#16a34a",
  D: "#d97706",
  L: "#dc2626",
};

/* ---------- compute standings ---------- */
function computeStandings(matches: Match[]): TeamStanding[] {
  const j2Matches = matches.filter((m) => m.category === "J2" && m.score);
  const stats: Record<string, { w: number; d: number; l: number; gf: number; ga: number; results: { date: string; result: "W" | "D" | "L" }[] }> = {};

  for (const t of J2_TEAMS) {
    stats[t.shortName] = { w: 0, d: 0, l: 0, gf: 0, ga: 0, results: [] };
  }

  for (const m of j2Matches) {
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
    const info = SHORT_TO_INFO[shortName];
    const sorted = s.results.sort((a, b) => a.date.localeCompare(b.date));
    const form = sorted.slice(-5).map((r) => r.result);

    return {
      rank: 0,
      teamId: info?.id || shortName,
      shortName,
      fullName: info?.fullName || shortName,
      color: info?.color || "#666",
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

  standings.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  standings.forEach((s, i) => { s.rank = i + 1; });

  return standings;
}

/* ---------- recent matches ---------- */
function getRecentMatches(matches: Match[]): Match[] {
  return matches
    .filter((m) => m.category === "J2" && m.score)
    .sort((a, b) => b.date.localeCompare(a.date) || b.kickoff.localeCompare(a.kickoff))
    .slice(0, 10);
}

/* ---------- component ---------- */
export default function J2Page() {
  const standings = useMemo(
    () => computeStandings(scheduleData.matches as Match[]),
    []
  );
  const recentMatches = useMemo(
    () => getRecentMatches(scheduleData.matches as Match[]),
    []
  );
  const [tab, setTab] = useState<"detail" | "short">("detail");

  const maxPlayed = Math.max(...standings.map((s) => s.played));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0A2E1A] via-[#00A651] to-[#0A2E1A] text-white">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
          <p className="text-xs font-bold tracking-widest text-white/50 mb-1">
            MEIJI YASUDA J2 LEAGUE 2026/27
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            J2リーグ 順位表
          </h1>
          <p className="text-sm text-white/60 mt-1">
            {scheduleData.season}シーズン ─ 第{maxPlayed}節終了時点
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-4">
          <button
            onClick={() => setTab("detail")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
              tab === "detail"
                ? "bg-[#00A651] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            詳細
          </button>
          <button
            onClick={() => setTab("short")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
              tab === "short"
                ? "bg-[#00A651] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            シンプル
          </button>
        </div>

        {/* ═══════ DETAIL TABLE ═══════ */}
        {tab === "detail" && (
          <>
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

              {standings.map((team) => (
                <div
                  key={team.teamId}
                  className="block border-b border-gray-100 last:border-b-0 hover:bg-green-50/30 transition-colors"
                >
                  {/* Desktop row */}
                  <div className="hidden sm:grid grid-cols-[40px_1fr_40px_40px_40px_40px_40px_40px_44px_48px_140px] gap-0 items-center px-4 py-3 text-sm">
                    <span className={`text-center font-bold text-sm ${team.rank <= 2 ? "text-[#00A651]" : team.rank <= 6 ? "text-blue-500" : team.rank >= 19 ? "text-red-500" : "text-gray-500"}`}>
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
                      {Array.from({ length: 5 - team.form.length }).map((_, i) => (
                        <span key={`e${i}`} className="w-5 h-5 rounded-full bg-gray-100" />
                      ))}
                    </span>
                  </div>

                  {/* Mobile row */}
                  <div className="sm:hidden px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 text-center font-bold text-sm shrink-0 ${team.rank <= 2 ? "text-[#00A651]" : team.rank <= 6 ? "text-blue-500" : team.rank >= 19 ? "text-red-500" : "text-gray-400"}`}>
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
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00A651]" />自動昇格圏（1〜2位）</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />昇格プレーオフ圏（3〜6位）</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />降格圏（19〜20位）</span>
            </div>
            <div className="mt-1 text-[10px] text-gray-400">
              試=試合数 勝=勝利 分=引分 敗=敗戦 得=得点 失=失点 差=得失点差
            </div>
          </>
        )}

        {/* ═══════ SHORT / SCREENSHOT TABLE ═══════ */}
        {tab === "short" && (
          <div className="bg-[#0A2E1A] rounded-2xl overflow-hidden shadow-lg max-w-lg mx-auto">
            {/* Header */}
            <div className="px-4 sm:px-5 pt-5 pb-3">
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                Meiji Yasuda J2 League 2026/27
              </p>
              <h2 className="text-xl font-extrabold text-white mt-0.5">
                J2リーグ 順位表
              </h2>
              <p className="text-[10px] text-white/30 mt-1">
                第{maxPlayed}節終了時点
              </p>
            </div>

            {/* Column header */}
            <div className="grid grid-cols-[28px_1fr_44px_44px_32px] sm:grid-cols-[32px_1fr_48px_48px_36px] items-center px-4 sm:px-5 py-2 text-[10px] font-bold text-white/40 uppercase tracking-wider border-b border-white/10">
              <span className="text-center">#</span>
              <span>クラブ</span>
              <span className="text-center">勝点</span>
              <span className="text-center">得失</span>
              <span className="text-center">試</span>
            </div>

            {/* Rows */}
            {standings.map((team, i) => {
              const isTop2 = team.rank <= 2;
              const isPlayoff = team.rank >= 3 && team.rank <= 6;
              const isBottom = team.rank >= 19;
              return (
                <div
                  key={team.teamId}
                  className={`grid grid-cols-[28px_1fr_44px_44px_32px] sm:grid-cols-[32px_1fr_48px_48px_36px] items-center px-4 sm:px-5 py-2 sm:py-2.5 ${
                    i % 2 === 0 ? "bg-white/[0.03]" : ""
                  } ${isTop2 ? "border-l-[3px] border-l-green-400" : isPlayoff ? "border-l-[3px] border-l-blue-400" : isBottom ? "border-l-[3px] border-l-red-400" : "border-l-[3px] border-l-transparent"}`}
                >
                  <span className={`text-center text-xs sm:text-sm font-black ${
                    isTop2 ? "text-green-400" : isPlayoff ? "text-blue-400" : isBottom ? "text-red-400" : "text-white/50"
                  }`}>
                    {team.rank}
                  </span>
                  <span className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
                    <span
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 ring-1 ring-white/20"
                      style={{ backgroundColor: team.color }}
                    />
                    <span className="font-bold text-white text-xs sm:text-sm truncate">
                      {team.fullName}
                    </span>
                  </span>
                  <span className="text-center font-extrabold text-white text-sm sm:text-base">
                    {team.pts}
                  </span>
                  <span className={`text-center text-xs sm:text-sm font-bold ${
                    team.gd > 0 ? "text-emerald-400" : team.gd < 0 ? "text-red-400" : "text-white/40"
                  }`}>
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </span>
                  <span className="text-center text-xs sm:text-sm text-white/50">
                    {team.played}
                  </span>
                </div>
              );
            })}

            {/* Footer */}
            <div className="px-4 sm:px-5 py-3 flex items-center justify-between border-t border-white/10">
              <span className="text-[9px] text-white/25">samurai-football.jp</span>
              <div className="flex items-center gap-3 text-[9px] text-white/25">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />自動昇格</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" />PO圏</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" />降格圏</span>
              </div>
            </div>
          </div>
        )}

        {/* Recent matches */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">最新の試合結果</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
            {recentMatches.map((m, i) => {
              const s = m.score!;
              const homeWin = s.home > s.away;
              const awayWin = s.away > s.home;
              return (
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-gray-400">{m.date}</span>
                    <span className="text-[10px] text-gray-400">{m.matchday}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className={`flex-1 text-right text-sm truncate ${homeWin ? "font-bold text-gray-900" : "text-gray-500"}`}>
                      {m.home}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-extrabold text-gray-900 tabular-nums min-w-[60px] text-center">
                      {s.home} - {s.away}
                    </span>
                    <span className={`flex-1 text-left text-sm truncate ${awayWin ? "font-bold text-gray-900" : "text-gray-500"}`}>
                      {m.away}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/jleague"
            className="text-sm font-bold text-[#00A651] hover:underline"
          >
            J1リーグ順位表へ →
          </Link>
          <Link
            href="/jleague/calendar"
            className="text-sm font-bold text-gray-500 hover:underline"
          >
            カレンダーで日程を見る →
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          出典: Jリーグ公式サイト (jleague.jp) ─ {new Date(scheduleData.updatedAt).toLocaleDateString("ja-JP")}時点
        </p>
      </div>
    </>
  );
}
