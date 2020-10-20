const User  = require('../models/user.model')

const Find = async (filter) => {
    return await User.find(filter)
}

const FindOne = async (filter) => {
    return await User.findOne(filter)
}

const Create = async (data) => {
    return await User.create(data)
}

const FindOneAndUpdate = async (filter, data) => {
    return await User.findOneAndUpdate(filter, {...data})
}

const DeleteOne = async (filter) => {
    return await User.deleteOne(filter)
}

module.exports = {
    Find,
    FindOne,
    Create,
    FindOneAndUpdate,
    DeleteOne
}