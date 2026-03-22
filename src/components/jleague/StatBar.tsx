export default function StatBar({
  label,
  home,
  away,
  homeColor,
  awayColor,
  isPercent = false,
}: {
  label: string;
  home: number;
  away: number;
  homeColor: string;
  awayColor: string;
  isPercent?: boolean;
}) {
  const total = home + away || 1;
  const homeW = Math.round((home / total) * 100);
  const awayW = 100 - homeW;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-bold" style={{ color: homeColor }}>
          {isPercent ? `${home}%` : home}
        </span>
        <span className="text-gray-400 text-[10px]">{label}</span>
        <span className="font-bold" style={{ color: awayColor }}>
          {isPercent ? `${away}%` : away}
        </span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-px">
        <div
          className="rounded-l-full transition-all"
          style={{ width: `${homeW}%`, background: homeColor, opacity: 0.8 }}
        />
        <div
          className="rounded-r-full transition-all"
          style={{ width: `${awayW}%`, background: awayColor, opacity: 0.8 }}
        />
      </div>
    </div>
  );
}
