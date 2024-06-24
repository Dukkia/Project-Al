const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 2000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Dummy storage for demonstration
let savedMatchIds = [];

// POST and GET endpoint for match IDs
app.route('/')
    .post((req, res) => {
        const { matchId } = req.body;

        if (!matchId) {
            return res.status(400).send('matchId is required');
        }

        savedMatchIds.push(matchId);
        res.status(200).send('matchId saved successfully');
    })
    .get((req, res) => {
        res.status(200).json(savedMatchIds);
    });

// Start server
app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
