import { createGlobalStyle } from "styled-components";
import { IconButton as MuiIconButton } from "@mui/material";
import styled, { css } from "styled-components";

export const lightTheme = {
  color: {
    background: "#f1f1f1",
    point: "#8041D9",
    icon: "#8041D9",
    text: "#000000", // 라이트모드에서의 텍스트 색상
  },
};

export const darkTheme = {
  color: {
    background: "#2C2D33",
    point: "#eaeaea",
    icon: "#eaeaea", // 아이콘의 색상 속성 추가
    text: "#FFFFFF", // 다크모드에서의 텍스트 색상
  },
};

// IconButton 최적화
const iconButtonStyles = css`
  color: ${({ theme }) => theme.color.icon};
  &:hover {
    background-color: ${({ theme }) => theme.color.background};
  }
`;

export const IconButton = styled(MuiIconButton)`
  ${iconButtonStyles}
`;

// GlobalStyle 최적화
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.point};
  }

  .MuiButton-IconButton .MuiSvgIcon-root {
    color: ${({ theme }) => theme.color.icon} !important;
  }

  .MuiButton-root {
    color: ${({ theme }) => theme.color.icon} !important;
  }

  .popup div {
    color: ${({ theme }) => theme.color.icon}; /* 글자색을 테마의 아이콘 색상으로 설정 */
  }

  .odd-container, #numberInput {
    color: ${({ theme }) => theme.color.text}; /* Odd.jsx의 글자색 설정 */
  }

  .schedule-container, .league-button {
    color: ${({ theme }) => theme.color.text}; /* Record.jsx의 글자색 설정 */
  }

  .match-table, .button-container{
    color: ${({ theme }) => theme.color.text}; /* Record.jsx의 글자색 설정 */
  }

`;