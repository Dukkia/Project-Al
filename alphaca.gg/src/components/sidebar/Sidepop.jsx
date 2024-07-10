import React, { useState, useEffect } from 'react';
import './Sidepop.css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './../../assets/images/MDS_Logo.png';
import languageTexts from '../../utils/navbarTexts';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../utils/LanguageContext';

function Sidepop({ isOpen, togglePopup }) {
  const [showOverseasSubMenu, setShowOverseasSubMenu] = useState(false);
  const [showDomesticSubMenu, setShowDomesticSubMenu] = useState(false);
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();

  const handleOverseasClick = () => {
    setShowOverseasSubMenu(!showOverseasSubMenu);
  };

  const handleDomesticClick = () => {
    setShowDomesticSubMenu(!showDomesticSubMenu);
  };

  const getText = (key) => {
    return languageTexts[selectedLanguage][key] || languageTexts.ko[key];
  };

  const handleHomeButtonClick = () => {
    navigate(`/${selectedLanguage}`);
    togglePopup();
  };

  const handleScheduleButtonClick = () => {
    navigate(`/${selectedLanguage}/schedule`);
    togglePopup();
  };

  const handleRankingButtonClick = () => {
    navigate(`/${selectedLanguage}/record`);
    togglePopup();
  };

  const handleKScheduleButtonClick = () => {
    navigate(`/${selectedLanguage}/kschedule`);
    togglePopup();
  };

  const handleKRankingButtonClick = () => {
    navigate(`/${selectedLanguage}/krecord`);
    togglePopup();
  };

  useEffect(() => {
    const sidepopMenu = document.querySelector('.sidepop-menu');
    const preventScroll = (e) => e.preventDefault();

    if (sidepopMenu) {
      sidepopMenu.addEventListener('wheel', preventScroll);
    }

    return () => {
      if (sidepopMenu) {
        sidepopMenu.removeEventListener('wheel', preventScroll);
      }
    };
  }, [isOpen]);

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
        <button className="sidepop-button" onClick={handleDomesticClick}>
          <span>{getText('domestic')}</span>
        </button>

        {showDomesticSubMenu && (
          <div className="sidepop-submenu">
            <button className="submenu-item" onClick={handleKScheduleButtonClick}>
              <span className="sub-text">{getText('schedule')}</span>
            </button>
            <button className="submenu-item" onClick={handleKRankingButtonClick}>
              <span className="sub-text">{getText('ranking')}</span>
            </button>
            <button className="submenu-item">
              <span className="sub-text">{getText('betting')}</span>
            </button>
          </div>
        )}

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
