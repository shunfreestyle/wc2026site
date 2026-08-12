import { getHistoryByTeamId } from "@/data/j1-history";
import { getLegendsByTeamId } from "@/data/j1-legends";
import SeasonChart from "./SeasonChart";

const TAG_ICONS: Record<string, string> = {
  founding: "🏗",
  title: "🏆",
  cup: "🏆",
  acl: "🌏",
  promotion: "⬆",
  relegation: "⬇",
};

const POS_COLORS: Record<string, string> = {
  GK: "#F59E0B",
  DF: "#3B82F6",
  MF: "#10B981",
  FW: "#EF4444",
};

export default function ClubInfoTab({
  teamId,
  accentColor,
}: {
  teamId: string;
  accentColor: string;
}) {
  const history = getHistoryByTeamId(teamId);
  const legendsData = getLegendsByTeamId(teamId);

  if (!history && !legendsData) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-bold mb-1">準備中</p>
        <p className="text-sm">クラブ情報は順次追加されます</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 概要 */}
      {history?.summary && (
        <section>
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
            クラブ概要
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {history.summary}
          </p>
        </section>
      )}

      {/* 年表 */}
      {history && history.timeline.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
            クラブ年表
          </h3>
          <div className="relative pl-6 border-l-2 border-gray-200 space-y-3">
            {history.timeline.map((ev, i) => (
              <div key={i} className="relative">
                <span
                  className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border-2 border-white"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-gray-500 w-10 shrink-0 pt-0.5">
                    {ev.year}
                  </span>
                  <span className="text-sm text-gray-700">
                    {ev.tag && TAG_ICONS[ev.tag] ? `${TAG_ICONS[ev.tag]} ` : ""}
                    {ev.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 成績推移 */}
      {history && history.records.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
            リーグ成績推移
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <SeasonChart records={history.records} accentColor={accentColor} />
          </div>
          <div className="flex gap-4 mt-2">
            {[1, 2, 3].map((d) => (
              <span key={d} className="flex items-center gap-1 text-[10px] text-gray-400">
                <span
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: { 1: "#003087", 2: "#00A651", 3: "#E8192C" }[d] }}
                />
                {d === 1 ? "J1" : d === 2 ? "J2" : "JFL/J3"}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* レジェンド */}
      {legendsData && legendsData.legends.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
            クラブレジェンド
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {legendsData.legends.map((leg, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: POS_COLORS[leg.position] || "#999" }}
                  >
                    {leg.position}
                  </span>
                  <span className="font-bold text-gray-900 text-sm">{leg.name}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span>{leg.years}</span>
                  {leg.apps != null && <span>{leg.apps}試合</span>}
                  {leg.goals != null && <span>{leg.goals}得点</span>}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{leg.description}</p>
                {leg.tags && leg.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {leg.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
