import React from 'react'
import { GapInputs } from '../../lib/types'

type Props = {
  value: GapInputs
  onChange: (v: GapInputs) => void
}

const numberInput = (label: string, value: number, onChange: (v: number) => void) => (
  <label style={{ display: 'block', marginBottom: 8 }}>
    <div style={{ fontSize: 12, color: '#333' }}>{label}</div>
    <input
      type="number"
      step="any"
      value={Number.isFinite(value) ? String(value) : ''}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ padding: 6, width: 240 }}
    />
  </label>
)

const InputsPanel: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2>Inputs</h2>
      {numberInput('Capacity (units)', value.capacity, (v) => onChange({ ...value, capacity: v }))}
      {numberInput('Current revenue', value.currentRevenue, (v) => onChange({ ...value, currentRevenue: v }))}
      {numberInput('Target revenue', value.targetRevenue, (v) => onChange({ ...value, targetRevenue: v }))}
    </div>
  )
}

export default InputsPanel
