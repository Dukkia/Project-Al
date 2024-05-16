import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Record from './Record'; // Record 컴포넌트 import
import Schedule from './Schedule'; // Schedule 컴포넌트 import
import Odd from './Odd'; // Odd 컴포넌트 import
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="main-contents">
          <Routes>
            <Route path="/record" element={<Record />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/odd" element={<Odd />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
