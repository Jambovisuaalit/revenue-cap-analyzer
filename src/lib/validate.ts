import type { AuditQueryParams, AuditInput } from "./types";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const toNumber = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export function validateAuditInput(raw: AuditQueryParams): AuditInput {
  const currentScore = clamp(toNumber(raw.score, 40), 0, 90);
  const targetScore = clamp(toNumber(raw.target, 90), currentScore, 90);

  const currentLeadsPerMonth = clamp(toNumber(raw.leads, 10), 0, 10000);
  const closeRate = clamp(toNumber(raw.close, 0.2), 0, 0.45);
  const avgDealValue = clamp(toNumber(raw.deal, 3000), 100, 100000);
  const avgJobMarginPct = clamp(toNumber(raw.margin, 0.35), 0, 0.6);
  const jobsPerTechnicianPerMonth = clamp(
    toNumber(raw.jobsPerTech, 25),
    1,
    200
  );

  return {
    currentScore,
    targetScore,
    currentLeadsPerMonth,
    closeRate,
    avgDealValue,
    avgJobMarginPct,
    jobsPerTechnicianPerMonth,
  };
}
