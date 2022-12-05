const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || ""

    var user = {
        id: 0
    };

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            user = {
                id: verified.userId
            };
            
        }
        req.user = user;
    
        next();
    } catch (error) {
        res.status(401).json({message: "You are not authenticated"});
    }
  }
  
  const createJwtToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  }
  module.exports = { createJwtToken, authenticate }