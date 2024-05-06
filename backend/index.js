const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const { parseJwt, getToken } = require('./utils/index.js');
const { userList, hashPassword } = require('./mock/user.js');

const httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
};

const corsOptions = {
    origin: true,
    credentials: true
};
const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/check', (req, res) => {
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];
    console.log(token);
    if (!token) {
        res.status(401).send({ error: 'Not Login' });
        return;
    }

    try {
        jwt.verify(token, 'hhh');
    } catch (e) {
        res.status(403).send({ error: 'Token expired, please login!' });
        return;
    }
    const data = parseJwt(token);

    const userInf = userList[data.username];
    if (!userInf) {
        res.status(404).send({ error: 'User Not Found!' });
        return;
    }

    res.status(200).send({
        username: userInf.username,
        id: userInf.id,
        role: userInf.role,
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!userList[username]) {
        res.status(401).send({ error: 'Invalid Credential!!!' });
        return;
    }
    const userInf = userList[username];
    const hashpass = hashPassword(password);
    if (userInf.password !== hashpass) {
        res.status(401).send({ error: 'Invalid Credential!!!' });
        return;
    }
    const { access_token, refresh_token } = getToken(username);
    res.cookie('access_token', access_token, {
        httpOnly: true
    });
    res.cookie('refresh_token', refresh_token, {
        httpOnly: true
    });
    res.status(200).send({
        access_token,
        refresh_token,
        user: {
            username: userInf.username,
            id: userInf.id,
            role: userInf.role,
        }
    });
});

app.get('/refresh', (req, res) => {
    try {
        const params = req.query;
        const { token } = params;
        if (!token) {
            res.status(401).send('Invaild Refresh Token, Please login!');
        }
        const data = jwt.verify(token, 'hhh');
        const payload = parseJwt(token);
        console.log(payload);
        if (data) {
            res.send(getToken(payload.username));
        }
    } catch (e) {
        console.log(e);
        res.status(403).send('Refresh Token expired, please login!');
    }
})

const server = https.createServer(httpsOptions, app);

server.listen(7070, () => {
    console.log('success!!');
})