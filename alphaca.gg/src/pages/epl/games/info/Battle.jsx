import React, { useEffect, useState } from 'react';
import './Battle.css'; // 스타일을 위한 CSS 파일
import { useLanguage } from '../../../../utils/LanguageContext'; // Adjust the import path based on your project structure
import languageTexts from '../../../../utils/languageTexts'; // Adjust the import path based on your project structure

const Battle = ({ homeTeamName, awayTeamName, homeTeamId, awayTeamId }) => {
  const { selectedLanguage } = useLanguage(); // Access selectedLanguage from LanguageContext
  const texts = languageTexts[selectedLanguage]; // Get texts based on selected language

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    fetch(`http://${import.meta.env.VITE_URL}:2030`)
      .then(response => response.json())
      .then(data => {
        const recentMatches = data.previousMeetings.match.slice(0, 5);
        setMatches(recentMatches);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTeamName = (contestantId) => {
    if (contestantId === homeTeamId) {
      return homeTeamName;
    }
    if (contestantId === awayTeamId) {
      return awayTeamName;
    }
    return '';
  };

  return (
    <div className="battle-container">
      <div className="battle-info">
        {texts.recentMeetings}
        <div className="matches-grid">
          {matches.map((match, index) => (
            <div key={index} className="grid-row">
              <div className="grid-cell text-right">
                {getTeamName(match.contestants.homeContestantId)}
              </div>
              <div className="grid-cell text-right">{match.contestants.homeScore}</div>
              <div className="grid-cell text-center">
                {formatDate(match.date)}<br />{match.competitionCode}
              </div>
              <div className="grid-cell text-left">{match.contestants.awayScore}</div>
              <div className="grid-cell text-left">
                {getTeamName(match.contestants.awayContestantId)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Battle;
