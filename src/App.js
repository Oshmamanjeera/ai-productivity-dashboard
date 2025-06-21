import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Notes from './components/Notes';
import ProductivityChart from './components/ProductivityChart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/productivity" element={<ProductivityChart />} />
      </Routes>
    </Router>
  );
}

export default App;
