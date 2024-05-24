// record.js
const express = require('express');
const axios = require('axios');
const cache = require('./cache'); // cache.js 파일 전체를 가져옴
const app = express();
const cors = require('cors'); // cors 모듈 추가

const port = 3202;

// 허용된 오리진 설정
const allowedOrigins = ['http://localhost:5173'];

// cors 미들웨어 추가
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET'] // 필요한 HTTP 메서드 지정
}));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://api.performfeeds.com/soccerdata/standings/1wajy57wfq6wo1qnta55rgx3an?_rt=b&_fmt=json&tmcl=1jt5mxgn4q5r6mknmlqv5qjh0');
        let data = response.data;

        // contestantName 번역 작업 추가
        data = await translateContestantNames(data);

        // JSON 형식의 데이터를 그대로 반환
        res.json(data);
    } catch (error) {
        console.error('External API call failed:', error);
        res.status(500).send('API 호출에 실패했습니다.');
    }
});

// contestantName 번역 함수
async function translateContestantNames(data) {
    try {
        // contestants 데이터 가져오기
        const contestants = data.stage[0].division[0].ranking;

        // contestantName 번역 작업 추가
        for (const contestant of contestants) {
            contestant.contestantClubName = await cache.translateText(contestant.contestantClubName); // cache 모듈의 translateText 함수 사용
        }

        // 번역된 데이터 반환
        return data;
    } catch (error) {
        console.error('Error translating contestant names:', error);
        return data;
    }
}

// 서버를 지정된 포트에서 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);  
});
