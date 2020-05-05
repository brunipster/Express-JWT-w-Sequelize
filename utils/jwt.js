
var jwt = require('jsonwebtoken');

var key = process.env.SECRET_KEY

const generateJWT = flag =>
    new Promise((resolve, reject) => {
        jwt.sign(flag, key, (err, token) => {
            if (token) {
                resolve(token)
            } else {
                reject(err)
            }

        });
    });

const verifyJWT = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        });
    });

module.exports = { generateJWT, verifyJWT }