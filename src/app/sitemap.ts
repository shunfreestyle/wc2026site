import { getAllPlayers, teams } from "@/data/teams";
import { articles } from "@/data/articles";
import { japanMatches } from "@/data/japan-matches";
import { j1Teams } from "@/data/j1-teams";
import { getAllMatchIds } from "@/data/jleague";
import type { MetadataRoute } from "next";

const BASE = "https://samurai-football.jp";

/** サイト最終更新日（デプロイ時に固定） */
const SITE_UPDATED = "2026-04-06";

function staticUrl(
  path: string,
  priority: number,
  freq: MetadataRoute.Sitemap[0]["changeFrequency"],
  lastMod: string = SITE_UPDATED,
): MetadataRoute.Sitemap[0] {
  return {
    url: `${BASE}${path}`,
    lastModified: lastMod,
    changeFrequency: freq,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const players = getAllPlayers();

  const playerUrls: MetadataRoute.Sitemap = players.map(({ player }) => ({
    url: `${BASE}/players/${player.id}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const teamUrls: MetadataRoute.Sitemap = teams.map((t) => ({
    url: `${BASE}/teams/${t.id}`,
    lastModified: SITE_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 記事ページ（実際の公開・更新日を使用）
  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
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
    staticUrl("/", 1.0, "daily"),
    staticUrl("/japan", 0.9, "daily"),
    staticUrl("/teams", 0.8, "weekly"),
    staticUrl("/articles", 0.9, "daily"),
    staticUrl("/quiz", 0.7, "weekly"),
    staticUrl("/quiz/japan-squad", 0.7, "weekly"),
    staticUrl("/stamen", 0.7, "weekly"),
    staticUrl("/jleague", 0.8, "daily"),
    staticUrl("/japan/matches", 0.8, "weekly"),
    staticUrl("/japan/opponents/scotland", 0.7, "weekly"),
    staticUrl("/japan/opponents/england", 0.7, "weekly"),
    staticUrl("/japan/uniform", 0.6, "monthly"),
    staticUrl("/about", 0.5, "monthly"),
    staticUrl("/privacy", 0.4, "monthly"),
    staticUrl("/terms", 0.4, "monthly"),
    staticUrl("/disclaimer", 0.4, "monthly"),
    staticUrl("/contact", 0.4, "monthly"),
    ...teamUrls,
    ...playerUrls,
    ...articleUrls,
    ...matchUrls,
    // J1リーグ: チーム詳細・監督・スタジアム・試合
    ...j1Teams.map((t) => ({
      url: `${BASE}/jleague/team/${t.id}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...j1Teams.map((t) => ({
      url: `${BASE}/jleague/team/${t.id}/manager`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...j1Teams.map((t) => ({
      url: `${BASE}/jleague/team/${t.id}/stadium`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...getAllMatchIds().map((id) => ({
      url: `${BASE}/jleague/${id}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
