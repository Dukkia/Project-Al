import React, { useState, useEffect } from 'react';
import './Sidepop.css'; // 팝업 메뉴의 스타일 파일을 불러옵니다.
import { IconButton } from '@mui/material'; // IconButton을 불러옵니다.
import MenuIcon from '@mui/icons-material/Menu'; // Menu 아이콘을 명시적으로 가져옵니다.
import Logo from './../../assets/images/Twitch-Logo.png';
import { Link } from 'react-router-dom'; // Link를 불러옵니다.

function Sidepop({ isOpen, togglePopup, selectedLanguage }) {
  const [showOverseasSubMenu, setShowOverseasSubMenu] = useState(false);

  // 해외축구 버튼 클릭 시 서브메뉴 표시 토글
  const handleOverseasClick = () => {
    setShowOverseasSubMenu(!showOverseasSubMenu);
  };

  // 홈 버튼 클릭 시 선택된 언어 코드를 콘솔에 출력하는 함수
  const handleHomeButtonClick = () => {
    console.log("Selected language:", selectedLanguage);
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
      domestic: '국내축구',
      overseas: '해외축구',
      schedule: '일정',
      ranking: '순위',
      betting: '베팅',
    },
    ja: {
      home: 'ホーム',
      domestic: '国内サッカー',
      overseas: '海外サッカー',
      schedule: 'スケジュール',
      ranking: 'ランキング',
      betting: 'ベッティング',
    },
    en: {
      home: 'Home',
      domestic: 'Domestic Football',
      overseas: 'Overseas Football',
      schedule: 'Schedule',
      ranking: 'Ranking',
      betting: 'Betting',
    },
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
        {/* 홈 버튼에 onClick 이벤트 추가 */}
        <button className="sidepop-button" onClick={handleHomeButtonClick}>
          <span>{getText('home')}</span>
        </button>
        <button className="sidepop-button">
          <span>{getText('domestic')}</span>
        </button>

        {/* 해외축구 버튼 */}
        <button className="sidepop-button" onClick={handleOverseasClick}>
          <span>{getText('overseas')}</span>
        </button>

        {/* 해외축구 서브메뉴 */}
        {showOverseasSubMenu && (
          <div className="sidepop-submenu">
            <button className="submenu-item">
              <span className="sub-text">{getText('schedule')}</span>
            </button>

            <button className="submenu-item">
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
