import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import teamLogos from '../utils/teamLogos';
import './GoalData.css';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';

function GoalData() {
  const { id } = useParams();
  const [goalData, setGoalData] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [matchDate, setMatchDate] = useState(null);
  const [matchTime, setMatchTime] = useState(null);
  const [matchPlace, setMatchPlace] = useState(null);
  const [result, setResult] = useState({ home: 0, away: 0 });

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const response = await axios.get(`http://localhost:4401/`);
        const game = response.data.find(game => game.ID === id);
        setGoalData(game);
        setHomeTeam(game.Team.find(team => team.position === 'home'));
        setAwayTeam(game.Team.find(team => team.position === 'away'));
        setMatchDate(formatDate(game.Date));
        setMatchTime(formatTime(game.Time));
        setMatchPlace(game.Place);
        setResult(game.Result);
      } catch (error) {
        console.error('Error fetching goal data:', error);
      }
    };

    fetchGoalData();
  }, [id]);

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

  return (
    <div>
      <h2>Goal Data</h2>
      {goalData ? (
        <div>
          <div className="match-info">
            <div className="homeTeam-name"><span style={{
              background: '#163379', padding: '2px', fontSize: '12px', borderRadius: '3px 3px 3px 3px', paddingBottom: '2px'
            }}> 홈 </span> {homeTeam.name}</div>

            <img src={teamLogos[homeTeam.name]} alt={`${homeTeam.name} logo`} />
            <div className="score">{result.home}</div>

            <div className="date">
              <div style={{
                background: '#294588',
                padding: '3px',
                fontSize: '12px',
                borderRadius: '10px',
                paddingRight: '12px',
                paddingLeft: '12px',
                marginBottom: '4px', // 엔터 간격 조정
              }}>
                경기종료
              </div>
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
                {goalData.goal.filter(goal => goal.contestantId === homeTeam.id).map((goal, index) => (
                  <li key={index}>
                    {goal.scorerName} {goal.timeMin}' <SportsSoccerRoundedIcon style={{ fontSize: '15px', verticalAlign: 'middle', marginTop: '-2px', marginLeft: '4px' }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="away-team-goals">
              <ul>
                {goalData.goal.filter(goal => goal.contestantId === awayTeam.id).map((goal, index) => (
                  <li key={index}>
                    <SportsSoccerRoundedIcon style={{ fontSize: '15px', verticalAlign: 'middle', marginTop: '-2px', marginRight: '4px' }} /> {goal.scorerName} {goal.timeMin}'
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GoalData;
