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

  const displayTitle = locale === "en" && article.titleEn ? article.titleEn : article.title;
  const displayExcerpt = locale === "en" && article.excerptEn ? article.excerptEn : article.excerpt;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: displayTitle,
    description: displayExcerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: "SAMURAI FOOTBALL編集部",
    },
    publisher: {
      "@type": "Organization",
      name: "SAMURAI FOOTBALL",
      url: "https://samurai-football.jp",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://samurai-football.jp/articles/${article.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: "https://samurai-football.jp",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("記事一覧", "Articles"),
        item: "https://samurai-football.jp/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://samurai-football.jp/articles/${article.slug}`,
      },
    ],
  };

  return (
    <div className="article-page">
      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* パンくずリスト */}
      <nav aria-label="breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol className="flex items-center gap-1 text-xs text-gray-400" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <Link href="/" className="hover:text-gray-600 transition-colors">
              {t("ホーム", "Home")}
            </Link>
          </li>
          <li aria-hidden="true">&gt;</li>
          <li>
            <Link href="/articles" className="hover:text-gray-600 transition-colors">
              {t("記事一覧", "Articles")}
            </Link>
          </li>
          <li aria-hidden="true">&gt;</li>
          <li className="truncate max-w-[200px] sm:max-w-xs" title={displayTitle}>
            {displayTitle}
          </li>
        </ol>
      </nav>

      <span className={`category-badge badge-${getCategoryClass(article.category)}`}>
        {locale === "en" ? (categoryLabelEn[article.category] ?? article.category) : article.category}
      </span>

      <h1 className="article-title">{locale === "en" && article.titleEn ? article.titleEn : article.title}</h1>

      <div className="article-meta">
        <span className="date">
          {t("公開", "Published")}: {article.publishedAt}
        </span>
        {article.updatedAt && article.updatedAt !== article.publishedAt && (
          <span className="date">
            {t("更新", "Updated")}: {article.updatedAt}
          </span>
        )}
        {(locale === "en" && article.tagsEn ? article.tagsEn : article.tags).map((tag) => (
          <span key={tag} className="article-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="article-lead">{locale === "en" && article.excerptEn ? article.excerptEn : article.excerpt}</div>

      <ArticleBody content={locale === "en" && article.contentEn ? article.contentEn : article.content} />

      <div className="article-source">
        <span>{t("出典", "Sources")}:</span>
        {article.sources && article.sources.length > 0 ? (
          <ul className="source-list">
            {article.sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">
                  {src.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <span> JFA公式サイト、各クラブ公式サイト、Wikipedia</span>
        )}
      </div>

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
