import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/Record.css";
import { MoonLoader } from 'react-spinners';

function Record() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('http://localhost:4402/');
        const data = response.data;

        if (data && Array.isArray(data.stage) && data.stage.length > 0 && Array.isArray(data.stage[0].division) && data.stage[0].division.length > 0 && Array.isArray(data.stage[0].division[0].ranking)) {
          setStandings(data.stage[0].division[0].ranking);
          setLoading(false);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    fetchStandings();
  }, []);

  const teamLogos = {
    "Liverpool": "https://sports-phinf.pstatic.net/team/wfootball/default/9.png?type=f25_25",
    "Manchester City": "https://sports-phinf.pstatic.net/team/wfootball/default/11.png?type=f25_25",
    "Arsenal": "https://sports-phinf.pstatic.net/team/wfootball/default/1006.png?type=f25_25",
    "Aston Villa": "https://sports-phinf.pstatic.net/team/wfootball/default/2.png?type=f25_25",
    "Tottenham Hotspur": "https://sports-phinf.pstatic.net/team/wfootball/default/19.png?type=f25_25",
    "Manchester United": "https://sports-phinf.pstatic.net/team/wfootball/default/12.png?type=f25_25",
    "West Ham United": "https://sports-phinf.pstatic.net/team/wfootball/default/43.png?type=f25_25",
    "Newcastle United": "https://sports-phinf.pstatic.net/team/wfootball/default/31.png?type=f25_25",
    "Brighton & Hove Albion": "https://sports-phinf.pstatic.net/team/wfootball/default/6795.png?type=f25_25",
    "Wolverhampton Wanderers": "https://sports-phinf.pstatic.net/team/wfootball/default/44.png?type=f25_25",
    "Chelsea": "https://sports-phinf.pstatic.net/team/wfootball/default/4.png?type=f25_25",
    "Fulham": "https://sports-phinf.pstatic.net/team/wfootball/default/55.png?type=f25_25",
    "AFC Bournemouth": "https://sports-phinf.pstatic.net/team/wfootball/default/23.png?type=f25_25",
    "Crystal Palace": "https://sports-phinf.pstatic.net/team/wfootball/default/5.png?type=f25_25",
    "Brentford": "https://sports-phinf.pstatic.net/team/wfootball/default/48.png?type=f25_25",
    "Everton": "https://sports-phinf.pstatic.net/team/wfootball/default/8.png?type=f25_25",
    "Nottingham Forest": "https://sports-phinf.pstatic.net/team/wfootball/default/15.png?type=f25_25",
    "Luton Town": "https://sports-phinf.pstatic.net/team/wfootball/default/10.png?type=f25_25",
    "Burnley": "https://sports-phinf.pstatic.net/team/wfootball/default/70.png?type=f25_25",
    "Sheffield United": "https://sports-phinf.pstatic.net/team/wfootball/default/37.png?type=f25_25"
  };

  return (
    <div className="schedule-container">
      {loading ? (
        <div className="record-loading">
        <MoonLoader color={'#c98aff'} loading={loading} size={40} />
      </div>
      ) : (
        <>
          <div className="box-container">
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/epl_on.png" alt="프리미어리그 로고" className="league-logo" />
              <span>　Premier League</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/primera_on.png" alt="라리가 로고" className="league-logo" />
              <span>　La Liga</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/bundesliga_on.png" alt="분데스리가 로고" className="league-logo" />
              <span>　Bundesliga</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/seria_on.png" alt="세리에 A 로고" className="league-logo" />
              <span>　Serie A</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/ligue1_on.png" alt="리그 1 로고" className="league-logo" />
              <span>　League One</span>
            </button>
          </div>



          <h4>Team Rankings for the <span style={{ color: '#619DFF' }}>2023/24 Season</span></h4>
          <table className="record-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(team => (
                <tr key={team.contestantId}>
                  <td>{team.rank}</td>
                  <td className="team-logo">
                    <img src={teamLogos[team.contestantClubName]} alt="team logo" />
                    {team.contestantClubName}
                  </td>
                  <td>{team.matchesPlayed}</td>
                  <td>{team.matchesWon}</td>
                  <td>{team.matchesDrawn}</td>
                  <td>{team.matchesLost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goaldifference > 0 ? +team.goaldifference : team.goaldifference}</td>
                  <td><strong>{team.points}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5>🟦Champions League　 　🟧Europa League　 　🟩Europa Conference League　 　🟥Direct Relegation
</h5>
        </>
      )}
    </div>
  );
}

export default Record;
