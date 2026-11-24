export type TierNumber = 1 | 2 | 3 | 4;

export interface HintSet {
  framing: string;
  method: string;
  diagnostic: string;
}

export interface DebriefInfo {
  conceptName: string;
  plainExplanation: string;
  scenarioTakeaway: string;
  nextConceptLink: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface MetricReadout {
  labelA: string;
  labelB: string;
  barMax: number;
  unit: string;
}

export interface ScenarioData {
  id: string;
  levelNumber: number; // 1 to 10
  tier: TierNumber;
  tierTitle: string;
  title: string;
  contextPrompt: string;
  sliderLabel: string;
  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  sliderDefault: number;
  metrics: MetricReadout;
  options: ChoiceOption[];
  correctOptionId: string;
  hints: HintSet;
  debrief: DebriefInfo;
}
