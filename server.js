const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {db} = require('./db/index')
const organization = require('./routes/organization.route')
const user = require('./routes/user.route')
const port = 3000;

db()
app.get('/fail', (req, res) => {
    res.send('Authentication Failed')
})
app.use(bodyParser.urlencoded( {extended: true}))
app.use(bodyParser.json({}))
app.use(organization)
app.use(user)
app.listen(port, () => {
    console.log('Server runs at port:', port)
}) 