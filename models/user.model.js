const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
        organizations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'organization'
            },
        ],
        method: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            default: 'local',
            required: true
        },
        google: {
            id: {
                type: String
            }
        },
        facebook: {
            id: {
                type: String
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }, {
    versionKey: false
}
)
UserSchema.pre('save', async function (next) {
    const user = this
    user.password = user.password && await bcrypt.hash(user.password.trim(), 12)
    next()
})

UserSchema.pre('findOneAndUpdate', async function () {
    this.update({}, { $set: { updatedAt: new Date() } })
})

const User = mongoose.model('user', UserSchema, 'user')

const ParseUser = {
    method,
    username,
    name,
    email,
    password,
    country, 
    language,
    userType,
    organizations
} = (req) => { return req.body }

module.exports = { User, ParseUser }
