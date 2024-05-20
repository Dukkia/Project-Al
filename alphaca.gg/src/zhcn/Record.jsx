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
        const response = await axios.get('http://localhost:8602/');
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
    "利物浦": "https://sports-phinf.pstatic.net/team/wfootball/default/9.png?type=f25_25",
    "曼城": "https://sports-phinf.pstatic.net/team/wfootball/default/11.png?type=f25_25",
    "阿森纳": "https://sports-phinf.pstatic.net/team/wfootball/default/1006.png?type=f25_25",
    "阿斯顿维拉": "https://sports-phinf.pstatic.net/team/wfootball/default/2.png?type=f25_25",
    "托特纳姆热刺": "https://sports-phinf.pstatic.net/team/wfootball/default/19.png?type=f25_25",
    "曼联": "https://sports-phinf.pstatic.net/team/wfootball/default/12.png?type=f25_25",
    "西汉姆联": "https://sports-phinf.pstatic.net/team/wfootball/default/43.png?type=f25_25",
    "纽卡斯尔联队": "https://sports-phinf.pstatic.net/team/wfootball/default/31.png?type=f25_25",
    "布莱顿和霍夫阿尔比恩": "https://sports-phinf.pstatic.net/team/wfootball/default/6795.png?type=f25_25",
    "伍尔弗汉普顿流浪者队": "https://sports-phinf.pstatic.net/team/wfootball/default/44.png?type=f25_25",
    "切尔西": "https://sports-phinf.pstatic.net/team/wfootball/default/4.png?type=f25_25",
    "富勒姆": "https://sports-phinf.pstatic.net/team/wfootball/default/55.png?type=f25_25",
    "伯恩茅斯": "https://sports-phinf.pstatic.net/team/wfootball/default/23.png?type=f25_25",
    "水晶宫": "https://sports-phinf.pstatic.net/team/wfootball/default/5.png?type=f25_25",
    "布伦特福德": "https://sports-phinf.pstatic.net/team/wfootball/default/48.png?type=f25_25",
    "埃弗顿": "https://sports-phinf.pstatic.net/team/wfootball/default/8.png?type=f25_25",
    "诺丁汉森林": "https://sports-phinf.pstatic.net/team/wfootball/default/15.png?type=f25_25",
    "卢顿镇": "https://sports-phinf.pstatic.net/team/wfootball/default/10.png?type=f25_25",
    "伯恩利": "https://sports-phinf.pstatic.net/team/wfootball/default/70.png?type=f25_25",
    "谢菲尔德联队": "https://sports-phinf.pstatic.net/team/wfootball/default/37.png?type=f25_25"
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
            <button className="league-button" style={{ fontSize: '0.8rem' }}>
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/epl_on.png" alt="프리미어리그 로고" className="league-logo" />
              <span>　英格兰足球超级联赛</span>
            </button>
            <button className="league-button" style={{ fontSize: '0.8rem' }}>
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/primera_on.png" alt="라리가 로고" className="league-logo" />
              <span>　西班牙足球甲级联赛</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/bundesliga_on.png" alt="분데스리가 로고" className="league-logo" />
              <span>　德甲</span>
            </button>
            <button className="league-button" style={{ fontSize: '0.8rem' }}>
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/seria_on.png" alt="세리에 A 로고" className="league-logo" />
              <span>　意大利足球甲级联赛</span>
            </button>
            <button className="league-button" style={{ fontSize: '0.8rem' }}>
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/ligue1_on.png" alt="리그 1 로고" className="league-logo" />
              <span>　法国足球甲级联赛</span>
            </button>
          </div>



          <h3><span style={{ color: '#619DFF' }}>2023/24赛季</span>球队排名</h3>
          <table className="record-table">
            <thead>
              <tr>
                <th>秩</th>
                <th>球队</th>
                <th>赛</th>
                <th>胜</th>
                <th>平</th>
                <th>负</th>
                <th>进球</th>
                <th>失球</th>
                <th>净胜球</th>
                <th>积分</th>
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
          <h5>🟦冠军联赛　 　🟧赛季欧洲联赛　 　🟩欧洲足联协会联赛　 　🟥直达降级</h5>
        </>
      )}
    </div>
  );
}

export default Record;
