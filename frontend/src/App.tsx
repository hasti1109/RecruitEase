import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/ApplicantPages/LoginPage"
import SignUp from './pages/ApplicantPages/SignupPage';
import CandidateProfile from './pages/ApplicantPages/CandidateProfile';
import RecruiterLogin from './pages/RecruiterPages/RecruiterLogin';
import HomePage from './pages/RecruiterPages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/profile-creation' element={<CandidateProfile/>}/>
          <Route path='/recruiter-login' element={<RecruiterLogin/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
