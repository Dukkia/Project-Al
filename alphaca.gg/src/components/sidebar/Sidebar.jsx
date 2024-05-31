import React, { useState } from 'react';
import './Sidebar.css'; // 스타일 파일을 불러옵니다.
import { IconButton } from '@mui/material'; // IconButton을 불러옵니다.
import MenuIcon from '@mui/icons-material/Menu'; // Menu 아이콘을 명시적으로 가져옵니다.
import HomeIcon from '@mui/icons-material/Home'; // Home 아이콘을 명시적으로 가져옵니다.
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import VerticalAlignBottomSharpIcon from '@mui/icons-material/VerticalAlignBottomSharp';
import Sidepop from './Sidepop'; // Sidepopup 컴포넌트를 불러옵니다.

function Sidebar({ selectedLanguage }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // 언어에 따른 텍스트 설정 함수
  const getText = (key) => {
    switch (selectedLanguage) {
      case 'ko':
        return languageTexts.ko[key];
      case 'ja':
        return languageTexts.ja[key];
      case 'en':
        return languageTexts.en[key];
      default:
        return languageTexts.ko[key];
    }
  };

  const languageTexts = {
    ko: {
      home: '홈',
      subscriptions: '구독',
      videos: '나',
      downloads: '다운로드',
    },
    ja: {
      home: 'ホーム',
      subscriptions: '購読',
      videos: '私',
      downloads: 'ダウンロード'
    },
    en: {
      home: 'Home',
      subscriptions: 'Subscriptions',
      videos: 'Videos',
      downloads: 'Downloads',
    },
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-menu">
          <IconButton color="primary" onClick={togglePopup}>
            <MenuIcon />
          </IconButton>
        </div>

        <button className="sidebar-button">
          <span className="icon"><HomeIcon /></span>
          <span className="icon-text">{getText('home')}</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><SubscriptionsIcon /></span>
          <span className="icon-text">{getText('subscriptions')}</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><VideoLibraryOutlinedIcon /></span>
          <span className="icon-text">{getText('videos')}</span>
        </button>

        <button className="sidebar-button">
          <span className="icon"><VerticalAlignBottomSharpIcon /></span>
          <span className="icon-text">{getText('downloads')}</span>
        </button>
      </div>

      {isPopupOpen && <Sidepop isOpen={isPopupOpen} togglePopup={togglePopup} />}
    </div>
  );
}

export default Sidebar;
