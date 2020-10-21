require('dotenv').config()
const secretKey = process.env.SECRET_KEY

const jwt = require('jsonwebtoken')

const jwtVerify = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            reject(error.message)
        }
        resolve(decoded)
    })
})