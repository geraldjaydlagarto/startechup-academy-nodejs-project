const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {db} = require('./db/index')
const organization = require('./routes/organization.route')
const port = 3000;

db()
app.use(organization)

app.listen(port, () => {
    console.log('Server runs at port:', port)
})