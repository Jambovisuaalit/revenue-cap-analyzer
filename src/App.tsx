import React from 'react'
import AuditResultsPage from './pages/audit/results'

const App: React.FC = () => {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <h1>Revenue cap analyzer</h1>
      </header>
      <main style={{ padding: 16 }}>
        <AuditResultsPage />
      </main>
    </div>
  )
}

export default App
