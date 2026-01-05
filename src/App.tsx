import { Routes, Route, Navigate } from "react-router-dom";
import AuditResultsPage from "./pages/audit/results";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/audit/results" replace />} />
      <Route path="/audit/results" element={<AuditResultsPage />} />
    </Routes>
  );
}
