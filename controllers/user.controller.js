const UserService = require('../services/user.service')
const { ParseUser } = require('../models/user.model')

const GetAllUsers = async (req, res) => _execute(res, async () => {
    const users = await UserService.Find({})
    return res.status(200).json({
        data: users
    })
})

const GetUsersByType = async (req, res) => _execute(res, async () => {
    const { user_type } = req.params
    const users = await UserService.Find({
        userType: user_type
    })
    return res.status(200).json({
        data: users
    })
})

const GetUserById = async (req, res) => _execute(res, async () => {
    const { user_id } = req.params
    const user = await UserService.FindOne({
        _id: user_id
    })
    if (!user) {
        return _createErroResponse(res, 409, 'User does not exists')
    }
    return res.status(200).json({
        data: user
    })
})

const AddUser = async (req, res) => _execute(res, async () => {
    const newUser = ParseUser(req)
    const existingUser = await UserService.FindOne({
        email: newUser.email
    })
    if (existingUser) {
        return _createErroResponse(res, 409, 'User already exist')
    }
    await UserService.Create(newUser)
    return res.status(200).json({
        message: "User inserted",
        data: await UserService.FindOne({
            email: newUser.email
        })
    })
})

const UpdateUser = async (req, res) => _execute(res, async () => {
    const { user_id } = req.params
    const newData = ParseUser(req)
    const oldData = await UserService.FindOne({
        _id: user_id
    })
    if (!oldData) {
        return _createErroResponse(res, 409, 'User does not exist')
    }
    await UserService.FindOneAndUpdate(newData)
    return res.status(200).json({
        message: "User updated",
        data: newData
    })
})

const DeleteUser = async (req, res) => _execute(res, async () => {
    const { user_id } = req.params
    await UserService.DeleteOne({
        _id: user_id
    })
    return res.status('200').json({
        message: "User deleted",
    })
})

_execute = async (res, handler) => {
    try {
        return await handler()
    } catch (error) {
        return _createErroResponse(res, 403, 'Ipinagbabawal')
    }
}
_createErroResponse = (res, code, message) => {
    return res.status(code).json({
        message: message
    })
}

module.exports = {
    GetAllUsers,
    GetUserById,
    GetUsersByType,
    AddUser,
    UpdateUser,
    DeleteUser
}