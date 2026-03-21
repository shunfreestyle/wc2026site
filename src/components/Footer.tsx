import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚽</span>
              <div>
                <p className="text-white font-bold">SAMURAI FOOTBALL</p>
                <p className="text-xs"><span className="text-[#E8192C]">USA</span> | <span className="text-[#00843D]">Mexico</span> | <span className="text-white">Canada</span></p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              2026年FIFAワールドカップの情報サイト。出場チーム・選手・監督・試合日程をご覧いただけます。
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">ホーム</Link></li>
              <li><Link href="/teams" className="hover:text-white transition-colors">出場チーム一覧</Link></li>
              <li><Link href="/matches" className="hover:text-white transition-colors">試合日程・結果</Link></li>
              <li><Link href="/japan" className="hover:text-white transition-colors">🇯🇵 日本代表特設ページ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">サイト情報</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">運営者情報</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs">
          <p>&copy; 2026 SAMURAI FOOTBALL. This is a fan-made site.</p>
        </div>
      </div>
    </footer>
  );
}
