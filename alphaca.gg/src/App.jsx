// App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';

import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Sidepop from './components/sidebar/Sidepop';

import KoContent from './pages/ko/Content';
import KoRecord from './pages/ko/Record';
import KoSchedule from './pages/ko/Schedule';
import KoOdd from './pages/ko/Odd';

import JaContent from './pages/ja/Content';
import JaRecord from './pages/ja/Record';
import JaSchedule from './pages/ja/Schedule';
import JaOdd from './pages/ja/Odd';

import EnContent from './pages/en/Content';
import EnRecord from './pages/en/Record';
import EnSchedule from './pages/en/Schedule';
import EnOdd from './pages/en/Odd';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('ko'); // 기본값은 'ko'으로 설정

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // toggleDarkMode 함수 선언
  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // 선택된 언어 업데이트
  };

  return (
    <div>
      <BrowserRouter>
        {/* Topbar에 언어 변경 이벤트를 전달 */}
        <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLanguageChange={handleLanguageChange} />
        {/* Sidebar에 언어 정보를 전달 */}
        <Sidebar selectedLanguage={selectedLanguage} />

        {/* Sidepop에 언어 정보를 전달 */}
        <Sidepop togglePopup={() => {}} selectedLanguage={selectedLanguage} />

        <div className="main-contents">
          <Routes>
            {/* Routes for different languages */}
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
