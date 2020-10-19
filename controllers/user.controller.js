const UserService = require('../services/user.service')

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserService.Fin()
        return res.status(200).json({
            data: users
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden jutsu not allowed"
        })
    }
}

const AddUser = async (req, res) => {
    try {
        const newUser = {
            user_last_name,
            user_first_name
        } = req.body
        const existingUser = await UserService.FindOne({
            user_last_name: newUser.user_last_name
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
        const newUser = {
            user_last_name,
            user_first_name
        } = req.body
        const existingUser = await UserService.FindOne({
            _id: user_id
        })
        if(existingUser){
            return res.status(409).json({
                message: "User already exist"
            })
        }
        await UserService.AddUser(newUser)
        return res.status(200).json({
            message: "User updated",
            data: newUser
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
        await UserService.DeleteUser({
            _id: user_id
        })
        return res.status('200').json({
            message: "User delete",
        })
    } catch (error) {
        return res.status(403).json({
            message: "Forbidden jutsu not allowed"
        })
    }
}

module.exports = {
    GetAllUsers,
    AddUser,
    UpdateUser,
    DeleteUser
}