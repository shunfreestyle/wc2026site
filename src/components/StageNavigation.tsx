"use client";

type StageItem = {
  stage: string;
  badge: string;
  bg: string;
  text: string;
  border: string;
  count: number;
};

export default function StageNavigation({ items }: { items: StageItem[] }) {
  return (
    <nav className="flex flex-wrap gap-2 mb-10 sticky top-16 z-40 bg-[#f8f9fa] py-3 -mx-4 px-4">
      {items.map((s) => (
        <a
          key={s.stage}
          href={`#stage-${s.stage}`}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(`stage-${s.stage}`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
          className="text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
        >
          {s.badge} ({s.count})
        </a>
      ))}
    </nav>
  );
}
