"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DisclaimerPage() {
  const { locale } = useLanguage();
  const t = (ja: ReactNode, en: ReactNode) => (locale === "en" ? en : ja);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          {t("免責事項・著作権について", "Disclaimer & Copyright")}
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("当サイトの性質", "Nature of This Site")}
            </h2>
            <p>
              {t(
                <>SAMURAI FOOTBALL（以下「当サイト」）は、2026年FIFAワールドカップおよびサッカーに関する情報を発信する<strong>個人運営のファンサイト</strong>です。FIFA、日本サッカー協会（JFA）、Jリーグ、各クラブ、その他いかなる公式組織とも提携・協賛関係にはありません。</>,
                <>SAMURAI FOOTBALL (hereinafter &quot;this site&quot;) is an <strong>independently operated fan site</strong> that provides information about the 2026 FIFA World Cup and football in general. It is not affiliated with, endorsed by, or sponsored by FIFA, JFA, J-League, or any official organization.</>
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("免責事項", "Disclaimer")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {t(
                  "当サイトに掲載された情報は、正確性を期して作成しておりますが、その内容の正確性・完全性・最新性を保証するものではありません。",
                  "While we strive for accuracy in the information published on this site, we do not guarantee its accuracy, completeness, or currency."
                )}
              </li>
              <li>
                {t(
                  "選手の成績・移籍情報・試合日程等は随時変動する可能性があります。最新の公式情報は各団体の公式サイトをご確認ください。",
                  "Player stats, transfer information, match schedules, etc. are subject to change. Please check the official websites of the respective organizations for the latest information."
                )}
              </li>
              <li>
                {t(
                  "当サイトの情報を利用したことにより生じた損害について、当サイト運営者は一切の責任を負いません。",
                  "The site operator accepts no liability for damages arising from the use of information on this site."
                )}
              </li>
              <li>
                {t(
                  "当サイトからリンクされた外部サイトの内容について、当サイトは管理・責任を負いません。",
                  "This site is not responsible for the content of external sites linked from this site."
                )}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("商標・知的財産権について", "Trademarks & Intellectual Property")}
            </h2>
            <p>
              {t(
                "当サイトで使用されている以下の名称・ロゴ等は、各権利者に帰属する商標または登録商標です。当サイトでの使用は情報提供を目的としたものであり、権利者の承認を示すものではありません。",
                "The following names and logos used on this site are trademarks or registered trademarks belonging to their respective rights holders. Their use on this site is for informational purposes only and does not imply endorsement by the rights holders."
              )}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                {t(
                  <><strong>FIFA</strong>、<strong>FIFA World Cup</strong>、<strong>FIFAワールドカップ</strong>は、F&eacute;d&eacute;ration Internationale de Football Associationの登録商標です。</>,
                  <><strong>FIFA</strong> and <strong>FIFA World Cup</strong> are registered trademarks of the F&eacute;d&eacute;ration Internationale de Football Association.</>
                )}
              </li>
              <li>
                {t(
                  <><strong>日本サッカー協会（JFA）</strong>、<strong>SAMURAI BLUE</strong>、<strong>なでしこジャパン</strong>は、公益財団法人日本サッカー協会の商標です。</>,
                  <><strong>JFA</strong>, <strong>SAMURAI BLUE</strong>, and <strong>Nadeshiko Japan</strong> are trademarks of the Japan Football Association.</>
                )}
              </li>
              <li>
                {t(
                  <><strong>Jリーグ</strong>および各クラブ名は、公益社団法人日本プロサッカーリーグおよび各クラブの商標です。</>,
                  <><strong>J-League</strong> and individual club names are trademarks of the Japan Professional Football League and their respective clubs.</>
                )}
              </li>
              <li>
                {t(
                  "各国代表チーム名、選手名、クラブ名等は、各権利者に帰属します。",
                  "National team names, player names, and club names belong to their respective rights holders."
                )}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("データ出典元", "Data Sources")}
            </h2>
            <p>
              {t(
                "当サイトに掲載されている選手成績・チーム情報・試合データ等は、以下の公開情報を参照して編集部が独自に作成しています。",
                "Player stats, team information, match data, etc. on this site are independently compiled by our editorial team based on the following public sources."
              )}
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>{t("日本サッカー協会（JFA）公式サイト", "Japan Football Association (JFA) Official Website")}</li>
              <li>{t("Jリーグ公式データサイト", "J-League Official Data Site")}</li>
              <li>{t("FIFA公式サイト", "FIFA Official Website")}</li>
              <li>{t("Wikipedia（選手経歴・移籍データ、CC BY-SA ライセンス）", "Wikipedia (player career and transfer data, CC BY-SA license)")}</li>
              <li>{t("FBref / Football Reference（詳細スタッツ）", "FBref / Football Reference (detailed statistics)")}</li>
              <li>{t("各クラブ公式サイト", "Official club websites")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("著作権", "Copyright")}
            </h2>
            <p>
              {t(
                "当サイトに掲載されているオリジナルの記事・分析・デザイン等の著作権は、SAMURAI FOOTBALL編集部に帰属します。無断転載・複製を禁じます。",
                "Copyright of original articles, analyses, and designs published on this site belongs to the SAMURAI FOOTBALL Editorial Team. Unauthorized reproduction is prohibited."
              )}
            </p>
            <p className="mt-2">
              {t(
                "引用を行う場合は、出典元として当サイト名とURLを明記してください。",
                "When quoting, please cite the source by including the site name and URL."
              )}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t("お問い合わせ", "Contact")}
            </h2>
            <p>
              {t(
                "商標権者の方で、当サイトのコンテンツに関してご指摘がございましたら、",
                "If you are a trademark holder and have concerns regarding content on this site, please contact us via our "
              )}
              <Link
                href="/contact"
                className="text-[#0057A8] hover:underline"
              >
                {t("お問い合わせページ", "contact page")}
              </Link>
              {t("よりご連絡ください。速やかに対応いたします。", ". We will respond promptly.")}
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
