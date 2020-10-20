const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        email: String, 
        password: String,
        country: String,
        language: String,
        userType: {
            type: String,
            enum: ['user', 'ngo_admin', 'super_admin'],
            default: 'user',
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },{
        versionKey: false
    }
)

const User = mongoose.model('user', UserSchema, 'user')
module.exports = User
