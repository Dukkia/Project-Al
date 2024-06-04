// Record.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import languageTexts from '../utils/languageTexts';
import teamLogos from '../utils/teamLogos';
import leagueLogos from '../utils/leagueLogos';
import "./Record.css";

function Record({ selectedLanguage }) {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStandings = async () => {
            let port;
            switch (selectedLanguage) {
                case 'ko':
                    port = 8202;
                    break;
                case 'ja':
                    port = 8102;
                    break;
                case 'en':
                    port = 4402;
                    break;
                default:
                    port = 8202;
            }

            try {
                const response = await axios.get(`http://${import.meta.env.VITE_URL}:${port}/`);
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
    }, [selectedLanguage]);

    const texts = languageTexts[selectedLanguage] || {};

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
                            <img src={leagueLogos['프리미어리그']} alt="프리미어리그 로고" className="league-logo" />
                            <span>　{texts.premierLeague}</span>
                        </button>
                        <button className="league-button">
                            <img src={leagueLogos['라리가']} alt="라리가 로고" className="league-logo" />
                            <span>　{texts.laLiga}</span>
                        </button>
                        <button className="league-button">
                            <img src={leagueLogos['분데스리가']} alt="분데스리가 로고" className="league-logo" />
                            <span>　{texts.bundesliga}</span>
                        </button>

                        <button className="league-button">
                            <img src={leagueLogos['세리에 A']} alt="세리에 A 로고" className="league-logo" />
                            <span>　{texts.serieA}</span>
                        </button>
                        <button className="league-button">
                            <img src={leagueLogos['리그 1']} alt="리그 1 로고" className="league-logo" />
                            <span>　{texts.ligue1}</span>
                        </button>
                    </div>

                    <h4><span style={{ color: '#619DFF' }}>{texts.season}</span></h4>
                    <table className="record-table">
                        <thead>
                            <tr>
                                <th>{texts.rank}</th>
                                <th>{texts.team}</th>
                                <th>{texts.matches}</th>
                                <th>{texts.wins}</th>
                                <th>{texts.draws}</th>
                                <th>{texts.losses}</th>
                                <th>{texts.goalsFor}</th>
                                <th>{texts.goalsAgainst}</th>
                                <th>{texts.goalDifference}</th>
                                <th>{texts.points}</th>
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
                    <h5>🟦{texts.championsLeague}　🟧{texts.europaLeague}　🟩{texts.conferenceLeague}　🟥{texts.relegation}</h5>
                </>
            )}
        </div>
    );
}

export default Record;
