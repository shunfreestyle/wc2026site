import { notFound } from "next/navigation";
import Link from "next/link";
import { STADIUMS, getStadiumById } from "@/data/stadiums";
import { matches } from "@/data/matches";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return STADIUMS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const s = getStadiumById(id);
  if (!s) return { title: "スタジアムが見つかりません" };
  return {
    title: `${s.nameJa} | W杯2026会場 | SAMURAI FOOTBALL`,
    description: `${s.nameJa}（${s.city}）の詳細情報。収容人数${s.capacity.toLocaleString()}人。${s.description.slice(0, 80)}...`,
  };
}

export default async function StadiumPage({ params }: Props) {
  const { id } = await params;
  const s = getStadiumById(id);
  if (!s) notFound();

  const stadiumMatches = matches.filter((m) => m.stadiumId === s.id);

  const hostColors: Record<string, { bg: string; text: string; border: string }> = {
    "アメリカ": { bg: "#EEF2FF", text: "#1E3A8A", border: "#C7D2FE" },
    "メキシコ": { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
    "カナダ":   { bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" },
  };
  const hc = hostColors[s.hostNation] || { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1F5C] to-[#1a4080] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/matches" className="text-sm text-blue-200 hover:text-white mb-4 inline-block">← 試合日程に戻る</Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{s.countryFlag}</span>
            <span
              style={{ background: hc.bg, color: hc.text, border: `1px solid ${hc.border}` }}
              className="text-xs font-bold px-3 py-1 rounded-full"
            >
              {s.hostNation}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{s.nameJa}</h1>
          <p className="text-blue-200 mt-1 text-sm">{s.nameEn}</p>
          <p className="text-blue-100/70 mt-2 text-sm">{s.city} · {s.country}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "収容人数", value: s.capacity.toLocaleString() + "人" },
            { label: "開業年", value: s.opened + "年" },
            { label: "芝", value: s.surface },
            { label: "W杯試合数", value: s.matchCount + "試合" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-[#0A1F5C]">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Google Map */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#E8192C]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              アクセスマップ
            </h2>
            <a
              href={s.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Google Mapsで開く →
            </a>
          </div>
          <div className="relative h-64">
            <iframe
              src={`https://maps.google.com/maps?q=${s.latitude},${s.longitude}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Description & History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="font-bold text-gray-900 mb-2">スタジアム概要</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
          </div>
          <div className="border-t border-gray-100 pt-5">
            <h2 className="font-bold text-gray-900 mb-2">歴史</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{s.history}</p>
          </div>
          <div className="border-t border-gray-100 pt-5">
            <h2 className="font-bold text-gray-900 mb-2">アクセス（日本からの場合）</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{s.accessJa}</p>
          </div>
        </div>

        {/* Matches at this venue */}
        {stadiumMatches.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">
              この会場の試合一覧
              <span className="text-xs font-normal text-gray-400 ml-2">{stadiumMatches.length}試合</span>
            </h2>
            <div className="space-y-2">
              {stadiumMatches.slice(0, 10).map((m) => (
                <div key={m.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-16 shrink-0">{m.date.slice(5)}</span>
                    <span className="text-gray-700">
                      {m.homeLabel || m.homeTeamId} vs {m.awayLabel || m.awayTeamId}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{m.stage}</span>
                </div>
              ))}
              {stadiumMatches.length > 10 && (
                <p className="text-xs text-gray-400 text-center pt-2">他 {stadiumMatches.length - 10} 試合</p>
              )}
            </div>
          </div>
        )}

        {/* Back link */}
        <div>
          <Link href="/matches" className="text-sm text-blue-600 hover:underline">← 試合日程に戻る</Link>
        </div>
      </div>
    </div>
  );
}
