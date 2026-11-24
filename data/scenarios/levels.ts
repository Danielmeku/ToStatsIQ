import { ScenarioData } from "@/lib/types/scenario";

export const SCENARIOS: ScenarioData[] = [
  {
    id: "level-1",
    levelNumber: 1,
    tier: 1,
    tierTitle: "Tier 1 · Descriptive Foundations",
    title: "Typicality vs. Extremes",
    contextPrompt:
      "Seven regional delivery runs took [22, 24, 23, 25, 24, 26] hours plus one delayed run. Slide the final run upward to see how the average behaves compared to the middle run.",
    sliderLabel: "Extreme Delay Run",
    sliderMin: 20,
    sliderMax: 120,
    sliderStep: 5,
    sliderDefault: 25,
    metrics: { labelA: "Mean (Average)", labelB: "Median (Middle)", barMax: 60, unit: "hrs" },
    options: [
      { id: "median_stable", label: "The median stays anchored while the mean pulls upward with outliers" },
      { id: "mean_stable", label: "The mean stays anchored while the median jumps sharply" },
      { id: "equal_shift", label: "Both metrics increase by the exact same amount" },
    ],
    correctOptionId: "median_stable",
    hints: {
      framing: "Compare the sorted middle value (4th of 7 runs) against the arithmetic average.",
      method: "Move the slider above 90 hours and watch which bar stretches while the other stays flat.",
      diagnostic: "Outliers inflate the sum directly, but rank position only shifts by half a step at most.",
    },
    debrief: {
      conceptName: "Mean vs. Median (Skewness & Resistance)",
      plainExplanation:
        "The mean weighs every value's exact magnitude, while the median depends only on middle rank order. Skewed extremes pull the mean away from a typical case.",
      scenarioTakeaway:
        "A single severe delay distorts average delivery time and can hide whether everyday operations are actually on schedule.",
      nextConceptLink:
        "Once you know where the center sits, Level 2 examines spread—how two options with the exact same average can have wildly different reliability.",
    },
  },
  {
    id: "level-2",
    levelNumber: 2,
    tier: 1,
    tierTitle: "Tier 1 · Descriptive Foundations",
    title: "Spread & Consistency",
    contextPrompt:
      "Supplier A delivers steadily in ~30 mins. Supplier B averages 30 mins too, but swings wildly as demand spikes. Increase demand volatility to compare their spread.",
    sliderLabel: "Demand Volatility",
    sliderMin: 0,
    sliderMax: 25,
    sliderStep: 5,
    sliderDefault: 5,
    metrics: { labelA: "Supplier A Spread (IQR)", labelB: "Supplier B Spread (IQR)", barMax: 60, unit: "min" },
    options: [
      { id: "equal_mean_diff_risk", label: "Identical averages can hide major reliability risk when spread is wide" },
      { id: "mean_captures_all", label: "If two suppliers have the same mean, their late-delivery risk is identical" },
      { id: "lower_spread_worse", label: "Wider spread guarantees faster average delivery" },
    ],
    correctOptionId: "equal_mean_diff_risk",
    hints: {
      framing: "Both suppliers keep a 30-minute mean—look strictly at the spread bars.",
      method: "Push Demand Volatility to 20+ and see how wide Supplier B's middle 50% (IQR) becomes.",
      diagnostic: "Customers experience individual deliveries, not the long-run average.",
    },
    debrief: {
      conceptName: "Dispersion: Range, IQR & Standard Deviation",
      plainExplanation:
        "Measures of spread quantify how tightly data clusters around the center. Interquartile range (IQR) and standard deviation expose inconsistency that averages conceal.",
      scenarioTakeaway:
        "Choosing Supplier B based solely on a 30-minute average invites frequent SLA breaches whenever demand fluctuates.",
      nextConceptLink:
        "After summarizing center and spread, Level 3 tests how comparing raw counts without group sizes leads to base-rate traps.",
    },
  },
  {
    id: "level-3",
    levelNumber: 3,
    tier: 1,
    tierTitle: "Tier 1 · Descriptive Foundations",
    title: "Rates, Bases & Relative Change",
    contextPrompt:
      "Branch North logged 45 complaints; Branch South logged 90. Adjust South's customer traffic multiplier to see when more complaints actually means a better service rate.",
    sliderLabel: "South Traffic Multiplier",
    sliderMin: 1,
    sliderMax: 5,
    sliderStep: 1,
    sliderDefault: 1,
    metrics: { labelA: "North Complaint Rate", labelB: "South Complaint Rate", barMax: 10, unit: "%" },
    options: [
      { id: "normalize_by_base", label: "Raw counts mislead when group sizes differ; normalize by base volume first" },
      { id: "raw_count_wins", label: "90 complaints is always worse than 45 regardless of customer volume" },
      { id: "rates_ignore_volume", label: "Complaint rates stay constant as customer traffic grows" },
    ],
    correctOptionId: "normalize_by_base",
    hints: {
      framing: "North serves 1,000 customers. Multiply South's 1,000 base by the traffic slider.",
      method: "Set South Traffic Multiplier to 3x or 4x and compare complaints per 100 customers.",
      diagnostic: "Larger populations naturally generate higher raw event counts even at lower failure rates.",
    },
    debrief: {
      conceptName: "Base Rates & Denominator Normalization",
      plainExplanation:
        "A count without its denominator is incomplete. Converting raw counts into rates per unit exposure lets you compare groups of unequal size fairly.",
      scenarioTakeaway:
        "At 4x traffic (4,000 customers), South's 90 complaints equal 2.25%—half of North's 4.5% complaint rate.",
      nextConceptLink:
        "Comparing rates across groups sets up Level 4, where two rates move together—but a hidden third factor pulls the strings.",
    },
  },
  {
    id: "level-4",
    levelNumber: 4,
    tier: 2,
    tierTitle: "Tier 2 · Relationships & Structure",
    title: "Co-Movement Without Proof",
    contextPrompt:
      "Ice-cream ad spend and cooling-fan failures rise together in summer. Increase the Seasonal Heat Index to see how temperature drives both metrics simultaneously.",
    sliderLabel: "Seasonal Heat Index",
    sliderMin: 10,
    sliderMax: 50,
    sliderDefault: 15,
    sliderStep: 5,
    metrics: { labelA: "Ad Spend Index", labelB: "Fan Failure Rate", barMax: 100, unit: "pts" },
    options: [
      { id: "confounder_drives_both", label: "A confounding variable (heat) drives both metrics without ads causing failures" },
      { id: "ads_break_fans", label: "Cutting ad spend will mechanically stop cooling fans from failing" },
      { id: "no_correlation", label: "Two variables cannot correlate unless one directly causes the other" },
    ],
    correctOptionId: "confounder_drives_both",
    hints: {
      framing: "Watch both bars move in lockstep as you adjust the single Seasonal Heat slider.",
      method: "Ask whether changing ad spend would lower ambient temperature.",
      diagnostic: "Strong correlation is a clue to investigate, never automatic proof of causation.",
    },
    debrief: {
      conceptName: "Correlation vs. Causation & Confounders",
      plainExplanation:
        "A confounding variable influences both X and Y at the same time, creating a genuine statistical association without a direct causal link between them.",
      scenarioTakeaway:
        "Pausing ads won't prevent equipment overheating; maintenance budgets should track temperature forecasts instead.",
      nextConceptLink:
        "Spotting a third variable leads straight to Level 5, where splitting data by subgroup actually reverses the overall conclusion.",
    },
  },
  {
    id: "level-5",
    levelNumber: 5,
    tier: 2,
    tierTitle: "Tier 2 · Relationships & Structure",
    title: "Subgroup Reversals",
    contextPrompt:
      "Checkout Flow B wins in both Mobile (80% vs 75%) and Desktop (40% vs 35%), yet loses overall when pooled! Shift Flow B's Mobile traffic share to see the reversal.",
    sliderLabel: "Flow B Mobile Share",
    sliderMin: 10,
    sliderMax: 90,
    sliderDefault: 20,
    sliderStep: 10,
    metrics: { labelA: "Flow A Pooled Conv.", labelB: "Flow B Pooled Conv.", barMax: 100, unit: "%" },
    options: [
      { id: "simpsons_paradox", label: "Subgroup mix weights can reverse an aggregate trend even when a variant wins every segment" },
      { id: "math_impossible", label: "If B beats A in every subgroup, B must always have a higher overall average" },
      { id: "drop_segments", label: "Pooled totals are always more reliable than segmented breakdowns" },
    ],
    correctOptionId: "simpsons_paradox",
    hints: {
      framing: "Notice Mobile converts much higher overall than Desktop for both flows.",
      method: "Keep Flow B Mobile Share low (20%) vs high (80%)—Flow A stays at 60% Mobile.",
      diagnostic: "When Flow B gets mostly hard-to-convert Desktop traffic, its weighted average drops below A.",
    },
    debrief: {
      conceptName: "Simpson's Paradox & Weighted Aggregation",
      plainExplanation:
        "Simpson's paradox occurs when a trend appears in separate subgroups but disappears or reverses when the groups are combined due to unequal group weights.",
      scenarioTakeaway:
        "Rolling back Flow B based on pooled conversion would discard a superior checkout design simply because of traffic mix.",
      nextConceptLink:
        "Even when segments are clean, metrics bounce around over time—Level 6 shows why extreme streaks naturally cool off.",
    },
  },
  {
    id: "level-6",
    levelNumber: 6,
    tier: 2,
    tierTitle: "Tier 2 · Relationships & Structure",
    title: "Reversion to the Mean",
    contextPrompt:
      "Top stores scored 95% last month largely due to lucky foot-traffic spikes. Adjust the Luck/Noise Share to see how much their score drops next month with zero intervention.",
    sliderLabel: "Random Noise Share",
    sliderMin: 0,
    sliderMax: 80,
    sliderDefault: 50,
    sliderStep: 10,
    metrics: { labelA: "Month 1 Top Group", labelB: "Month 2 Follow-Up", barMax: 100, unit: "%" },
    options: [
      { id: "regression_mean", label: "Extreme results combine skill plus luck, so follow-up scores drift back toward average" },
      { id: "coaching_hurt", label: "Any drop after a record month proves the team stopped working hard" },
      { id: "extremes_repeat", label: "Top-1% outliers repeat the exact same extreme score if conditions stay unchanged" },
    ],
    correctOptionId: "regression_mean",
    hints: {
      framing: "True baseline ability is 75%; Month 1's 95% included a +20% positive shock.",
      method: "Increase Random Noise Share and watch Month 2 settle closer to the 75% baseline.",
      diagnostic: "Unusual luck rarely repeats twice in a row—evaluating interventions without a control group misreads natural reversion.",
    },
    debrief: {
      conceptName: "Regression to the Mean",
      plainExplanation:
        "Whenever outcomes contain random variation, unusually high or low observations tend to be followed by observations closer to the long-run average.",
      scenarioTakeaway:
        "Never judge a new policy solely by tracking last month's best or worst performers without a control group.",
      nextConceptLink:
        "Seeing random bounce across time raises Level 7's core question: how large a sample do we need before trusting an estimate?",
    },
  },
  {
    id: "level-7",
    levelNumber: 7,
    tier: 3,
    tierTitle: "Tier 3 · Uncertainty & Inference",
    title: "Sample Size & Precision",
    contextPrompt:
      "You survey users to estimate satisfaction (true rate 60%). Increase the sample size n to see how the 95% margin of error shrinks.",
    sliderLabel: "Sample Size (n)",
    sliderMin: 25,
    sliderMax: 1000,
    sliderDefault: 50,
    sliderStep: 25,
    metrics: { labelA: "Sample Estimate", labelB: "Margin of Error (±)", barMax: 70, unit: "%" },
    options: [
      { id: "sqrt_n_precision", label: "Larger samples narrow uncertainty bands proportionally to the square root of n" },
      { id: "linear_zero_error", label: "Doubling sample size cuts margin of error all the way to zero" },
      { id: "small_sample_exact", label: "A sample of 25 users is just as precise as 1,000 if chosen randomly" },
    ],
    correctOptionId: "sqrt_n_precision",
    hints: {
      framing: "Watch the Margin of Error bar shrink as n moves from 25 toward 1,000.",
      method: "Compare n = 100 (±9.6%) against n = 400 (±4.8%)—4x sample halves the error.",
      diagnostic: "Small samples swing wildly from luck; precision improves with √n, giving diminishing returns at huge sizes.",
    },
    debrief: {
      conceptName: "Standard Error & Confidence Intervals",
      plainExplanation:
        "Standard error measures how much sample estimates vary around the true population value. Because it scales with 1/√n, quadrupling sample size cuts uncertainty in half.",
      scenarioTakeaway:
        "Early pilot numbers from 25 users carry wide uncertainty bands—wait for adequate sample power before locking in strategy.",
      nextConceptLink:
        "Once you can quantify uncertainty bands, Level 8 tests whether an observed lift truly beats random noise.",
    },
  },
  {
    id: "level-8",
    levelNumber: 8,
    tier: 3,
    tierTitle: "Tier 3 · Uncertainty & Inference",
    title: "Signal vs. Noise Testing",
    contextPrompt:
      "An A/B test shows a +3% conversion lift. Slide the Observed Lift vs. Background Noise ratio to see when the signal clears the statistical noise threshold.",
    sliderLabel: "Signal-to-Noise Ratio",
    sliderMin: 0.5,
    sliderMax: 4.0,
    sliderStep: 0.5,
    sliderDefault: 1.0,
    metrics: { labelA: "Test Statistic (z)", labelB: "95% Threshold (1.96)", barMax: 4.5, unit: "σ" },
    options: [
      { id: "beat_noise_threshold", label: "A lift is credible only when the signal exceeds normal sampling variation" },
      { id: "any_positive_wins", label: "Any +0.1% positive difference proves the new variant is truly better" },
      { id: "noise_irrelevant", label: "Background variance does not affect how trustworthy an A/B lift is" },
    ],
    correctOptionId: "beat_noise_threshold",
    hints: {
      framing: "Compare the Test Statistic bar against the 1.96σ benchmark bar.",
      method: "Push Signal-to-Noise to 2.0σ or higher to see when random chance becomes unlikely (<5%).",
      diagnostic: "Stopping tests the moment a noisy metric ticks positive inflates false discoveries.",
    },
    debrief: {
      conceptName: "Hypothesis Testing & Statistical Significance",
      plainExplanation:
        "Hypothesis testing compares an observed effect against the noise expected if nothing actually changed. A large signal relative to standard error rules out mere luck.",
      scenarioTakeaway:
        "Shipping every tiny fluctuation wastes engineering effort; require signals to clear your noise threshold first.",
      nextConceptLink:
        "Every threshold forces a trade-off between two mistakes—Level 9 lets you tune false alarms against missed detections.",
    },
  },
  {
    id: "level-9",
    levelNumber: 9,
    tier: 4,
    tierTitle: "Tier 4 · Decision Rules & Trade-Offs",
    title: "False Alarms vs. Missed Detections",
    contextPrompt:
      "Tune your fraud alert cutoff score. Raising the cutoff reduces annoying false alarms on legitimate buyers, but lets more real fraud slip through.",
    sliderLabel: "Alert Cutoff Strictness",
    sliderMin: 10,
    sliderMax: 90,
    sliderDefault: 50,
    sliderStep: 10,
    metrics: { labelA: "False Alarm Rate (Type I)", labelB: "Missed Fraud Rate (Type II)", barMax: 100, unit: "%" },
    options: [
      { id: "error_tradeoff", label: "Tightening a threshold lowers false positives while increasing false negatives" },
      { id: "zero_both_errors", label: "Moving a single cutoff slider can eliminate both error types at once" },
      { id: "errors_equal_cost", label: "False alarms and missed detections always carry the exact same business cost" },
    ],
    correctOptionId: "error_tradeoff",
    hints: {
      framing: "Watch the two error bars move in opposite directions as you slide Strictness.",
      method: "Set Strictness to 80% vs 20% and compare which mistake dominates.",
      diagnostic: "With a fixed detector, lowering Type I error directly trades off against higher Type II error.",
    },
    debrief: {
      conceptName: "Type I vs. Type II Error Trade-Offs",
      plainExplanation:
        "Type I error flags a false alarm when nothing is wrong; Type II error misses a real issue. Adjusting decision thresholds balances those two competing risks.",
      scenarioTakeaway:
        "Set your cutoff based on relative cost: blocking good VIP orders hurts differently than letting a small chargeback pass.",
      nextConceptLink:
        "Pricing those error costs leads directly to Level 10—combining probabilities and payoffs into expected value decisions.",
    },
  },
  {
    id: "level-10",
    levelNumber: 10,
    tier: 4,
    tierTitle: "Tier 4 · Decision Rules & Trade-Offs",
    title: "Expected Value & Risk Under Uncertainty",
    contextPrompt:
      "Option B wins $200k if market demand is strong, or loses $60k if weak. Option A guarantees $50k. Slide the Strong Demand Probability to find where Option B beats Option A.",
    sliderLabel: "Strong Demand Probability",
    sliderMin: 10,
    sliderMax: 90,
    sliderDefault: 40,
    sliderStep: 10,
    metrics: { labelA: "Safe Option A EV", labelB: "Risky Option B EV", barMax: 180, unit: "$k" },
    options: [
      { id: "probability_weighted_ev", label: "Weight each outcome's payoff by its probability to compare expected value" },
      { id: "pick_max_upside", label: "Always pick the highest possible jackpot regardless of failure probability" },
      { id: "ignore_downside", label: "Losses do not matter when calculating expected value" },
    ],
    correctOptionId: "probability_weighted_ev",
    hints: {
      framing: "Option B's Expected Value = p × 200 − (1 − p) × 60.",
      method: "Slide probability past 42% (try 50% or 60%) to see Option B's EV overtake $50k.",
      diagnostic: "Good decisions weigh both upside magnitude and downside probability—plus whether you can survive the loss.",
    },
    debrief: {
      conceptName: "Expected Value & Decision Theory",
      plainExplanation:
        "Expected value multiplies every possible payoff by its probability and sums the results, turning uncertain bets into comparable long-run averages.",
      scenarioTakeaway:
        "At 50% demand probability, Option B yields $70k EV vs $50k safe—worth taking if your balance sheet can absorb a $60k downside.",
      nextConceptLink:
        "You have completed all 10 levels—from descriptive summaries to inference and expected value trade-offs!",
    },
  },
];

