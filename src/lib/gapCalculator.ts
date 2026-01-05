import { GapInputs, GapResult } from './types'

// Deterministic, simple gap calculation
export function calculateGap(inputs: GapInputs): GapResult {
  const capacity = Number.isFinite(inputs.capacity) ? inputs.capacity : 0
  const current = Number.isFinite(inputs.currentRevenue) ? inputs.currentRevenue : 0
  const target = Number.isFinite(inputs.targetRevenue) ? inputs.targetRevenue : 0

  const gap = target - current
  const gapPercent = target !== 0 ? (gap / Math.max(1, target)) : 0
  const capacityUtilization = capacity > 0 ? current / capacity : 0

  // Round to cents / 4 decimals for percents for deterministic output
  const roundMoney = (v: number) => Math.round(v * 100) / 100
  const roundPercent = (v: number) => Math.round(v * 10000) / 10000

  const result: GapResult = {
    gap: roundMoney(gap),
    gapPercent: roundPercent(gapPercent),
    capacityUtilization: roundPercent(capacityUtilization),
  }

  return result
}
