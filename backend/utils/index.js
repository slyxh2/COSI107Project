const jwt = require('jsonwebtoken');

exports.parseJwt = function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

exports.getToken = function getToken(username) {
    const access_token = jwt.sign({ username }, 'hhh', {
        expiresIn: "1h"
    });
    const refresh_token = jwt.sign({ username }, 'hhh', {
        expiresIn: "7d"
    });
    return { access_token, refresh_token };
}