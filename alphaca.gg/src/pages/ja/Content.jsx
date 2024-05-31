import React, { useState, useEffect } from 'react';
import '../../assets/styles/Content.css'; // 스타일 파일 임포트

function Content() {
  const [translatedHtml, setTranslatedHtml] = useState('');

  useEffect(() => {
    fetchTranslatedHtml();
  }, []); // 페이지가 로드될 때 한 번만 실행됩니다.

  const fetchTranslatedHtml = async () => {
    try {
      const response = await fetch('http://localhost:8100/');
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

export default Content;
