const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user_last_name: String,
    user_first_name: String,
})

const User = mongoose.model('user', UserSchema, 'user')
module.exports = User
