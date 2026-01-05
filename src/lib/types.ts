export type GapInputs = {
  capacity: number
  currentRevenue: number
  targetRevenue: number
}

export type GapResult = {
  gap: number
  gapPercent: number
  capacityUtilization: number
}
