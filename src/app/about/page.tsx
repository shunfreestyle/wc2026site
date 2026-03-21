import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者情報 | SAMURAI FOOTBALL",
  description: "SAMURAI FOOTBALLの運営者情報・サイト概要。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">運営者情報</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">SAMURAI FOOTBALLについて</h2>
            <p>
              SAMURAI FOOTBALLは、2026年FIFAワールドカップ北中米大会を応援するサッカー情報サイトです。
              日本代表の最新情報・試合結果・メンバー・ユニフォーム情報などを発信しています。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">サイト情報</h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50 w-32 sm:w-40">サイト名</td>
                    <td className="px-4 py-3 font-bold text-gray-900">SAMURAI FOOTBALL</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50">URL</td>
                    <td className="px-4 py-3">
                      <a href="https://samurai-football.jp" className="text-[#0057A8] hover:underline">
                        https://samurai-football.jp
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50">開設</td>
                    <td className="px-4 py-3">2026年3月</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-500 bg-gray-50">運営</td>
                    <td className="px-4 py-3">SAMURAI FOOTBALL 編集部</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">コンテンツについて</h2>
            <p>当サイトでは以下のコンテンツを提供しています：</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>2026 FIFAワールドカップの試合日程・結果</li>
              <li>出場48チームの情報</li>
              <li>日本代表（SAMURAI BLUE）の招集メンバー・試合詳細</li>
              <li>各国代表ユニフォーム情報・購入リンク</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">お問い合わせ</h2>
            <p>
              サイトに関するご質問・ご意見は
              <Link href="/contact" className="text-[#0057A8] hover:underline">お問い合わせページ</Link>
              よりお願いいたします。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
