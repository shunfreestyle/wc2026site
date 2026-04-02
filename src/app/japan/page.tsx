"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { japanSquad2026March, type JapanSquadPlayer } from "@/data/japan-squad";


/* ──────────────────────────────────────────────
   W杯グループステージ
   ────────────────────────────────────────────── */
const wcMatches = [
  {
    num: 10,
    date: "6/14（土）",
    jst: "6/15（日）05:00",
    local: "15:00 CDT",
    opponent: "🇳🇱 オランダ",
    opponentEn: "Netherlands",
    venue: "AT&Tスタジアム",
    city: "ダラス（アメリカ）",
    label: "グループF 第1節",
  },
  {
    num: 33,
    date: "6/19（木）",
    jst: "6/20（金）13:00",
    local: "22:00 CST",
    opponent: "🇹🇳 チュニジア",
    opponentEn: "Tunisia",
    venue: "エスタディオ・BBVA",
    city: "モンテレイ（メキシコ）",
    label: "グループF 第2節",
  },
  {
    num: 57,
    date: "6/25（水）",
    jst: "6/26（木）08:00",
    local: "18:00 CDT",
    opponent: "🏳️ UEFAプレーオフB勝者",
    opponentEn: "UEFA Playoff B Winner",
    venue: "AT&Tスタジアム",
    city: "ダラス（アメリカ）",
    label: "グループF 第3節",
  },
];

const squad = japanSquad2026March;

/* Squad data moved to @/data/japan-squad.ts */


/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
const posColor: Record<string, string> = {
  GK: "from-amber-500 to-amber-600",
  DF: "from-blue-500 to-blue-600",
  MF: "from-emerald-500 to-emerald-600",
  FW: "from-red-500 to-rose-600",
};
const posBorderColor: Record<string, string> = {
  GK: "#fbbf24",
  DF: "#60a5fa",
  MF: "#34d399",
  FW: "#f87171",
};
const posTextColor: Record<string, string> = {
  GK: "#d97706",
  DF: "#2563eb",
  MF: "#059669",
  FW: "#dc2626",
};
const posShadow: Record<string, string> = {
  GK: "0 2px 8px rgba(217,119,6,0.15)",
  DF: "0 2px 8px rgba(37,99,235,0.15)",
  MF: "0 2px 8px rgba(5,150,105,0.15)",
  FW: "0 2px 8px rgba(220,38,38,0.15)",
};
const posShadowHover: Record<string, string> = {
  GK: "0 4px 16px rgba(217,119,6,0.25)",
  DF: "0 4px 16px rgba(37,99,235,0.25)",
  MF: "0 4px 16px rgba(5,150,105,0.25)",
  FW: "0 4px 16px rgba(220,38,38,0.25)",
};

/* ──────────────────────────────────────────────
   Page Component
   ────────────────────────────────────────────── */
