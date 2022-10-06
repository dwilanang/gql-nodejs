const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const url  = require('url');

dotenv.config();

const middleware = (req, res, next) => {
    var user = {
        id: 0
    };
    try {
        const authorization = req.headers.authorization
        var token = ""
        if (authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            user = {
                id: verified.userId
            };
        } 
    } catch (error) {
        // Access Denied
        
        var pathname = url.parse(req.url).pathname;
        if (pathname != "/playground") {
            res.json({message: "You are not authenticated"});
        }
    }
    req.user = user;
    next();
}

module.exports = middleware;