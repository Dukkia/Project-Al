import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Record.css";
import { MoonLoader } from 'react-spinners';

function Record() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('http://localhost:3202/');
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
    "리버풀": "https://sports-phinf.pstatic.net/team/wfootball/default/9.png?type=f25_25",
    "맨체스터 시티": "https://sports-phinf.pstatic.net/team/wfootball/default/11.png?type=f25_25",
    "아스날": "https://sports-phinf.pstatic.net/team/wfootball/default/1006.png?type=f25_25",
    "애스턴 빌라": "https://sports-phinf.pstatic.net/team/wfootball/default/2.png?type=f25_25",
    "토트넘 홋스퍼": "https://sports-phinf.pstatic.net/team/wfootball/default/19.png?type=f25_25",
    "맨체스터 유나이티드": "https://sports-phinf.pstatic.net/team/wfootball/default/12.png?type=f25_25",
    "웨스트햄 유나이티드": "https://sports-phinf.pstatic.net/team/wfootball/default/43.png?type=f25_25",
    "뉴캐슬 유나이티드": "https://sports-phinf.pstatic.net/team/wfootball/default/31.png?type=f25_25",
    "브라이튼 앤 호브 앨비언": "https://sports-phinf.pstatic.net/team/wfootball/default/6795.png?type=f25_25",
    "울버햄튼 원더러스": "https://sports-phinf.pstatic.net/team/wfootball/default/44.png?type=f25_25",
    "첼시": "https://sports-phinf.pstatic.net/team/wfootball/default/4.png?type=f25_25",
    "풀럼": "https://sports-phinf.pstatic.net/team/wfootball/default/55.png?type=f25_25",
    "AFC 본머스": "https://sports-phinf.pstatic.net/team/wfootball/default/23.png?type=f25_25",
    "크리스탈 팰리스": "https://sports-phinf.pstatic.net/team/wfootball/default/5.png?type=f25_25",
    "브렌트포드": "https://sports-phinf.pstatic.net/team/wfootball/default/48.png?type=f25_25",
    "에버턴": "https://sports-phinf.pstatic.net/team/wfootball/default/8.png?type=f25_25",
    "노팅엄 포레스트": "https://sports-phinf.pstatic.net/team/wfootball/default/15.png?type=f25_25",
    "루턴 타운": "https://sports-phinf.pstatic.net/team/wfootball/default/10.png?type=f25_25",
    "번리": "https://sports-phinf.pstatic.net/team/wfootball/default/70.png?type=f25_25",
    "셰필드 유나이티드": "https://sports-phinf.pstatic.net/team/wfootball/default/37.png?type=f25_25"
  };

  return (
    <div className="schedule-container">
      {loading ? (
        <div className="record-loading">
        <MoonLoader color={'white'} loading={loading} size={40} />
      </div>
      ) : (
        <>
          <div className="button-container">
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/epl_on.png" alt="프리미어리그 로고" className="league-logo" />
              <span>　프리미어리그</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/primera_on.png" alt="라리가 로고" className="league-logo" />
              <span>　라리가</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/bundesliga_on.png" alt="분데스리가 로고" className="league-logo" />
              <span>　분데스리가</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/seria_on.png" alt="세리에 A 로고" className="league-logo" />
              <span>　세리에 A</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/ligue1_on.png" alt="리그 1 로고" className="league-logo" />
              <span>　리그 1</span>
            </button>
          </div>



          <h3><span style={{ color: '#619DFF' }}>2023/24 시즌</span> 팀 순위</h3>
          <table className="record-table">
            <thead>
              <tr>
                <th>순위</th>
                <th>팀</th>
                <th>경기</th>
                <th>승</th>
                <th>무</th>
                <th>패</th>
                <th>득점</th>
                <th>실점</th>
                <th>득실차</th>
                <th>승점</th>
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
          <h5>🟦챔피언스 리그　 　🟧유로파 리그　  　🟥강등 직행</h5>
        </>
      )}
    </div>
  );
}

export default Record;
