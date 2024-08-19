import RecruiterSidebar from "../../components/RecruiterSidebar";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import JobsPage from "./JobsPage";
import CandidatesPage from "./CandidatesPage";

const HomePage = () => {
  return (
    <div className="flex h-screen p-0 m-0">
      <RecruiterSidebar />
      <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="applications" element={<CandidatesPage />} />
          <Route path="interviews" element={<CandidatesPage />} />
          <Route path="notifications" element={<CandidatesPage />} />
          <Route path="settings" element={<CandidatesPage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default HomePage
