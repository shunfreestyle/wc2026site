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

/* ── Rakuten affiliate image map (hardcoded) ──── */
const rakutenImages: Record<number, { href: string; src: string; alt: string }> = {
  1: {
    href: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjz9680%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiI0MDB4NDAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    src: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234422&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fjz9680_l.jpg%3F_ex%3D400x400&s=400x400&t=picttext",
    alt: "2026 ホームユニフォーム 長袖",
  },
  6: {
    href: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D",
    src: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10234426&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp96%2Fkd3345_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
    alt: "2026 ホームユニフォーム 半袖",
  },
  2: {
    href: "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjz9697%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    src: "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10237312&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fp107%2Fjz9697_l.jpg%3F_ex%3D400x400&s=400x400&t=pict",
    alt: "2026 アウェイユニフォーム 長袖",
  },
  5: {
    href: "https://hb.afl.rakuten.co.jp/ichiba/521ae475.5370c756.521ae476.3fb8d512/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Freal-sports%2Fklg77-jn1872%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
    src: "https://hbb.afl.rakuten.co.jp/hgb/521ae475.5370c756.521ae476.3fb8d512/?me_id=1378885&item_id=10016420&pc=https%3A%2F%2Fimage.rakuten.co.jp%2Freal-sports%2Fcabinet%2Fcm43%2Fklg77-jn1872_c2.jpg%3F_ex%3D400x400&s=400x400&t=pict",
    alt: "2026 アウェイユニフォーム 半袖",
  },
};

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
              const nonRakutenLinks = u.buyLinks.filter(
                (l) => !l.store.includes("楽天")
              );

              return (
                <div
                  key={u.id}
                  className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Image area */}
                  {rakutenImages[u.id] ? (
                    <div className="relative bg-gray-50">
                      <span className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-700/70 text-white backdrop-blur-sm">
                        PR
                      </span>
                      <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.cls}`}>{badge.label}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/20 text-white backdrop-blur-sm">{u.brand}</span>
                      </div>
                      <div style={{ width: "400px", height: "400px", margin: "0 auto", maxWidth: "100%" }}>
                        <a
                          href={rakutenImages[u.id].href}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="block hover:opacity-90 transition-opacity"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rakutenImages[u.id].src}
                            alt={rakutenImages[u.id].alt}
                            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                          />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-24 relative"
                      style={{
                        background: `linear-gradient(135deg, ${u.colorMain} 0%, ${u.colorMain} 60%, ${u.colorSub} 100%)`,
                      }}
                    >
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.cls}`}>{badge.label}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/20 text-white backdrop-blur-sm">{u.brand}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {u.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {u.description}
                    </p>

                    {/* Buy buttons */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      {rakutenImages[u.id] ? (
                        <a
                          href={rakutenImages[u.id].href}
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
