const express = require('express');
const axios = require('axios');
const moment = require('moment-timezone');
const cache = require('./cache'); // cache 모듈 불러오기
const app = express();
const cors = require('cors');

const port = 4401;

const allowedOrigins = ['http://127.0.0.1:5173'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET']
}));

app.get('/', async (req, res) => {
    try {
        // 캐시에 데이터가 있는지 확인
        const cachedData = cache.translationCache.get('formattedData');

        if (cachedData) {
            console.log('Data found in cache');
            res.json(cachedData); // 캐시에서 데이터를 클라이언트에 전송
            return;
        }

        // 외부 API에서 데이터를 가져와서 포맷팅
        const response = await axios.get('https://api.performfeeds.com/soccerdata/match/1wajy57wfq6wo1qnta55rgx3an?comp=2kwbbcootiqqgmrzs6o5inle5&_pgSz=1000&_rt=b&_fmt=json');
        const data = response.data;

        const matches = data.match;

        const formattedData = matches.map(match => {
            const dateTime = match.matchInfo.date + 'T' + match.matchInfo.time;
            const koreaTime = moment.utc(dateTime.replace('Z', '')).tz('Asia/Seoul');
            return {
                Date: koreaTime.format('YYYY-MM-DD'),
                Time: koreaTime.format('HH:mm:ss'),
                Team: [
                    { position: 'home', name: match.matchInfo.contestant[0].name },
                    { position: 'away', name: match.matchInfo.contestant[1].name }
                ],
                Result: match.liveData.matchDetails.scores ? match.liveData.matchDetails.scores.total : "예정",
                Round: match.matchInfo.week,
                Place: match.matchInfo.venue.shortName
            };
        });

        // 포맷팅된 데이터를 캐시에 저장
        cache.translationCache.set('formattedData', formattedData);

        // 클라이언트에 JSON 형태로 데이터를 보냄
        res.json(formattedData);
    } catch (error) {
        console.error('External API call failed:', error);
        res.status(500).json({ error: 'API 호출에 실패했습니다.' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
