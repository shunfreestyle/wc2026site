import { jMatches, getLatestRound } from "@/data/jleague";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "J1リーグ 試合結果・日程 | SAMURAI FOOTBALL",
  description: "明治安田J1リーグの試合結果・日程・スコア・得点者をまとめて確認。",
};

export default function JLeaguePage() {
  const rounds = [...new Set(jMatches.map((m) => m.round))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#0A1A3C] to-[#1a3570] text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
              2025シーズン
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">J1リーグ</h1>
          <p className="text-blue-200/60 text-sm mt-1">明治安田J1百年構想リーグ ／ 試合結果・日程</p>
          <p className="text-white/30 text-[10px] mt-2">出典: Jリーグ公式サイト（jleague.jp / data.j-league.or.jp）</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {rounds.map((round) => {
          const roundMatches = jMatches.filter((m) => m.round === round);
          return (
            <section key={round}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold px-4 py-1.5 rounded-full text-white" style={{ background: "#3C3489" }}>
                  第{round}節
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-2">
                {roundMatches.map((m) => (
                  <Link
                    key={m.id}
                    href={`/jleague/${m.id}`}
                    className="flex items-center bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="text-xs text-gray-400 w-16 shrink-0">
                      <p>{m.date.slice(5).replace("-", "/")}</p>
                      <p>{m.kickoff}</p>
                    </div>
                    <div className="flex-1 text-right min-w-0 pr-3">
                      <p className="text-sm font-bold text-gray-900 truncate">{m.homeTeam.shortName}</p>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-1 rounded-lg shrink-0 text-sm font-black"
                      style={{
                        background: m.status === "finished" ? "#F3F4F6" : "#EEF2FF",
                        color: m.status === "finished" ? "#111" : "#3730A3",
                      }}
                    >
                      {m.status === "finished" ? `${m.homeScore} - ${m.awayScore}` : m.kickoff}
                    </div>
                    <div className="flex-1 min-w-0 pl-3">
                      <p className="text-sm font-bold text-gray-900 truncate">{m.awayTeam.shortName}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
