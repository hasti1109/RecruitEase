import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/ApplicantPages/LoginPage"
import SignUp from './pages/ApplicantPages/SignupPage';
import CandidateProfile from './pages/ApplicantPages/ProfileCreation';
import RecruiterLogin from './pages/RecruiterPages/RecruiterLogin';
import HomePage from './pages/RecruiterPages/HomePage';
import ErrorPage from './pages/ErrorPage';
import  ApplicantHomePage from './pages/ApplicantPages/ApplicantHomePage';
import JobDetailsPage from './pages/ApplicantPages/JobDetailsPage';
import MyApplicationsPage from './pages/ApplicantPages/MyApplicationsPage';
import SavedJobsPage from './pages/ApplicantPages/SavedJobsPage';
import MyProfilePage from './pages/ApplicantPages/MyProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/profile-creation' element={<CandidateProfile/>}/>
          <Route path='/recruiter-login' element={<RecruiterLogin/>}/>
          <Route path='/home/*' element={<HomePage/>}/>
          <Route path='/user/*' element={<ApplicantHomePage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
