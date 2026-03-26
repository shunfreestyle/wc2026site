"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { locale } = useLanguage();
  const t = (ja: string, en: string) => (locale === "en" ? en : ja);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          {t("運営者情報", "About Us")}
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          {/* --- サイト概要 --- */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("SAMURAI FOOTBALLについて", "About SAMURAI FOOTBALL")}
            </h2>
            <p>
              {t(
                "SAMURAI FOOTBALLは、2026年FIFAワールドカップ北中米大会を中心に、日本代表・海外組・Jリーグの情報を発信するサッカー専門の情報サイトです。",
                "SAMURAI FOOTBALL is a soccer information site focusing on the 2026 FIFA World Cup, the Japan National Team, Japanese players abroad, and the J-League."
              )}
            </p>
            <p className="mt-2">
              {t(
                "「サッカーファンが本当に知りたい情報を、正確に、深く、読みやすく届ける」ことをモットーに運営しています。公式組織との提携関係はなく、個人が運営するファンサイトです。",
                "Our motto is to deliver accurate, in-depth, and readable information that soccer fans truly want to know. This is a fan site with no official affiliation."
              )}
            </p>
          </section>

          {/* --- サイト情報テーブル --- */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("サイト情報", "Site Information")}
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50 w-32 sm:w-40">
                      {t("サイト名", "Site Name")}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900">
                      SAMURAI FOOTBALL
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50">
                      URL
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href="https://samurai-football.jp"
                        className="text-[#0057A8] hover:underline"
                      >
                        https://samurai-football.jp
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50">
                      {t("開設日", "Established")}
                    </td>
                    <td className="px-4 py-3">{t("2026年3月", "March 2026")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50">
                      {t("運営者", "Operator")}
                    </td>
                    <td className="px-4 py-3">
                      {t("SAMURAI FOOTBALL 編集部", "SAMURAI FOOTBALL Editorial Team")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50">
                      {t("連絡先", "Contact")}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href="mailto:contact@samurai-football.jp"
                        className="text-[#0057A8] hover:underline"
                      >
                        contact@samurai-football.jp
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* --- 編集方針 --- */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("編集方針", "Editorial Policy")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#0057A8] font-bold text-lg leading-none mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-bold text-gray-900">
                    {t("正確性の追求", "Pursuit of Accuracy")}
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    {t(
                      "選手成績・移籍情報・試合データは、JFA公式、Transfermarkt、FBref等の信頼できるソースを参照し、ファクトチェックを行ったうえで掲載しています。",
                      "Player stats, transfer information, and match data are fact-checked using reliable sources such as the JFA, Transfermarkt, and FBref before publication."
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0057A8] font-bold text-lg leading-none mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-bold text-gray-900">
                    {t("独自の分析視点", "Original Analysis")}
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    {t(
                      "単なるニュースの転載ではなく、戦術分析・選手の成長過程・データに基づく考察など、当サイト独自の視点で記事を作成しています。",
                      "Rather than simply reposting news, we provide tactical analysis, player development insights, and data-driven perspectives in our original articles."
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0057A8] font-bold text-lg leading-none mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-bold text-gray-900">
                    {t("迅速な情報更新", "Rapid Updates")}
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    {t(
                      "移籍・怪我・招集メンバー変更など、状況の変化に応じて記事内容を適宜更新しています。",
                      "We promptly update content in response to changes such as transfers, injuries, and squad selection updates."
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#0057A8] font-bold text-lg leading-none mt-0.5">
                  4
                </span>
                <div>
                  <p className="font-bold text-gray-900">
                    {t("公平性の維持", "Fairness")}
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    {t(
                      "特定のクラブ・選手・団体に偏ることなく、客観的な視点で情報を提供することを心がけています。",
                      "We strive to provide information from an objective perspective, without bias toward any particular club, player, or organization."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* --- コンテンツ --- */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("提供コンテンツ", "Content")}
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>{t("2026 FIFAワールドカップ 全104試合の日程・結果", "2026 FIFA World Cup — schedules and results for all 104 matches")}</li>
              <li>{t("出場48カ国の代表チーム・選手データベース", "Database of all 48 participating national teams and players")}</li>
              <li>{t("日本代表（SAMURAI BLUE）の招集メンバー・試合詳細", "Japan National Team (SAMURAI BLUE) squad and match details")}</li>
              <li>{t("選手プロフィール・キャリア分析記事", "Player profiles and career analysis articles")}</li>
              <li>{t("W杯・海外組・Jリーグの最新ニュース", "Latest news on the World Cup, Japanese players abroad, and J-League")}</li>
              <li>{t("戦術分析コラム", "Tactical analysis columns")}</li>
              <li>{t("各国代表ユニフォーム情報", "National team uniform information")}</li>
              <li>{t("インタラクティブクイズ・スタメンメーカー", "Interactive quiz and lineup maker")}</li>
            </ul>
          </section>

          {/* --- リンクセクション --- */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("関連ページ", "Related Pages")}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-[#0057A8] hover:underline"
                >
                  {t("プライバシーポリシー", "Privacy Policy")}
                </Link>
                <span className="text-gray-400 ml-2">
                  — {t("個人情報の取り扱い、Cookie、広告について", "Personal information handling, cookies, and advertising")}
                </span>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#0057A8] hover:underline"
                >
                  {t("利用規約", "Terms of Service")}
                </Link>
                <span className="text-gray-400 ml-2">
                  — {t("当サイトの利用条件", "Terms and conditions of use")}
                </span>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-[#0057A8] hover:underline"
                >
                  {t("免責事項・著作権について", "Disclaimer & Copyright")}
                </Link>
                <span className="text-gray-400 ml-2">
                  — {t("商標、データ出典元、著作権方針", "Trademarks, data sources, and copyright policy")}
                </span>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#0057A8] hover:underline"
                >
                  {t("お問い合わせ", "Contact")}
                </Link>
                <span className="text-gray-400 ml-2">
                  — {t("ご質問・ご意見・誤情報のご指摘", "Questions, feedback, and error reports")}
                </span>
              </li>
            </ul>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-200">
            {t("最終更新：2026年3月", "Last updated: March 2026")}
          </p>
        </div>
      </div>
    </div>
  );
}
