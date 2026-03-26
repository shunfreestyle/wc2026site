import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/news-research",
          "/player-writer",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: "https://samurai-football.jp/sitemap.xml",
  };
}
