import { matches, getStages } from "@/data/matches";
import MatchCard from "@/components/MatchCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "試合日程・結果 | FIFA World Cup 2026",
  description: "2026年FIFAワールドカップ全104試合の日程と結果",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];
  return `${month}月${day}日（${weekday}）`;
}

function groupByDate(list: typeof matches) {
  const map: Record<string, typeof matches> = {};
  for (const m of list) {
    if (!map[m.date]) map[m.date] = [];
    map[m.date].push(m);
  }
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
}

const stageConfig: Record<string, { badge: string; color: string }> = {
  "グループステージ": { badge: "グループステージ", color: "bg-[#8B1538]" },
  "ラウンド32":       { badge: "ラウンド32",       color: "bg-amber-600" },
  "ラウンド16":       { badge: "ラウンド16",       color: "bg-amber-600" },
  "準々決勝":         { badge: "準々決勝",         color: "bg-orange-600" },
  "準決勝":           { badge: "準決勝",           color: "bg-rose-600" },
  "3位決定戦":        { badge: "3位決定戦",        color: "bg-rose-600" },
  "決勝":             { badge: "決勝",             color: "bg-yellow-600" },
};

export default function MatchesPage() {
  const stages = getStages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          試合日程・結果
        </h1>
        <p className="text-gray-500 mt-2">
          全104試合（グループステージ72試合 + 決勝トーナメント32試合）
        </p>
        <p className="text-xs text-gray-400 mt-1">
          時刻は現地時間（タイムゾーン）と日本時間（JST）の両方を表示しています
        </p>
      </div>

      {/* Stage Navigation */}
      <nav className="flex flex-wrap gap-2 mb-10 sticky top-16 z-40 bg-[#f8f9fa] py-3 -mx-4 px-4">
        {stages.map((stage) => {
          const cfg = stageConfig[stage] || { badge: stage, color: "bg-gray-600" };
          const count = matches.filter((m) => m.stage === stage).length;
          return (
            <a
              key={stage}
              href={`#stage-${stage}`}
              className={`${cfg.color} text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity`}
            >
              {cfg.badge} ({count})
            </a>
          );
        })}
      </nav>

      {/* Matches by Stage */}
      {stages.map((stage) => {
        const stageMatches = matches.filter((m) => m.stage === stage);
        const cfg = stageConfig[stage] || { badge: stage, color: "bg-gray-600" };
        const byDate = groupByDate(stageMatches);

        return (
          <section key={stage} id={`stage-${stage}`} className="mb-14 scroll-mt-32">
            <div className="flex items-center gap-3 mb-8">
              <span className={`${cfg.color} text-white text-sm font-bold px-4 py-1.5 rounded-lg`}>
                {cfg.badge}
              </span>
              <span className="text-sm text-gray-500">{stageMatches.length}試合</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {byDate.map(([date, dayMatches]) => (
              <div key={date} className="mb-8">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 ${cfg.color} rounded-full`} />
                  {formatDate(date)}
                  <span className="text-xs text-gray-400 font-normal">
                    （{dayMatches.length}試合）
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dayMatches
                    .sort((a, b) => a.localTime.localeCompare(b.localTime))
                    .map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      {/* Tournament Format */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">大会形式</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { stage: "グループステージ", desc: "12グループ × 4チーム", period: "6/11 - 6/27", matches: "72試合" },
            { stage: "ラウンド32", desc: "各グループ上位2位 + 3位8チーム", period: "6/28 - 7/3", matches: "16試合" },
            { stage: "ラウンド16", desc: "ベスト16", period: "7/4 - 7/7", matches: "8試合" },
            { stage: "準々決勝〜決勝", desc: "ベスト8 → 優勝", period: "7/9 - 7/19", matches: "8試合" },
          ].map((item) => (
            <div key={item.stage} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm">{item.stage}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">{item.period}</p>
                <p className="text-sm font-semibold text-[#8B1538] mt-1">{item.matches}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timezone Reference */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">タイムゾーン早見表</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          {[
            { tz: "EDT (UTC-4)", cities: "ニューヨーク, マイアミ, アトランタ, ボストン, フィラデルフィア, トロント", jst: "+13時間" },
            { tz: "CDT (UTC-5)", cities: "ダラス, ヒューストン, カンザスシティ", jst: "+14時間" },
            { tz: "CST (UTC-6)", cities: "メキシコシティ, グアダラハラ, モンテレイ", jst: "+15時間" },
            { tz: "PDT (UTC-7)", cities: "ロサンゼルス, サンフランシスコ, シアトル, バンクーバー", jst: "+16時間" },
          ].map((item) => (
            <div key={item.tz} className="bg-gray-50 rounded-xl p-4">
              <p className="font-bold text-gray-900">{item.tz}</p>
              <p className="text-xs text-gray-500 mt-1">{item.cities}</p>
              <p className="text-xs text-[#8B1538] font-semibold mt-2">JST: 現地時間 {item.jst}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
