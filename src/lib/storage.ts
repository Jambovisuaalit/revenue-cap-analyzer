import { GapInputs } from './types'

const STORAGE_KEY = 'revenue-cap-analyzer.inputs.v1'

export function saveInputs(inputs: GapInputs): void {
  try {
    const raw = JSON.stringify(inputs)
    localStorage.setItem(STORAGE_KEY, raw)
  } catch (e) {
    // Swallow storage errors for a minimal deterministic implementation
    console.warn('Failed to save inputs', e)
  }
}

export function loadInputs(): GapInputs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<GapInputs>
    return {
      capacity: Number(parsed.capacity ?? 0),
      currentRevenue: Number(parsed.currentRevenue ?? 0),
      targetRevenue: Number(parsed.targetRevenue ?? 0),
    }
  } catch (e) {
    console.warn('Failed to load inputs', e)
    return null
  }
}
