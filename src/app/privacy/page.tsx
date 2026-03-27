"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { locale } = useLanguage();
  const t = (ja: string, en: string) => (locale === "en" ? en : ja);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          {t("プライバシーポリシー", "Privacy Policy")}
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("基本方針", "Basic Policy")}
            </h2>
            <p>
              {t(
                "SAMURAI FOOTBALLは、ユーザーの個人情報保護を重要と考え、適切な管理・保護に努めます。",
                "SAMURAI FOOTBALL values the protection of users' personal information and strives to manage and protect it appropriately."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("収集する情報と利用目的", "Information We Collect & Purpose of Use")}
            </h2>
            <p>
              {t(
                "当サイトでは以下の情報を、それぞれの目的のために収集・利用します：",
                "We collect and use the following information for the purposes described:"
              )}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                {t(
                  "お問い合わせフォームからご入力いただいた情報（氏名・メールアドレス・お問い合わせ内容）→ お問い合わせへの回答および対応のため",
                  "Information submitted via the contact form (name, email, message) — to respond to and handle your inquiry"
                )}
              </li>
              <li>
                {t(
                  "Googleアナリティクスによるアクセスログ（IPアドレス、ブラウザ情報、閲覧ページ等）→ サイトの利用状況の分析およびコンテンツ改善のため",
                  "Access logs from Google Analytics (IP address, browser info, pages viewed, etc.) — to analyze site usage and improve content"
                )}
              </li>
              <li>
                {t(
                  "Google AdSenseによるCookie情報 → 興味関心に基づいた広告配信のため（第三者である広告配信事業者が使用）",
                  "Cookie data from Google AdSense — to deliver interest-based advertising (used by third-party ad providers)"
                )}
              </li>
              <li>
                {t(
                  "言語設定の選択情報（localStorage）→ 次回アクセス時の表示言語の維持のため",
                  "Language preference (localStorage) — to maintain your display language on subsequent visits"
                )}
              </li>
            </ul>
            <p className="mt-2">
              {t(
                "上記以外の目的で個人情報を利用することはありません。法的根拠：ユーザーの同意（Cookie同意バナーによる）および当サイト運営の正当な利益に基づきます。",
                "We do not use personal information for purposes other than those listed above. Legal basis: user consent (via cookie consent banner) and legitimate interests of site operation."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("Cookieについて", "Cookies")}
            </h2>
            <p>
              {t(
                "当サイトはCookieを使用しています。Cookieはブラウザの設定から無効にできます。",
                "This site uses cookies. You can disable cookies in your browser settings."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("Google AdSenseについて", "Google AdSense")}
            </h2>
            <p>
              {t(
                "当サイトはGoogle AdSense等の第三者配信広告サービスを利用しています。広告配信事業者はユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。",
                "This site uses third-party advertising services such as Google AdSense. Advertisers may use cookies to display interest-based ads."
              )}
            </p>
            <p className="mt-2">
              {t("Googleによるデータの使用については、", "For details on how Google uses data, please see ")}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0057A8] hover:underline"
              >
                {t("Googleのポリシーと規約", "Google's Policies and Terms")}
              </a>
              {t("をご確認ください。", ".")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("アフィリエイトについて", "Affiliate Programs")}
            </h2>
            <p>
              {t(
                "当サイトは楽天アフィリエイト等のアフィリエイトプログラムに参加しています。商品リンクを経由して購入された場合、当サイトが紹介料を受け取ることがあります。ユーザーの購入価格に影響はありません。",
                "This site participates in affiliate programs such as Rakuten Affiliate. If you purchase through our product links, we may receive a referral fee. This does not affect the purchase price for users."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("ユーザーの権利", "Your Rights")}
            </h2>
            <p>
              {t(
                "ユーザーは、ご自身の個人情報について以下の権利を有します。",
                "You have the following rights regarding your personal data:"
              )}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                {t(
                  "アクセス権：当サイトが保有するご自身の個人情報の開示を請求する権利",
                  "Right of access: You may request disclosure of your personal data held by us"
                )}
              </li>
              <li>
                {t(
                  "訂正権：不正確な個人情報の訂正を請求する権利",
                  "Right to rectification: You may request correction of inaccurate personal data"
                )}
              </li>
              <li>
                {t(
                  "削除権：個人情報の削除を請求する権利",
                  "Right to erasure: You may request deletion of your personal data"
                )}
              </li>
              <li>
                {t(
                  "データポータビリティ権：ご自身の個人情報を構造化された形式で受け取る権利",
                  "Right to data portability: You may request your personal data in a structured, machine-readable format"
                )}
              </li>
              <li>
                {t(
                  "処理制限権：一定の条件下で個人情報の処理の制限を請求する権利",
                  "Right to restrict processing: You may request restriction of processing under certain conditions"
                )}
              </li>
            </ul>
            <p className="mt-2">
              {t("これらの権利の行使を希望される場合は、", "To exercise any of these rights, please use our ")}
              <Link href="/contact" className="text-[#0057A8] hover:underline">
                {t("お問い合わせページ", "contact page")}
              </Link>
              {t("よりご連絡ください。", ".")}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("データの保持期間", "Data Retention")}
            </h2>
            <p>
              {t(
                "お問い合わせフォームからいただいた情報は、対応完了後1年間保持し、その後削除します。Googleアナリティクスのデータは、Googleの標準保持期間（14ヶ月）に準じます。",
                "Information submitted via the contact form is retained for 1 year after resolution, then deleted. Google Analytics data follows Google's standard retention period (14 months)."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("免責事項", "Disclaimer")}
            </h2>
            <p>
              {t(
                "当サイトに掲載された情報については、正確性を期していますが、その内容の正確性・完全性・信頼性を保証するものではありません。当サイトの情報を利用したことにより生じた損害について、一切の責任を負いません。",
                "While we strive for accuracy, we do not guarantee the accuracy, completeness, or reliability of the information on this site. We accept no liability for damages arising from use of information on this site."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("著作権", "Copyright")}
            </h2>
            <p>
              {t(
                "当サイトに掲載されているコンテンツ（文章・画像・デザイン等）の著作権はSAMURAI FOOTBALLに帰属します。無断転載・複製を禁じます。",
                "Copyright of all content (text, images, design, etc.) on this site belongs to SAMURAI FOOTBALL. Unauthorized reproduction is prohibited."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("お問い合わせ", "Contact")}
            </h2>
            <p>
              {t("プライバシーポリシーに関するお問い合わせは、", "For inquiries regarding this privacy policy, please use our ")}
              <Link href="/contact" className="text-[#0057A8] hover:underline">
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
