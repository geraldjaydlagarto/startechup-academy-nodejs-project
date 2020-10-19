const UserService = require('../services/user.service')

const GetAllUsers = async (req, res) => {
    try {
        const users = await UserService.Find()
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
        const new_user = {
            user_last_name,
            user_first_name
        } = req.body
        const existing_user = await UserService.FindOne({
            user_last_name: new_user.user_last_name
        })
        if(existing_user){
            return res.status(409).json({
                message: "User already exist"
            })
        }
        await UserService.Create(new_user)
        return res.status(200).json({
            message: "User inserted",
            data: new_user
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
        const new_user = {
            user_last_name,
            user_first_name
        } = req.body
        const existing_user = await UserService.FindOne({
            _id: user_id
        })
        if(!existing_user){
            return res.status(409).json({
                message: "User does not exist"
            })
        }
        await UserService.FindOneAndUpdate(new_user)
        return res.status(200).json({
            message: "User updated",
            data: new_user
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
    AddUser,
    UpdateUser,
    DeleteUser
}