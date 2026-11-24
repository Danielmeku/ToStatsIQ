"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SCENARIOS } from "@/data/scenarios/levels";

export default function HomePage() {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tostatsiq_done") || "[]");
      if (Array.isArray(saved)) setCompleted(saved);
    } catch {
      setCompleted([]);
    }
  }, []);

  const tiers = [1, 2, 3, 4] as const;

  return (
    <div className="space-y-6 pb-8">
      <header className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            ToStatsIQ · Interactive Lab
          </span>
          <span className="text-xs font-medium text-slate-300">
            {completed.length} / {SCENARIOS.length} Solved
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
          Statistical Reasoning Path
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">
          Manipulate real-world variables, unlock progressive hints before solving, and master how statistical concepts connect.
        </p>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-300"
            style={{ width: `${(completed.length / SCENARIOS.length) * 100}%` }}
          />
        </div>
      </header>

      {tiers.map((tierNum) => {
        const items = SCENARIOS.filter((s) => s.tier === tierNum);
        return (
          <section key={tierNum} className="space-y-2.5">
            <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {items[0]?.tierTitle}
            </h2>

            <div className="space-y-2">
              {items.map((item) => {
                const isDone = completed.includes(item.levelNumber);
                return (
                  <Link
                    key={item.id}
                    href={`/play/${item.levelNumber}`}
                    className="group flex items-center justify-between rounded-xl border border-slate-800/90 bg-slate-900/90 p-4 transition hover:border-emerald-400/50 hover:bg-slate-900"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          isDone
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-800 text-slate-300 group-hover:text-emerald-300"
                        }`}
                      >
                        {isDone ? "✓" : item.levelNumber}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {item.debrief.conceptName}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-medium text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950">
                      {isDone ? "Replay" : "Start"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
