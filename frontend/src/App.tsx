import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from "./pages/Login"
import SignUp from './pages/SignUp';
import CandidateProfile from './pages/CandidateProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/profile-creation' element={<CandidateProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
