export type TierNumber = 1 | 2 | 3 | 4;

export interface HintSet {
  framing: string;    // Hint 1: What to look at
  method: string;     // Hint 2: How to compare or calculate
  diagnostic: string; // Hint 3: Common trap or edge case
}

export interface DebriefInfo {
  conceptName: string;      // e.g., "Mean vs. Median (Skewness)"
  plainExplanation: string; // Simple explanation of the concept
  scenarioTakeaway: string; // Why it explains this exact scenario
  nextConceptLink: string;  // How it connects to the next level
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface ScenarioData {
  id: string;
  levelNumber: number; // 1 to 10
  tier: TierNumber;
  title: string;
  contextPrompt: string;
  baselineValues: number[];
  outlierLabel: string;
  outlierMax: number;
  outlierStep: number;
  options: ChoiceOption[];
  correctOptionId: string;
  hints: HintSet;
  debrief: DebriefInfo;
}
