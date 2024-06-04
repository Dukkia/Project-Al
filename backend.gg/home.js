const express = require('express');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const cors = require('cors');
const htmlContent = require('./htmlContent'); // htmlContent.js 파일에서 HTML 내용을 가져옴
const { SERVER_URL } = require('./config'); // config.js에서 SERVER_URL을 가져옵니다

const app1 = express();
const app2 = express();
const port1 = 8100;
const port2 = 8200;

const cache = new NodeCache({ stdTTL: 2592000 }); // 캐시 TTL(유효 시간)을 600초(10분)로 설정

// 허용된 오리진 설정
const allowedOrigins = [`http://${SERVER_URL}:5173`];

// cors 미들웨어 추가
app1.use(cors({
  origin: allowedOrigins,
  methods: ['GET'] // 필요한 HTTP 메서드 지정
}));

app2.use(cors({
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
const apiKeyId = '70gknw92gy';
const apiKey = 'Y5VjpEoL8bIFsKzOAftW7bR54V7WiMCGntMPuJQl';

// 번역 요청을 보내는 엔드포인트
const translate = async (sourceLang, targetLang) => {
    try {
        // 캐시에서 HTML 내용 가져오기
        let translatedHtml = getFromCache(htmlContent);

        // 캐시에 없는 경우에만 API 호출하여 번역 진행
        if (!translatedHtml) {
            const data = new URLSearchParams();
            data.append('source', sourceLang);
            data.append('target', targetLang);
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

            translatedHtml = await response.text();

            // 번역된 HTML을 캐시에 저장
            setToCache(htmlContent, translatedHtml);
        }

        return translatedHtml;
    } catch (error) {
        console.error('오류 발생:', error.message);
        throw new Error('번역 실패');
    }
};

// 버튼을 클릭할 때마다 영어에서 일본어로 번역하는 엔드포인트
app1.get('/', async (req, res) => {
    try {
        const translatedHtml = await translate('en', 'ja');
        res.send(translatedHtml);
    } catch (error) {
        res.status(500).send('번역 실패');
    }
});

// 버튼을 클릭할 때마다 영어에서 한국어로 번역하는 엔드포인트
app2.get('/', async (req, res) => {
    try {
        const translatedHtml = await translate('en', 'ko');
        res.send(translatedHtml);
    } catch (error) {
        res.status(500).send('번역 실패');
    }
});

app1.listen(port1, () => {
    console.log(`서버가 http://localhost:${port1}에서 실행 중입니다.`);
});

app2.listen(port2, () => {
    console.log(`서버가 http://localhost:${port2}에서 실행 중입니다.`);
});
