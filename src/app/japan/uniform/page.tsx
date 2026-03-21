"use client";

import Link from "next/link";
import { NATIONAL_TEAMS } from "@/data/uniforms";
import type { NationalTeam, UniformItem } from "@/data/uniforms";

/* ── Uniform Card ─────────────────────────────── */
function UniformCard({
  item,
  team,
}: {
  item: UniformItem;
  team: NationalTeam;
}) {
  const hasImage = item.imgSrc !== "";
  const hasLink = item.affiliateUrl !== "";
  const badgeCls =
    item.type === "home"
      ? "bg-[#003087] text-white"
      : "bg-white text-gray-800 border border-gray-300";
  const badgeLabel = item.type === "home" ? "ホーム" : "アウェイ";

  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image area */}
      {hasImage ? (
        <div className="bg-gray-50">
          <div style={{ position: "relative", width: "400px", maxWidth: "100%", margin: "0 auto" }}>
            <a
              href={item.imgHref}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="block hover:opacity-90 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imgSrc}
                alt={`${team.name} ${item.name}`}
                style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
              />
            </a>
            <span style={{ position: "absolute", top: "8px", right: "8px" }} className="z-10 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-700/70 text-white backdrop-blur-sm">
              PR
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px", padding: "8px", marginTop: "-40px", position: "relative", zIndex: 10 }}>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeCls}`}>{badgeLabel}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/20 text-white backdrop-blur-sm">{team.brand}</span>
          </div>
        </div>
      ) : (
        <div
          className="h-48 flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${team.themeColor}20 0%, ${team.themeColor}40 100%)` }}
        >
          <div className="text-center">
            <p className="text-4xl mb-2">{team.flag}</p>
            <p className="text-sm font-bold text-gray-400">準備中</p>
          </div>
          <div style={{ position: "absolute", bottom: "8px", left: "8px", display: "flex", gap: "6px" }}>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeCls}`}>{badgeLabel}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/20 text-white backdrop-blur-sm">{team.brand}</span>
          </div>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          {team.name} {item.name}
        </h3>

        <div className="mt-auto pt-3 border-t border-gray-100">
          {hasLink ? (
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-[#BF0000] hover:bg-[#a00000] text-white text-sm font-bold transition-colors"
            >
              🛒 購入はこちら（楽天市場）
            </a>
          ) : (
            <div className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gray-200 text-gray-400 text-sm font-bold cursor-not-allowed">
              準備中
            </div>
          )}
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            ※広告・アフィリエイトリンクを含みます
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Page Component ───────────────────────────── */
export default function UniformPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative text-white py-14"
        style={{
          background: "linear-gradient(135deg, #1A1A2E 0%, #0057A8 50%, #1A1A2E 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-black">
            2026 ワールドカップ 各国ユニフォーム
          </h1>
          <p className="text-blue-200/70 mt-2">
            adidas 公式ストア（楽天市場）掲載中
          </p>
        </div>
      </section>

      {/* Country Navigation */}
      <div className="sticky top-14 sm:top-16 z-40 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {NATIONAL_TEAMS.map((team) => (
              <button
                key={team.id}
                onClick={() => {
                  const el = document.getElementById(`team-${team.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:text-white transition-all shadow-sm"
                style={{
                  ["--hover-bg" as string]: team.themeColor,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = team.themeColor;
                  (e.currentTarget as HTMLElement).style.borderColor = team.themeColor;
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.color = "";
                }}
              >
                {team.flag} {team.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Country Sections */}
      {NATIONAL_TEAMS.map((team) => (
        <section
          key={team.id}
          id={`team-${team.id}`}
          className="border-t border-gray-200 scroll-mt-28 sm:scroll-mt-32"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-6">
              <span
                style={{
                  background: team.tagBg,
                  color: team.tagText,
                  border: `1.5px solid ${team.tagBorder}`,
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              >
                <span className="text-lg">{team.flag}</span>
                {team.name}
              </span>
              <div className="flex-1 h-px" style={{ background: team.tagBorder }} />
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {team.uniforms.map((item) => (
                <UniformCard key={item.id} item={item} team={team} />
              ))}
            </div>
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
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              トップページ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
