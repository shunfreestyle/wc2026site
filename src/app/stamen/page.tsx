"use client";

import { useState, useRef, useCallback, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getRosterByTeamId } from "@/data/j1-rosters";
import { getJ1TeamById } from "@/data/j1-teams";
import { getJ2J3TeamById } from "@/data/j2j3-teams";
import { getEastARosterByTeamId } from "@/data/j2j3-rosters-east-a";
import { getEastBRosterByTeamId } from "@/data/j2j3-eastb-rosters";

/* ─── Types ─── */
interface Position {
  pos: string;
  x: number;
  y: number;
}
interface Formation {
  id: string;
  name: string;
  tag: string;
  positions: Position[];
}
interface Player {
  name: string;
  pos: string;
  club?: string;
}

/* ─── Formations ─── */
const FORMATIONS: Formation[] = [
  {
    id: "442",
    name: "4-4-2",
    tag: "伝統的バランス型",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "DF", x: 18, y: 75 },
      { pos: "DF", x: 38, y: 75 },
      { pos: "DF", x: 62, y: 75 },
      { pos: "DF", x: 82, y: 75 },
      { pos: "MF", x: 15, y: 50 },
      { pos: "MF", x: 38, y: 50 },
      { pos: "MF", x: 62, y: 50 },
      { pos: "MF", x: 85, y: 50 },
      { pos: "FW", x: 35, y: 22 },
      { pos: "FW", x: 65, y: 22 },
    ],
  },
  {
    id: "3421",
    name: "3-4-2-1",
    tag: "現在のメイン布陣",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "CB", x: 25, y: 75 },
      { pos: "CB", x: 50, y: 75 },
      { pos: "CB", x: 75, y: 75 },
      { pos: "WB", x: 10, y: 55 },
      { pos: "MF", x: 35, y: 55 },
      { pos: "MF", x: 65, y: 55 },
      { pos: "WB", x: 90, y: 55 },
      { pos: "SH", x: 30, y: 35 },
      { pos: "SH", x: 70, y: 35 },
      { pos: "FW", x: 50, y: 18 },
    ],
  },
  {
    id: "4231",
    name: "4-2-3-1",
    tag: "カタール前の基本形",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "DF", x: 18, y: 75 },
      { pos: "DF", x: 38, y: 75 },
      { pos: "DF", x: 62, y: 75 },
      { pos: "DF", x: 82, y: 75 },
      { pos: "MF", x: 35, y: 57 },
      { pos: "MF", x: 65, y: 57 },
      { pos: "MF", x: 18, y: 38 },
      { pos: "MF", x: 50, y: 38 },
      { pos: "MF", x: 82, y: 38 },
      { pos: "FW", x: 50, y: 18 },
    ],
  },
  {
    id: "433",
    name: "4-3-3",
    tag: "攻撃的オプション",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "DF", x: 18, y: 75 },
      { pos: "DF", x: 38, y: 75 },
      { pos: "DF", x: 62, y: 75 },
      { pos: "DF", x: 82, y: 75 },
      { pos: "MF", x: 25, y: 52 },
      { pos: "MF", x: 50, y: 52 },
      { pos: "MF", x: 75, y: 52 },
      { pos: "FW", x: 18, y: 25 },
      { pos: "FW", x: 50, y: 18 },
      { pos: "FW", x: 82, y: 25 },
    ],
  },
  {
    id: "352",
    name: "3-5-2",
    tag: "守備的3バック",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "CB", x: 25, y: 75 },
      { pos: "CB", x: 50, y: 75 },
      { pos: "CB", x: 75, y: 75 },
      { pos: "WB", x: 8, y: 52 },
      { pos: "MF", x: 30, y: 52 },
      { pos: "MF", x: 50, y: 52 },
      { pos: "MF", x: 70, y: 52 },
      { pos: "WB", x: 92, y: 52 },
      { pos: "FW", x: 35, y: 22 },
      { pos: "FW", x: 65, y: 22 },
    ],
  },
  {
    id: "4213",
    name: "4-2-1-3",
    tag: "ハイプレス型",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "DF", x: 18, y: 75 },
      { pos: "DF", x: 38, y: 75 },
      { pos: "DF", x: 62, y: 75 },
      { pos: "DF", x: 82, y: 75 },
      { pos: "MF", x: 35, y: 57 },
      { pos: "MF", x: 65, y: 57 },
      { pos: "MF", x: 50, y: 40 },
      { pos: "FW", x: 18, y: 22 },
      { pos: "FW", x: 50, y: 18 },
      { pos: "FW", x: 82, y: 22 },
    ],
  },
  {
    id: "4123",
    name: "4-1-2-3",
    tag: "アンカー型攻撃布陣",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "DF", x: 18, y: 75 },
      { pos: "DF", x: 38, y: 75 },
      { pos: "DF", x: 62, y: 75 },
      { pos: "DF", x: 82, y: 75 },
      { pos: "MF", x: 50, y: 58 },
      { pos: "MF", x: 30, y: 43 },
      { pos: "MF", x: 70, y: 43 },
      { pos: "FW", x: 18, y: 22 },
      { pos: "FW", x: 50, y: 18 },
      { pos: "FW", x: 82, y: 22 },
    ],
  },
  {
    id: "3412",
    name: "3-4-1-2",
    tag: "2トップ3バック",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "CB", x: 25, y: 75 },
      { pos: "CB", x: 50, y: 75 },
      { pos: "CB", x: 75, y: 75 },
      { pos: "WB", x: 10, y: 55 },
      { pos: "MF", x: 35, y: 55 },
      { pos: "MF", x: 65, y: 55 },
      { pos: "WB", x: 90, y: 55 },
      { pos: "MF", x: 50, y: 38 },
      { pos: "FW", x: 35, y: 20 },
      { pos: "FW", x: 65, y: 20 },
    ],
  },
];

