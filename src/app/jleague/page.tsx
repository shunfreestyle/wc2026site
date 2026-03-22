"use client";

import Link from "next/link";
import { jMatches, JLEAGUE_SEASON, TEAM_INFO, getAllRounds, getScoreDisplay } from "@/data/jleague";
import { useState } from "react";

type Division = "J1" | "J2J3";

const j1Groups = ["EAST", "WEST"] as const;
const j2j3Groups = ["EAST-A", "EAST-B", "WEST-A", "WEST-B"] as const;

export default function JLeaguePage() {
  const [division, setDivision] = useState<Division>("J1");
  const [group, setGroup] = useState<string>("EAST");

  const leagueFilter = division === "J1" ? "J1" : "J2J3";
  const filtered = jMatches.filter((m) => m.league === leagueFilter && m.group === group);
  const rounds = [...new Set(filtered.map((m) => m.round))].sort((a, b) => b - a);
  const latestRound = Math.max(
    ...jMatches.filter((m) => m.league === leagueFilter && m.status === "finished").map((m) => m.round),
    1
  );
  const today = "2026-03-22";
  const title = division === "J1" ? "明治安田J1百年構想リーグ" : "明治安田J2・J3百年構想リーグ";

  const handleDivisionChange = (d: Division) => {
    setDivision(d);
    setGroup(d === "J1" ? "EAST" : "EAST-A");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーロー */}
      <div className="bg-gradient-to-br from-[#0A1A3C] to-[#1a3570] text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3" style={{ background: "rgba(255,255,255,0.15)" }}>
            2026 特別大会
          </p>
          <h1 className="text-2xl sm:text-3xl font-black">{title}</h1>
          <p className="text-blue-200/60 text-sm mt-1">地域リーグラウンド 第{latestRound}節まで終了</p>
          <p className="text-white/25 text-[10px] mt-2">
            出典: Jリーグ公式サイト（jleague.jp）
            <a href={JLEAGUE_SEASON.officialUrl} target="_blank" rel="noopener noreferrer" className="ml-1 underline text-white/35 hover:text-white/50">
              公式サイト →
            </a>
          </p>
        </div>
      </div>

      {/* タブ */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          {/* 大カテゴリ */}
          <div className="flex gap-1 pt-2 pb-1">
            {([["J1", "J1"] as const, ["J2J3", "J2・J3"] as const]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleDivisionChange(key)}
                className="px-4 py-1.5 rounded-t-lg text-xs font-bold transition-all"
                style={
                  division === key
                    ? { background: "#0A1A3C", color: "#fff" }
                    : { background: "transparent", color: "#9CA3AF" }
                }
              >
                {label}
              </button>
            ))}
          </div>
          {/* グループ */}
          <div className="flex gap-2 pb-2">
            {(division === "J1" ? j1Groups : j2j3Groups).map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                style={
                  group === g
                    ? { background: "#0A1A3C", color: "#fff", border: "1px solid #0A1A3C" }
                    : { background: "transparent", color: "#6B7280", border: "1px solid #E5E7EB" }
                }
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 試合一覧 */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {rounds.length === 0 && (
          <p className="text-center text-gray-400 py-10">このグループの試合データはまだありません</p>
        )}
        {rounds.map((round) => {
          const roundMatches = filtered.filter((m) => m.round === round);
          if (!roundMatches.length) return null;
          const hasToday = roundMatches.some((m) => m.date === today);

          return (
            <section key={round}>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ background: hasToday ? "#E8192C" : "#0A1A3C" }}
                >
                  第{round}節{hasToday && " ・ 本日開催"}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-2">
                {roundMatches.map((m) => {
                  const ht = TEAM_INFO[m.homeTeam];
                  const at = TEAM_INFO[m.awayTeam];
                  const score = getScoreDisplay(m);
                  const isScheduled = m.status === "scheduled";
                  return (
                    <Link key={m.id} href={`/jleague/${m.id}`} className="block bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] text-gray-400 w-14 shrink-0 leading-tight">
                          <p>{m.date.slice(5).replace("-", "/")}</p>
                          <p>{m.kickoff}</p>
                        </div>
                        <div className="flex-1 text-right min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color: ht?.color || "#111" }}>
                            {ht?.emoji} {m.homeTeam}
                          </p>
                        </div>
                        <div
                          className="shrink-0 text-center px-3 py-1 rounded-lg min-w-[80px]"
                          style={{
                            background: isScheduled ? "#EEF2FF" : "#F3F4F6",
                            color: isScheduled ? "#3730A3" : "#111",
                          }}
                        >
                          <p className="text-xs font-black leading-none">{score}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate" style={{ color: at?.color || "#111" }}>
                            {m.awayTeam} {at?.emoji}
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 text-center">{m.stadium}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
