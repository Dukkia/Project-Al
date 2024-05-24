const express = require('express');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const cors = require('cors');
const htmlContent = require('.././htmlContent'); // htmlContent.js 파일에서 HTML 내용을 가져옴

const app = express();
const port = 8200;

const cache = new NodeCache({ stdTTL: 86400 }); // 캐시 TTL(유효 시간)을 600초(10분)로 설정

// 허용된 오리진 설정
const allowedOrigins = ['http://localhost:5173'];

// cors 미들웨어 추가
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET'] // 필요한 HTTP 메서드 지정
}));

// 캐시 함수
const getFromCache = (key) => {
    return cache.get(key);
};

const setToCache = (key, value) => {
    cache.set(key, value);
};

const url = 'https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate';
const apiKeyId = 'tl35fbwl8i';
const apiKey = 'R9VMF466TYFA2enPzk7eOhQuRx1XJTJYveUSnhLv';

// 버튼을 클릭할 때마다 번역 요청을 보내는 엔드포인트
app.get('/', async (req, res) => {
    try {
        const data = new URLSearchParams();
        data.append('source', 'en');
        data.append('target', 'ko');
        data.append('html', htmlContent);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-NCP-APIGW-API-KEY-ID': apiKeyId,
                'X-NCP-APIGW-API-KEY': apiKey
            },
            body: data
        });

        if (!response.ok) {
            console.error('API 응답 오류:', response.statusText);
            console.error('응답 상태 코드:', response.status);
            throw new Error(`번역 요청 실패: ${response.statusText}`);
        }

        const translatedHtml = await response.text();

        // 번역된 HTML을 캐시에 저장
        setToCache(htmlContent, translatedHtml);

        // 번역된 HTML을 클라이언트에 전송
        res.send(translatedHtml);
    } catch (error) {
        console.error('오류 발생:', error.message);
        res.status(500).send('서버 내부 오류');
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});