/* ─── Squad (28 players) ── JFA公式 3月19日発表 ─── */
const SQUAD: Player[] = [
  // GK（3名）
  { name: "早川友基", pos: "GK", club: "鹿島アントラーズ" },
  { name: "大迫敬介", pos: "GK", club: "サンフレッチェ広島" },
  { name: "鈴木彩艶", pos: "GK", club: "パルマ（イタリア）" },
  // DF（8名）
  { name: "谷口彰悟", pos: "DF", club: "シントトロイデン（ベルギー）" },
  { name: "渡辺剛", pos: "DF", club: "フェイエノールト（オランダ）" },
  { name: "橋岡大樹", pos: "DF", club: "KAAヘント（ベルギー）" },
  { name: "伊藤洋輝", pos: "DF", club: "バイエルン（ドイツ）" },
  { name: "瀬古歩夢", pos: "DF", club: "ル・アーヴル（フランス）" },
  { name: "菅原由勢", pos: "DF", club: "ブレーメン（ドイツ）" },
  { name: "鈴木淳之介", pos: "DF", club: "コペンハーゲン（デンマーク）" },
  // MF（9名）
  { name: "鎌田大地", pos: "MF", club: "クリスタルパレス（イングランド）" },
  { name: "三笘薫", pos: "MF", club: "ブライトン（イングランド）" },
  { name: "堂安律", pos: "MF", club: "フランクフルト（ドイツ）" },
  { name: "田中碧", pos: "MF", club: "リーズ（イングランド）" },
  { name: "佐野海舟", pos: "MF", club: "マインツ（ドイツ）" },
  { name: "鈴木唯人", pos: "MF", club: "フライブルク（ドイツ）" },
  { name: "藤田譲瑠チマ", pos: "MF", club: "ザンクトパウリ（ドイツ）" },
  { name: "佐野航大", pos: "MF", club: "NECナイメヘン（オランダ）" },
  { name: "佐藤龍之介", pos: "MF", club: "FC東京" },
  // FW（8名）
  { name: "伊東純也", pos: "FW", club: "ゲンク（ベルギー）" },
  { name: "小川航基", pos: "FW", club: "NEC（オランダ）" },
  { name: "前田大然", pos: "FW", club: "セルティック（スコットランド）" },
  { name: "上田綺世", pos: "FW", club: "フェイエノールト（オランダ）" },
  { name: "町野修斗", pos: "FW", club: "ボルシアMG（ドイツ）" },
  { name: "中村敬斗", pos: "FW", club: "スタッド・ランス（フランス）" },
  { name: "塩貝健人", pos: "FW", club: "ヴォルフスブルク（ドイツ）" },
  { name: "後藤啓介", pos: "FW", club: "シントトロイデン（ベルギー）" },
];

