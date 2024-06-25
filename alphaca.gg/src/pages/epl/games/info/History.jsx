import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css'; // 스타일을 위한 CSS 파일
import { useLanguage } from '../../../../utils/LanguageContext'; // 언어 설정을 위한 컨텍스트 가져오기
import languageTexts from '../../../../utils/languageTexts'; // 언어 텍스트 객체 가져오기

function History({ homeTeamName, awayTeamName }) {
    const { selectedLanguage } = useLanguage(); // 언어 설정 컨텍스트에서 선택된 언어 가져오기
    const [competitionName, setCompetitionName] = useState('');
    const [matchingTeams, setMatchingTeams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let port;
            switch (selectedLanguage) {
                case 'ko':
                    port = 8202;
                    break;
                case 'ja':
                    port = 8102;
                    break;
                case 'en':
                default:
                    port = 4402;
                    break;
            }

            try {
                const response = await axios.get(`http://${import.meta.env.VITE_URL}:${port}`);
                const data = response.data; // response.json() 대신 response.data 사용
                setCompetitionName(data.competition.name);

                // 매치되는 팀과 그들의 정보 추출
                const rankings = data.stage[0]?.division[0]?.ranking || [];
                const filteredTeams = rankings.filter(
                    ranking =>
                        ranking.contestantClubName === homeTeamName ||
                        ranking.contestantClubName === awayTeamName
                );

                // 홈팀이 먼저 오도록 정렬
                filteredTeams.sort((a, b) => {
                    if (a.contestantClubName === homeTeamName) return -1;
                    if (b.contestantClubName === homeTeamName) return 1;
                    return 0;
                });

                setMatchingTeams(filteredTeams);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };

        fetchData();
    }, [homeTeamName, awayTeamName, selectedLanguage]);

    const getText = (key) => {
        const keys = key.split('.');
        let result = languageTexts[selectedLanguage];
        keys.forEach(k => {
            result = result ? result[k] : key;
        });
        return result || key; // 언어 설정에 따라 텍스트 반환
    };

    const renderLastSix = (results) => {
        const translations = {
            W: getText('matchResults.W'),
            L: getText('matchResults.L'),
            D: getText('matchResults.D')
        };

        const classNames = {
            W: 'win',
            L: 'lose',
            D: 'draw'
        };

        return results.split('').map((result, index) => (
            <span key={index} className={`result-box ${classNames[result]}`}>
                {translations[result] || result}
            </span>
        ));
    };

    return (
        <div className="power-info">
            {matchingTeams.length === 2 && (
                <div className="teams-container">
                    {/* 팀 이름과 통계를 표현하는 div */}
                    <div className="team-stats">
                        <div className="team-info">
                            <div className="home-team">{homeTeamName}<br />
                                <span style={{ color: '#5F9FDE' }}>{matchingTeams[0].rank}{getText('tier')} · </span>
                                <span style={{ color: '#919192', fontWeight: 'lighter', fontSize: '15px' }}>{matchingTeams[0].matchesWon}{getText('matchResults.W')} {matchingTeams[0].matchesDrawn}{getText('matchResults.D')} {matchingTeams[0].matchesLost}{getText('matchResults.L')}</span>
                            </div>
                            <div className="vs-text">vs</div>
                            <div className="away-team">{awayTeamName}<br />
                                <span style={{ color: '#5F9FDE' }}>{matchingTeams[1].rank}{getText('tier')} · </span>
                                <span style={{ color: '#919192', fontWeight: 'lighter', fontSize: '15px' }}>{matchingTeams[1].matchesWon}{getText('matchResults.W')} {matchingTeams[1].matchesDrawn}{getText('matchResults.D')} {matchingTeams[1].matchesLost}{getText('matchResults.L')}</span>
                            </div>
                        </div>

                        <div className="team-info">
                            <div className="home-team">{renderLastSix(matchingTeams[0].lastSix)}</div>
                            <div>{getText('recentMatches')}</div>
                            <div className="away-team">{renderLastSix(matchingTeams[1].lastSix)}</div>
                        </div>
                        <div className="team-info">
                            <div className="home-team">{(matchingTeams[0].goalsFor / matchingTeams[0].matchesPlayed).toFixed(2)}</div>
                            <div style={{ color: '#919192' }}>{getText('averageGoals')}</div>
                            <div className="away-team">{(matchingTeams[1].goalsFor / matchingTeams[1].matchesPlayed).toFixed(2)}</div>
                        </div>
                        <div className="team-info">
                            <div className="home-team">{(matchingTeams[0].goalsAgainst / matchingTeams[0].matchesPlayed).toFixed(2)}</div>
                            <div style={{ color: '#919192' }}>{getText('averageConceded')}</div>
                            <div className="away-team">{(matchingTeams[1].goalsAgainst / matchingTeams[1].matchesPlayed).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default History;
