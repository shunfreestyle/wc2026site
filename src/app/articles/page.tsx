"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { articles } from "@/data/articles";
import type { Article } from "@/data/articles";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORIES = ["新着", "人気", "日本代表", "Jリーグ", "W杯", "海外組", "コラム", "選手紹介"] as const;
type Tab = (typeof CATEGORIES)[number];

const categoryLabelsEn: Record<Tab, string> = {
  "新着": "Latest",
  "人気": "Popular",
  "日本代表": "Japan NT",
  "Jリーグ": "J.League",
  "W杯": "World Cup",
  "海外組": "Overseas",
  "コラム": "Column",
  "選手紹介": "Players",
};

const categoryColors: Record<Article["category"], string> = {
  "日本代表": "bg-blue-100 text-blue-800",
  "Jリーグ": "bg-green-100 text-green-800",
  "W杯": "bg-amber-100 text-amber-800",
  "海外組": "bg-purple-100 text-purple-800",
  "コラム": "bg-gray-100 text-gray-800",
  "選手紹介": "bg-indigo-100 text-indigo-800",
};

export default function ArticlesPage() {
  const { locale } = useLanguage();
  const [tab, setTab] = useState<Tab>("新着");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...articles];

    if (tab === "人気") {
      list = list.filter((a) => a.isPopular);
    } else if (tab !== "新着") {
      list = list.filter((a) => a.category === tab);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.titleEn?.toLowerCase().includes(q)) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          (a.tagsEn?.some((t) => t.toLowerCase().includes(q))) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.excerptEn?.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => {
      const dateCmp = b.publishedAt.localeCompare(a.publishedAt);
      if (dateCmp !== 0) return dateCmp;
      // 同日の記事は配列の定義順（=追加順=新しい順）を維持
      return articles.indexOf(a) - articles.indexOf(b);
    });
  }, [tab, search]);

  const t = (ja: string, en: string) => (locale === "en" ? en : ja);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1A3C] to-[#1a3570] text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            SAMURAI FOOTBALL
          </p>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t("記事・コラム", "Articles & Columns")}
          </h1>
          <p className="text-blue-200/60 text-sm mt-1">
            {t(
              "日本代表・W杯・Jリーグの最新情報を深堀り",
              "In-depth coverage of Japan NT, World Cup & J.League"
            )}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t(
            "記事を検索（タイトル・タグ・キーワード）",
            "Search articles (title, tag, keyword)"
          )}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>

      {/* Tabs */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white border-b border-gray-200 mt-4">
        <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setTab(cat)}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap cursor-pointer"
              style={
                tab === cat
                  ? { background: "#0A1A3C", color: "#fff" }
                  : { background: "transparent", color: "#6B7280", border: "1px solid #E5E7EB" }
              }
            >
              {locale === "en" ? categoryLabelsEn[cat] : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📝</p>
            <p className="font-bold">
              {t("記事が見つかりませんでした", "No articles found")}
            </p>
            <p className="text-sm mt-1">
              {t(
                "別のキーワードやカテゴリをお試しください",
                "Try a different keyword or category"
              )}
            </p>
          </div>
        ) : (
          filtered.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="block bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColors[article.category]}`}>
                  {locale === "en"
                    ? categoryLabelsEn[article.category as Tab]
                    : article.category}
                </span>
                <span className="text-[10px] text-gray-400">{article.publishedAt}</span>
                {article.isPopular && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                    {t("人気", "Popular")}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                {locale === "en" && article.titleEn ? article.titleEn : article.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {locale === "en" && article.excerptEn ? article.excerptEn : article.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(locale === "en" && article.tagsEn ? article.tagsEn : article.tags).slice(0, 5).map((tag) => (
                  <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
