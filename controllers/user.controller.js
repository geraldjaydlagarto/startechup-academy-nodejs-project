const UserService = require('../services/user.service')

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserService.Find({})
        return res.status(200).json({
            data: users
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden jutsu not allowed"
        })
    }
}

const GetUsersByType = async(req, res) => {
    try {
        const { user_type } = req.params
        const users = await UserService.Find({
            user_type: user_type
        })
        return res.status(200).json({
            data: users
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden justsu"
        })
    }   
}

const GetUserById = async(req, res) => {
    try {
        const { user_id } = req.params
        const user = await UserService.FindOne({
            _id: user_id
        })
        if(!user) {
            return res.status(409).json({
                message: 'User does not exists'
            })
        }
        return res.status(200).json({
            data: user
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden justsu"
        })
    }
}

const AddUser = async (req, res) => {
    try {
        const newUser = {
            username,
            name,
            email,
            password,
            country,
            userType
        } = req.body
        const existingUser = await UserService.FindOne({
            email: newUser.email
        })
        if(existingUser){
            return res.status(409).json({
                message: "User already exist"
            })
        }
        await UserService.Create(newUser)
        return res.status(200).json({
            message: "User inserted",
            data: newUser
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden jutsu not allowed"
        })
    }
}

const UpdateUser = async(req, res) => {
    try {
        const { user_id } = req.params
        const newData = {
            username,
            name,
            email,
            password,
            country,
            userType
        } = req.body
        const oldData = await UserService.FindOne({
            _id: user_id
        })
        if(!oldData){
            return res.status(409).json({
                message: "User does not exist"
            })
        }
        await UserService.FindOneAndUpdate(newData)
        return res.status(200).json({
            message: "User updated",
            data: newData
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden jutsu not allowed"
        })
    }
}

const DeleteUser = async(req, res) => {
    try {
        const { user_id } = req.params
        await UserService.DeleteOne({
            _id: user_id
        })
        return res.status('200').json({
            message: "User deleted",
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden jutsu not allowed"
        })
    }
}

module.exports = {
    GetAllUsers,
    GetUserById,
    GetUsersByType,
    AddUser,
    UpdateUser,
    DeleteUser
}