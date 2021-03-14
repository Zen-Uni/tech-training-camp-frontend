const jwt = require('jsonwebtoken')
const secret = require('./secret')

const parseJWT = token => {
    console.log('token ----------', token)
    if (!token) {
        return {
            code: -1
        }
    }
    return {
        code: 0,
        data: jwt.verify(token.split(' ')[1], secret)
    }
}

module.exports = parseJWT