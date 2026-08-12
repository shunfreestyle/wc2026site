import { getTacticsByTeamId } from "@/data/j1-tactics";
import { getJ1TeamById } from "@/data/j1-teams";

export default function TacticsTab({
  teamId,
  accentColor,
}: {
  teamId: string;
  accentColor: string;
}) {
  const tactics = getTacticsByTeamId(teamId);
  const team = getJ1TeamById(teamId);

  if (!tactics) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-bold mb-1">準備中</p>
        <p className="text-sm">戦術分析は順次追加されます</p>
      </div>
    );
  }

  const sections = [
    { title: "ビルドアップ", text: tactics.buildUp },
    { title: "攻撃", text: tactics.attack },
    { title: "守備", text: tactics.defense },
    { title: "セットプレー", text: tactics.setpiece },
  ];

  return (
    <div className="space-y-8">
      {/* フォーメーション */}
      <section>
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
          フォーメーション
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-2xl font-extrabold"
              style={{ color: accentColor }}
            >
              {tactics.formation}
            </span>
            {team?.formations && team.formations.length > 1 && (
              <span className="text-xs text-gray-400">
                オプション: {team.formations.slice(1).map((f) => f.name).join(", ")}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {tactics.formationDescription}
          </p>
        </div>
      </section>

      {/* 強み・弱み */}
      <section>
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
          特徴
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {tactics.strengthTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: "#16a34a" }}
            >
              {tag}
            </span>
          ))}
          {tactics.weaknessTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 各セクション */}
      {sections.map((sec) => (
        <section key={sec.title}>
          <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
            {sec.title}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{sec.text}</p>
        </section>
      ))}

      {/* キーマン */}
      {tactics.keyPlayers.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accentColor }} />
            キーマン
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tactics.keyPlayers.map((kp, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4"
              >
                <p className="font-bold text-gray-900 text-sm">{kp.name}</p>
                <p className="text-xs text-gray-500 mt-1">{kp.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
