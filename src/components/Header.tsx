import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#5B0E2D] via-[#8B1538] to-[#5B0E2D] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <span className="text-2xl">⚽</span>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">FIFA World Cup</h1>
              <p className="text-xs text-amber-300 font-semibold tracking-widest">USA | MEX | CAN 2026</p>
            </div>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/teams"
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
            >
              出場チーム
            </Link>
            <Link
              href="/matches"
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
            >
              試合日程
            </Link>
          </nav>
          {/* Mobile menu */}
          <nav className="flex sm:hidden items-center gap-1">
            <Link href="/teams" className="px-3 py-2 rounded-lg text-xs font-medium hover:bg-white/10">
              チーム
            </Link>
            <Link href="/matches" className="px-3 py-2 rounded-lg text-xs font-medium hover:bg-white/10">
              試合
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
