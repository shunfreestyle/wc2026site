import Link from "next/link";
import type { Metadata } from "next";
import { uniforms } from "@/data/uniforms";
import type { BuyLink } from "@/data/uniforms";

export const metadata: Metadata = {
  title: "🇯🇵 日本代表ユニフォーム一覧 | FIFA World Cup 2026",
  description:
    "日本代表（SAMURAI BLUE）歴代ユニフォーム一覧。2026 W杯モデル・購入リンク付き。",
};

/* ── Helpers ──────────────────────────────────── */
const typeBadge: Record<string, { label: string; cls: string }> = {
  home: { label: "ホーム", cls: "bg-[#003087] text-white" },
  away: { label: "アウェイ", cls: "bg-white text-gray-800 border border-gray-300" },
  gk: { label: "GK", cls: "bg-amber-400 text-gray-900" },
};

function storeStyle(store: string) {
  if (store.includes("adidas")) return "bg-gray-900 hover:bg-gray-800 text-white";
  if (store.includes("KAMO")) return "bg-[#003087] hover:bg-[#002266] text-white";
  return "bg-gray-600 hover:bg-gray-500 text-white";
}

function BuyButton({ link }: { link: BuyLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={`inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold transition-colors ${storeStyle(link.store)}`}
    >
      {link.label}
    </a>
  );
}

/* ── Group by year ────────────────────────────── */
function groupByYear() {
  const years = [...new Set(uniforms.map((u) => u.year))];
  years.sort((a, b) => Number(b) - Number(a));
  return years.map((year) => ({
    year,
    items: uniforms.filter((u) => u.year === year),
  }));
}

/* ── Page Component ───────────────────────────── */
export default function UniformPage() {
  const groups = groupByYear();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative text-white py-14"
        style={{
          background:
            "linear-gradient(135deg, #001845 0%, #003087 50%, #001845 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/japan"
              className="text-blue-200 hover:text-white text-sm transition-colors"
            >
              ← 日本代表トップ
            </Link>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            🇯🇵 日本代表ユニフォーム
          </h1>
          <p className="text-blue-200/70 mt-2">
            SAMURAI BLUE 歴代モデル・購入リンク付き
          </p>
        </div>
      </section>

      {/* Uniform Groups */}
      {groups.map((g) => (
        <section key={g.year} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-8 rounded-full"
              style={{ background: "#003087" }}
            />
            {g.year} モデル
          </h2>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {g.items.map((u) => {
              const badge = typeBadge[u.type];
              const hasRakutenImage = u.rakuten?.imageUrl;
              const nonRakutenLinks = u.buyLinks.filter(
                (l) => !l.store.includes("楽天")
              );

              return (
                <div
                  key={u.id}
                  className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Image area or color banner */}
                  {hasRakutenImage ? (
                    <a
                      href={u.rakuten!.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="block h-48 relative hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: `${u.colorMain}15` }}
                    >
                      <span className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-700/70 text-white backdrop-blur-sm">
                        PR
                      </span>
                      <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.cls}`}
                        >
                          {badge.label}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/20 text-white backdrop-blur-sm">
                          {u.brand}
                        </span>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={u.rakuten!.imageUrl}
                        alt={u.name}
                        width={240}
                        height={240}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div
                      className="h-24 relative"
                      style={{
                        background: `linear-gradient(135deg, ${u.colorMain} 0%, ${u.colorMain} 60%, ${u.colorSub} 100%)`,
                      }}
                    >
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.cls}`}
                        >
                          {badge.label}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/20 text-white backdrop-blur-sm">
                          {u.brand}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title + swatches */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {u.name}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span
                          className="w-5 h-5 rounded-full border-2 border-gray-200"
                          style={{ background: u.colorMain }}
                          title={`メインカラー ${u.colorMain}`}
                        />
                        {u.colorSub !== "#FFFFFF" && (
                          <span
                            className="w-5 h-5 rounded-full border-2 border-gray-200"
                            style={{ background: u.colorSub }}
                            title={`サブカラー ${u.colorSub}`}
                          />
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {u.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {u.features.map((f) => (
                        <span
                          key={f}
                          className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Buy buttons */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      {u.rakuten ? (
                        <a
                          href={u.rakuten.affiliateUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-[#BF0000] hover:bg-[#a00000] text-white text-sm font-bold transition-colors"
                        >
                          🛒 購入はこちら（楽天市場）
                        </a>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {nonRakutenLinks.map((link) => (
                            <BuyButton key={link.store} link={link} />
                          ))}
                        </div>
                      )}
                      <p className="text-[10px] text-gray-400 mt-2 text-center">
                        ※広告・アフィリエイトリンクを含みます
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Note */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-400 text-center">
            ※ 購入リンクは各ストアの商品ページに遷移します。在庫状況は各ストアにてご確認ください。
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/japan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: "#003087" }}
            >
              🇯🇵 日本代表トップに戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
