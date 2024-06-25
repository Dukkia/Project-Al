const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { SERVER_URL } = require('../default.gg/config');

const app = express();
const port = 2144;

const allowedOrigins = [`http://${SERVER_URL}:5173`]; 

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET']
}));

app.get('/', async (req, res) => {
    try {
        const matchIdResponse = await axios.get(`http://${SERVER_URL}:2000`);
        const matchIds = matchIdResponse.data;

        if (matchIds.length === 0) {
            return res.status(404).send('No matchId found');
        }

        const matchId = matchIds[matchIds.length - 1]; // Get the latest matchId

        // Construct the API URL with the matchId
        const apiUrl = `https://api.performfeeds.com/soccerdata/commentary/1wajy57wfq6wo1qnta55rgx3an?_rt=b&_fmt=json&fx=${matchId}`;

        // Fetch the data from the API
        const response = await axios.get(apiUrl);

        // Send the response data back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Error fetching data from API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://${SERVER_URL}:${port}`);
});
