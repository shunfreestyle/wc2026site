"use client";

import Link from "next/link";
import { jMatches, JLEAGUE_SEASON, TEAM_INFO, getAllRounds, getScoreDisplay } from "@/data/jleague";
import { useState } from "react";

export default function JLeaguePage() {
  const [group, setGroup] = useState<"EAST" | "WEST">("EAST");
  const rounds = getAllRounds().reverse();
  const latestRound = Math.max(...jMatches.filter((m) => m.status === "finished").map((m) => m.round), 1);
  const filtered = jMatches.filter((m) => m.group === group);
  const today = "2026-03-22";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーロー */}
      <div className="bg-gradient-to-br from-[#0A1A3C] to-[#1a3570] text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3" style={{ background: "rgba(255,255,255,0.15)" }}>
            2026 特別大会
          </p>
          <h1 className="text-2xl sm:text-3xl font-black">{JLEAGUE_SEASON.name}</h1>
          <p className="text-blue-200/60 text-sm mt-1">地域リーグラウンド 第8節結果更新（2026/3/22）</p>
          <p className="text-white/25 text-[10px] mt-2">
            出典: Jリーグ公式サイト（jleague.jp）
            <a href={JLEAGUE_SEASON.officialUrl} target="_blank" rel="noopener noreferrer" className="ml-1 underline text-white/35 hover:text-white/50">
              公式サイト →
            </a>
          </p>
        </div>
      </div>

      {/* グループ切り替え */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2">
          {(["EAST", "WEST"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={
                group === g
                  ? { background: "#0A1A3C", color: "#fff", border: "1px solid #0A1A3C" }
                  : { background: "transparent", color: "#6B7280", border: "1px solid #E5E7EB" }
              }
            >
              {g}グループ
            </button>
          ))}
        </div>
      </div>

      {/* 試合一覧 */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
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
