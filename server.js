const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/talks', (req, res) => {
    fs.readFile(path.join(__dirname, 'talks.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading talks data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Matrix Con server running at http://localhost:${PORT}`);
});
