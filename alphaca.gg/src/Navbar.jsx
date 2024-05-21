import React, { useState, useCallback, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyle } from "./Theme";
import { Avatar, IconButton } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from "react-router-dom";
import {
  Nightlight,
  WbSunny,
  NotificationsOutlined,
} from "@mui/icons-material";
import "./css/Navbar.css";

const twitchLogoSrc =
  "https://www.pngplay.com/wp-content/uploads/12/Twitch-Logo-Transparent-Image.png";

const translations = {
  ko: {
    home: "국내축구",
    abroad: "해외축구",
    schedule: "일정/결과",
    record: "기록/순위",
    betting: "베팅"
  },
  ja: {
    home: "Kリーグ",
    abroad: "海外サッカー",
    schedule: "スケジュール/結果",
    record: "記録/順位",
    betting: "ベッティング"
  },
  en: {
    home: "K-League",
    abroad: "Overseas Football",
    schedule: "Schedule/Results",
    record: "Records/Rankings",
    betting: "Betting"
  },
  zhcn: {
    home: "国内足球",
    abroad: "海外足球",
    schedule: "日程/结果",
    record: "记录/排名",
    betting: "投注"
  }
};

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ko');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevDarkMode) => !prevDarkMode);
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen((prev) => !prev);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false); // close the language menu after selection
  };

  return (
    <div className="navbar">
      <div className="Header_logo">
        <Link to="/">
          <img src={twitchLogoSrc} alt="Logo" />
        </Link>
      </div>

      <div className="Header_followtext">
        <h4>{translations[language].home}</h4>
      </div>

      <div
        className={`Header_findtext ${language === 'ja' ? 'language-ja' : language === 'en' ? 'language-en' : language === 'zhcn' ? 'language-zhcn' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h4>{translations[language].abroad}</h4>
        {isHovering && (
          <div className="popup">
            <Link to={`/${language}/schedule`} style={{ textDecoration: "none" }}>
              <div>{translations[language].schedule}</div>
            </Link>
            <Link to={`/${language}/record`} style={{ textDecoration: "none" }}>
              <div>{translations[language].record}</div>
            </Link>
            <Link to={`/${language}/odd`} style={{ textDecoration: "none" }}>
              <div>{translations[language].betting}</div>
            </Link>
          </div>
        )}
      </div>

      <div className="Header_noticeicon">
        <IconButton color="primary">
          <NotificationsOutlined />
        </IconButton>
      </div>

      <div className="Header_ava">
        <Avatar />
      </div>

      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <div className="Header_dark">
          <IconButton onClick={toggleDarkMode} color="primary">
            {darkMode ? <Nightlight /> : <WbSunny />}
          </IconButton>
        </div>
      </ThemeProvider>

      <div className="Header_global">
        <IconButton color="primary" onClick={toggleLanguageMenu}>
          <LanguageIcon />
        </IconButton>
        {isLanguageMenuOpen && (
          <div className="language-popup">
            <div onClick={() => changeLanguage('ko')}>한국어</div>
            <div onClick={() => changeLanguage('ja')}>日本語</div>
            <div onClick={() => changeLanguage('zhcn')}>简体中文</div>
            <div onClick={() => changeLanguage('en')}>English</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
