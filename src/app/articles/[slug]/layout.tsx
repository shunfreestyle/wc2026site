import type { Metadata } from "next";
import { articles } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "記事が見つかりません | SAMURAI FOOTBALL" };

  const ogImages = article.thumbnail
    ? [{ url: article.thumbnail, width: 1200, height: 630 }]
    : [{ url: "https://samurai-football.jp/og-image.png", width: 1200, height: 630 }];

  return {
    title: `${article.title} | SAMURAI FOOTBALL`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://samurai-football.jp/articles/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      tags: article.tags,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | SAMURAI FOOTBALL`,
      description: article.excerpt,
      images: ogImages.map((img) => img.url),
    },
    alternates: {
      canonical: `https://samurai-football.jp/articles/${article.slug}`,
    },
    other: {
      "article:published_time": article.publishedAt,
      "article:modified_time": article.updatedAt ?? article.publishedAt,
    },
  };
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
