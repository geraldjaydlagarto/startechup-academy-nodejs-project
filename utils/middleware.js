const { jwtVerify } = require('./helper')
const Utils = require('../controllers/utils')

const isAuthenticated = async (req, res, next) => Utils.Execute(res, async () => {
    const authorization = req.headers['x-access-token'] || req.headers.authorization
    const token = authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1]

    if (token) {
        req.decoded = await jwtVerify(token)
        return next()
    }

    return Utils.Error(res, 500, 'Auth token is not supplied')
})

module.exports = {
    isAuthenticated
}