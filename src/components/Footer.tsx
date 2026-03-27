'use client';

import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { locale } = useLanguage();
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
              {locale === 'en' ? "Your guide to the 2026 FIFA World Cup — teams, players, coaches and match schedules." : "2026年FIFAワールドカップの情報サイト。出場チーム・選手・監督・試合日程をご覧いただけます。"}
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{locale === 'en' ? "Site Map" : "サイトマップ"}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">{locale === 'en' ? "Home" : "ホーム"}</Link></li>
              <li><Link href="/teams" className="hover:text-white transition-colors">{locale === 'en' ? "All Teams" : "出場チーム一覧"}</Link></li>
              <li><Link href="/matches" className="hover:text-white transition-colors">{locale === 'en' ? "Match Schedule" : "試合日程・結果"}</Link></li>
              <li><Link href="/japan" className="hover:text-white transition-colors">{locale === 'en' ? "🇯🇵 Japan National Team" : "🇯🇵 日本代表特設ページ"}</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">{locale === 'en' ? "Articles" : "記事一覧"}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{locale === 'en' ? "About" : "サイト情報"}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">{locale === 'en' ? "About Us" : "運営者情報"}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">{locale === 'en' ? "Privacy Policy" : "プライバシーポリシー"}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">{locale === 'en' ? "Terms of Service" : "利用規約"}</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">{locale === 'en' ? "Disclaimer" : "免責事項"}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{locale === 'en' ? "Contact" : "お問い合わせ"}</Link></li>
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
