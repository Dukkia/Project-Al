const express = require('express');
const axios = require('axios');

const app = express();
const port = 2020;

app.get('/', async (req, res) => {
    try {
        // Fetch the matchId from localhost:2000
        const matchIdResponse = await axios.get('http://localhost:2000');
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
    console.log(`Server is running on http://localhost:${port}`);
});
