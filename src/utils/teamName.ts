import type { Locale } from "@/types/i18n";
import type { Team, Coach, Player } from "@/data/teams";

export function getTeamName(team: Team, locale: Locale): string {
  if (locale === "ja") return team.nameJa;
  return team.name;
}

export function getCoachName(team: Team, locale: Locale): string {
  if (locale === "ja") return team.coach.nameJa;
  return team.coach.name;
}

export function getTeamDescription(team: Team, locale: Locale): string {
  if (locale === "ja") return team.description;
  return team.descriptionEn ?? team.description;
}

export function getCoachStyle(coach: Coach, locale: Locale): string {
  if (locale === "ja") return coach.style;
  return coach.styleEn ?? coach.style;
}

export function getCoachNationality(coach: Coach, locale: Locale): string {
  if (locale === "ja") return coach.nationality;
  return coach.nationalityEn ?? coach.nationality;
}

export function getBestResult(team: Team, locale: Locale): string {
  if (locale === "ja") return team.bestResult;
  return team.bestResultEn ?? team.bestResult;
}

export function getPlayerDescription(player: Player, locale: Locale): string {
  if (!player.description) return "";
  if (locale === "ja") return player.description;
  return player.descriptionEn ?? player.description;
}
