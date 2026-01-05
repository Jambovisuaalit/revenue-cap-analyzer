import type { AuditInput, GapResult, CompoundCurvePoint } from "./types";

const safeDivide = (a: number, b: number) => (b === 0 ? 0 : a / b);

export function calculateGap(
  input: AuditInput
): { result: GapResult; curve: CompoundCurvePoint[] } {
  const scoreDelta = input.targetScore - input.currentScore;
  const growthFactor = Math.pow(scoreDelta / 50, 1.4);

  const leadMultiplier = 1 + Math.min(3, Math.max(0, growthFactor));
  const projectedLeads = input.currentLeadsPerMonth * leadMultiplier;

  const projectedCloseRate = Math.min(
    0.45,
    input.closeRate * (1 + growthFactor * 0.6)
  );

  const currentDeals = input.currentLeadsPerMonth * input.closeRate;
  const projectedDeals = projectedLeads * projectedCloseRate;

  const currentRevenue = currentDeals * input.avgDealValue;
  const projectedRevenue = projectedDeals * input.avgDealValue;

  const compoundMultiplier = safeDivide(
    projectedDeals,
    Math.max(1, currentDeals)
  );

  const revenueGap = {
    min: (projectedRevenue - currentRevenue) * 0.75,
    max: (projectedRevenue - currentRevenue) * 1.25,
  };

  const maxCACPerDeal =
    input.avgDealValue * input.avgJobMarginPct * 0.8;

  const maxMonthlyAdBudget = maxCACPerDeal * projectedDeals;

  const additionalTechniciansNeeded = Math.max(
    0,
    Math.ceil(
      safeDivide(
        projectedDeals - currentDeals,
        input.jobsPerTechnicianPerMonth
      )
    )
  );

  const curve: CompoundCurvePoint[] = [];
  for (let s = input.currentScore; s <= 90; s += 5) {
    const d = Math.pow((s - input.currentScore) / 50, 1.4);
    const lm = 1 + Math.min(3, Math.max(0, d));
    const cr = Math.min(0.45, input.closeRate * (1 + d * 0.6));

    curve.push({
      score: s,
      leads: Math.round(input.currentLeadsPerMonth * lm),
      closeRate: cr,
      compoundIndex: lm * cr,
    });
  }

  return {
    result: {
      currentDeals,
      projectedDeals,
      currentRevenue,
      projectedRevenue,
      revenueGap,
      compoundMultiplier,
      projectedCloseRate,
      maxCACPerDeal,
      maxMonthlyAdBudget,
      additionalTechniciansNeeded,
    },
    curve,
  };
}
