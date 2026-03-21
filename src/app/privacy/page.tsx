import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | SAMURAI FOOTBALL",
  description: "SAMURAI FOOTBALLのプライバシーポリシー。個人情報の取り扱いについて。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>

        <div className="prose prose-gray max-w-none space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">基本方針</h2>
            <p>
              SAMURAI FOOTBALLは、ユーザーの個人情報保護を重要と考え、適切な管理・保護に努めます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">収集する情報</h2>
            <p>当サイトでは以下の情報を収集する場合があります：</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>お問い合わせフォームからご入力いただいた情報</li>
              <li>Googleアナリティクスによるアクセスログ（IPアドレス、ブラウザ情報等）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Cookieについて</h2>
            <p>
              当サイトはCookieを使用しています。Cookieはブラウザの設定から無効にできます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Google AdSenseについて</h2>
            <p>
              当サイトはGoogle AdSense等の第三者配信広告サービスを利用しています。
              広告配信事業者はユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
            </p>
            <p className="mt-2">
              Googleによるデータの使用については、
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0057A8] hover:underline"
              >
                Googleのポリシーと規約
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">アフィリエイトについて</h2>
            <p>
              当サイトは楽天アフィリエイト等のアフィリエイトプログラムに参加しています。
              商品リンクを経由して購入された場合、当サイトが紹介料を受け取ることがあります。
              ユーザーの購入価格に影響はありません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">免責事項</h2>
            <p>
              当サイトに掲載された情報については、正確性を期していますが、
              その内容の正確性・完全性・信頼性を保証するものではありません。
              当サイトの情報を利用したことにより生じた損害について、一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">著作権</h2>
            <p>
              当サイトに掲載されているコンテンツ（文章・画像・デザイン等）の著作権はSAMURAI FOOTBALLに帰属します。
              無断転載・複製を禁じます。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するお問い合わせは、
              <Link href="/contact" className="text-[#0057A8] hover:underline">お問い合わせページ</Link>
              よりお願いいたします。
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-200">
            制定日：2026年3月<br />
            運営：SAMURAI FOOTBALL 編集部
          </p>
        </div>
      </div>
    </div>
  );
}
