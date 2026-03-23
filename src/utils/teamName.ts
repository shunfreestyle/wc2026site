import type { Locale } from "@/types/i18n";
import type { Team } from "@/data/teams";

export function getTeamName(team: Team, locale: Locale): string {
  if (locale === "ja") return team.nameJa;
  return team.name;
}

export function getCoachName(team: Team, locale: Locale): string {
  if (locale === "ja") return team.coach.nameJa;
  return team.coach.name;
}
