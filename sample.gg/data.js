const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

const port = 3000;

app.get('/', async (req, res) => {
    try {
        // 절대 경로로 파일 경로 지정
        const filePath = path.join(__dirname, '..', 'data.gg', 'record.json');
        console.log('Reading file from:', filePath); // 파일 경로 로그 출력
        
        // 로컬 파일 읽기
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        // 데이터를 예쁘게 포맷하여 HTML 내에 삽입
        const formattedData = JSON.stringify(jsonData, null, 2);
        res.send(`<html><body><pre>${formattedData}</pre></body></html>`);
    } catch (error) {
        console.error('Failed to read local JSON file:', error);
        res.status(500).send('로컬 JSON 파일을 읽어오는 데 실패했습니다.');
    }
});

// 서버를 지정된 포트에서 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/ 에서 실행 중입니다.`);
});
