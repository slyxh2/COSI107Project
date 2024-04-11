const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const https = require('https');
const fs = require('fs');

const httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
}

const corsOptions = {
    origin: true,
    credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

function getToken(username) {
    const access_token = jwt.sign({ username }, 'hhh', {
        expiresIn: "1m"
    });
    const refresh_token = jwt.sign({ username }, 'hhh', {
        expiresIn: "7d"
    });
    return { access_token, refresh_token };
}


app.get('/hello', (req, res) => {
    res.status(200).send("OK");
});

const server = https.createServer(httpsOptions, app);
server.listen(7070, () => {
    console.log('success!!');
})