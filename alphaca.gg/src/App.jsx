import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import './css/App.css';

import KoContent from './ko/Content'; // 한국어 Record 컴포넌트 import
import KoRecord from './ko/Record'; // 한국어 Record 컴포넌트 import
import KoSchedule from './ko/Schedule'; // 한국어 Schedule 컴포넌트 import
import KoOdd from './ko/Odd'; // 한국어 Odd 컴포넌트 import

import JaContent from './ja/Content'; // 한국어 Record 컴포넌트 import
import JaRecord from './ja/Record'; // 일본어 Record 컴포넌트 import
import JaSchedule from './ja/Schedule'; // 일본어 Schedule 컴포넌트 import
import JaOdd from './ja/Odd'; // 일본어 Odd 컴포넌트 import

import EnContent from './en/Content'; // 한국어 Record 컴포넌트 import
import EnRecord from './en/Record'; // 영어 Record 컴포넌트 import
import EnSchedule from './en/Schedule'; // 영어 Schedule 컴포넌트 import
import EnOdd from './en/Odd'; // 영어 Odd 컴포넌트 import

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="main-contents">
          <Routes>
            <Route path="/" element={<KoContent />} />
            <Route path="/ko/record" element={<KoRecord />} />
            <Route path="/ko/schedule" element={<KoSchedule />} />
            <Route path="/ko/odd" element={<KoOdd />} />

            <Route path="/ja" element={<JaContent />} />
            <Route path="/ja/record" element={<JaRecord />} />
            <Route path="/ja/schedule" element={<JaSchedule />} />
            <Route path="/ja/odd" element={<JaOdd />} />

            <Route path="/en" element={<EnContent />} />
            <Route path="/en/record" element={<EnRecord />} />
            <Route path="/en/schedule" element={<EnSchedule />} />
            <Route path="/en/odd" element={<EnOdd />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
