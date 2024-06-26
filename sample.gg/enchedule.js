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
            const cacheKey = 'formattedData';
            const cachedData = cache.translationCache.get(cacheKey);

            if (cachedData) {
                console.log('Data found in cache');
                res.json(cachedData); // 캐시에서 데이터를 클라이언트에 전송
                return;
            }

            // schedule.json 파일에서 데이터를 읽어옴
            const data = JSON.parse(fs.readFileSync('../data.gg/schedule.json', 'utf8'));

            const matches = data.match;

            const formattedData = matches.map((match) => {
                const dateTime = match.matchInfo.date + 'T' + match.matchInfo.time;
                const koreaTime = moment.utc(dateTime.replace('Z', '')).tz('Asia/Seoul');

                const homeTeam = match.matchInfo.contestant[0];
                const awayTeam = match.matchInfo.contestant[1];

                return {
                    ID: match.matchInfo.id,
                    Date: koreaTime.format('YYYY-MM-DD'),
                    Time: koreaTime.format('HH:mm:ss'),
                    Team: [
                        { position: 'home', name: homeTeam.name, id: homeTeam.id },
                        { position: 'away', name: awayTeam.name, id: awayTeam.id }
                    ],
                    Result: match.liveData.matchDetails.scores ? match.liveData.matchDetails.scores.total : "예정",
                    Round: match.matchInfo.week,
                    Place: match.matchInfo.venue.shortName,
                    goal: match.liveData.goal
                };
            });

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

// 서버 실행 (영어만 지원)
createServer(4401, 'en');
