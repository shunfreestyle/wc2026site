import Image from "next/image";
import type { Player } from "@/data/teams";

const positionConfig = {
  GK: { bg: "bg-amber-400", text: "text-amber-950", label: "GK", ring: "ring-amber-200" },
  DF: { bg: "bg-blue-500", text: "text-white", label: "DF", ring: "ring-blue-200" },
  MF: { bg: "bg-emerald-500", text: "text-white", label: "MF", ring: "ring-emerald-200" },
  FW: { bg: "bg-red-500", text: "text-white", label: "FW", ring: "ring-red-200" },
};

type Size = "sm" | "md" | "lg";

const sizeConfig = {
  sm: { px: 32, container: "w-8 h-8", text: "text-[10px]", ring: "ring-1" },
  md: { px: 40, container: "w-10 h-10", text: "text-xs", ring: "ring-2" },
  lg: { px: 64, container: "w-16 h-16", text: "text-base", ring: "ring-2" },
} as const;

export default function PlayerAvatar({
  player,
  size = "md",
}: {
  player: Player;
  size?: Size;
}) {
  const pos = positionConfig[player.position];
  const s = sizeConfig[size];

  if (player.imageUrl) {
    return (
      <div className={`${s.container} rounded-full overflow-hidden ring ${s.ring} ${pos.ring} shrink-0 relative`}>
        <Image
          src={player.imageUrl}
          alt={player.nameJa}
          fill
          sizes={`${s.px}px`}
          className="object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`${s.container} ${pos.bg} rounded-full flex items-center justify-center ring ${s.ring} ${pos.ring} shrink-0`}
    >
      <span className={`${pos.text} ${s.text} font-bold`}>{pos.label}</span>
    </div>
  );
}
