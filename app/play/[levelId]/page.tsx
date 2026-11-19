"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getScenarioByLevel } from "@/data/scenarios/levels";
import { evaluateScenarioAnswer } from "@/lib/engine/evaluator";

export default function PlayLevelPage() {
  const params = useParams<{ levelId: string }>();
  const levelNum = Number(params?.levelId ?? 1);
  const scenario = useMemo(() => getScenarioByLevel(levelNum), [levelNum]);

  const [outlierVal, setOutlierVal] = useState<number>(25);
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const series = useMemo(
    () => [...scenario.baselineValues, outlierVal],
    [scenario.baselineValues, outlierVal]
  );

  const meanVal = useMemo(() => {
    const sum = series.reduce((acc, n) => acc + n, 0);
    return (sum / series.length).toFixed(1);
  }, [series]);

  const medianVal = useMemo(() => {
    const sorted = [...series].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(1)
      : sorted[mid].toFixed(1);
  }, [series]);

  const result = useMemo(
    () => evaluateScenarioAnswer(scenario, selectedOption),
    [scenario, selectedOption]
  );

  const hintList = [
    { label: "Hint 1 · Framing", text: scenario.hints.framing },
    { label: "Hint 2 · Method", text: scenario.hints.method },
    { label: "Hint 3 · Watch Out", text: scenario.hints.diagnostic },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-200">
          ← All Levels
        </Link>
        <span>
          Level {scenario.levelNumber} · Tier {scenario.tier}
        </span>
      </div>

      <section className="space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h1 className="text-xl font-bold">{scenario.title}</h1>
        <p className="text-sm leading-relaxed text-slate-300">
          {scenario.contextPrompt}
        </p>

        <div className="pt-3">
          <div className="mb-1 flex justify-between text-xs text-slate-300">
            <span>{scenario.outlierLabel}</span>
            <span className="font-semibold text-emerald-400">{outlierVal} hrs</span>
          </div>
          <input
            type="range"
            min={10}
            max={scenario.outlierMax}
            step={scenario.outlierStep}
            value={outlierVal}
            onChange={(e) => setOutlierVal(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-lg bg-slate-950 p-3">
            <p className="text-xs text-slate-400">Mean (Average)</p>
            <p className="text-lg font-bold text-amber-300">{meanVal} hrs</p>
          </div>
          <div className="rounded-lg bg-slate-950 p-3">
            <p className="text-xs text-slate-400">Median (Middle)</p>
            <p className="text-lg font-bold text-emerald-300">{medianVal} hrs</p>
          </div>
        </div>
      </section>

      <section className="space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Progressive Hints</h2>
          <button
            type="button"
            disabled={hintsUnlocked >= 3}
            onClick={() => setHintsUnlocked((h) => Math.min(3, h + 1))}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-emerald-300 disabled:opacity-40"
          >
            {hintsUnlocked >= 3 ? "All Hints Shown" : `Unlock Hint ${hintsUnlocked + 1}`}
          </button>
        </div>

        {hintsUnlocked === 0 && (
          <p className="text-xs text-slate-400">
            Try testing the slider first, or unlock hints one step at a time.
          </p>
        )}

        <div className="space-y-2">
          {hintList.slice(0, hintsUnlocked).map((hint) => (
            <div key={hint.label} className="rounded-lg bg-slate-950 p-3 text-xs">
              <p className="font-semibold text-emerald-400">{hint.label}</p>
              <p className="mt-1 text-slate-300">{hint.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-sm font-semibold">Your Diagnosis</h2>
        <div className="space-y-2">
          {scenario.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 text-xs ${
                selectedOption === opt.id
                  ? "border-emerald-400 bg-slate-950"
                  : "border-slate-800 bg-slate-950/60"
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
              <span className="text-slate-200">{opt.label}</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          disabled={!selectedOption}
          onClick={() => setSubmitted(true)}
          className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-40"
        >
          Check Answer
        </button>
      </section>

      {submitted && (
        <section className="space-y-3 rounded-xl border border-emerald-500/40 bg-slate-900 p-4">
          <p
            className={`text-sm font-bold ${
              result.isCorrect ? "text-emerald-400" : "text-amber-300"
            }`}
          >
            {result.isCorrect
              ? "Spot on! Here is the statistical concept behind it:"
              : "Not quite—here is the concept that explains what happened:"}
          </p>

          <div className="space-y-2 text-xs text-slate-300">
            <div>
              <p className="font-semibold text-white">{scenario.debrief.conceptName}</p>
              <p className="mt-0.5">{scenario.debrief.plainExplanation}</p>
            </div>
            <div>
              <p className="font-semibold text-emerald-300">In This Scenario</p>
              <p className="mt-0.5">{scenario.debrief.scenarioTakeaway}</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">Connection to Next Level</p>
              <p className="mt-0.5">{scenario.debrief.nextConceptLink}</p>
            </div>
          </div>

          <div className="pt-1">
            <Link
              href={`/play/${Math.min(10, scenario.levelNumber + 1)}`}
              className="inline-block rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-slate-700"
            >
              Continue to Level {Math.min(10, scenario.levelNumber + 1)} →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
