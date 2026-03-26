import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-[#003087] mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          ページが見つかりません
        </h1>
        <p className="text-gray-500 mb-2">
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        <p className="text-gray-400 text-sm mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#003087] text-white font-semibold rounded-lg hover:bg-[#002266] transition-colors"
          >
            ホームへ戻る
          </Link>
          <Link
            href="/articles"
            className="inline-block px-6 py-3 bg-white text-[#003087] font-semibold rounded-lg border border-[#003087] hover:bg-[#003087]/5 transition-colors"
          >
            記事一覧
          </Link>
        </div>
      </div>
    </div>
  );
}
