// Topbar.jsx

import React, { useState } from 'react';
import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { Nightlight, WbSunny, NotificationsOutlined, Search } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import './Topbar.css';

import Logo from './../../assets/images/Twitch-Logo.png';

function Topbar({ toggleDarkMode, darkMode, onLanguageChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setSearchQuery('');
    onLanguageChange(language); // 언어 변경 시 콜백 호출
  };

  const getPlaceholder = () => {
    switch (selectedLanguage) {
      case 'ko':
        return '검색';
      case 'ja':
        return '検索';
      case 'en':
        return 'Search';
      default:
        return '검색';
    }
  };

  return (
    <div className="topbar">
      <div className="Header_logo">
        <Link to={'/'}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="Header_search">
        <Paper component="form" className="searchInput">
          <Search />
          <InputBase
            placeholder={getPlaceholder()}
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </Paper>
        <button type="submit" aria-label="search" onClick={handleSearch}>
          <Search />
        </button>
      </div>

      <div className="Header_noticeicon">
        <IconButton color="primary">
          <NotificationsOutlined />
        </IconButton>
      </div>

      <div className="Header_ava">
        <Avatar />
      </div>

      <div className="Header_dark">
        <IconButton onClick={toggleDarkMode} color="primary">
          {darkMode ? <Nightlight /> : <WbSunny />}
        </IconButton>
      </div>

      <div className="Header_global">
        <IconButton color="primary" onClick={toggleLanguageMenu}>
          <LanguageIcon />
        </IconButton>
        {isLanguageMenuOpen && (
          <div className="language-popup">
            <div onClick={() => changeLanguage('ko')}>한국어</div>
            <div onClick={() => changeLanguage('ja')}>日本語</div>
            <div onClick={() => changeLanguage('en')}>English</div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Topbar;
