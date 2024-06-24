import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import teamLogos from '../../utils/teamLogos';
import './GameData.css';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import languageTexts from '../../utils/languageTexts';
import Lineups from './games/Lineups';
import Messages from './games/Messages';
import History from './games/power/History';
import Battle from './games/power/Battle';
import Player from './games/power/Player';
import Power from './games/power/Power';
import { useLanguage } from '../../utils/LanguageContext';

function GameData() {
  const { id } = useParams();
  const { selectedLanguage } = useLanguage(); // Access selectedLanguage from LanguageContext

  const [gameData, setGameData] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [matchDate, setMatchDate] = useState(null);
  const [matchTime, setMatchTime] = useState(null);
  const [matchPlace, setMatchPlace] = useState(null);
  const [result, setResult] = useState({ home: 0, away: 0 });
  const [homeLineup, setHomeLineup] = useState([]);
  const [awayLineup, setAwayLineup] = useState([]);
  const [currentView, setCurrentView] = useState('details'); // State for current view
  const [formationUsed, setFormationUsed] = useState(null); // State for formationUsed

  useEffect(() => {
    const fetchGameData = async () => {
      let port;
      switch (selectedLanguage) {
        case 'ko':
          port = 8201;
          break;
        case 'ja':
          port = 8101;
          break;
        case 'en':
          port = 4401;
          break;
        default:
          port = 8201;
      }

      try {
        const response = await axios.get(`http://${import.meta.env.VITE_URL}:${port}/`);
        const game = response.data.find(game => game.ID === id);
        setGameData(game);
        const homeTeamData = game.Team.find(team => team.position === 'home');
        const awayTeamData = game.Team.find(team => team.position === 'away');
        setHomeTeam(homeTeamData);
        setAwayTeam(awayTeamData);
        setMatchDate(formatDate(game.Date));
        setMatchTime(formatTime(game.Time));
        setMatchPlace(game.Place);
        setResult(game.Result);

        // Set lineup data
        const homeLineupData = game.lineUp.find(lineup => lineup.contestantId === homeTeamData.id);
        const awayLineupData = game.lineUp.find(lineup => lineup.contestantId === awayTeamData.id);
        setHomeLineup(homeLineupData ? homeLineupData.player : []);
        setAwayLineup(awayLineupData ? awayLineupData.player : []);

        // Set formationUsed data
        setFormationUsed(game.formationUsed);

      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, [id, selectedLanguage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}.${day}`;
  };

  const formatTime = (timeString) => {
    const time = timeString.split(':');
    return `${time[0]}:${time[1]}`;
  };

  const texts = languageTexts[selectedLanguage]; // Get text content for the selected language

  const handleButtonClick = (buttonType) => {
    console.log(`${buttonType} button clicked`);
    setCurrentView(buttonType); // Update the current view state
  };

  return (
    <div>
      <h2>{texts.record}</h2> {/* Display 'record' text according to the selected language */}

      {gameData ? (
        <div>
          <div className="match-info">
            <div className="homeTeam-name">
              <span style={{ background: '#163379', padding: '2px', fontSize: '12px', borderRadius: '3px', paddingBottom: '2px' }}>{texts.home}</span> {homeTeam.name}
            </div>
            <img src={teamLogos[homeTeam.name]} alt={`${homeTeam.name} logo`} />
            <div className="score">{result.home}</div>

            <div className="date">
              <div style={{ background: '#294588', padding: '3px', fontSize: '12px', borderRadius: '10px', paddingRight: '12px', paddingLeft: '12px', marginBottom: '4px' }}>{texts.status.ended}</div>
              {matchDate} {matchTime}
            </div>

            <div className="score">{result.away}</div>
            <img src={teamLogos[awayTeam.name]} alt={`${awayTeam.name} logo`} />
            <div className="awayTeam-name">{awayTeam.name}</div>
          </div>

          <div className='place-info'>
            {matchPlace}
          </div>

          <div className="match-details">
            <div className="home-team-goals">
              <ul>
                {gameData.goal.filter(goal => goal.contestantId === homeTeam.id).map((goal, index) => (
                  <li key={index}>
                    {goal.scorerName} {goal.timeMin}' <SportsSoccerRoundedIcon style={{ fontSize: '15px', verticalAlign: 'middle', marginTop: '-2px', marginLeft: '4px' }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="away-team-goals">
              <ul>
                {gameData.goal.filter(goal => goal.contestantId === awayTeam.id).map((goal, index) => (
                  <li key={index}>
                    <SportsSoccerRoundedIcon style={{ fontSize: '15px', verticalAlign: 'middle', marginTop: '-2px', marginRight: '4px' }} /> {goal.scorerName} {goal.timeMin}'
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="games-button-container">
            <button onClick={() => handleButtonClick('전력')}>{texts.power}</button>
            <button onClick={() => handleButtonClick('라인업')}>{texts.lineup}</button>
            <button onClick={() => handleButtonClick('중계')}>{texts.relay_broadcast}</button>
            <button onClick={() => handleButtonClick('영상')}>{texts.video}</button>
            <button onClick={() => handleButtonClick('기록')}>{texts.record}</button>
          </div>

          {/* Include Power component */}
          {currentView === '전력' && (
            <>
              <History
                homeTeamName={homeTeam.name}
                awayTeamName={awayTeam.name}
                texts={texts}
              />
              <Battle
                homeTeamName={homeTeam.name}
                awayTeamName={awayTeam.name}
                texts={texts}
              />
              <Power
                homeTeamName={homeTeam.name}
                awayTeamName={awayTeam.name}
                texts={texts}
                gameId={gameData.ID}
              />
              <Player
                homeTeamName={homeTeam.name}
                awayTeamName={awayTeam.name}
                homeLineup={homeLineup}
                awayLineup={awayLineup}
                texts={texts}
              />
            </>
          )}

          {/* Include Lineups component */}
          {currentView === '라인업' && (
            <Lineups
              homeTeamName={homeTeam.name}
              awayTeamName={awayTeam.name}
              homeLineup={homeLineup}
              awayLineup={awayLineup}
              texts={texts}
              formationUsed={formationUsed}
            />
          )}

          {/* Include Messages component */}
          {currentView === '중계' && (
            <Messages
              gameData={gameData}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              texts={texts}
            />
          )}

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GameData;
