export type Position = "GK" | "DF" | "MF" | "FW";

export const POSITION_CONFIG = {
  GK: { label: "GK", labelJa: "ゴールキーパー", color: "bg-amber-100 text-amber-800", bgGradient: "from-amber-500 to-amber-400", border: "border-amber-400" },
  DF: { label: "DF", labelJa: "ディフェンダー", color: "bg-blue-100 text-blue-800", bgGradient: "from-blue-600 to-blue-500", border: "border-blue-400" },
  MF: { label: "MF", labelJa: "ミッドフィルダー", color: "bg-emerald-100 text-emerald-800", bgGradient: "from-emerald-600 to-emerald-500", border: "border-emerald-400" },
  FW: { label: "FW", labelJa: "フォワード", color: "bg-red-100 text-red-800", bgGradient: "from-red-600 to-red-500", border: "border-red-400" },
} as const;

export function getPositionConfig(pos: string) {
  return POSITION_CONFIG[pos as Position] ?? { label: pos, color: "bg-gray-100 text-gray-800" };
}

export const POSITION_ORDER: Record<Position, number> = { GK: 0, DF: 1, MF: 2, FW: 3 };

export function sortByPosition<T extends { position: string }>(players: T[]): T[] {
  return [...players].sort(
    (a, b) => (POSITION_ORDER[a.position as Position] ?? 99) - (POSITION_ORDER[b.position as Position] ?? 99)
  );
}
