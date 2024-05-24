const express = require('express');
const axios = require('axios');
const moment = require('moment-timezone');
const { translateText } = require('./cache');
const app = express();
const cors = require('cors');

const port = 8201;

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET']
}));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.performfeeds.com/soccerdata/match/1wajy57wfq6wo1qnta55rgx3an?comp=2kwbbcootiqqgmrzs6o5inle5&_pgSz=1000&_rt=b&_fmt=json');
        const data = response.data;

        const matches = data.match;

        const formattedData = await Promise.all(matches.map(async (match) => {
            const dateTime = match.matchInfo.date + 'T' + match.matchInfo.time;
            const koreaTime = moment.utc(dateTime.replace('Z', '')).tz('Asia/Seoul');
            const homeTeam = await translateText(match.matchInfo.contestant[0].name);
            const awayTeam = await translateText(match.matchInfo.contestant[1].name);
            return {
                Date: koreaTime.format('YYYY-MM-DD'),
                Time: koreaTime.format('HH:mm:ss'),
                Team: [
                    { position: 'home', name: homeTeam },
                    { position: 'away', name: awayTeam }
                ],
                Result: match.liveData.matchDetails.scores ? match.liveData.matchDetails.scores.total : "예정",
                Round: match.matchInfo.week,
                Place: match.matchInfo.venue.shortName
            }
        }));

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
