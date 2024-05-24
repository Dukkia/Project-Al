const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const htmlContent = require('.././htmlContent'); // htmlContent.js 파일에서 HTML 내용을 가져옴

const app = express();
const port = 4400;

// 허용된 오리진 설정
const allowedOrigins = ['http://localhost:5173'];

// cors 미들웨어 추가
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET'] // 필요한 HTTP 메서드 지정
}));

// 캐시 생성 (유효 시간을 600초로 설정)
const cache = new NodeCache({ stdTTL: 86400 });

// 캐시 함수 정의
const getFromCache = (key) => {
    return cache.get(key);
};

const setToCache = (key, value) => {
    cache.set(key, value);
};

app.get('/', async (req, res) => {
    try {
        // 캐시에서 HTML 내용 가져오기
        const cachedHtml = getFromCache('cachedHtml');

        if (cachedHtml) {
            console.log('캐시에서 HTML 내용 제공');
            // 클라이언트에 캐시된 HTML 내용 전송
            return res.send(cachedHtml);
        }

        // 클라이언트에 HTML 내용 전송
        res.send(htmlContent);

        // HTML 내용을 캐시에 저장
        setToCache('cachedHtml', htmlContent);
    } catch (error) {
        console.error('오류 발생:', error.message);
        res.status(500).send('서버 내부 오류');
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
