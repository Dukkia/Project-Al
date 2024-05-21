import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  color: {
    background: "#F1F1F1",
    point: "#1F1F1F"
  },
};

export const darkTheme = {
  color: {
    background: "#2C2D33",
    point: "#F1F1F1"
  },
};

// IconButton을 사용하지 않음

// GlobalStyle 최적화
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.point};
  }
`;
