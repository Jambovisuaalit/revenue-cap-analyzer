import { GapInputs } from './types'

export function validateInputs(inputs: GapInputs): boolean {
  if (!inputs) return false
  const { capacity, currentRevenue, targetRevenue } = inputs
  const allFinite = [capacity, currentRevenue, targetRevenue].every(Number.isFinite)
  if (!allFinite) return false
  // Negative numbers are not allowed in this simple model
  if (capacity < 0 || currentRevenue < 0 || targetRevenue < 0) return false
  return true
}
