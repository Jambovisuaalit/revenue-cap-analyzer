export type AuditQueryParams = {
  score?: string;
  target?: string;
  leads?: string;
  close?: string;
  deal?: string;
  margin?: string;
  jobsPerTech?: string;
};

export type AuditInput = {
  currentScore: number;
  targetScore: number;
  currentLeadsPerMonth: number;
  closeRate: number;
  avgDealValue: number;
  avgJobMarginPct: number;
  jobsPerTechnicianPerMonth: number;
};

export type GapResult = {
  currentDeals: number;
  projectedDeals: number;
  currentRevenue: number;
  projectedRevenue: number;
  revenueGap: {
    min: number;
    max: number;
  };
  compoundMultiplier: number;
  projectedCloseRate: number;
  maxCACPerDeal: number;
  maxMonthlyAdBudget: number;
  additionalTechniciansNeeded: number;
};

export type CompoundCurvePoint = {
  score: number;
  leads: number;
  closeRate: number;
  compoundIndex: number;
};
