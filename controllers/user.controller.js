const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')
const { ParseUser } = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Utils = require('./utils')
require('dotenv').config()
const secretKey = process.env.SECRET_KEY

const GetAllUsers = async (req, res) => Utils.Execute(res, async () => {
    const users = await UserService.Find({})
    return Utils.Success(res, users)
})

const GetOrganizationsByUser = async (req, res) => Utils.Execute(res, async () => {
    const { userId } = req.params
    const organizations = await UserService.FindAndPopulate(
        { _id: userId },
        'organizations'
    )
    return Utils.Success(res, organizations)
})

const GetUsersByType = async (req, res) => Utils.Execute(res, async () => {
    const { userType } = req.params
    const users = await UserService.Find({
        userType: userType
    })
    return Utils.Success(res, users)
})

const GetUserById = async (req, res) => Utils.Execute(res, async () => {
    const { userId } = req.params
    const user = await UserService.FindOne({
        _id: userId
    })
    if (!user) {
        return Utils.Error(res, 409, 'User does not exists')
    }
    return Utils.Success(res, user)
})

const Register = async (req, res) => Utils.Execute(res, async () => {
    const newUser = ParseUser(req)
    const existingUser = await UserService.FindOne({
        email: newUser.email
    })
    if (existingUser) {
        return Utils.Error(res, 409, 'User already exist')
    }
    await UserService.Create(newUser)
    const user = await UserService.FindOne({ email: newUser.email })
    return Utils.Success(res, user)
})

const UpdateUser = async (req, res) => Utils.Execute(res, async () => {
    const { userId } = req.params
    const newData = ParseUser(req)
    const oldData = await UserService.FindOne({
        _id: userId
    })
    if (!oldData) {
        return Utils.Error(res, 409, 'User does not exist')
    }

    await UserService.FindOneAndUpdate({ _id: userId }, newData)
    const user = await UserService.FindOne({ _id: userId })
    return Utils.Success(res, user)
})

const DeleteUser = async (req, res) => Utils.Execute(res, async () => {
    const { userId } = req.params
    await UserService.DeleteOne({
        _id: userId
    })
    return res.status(200)
})

const Login = async (req, res) => Utils.Execute(res, async () => {
    const user = req.user
    const accessToken = jwt.sign(
        user.toJSON(),
        secretKey,
        {
            expiresIn: '24h'
        })

    const token = await TokenService.Create({ accessToken })
    return Utils.Success(res, token)
})

const Logout = async (req, res) => Utils.Execute(res, async () => {
    const authorization = req.headers['x-access-token'] || req.headers.authorization
    const token = authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1]
    await TokenService.DeleteOne({ accessToken: token })
    return Utils.Success(res)
})

module.exports = {
    GetAllUsers,
    GetOrganizationsByUser,
    GetUserById,
    GetUsersByType,
    Register,
    Login,
    Logout,
    UpdateUser,
    DeleteUser
}