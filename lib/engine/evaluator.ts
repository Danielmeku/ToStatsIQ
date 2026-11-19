import { ScenarioData } from "@/lib/types/scenario";

export interface EvaluationResult {
  isCorrect: boolean;
  selectedOptionId: string;
  correctOptionId: string;
}

export function evaluateScenarioAnswer(
  scenario: ScenarioData,
  selectedOptionId: string
): EvaluationResult {
  return {
    isCorrect: selectedOptionId === scenario.correctOptionId,
    selectedOptionId,
    correctOptionId: scenario.correctOptionId,
  };
}
