import Link from "next/link";
import type { Team } from "@/data/teams";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="group block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-200 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{team.flag}</span>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-[#8B1538] transition-colors">
              {team.nameJa}
            </h3>
            <p className="text-xs text-gray-500">{team.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block bg-[#8B1538] text-white text-xs font-bold px-2 py-0.5 rounded">
            Group {team.group}
          </span>
          <span className="text-xs text-gray-500">
            FIFA #{team.fifaRanking}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {team.description}
        </p>
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-600">最高成績: {team.bestResult}</span>
          <span className="text-xs text-[#8B1538] font-medium group-hover:translate-x-1 transition-transform inline-block">
            詳細 →
          </span>
        </div>
      </div>
    </Link>
  );
}
