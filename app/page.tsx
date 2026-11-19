import Link from "next/link";

const LEVELS = [
  { level: 1, tier: "Tier 1 · Descriptive", name: "Mean vs. Median", ready: true },
  { level: 2, tier: "Tier 1 · Descriptive", name: "Spread & Consistency", ready: false },
  { level: 3, tier: "Tier 1 · Descriptive", name: "Rates & Base Rates", ready: false },
  { level: 4, tier: "Tier 2 · Relationships", name: "Correlation & Confounders", ready: false },
  { level: 5, tier: "Tier 2 · Relationships", name: "Simpson's Paradox", ready: false },
  { level: 6, tier: "Tier 2 · Relationships", name: "Regression to the Mean", ready: false },
  { level: 7, tier: "Tier 3 · Inference", name: "Sample Size & Precision", ready: false },
  { level: 8, tier: "Tier 3 · Inference", name: "Signal vs. Noise Testing", ready: false },
  { level: 9, tier: "Tier 4 · Trade-Offs", name: "Type I vs. Type II Errors", ready: false },
  { level: 10, tier: "Tier 4 · Trade-Offs", name: "Expected Value & Bayes", ready: false },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Telegram Mini App · 10-Level Progression
        </p>
        <h1 className="text-2xl font-bold">Statistical Scenario Lab</h1>
        <p className="text-sm text-slate-400">
          Test intuition on interactive scenarios, unlock progressive hints before solving, and connect concepts after.
        </p>
      </header>

      <div className="space-y-2.5">
        {LEVELS.map((item) => (
          <Link
            key={item.level}
            href={`/play/${item.level}`}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-emerald-500/50"
          >
            <div>
              <p className="text-xs text-slate-400">{item.tier}</p>
              <p className="font-semibold text-slate-100">
                Level {item.level}: {item.name}
              </p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-emerald-300">
              {item.ready ? "Play" : "Starter"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
