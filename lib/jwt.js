const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (payload) => {
    return jwt.sign(payload,SECRET_KEY, {
        expiresIn : "1h",
        algorithm : "HS256"
    })
}

const verifyToken = (token) => {
    return jwt.verify(token,SECRET_KEY, {
        algorithms : ['HS256'],
    })
}

module.exports = {generateToken,verifyToken};