"use client";
import type { JFormation } from "@/data/jleague";

export default function FormationView({
  formation,
  teamColor,
  teamName,
}: {
  formation: JFormation;
  teamColor: string;
  teamName: string;
}) {
  const lines: typeof formation.players[] = [];
  let idx = 0;
  for (const count of [1, ...formation.shape.split("-").map(Number)]) {
    lines.push(formation.players.slice(idx, idx + count));
    idx += count;
  }
  const displayLines = [...lines].reverse();

  return (
    <div>
      <p className="text-xs text-gray-400 mb-3 text-center">
        <span className="font-bold" style={{ color: teamColor }}>{teamName}</span>
        {" "}
        <span className="text-gray-300">{formation.shape}</span>
      </p>
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1a472a 0%, #2d5a3f 100%)", minHeight: "200px" }}
      >
        <div
          className="absolute inset-3 rounded-lg pointer-events-none"
          style={{ border: "1px solid rgba(255,255,255,0.2)" }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 48,
            height: 48,
            border: "1px solid rgba(255,255,255,0.15)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div className="relative z-10 flex flex-col gap-4 py-4">
          {displayLines.map((line, li) => (
            <div key={li} className="flex justify-center gap-3 flex-wrap">
              {line.map((p) => (
                <div key={p.number} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold border-2 border-white/30"
                    style={{
                      background: p.position === "GK" ? "#7b241c" : teamColor,
                      fontSize: "10px",
                    }}
                  >
                    {p.number}
                    {p.isCaptain && <span style={{ fontSize: "7px", marginLeft: "1px" }}>C</span>}
                  </div>
                  <span
                    className="text-white/80 text-center leading-tight"
                    style={{ fontSize: "9px", maxWidth: "48px" }}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
