const UserService = require('../services/user.service')
const { ParseUser } = require('../models/user.model')
const Utils = require('./utils')

const GetAllUsers = async (req, res) => Utils.Execute(res, async () => {
    const users = await UserService.Find({})
    return Utils.Success(res, users)
})

const GetUsersByType = async (req, res) => Utils.Execute(res, async () => {
    const { user_type } = req.params
    const users = await UserService.Find({
        userType: user_type
    })
    return Utils.Success(res, users)
})

const GetUserById = async (req, res) => Utils.Execute(res, async () => {
    const { user_id } = req.params
    const user = await UserService.FindOne({
        _id: user_id
    })
    if (!user) {
        return Utils.Error(res, 409, 'User does not exists')
    }
    return Utils.Success(res, user)
})

const AddUser = async (req, res) => Utils.Execute(res, async () => {
    const newUser = ParseUser(req)
    const existingUser = await UserService.FindOne({
        email: newUser.email
    })
    if (existingUser) {
        return Utils.Error(res, 409, 'User already exist')
    }
    const user = await UserService.Create(newUser)
    return Util.Success(res, user)
})

const UpdateUser = async (req, res) => Utils.Execute(res, async () => {
    const { user_id } = req.params
    const newData = ParseUser(req)
    const oldData = await UserService.FindOne({
        _id: user_id
    })
    if (!oldData) {
        return Utils.Error(res, 409, 'User does not exist')
    }

    const user = await UserService.FindOneAndUpdate({ _id: user_id }, newData)
    return Utils.Success(res, user)
})

const DeleteUser = async (req, res) => Utils.Execute(res, async () => {
    const { user_id } = req.params
    await UserService.DeleteOne({
        _id: user_id
    })
    return Utils.Success(res, null)
})

module.exports = {
    GetAllUsers,
    GetUserById,
    GetUsersByType,
    AddUser,
    UpdateUser,
    DeleteUser
}