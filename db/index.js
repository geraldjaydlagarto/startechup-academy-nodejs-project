const mongoose = require('mongoose')
require('dotenv').config()

const db_con = process.env.MONGODB_URI
const db = () => {
    mongoose.connect(db_con, {
        useNewUrlParser: true
    })
}

module.exports = {
    db
}