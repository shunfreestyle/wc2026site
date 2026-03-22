import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import ArticleBody from "./ArticleBody";

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

const categoryColors: Record<string, string> = {
  "日本代表": "bg-blue-100 text-blue-800",
  "Jリーグ": "bg-green-100 text-green-800",
  "W杯": "bg-amber-100 text-amber-800",
  "海外組": "bg-purple-100 text-purple-800",
  "コラム": "bg-gray-100 text-gray-800",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${y}年${m}月${day}日（${dow}）`;
}

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A1A3C] to-[#1a3570] text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/articles"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              ← 記事一覧
            </Link>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[article.category] || "bg-gray-100 text-gray-800"}`}
            >
              {article.category}
            </span>
            <span className="text-xs text-white/50">{formatDate(article.publishedAt)}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black leading-snug">{article.title}</h1>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <ArticleBody content={article.content} />
        </div>

        {/* DAZN AFFILIATE BANNER HERE */}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">関連記事</h2>
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

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            href="/articles"
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
