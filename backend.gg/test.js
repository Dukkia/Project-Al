const express = require('express');
const axios = require('axios');
const app = express();

const port = 3040;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.performfeeds.com/soccerdata/match/1wajy57wfq6wo1qnta55rgx3an?comp=2kwbbcootiqqgmrzs6o5inle5&_pgSz=1000&_rt=b&_fmt=json');
        const data = response.data;

        // 경기 데이터 추출
        const matches = data.match;

        // Date, Time, Team, Result 추출
        const formattedData = matches.map(match => {
            return {
                Schedule: {
                    Date: match.matchInfo.date,
                    Time: match.matchInfo.time,
                    Team: match.matchInfo.contestant,
                    Result: match.liveData.matchDetails.scores ? match.liveData.matchDetails.scores.total : "예정"
                },
            }
        });


        // 두 번째 API 호출
        const secondResponse = await axios.get('http://api.performfeeds.com/soccerdata/standings/1wajy57wfq6wo1qnta55rgx3an?_rt=b&_fmt=json&tmcl=1jt5mxgn4q5r6mknmlqv5qjh0');
        const secondData = secondResponse.data;
        

        // 데이터를 예쁘게 포맷하여 HTML 내에 삽입
        res.send(`<html><body><pre>${JSON.stringify(formattedData, null, 2)}\n${JSON.stringify(secondData, null, 2)}</pre></body></html>`);
    } catch (error) {
        console.error('External API call failed:', error);
        res.status(500).send('API 호출에 실패했습니다.');
    }
});


// 서버를 지정된 포트에서 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
