import React, { useEffect, useState } from 'react'
import InputsPanel from '../../components/gap/InputsPanel'
import ReportView from '../../components/pdf/ReportView'
import ExportPDFButton from '../../components/gap/ExportPDFButton'
import { GapInputs, GapResult } from '../../lib/types'
import { calculateGap } from '../../lib/gapCalculator'
import { validateInputs } from '../../lib/validate'
import { loadInputs, saveInputs } from '../../lib/storage'

const defaultInputs: GapInputs = {
  capacity: 1000,
  currentRevenue: 50000,
  targetRevenue: 75000,
}

const AuditResultsPage: React.FC = () => {
  const [inputs, setInputs] = useState<GapInputs>(() => loadInputs() ?? defaultInputs)
  const [result, setResult] = useState<GapResult>(() => calculateGap(inputs))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ok = validateInputs(inputs)
    setError(ok ? null : 'Please provide valid numeric input (non-negative)')
    if (ok) {
      const r = calculateGap(inputs)
      setResult(r)
      saveInputs(inputs)
    }
  }, [inputs])

  return (
    <section>
      <InputsPanel value={inputs} onChange={setInputs} />

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <ReportView inputs={inputs} result={result} />
          <ExportPDFButton inputs={inputs} result={result} filename="revenue-report.pdf" />
        </>
      )}
    </section>
  )
}

export default AuditResultsPage
