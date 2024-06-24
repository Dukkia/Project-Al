const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { SERVER_URL } = require('./config'); // config.js에서 SERVER_URL을 가져옵니다

const app = express();
const port = 2080;


// 메모리 캐시 객체
let cacheData = null;

const allowedOrigins = [`http://${SERVER_URL}:5173`];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET']
}));

app.get('/', async (req, res) => {
    try {
        // 만약 캐시된 데이터가 있으면 캐시 데이터를 반환
        if (cacheData) {
            console.log('Returning data from cache');
            return res.json(cacheData);
        }

        // API 요청
        const apiUrl = 'https://api.performfeeds.com/soccerdata/matchdetailed/1wajy57wfq6wo1qnta55rgx3an?_rt=b&_fmt=json&tmcl=1jt5mxgn4q5r6mknmlqv5qjh0&mt.mDt=[2023-10-01T00:00:00Z TO 2023-10-31T23:59:59Z]';
        const response = await axios.get(apiUrl);

        // API 응답 데이터를 캐시에 저장
        cacheData = response.data;

        // 클라이언트에 응답
        res.json(cacheData);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Error fetching data from API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://${SERVER_URL}:${port}`);
});
