import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';

import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Sidepop from './components/sidebar/Sidepop';

import Content from './pages/Content';
import Record from './pages/Record';
import Schedule from './pages/Schedule';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const togglePopup = () => {
    setIsPopupOpen(prevIsPopupOpen => !prevIsPopupOpen);
  };

  return (
    <div>
      <BrowserRouter>
        <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLanguageChange={handleLanguageChange} />
        <Sidebar selectedLanguage={selectedLanguage} togglePopup={togglePopup} />

        {isPopupOpen && <Sidepop isOpen={isPopupOpen} togglePopup={togglePopup} selectedLanguage={selectedLanguage} />}

        <div className="main-contents">
          <Routes>
            <Route path="/" element={<Content />} /> {/* 메인 페이지로 사용 */}
            <Route path="/:language/record" element={<Record selectedLanguage={selectedLanguage} />} />
            <Route path="/:language/Schedule" element={<Schedule selectedLanguage={selectedLanguage} />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
