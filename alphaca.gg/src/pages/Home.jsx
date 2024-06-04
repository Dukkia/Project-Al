import React, { useState, useEffect } from 'react';
import './Home.css'; // 스타일 파일 임포트

function Home({ selectedLanguage }) {
  const [translatedHtml, setTranslatedHtml] = useState('');

  useEffect(() => {
    fetchTranslatedHtml();
  }, [selectedLanguage]); // selectedLanguage이 변경될 때마다 다시 실행됩니다.

  const fetchTranslatedHtml = async () => {
    try {
      let port;
      switch (selectedLanguage) {
        case 'en':
          port = 4400;
          break;
        case 'ja':
          port = 8100;
          break;
        case 'ko':
          port = 8200;
          break;
        default:
          port = 4400; // 기본값으로 영어 포트를 사용합니다.
      }
      const response = await fetch(`http://${import.meta.env.VITE_URL}:${port}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch translation');
      }
      const data = await response.text();
      setTranslatedHtml(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: translatedHtml }} />
  );
}

export default Home;
