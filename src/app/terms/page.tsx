"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsPage() {
  const { locale } = useLanguage();
  const t = (ja: string, en: string) => (locale === "en" ? en : ja);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          {t("利用規約", "Terms of Service")}
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第1条（適用）", "Article 1 (Application)")}
            </h2>
            <p>
              {t(
                "本利用規約（以下「本規約」）は、SAMURAI FOOTBALL（以下「当サイト」）が提供するすべてのサービスの利用に関する条件を定めるものです。ユーザーの皆さまには本規約に同意のうえ、当サイトをご利用いただきます。",
                "These Terms of Service (hereinafter \"these Terms\") govern all services provided by SAMURAI FOOTBALL (hereinafter \"this site\"). By using this site, users agree to be bound by these Terms."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第2条（定義）", "Article 2 (Definitions)")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {t(
                  "「当サイト」とは、SAMURAI FOOTBALL編集部が運営するウェブサイト（https://samurai-football.jp）を指します。",
                  "\"This site\" refers to the website (https://samurai-football.jp) operated by the SAMURAI FOOTBALL Editorial Team."
                )}
              </li>
              <li>
                {t(
                  "「ユーザー」とは、当サイトを閲覧・利用するすべての方を指します。",
                  "\"User\" refers to all visitors who browse or use this site."
                )}
              </li>
              <li>
                {t(
                  "「コンテンツ」とは、当サイトに掲載されている記事・データ・画像・デザイン等を指します。",
                  "\"Content\" refers to articles, data, images, design, and other materials published on this site."
                )}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第3条（禁止事項）", "Article 3 (Prohibited Activities)")}
            </h2>
            <p>
              {t(
                "ユーザーは、当サイトの利用にあたり以下の行為を行ってはなりません。",
                "Users shall not engage in the following activities when using this site."
              )}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                {t(
                  "当サイトのコンテンツの無断転載・複製・改変・再配布",
                  "Unauthorized reproduction, copying, modification, or redistribution of this site's content"
                )}
              </li>
              <li>
                {t(
                  "当サイトのサーバーやネットワークに過度な負荷をかける行為",
                  "Placing excessive load on this site's servers or network"
                )}
              </li>
              <li>
                {t(
                  "当サイトの運営を妨害する行為",
                  "Interfering with the operation of this site"
                )}
              </li>
              <li>
                {t(
                  "他のユーザーまたは第三者の権利を侵害する行為",
                  "Infringing on the rights of other users or third parties"
                )}
              </li>
              <li>
                {t(
                  "スクレイピング等による大量のデータ収集",
                  "Mass data collection through scraping or similar methods"
                )}
              </li>
              <li>
                {t(
                  "法令または公序良俗に反する行為",
                  "Activities that violate laws or public order and morals"
                )}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第4条（知的財産権）", "Article 4 (Intellectual Property)")}
            </h2>
            <p>
              {t(
                "当サイトに掲載されているオリジナルの記事・分析・デザイン等の著作権は、SAMURAI FOOTBALL編集部に帰属します。引用を行う場合は、出典元として当サイト名（SAMURAI FOOTBALL）とURLを明記してください。",
                "Copyright of original articles, analyses, and designs published on this site belongs to the SAMURAI FOOTBALL Editorial Team. When quoting, please cite the source by including the site name (SAMURAI FOOTBALL) and URL."
              )}
            </p>
            <p className="mt-2">
              {t("FIFA、JFA、Jリーグ、各クラブ等の商標・名称については、各権利者に帰属します。詳しくは", "Trademarks and names of FIFA, JFA, J-League, and clubs belong to their respective rights holders. For details, see our ")}
              <Link
                href="/disclaimer"
                className="text-[#0057A8] hover:underline"
              >
                {t("免責事項・著作権ページ", "Disclaimer & Copyright page")}
              </Link>
              {t("をご確認ください。", ".")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第5条（免責事項）", "Article 5 (Disclaimer)")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {t(
                  "当サイトは情報の正確性・完全性・最新性を保証するものではありません。選手の成績・移籍情報・試合日程等は随時変動する可能性があります。",
                  "This site does not guarantee the accuracy, completeness, or currency of information. Player stats, transfer information, match schedules, etc. are subject to change at any time."
                )}
              </li>
              <li>
                {t(
                  "当サイトの利用により生じた損害について、当サイト運営者は一切の責任を負いません。",
                  "The site operator accepts no liability for damages arising from the use of this site."
                )}
              </li>
              <li>
                {t(
                  "当サイトからリンクされた外部サイトの内容について、当サイトは管理・責任を負いません。",
                  "This site is not responsible for the content of external sites linked from this site."
                )}
              </li>
              <li>
                {t(
                  "当サイトは予告なくコンテンツの変更・削除、サービスの中断・終了を行う場合があります。",
                  "This site may change or delete content, or suspend or terminate services without prior notice."
                )}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第6条（広告・アフィリエイト）", "Article 6 (Advertising & Affiliates)")}
            </h2>
            <p>
              {t(
                "当サイトはGoogle AdSense等の第三者配信広告サービス、および楽天アフィリエイト等のアフィリエイトプログラムを利用しています。広告配信やアフィリエイトの詳細については、",
                "This site uses third-party advertising services such as Google AdSense and affiliate programs such as Rakuten Affiliate. For details on advertising and affiliates, please see our "
              )}
              <Link
                href="/privacy"
                className="text-[#0057A8] hover:underline"
              >
                {t("プライバシーポリシー", "Privacy Policy")}
              </Link>
              {t("をご確認ください。", ".")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第7条（個人情報の取り扱い）", "Article 7 (Personal Information)")}
            </h2>
            <p>
              {t("ユーザーの個人情報の取り扱いについては、", "The handling of users' personal information is governed by our ")}
              <Link
                href="/privacy"
                className="text-[#0057A8] hover:underline"
              >
                {t("プライバシーポリシー", "Privacy Policy")}
              </Link>
              {t("に従います。", ".")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第8条（本規約の変更）", "Article 8 (Changes to Terms)")}
            </h2>
            <p>
              {t(
                "当サイトは、必要に応じて本規約を変更することができます。変更後の利用規約は当サイトに掲載した時点で効力を生じるものとし、ユーザーが変更後も当サイトの利用を継続した場合、変更後の規約に同意したものとみなします。",
                "This site may change these Terms as necessary. Revised Terms become effective upon posting on this site. Continued use of this site after changes constitutes consent to the revised Terms."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("第9条（準拠法・管轄）", "Article 9 (Governing Law)")}
            </h2>
            <p>
              {t(
                "本規約の解釈にあたっては日本法を準拠法とします。",
                "These Terms shall be governed by and construed in accordance with the laws of Japan."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("お問い合わせ", "Contact")}
            </h2>
            <p>
              {t("本規約に関するお問い合わせは、", "For inquiries regarding these Terms, please use our ")}
              <Link
                href="/contact"
                className="text-[#0057A8] hover:underline"
              >
                {t("お問い合わせページ", "contact page")}
              </Link>
              {t("よりお願いいたします。", ".")}
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-200">
            {t("制定日：2026年3月", "Established: March 2026")}
            <br />
            {t("運営：SAMURAI FOOTBALL 編集部", "Operated by SAMURAI FOOTBALL Editorial Team")}
          </p>
        </div>
      </div>
    </div>
  );
}
