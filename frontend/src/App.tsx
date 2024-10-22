import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/ApplicantPages/LoginPage"
import SignUp from './pages/ApplicantPages/SignupPage';
import CandidateProfile from './pages/ApplicantPages/ProfileCreation';
import RecruiterLogin from './pages/RecruiterPages/RecruiterLogin';
import HomePage from './pages/RecruiterPages/HomePage';
import ErrorPage from './pages/ErrorPage';
import  ApplicantHomePage from './pages/ApplicantPages/ApplicantHomePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile-creation" element={<CandidateProfile />} />
          <Route path="/recruiter-login" element={<RecruiterLogin />} />
          <Route path="/home/*" element={<ProtectedRoute element={<HomePage />} role="recruiter" />} />
          <Route path="/user/*" element={<ProtectedRoute element={<ApplicantHomePage />} role="applicant" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
