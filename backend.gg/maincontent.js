const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');

// 허용된 오리진 설정
const allowedOrigins = ['http://localhost:5173'];

// cors 미들웨어 추가
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET'] // 필요한 HTTP 메서드 지정
}));

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stats Perform</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="container">
        <main>
            <section class="intro-section">
                <ul class="topics-list">
                    <button>AI in Sport</button>
                    <button>Fan Engagement</button>
                    <button>Betting & Fantasy</button>
                    <button>Team Performance</button>
                    <button>Opta</button></li>
                </ul>
                <h1>Stats Perform</h1>
                <h2>THERE'S MAGIC IN THE DETAIL OF SPORT</h2>
                <p>
                    Stats Perform is the world leader in sports AI. With 6.5 Petabytes of proprietary sports data and 8 foundation sports AI models used in 200+ software modules, we empower the world’s top sports broadcasters, media, apps, leagues, federations, bookmakers and teams to win audiences, customers and trophies.
                </p>
            </section>

            <section class="trusted-section">
                <h2>TRUSTED BY INDUSTRY LEADERS</h2>
                <p>
                    The Best Build Magic With Stats Perform
                    The world’s leading teams, broadcasters, media, apps, bookmakers and brands come to us to transform sporting magic into sports content, analysis and insight which powers audience growth, increased revenues and on-field success.
                </p>
                <p>
                    Enrich your sports analysis and power captivating experiences that bring fans closer to sport with our globally-trusted, expertly-collected Opta data feeds and AI-powered predictions.
                </p>
                <p>
                    Drive on-pitch performance, recruitment and tactics, capture eyeballs and sponsors across every screen and make licensed betting more entertaining. Keep fans informed with the latest sports news video, articles, insights, metrics, live text commentary and interactive widgets. Tell new stories with analytics platforms and our incredible in-house researchers. Whatever magical sports experience you’d like to build, we can help.
                </p>
            </section>
        </main>
    </div>
</body>
</html>

`;

app.get('/', (req, res) => {
    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
