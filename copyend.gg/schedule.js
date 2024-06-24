const express = require('express');
const fs = require('fs');
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

            // schedule.json 파일에서 데이터를 읽어옴
            const data = JSON.parse(fs.readFileSync('../data.gg/schedule.json', 'utf8'));

            const matches = data.match;

            const formattedData = await Promise.all(matches.map(async (match) => {
                const dateTime = match.matchInfo.date + 'T' + match.matchInfo.time;
                const koreaTime = moment.utc(dateTime.replace('Z', '')).tz('Asia/Seoul');

                const homeTeamName = targetLang !== 'en' ? await cache.translateText(match.matchInfo.contestant[0].name, targetLang) : match.matchInfo.contestant[0].name;
                const awayTeamName = targetLang !== 'en' ? await cache.translateText(match.matchInfo.contestant[1].name, targetLang) : match.matchInfo.contestant[1].name;

                const homeTeamId = match.matchInfo.contestant[0].id;
                const awayTeamId = match.matchInfo.contestant[1].id;
                const venueName = match.matchInfo.venue.shortName;
                const goals = match.liveData.goal;
                const lineUps = match.liveData.lineUp;

                return {
                    ID: match.matchInfo.id,
                    Date: koreaTime.format('YYYY-MM-DD'),
                    Time: koreaTime.format('HH:mm:ss'),
                    Team: [
                        { position: 'home', name: homeTeamName, id: homeTeamId },
                        { position: 'away', name: awayTeamName, id: awayTeamId }
                    ],
                    Result: match.liveData.matchDetails.scores ? match.liveData.matchDetails.scores.total : "예정",
                    Round: match.matchInfo.week,
                    Place: venueName,
                    goal: goals,
                    lineUp: lineUps
                };
            }));

            // 포맷팅된 데이터를 캐시에 저장
            cache.translationCache.set(cacheKey, formattedData);

            // 클라이언트에 JSON 형태로 데이터를 보냄
            res.json(formattedData);
        } catch (error) {
            console.error('Failed to load data from schedule.json:', error);
            res.status(500).json({ error: '데이터를 불러오는데 실패했습니다.' });
        }
    });

    app.listen(port, () => {
        console.log(`서버가 http://${SERVER_URL}:${port}/ 에서 실행 중입니다.`);
    });
};

// 영어 서버 실행
createServer(4401, 'en');

// 한국어 서버 실행
createServer(8201, 'ko');

// 일본어 서버 실행
createServer(8101, 'ja');
