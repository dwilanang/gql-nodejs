const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

let jwtSecretKey = process.env.JWT_SECRET_KEY;
let data = {
    time: Date(),
    userId: 1,
}

const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: "1h"
});

module.exports = token;