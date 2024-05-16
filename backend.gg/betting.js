const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { translateText } = require('./cache'); // translateText 함수를 가져올 때 객체 형태로 가져옴

const app = express();
const PORT = process.env.PORT || 3204;

const url = 'https://api-external.oddsjam.com/api/v2/games';
const headers = {
  'X-Api-Key': '87b519e5-4342-4062-be8b-30df3aeab836'
};

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET']
  })
);

const fetchGames = async () => {
  try {
    const response = await axios.get(url, { headers });
    if (response.status !== 200) {
      throw new Error('Failed to fetch games');
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getIdsByLeague = async () => {
  try {
    const gamesData = await fetchGames();
    const ids = gamesData.data
      .filter(game => game.league === 'England - Premier League')
      .map(game => game.id);
    ids.sort((a, b) => new Date(a.split('-')[2]) - new Date(b.split('-')[2]));
    return ids;
  } catch (error) {
    console.error('Failed to get IDs:', error);
    return [];
  }
};

const translateGameData = async (gameData) => {
  const uniqueTexts = new Set();
  const translationMap = {};
  gameData.forEach(game => {
    uniqueTexts.add(game.home_team);
    uniqueTexts.add(game.away_team);
    game.odds.forEach(odd => {
      if (odd.market_name === 'Moneyline') {
        uniqueTexts.add(odd.name);
      }
    });
  });
  const promises = Array.from(uniqueTexts).map(async text => {
    if (!translationMap[text]) {
      translationMap[text] = await translateText(text);
    }
  });
  await Promise.all(promises);
  const translatedGames = gameData.map(game => ({
    ...game,
    home_team: translationMap[game.home_team],
    away_team: translationMap[game.away_team],
    odds: game.odds.map(odd => ({
      ...odd,
      name: odd.market_name === 'Moneyline' && translationMap[odd.name] === '그리다' ? '무승부' : translationMap[odd.name] || odd.name
    }))
  }));
  return translatedGames;
};

app.get('/', async (req, res) => {
  try {
    const gameIds = await getIdsByLeague();
    const promises = gameIds.map(async gameId => {
      const response = await axios.get('https://api-external.oddsjam.com/api/v2/game-odds', {
        headers: {
          'X-Api-Key': '87b519e5-4342-4062-be8b-30df3aeab836'
        },
        params: {
          sportsbook: 'Pinnacle',
          game_id: gameId
        }
      });
      return response.data.data;
    });

    const allGameData = await Promise.all(promises);

    let translatedData = [];
    for (const gameData of allGameData) {
      const translatedGames = await translateGameData(gameData);
      translatedData = translatedData.concat(translatedGames);
    }

    const moneylineData = translatedData.map(game => ({
      ...game,
      odds: game.odds.filter(odds => odds.market_name === 'Moneyline')
    }));

    res.status(200).send(moneylineData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT http://localhost:${PORT}`);
});
