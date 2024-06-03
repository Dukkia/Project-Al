const path = require('path');
const express = require('express');
const fs = require('fs').promises;
const cache = require('./cache');
const app = express();
const cors = require('cors');

const port = 8202;

const allowedOrigins = ['http://127.0.0.1:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET']
}));

app.get('/', async (req, res) => {
    try {
        // 절대 경로로 파일 경로 지정
        const filePath = path.join(__dirname, '../../..', 'data.gg', 'record.json'); // 상위 디렉토리로 이동 후 data.gg로 이동
        console.log('Reading file from:', filePath); // 파일 경로 로그 출력
        const data = await fs.readFile(filePath, 'utf8');
        let jsonData = JSON.parse(data);

        // contestantName 번역 작업 추가
        jsonData = await translateContestantNames(jsonData);

        // JSON 형식의 데이터를 그대로 반환
        res.json(jsonData);
    } catch (error) {
        console.error('Failed to read local JSON file:', error);
        res.status(500).send('로컬 JSON 파일을 읽어오는 데 실패했습니다.');

        // 에러를 콘솔에 출력
        console.error(error);
    }
});


async function translateContestantNames(data) {
    try {
        const contestants = data.stage[0].division[0].ranking;

        for (const contestant of contestants) {
            contestant.contestantClubName = await cache.translateText(contestant.contestantClubName);
        }

        return data;
    } catch (error) {
        console.error('Error translating contestant names:', error);
        return data;
    }
}

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
