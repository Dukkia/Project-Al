const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const NodeCache = require('node-cache');

const htmlContent = require('./htmlContent'); // htmlContent.js 파일에서 HTML 내용을 가져옴
const { SERVER_URL } = require('./config'); // config.js에서 SERVER_URL을 가져옵니다

const portEn = 2044;
const portJa = 2081;
const portKo = 2082;

// 허용된 오리진 설정
const allowedOrigins = [`http://${SERVER_URL}:5173`];

// 공통 cors 미들웨어
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET'] // 필요한 HTTP 메서드 지정
};

// 영어 서버 생성
const appEn = express();
appEn.use(cors(corsOptions));
const cacheEn = new NodeCache({ stdTTL: 2592000 }); // 영어 서버 캐시

// 일본어 서버 생성
const appJa = express();
appJa.use(cors(corsOptions));
const cacheJa = new NodeCache({ stdTTL: 2592000 }); // 일본어 서버 캐시

// 한국어 서버 생성
const appKo = express();
appKo.use(cors(corsOptions));
const cacheKo = new NodeCache({ stdTTL: 2592000 }); // 한국어 서버 캐시

// 캐시 함수
const getFromCache = (cache, key) => {
    return cache.get(key);
};

const setToCache = (cache, key, value) => {
    cache.set(key, value);
};

const url = 'https://naveropenapi.apigw.ntruss.com/web-trans/v1/translate';
const apiKeyId = '70gknw92gy';
const apiKey = 'Y5VjpEoL8bIFsKzOAftW7bR54V7WiMCGntMPuJQl';

const translate = async (cache, target) => {
    let translatedHtml = getFromCache(cache, htmlContent);
    if (!translatedHtml) {
        const data = new URLSearchParams();
        data.append('source', 'en');
        data.append('target', target);
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
        setToCache(cache, htmlContent, translatedHtml);
    }
    return translatedHtml;
};

// 영어 서버 엔드포인트
appEn.get('/', async (req, res) => {
    try {
        // 캐시에서 HTML 내용 가져오기
        let cachedHtml = getFromCache(cacheEn, htmlContent);

        if (!cachedHtml) {
            console.log('Data not found in cache, retrieving from source...');
            // 영어 서버에서 번역하지 않고 캐시에 직접 저장
            cachedHtml = htmlContent;
            setToCache(cacheEn, htmlContent, cachedHtml);
        }

        // 캐시된 HTML 내용을 클라이언트에 전송
        res.send(cachedHtml);
    } catch (error) {
        console.error('오류 발생:', error.message);
        res.status(500).send('서버 내부 오류');
    }
});

// 일본어 서버 엔드포인트
appJa.get('/', async (req, res) => {
    try {
        const translatedHtml = await translate(cacheJa, 'ja');
        res.send(translatedHtml);
    } catch (error) {
        console.error('오류 발생:', error.message);
        res.status(500).send('서버 내부 오류');
    }
});

// 한국어 서버 엔드포인트
appKo.get('/', async (req, res) => {
    try {
        const translatedHtml = await translate(cacheKo, 'ko');
        res.send(translatedHtml);
    } catch (error) {
        console.error('오류 발생:', error.message);
        res.status(500).send('서버 내부 오류');
    }
});

// 서버 실행
appEn.listen(portEn, () => {
    console.log(`영어 서버가 http://${SERVER_URL}:${portEn} 에서 실행 중입니다.`);
});

appJa.listen(portJa, () => {
    console.log(`일본어 서버가 http://${SERVER_URL}:${portJa} 에서 실행 중입니다.`);
});

appKo.listen(portKo, () => {
    console.log(`한국어 서버가 http://${SERVER_URL}:${portKo} 에서 실행 중입니다.`);
});