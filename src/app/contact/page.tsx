import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | SAMURAI FOOTBALL",
  description: "SAMURAI FOOTBALLへのお問い合わせ先のご案内。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">お問い合わせ</h1>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
          <p>
            SAMURAI FOOTBALLへのお問い合わせは以下のメールアドレスまでお送りください。
          </p>

          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <p className="text-2xl mb-2">📧</p>
            <a
              href="mailto:contact@samurai-football.jp"
              className="text-lg font-bold text-[#0057A8] hover:underline"
            >
              contact@samurai-football.jp
            </a>
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p>※ 内容によっては返信にお時間をいただく場合があります。</p>
            <p>※ 広告・スパム・営業目的のメールはお断りします。</p>
          </div>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-200">
            運営：SAMURAI FOOTBALL 編集部
          </p>
        </div>
      </div>
    </div>
  );
}
