import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/LoginPage"
import SignUp from './pages/SignupPage';
import CandidateProfile from './pages/CandidateProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/profile-creation' element={<CandidateProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
