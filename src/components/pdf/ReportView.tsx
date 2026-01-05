import React from 'react'
import { GapInputs, GapResult } from '../../lib/types'
import { formatCurrency, formatPercent } from '../../lib/format'

type Props = {
  inputs: GapInputs
  result: GapResult
}

const ReportView: React.FC<Props> = ({ inputs, result }) => {
  return (
    <section style={{ border: '1px solid #eee', padding: 12, borderRadius: 6, maxWidth: 720 }}>
      <h2>Report</h2>
      <div style={{ marginBottom: 8 }}>
        <strong>Capacity:</strong> {inputs.capacity}
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Current revenue:</strong> {formatCurrency(inputs.currentRevenue)}
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Target revenue:</strong> {formatCurrency(inputs.targetRevenue)}
      </div>

      <hr />

      <div style={{ marginBottom: 8 }}>
        <strong>Gap:</strong> {formatCurrency(result.gap)}
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Gap percent:</strong> {formatPercent(result.gapPercent)}
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Capacity utilization:</strong> {formatPercent(result.capacityUtilization)}
      </div>
    </section>
  )
}

export default ReportView
