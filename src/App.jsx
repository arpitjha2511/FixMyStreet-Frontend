import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import PotholeDetail from './components/PotholeDetail';
import UserPotholes from './components/UserPotholes';

import './CSS/temp.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/pothole/:id" element={<PotholeDetail />} />
          <Route path="/user/:searchTerm" element={<UserPotholes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
