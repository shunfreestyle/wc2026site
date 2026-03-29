"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getJ1TeamById } from "@/data/j1-teams";
import { getJ2J3TeamById } from "@/data/j2j3-teams";
import { getRosterByTeamId } from "@/data/j1-rosters";
import { getEastARosterByTeamId } from "@/data/j2j3-rosters-east-a";
import { jMatches, jMatchDetails } from "@/data/jleague";
import type { JRosterPlayer } from "@/data/j1-rosters";

/* shortName → roster teamId mapping */
const SHORT_TO_ID: Record<string, string> = {
  "鹿島": "kashima", "水戸": "mito", "浦和": "urawa", "千葉": "chiba",
  "柏": "kashiwa", "FC東京": "fctokyo", "東京V": "verdy", "町田": "machida",
  "川崎F": "kawasaki", "横浜FM": "yokohamafm", "清水": "shimizu",
  "名古屋": "nagoya", "京都": "kyoto", "G大阪": "gosaka", "C大阪": "cosaka",
  "神戸": "kobe", "岡山": "okayama", "広島": "hiroshima", "福岡": "fukuoka",
  "長崎": "nagasaki",
  // J2 EAST-A
  "仙台": "sendai", "山形": "yamagata", "秋田": "akita", "群馬": "gunma",
  "相模原": "sagamihara", "横浜FC": "yokohamafc", "栃木SC": "tochigisc",
  "栃木C": "tochigicity", "湘南": "shonan", "八戸": "hachinohe",
  // J2 EAST-B
  "札幌": "sapporo", "大宮": "omiya", "磐田": "iwata", "甲府": "kofu",
  "藤枝": "fujieda", "松本": "matsumoto", "長野": "nagano", "岐阜": "gifu",
  "いわき": "iwaki", "福島": "fukushima",
};

const POS_ORDER = ["GK", "DF", "MF", "FW"] as const;
const POS_COLORS: Record<string, string> = { GK: "#F59E0B", DF: "#3B82F6", MF: "#10B981", FW: "#EF4444" };

type TabKey = "squad" | "season" | "matches";

