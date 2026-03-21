import { getAllPlayers } from "@/data/teams";
import { teams } from "@/data/teams";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const players = getAllPlayers();
  const playerUrls = players.map((p) => ({
    url: `https://samurai-football.jp/players/${p.player.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const teamUrls = teams.map((t) => ({
    url: `https://samurai-football.jp/teams/${t.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: "https://samurai-football.jp", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://samurai-football.jp/japan", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://samurai-football.jp/teams", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://samurai-football.jp/matches", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://samurai-football.jp/japan/opponents/scotland", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: "https://samurai-football.jp/japan/opponents/england", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: "https://samurai-football.jp/japan/uniform", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...teamUrls,
    ...playerUrls,
  ];
}
