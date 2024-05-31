import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/styles/Record.css";
import { MoonLoader } from 'react-spinners';

function Record() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get('http://localhost:8102/');
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
    "リバプール": "https://sports-phinf.pstatic.net/team/wfootball/default/9.png?type=f25_25",
    "マンチェスター·シティ": "https://sports-phinf.pstatic.net/team/wfootball/default/11.png?type=f25_25",
    "アーセナル": "https://sports-phinf.pstatic.net/team/wfootball/default/1006.png?type=f25_25",
    "アストン·ヴィラ": "https://sports-phinf.pstatic.net/team/wfootball/default/2.png?type=f25_25",
    "トッテナム·ホットスパー": "https://sports-phinf.pstatic.net/team/wfootball/default/19.png?type=f25_25",
    "マンチェスター·ユナイテッド": "https://sports-phinf.pstatic.net/team/wfootball/default/12.png?type=f25_25",
    "ウェストハム·ユナイテッド": "https://sports-phinf.pstatic.net/team/wfootball/default/43.png?type=f25_25",
    "ニューカッスル·ユナイテッド": "https://sports-phinf.pstatic.net/team/wfootball/default/31.png?type=f25_25",
    "ブライトン·アンド·ホーヴ·アルビオン": "https://sports-phinf.pstatic.net/team/wfootball/default/6795.png?type=f25_25",
    "ウルヴァーハンプトン·ワンダラーズ": "https://sports-phinf.pstatic.net/team/wfootball/default/44.png?type=f25_25",
    "チェルシー": "https://sports-phinf.pstatic.net/team/wfootball/default/4.png?type=f25_25",
    "フラム": "https://sports-phinf.pstatic.net/team/wfootball/default/55.png?type=f25_25",
    "AFCボーンマス": "https://sports-phinf.pstatic.net/team/wfootball/default/23.png?type=f25_25",
    "クリスタルパレス": "https://sports-phinf.pstatic.net/team/wfootball/default/5.png?type=f25_25",
    "ブレントフォード": "https://sports-phinf.pstatic.net/team/wfootball/default/48.png?type=f25_25",
    "エバートン": "https://sports-phinf.pstatic.net/team/wfootball/default/8.png?type=f25_25",
    "ノッティンガム·フォレスト": "https://sports-phinf.pstatic.net/team/wfootball/default/15.png?type=f25_25",
    "ルートン町": "https://sports-phinf.pstatic.net/team/wfootball/default/10.png?type=f25_25",
    "バーンリー": "https://sports-phinf.pstatic.net/team/wfootball/default/70.png?type=f25_25",
    "シェフィールド·ユナイテッド": "https://sports-phinf.pstatic.net/team/wfootball/default/37.png?type=f25_25"
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
              <span>　プレミアリーグ</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/primera_on.png" alt="라리가 로고" className="league-logo" />
              <span>　ラリガ</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/bundesliga_on.png" alt="분데스리가 로고" className="league-logo" />
              <span>　ブンデスリガ</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/seria_on.png" alt="세리에 A 로고" className="league-logo" />
              <span>　セリエA</span>
            </button>
            <button className="league-button">
              <img src="https://imgsports.pstatic.net/images/2020/pc/common/league/ligue1_on.png" alt="리그 1 로고" className="league-logo" />
              <span>　リーグ1</span>
            </button>
          </div>



          <h4><span style={{ color: '#619DFF' }}>2023/24シーズン</span>のチーム順位</h4>
          <table className="record-table">
            <thead>
              <tr>
                <th>順位</th>
                <th>チーム名</th>
                <th>試合数</th>
                <th>勝数</th>
                <th>引分数</th>
                <th>敗数</th>
                <th>得点</th>
                <th>失点</th>
                <th>得失点差</th>
                <th>勝点</th>
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
          <h5>🟦CL出場圏内　 　🟧EL出場圏内　 　🟩ECL出場圏内　 　🟥自動降格圏内</h5>
        </>
      )}
    </div>
  );
}

export default Record;
