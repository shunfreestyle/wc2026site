"use client";

import type { CountryInfo } from "@/data/uniforms";

export default function CountryNav({ countries }: { countries: CountryInfo[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
      {countries.map((c) => (
        <button
          key={c.id}
          onClick={() => {
            const el = document.getElementById(`country-${c.id}`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors shadow-sm"
        >
          {c.flag} {c.name}
        </button>
      ))}
    </div>
  );
}