export function getScenarioByLevel(levelNumber: number): ScenarioData {
  return SCENARIOS.find((s) => s.levelNumber === levelNumber) ?? SCENARIOS[0];
}

export function computeLevelMetrics(
  scenario: ScenarioData,
  val: number
): { metricA: number; metricB: number } {
  switch (scenario.levelNumber) {
    case 1: {
      const series = [22, 24, 23, 25, 24, 26, val];
      const mean = series.reduce((a, b) => a + b, 0) / series.length;
      const sorted = [...series].sort((a, b) => a - b);
      const median = sorted[3];
      return { metricA: Number(mean.toFixed(1)), metricB: median };
    }
    case 2:
      return { metricA: 6, metricB: Number((6 + val * 1.8).toFixed(1)) };
    case 3:
      return { metricA: 4.5, metricB: Number((9 / val).toFixed(2)) };
    case 4:
      return { metricA: val * 1.8, metricB: Number((val * 1.5).toFixed(1)) };
    case 5: {
      const flowA = 0.6 * 75 + 0.4 * 35;
      const p = val / 100;
      const flowB = p * 80 + (1 - p) * 40;
      return { metricA: Number(flowA.toFixed(1)), metricB: Number(flowB.toFixed(1)) };
    }
    case 6: {
      const followUp = 95 - 20 * (val / 100);
      return { metricA: 95, metricB: Number(followUp.toFixed(1)) };
    }
    case 7: {
      const moe = (1.96 * Math.sqrt(0.6 * 0.4 / val)) * 100;
      return { metricA: 60, metricB: Number(moe.toFixed(1)) };
    }
    case 8:
      return { metricA: val, metricB: 1.96 };
    case 9:
      return { metricA: 100 - val, metricB: val };
    case 10: {
      const p = val / 100;
      const evB = Math.max(0, p * 200 - (1 - p) * 60);
      return { metricA: 50, metricB: Number(evB.toFixed(1)) };
    }
    default:
      return { metricA: 0, metricB: 0 };
  }
}
