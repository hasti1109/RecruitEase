import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Recruiter from './pages/Recruiter';
import Users from './pages/Users';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';

const App: React.FC = () => {
  return (
    <Router>
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/recruiters" element={<Recruiter />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </Router>
  );
};

export default App;
