const express = require('express');
const axios = require('axios');
const moment = require('moment-timezone');
const cache = require('./cache'); // cache.js 모듈 불러오기
const cors = require('cors');
const { SERVER_URL } = require('./config'); // config.js에서 SERVER_URL을 가져옵니다

const createServer = (port, targetLang) => {
    const app = express();

    const allowedOrigins = [`http://${SERVER_URL}:5173`];

    app.use(cors({
        origin: allowedOrigins,
        methods: ['GET']
    }));

    app.get('/', async (req, res) => {
        try {
            const cacheKey = targetLang === 'en' ? 'formattedData' : `formattedData-${targetLang}`;
            const cachedData = cache.translationCache.get(cacheKey);

            if (cachedData) {
                console.log('Data found in cache');
                res.json(cachedData); // 캐시에서 데이터를 클라이언트에 전송
                return;
            }

            // 외부 API에서 데이터를 가져와서 포맷팅
            const response = await axios.get('https://api.performfeeds.com/soccerdata/match/1wajy57wfq6wo1qnta55rgx3an?_rt=b&_fmt=json&tmcl=8dz245skul7xcviumzumhlkwk&lineups=yes&live=yes&mt.mDt=[2024-04-01T00:00:00Z TO 2024-05-31T23:59:59Z]');
            const data = response.data;

            const matches = data.match;

            const formattedData = await Promise.all(matches.map(async (match) => {
                const dateTime = match.matchInfo.date + 'T' + match.matchInfo.time;
                const koreaTime = moment.utc(dateTime.replace('Z', '')).tz('Asia/Seoul');

                const homeTeam = targetLang !== 'en' ? await cache.translateText(match.matchInfo.contestant[0].name, targetLang) : match.matchInfo.contestant[0].name;
                const awayTeam = targetLang !== 'en' ? await cache.translateText(match.matchInfo.contestant[1].name, targetLang) : match.matchInfo.contestant[1].name;
               
                // goal의 scorerName 번역
                const translatedGoals = await Promise.all(match.liveData.goal.map(async (goal) => {
                    const translatedScorerName = targetLang !== 'en' ? await cache.translateText(goal.scorerName, targetLang) : goal.scorerName;
                    return {
                        ...goal,
                        scorerName: translatedScorerName || goal.scorerName  // 번역 실패 시 원본 이름 사용
                    };
                }));

                // lineUp의 matchName 번역
                const translatedLineUp = await Promise.all(match.liveData.lineUp.map(async (lineUpItem) => {
                    const translatedPlayers = await Promise.all(lineUpItem.player.map(async (player) => {
                        const translatedMatchName = targetLang !== 'en' ? await cache.translateText(player.matchName, targetLang) : player.matchName;
                        return {
                            ...player,
                            matchName: translatedMatchName || player.matchName // Use original if translation fails
                        };
                    }));
            
                    return {
                        ...lineUpItem,
                        player: translatedPlayers
                    };
                }));

                return {
                    ID: match.matchInfo.id,
                    Date: koreaTime.format('YYYY-MM-DD'),
                    Time: koreaTime.format('HH:mm:ss'),
                    Team: [
                        { position: 'home', name: homeTeam, id: match.matchInfo.contestant[0].id },
                        { position: 'away', name: awayTeam, id: match.matchInfo.contestant[1].id }
                    ],
                    Result: match.liveData.matchDetails.scores ? match.liveData.matchDetails.scores.total : "예정",
                    Round: match.matchInfo.week,
                    Place: match.matchInfo.venue.shortName,
                    goal: translatedGoals,
                    lineUp: translatedLineUp
                };
            }));

            // 포맷팅된 데이터를 캐시에 저장
            cache.translationCache.set(cacheKey, formattedData);

            // 클라이언트에 JSON 형태로 데이터를 보냄
            res.json(formattedData);
        } catch (error) {
            console.error('External API call failed:', error);
            res.status(500).json({ error: 'API 호출에 실패했습니다.' });
        }
    });

    app.listen(port, () => {
        console.log(`서버가 http://${SERVER_URL}:${port}/ 에서 실행 중입니다.`);
    });
};

// 영어 서버 실행
createServer(4471, 'en');

// 한국어 서버 실행
createServer(8271, 'ko');

// 일본어 서버 실행
createServer(8171, 'ja');
