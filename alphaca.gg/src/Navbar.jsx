import React, { useState, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyle } from "./Theme";
import { Avatar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Nightlight,
  WbSunny,
  NotificationsOutlined,
} from "@mui/icons-material";
import "./Navbar.css";

const twitchLogoSrc =
  "https://www.pngplay.com/wp-content/uploads/12/Twitch-Logo-Transparent-Image.png";

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const toggleDarkMode = () => setDarkMode((prevDarkMode) => !prevDarkMode);
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  return (
    <div className="navbar">
      <div className="Header_logo">
        <Link to="/">
          <img src={twitchLogoSrc} alt="Logo" />
        </Link>
      </div>

      <div className="Header_followtext">
        <h4>국내축구</h4>
      </div>

      <div
        className="Header_findtext"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h4>해외축구</h4>
        {isHovering && (
          <div className="popup">
            <Link to="/schedule" style={{ textDecoration: "none" }}>
              <div>일정/결과</div>
            </Link>
            <Link to="/record" style={{ textDecoration: "none" }}>
              <div>기록/순위</div>
            </Link>
            <Link to="/odd" style={{ textDecoration: "none" }}>
              <div>베팅</div>
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
    </div>
  );
}
export default Navbar;
