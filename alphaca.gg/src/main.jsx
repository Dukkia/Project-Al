import React from 'react';
import { createRoot } from 'react-dom/client'; // 올바른 위치에서 createRoot 가져오기
import App from './App';

createRoot(document.getElementById('root')).render( // createRoot 사용
  <React.StrictMode>
    <App />
  </React.StrictMode>
);