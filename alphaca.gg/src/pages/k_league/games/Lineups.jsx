import React from 'react';
import './Lineups.css';

function Lineups({ homeTeamName, awayTeamName, homeLineup, awayLineup, texts }) {
    const renderPlayer = (player, isHomeTeam) => (
        <div key={player.playerId} className={`player ${isHomeTeam ? 'home-team' : 'away-team'}`}>
            <div className="player-name">
                <div className="circle">
                    <div className="shirt-number">{player.shirtNumber}</div>
                </div>
                {player.matchName}
            </div>
        </div>
    );

    const renderFormation = (lineup, isHomeTeam) => {
        const positions = {
            GK: [], // Goalkeepers
            DF: [], // Defenders
            MF: [], // Midfielders
            FW: [], // Forwards (includes Attacking Midfielder and Striker)
            ST: [], // Strikers
        };

        // 분류된 포지션에 해당하는 선수 추가
        lineup.forEach(player => {
            if (player.position.includes('Goalkeeper')) {
                positions.GK.push(player);
            } else if (player.position.includes('Defender')) {
                positions.DF.push(player);
            } else if (player.position.includes('Wing Back') || player.position.includes('Defensive Midfielder')) {
                positions.MF.push(player);
            } else if (player.position.includes('Attacking Midfielder') || player.position.includes('Midfielder')) {
                positions.FW.push(player);
            } else if (player.position.includes('Striker')) {
                positions.ST.push(player);
            }
        });

        // 홈팀과 원정팀의 포지션 순서 정의
        const homePositionOrder = ['GK', 'DF', 'MF', 'FW', 'ST'];
        const awayPositionOrder = ['ST', 'FW', 'MF', 'DF', 'GK'];

        // 포지션 순서에 맞게 선수들을 출력
        const positionOrder = isHomeTeam ? homePositionOrder : awayPositionOrder;

        return (
            <div className={`formation ${isHomeTeam ? 'home-formation' : 'away-formation'}`}>
                {positionOrder.map(position => (
                    positions[position].length > 0 && (
                        <div key={position} className={`formation-row ${position.toLowerCase()}`}>
                            {positions[position].map(player => renderPlayer(player, isHomeTeam))}
                        </div>
                    )
                ))}
            </div>
        );
    };

    return (
        <div className="lineup-section">
            <h3 style={{ textAlign: 'center' }}>{homeTeamName}</h3> {/* 가운데 정렬 */}
            <div className="team-lineup">
                <div className="home-team-lineup">
                    {renderFormation(homeLineup, true)}
                </div>
                <div className="away-team-lineup">
                    {renderFormation(awayLineup, false)}
                </div>
            </div>
            <h3 style={{ textAlign: 'center' }}>{awayTeamName}</h3> {/* 가운데 정렬 */}
        </div >
    );
}

export default Lineups;
