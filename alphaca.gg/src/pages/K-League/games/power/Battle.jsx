import React from 'react';
import './Battle.css'; // 스타일을 위한 CSS 파일

const Battle = ({ homeTeamName, awayTeamName, texts }) => {
  return (
    <div className="battle-container">
      <h3>{texts.battle}</h3>
      <div className="battle-info">
        <p>{homeTeamName} - {awayTeamName} 최근 경기기록</p>
      </div>
    </div>
  );
};

export default Battle;
