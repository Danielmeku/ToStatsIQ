"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { computeLevelMetrics, getScenarioByLevel } from "@/data/scenarios/levels";
import { evaluateScenarioAnswer } from "@/lib/engine/evaluator";

export default function PlayLevelPage() {
  const params = useParams<{ levelId: string }>();
  const levelNum = Number(params?.levelId ?? 1);
  const scenario = useMemo(() => getScenarioByLevel(levelNum), [levelNum]);

  const [sliderVal, setSliderVal] = useState<number>(scenario.sliderDefault);
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setSliderVal(scenario.sliderDefault);
    setHintsUnlocked(0);
    setSelectedOption("");
    setSubmitted(false);
  }, [scenario]);

  const { metricA, metricB } = useMemo(
    () => computeLevelMetrics(scenario, sliderVal),
    [scenario, sliderVal]
  );

  const result = useMemo(
    () => evaluateScenarioAnswer(scenario, selectedOption),
    [scenario, selectedOption]
  );

  const handleSubmit = () => {
    setSubmitted(true);
    if (selectedOption === scenario.correctOptionId) {
      try {
        const existing: number[] = JSON.parse(
          localStorage.getItem("tostatsiq_done") || "[]"
        );
        if (!existing.includes(scenario.levelNumber)) {
          localStorage.setItem(
            "tostatsiq_done",
            JSON.stringify([...existing, scenario.levelNumber])
          );
        }
      } catch {
        // ignore storage errors
      }
    }
  };

  const hintList = [
    { label: "Hint 1 · Framing", text: scenario.hints.framing },
    { label: "Hint 2 · Method", text: scenario.hints.method },
    { label: "Hint 3 · Watch Out", text: scenario.hints.diagnostic },
  ];

  const barAPct = Math.min(100, Math.max(6, (metricA / scenario.metrics.barMax) * 100));
  const barBPct = Math.min(100, Math.max(6, (metricB / scenario.metrics.barMax) * 100));

  return (
    <div className="space-y-4 pb-10">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <Link
          href="/"
          className="rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-800"
        >
          ← Levels
        </Link>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-emerald-300">
          Level {scenario.levelNumber} of 10
        </span>
      </div>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-md">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            {scenario.tierTitle}
          </p>
          <h1 className="mt-1 text-xl font-bold text-white">{scenario.title}</h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {scenario.contextPrompt}
          </p>
        </div>

        <div className="rounded-xl bg-slate-950/90 p-3.5">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-slate-300">{scenario.sliderLabel}</span>
            <span className="font-bold text-emerald-400">{sliderVal}</span>
          </div>
          <input
            type="range"
            min={scenario.sliderMin}
            max={scenario.sliderMax}
            step={scenario.sliderStep}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full cursor-pointer accent-emerald-400"
          />
        </div>

        <div className="space-y-3 rounded-xl bg-slate-950/90 p-3.5">
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-400">{scenario.metrics.labelA}</span>
              <span className="font-bold text-amber-300">
                {metricA} {scenario.metrics.unit}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-200"
                style={{ width: `${barAPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-400">{scenario.metrics.labelB}</span>
              <span className="font-bold text-emerald-300">
                {metricB} {scenario.metrics.unit}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-200"
                style={{ width: `${barBPct}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Progressive Hints ({hintsUnlocked}/3)
          </h2>
          <button
            type="button"
            disabled={hintsUnlocked >= 3}
            onClick={() => setHintsUnlocked((h) => Math.min(3, h + 1))}
            className="rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 disabled:opacity-40"
          >
            {hintsUnlocked >= 3 ? "All Hints Open" : `Reveal Hint ${hintsUnlocked + 1}`}
          </button>
        </div>

        <div className="space-y-2">
          {hintList.slice(0, hintsUnlocked).map((hint) => (
            <div
              key={hint.label}
              className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs"
            >
              <p className="font-semibold text-emerald-400">{hint.label}</p>
              <p className="mt-1 leading-relaxed text-slate-300">{hint.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Your Diagnosis
        </h2>
        <div className="space-y-2">
          {scenario.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs transition ${
                selectedOption === opt.id
                  ? "border-emerald-400 bg-emerald-950/20"
                  : "border-slate-800 bg-slate-950/70 hover:border-slate-700"
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={opt.id}
                checked={selectedOption === opt.id}
                onChange={() => {
                  setSelectedOption(opt.id);
                  setSubmitted(false);
                }}
                className="mt-0.5 accent-emerald-400"
              />
              <span className="leading-relaxed text-slate-200">{opt.label}</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          disabled={!selectedOption}
          onClick={handleSubmit}
          className="w-full rounded-xl bg-emerald-400 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-40"
        >
          Check Diagnosis
        </button>
      </section>

      {submitted && (
        <section
          className={`space-y-3 rounded-2xl border p-5 ${
            result.isCorrect
              ? "border-emerald-400/50 bg-emerald-950/20"
              : "border-amber-400/50 bg-amber-950/20"
          }`}
        >
          <p
            className={`text-sm font-bold ${
              result.isCorrect ? "text-emerald-300" : "text-amber-300"
            }`}
          >
            {result.isCorrect
              ? "Correct! Statistical Concept Unlocked:"
              : "Not quite — review how the concept works here:"}
          </p>

          <div className="space-y-2.5 text-xs leading-relaxed text-slate-200">
            <div className="rounded-xl bg-slate-950/80 p-3">
              <p className="font-bold text-white">{scenario.debrief.conceptName}</p>
              <p className="mt-1 text-slate-300">{scenario.debrief.plainExplanation}</p>
            </div>
            <div className="rounded-xl bg-slate-950/80 p-3">
              <p className="font-semibold text-emerald-300">Why It Matters Here</p>
              <p className="mt-1 text-slate-300">{scenario.debrief.scenarioTakeaway}</p>
            </div>
            <div className="rounded-xl bg-slate-950/80 p-3">
              <p className="font-semibold text-amber-300">Concept Connection</p>
              <p className="mt-1 text-slate-300">{scenario.debrief.nextConceptLink}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            {scenario.levelNumber < 10 ? (
              <Link
                href={`/play/${scenario.levelNumber + 1}`}
                className="flex-1 rounded-xl bg-emerald-400 py-2.5 text-center text-xs font-bold text-slate-950 hover:bg-emerald-300"
              >
                Next: Level {scenario.levelNumber + 1} →
              </Link>
            ) : (
              <Link
                href="/"
                className="flex-1 rounded-xl bg-emerald-400 py-2.5 text-center text-xs font-bold text-slate-950 hover:bg-emerald-300"
              >
                Back to Completed Path
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
