'use client';

import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';

type Player = {
  position: "GK" | "DF" | "MF" | "FW";
  nameJa: string;
  club: string;
  comment: string;
  firstCallUp?: boolean;
  career: string[];
  japanConnection?: string;
};

const posColor: Record<Player["position"], string> = {
  GK: "from-amber-500 to-amber-600",
  DF: "from-blue-500 to-blue-600",
  MF: "from-emerald-500 to-emerald-600",
  FW: "from-red-500 to-rose-600",
};

const posBorder: Record<Player["position"], string> = {
  GK: "border-amber-400",
  DF: "border-blue-400",
  MF: "border-emerald-400",
  FW: "border-red-400",
};

const players: Player[] = [
  // ── GK ──
  { position: "GK", nameJa: "スコット・ベイン", club: "フォルカーク", comment: "スコットランド国内リーグで安定したパフォーマンスを見せるベテランGK", career: ["ダンディー（2014-22）", "セルティック（2018-23・レンタル含む）", "フォルカーク（2023-）"] },
  { position: "GK", nameJa: "アンガス・ガン", club: "ノッティンガム・フォレスト", comment: "ユーロ2024のスタメンGK。負傷離脱中のクレイグ・ゴードンに代わって復帰", career: ["マンチェスター・シティU21", "サウサンプトン（2018-21）", "ストーク・シティ（2021-23）", "ノッティンガム・フォレスト（2023-）"] },
  { position: "GK", nameJa: "リアム・ケリー", club: "レンジャーズ", comment: "レンジャーズで安定したプレーを見せるGK。代表バックアップとして信頼される存在", career: ["マザーウェル（2015-21）", "レンジャーズ（2021-）"] },

  // ── DF ──
  { position: "DF", nameJa: "アンディ・ロバートソン", club: "リバプール", comment: "リバプールの絶対的左SB。スコットランドの精神的支柱、60キャップ超", career: ["クイーンズ・パーク（2012-13）", "ダンディー・ユナイテッド（2013-14）", "ハル・シティ（2014-17）", "リバプール（2017-）"], japanConnection: "リバプールで遠藤航と同チームだった（2023-25年）。遠藤の加入時にはロッカールームで歓迎し、練習から高いインテンシティで刺激を与え合った仲。" },
  { position: "DF", nameJa: "キーラン・ティアニー", club: "セルティック", comment: "アーセナルからセルティックに復帰。左SBの名手、代表歴10年超のベテラン", career: ["セルティック（2015-19）", "アーセナル（2019-24）", "レアル・ソシエダ（2023-24・レンタル）", "セルティック（2024-）"], japanConnection: "アーセナル時代（2021-24年）に冨安健洋と同チーム。一緒にセルティックの試合を練習場で観戦し、冨安をセルティックファンにしようと口説いていたエピソードが有名。現在セルティックでは前田大然・旗手怜央と一緒にプレーしている。" },
  { position: "DF", nameJa: "ネイサン・パターソン", club: "エヴァートン", comment: "右SBのレギュラー候補。エヴァートンで安定した活躍", career: ["レンジャーズ（2019-22）", "エヴァートン（2022-）"] },
  { position: "DF", nameJa: "グラント・ハンリー", club: "ハイバーニアン", comment: "経験豊富なCB。スコットランドの守備の要として長年貢献", career: ["ブラックバーン（2011-16）", "ニューカッスル（2016-19）", "ノリッジ（2019-23）", "ハイバーニアン（2023-）"] },
  { position: "DF", nameJa: "ジャック・ヘンドリー", club: "アル・エティファク", comment: "サウジアラビアリーグで活躍する大型CB。フィジカルの強さが武器", career: ["セルティック（2018-19）", "KVオーステンデ（2020-22）", "クラブ・ブルッヘ（2022-24）", "アル・エティファク（2024-）"] },
  { position: "DF", nameJa: "ドミニク・ヒアム", club: "レクサム", comment: "チャンピオンシップで安定感を発揮するCB", career: ["キルマーノック（2018-22）", "レクサム（2022-）"] },
  { position: "DF", nameJa: "ロス・マクローリー", club: "ブリストル・シティ", comment: "右SBもこなせるユーティリティDF", career: ["レンジャーズ（2017-22）", "ブリストル・シティ（2022-）"] },
  { position: "DF", nameJa: "スコット・マッケンナ", club: "ディナモ・ザグレブ", comment: "クロアチアリーグで主力を張る左利きのCB", career: ["アバディーン（2015-20）", "ノッティンガム・フォレスト（2020-24）", "ディナモ・ザグレブ（2024-）"] },
  { position: "DF", nameJa: "アンソニー・ラルストン", club: "セルティック", comment: "セルティックの右SBとして国内屈指のパフォーマンス", career: ["セルティック（2015-）"], japanConnection: "セルティックで古橋亨梧（2021-）、前田大然（2022-）、旗手怜央（2022-）と長年チームメイト。日本人選手とは非常に仲が良く、古橋のゴールをアシストする場面も多い。日本語の挨拶を覚えるほどの親日家。" },
  { position: "DF", nameJa: "ジョン・サウター", club: "レンジャーズ", comment: "負傷からの復帰を経てレンジャーズで奮闘するCB", career: ["ハーツ（2014-22）", "レンジャーズ（2022-）"] },

  // ── MF ──
  { position: "MF", nameJa: "スコット・マクトミネイ", club: "ナポリ", comment: "セリエA MVP受賞の別格の存在。デンマーク戦のオーバーヘッドキックは伝説的。コンテ監督の下で覚醒", career: ["マンチェスター・ユナイテッド（2017-24）", "ナポリ（2024-）"] },
  { position: "MF", nameJa: "ジョン・マクギン", club: "アストン・ビラ", comment: "代表の心臓部。90分間走り続けるスタミナと豊富な運動量が武器", career: ["セント・ミレン（2012-15）", "ハイバーニアン（2015-18）", "アストン・ビラ（2018-）"] },
  { position: "MF", nameJa: "ルイス・ファーガソン", club: "ボローニャ", comment: "セリエAで台頭した新世代MF。ゴール・アシスト両面で存在感", career: ["ハミルトン（2017-20）", "アバディーン（2020-23）", "ボローニャ（2023-）"] },
  { position: "MF", nameJa: "ビリー・ギルモア", club: "ナポリ", comment: "小柄ながらパス精度が高いテクニシャン。マクトミネイと同じナポリでプレー", career: ["チェルシー（2019-22）", "ブライトン（2022-24）", "ナポリ（2024-）"], japanConnection: "ブライトン時代（2022-24年）に三笘薫と2シーズン同チームで戦った。三笘のドリブルを「世界一止めにくい」と称え、練習から互いに刺激し合っていた。" },
  { position: "MF", nameJa: "ケニー・マクリーン", club: "ノリッジ", comment: "デンマーク戦で劇的ゴールを決めた中盤の職人。展開力が高い", career: ["セント・ミレン（2011-15）", "アバディーン（2015-18）", "ノリッジ（2018-）"] },
  { position: "MF", nameJa: "ライアン・クリスティ", club: "ボーンマス", comment: "プレミアリーグで奮闘するボックス・トゥ・ボックスMF", career: ["セルティック（2015-21）", "ボーンマス（2021-）"] },
  { position: "MF", nameJa: "アンディ・アーヴィング", club: "スパルタ・プラハ", comment: "チェコリーグで活躍する若手MF。代表でも存在感を増す", career: ["ハーツ（2019-23）", "スパルタ・プラハ（2023-）"] },
  { position: "MF", nameJa: "レノン・ミラー", club: "ウディネーゼ", comment: "セリエAで成長著しい19歳の新星。スコットランド期待の未来", career: ["マザーウェル（2023-24）", "ウディネーゼ（2024-）"] },

  // ── FW ──
  { position: "FW", nameJa: "チェ・アダムス", club: "トリノ", comment: "イタリアでゴールを量産するスコットランドの主軸FW。フィジカルと技術を兼備", career: ["シェフィールド・ユナイテッド（2014-16）", "バーミンガム（2016-19）", "サウサンプトン（2019-24）", "トリノ（2024-）"] },
  { position: "FW", nameJa: "ジョージ・ハースト", club: "イプスウィッチ", comment: "イプスウィッチの得点源。高さと強さを活かしたポストプレーが持ち味", career: ["ロス・カウンティ（2017-19）", "ダービー（2019-23）", "イプスウィッチ（2023-）"] },
  { position: "FW", nameJa: "リンドン・ダイクス", club: "チャールトン", comment: "高さと強さが武器の大型FW。パワープレー時の頼れる存在", career: ["リビングストン（2017-20）", "QPR（2020-24）", "チャールトン（2024-）"] },
  { position: "FW", nameJa: "トミー・コンウェイ", club: "ミドルズブラ", comment: "チャンピオンシップで躍動する若手FW。切れ味鋭いドリブルが武器", career: ["ブリストル・シティ（2021-24）", "ミドルズブラ（2024-）"] },
  { position: "FW", nameJa: "ファインドレー・カーティス", club: "キルマーノック/レンジャーズ期限付き移籍", comment: "19歳のサプライズ招集。スティーブ・クラーク監督が直接視察して選んだ俊足ウインガー", career: ["レンジャーズU21", "キルマーノック（2024-・レンタル）"] },
];

