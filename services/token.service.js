const Token = require('../models/token.model')

const FindOne = async (query) => {
    const token = await Token.findOne(query)
    return token
}

const Create = async (data) => {
    const token =  await Token.create(data)
    return token
}

const DeleteOne = async (filter) => {
    const token = await Token.deleteOne(filter)
    return token
}

module.exports = {
    FindOne,
    Create,
    DeleteOne
}