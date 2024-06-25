import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import teamLogos from '../../../utils/teamLogos'; // Import the teamLogos object
import { useLanguage } from '../../../utils/LanguageContext'; // LanguageContext에서 useLanguage 가져오기

import './Messages.css';

function Messages() {
    const { selectedLanguage } = useLanguage(); // LanguageContext에서 선택된 언어 가져오기

    const [contestants, setContestants] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstHalfVisible, setFirstHalfVisible] = useState(true);
    const [secondHalfVisible, setSecondHalfVisible] = useState(true);
    const [afterFirstHalfEnds, setAfterFirstHalfEnds] = useState('');
    const [afterSecondHalfEnds, setAfterSecondHalfEnds] = useState('');
    const [firstHalfEndNumbers, setFirstHalfEndNumbers] = useState([]);
    const [secondHalfEndNumbers, setSecondHalfEndNumbers] = useState([]);
    const [homeTeamName, setHomeTeamName] = useState('');
    const [awayTeamName, setAwayTeamName] = useState('');

    useEffect(() => {
        console.log('Selected Language:', selectedLanguage); // 콘솔에 선택된 언어 출력

        const fetchGameData = async () => {
            let port;
            switch (selectedLanguage) {
                case 'ko':
                    port = 2182;
                    break;
                case 'ja':
                    port = 2181;
                    break;
                case 'en':
                    port = 2144;
                    break;
                default:
                    port = 2182;
            }

            try {
                const response = await axios.get(`http://${import.meta.env.VITE_URL}:${port}`);
                const { matchInfo, messages } = response.data;

                // 팀 데이터 추출
                const extractedContestants = matchInfo.contestant.map(team => ({
                    id: team.id,
                    name: team.name,
                    position: team.position,
                }));
                setContestants(extractedContestants);

                // 코멘트 데이터 추출 및 구조화
                const firstHalfComments = [];
                const secondHalfComments = [];
                const newFirstHalfEndNumbers = []; // 새로운 배열 생성
                const newSecondHalfEndNumbers = []; // 새로운 배열 생성

                let isSecondHalf = false;
                messages[0].message.forEach(msg => {
                    let commentTime = msg.time;

                    // 시간 포맷 조정
                    if (commentTime && (commentTime.includes("45'+") || commentTime.includes("90'+"))) {
                        const parts = commentTime.split("'+");
                        commentTime = `+${parts[1]}`;
                    }

                    const commentData = {
                        id: msg.id,
                        time: commentTime,
                        comment: msg.comment,
                        type: msg.type
                    };

                    // 코멘트 타입에 따라 처리
                    if (msg.type === 'end 1') {
                        setAfterFirstHalfEnds(msg.comment);
                        // Extract numbers from comment
                        const numbers = msg.comment.match(/\d+/g); // Extracts all numbers from the comment
                        if (numbers && numbers.length === 2) {
                            newFirstHalfEndNumbers.push(`${numbers[0]} - ${numbers[1]}`); // Add extracted numbers to new array
                        } else {
                            newFirstHalfEndNumbers.push('0 - 0'); // Default value if numbers extraction fails
                        }
                        isSecondHalf = true; // 첫 번째 반 종료 후, 두 번째 반으로 설정
                    } else if (msg.type === 'end 2') {
                        setAfterSecondHalfEnds(msg.comment);
                        // Extract numbers from comment
                        const numbers = msg.comment.match(/\d+/g); // Extracts all numbers from the comment
                        if (numbers && numbers.length === 2) {
                            newSecondHalfEndNumbers.push(`${numbers[0]} - ${numbers[1]}`); // Add extracted numbers to new array
                        } else {
                            newSecondHalfEndNumbers.push('0 - 0'); // Default value if numbers extraction fails
                        }
                    }

                    // 두 번째 반 여부에 따라 코멘트 구분
                    if (isSecondHalf) {
                        firstHalfComments.push(commentData);
                    } else {
                        secondHalfComments.push(commentData);
                    }
                });

                // 홈팀과 어웨이팀 이름 설정
                const homeTeam = extractedContestants.find(team => team.position === 'home');
                const awayTeam = extractedContestants.find(team => team.position === 'away');
                if (homeTeam) {
                    setHomeTeamName(homeTeam.name);
                }
                if (awayTeam) {
                    setAwayTeamName(awayTeam.name);
                }

                // 코멘트 합치기
                const combinedComments = [
                    { section: 'Second Half', comments: secondHalfComments },
                    { section: 'First Half', comments: firstHalfComments },
                ];

                // 상태 업데이트
                setComments(combinedComments);
                setFirstHalfEndNumbers(newFirstHalfEndNumbers); // 새로운 배열로 업데이트
                setSecondHalfEndNumbers(newSecondHalfEndNumbers); // 새로운 배열로 업데이트
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchGameData();
    }, [selectedLanguage]);

    // 전반전, 후반전 섹션 이름 가져오기
    const getSectionName = (section) => {
        if (selectedLanguage === 'ko') {
            if (section === 'First Half') return '전반전';
            if (section === 'Second Half') return '후반전';
        }
        return section;
    };

    // 필터된 코멘트 가져오기
    const getFilteredComments = (section) => {
        if (section === 'First Half') {
            return comments.find(sec => sec.section === section)?.comments || [];
        }

        if (section === 'Second Half') {
            return comments.find(sec => sec.section === section)?.comments || [];
        }

        return [];
    };

    // 전반전 섹션 가시성 토글
    const toggleFirstHalfVisibility = () => {
        setFirstHalfVisible(!firstHalfVisible);
    };

    // 후반전 섹션 가시성 토글
    const toggleSecondHalfVisibility = () => {
        setSecondHalfVisible(!secondHalfVisible);
    };

    // 렌더링
    return (
        <div className="messages-container">
            {loading ? (
                <p>Loading comments...</p>
            ) : (
                <div className="messages-box">
                    {comments.map(section => (
                        <div key={section.section} className="comment-section">
                            <div
                                className={`section-header ${section.section === 'First Half' || section.section === 'Second Half' ? 'button-like' : ''}`}
                                onClick={section.section === 'First Half' ? toggleFirstHalfVisibility : section.section === 'Second Half' ? toggleSecondHalfVisibility : null}
                            >
                                <h2>{getSectionName(section.section)}</h2>
                                <span className="arrow-icon">
                                    {section.section === 'First Half' && (
                                        <>
                                            <img src={teamLogos[homeTeamName]} className='message-team-logo' />{firstHalfEndNumbers}<img src={teamLogos[awayTeamName]} className='message-team-logo' />
                                            {firstHalfVisible ? <KeyboardArrowDownIcon className="arrow-icon-down" /> : <KeyboardArrowUpIcon className="arrow-icon-up" />}
                                        </>
                                    )}
                                    {section.section === 'Second Half' && (
                                        <>
                                            <img src={teamLogos[homeTeamName]} className='message-team-logo' />{secondHalfEndNumbers}<img src={teamLogos[awayTeamName]} className='message-team-logo' />
                                            {secondHalfVisible ? <KeyboardArrowDownIcon className="arrow-icon-down" /> : <KeyboardArrowUpIcon className="arrow-icon-up" />}
                                        </>
                                    )}
                                </span>
                            </div>
                            {(section.section === 'First Half' && !firstHalfVisible) || (section.section === 'Second Half' && !secondHalfVisible) ? null : (
                                getFilteredComments(section.section)
                                    .filter(comment => comment.time && comment.time.trim() !== "")
                                    .map(comment => (
                                        <div key={comment.id} className="table-row">
                                            <div className="table-time">{comment.time}</div>
                                            <div className="table-comment">{comment.comment}</div>
                                        </div>
                                    ))
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Messages;
