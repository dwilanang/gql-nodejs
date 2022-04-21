const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const middlewareAuth = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
           
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const verified = jwt.verify(token, jwtSecretKey);
            console.log(verified)
            if(verified){
              
            }else{
                // Access Denied
                
            }
        }
   
    } catch (error) {
        // Access Denied
        console.log(error)
    }
    next();
}

module.exports = middlewareAuth;