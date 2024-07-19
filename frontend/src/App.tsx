import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/ApplicantPages/LoginPage"
import SignUp from './pages/ApplicantPages/SignupPage';
import CandidateProfile from './pages/ApplicantPages/CandidateProfile';
import RecruiterLogin from './pages/RecruiterPages/RecruiterLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/profile-creation' element={<CandidateProfile/>}/>
          <Route path='/recruiter-login' element={<RecruiterLogin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
