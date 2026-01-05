export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return '—'
  // Keep deterministic formatting without relying on locale variations
  const sign = value < 0 ? '-' : ''
  const abs = Math.abs(Math.round(value * 100) / 100)
  const parts = String(abs.toFixed(2)).split('.')
  return `${sign}€${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${parts[1]}`
}

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '—'
  return `${(value * 100).toFixed(2)}%`
}
