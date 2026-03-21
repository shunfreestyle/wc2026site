import Link from "next/link";
import type { Metadata } from "next";
import { japanMatches } from "@/data/japan-matches";

export const metadata: Metadata = {
  title: "🇯🇵 日本代表 試合結果 | FIFA World Cup 2026",
  description: "日本代表（SAMURAI BLUE）直近10試合の試合結果・スコア・得点者一覧。",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${y}年${m}月${day}日（${dow}）`;
}

export default function JapanMatchesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative text-white py-12"
        style={{
          background: "linear-gradient(135deg, #001845 0%, #003087 50%, #001845 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/japan"
              className="text-blue-200 hover:text-white text-sm transition-colors"
            >
              ← 日本代表トップ
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            🇯🇵 試合結果
          </h1>
          <p className="text-blue-200/70 mt-2">
            SAMURAI BLUE 直近10試合のスコア・得点者・詳細データ
          </p>
        </div>
      </section>

      {/* Match List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4">
          {japanMatches.map((m) => {
            const isJapanHome = m.home.flag === "🇯🇵";
            const japanScore = isJapanHome ? m.home.score : m.away.score;
            const opponentScore = isJapanHome ? m.away.score : m.home.score;
            const opponent = isJapanHome ? m.away : m.home;
            const result =
              japanScore > opponentScore
                ? "WIN"
                : japanScore < opponentScore
                  ? "LOSE"
                  : "DRAW";
            const resultColor =
              result === "WIN"
                ? "bg-green-500"
                : result === "LOSE"
                  ? "bg-red-500"
                  : "bg-gray-400";
            const resultLabel =
              result === "WIN" ? "勝利" : result === "LOSE" ? "敗北" : "引分";

            return (
              <Link
                key={m.id}
                href={`/japan/matches/${m.id}`}
                className="block rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="flex items-stretch">
                  {/* Result bar */}
                  <div
                    className={`w-1.5 ${resultColor} shrink-0`}
                  />
                  <div className="flex-1 p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white ${resultColor}`}
                        >
                          {resultLabel}
                        </span>
                        <span className="text-xs text-gray-400">
                          {m.competition}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDate(m.date)}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                      {/* Home */}
                      <div className="text-center flex-1">
                        <p className="text-2xl sm:text-3xl mb-1">{m.home.flag}</p>
                        <p className="text-sm font-bold text-gray-900">
                          {m.home.nameJa}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-center px-4">
                        <p className="text-2xl sm:text-3xl font-black text-gray-900">
                          {m.home.score}{" "}
                          <span className="text-gray-300">-</span>{" "}
                          {m.away.score}
                        </p>
                      </div>

                      {/* Away */}
                      <div className="text-center flex-1">
                        <p className="text-2xl sm:text-3xl mb-1">{m.away.flag}</p>
                        <p className="text-sm font-bold text-gray-900">
                          {m.away.nameJa}
                        </p>
                      </div>
                    </div>

                    {/* Goals */}
                    {m.goals.length > 0 && (
                      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
                        {m.goals.map((g, i) => (
                          <span
                            key={i}
                            className={`text-xs ${g.team === (isJapanHome ? "home" : "away") ? "text-[#003087] font-medium" : "text-gray-400"}`}
                          >
                            ⚽ {g.minute}&apos; {g.player}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        🏟️ {m.venue}（{m.city}）
                      </span>
                      <div className="flex items-center gap-3">
                        {m.highlightUrl && (
                          <a
                            href={m.highlightUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
                          >
                            🎬 ハイライトを見る
                          </a>
                        )}
                        <span className="text-xs text-[#003087] font-medium group-hover:text-[#BC002D] transition-colors">
                          詳細を見る →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Back link */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <Link
            href="/japan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: "#003087" }}
          >
            🇯🇵 日本代表トップに戻る
          </Link>
        </div>
      </section>
    </div>
  );
}
