const express = require('express');
const axios = require('axios');
const cache = require('./cache'); // cache.js 파일 전체를 가져옴
const app = express();
const cors = require('cors'); // cors 모듈 추가

const port = 4402;

// 허용된 오리진 설정
const allowedOrigins = ['http://localhost:5173'];

// cors 미들웨어 추가
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET'] // 필요한 HTTP 메서드 지정
}));

app.get('/', async (req, res) => {
    try {
        // 캐시에 데이터가 있는지 확인
        const cachedData = cache.translationCache.get('standingsData');

        if (cachedData) {
            console.log('Data found in cache');
            res.json(cachedData); // 캐시에서 데이터를 클라이언트에 전송
            return;
        }

        // 외부 API에서 데이터를 가져와서 캐시에 저장
        const response = await axios.get('http://api.performfeeds.com/soccerdata/standings/1wajy57wfq6wo1qnta55rgx3an?_rt=b&_fmt=json&tmcl=1jt5mxgn4q5r6mknmlqv5qjh0');
        const data = response.data;

        // 데이터를 캐시에 저장
        cache.translationCache.set('standingsData', data);

        // JSON 형식의 데이터를 그대로 반환
        res.json(data);
    } catch (error) {
        console.error('External API call failed:', error);
        res.status(500).send('API 호출에 실패했습니다.');
    }
});

// 서버를 지정된 포트에서 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
