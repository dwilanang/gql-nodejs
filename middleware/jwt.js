// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// let jwtSecretKey = process.env.JWT_SECRET;
// let data = {
//     time: Date(),
//     userId: 2,
// }

// const token = jwt.sign(data, jwtSecretKey, {
//     expiresIn: '1h'
// });

// module.exports = token;

// const jwt = require("jsonwebtoken")

// const createJwtToken = (data) => {
//   return jwt.sign({ data }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   })
// }

// module.exports = { createJwtToken }