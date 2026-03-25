import { getAllPlayers, teams } from "@/data/teams";
import { articles } from "@/data/articles";
import { japanMatches } from "@/data/japan-matches";
import type { MetadataRoute } from "next";

const BASE = "https://samurai-football.jp";
const LOCALES = ["ja", "en"];

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
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const teamUrls: MetadataRoute.Sitemap = teams.map((t) => ({
    url: `${BASE}/teams/${t.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE}/teams/${t.id}`]),
      ),
    },
  }));

  // 記事ページ
  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 日本代表 試合詳細ページ
  const matchUrls: MetadataRoute.Sitemap = japanMatches.map((m) => ({
    url: `${BASE}/japan/matches/${m.id}`,
    lastModified: new Date(m.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...multiLangUrls("/", 1.0, "daily"),
    ...multiLangUrls("/japan", 0.9, "daily"),
    ...multiLangUrls("/teams", 0.8, "weekly"),
    ...multiLangUrls("/articles", 0.9, "daily"),
    ...multiLangUrls("/quiz", 0.7, "weekly"),
    ...multiLangUrls("/quiz/japan-squad", 0.7, "weekly"),
    ...multiLangUrls("/stamen", 0.7, "weekly"),
    ...multiLangUrls("/jleague", 0.7, "daily"),
    ...multiLangUrls("/japan/matches", 0.8, "weekly"),
    ...multiLangUrls("/japan/opponents/scotland", 0.7, "weekly"),
    ...multiLangUrls("/japan/opponents/england", 0.7, "weekly"),
    ...multiLangUrls("/japan/uniform", 0.6, "monthly"),
    ...multiLangUrls("/about", 0.5, "monthly"),
    ...multiLangUrls("/privacy", 0.4, "monthly"),
    ...multiLangUrls("/contact", 0.4, "monthly"),
    ...teamUrls,
    ...playerUrls,
    ...articleUrls,
    ...matchUrls,
  ];
}