export default function JapanPage() {
  const { t, locale } = useLanguage();

  const posLabel: Record<string, string> = locale === 'en'
    ? { GK: "Goalkeeper", DF: "Defender", MF: "Midfielder", FW: "Forward" }
    : { GK: "ゴールキーパー", DF: "ディフェンダー", MF: "ミッドフィルダー", FW: "フォワード" };

  function groupByPosition(players: JapanSquadPlayer[]) {
    const order: Array<"GK" | "DF" | "MF" | "FW"> = ["GK", "DF", "MF", "FW"];
    return order.map((pos) => ({
      pos,
      label: posLabel[pos],
      players: players.filter((p) => p.position === pos),
    }));
  }

  const grouped = groupByPosition(squad);

  const sportsTeamJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: "Japan National Football Team",
    alternateName: "サムライブルー",
    sport: "Football",
    coach: {
      "@type": "Person",
      name: "Hajime Moriyasu",
      alternateName: "森保一",
    },
    memberOf: {
      "@type": "SportsOrganization",
      name: "FIFA",
    },
    url: "https://www.jfa.jp/samuraiblue/",
    sameAs: [
      "https://en.wikipedia.org/wiki/Japan_national_football_team",
      "https://www.jfa.jp/samuraiblue/",
    ],
    athlete: japanSquad2026March.slice(0, 10).map((p) => ({
      "@type": "Person",
      name: p.name,
      alternateName: p.nameJa,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamJsonLd) }}
      />

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #001845 0%, #003087 40%, #002266 70%, #001845 100%)",
          }}
        />
        {/* 日の丸装飾 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #BC002D 0%, #BC002D 35%, transparent 36%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, #BC002D 0%, #BC002D 35%, transparent 36%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-sm border border-white/20">
              Group F — FIFA World Cup 2026
            </span>
          </div>
          <p className="text-5xl mb-3">🇯🇵</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-2">
            SAMURAI BLUE
          </h1>
          <p className="text-xl sm:text-2xl font-light tracking-wide text-blue-200 mb-1">
            {locale === 'en' ? "Japan National Team \u2014 World Cup 2026" : "\u65E5\u672C\u4EE3\u8868 W\u676F2026"}
          </p>
          <p className="text-sm text-blue-300/80 mb-8">
            {locale === 'en' ? "Manager: Hajime Moriyasu | FIFA Ranking: 18 | 7th consecutive World Cup" : "監督：森保一 ｜ FIFAランキング：18位 ｜ W杯出場：7大会連続7回目"}
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#BC002D]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#BC002D]" />
            <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#BC002D]" />
          </div>

          <p className="max-w-2xl mx-auto text-blue-100/80 text-sm sm:text-base leading-relaxed mb-8">
            {locale === 'en' ? "SAMURAI BLUE stunned the world by beating Germany and Spain at the 2022 Qatar World Cup. Now preparing for the 2026 World Cup, they face Netherlands and Tunisia in Group F." : "2022年カタール大会ではドイツ・スペインを撃破し世界を驚かせたSAMURAI BLUE。W杯本大会に向けて準備を進めるSAMURAI BLUE。グループFでオランダ・チュニジアと激突する。"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/japan/matches"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors"
            >
              {locale === 'en' ? "\u{1F4CA} Recent Results (last 10)" : "\u{1F4CA} 試合結果（直近10試合）"}
            </Link>
            <Link
              href="/teams/japan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors"
            >
              {locale === 'en' ? "\u{1F4CB} Team Details" : "\u{1F4CB} チーム詳細ページ"}
            </Link>
            <Link
              href="/stamen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors"
            >
              {locale === 'en' ? "⚽ Lineup Maker" : "⚽ スタメンメーカー"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FULL SQUAD
          ═══════════════════════════════════════ */}
      <section id="squad" className="scroll-mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-8 rounded-full"
            style={{ background: "#003087" }}
          />
          {locale === 'en' ? "Squad List" : "招集メンバー一覧"}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          {locale === 'en' ? "JFA Official \u2014 28 players (3 GK / 8 DF / 9 MF / 8 FW)" : "JFA公式発表 3月19日 — 28名（GK 3名 / DF 8名 / MF 9名 / FW 8名）"}
        </p>

        {grouped.map((g) => (
          <div key={g.pos} className="mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span
                className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${posColor[g.pos]}`}
              >
                {g.pos}
              </span>
              {g.label}
              <span className="text-gray-400 font-normal text-sm">
                {locale === 'en' ? ` (${g.players.length})` : `（${g.players.length}名）`}
              </span>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.players.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col rounded-2xl bg-white transition-shadow overflow-hidden group/card"
                  style={{ border: `1px solid ${posBorderColor[p.position]}`, borderLeft: `4px solid ${posBorderColor[p.position]}`, boxShadow: posShadow[p.position] }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = posShadowHover[p.position]; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = posShadow[p.position]; }}
                >
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {p.nameJa}
                        </h4>
                        <p className="text-xs text-gray-400">{p.name}</p>
                      </div>
                      {p.note && (
                        <span
                          className="ml-2 shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{ color: posTextColor[p.position], backgroundColor: `${posTextColor[p.position]}15` }}
                        >
                          {p.note}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 mb-3 border-t border-gray-100 pt-3">
                      <p>
                        <span className="text-gray-400">{locale === 'en' ? "Date of birth" : "生年月日"}</span>
                        <br />
                        <span className="text-gray-700 font-medium">
                          {p.birthDate}{locale === 'en' ? ` (age ${p.age})` : `（${p.age}歳）`}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">{locale === 'en' ? "Height / Weight" : `${t.japan.stats.height} / 体重`}</span>
                        <br />
                        <span className="text-gray-700 font-medium">
                          {p.height}cm / {p.weight}kg
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">{locale === 'en' ? "Position" : "ポジション"}</span>
                        <br />
                        <span className="font-bold" style={{ color: posTextColor[p.position] }}>
                          {posLabel[p.position]}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">{locale === 'en' ? "Club" : t.japan.stats.club}</span>
                        <br />
                        <span className="text-gray-700 font-medium">
                          {p.club}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  {p.id && (
                    <div className="mt-auto px-5 pb-5">
                      <div className="pt-3 border-t border-gray-100">
                        <Link
                          href={`/players/${p.id}`}
                          className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-xl bg-[#003087]/5 text-[#003087] text-xs sm:text-sm font-bold hover:bg-[#003087]/15 active:bg-[#003087]/20 transition-colors"
                        >
                          {locale === 'en' ? "Player details" : "選手詳細へ"}
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════
          W杯グループステージ
          ═══════════════════════════════════════ */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-8 rounded-full"
              style={{ background: "#003087" }}
            />
            {locale === 'en' ? "World Cup Group Stage Schedule" : "W杯グループステージ日程"}
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            {locale === 'en' ? "Group F \u2014 Netherlands, Japan, Tunisia, UEFA Playoff B Winner" : `${t.japan.groupLabel} — オランダ、日本、チュニジア、UEFAプレーオフB勝者`}
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {wcMatches.map((m) => (
              <div
                key={m.num}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div
                  className="px-4 py-2 text-white text-sm font-bold flex items-center justify-between"
                  style={{ background: "#003087" }}
                >
                  <span>{m.label}</span>
                  <span className="text-blue-200 text-xs">Match #{m.num}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center flex-1">
                      <p className="text-2xl mb-1">🇯🇵</p>
                      <p className="text-sm font-bold text-gray-900">{locale === 'en' ? "Japan" : "日本"}</p>
                    </div>
                    <div className="px-4 text-center">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">VS</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-2xl mb-1">{m.opponent.split(" ")[0]}</p>
                      <p className="text-sm font-bold text-gray-900">
                        {m.opponent.split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-500 border-t pt-3">
                    <p>📅 現地：{m.date} {m.local}</p>
                    <p className="font-semibold text-[#BC002D]">
                      🇯🇵 日本時間：{m.jst}
                    </p>
                    <p>🏟️ {m.venue}（{m.city}）</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER CTA
          ═══════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            {locale === 'en' ? "Full team info and past results" : "チーム全体の情報・過去の成績はこちら"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/teams/japan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: "#003087" }}
            >
              {locale === 'en' ? "\u{1F1EF}\u{1F1F5} Japan Team Page" : "\u{1F1EF}\u{1F1F5} 日本代表チームページ"}
            </Link>
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              {locale === 'en' ? "All 48 Teams" : "全48チーム一覧"}
            </Link>
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              {locale === 'en' ? "Full Schedule" : "全試合日程"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
