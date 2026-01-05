import React from 'react'
import { GapInputs, GapResult } from '../../lib/types'

type Props = {
  inputs: GapInputs
  result: GapResult
  filename?: string
}

// Minimal deterministic "PDF" exporter: create a readable textual report and save as a .pdf file
// This is intentionally simple and auditable; for real PDF generation use a library such as pdf-lib.
const ExportPDFButton: React.FC<Props> = ({ inputs, result, filename = 'report.pdf' }) => {
  const handleExport = () => {
    const lines = [] as string[]
    lines.push('Revenue cap analyzer - report')
    lines.push('Generated: ' + new Date().toISOString())
    lines.push('')
    lines.push('Inputs:')
    lines.push(`  Capacity: ${inputs.capacity}`)
    lines.push(`  Current revenue: ${inputs.currentRevenue}`)
    lines.push(`  Target revenue: ${inputs.targetRevenue}`)
    lines.push('')
    lines.push('Results:')
    lines.push(`  Gap: ${result.gap}`)
    lines.push(`  Gap percent: ${result.gapPercent}`)
    lines.push(`  Capacity utilization: ${result.capacityUtilization}`)

    const content = lines.join('\n')
    const blob = new Blob([content], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ marginTop: 12 }}>
      <button onClick={handleExport} style={{ padding: '8px 12px' }}>
        Export report (PDF)
      </button>
    </div>
  )
}

export default ExportPDFButton
