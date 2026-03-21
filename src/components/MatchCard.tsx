import Link from "next/link";
import type { Match } from "@/data/matches";
import { getTeamById } from "@/data/teams";

function TeamDisplay({
  teamId,
  label,
  align,
}: {
  teamId: string;
  label?: string;
  align: "left" | "right";
}) {
  const team = teamId ? getTeamById(teamId) : undefined;

  if (team) {
    const inner = (
      <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <span className="text-2xl shrink-0">{team.flag}</span>
        <div className={`min-w-0 ${align === "right" ? "text-right" : ""}`}>
          <p className="font-semibold text-gray-900 text-sm truncate">{team.nameJa}</p>
          <p className="text-xs text-gray-500">{team.code}</p>
        </div>
      </div>
    );
    return (
      <Link
        href={`/teams/${team.id}`}
        className="flex-1 hover:opacity-75 transition-opacity"
      >
        {inner}
      </Link>
    );
  }

  // Knockout TBD team
  return (
    <div className={`flex-1 ${align === "right" ? "text-right" : ""}`}>
      <p className="font-semibold text-gray-600 text-sm">{label || "TBD"}</p>
    </div>
  );
}

export default function MatchCard({ match }: { match: Match }) {
  const stageBadge =
    match.stage === "グループステージ" && match.group ? (
      <span className="bg-[#E8192C] text-white text-xs font-bold px-2 py-0.5 rounded">
        Group {match.group}
      </span>
    ) : (
      <span className="bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded">
        {match.stage}
      </span>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      {/* Header: stage badge + time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">{stageBadge}</div>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-700">
            {match.localTime} <span className="text-gray-400">({match.timezone})</span>
          </p>
          <p className="text-[11px] text-gray-500">
            {match.jstDate === match.date ? "" : `${match.jstDate.slice(5)} `}
            {match.jstTime} <span className="text-gray-400">(JST)</span>
          </p>
        </div>
      </div>

      {/* Teams / Score */}
      <div className="flex items-center justify-between gap-3">
        <TeamDisplay teamId={match.homeTeamId} label={match.homeLabel} align="left" />

        <div className="shrink-0">
          {match.status === "finished" ? (
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5">
              <span className="text-lg font-bold text-gray-900">{match.homeScore}</span>
              <span className="text-gray-400 mx-0.5">-</span>
              <span className="text-lg font-bold text-gray-900">{match.awayScore}</span>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-gray-500">VS</span>
            </div>
          )}
        </div>

        <TeamDisplay teamId={match.awayTeamId} label={match.awayLabel} align="right" />
      </div>

      {/* Venue */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{match.venue}, {match.city}</span>
        </div>
        <span className="text-[11px] text-gray-500 shrink-0 ml-2">#{match.matchNumber}</span>
      </div>
    </div>
  );
}
