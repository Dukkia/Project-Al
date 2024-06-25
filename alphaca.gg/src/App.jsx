// App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';
import { LanguageProvider } from './utils/LanguageContext';

import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Sidepop from './components/sidebar/Sidepop';

import Home from './pages/Home';
import Record from '../src/pages/epl/Record';
import Schedule from './pages/epl/Schedule';
import GameData from './pages/epl/GameData';

import KRecord from './pages/k_league/Record';
import KSchedule from './pages/k_league/Schedule';
import KGameData from './pages/k_league/GameData';

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
    <LanguageProvider>
      <div>
        <BrowserRouter>
          <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLanguageChange={handleLanguageChange} />
          <Sidebar selectedLanguage={selectedLanguage} togglePopup={togglePopup} />

          {isPopupOpen && <Sidepop isOpen={isPopupOpen} togglePopup={togglePopup} selectedLanguage={selectedLanguage} />}

          <div className="main-contents">
            <Routes>
              <Route path="/:language" element={<Home />} />
              <Route path="/:language/record" element={<Record />} />
              <Route path="/:language/schedule" element={<Schedule />} />
              <Route path="/:language/goal/:id" element={<GameData />} />

              <Route path="/:language/krecord" element={<KRecord />} />
              <Route path="/:language/kschedule" element={<KSchedule />} />
              <Route path="/:language/kgoal/:id" element={<KGameData />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;