function byPos(pos: Player["position"]) {
  return players.filter((p) => p.position === pos);
}

export default function ScotlandOpponentPage() {
  const { locale } = useLanguage();
  const positions: Player["position"][] = ["GK", "DF", "MF", "FW"];

  const posLabel: Record<Player["position"], string> = locale === 'en'
    ? { GK: "Goalkeeper", DF: "Defender", MF: "Midfielder", FW: "Forward" }
    : { GK: "ゴールキーパー", DF: "ディフェンダー", MF: "ミッドフィルダー", FW: "フォワード" };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001845 0%, #003087 50%, #012f6b 100%)" }} />
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 20% 20%, #ffffff 0, transparent 40%), radial-gradient(circle at 80% 80%, #CF2B37 0, transparent 35%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-5xl mb-3">🏴</p>
          <h1 className="text-4xl sm:text-6xl font-black mb-3">{locale === 'en' ? 'Scotland' : 'スコットランド代表'}</h1>
          <p className="text-blue-100">{locale === 'en' ? 'Manager: Steve Clarke | FIFA Ranking: 38 | WC Group C (Haiti, Morocco, Brazil)' : '監督：スティーブ・クラーク ｜ FIFAランキング：38位 ｜ W杯グループC（ハイチ・モロッコ・ブラジル）'}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{locale === 'en' ? 'Full Squad' : '全メンバー一覧'}</h2>
        <p className="text-sm text-gray-500 mb-8">{locale === 'en' ? 'Listed by position (GK/DF/MF/FW)' : 'GK/DF/MF/FW別（選手名・所属クラブ・ひとこと紹介）'}</p>
        {positions.map((pos) => {
          const list = byPos(pos);
          return (
            <div key={pos} className="mb-10">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${posColor[pos]}`}>{pos}</span>
                {posLabel[pos]}
                <span className="text-gray-400 font-normal text-sm">{locale === 'en' ? `(${list.length})` : `（${list.length}名）`}</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <div key={`${pos}-${p.nameJa}`} className={`rounded-2xl border-l-4 ${posBorder[pos]} bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{p.nameJa}</h4>
                        {p.firstCallUp && <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-300">{locale === 'en' ? 'NEW' : '初'}</span>}
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{locale === 'en' ? 'Current club' : '現在所属'}</p>
                      <p className="text-sm font-medium text-gray-800 mb-3">🏢 {p.club}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{p.comment}</p>

                      <details className="group border-t border-gray-100 pt-3">
                        <summary className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                          <span className="inline-block transition-transform group-open:rotate-90 text-[10px]">▶</span>
                          {locale === 'en' ? 'Career history' : 'これまでの経歴'}
                        </summary>
                        <ul className="mt-2 space-y-1">
                          {p.career.map((c) => (
                            <li key={c} className="text-xs text-gray-500 pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-gray-300">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </details>

                      {p.japanConnection && (
                        <div className="mt-3 rounded-lg bg-red-50 border border-red-100 p-3">
                          <p className="text-xs font-bold text-red-700 mb-1">{locale === 'en' ? '💡 Japan connection' : '💡 日本との縁'}</p>
                          <p className="text-xs text-red-600 leading-relaxed">{p.japanConnection}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/japan" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003087] text-white text-sm font-bold hover:bg-[#00286f] transition-colors">
            {locale === 'en' ? '← Back to Japan NT' : '← 日本代表ページに戻る'}
          </Link>
        </div>
      </section>
    </div>
  );
}