export default function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { locale } = useLanguage();
  const j1Team = getJ1TeamById(teamId);
  const j2j3Team = getJ2J3TeamById(teamId);
  const team = j1Team || (j2j3Team ? { ...j2j3Team, isOriginal10: false, officialTwitter: j2j3Team.officialTwitter } : null);
  const isJ1 = !!j1Team;
  const [activePos, setActivePos] = useState<string>("ALL");
  const [activeTab, setActiveTab] = useState<TabKey>("squad");

  if (!team) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-500 text-lg">
          {locale === "en" ? "Team not found" : "チームが見つかりません"}
        </p>
        <Link href="/jleague" className="text-[#003087] font-bold mt-4 inline-block hover:underline">
          &larr; {locale === "en" ? "Back to J-League" : "Jリーグに戻る"}
        </Link>
      </div>
    );
  }

  // ── Data ────────────────────────────────────
  const players = getRosterByTeamId(teamId).length > 0
    ? getRosterByTeamId(teamId)
    : getEastARosterByTeamId(teamId);

  const teamShort = team.shortName;
  const teamMatches = jMatches
    .filter((m) => (m.homeTeam === teamShort || m.awayTeam === teamShort) && m.status === "finished")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Season stats
  let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;
  for (const m of teamMatches) {
    if (m.homeScore === null || m.awayScore === null) continue;
    const isHome = m.homeTeam === teamShort;
    const my = isHome ? m.homeScore : m.awayScore;
    const opp = isHome ? m.awayScore : m.homeScore;
    gf += my;
    ga += opp;
    if (my > opp) wins++;
    else if (my < opp) losses++;
    else {
      const hasPK = m.pkWinner !== undefined;
      if (hasPK) {
        const pkWin = m.pkWinner === (isHome ? "home" : "away");
        if (pkWin) wins++; else losses++;
      } else {
        draws++;
      }
    }
  }
  const points = wins * 3 + draws;

  // Result helper
  function getResult(m: typeof teamMatches[0]) {
    const isHome = m.homeTeam === teamShort;
    const my = isHome ? m.homeScore! : m.awayScore!;
    const opp = isHome ? m.awayScore! : m.homeScore!;
    if (my > opp) return "W";
    if (my < opp) return "L";
    if (m.pkWinner) return m.pkWinner === (isHome ? "home" : "away") ? "W" : "L";
    return "D";
  }

  const TABS: { key: TabKey; labelJa: string; labelEn: string }[] = [
    { key: "squad", labelJa: "選手一覧", labelEn: "Squad" },
    { key: "season", labelJa: "成績", labelEn: "Season" },
    { key: "matches", labelJa: "対戦カード", labelEn: "Matches" },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${team.color} 0%, ${team.colorSecondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <Link
            href={isJ1 ? "/jleague" : "/jleague/j2j3"}
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white mb-4 transition-colors"
          >
            &larr; {isJ1 ? (locale === "en" ? "J1 League" : "J1リーグ") : (locale === "en" ? "J2·J3 League" : "J2·J3リーグ")}
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold bg-white/20 backdrop-blur-sm">
              {team.shortName.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {team.fullName}
              </h1>
              <p className="text-white/70 text-sm mt-1">{team.fullNameEn}</p>
              {team.isOriginal10 && (
                <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 tracking-wide">
                  ORIGINAL 10
                </span>
              )}
            </div>
          </div>

          {/* Mini stats in hero */}
          {teamMatches.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { label: locale === "en" ? "Pts" : "勝点", value: points },
                { label: `${wins}${locale === "en" ? "W" : "勝"} ${draws}${locale === "en" ? "D" : "分"} ${losses}${locale === "en" ? "L" : "敗"}`, value: `${teamMatches.length}${locale === "en" ? " games" : "試合"}` },
                { label: locale === "en" ? "GF" : "得点", value: gf },
                { label: locale === "en" ? "GA" : "失点", value: ga },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-lg sm:text-xl font-extrabold">{s.value}</p>
                  <p className="text-[10px] text-white/60 font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: locale === "en" ? "Prefecture" : "拠点", value: `${team.prefecture} ${team.city}`, link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(team.stadium)}`, external: true, cta: locale === "en" ? "Open Map" : "地図を見る" },
            { label: locale === "en" ? "Founded" : "創設", value: `${team.founded}${locale === "en" ? "" : "年"}` },
            { label: locale === "en" ? "Stadium" : "スタジアム", value: team.stadium, link: `/jleague/team/${team.id}/stadium`, cta: locale === "en" ? "View details" : "詳しく見る" },
            { label: locale === "en" ? "Manager" : "監督", value: team.manager, link: `/jleague/team/${team.id}/manager`, cta: locale === "en" ? "View profile" : "プロフィール" },
          ].map((item) => {
            if (!item.link) {
              return (
                <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">{item.value}</p>
                </div>
              );
            }
            const inner = (
              <>
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ backgroundColor: team.color }} />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">{item.value}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold tracking-wide opacity-70 group-hover:opacity-100 transition-all" style={{ color: team.color }}>
                  {item.cta}
                  {item.external ? (
                    <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  )}
                </span>
              </>
            );
            const cls = "group relative bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-lg hover:border-transparent hover:ring-2 transition-all duration-200 overflow-hidden";
            const sty = { "--tw-ring-color": team.color } as React.CSSProperties;
            return item.external ? (
              <a key={item.label} href={item.link} target="_blank" rel="noopener noreferrer" className={cls} style={sty}>{inner}</a>
            ) : (
              <Link key={item.label} href={item.link} className={cls} style={sty}>{inner}</Link>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 sm:top-16 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab.key ? "border-current" : "border-transparent text-gray-400 hover:text-gray-700"}`}
              style={activeTab === tab.key ? { color: team.color } : {}}
            >
              {locale === "en" ? tab.labelEn : tab.labelJa}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Squad Tab ── */}
        {activeTab === "squad" && (
          <div>
            {/* Position nav */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["ALL", ...POS_ORDER] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setActivePos(p);
                    if (p === "ALL") {
                      document.getElementById("squad-top")?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      document.getElementById(`pos-${p}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${activePos === p ? "text-white border-transparent scale-105" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
                  style={activePos === p ? { backgroundColor: p === "ALL" ? team.color : POS_COLORS[p] } : {}}
                >
                  {p === "ALL" ? `ALL (${players.length})` : `${p} (${players.filter(pl => pl.position === p).length})`}
                </button>
              ))}
            </div>

            <div id="squad-top" />
            {players.length === 0 ? (
              <p className="text-gray-400 text-center py-12">{locale === "en" ? "No squad data available" : "選手データがありません"}</p>
            ) : (
              <div className="space-y-6">
                {POS_ORDER.map((pos) => {
                  const group = players.filter((p: JRosterPlayer) => p.position === pos);
                  if (group.length === 0) return null;
                  return (
                    <div key={pos} id={`pos-${pos}`} className="scroll-mt-32 sm:scroll-mt-28">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-5 rounded-full" style={{ backgroundColor: POS_COLORS[pos] }} />
                        <span className="text-sm font-bold text-gray-700">{pos}</span>
                        <span className="text-xs text-gray-400">{group.length}{locale === "en" ? " players" : "人"}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {group.map((player: JRosterPlayer) => (
                          <div key={player.number} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
                            <span className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold text-white mt-0.5" style={{ backgroundColor: POS_COLORS[pos] }}>
                              {player.number}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-gray-900">{player.name}</p>
                              {player.bio && (
                                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{player.bio}</p>
                              )}
                            </div>
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

        {/* ── Season Tab ── */}
        {activeTab === "season" && (
          <div>
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4 mb-8">
              {[
                { label: locale === "en" ? "Matches" : "試合数", value: teamMatches.length, color: "#374151" },
                { label: locale === "en" ? "Record" : "成績", value: `${wins}${locale === "en" ? "W" : "勝"} ${draws}${locale === "en" ? "D" : "分"} ${losses}${locale === "en" ? "L" : "敗"}`, color: "#374151" },
                { label: locale === "en" ? "Points" : "勝点", value: points, color: team.color },
                { label: locale === "en" ? "Goals For" : "得点", value: gf, color: "#10B981" },
                { label: locale === "en" ? "Goals Against" : "失点", value: ga, color: "#EF4444" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[11px] font-bold text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-bold text-gray-800 mb-4">{locale === "en" ? "Match Results" : "試合別結果"}</h3>
            <div className="space-y-2">
              {teamMatches.map((m) => {
                const isHome = m.homeTeam === teamShort;
                const my = isHome ? m.homeScore! : m.awayScore!;
                const opp = isHome ? m.awayScore! : m.homeScore!;
                const opponent = isHome ? m.awayTeam : m.homeTeam;
                const result = getResult(m);
                const resultColor = result === "W" ? "#10B981" : result === "L" ? "#EF4444" : "#F59E0B";
                const detail = jMatchDetails.find(d => d.matchId === m.id);
                const myGoals = detail?.goals?.filter(g => g.teamSide === (isHome ? "home" : "away")) ?? [];
                const hasPK = m.pkWinner !== undefined;

                return (
                  <Link key={m.id} href={`/jleague/${m.id}`} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group">
                    <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold text-white" style={{ backgroundColor: resultColor }}>
                      {result}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                        <span>R{m.round}</span>
                        <span>{m.date}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isHome ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                          {isHome ? "HOME" : "AWAY"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold text-gray-800">{opponent}</span>
                        <span className="text-sm font-extrabold" style={{ color: resultColor }}>
                          {my} - {opp}
                        </span>
                        {hasPK && (
                          <span className="text-[10px] text-gray-400 font-bold">
                            PK {isHome ? m.pkHome : m.pkAway}-{isHome ? m.pkAway : m.pkHome}
                          </span>
                        )}
                      </div>
                      {myGoals.length > 0 && (
                        <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                          {myGoals.map(g => `${g.playerName} ${g.minute}'`).join(", ")}
                        </p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </Link>
                );
              })}
              {teamMatches.length === 0 && <p className="text-gray-400 text-center py-12">{locale === "en" ? "No match data available" : "試合データがありません"}</p>}
            </div>
          </div>
        )}

        {/* ── Matches Tab ── */}
        {activeTab === "matches" && (
          <div className="space-y-4">
            {teamMatches.map((m) => {
              const isHome = m.homeTeam === teamShort;
              const detail = jMatchDetails.find(d => d.matchId === m.id);
              const goals = detail?.goals ?? [];
              const hasPK = m.pkWinner !== undefined;
              const result = getResult(m);
              const resultColor = result === "W" ? "#10B981" : result === "L" ? "#EF4444" : "#F59E0B";

              return (
                <Link key={m.id} href={`/jleague/${m.id}`} className="block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: resultColor }} />
                      <span>{locale === "en" ? `Round ${m.round}` : `第${m.round}節`}</span>
                      <span>{m.date}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${isHome ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                      {isHome ? "HOME" : "AWAY"}
                    </span>
                  </div>

                  {/* Scoreboard */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4">
                    <div className={`text-right ${isHome ? "font-extrabold" : ""}`}>
                      <p className={`text-sm ${isHome ? "text-gray-900 font-extrabold" : "text-gray-600 font-bold"}`}>{m.homeTeam}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1.5 text-xl font-extrabold text-gray-900">
                        <span>{m.homeScore}</span>
                        <span className="text-gray-300">-</span>
                        <span>{m.awayScore}</span>
                      </div>
                      {hasPK && <p className="text-[10px] text-gray-400 font-bold mt-0.5">PK {m.pkHome}-{m.pkAway}</p>}
                    </div>
                    <div className={`text-left ${!isHome ? "font-extrabold" : ""}`}>
                      <p className={`text-sm ${!isHome ? "text-gray-900 font-extrabold" : "text-gray-600 font-bold"}`}>{m.awayTeam}</p>
                    </div>
                  </div>

                  {/* Goal scorers */}
                  {goals.length > 0 && (
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 px-4 pb-3 border-t border-gray-50 pt-2">
                      <div className="text-right space-y-0.5">
                        {goals.filter(g => g.teamSide === "home").map((g, i) => (
                          <p key={i} className="text-[11px] text-gray-500">
                            {g.playerName} {g.minute}&apos;{g.assistName ? ` (${g.assistName})` : ""}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-start justify-center pt-0.5">
                        <span className="text-[10px] text-gray-300">⚽</span>
                      </div>
                      <div className="text-left space-y-0.5">
                        {goals.filter(g => g.teamSide === "away").map((g, i) => (
                          <p key={i} className="text-[11px] text-gray-500">
                            {g.playerName} {g.minute}&apos;{g.assistName ? ` (${g.assistName})` : ""}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
            {teamMatches.length === 0 && <p className="text-gray-400 text-center py-12">{locale === "en" ? "No match data available" : "試合データがありません"}</p>}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <Link
            href={`/stamen?team=${team.id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: team.color }}
          >
            {locale === "en" ? "Lineup Maker" : "スタメンメーカー"}
          </Link>
          <a
            href={team.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {locale === "en" ? "Official Site" : "公式サイト"} ↗
          </a>
        </div>
      </div>
    </>
  );
}
