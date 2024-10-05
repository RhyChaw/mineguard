import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from "./pages/dashboard";
import Health from './pages/Health'; // Import the Health component
import Air from './pages/Air'; // Import the Air component
import Soil from './pages/Soil'; // Import the Soil component
import Waste from './pages/Waste'; // Import the Waste component
import "./app.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health" element={<Health />} />
        <Route path="/air" element={<Air />} />
        <Route path="/soil" element={<Soil />} />
        <Route path="/waste" element={<Waste />} />
      </Routes>
    </Router>
  );
}

export default App;
