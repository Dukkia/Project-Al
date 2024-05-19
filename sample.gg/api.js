const express = require('express');
const axios = require('axios');
const app = express();

const port = 3000;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.performfeeds.com/soccerdata/match/1wajy57wfq6wo1qnta55rgx3an?comp=2kwbbcootiqqgmrzs6o5inle5&_pgSz=1000&_rt=b&_fmt=json');
        const data = response.data;

        // 데이터를 예쁘게 포맷하여 HTML 내에 삽입
        const formattedData = JSON.stringify(data, null, 2);
        res.send(`<html><body><pre>${formattedData}</pre></body></html>`);
    } catch (error) {
        console.error('External API call failed:', error);
        res.status(500).send('API 호출에 실패했습니다.');
    }
});

// 서버를 지정된 포트에서 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
