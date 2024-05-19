const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

const client_id = 'tl35fbwl8i';
const client_secret = 'R9VMF466TYFA2enPzk7eOhQuRx1XJTJYveUSnhLv';
const glossaryKey = 'c48d0bc2-963e-479b-8170-e66ec6334aca'; // 용어집 키

const translateText = (text, sourceLang, targetLang) => {
  return new Promise((resolve, reject) => {
    const api_url = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';
    const options = {
      url: api_url,
      form: { source: sourceLang, target: targetLang, text: text, glossaryKey: glossaryKey }, // 용어집 키 추가
      headers: { 'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret }
    };
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const translatedText = JSON.parse(body).message.result.translatedText;
        resolve(translatedText);
      } else {
        reject(error);
      }
    });
  });
};

app.get('/', async (req, res) => {
  const originalCode = 'en';
  const targetCode = 'ko'; // 번역할 언어 코드: 한국어 (ko)
  const originalText = 'draw'; // 번역할 문장

  try {
    const translatedText = await translateText(originalText, originalCode, targetCode);
    res.json({ originalText: originalText, translatedText: translatedText });
  } catch (error) {
    console.error('Error during translation:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}/ app listening on port ${port}!`);
});
