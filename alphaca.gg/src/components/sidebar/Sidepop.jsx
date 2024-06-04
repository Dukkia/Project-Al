// Sidepop.jsx
import React, { useState } from 'react';
import './Sidepop.css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './../../assets/images/Twitch-Logo.png';
import languageTexts from '../../utils/navbarTexts';
import { useNavigate } from 'react-router-dom';

function Sidepop({ isOpen, togglePopup, selectedLanguage }) {
  const [showOverseasSubMenu, setShowOverseasSubMenu] = useState(false);
  const navigate = useNavigate();

  const handleOverseasClick = () => {
    setShowOverseasSubMenu(!showOverseasSubMenu);
  };

  const getText = (key) => {
    return languageTexts[selectedLanguage][key] || languageTexts.ko[key];
  };

  const handleHomeButtonClick = () => {
    navigate(`/${selectedLanguage}`);
    togglePopup(); // 팝업 닫기
  };

  const handleScheduleButtonClick = () => {
    navigate(`/${selectedLanguage}/schedule`);
    togglePopup(); // 팝업 닫기
  };

  const handleRankingButtonClick = () => {
    navigate(`/${selectedLanguage}/record`);
    togglePopup(); // 팝업 닫기
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={togglePopup}></div>

      <div className="sidepop-menu">
        <IconButton color="primary" onClick={togglePopup} className="menu-icon">
          <MenuIcon />
        </IconButton>

        <div className="sideHeader_logo">
          <img src={Logo} alt="Logo" />
        </div>
        <button className="sidepop-button" onClick={handleHomeButtonClick}>
          <span>{getText('home')}</span>
        </button>
        <button className="sidepop-button">
          <span>{getText('domestic')}</span>
        </button>

        <button className="sidepop-button" onClick={handleOverseasClick}>
          <span>{getText('overseas')}</span>
        </button>

        {showOverseasSubMenu && (
          <div className="sidepop-submenu">
            <button className="submenu-item" onClick={handleScheduleButtonClick}>
              <span className="sub-text">{getText('schedule')}</span>
            </button>
            <button className="submenu-item" onClick={handleRankingButtonClick}>
              <span className="sub-text">{getText('ranking')}</span>
            </button>
            <button className="submenu-item">
              <span className="sub-text">{getText('betting')}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidepop;
