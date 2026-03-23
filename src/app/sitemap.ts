import { getAllPlayers, teams } from "@/data/teams";
import type { MetadataRoute } from "next";

const BASE = "https://samurai-football.jp";
const LOCALES = ["ja", "en", "de", "fr", "es", "it", "pt", "nl", "pl", "ru", "tr"];

function multiLangUrls(
  path: string,
  priority: number,
  freq: MetadataRoute.Sitemap[0]["changeFrequency"],
): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}${path}`]),
        ),
      },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const players = getAllPlayers();

  const playerUrls: MetadataRoute.Sitemap = players.map(({ player }) => ({
    url: `${BASE}/players/${player.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const teamUrls: MetadataRoute.Sitemap = teams.map((t) => ({
    url: `${BASE}/teams/${t.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE}/teams/${t.id}`]),
      ),
    },
  }));

  return [
    ...multiLangUrls("/", 1.0, "daily"),
    ...multiLangUrls("/japan", 0.9, "daily"),
    ...multiLangUrls("/teams", 0.8, "weekly"),
    ...multiLangUrls("/matches", 0.8, "weekly"),
    ...multiLangUrls("/quiz", 0.7, "weekly"),
    ...multiLangUrls("/jleague", 0.7, "daily"),
    ...multiLangUrls("/japan/opponents/scotland", 0.7, "weekly"),
    ...multiLangUrls("/japan/opponents/england", 0.7, "weekly"),
    ...multiLangUrls("/japan/uniform", 0.6, "monthly"),
    ...teamUrls,
    ...playerUrls,
  ];
}
