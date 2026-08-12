import type { SeasonRecord } from "@/data/j1-history";

const DIV_COLORS: Record<number, string> = {
  1: "#003087",
  2: "#00A651",
  3: "#E8192C",
};

const DIV_LABELS: Record<number, string> = {
  1: "J1",
  2: "J2",
  3: "JFL/J3",
};

export default function SeasonChart({
  records,
  accentColor,
}: {
  records: SeasonRecord[];
  accentColor: string;
}) {
  if (records.length === 0) return null;

  const maxPos = Math.max(...records.map((r) => r.pos), 18);

  return (
    <div className="space-y-0.5">
      {records.map((r) => {
        const pct = ((maxPos - r.pos + 1) / maxPos) * 100;
        const isChamp = r.pos === 1 && r.division === 1;
        const color = DIV_COLORS[r.division] || "#999";

        return (
          <div key={r.year} className="flex items-center gap-2 group">
            <span className="text-[11px] text-gray-500 w-8 text-right font-mono shrink-0">
              {String(r.year).slice(2)}
            </span>
            <span className="text-[9px] text-gray-400 w-5 shrink-0">
              {DIV_LABELS[r.division] || ""}
            </span>
            <div className="flex-1 h-5 bg-gray-50 rounded-sm overflow-hidden relative">
              <div
                className="h-full rounded-sm transition-all"
                style={{
                  width: `${Math.max(pct, 5)}%`,
                  backgroundColor: isChamp ? accentColor : color,
                  opacity: isChamp ? 1 : 0.6,
                }}
              />
              <span className="absolute inset-y-0 right-1 flex items-center text-[10px] font-bold text-gray-600">
                {r.pos}位{isChamp ? " ★" : ""}
                {r.note && !isChamp ? ` ${r.note}` : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
