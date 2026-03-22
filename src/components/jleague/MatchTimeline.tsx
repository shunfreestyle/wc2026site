import type { JTimelineEvent } from "@/data/jleague";

const typeIcon: Record<string, string> = {
  goal: "⚽",
  card: "🟨",
  sub: "🔄",
  note: "📋",
};

const typeColors: Record<string, string> = {
  goal: "#639922",
  card: "#BA7517",
  sub: "#185FA5",
  note: "#6B7280",
};

export default function MatchTimeline({ events }: { events: JTimelineEvent[] }) {
  return (
    <div className="relative pl-5">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-200" />
      <div className="space-y-4">
        {events.map((ev, i) => (
          <div key={i} className="relative">
            <div
              className="absolute -left-3 top-1 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ background: typeColors[ev.type] || "#6B7280" }}
            />
            <p className="text-[10px] text-gray-400 mb-0.5">
              {ev.minute}&apos; {typeIcon[ev.type] || ""}
            </p>
            <p className="text-xs text-gray-700 leading-snug">{ev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
