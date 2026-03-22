import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import ArticleBody from "./ArticleBody";
import "./article.css";

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
  return {
    title: `${article.title} | SAMURAI FOOTBALL`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

function getCategoryClass(category: string) {
  const map: Record<string, string> = {
    "日本代表": "japan",
    "Jリーグ": "jleague",
    "W杯": "wcup",
    "海外組": "kaigai",
    "コラム": "column",
  };
  return map[category] ?? "japan";
}

const categoryColors: Record<string, string> = {
  "日本代表": "bg-blue-100 text-blue-800",
  "Jリーグ": "bg-green-100 text-green-800",
  "W杯": "bg-amber-100 text-amber-800",
  "海外組": "bg-purple-100 text-purple-800",
  "コラム": "bg-gray-100 text-gray-800",
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="article-page">
        {/* Back link */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Link
            href="/articles"
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            ← 記事一覧
          </Link>
        </div>

        {/* Category badge */}
        <span className={`category-badge badge-${getCategoryClass(article.category)}`}>
          {article.category}
        </span>

        {/* Title */}
        <h1 className="article-title">{article.title}</h1>

        {/* Meta */}
        <div className="article-meta">
          <span className="date">{article.publishedAt}</span>
          {article.tags.map((tag) => (
            <span key={tag} className="article-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Lead */}
        <div className="article-lead">{article.excerpt}</div>

        {/* Article Body */}
        <ArticleBody content={article.content} />

        {/* DAZN AFFILIATE BANNER HERE */}

        {/* Related Articles */}
        {related.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2 className="article-h2">関連記事</h2>
            <div className="space-y-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/articles/${r.slug}`}
                  className="block bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[r.category] || "bg-gray-100 text-gray-800"}`}
                    >
                      {r.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{r.publishedAt}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        <p className="article-source">
          出典: JFA公式サイト、各クラブ公式サイト、Transfermarkt
        </p>

        {/* Back */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link
            href="/articles"
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
