import React, { useState, useEffect } from 'react';
import './Player.css';
import { useLanguage } from '../../../../utils/LanguageContext';
import languageTexts from '../../../../utils/languageTexts';

const Player = ({ homeTeamName, awayTeamName, homeLineup, awayLineup, texts }) => {
  const { selectedLanguage } = useLanguage(); // Accessing selectedLanguage from context
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000'); // API 엔드포인트에 따라 경로를 수정하세요.
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const findExpectedGoals = (playerId) => {
    if (!apiData) return "Loading...";

    const playerStats = apiData.liveData?.lineUp?.find(player => player.player.find(p => p.playerId === playerId));
    if (playerStats) {
      const stat = playerStats.player.find(p => p.playerId === playerId)?.stat.find(s => s.type === "expectedGoals");
      return stat ? parseFloat(stat.value).toFixed(4) : "";
    }
    return "";
  };

  const findExpectedGoalsConceded = (playerId) => {
    if (!apiData) return "Loading...";

    const playerStats = apiData.liveData?.lineUp?.find(player => player.player.find(p => p.playerId === playerId));
    if (playerStats) {
      const stat = playerStats.player.find(p => p.playerId === playerId)?.stat.find(s => s.type === "expectedGoalsConceded");
      return stat ? parseFloat(stat.value).toFixed(4) : "";
    }
    return "";
  };

  const filteredHomeLineup = homeLineup.filter(player => player.position !== 'Substitute');
  const filteredAwayLineup = awayLineup.filter(player => player.position !== 'Substitute');

  const getTotalExpectedGoals = (lineup) => {
    return lineup.reduce((total, player) => {
      const goals = parseFloat(findExpectedGoals(player.playerId));
      return isNaN(goals) ? total : total + goals;
    }, 0);
  };

  const getTotalExpectedGoalsConceded = (lineup) => {
    return lineup
      .filter(player => player.position === 'Goalkeeper')
      .reduce((total, player) => total + parseFloat(findExpectedGoalsConceded(player.playerId)), 0);
  };

  const homeTotalExpectedGoals = getTotalExpectedGoals(filteredHomeLineup);
  const awayTotalExpectedGoals = getTotalExpectedGoals(filteredAwayLineup);

  const homeTotalExpectedGoalsConceded = getTotalExpectedGoalsConceded(homeLineup);
  const awayTotalExpectedGoalsConceded = getTotalExpectedGoalsConceded(awayLineup);

  const getText = (key) => {
    return languageTexts[selectedLanguage][key] || key; // Default to key if translation not found
  };

  return (
    <div className='player-container'>
      <span style={{ fontSize: '18px', }}>{getText('playerExpect')}</span>
      <div className="player-table-container">
        <div className="team-table home-team-table">
          <div className="home-team-table-header">
            <div className="team-table-header">
              <div></div>
              <div>{getText('Name')}</div>
              <div>{getText('Expected_Goals')}</div>
              <div>{getText('Expected_Goals_Conceded')}</div>
            </div>
          </div>
          <ul className="team-table-body">
            {filteredHomeLineup.map(player => (
              <li key={player.playerId} className="team-table-row">
                <div>{player.shirtNumber}</div>
                <div>{player.matchName}</div>
                <div>{findExpectedGoals(player.playerId)}</div>
                <div>{player.position === 'Goalkeeper' ? findExpectedGoalsConceded(player.playerId) : ''}</div>
              </li>
            ))}
            <div className='home-team-table-row'>
              <li className="team-table-row total-row">
                <div></div>
                <div>{getText('Total')}</div>
                <div>{homeTotalExpectedGoals.toFixed(4)}</div>
                <div>{homeTotalExpectedGoalsConceded.toFixed(4)}</div>
              </li>
            </div>
          </ul>
        </div>

        <div className="team-table away-team-table">
          <div className="away-team-table-header">
            <div className="team-table-header">
              <div></div>
              <div>{getText('Name')}</div>
              <div>{getText('Expected_Goals')}</div>
              <div>{getText('Expected_Goals_Conceded')}</div>
            </div>
          </div>
          <ul className="team-table-body">
            {filteredAwayLineup.map(player => (
              <li key={player.playerId} className="team-table-row">
                <div>{player.shirtNumber}</div>
                <div>{player.matchName}</div>
                <div>{findExpectedGoals(player.playerId)}</div>
                <div>{player.position === 'Goalkeeper' ? findExpectedGoalsConceded(player.playerId) : ''}</div>
              </li>
            ))}
            <div className='away-team-table-row'>
              <li className="team-table-row total-row">
                <div></div>
                <div>{getText('Total')}</div>
                <div>{awayTotalExpectedGoals.toFixed(4)}</div>
                <div>{awayTotalExpectedGoalsConceded.toFixed(4)}</div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Player;
