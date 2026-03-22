import "./article.css";
import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import ArticleBody from "./ArticleBody";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function getCategoryClass(category: string) {
  const map: Record<string, string> = {
    "日本代表": "japan",
    "Jリーグ": "jleague",
    "W杯": "wcup",
    "海外組": "kaigai",
    "コラム": "column",
    "選手紹介": "player",
  };
  return map[category] ?? "japan";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "記事が見つかりません | SAMURAI FOOTBALL" };
  return {
    title: `${article.title} | SAMURAI FOOTBALL`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  return (
    <div className="article-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/articles"
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          ← 記事一覧
        </Link>
      </div>

      <span className={`category-badge badge-${getCategoryClass(article.category)}`}>
        {article.category}
      </span>

      <h1 className="article-title">{article.title}</h1>

      <div className="article-meta">
        <span className="date">{article.publishedAt}</span>
        {article.tags.map((tag) => (
          <span key={tag} className="article-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="article-lead">{article.excerpt}</div>

      <ArticleBody content={article.content} />

      <p className="article-source">
        出典: JFA公式サイト、各クラブ公式サイト、Transfermarkt
      </p>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link
          href="/articles"
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
