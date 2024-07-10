import React, { useState } from 'react';
import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { Nightlight, WbSunny, NotificationsOutlined, Search } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../utils/LanguageContext'; // LanguageContext에서 커스텀 훅 import
import './Topbar.css';

import Logo from './../../assets/images/MDS_Logo.png';

function Topbar({ toggleDarkMode, darkMode }) {
  const { selectedLanguage, changeLanguage } = useLanguage(); // LanguageContext에서 언어 상태와 변경 함수 가져오기

  const [searchQuery, setSearchQuery] = useState('');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageChange = (language) => {
    changeLanguage(language); // LanguageContext의 changeLanguage 함수 호출
    setIsLanguageMenuOpen(false); // 언어 변경 후 언어 메뉴 닫기
    setSearchQuery(''); // 검색 쿼리 초기화 (선택 언어에 따라 플레이스홀더가 변경되기 때문에)
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
        <Link to={'/:language'}>
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
            <div onClick={() => handleLanguageChange('ko')}>한국어</div>
            <div onClick={() => handleLanguageChange('ja')}>日本語</div>
            <div onClick={() => handleLanguageChange('en')}>English</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
