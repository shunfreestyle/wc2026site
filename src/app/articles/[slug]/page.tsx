"use client";

import "./article.css";
import Link from "next/link";
import { useParams } from "next/navigation";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import ArticleBody from "./ArticleBody";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryLabelEn: Record<string, string> = {
  "日本代表": "Japan NT",
  "Jリーグ": "J.League",
  "W杯": "World Cup",
  "海外組": "Overseas",
  "コラム": "Column",
  "選手紹介": "Players",
};

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

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLanguage();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const t = (ja: string, en: string) => (locale === "en" ? en : ja);

  return (
    <div className="article-page">
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/articles"
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          {t("← 記事一覧", "← Articles")}
        </Link>
      </div>

      <span className={`category-badge badge-${getCategoryClass(article.category)}`}>
        {locale === "en" ? (categoryLabelEn[article.category] ?? article.category) : article.category}
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
        {t(
          "出典: JFA公式サイト、各クラブ公式サイト、Transfermarkt",
          "Sources: JFA Official, Club Official Sites, Transfermarkt"
        )}
      </p>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link
          href="/articles"
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          {t("← 記事一覧に戻る", "← Back to articles")}
        </Link>
      </div>
    </div>
  );
}