/* ─── Half-court Y remap: newY = 8 + (oldY - 18) * 80 / 74 ─── */
function toHalfY(y: number): number {
  return Math.round(8 + ((y - 18) * 80) / 74);
}

/* ─── Toast ─── */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
      <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-bold flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="text-white/70 hover:text-white text-lg leading-none">
          ✕
        </button>
      </div>
    </div>
  );
}

/* ─── Step Bar ─── */
const STEP_LABELS = ["フォーメーション", "スタメン", "確認・シェア"];
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-4 px-2">
      {STEP_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                done
                  ? "bg-blue-500 border-blue-500 text-white"
                  : active
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-white/10 border-white/20 text-gray-500"
              }`}
            >
              {done ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] mt-1 ${active ? "text-red-400 font-bold" : done ? "text-blue-400" : "text-gray-600"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Half-court Pitch component ─── */
function Pitch({
  positions,
  slots,
  onSlotClick,
  readonly,
}: {
  positions: Position[];
  slots: (Player | null)[];
  onSlotClick?: (index: number) => void;
  readonly?: boolean;
}) {
  return (
    <div className="relative w-full aspect-square bg-gradient-to-b from-[#2d8a4e] to-[#1e6b3a] rounded-2xl overflow-hidden border border-white/10">
      {/* pitch lines - ハーフコート表示（上:センターサークル側、下:GKペナルティエリア側） */}
      <div className="absolute inset-0">
        {/* outer border */}
        <div className="absolute inset-[4%] border-2 border-white/30 rounded-sm" />
        {/* half line - 上端 */}
        <div className="absolute left-[4%] right-[4%] top-[4%] h-0 border-t-2 border-white/30" />
        {/* center circle - 下向き半円（FWの足元付近） */}
        <div style={{position:'absolute',left:'50%',top:'4%',transform:'translateX(-50%)',width:'22%',height:'11%',borderLeft:'2px solid rgba(255,255,255,0.3)',borderRight:'2px solid rgba(255,255,255,0.3)',borderBottom:'2px solid rgba(255,255,255,0.3)',borderTop:'none',borderRadius:'0 0 999px 999px'}} />
        {/* penalty area - GK side bottom */}
        <div className="absolute left-[20%] right-[20%] bottom-[4%] h-[22%] border-2 border-b-0 border-white/30" />
        {/* goal area - GK side bottom */}
        <div className="absolute left-[33%] right-[33%] bottom-[4%] h-[11%] border-2 border-b-0 border-white/30" />
        {/* penalty arc - ペナルティエリア上部の小さい上向き半円 */}
        <div style={{position:'absolute',left:'50%',bottom:'26%',transform:'translateX(-50%)',width:'16%',height:'8%',borderLeft:'2px solid rgba(255,255,255,0.3)',borderRight:'2px solid rgba(255,255,255,0.3)',borderTop:'2px solid rgba(255,255,255,0.3)',borderBottom:'none',borderRadius:'999px 999px 0 0'}} />
      </div>

      {/* player slots */}
      {positions.map((p, i) => {
        const player = slots[i];
        const isGK = p.pos === "GK";
        const filled = !!player;
        const mappedY = toHalfY(p.y);
        return (
          <div
            key={i}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${mappedY}%` }}
          >
            <button
              onClick={() => !readonly && onSlotClick?.(i)}
              disabled={readonly}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                filled
                  ? isGK
                    ? "bg-[#c8960c] text-white shadow-lg shadow-yellow-900/40"
                    : "bg-[#003087] text-white shadow-lg shadow-blue-900/40"
                  : "border-2 border-dashed border-white/50 text-white/50 hover:border-white hover:text-white cursor-pointer"
              }`}
            >
              {filled ? player.name.slice(0, 2) : "+"}
            </button>
            <span className="text-[9px] sm:text-[10px] text-white mt-0.5 font-medium text-center whitespace-nowrap drop-shadow">
              {filled ? player.name : p.pos}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Player Select Modal ─── */
function PlayerModal({
  squad,
  usedNames,
  posFilter,
  onSelect,
  onClose,
}: {
  squad: Player[];
  usedNames: Set<string>;
  posFilter: string;
  onSelect: (p: Player) => void;
  onClose: () => void;
}) {
  const posMap: Record<string, string[]> = {
    GK: ["GK"],
    CB: ["DF"],
    SB: ["DF"],
    DF: ["DF"],
    WB: ["DF", "MF"],
    SH: ["MF", "FW"],
    MF: ["MF"],
    FW: ["FW"],
  };
  const matchPos = posMap[posFilter] ?? [posFilter];
  const recommended = squad.filter((p) => matchPos.includes(p.pos));
  const others = squad.filter((p) => !matchPos.includes(p.pos));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center cursor-pointer" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[480px] bg-[#1a1a2e] border-t border-white/20 rounded-t-3xl max-h-[65vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#1a1a2e] px-5 pt-5 pb-3 border-b border-white/10 z-10">
          <div className="w-10 h-1 rounded-full bg-white/30 mx-auto mb-3" />
          <h3 className="text-white font-bold text-base">
            選手を選択 <span className="text-gray-400 text-sm font-normal">（{posFilter}）</span>
          </h3>
        </div>
        <div className="p-4">
          {recommended.length > 0 && (
            <>
              <p className="text-xs text-blue-400 font-bold mb-2">おすすめ</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {recommended.map((p) => {
                  const used = usedNames.has(p.name);
                  return (
                    <button
                      key={p.name}
                      onClick={() => !used && onSelect(p)}
                      disabled={used}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left text-sm transition-all ${
                        used
                          ? "opacity-35 cursor-not-allowed bg-white/5 text-gray-500"
                          : "bg-white/10 hover:bg-blue-500/20 text-white hover:border-blue-400 border border-white/10"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          p.pos === "GK" ? "bg-[#c8960c]" : "bg-[#003087]"
                        } text-white`}
                      >
                        {p.name.slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-bold text-xs">{p.name}</p>
                        <p className="text-[10px] text-gray-400">{p.pos}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {others.length > 0 && (
            <>
              <p className="text-xs text-gray-400 font-bold mb-2">その他</p>
              <div className="grid grid-cols-2 gap-2 pb-4">
                {others.map((p) => {
                  const used = usedNames.has(p.name);
                  return (
                    <button
                      key={p.name}
                      onClick={() => !used && onSelect(p)}
                      disabled={used}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left text-sm transition-all ${
                        used
                          ? "opacity-35 cursor-not-allowed bg-white/5 text-gray-500"
                          : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          p.pos === "GK" ? "bg-[#c8960c]" : "bg-[#003087]"
                        } text-white`}
                      >
                        {p.name.slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-bold text-xs">{p.name}</p>
                        <p className="text-[10px] text-gray-400">{p.pos}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page (wrapper for Suspense) ─── */
export default function StamenPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] bg-gradient-to-b from-[#0a1628] to-[#1a1a2e] flex items-center justify-center"><p className="text-white/50">Loading...</p></div>}>
      <StamenPageInner />
    </Suspense>
  );
}

function StamenPageInner() {
  const searchParams = useSearchParams();
  const teamParam = searchParams.get("team");

  // チームモード（J1 + J2/J3対応）
  const j1Team = teamParam ? getJ1TeamById(teamParam) : null;
  const j2j3Team = teamParam ? getJ2J3TeamById(teamParam) : null;
  const teamData = j1Team || j2j3Team;

  const teamRoster = useMemo(() => {
    if (!teamParam) return [];
    const j1r = getRosterByTeamId(teamParam);
    if (j1r.length > 0) return j1r;
    const eaR = getEastARosterByTeamId(teamParam);
    if (eaR.length > 0) return eaR;
    const ebR = getEastBRosterByTeamId(teamParam);
    if (ebR.length > 0) return ebR;
    return [];
  }, [teamParam]);

  const activeSquad: Player[] = useMemo(() => {
    if (teamData && teamRoster.length > 0) {
      return teamRoster.map((p) => ({
        name: p.name,
        pos: p.position,
        club: teamData.fullName,
      }));
    }
    return SQUAD;
  }, [teamData, teamRoster]);

  const isJ1Mode = !!teamData;
  const accentColor = teamData?.color ?? "#E8192C";
  const teamLabel = teamData ? teamData.fullName : "日本代表";

  // チーム固有フォーメーション or 日本代表用
  const availableFormations = useMemo(() => {
    if (j1Team?.formations && j1Team.formations.length > 0) {
      return j1Team.formations
        .map((tf) => {
          const base = FORMATIONS.find((f) => f.id === tf.id);
          if (!base) return null;
          return { ...base, tag: tf.tag };
        })
        .filter(Boolean) as Formation[];
    }
    return FORMATIONS.filter((f) => ["3421", "4231", "433", "352"].includes(f.id)).map((f) => ({
      ...f,
      tag: f.id === "3421" ? "現在のメイン布陣" : f.id === "4231" ? "カタール前の基本形" : f.id === "433" ? "攻撃的オプション" : f.tag,
    }));
  }, [j1Team]);

  const [step, setStep] = useState(0);
  const [formation, setFormation] = useState<Formation | null>(null);
  const [slots, setSlots] = useState<(Player | null)[]>(Array(11).fill(null));
  const [modalSlot, setModalSlot] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [animClass, setAnimClass] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const usedNames = new Set(
    slots.filter(Boolean).map((p) => p!.name),
  );

  const filledCount = slots.filter(Boolean).length;

  /* ── slide transition helper ── */
  const changeStep = useCallback((newStep: number, direction: "forward" | "back") => {
    const exitClass = direction === "forward" ? "stamen-exit-left" : "stamen-exit-right";
    setAnimClass(exitClass);
    setTimeout(() => {
      setStep(newStep);
      const enterClass = direction === "forward" ? "stamen-enter-right" : "stamen-enter-left";
      setAnimClass(enterClass);
      setTimeout(() => setAnimClass(""), 300);
    }, 150);
  }, []);

  /* ── handlers ── */
  const handleFormationSelect = (f: Formation) => {
    setFormation(f);
    setSlots(Array(11).fill(null));
  };

  const handleSlotSelect = (player: Player) => {
    if (modalSlot === null) return;
    setSlots((prev) => {
      const next = [...prev];
      next[modalSlot] = player;
      return next;
    });
    setModalSlot(null);
  };

  const handleSlotClear = (index: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const nextStep = () => {
    if (step === 0) {
      if (!formation) {
        showToast("フォーメーションを選択してください");
        return;
      }
      changeStep(1, "forward");
    } else if (step === 1) {
      const remaining = 11 - filledCount;
      if (remaining > 0) {
        showToast(`あと${remaining}人選択してください`);
        return;
      }
      changeStep(2, "forward");
    }
  };

  const prevStep = () => {
    if (step > 0) changeStep(step - 1, "back");
  };

  const reset = () => {
    setAnimClass("stamen-exit-left");
    setTimeout(() => {
      setStep(0);
      setFormation(null);
      setSlots(Array(11).fill(null));
      setAnimClass("stamen-enter-left");
      setTimeout(() => setAnimClass(""), 300);
    }, 150);
  };

  const captureCard = async (): Promise<Blob | null> => {
    if (!formation) return null;

    const S = 2; // Retina scale
    const W = 480;
    const H = 560;
    const canvas = document.createElement("canvas");
    canvas.width = W * S;
    canvas.height = H * S;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.scale(S, S);

    // ── Background gradient ──
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#0a1628");
    bgGrad.addColorStop(1, "#152238");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // ── Title ──
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText("MY STARTING XI", W / 2, 32);
    ctx.fillStyle = "#60a5fa";
    ctx.font = "500 14px system-ui, sans-serif";
    ctx.fillText(formation.name, W / 2, 52);

    // ── Pitch area ──
    const pitchX = 20;
    const pitchY = 65;
    const pitchW = W - 40;
    const pitchH = pitchW; // square

    // Pitch gradient
    const pitchGrad = ctx.createLinearGradient(pitchX, pitchY, pitchX, pitchY + pitchH);
    pitchGrad.addColorStop(0, "#2d8a4e");
    pitchGrad.addColorStop(1, "#1e6b3a");
    ctx.fillStyle = pitchGrad;
    ctx.beginPath();
    ctx.roundRect(pitchX, pitchY, pitchW, pitchH, 12);
    ctx.fill();

    // Pitch lines
    const lineColor = "rgba(255,255,255,0.3)";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    const m = pitchW * 0.04; // 4% margin
    // Outer border
    ctx.strokeRect(pitchX + m, pitchY + m, pitchW - m * 2, pitchH - m * 2);
    // Half line
    const halfY = pitchY + pitchH / 2;
    ctx.beginPath();
    ctx.moveTo(pitchX + m, halfY);
    ctx.lineTo(pitchX + pitchW - m, halfY);
    ctx.stroke();
    // Center circle
    const centerCircleR = pitchW * 0.13;
    ctx.beginPath();
    ctx.arc(pitchX + pitchW / 2, halfY, centerCircleR, 0, Math.PI * 2);
    ctx.stroke();
    // Penalty area top (attack side)
    const paW = pitchW * 0.56;
    const paH = pitchH * 0.18;
    ctx.strokeRect(pitchX + (pitchW - paW) / 2, pitchY + m, paW, paH);
    // Goal area top
    const gaW = pitchW * 0.32;
    const gaH = pitchH * 0.09;
    ctx.strokeRect(pitchX + (pitchW - gaW) / 2, pitchY + m, gaW, gaH);
    // Penalty area bottom (GK side)
    ctx.strokeRect(pitchX + (pitchW - paW) / 2, pitchY + pitchH - m - paH, paW, paH);
    // Goal area bottom
    ctx.strokeRect(pitchX + (pitchW - gaW) / 2, pitchY + pitchH - m - gaH, gaW, gaH);

    // ── Players ──
    const circleR = 18;
    formation.positions.forEach((pos, i) => {
      const player = slots[i];
      if (!player) return;
      const isGK = pos.pos === "GK";
      const px = pitchX + (pos.x / 100) * pitchW;
      const mappedY = toHalfY(pos.y);
      const py = pitchY + (mappedY / 100) * pitchH;

      // Circle
      ctx.beginPath();
      ctx.arc(px, py, circleR, 0, Math.PI * 2);
      ctx.fillStyle = isGK ? "#c8960c" : "#003087";
      ctx.fill();
      // White border
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Name abbreviation inside circle
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(player.name.slice(0, 2), px, py);

      // Full name below
      ctx.textBaseline = "top";
      ctx.font = "600 9px system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 3;
      ctx.fillText(player.name, px, py + circleR + 2);
      ctx.shadowBlur = 0;
    });

    // ── Footer ──
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "10px system-ui, sans-serif";
    ctx.fillText("\u00A9 SAMURAI FOOTBALL 2026", W / 2, H - 12);

    return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  };

  const shareText = isJ1Mode
    ? `${teamLabel}スタメン予想！${formation?.name ?? ""} #${teamLabel.replace(/[・\s]/g, "")} #Jリーグ #SAMURAIFOOTBALL`
    : `日本代表スタメン予想！${formation?.name ?? ""} #サムライブルー #SAMURAIFOOTBALL #W杯2026`;
  const shareUrl = isJ1Mode
    ? `https://samurai-football.jp/stamen?team=${teamParam}`
    : "https://samurai-football.jp/stamen";

  const handleShare = async () => {
    try {
      const blob = await captureCard();

      if (blob && navigator.share && navigator.canShare) {
        const file = new File([blob], "stamen.png", { type: "image/png" });
        const shareData = { text: `${shareText}\n${shareUrl}`, files: [file] };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }

      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(tweetUrl, "_blank", "noopener");
    } catch (err) {
      console.error("Share failed:", err);
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(tweetUrl, "_blank", "noopener");
    }
  };

  const handleSaveImage = async () => {
    try {
      const blob = await captureCard();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-starting-xi.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Image save failed:", err);
      showToast("スクリーンショットで保存してください");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#0a1628] to-[#1a1a2e] py-4 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {isJ1Mode ? `${teamLabel}` : ""} スタメンメーカー
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {isJ1Mode ? `${teamLabel}のベスト11を組もう！` : "イギリス遠征のベストスタメンを組もう！"}
          </p>
        </div>

        <StepBar current={step} />

        {/* animated wrapper */}
        <div className={`stamen-step ${animClass}`}>
          {/* ━━ STEP 0: Formation ━━ */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">フォーメーションを選択</h2>
              <p className="text-gray-400 text-xs mb-3">
                {isJ1Mode ? `${teamLabel}の2026年シーズン布陣` : "森保ジャパンで使われるフォーメーション"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {availableFormations.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFormationSelect(f)}
                    className={`rounded-xl p-4 text-left transition-all border-2 ${
                      formation?.id === f.id
                        ? "bg-blue-500/20 border-blue-400 scale-[1.02]"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <p className="text-white font-bold text-lg">{f.name}</p>
                    <p className="text-gray-400 text-xs mt-1">{f.tag}</p>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex justify-between items-center gap-3">
                <Link
                  href={isJ1Mode ? `/jleague/team/${teamParam}` : "/"}
                  className="px-5 py-2.5 rounded-lg text-sm text-white transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                >
                  ← {isJ1Mode ? "チームへ" : "トップへ"}
                </Link>
                <button
                  onClick={nextStep}
                  className="flex-1 max-w-[200px] py-2.5 rounded-lg text-white font-semibold transition-all duration-200 hover:bg-[#c0141f]"
                  style={{ background: accentColor }}
                >
                  次へ →
                </button>
              </div>
            </div>
          )}

          {/* ━━ STEP 1: Starting 11 ━━ */}
          {step === 1 && formation && (
            <div>
              <p className="text-gray-400 text-xs mb-3">
                {filledCount < 11
                  ? `ポジションをタップして選手を選んでください（${filledCount}/11）`
                  : "全員選択済み！次へ進めます"}
              </p>
              <Pitch
                positions={formation.positions}
                slots={slots}
                onSlotClick={(i) => {
                  if (slots[i]) {
                    handleSlotClear(i);
                  } else {
                    setModalSlot(i);
                  }
                }}
              />
              <p className="text-center text-[10px] text-gray-600 mt-1">※ 配置済みの選手をタップで解除</p>
              <div className="mt-3 flex justify-between items-center gap-3">
                <button
                  onClick={prevStep}
                  className="px-5 py-2.5 rounded-lg text-sm text-white transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                >
                  ← 戻る
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 max-w-[200px] py-2.5 rounded-lg text-white font-semibold transition-all duration-200 hover:bg-[#c0141f]"
                  style={{ background: accentColor }}
                >
                  次へ →
                </button>
              </div>
            </div>
          )}

          {/* ━━ STEP 2: Result & Share ━━ */}
          {step === 2 && formation && (
            <div>
              {/* Share card */}
              <div
                ref={cardRef}
                className="bg-gradient-to-b from-[#0a1628] to-[#152238] rounded-2xl overflow-hidden border border-white/10 p-5"
              >
                <div className="text-center mb-3">
                  <p className="text-white font-bold text-lg">MY STARTING XI</p>
                  <p className="text-blue-400 text-sm font-medium">{formation.name}</p>
                </div>
                <Pitch positions={formation.positions} slots={slots} readonly />
                <p className="text-center text-[10px] text-gray-500 mt-4">
                  &copy; SAMURAI FOOTBALL 2026
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Xにシェアする
                </button>
                <button
                  onClick={handleSaveImage}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  画像を保存
                </button>
                <button
                  onClick={reset}
                  className="w-full text-gray-500 hover:text-gray-300 text-sm py-2 transition-colors"
                >
                  最初からやり直す
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ━━ Player Select Modal (for starting 11) ━━ */}
        {modalSlot !== null && formation && (
          <PlayerModal
            squad={activeSquad}
            usedNames={usedNames}
            posFilter={formation.positions[modalSlot].pos}
            onSelect={handleSlotSelect}
            onClose={() => setModalSlot(null)}
          />
        )}

        {/* ━━ Toast ━━ */}
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>

      {/* animations */}
      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }

        /* Step slide transitions */
        .stamen-step {
          transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
          opacity: 1;
          transform: translateX(0);
        }
        .stamen-exit-left {
          opacity: 0;
          transform: translateX(-40px);
        }
        .stamen-exit-right {
          opacity: 0;
          transform: translateX(40px);
        }
        .stamen-enter-right {
          animation: enter-from-right 0.3s ease-in-out forwards;
        }
        .stamen-enter-left {
          animation: enter-from-left 0.3s ease-in-out forwards;
        }
        @keyframes enter-from-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes enter-from-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
