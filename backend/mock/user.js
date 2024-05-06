/**
 * Mock User data
 */

const crypto = require('crypto');
require('dotenv').config();
console.log(process.env.PASSWORD_HASH_KEY);

const hashPassword = (password) => {
    const hashKey = process.env.PASSWORD_HASH_KEY
    const hash = crypto.createHash('sha256');
    hash.update(password + hashKey);
    const result = hash.digest('hex');
    return result
}


const getUser = () => {
    const mockUser = {
        'manager': {
            username: 'manager',
            id: "COSI101",
            password: hashPassword('manager'),
            role: 3
        },
        'worker': {
            username: 'worker',
            id: "COSI102",
            password: hashPassword('worker'),
            role: 2
        },
        'customer': {
            username: 'customer',
            id: "COSI103",
            password: hashPassword('customer'),
            role: 1
        },
    };
    return mockUser;
}

exports.userList = getUser();
exports.hashPassword = hashPassword;