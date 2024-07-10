import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Power.css';
import { useLanguage } from '../../../../utils/LanguageContext';
import languageTexts from '../../../../utils/languageTexts';

const Power = ({ gameId, homeTeamName, awayTeamName }) => {
    const { selectedLanguage } = useLanguage(); // Accessing selectedLanguage from context

    const [matchInfo, setMatchInfo] = useState(null);
    const [homeTeamPowerRating, setHomeTeamPowerRating] = useState(null);
    const [awayTeamPowerRating, setAwayTeamPowerRating] = useState(null);
    const [homeTeamGlobalRank, setHomeTeamGlobalRank] = useState(null);
    const [awayTeamGlobalRank, setAwayTeamGlobalRank] = useState(null);

    useEffect(() => {
        const fetchMatchDescription = async () => {
            try {
                const response = await axios.get(`http://${import.meta.env.VITE_URL}:4440`);
                const match = response.data.match.find(match => match.matchInfo.id === gameId);

                if (match) {
                    setMatchInfo(match.matchInfo);

                    const homeTeam = match.matchInfo.contestant.find(team => team.position === 'home');
                    const awayTeam = match.matchInfo.contestant.find(team => team.position === 'away');

                    if (homeTeam) {
                        setHomeTeamPowerRating(homeTeam.currentPowerRating.toFixed(3));
                        setHomeTeamGlobalRank(homeTeam.currentGlobalRank);
                    }

                    if (awayTeam) {
                        setAwayTeamPowerRating(awayTeam.currentPowerRating.toFixed(3));
                        setAwayTeamGlobalRank(awayTeam.currentGlobalRank);
                    }
                } else {
                    console.error(`Match with gameId ${gameId} not found`);
                }
            } catch (error) {
                console.error('Error fetching match data:', error);
            }
        };

        fetchMatchDescription();
    }, [gameId]);

    // Helper function to get translated text based on selectedLanguage
    const getText = (key) => {
        return languageTexts[selectedLanguage][key] || key; // Default to key if translation not found
    };

    return (
        <div className="power-container">
            <span style={{ fontSize: '18px' }}>{getText('powerRank')}</span>
            <div className="power-row">
                <div className="power-cell home-team">{homeTeamName}</div>
                <div className="power-cell global-rank-label"> </div>
                <div className="power-cell away-team">{awayTeamName}</div>
            </div>
            <div className="power-row">
                <div className="power-cell home-team">{homeTeamGlobalRank} {getText('tier')}</div>
                <div className="power-cell global-rank-label">{getText('globalRank')}</div>
                <div className="power-cell away-team">{awayTeamGlobalRank} {getText('tier')}</div>
            </div>
            <div className="power-row">
                <div className="power-cell home-team">{homeTeamPowerRating}</div>
                <div className="power-cell power-rating-label">{getText('powerRating')}</div>
                <div className="power-cell away-team">{awayTeamPowerRating}</div>
            </div>
        </div>
    );
};

export default Power;
