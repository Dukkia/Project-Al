import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link import
import './Sidebar.css';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import VerticalAlignBottomSharpIcon from '@mui/icons-material/VerticalAlignBottomSharp';
import languageTexts from '../../utils/navbarTexts';
import { useLanguage } from '../../utils/LanguageContext'; // LanguageContext에서 useLanguage 가져오기

function Sidebar({ togglePopup }) {
  const { selectedLanguage, changeLanguage } = useLanguage(); // LanguageContext에서 선택된 언어와 언어 변경 함수 가져오기

  const getText = (key) => {
    return languageTexts[selectedLanguage][key] || languageTexts.ko[key];
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-menu">
          <IconButton color="primary" onClick={togglePopup}>
            <MenuIcon />
          </IconButton>
        </div>

        {/* 홈 버튼에 Link 컴포넌트 적용 */}
        <Link to={`/${selectedLanguage}`} className="sidebar-button">
          <span className="icon"><HomeIcon /></span>
          <span className="icon-text">{getText('home')}</span>
        </Link>
        
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
    </div>
  );
}

export default Sidebar;
