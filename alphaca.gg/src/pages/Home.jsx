import React, { useState, useEffect } from 'react';
import './Home.css'; // Import style file
import { useLanguage } from '../utils/LanguageContext'; // Import useLanguage hook

function Home() {
  const { selectedLanguage } = useLanguage(); // Access selectedLanguage from context using custom hook
  const [translatedHtml, setTranslatedHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTranslatedHtml();
  }, [selectedLanguage]); // Fetch new content when selectedLanguage changes

  const fetchTranslatedHtml = async () => {
    setLoading(true);
    setError(null);

    try {
      let port;
      switch (selectedLanguage) {
        case 'en':
          port = 2044;
          break;
        case 'ja':
          port = 2081;
          break;
        case 'ko':
          port = 2082;
          break;
        default:
          port = 2082; // Default to English port
      }

      const response = await fetch(`http://${import.meta.env.VITE_URL}:${port}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch translation');
      }
      const data = await response.text();
      setTranslatedHtml(data);
    } catch (error) {
      console.error('Error fetching translated content:', error);
      setError('Failed to fetch translation. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="translated-content" dangerouslySetInnerHTML={{ __html: translatedHtml }} />
  );
}

export default Home;
