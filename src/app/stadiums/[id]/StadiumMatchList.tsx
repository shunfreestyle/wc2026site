'use client';

import MatchCard from "@/components/MatchCard";
import type { Match } from "@/data/matches";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StadiumMatchList({ matches }: { matches: Match[] }) {
  const { locale } = useLanguage();

  return (
    <div>
      <h2 className="font-bold text-gray-900 mb-4">
        {locale === 'en' ? 'Matches at this venue' : 'この会場の試合一覧'}
        <span className="text-xs font-normal text-gray-400 ml-2">{matches.length}{locale === 'en' ? ' matches' : '試合'}</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </div>
  );
}
