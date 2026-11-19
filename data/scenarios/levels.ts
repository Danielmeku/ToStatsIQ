import { ScenarioData } from "@/lib/types/scenario";

export const SCENARIOS: ScenarioData[] = [
  {
    id: "level-1",
    levelNumber: 1,
    tier: 1,
    title: "Typicality vs. Extremes",
    contextPrompt:
      "A regional delivery team completed 7 daily runs taking [22, 24, 23, 25, 24, 26, 25] hours. Slide the final outlier run upward to see how the average behaves compared to the middle run.",
    baselineValues: [22, 24, 23, 25, 24, 26],
    outlierLabel: "Extreme Delay Run (hours)",
    outlierMax: 120,
    outlierStep: 5,
    options: [
      {
        id: "median_stays_stable",
        label: "The median stays steady while the mean pulls upward with extreme delays",
      },
      {
        id: "mean_stays_stable",
        label: "The mean stays steady while the median jumps sharply",
      },
      {
        id: "both_move_equally",
        label: "Both the mean and median increase by the exact same amount",
      },
    ],
    correctOptionId: "median_stays_stable",
    hints: {
      framing: "Compare the sorted middle value (4th of 7 runs) against the sum of all 7 runs divided by 7.",
      method: "Drag the slider to 100+ hours and notice which summary metric shifts dramatically versus which stays anchored.",
      diagnostic: "A single extreme value changes the total sum directly, but only changes rank order—not the middle position.",
    },
    debrief: {
      conceptName: "Mean vs. Median (Skewness & Resistance)",
      plainExplanation:
        "The mean balances every number's exact weight, while the median only cares about the middle position once data is sorted. Skewed data pulls the mean away from what a typical case looks like.",
      scenarioTakeaway:
        "One severe delay inflates the average delivery time and can make routine operations look worse—or mask bottlenecks—if you only report the mean.",
      nextConceptLink:
        "Once you know where the center sits, Level 2 looks at spread and consistency—how two routes with the same average can behave very differently.",
    },
  },
];

export function getScenarioByLevel(levelNumber: number): ScenarioData {
  return (
    SCENARIOS.find((s) => s.levelNumber === levelNumber) ?? SCENARIOS[0]
  );
}
